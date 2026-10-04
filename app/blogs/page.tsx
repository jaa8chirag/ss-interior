import type { Metadata } from "next";
import BlogsView from "@/components/BlogsView";

export const metadata: Metadata = {
  title: "Modern Interior Design Trends & Blogs | SS Interiors",
  description:
    "Read insights on colour psychology, modern corporate workspaces, luxury farmhouses, and architectural trends from SS Interiors.",
};

export default function BlogsPage() {
  return <BlogsView />;
}
