import realProjectsJson from "./realProjectsData.json";

export interface ProjectImage {
  id: string;
  url: string;
  title: string;
  caption: string;
  original_filename: string;
}

export interface RealProject {
  id: string;
  category_id: "penthouse" | "luxury_apartments" | "corporate";
  category_name: string;
  title: string;
  location: string;
  specs: string;
  description: string;
  badge: string;
  cover_image: string;
  images_count: number;
  images: ProjectImage[];
}

export interface ProjectCategoryTab {
  id: string;
  name: string;
  projectCount: number;
  photoCount: number;
}

export const REAL_PROJECTS: RealProject[] = realProjectsJson as RealProject[];

export const PROJECT_CATEGORIES: ProjectCategoryTab[] = [
  {
    id: "all",
    name: "All Works",
    projectCount: REAL_PROJECTS.length,
    photoCount: REAL_PROJECTS.reduce((sum, p) => sum + p.images_count, 0),
  },
  {
    id: "penthouse",
    name: "Penthouses",
    projectCount: REAL_PROJECTS.filter((p) => p.category_id === "penthouse").length,
    photoCount: REAL_PROJECTS.filter((p) => p.category_id === "penthouse").reduce((sum, p) => sum + p.images_count, 0),
  },
  {
    id: "luxury_apartments",
    name: "Luxury Apartments",
    projectCount: REAL_PROJECTS.filter((p) => p.category_id === "luxury_apartments").length,
    photoCount: REAL_PROJECTS.filter((p) => p.category_id === "luxury_apartments").reduce((sum, p) => sum + p.images_count, 0),
  },
  {
    id: "corporate",
    name: "Corporate & Commercial",
    projectCount: REAL_PROJECTS.filter((p) => p.category_id === "corporate").length,
    photoCount: REAL_PROJECTS.filter((p) => p.category_id === "corporate").reduce((sum, p) => sum + p.images_count, 0),
  },
];
