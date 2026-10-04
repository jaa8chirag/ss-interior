"use client";

import { useState } from "react";
import ImageLightbox from "./ImageLightbox";
import { PRESS_ITEMS, VENDOR_NOTICE } from "@/lib/site";
import { Expand } from "lucide-react";

export default function PressView() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const pressImages = PRESS_ITEMS.map((p) => ({
    url: p.image,
    caption: `${p.publication} — ${p.title}`,
  }));

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="pt-28 pb-20 bg-[#1e2025]">
      {/* Header */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-16 text-center">
        <span className="text-xs uppercase tracking-[0.4em] text-gold font-sans font-medium">
          Media &amp; Editorial
        </span>
        <h1 className="mt-3 font-serif text-4xl sm:text-6xl font-light text-fg">
          Press &amp; Accolades
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted font-light">
          Celebrating SS Interiors&apos; journey since 2016 through features, magazine covers, and awards in the world’s most respected architectural digests.
        </p>
      </section>

      {/* Press Coverage Grid */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-8">
        <div className="grid gap-12 lg:grid-cols-3">
          {PRESS_ITEMS.map((item, idx) => (
            <div
              key={item.title}
              className="border border-line/60 bg-[#25282f] flex flex-col justify-between overflow-hidden shadow-xl"
            >
              <div
                onClick={() => openLightbox(idx)}
                className="relative h-96 w-full overflow-hidden bg-black/40 cursor-pointer group"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1d1f24] via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
                <div className="absolute bottom-4 right-4 bg-[#202328]/90 border border-gold/40 px-3 py-1 text-[10px] uppercase tracking-wider text-gold flex items-center gap-1.5 shadow">
                  <Expand className="h-3 w-3" /> View Reprint
                </div>
              </div>

              <div className="p-8 space-y-4">
                <div className="flex items-center justify-between text-xs text-gold uppercase tracking-widest pb-3 border-b border-line/40">
                  <span>{item.publication}</span>
                  <span>{item.date}</span>
                </div>
                <h3 className="font-serif text-2xl font-light text-fg leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-muted italic leading-relaxed font-light">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Vendor Notice Banner */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 mt-16">
        <div className="border border-gold/30 bg-[#25282f] p-8 text-center space-y-3">
          <span className="text-xs uppercase tracking-[0.3em] text-gold font-semibold">
            {VENDOR_NOTICE.title}
          </span>
          <p className="mx-auto max-w-3xl text-xs text-muted leading-relaxed font-light">
            {VENDOR_NOTICE.text}
          </p>
        </div>
      </section>

      {/* Lightbox Modal */}
      <ImageLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={pressImages}
        currentIndex={lightboxIndex}
        onNavigate={(idx) => setLightboxIndex(idx)}
      />
    </div>
  );
}
