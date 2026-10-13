// Admin Store: Connects to MySQL Database with local cache fallback

export interface LeadItem {
  id: string | number;
  name: string;
  phone: string;
  email: string;
  city?: string;
  category: string;
  message: string;
  createdAt: string;
  status: "New" | "Contacted" | "In Discussion" | "Closed";
}

export interface AdminProjectItem {
  id: string | number;
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
const ALL_PROJECTS_STORAGE_KEY = "ss_interiors_all_projects_v2";

const INITIAL_SAMPLE_LEADS: LeadItem[] = [
  {
    id: 1,
    name: "Vikram Malhotra",
    phone: "+91 98112 34567",
    email: "vikram.m@corporatemail.com",
    city: "Gurgaon",
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
    city: "Chhatarpur, Delhi",
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
    city: "DLF Cyber City",
    category: "Corporate & Commercial Headquarters",
    message: "Need 12,000 sq.ft executive corporate headquarters interior design at DLF The Crest with boardroom and MD cabin.",
    createdAt: "2026-10-08T09:15:00.000Z",
    status: "Contacted",
  },
];

export const INITIAL_PROJECTS: AdminProjectItem[] = [
  // ================= 01. RESIDENTIAL =================
  // DLF Camellias
  {
    id: "proj-1",
    url: "/projects/camellias_real_1.jpg",
    caption: "Grand Formal Dining & Japanese Mural Architecture — Bookmatched Statuary Marble",
    category: "Residential",
    projectName: "DLF Camellias",
    subProjectId: "dlf-camellias",
    clientScope: "Ultra-Luxury Private Sky Penthouse",
    location: "Golf Course Road, Gurgaon",
  },
  {
    id: "proj-2",
    url: "/projects/camellias_real_2.jpg",
    caption: "Private Bar Lounge & Wood-Paneled Foyer with Ambient Concealed Linears",
    category: "Residential",
    projectName: "DLF Camellias",
    subProjectId: "dlf-camellias",
    clientScope: "Ultra-Luxury Private Sky Penthouse",
    location: "Golf Course Road, Gurgaon",
  },
  {
    id: "proj-3",
    url: "/projects/camellias_real_3.jpg",
    caption: "Master Presidential Suite & Marble Fireplace Detail with Architectural Coves",
    category: "Residential",
    projectName: "DLF Camellias",
    subProjectId: "dlf-camellias",
    clientScope: "Ultra-Luxury Private Sky Penthouse",
    location: "Golf Course Road, Gurgaon",
  },
  {
    id: "proj-4",
    url: "/projects/camellias_real_4.jpg",
    caption: "Backlit Honey Onyx Entry Console & Vertical Architectural Partition",
    category: "Residential",
    projectName: "DLF Camellias",
    subProjectId: "dlf-camellias",
    clientScope: "Ultra-Luxury Private Sky Penthouse",
    location: "Golf Course Road, Gurgaon",
  },
  {
    id: "proj-5",
    url: "/projects/camellias_real_5.jpg",
    caption: "Fluted Seasoned Timber Corridor & Concealed Flush Wardrobes",
    category: "Residential",
    projectName: "DLF Camellias",
    subProjectId: "dlf-camellias",
    clientScope: "Ultra-Luxury Private Sky Penthouse",
    location: "Golf Course Road, Gurgaon",
  },
  {
    id: "proj-6",
    url: "/projects/camellias_real_6.jpg",
    caption: "Contemporary Living Fireplace Feature Wall & Sculptural Mirror Styling",
    category: "Residential",
    projectName: "DLF Camellias",
    subProjectId: "dlf-camellias",
    clientScope: "Ultra-Luxury Private Sky Penthouse",
    location: "Golf Course Road, Gurgaon",
  },
  // DLF Magnolias
  {
    id: "proj-7",
    url: "/projects/magnolias_real_1.jpg",
    caption: "Bookmatched White Marble Foyer & Floral Backlit Statement Art",
    category: "Residential",
    projectName: "DLF Magnolias",
    subProjectId: "dlf-magnolias",
    clientScope: "Bespoke Luxury Family Residence",
    location: "Golf Course Road, Gurgaon",
  },
  {
    id: "proj-8",
    url: "/projects/magnolias_real_2.jpg",
    caption: "Grand Living Salon & Backlit Onyx Wall with Custom European Furniture",
    category: "Residential",
    projectName: "DLF Magnolias",
    subProjectId: "dlf-magnolias",
    clientScope: "Bespoke Luxury Family Residence",
    location: "Golf Course Road, Gurgaon",
  },
  {
    id: "proj-9",
    url: "/projects/magnolias_real_3.jpg",
    caption: "Intimate Family TV Lounge & Fluted Brass Accent Panelling",
    category: "Residential",
    projectName: "DLF Magnolias",
    subProjectId: "dlf-magnolias",
    clientScope: "Bespoke Luxury Family Residence",
    location: "Golf Course Road, Gurgaon",
  },
  {
    id: "proj-10",
    url: "/projects/magnolias_real_4.jpg",
    caption: "Sculptural Birds Foyer Wall & Floating Italian Stone Console",
    category: "Residential",
    projectName: "DLF Magnolias",
    subProjectId: "dlf-magnolias",
    clientScope: "Bespoke Luxury Family Residence",
    location: "Golf Course Road, Gurgaon",
  },
  {
    id: "proj-11",
    url: "/projects/magnolias_real_5.jpg",
    caption: "Powder Room Hand-Carved Rose Onyx Basin & Precision Downlighting",
    category: "Residential",
    projectName: "DLF Magnolias",
    subProjectId: "dlf-magnolias",
    clientScope: "Bespoke Luxury Family Residence",
    location: "Golf Course Road, Gurgaon",
  },
  {
    id: "proj-12",
    url: "/projects/curved_master_suite.jpg",
    caption: "Curved Velvet Headboard & Floating Cove Lighting Master Suite",
    category: "Residential",
    projectName: "Private Suite",
    subProjectId: "private-suite",
    clientScope: "Master Bedroom Suite",
    location: "Delhi NCR",
  },

  // ================= 02. FARMHOUSES =================
  // DLF Aralias Country Estate
  {
    id: "proj-13",
    url: "/projects/aralias_hero.jpg",
    caption: "Country Estate Great Hall — Double-Height Glazing & Hand-Chiseled Stone",
    category: "Farmhouses",
    projectName: "DLF Aralias Estate",
    subProjectId: "dlf-aralias",
    clientScope: "Private Sprawling Country Estate",
    location: "Golf Course Road / NCR Countryside",
  },
  {
    id: "proj-14",
    url: "/projects/aralias_1.jpg",
    caption: "Private Estate Veranda & Terrace — Harmonizing Architecture with Nature",
    category: "Farmhouses",
    projectName: "DLF Aralias Estate",
    subProjectId: "dlf-aralias",
    clientScope: "Private Sprawling Country Estate",
    location: "Golf Course Road / NCR Countryside",
  },
  {
    id: "proj-15",
    url: "/projects/aralias_2.jpg",
    caption: "Drawing Room & Formal Lounge with Earthy Stone Textures and Teak Joists",
    category: "Farmhouses",
    projectName: "DLF Aralias Estate",
    subProjectId: "dlf-aralias",
    clientScope: "Private Sprawling Country Estate",
    location: "Golf Course Road / NCR Countryside",
  },
  {
    id: "proj-16",
    url: "/projects/aralias_3.jpg",
    caption: "Countryside Villa Bedroom & Panoramic Courtyard Garden Views",
    category: "Farmhouses",
    projectName: "DLF Aralias Estate",
    subProjectId: "dlf-aralias",
    clientScope: "Private Sprawling Country Estate",
    location: "Golf Course Road / NCR Countryside",
  },
  {
    id: "proj-17",
    url: "/projects/aralias_4.jpg",
    caption: "Dining Sanctuary & Courtyard Views — Hand-Poured Terrazzo & Brass Hardware",
    category: "Farmhouses",
    projectName: "DLF Aralias Estate",
    subProjectId: "dlf-aralias",
    clientScope: "Private Sprawling Country Estate",
    location: "Golf Course Road / NCR Countryside",
  },
  // Chhatarpur Country Villa
  {
    id: "proj-18",
    url: "/projects/estate_real_1.jpg",
    caption: "Grand Dining Salon & Crystal Chandelier — Solid Seasoned Hardwood Joinery",
    category: "Farmhouses",
    projectName: "Chhatarpur Villa",
    subProjectId: "chhatarpur-villa",
    clientScope: "Private Luxury Acreage Farmhouse",
    location: "Chhatarpur, Delhi NCR",
  },
  {
    id: "proj-19",
    url: "/projects/estate_real_2.jpg",
    caption: "Master Ensuite — Green Onyx Double Vanity & Frameless Architectural Glazing",
    category: "Farmhouses",
    projectName: "Chhatarpur Villa",
    subProjectId: "chhatarpur-villa",
    clientScope: "Private Luxury Acreage Farmhouse",
    location: "Chhatarpur, Delhi NCR",
  },
  {
    id: "proj-20",
    url: "/projects/estate_real_3.jpg",
    caption: "Double-Height Estate Drawing Hall — Coffered Ceilings & Silk Carpets",
    category: "Farmhouses",
    projectName: "Chhatarpur Villa",
    subProjectId: "chhatarpur-villa",
    clientScope: "Private Luxury Acreage Farmhouse",
    location: "Chhatarpur, Delhi NCR",
  },

  // ================= 03. COMMERCIAL =================
  // DLF The Crest
  {
    id: "proj-21",
    url: "/projects/thecrest_hero.jpg",
    caption: "Executive Headquarters Formal Reception — Bookmatched Marble & Brass Inlay",
    category: "Commercial",
    projectName: "DLF The Crest",
    subProjectId: "the-crest",
    clientScope: "Corporate Headquarters & Leadership Suite",
    location: "Sector 54, Gurgaon",
  },
  {
    id: "proj-22",
    url: "/projects/thecrest_2.jpg",
    caption: "Private Executive Lounge & Custom Fluted Bar Detailing",
    category: "Commercial",
    projectName: "DLF The Crest",
    subProjectId: "the-crest",
    clientScope: "Corporate Headquarters & Leadership Suite",
    location: "Sector 54, Gurgaon",
  },
  {
    id: "proj-23",
    url: "/projects/thecrest_3.jpg",
    caption: "Managing Director Cabin & Custom Floor-to-Ceiling Library Shelving",
    category: "Commercial",
    projectName: "DLF The Crest",
    subProjectId: "the-crest",
    clientScope: "Corporate Headquarters & Leadership Suite",
    location: "Sector 54, Gurgaon",
  },
  // Corporate Leadership Suites
  {
    id: "proj-24",
    url: "/projects/corp_15.jpg",
    caption: "Executive Boardroom & Audio-Visual Presentation Suite — Modern Acoustics",
    category: "Commercial",
    projectName: "Corporate C-Suite",
    subProjectId: "corporate-c-suite",
    clientScope: "Corporate Headquarters & Boardrooms",
    location: "Cyber City & Gurgaon NCR",
  },
  {
    id: "proj-25",
    url: "/projects/corp_16.jpg",
    caption: "Collaborative Open Workstation Bay — Ergonomic Furniture & Linears",
    category: "Commercial",
    projectName: "Corporate C-Suite",
    subProjectId: "corporate-c-suite",
    clientScope: "Corporate Headquarters & Boardrooms",
    location: "Cyber City & Gurgaon NCR",
  },
  {
    id: "proj-26",
    url: "/projects/corp_18.jpg",
    caption: "Acoustic Glass Partition Executive Desks & Precision LED Layouts",
    category: "Commercial",
    projectName: "Corporate C-Suite",
    subProjectId: "corporate-c-suite",
    clientScope: "Corporate Headquarters & Boardrooms",
    location: "Cyber City & Gurgaon NCR",
  },
  {
    id: "proj-27",
    url: "/projects/corp_20.jpg",
    caption: "Director Executive Cabin — Sleek Minimalist Desk & Custom Credenza",
    category: "Commercial",
    projectName: "Corporate C-Suite",
    subProjectId: "corporate-c-suite",
    clientScope: "Corporate Headquarters & Boardrooms",
    location: "Cyber City & Gurgaon NCR",
  },
  {
    id: "proj-28",
    url: "/projects/corp_26.jpg",
    caption: "Managing Director Leadership Suite — Marble Conference Setting",
    category: "Commercial",
    projectName: "Corporate C-Suite",
    subProjectId: "corporate-c-suite",
    clientScope: "Corporate Headquarters & Boardrooms",
    location: "Cyber City & Gurgaon NCR",
  },
  {
    id: "proj-29",
    url: "/projects/corp_27.jpg",
    caption: "Corporate Reception Lounge & Acoustic Feature Wall Detailing",
    category: "Commercial",
    projectName: "Corporate C-Suite",
    subProjectId: "corporate-c-suite",
    clientScope: "Corporate Headquarters & Boardrooms",
    location: "Cyber City & Gurgaon NCR",
  },
  {
    id: "proj-30",
    url: "/projects/corp_25.jpg",
    caption: "Corporate Breakout & Collaboration Hub — Modern Scandinavian High Stools",
    category: "Commercial",
    projectName: "Corporate C-Suite",
    subProjectId: "corporate-c-suite",
    clientScope: "Corporate Headquarters & Boardrooms",
    location: "Cyber City & Gurgaon NCR",
  },
  {
    id: "proj-31",
    url: "/projects/corp_17.jpg",
    caption: "Agile Team Workspace — Glass Partitions & Acoustic Ceiling Clouds",
    category: "Commercial",
    projectName: "Corporate C-Suite",
    subProjectId: "corporate-c-suite",
    clientScope: "Corporate Headquarters & Boardrooms",
    location: "Cyber City & Gurgaon NCR",
  },
  {
    id: "proj-32",
    url: "/projects/corp_21.jpg",
    caption: "Senior Executive Cabin — Panoramic Skyline Views & Ergonomic Mesh Seating",
    category: "Commercial",
    projectName: "Corporate C-Suite",
    subProjectId: "corporate-c-suite",
    clientScope: "Corporate Headquarters & Boardrooms",
    location: "Cyber City & Gurgaon NCR",
  },
  {
    id: "proj-33",
    url: "/projects/corp_19.jpg",
    caption: "Executive Corridor & Gallery — Architectural Strip Lighting & Soundproofing",
    category: "Commercial",
    projectName: "Corporate C-Suite",
    subProjectId: "corporate-c-suite",
    clientScope: "Corporate Headquarters & Boardrooms",
    location: "Cyber City & Gurgaon NCR",
  },

  // ================= 04. HOSPITALITY =================
  // Trump Tower NCR
  {
    id: "proj-34",
    url: "/projects/trumptower_hero.jpg",
    caption: "Presidential Duplex Penthouse Great Hall — Architectural Double-Height Living",
    category: "Hospitality",
    projectName: "Trump Tower NCR",
    subProjectId: "trump-tower",
    clientScope: "Presidential Sky Penthouse & Lounge",
    location: "Sector 65, Gurgaon",
  },
  {
    id: "proj-35",
    url: "/projects/trumptower_1.jpg",
    caption: "Presidential Sky Lounge — Panoramic City Views & Ambient Cove Lighting",
    category: "Hospitality",
    projectName: "Trump Tower NCR",
    subProjectId: "trump-tower",
    clientScope: "Presidential Sky Penthouse & Lounge",
    location: "Sector 65, Gurgaon",
  },
  {
    id: "proj-36",
    url: "/projects/trumptower_2.jpg",
    caption: "Luxury Floating Cantilever Staircase & Frameless Double-Height Glazing",
    category: "Hospitality",
    projectName: "Trump Tower NCR",
    subProjectId: "trump-tower",
    clientScope: "Presidential Sky Penthouse & Lounge",
    location: "Sector 65, Gurgaon",
  },
  {
    id: "proj-37",
    url: "/projects/trumptower_3.jpg",
    caption: "Grand Master Suite — Bookmatched Italian Marble & Bespoke Dressing",
    category: "Hospitality",
    projectName: "Trump Tower NCR",
    subProjectId: "trump-tower",
    clientScope: "Presidential Sky Penthouse & Lounge",
    location: "Sector 65, Gurgaon",
  },
  // Five-Star Venues & ITC Maurya
  {
    id: "proj-38",
    url: "/projects/itc_maurya.jpg",
    caption: "ITC Maurya — Grand Presidential Suite Luxury Turnkey Renovation",
    category: "Hospitality",
    projectName: "ITC Maurya Suite",
    subProjectId: "itc-maurya",
    clientScope: "Five-Star Presidential Suite",
    location: "Diplomatic Enclave, New Delhi",
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
    console.warn("MySQL lead sync warning:", err);
  }

  return newLead;
}

export async function updateLeadStatus(id: string | number, status: LeadItem["status"]): Promise<void> {
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

  try {
    await fetch(`/api/leads?id=${id}`, { method: "DELETE" });
  } catch (err) {
    console.warn("MySQL delete sync warning:", err);
  }
}

/* ================= ALL PROJECTS CRUD FUNCTIONS (Edit, Delete, Add New, Reset) ================= */

export async function fetchProjectsFromDb(): Promise<AdminProjectItem[]> {
  try {
    const res = await fetch("/api/projects", { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.projects) && data.projects.length > 0) {
        // Blend DB projects with current store
        const current = getProjects();
        const dbMap = new Map<string, AdminProjectItem>();
        data.projects.forEach((p: AdminProjectItem) => {
          dbMap.set(p.url, p);
        });

        const merged = current.map((item) => dbMap.get(item.url) || item);
        // Also add any new DB projects not in local list
        data.projects.forEach((p: AdminProjectItem) => {
          if (!current.some((c) => c.url === p.url)) {
            merged.unshift(p);
          }
        });

        if (typeof window !== "undefined") {
          localStorage.setItem(ALL_PROJECTS_STORAGE_KEY, JSON.stringify(merged));
        }
        return merged;
      }
    }
  } catch (err) {
    console.warn("Could not fetch projects from MySQL API, using local storage cache:", err);
  }
  return getProjects();
}

