"use client";

import { useState, useEffect } from "react";
import { Building2, ChevronLeft, ChevronRight } from "lucide-react";

interface ClientLeader {
  name: string;
  company: string;
  role: string;
  location: string;
  photo: string;
  logo: string;
  badge?: string;
}

const DISTINGUISHED_LEADERS: ClientLeader[] = [
  {
    name: "Mr. Deepinder Goyal",
    company: "Zomato",
    role: "Founder & CEO",
    location: "DLF Camellias (11,000 Sqft Duplex) & Daryah Farmhouse",
    photo: "/clients/deepinder_goyal.jpg",
    logo: "/clients/zomato_logo.png",
    badge: "11,000 Sqft Duplex Penthouse",
  },
  {
    name: "Mr. Abhiraj Singh Bhal",
    company: "Urban Company",
    role: "Co-Founder & CEO",
    location: "DLF Camellias (CM 517 B Residence)",
    photo: "/clients/abhiraj_bhal.jpg",
    logo: "/clients/urban_company_logo.png",
    badge: "DLF Camellias Residence",
  },
  {
    name: "Mr. Raghav Chandra",
    company: "Urban Company",
    role: "Co-Founder & Director",
    location: "DLF Magnolias Penthouse (MG 1625 B)",
    photo: "/clients/raghav_chandra.jpg",
    logo: "/clients/urban_company_logo.png",
    badge: "DLF Magnolias Penthouse",
  },
  {
    name: "Mr. Pankaj Bansal",
    company: "M3M India",
    role: "Director & Promoter",
    location: "Trump Tower Sky Penthouse Duplex (42nd & 43rd Fl.)",
    photo: "/clients/pankaj_bansal.jpg",
    logo: "/clients/m3m_logo.png",
    badge: "Trump Tower Sky Penthouse",
  },
  {
    name: "Dr. Arvinder Singh Soin",
    company: "Medanta Liver Institute",
    role: "Padma Shri Chairman & Chief Surgeon",
    location: "DLF Camellias (CM 311 A Residence)",
    photo: "/clients/arvinder_soin.jpg",
    logo: "/clients/medanta_logo.png",
    badge: "DLF Camellias Residence",
  },
  {
    name: "Mr. Rohtas Goel",
    company: "Omaxe Ltd.",
    role: "Founder & Chairman",
    location: "Ansal Villa Sprawling Farm House (Farm No. E7)",
    photo: "/clients/rohtas_goel.jpg",
    logo: "/clients/omaxe_logo.png",
    badge: "Sprawling Country Estate",
  },
  {
    name: "Mr. JC Chaudhry",
    company: "Aakash Educational Services",
    role: "Founder & Chairman",
    location: "DLF Camellias (CM 907 Residence)",
    photo: "/clients/jc_chaudhry.jpg",
    logo: "/clients/aakash_logo.png",
    badge: "DLF Camellias Residence",
  },
  {
    name: "Mr. Sanjiv Kakkar",
    company: "Unilever Global",
    role: "Executive Vice President",
    location: "DLF Camellias (CM 518 A) & Palm Springs Penthouse",
    photo: "/clients/sanjiv_kakkar.jpg",
    logo: "/clients/unilever_logo.png",
    badge: "Camellias & Palm Springs",
  },
  {
    name: "Mr. Harsh Dhanuka",
    company: "Dhanuka Agritech Ltd.",
    role: "Executive Director",
    location: "DLF Camellias (CM 808 B Residence)",
    photo: "/clients/harsh_dhanuka.jpg",
    logo: "/clients/dhanuka_logo.png",
    badge: "DLF Camellias Residence",
  },
  {
    name: "Mr. Shreekant Somany",
    company: "Somany Ceramics",
    role: "Chairman & Managing Director",
    location: "New Friends Colony (Triplex Luxury Bungalow)",
    photo: "/clients/shreekant_somany.jpg",
    logo: "/clients/somany_logo.png",
    badge: "Triplex Luxury Bungalow",
  },
  {
    name: "Mr. Tarun Mathur",
    company: "Policybazaar",
    role: "Co-Founder & Chief Business Officer",
    location: "Pioneer Araya Penthouse (3302 A)",
    photo: "/clients/tarun_mathur.jpg",
    logo: "/clients/policybazaar_logo.png",
    badge: "High-Rise Sky Penthouse",
  },
  {
    name: "Mr. Jeetender Sharma",
    company: "Okinawa Autotech",
    role: "Founder & Managing Director",
    location: "DLF Camellias (CM 903 Residence)",
    photo: "/clients/jeetender_sharma.jpg",
    logo: "/clients/okinawa_logo.png",
    badge: "DLF Camellias Residence",
  },
  {
    name: "Miss Viveka Bhandari",
    company: "Padmini VNA Mechatronics",
    role: "Director",
    location: "Padmini VNA Corporate Headquarters, Dhankot",
    photo: "/clients/viveka_bhandari.jpg",
    logo: "/clients/padmini_vna_logo.png",
    badge: "Corporate Facility & Suites",
  },
  {
    name: "Mr. Pankaj Aggarwal",
    company: "GL Bajaj Group of Institutions",
    role: "Vice Chairman",
    location: "Bespoke Private Villa Residence",
    photo: "/clients/pankaj_aggarwal.jpg",
    logo: "/clients/gl_bajaj_logo.png",
    badge: "Turnkey Architectural Villa",
  },
  {
    name: "Mr. Balraj Kundu",
    company: "KCC Buildcon",
    role: "Managing Director",
    location: "DLF Magnolias Penthouse (MG 105) & Nirvana",
    photo: "/clients/balraj_kundu.jpg",
    logo: "/clients/kcc_buildcon_logo.png",
    badge: "DLF Magnolias Penthouse",
  },
];

