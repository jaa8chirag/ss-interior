"use client";

import Link from "next/link";
import { ArrowRight, Globe2, Sparkles, CheckCircle2 } from "lucide-react";
import { Button, SectionHeading } from "./ui";
import { PRODUCT_SOURCING, SITE, VENDOR_NOTICE } from "@/lib/site";

export default function ProductSourcingView() {
  return (
    <div className="pt-28 pb-20 bg-[#faf8f5] text-fg">
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
              className="border border-line bg-white overflow-hidden group shadow-sm hover:shadow-xl hover:border-gold rounded-sm transition-all duration-300"
            >
              <div className="relative h-96 w-full overflow-hidden bg-[#ede8df]">
                <img
                  src={cat.image}
                  alt={cat.title}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm border border-gold/40 px-3 py-1 font-serif text-xs text-gold shadow-xs">
                  0{idx + 1}
                </span>
              </div>
              <div className="p-8 space-y-3">
                <h3 className="font-serif text-2xl font-normal text-fg group-hover:text-gold transition-colors">
                  {cat.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted font-light">
                  {cat.description}
                </p>
                <div className="pt-3 flex items-center justify-between border-t border-line">
                  <span className="text-[11px] uppercase tracking-widest text-gold font-medium">
                    Custom Order Available
                  </span>
                  <Link
                    href="/contact"
                    className="text-xs uppercase tracking-widest text-gold hover:text-gold-dark inline-flex items-center gap-1.5 font-medium"
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
      <section className="border-y border-line bg-[#f4efe6] py-20 mt-16">
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
            <div className="p-8 border border-line bg-white space-y-3 rounded-sm shadow-xs hover:border-gold transition-colors">
              <Globe2 className="h-8 w-8 text-gold mx-auto" />
              <h4 className="font-serif text-xl text-fg font-normal">Direct European Import</h4>
              <p className="text-xs text-muted leading-relaxed font-light">
                Hand-curated pieces from Italy, Spain, and Scandinavia with certified customs clearing and insured transit.
              </p>
            </div>
            <div className="p-8 border border-line bg-white space-y-3 rounded-sm shadow-xs hover:border-gold transition-colors">
              <Sparkles className="h-8 w-8 text-gold mx-auto" />
              <h4 className="font-serif text-xl text-fg font-normal">Custom Finishes</h4>
              <p className="text-xs text-muted leading-relaxed font-light">
                Every sofa, console, and table can be customized in dimensions, stone slab selection, wood stains, and upholstery textiles.
              </p>
            </div>
            <div className="p-8 border border-line bg-white space-y-3 rounded-sm shadow-xs hover:border-gold transition-colors">
              <CheckCircle2 className="h-8 w-8 text-gold mx-auto" />
              <h4 className="font-serif text-xl text-fg font-normal">White-Glove Installation</h4>
              <p className="text-xs text-muted leading-relaxed font-light">
                Our in-house technical crew conducts white-glove site delivery, precision leveling, and final styling.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vendor Notice Banner */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 mt-16">
        <div className="border border-gold/40 bg-[#f4efe6] p-8 text-center space-y-3 rounded-sm shadow-xs">
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
