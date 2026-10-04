"use client";

import Link from "next/link";
import { ArrowRight, Globe2, Sparkles, CheckCircle2 } from "lucide-react";
import { Button, SectionHeading } from "./ui";
import { PRODUCT_SOURCING, SITE, VENDOR_NOTICE } from "@/lib/site";

export default function ProductSourcingView() {
  return (
    <div className="pt-28 pb-20 bg-[#1e2025]">
      {/* Header Banner */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-16 text-center">
        <span className="text-xs uppercase tracking-[0.4em] text-gold font-sans font-medium">
          SS Curated Collections
        </span>
        <h1 className="mt-3 font-serif text-4xl sm:text-6xl font-light text-fg leading-tight">
          Bespoke Product Sourcing &amp; <span className="gold-text italic">Global Furniture</span>
        </h1>
        <p className="mx-auto mt-4 max-w-3xl text-sm sm:text-base leading-relaxed text-muted font-light">
          {PRODUCT_SOURCING.intro}
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button href="/contact">Inquire for Your Space</Button>
          <Button href="/portfolio" variant="ghost">View in Finished Projects</Button>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-10">
        <div className="grid gap-10 md:grid-cols-2">
          {PRODUCT_SOURCING.categories.map((cat, idx) => (
            <div
              key={cat.title}
              className="border border-line/60 bg-[#25282f] overflow-hidden group shadow-xl"
            >
              <div className="relative h-96 w-full overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1d1f24] via-[#1d1f24]/20 to-transparent" />
                <span className="absolute top-4 left-4 bg-[#202328]/90 border border-gold/30 px-3 py-1 font-serif text-xs text-gold">
                  0{idx + 1}
                </span>
              </div>
              <div className="p-8 space-y-3">
                <h3 className="font-serif text-2xl font-normal text-fg group-hover:text-gold-light transition-colors">
                  {cat.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted font-light">
                  {cat.description}
                </p>
                <div className="pt-3 flex items-center justify-between border-t border-line/30">
                  <span className="text-[11px] uppercase tracking-widest text-gold">
                    Custom Order Available
                  </span>
                  <Link
                    href="/contact"
                    className="text-xs uppercase tracking-widest text-gold hover:text-gold-light inline-flex items-center gap-1.5"
                  >
                    Request Catalog <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sourcing Process & Global Reach */}
      <section className="border-y border-line/40 bg-[#25282e] py-20 mt-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <SectionHeading
            eyebrow="Direct Atelier Relationships"
            title={
              <>
                Global Quality, <span className="gold-text italic">Delivered Seamlessly</span>
              </>
            }
            text="We bypass commercial distributors and work directly with certified stone quarries, master joiners, and lighting ateliers across Europe and Asia."
            center
          />

          <div className="mt-14 grid gap-8 md:grid-cols-3 text-center">
            <div className="p-8 border border-line/50 bg-[#2b2e35] space-y-3">
              <Globe2 className="h-8 w-8 text-gold mx-auto" />
              <h4 className="font-serif text-xl text-fg">Direct European Import</h4>
              <p className="text-xs text-muted leading-relaxed font-light">
                Hand-curated pieces from Italy, Spain, and Scandinavia with certified customs clearing and insured transit.
              </p>
            </div>
            <div className="p-8 border border-line/50 bg-[#2b2e35] space-y-3">
              <Sparkles className="h-8 w-8 text-gold mx-auto" />
              <h4 className="font-serif text-xl text-fg">Custom Finishes</h4>
              <p className="text-xs text-muted leading-relaxed font-light">
                Every sofa, console, and table can be customized in dimensions, stone slab selection, wood stains, and upholstery textiles.
              </p>
            </div>
            <div className="p-8 border border-line/50 bg-[#2b2e35] space-y-3">
              <CheckCircle2 className="h-8 w-8 text-gold mx-auto" />
              <h4 className="font-serif text-xl text-fg">White-Glove Installation</h4>
              <p className="text-xs text-muted leading-relaxed font-light">
                Our in-house technical crew conducts white-glove site delivery, precision leveling, and final styling.
              </p>
            </div>
          </div>
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
    </div>
  );
}
