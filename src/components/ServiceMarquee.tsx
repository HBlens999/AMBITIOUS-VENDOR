import React from 'react';
import { useData } from '../context/DataContext';

interface ServiceMarqueeProps {
  onSelectCategory?: (category: string) => void;
}

export const ServiceMarquee: React.FC<ServiceMarqueeProps> = ({ onSelectCategory }) => {
  const { marqueeSettings } = useData();

  const items = marqueeSettings.items || [
    'GRAPHIC DESIGN',
    'WEBSITE DEVELOPMENT',
    'PERFUME VENDOR',
    'VIDEO EDITING',
  ];

  // We repeat the array 4 times to ensure no blank gap regardless of ultra-wide 4K viewports
  const repeatedItems = [...items, ...items, ...items, ...items];

  const handleItemClick = (item: string) => {
    if (onSelectCategory) {
      onSelectCategory(item);
    }
  };

  return (
    <div
      className="relative w-full overflow-hidden border-y border-[#1766A5]/30 bg-gradient-to-r from-[#061C46] via-[#092A61] to-[#061C46] py-5 sm:py-6 shadow-inner"
      aria-label="Continuous Service Categories Marquee"
    >
      {/* Subtle edge fades for smooth visual entry/exit */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#061C46] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#061C46] to-transparent z-10 pointer-events-none" />

      {/* Continuously moving track: Right-To-Left */}
      <div
        className="animate-marquee-rtl flex items-center gap-8 sm:gap-14 whitespace-nowrap cursor-pointer select-none"
        style={{
          animationDuration: `${marqueeSettings.speedSeconds || 26}s`,
        }}
      >
        {repeatedItems.map((item, index) => (
          <div
            key={`${item}-${index}`}
            onClick={() => handleItemClick(item)}
            className="group inline-flex items-center gap-8 sm:gap-14 transition-opacity hover:opacity-100"
          >
            <span className="font-display text-xl sm:text-2xl md:text-3xl font-extrabold uppercase tracking-widest text-slate-100 group-hover:text-[#F5C542] transition-colors duration-200">
              {item}
            </span>
            <span
              className="text-xs sm:text-sm text-[#72DFFF] group-hover:text-[#F5C542] group-hover:rotate-45 transition-all duration-300"
              aria-hidden="true"
            >
              {marqueeSettings.separator || '✦'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
