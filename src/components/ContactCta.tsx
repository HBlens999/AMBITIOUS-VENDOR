import React from 'react';
import { useData } from '../context/DataContext';
import { ArrowRight, Mail, Phone } from 'lucide-react';

interface ContactCtaProps {
  onNavigate: (path: string) => void;
}

export const ContactCta: React.FC<ContactCtaProps> = ({ onNavigate }) => {
  const { siteSettings } = useData();

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#092A61] via-[#061C46] to-[#0B2556] border border-[#1766A5]/40 p-8 sm:p-12 lg:p-16 shadow-2xl shadow-[#061C46]/80 text-center flex flex-col items-center">
        {/* Ambient atmospheric glows */}
        <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[#1766A5]/30 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-[#F5C542]/15 blur-3xl pointer-events-none" />

        <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#F5C542] block mb-3 relative z-10">
          Start a Conversation
        </span>

        <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight max-w-3xl mb-6 relative z-10">
          Have a Project in Mind?
        </h2>

        <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mb-8 leading-relaxed relative z-10">
          Whether you need an iconic visual identity, a bespoke web application, high-retention video production, or an exclusive fragrance order, let's create something remarkable together.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 relative z-10 mb-10">
          <button
            onClick={() => onNavigate('/contact')}
            className="group inline-flex items-center gap-3 px-8 py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#061C46] bg-[#F5C542] hover:bg-[#ffd768] active:scale-[0.98] rounded-full transition-all shadow-xl shadow-[#F5C542]/30 whitespace-nowrap shrink-0"
          >
            <span>Let's Discuss Your Project</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <a
            href={`tel:${siteSettings.phone}`}
            className="inline-flex items-center gap-2 px-6 py-4 text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-200 hover:text-white bg-[#061C46]/80 hover:bg-[#061C46] border border-[#1766A5]/50 rounded-full transition-all whitespace-nowrap shrink-0"
          >
            <Phone className="w-4 h-4 text-[#72DFFF]" />
            <span>{siteSettings.phone}</span>
          </a>
        </div>

        {/* Quick Contact Info */}
        <div className="flex flex-wrap items-center justify-center gap-8 text-xs text-slate-400 border-t border-[#1766A5]/30 pt-6 w-full max-w-md relative z-10">
          <a
            href={`mailto:${siteSettings.email}`}
            className="inline-flex items-center gap-2 hover:text-[#72DFFF] transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-[#F5C542]" />
            <span>{siteSettings.email}</span>
          </a>
          <span className="text-slate-600">·</span>
          <span>Response within 24 hours</span>
        </div>
      </div>
    </section>
  );
};
