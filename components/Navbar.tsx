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
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = pathname === "/";
  const showSolidHeader = !isHome || (mounted && (scrolled || open));

  return (
    <header
      suppressHydrationWarning
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        showSolidHeader
          ? "border-b border-line/80 bg-[#faf8f5]/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-24 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-10 py-[2px]">
        {/* Brand logo & tagline */}
        <Link href="/" aria-label="SS Interiors Home" className="flex items-center py-[2px]">
          <Brand size="xl" showText={false} />
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
                    showSolidHeader
                      ? isActive
                        ? "text-gold font-bold"
                        : "text-fg/80 hover:text-gold"
                      : isActive
                        ? "text-white font-bold drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]"
                        : "text-white/95 hover:text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]"
                  }`}
                >
                  {n.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className={`absolute -bottom-2 inset-x-0 h-0.5 ${
                        showSolidHeader ? "bg-gold" : "bg-white"
                      }`}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Action button & direct phone */}
        <div suppressHydrationWarning className="hidden items-center gap-6 lg:flex">
          <a
            suppressHydrationWarning
            href={`tel:${SITE.phone.replace(/\s+/g, "")}`}
            className={`flex items-center gap-2 text-xs uppercase tracking-widest transition-colors ${
              showSolidHeader
                ? "text-fg hover:text-gold"
                : "text-white hover:text-white/80 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]"
            }`}
          >
            <Phone className={`h-3.5 w-3.5 ${showSolidHeader ? "text-[#846326]" : "text-white drop-shadow-sm"}`} />
            <span className="hidden xl:inline font-medium">{SITE.phone}</span>
          </a>
          <Link
            suppressHydrationWarning
            href="/contact"
            className="gold-bg px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-md shadow-gold/20 transition-all duration-300 hover:brightness-105"
          >
            Contact
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          aria-label="Toggle Navigation Menu"
          onClick={() => setOpen((o) => !o)}
          className={`border p-2.5 lg:hidden rounded-sm transition-colors ${
            showSolidHeader
              ? "border-line bg-white text-fg hover:border-gold"
              : "border-white/40 bg-black/40 text-white hover:border-white"
          }`}
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
            className="overflow-hidden border-b border-line bg-[#faf8f5] text-fg lg:hidden shadow-xl"
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
                          isActive ? "gold-text font-bold" : "text-fg/80 hover:text-gold"
                        }`}
                      >
                        {n.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <div className="pt-6 border-t border-line space-y-4" onClick={() => setOpen(false)}>
                <a
                  href={`tel:${SITE.phone.replace(/\s+/g, "")}`}
                  className="flex items-center gap-3 text-sm text-gold tracking-wider"
                >
                  <Phone className="h-4 w-4" /> {SITE.phone}
                </a>
                <Link
                  href="/contact"
                  className="block text-center gold-bg py-3 text-xs font-semibold uppercase tracking-[0.25em] text-white rounded-xs shadow-md"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
