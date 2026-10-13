"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Expand, Home, Trees, Briefcase, Sparkles } from "lucide-react";
import ImageLightbox from "./ImageLightbox";
import { SHOWCASE_SECTIONS, ADDITIONAL_PROJECTS } from "@/lib/site";

interface CategoryOption {
  id: string;
  name: string;
  key: "Residential" | "Farmhouses" | "Commercial" | "Hospitality";
  icon: typeof Home;
}

const CATEGORIES: CategoryOption[] = [
  { id: "residential", name: "Residential", key: "Residential", icon: Home },
  { id: "farmhouses", name: "Farmhouses", key: "Farmhouses", icon: Trees },
  { id: "commercial", name: "Commercial", key: "Commercial", icon: Briefcase },
  { id: "hospitality", name: "Hospitality", key: "Hospitality", icon: Sparkles },
];

export default function PortfolioView() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("residential");
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Lightbox State
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const touchStartX = useRef<number | null>(null);

  // Handle hash from URL (e.g., /projects#farmhouses)
  useEffect(() => {
    const handleHash = () => {
      if (typeof window !== "undefined" && window.location.hash) {
        const hash = window.location.hash.replace("#", "");
        const matched = CATEGORIES.find((c) => c.id === hash);
        if (matched) {
          setSelectedCategoryId(matched.id);
          setCurrentSlide(0);
        }
      }
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  // Get active category definition
  const activeCategory = useMemo(() => {
    return CATEGORIES.find((c) => c.id === selectedCategoryId) || CATEGORIES[0];
  }, [selectedCategoryId]);

  // Combine showcase + additional projects for the active category
  const activeCategoryProjects = useMemo(() => {
    const showcaseSec = SHOWCASE_SECTIONS.find((s) => s.id === activeCategory.id);
    const showcaseItems = showcaseSec ? showcaseSec.gallery : [];
    const additionalItems = ADDITIONAL_PROJECTS.filter(
      (p) => p.category === activeCategory.key
    );
    return [...showcaseItems, ...additionalItems];
  }, [activeCategory]);

  // Only show if we have 2 or more projects (>= 2)
  const hasEnoughProjects = activeCategoryProjects.length >= 2;

  // Reset slide index when category changes
  const handleCategoryChange = (catId: string) => {
    setSelectedCategoryId(catId);
    setCurrentSlide(0);
  };

  // Slider navigation
  const prevSlide = () => {
    if (activeCategoryProjects.length === 0) return;
    setCurrentSlide((prev) => (prev - 1 + activeCategoryProjects.length) % activeCategoryProjects.length);
  };

  const nextSlide = () => {
    if (activeCategoryProjects.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % activeCategoryProjects.length);
  };

  // Autoplay
  useEffect(() => {
    if (isPaused || activeCategoryProjects.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % activeCategoryProjects.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused, activeCategoryProjects.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxOpen) return;
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, activeCategoryProjects.length]);

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
    touchStartX.current = null;
  };

  const currentProject = activeCategoryProjects[currentSlide];

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="pt-24 pb-20 bg-[#faf8f5] text-fg min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 pt-6">
        {/* ================= PAGE TITLE ================= */}
        <div className="text-center pb-6">
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-fg">
            Architectural Projects
          </h1>
        </div>

        {/* ================= 4 MAIN CATEGORY TABS ================= */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pb-8">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategoryId === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryChange(cat.id)}
                className={`rounded-full px-5 sm:px-6 py-2.5 text-xs uppercase tracking-widest transition-all cursor-pointer font-medium flex items-center gap-2 ${
                  isActive
                    ? "gold-bg text-white shadow-md shadow-gold/25"
                    : "bg-white text-muted hover:text-fg hover:border-gold border border-line shadow-xs"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* ================= SLIDER SECTION (ONLY IF >= 2 PROJECTS) ================= */}
        {hasEnoughProjects ? (
          <div
            className="space-y-4"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Grand Big Image Stage */}
            <div
              onClick={() => openLightbox(currentSlide)}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className="group relative h-[480px] sm:h-[600px] md:h-[660px] lg:h-[720px] w-full overflow-hidden rounded-md border border-line bg-[#ede8df] shadow-md cursor-pointer select-none"
            >
              {/* Image Slides with Smooth Crossfade */}
              {activeCategoryProjects.map((item, idx) => (
                <div
                  key={`${item.url}-${idx}`}
                  className={`absolute inset-0 h-full w-full transition-opacity duration-700 ease-in-out ${
                    idx === currentSlide ? "opacity-100 z-10" : "opacity-0 pointer-events-none z-0"
                  }`}
                >
                  <img
                    src={item.url}
                    alt={item.caption}
                    loading={idx === 0 ? "eager" : "lazy"}
                    decoding="async"
                    className="h-full w-full object-cover object-center transition-transform duration-1000 group-hover:scale-[1.02]"
                  />
                </div>
              ))}

              {/* Top Bar: Category Pill & Slide Counter */}
              <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-20 flex items-center gap-2">
                <span className="bg-white/95 backdrop-blur-md border border-gold/40 px-3.5 py-1 text-xs uppercase tracking-wider text-gold font-sans font-medium shadow-sm">
                  {activeCategory.name}
                </span>
                <span className="bg-black/60 backdrop-blur-md border border-white/20 text-white/90 px-3 py-1 text-xs font-mono tracking-wider shadow-sm">
                  {currentSlide + 1 < 10 ? `0${currentSlide + 1}` : currentSlide + 1} /{" "}
                  {activeCategoryProjects.length < 10
                    ? `0${activeCategoryProjects.length}`
                    : activeCategoryProjects.length}
                </span>
              </div>

              {/* Fullscreen Expand Icon Button */}
              <button
                type="button"
                aria-label="Expand Fullscreen"
                onClick={(e) => {
                  e.stopPropagation();
                  openLightbox(currentSlide);
                }}
                className="absolute top-4 sm:top-6 right-4 sm:right-6 z-20 bg-white/90 backdrop-blur-md border border-line p-2.5 text-fg/80 group-hover:bg-gold group-hover:text-white group-hover:border-gold transition-all shadow-md rounded-xs"
              >
                <Expand className="h-4 w-4" />
              </button>

              {/* Navigation Button: Previous */}
              <button
                type="button"
                aria-label="Previous Slide"
                onClick={(e) => {
                  e.stopPropagation();
                  prevSlide();
                }}
                className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-20 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/90 text-fg shadow-lg backdrop-blur-md border border-line transition-all hover:bg-gold hover:text-white hover:scale-105 active:scale-95 cursor-pointer"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              {/* Navigation Button: Next */}
              <button
                type="button"
                aria-label="Next Slide"
                onClick={(e) => {
                  e.stopPropagation();
                  nextSlide();
                }}
                className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-20 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/90 text-fg shadow-lg backdrop-blur-md border border-line transition-all hover:bg-gold hover:text-white hover:scale-105 active:scale-95 cursor-pointer"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              {/* Gradient Shade for Crisp Caption Legibility */}
              <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none z-10" />

              {/* Bottom Caption Overlay */}
              {currentProject && (
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 z-20 pointer-events-none">
                  <span className="text-[11px] uppercase tracking-[0.3em] text-gold/90 font-sans font-semibold block mb-1">
                    Turnkey Architectural Portfolio
                  </span>
                  <p className="font-serif text-lg sm:text-2xl text-white font-light leading-snug drop-shadow-md">
                    {currentProject.caption}
                  </p>
                </div>
              )}
            </div>

            {/* ================= THUMBNAILS CAROUSEL STRIP ================= */}
            <div className="flex items-center gap-2.5 overflow-x-auto py-2 px-1 scrollbar-thin scrollbar-thumb-gold/40">
              {activeCategoryProjects.map((item, idx) => (
                <button
                  key={`thumb-${item.url}-${idx}`}
                  type="button"
                  onClick={() => setCurrentSlide(idx)}
                  className={`relative shrink-0 h-20 w-28 sm:h-24 sm:w-36 overflow-hidden rounded border transition-all cursor-pointer ${
                    idx === currentSlide
                      ? "border-gold ring-2 ring-gold/40 scale-100 opacity-100 shadow-md"
                      : "border-line opacity-60 hover:opacity-100 hover:border-gold/60"
                  }`}
                >
                  <img
                    src={item.url}
                    alt={item.caption}
                    className="h-full w-full object-cover object-center"
                  />
                  <div className="absolute bottom-1 right-1 bg-black/70 text-white font-mono text-[9px] px-1 rounded">
                    {idx + 1}
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      {/* ================= FULLSCREEN LIGHTBOX MODAL ================= */}
      <ImageLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={activeCategoryProjects}
        currentIndex={lightboxIndex}
        onNavigate={(idx) => {
          setLightboxIndex(idx);
          setCurrentSlide(idx);
        }}
      />
    </div>
  );
}