/**
 * Gets ALL active projects (Initial 38 + Custom additions + Modifications - Deletions)
 */
export function getProjects(): AdminProjectItem[] {
  if (typeof window === "undefined") return INITIAL_PROJECTS;
  try {
    const raw = localStorage.getItem(ALL_PROJECTS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(ALL_PROJECTS_STORAGE_KEY, JSON.stringify(INITIAL_PROJECTS));
      return INITIAL_PROJECTS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_PROJECTS;
  } catch (err) {
    console.error("Error reading projects:", err);
    return INITIAL_PROJECTS;
  }
}

/**
 * Add a NEW Project
 */
export async function addProject(
  project: Omit<AdminProjectItem, "id" | "createdAt" | "isCustom">
): Promise<AdminProjectItem> {
  const newProject: AdminProjectItem = {
    ...project,
    id: `custom-${Date.now()}`,
    isCustom: true,
    createdAt: new Date().toISOString(),
  };

  if (typeof window !== "undefined") {
    try {
      const current = getProjects();
      const updated = [newProject, ...current];
      localStorage.setItem(ALL_PROJECTS_STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event("ss_projects_updated"));
    } catch (err) {
      console.error("Error saving new project in cache:", err);
    }
  }

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
    console.warn("MySQL project add sync warning:", err);
  }

  return newProject;
}

