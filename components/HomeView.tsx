"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Expand } from "lucide-react";
import Brand from "./Brand";
import ClientSlider from "./ClientSlider";
import ContactSection from "./ContactSection";
import ImageLightbox from "./ImageLightbox";
import SectionImageSlider from "./SectionImageSlider";
import { Button, Reveal, SectionHeading } from "./ui";
import {
  SITE,
  SHOWCASE_SECTIONS,
  PROCESS,
  ProjectShowcaseItem,
} from "@/lib/site";

const HERO_SLIDES = [
  {
    image: "/hero_luxury.jpg",
    subtitle: "Grand Estate Sanctuaries · Double-Height Architectural Living",
  },
  {
    image: "/projects/camellias_hero.jpg",
    subtitle: `DLF Camellias · Super-Penthouses & Residences · Est. ${SITE.since}`,
  },
  {
    image: "/projects/trumptower_hero.jpg",
    subtitle: "Trump Tower NCR · Presidential Duplex Penthouses",
  },
  {
    image: "/projects/thecrest_2.jpg",
    subtitle: "The Crest, DLF Phase 5 · Super-Luxury Master Suite & Private Sanctuary",
  },
  {
    image: "/projects/corp_17.jpg",
    subtitle: "Commercial & Corporate Interiors · Contemporary Architectural Workspaces",
  },
];

export default function HomeView() {
  const heroRef = useRef<HTMLElement>(null);

  // Hero Slider State (Smooth continuous 3-second auto-transition)
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Smooth hash scroll on mount and hash changes
  useEffect(() => {
    const scrollToHash = () => {
      if (typeof window !== "undefined" && window.location.hash) {
        const id = window.location.hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 150);
        }
      }
    };
    scrollToHash();
    window.addEventListener("hashchange", scrollToHash);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, []);

  // Lightbox State
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<{ url: string; caption: string }[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (images: { url: string; caption: string }[], index: number) => {
    setLightboxImages(images);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      {/* ================= HERO SECTION (ANIMATED CINEMATIC SLIDER) ================= */}
      <section
        ref={heroRef}
        id="top"
        className="relative flex min-h-screen items-center justify-center overflow-hidden"
      >
        {/* Multi-Image Background Carousel with GPU-Accelerated Pure CSS Crossfade */}
        <div className="absolute inset-0 h-full w-full overflow-hidden">
          {HERO_SLIDES.map((slide, idx) => (
            <div
              key={slide.image}
              className={`absolute inset-0 h-full w-full transition-opacity duration-700 ease-in-out ${idx === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                }`}
            >
              <img
                src={slide.image}
                alt={slide.subtitle}
                loading={idx === 0 ? "eager" : "lazy"}
                decoding="async"
                className="h-full w-full object-cover object-center transform-gpu"
              />
            </div>
          ))}
        </div>



        {/* Bottom Center: Single Refined Line (Not Too Big) */}
        <div className="absolute bottom-10 inset-x-0 z-20 mx-auto max-w-3xl px-6 text-center pointer-events-none">
          <p className="font-serif text-sm sm:text-base md:text-lg italic text-white/95 tracking-wide drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
            &ldquo;{SITE.motto}&rdquo;
          </p>
        </div>
      </section>

      {/* ================= 4 SERVICES SHOWCASE SECTIONS (TITLE ON TOP, FULL GRAND IMAGE) ================= */}
      {SHOWCASE_SECTIONS.map((section, sIndex) => {
        return (
          <section
            key={section.id}
            id={section.id}
            className={`scroll-mt-20 py-12 sm:py-16 border-b border-line content-auto ${
              sIndex % 2 === 0 ? "bg-white" : "bg-[#fcfaf7]"
            }`}
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
              {/* Title on TOP (Clean, normal & elegant — no right-side text clutter) */}
              <div className="mb-6 sm:mb-8 text-center max-w-3xl mx-auto space-y-2">
                <span className="text-[11px] uppercase tracking-[0.38em] text-gold font-sans font-medium block">
                  Services · 0{sIndex + 1}
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-fg leading-tight">
                  {section.title}
                </h2>
              </div>

              {/* Full Width Grand Image Slider */}
              <div className="w-full">
                <SectionImageSlider
                  items={section.gallery}
                  sectionCategory={section.category}
                  onOpenLightbox={(imgIdx) => openLightbox(section.gallery, imgIdx)}
                  autoplayDelay={3600 + sIndex * 500}
                />
              </div>
            </div>
          </section>
        );
      })}

      {/* ================= CLIENTS & CORPORATE LEADERS SLIDER ================= */}
      <ClientSlider />

      {/* ================= TURNKEY ARCHITECTURAL PROCESS ================= */}
      <section className="py-20 bg-white border-b border-line content-auto">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <SectionHeading
            eyebrow="Turnkey Execution"
            title={
              <>
                From First Blueprint to <span className="gold-text italic">Final Handover</span>
              </>
            }
            text="Comprehensive in-house management including architectural design, 3D walkthroughs, HVAC, MEP, smart automation, carpentry, and final bespoke styling."
            center
          />

          <div className="mt-14 grid gap-8 md:grid-cols-4">
            {PROCESS.map((p, i) => (
              <div
                key={p.step}
                className="h-full border border-gold/35 hover:border-gold pt-6 space-y-3 bg-[#fdfcfb] p-6 rounded-sm shadow-xs hover:shadow-xl hover:shadow-gold/10 transition-all duration-300"
              >
                <span className="font-serif text-4xl text-gold font-light block">{p.step}</span>
                <h3 className="font-serif text-xl font-normal text-fg">{p.title}</h3>
                <p className="text-xs leading-relaxed text-muted font-light">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ================= CONTACT SECTION WITH VENDOR POLICY ================= */}
      <ContactSection />

      {/* Full-screen Lightbox Modal */}
      <ImageLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={lightboxImages}
        currentIndex={lightboxIndex}
        onNavigate={(idx) => setLightboxIndex(idx)}
      />
    </>
  );
}
