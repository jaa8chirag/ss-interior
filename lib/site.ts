// Single source of truth for SS Interiors (in the style and architectural depth of Monica Khanna Designs).

export const SITE = {
  name: "SS Interiors",
  tagline: "Since 2016",
  since: 2016,
  motto: "Good design yearns for boundless style that is underlined by simplicity",
  email: "info@ssinteriors.in",
  phone: "+91 95997 32700",
  altPhone: "+91 98100 88200",
  whatsapp: "919599732700",
  address: "DLF Cross Point, 5th Floor, DLF City Phase IV, Sector 28, Gurgaon, Delhi NCR, 122002 India",
  instagram: "https://instagram.com/ssinteriors",
  facebook: "https://facebook.com/ssinteriors",
  linkedin: "https://linkedin.com/company/ss-interiors",
  pinterest: "https://pinterest.com/ssinteriors",
  youtube: "https://youtube.com/@ssinteriors",
};

export const NAV = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/product-sourcing", label: "Product Sourcing" },
  { href: "/press", label: "Press" },
  { href: "/blogs", label: "Blogs" },
  { href: "/contact", label: "Contact" },
];

export const THREE_PILLARS = [
  {
    title: "Residential",
    slug: "residential",
    image: "https://images.squarespace-cdn.com/content/v1/557a860ae4b0017a8adb0dba/4f61695c-d90a-4bde-9b12-f866c6cee6e4/Luxury%2BApartment%2BLiving%2BRoom%2Bmonica%2Bkhanna%2Bdesigns.webp?format=1500w",
    description:
      "Our client’s needs and sensibilities are pivotal to our dream home creations. We combine a uniqueness in style with the nitty-gritties of the practical and functional to make our creations hugely distinctive. They are truly signatures of timeless appeal, with a stamp of minimalism and beautiful functionalism.",
    link: "/portfolio#apartments",
  },
  {
    title: "Office Interiors",
    slug: "offices",
    image: "https://images.squarespace-cdn.com/content/v1/557a860ae4b0017a8adb0dba/4228d866-d3c2-43e5-af0e-f20179c8d3f3/Office%2BMonica%2BKhanna%2BDesigns.webp?format=1500w",
    description:
      "High-end office spaces that strike the perfect balance between sophistication and functionality. Each project is thoughtfully tailored to reflect the client’s brand identity while creating an environment that inspires productivity and comfort. With a refined aesthetic and meticulous attention to detail, the designs incorporate premium materials, smart spatial planning, and custom furnishings.",
    link: "/portfolio#offices",
  },
  {
    title: "Hospitality",
    slug: "hospitality",
    image: "https://images.squarespace-cdn.com/content/v1/557a860ae4b0017a8adb0dba/ca77bf20-d673-4e06-a306-d480f9f45715/Hotel%2BPool%2BMonica%2BKhanna%2BDesigns.webp?format=1500w",
    description:
      "Spaces That Welcome, Experiences That Stay. Our hospitality projects are a fusion of luxury, experience, and storytelling. From boutique hotels to upscale resorts, we design immersive spaces that leave a lasting impression. Every element is thoughtfully curated - from mood lighting to custom furniture - to enhance guest comfort and brand identity.",
    link: "/portfolio#hospitality",
  },
];

export interface ProjectShowcaseItem {
  id: string;
  title: string;
  category: "Apartments" | "Farmhouses" | "Office Interior" | "Hospitality";
  tagline: string;
  description: string;
  featuredImage: string;
  gallery: { url: string; caption: string }[];
}

