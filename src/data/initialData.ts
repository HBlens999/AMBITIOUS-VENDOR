import {
  SiteSettings,
  HeroSettings,
  MarqueeSettings,
  ServiceItem,
  PortfolioProject,
  PerfumeProduct,
  AboutContent,
  MediaAsset,
  ThemeSettings,
  ContactSubmission,
} from '../types';

export const initialSiteSettings: SiteSettings = {
  siteName: 'AMBITIOUS VENDOR',
  tagline: 'Strategy, Visual Storytelling & Digital Experiences',
  phone: '08080608722',
  email: '001ambitious@gmail.com',
  whatsapp: '2348080608722',
  logoText: 'AMBITIOUS VENDOR',
  seoTitle: 'AMBITIOUS VENDOR – Creative Studio & Fragrance Brand',
  seoDescription:
    'A passionate creative studio bridging graphic design, responsive website development, high-retention video editing, and exclusive luxury perfumes.',
  canonicalUrl: 'https://ambitiousvendor.com',
  faviconUrl: '',
};

export const initialHeroSettings: HeroSettings = {
  headline: 'AMBITIOUS VENDOR',
  color1: '#D63384', // Signature rose pink
  color2: '#FFFFFF', // Pure white
  color3: '#F48FB1', // Soft rose
  color4: '#AD1457', // Deep berry
  color5: '#FFD6E7' // Blush pink
  duration: 12, // 12 seconds per full color loop
  glowIntensity: 0.65,
  fontSizeRem: 8.5,
  letterSpacing: '-0.04em',
  bgImage: '/src/assets/images/hero_blue_mountains_1791546176773.jpg',
  subheading: 'Strategy · Design · Motion · Fragrance',
  description:
    'A passionate graphic designer and skilled video editor, I bridge the gap between strategy and creativity. I craft cohesive brand identities and produce high-retention video content tailored for modern digital platforms, ensuring every project is visually stunning, purposeful, and results-driven.',
  primaryCtaText: 'Explore Our Services',
  primaryCtaLink: '/services',
  secondaryCtaText: 'Contact Us',
  secondaryCtaLink: '/contact',
  showMist: true,
  showParticles: true,
  parallaxIntensity: 1,
};

export const initialMarqueeSettings: MarqueeSettings = {
  speedSeconds: 26,
  direction: 'left',
  separator: '✦',
  items: [
    'GRAPHIC DESIGN',
    'WEBSITE DEVELOPMENT',
    'PERFUME VENDOR',
    'VIDEO EDITING',
  ],
};

