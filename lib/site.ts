// Single source of truth for SS Interiors (in the style and architectural depth of Monica Khanna Designs).

export const SITE = {
  name: "SS Interiors",
  founder: "Vishan Kumar Gautam",
  tagline: "Since 2016",
  since: 2016,
  motto: "Good design yearns for boundless style tht is underlined by simplicity",
  about:
    "Founded in 2016 by Vishan Kumar Gautam, SS INTERIORS is a design and execution firm specializing in premium residential and commercial projects, with expertise in high-end interior and exterior works.",
  email: "info@ssinteriors.in",
  phone: "+91 9205784061",
  altPhone: "+91 9891800510",
  whatsapp: "91 9205784061",
  address: "Building CL-2, Huda market, 3rd Floor - JMV tower, Sector 28, Gurugram, Haryana 122009",
  mapUrl: "https://www.google.com/maps/place/SS+Interiors+By+Vishan+Gautam/@28.4724778,77.0870977,17z/data=!4m10!1m2!2m1!1sBuilding+CL-2,+Huda+Market,+Sector+28,+Chakkarpur,+Gurugram,+Haryana+122009!3m6!1s0x390d192fc53b6915:0x8548f8a7c6a7ca35!8m2!3d28.4692894!4d77.0905569!15sCktCdWlsZGluZyBDTC0yLCBIdWRhIE1hcmtldCwgU2VjdG9yIDI4LCBDaGFra2FycHVyLCBHdXJ1Z3JhbSwgSGFyeWFuYSAxMjIwMDmSASBpbnRlcmlvcl9jb25zdHJ1Y3Rpb25fY29udHJhY3RvcuABAA!16s%2Fg%2F11z38zx3x6?entry=ttu&g_ep=EgoyMDI2MTAxOS4wIKXMDSoASAFQAw%3D%3D",
  instagram: "https://www.instagram.com/ssinteriorsbyvishan?xtok=Nm9ybTgxbnoxNWp0",
  facebook: "https://www.facebook.com/ssinteriorss",
  linkedin: "",
  pinterest: "",
  youtube: "",
};

export const NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact Us" },
];

export const THREE_PILLARS = [
  {
    title: "Residential",
    slug: "residential",
    image: "/projects/real/camellias/DSCF1000.JPG",
    description:
      "Our client’s needs and sensibilities are pivotal to our dream home creations. We combine a uniqueness in style with the nitty-gritties of the practical and functional to make our creations hugely distinctive. They are truly signatures of timeless appeal, with a stamp of minimalism and beautiful functionalism.",
    link: "/services#residential",
  },
  {
    title: "Office Interiors",
    slug: "offices",
    image: "/projects/real/commercial/15.jpg",
    description:
      "High-end office spaces that strike the perfect balance between sophistication and functionality. Each project is thoughtfully tailored to reflect the client’s brand identity while creating an environment that inspires productivity and comfort. With a refined aesthetic and meticulous attention to detail, the designs incorporate premium materials, smart spatial planning, and custom furnishings.",
    link: "/services#commercial",
  },
  {
    title: "Hospitality & Turnkey Execution",
    slug: "hospitality",
    image: "/projects/gallery/luxury_apartment_522/img_003.jpg",
    description:
      "Spaces That Welcome, Experiences That Stay. Our hospitality projects are a fusion of luxury, experience, and storytelling. From boutique retreats to private entertainment lounges, we design immersive spaces with natural stone, ambient lighting, and custom furniture.",
    link: "/services#hospitality",
  },
];

export interface ProjectShowcaseItem {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  featuredImage: string;
  gallery: { url: string; caption: string }[];
}

