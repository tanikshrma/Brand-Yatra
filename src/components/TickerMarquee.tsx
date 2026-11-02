import React from 'react';
import logoBlack from '../assets/images/Logo Black 01.png';

export const TickerMarquee: React.FC = () => {
  const items = [
    'BRAND STRATEGY',
    'DIGITAL MARKETING',
    'GOOGLE ADS / PPC',
    'AI & GEO OPTIMIZATION',
    'SOCIAL MEDIA MARKETING',
    'EXPERIENCE DESIGN',
    'WEB DESIGN & DEV',
    'PERFORMANCE MARKETING',
    'COMMERCIAL STORYTELLING',
    'LANDING PAGE & CRO',
    'SEARCH ENGINE OPTIMIZATION',
  ];

  return (
    <div
      aria-label="Brand Yatra Services Ticker"
      className="bg-[#f5f6f7] text-[#0E2234] py-4 sm:py-5 overflow-hidden select-none border-y border-[#E5E9ED]"
    >
      <div className="animate-marquee flex items-center gap-10 whitespace-nowrap">
        {[...items, ...items].map((item, idx) => (
          <div key={idx} className="flex items-center gap-10 shrink-0">
            {/* Official Brand Yatra Logo Black Image */}
            <img
              src={logoBlack}
              alt="Brand Yatra"
              width={120}
              height={24}
              loading="lazy"
              decoding="async"
              className="h-5 sm:h-6 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
            />
            <span className="text-[#F8C311] text-xs font-bold" aria-hidden="true">✦</span>
            <span className="font-['Manrope',sans-serif] text-xs sm:text-sm uppercase tracking-[0.22em] font-extrabold text-[#0E2234]">
              {item}
            </span>
            <span className="text-[#66717D]/40 text-xs font-mono" aria-hidden="true">/</span>
          </div>
        ))}
      </div>
    </div>
  );
};