export const initialServices: ServiceItem[] = [
  {
    id: 'srv-1',
    title: 'Graphic Design',
    slug: 'graphic-design',
    category: 'Visual Identity & Branding',
    shortDescription:
      'Distinctive visual identities, bespoke brand systems, vector iconography, and high-impact editorial collateral.',
    fullDescription:
      'We craft iconic brand marks, coherent typography systems, packaging design, and modern marketing graphics tailored to communicate distinction and prestige in competitive markets.',
    image: '/src/assets/images/graphic_design_showcase_1791546187744.jpg',
    startingPrice: 'Custom Quote',
    order: 1,
    published: true,
    deliverables: [
      'Comprehensive Brand Identity Systems',
      'Logo Suites & Typography Guidelines',
      'Social Media Art Direction & Templates',
      'Print & Editorial Layouts',
      'Vector Graphics & Custom Iconography',
    ],
    ctaText: 'Inquire About Graphic Design',
  },
  {
    id: 'srv-2',
    title: 'Website Development',
    slug: 'website-development',
    category: 'Engineering & Web Design',
    shortDescription:
      'High-performance, bespoke web applications and interactive landing pages built for modern responsiveness and conversion.',
    fullDescription:
      'From custom responsive interfaces and creative developer portfolios to dynamic CMS-driven platforms, we build sleek digital experiences with uncompromising speed, fluidity, and attention to detail.',
    image: '/src/assets/images/web_development_showcase_1791546198993.jpg',
    startingPrice: 'Custom Quote',
    order: 2,
    published: true,
    deliverables: [
      'Tailored UI/UX Design & Architecture',
      'Full-Stack Responsive Web Apps',
      'Dynamic CMS & Database Integration',
      'Optimized Core Web Vitals & SEO',
      'Interactive Micro-Animations & Motion',
    ],
    ctaText: 'Inquire About Web Development',
  },
  {
    id: 'srv-3',
    title: 'Perfume Vendor',
    slug: 'perfume-vendor',
    category: 'Luxury Fragrance & Olfactory Art',
    shortDescription:
      'Curated artisan fragrances, luxury niche extraits, and memorable scent profiles packaged with sophisticated presentation.',
    fullDescription:
      'Fragrance is an unseen signature of character and taste. We curate, present, and distribute premium, high-sillage perfumes and exclusive scent selections designed to leave an unforgettable impression.',
    image: '/src/assets/images/perfume_luxury_bottle_1791546209395.jpg',
    startingPrice: 'Inquire for Catalog',
    order: 3,
    published: true,
    deliverables: [
      'Artisan Eau de Parfum Formulations',
      'Private Reserve Concentrated Oils',
      'Curated Scent Discovery Selections',
      'Luxury Gift Packaging & Presentation',
      'Consultative Scent Matching',
    ],
    ctaText: 'Explore Fragrance Collection',
  },
  {
    id: 'srv-4',
    title: 'Video Editing',
    slug: 'video-editing',
    category: 'Cinematography & Motion Design',
    shortDescription:
      'Cinematic pacing, color grading, sound design, and high-retention video editing crafted for digital reels and commercial campaigns.',
    fullDescription:
      'Transforming raw footage into hypnotic visual narratives. Specializing in high-retention pacing, narrative structure, audio mastering, sound design effects, and cinematic color correction.',
    image: '/src/assets/images/video_editing_suite_1791546219495.jpg',
    startingPrice: 'Custom Quote',
    order: 4,
    published: true,
    deliverables: [
      'High-Retention Short-Form Reels & TikToks',
      'Commercial Campaign Post-Production',
      'Bespoke Sound Design & Spatial Audio',
      'Cinematic LUT Color Grading',
      'Motion Graphics & Title Animations',
    ],
    ctaText: 'Inquire About Video Editing',
  },
];

export const initialPortfolio: PortfolioProject[] = [
  {
    id: 'proj-1',
    title: 'Aurum & Co. Visual Identity System',
    slug: 'aurum-co-brand-identity',
    category: 'Graphic Design',
    description:
      'An editorial brand identity suite featuring gold-foil print guidelines, geometric monogram lockups, and luxury packaging layout.',
    image: '/src/assets/images/graphic_design_showcase_1791546187744.jpg',
    order: 1,
    published: true,
    year: '2026',
    client: 'Aurum House',
    tags: ['Branding', 'Typography', 'Print Design'],
  },
  {
    id: 'proj-2',
    title: 'Studio.OS Creative Platform',
    slug: 'studio-os-platform',
    category: 'Website Development',
    description:
      'A hyper-responsive digital showcase web application with custom dark navy UI, fluid motion physics, and integrated portfolio management.',
    image: '/src/assets/images/web_development_showcase_1791546198993.jpg',
    order: 2,
    published: true,
    year: '2026',
    client: 'Studio OS International',
    tags: ['React', 'TypeScript', 'Tailwind CSS'],
  },
  {
    id: 'proj-3',
    title: 'Aura Véris Niche Eau De Parfum',
    slug: 'aura-veris-campaign',
    category: 'Perfume Vendor',
    description:
      'Art-directed visual campaign and signature launch presentation for the Aura Véris 100ml luxury extrait de parfum.',
    image: '/src/assets/images/perfume_luxury_bottle_1791546209395.jpg',
    order: 3,
    published: true,
    year: '2026',
    client: 'Maison Luna Paris',
    tags: ['Fragrance', 'Packaging', 'Art Direction'],
  },
  {
    id: 'proj-4',
    title: 'Nightfall Cinematic Narrative Reel',
    slug: 'nightfall-cinematic-reel',
    category: 'Video Editing',
    description:
      'Dynamic multi-track narrative edit featuring rhythmic transitions, analog audio textures, and customized atmospheric color grades.',
    image: '/src/assets/images/video_editing_suite_1791546219495.jpg',
    order: 4,
    published: true,
    year: '2026',
    client: 'Vanguard Media',
    tags: ['Post-Production', 'Color Grading', 'Sound Design'],
  },
];

