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
    image: "/hero/grand_penthouse_salon.webp",
    subtitle: "DLF Camellias Grand Duplex · Double-Height Architectural Salon & Crystal Chandelier",
  },
  {
    image: "/hero/luxury_duplex_living.webp",
    subtitle: "Super-Luxury Duplex Penthouse · Mezzanine Gallery & Bespoke Italian Seating",
  },
  {
    image: "/hero/sky_penthouse_piano_lounge.webp",
    subtitle: "Panoramic Sky Penthouse · Grand Piano Salon & Floor-to-Ceiling Skyline Views",
  },
  {
    image: "/hero/presidential_master_bedroom.webp",
    subtitle: "Presidential Master Suite · Champagne Gold Curved Accent Wall & Luxury Chaise",
  },
  // --- Ultra High-Resolution 4K UHD Renders (DLF Aralias) ---
  {
    image: "/hero/aralias_entrance_gallery.webp",
    subtitle: "DLF Aralias · Grand Entrance Hallway Gallery & Architectural Fluting",
  },
  {
    image: "/hero/aralias_living_dining.webp",
    subtitle: "DLF Aralias · Double-Height Formal Living Salon & Curvilinear Architectural Lounge",
  },
  {
    image: "/hero/aralias_grand_salon_p20.webp",
    subtitle: "DLF Aralias · Grand Living & Dining Salon with Floor-to-Ceiling Panoramic Windows",
  },
  {
    image: "/hero/aralias_family_lounge_p35.webp",
    subtitle: "DLF Aralias · Contemporary Family Lounge & Black Forest Marble Architectural Wall",
  },
  {
    image: "/hero/aralias_master_suite_p45.webp",
    subtitle: "DLF Aralias · Master Suite with Fluted Architectural Paneling & Ambient Cove Lighting",
  },
];

export default function HomeView() {
  const heroRef = useRef<HTMLElement>(null);
  const [isHeroVisible, setIsHeroVisible] = useState(true);

  // Hero Slider State (Smooth continuous 3.5-second auto-transition)
  const [currentSlide, setCurrentSlide] = useState(0);

  // Progressive Just-In-Time Preloading (Zero Quality Loss, Instant Initial Load)
  const [loadedSlides, setLoadedSlides] = useState<Set<number>>(new Set([0]));

  // Viewport Observer: Pause hero slideshow and image loading when scrolled away
  useEffect(() => {
    const el = heroRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isHeroVisible) return;
    // Keep current slide and next slide preloaded in browser cache
    setLoadedSlides((prev) => {
      const nextSlide = (currentSlide + 1) % HERO_SLIDES.length;
      if (prev.has(currentSlide) && prev.has(nextSlide)) return prev;
      const updated = new Set(prev);
      updated.add(currentSlide);
      updated.add(nextSlide);
      return updated;
    });
  }, [currentSlide, isHeroVisible]);

  useEffect(() => {
    if (!isHeroVisible) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [isHeroVisible]);

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
          {HERO_SLIDES.map((slide, idx) => {
            const isLoaded = loadedSlides.has(idx) || idx === currentSlide;
            return (
              <div
                key={slide.image}
                className={`absolute inset-0 h-full w-full transition-opacity duration-700 ease-in-out ${
                  idx === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                {isLoaded ? (
                  <img
                    src={slide.image}
                    alt={slide.subtitle}
                    loading={idx === 0 ? "eager" : "lazy"}
                    decoding="async"
                    fetchPriority={idx === 0 ? "high" : "auto"}
                    className="h-full w-full object-cover object-center transform-gpu"
                  />
                ) : (
                  <div className="h-full w-full bg-[#181614]" />
                )}
              </div>
            );
          })}
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
            className={`scroll-mt-20 py-12 sm:py-16 border-b border-line content-auto ${sIndex % 2 === 0 ? "bg-white" : "bg-[#fcfaf7]"
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
