import React from 'react';
import { Hero } from '../components/Hero';
import { ServiceMarquee } from '../components/ServiceMarquee';
import { ServiceCards } from '../components/ServiceCards';
import { PortfolioGrid } from '../components/PortfolioGrid';
import { AboutPreview } from '../components/AboutPreview';
import { ContactCta } from '../components/ContactCta';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="w-full">
      {/* Section A: Cinematic Hero with Enormous 5-Color Typography & Mountain Overlap */}
      <Hero onNavigate={onNavigate} />

      {/* Section B: Continuously moving service-category marquee (Right to Left) */}
      <ServiceMarquee
        onSelectCategory={(category) => {
          onNavigate('/services');
        }}
      />

      {/* Section C: Service Preview Cards */}
      <ServiceCards onNavigate={onNavigate} />

      {/* Section D: Selected Creative Work */}
      <PortfolioGrid />

      {/* Section E: About Preview */}
      <AboutPreview onNavigate={onNavigate} />

      {/* Section F: Contact CTA */}
      <ContactCta onNavigate={onNavigate} />
    </div>
  );
};
