"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Expand, Home, Trees, Briefcase, Sparkles, Layers, MapPin, Building2, UserCheck } from "lucide-react";
import ImageLightbox from "./ImageLightbox";

export interface DetailedProject {
  url: string;
  caption: string;
  category: "Residential" | "Farmhouses" | "Commercial" | "Hospitality";
  projectName: string;
  subProjectId: string;
  clientScope: string;
  location: string;
}

const ALL_PROJECT_DATA: DetailedProject[] = [
  // ================= 01. RESIDENTIAL =================
  // DLF Camellias (6 works)
  {
    url: "/projects/camellias_real_1.jpg",
    caption: "Grand Formal Dining & Japanese Mural Architecture — Bookmatched Statuary Marble",
    category: "Residential",
    projectName: "DLF Camellias",
    subProjectId: "dlf-camellias",
    clientScope: "Ultra-Luxury Private Sky Penthouse",
    location: "Golf Course Road, Gurgaon",
  },
  {
    url: "/projects/camellias_real_2.jpg",
    caption: "Private Bar Lounge & Wood-Paneled Foyer with Ambient Concealed Linears",
    category: "Residential",
    projectName: "DLF Camellias",
    subProjectId: "dlf-camellias",
    clientScope: "Ultra-Luxury Private Sky Penthouse",
    location: "Golf Course Road, Gurgaon",
  },
  {
    url: "/projects/camellias_real_3.jpg",
    caption: "Master Presidential Suite & Marble Fireplace Detail with Architectural Coves",
    category: "Residential",
    projectName: "DLF Camellias",
    subProjectId: "dlf-camellias",
    clientScope: "Ultra-Luxury Private Sky Penthouse",
    location: "Golf Course Road, Gurgaon",
  },
  {
    url: "/projects/camellias_real_4.jpg",
    caption: "Backlit Honey Onyx Entry Console & Vertical Architectural Partition",
    category: "Residential",
    projectName: "DLF Camellias",
    subProjectId: "dlf-camellias",
    clientScope: "Ultra-Luxury Private Sky Penthouse",
    location: "Golf Course Road, Gurgaon",
  },
  {
    url: "/projects/camellias_real_5.jpg",
    caption: "Fluted Seasoned Timber Corridor & Concealed Flush Wardrobes",
    category: "Residential",
    projectName: "DLF Camellias",
    subProjectId: "dlf-camellias",
    clientScope: "Ultra-Luxury Private Sky Penthouse",
    location: "Golf Course Road, Gurgaon",
  },
  {
    url: "/projects/camellias_real_6.jpg",
    caption: "Contemporary Living Fireplace Feature Wall & Sculptural Mirror Styling",
    category: "Residential",
    projectName: "DLF Camellias",
    subProjectId: "dlf-camellias",
    clientScope: "Ultra-Luxury Private Sky Penthouse",
    location: "Golf Course Road, Gurgaon",
  },

  // DLF Magnolias (5 works)
  {
    url: "/projects/magnolias_real_1.jpg",
    caption: "Bookmatched White Marble Foyer & Floral Backlit Statement Art",
    category: "Residential",
    projectName: "DLF Magnolias",
    subProjectId: "dlf-magnolias",
    clientScope: "Bespoke Luxury Family Residence",
    location: "Golf Course Road, Gurgaon",
  },
  {
    url: "/projects/magnolias_real_2.jpg",
    caption: "Grand Living Salon & Backlit Onyx Wall with Custom European Furniture",
    category: "Residential",
    projectName: "DLF Magnolias",
    subProjectId: "dlf-magnolias",
    clientScope: "Bespoke Luxury Family Residence",
    location: "Golf Course Road, Gurgaon",
  },
  {
    url: "/projects/magnolias_real_3.jpg",
    caption: "Intimate Family TV Lounge & Fluted Brass Accent Panelling",
    category: "Residential",
    projectName: "DLF Magnolias",
    subProjectId: "dlf-magnolias",
    clientScope: "Bespoke Luxury Family Residence",
    location: "Golf Course Road, Gurgaon",
  },
  {
    url: "/projects/magnolias_real_4.jpg",
    caption: "Sculptural Birds Foyer Wall & Floating Italian Stone Console",
    category: "Residential",
    projectName: "DLF Magnolias",
    subProjectId: "dlf-magnolias",
    clientScope: "Bespoke Luxury Family Residence",
    location: "Golf Course Road, Gurgaon",
  },
  {
    url: "/projects/magnolias_real_5.jpg",
    caption: "Powder Room Hand-Carved Rose Onyx Basin & Precision Downlighting",
    category: "Residential",
    projectName: "DLF Magnolias",
    subProjectId: "dlf-magnolias",
    clientScope: "Bespoke Luxury Family Residence",
    location: "Golf Course Road, Gurgaon",
  },
  {
    url: "/projects/curved_master_suite.jpg",
    caption: "Curved Velvet Headboard & Floating Cove Lighting Master Suite",
    category: "Residential",
    projectName: "Private Suite",
    subProjectId: "private-suite",
    clientScope: "Master Bedroom Suite",
    location: "Delhi NCR",
  },

  // ================= 02. FARMHOUSES =================
  // DLF Aralias Country Estate (5 works)
  {
    url: "/projects/aralias_hero.jpg",
    caption: "Country Estate Great Hall — Double-Height Glazing & Hand-Chiseled Stone",
    category: "Farmhouses",
    projectName: "DLF Aralias Estate",
    subProjectId: "dlf-aralias",
    clientScope: "Private Sprawling Country Estate",
    location: "Golf Course Road / NCR Countryside",
  },
  {
    url: "/projects/aralias_1.jpg",
    caption: "Private Estate Veranda & Terrace — Harmonizing Architecture with Nature",
    category: "Farmhouses",
    projectName: "DLF Aralias Estate",
    subProjectId: "dlf-aralias",
    clientScope: "Private Sprawling Country Estate",
    location: "Golf Course Road / NCR Countryside",
  },
  {
    url: "/projects/aralias_2.jpg",
    caption: "Drawing Room & Formal Lounge with Earthy Stone Textures and Teak Joists",
    category: "Farmhouses",
    projectName: "DLF Aralias Estate",
    subProjectId: "dlf-aralias",
    clientScope: "Private Sprawling Country Estate",
    location: "Golf Course Road / NCR Countryside",
  },
  {
    url: "/projects/aralias_3.jpg",
    caption: "Countryside Villa Bedroom & Panoramic Courtyard Garden Views",
    category: "Farmhouses",
    projectName: "DLF Aralias Estate",
    subProjectId: "dlf-aralias",
    clientScope: "Private Sprawling Country Estate",
    location: "Golf Course Road / NCR Countryside",
  },
  {
    url: "/projects/aralias_4.jpg",
    caption: "Dining Sanctuary & Courtyard Views — Hand-Poured Terrazzo & Brass Hardware",
    category: "Farmhouses",
    projectName: "DLF Aralias Estate",
    subProjectId: "dlf-aralias",
    clientScope: "Private Sprawling Country Estate",
    location: "Golf Course Road / NCR Countryside",
  },

  // Chhatarpur Country Villa (3 works)
  {
    url: "/projects/estate_real_1.jpg",
    caption: "Grand Dining Salon & Crystal Chandelier — Solid Seasoned Hardwood Joinery",
    category: "Farmhouses",
    projectName: "Chhatarpur Villa",
    subProjectId: "chhatarpur-villa",
    clientScope: "Private Luxury Acreage Farmhouse",
    location: "Chhatarpur, Delhi NCR",
  },
  {
    url: "/projects/estate_real_2.jpg",
    caption: "Master Ensuite — Green Onyx Double Vanity & Frameless Architectural Glazing",
    category: "Farmhouses",
    projectName: "Chhatarpur Villa",
    subProjectId: "chhatarpur-villa",
    clientScope: "Private Luxury Acreage Farmhouse",
    location: "Chhatarpur, Delhi NCR",
  },
  {
    url: "/projects/estate_real_3.jpg",
    caption: "Double-Height Estate Drawing Hall — Coffered Ceilings & Silk Carpets",
    category: "Farmhouses",
    projectName: "Chhatarpur Villa",
    subProjectId: "chhatarpur-villa",
    clientScope: "Private Luxury Acreage Farmhouse",
    location: "Chhatarpur, Delhi NCR",
  },

  // ================= 03. COMMERCIAL =================
  // DLF The Crest Executive HQ (3 works)
  {
    url: "/projects/thecrest_hero.jpg",
    caption: "Executive Headquarters Formal Reception — Bookmatched Marble & Brass Inlay",
    category: "Commercial",
    projectName: "DLF The Crest",
    subProjectId: "the-crest",
    clientScope: "Corporate Headquarters & Leadership Suite",
    location: "Sector 54, Gurgaon",
  },
  {
    url: "/projects/thecrest_2.jpg",
    caption: "Private Executive Lounge & Custom Fluted Bar Detailing",
    category: "Commercial",
    projectName: "DLF The Crest",
    subProjectId: "the-crest",
    clientScope: "Corporate Headquarters & Leadership Suite",
    location: "Sector 54, Gurgaon",
  },
  {
    url: "/projects/thecrest_3.jpg",
    caption: "Managing Director Cabin & Custom Floor-to-Ceiling Library Shelving",
    category: "Commercial",
    projectName: "DLF The Crest",
    subProjectId: "the-crest",
    clientScope: "Corporate Headquarters & Leadership Suite",
    location: "Sector 54, Gurgaon",
  },

  // Corporate Leadership Suites (10 works)
  {
    url: "/projects/corp_15.jpg",
    caption: "Executive Boardroom & Audio-Visual Presentation Suite — Modern Acoustics",
    category: "Commercial",
    projectName: "Corporate C-Suite",
    subProjectId: "corporate-c-suite",
    clientScope: "Corporate Headquarters & Boardrooms",
    location: "Cyber City & Gurgaon NCR",
  },
  {
    url: "/projects/corp_16.jpg",
    caption: "Collaborative Open Workstation Bay — Ergonomic Furniture & Linears",
    category: "Commercial",
    projectName: "Corporate C-Suite",
    subProjectId: "corporate-c-suite",
    clientScope: "Corporate Headquarters & Boardrooms",
    location: "Cyber City & Gurgaon NCR",
  },
  {
    url: "/projects/corp_18.jpg",
    caption: "Acoustic Glass Partition Executive Desks & Precision LED Layouts",
    category: "Commercial",
    projectName: "Corporate C-Suite",
    subProjectId: "corporate-c-suite",
    clientScope: "Corporate Headquarters & Boardrooms",
    location: "Cyber City & Gurgaon NCR",
  },
  {
    url: "/projects/corp_20.jpg",
    caption: "Director Executive Cabin — Sleek Minimalist Desk & Custom Credenza",
    category: "Commercial",
    projectName: "Corporate C-Suite",
    subProjectId: "corporate-c-suite",
    clientScope: "Corporate Headquarters & Boardrooms",
    location: "Cyber City & Gurgaon NCR",
  },
  {
    url: "/projects/corp_26.jpg",
    caption: "Managing Director Leadership Suite — Marble Conference Setting",
    category: "Commercial",
    projectName: "Corporate C-Suite",
    subProjectId: "corporate-c-suite",
    clientScope: "Corporate Headquarters & Boardrooms",
    location: "Cyber City & Gurgaon NCR",
  },
  {
    url: "/projects/corp_27.jpg",
    caption: "Corporate Reception Lounge & Acoustic Feature Wall Detailing",
    category: "Commercial",
    projectName: "Corporate C-Suite",
    subProjectId: "corporate-c-suite",
    clientScope: "Corporate Headquarters & Boardrooms",
    location: "Cyber City & Gurgaon NCR",
  },
  {
    url: "/projects/corp_25.jpg",
    caption: "Corporate Breakout & Collaboration Hub — Modern Scandinavian High Stools",
    category: "Commercial",
    projectName: "Corporate C-Suite",
    subProjectId: "corporate-c-suite",
    clientScope: "Corporate Headquarters & Boardrooms",
    location: "Cyber City & Gurgaon NCR",
  },
  {
    url: "/projects/corp_17.jpg",
    caption: "Agile Team Workspace — Glass Partitions & Acoustic Ceiling Clouds",
    category: "Commercial",
    projectName: "Corporate C-Suite",
    subProjectId: "corporate-c-suite",
    clientScope: "Corporate Headquarters & Boardrooms",
    location: "Cyber City & Gurgaon NCR",
  },
  {
    url: "/projects/corp_21.jpg",
    caption: "Senior Executive Cabin — Panoramic Skyline Views & Ergonomic Mesh Seating",
    category: "Commercial",
    projectName: "Corporate C-Suite",
    subProjectId: "corporate-c-suite",
    clientScope: "Corporate Headquarters & Boardrooms",
    location: "Cyber City & Gurgaon NCR",
  },
  {
    url: "/projects/corp_19.jpg",
    caption: "Executive Corridor & Gallery — Architectural Strip Lighting & Soundproofing",
    category: "Commercial",
    projectName: "Corporate C-Suite",
    subProjectId: "corporate-c-suite",
    clientScope: "Corporate Headquarters & Boardrooms",
    location: "Cyber City & Gurgaon NCR",
  },

  // ================= 04. HOSPITALITY =================
  // Trump Tower NCR (4 works)
  {
    url: "/projects/trumptower_hero.jpg",
    caption: "Presidential Duplex Penthouse Great Hall — Architectural Double-Height Living",
    category: "Hospitality",
    projectName: "Trump Tower NCR",
    subProjectId: "trump-tower",
    clientScope: "Presidential Sky Penthouse & Lounge",
    location: "Sector 65, Gurgaon",
  },
  {
    url: "/projects/trumptower_1.jpg",
    caption: "Presidential Sky Lounge — Panoramic City Views & Ambient Cove Lighting",
    category: "Hospitality",
    projectName: "Trump Tower NCR",
    subProjectId: "trump-tower",
    clientScope: "Presidential Sky Penthouse & Lounge",
    location: "Sector 65, Gurgaon",
  },
  {
    url: "/projects/trumptower_2.jpg",
    caption: "Luxury Floating Cantilever Staircase & Frameless Double-Height Glazing",
    category: "Hospitality",
    projectName: "Trump Tower NCR",
    subProjectId: "trump-tower",
    clientScope: "Presidential Sky Penthouse & Lounge",
    location: "Sector 65, Gurgaon",
  },
  {
    url: "/projects/trumptower_3.jpg",
    caption: "Grand Master Suite — Bookmatched Italian Marble & Bespoke Dressing",
    category: "Hospitality",
    projectName: "Trump Tower NCR",
    subProjectId: "trump-tower",
    clientScope: "Presidential Sky Penthouse & Lounge",
    location: "Sector 65, Gurgaon",
  },

  // Five-Star Venues & ITC Maurya (3 works)
  {
    url: "/projects/itc_maurya.jpg",
    caption: "ITC Maurya — Grand Presidential Suite Luxury Turnkey Renovation",
    category: "Hospitality",
    projectName: "ITC Maurya Suite",
    subProjectId: "itc-maurya",
    clientScope: "Five-Star Presidential Suite",
    location: "Diplomatic Enclave, New Delhi",
  },
  {
    url: "/projects/onyx_staircase.jpg",
    caption: "Illuminated Translucent Honey Onyx Floating Staircase — Five-Star Grandeur",
    category: "Hospitality",
    projectName: "Onyx Architectural Feature",
    subProjectId: "itc-maurya",
    clientScope: "Five-Star Hotel Architectural Fit-out",
    location: "New Delhi NCR",
  },
  {
    url: "/projects/luxury_bar.jpg",
    caption: "Signature Hospitality Bar Counter — Fluted Panelling & Arched Backlit Display",
    category: "Hospitality",
    projectName: "Signature Bar Lounge",
    subProjectId: "itc-maurya",
    clientScope: "Luxury Hospitality Dining Venue",
    location: "Delhi NCR",
  },
];

