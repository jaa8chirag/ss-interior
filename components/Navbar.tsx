"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import Brand from "./Brand";
import { NAV, SITE } from "@/lib/site";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open
          ? "border-b border-line/60 bg-[#22252a]/95 backdrop-blur-xl shadow-xl shadow-black/30"
          : "bg-gradient-to-b from-[#1b1d22]/90 via-[#1b1d22]/40 to-transparent"
      }`}
    >
      <nav className="mx-auto flex h-24 max-w-7xl items-center justify-between px-6 lg:px-10">
        {/* Brand logo & tagline */}
        <Link href="/" aria-label="SS Interiors Home" className="flex items-center">
          <Brand size="md" showText={false} />
        </Link>

        {/* Desktop Navigation Links */}
        <ul className="hidden items-center gap-8 lg:flex">
          {NAV.map((n) => {
            const isActive = pathname === n.href;
            return (
              <li key={n.href}>
                <Link
                  href={n.href}
                  className={`relative text-xs uppercase tracking-[0.22em] transition-colors duration-300 ${
                    isActive
                      ? "text-white font-bold"
                      : "text-white/90 hover:text-white"
                  }`}
                >
                  {n.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute -bottom-2 inset-x-0 h-0.5 bg-white"
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Action button & direct phone */}
        <div className="hidden items-center gap-6 lg:flex">
          <a
            href={`tel:${SITE.phone.replace(/\s+/g, "")}`}
            className="flex items-center gap-2 text-xs uppercase tracking-widest text-white hover:text-white/80 transition-colors"
          >
            <Phone className="h-3.5 w-3.5 text-white" />
            <span className="hidden xl:inline text-white font-medium">{SITE.phone}</span>
          </a>
          <Link
            href="/contact"
            className="gold-bg px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#22252a] shadow-lg shadow-gold/10 transition-all duration-300 hover:brightness-110 hover:shadow-gold/25"
          >
            Consultation
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          aria-label="Toggle Navigation Menu"
          onClick={() => setOpen((o) => !o)}
          className="border border-line/60 bg-[#282c30] p-2.5 text-white lg:hidden rounded-sm hover:border-white transition-colors"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden border-b border-line/60 bg-[#22252a] lg:hidden"
          >
            <div className="px-6 py-8 space-y-5">
              <ul className="space-y-3" onClick={() => setOpen(false)}>
                {NAV.map((n) => {
                  const isActive = pathname === n.href;
                  return (
                    <li key={n.href}>
                      <Link
                        href={n.href}
                        className={`block py-2 font-serif text-2xl tracking-wide transition-colors ${
                          isActive ? "gold-text font-bold" : "text-fg/90 hover:text-gold"
                        }`}
                      >
                        {n.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <div className="pt-6 border-t border-line/40 space-y-4" onClick={() => setOpen(false)}>
                <a
                  href={`tel:${SITE.phone.replace(/\s+/g, "")}`}
                  className="flex items-center gap-3 text-sm text-gold tracking-wider"
                >
                  <Phone className="h-4 w-4" /> {SITE.phone}
                </a>
                <Link
                  href="/contact"
                  className="block text-center gold-bg py-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#22252a]"
                >
                  Book Free Consultation
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
