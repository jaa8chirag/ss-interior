import type { Metadata } from "next";
import PortfolioView from "@/components/PortfolioView";

export const metadata: Metadata = {
  title: "Interior Design & Architecture Projects",
  description:
    "Explore SS Interiors' curated showcase of luxury apartments, bespoke country farmhouses, corporate workspaces, and premier hospitality projects across India.",
};

export default function ProjectsPage() {
  return <PortfolioView />;
}
