import React from 'react';
import { useData } from '../context/DataContext';
import { ArrowRight, Compass } from 'lucide-react';

interface AboutPreviewProps {
  onNavigate: (path: string) => void;
}

export const AboutPreview: React.FC<AboutPreviewProps> = ({ onNavigate }) => {
  const { aboutContent } = useData();

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#1766A5]/20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Visual Column */}
        <div className="lg:col-span-5 relative">
          <div className="relative rounded-3xl overflow-hidden border border-[#1766A5]/40 shadow-2xl shadow-[#092A61]/60 aspect-4/5 sm:aspect-square lg:aspect-4/5">
            <img
              src={aboutContent.studioImage}
              alt="AMBITIOUS VENDOR Creative Studio Composition"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#061C46] via-transparent to-transparent opacity-70" />
            
            {/* Overlay Emblem */}
            <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-[#061C46]/85 backdrop-blur-md border border-[#1766A5]/30">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#F5C542] block mb-1">
                Studio Philosophy
              </span>
              <p className="text-xs text-slate-200">
                Bridging visual strategy, digital engineering, narrative motion, and olfactory craft.
              </p>
            </div>
          </div>
        </div>

        {/* Right Editorial Copy Column */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#092A61]/80 border border-[#1766A5]/30 text-xs font-semibold text-[#72DFFF] mb-4 w-fit">
            <Compass className="w-3.5 h-3.5" />
            <span>About AMBITIOUS VENDOR</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
            {aboutContent.headline}
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed font-normal mb-8">
            {aboutContent.brandIntro}
          </p>

          {/* Pillars List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {aboutContent.corePillars.slice(0, 2).map((pillar, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[#092A61]/40 border border-[#1766A5]/25"
              >
                <h4 className="font-display text-sm font-bold text-[#F5C542] mb-1">
                  {pillar.title}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>

          <div>
            <button
              onClick={() => onNavigate('/about')}
              className="group inline-flex items-center gap-3 px-6 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#061C46] bg-[#F5C542] hover:bg-[#ffd768] active:scale-[0.98] rounded-full transition-all shadow-lg shadow-[#F5C542]/20 whitespace-nowrap shrink-0"
            >
              <span>Learn More About Us</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
