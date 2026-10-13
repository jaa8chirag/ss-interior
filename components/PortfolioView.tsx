"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Expand, ArrowRight, Home, Trees, Briefcase, Sparkles, CheckCircle2 } from "lucide-react";
import ImageLightbox from "./ImageLightbox";
import { SHOWCASE_SECTIONS, ADDITIONAL_PROJECTS, SITE } from "@/lib/site";

interface CategoryMeta {
  id: string;
  key: "Residential" | "Farmhouses" | "Commercial" | "Hospitality";
  number: string;
  title: string;
  tagline: string;
  description: string;
  hallmarks: string[];
  icon: typeof Home;
}

const CATEGORY_DEFINITIONS: CategoryMeta[] = [
  {
    id: "residential",
    key: "Residential",
    number: "01",
    title: "Luxury Residential Interiors",
    tagline: "Bespoke Penthouses, Duplexes & Ultra-Luxury Residences",
    description:
      "Masterfully curated residential sanctuaries defined by hand-selected bookmatched Italian statuary marble, custom architectural millwork, bespoke walk-in suites, and ambient cove lighting across NCR's most prestigious pin codes.",
    hallmarks: [
      "DLF Camellias",
      "DLF Magnolias",
      "The Crest Penthouses",
      "Italian Bookmatched Marble",
      "Curved Master Bed Suites",
      "Fluted Timber Joinery",
    ],
    icon: Home,
  },
  {
    id: "farmhouses",
    key: "Farmhouses",
    number: "02",
    title: "Country Estates & Farmhouses",
    tagline: "Expansive Sanctuaries in Harmony with Nature",
    description:
      "Specialising in sprawling countryside retreats, private villas, and estate architecture. We integrate double-height vaulted salons, hand-chiseled natural stone, transitional verandas, green onyx en-suites, and Vastu-aligned spatial planning.",
    hallmarks: [
      "DLF Aralias",
      "Chhatarpur Estates",
      "Sultanpur Country Villas",
      "Double-Height Great Halls",
      "Green Onyx Vanities",
      "Hand-Chiseled Stone",
    ],
    icon: Trees,
  },
  {
    id: "commercial",
    key: "Commercial",
    number: "03",
    title: "Executive Workspaces & Offices",
    tagline: "Corporate Headquarters, Boardrooms & C-Suite Leadership Suites",
    description:
      "High-performance executive environments combining acoustic glass partitions, fluted timber acoustic wall paneling, Italian marble conference tables, bespoke executive credenzas, and ergonomic leadership zones.",
    hallmarks: [
      "DLF The Crest Corporate HQ",
      "C-Suite Leadership Suites",
      "Acoustic Glass Partitions",
      "Marble Conference Settings",
      "Director Executive Cabins",
      "Collaborative Pods",
    ],
    icon: Briefcase,
  },
  {
    id: "hospitality",
    key: "Hospitality",
    number: "04",
    title: "Luxury Hospitality & Turnkey Execution",
    tagline: "Five-Star Presidential Suites, Sky Lounges & Experiential Venues",
    description:
      "From five-star presidential suites like ITC Maurya to the Trump Tower sky lounge and illuminated honey onyx staircases, we deliver flawless turnkey execution from bare shell to final handover.",
    hallmarks: [
      "ITC Maurya Presidential Suite",
      "Trump Tower NCR Sky Lounge",
      "Honey Onyx Floating Staircase",
      "Signature Fluted Bars",
      "Double-Height Cantilevers",
      "Turnkey Handover",
    ],
    icon: Sparkles,
  },
];

