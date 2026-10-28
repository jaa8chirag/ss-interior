"use client";

import { useState, useEffect } from "react";
import { Mail, MapPin, Phone, Send, CheckCircle2, MessageSquare, Clock, ExternalLink } from "lucide-react";
import Brand from "./Brand";
import { SITE, VENDOR_NOTICE } from "@/lib/site";
import { saveLead, getSiteSettings, fetchSiteSettingsFromApi } from "@/lib/adminStore";

const fieldClasses =
  "w-full border border-line bg-white px-4 py-3.5 text-sm outline-none transition focus:border-gold placeholder:text-muted/60 text-fg rounded-xs shadow-xs";

export default function ContactPageView() {
  const [submitted, setSubmitted] = useState(false);
  const [address, setAddress] = useState(SITE.address);
  const [mapUrl, setMapUrl] = useState(SITE.mapUrl);

  useEffect(() => {
    const sync = () => {
      const s = getSiteSettings();
      if (s.address) setAddress(s.address);
      if (s.mapUrl) setMapUrl(s.mapUrl);
    };
    sync();
    fetchSiteSettingsFromApi().then((s) => {
      if (s?.address) setAddress(s.address);
      if ((s as any)?.mapUrl) setMapUrl((s as any).mapUrl);
    });
    window.addEventListener("ss_settings_updated", sync);
    return () => window.removeEventListener("ss_settings_updated", sync);
  }, []);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") || "");
    const phone = String(form.get("phone") || "");
    const email = String(form.get("email") || "");
    const category = String(form.get("category") || "");
    const message = String(form.get("message") || "");

    // Save lead to Admin Portal
    saveLead({
      name,
      phone,
      email,
      category,
      message,
    });

    const text = `Hello SS Interiors,\n\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\nProject Category: ${category}\nMessage: ${message}`;
    window.open(`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`, "_blank");
    setSubmitted(true);
  }

  return (
    <div className="pt-24 pb-16 bg-[#faf8f5] text-fg">
      {/* Header */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 pt-4 pb-2 text-center">
        <h1 className="font-serif text-3xl sm:text-5xl font-light text-fg">
          Contact Studio
        </h1>
      </section>

      {/* Main Content Grid */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 pt-4 pb-8">
        <div className="grid gap-16 lg:grid-cols-12 items-start">
          {/* Coordinates & Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="border border-gold/35 bg-white p-8 space-y-6 shadow-sm hover:shadow-md transition-all rounded-sm">
              <Brand size="md" showText={false} />

              <div className="pt-4 border-t border-line space-y-5">
                <div className="flex items-start gap-4 text-sm text-muted">
                  <MapPin className="h-5 w-5 text-gold shrink-0 mt-1" />
                  <div>
                    <h3 className="text-fg font-medium">Studio Coordinates</h3>
                    <a
                      href={mapUrl || SITE.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="leading-relaxed mt-0.5 font-light hover:text-gold transition-colors block"
                      title="Open in Google Maps"
                    >
                      {address}
                    </a>
                    <a
                      href={mapUrl || SITE.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-gold hover:underline mt-2 font-medium"
                    >
                      Open in Google Maps <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 text-sm text-muted">
                  <Phone className="h-5 w-5 text-gold shrink-0 mt-1" />
                  <div>
                    <h3 className="text-fg font-medium">Project Inquiries</h3>
                    <a href={`tel:${SITE.phone.replace(/\s+/g, "")}`} className="hover:text-gold block transition-colors">
                      {SITE.phone}
                    </a>
                    <a href={`tel:${SITE.altPhone.replace(/\s+/g, "")}`} className="hover:text-gold block transition-colors text-xs mt-0.5">
                      {SITE.altPhone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 text-sm text-muted">
                  <Mail className="h-5 w-5 text-gold shrink-0 mt-1" />
                  <div>
                    <h3 className="text-fg font-medium">General &amp; Press Inquiries</h3>
                    <a href={`mailto:${SITE.email}`} className="hover:text-gold block transition-colors">
                      {SITE.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 text-sm text-muted">
                  <Clock className="h-5 w-5 text-gold shrink-0 mt-1" />
                  <div>
                    <h3 className="text-fg font-medium">Studio Working Hours</h3>
                    <p className="font-light">Monday – Friday: 10:00 AM – 6:00 PM</p>
                    <p className="font-light text-xs text-muted/70">Saturday: By Prior Appointment</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Vendor Callout Card */}
            <div className="border border-gold/40 bg-[#fdfaf5] p-6 space-y-2 rounded-sm shadow-xs">
              <span className="text-xs uppercase tracking-widest text-gold font-semibold block">
                {VENDOR_NOTICE.title}
              </span>
              <p className="text-xs text-muted leading-relaxed font-light">
                {VENDOR_NOTICE.text}
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <div className="frame">
              <form
                onSubmit={onSubmit}
                className="relative space-y-5 border border-gold/35 bg-white p-8 md:p-12 shadow-lg rounded-sm"
              >
                <div>
                  <h2 className="font-serif text-3xl font-normal text-fg">
                    Project Consultation Brief
                  </h2>
                  <p className="text-xs text-muted mt-1 font-light">
                    Share your vision with us. Our design leads review every brief personally and respond within 24 hours.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-muted mb-1.5 font-medium">
                      Your Full Name *
                    </label>
                    <input name="name" required placeholder="e.g. Vikram Malhotra" className={fieldClasses} />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-muted mb-1.5 font-medium">
                      Contact Phone *
                    </label>
                    <input name="phone" required placeholder="+91 98765 43210" className={fieldClasses} />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-muted mb-1.5 font-medium">
                      Email Address *
                    </label>
                    <input name="email" type="email" required placeholder="client@domain.com" className={fieldClasses} />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-muted mb-1.5 font-medium">
                      Project Nature *
                    </label>
                    <select name="category" required defaultValue="" className={fieldClasses}>
                      <option value="" disabled>Select Project Nature</option>
                      <option value="Apartments">Luxury Apartment / Penthouse</option>
                      <option value="Farmhouses">Country Estate / Farmhouse</option>
                      <option value="Office Interior">Corporate & Commercial Headquarters</option>
                      <option value="Hospitality">Boutique Hotel / Restaurant</option>
                      <option value="Product Sourcing">Bespoke Furniture & Global Sourcing</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-muted mb-1.5 font-medium">
                    Project Details & Scope
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    placeholder="Describe your site location, approximate area (sq. ft.), expected project timeline, or specific interior requirements..."
                    className={fieldClasses}
                  />
                </div>

                <button
                  type="submit"
                  className="gold-bg flex w-full items-center justify-center gap-3 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-white transition duration-300 hover:brightness-105 shadow-md shadow-gold/20 rounded-xs cursor-pointer"
                >
                  {submitted ? (
                    <>
                      <CheckCircle2 className="h-4 w-4" /> Consultation Sent Successfully
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
      </section>
    </div>
  );
}
