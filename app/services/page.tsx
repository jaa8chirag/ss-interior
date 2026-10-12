import type { Metadata } from "next";
import ServicesView from "@/components/ServicesView";

export const metadata: Metadata = {
  title: "Luxury Interior Design Services",
  description:
    "Explore SS Interiors' comprehensive services for luxury apartments, expansive farmhouses, corporate offices, and boutique hospitality spaces across India.",
};

export default function ServicesPage() {
  return <ServicesView />;
}
