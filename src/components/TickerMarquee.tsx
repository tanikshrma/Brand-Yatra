import React from 'react';

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
      role="img"
      aria-label="Brand Yatra Services Ticker"
      className="relative z-10 overflow-hidden bg-[var(--color-soft-grey)] py-5 select-none sm:py-7"
    >
      <div
        className="relative -ml-[8%] w-[116%] rotate-[0deg] bg-[var(--color-primary)] py-3 sm:py-4"
        aria-hidden="true"
      >
        <div className="animate-marquee flex items-center gap-6 whitespace-nowrap sm:gap-9">
          {[...items, ...items].map((item, idx) => (
            <div key={`${item}-${idx}`} className="flex shrink-0 items-center gap-6 sm:gap-9">
              <span className="font-['Marcellus',serif] text-sm uppercase tracking-wide text-[var(--color-navy)] sm:text-base">
                {item}
              </span>
              <span className="font-['Inter',sans-serif] text-sm font-bold text-[var(--color-navy)]/65" aria-hidden="true">
                •
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
