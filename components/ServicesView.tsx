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
    image: "/projects/thecrest_hero.jpg",
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
    <div className="pt-28 pb-24 bg-[#1e2025]">
      {/* Header */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-12 text-center">
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
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-8 space-y-20">
        {SERVICE_CAPABILITIES.map((service, index) => {
          const isReversed = index % 2 !== 0;
          return (
            <div
              key={service.id}
              id={service.id}
              className={`scroll-mt-32 grid gap-12 lg:grid-cols-12 items-center rounded-sm border border-line/50 bg-[#25282e]/80 p-8 sm:p-12 transition-all hover:border-gold/50 hover:shadow-2xl hover:shadow-black/40`}
            >
              <div
                className={`lg:col-span-6 ${
                  isReversed ? "lg:order-2" : "lg:order-1"
                }`}
              >
                <div className="relative h-80 sm:h-96 w-full overflow-hidden border border-line/40">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md border border-gold/40 px-3 py-1 font-serif text-xs text-gold">
                    {service.number}
                  </div>
                </div>
              </div>

              <div
                className={`lg:col-span-6 space-y-6 ${
                  isReversed ? "lg:order-1" : "lg:order-2"
                }`}
              >
                <div>
                  <span className="text-xs uppercase tracking-[0.3em] text-gold font-sans font-medium">
                    {service.tagline}
                  </span>
                  <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-light text-fg">
                    {service.title}
                  </h2>
                </div>

                <p className="text-sm sm:text-base leading-relaxed text-muted font-light">
                  {service.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {service.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs text-fg/80">
                      <CheckCircle2 className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex flex-wrap items-center gap-4">
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
              className="relative p-6 border border-line/60 bg-[#25282f] flex flex-col justify-between hover:border-gold/50 transition-colors"
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
        <div className="border border-gold/40 bg-gradient-to-b from-[#25282e] to-[#1c1e22] p-10 sm:p-14">
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