export const initialPerfumes: PerfumeProduct[] = [
  {
    id: 'perf-1',
    name: 'Aura Véris',
    tagline: 'Warm Amber, Frankincense & Bergamot',
    description:
      'A warm, magnetic scent profile opening with radiant Calabrian bergamot and evolving into royal frankincense, velvety vanilla, and deep cedarwood.',
    image: '/src/assets/images/perfume_luxury_bottle_1791546209395.jpg',
    price: 'Contact for Pricing',
    status: 'Available',
    category: 'Eau de Parfum',
    notes: 'Top: Bergamot, Pink Pepper · Heart: Frankincense, Orris · Base: Amber, Cedarwood, Bourbon Vanilla',
    volume: '100ml / 3.4 fl. oz.',
    order: 1,
    published: true,
    inquiryLink: '/contact?service=Perfume+Vendor',
  },
  {
    id: 'perf-2',
    name: 'Bleu Minuit Reserve',
    tagline: 'Smoky Vetiver, Leather & Night Lavender',
    description:
      'An enigmatic, nocturnal fragrance capturing misty mountain air, crushed lavender leaves, aged saddle leather, and rich Haitian vetiver.',
    image: '/src/assets/images/hero_blue_mountains_1791546176773.jpg',
    price: 'Contact for Pricing',
    status: 'Limited Stock',
    category: 'Extrait de Parfum',
    notes: 'Top: Cardamom, Crisp Juniper · Heart: French Lavender, Birch Smoke · Base: Vetiver, Tuscan Leather',
    volume: '50ml / 1.7 fl. oz.',
    order: 2,
    published: true,
    inquiryLink: '/contact?service=Perfume+Vendor',
  },
  {
    id: 'perf-3',
    name: 'Solar Santal',
    tagline: 'Creamy Sandalwood, Cardamom & White Musk',
    description:
      'An intoxicating modern classic with smooth Australian sandalwood, cracked green cardamom pods, and a lingering skin musk sillage.',
    image: '/src/assets/images/graphic_design_showcase_1791546187744.jpg',
    price: 'Contact for Pricing',
    status: 'Available',
    category: 'Perfume Oil / Attar',
    notes: 'Top: Green Cardamom, Violet Leaf · Heart: Papyrus, Iris · Base: Sandalwood, Cashmeran, Ambergris',
    volume: '12ml Concentrated Oil',
    order: 3,
    published: true,
    inquiryLink: '/contact?service=Perfume+Vendor',
  },
];

export const initialAboutContent: AboutContent = {
  headline: 'Bridging Strategy, Creative Direction & Multi-Disciplinary Craft',
  brandIntro:
    'AMBITIOUS VENDOR is a creative brand built around the intersection of strategy, visual storytelling, and digital experiences. From distinctive graphic design and modern websites to engaging video content and fragrance offerings, the goal is to create work that looks exceptional, communicates purpose, and leaves a lasting impression.',
  missionTitle: 'Our Mission',
  missionText:
    'To engineer high-caliber creative and sensory assets that elevate individuals and businesses, blending strategic brand storytelling with modern technical precision.',
  visionTitle: 'Our Vision',
  visionText:
    'To stand as a recognized multi-disciplinary powerhouse where visual identity, digital engineering, cinematic motion, and olfactory luxury converge into one distinctive voice.',
  creativePhilosophyTitle: 'Creative Philosophy',
  creativePhilosophyText:
    'We believe aesthetics without purpose is decoration, while strategy without beauty is invisible. Every frame we edit, every layout we architect, and every fragrance we curate is guided by deliberate restraint, emotional resonance, and unyielding quality.',
  intersectionTitle: 'The Convergence of Disciplines',
  intersectionText:
    'Why design, code, video, and perfume? Because memorable brands live across multiple dimensions. Graphic design creates the visual archetype; website development builds the interactive home; video editing drives viral digital retention; and luxury fragrance adds an indelible sensory imprint.',
  studioImage: '/src/assets/images/hero_blue_mountains_1791546176773.jpg',
  ceoImage: '',
  ceoName: 'CEO & Creative Director',
  ceoTitle: 'Founder, AMBITIOUS VENDOR',
  corePillars: [
    {
      title: 'Intentional Strategy',
      description:
        'Every creative decision is tied to clear objectives—whether maximizing digital retention, building authority, or captivating audiences.',
    },
    {
      title: 'Obsessive Polish',
      description:
        'From micro-interactions on a web layout to the precision of a color grade and the bottle weight of a fragrance, details define the outcome.',
    },
    {
      title: 'Uncompromised Versatility',
      description:
        'Mastery across digital code, visual design, cinematic motion, and physical product curation allows unified, end-to-end execution.',
    },
  ],
};

