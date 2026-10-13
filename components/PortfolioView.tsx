"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Expand, ArrowRight } from "lucide-react";
import ImageLightbox from "./ImageLightbox";
import { SHOWCASE_SECTIONS, ADDITIONAL_PROJECTS, SITE, VENDOR_NOTICE } from "@/lib/site";

const CATEGORIES = ["All", "Residential", "Commercial", "Farmhouses", "Hospitality"] as const;

export default function PortfolioView() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Lightbox State
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<{ url: string; caption: string }[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Combine showcase sections + additional projects
  const allProjects = useMemo(() => {
    const showcaseItems = SHOWCASE_SECTIONS.flatMap((sec) =>
      sec.gallery.map((item) => ({
        ...item,
        category: sec.category,
        sectionId: sec.id,
        sectionTitle: sec.title,
      }))
    );
    return [...showcaseItems, ...ADDITIONAL_PROJECTS];
  }, []);

  const filteredProjects = useMemo(() => {
    if (selectedCategory === "All") return allProjects;
    return allProjects.filter((p) => p.category === selectedCategory);
  }, [allProjects, selectedCategory]);

  const openLightbox = (index: number) => {
    setLightboxImages(filteredProjects.map((p) => ({ url: p.url, caption: p.caption })));
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="pt-28 pb-20 bg-[#faf8f5] text-fg">
      {/* Page Header */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-12 text-center">
        <span className="text-xs uppercase tracking-[0.4em] text-gold font-sans font-medium">
          Our Projects
        </span>
        <h1 className="mt-3 font-serif text-4xl sm:text-6xl font-light text-fg">
          Architectural Projects
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted font-light">
          A curated showcase of bespoke residences, expansive country estates, corporate headquarters, and high-touch hospitality venues designed and executed by SS Interiors since 2016.
        </p>

        {/* Category Filter Pills */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-5 py-2 text-xs uppercase tracking-widest transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "gold-bg text-white font-semibold shadow-md shadow-gold/20"
                  : "bg-white text-muted hover:text-fg hover:border-gold border border-line shadow-xs"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, idx) => (
            <div
              key={`${project.url}-${idx}`}
              onClick={() => openLightbox(idx)}
              className="group relative flex flex-col justify-between overflow-hidden rounded-sm border border-line bg-white cursor-pointer shadow-sm hover:border-gold hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-80 sm:h-96 w-full overflow-hidden bg-[#ede8df]">
                <img
                  src={project.url}
                  alt={project.caption}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute top-4 left-4">
                  <span className="bg-white/95 backdrop-blur-sm border border-gold/40 px-2.5 py-1 text-[10px] uppercase tracking-wider text-gold font-sans font-medium shadow-xs">
                    {project.category}
                  </span>
                </div>

                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm border border-line p-2 text-fg/80 group-hover:bg-gold group-hover:text-white group-hover:border-gold transition-all shadow-xs">
                  <Expand className="h-4 w-4" />
                </div>
              </div>

              <div className="p-5 space-y-2 bg-white border-t border-line">
                <p className="font-serif text-base text-fg group-hover:text-gold transition-colors line-clamp-2 leading-snug">
                  {project.caption}
                </p>
                <div className="pt-2 border-t border-line/60 flex items-center justify-between text-xs text-muted">
                  <span className="uppercase tracking-wider text-[11px] text-gold font-medium">Turnkey Portfolio</span>
                  <span className="flex items-center gap-1 text-gold hover:underline">View Fullscreen</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
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