export const SHOWCASE_SECTIONS: ProjectShowcaseItem[] = [
  {
    id: "residential",
    title: "Luxury Residential Interiors",
    category: "Residential",
    tagline: "Bespoke Apartments, Penthouses & Duplexes",
    description:
      "From super-penthouses at DLF Camellias and DLF Magnolias to expansive duplexes across Delhi NCR, we create sanctuaries of understated opulence. Balancing custom millwork, ambient architectural lighting, sacred marble mandirs, and imported European materials.",
    featuredImage: "/projects/real/camellias/DSCF1000.JPG",
    gallery: [
      {
        url: "/projects/real/camellias/DSCF1000.JPG",
        caption: "DLF Camellias — Grand Formal Living Salon & Bookmatched Statuary Marble",
      },
      {
        url: "/projects/real/camellias/DSCF1023.JPG",
        caption: "DLF Camellias — Private Bar & Wood-Paneled Architectural Foyer",
      },
      {
        url: "/projects/real/camellias/DSCF1042.jpg",
        caption: "DLF Camellias — Hand-Carved Marble Mandir Sanctuary & Backlit Sacred Jali",
      },
      {
        url: "/projects/real/camellias/DSCF1031.JPG",
        caption: "DLF Camellias — Master Presidential Suite & Curved Architectural Headboard",
      },
      {
        url: "/projects/real/magnolias/DSCF1292.jpg",
        caption: "DLF Magnolias — Rose Quartz Semi-Precious Monolithic Ensuite Basin",
      },
      {
        url: "/projects/real/camellias/DSCF3037.JPG",
        caption: "DLF Camellias — Bookmatched Marble Master Ensuite with Frameless Glass",
      },
      {
        url: "/projects/real/magnolias/DSCF1307.jpg",
        caption: "DLF Magnolias — Italian Marble Architectural Entry Gallery & Niches",
      },
      {
        url: "/projects/real/camellias/DSCF6729.JPG",
        caption: "DLF Camellias — Formal Salon with Direct Panoramic Golf Course Vistas",
      },
    ],
  },
  {
    id: "commercial",
    title: "Commercial & Corporate Interiors",
    category: "Commercial",
    tagline: "Executive Workspaces & Corporate Headquarters",
    description:
      "Sophisticated corporate environments that reflect brand prestige and ignite executive collaboration. Delivering end-to-end turnkey MEP, HVAC, smart conferencing, and ergonomic acoustics across Gurgaon & Delhi NCR.",
    featuredImage: "/projects/real/commercial/15.jpg",
    gallery: [
      {
        url: "/projects/real/commercial/15.jpg",
        caption: "Executive Boardroom & Audio-Visual Presentation Suite — Modern Acoustic Engineering",
      },
      {
        url: "/projects/real/commercial/20.jpg",
        caption: "Managing Director Leadership Suite — Sleek Minimalist Desk & Custom Credenza",
      },
      {
        url: "/projects/real/commercial/27.jpg",
        caption: "Corporate Reception Lounge & Fluted Architectural Feature Wall",
      },
      {
        url: "/projects/real/commercial/16.jpg",
        caption: "Collaborative Open Workstation Bay — Ergonomic Furniture & Ambient Linears",
      },
      {
        url: "/projects/real/commercial/26.jpg",
        caption: "Executive Conference Room — Marble Table Setting & Presentation Display",
      },
      {
        url: "/projects/real/commercial/29.jpg",
        caption: "Corporate Sacred Mandir & Prayer Sanctum — Backlit Pristine Marble Shrine",
      },
      {
        url: "/projects/real/commercial/25.jpg",
        caption: "Corporate Breakout & Collaboration Hub — Modern Scandinavian High Stools",
      },
      {
        url: "/projects/gallery/corporate_workspaces/img_016_aralias_study.jpg",
        caption: "Executive Study & Leadership Worksuite — Bespoke Library & Ambient Lighting",
      },
      {
        url: "/projects/real/commercial/32.jpg",
        caption: "Executive Leadership Suite & Bespoke Wall Storage Architecture — Modern Minimalist Office",
      },
      {
        url: "/projects/real/commercial/33.jpg",
        caption: "Director Executive Cabin & Modern Linear Chandelier Detailing — Fluted Desk Front",
      },
    ],
  },
  {
    id: "hospitality",
    title: "Hospitality & Turnkey Execution",
    category: "Hospitality",
    tagline: "Boutique Lounges, Private Bars & Signature Venues",
    description:
      "Our hospitality and turnkey execution weaves mood, tactile textures, and statement architecture into cohesive luxury journeys from boutique retreats to private entertainment lounges.",
    featuredImage: "/projects/gallery/luxury_apartment_522/img_003.jpg",
    gallery: [
      {
        url: "/projects/gallery/luxury_apartment_522/img_003.jpg",
        caption: "DLF Camellias — Luxury Executive Foyer & Curved Sculptural Staircase",
      },
      {
        url: "/projects/gallery/luxury_apartment_522/img_001.jpg",
        caption: "DLF Camellias — Double-Height Grand Architectural Salon",
      },
      {
        url: "/projects/gallery/luxury_apartment_522/img_004.jpg",
        caption: "DLF Camellias — Statement Floating Spiral Staircase & Ambient Cove",
      },
      {
        url: "/projects/gallery/luxury_apartment_522/img_005.jpg",
        caption: "DLF Camellias — Curated Executive Lounge & Backlit Brass Console",
      },
      {
        url: "/projects/gallery/luxury_apartment_522/img_007.jpg",
        caption: "DLF Camellias — Master Bedroom Suite with Custom Acoustic Paneling",
      },
      {
        url: "/projects/gallery/luxury_apartment_522/img_009.jpg",
        caption: "DLF Camellias — Luxury Ensuite & Backlit Marble Vanity",
      },
      {
        url: "/projects/gallery/luxury_apartment_522/img_010.jpg",
        caption: "DLF Camellias — Walk-in Dressing Suite & Tinted Glass Wardrobes",
      },
      {
        url: "/projects/gallery/luxury_apartment_522/img_006.jpg",
        caption: "DLF Camellias — Architectural Living & Dining Gallery",
      },
    ],
  },
];

