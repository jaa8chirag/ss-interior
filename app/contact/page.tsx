import type { Metadata } from "next";
import ContactPageView from "@/components/ContactPageView";

export const metadata: Metadata = {
  title: "Contact SS Interiors — Interior Designers in Gurgaon & Delhi NCR",
  description:
    "Schedule a consultation with SS Interiors. Connect with our principal architectural designers for luxury residential, farmhouse, corporate, and hospitality projects.",
};

export default function ContactPage() {
  return <ContactPageView />;
}
