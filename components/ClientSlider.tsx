"use client";

import { motion } from "framer-motion";
import { Building2, Sparkles, Award } from "lucide-react";
import { Reveal, SectionHeading } from "./ui";

interface ClientItem {
  company: string;
  leader: string;
  location: string;
  category: string;
  badgeColor?: string;
  logoSvg: React.ReactNode;
}

const CLIENTS_ROW_1: ClientItem[] = [
  {
    company: "Zomato",
    leader: "Deepinder Goyal",
    location: "DLF Camellias (11,000 Sqft)",
    category: "Founder & CEO",
    badgeColor: "#E23744",
    logoSvg: (
      <div className="flex items-center gap-1.5 font-bold tracking-tight text-white text-xl">
        <span className="h-7 w-7 rounded-full bg-[#E23744] flex items-center justify-center text-white text-xs font-black shadow-md">
          Z
        </span>
        <span className="font-sans font-black italic tracking-tighter text-[#ff5252]">zomato</span>
      </div>
    ),
  },
  {
    company: "Unilever",
    leader: "Sanjiv Kakkar",
    location: "DLF Camellias & Palm Springs",
    category: "Global Executive",
    badgeColor: "#1f36c7",
    logoSvg: (
      <div className="flex items-center gap-2 text-white font-semibold tracking-wide">
        <span className="font-serif text-2xl font-black text-[#58a6ff]">U</span>
        <span className="font-serif text-lg tracking-wider text-white">Unilever</span>
      </div>
    ),
  },
  {
    company: "Urban Company",
    leader: "Abhiraj Bhal & Raghav Chandra",
    location: "DLF Camellias & Magnolias",
    category: "Co-Founders",
    badgeColor: "#ffffff",
    logoSvg: (
      <div className="flex items-center gap-2">
        <span className="bg-white text-black font-black text-xs px-2 py-1 rounded">UC</span>
        <span className="font-sans font-bold text-sm tracking-tight text-white">Urban Company</span>
      </div>
    ),
  },
  {
    company: "Policybazaar",
    leader: "Tarun Mathur",
    location: "Pioneer Araya Penthouse",
    category: "Chief Business Officer",
    badgeColor: "#0078FF",
    logoSvg: (
      <div className="flex items-center gap-1.5 font-bold text-white text-base">
        <span className="text-[#3b82f6] font-black">policy</span>
        <span className="text-[#10b981] font-black">bazaar</span>
      </div>
    ),
  },
  {
    company: "Aakash + BYJU'S",
    leader: "JC Chaudhry",
    location: "DLF Camellias",
    category: "Founder & Chairman",
    badgeColor: "#0083CA",
    logoSvg: (
      <div className="flex items-center gap-2">
        <div className="h-6 w-6 rounded-full bg-[#0083ca] flex items-center justify-center text-white font-bold text-xs">
          i
        </div>
        <span className="font-sans font-extrabold text-lg text-[#38bdf8] tracking-tight">Aakash</span>
      </div>
    ),
  },
  {
    company: "M3M India",
    leader: "Pankaj Bansal",
    location: "Trump Tower Penthouse Duplex (42nd & 43rd Fl.)",
    category: "Director",
    badgeColor: "#10b981",
    logoSvg: (
      <div className="flex items-center gap-2">
        <span className="font-serif font-black text-xl text-[#34d399] tracking-widest">M3M</span>
        <span className="text-[9px] uppercase tracking-widest text-muted border-l border-white/20 pl-2">India</span>
      </div>
    ),
  },
  {
    company: "Daawat Basmati",
    leader: "Ashwani Arora & Vijay Arora",
    location: "DLF Camellias",
    category: "Promoters & MD",
    badgeColor: "#dc2626",
    logoSvg: (
      <div className="flex flex-col items-center">
        <span className="font-serif font-extrabold text-base tracking-[0.25em] text-[#f87171]">DAAWAT</span>
        <span className="text-[8px] uppercase tracking-[0.2em] text-gold">The Finest Basmati</span>
      </div>
    ),
  },
  {
    company: "Somany Ceramics",
    leader: "Shreekant Somany",
    location: "New Friends Colony",
    category: "Chairman & MD",
    badgeColor: "#ef4444",
    logoSvg: (
      <div className="flex items-center gap-2">
        <span className="bg-[#dc2626] text-white px-2.5 py-0.5 font-sans font-black text-xs tracking-wider rounded-sm">
          SOMANY
        </span>
        <span className="text-[10px] text-muted">Tiles & Bathware</span>
      </div>
    ),
  },
  {
    company: "Central Park",
    leader: "Shiv Bakshi",
    location: "15 A Belanova",
    category: "Executive Leadership",
    badgeColor: "#16a34a",
    logoSvg: (
      <div className="flex items-center gap-2 border border-[#16a34a]/60 px-3 py-1 rounded-full">
        <span className="h-2 w-2 rounded-full bg-[#22c55e]"></span>
        <span className="font-serif text-xs font-semibold uppercase tracking-widest text-[#4ade80]">Central Park</span>
      </div>
    ),
  },
  {
    company: "ASK Automotive",
    leader: "Aman Rathee",
    location: "DLF Camellias & Magnolias",
    category: "Executive Director",
    badgeColor: "#e11d48",
    logoSvg: (
      <div className="flex items-center gap-2">
        <span className="font-black text-lg text-[#fb7185] tracking-widest border-b-2 border-[#fb7185]">ASK</span>
        <span className="text-[9px] text-muted uppercase">Automotive</span>
      </div>
    ),
  },
  {
    company: "Omaxe Group",
    leader: "Rohtaas Goel & Jatin Goel",
    location: "Ansal Villa Farmhouse",
    category: "Founders & Promoters",
    badgeColor: "#0284c7",
    logoSvg: (
      <div className="flex items-center gap-1.5">
        <span className="font-sans font-black text-lg text-[#38bdf8] tracking-wider">OMAXE</span>
      </div>
    ),
  },
  {
    company: "Trifecta Capital",
    leader: "Nilesh Kothari",
    location: "DLF Aralias",
    category: "Managing Partner",
    badgeColor: "#f59e0b",
    logoSvg: (
      <div className="flex items-center gap-2">
        <span className="text-[#fbbf24] text-lg font-black">▲</span>
        <span className="font-sans text-xs font-bold uppercase tracking-widest text-white">Trifecta Capital</span>
      </div>
    ),
  },
];

