"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowDown, ArrowRight, Expand, Plus, Sparkles, Award } from "lucide-react";
import Brand from "./Brand";
import ContactSection from "./ContactSection";
import ImageLightbox from "./ImageLightbox";
import { Button, Reveal, SectionHeading } from "./ui";
import {
  SITE,
  THREE_PILLARS,
  SHOWCASE_SECTIONS,
  PRODUCT_SOURCING,
  PRESS_ITEMS,
  PROCESS,
  ProjectShowcaseItem,
} from "@/lib/site";

export default function HomeView() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

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
        className="relative flex min-h-screen items-center justify-center overflow-hidden pt-24 pb-16"
      >
        {/* Background Visual with Parallax */}
        <motion.div style={{ y: heroY }} className="absolute inset-0 h-[115%] w-full">
          <img
            src="https://images.squarespace-cdn.com/content/v1/557a860ae4b0017a8adb0dba/4353f9c6-98b4-422b-b31a-2f6dd57e81f5/Best+Interior+Designer+in+Gurgaon.webp?format=2500w"
            alt="SS Interiors Luxury Architecture"
            className="h-full w-full object-cover object-center filter brightness-[0.7] contrast-[1.05]"
          />
        </motion.div>

        {/* Cinematic Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1d1f24] via-[#1d1f24]/50 to-[#1d1f24]/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1d1f24]/85 via-transparent to-[#1d1f24]/85" />
        <div className="absolute inset-0 grid-lines opacity-40 pointer-events-none" />

        {/* Central Content Block */}
        <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
          {/* Logo Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="mx-auto mb-8 inline-block"
          >
            <Brand size="xl" showText={false} className="justify-center" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-xs uppercase tracking-[0.45em] text-gold font-sans font-medium"
          >
            Interior Architecture & Design · Established {SITE.since}
          </motion.p>

          {/* Monica Khanna Signature Motto */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.9 }}
            className="mt-6 font-serif text-3xl font-light leading-snug tracking-tight text-fg sm:text-5xl md:text-6xl"
          >
            &ldquo;{SITE.motto}&rdquo;
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-fg/80 sm:text-base font-light"
          >
            Elevating luxury living spaces, country estates, corporate headquarters, and bespoke hospitality destinations across Gurgaon, Delhi NCR, and India.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.8 }}
            className="mt-10 flex flex-wrap justify-center items-center gap-4"
          >
            <Button href="#apartments">Explore Showcase</Button>
            <Button href="/portfolio" variant="ghost">Full Portfolio</Button>
            <Button href="/contact" variant="ghost">Book Consultation</Button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <a
          href="#pillars"
          aria-label="Scroll down"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-gold/70 hover:text-gold transition-colors"
        >
          <span>Scroll</span>
          <ArrowDown className="h-3.5 w-3.5 animate-bounce text-gold" />
        </a>
      </section>

      {/* ================= THREE CORE PILLARS ================= */}
      <section id="pillars" className="scroll-mt-24 border-y border-line/50 bg-[#22252a] py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <SectionHeading
            eyebrow="Architectural Scope"
            title={
              <>
                Curated Design Across <span className="gold-text italic">Three Disciplines</span>
              </>
            }
            text="Every space is envisioned as a harmonious balance of functional precision, structural grace, and timeless aesthetic elegance."
            center
          />

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {THREE_PILLARS.map((pillar, i) => (
              <Reveal key={pillar.title} delay={i * 0.12}>
                <div className="group relative flex flex-col h-full overflow-hidden border border-line/60 bg-[#282c32] transition-all duration-500 hover:border-gold/60 hover:shadow-2xl hover:shadow-black/50">
                  <div className="relative h-72 w-full overflow-hidden">
                    <img
                      src={pillar.image}
                      alt={pillar.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#282c32] via-transparent to-transparent" />
                    <span className="absolute top-4 right-4 bg-[#202328]/80 backdrop-blur-md border border-gold/30 px-3 py-1 font-serif text-xs text-gold">
                      0{i + 1}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-8">
                    <h3 className="font-serif text-2xl font-normal tracking-wide text-fg group-hover:text-gold-light transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="mt-4 flex-1 text-sm leading-relaxed text-muted font-light">
                      {pillar.description}
                    </p>
                    <div className="mt-6 pt-4 border-t border-line/40">
                      <Link
                        href={pillar.link}
                        className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-gold hover:text-gold-light transition-colors"
                      >
                        Explore Projects <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 4 SHOWCASE SECTIONS (MATCHING MONICA KHANNA) ================= */}
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
                    Portfolio Focus · 0{sIndex + 1}
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

      {/* ================= PRODUCT SOURCING & BESPOKE FURNITURE ================= */}
      <section className="relative overflow-hidden py-32 bg-[#1d1f24] border-b border-line/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-16 lg:grid-cols-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-[11px] uppercase tracking-[0.35em] text-gold font-sans font-medium">
                Bespoke Curation
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl font-light text-fg leading-tight">
                Global Sourcing & <span className="gold-text italic">Artisanal Furniture</span>
              </h2>
              <p className="text-sm leading-relaxed text-muted font-light">
                {PRODUCT_SOURCING.intro}
              </p>
              <div className="pt-2">
                <Link
                  href="/product-sourcing"
                  className="gold-bg inline-flex items-center gap-3 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#22252a] hover:brightness-110 shadow-lg shadow-gold/10"
                >
                  Explore Global Collection <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 grid gap-6 sm:grid-cols-2">
              {PRODUCT_SOURCING.categories.map((cat, i) => (
                <div
                  key={cat.title}
                  className="group relative h-80 overflow-hidden border border-line/60 bg-[#25282f]"
                >
                  <img
                    src={cat.image}
                    alt={cat.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1d1f24] via-[#1d1f24]/40 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-gold">
                      Category 0{i + 1}
                    </span>
                    <h4 className="mt-1 font-serif text-lg font-medium text-fg">
                      {cat.title}
                    </h4>
                    <p className="mt-1.5 text-xs text-muted/90 line-clamp-2 leading-relaxed font-light">
                      {cat.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

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

      {/* ================= EDITORIAL PRESS & RECOGNITION ================= */}
      <section className="py-28 bg-[#1e2025] border-b border-line/40">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <SectionHeading
            eyebrow="Press & Recognition"
            title={
              <>
                Acclaim in <span className="gold-text italic">Leading Publications</span>
              </>
            }
            text="Our projects have been widely featured across national and international architectural digests and design journals."
            center
          />

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {PRESS_ITEMS.map((press, i) => (
              <Reveal key={press.title} delay={i * 0.1}>
                <div className="border border-line/60 bg-[#25282e] p-8 space-y-4 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center justify-between text-xs text-gold uppercase tracking-widest pb-3 border-b border-line/30">
                      <span>{press.publication}</span>
                      <span>{press.date}</span>
                    </div>
                    <h4 className="mt-4 font-serif text-lg font-medium text-fg leading-snug">
                      {press.title}
                    </h4>
                    <p className="mt-3 text-xs leading-relaxed text-muted italic font-light">
                      &ldquo;{press.quote}&rdquo;
                    </p>
                  </div>
                  <div className="pt-4 border-t border-line/20">
                    <Link
                      href="/press"
                      className="text-xs uppercase tracking-widest text-gold hover:text-gold-light inline-flex items-center gap-1.5"
                    >
                      Read Feature <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
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
