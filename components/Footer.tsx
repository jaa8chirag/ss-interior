"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUp, Mail, Phone, MapPin } from "lucide-react";
import Brand from "./Brand";
import { NAV, SITE, VENDOR_NOTICE } from "@/lib/site";
import { getSiteSettings, fetchSiteSettingsFromApi } from "@/lib/adminStore";

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

function YoutubeIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

function WhatsAppIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
    </svg>
  );
}

export default function Footer() {
  const [settings, setSettings] = useState({
    instagram: SITE.instagram,
    facebook: SITE.facebook,
    linkedin: SITE.linkedin,
    youtube: SITE.youtube,
    whatsapp: SITE.whatsapp,
  });

  useEffect(() => {
    const syncSettings = () => {
      const current = getSiteSettings();
      setSettings({
        instagram: current.instagram || SITE.instagram,
        facebook: current.facebook || SITE.facebook,
        linkedin: current.linkedin || SITE.linkedin,
        youtube: current.youtube || SITE.youtube,
        whatsapp: current.whatsapp || SITE.whatsapp,
      });
    };
    syncSettings();
    fetchSiteSettingsFromApi().then((s) => {
      if (s) {
        setSettings({
          instagram: s.instagram || SITE.instagram,
          facebook: s.facebook || SITE.facebook,
          linkedin: s.linkedin || SITE.linkedin,
          youtube: s.youtube || SITE.youtube,
          whatsapp: s.whatsapp || SITE.whatsapp,
        });
      }
    });
    window.addEventListener("ss_settings_updated", syncSettings);
    return () => window.removeEventListener("ss_settings_updated", syncSettings);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-line bg-[#f0ece5] text-fg content-auto">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand & Studio Info */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-block">
              <Brand size="xl" showText={false} />
            </Link>
            <p className="text-sm leading-relaxed text-muted max-w-sm font-light">
              {SITE.motto}
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {settings.instagram && (
                <a
                  href={settings.instagram}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="h-9 w-9 rounded-full border border-line bg-white flex items-center justify-center text-fg hover:border-gold hover:text-gold hover:bg-[#faf8f5] transition-all shadow-xs"
                >
                  <InstagramIcon className="h-4 w-4 text-fg" />
                </a>
              )}
              {settings.facebook && (
                <a
                  href={settings.facebook}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="h-9 w-9 rounded-full border border-line bg-white flex items-center justify-center text-fg hover:border-gold hover:text-gold hover:bg-[#faf8f5] transition-all shadow-xs"
                >
                  <FacebookIcon className="h-4 w-4 text-fg" />
                </a>
              )}
              {settings.linkedin && (
                <a
                  href={settings.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="h-9 w-9 rounded-full border border-line bg-white flex items-center justify-center text-fg hover:border-gold hover:text-gold hover:bg-[#faf8f5] transition-all shadow-xs"
                >
                  <LinkedinIcon className="h-4 w-4 text-fg" />
                </a>
              )}
              {settings.youtube && (
                <a
                  href={settings.youtube}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="YouTube"
                  className="h-9 w-9 rounded-full border border-line bg-white flex items-center justify-center text-fg hover:border-gold hover:text-gold hover:bg-[#faf8f5] transition-all shadow-xs"
                >
                  <YoutubeIcon className="h-4 w-4 text-fg" />
                </a>
              )}
              {settings.whatsapp && (
                <a
                  href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp"
                  className="h-9 w-9 rounded-full border border-line bg-white flex items-center justify-center text-fg hover:border-gold hover:text-gold hover:bg-[#faf8f5] transition-all shadow-xs"
                >
                  <WhatsAppIcon className="h-4 w-4 text-fg" />
                </a>
              )}
            </div>
          </div>

          {/* Company Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm text-muted font-light">
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    className="hover:text-gold transition-colors flex items-center gap-2"
                  >
                    <span className="text-gold">›</span> {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore Links */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm text-muted font-light">
              <li>
                <Link
                  href="/services#residential"
                  className="hover:text-gold transition-colors flex items-center gap-2"
                >
                  <span className="text-gold">›</span> Luxury Residential
                </Link>
              </li>
              <li>
                <Link
                  href="/services#farmhouses"
                  className="hover:text-gold transition-colors flex items-center gap-2"
                >
                  <span className="text-gold">›</span> Country Estates
                </Link>
              </li>
              <li>
                <Link
                  href="/services#commercial"
                  className="hover:text-gold transition-colors flex items-center gap-2"
                >
                  <span className="text-gold">›</span> Commercial &amp; Offices
                </Link>
              </li>
              <li>
                <Link
                  href="/services#hospitality"
                  className="hover:text-gold transition-colors flex items-center gap-2"
                >
                  <span className="text-gold">›</span> Hospitality &amp; Turnkey
                </Link>
              </li>
            </ul>
          </div>

          {/* Studio Coordinates */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              Studio Location
            </h4>
            <div className="space-y-3 text-sm text-muted font-light">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-[#846326] shrink-0 mt-1" />
                <p className="leading-relaxed">
                  {SITE.address}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-[#846326] shrink-0" />
                <a href={`tel:${SITE.phone.replace(/\s+/g, "")}`} className="hover:text-gold transition-colors">
                  {SITE.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-[#846326] shrink-0" />
                <a href={`mailto:${SITE.email}`} className="hover:text-gold transition-colors">
                  {SITE.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Back to Top */}
        <div className="mt-16 pt-8 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
          <p>© {new Date().getFullYear()} {SITE.name}. All Rights Reserved. Since {SITE.since}.</p>
          <div className="flex items-center gap-6">
            <Link href="/contact" className="hover:text-gold transition-colors">
              Terms &amp; Conditions
            </Link>
            <button
              onClick={scrollToTop}
              suppressHydrationWarning
              className="flex items-center gap-2 text-fg hover:text-gold transition-colors uppercase tracking-widest text-[11px] font-medium cursor-pointer"
            >
              Back to Top <ArrowUp className="h-3.5 w-3.5 text-[#846326]" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