const CLIENTS_ROW_2: ClientItem[] = [
  {
    company: "Elan Group",
    leader: "Rakesh Kapoor",
    location: "DLF Camellias",
    category: "Promoter & Chairman",
    badgeColor: "#06b6d4",
    logoSvg: (
      <div className="flex items-center gap-1.5">
        <span className="font-serif text-2xl font-light text-[#22d3ee] italic">elan</span>
        <span className="text-[8px] uppercase tracking-widest text-muted border-l border-line pl-1.5">Building the Future</span>
      </div>
    ),
  },
  {
    company: "Elevation Capital",
    leader: "Vivek Mathur",
    location: "DLF Crest Penthouse",
    category: "Partner & Investor",
    badgeColor: "#6366f1",
    logoSvg: (
      <div className="flex items-center gap-2">
        <span className="text-[#818cf8] font-bold text-sm">▲</span>
        <span className="font-sans text-xs font-black tracking-widest uppercase text-white">ELEVATION</span>
      </div>
    ),
  },
  {
    company: "Microtek / Action",
    leader: "Ajay Aggarwal & Amit Aggarwal",
    location: "DLF Camellias",
    category: "Promoters & MD",
    badgeColor: "#ea580c",
    logoSvg: (
      <div className="flex items-center gap-2">
        <span className="font-sans font-black text-base text-[#fb923c] tracking-tight">MICROTEK</span>
      </div>
    ),
  },
  {
    company: "Dhanuka Agritech",
    leader: "Harsh & Manish Dhanuka",
    location: "DLF Camellias & Magnolias",
    category: "Promoters",
    badgeColor: "#15803d",
    logoSvg: (
      <div className="flex items-center gap-2">
        <div className="h-5 w-5 bg-[#16a34a] rounded-sm flex items-center justify-center text-white text-[10px] font-bold">
          ▲
        </div>
        <span className="font-sans font-bold text-xs tracking-wider text-white">dhanuka</span>
      </div>
    ),
  },
  {
    company: "Vectus Industries",
    leader: "Divian Baheti",
    location: "Omaxe The Forest Noida",
    category: "Promoter & Director",
    badgeColor: "#dc2626",
    logoSvg: (
      <div className="flex items-center gap-1.5">
        <span className="font-black text-base text-[#f87171] tracking-wider">VECTUS</span>
      </div>
    ),
  },
  {
    company: "Okinawa Autotech",
    leader: "Jeetender Sharma",
    location: "DLF Camellias",
    category: "Founder & MD",
    badgeColor: "#ef4444",
    logoSvg: (
      <div className="flex flex-col">
        <span className="font-black text-sm tracking-widest text-[#f87171] uppercase">OKINAWA</span>
        <span className="text-[7px] text-muted tracking-widest uppercase">Power the Change</span>
      </div>
    ),
  },
  {
    company: "Globus",
    leader: "Ashish Dham",
    location: "DLF Camellias Penthouse",
    category: "Managing Director",
    badgeColor: "#3b82f6",
    logoSvg: (
      <div className="flex items-center gap-1 font-bold text-sm tracking-wider">
        <span className="text-white">GL</span>
        <span className="text-[#60a5fa]">●</span>
        <span className="text-white">BUS</span>
      </div>
    ),
  },
  {
    company: "Baby Saffron",
    leader: "Harpreet Singh Chhabra",
    location: "DLF Camellias",
    category: "Proprietor & Director",
    badgeColor: "#f59e0b",
    logoSvg: (
      <div className="flex flex-col text-center">
        <span className="font-serif font-black text-sm text-[#fbbf24] tracking-wider">Baby Saffron</span>
      </div>
    ),
  },
  {
    company: "V-Bazaar",
    leader: "Hemant Aggarwal",
    location: "DLF Camellias",
    category: "Chairman & MD",
    badgeColor: "#e11d48",
    logoSvg: (
      <div className="bg-[#e11d48] px-2.5 py-0.5 rounded text-white font-black text-xs tracking-wider">
        V-BAZAAR
      </div>
    ),
  },
  {
    company: "QBIK Luxury Retail",
    leader: "Dhan Mill Showroom",
    location: "The Dhan Mill, Chhatarpur",
    category: "Luxury Fashion Flagship",
    badgeColor: "#d1b882",
    logoSvg: (
      <div className="flex items-center gap-1.5 border border-gold/40 px-2.5 py-1 rounded">
        <span className="font-serif font-light text-gold text-sm tracking-widest">Q B I K</span>
      </div>
    ),
  },
  {
    company: "Mochiko Shoes",
    leader: "Virender & Manish Awal",
    location: "DLF Camellias",
    category: "Managing Directors",
    badgeColor: "#38bdf8",
    logoSvg: (
      <div className="flex items-center gap-2">
        <span className="font-sans font-bold text-xs tracking-wider text-white">mochiko shoes</span>
      </div>
    ),
  },
  {
    company: "Continental Services",
    leader: "Sidharth Shekri",
    location: "DLF Camellias",
    category: "Executive Director",
    badgeColor: "#60a5fa",
    logoSvg: (
      <div className="flex items-center gap-1 font-serif text-xs font-semibold text-white">
        <span>Continental</span>
        <span className="text-[8px] text-gold">Since 2001</span>
      </div>
    ),
  },
];

