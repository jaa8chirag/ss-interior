import type { Metadata } from "next";
import ProductSourcingView from "@/components/ProductSourcingView";

export const metadata: Metadata = {
  title: "Product Sourcing & Bespoke Furniture | SS Interiors",
  description:
    "Curated luxury furniture, imported Italian marbles, statement lighting, and bespoke joinery hand-selected from premier European and global ateliers.",
};

export default function ProductSourcingPage() {
  return <ProductSourcingView />;
}
