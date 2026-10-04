import type { Metadata } from "next";
import PressView from "@/components/PressView";

export const metadata: Metadata = {
  title: "Interior Design Press & Media | SS Interiors",
  description:
    "Read press coverage, magazine spreads, awards, and design editorial features highlighting SS Interiors across Architectural Digest, Elle Decor, and leading publications.",
};

export default function PressPage() {
  return <PressView />;
}
