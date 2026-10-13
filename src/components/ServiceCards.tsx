import React from 'react';
import { useData } from '../context/DataContext';
import { ArrowUpRight } from 'lucide-react';

interface ServiceCardsProps {
  onNavigate: (path: string) => void;
}

export const ServiceCards: React.FC<ServiceCardsProps> = ({ onNavigate }) => {
  const { services } = useData();

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#72DFFF] block mb-3">
            What We Deliver
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Comprehensive Creative Capabilities
          </h2>
        </div>
        <p className="text-sm sm:text-base text-slate-300 max-w-md">
          Tailored solutions engineered across four distinct creative sectors to build unforgettable brands and content.
        </p>
      </div>

      {/* 4 Service Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services
          .filter((s) => s.published)
          .map((service, index) => (
            <div
              key={service.id}
              onClick={() => onNavigate(`/services#${service.slug}`)}
              className="group relative flex flex-col justify-between bg-gradient-to-b from-[#092A61]/70 to-[#061C46]/90 border border-[#1766A5]/30 hover:border-[#72DFFF]/60 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-[#092A61]/50 cursor-pointer"
            >
              {/* Card Image Container */}
              <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-[#061C46]">
                <img
                  src={service.image}
                  alt={service.title}
                  referrerPolicy="no-referrer"
                  className="service-card-image w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                />
                <div className="service-card-image-overlay absolute inset-0 bg-gradient-to-t from-[#061C46] via-transparent to-transparent opacity-35" />

                {/* Editorial Number Index */}
                <div className="absolute top-4 left-4">
                  <span className="px-2.5 py-1 rounded bg-[#061C46]/80 backdrop-blur-md text-[11px] font-mono font-bold text-[#F5C542] border border-[#1766A5]/40">
                    0{index + 1}
                  </span>
                </div>

                {/* Action Arrow Indicator */}
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#061C46]/80 backdrop-blur-md border border-[#1766A5]/40 flex items-center justify-center text-slate-200 group-hover:bg-[#F5C542] group-hover:text-[#061C46] group-hover:border-[#F5C542] transition-colors">
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 flex flex-col flex-grow justify-between gap-4">
                <div>
                  <span className="text-[11px] font-medium uppercase tracking-wider text-[#72DFFF] block mb-1.5">
                    {service.category}
                  </span>
                  <h3 className="font-display text-xl font-bold text-white group-hover:text-[#F5C542] transition-colors">
                    {service.title}
                  </h3>
                  <p className="mt-2.5 text-xs sm:text-sm text-slate-300 line-clamp-3 leading-relaxed">
                    {service.shortDescription}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#1766A5]/20 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">Starting from:</span>
                  <span className="font-semibold text-white group-hover:text-[#F5C542] transition-colors">
                    {service.startingPrice || 'Custom Quote'}
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};