export const SHOWCASE_SECTIONS: ProjectShowcaseItem[] = [
  {
    id: "apartments",
    title: "Apartments",
    category: "Apartments",
    tagline: "Where Luxury Meets Lifestyle, Room by Room.",
    description:
      "We design luxurious, detail-rich apartments that reflect elegance and individuality. Our bespoke interiors blend global design sensibilities with personalized touches, creating spaces that are both stylish and functional. Each apartment is a seamless balance of comfort, sophistication, and timeless aesthetics. With curated furniture from India, Europe, and Southeast Asia, every element is meticulously selected.",
    featuredImage:
      "https://images.squarespace-cdn.com/content/v1/557a860ae4b0017a8adb0dba/4f61695c-d90a-4bde-9b12-f866c6cee6e4/Luxury%2BApartment%2BLiving%2BRoom%2Bmonica%2Bkhanna%2Bdesigns.webp?format=1500w",
    gallery: [
      {
        url: "https://images.squarespace-cdn.com/content/v1/557a860ae4b0017a8adb0dba/4f61695c-d90a-4bde-9b12-f866c6cee6e4/Luxury%2BApartment%2BLiving%2BRoom%2Bmonica%2Bkhanna%2Bdesigns.webp?format=1500w",
        caption: "Luxury Apartment Living Room — Bespoke Silhouettes & Warm Ambient Lighting",
      },
      {
        url: "https://images.squarespace-cdn.com/content/v1/557a860ae4b0017a8adb0dba/8486ea4d-09ba-4183-9fdc-8022279fb9ed/Interior_View_Kitchen_upscayl_3x_ultramix_balanced.webp?format=1500w",
        caption: "Modern Minimalist Kitchen — Integrated Quartz Finishes & High-End Appliances",
      },
      {
        url: "https://images.squarespace-cdn.com/content/v1/557a860ae4b0017a8adb0dba/b34d2ad8-e7f1-43b0-843b-647cb0633fcd/Flat%2BDrawing%2BRoom%2BInterior%2BDesign.webp?format=1500w",
        caption: "Drawing Room & Formal Lounge — Tailored European Upholstery & Statement Art",
      },
      {
        url: "https://images.squarespace-cdn.com/content/v1/557a860ae4b0017a8adb0dba/e5a6e92f-293c-48b4-98a8-157808831f26/Luxury%2BApartment%2BBedroom%2Bmonica%2Bkhanna%2Bdesigns.webp?format=1500w",
        caption: "Master Bedroom Suite — Custom Acoustic Paneling & Muted Neutral Palette",
      },
      {
        url: "https://images.squarespace-cdn.com/content/v1/557a860ae4b0017a8adb0dba/c3b96f9b-9ca9-43b0-8eb8-2b5864875df4/Apartment%2BLiving%2BRoom%2BMonica%2BKhanna%2BDesigns.webp?format=1500w",
        caption: "Curated Living Area — Seamless Indoor-Outdoor Flow & Natural Light",
      },
      {
        url: "https://images.squarespace-cdn.com/content/v1/557a860ae4b0017a8adb0dba/4353f9c6-98b4-422b-b31a-2f6dd57e81f5/Best+Interior+Designer+in+Gurgaon.webp?format=1500w",
        caption: "Penthouse Dining Space — Fluted Wood Accents & Handcrafted Chandelier",
      },
    ],
  },
  {
    id: "farmhouses",
    title: "Farmhouses",
    category: "Farmhouses",
    tagline: "Retreats of Tranquility, Crafted with Soul.",
    description:
      "Our farmhouse designs embody luxury, tranquility, and nature in perfect harmony. We specialise in expansive layouts, sustainable solutions, and Vastu-compliant planning. From architectural design to interior execution, every detail is tailored to elevate rural living into a refined, resort-like experience. Our expertise lies in combining comfort with understated grandeur.",
    featuredImage:
      "https://images.squarespace-cdn.com/content/v1/557a860ae4b0017a8adb0dba/079a8822-e71f-4645-8da4-60e00448d430/Farmhouse%2Bliving%2Barea%2Bdesign.webp?format=1500w",
    gallery: [
      {
        url: "https://images.squarespace-cdn.com/content/v1/557a860ae4b0017a8adb0dba/079a8822-e71f-4645-8da4-60e00448d430/Farmhouse%2Bliving%2Barea%2Bdesign.webp?format=1500w",
        caption: "Farmhouse Great Hall — Double-Height Glazing & Hand-Chiseled Natural Stone",
      },
      {
        url: "https://images.squarespace-cdn.com/content/v1/557a860ae4b0017a8adb0dba/ef489f30-0aac-48c5-b65c-b0fb1ec2a97b/Farmhouse%2Bdrawing%2Broom%2Binterior%2Bdesign.webp?format=1500w",
        caption: "Farmhouse Drawing Room — Earthy Textures, Solid Teak Joinery & Fireplace",
      },
      {
        url: "https://images.squarespace-cdn.com/content/v1/557a860ae4b0017a8adb0dba/b713c459-a29b-454f-8221-9afcc686f730/farmhouse%2Bbedroom%2Binterior%2Bdesign.webp?format=1500w",
        caption: "Countryside Villa Bedroom — Organic Linens, Ambient Glow & Courtyard Views",
      },
      {
        url: "https://images.squarespace-cdn.com/content/v1/557a860ae4b0017a8adb0dba/1761993007277-2WPCNLZCZSS9L52DXH35/Farmhouse+Interior+Design+outer+view.webp?format=1500w",
        caption: "Exterior Landscape & Veranda — Harmonizing Architecture with Nature",
      },
      {
        url: "https://images.squarespace-cdn.com/content/v1/557a860ae4b0017a8adb0dba/1761991932999-15TAG2F1LL5WPJG44MIW/Asthetic+Dining+Area+Interior.webp?format=1500w",
        caption: "Aesthetic Dining Sanctuary — Hand-Poured Terrazzo & Bespoke Brass Hardware",
      },
      {
        url: "https://images.squarespace-cdn.com/content/v1/557a860ae4b0017a8adb0dba/1761993004510-TD1FLBPMFESJ2CSBWFQY/Farmhouse+Interior+Drawing+Room+Design.webp?format=1500w",
        caption: "Intimate Reading Lounge — Classical Proportions with Contemporary Warmth",
      },
    ],
  },
  {
    id: "offices",
    title: "Office Interior",
    category: "Office Interior",
    tagline: "Workspaces That Think, Create, and Inspire.",
    description:
      "We create dynamic and modern workspaces that foster productivity and innovation. From premium finishes to ergonomic planning, our office interiors are built to inspire. With complete in-house execution of HVAC, MEP, and fire systems, we offer fully integrated solutions. Our team delivers smart, sustainable corporate environments across India.",
    featuredImage:
      "https://images.squarespace-cdn.com/content/v1/557a860ae4b0017a8adb0dba/4228d866-d3c2-43e5-af0e-f20179c8d3f3/Office%2BMonica%2BKhanna%2BDesigns.webp?format=1500w",
    gallery: [
      {
        url: "https://images.squarespace-cdn.com/content/v1/557a860ae4b0017a8adb0dba/4228d866-d3c2-43e5-af0e-f20179c8d3f3/Office%2BMonica%2BKhanna%2BDesigns.webp?format=1500w",
        caption: "Executive Suite & Reception — Polished Stone, Slat Wall Architecture & Custom Lighting",
      },
      {
        url: "https://images.squarespace-cdn.com/content/v1/557a860ae4b0017a8adb0dba/bc3d7cb8-8a13-411c-988c-d0e937749d66/Office%2BCabin%2BInterior%2BMonica%2BKhanna%2BDesigns.webp?format=1500w",
        caption: "Managing Director Cabin — Sleek Minimalist Desk, Veneer Paneling & Art Display",
      },
      {
        url: "https://images.squarespace-cdn.com/content/v1/557a860ae4b0017a8adb0dba/1750417875948-TBBRWE6TQBMFP5EQZWC9/Conference+Room+Interior+Design.jpg?format=1500w",
        caption: "Boardroom & Video-Conferencing Center — Acoustic Ceiling & Integrated Smart Tech",
      },
      {
        url: "https://images.squarespace-cdn.com/content/v1/557a860ae4b0017a8adb0dba/1750417874661-6NBFT9A5WLWFI6OGOUI1/Office+Interior+Design.jpg?format=1500w",
        caption: "Collaborative Work Lounge — Ergonomic Seating & Biophilic Planters",
      },
      {
        url: "https://images.squarespace-cdn.com/content/v1/557a860ae4b0017a8adb0dba/1750417870560-T0UING4VK9DP66CCW43R/Office+Cabin+Design.jpg?format=1500w",
        caption: "Private Consultation Cabin — Tailored Library Shelving & Premium Leather Finishes",
      },
      {
        url: "https://images.squarespace-cdn.com/content/v1/557a860ae4b0017a8adb0dba/1763111857685-483QW4N7OY074L01WN8G/Executive%2BOffice%2BInterior%2BDesigner%2Bin%2BGurgaon.webp?format=1500w",
        caption: "Corporate Headquarters Floor — High-Performance Lighting & Turnkey MEP Integration",
      },
    ],
  },
  {
    id: "hospitality",
    title: "Hospitality",
    category: "Hospitality",
    tagline: "Spaces That Welcome, Experiences That Stay.",
    description:
      "Our hospitality projects are a fusion of luxury, experience, and storytelling. From boutique hotels to upscale resorts, we design immersive spaces that leave a lasting impression. Every element is thoughtfully curated - from mood lighting to custom furniture - to enhance guest comfort and brand identity. We bring creativity and functionality together in every guest experience.",
    featuredImage:
      "https://images.squarespace-cdn.com/content/v1/557a860ae4b0017a8adb0dba/ca77bf20-d673-4e06-a306-d480f9f45715/Hotel%2BPool%2BMonica%2BKhanna%2BDesigns.webp?format=1500w",
    gallery: [
      {
        url: "https://images.squarespace-cdn.com/content/v1/557a860ae4b0017a8adb0dba/ca77bf20-d673-4e06-a306-d480f9f45715/Hotel%2BPool%2BMonica%2BKhanna%2BDesigns.webp?format=1500w",
        caption: "Luxury Resort Infinity Pool & Sunken Lounge — Architectural Illumination",
      },
      {
        url: "https://images.squarespace-cdn.com/content/v1/557a860ae4b0017a8adb0dba/2d3b0756-3225-45d0-8630-97966ba0a866/Hotel%2BRestaurant%2BInterior%2BMonica%2BKhanna%2BDesigns.webp?format=1500w",
        caption: "Fine Dining Restaurant & Bar — Moody Velvet Accents & Brass Geometric Screens",
      },
      {
        url: "https://images.squarespace-cdn.com/content/v1/557a860ae4b0017a8adb0dba/6d2ca7b4-b987-44ad-bb93-fb0bb4d7306d/Hotel%2BBedroom%2BMonica%2BKhanna%2BDesigns.webp?format=1500w",
        caption: "Presidential Hotel Suite — Luxurious Bedscape & Custom Dressing Wardrobes",
      },
      {
        url: "https://images.squarespace-cdn.com/content/v1/557a860ae4b0017a8adb0dba/e4249240-11db-4068-8625-67f538632403/Resort%2BBedroom%2BInterior%2BDesign.webp?format=1500w",
        caption: "Boutique Heritage Suite — Artisanal Detailing & Royal Architectural Echoes",
      },
      {
        url: "https://images.squarespace-cdn.com/content/v1/557a860ae4b0017a8adb0dba/24270926-a05b-45c9-af36-f3f143938267/Hospitality%2BInterior%2BDesign.webp?format=1500w",
        caption: "Resort Lobby & Atrium — Grand Volumetric Proportions & Natural Greenery",
      },
    ],
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
  { step: "01", title: "Discovery & Brief", text: "In-depth consultation, lifestyle analysis, site survey, and functional requirement mapping." },
  { step: "02", title: "Concept & 3D Visuals", text: "Mood boards, space planning, detailed 3D photorealistic walkthroughs, and material selection." },
  { step: "03", title: "Technical & BOQ", text: "Comprehensive MEP, HVAC, joinery working drawings, and a fully transparent itemised BOQ." },
  { step: "04", title: "Turnkey Execution", text: "Dedicated project lead, rigorous quality inspections, bespoke styling, and flawless handover." },
];

export const img = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;
