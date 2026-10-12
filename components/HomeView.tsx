"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowDown, ArrowRight, Expand, Plus, Sparkles, Award } from "lucide-react";
import Brand from "./Brand";
import ClientSlider from "./ClientSlider";
import ContactSection from "./ContactSection";
import ImageLightbox from "./ImageLightbox";
import { Button, Reveal, SectionHeading } from "./ui";
import {
  SITE,
  SHOWCASE_SECTIONS,
  PROCESS,
  ProjectShowcaseItem,
} from "@/lib/site";

const HERO_SLIDES = [
  {
    image: "/projects/camellias_hero.jpg",
    subtitle: `DLF Camellias · Super-Penthouses & Residences · Est. ${SITE.since}`,
    title: SITE.motto,
  },
  {
    image: "/projects/trumptower_hero.jpg",
    subtitle: "Trump Tower NCR · Presidential Duplex Penthouses",
    title: "Timeless architectural aesthetics crafted with understated grandeur",
  },
  {
    image: "/projects/itc_maurya_hero.jpg",
    subtitle: "ITC Maurya · Grand Presidential Suite Turnkey Execution",
    title: "Hospitality grandeur and presidential suites executed with peerless finesse",
  },
  {
    image: "/projects/aralias_hero.jpg",
    subtitle: "DLF Aralias · Golf-Facing Architectural Sanctuaries",
    title: "Where luxury meets lifestyle, room by room",
  },
  {
    image: "/projects/thecrest_hero.jpg",
    subtitle: "DLF The Crest · Contemporary Turnkey Architectural Living",
    title: "Workspaces and residences that think, create, and inspire",
  },
];

export default function HomeView() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  // Slider State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [isPaused]);

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
      {/* ================= HERO SECTION ================= */}
      <section
        ref={heroRef}
        id="top"
        className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20 pb-16"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Multi-Image Background Carousel with Ultra-Smooth, Slow Cinematic Crossfade */}
        <div className="absolute inset-0 h-full w-full overflow-hidden">
          <AnimatePresence mode="sync">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: { duration: 2.4, ease: [0.4, 0, 0.2, 1] },
                scale: { duration: 3.0, ease: "easeOut" },
              }}
              className="absolute inset-0 h-full w-full"
            >
              <img
                src={HERO_SLIDES[currentSlide].image}
                alt={HERO_SLIDES[currentSlide].title}
                className="h-full w-full object-cover object-center"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Soft, Lightened Overlays (drastically reduced black for natural, bright image clarity) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-black/30 pointer-events-none" />
        <div className="absolute inset-0 bg-black/15 pointer-events-none" />

        {/* Central Content Block: Pure Minimal Elegance - 1 Badi Line & 1 Choti Line */}
        <div className="relative z-10 mx-auto max-w-5xl px-6 text-center pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
              className="space-y-4"
            >
              {/* Ek Choti Line (Subheading) */}
              <p className="text-xs uppercase tracking-[0.45em] text-gold font-sans font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                {HERO_SLIDES[currentSlide].subtitle}
              </p>

              {/* Ek Badi Line (Heading) */}
              <h1 className="font-serif text-3xl font-light leading-snug tracking-tight text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)] sm:text-5xl md:text-6xl max-w-4xl mx-auto">
                &ldquo;{HERO_SLIDES[currentSlide].title}&rdquo;
              </h1>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ================= 4 SERVICES SHOWCASE SECTIONS ================= */}
      {SHOWCASE_SECTIONS.map((section, sIndex) => {
        const isReversed = sIndex % 2 !== 0;
        return (
          <section
            key={section.id}
            id={section.id}
            className={`scroll-mt-20 py-28 border-b border-line/40 ${
              sIndex % 2 === 0 ? "bg-[#1f2227]" : "bg-[#25282e]"
            }`}
          >
            <div className="mx-auto max-w-7xl px-6 lg:px-10">
              {/* Section Header & Architectural Narrative */}
              <div className="grid gap-12 lg:grid-cols-12 items-end mb-14">
                <div className="lg:col-span-7">
                  <span className="text-[11px] uppercase tracking-[0.35em] text-gold font-sans font-medium">
                    Services · 0{sIndex + 1}
                  </span>
                  <h2 className="mt-3 font-serif text-4xl sm:text-5xl font-light text-fg">
                    {section.title}
                  </h2>
                  <h3 className="mt-2 font-serif text-xl sm:text-2xl italic text-gold-light">
                    {section.tagline}
                  </h3>
                </div>
                <div className="lg:col-span-5">
                  <p className="text-sm leading-relaxed text-muted font-light">
                    {section.description}
                  </p>
                  <div className="mt-4 flex items-center gap-4">
                    <Link
                      href={`/portfolio#${section.id}`}
                      className="text-xs uppercase tracking-[0.25em] text-gold hover:text-gold-light flex items-center gap-2"
                    >
                      View All {section.title} <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Editorial Gallery Grid */}
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {section.gallery.slice(0, 6).map((imgItem, imgIdx) => (
                  <Reveal key={imgItem.url} delay={imgIdx * 0.08}>
                    <div
                      onClick={() => openLightbox(section.gallery, imgIdx)}
                      className="group relative h-80 w-full overflow-hidden border border-line/60 bg-[#2b2e35] cursor-pointer shadow-lg"
                    >
                      <img
                        src={imgItem.url}
                        alt={imgItem.caption}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1d1f24] via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                      {/* Hover Info & View Fullsize Trigger */}
                      <div className="absolute inset-x-0 bottom-0 p-6 flex items-end justify-between gap-4">
                        <p className="font-serif text-sm text-fg/90 line-clamp-2 leading-relaxed">
                          {imgItem.caption}
                        </p>
                        <span className="shrink-0 flex items-center gap-1.5 rounded-sm border border-gold/40 bg-[#22252a]/90 px-2.5 py-1 text-[10px] uppercase tracking-wider text-gold shadow">
                          <Expand className="h-3 w-3" /> View fullsize
                        </span>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        );
      })}



      {/* ================= CLIENTS & CORPORATE LEADERS SLIDER ================= */}
      <ClientSlider />

      {/* ================= TURNKEY ARCHITECTURAL PROCESS ================= */}
      <section className="py-28 bg-[#22252a] border-b border-line/40">
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

          <div className="mt-16 grid gap-8 md:grid-cols-4">
            {PROCESS.map((p, i) => (
              <Reveal key={p.step} delay={i * 0.1}>
                <div className="h-full border-t border-gold/60 pt-6 space-y-3 bg-[#282c32]/40 p-6">
                  <span className="font-serif text-4xl text-gold font-light block">{p.step}</span>
                  <h3 className="font-serif text-xl font-normal text-fg">{p.title}</h3>
                  <p className="text-xs leading-relaxed text-muted font-light">{p.text}</p>
                </div>
              </Reveal>
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
