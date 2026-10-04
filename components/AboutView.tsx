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
              Architecture &amp; Interior Design is <span className="gold-text italic">Our Passion</span>.
            </h1>
            <p className="text-base leading-relaxed text-muted font-light">
              Since {SITE.since}, SS Interiors has been dedicated to crafting environments of distinction. We blend contemporary international design sensibilities with functional rigor, creating spaces that feel timeless, comfortable, and quietly opulent.
            </p>
            <p className="text-sm leading-relaxed text-muted font-light">
              Our principal team has shaped signature dream homes, sprawling farmhouse estates, forward-thinking corporate headquarters, and high-touch hospitality destinations across Gurgaon, Delhi NCR, and nationwide.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <Button href="/contact">Book Consultation</Button>
              <Button href="/portfolio" variant="ghost">View Portfolio</Button>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="frame">
              <div className="relative h-[28rem] sm:h-[34rem] w-full overflow-hidden border border-line bg-[#282c32] shadow-2xl">
                <img
                  src="https://images.squarespace-cdn.com/content/v1/557a860ae4b0017a8adb0dba/4353f9c6-98b4-422b-b31a-2f6dd57e81f5/Best+Interior+Designer+in+Gurgaon.webp?format=1500w"
                  alt="SS Interiors Design Studio"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1d1f24] via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-4 bg-[#22252a]/90 backdrop-blur-md border border-gold/30">
                  <p className="font-serif text-sm text-gold italic">
                    &ldquo;Good design yearns for boundless style that is underlined by simplicity.&rdquo;
                  </p>
                  <span className="text-[10px] uppercase tracking-widest text-muted block mt-1 font-sans">
                    — SS Interiors Philosophy
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
                  src="https://images.squarespace-cdn.com/content/v1/557a860ae4b0017a8adb0dba/079a8822-e71f-4645-8da4-60e00448d430/Farmhouse%2Bliving%2Barea%2Bdesign.webp?format=1000w"
                  alt="SS Interiors Living"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="h-64 sm:h-72 border border-line/60 overflow-hidden mt-6">
                <img
                  src="https://images.squarespace-cdn.com/content/v1/557a860ae4b0017a8adb0dba/bc3d7cb8-8a13-411c-988c-d0e937749d66/Office%2BCabin%2BInterior%2BMonica%2BKhanna%2BDesigns.webp?format=1000w"
                  alt="SS Interiors Office"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vendor Notice Banner */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 pb-12">
        <div className="border border-gold/30 bg-[#25282f] p-8 text-center space-y-3">
          <span className="text-xs uppercase tracking-[0.3em] text-gold font-semibold">
            {VENDOR_NOTICE.title}
          </span>
          <p className="mx-auto max-w-3xl text-xs text-muted leading-relaxed font-light">
            {VENDOR_NOTICE.text}
          </p>
        </div>
      </section>
    </div>
  );
}
