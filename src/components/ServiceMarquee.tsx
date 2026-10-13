import React from 'react';
import { useData } from '../context/DataContext';

interface ServiceMarqueeProps {
  onSelectCategory?: (category: string) => void;
}

export const ServiceMarquee: React.FC<ServiceMarqueeProps> = ({ onSelectCategory }) => {
  const { marqueeSettings, services } = useData();
  const items = (marqueeSettings.items?.length ? marqueeSettings.items : services.map((service) => service.title))
    .map((label) => {
      const normalized = label.trim().toLowerCase();
      const service = services.find((entry) =>
        entry.title.trim().toLowerCase() === normalized ||
        entry.slug.trim().toLowerCase() === normalized.replace(/\s+/g, '-') ||
        entry.category.trim().toLowerCase() === normalized
      );
      return { label, service };
    });
  const repeatedItems = [...items, ...items, ...items, ...items];

  return (
    <section className="relative w-full overflow-hidden border-y border-[#1766A5]/30 bg-gradient-to-r from-[#061C46] via-[#092A61] to-[#061C46] py-6 sm:py-8 shadow-inner" aria-label="Featured services">
      <div className="absolute inset-y-0 left-0 w-10 sm:w-24 bg-gradient-to-r from-[#061C46] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-10 sm:w-24 bg-gradient-to-l from-[#061C46] to-transparent z-10 pointer-events-none" />
      <div className="animate-marquee-rtl flex w-max items-start gap-5 sm:gap-8 whitespace-nowrap select-none" style={{ animationDuration: `${marqueeSettings.speedSeconds || 26}s` }}>
        {repeatedItems.map(({ label, service }, index) => (
          <button
            type="button"
            key={`${label}-${index}`}
            onClick={() => onSelectCategory?.(label)}
            className="group w-36 sm:w-48 shrink-0 text-left whitespace-normal focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C542] rounded-2xl"
            aria-label={`Explore ${label}`}
          >
            <span className="block overflow-hidden rounded-2xl border border-[#1766A5]/35 bg-[#092A61] aspect-[4/3] shadow-lg transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">
              {service?.image ? (
                <img src={service.image} alt={service.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              ) : (
                <span className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#F8BBD0] to-[#D63384] px-3 text-center text-sm font-bold text-white">{label}</span>
              )}
            </span>
            <span className="mt-3 block text-center text-xs sm:text-sm font-extrabold uppercase tracking-[0.12em] text-white group-hover:text-[#F5C542] transition-colors">{service?.title || label}</span>
          </button>
        ))}
      </div>
    </section>
  );
};
