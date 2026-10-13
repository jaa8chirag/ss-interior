import type { Metadata } from "next";
import AdminPortalView from "@/components/AdminPortalView";

export const metadata: Metadata = {
  title: "Admin Portal | SS Interiors",
  description: "Internal management studio portal for client inquiries and project portfolio updates.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return <AdminPortalView />;
}