export const ADDITIONAL_PROJECTS = [
  {
    url: "/projects/corp_25.jpg",
    caption: "Corporate Breakout & Collaboration Hub — Modern Scandinavian High Stools",
    category: "Commercial",
    sectionId: "commercial",
    sectionTitle: "Commercial & Corporate Interiors",
  },
  {
    url: "/projects/corp_17.jpg",
    caption: "Agile Team Workspace — Glass Partitions & Acoustic Ceiling Clouds",
    category: "Commercial",
    sectionId: "commercial",
    sectionTitle: "Commercial & Corporate Interiors",
  },
  {
    url: "/projects/corp_21.jpg",
    caption: "Senior Executive Cabin — Panoramic Skyline Views & Ergonomic Mesh Seating",
    category: "Commercial",
    sectionId: "commercial",
    sectionTitle: "Commercial & Corporate Interiors",
  },
  {
    url: "/projects/corp_19.jpg",
    caption: "Executive Corridor & Gallery — Architectural Strip Lighting & Soundproofing",
    category: "Commercial",
    sectionId: "commercial",
    sectionTitle: "Commercial & Corporate Interiors",
  },
  {
    url: "/projects/camellias_real_4.jpg",
    caption: "DLF Camellias — Backlit Onyx Entry Console & Vertical Architectural Screen",
    category: "Residential",
    sectionId: "residential",
    sectionTitle: "Luxury Residential Interiors",
  },
  {
    url: "/projects/camellias_real_5.jpg",
    caption: "DLF Camellias — Fluted Timber Corridor & Concealed Flush Wardrobes",
    category: "Residential",
    sectionId: "residential",
    sectionTitle: "Luxury Residential Interiors",
  },
  {
    url: "/projects/camellias_real_6.jpg",
    caption: "DLF Camellias — Contemporary Fireplace Detail & Sculptural Mirrors",
    category: "Residential",
    sectionId: "residential",
    sectionTitle: "Luxury Residential Interiors",
  },
  {
    url: "/projects/magnolias_real_4.jpg",
    caption: "DLF Magnolias — Sculptural Birds Foyer Wall & Floating Stone Console",
    category: "Residential",
    sectionId: "residential",
    sectionTitle: "Luxury Residential Interiors",
  },
  {
    url: "/projects/magnolias_real_5.jpg",
    caption: "DLF Magnolias — Powder Room Hand-Carved Rose Onyx Basin",
    category: "Residential",
    sectionId: "residential",
    sectionTitle: "Luxury Residential Interiors",
  },
  {
    url: "/projects/curved_master_suite.jpg",
    caption: "Bespoke Master Bed Suite — Curved Velvet Headboard & Floating Cove Lighting",
    category: "Residential",
    sectionId: "residential",
    sectionTitle: "Luxury Residential Interiors",
  },
  {
    url: "/projects/thecrest_hero.jpg",
    caption: "DLF The Crest — Executive Headquarters Formal Reception",
    category: "Commercial",
    sectionId: "commercial",
    sectionTitle: "Commercial & Corporate Interiors",
  },
  {
    url: "/projects/gallery/luxury_apartment_522/img_003.jpg",
    caption: "DLF Camellias — Luxury Curved Architectural Foyer & Statement Spiral Staircase",
    category: "Hospitality",
    sectionId: "hospitality",
    sectionTitle: "Hospitality & Turnkey Execution",
  },
  {
    url: "/projects/aralias_2.jpg",
    caption: "DLF Aralias — Drawing Room & Formal Lounge with Earthy Textures",
    category: "Farmhouses",
    sectionId: "farmhouses",
    sectionTitle: "Country Estates & Farmhouses",
  },
  {
    url: "/projects/aralias_3.jpg",
    caption: "DLF Aralias — Countryside Villa Bedroom & Courtyard Views",
    category: "Farmhouses",
    sectionId: "farmhouses",
    sectionTitle: "Country Estates & Farmhouses",
  },
];

