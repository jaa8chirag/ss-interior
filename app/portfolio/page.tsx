import type { Metadata } from "next";
import PortfolioView from "@/components/PortfolioView";

export const metadata: Metadata = {
  title: "Luxury Interior Design Portfolio",
  description:
    "Explore SS Interiors' curated portfolio of luxury apartments, expansive farmhouses, corporate offices, and boutique hospitality spaces across India.",
};

export default function PortfolioPage() {
  return <PortfolioView />;
}
