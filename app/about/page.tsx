import type { Metadata } from "next";
import AboutView from "@/components/AboutView";

export const metadata: Metadata = {
  title: "About SS Interiors — Interior Design Experts in Gurgaon & Delhi NCR",
  description:
    "Learn about SS Interiors, established in 2016. Passionate interior architects creating luxury residential, farmhouse, and commercial spaces.",
};

export default function AboutPage() {
  return <AboutView />;
}
