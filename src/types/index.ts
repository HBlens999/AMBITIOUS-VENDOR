export interface SiteSettings {
  id?: string;
  siteName: string;
  tagline: string;
  phone: string;
  email: string;
  whatsapp: string;
  logoText: string;
  seoTitle: string;
  seoDescription: string;
  canonicalUrl: string;
  faviconUrl?: string;
}

export interface HeroSettings {
  headline: string;
  color1: string;
  color2: string;
  color3: string;
  color4: string;
  color5: string;
  duration: number; // in seconds
  glowIntensity: number; // 0 to 1
  fontSizeRem: number;
  letterSpacing: string;
  bgImage: string;
  foregroundImage?: string;
  subheading: string;
  description: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  showMist: boolean;
  showParticles: boolean;
  parallaxIntensity: number;
}

export interface MarqueeSettings {
  speedSeconds: number;
  direction: 'left';
  separator: string;
  items: string[];
}

export interface ServiceItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  startingPrice?: string;
  order: number;
  published: boolean;
  deliverables: string[];
  ctaText?: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  slug: string;
  category: 'Graphic Design' | 'Website Development' | 'Video Editing' | 'Perfume Vendor' | string;
  description: string;
  image: string;
  videoUrl?: string;
  externalUrl?: string;
  order: number;
  published: boolean;
  client?: string;
  year?: string;
  tags?: string[];
}

export interface PerfumeProduct {
  id: string;
  name: string;
  tagline?: string;
  description: string;
  image: string;
  price?: string;
  status: 'Available' | 'Limited Stock' | 'Made to Order' | 'Sold Out';
  category?: string;
  notes?: string;
  volume?: string;
  order: number;
  published: boolean;
  inquiryLink?: string;
}

export interface ContactSubmission {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  phone?: string;
  service: string;
  budget?: string;
  message: string;
  status: 'New' | 'In Progress' | 'Resolved';
  internal_notes?: string;
}

export interface AboutContent {
  headline: string;
  brandIntro: string;
  missionTitle: string;
  missionText: string;
  visionTitle: string;
  visionText: string;
  creativePhilosophyTitle: string;
  creativePhilosophyText: string;
  intersectionTitle: string;
  intersectionText: string;
  studioImage: string;
  ceoImage?: string;
  ceoName?: string;
  ceoTitle?: string;
  corePillars: {
    title: string;
    description: string;
  }[];
}

export interface MediaAsset {
  id: string;
  name: string;
  url: string;
  category: 'Hero' | 'Services' | 'Portfolio' | 'Perfumes' | 'General';
  alt: string;
  size: string;
  created_at: string;
}

export interface ThemeSettings {
  primaryNavy: string;
  midnightBlue: string;
  mountainBlue: string;
  skyBlue: string;
  accentYellow: string;
  accentCyan: string;
  accentLavender: string;
  borderRadius: string;
  preset?: string;
}
