import React from 'react';
import { useData } from '../context/DataContext';
import { ContactCta } from '../components/ContactCta';
import { Sparkles, Layers, Target, Eye, Compass, Palette, Code, Film, Droplets } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const { aboutContent } = useData();

  return (
    <div className="pt-24 sm:pt-28 min-h-screen bg-[#061C46]">
      {/* Page Header */}
      <section className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-radial from-[#1766A5]/25 via-transparent to-transparent blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#092A61]/80 border border-[#1766A5]/30 text-xs font-semibold text-[#72DFFF] mb-6">
            <Compass className="w-3.5 h-3.5" />
            <span>ABOUT AMBITIOUS VENDOR</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-8">
            {aboutContent.headline}
          </h1>

          <p className="text-base sm:text-xl text-slate-200 leading-relaxed font-normal text-balance">
            {aboutContent.brandIntro}
          </p>
        </div>
      </section>

      {/* Visual Interlude + Mission & Vision */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Mission Card */}
          <div className="lg:col-span-6 p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#092A61]/80 to-[#061C46]/90 border border-[#1766A5]/35 shadow-xl flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#1766A5]/30 border border-[#71B8E8]/30 flex items-center justify-center text-[#F5C542] mb-6">
                <Target className="w-6 h-6" />
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white mb-4">
                {aboutContent.missionTitle}
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {aboutContent.missionText}
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-[#1766A5]/20 flex items-center gap-2 text-xs font-mono text-[#72DFFF]">
              <span>STRATEGIC ALIGNMENT</span>
              <span>·</span>
              <span>PURPOSE-DRIVEN</span>
            </div>
          </div>

          {/* Vision Card */}
          <div className="lg:col-span-6 p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#092A61]/80 to-[#061C46]/90 border border-[#1766A5]/35 shadow-xl flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#1766A5]/30 border border-[#71B8E8]/30 flex items-center justify-center text-[#72DFFF] mb-6">
                <Eye className="w-6 h-6" />
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white mb-4">
                {aboutContent.visionTitle}
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {aboutContent.visionText}
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-[#1766A5]/20 flex items-center gap-2 text-xs font-mono text-[#F5C542]">
              <span>ENDURING REACH</span>
              <span>·</span>
              <span>SENSORY MASTERY</span>
            </div>
          </div>
        </div>
      </section>

      {/* Creative Philosophy Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#1766A5]/20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#72DFFF] block mb-3">
              Guiding Principles
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-6">
              {aboutContent.creativePhilosophyTitle}
            </h2>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8">
              {aboutContent.creativePhilosophyText}
            </p>

            <div className="space-y-4">
              {aboutContent.corePillars.map((pillar, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-[#092A61]/40 border border-[#1766A5]/25 flex items-start gap-4"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#061C46] border border-[#1766A5]/40 flex items-center justify-center text-[#F5C542] shrink-0 font-mono text-xs font-bold">
                    0{idx + 1}
                  </div>
                  <div>
                    <h4 className="font-display text-base font-bold text-white mb-1">
                      {pillar.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden border border-[#1766A5]/40 shadow-2xl">
              <img
                src={aboutContent.studioImage}
                alt="Creative Atmosphere"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover min-h-[420px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061C46] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-[#061C46]/85 backdrop-blur-md border border-[#1766A5]/30">
                <p className="text-xs sm:text-sm text-slate-200 font-medium">
                  “A passion for visual balance, cinematic rhythm, and sensory impact informs every piece of work produced under AMBITIOUS VENDOR.”
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The 4-Way Convergence Explained */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#1766A5]/20">
        <div className="max-w-3xl mb-14">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#F5C542] block mb-3">
            Multi-Disciplinary Vision
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-6">
            {aboutContent.intersectionTitle}
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            {aboutContent.intersectionText}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-[#092A61]/50 border border-[#1766A5]/30 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#061C46] text-[#F5C542] flex items-center justify-center mb-4">
                <Palette className="w-5 h-5" />
              </div>
              <h3 className="font-display text-lg font-bold text-white mb-2">Graphic Design</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Visual identity, typography hierarchy, and branded stationery systems that command credibility.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#092A61]/50 border border-[#1766A5]/30 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#061C46] text-[#72DFFF] flex items-center justify-center mb-4">
                <Code className="w-5 h-5" />
              </div>
              <h3 className="font-display text-lg font-bold text-white mb-2">Website Development</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Performance-driven code and bespoke interfaces engineered for effortless user journeys.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#092A61]/50 border border-[#1766A5]/30 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#061C46] text-[#B6A4FF] flex items-center justify-center mb-4">
                <Film className="w-5 h-5" />
              </div>
              <h3 className="font-display text-lg font-bold text-white mb-2">Video Editing</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Hypnotic retention pacing, audio textures, and cinematic color grades engineered for high engagement.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#092A61]/50 border border-[#1766A5]/30 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#061C46] text-[#F5C542] flex items-center justify-center mb-4">
                <Droplets className="w-5 h-5" />
              </div>
              <h3 className="font-display text-lg font-bold text-white mb-2">Perfume Vendor</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Artisan luxury extraits and bespoke fragrance profiles providing an unforgettable physical impression.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <ContactCta onNavigate={onNavigate} />
    </div>
  );
};