export default function PortfolioView() {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  // Lightbox State
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<{ url: string; caption: string }[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Group all projects by category with full metadata
  const categorizedProjects = useMemo(() => {
    return CATEGORY_DEFINITIONS.map((catDef) => {
      const showcaseSec = SHOWCASE_SECTIONS.find((s) => s.id === catDef.id);
      const showcaseItems = showcaseSec
        ? showcaseSec.gallery.map((g) => ({
            url: g.url,
            caption: g.caption,
            category: catDef.key,
            sectionId: catDef.id,
            sectionTitle: catDef.title,
          }))
        : [];

      const additionalItems = ADDITIONAL_PROJECTS.filter(
        (p) => p.category === catDef.key
      ).map((p) => ({
        url: p.url,
        caption: p.caption,
        category: catDef.key,
        sectionId: catDef.id,
        sectionTitle: catDef.title,
      }));

      return {
        ...catDef,
        projects: [...showcaseItems, ...additionalItems],
      };
    });
  }, []);

  // Total project count across all categories
  const totalProjectsCount = useMemo(() => {
    return categorizedProjects.reduce((acc, cat) => acc + cat.projects.length, 0);
  }, [categorizedProjects]);

  // Flattened list for "All" lightbox browsing
  const allProjectsFlat = useMemo(() => {
    return categorizedProjects.flatMap((cat) => cat.projects);
  }, [categorizedProjects]);

  // Smooth hash scroll support (e.g. /portfolio#farmhouses)
  useEffect(() => {
    const handleHash = () => {
      if (typeof window !== "undefined" && window.location.hash) {
        const hash = window.location.hash.replace("#", "");
        const matched = CATEGORY_DEFINITIONS.find((c) => c.id === hash);
        if (matched) {
          setActiveFilter(matched.id);
          const el = document.getElementById(matched.id);
          if (el) {
            setTimeout(() => {
              el.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 100);
          }
        }
      }
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const openLightboxForList = (
    list: { url: string; caption: string }[],
    index: number
  ) => {
    setLightboxImages(list.map((p) => ({ url: p.url, caption: p.caption })));
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const visibleCategories = useMemo(() => {
    if (activeFilter === "all") return categorizedProjects;
    return categorizedProjects.filter((c) => c.id === activeFilter);
  }, [categorizedProjects, activeFilter]);

  return (
    <div className="pt-24 pb-20 bg-[#faf8f5] text-fg min-h-screen">
      {/* ================= PAGE HEADER ================= */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 pt-10 pb-6 text-center">
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-fg leading-tight">
          Architectural & Interior Showcase
        </h1>

        {/* ================= HIERARCHY FILTER PILLS ================= */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          <button
            onClick={() => setActiveFilter("all")}
            className={`rounded-full px-5 py-2.5 text-xs uppercase tracking-widest transition-all cursor-pointer font-medium flex items-center gap-2 ${
              activeFilter === "all"
                ? "gold-bg text-white shadow-md shadow-gold/25"
                : "bg-white text-muted hover:text-fg hover:border-gold border border-line shadow-xs"
            }`}
          >
            <span>All Domains</span>
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] ${
                activeFilter === "all" ? "bg-white/20 text-white" : "bg-line/60 text-muted"
              }`}
            >
              {totalProjectsCount}
            </span>
          </button>

          {categorizedProjects.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeFilter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`rounded-full px-5 py-2.5 text-xs uppercase tracking-widest transition-all cursor-pointer font-medium flex items-center gap-2 ${
                  isActive
                    ? "gold-bg text-white shadow-md shadow-gold/25"
                    : "bg-white text-muted hover:text-fg hover:border-gold border border-line shadow-xs"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>
                  {cat.number} · {cat.title.split(" ")[0]} {cat.key === "Farmhouses" ? "Estates" : ""}
                </span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] ${
                    isActive ? "bg-white/20 text-white" : "bg-line/60 text-muted"
                  }`}
                >
                  {cat.projects.length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Quick Category Summary Cards (when "all" is active) */}
        {activeFilter === "all" && (
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-6xl mx-auto text-left">
            {categorizedProjects.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="group p-4 rounded-sm border border-line bg-white/90 hover:border-gold hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-xs text-gold font-medium tracking-widest uppercase">
                      Category {cat.number}
                    </span>
                    <span className="text-[11px] font-mono text-muted bg-[#faf8f5] px-2 py-0.5 rounded-full border border-line/60">
                      {cat.projects.length} works
                    </span>
                  </div>
                  <h3 className="font-serif text-sm sm:text-base font-normal text-fg group-hover:text-gold transition-colors leading-snug">
                    {cat.title}
                  </h3>
                </div>
                <div className="mt-3 pt-2 border-t border-line/50 flex items-center justify-between text-[11px] text-muted">
                  <span className="truncate">{cat.hallmarks[0]}</span>
                  <ArrowRight className="h-3 w-3 text-gold shrink-0 group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
            ))}
          </div>
        )}
      </section>

      {/* ================= CATEGORY HIERARCHY SECTIONS ================= */}
      <div className="space-y-16 sm:space-y-24 mt-6">
        {visibleCategories.map((category) => {
          const Icon = category.icon;
          return (
            <section
              key={category.id}
              id={category.id}
              className="scroll-mt-24 mx-auto max-w-7xl px-6 lg:px-10"
            >
              {/* Category Chapter Banner */}
              <div className="border border-line/90 rounded-sm bg-white p-6 sm:p-10 shadow-xs mb-8 lg:mb-10">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-line">
                  <div className="space-y-2.5 max-w-3xl">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/10 border border-gold/40 text-gold text-xs font-serif font-medium tracking-widest uppercase">
                        <Icon className="h-3.5 w-3.5" />
                        Domain {category.number}
                      </span>
                      <span className="text-xs uppercase tracking-[0.25em] text-muted font-sans font-medium">
                        SS Interiors Portfolio
                      </span>
                    </div>

                    <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-fg leading-tight">
                      {category.title}
                    </h2>

                    <p className="font-serif text-base sm:text-lg italic text-gold">
                      {category.tagline}
                    </p>

                    <p className="text-sm leading-relaxed text-muted font-light pt-1">
                      {category.description}
                    </p>
                  </div>

                  {/* Project Count Badge & Direct Contact */}
                  <div className="flex lg:flex-col items-center lg:items-end justify-between gap-3 shrink-0">
                    <div className="text-right">
                      <div className="font-serif text-3xl lg:text-4xl text-fg font-light">
                        {category.projects.length}
                        <span className="text-gold text-xl ml-1 font-serif">Projects</span>
                      </div>
                      <span className="text-[11px] uppercase tracking-wider text-muted block">
                        Turnkey Executed
                      </span>
                    </div>

                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] px-4 py-2 bg-[#17181c] text-white hover:bg-gold transition-colors font-medium rounded-xs shadow-xs"
                    >
                      <span>Commission Project</span>
                      <ArrowRight className="h-3 w-3 text-gold" />
                    </Link>
                  </div>
                </div>

                {/* Hallmark Badges Bar */}
                <div className="pt-5 flex flex-wrap items-center gap-2 sm:gap-2.5">
                  <span className="text-xs uppercase tracking-wider text-muted font-medium mr-1 flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-gold" />
                    Hallmarks & Landmarks:
                  </span>
                  {category.hallmarks.map((badge) => (
                    <span
                      key={badge}
                      className="px-3 py-1 rounded-full bg-[#faf8f5] border border-line text-[11px] sm:text-xs text-fg/80 font-medium tracking-wide shadow-2xs hover:border-gold transition-colors"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              {/* ================= GRAND BADA BADA IMAGE CARDS (2-COLUMN LUXURY GRID) ================= */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
                {category.projects.map((project, pIdx) => (
                  <div
                    key={`${project.url}-${pIdx}`}
                    onClick={() => openLightboxForList(category.projects, pIdx)}
                    className="group relative flex flex-col overflow-hidden rounded-sm border border-line bg-white cursor-pointer shadow-sm hover:border-gold hover:shadow-2xl transition-all duration-500"
                  >
                    {/* Grand Large Image Container */}
                    <div className="relative h-[440px] sm:h-[520px] lg:h-[560px] xl:h-[600px] w-full overflow-hidden bg-[#ede8df]">
                      <img
                        src={project.url}
                        alt={project.caption}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
                      />

                      {/* Top Corner Pill Badges */}
                      <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                        <span className="bg-white/95 backdrop-blur-md border border-gold/40 px-3 py-1 text-[11px] uppercase tracking-wider text-gold font-sans font-medium shadow-sm">
                          {category.key} · {category.number}
                        </span>
                        <span className="bg-black/60 backdrop-blur-md border border-white/20 text-white/90 px-2.5 py-1 text-[10px] font-mono tracking-wider shadow-sm">
                          #{pIdx + 1 < 10 ? `0${pIdx + 1}` : pIdx + 1}
                        </span>
                      </div>

                      {/* Fullscreen Expand Icon Button */}
                      <div className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-md border border-line p-2.5 text-fg/80 group-hover:bg-gold group-hover:text-white group-hover:border-gold transition-all shadow-md rounded-xs">
                        <Expand className="h-4 w-4" />
                      </div>

                      {/* Gradient Backdrop on bottom of photo for cinematic luxury contrast */}
                      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none" />

                      {/* Inside Image Bottom Overlay */}
                      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 z-10 space-y-2 pointer-events-none">
                        <span className="text-[11px] uppercase tracking-[0.3em] text-gold/90 font-sans font-semibold drop-shadow-sm block">
                          Turnkey Architecture & Interior Fit-Out
                        </span>
                        <h3 className="font-serif text-lg sm:text-2xl text-white font-light leading-snug drop-shadow-md group-hover:text-gold transition-colors">
                          {project.caption}
                        </h3>
                      </div>
                    </div>

                    {/* Bottom Metadata Bar */}
                    <div className="p-4 sm:p-5 bg-white border-t border-line flex items-center justify-between text-xs text-muted">
                      <div className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-gold inline-block" />
                        <span className="font-serif text-fg/80 font-normal">
                          {category.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-gold font-medium group-hover:underline">
                        <span>Expand High-Resolution</span>
                        <ArrowRight className="h-3 w-3" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* ================= FOOTER CTA SECTION ================= */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 mt-20">
        <div className="border border-line bg-white p-8 sm:p-14 text-center rounded-sm shadow-sm space-y-6">
          <span className="text-xs uppercase tracking-[0.35em] text-gold font-sans font-medium">
            Turnkey Design & Execution
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-fg max-w-2xl mx-auto leading-tight">
            Ready to Begin Your Architectural Journey?
          </h2>
          <p className="text-sm text-muted max-w-xl mx-auto font-light leading-relaxed">
            Whether a luxury duplex in DLF Camellias, an expansive country farmhouse, or a C-Suite corporate headquarters, SS Interiors provides unified turnkey execution from first blueprint to final styling.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-[#17181c] text-white hover:bg-gold transition-colors text-xs uppercase tracking-[0.22em] font-medium rounded-xs shadow-md"
            >
              <span>Schedule Architectural Consultation</span>
              <ArrowRight className="h-3.5 w-3.5 text-gold" />
            </Link>
            <a
              href={`tel:${SITE.phone.replace(/[^0-9+]/g, "")}`}
              className="px-6 py-3.5 border border-line hover:border-gold text-fg/80 hover:text-gold transition-colors text-xs uppercase tracking-[0.22em] font-medium rounded-xs bg-white shadow-xs"
            >
              Call {SITE.phone}
            </a>
          </div>
        </div>
      </section>

      {/* ================= LIGHTBOX MODAL ================= */}
      <ImageLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={lightboxImages}
        currentIndex={lightboxIndex}
        onNavigate={(idx) => setLightboxIndex(idx)}
      />
    </div>
  );
}