export const PRODUCT_SOURCING = {
  title: "Bespoke Product Sourcing & Global Furniture",
  subtitle: "Curated International Elegance for Discriminating Spaces",
  intro:
    "At SS Interiors, we personally curate and import exquisite furniture, statement lighting, and hand-selected natural stones from premier design capitals across Italy, Spain, Southeast Asia, and India. Every individual piece is selected to ensure exceptional build quality, sculptural silhouette, and enduring prestige.",
  categories: [
    {
      title: "Handcrafted Luxury Sofas",
      description: "Crafted with high-resilience memory foams, solid kiln-dried hardwood frames, and premium Italian top-grain leathers and tactile velvets.",
      image: "https://images.squarespace-cdn.com/content/v1/557a860ae4b0017a8adb0dba/80edd565-459a-4986-8a75-9f69937be768/Luxury%2BSofa%2BSet%2BFurniture.webp?format=1500w",
    },
    {
      title: "Bespoke Accent & Dining Chairs",
      description: "Sculptural forms that merge ergonomic support with visual drama. Custom brass legs, fluted upholstery, and tailored fabric selections.",
      image: "https://images.squarespace-cdn.com/content/v1/557a860ae4b0017a8adb0dba/d1e8fae8-413a-4c4f-b9a6-81111bcade73/Luxury%2BChairs%2BFurniture%2Bin%2BGurgaon%2BDelhi%2BNCR.webp?format=1500w",
    },
    {
      title: "Statuary Marble & Teak Dining Tables",
      description: "Centerpiece dining and conference tables carved from imported Calacatta, Nero Marquina, and single-slab exotic seasoned hardwoods.",
      image: "https://images.squarespace-cdn.com/content/v1/557a860ae4b0017a8adb0dba/8bdc8fd6-48a5-4b1e-b988-624110c14c9c/Luxury%2BTables%2BFurniture%2Bin%2BGurgaon%2BDelhi%2BNCR.webp?format=1500w",
    },
    {
      title: "Architectural Statement Lighting",
      description: "Hand-blown Murano glass pendants, minimalist geometric brass chandeliers, and precision architectural recessed spotlights.",
      image: "https://images.squarespace-cdn.com/content/v1/557a860ae4b0017a8adb0dba/7dde88b2-4b4d-416b-b75e-e826f6ab1340/YURA%2BPREMIUM%2BFURNITURE%2BDESIGNS.webp?format=1500w",
    },
  ],
};

