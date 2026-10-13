// Admin Store: Manages client leads and dynamic project showcase images

export interface LeadItem {
  id: string;
  name: string;
  phone: string;
  email: string;
  category: string;
  message: string;
  createdAt: string;
  status: "New" | "Contacted" | "In Discussion" | "Closed";
}

export interface AdminProjectItem {
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
    id: "lead-1",
    name: "Vikram Malhotra",
    phone: "+91 98112 34567",
    email: "vikram.m@corporatemail.com",
    category: "Luxury Apartment / Penthouse",
    message: "Looking for complete turnkey interior fit-out for a 7,500 sq.ft duplex penthouse at DLF Camellias, Golf Course Road.",
    createdAt: "2026-10-12T11:30:00.000Z",
    status: "New",
  },
  {
    id: "lead-2",
    name: "Col. Rajesh & Sunita Ahluwalia",
    phone: "+91 98710 98765",
    email: "rajesh.ahluwalia@gmail.com",
    category: "Country Estate / Farmhouse",
    message: "Planning a 2.5 acre private farmhouse retreat in Chhatarpur. Interested in double-height living hall and natural stone architecture.",
    createdAt: "2026-10-10T15:45:00.000Z",
    status: "In Discussion",
  },
  {
    id: "lead-3",
    name: "Sunil Singhania (MD)",
    phone: "+91 99990 12345",
    email: "singhania@apexcapital.in",
    category: "Corporate & Commercial Headquarters",
    message: "Need 12,000 sq.ft executive corporate headquarters interior design at DLF The Crest with boardroom and MD cabin.",
    createdAt: "2026-10-08T09:15:00.000Z",
    status: "Contacted",
  },
];

/* ================= LEADS FUNCTIONS ================= */

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

export function saveLead(lead: Omit<LeadItem, "id" | "createdAt" | "status">): LeadItem {
  const newLead: LeadItem = {
    ...lead,
    id: `lead-${Date.now()}`,
    createdAt: new Date().toISOString(),
    status: "New",
  };

  if (typeof window !== "undefined") {
    try {
      const current = getLeads();
      const updated = [newLead, ...current];
      localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event("ss_leads_updated"));
    } catch (err) {
      console.error("Error saving lead:", err);
    }
  }

  return newLead;
}

export function updateLeadStatus(id: string, status: LeadItem["status"]): void {
  if (typeof window === "undefined") return;
  try {
    const current = getLeads();
    const updated = current.map((item) => (item.id === id ? { ...item, status } : item));
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("ss_leads_updated"));
  } catch (err) {
    console.error("Error updating lead status:", err);
  }
}

export function deleteLead(id: string): void {
  if (typeof window === "undefined") return;
  try {
    const current = getLeads();
    const updated = current.filter((item) => item.id !== id);
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("ss_leads_updated"));
  } catch (err) {
    console.error("Error deleting lead:", err);
  }
}

/* ================= CUSTOM PROJECTS FUNCTIONS ================= */

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

export function addCustomProject(project: Omit<AdminProjectItem, "isCustom" | "createdAt">): AdminProjectItem {
  const newProject: AdminProjectItem = {
    ...project,
    isCustom: true,
    createdAt: new Date().toISOString(),
  };

  if (typeof window !== "undefined") {
    try {
      const current = getCustomProjects();
      const updated = [newProject, ...current];
      localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event("ss_projects_updated"));
    } catch (err) {
      console.error("Error saving custom project:", err);
    }
  }

  return newProject;
}

export function deleteCustomProject(url: string): void {
  if (typeof window === "undefined") return;
  try {
    const current = getCustomProjects();
    const updated = current.filter((item) => item.url !== url);
    localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("ss_projects_updated"));
  } catch (err) {
    console.error("Error deleting custom project:", err);
  }
}
