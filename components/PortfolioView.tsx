"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Expand,
  Building2,
  Sparkles,
  Layers,
  MapPin,
  Briefcase,
  Home,
  CheckCircle2,
} from "lucide-react";
import ImageLightbox from "./ImageLightbox";
import {
  REAL_PROJECTS,
  PROJECT_CATEGORIES,
  RealProject,
  ProjectImage,
} from "@/lib/realProjectsData";

/* Reusable Project Folder Slider with Grand Cinema Stage & Thumbnails */
function ProjectFolderSlider({
  project,
  index,
  onOpenLightbox,
}: {
  project: RealProject;
  index: number;
  onOpenLightbox: (images: ProjectImage[], index: number) => void;
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const thumbsContainerRef = useRef<HTMLDivElement>(null);

  const images = project.images;
  const total = images.length;

  // Progressive Just-In-Time Preloading (Zero Quality Loss)
  const [loadedIndices, setLoadedIndices] = useState<Set<number>>(new Set([0]));

  useEffect(() => {
    if (total === 0) return;
    setLoadedIndices((prev) => {
      const nextIdx = (currentSlide + 1) % total;
      const prevIdx = (currentSlide - 1 + total) % total;
      if (prev.has(currentSlide) && prev.has(nextIdx) && prev.has(prevIdx)) return prev;
      const updated = new Set(prev);
      updated.add(currentSlide);
      updated.add(nextIdx);
      updated.add(prevIdx);
      return updated;
    });
  }, [currentSlide, total]);

  // Auto-advance slide every 4.8s (pauses on hover)
  useEffect(() => {
    if (isPaused || total <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % total);
    }, 4800);
    return () => clearInterval(timer);
  }, [isPaused, total]);

  // Keep active thumbnail centered in view
  useEffect(() => {
    const container = thumbsContainerRef.current;
    if (!container) return;
    const activeThumb = container.children[currentSlide] as HTMLElement;
    if (activeThumb) {
      const targetScroll =
        activeThumb.offsetLeft - container.offsetWidth / 2 + activeThumb.offsetWidth / 2;
      container.scrollTo({ left: targetScroll, behavior: "smooth" });
    }
  }, [currentSlide]);

  const prevSlide = () => {
    if (total === 0) return;
    setCurrentSlide((prev) => (prev - 1 + total) % total);
  };

  const nextSlide = () => {
    if (total === 0) return;
    setCurrentSlide((prev) => (prev + 1) % total);
  };

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

  if (total === 0) return null;

  return (
    <article
      id={project.id}
      className="scroll-mt-28 space-y-5 p-4 sm:p-6 lg:p-8 rounded-2xl bg-white border border-gold/30 shadow-lg hover:shadow-2xl transition-all duration-300"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Project Meta Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-line/70">
        <div className="space-y-2">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="text-[11px] uppercase tracking-[0.25em] text-gold font-sans font-semibold bg-gold/10 px-2.5 py-1 rounded-full border border-gold/30">
              {project.badge}
            </span>
            <span className="text-xs text-muted flex items-center gap-1 font-light">
              <MapPin className="h-3.5 w-3.5 text-gold shrink-0" />
              {project.location}
            </span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-fg font-normal leading-tight">
            {project.title}
          </h2>

          <p className="text-xs sm:text-sm text-muted font-light max-w-3xl leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Slide Counter */}
        <div className="flex items-center gap-2.5 shrink-0 self-start md:self-end flex-wrap">
          <span className="text-xs font-mono font-medium text-fg/80 bg-[#faf8f5] px-3 py-1.5 rounded-full border border-line">
            Photo <span className="text-gold font-bold">{currentSlide + 1}</span> of {total}
          </span>
        </div>
      </div>

      {/* Grand Big Image Stage */}
      <div
        onClick={() => onOpenLightbox(images, currentSlide)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="group relative h-[420px] sm:h-[540px] lg:h-[660px] w-full overflow-hidden rounded-xl border border-gold/40 hover:border-gold/80 bg-[#111] shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer select-none"
      >
        {/* Slides with Crossfade */}
        {images.map((item, idx) => {
          const isLoaded = loadedIndices.has(idx) || idx === currentSlide;
          return (
            <div
              key={item.id}
              className={`absolute inset-0 h-full w-full transition-opacity duration-700 ease-in-out ${
                idx === currentSlide ? "opacity-100 z-10" : "opacity-0 pointer-events-none z-0"
              }`}
            >
              {isLoaded ? (
                <img
                  src={item.url}
                  alt={item.title}
                  loading={idx === 0 ? "eager" : "lazy"}
                  decoding="async"
                  className="h-full w-full object-cover object-center transition-transform duration-1000 group-hover:scale-[1.02]"
                />
              ) : (
                <div className="h-full w-full bg-[#111]" />
              )}
              {/* Bottom Dark Gradient for Caption Readability */}
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none" />
            </div>
          );
        })}

        {/* Slide Bottom Caption Bar with Original Filename */}
        <div className="absolute bottom-4 left-4 right-16 z-20 pointer-events-none">
          <p className="text-xs sm:text-sm text-white/95 font-medium drop-shadow-md truncate">
            {images[currentSlide]?.title}
          </p>
          <p className="text-[11px] text-gold/90 font-light drop-shadow-sm truncate">
            {project.specs}
          </p>
        </div>

        {/* Fullscreen Expand / Zoom Button */}
        <button
          type="button"
          aria-label="Expand Fullscreen Zoom"
          onClick={(e) => {
            e.stopPropagation();
            onOpenLightbox(images, currentSlide);
          }}
          className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white hover:bg-gold transition-all shadow-md backdrop-blur-xs cursor-pointer hover:scale-105 active:scale-95"
        >
          <Expand className="h-4 w-4" />
        </button>

        {/* Previous Arrow Button */}
        {total > 1 && (
          <button
            type="button"
            aria-label="Previous Slide"
            onClick={(e) => {
              e.stopPropagation();
              prevSlide();
            }}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/90 text-fg shadow-lg backdrop-blur-md border border-line transition-all hover:bg-gold hover:text-white hover:scale-105 active:scale-95 cursor-pointer"
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        )}

        {/* Next Arrow Button */}
        {total > 1 && (
          <button
            type="button"
            aria-label="Next Slide"
            onClick={(e) => {
              e.stopPropagation();
              nextSlide();
            }}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/90 text-fg shadow-lg backdrop-blur-md border border-line transition-all hover:bg-gold hover:text-white hover:scale-105 active:scale-95 cursor-pointer"
          >
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        )}
      </div>

      {/* Thumbnails Carousel Strip (All Images from this Desktop Folder) */}
      <div className="space-y-1.5 pt-1">
        <div className="flex items-center justify-between px-1 text-[11px] text-muted">
          <span>Browse all {total} photographs:</span>
          <span className="text-gold font-medium">Click thumbnail to view</span>
        </div>
        <div
          ref={thumbsContainerRef}
          className="flex items-center gap-2 overflow-x-auto py-2 px-1 scrollbar-thin scrollbar-thumb-gold/40 scrollbar-track-transparent"
        >
          {images.map((item, idx) => (
            <button
              key={`thumb-${item.id}`}
              type="button"
              onClick={() => setCurrentSlide(idx)}
              className={`relative shrink-0 h-16 w-24 sm:h-20 sm:w-32 overflow-hidden rounded-md border transition-all cursor-pointer ${idx === currentSlide
                ? "border-gold ring-2 ring-gold/50 scale-100 opacity-100 shadow-md"
                : "border-line opacity-55 hover:opacity-100 hover:border-gold/60"
                }`}
            >
              <img
                src={`/thumbs${item.url.replace(/\.[^/.]+$/, "")}.webp`}
                alt=""
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover object-center"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = item.url;
                }}
              />
            </button>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function PortfolioView() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("all");
  const [projectsList, setProjectsList] = useState<RealProject[]>(REAL_PROJECTS);

  // Lightbox State
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<{ url: string; caption: string }[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Sync category from URL parameter or hash
  useEffect(() => {
    const handleRouteCategory = () => {
      if (typeof window === "undefined") return;
      const urlParams = new URLSearchParams(window.location.search);
      const queryCat = urlParams.get("category") || urlParams.get("tab");
      const hashCat = window.location.hash.replace("#", "");
      const target = (queryCat || hashCat || "").toLowerCase();

      if (target) {
        const matched = PROJECT_CATEGORIES.find(
          (c) => c.id.toLowerCase() === target
        );
        if (matched) {
          setSelectedCategoryId(matched.id);
        }
      }
    };

    handleRouteCategory();
    window.addEventListener("hashchange", handleRouteCategory);
    window.addEventListener("popstate", handleRouteCategory);
    return () => {
      window.removeEventListener("hashchange", handleRouteCategory);
      window.removeEventListener("popstate", handleRouteCategory);
    };
  }, []);

  const handleCategoryChange = (catId: string) => {
    setSelectedCategoryId(catId);
    if (typeof window !== "undefined") {
      const url =
        catId === "all"
          ? window.location.pathname
          : `${window.location.pathname}?category=${catId}#${catId}`;
      window.history.replaceState(null, "", url);
    }
  };

  // Filter projects according to tab
  const visibleProjects = useMemo(() => {
    if (selectedCategoryId === "all") {
      return projectsList;
    }
    return projectsList.filter((p) => p.category_id === selectedCategoryId);
  }, [selectedCategoryId, projectsList]);

  // Dynamic category tabs with real live counts
  const dynamicCategories = useMemo(() => {
    return [
      {
        id: "all",
        name: "All Works",
        photoCount: projectsList.reduce((sum, p) => sum + p.images_count, 0),
      },
      {
        id: "penthouse",
        name: "Penthouses",
        photoCount: projectsList
          .filter((p) => p.category_id === "penthouse")
          .reduce((sum, p) => sum + p.images_count, 0),
      },
      {
        id: "luxury_apartments",
        name: "Luxury Apartments",
        photoCount: projectsList
          .filter((p) => p.category_id === "luxury_apartments")
          .reduce((sum, p) => sum + p.images_count, 0),
      },
      {
        id: "corporate",
        name: "Corporate & Commercial",
        photoCount: projectsList
          .filter((p) => p.category_id === "corporate")
          .reduce((sum, p) => sum + p.images_count, 0),
      },
    ];
  }, [projectsList]);

  const openLightbox = (images: ProjectImage[], index: number) => {
    const formatted = images.map((img) => ({
      url: img.url,
      caption: `${img.title} · ${img.caption}`,
    }));
    setLightboxImages(formatted);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="pt-24 pb-24 bg-[#faf8f5] text-fg min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 pt-4 space-y-10">
        {/* ================= PAGE TITLE ================= */}
        <div id="projects-header" className="text-center space-y-3 scroll-mt-28 max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-[0.4em] text-gold font-sans font-medium">
            Architectural Projects & Interiors
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-fg">
            Turnkey <span className="gold-text italic">Living Sanctuaries</span>
          </h1>
          <p className="text-xs sm:text-sm text-muted font-light leading-relaxed">
            Explore authentic completed turnkey installations across DLF Camellias Sky Penthouses, super-luxury residences, and executive commercial headquarters.
          </p>
        </div>

        {/* ================= CATEGORY TABS ================= */}
        <div className="border-b border-gold/30 pb-4">
          <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
            {dynamicCategories.map((cat) => {
              const isSelected = selectedCategoryId === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-medium transition-all duration-300 cursor-pointer shadow-xs ${isSelected
                    ? "gold-bg text-white shadow-gold/25 scale-105"
                    : "bg-white text-fg/80 border border-line hover:border-gold/60 hover:text-gold"
                    }`}
                >
                  <span>{cat.name}</span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${isSelected ? "bg-black/25 text-white" : "bg-[#faf8f5] text-muted border border-line/60"
                      }`}
                  >
                    {cat.photoCount} Photos
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ================= PROJECTS LIST (EACH FOLDER HAS ITS OWN SLIDER) ================= */}
        <div className="space-y-16 sm:space-y-20">
          {visibleProjects.map((project, idx) => (
            <ProjectFolderSlider
              key={project.id}
              project={project}
              index={idx}
              onOpenLightbox={openLightbox}
            />
          ))}
        </div>
      </div>

      {/* ================= FULLSCREEN ZOOM LIGHTBOX MODAL ================= */}
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