/**
 * EDIT / UPDATE an existing Project (Title, Caption, Scope, Location, Category, URL)
 */
export async function updateProject(
  id: string | number,
  updatedData: Partial<AdminProjectItem>
): Promise<AdminProjectItem | null> {
  let updatedProject: AdminProjectItem | null = null;

  if (typeof window !== "undefined") {
    try {
      const current = getProjects();
      const updated = current.map((item) => {
        if (String(item.id) === String(id) || (item.url && item.url === updatedData.url)) {
          updatedProject = { ...item, ...updatedData };
          return updatedProject;
        }
        return item;
      });

      localStorage.setItem(ALL_PROJECTS_STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event("ss_projects_updated"));
    } catch (err) {
      console.error("Error updating project in cache:", err);
    }
  }

  if (updatedProject !== null) {
    const payload: AdminProjectItem = updatedProject;
    try {
      await fetch("/api/projects", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.warn("MySQL project update sync warning:", err);
    }
  }

  return updatedProject;
}

/**
 * DELETE a Project (whether initial or custom)
 */
export async function deleteProject(id: string | number, url?: string): Promise<void> {
  if (typeof window !== "undefined") {
    try {
      const current = getProjects();
      const updated = current.filter(
        (item) => String(item.id) !== String(id) && (!url || item.url !== url)
      );
      localStorage.setItem(ALL_PROJECTS_STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event("ss_projects_updated"));
    } catch (err) {
      console.error("Error deleting project from cache:", err);
    }
  }

  try {
    const queryParam = url ? `url=${encodeURIComponent(url)}` : `id=${id}`;
    await fetch(`/api/projects?${queryParam}`, { method: "DELETE" });
  } catch (err) {
    console.warn("MySQL project delete sync warning:", err);
  }
}

/**
 * Reset all projects back to the studio defaults
 */
export function resetProjectsToDefault(): AdminProjectItem[] {
  if (typeof window !== "undefined") {
    localStorage.setItem(ALL_PROJECTS_STORAGE_KEY, JSON.stringify(INITIAL_PROJECTS));
    window.dispatchEvent(new Event("ss_projects_updated"));
  }
  return INITIAL_PROJECTS;
}

// Backward-compatible aliases
export const getCustomProjects = getProjects;
export const addCustomProject = addProject;
export const deleteCustomProject = (url: string, id?: string | number) => deleteProject(id || url, url);