interface MainTab {
  id: string;
  name: string;
  categoryKey?: "Residential" | "Farmhouses" | "Commercial" | "Hospitality";
  icon: typeof Home;
}

const MAIN_TABS: MainTab[] = [
  { id: "all", name: "All", icon: Layers },
  { id: "residential", name: "Residential", categoryKey: "Residential", icon: Home },
  { id: "farmhouses", name: "Farmhouses", categoryKey: "Farmhouses", icon: Trees },
  { id: "commercial", name: "Commercial", categoryKey: "Commercial", icon: Briefcase },
  { id: "hospitality", name: "Hospitality", categoryKey: "Hospitality", icon: Sparkles },
];

const CORE_CATEGORIES: {
  id: string;
  name: string;
  categoryKey: "Residential" | "Farmhouses" | "Commercial" | "Hospitality";
  icon: typeof Home;
}[] = [
  { id: "residential", name: "Residential Interiors", categoryKey: "Residential", icon: Home },
  { id: "farmhouses", name: "Farmhouses & Country Estates", categoryKey: "Farmhouses", icon: Trees },
  { id: "commercial", name: "Commercial & Corporate Interiors", categoryKey: "Commercial", icon: Briefcase },
  { id: "hospitality", name: "Hospitality & Turnkey Execution", categoryKey: "Hospitality", icon: Sparkles },
];

