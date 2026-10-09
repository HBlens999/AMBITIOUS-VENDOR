import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { ContactCta } from '../components/ContactCta';
import { CheckCircle2, ArrowRight, Sparkles, Droplets, Tag, ExternalLink } from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (path: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate }) => {
  const { services, perfumes } = useData();
  const [activeTab, setActiveTab] = useState<string>('all');

  const publishedServices = services.filter((s) => s.published);
  const publishedPerfumes = perfumes.filter((p) => p.published);

  const tabs = [
    { id: 'all', label: 'All Services' },
    ...publishedServices.map((s) => ({ id: s.slug, label: s.title })),
  ];

  const handleInquireService = (serviceTitle: string) => {
    onNavigate(`/contact?service=${encodeURIComponent(serviceTitle)}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="pt-24 sm:pt-28 min-h-screen bg-[#061C46]">
      {/* Services Header */}
      <section className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#72DFFF] block mb-3">
            Core Disciplines
          </span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-6">
            Bespoke Services Engineered for Distinction
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            From strategic brand architecture and dynamic full-stack development to hypnotic video pacing and luxury fragrance curation, explore our complete offerings.
          </p>
        </div>

        {/* Tab Navigation Filter */}
        <div className="mt-12 flex flex-wrap gap-2 border-b border-[#1766A5]/30 pb-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === tab.id
                  ? 'bg-[#F5C542] text-[#061C46] shadow-md shadow-[#F5C542]/20'
                  : 'bg-[#092A61]/70 text-slate-300 hover:text-white hover:bg-[#1766A5]/40 border border-[#1766A5]/30'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* Services Detailed Sections */}
      <div className="space-y-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {publishedServices
          .filter((s) => activeTab === 'all' || s.slug === activeTab)
          .map((service, index) => {
            const isReversed = index % 2 === 1;

            return (
              <section
                key={service.id}
                id={service.slug}
                className="scroll-mt-32 p-8 sm:p-12 lg:p-14 rounded-3xl bg-gradient-to-br from-[#092A61]/70 via-[#061C46]/80 to-[#0B2556]/60 border border-[#1766A5]/35 shadow-2xl"
              >
                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${
                    isReversed ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Visual Asset Container */}
                  <div className={`lg:col-span-6 ${isReversed ? 'lg:order-2' : ''}`}>
                    <div className="relative rounded-2xl overflow-hidden border border-[#1766A5]/40 shadow-xl group aspect-4/3">
                      <img
                        src={service.image}
                        alt={service.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#061C46] via-transparent to-transparent opacity-70" />
                      <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#061C46]/85 backdrop-blur-md border border-[#1766A5]/40 text-xs font-mono text-[#F5C542]">
                        CATEGORY // 0{index + 1}
                      </div>
                    </div>
                  </div>

                  {/* Content Container */}
                  <div className={`lg:col-span-6 ${isReversed ? 'lg:order-1' : ''}`}>
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#72DFFF] block mb-2">
                      {service.category}
                    </span>
                    <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
                      {service.title}
                    </h2>
                    <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
                      {service.fullDescription}
                    </p>

                    {/* Deliverables List */}
                    {service.deliverables && service.deliverables.length > 0 && (
                      <div className="mb-8">
                        <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                          Key Deliverables
                        </h4>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {service.deliverables.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-200">
                              <CheckCircle2 className="w-4 h-4 text-[#F5C542] shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Price and CTA */}
                    <div className="pt-6 border-t border-[#1766A5]/30 flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <span className="text-xs text-slate-400 block">Pricing Tier</span>
                        <span className="text-base font-bold text-white">
                          {service.startingPrice || 'Custom Quote'}
                        </span>
                      </div>

                      <button
                        onClick={() => handleInquireService(service.title)}
                        className="group inline-flex items-center gap-2.5 px-6 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#061C46] bg-[#F5C542] hover:bg-[#ffd768] active:scale-[0.98] rounded-full transition-all shadow-md shadow-[#F5C542]/20"
                      >
                        <span>{service.ctaText || `Inquire About ${service.title}`}</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* SPECIAL EMBEDDED SHOWCASE FOR PERFUME VENDOR */}
                {service.slug === 'perfume-vendor' && (
                  <div className="mt-14 pt-12 border-t border-[#1766A5]/30">
                    <div className="flex items-center gap-2 mb-6">
                      <Droplets className="w-5 h-5 text-[#F5C542]" />
                      <h3 className="font-display text-2xl font-bold text-white">
                        Curated Fragrance Catalog
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {publishedPerfumes.map((perfume) => (
                        <div
                          key={perfume.id}
                          className="p-5 rounded-2xl bg-[#061C46]/80 border border-[#1766A5]/40 hover:border-[#72DFFF]/60 transition-all flex flex-col justify-between"
                        >
                          <div>
                            <div className="relative h-48 rounded-xl overflow-hidden mb-4 bg-[#092A61]">
                              <img
                                src={perfume.image}
                                alt={perfume.name}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute top-2 right-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#061C46]/90 text-[#F5C542] border border-[#1766A5]/40">
                                {perfume.status}
                              </div>
                            </div>

                            <span className="text-[11px] font-mono text-[#72DFFF] uppercase tracking-wider block mb-1">
                              {perfume.category} {perfume.volume ? `· ${perfume.volume}` : ''}
                            </span>
                            <h4 className="font-display text-lg font-bold text-white mb-1">
                              {perfume.name}
                            </h4>
                            {perfume.tagline && (
                              <p className="text-xs font-medium text-[#F5C542] mb-2 italic">
                                {perfume.tagline}
                              </p>
                            )}
                            <p className="text-xs text-slate-300 line-clamp-3 mb-3 leading-relaxed">
                              {perfume.description}
                            </p>

                            {perfume.notes && (
                              <div className="p-2.5 rounded-lg bg-[#092A61]/50 border border-[#1766A5]/25 text-[11px] text-slate-300 mb-4">
                                <span className="font-semibold text-slate-200 block mb-0.5">Notes:</span>
                                {perfume.notes}
                              </div>
                            )}
                          </div>

                          <div className="pt-3 border-t border-[#1766A5]/30 flex items-center justify-between">
                            <span className="text-xs font-bold text-white">
                              {perfume.price || 'Contact for Price'}
                            </span>
                            <button
                              onClick={() => handleInquireService(`Perfume: ${perfume.name}`)}
                              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F5C542] hover:underline"
                            >
                              <span>Order / Inquire</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </section>
            );
          })}
      </div>

      {/* Contact CTA */}
      <ContactCta onNavigate={onNavigate} />
    </div>
  );
};
