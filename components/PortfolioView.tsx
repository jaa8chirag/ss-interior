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
    <div className="pt-28 pb-20 bg-[#1e2025]">
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
              className={`rounded-full px-5 py-2 text-xs uppercase tracking-widest transition-all ${
                selectedCategory === cat
                  ? "bg-gold text-black font-semibold shadow-md shadow-gold/20"
                  : "bg-[#25282e] text-muted hover:text-fg hover:bg-[#2b2e35] border border-line/60"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-8">
        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {filteredProjects.map((project, idx) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                key={`${project.url}-${idx}`}
                onClick={() => openLightbox(idx)}
                className="group relative h-80 overflow-hidden border border-line/60 bg-[#25282e] cursor-pointer shadow-lg"
              >
                <img
                  src={project.url}
                  alt={project.caption}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1d1f24] via-transparent to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                <div className="absolute top-4 left-4">
                  <span className="bg-[#202328]/90 backdrop-blur-md border border-gold/30 px-2.5 py-1 text-[10px] uppercase tracking-wider text-gold">
                    {project.category}
                  </span>
                </div>

                <div className="absolute inset-x-0 bottom-0 p-6 flex items-end justify-between gap-4">
                  <p className="font-serif text-sm text-fg/90 line-clamp-2 leading-relaxed">
                    {project.caption}
                  </p>
                  <span className="shrink-0 flex items-center gap-1.5 rounded-sm border border-gold/40 bg-[#22252a]/90 px-2.5 py-1 text-[10px] uppercase tracking-wider text-gold shadow">
                    <Expand className="h-3 w-3" /> View fullsize
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
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
