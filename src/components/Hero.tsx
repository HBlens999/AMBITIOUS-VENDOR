import React from 'react';
import { useData } from '../context/DataContext';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HeroProps {
  onNavigate: (path: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const { heroSettings } = useData();

  // Dynamic CSS variables for the 5-color cycle and duration
  const dynamicHeroStyles = {
    '--hero-color-1': heroSettings.color1,
    '--hero-color-2': heroSettings.color2,
    '--hero-color-3': heroSettings.color3,
    '--hero-color-4': heroSettings.color4,
    '--hero-color-5': heroSettings.color5,
    '--hero-duration': `${heroSettings.duration}s`,
  } as React.CSSProperties;

  return (
    <section
      className="hero-section relative isolate min-h-[92vh] lg:min-h-screen w-full flex flex-col justify-between overflow-hidden bg-[#061C46] select-none"
      style={dynamicHeroStyles}
    >
      {/* =========================================================================
          LAYER 1: Deep-Blue Atmospheric Sky & Mountain Background
          ========================================================================= */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroSettings.bgImage}
          alt="Atmospheric Blue Mountain Peak Landscape"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Deep navy color grade overlays to replicate the Triplio atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#061C46] via-[#061C46]/45 to-[#061C46]/60 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#061C46]/70 via-transparent to-[#061C46]" />
      </div>

      {/* =========================================================================
          LAYER 4 (Part A): Drifting Background Clouds & Distant Mist
          ========================================================================= */}
      {heroSettings.showMist && (
        <div className="absolute inset-0 z-1 pointer-events-none overflow-hidden">
          {/* Mist Layer 1 */}
          <div className="absolute top-[25%] -left-[20%] w-[140%] h-64 bg-radial from-[#71B8E8]/15 via-[#1766A5]/10 to-transparent blur-3xl animate-mist-layer-1" />
          {/* Mist Layer 2 */}
          <div className="absolute top-[40%] -right-[20%] w-[130%] h-72 bg-radial from-[#72DFFF]/10 via-[#B6A4FF]/10 to-transparent blur-3xl animate-mist-layer-2" />
        </div>
      )}

      {/* Subtle Atmospheric Light Particles */}
      {heroSettings.showParticles && (
        <div className="absolute inset-0 z-1 pointer-events-none">
          <div className="absolute top-1/4 left-1/5 w-1.5 h-1.5 rounded-full bg-[#72DFFF] blur-[1px] animate-particle" />
          <div className="absolute top-1/3 right-1/4 w-2 h-2 rounded-full bg-[#F5C542] blur-[1px] animate-particle [animation-delay:2s]" />
          <div className="absolute top-1/2 left-1/3 w-1.5 h-1.5 rounded-full bg-[#B6A4FF] blur-[1px] animate-particle [animation-delay:4s]" />
          <div className="absolute top-2/3 right-1/3 w-2 h-2 rounded-full bg-[#72DFFF] blur-[1px] animate-particle [animation-delay:1.5s]" />
        </div>
      )}

      {/* Spacer for fixed top navigation */}
      <div className="h-20 lg:h-24" />

      {/* =========================================================================
          LAYER 2: Enormous 5-Color Animated "AMBITIOUS VENDOR" Typography
          Positioned to emerge from behind the foreground mountain peaks
          ========================================================================= */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center px-4 my-auto pt-6 pb-24 md:pb-28">
        {/* Subtle Brand Tagline Kicker */}
        <div className="mb-2 sm:mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#061C46]/80 border border-[#71B8E8]/30 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-[#F5C542]" />
          <span className="hero-kicker text-[11px] sm:text-xs font-semibold uppercase tracking-[0.16em] sm:tracking-[0.22em] text-[#72DFFF]">
            {heroSettings.subheading}
          </span>
        </div>

        {/* The Signature Enormous Animated Typography */}
        <div className="w-full text-center max-w-[100vw] overflow-hidden px-2">
          <h1
            className="hero-title font-display font-black tracking-tighter uppercase select-none animate-hero-typography leading-[0.88]"
            style={{
              fontSize: 'clamp(2.75rem, 10.5vw, 10.5rem)',
              letterSpacing: heroSettings.letterSpacing,
            }}
          >
            {heroSettings.headline}
          </h1>
        </div>
      </div>

      {/* =========================================================================
          LAYER 3: Foreground Mountain Peaks Overlap Effect
          This SVG ridgeline and textured mountain crags sit visually in front of
          the typography (z-20), creating the genuine popping-out illusion where
          the bottom portions of the oversized letters emerge from behind the ridges!
          ========================================================================= */}
      <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none select-none">
        {/* Foreground Mountain Ridgeline Cutout / Silhouette */}
        <svg
          viewBox="0 0 1440 380"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto min-h-[160px] md:min-h-[240px] lg:min-h-[300px] object-cover scale-[1.02] -mb-1"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="frontRidgeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0B2556" stopOpacity="0.88" />
              <stop offset="35%" stopColor="#071E49" stopOpacity="0.96" />
              <stop offset="100%" stopColor="#061C46" stopOpacity="1" />
            </linearGradient>
            <linearGradient id="backRidgeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#144A7E" stopOpacity="0.75" />
              <stop offset="45%" stopColor="#0A2D62" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#061C46" stopOpacity="1" />
            </linearGradient>
            <filter id="ridgeMistBlur" x="-10%" y="-10%" width="120%" height="120%">
              <feGaussianBlur stdDeviation="12" />
            </filter>
          </defs>

          {/* Secondary Midground Mountain Ridge (subtly overlapping lower text) */}
          <path
            d="M0 240L140 185L280 230L440 140L600 210L760 120L920 190L1080 135L1240 210L1440 160V380H0V240Z"
            fill="url(#backRidgeGrad)"
            opacity="0.9"
          />

          {/* Foreground Sharp Alpine Peaks that clearly overlap the letters */}
          <path
            d="M0 290L110 230L210 270L360 170L490 260L640 190L720 220L840 150L980 250L1120 180L1260 260L1370 210L1440 250V380H0V290Z"
            fill="url(#frontRidgeGrad)"
          />

          {/* Foreground Mist Glow at the Base of the Peaks */}
          <ellipse cx="720" cy="300" rx="650" ry="80" fill="#71B8E8" opacity="0.12" filter="url(#ridgeMistBlur)" />
        </svg>

        {/* Ambient Mist over foreground mountain */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#061C46] via-[#061C46]/90 to-transparent" />
      </div>

      {/* =========================================================================
          LAYER 5: Hero Intro Copy, CTAs & Action Bar (z-30)
          Clearly positioned in readable space in front of the mountain base
          ========================================================================= */}
      <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 pt-2">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          {/* Introductory Description from Brief */}
          <div className="lg:col-span-7">
            <p className="hero-description text-sm sm:text-base md:text-lg leading-relaxed font-normal max-w-2xl text-balance">
              {heroSettings.description}
            </p>
          </div>

          {/* Action CTAs */}
          <div className="lg:col-span-5 flex flex-wrap items-center gap-4 lg:justify-end">
            <button
              onClick={() => onNavigate(heroSettings.primaryCtaLink || '/services')}
              className="group inline-flex items-center gap-3 px-6 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#061C46] bg-[#F5C542] hover:bg-[#ffd768] active:scale-[0.98] rounded-full transition-all shadow-lg shadow-[#F5C542]/20 whitespace-nowrap shrink-0"
            >
              <span>{heroSettings.primaryCtaText || 'Explore Our Services'}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={() => onNavigate(heroSettings.secondaryCtaLink || '/contact')}
              className="inline-flex items-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white hover:text-[#72DFFF] bg-[#092A61]/70 hover:bg-[#092A61] border border-[#1766A5]/50 rounded-full transition-all backdrop-blur-sm whitespace-nowrap shrink-0"
            >
              <span>{heroSettings.secondaryCtaText || 'Contact Us'}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