export default function ClientSlider() {
  const [startIndex, setStartIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = DISTINGUISHED_LEADERS.length;

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    setStartIndex((prev) => (prev - 1 + total) % total);
  };

  // Auto glide every 4.5 seconds (pauses on hover)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setStartIndex((prev) => (prev + 1) % total);
    }, 4500);
    return () => clearInterval(timer);
  }, [total, isPaused]);

  // Compute 3 visible cards
  const visibleLeaders = [
    DISTINGUISHED_LEADERS[startIndex % total],
    DISTINGUISHED_LEADERS[(startIndex + 1) % total],
    DISTINGUISHED_LEADERS[(startIndex + 2) % total],
  ];

  return (
    <section className="relative overflow-hidden py-24 bg-[#f4efe6] border-y border-line content-auto">
      {/* Section Header */}
      <div className="mx-auto max-w-7xl px-6 lg:px-10 mb-12 text-center">
        <span className="text-xs uppercase tracking-[0.4em] text-gold font-sans font-medium">
          Distinguished Clientele
        </span>
        <h2 className="mt-3 font-serif text-3xl sm:text-5xl font-light text-fg">
          Trusted by <span className="gold-text italic">India&apos;s Foremost Leaders</span>
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-sm sm:text-base leading-relaxed text-muted font-light">
          From super-penthouses at DLF Camellias and Trump Towers to sprawling private farmhouses, SS Interiors has had the honor of crafting bespoke luxury sanctuaries for the founders and directors of India&apos;s most celebrated enterprises.
        </p>

        {/* Prestigious Metric Highlights */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto border-y border-line py-6 text-center">
          <div>
            <span className="font-serif text-2xl sm:text-3xl text-gold font-medium block">36+</span>
            <span className="text-[11px] text-muted uppercase tracking-wider">DLF Camellias Residences</span>
          </div>
          <div>
            <span className="font-serif text-2xl sm:text-3xl text-gold font-medium block">10+</span>
            <span className="text-[11px] text-muted uppercase tracking-wider">DLF Magnolias Suites</span>
          </div>
          <div>
            <span className="font-serif text-2xl sm:text-3xl text-gold font-medium block">Trump Tower</span>
            <span className="text-[11px] text-muted uppercase tracking-wider">Duplex Penthouses (42nd Fl.)</span>
          </div>
          <div>
            <span className="font-serif text-2xl sm:text-3xl text-gold font-medium block">100%</span>
            <span className="text-[11px] text-muted uppercase tracking-wider">Turnkey In-House Execution</span>
          </div>
        </div>
      </div>

      {/* Main Leader Cards Showcase */}
      <div
        className="mx-auto max-w-7xl px-6 lg:px-10"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="flex items-center justify-between mb-6">
          <span className="text-xs uppercase tracking-widest text-muted font-mono">
            Executive Leaders Portfolio · Showing {startIndex + 1} to {((startIndex + 2) % total) + 1} of {total}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              aria-label="Previous Leaders"
              suppressHydrationWarning
              className="flex h-10 w-10 items-center justify-center rounded-sm border border-line bg-white text-fg transition-all hover:bg-gold hover:text-white hover:border-gold active:scale-95 shadow-sm"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next Leaders"
              suppressHydrationWarning
              className="flex h-10 w-10 items-center justify-center rounded-sm border border-line bg-white text-fg transition-all hover:bg-gold hover:text-white hover:border-gold active:scale-95 shadow-sm"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* 3 Large Executive Cards Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {visibleLeaders.map((leader, idx) => (
            <div
              key={`${leader.name}-${startIndex}-${idx}`}
              className="group relative flex flex-col justify-between overflow-hidden rounded-md border border-line bg-white shadow-sm hover:border-gold hover:shadow-xl transition-all duration-300"
            >
              {/* Big High-Definition Leader Photo Stage */}
              <div className="relative h-84 sm:h-96 w-full overflow-hidden bg-[#ede8df]">
                <img
                  src={leader.photo}
                  alt={`${leader.name} — ${leader.role}`}
                  className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />

                {/* Property Category Badge in Top-Left Corner */}
                {leader.badge && (
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm border border-gold/40 px-3 py-1 text-[10px] uppercase tracking-wider text-gold font-sans font-medium shadow-sm rounded-xs">
                    {leader.badge}
                  </div>
                )}
              </div>

              {/* Leader Credentials & Clean Dedicated Brand Stage */}
              <div className="p-6 pt-5 space-y-4 bg-white">
                {/* Clean Dedicated Brand Logo Stage (Centered, No Ugly Overlapping Badges) */}
                <div className="h-14 flex items-center justify-center px-4 py-2 bg-[#faf8f5] border border-line/60 rounded-xs">
                  <img
                    src={leader.logo}
                    alt={`${leader.company} Official Logo`}
                    className="max-h-10 w-auto max-w-[180px] object-contain"
                    loading="lazy"
                  />
                </div>

                {/* Single Main Person Name & Executive Title */}
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-normal text-fg group-hover:text-gold transition-colors leading-tight">
                    {leader.name}
                  </h3>
                  <p className="mt-1.5 text-xs uppercase tracking-wider text-gold font-medium">
                    {leader.role} <span className="text-muted/60 font-light mx-1">·</span> <span className="text-muted font-normal">{leader.company}</span>
                  </p>
                </div>

                {/* Residential / Architectural Project Connection */}
                <div className="pt-3 border-t border-line/70 flex items-start gap-2.5 text-xs text-muted font-light leading-relaxed">
                  <Building2 className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                  <span className="line-clamp-2 text-fg/80">{leader.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Progress Navigation Dots */}
        <div className="mt-8 flex items-center justify-center gap-1.5">
          {Array.from({ length: total }).map((_, i) => (
            <button
              key={i}
              type="button"
              suppressHydrationWarning
              onClick={() => setStartIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 transition-all rounded-full ${
                i === startIndex ? "w-6 bg-gold" : "w-1.5 bg-line hover:bg-gold/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