export const PRESS_ITEMS = [
  {
    publication: "Architectural Digest",
    title: "Mastering the Art of Quiet Opulence: Inside SS Interiors' Award-Winning Residences",
    date: "Annual Design Edition",
    image: "https://images.squarespace-cdn.com/content/v1/557a860ae4b0017a8adb0dba/1750832151758-246OOAL6G9DEDWRDUQ4Q/Monica+Khanna+Designer+%7BReprint%7D_page-0002.jpg?format=1500w",
    quote: "A masterclass in restraint, functional grandeur, and immaculate execution that redefines luxury in Gurgaon and Delhi NCR.",
  },
  {
    publication: "Elle Decor",
    title: "The Visionaries Shaping Next-Generation Modern Farmhouses & Workspaces",
    date: "Design Icon Feature",
    image: "https://images.squarespace-cdn.com/content/v1/557a860ae4b0017a8adb0dba/1750832154771-3GIL2D5OVW7J245423G5/Monica+Khanna+Designer+%7BReprint%7D_page-0003.jpg?format=1500w",
    quote: "SS Interiors creates spaces that celebrate both heritage warmth and cutting-edge international aesthetics.",
  },
  {
    publication: "GoodHomes Magazine",
    title: "Top 10 Interior Design Studios in Delhi NCR for Bespoke Turnkey Execution",
    date: "Special Spotlight",
    image: "https://images.squarespace-cdn.com/content/v1/557a860ae4b0017a8adb0dba/1750832151758-246OOAL6G9DEDWRDUQ4Q/Monica+Khanna+Designer+%7BReprint%7D_page-0002.jpg?format=1500w",
    quote: "Their commitment to precision engineering, turnkey accountability, and curated materials sets them apart.",
  },
];

