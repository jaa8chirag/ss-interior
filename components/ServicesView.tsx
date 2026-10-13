"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Compass, Layers, Palette, ShieldCheck, Sparkles } from "lucide-react";
import { Button, Reveal, SectionHeading } from "./ui";
import { SITE, THREE_PILLARS, SHOWCASE_SECTIONS } from "@/lib/site";

const SERVICE_CAPABILITIES = [
  {
    id: "residential",
    number: "01",
    title: "Luxury Residential Interiors",
    tagline: "Bespoke Apartments, Penthouses & Duplexes",
    description:
      "From high-rise luxury penthouses in DLF Camellias and DLF Magnolias to expansive duplexes across Delhi NCR, we create sanctuaries of understated opulence. Every concept balances custom millwork, ambient architectural illumination, and imported European materials.",
    image: "/projects/camellias_hero.jpg",
    features: [
      "Custom Italian & European furniture sourcing",
      "Integrated architectural lighting design",
      "Bespoke walk-in wardrobes & master ensuites",
      "Smart-home automation & acoustic zoning",
    ],
    projectLink: "/projects",
  },
  {
    id: "farmhouses",
    number: "02",
    title: "Country Estates & Farmhouses",
    tagline: "Expansive Sanctuaries in Harmony with Nature",
    description:
      "Specialising in sprawling countryside retreats, private villas, and estate architecture like DLF Aralias. We integrate double-height vaulted spaces, hand-chiseled stone masonry, lush transitional verandas, and Vastu-aligned spatial flows.",
    image: "/projects/aralias_hero.jpg",
    features: [
      "Landscape & architectural interior harmony",
      "Sustainable natural stone & solid teak joinery",
      "Vastu-compliant estate spatial planning",
      "Private swimming pool & pavilion lounges",
    ],
    projectLink: "/projects",
  },
  {
    id: "commercial",
    number: "03",
    title: "Executive Workspaces & Offices",
    tagline: "Corporate Headquarters That Inspire & Perform",
    description:
      "Sophisticated commercial environments that reflect brand prestige and ignite executive collaboration, such as DLF The Crest suites. We provide end-to-end turnkey delivery including HVAC, MEP, smart conferencing, and ergonomic acoustics.",
    image: "/projects/corp_16.jpg",
    features: [
      "Full turnkey MEP, HVAC & fire safety integration",
      "Boardrooms with immersive audio-visual design",
      "Managing Director & C-Suite executive suites",
      "Biophilic elements & agile breakout lounges",
    ],
    projectLink: "/projects",
  },
  {
    id: "hospitality",
    number: "04",
    title: "Luxury Hospitality & Resorts",
    tagline: "Experiential Destinations That Leave Lasting Impressions",
    description:
      "From five-star presidential suites like ITC Maurya to the Trump Tower NCR sky lounge, our hospitality and experiential designs weave mood, tactile textures, and statement architecture into cohesive luxury journeys.",
    image: "/projects/itc_maurya_hero.jpg",
    features: [
      "Fine dining atmosphere & signature bar design",
      "Presidential suites & bespoke guestroom pods",
      "Atmospheric architectural landscape lighting",
      "Durable commercial-grade luxury specifications",
    ],
    projectLink: "/projects",
  },
];

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Concept & Planning",
    desc: "Comprehensive lifestyle analysis, space planning, design mood boards, and photorealistic 3D architectural visualisations.",
  },
  {
    step: "02",
    title: "Technical & BOQ",
    desc: "Complete architectural working drawings, MEP, HVAC, lighting schematics, and transparent itemised Bill of Quantities (BOQ).",
  },
  {
    step: "03",
    title: "Cost & Management",
    desc: "Transparent budget estimation, milestone scheduling, material procurement coordination, and stringent cost control.",
  },
  {
    step: "04",
    title: "Turnkey Execution",
    desc: "Dedicated on-site project management, precision craftsmanship, quality inspections, bespoke styling, and flawless handover.",
  },
];

