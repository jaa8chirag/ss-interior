"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, Compass, Sparkles } from "lucide-react";
import Brand from "./Brand";
import { Button, Reveal, SectionHeading } from "./ui";
import { SITE, PROCESS, VENDOR_NOTICE } from "@/lib/site";

export default function AboutView() {
  return (
    <div className="pt-28 pb-20 bg-[#1e2025]">
      {/* Hero / Philosophy Banner */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-16">
        <div className="grid gap-16 lg:grid-cols-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs uppercase tracking-[0.4em] text-gold font-sans font-medium">
              About SS Interiors · Established {SITE.since}
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl font-light text-fg leading-tight">
              Design &amp; Execution Excellence by <span className="gold-text italic">SS Interiors</span>
            </h1>
            <p className="text-base leading-relaxed text-fg/90 font-light">
              Founded in 2016 by <span className="text-gold font-medium">Vishan Kumar Gautam</span>, SS INTERIORS is a design and execution firm specializing in premium residential and commercial projects, with expertise in high-end interior and exterior works.
            </p>
            <p className="text-sm leading-relaxed text-muted font-light">
              With a focus on luxury, sophistication, and precision, we bring together technical expertise, refined craftsmanship, and meticulous attention to detail to deliver exceptional spaces. From comprehensive project planning to seamless execution, our approach is driven by an understanding of the quality, aesthetics, and finishing standards expected in high-end developments.
            </p>
            <p className="text-sm leading-relaxed text-muted font-light">
              Backed by a team of skilled technical engineers and experienced consultants, SS INTERIORS is equipped to handle complex project requirements, intricate detailing, and demanding execution schedules while maintaining the highest standards of workmanship and professionalism.
            </p>
            <div className="p-4 border-l-2 border-gold bg-[#282c32] rounded-sm">
              <p className="text-sm italic text-gold-light leading-relaxed">
                &ldquo;At SS INTERIORS, we believe that luxury lies in the details. Our commitment is to translate architectural vision into distinguished spaces through superior execution, premium finishes, and uncompromising quality. Every project reflects our dedication to excellence, precision, and timely delivery, making us a trusted execution partner for discerning clients and premium developments.&rdquo;
              </p>
            </div>
            <div className="pt-2 flex flex-wrap gap-4">
              <Button href="/contact">Book Consultation</Button>
              <Button href="/services" variant="ghost">Our Services</Button>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="frame">
              <div className="relative h-[28rem] sm:h-[34rem] w-full overflow-hidden border border-gold/30 bg-[#282c32] shadow-2xl">
                <img
                  src="/team/founder.jpg"
                  alt="Vishan Kumar Gautam — Founder & Creator, SS Interiors"
                  className="h-full w-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#16181b]/95 via-[#16181b]/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-4 bg-[#1a1c20]/90 backdrop-blur-md border border-gold/40 shadow-xl">
                  <p className="font-serif text-lg text-fg font-medium tracking-wide">
                    Vishan Kumar Gautam
                  </p>
                  <span className="text-[11px] uppercase tracking-widest text-gold block mt-0.5 font-sans font-medium">
                    Founder &amp; Creator
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Principles (Monica Khanna Inspiration) */}
      <section className="border-y border-line/40 bg-[#25282e] py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <SectionHeading
            eyebrow="Our Foundation"
            title={
              <>
                What Defines <span className="gold-text italic">Our Creations</span>
              </>
            }
            text="We believe that interior architecture must serve lifestyle, reflect personal identity, and withstand the passage of time."
            center
          />

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <div className="border border-line/60 bg-[#2b2e35] p-8 space-y-4">
              <Compass className="h-8 w-8 text-gold" />
              <h3 className="font-serif text-2xl text-fg">Client-Centric Sensibility</h3>
              <p className="text-sm leading-relaxed text-muted font-light">
                Our client’s needs and sensibilities are pivotal to our dream home creations. We combine a uniqueness in style with the nitty-gritties of the practical and functional to make each space profoundly distinctive.
              </p>
            </div>

            <div className="border border-line/60 bg-[#2b2e35] p-8 space-y-4">
              <Sparkles className="h-8 w-8 text-gold" />
              <h3 className="font-serif text-2xl text-fg">Curated Global Materials</h3>
              <p className="text-sm leading-relaxed text-muted font-light">
                With hand-selected furniture, lighting, and finishes sourced from premier artisanal houses across India, Italy, and Southeast Asia, every surface carries tactile depth and craftsmanship.
              </p>
            </div>

            <div className="border border-line/60 bg-[#2b2e35] p-8 space-y-4">
              <ShieldCheck className="h-8 w-8 text-gold" />
              <h3 className="font-serif text-2xl text-fg">Turnkey Accountability</h3>
              <p className="text-sm leading-relaxed text-muted font-light">
                From structural drawings and 3D visualization to complete in-house HVAC, MEP, and joinery execution, we manage every facet under a single accountable team with transparent BOQ pricing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comprehensive Turnkey Scope */}
      <section className="py-24 bg-[#1e2025]">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs uppercase tracking-[0.35em] text-gold font-sans font-medium">
                Integrated Capabilities
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-fg leading-tight">
                Complete End-to-End <span className="gold-text italic">Engineering &amp; Design</span>
              </h2>
              <p className="text-sm leading-relaxed text-muted font-light">
                Unlike studios that outsource critical execution steps, SS Interiors retains full in-house command over the engineering and technical stages that guarantee a flawless handover.
              </p>

              <div className="grid gap-3 sm:grid-cols-2 pt-2">
                {[
                  "Architectural Space Planning",
                  "Photorealistic 3D Renders",
                  "Vastu-Compliant Spatial Design",
                  "Turnkey HVAC & Air Quality",
                  "Complete MEP Engineering",
                  "Fire Safety & Compliance",
                  "Custom Millwork & Joinery",
                  "Global Material Sourcing",
                  "Smart Home Automation",
                  "Dedicated Site Supervisors",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-xs text-fg/90">
                    <CheckCircle2 className="h-4 w-4 text-gold shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="h-64 sm:h-72 border border-line/60 overflow-hidden">
                <img
                  src="/projects/camellias_1.jpg"
                  alt="SS Interiors Luxury Residential"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="h-64 sm:h-72 border border-line/60 overflow-hidden mt-6">
                <img
                  src="/projects/thecrest_1.jpg"
                  alt="SS Interiors Turnkey Execution"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
