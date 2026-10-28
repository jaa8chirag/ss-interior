"use client";

import { useState, useEffect, useMemo } from "react";
import { Building2, ChevronLeft, ChevronRight } from "lucide-react";
import { ALL_CLIENTS, ClientItem } from "@/lib/clientsData";

export default function ClientSlider() {
  const [startIndex, setStartIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Focus slider on distinguished leaders with verified portraits & brand logos
  const leaders: ClientItem[] = useMemo(() => {
    return ALL_CLIENTS.filter((c) => c.isFeatured || c.photo.includes("/clients/"));
  }, []);

  const total = leaders.length;

  const handleNext = () => {
    if (total === 0) return;
    setStartIndex((prev) => (prev + 3) % total);
  };

  const handlePrev = () => {
    if (total === 0) return;
    setStartIndex((prev) => (prev - 3 + total) % total);
  };

  // Auto glide every 4.8 seconds by 3 cards (pauses on hover)
  useEffect(() => {
    if (isPaused || total <= 3) return;
    const timer = setInterval(() => {
      setStartIndex((prev) => (prev + 3) % total);
    }, 4800);
    return () => clearInterval(timer);
  }, [total, isPaused]);

  // Compute 3 visible cards
  const visibleLeaders: ClientItem[] = useMemo(() => {
    if (total === 0) return [];
    if (total <= 3) return leaders;
    return [
      leaders[startIndex % total],
      leaders[(startIndex + 1) % total],
      leaders[(startIndex + 2) % total],
    ];
  }, [leaders, startIndex, total]);

  return (
    <section className="relative overflow-hidden py-20 sm:py-24 bg-[#f4efe6] border-y border-line content-auto">
      {/* Section Header */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 mb-12 text-center">
        <span className="text-xs uppercase tracking-[0.4em] text-gold font-sans font-medium">
          Distinguished Clientele
        </span>
        <h2 className="mt-3 font-serif text-3xl sm:text-5xl font-light text-fg">
          Trusted by <span className="gold-text italic">India&apos;s Foremost Leaders</span>
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-sm sm:text-base leading-relaxed text-muted font-light">
          From super-penthouses at DLF Camellias and Trump Towers to sprawling private country estates, SS Interiors has had the honor of crafting bespoke luxury sanctuaries for the founders and directors of India&apos;s most celebrated enterprises.
        </p>

        {/* Prestigious Metric Highlights */}
        <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto border-y border-line py-8 sm:py-10 text-center px-4">
          <div className="flex flex-col items-center justify-center p-2">
            <span className="font-serif text-3xl sm:text-4xl md:text-5xl text-fg font-semibold block mb-1">100+</span>
            <span className="text-xs sm:text-sm text-gold font-semibold uppercase tracking-wider block">DLF Camellias Residences</span>
          </div>
          <div className="flex flex-col items-center justify-center p-2">
            <span className="font-serif text-3xl sm:text-4xl md:text-5xl text-fg font-semibold block mb-1">95+</span>
            <span className="text-xs sm:text-sm text-gold font-semibold uppercase tracking-wider block">DLF Magnolias Suites</span>
          </div>
          <div className="flex flex-col items-center justify-center p-2">
            <span className="font-serif text-2xl sm:text-3xl md:text-4xl text-fg font-semibold block mb-1">Trump Tower</span>
            <span className="text-xs sm:text-sm text-gold font-semibold uppercase tracking-wider block">Sky Duplex (42nd Fl.)</span>
          </div>
          <div className="flex flex-col items-center justify-center p-2">
            <span className="font-serif text-3xl sm:text-4xl md:text-5xl text-fg font-semibold block mb-1">100%</span>
            <span className="text-xs sm:text-sm text-gold font-semibold uppercase tracking-wider block">Turnkey In-House Execution</span>
          </div>
        </div>
      </div>

      {/* Main Slider Cards Showcase */}
      <div
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="flex items-center justify-between mb-6">
          <span className="text-xs uppercase tracking-widest text-muted font-mono">
            Distinguished Executive Portfolio · Showing {startIndex + 1}–{Math.min(startIndex + 3, total)} of {total} Leaders
          </span>
          {mounted && total > 3 && (
            <div className="flex items-center gap-2">
              <button
                suppressHydrationWarning
                onClick={handlePrev}
                aria-label="Previous Leaders"
                className="flex h-10 w-10 items-center justify-center rounded-sm border border-line bg-white text-fg transition-all hover:bg-gold hover:text-white hover:border-gold active:scale-95 shadow-sm cursor-pointer"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                suppressHydrationWarning
                onClick={handleNext}
                aria-label="Next Leaders"
                className="flex h-10 w-10 items-center justify-center rounded-sm border border-line bg-white text-fg transition-all hover:bg-gold hover:text-white hover:border-gold active:scale-95 shadow-sm cursor-pointer"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>

        {/* 3 Large Executive Cards Grid */}
        <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {visibleLeaders.map((leader, idx) => (
            <div
              key={`${leader.id}-${startIndex}-${idx}`}
              className="group relative flex flex-col justify-between overflow-hidden rounded-md border border-line bg-white shadow-sm hover:border-gold hover:shadow-xl transition-all duration-300"
            >
              {/* Leader Photo Stage */}
              <div className="relative h-80 sm:h-92 w-full overflow-hidden bg-[#ede8df] flex items-center justify-center">
                <img
                  src={leader.photo}
                  alt={`${leader.name} — ${leader.role}`}
                  className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/clients/deepinder_goyal.jpg";
                  }}
                />

                {/* Property Category Badge in Top-Left Corner */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm border border-gold/40 px-3 py-1 text-[10px] uppercase tracking-wider text-gold font-sans font-medium shadow-sm rounded-xs">
                  {leader.badge || leader.building}
                </div>
              </div>

              {/* Leader Credentials & Clean Dedicated Brand Stage */}
              <div className="p-6 pt-5 space-y-4 bg-white flex-1 flex flex-col justify-between">
                {/* Clean Dedicated Brand Logo Stage */}
                <div className="h-14 flex items-center justify-center px-4 py-2 bg-[#faf8f5] border border-line/60 rounded-xs">
                  <img
                    src={leader.logo}
                    alt={`${leader.company} Official Logo`}
                    className="max-h-10 w-auto max-w-[180px] object-contain"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>

                {/* Single Main Person Name & Executive Title */}
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-normal text-fg group-hover:text-gold transition-colors leading-tight">
                    {leader.name}
                  </h3>
                  <p className="mt-1.5 text-xs uppercase tracking-wider text-gold font-medium">
                    {leader.role}
                    {leader.company && (
                      <>
                        <span className="text-muted/60 font-light mx-1">·</span>
                        <span className="text-muted font-normal">{leader.company}</span>
                      </>
                    )}
                  </p>
                </div>

                {/* Residential / Architectural Property Connection */}
                <div className="pt-3 border-t border-line/70 flex items-start gap-2.5 text-xs text-muted font-light leading-relaxed">
                  <Building2 className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                  <span className="line-clamp-2 text-fg/80 font-medium">{leader.property}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Progress Navigation Dots (1 dot per 3-card batch) */}
        {mounted && total > 3 && (
          <div className="mt-8 flex items-center justify-center gap-2 flex-wrap max-w-xl mx-auto">
            {Array.from({ length: Math.ceil(total / 3) }).map((_, i) => (
              <button
                key={i}
                type="button"
                suppressHydrationWarning
                onClick={() => setStartIndex(i * 3)}
                aria-label={`Go to slide set ${i + 1}`}
                className={`h-2 transition-all rounded-full cursor-pointer ${
                  i === Math.floor(startIndex / 3)
                    ? "w-8 bg-gold shadow-sm"
                    : "w-2 bg-line hover:bg-gold/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
