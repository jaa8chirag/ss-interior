// Admin Store: Connects to MySQL Database with local cache fallback

export interface LeadItem {
  id: string | number;
  name: string;
  phone: string;
  email: string;
  category: string;
  message: string;
  createdAt: string;
  status: "New" | "Contacted" | "In Discussion" | "Closed";
}

export interface AdminProjectItem {
  id?: string | number;
  url: string;
  caption: string;
  category: "Residential" | "Farmhouses" | "Commercial" | "Hospitality";
  projectName: string;
  subProjectId: string;
  clientScope: string;
  location: string;
  createdAt?: string;
  isCustom?: boolean;
}

const LEADS_STORAGE_KEY = "ss_interiors_leads_v1";
const PROJECTS_STORAGE_KEY = "ss_interiors_custom_projects_v1";

const INITIAL_SAMPLE_LEADS: LeadItem[] = [
  {
    id: 1,
    name: "Vikram Malhotra",
    phone: "+91 98112 34567",
    email: "vikram.m@corporatemail.com",
    category: "Luxury Apartment / Penthouse",
    message: "Looking for complete turnkey interior fit-out for a 7,500 sq.ft duplex penthouse at DLF Camellias, Golf Course Road.",
    createdAt: "2026-10-12T11:30:00.000Z",
    status: "New",
  },
  {
    id: 2,
    name: "Col. Rajesh & Sunita Ahluwalia",
    phone: "+91 98710 98765",
    email: "rajesh.ahluwalia@gmail.com",
    category: "Country Estate / Farmhouse",
    message: "Planning a 2.5 acre private farmhouse retreat in Chhatarpur. Interested in double-height living hall and natural stone architecture.",
    createdAt: "2026-10-10T15:45:00.000Z",
    status: "In Discussion",
  },
  {
    id: 3,
    name: "Sunil Singhania (MD)",
    phone: "+91 99990 12345",
    email: "singhania@apexcapital.in",
    category: "Corporate & Commercial Headquarters",
    message: "Need 12,000 sq.ft executive corporate headquarters interior design at DLF The Crest with boardroom and MD cabin.",
    createdAt: "2026-10-08T09:15:00.000Z",
    status: "Contacted",
  },
];

/* ================= LEADS FUNCTIONS (MySQL + Local Fallback) ================= */

export async function fetchLeadsFromDb(): Promise<LeadItem[]> {
  try {
    const res = await fetch("/api/leads", { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.leads) && data.leads.length > 0) {
        if (typeof window !== "undefined") {
          localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(data.leads));
        }
        return data.leads;
      }
    }
  } catch (err) {
    console.warn("Could not fetch leads from MySQL API, using local storage cache:", err);
  }
  return getLeads();
}

export function getLeads(): LeadItem[] {
  if (typeof window === "undefined") return INITIAL_SAMPLE_LEADS;
  try {
    const raw = localStorage.getItem(LEADS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(INITIAL_SAMPLE_LEADS));
      return INITIAL_SAMPLE_LEADS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading leads from storage:", err);
    return INITIAL_SAMPLE_LEADS;
  }
}

export async function saveLead(lead: Omit<LeadItem, "id" | "createdAt" | "status">): Promise<LeadItem> {
  const newLead: LeadItem = {
    ...lead,
    id: `lead-${Date.now()}`,
    createdAt: new Date().toISOString(),
    status: "New",
  };

  // 1. Immediately store in local cache
  if (typeof window !== "undefined") {
    try {
      const current = getLeads();
      const updated = [newLead, ...current];
      localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event("ss_leads_updated"));
    } catch (err) {
      console.error("Error saving lead in cache:", err);
    }
  }

  // 2. Persist to MySQL database via API
  try {
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.id) newLead.id = data.id;
    }
  } catch (err) {
    console.warn("MySQL lead sync warning (will sync when database is connected):", err);
  }

  return newLead;
}

export async function updateLeadStatus(id: string | number, status: LeadItem["status"]): Promise<void> {
  // Update local cache
  if (typeof window !== "undefined") {
    try {
      const current = getLeads();
      const updated = current.map((item) => (String(item.id) === String(id) ? { ...item, status } : item));
      localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event("ss_leads_updated"));
    } catch (err) {
      console.error("Error updating lead status in cache:", err);
    }
  }

  // Update MySQL
  try {
    await fetch("/api/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
  } catch (err) {
    console.warn("MySQL status sync warning:", err);
  }
}

export async function deleteLead(id: string | number): Promise<void> {
  // Update local cache
  if (typeof window !== "undefined") {
    try {
      const current = getLeads();
      const updated = current.filter((item) => String(item.id) !== String(id));
      localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event("ss_leads_updated"));
    } catch (err) {
      console.error("Error deleting lead from cache:", err);
    }
  }

  // Delete from MySQL
  try {
    await fetch(`/api/leads?id=${id}`, { method: "DELETE" });
  } catch (err) {
    console.warn("MySQL delete sync warning:", err);
  }
}

/* ================= CUSTOM PROJECTS FUNCTIONS (MySQL + Local Fallback) ================= */

export async function fetchProjectsFromDb(): Promise<AdminProjectItem[]> {
  try {
    const res = await fetch("/api/projects", { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.projects)) {
        if (typeof window !== "undefined") {
          localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(data.projects));
        }
        return data.projects;
      }
    }
  } catch (err) {
    console.warn("Could not fetch projects from MySQL API, using local storage cache:", err);
  }
  return getCustomProjects();
}

export function getCustomProjects(): AdminProjectItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(PROJECTS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error("Error reading custom projects:", err);
    return [];
  }
}

export async function addCustomProject(project: Omit<AdminProjectItem, "isCustom" | "createdAt">): Promise<AdminProjectItem> {
  const newProject: AdminProjectItem = {
    ...project,
    isCustom: true,
    createdAt: new Date().toISOString(),
  };

  // 1. Immediately store in local cache
  if (typeof window !== "undefined") {
    try {
      const current = getCustomProjects();
      const updated = [newProject, ...current];
      localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event("ss_projects_updated"));
    } catch (err) {
      console.error("Error saving custom project in cache:", err);
    }
  }

  // 2. Persist to MySQL database via API
  try {
    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(project),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.id) newProject.id = data.id;
    }
  } catch (err) {
    console.warn("MySQL project sync warning (will sync when database is connected):", err);
  }

  return newProject;
}

export async function deleteCustomProject(url: string, id?: string | number): Promise<void> {
  // Update local cache
  if (typeof window !== "undefined") {
    try {
      const current = getCustomProjects();
      const updated = current.filter((item) => item.url !== url && (id ? String(item.id) !== String(id) : true));
      localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event("ss_projects_updated"));
    } catch (err) {
      console.error("Error deleting custom project from cache:", err);
    }
  }

  // Delete from MySQL
  try {
    const queryParam = id ? `id=${id}` : `url=${encodeURIComponent(url)}`;
    await fetch(`/api/projects?${queryParam}`, { method: "DELETE" });
  } catch (err) {
    console.warn("MySQL delete project sync warning:", err);
  }
}
