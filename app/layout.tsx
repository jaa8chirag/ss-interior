import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Intro from "@/components/Intro";

const outfit = Outfit({ variable: "--font-outfit", subsets: ["latin"] });
const playfair = Playfair_Display({ variable: "--font-playfair", subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "SS Interiors — Interior Design Since 2016",
    template: "%s | SS Interiors",
  },
  description:
    "SS Interiors designs and delivers residential, commercial and hospitality interiors — concept to handover, since 2016.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning className={`${outfit.variable} ${playfair.variable}`}>
      <body suppressHydrationWarning className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
