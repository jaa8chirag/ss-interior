"use client";

import { useState } from "react";
import { Mail, MapPin, Phone, Send, CheckCircle2 } from "lucide-react";
import { SITE, VENDOR_NOTICE } from "@/lib/site";
import { Reveal, SectionHeading } from "./ui";

const fieldClasses =
  "w-full border border-line/60 bg-[#25282f]/80 px-4 py-3.5 text-sm outline-none transition focus:border-gold placeholder:text-muted/60 text-fg";

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get("name");
    const phone = form.get("phone");
    const email = form.get("email");
    const category = form.get("category");
    const message = form.get("message");

    const text = `Hello SS Interiors,\n\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\nProject Type: ${category}\nDetails: ${message}`;
    window.open(`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`, "_blank");
    setSubmitted(true);
  }

  return (
    <section id="contact" className="scroll-mt-20 py-28 bg-[#1e2025]/60 border-t border-line/40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-12 items-start">
          {/* Left Details */}
          <div className="lg:col-span-5 space-y-8">
            <SectionHeading
              eyebrow="Consultation & Inquiries"
              title={
                <>
                  Connect With <span className="gold-text italic">SS Interiors</span>
                </>
              }
              text="Whether commissioning a luxury residence, expansive farmhouse retreat, corporate headquarters, or boutique hospitality destination, our design leadership is at your service."
            />

            <div className="space-y-4 pt-4 border-t border-line/40">
              <div className="flex items-start gap-4 text-sm text-muted">
                <MapPin className="h-5 w-5 text-gold shrink-0 mt-1" />
                <div>
                  <strong className="block text-fg font-medium">Design Studio & Office</strong>
                  <span>{SITE.address}</span>
                </div>
              </div>

              <div className="flex items-start gap-4 text-sm text-muted">
                <Phone className="h-5 w-5 text-gold shrink-0 mt-1" />
                <div>
                  <strong className="block text-fg font-medium">Project Inquiries</strong>
                  <a href={`tel:${SITE.phone.replace(/\s+/g, "")}`} className="hover:text-gold transition-colors block">
                    {SITE.phone}
                  </a>
                  <a href={`tel:${SITE.altPhone.replace(/\s+/g, "")}`} className="hover:text-gold transition-colors block text-xs mt-0.5">
                    Alt: {SITE.altPhone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 text-sm text-muted">
                <Mail className="h-5 w-5 text-gold shrink-0 mt-1" />
                <div>
                  <strong className="block text-fg font-medium">Email Communication</strong>
                  <a href={`mailto:${SITE.email}`} className="hover:text-gold transition-colors block">
                    {SITE.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Vendor Callout Card */}
            <div className="p-5 border border-gold/30 bg-[#282c32] rounded-sm">
              <span className="text-xs uppercase tracking-widest text-gold font-semibold block mb-1">
                {VENDOR_NOTICE.title}
              </span>
              <p className="text-xs text-muted leading-relaxed">
                Partners and suppliers wishing to present product lines, please email directly with &ldquo;VENDOR&rdquo; in the subject.
              </p>
            </div>
          </div>

          {/* Right Form */}
          <div className="lg:col-span-7">
            <div className="frame">
              <form
                onSubmit={onSubmit}
                className="relative space-y-4 border border-line bg-[#25282f] p-8 md:p-10 shadow-2xl"
              >
                <div className="mb-2">
                  <h3 className="font-serif text-2xl font-medium text-fg">
                    Book a Private Consultation
                  </h3>
                  <p className="text-xs text-muted mt-1">
                    Fill out the project brief below to discuss architectural design, space planning, or turnkey execution.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-muted mb-1.5">
                      Your Name *
                    </label>
                    <input name="name" required placeholder="e.g. Rajesh Sharma" className={fieldClasses} />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-muted mb-1.5">
                      Phone Number *
                    </label>
                    <input name="phone" required placeholder="+91 98765 43210" className={fieldClasses} />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-muted mb-1.5">
                      Email Address *
                    </label>
                    <input name="email" type="email" required placeholder="client@example.com" className={fieldClasses} />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-muted mb-1.5">
                      Project Category *
                    </label>
                    <select name="category" required defaultValue="" className={fieldClasses}>
                      <option value="" disabled className="bg-[#25282f]">Select Project Type</option>
                      <option value="Apartments & Penthouses" className="bg-[#25282f]">Luxury Apartments & Penthouses</option>
                      <option value="Farmhouse & Estate" className="bg-[#25282f]">Farmhouses & Country Estates</option>
                      <option value="Commercial & Offices" className="bg-[#25282f]">High-End Corporate Offices</option>
                      <option value="Hospitality" className="bg-[#25282f]">Boutique Hotels & Hospitality</option>
                      <option value="Product Sourcing" className="bg-[#25282f]">Global Furniture & Sourcing</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-muted mb-1.5">
                    Project Scope & Location
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Tell us about the property, square footage, desired timeline, or architectural sensibilities..."
                    className={fieldClasses}
                  />
                </div>

                <button
                  type="submit"
                  className="gold-bg flex w-full items-center justify-center gap-3 py-4 text-xs font-bold uppercase tracking-[0.25em] text-[#22252a] transition duration-300 hover:brightness-110 shadow-lg shadow-gold/10"
                >
                  {submitted ? (
                    <>
                      <CheckCircle2 className="h-4 w-4" /> Message Sent & WhatsApp Opened
                    </>
                  ) : (
                    <>
                      Submit Project Brief <Send className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