export const initialMediaAssets: MediaAsset[] = [
  {
    id: 'med-1',
    name: 'Hero Blue Mountains Panoramic',
    url: '/src/assets/images/hero_blue_mountains_1791546176773.jpg',
    category: 'Hero',
    alt: 'Cinematic blue alpine mountains at dusk with misty peaks and glowing horizon',
    size: '1.4 MB',
    created_at: '2026-10-09',
  },
  {
    id: 'med-2',
    name: 'Graphic Design Identity Showcase',
    url: '/src/assets/images/graphic_design_showcase_1791546187744.jpg',
    category: 'Services',
    alt: 'Bespoke brand identity guidelines and gold-foil stationery mockups',
    size: '890 KB',
    created_at: '2026-10-09',
  },
  {
    id: 'med-3',
    name: 'Modern Web Development Mockup',
    url: '/src/assets/images/web_development_showcase_1791546198993.jpg',
    category: 'Services',
    alt: 'Desktop monitor and mobile phone displaying modern dark blue website UI',
    size: '950 KB',
    created_at: '2026-10-09',
  },
  {
    id: 'med-4',
    name: 'Luxury Perfume Bottle on Marble',
    url: '/src/assets/images/perfume_luxury_bottle_1791546209395.jpg',
    category: 'Perfumes',
    alt: 'Aura Véris luxury artisan perfume bottle on midnight blue crystal rock',
    size: '1.1 MB',
    created_at: '2026-10-09',
  },
  {
    id: 'med-5',
    name: 'Cinematic Video Editing Suite',
    url: '/src/assets/images/video_editing_suite_1791546219495.jpg',
    category: 'Services',
    alt: 'Professional video editor working at color grading studio desk',
    size: '1.2 MB',
    created_at: '2026-10-09',
  },
];

export const initialThemeSettings: ThemeSettings = {
  primaryNavy: '#FFF7FA',
  midnightBlue: '#FFFFFF',
  mountainBlue: '#F3B5D0',
  skyBlue: '#F48FB1',
  accentYellow: '#D63384',
  accentCyan: '#AD1457',
  accentLavender: '#FFD6E7',
  borderRadius: '16px',
  preset: 'rose',
};

export const sampleContactSubmissions: ContactSubmission[] = [
  {
    id: 'sub-1',
    created_at: '2026-10-08T15:20:00Z',
    full_name: 'David Adeleke',
    email: 'david@enterprise.io',
    phone: '08080608722',
    service: 'Graphic Design',
    budget: '$1,000 - $3,000',
    message: 'We are revamping our corporate visual brand identity and need a cohesive design system and brand assets.',
    status: 'New',
    internal_notes: 'Priority client, review brand guidelines proposal.',
  },
  {
    id: 'sub-2',
    created_at: '2026-10-07T11:45:00Z',
    full_name: 'Chiamaka Okafor',
    email: 'chiamaka@luxe.co',
    phone: '08123456789',
    service: 'Perfume Vendor',
    budget: 'Wholesale Inquiry',
    message: 'Interested in wholesale procurement of Aura Véris bottles for a luxury boutique in Lagos.',
    status: 'In Progress',
    internal_notes: 'Sent wholesale rate card via email.',
  },
  {
    id: 'sub-3',
    created_at: '2026-10-06T09:12:00Z',
    full_name: 'Marcus Vance',
    email: 'marcus@motionpulse.tv',
    phone: '09012345678',
    service: 'Video Editing',
    budget: '$3,000 - $5,000',
    message: 'Need 12 high-retention commercial cuts and cinematic grading for an upcoming summer campaign.',
    status: 'Resolved',
    internal_notes: 'Project completed and delivered successfully.',
  },
];