export default function ServicesView() {
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

  return (
    <div className="pt-24 pb-16 bg-[#faf8f5] text-fg">
      {/* Header */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-8 text-center">
        <span className="text-xs uppercase tracking-[0.4em] text-gold font-sans font-medium">
          Comprehensive Architectural Capabilities
        </span>
        <h1 className="mt-3 font-serif text-4xl sm:text-6xl font-light text-fg">
          Our Services
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-muted font-light">
          Delivering end-to-end turnkey architectural and interior design services across residences, country farmhouses, corporate offices, and hospitality destinations.
        </p>
      </section>

      {/* Services List */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-4 space-y-12 sm:space-y-16">
        {SERVICE_CAPABILITIES.map((service, index) => {
          const isReversed = index % 2 !== 0;
          return (
            <div
              key={service.id}
              id={service.id}
              className="scroll-mt-32 grid gap-8 lg:gap-12 lg:grid-cols-12 items-center rounded-sm border border-gold/35 bg-white p-3 sm:p-5 lg:p-6 transition-all duration-300 hover:border-gold hover:shadow-2xl hover:shadow-gold/10"
            >
              {/* LEFT: Grand Big Showcase Image */}
              <div className="lg:col-span-7 xl:col-span-8">
                <div className="relative h-[420px] sm:h-[500px] lg:h-[580px] w-full overflow-hidden rounded-sm border border-gold/30 shadow-sm bg-[#fdfcfb]">
                  <img
                    src={service.image}
                    alt={service.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                  />
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm border border-gold/40 px-3.5 py-1 font-serif text-xs text-gold shadow-xs font-medium">
                    {service.number}
                  </div>
                </div>
              </div>

              {/* RIGHT: Refined Minimal Details */}
              <div className="lg:col-span-5 xl:col-span-4 space-y-5">
                <div>
                  <span className="text-xs uppercase tracking-[0.3em] text-gold font-sans font-medium block">
                    {service.tagline}
                  </span>
                  <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-light text-fg leading-tight">
                    {service.title}
                  </h2>
                </div>

                <p className="text-sm leading-relaxed text-muted font-light line-clamp-4">
                  {service.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {service.features.slice(0, 4).map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2 text-xs text-fg/90">
                      <CheckCircle2 className="h-3.5 w-3.5 text-gold shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 flex flex-wrap items-center gap-3">
                  <Button href="/contact">Book Consultation</Button>
                  <Button href={service.projectLink} variant="ghost">
                    View Projects <ArrowRight className="h-4 w-4 ml-1 inline" />
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* 4-Step Process */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 pt-24">
        <SectionHeading
          eyebrow="Turnkey Methodology"
          title={
            <>
              How We Execute <span className="gold-text italic">Your Vision</span>
            </>
          }
          text="A seamless, structured process that ensures timeless aesthetics, structural integrity, and flawless handover."
          center
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map((p) => (
            <div
              key={p.step}
              className="relative p-6 border border-line bg-white flex flex-col justify-between hover:border-gold transition-colors shadow-xs rounded-sm"
            >
              <div>
                <span className="font-serif text-3xl text-gold font-light">
                  {p.step}
                </span>
                <h3 className="mt-4 font-serif text-lg font-normal text-fg">
                  {p.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-muted font-light">
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Consultation Banner */}
      <section className="mx-auto max-w-5xl px-6 lg:px-10 mt-24 text-center">
        <div className="border border-gold/40 bg-[#f4efe6] p-10 sm:p-14 shadow-sm rounded-sm">
          <span className="text-xs uppercase tracking-[0.35em] text-gold font-sans font-medium">
            Turnkey Excellence Since 2016
          </span>
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl font-light text-fg">
            Ready to Transform Your Space?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted font-light">
            Connect with our principal design team for an exclusive consultation on your upcoming residence, farmhouse, or corporate project.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button href="/contact">Book Consultation</Button>
            <Button href="/projects" variant="ghost">Explore Projects</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