/* Reusable Grand Category Slider Component */
function CategoryProjectSlider({
  categoryTitle,
  projects,
  onOpenLightbox,
}: {
  categoryTitle: string;
  projects: DetailedProject[];
  onOpenLightbox: (images: DetailedProject[], index: number) => void;
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Auto advance
  useEffect(() => {
    if (isPaused || projects.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % projects.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused, projects.length]);

  const prevSlide = () => {
    if (projects.length === 0) return;
    setCurrentSlide((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const nextSlide = () => {
    if (projects.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % projects.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
    touchStartX.current = null;
  };

  const currentProject = projects[currentSlide];

  if (!projects || projects.length < 2) return null;

  return (
    <div
      className="space-y-4"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Category Section Header */}
      <div className="flex items-center justify-between pb-1 border-b border-gold/30">
        <h2 className="font-serif text-2xl sm:text-3xl text-fg font-normal">
          {categoryTitle}
        </h2>
        <span className="text-xs uppercase tracking-widest text-gold font-medium">
          {projects.length} Works
        </span>
      </div>

      {/* Grand Big Image Stage */}
      <div
        onClick={() => onOpenLightbox(projects, currentSlide)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="group relative h-[480px] sm:h-[580px] lg:h-[660px] w-full overflow-hidden rounded-md border border-gold/40 hover:border-gold/70 bg-[#fdfcfb] shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer select-none"
      >
        {/* Slides with Crossfade */}
        {projects.map((item, idx) => (
          <div
            key={`${item.url}-${idx}`}
            className={`absolute inset-0 h-full w-full transition-opacity duration-700 ease-in-out ${
              idx === currentSlide ? "opacity-100 z-10" : "opacity-0 pointer-events-none z-0"
            }`}
          >
            <img
              src={item.url}
              alt={item.caption}
              loading={idx === 0 ? "eager" : "lazy"}
              decoding="async"
              className="h-full w-full object-cover object-center transition-transform duration-1000 group-hover:scale-[1.02]"
            />
          </div>
        ))}

        {/* Top Bar: Category Pill & Project Name & Counter */}
        <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-20 flex flex-wrap items-center gap-2">
          <span className="bg-white/95 backdrop-blur-md border border-gold/40 px-3.5 py-1 text-xs uppercase tracking-wider text-gold font-sans font-medium shadow-sm">
            {currentProject?.category}
          </span>

          <span className="bg-[#17181c]/90 backdrop-blur-md border border-gold/50 text-white px-3.5 py-1 text-xs font-serif tracking-wider shadow-sm flex items-center gap-1.5">
            <Building2 className="h-3.5 w-3.5 text-gold" />
            <span>{currentProject?.projectName}</span>
          </span>

          <span className="bg-black/60 backdrop-blur-md border border-white/20 text-white/90 px-3 py-1 text-xs font-mono tracking-wider shadow-sm">
            {currentSlide + 1 < 10 ? `0${currentSlide + 1}` : currentSlide + 1} /{" "}
            {projects.length < 10 ? `0${projects.length}` : projects.length}
          </span>
        </div>

        {/* Fullscreen Expand Icon Button */}
        <button
          type="button"
          aria-label="Expand Fullscreen"
          onClick={(e) => {
            e.stopPropagation();
            onOpenLightbox(projects, currentSlide);
          }}
          className="absolute top-4 sm:top-6 right-4 sm:right-6 z-20 bg-white/90 backdrop-blur-md border border-line p-2.5 text-fg/80 group-hover:bg-gold group-hover:text-white group-hover:border-gold transition-all shadow-md rounded-xs cursor-pointer"
        >
          <Expand className="h-4 w-4" />
        </button>

        {/* Previous Arrow Button */}
        <button
          type="button"
          aria-label="Previous Slide"
          onClick={(e) => {
            e.stopPropagation();
            prevSlide();
          }}
          className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-20 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/90 text-fg shadow-lg backdrop-blur-md border border-line transition-all hover:bg-gold hover:text-white hover:scale-105 active:scale-95 cursor-pointer"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        {/* Next Arrow Button */}
        <button
          type="button"
          aria-label="Next Slide"
          onClick={(e) => {
            e.stopPropagation();
            nextSlide();
          }}
          className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-20 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/90 text-fg shadow-lg backdrop-blur-md border border-line transition-all hover:bg-gold hover:text-white hover:scale-105 active:scale-95 cursor-pointer"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Gradient Shade for Crisp Caption Legibility */}
        <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none z-10" />

        {/* Bottom Caption Overlay: Shows Who It Was Built For + Location + Caption */}
        {currentProject && (
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 z-20 pointer-events-none space-y-1.5">
            <div className="flex flex-wrap items-center gap-3 text-xs text-white/90">
              <span className="inline-flex items-center gap-1.5 text-gold font-sans font-medium tracking-wide">
                <UserCheck className="h-3.5 w-3.5 text-gold" />
                Built For: {currentProject.clientScope}
              </span>
              <span className="text-white/40">•</span>
              <span className="inline-flex items-center gap-1.5 text-white/80 font-sans">
                <MapPin className="h-3.5 w-3.5 text-gold/80" />
                {currentProject.location}
              </span>
            </div>

            <p className="font-serif text-lg sm:text-2xl text-white font-light leading-snug drop-shadow-md">
              {currentProject.caption}
            </p>
          </div>
        )}
      </div>

      {/* Thumbnails Carousel Strip */}
      <div className="flex items-center gap-2.5 overflow-x-auto py-2 px-1 scrollbar-thin scrollbar-thumb-gold/40">
        {projects.map((item, idx) => (
          <button
            key={`thumb-${item.url}-${idx}`}
            type="button"
            onClick={() => setCurrentSlide(idx)}
            className={`relative shrink-0 h-20 w-28 sm:h-24 sm:w-36 overflow-hidden rounded border transition-all cursor-pointer ${
              idx === currentSlide
                ? "border-gold ring-2 ring-gold/40 scale-100 opacity-100 shadow-md"
                : "border-line opacity-60 hover:opacity-100 hover:border-gold/60"
            }`}
          >
            <img
              src={item.url}
              alt={item.caption}
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute bottom-1 right-1 bg-black/70 text-white font-mono text-[9px] px-1 rounded">
              {idx + 1}
            </div>
            <div className="absolute top-1 left-1 bg-black/70 text-gold text-[9px] px-1 rounded truncate max-w-[80px]">
              {item.projectName.split(" ")[0]}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function PortfolioView() {
  const [selectedMainTabId, setSelectedMainTabId] = useState<string>("all");
  const [selectedSubProjectId, setSelectedSubProjectId] = useState<string>("all");

  // Lightbox State
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<DetailedProject[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Handle hash from URL (e.g., /projects#farmhouses or /portfolio#residential)
  useEffect(() => {
    const handleHash = () => {
      if (typeof window !== "undefined" && window.location.hash) {
        const hash = window.location.hash.replace("#", "");
        const matched = MAIN_TABS.find((c) => c.id === hash);
        if (matched) {
          setSelectedMainTabId(matched.id);
          setSelectedSubProjectId("all");
        }
      }
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const activeMainTab = useMemo(() => {
    return MAIN_TABS.find((t) => t.id === selectedMainTabId) || MAIN_TABS[0];
  }, [selectedMainTabId]);

  // Projects filtered by the single selected category tab
  const categoryBaseProjects = useMemo(() => {
    if (activeMainTab.id === "all") {
      return ALL_PROJECT_DATA;
    }
    return ALL_PROJECT_DATA.filter((p) => p.category === activeMainTab.categoryKey);
  }, [activeMainTab]);

  // Sub-projects within the selected category that have >= 2 projects
  const availableSubProjects = useMemo(() => {
    if (activeMainTab.id === "all") return [];

    const map = new Map<string, { id: string; name: string; clientScope: string; count: number }>();
    categoryBaseProjects.forEach((p) => {
      const existing = map.get(p.subProjectId);
      if (existing) {
        existing.count += 1;
      } else {
        map.set(p.subProjectId, {
          id: p.subProjectId,
          name: p.projectName,
          clientScope: p.clientScope,
          count: 1,
        });
      }
    });

    return Array.from(map.values()).filter((item) => item.count >= 2);
  }, [activeMainTab, categoryBaseProjects]);

  // Filter single category projects by active sub-project
  const singleCategoryProjects = useMemo(() => {
    if (selectedSubProjectId === "all" || activeMainTab.id === "all") {
      return categoryBaseProjects;
    }
    return categoryBaseProjects.filter((p) => p.subProjectId === selectedSubProjectId);
  }, [categoryBaseProjects, selectedSubProjectId, activeMainTab]);

  const handleMainTabChange = (tabId: string) => {
    setSelectedMainTabId(tabId);
    setSelectedSubProjectId("all");
  };

  const handleSubProjectChange = (subId: string) => {
    setSelectedSubProjectId(subId);
  };

  const openLightbox = (images: DetailedProject[], index: number) => {
    setLightboxImages(images);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="pt-24 pb-20 bg-[#fcfbfa] text-fg min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 pt-4">
        {/* ================= PAGE TITLE ================= */}
        <div className="text-center pb-6">
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-fg">
            Architectural Projects
          </h1>
        </div>

        {/* ================= 5 MAIN TABS (ALL + 4 CORE CATEGORIES) ================= */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pb-6">
          {MAIN_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = selectedMainTabId === tab.id;
            const count =
              tab.id === "all"
                ? ALL_PROJECT_DATA.length
                : ALL_PROJECT_DATA.filter((p) => p.category === tab.categoryKey).length;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleMainTabChange(tab.id)}
                className={`rounded-full px-5 sm:px-6 py-2.5 text-xs uppercase tracking-widest transition-all cursor-pointer font-medium flex items-center gap-2 ${
                  isActive
                    ? "gold-bg text-white shadow-md shadow-gold/25"
                    : "bg-white text-muted hover:text-fg hover:border-gold border border-gold/30 shadow-xs"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.name}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] ${
                    isActive ? "bg-white/20 text-white" : "bg-line/60 text-muted"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ================= SUB-PROJECTS BREAKDOWN (Only when a specific category is selected, e.g. Residential DLF Camellias vs DLF Magnolias) ================= */}
        {selectedMainTabId !== "all" && availableSubProjects.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pb-8">
            <button
              type="button"
              onClick={() => handleSubProjectChange("all")}
              className={`rounded-full px-4 py-1.5 text-xs tracking-wider transition-all cursor-pointer font-medium border ${
                selectedSubProjectId === "all"
                  ? "bg-[#17181c] text-white border-gold shadow-sm"
                  : "bg-white text-muted hover:text-fg hover:border-gold border-gold/30 shadow-2xs"
              }`}
            >
              All {activeMainTab.name} ({categoryBaseProjects.length})
            </button>

            {availableSubProjects.map((sp) => {
              const isSelected = selectedSubProjectId === sp.id;
              return (
                <button
                  key={sp.id}
                  type="button"
                  onClick={() => handleSubProjectChange(sp.id)}
                  className={`rounded-full px-4 py-1.5 text-xs tracking-wider transition-all cursor-pointer font-medium flex items-center gap-2 border ${
                    isSelected
                      ? "bg-[#17181c] text-white border-gold shadow-sm"
                      : "bg-white text-muted hover:text-fg hover:border-gold border-gold/30 shadow-2xs"
                  }`}
                >
                  <Building2 className="h-3.5 w-3.5 text-gold" />
                  <span>
                    {sp.name} · <span className="opacity-80 italic font-light">{sp.clientScope}</span>
                  </span>
                  <span
                    className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                      isSelected ? "bg-white/20 text-white" : "bg-line/60 text-muted"
                    }`}
                  >
                    {sp.count}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* ================= IF 'ALL' IS SELECTED: SHOW ALL 4 CATEGORIES ONE BELOW THE OTHER ================= */}
        {selectedMainTabId === "all" ? (
          <div className="space-y-16 sm:space-y-20 mt-2">
            {CORE_CATEGORIES.map((cat) => {
              const catProjects = ALL_PROJECT_DATA.filter((p) => p.category === cat.categoryKey);
              if (catProjects.length < 2) return null;

              return (
                <CategoryProjectSlider
                  key={cat.id}
                  categoryTitle={cat.name}
                  projects={catProjects}
                  onOpenLightbox={openLightbox}
                />
              );
            })}
          </div>
        ) : (
          /* ================= SINGLE CATEGORY VIEW ================= */
          <div className="mt-2">
            <CategoryProjectSlider
              categoryTitle={activeMainTab.name}
              projects={singleCategoryProjects}
              onOpenLightbox={openLightbox}
            />
          </div>
        )}
      </div>

      {/* ================= FULLSCREEN LIGHTBOX MODAL ================= */}
      <ImageLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={lightboxImages}
        currentIndex={lightboxIndex}
        onNavigate={(idx) => setLightboxIndex(idx)}
      />
    </div>
  );
}