export const BLOG_POSTS = [
  {
    slug: "colour-psychology-in-interiors",
    title: "Colour Psychology in Interiors: What Your Wall Colours Say About You",
    subtitle: "How strategic hues elevate mood, productivity, and the emotional aura of your space",
    date: "March 2026",
    readTime: "5 min read",
    image: "https://images.squarespace-cdn.com/content/v1/557a860ae4b0017a8adb0dba/4f61695c-d90a-4bde-9b12-f866c6cee6e4/Luxury%2BApartment%2BLiving%2BRoom%2Bmonica%2Bkhanna%2Bdesigns.webp?format=1500w",
    excerpt:
      "In the evolving world of luxury interior design, color carries profound emotional weight. Beyond surface aesthetics, it shapes how occupants perceive volume, relaxation, and creative energy. Here is how leading designers use intentional palettes in Gurgaon and Delhi NCR.",
    content: [
      "In the evolving world of interior design, one element often overlooked yet deeply impactful is colour. Beyond its decorative appeal, colour carries emotional weight; it shapes moods, influences productivity, and even affects how people perceive a space. This is where Colour Psychology comes into play, helping designers create environments that are not only beautiful but also meaningful.",
      "From residential interiors to modern offices, the thoughtful use of colour has become a defining factor in successful design. In Gurgaon and Delhi NCR, where lifestyle and corporate cultures are rapidly transforming, leading interior design firms are increasingly using colour as a strategic tool to make spaces both functional and emotionally engaging.",
      "A well-executed interior is not just about furniture placement or lighting. Colours can turn ordinary rooms into inspiring environments. Applying principles of Colour Psychology allows spaces to improve focus, creativity, and productivity in workspaces, foster comfort and balance in homes, express individuality and personal taste, strengthen brand identity in commercial interiors, and create harmony between aesthetics and emotional well-being.",
    ],
  },
  {
    slug: "modern-workspaces-transformation",
    title: "How Design Experts Are Transforming Modern Workspaces",
    subtitle: "The shift toward agile, biophilic, and wellness-centric executive environments",
    date: "February 2026",
    readTime: "6 min read",
    image: "https://images.squarespace-cdn.com/content/v1/557a860ae4b0017a8adb0dba/4228d866-d3c2-43e5-af0e-f20179c8d3f3/Office%2BMonica%2BKhanna%2BDesigns.webp?format=1500w",
    excerpt:
      "Modern corporate environments must do more than seat employees—they must inspire innovation, retain leadership talent, and reflect corporate prestige. Explore the integration of smart acoustics, MEP engineering, and boutique comfort.",
    content: [
      "The post-pandemic corporate office has evolved into an experiential destination. Employees and executives require environments that encourage impromptu brainstorming while offering acoustic sanctuaries for deep focus.",
      "By integrating comprehensive in-house HVAC zoning, glare-free circadian lighting, and custom ergonomic joinery, SS Interiors ensures that commercial headquarters not only look stunning on arrival but function seamlessly day in and day out.",
      "Smart spatial planning combined with premium natural textures—fluted walnut, honed quartzite, and soft acoustic felts—elevates the corporate landscape into a statement of timeless ambition.",
    ],
  },
  {
    slug: "luxury-farmhouse-retreats",
    title: "Designing Retreats of Tranquility: Vastu, Light & Grandeur in Luxury Farmhouses",
    subtitle: "Harmonizing rural expanse with contemporary luxury and sustainable architecture",
    date: "January 2026",
    readTime: "7 min read",
    image: "https://images.squarespace-cdn.com/content/v1/557a860ae4b0017a8adb0dba/079a8822-e71f-4645-8da4-60e00448d430/Farmhouse%2Bliving%2Barea%2Bdesign.webp?format=1500w",
    excerpt:
      "Crafting an expansive farmhouse is an exercise in soul and scale. How to balance double-height volumetric architecture with intimate warmth, lush landscape orientation, and Vastu principles.",
    content: [
      "A farmhouse is not merely a residence; it is a restorative refuge from the frantic pace of metropolitan life. Designing on expansive acres requires a thoughtful balance between grand architectural statements and human-scale warmth.",
      "Orientation is everything. Orienting living pavilions to capture eastern morning daylight while shielding interiors from harsh afternoon heat creates spaces naturally filled with warmth and light.",
      "Vastu-compliant spatial choreography ensures that water elements, prayer sanctuaries, and master chambers occupy energetically harmonious sectors, infusing every corner with peaceful serenity.",
    ],
  },
];

export const VENDOR_NOTICE = {
  title: "VENDOR INQUIRY",
  text: "We are constantly looking for vendors and partners for our projects. We do not accept calls or texts at this time. Please send us your details at info@ssinteriors.in and include ‘VENDOR’ in the subject so we don’t miss it. We will review your product line and get back to you as needed. Please send us only one email. Thank you.",
};

export const PROCESS = [
  {
    step: "01",
    title: "Concept & Planning",
    text: "Comprehensive lifestyle analysis, space planning, design mood boards, and photorealistic 3D architectural visualisations.",
  },
  {
    step: "02",
    title: "Technical & BOQ",
    text: "Complete architectural working drawings, MEP, HVAC, lighting schematics, and transparent itemised Bill of Quantities (BOQ).",
  },
  {
    step: "03",
    title: "Cost & Management",
    text: "Transparent budget estimation, milestone scheduling, material procurement coordination, and stringent cost control.",
  },
  {
    step: "04",
    title: "Turnkey Execution",
    text: "Dedicated on-site project management, precision craftsmanship, quality inspections, bespoke styling, and flawless handover.",
  },
];

export const img = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;
