"use client";

import Link from "next/link";
import { ArrowUp, Mail, Phone, MapPin } from "lucide-react";
import Brand from "./Brand";
import { NAV, SITE, VENDOR_NOTICE } from "@/lib/site";

function InstagramIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function LinkedinIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-line/50 bg-[#1e2025] text-fg">
      {/* Top Banner / Vendor Notice Bar */}
      <div className="border-b border-line/30 bg-[#25282f]/80 px-6 py-6">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-gold">
              {VENDOR_NOTICE.title}
            </span>
            <p className="text-xs text-muted max-w-4xl leading-relaxed">
              {VENDOR_NOTICE.text}
            </p>
          </div>
          <a
            href="mailto:info@ssinteriors.in?subject=VENDOR%20Partnership%20Inquiry"
            className="shrink-0 border border-gold/40 px-4 py-2 text-xs uppercase tracking-widest text-gold hover:bg-gold hover:text-[#202328] transition-colors"
          >
            Send Profile
          </a>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand & Studio Info */}
          <div className="lg:col-span-5 space-y-6">
            <Link href="/" className="inline-block">
              <Brand size="lg" showText={true} />
            </Link>
            <p className="text-sm leading-relaxed text-muted max-w-sm">
              {SITE.motto}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="h-9 w-9 rounded-full border border-line/60 flex items-center justify-center text-muted hover:border-gold hover:text-gold transition-colors"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href={SITE.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="h-9 w-9 rounded-full border border-line/60 flex items-center justify-center text-muted hover:border-gold hover:text-gold transition-colors"
              >
                <FacebookIcon className="h-4 w-4" />
              </a>
              <a
                href={SITE.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="h-9 w-9 rounded-full border border-line/60 flex items-center justify-center text-muted hover:border-gold hover:text-gold transition-colors"
              >
                <LinkedinIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-muted">
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    className="hover:text-gold-light transition-colors flex items-center gap-2"
                  >
                    <span className="text-gold/40">›</span> {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Studio Coordinates */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              Studio Location
            </h4>
            <div className="space-y-3 text-sm text-muted">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-gold shrink-0 mt-1" />
                <p className="leading-relaxed">
                  {SITE.address}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-gold shrink-0" />
                <a href={`tel:${SITE.phone.replace(/\s+/g, "")}`} className="hover:text-gold transition-colors">
                  {SITE.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-gold shrink-0" />
                <a href={`mailto:${SITE.email}`} className="hover:text-gold transition-colors">
                  {SITE.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Back to Top */}
        <div className="mt-16 pt-8 border-t border-line/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
          <p>© {new Date().getFullYear()} {SITE.name}. All Rights Reserved. Since {SITE.since}.</p>
          <div className="flex items-center gap-6">
            <Link href="/contact" className="hover:text-gold transition-colors">
              Terms &amp; Conditions
            </Link>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 hover:text-gold transition-colors uppercase tracking-widest text-[11px]"
            >
              Back to Top <ArrowUp className="h-3.5 w-3.5 text-gold" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