export default function ClientSlider() {
  // Duplicate arrays to create continuous infinite marquee loop
  const row1 = [...CLIENTS_ROW_1, ...CLIENTS_ROW_1];
  const row2 = [...CLIENTS_ROW_2, ...CLIENTS_ROW_2];

  return (
    <section className="relative overflow-hidden py-24 bg-[#191b20] border-y border-line/40">
      {/* Background Glow Accents */}
      <div className="absolute inset-0 bg-radial from-gold/5 via-transparent to-transparent opacity-30 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 lg:px-10 mb-14 text-center">
        <span className="text-xs uppercase tracking-[0.4em] text-gold font-sans font-medium">
          Distinguished Clientele
        </span>
        <h2 className="mt-3 font-serif text-3xl sm:text-4xl md:text-5xl font-light text-fg">
          Trusted by <span className="gold-text italic">Corporate Leaders & Founders</span>
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-sm sm:text-base leading-relaxed text-muted font-light">
          Crafting bespoke luxury residences, private penthouses, and executive architectural sanctuaries for the founders and directors of India&apos;s leading enterprises across DLF Camellias, Trump Towers, DLF Magnolias, and beyond.
        </p>
      </div>

      {/* Infinite Marquee - Row 1 (Gliding Left) */}
      <div className="relative w-full overflow-hidden mb-6 py-2">
        {/* Soft Side Fades for Seamless Infinite Effect */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-24 sm:w-40 bg-gradient-to-r from-[#191b20] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-24 sm:w-40 bg-gradient-to-l from-[#191b20] to-transparent" />

        <div className="flex w-max marquee gap-6">
          {row1.map((client, idx) => (
            <div
              key={`row1-${client.company}-${idx}`}
              className="group relative flex flex-col justify-between w-72 sm:w-80 shrink-0 rounded-sm border border-line/50 bg-[#22252b] p-5 transition-all duration-300 hover:border-gold hover:bg-[#282c34] hover:shadow-xl hover:shadow-black/50"
            >
              {/* Top: Logo & Company Name */}
              <div className="flex items-center justify-between border-b border-line/30 pb-3">
                <div className="h-9 flex items-center">
                  {client.logoSvg}
                </div>
                <span className="text-[10px] uppercase tracking-wider text-gold/80 font-mono">
                  {client.category}
                </span>
              </div>

              {/* Bottom: Client Name & Landmark Location */}
              <div className="pt-3">
                <p className="font-serif text-sm font-normal text-fg group-hover:text-gold-light transition-colors">
                  {client.leader}
                </p>
                <div className="mt-1 flex items-center gap-1.5 text-xs text-muted/90 font-light">
                  <Building2 className="h-3 w-3 text-gold shrink-0" />
                  <span className="truncate">{client.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Infinite Marquee - Row 2 (Gliding Right) */}
      <div className="relative w-full overflow-hidden py-2">
        {/* Soft Side Fades */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-24 sm:w-40 bg-gradient-to-r from-[#191b20] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-24 sm:w-40 bg-gradient-to-l from-[#191b20] to-transparent" />

        <div className="flex w-max marquee-reverse gap-6">
          {row2.map((client, idx) => (
            <div
              key={`row2-${client.company}-${idx}`}
              className="group relative flex flex-col justify-between w-72 sm:w-80 shrink-0 rounded-sm border border-line/50 bg-[#22252b] p-5 transition-all duration-300 hover:border-gold hover:bg-[#282c34] hover:shadow-xl hover:shadow-black/50"
            >
              {/* Top: Logo & Company Name */}
              <div className="flex items-center justify-between border-b border-line/30 pb-3">
                <div className="h-9 flex items-center">
                  {client.logoSvg}
                </div>
                <span className="text-[10px] uppercase tracking-wider text-gold/80 font-mono">
                  {client.category}
                </span>
              </div>

              {/* Bottom: Client Name & Landmark Location */}
              <div className="pt-3">
                <p className="font-serif text-sm font-normal text-fg group-hover:text-gold-light transition-colors">
                  {client.leader}
                </p>
                <div className="mt-1 flex items-center gap-1.5 text-xs text-muted/90 font-light">
                  <Building2 className="h-3 w-3 text-gold shrink-0" />
                  <span className="truncate">{client.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
