"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";

interface SectionImageSliderProps {
  items: { url: string; caption: string }[];
  sectionCategory?: string;
  onOpenLightbox: (index: number) => void;
  autoplayDelay?: number;
}

export default function SectionImageSlider({
  items,
  onOpenLightbox,
  autoplayDelay = 4000,
}: SectionImageSliderProps) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Auto-advance slider
  useEffect(() => {
    if (isPaused || items.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % items.length);
    }, autoplayDelay);
    return () => clearInterval(timer);
  }, [isPaused, items.length, autoplayDelay]);

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + items.length) % items.length);
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % items.length);
  };

  // Touch swipe support for mobile
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

  if (!items || items.length === 0) return null;

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* ================= BIG LUXURY PHOTO STAGE (NO OVERLAYS, PURE PHOTOGRAPHY) ================= */}
      <div
        onClick={() => onOpenLightbox(current)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="group relative h-[420px] sm:h-[500px] md:h-[560px] lg:h-[600px] w-full overflow-hidden rounded-md border border-line bg-[#ede8df] shadow-sm cursor-pointer select-none"
      >
        {items.map((item, idx) => (
          <div
            key={item.url + idx}
            className={`absolute inset-0 h-full w-full transition-opacity duration-700 ease-in-out ${
              idx === current ? "opacity-100 z-10" : "opacity-0 pointer-events-none z-0"
            }`}
          >
            <img
              src={item.url}
              alt={item.caption}
              loading={idx === 0 ? "eager" : "lazy"}
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-[1.02]"
            />
          </div>
        ))}

        {/* Previous Slide Button */}
        <button
          type="button"
          aria-label="Previous image"
          suppressHydrationWarning
          onClick={(e) => {
            e.stopPropagation();
            prevSlide();
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-fg shadow-md backdrop-blur-sm border border-line transition-all hover:bg-gold hover:text-white hover:scale-105 active:scale-95"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {/* Next Slide Button */}
        <button
          type="button"
          aria-label="Next image"
          suppressHydrationWarning
          onClick={(e) => {
            e.stopPropagation();
            nextSlide();
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-fg shadow-md backdrop-blur-sm border border-line transition-all hover:bg-gold hover:text-white hover:scale-105 active:scale-95"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Expand Icon */}
        <button
          type="button"
          aria-label="Open fullscreen photo"
          suppressHydrationWarning
          onClick={(e) => {
            e.stopPropagation();
            onOpenLightbox(current);
          }}
          className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-fg shadow-md backdrop-blur-sm border border-line transition-all hover:bg-gold hover:text-white hover:scale-105"
        >
          <Expand className="h-4 w-4" />
        </button>
      </div>

      {/* ================= CLEAN CAPTION UNDERNEATH (BAS NICHA LIKHA HO KYA IMAGE HAI) ================= */}
      <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1">
        <div className="flex items-center gap-3 min-w-0">
          <span className="shrink-0 text-xs font-sans font-medium uppercase tracking-[0.25em] text-gold">
            0{current + 1} / 0{items.length}
          </span>
          <span className="h-3.5 w-[1px] bg-line shrink-0" />
          <p className="font-serif text-sm sm:text-base text-fg/85 tracking-wide line-clamp-1">
            {items[current]?.caption}
          </p>
        </div>

        {/* Minimalist Progress Pill Dots */}
        <div className="flex items-center gap-1.5 shrink-0">
          {items.map((_, idx) => (
            <button
              key={idx}
              type="button"
              suppressHydrationWarning
              onClick={() => setCurrent(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-1.5 transition-all rounded-full ${
                idx === current ? "w-7 bg-gold" : "w-2 bg-line hover:bg-gold/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* ================= THUMBNAIL PREVIEW STRIP ================= */}
      <div className="mt-3 flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none">
        {items.map((item, idx) => (
          <button
            key={item.url + idx}
            type="button"
            suppressHydrationWarning
            onClick={() => setCurrent(idx)}
            aria-label={`Select ${item.caption}`}
            className={`group relative h-16 w-24 sm:h-20 sm:w-28 shrink-0 overflow-hidden rounded border transition-all ${
              idx === current
                ? "border-gold ring-2 ring-gold/40 shadow-sm scale-[1.02]"
                : "border-line opacity-60 hover:opacity-100"
            }`}
          >
            <img
              src={item.url}
              alt=""
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
