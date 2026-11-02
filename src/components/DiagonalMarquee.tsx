import React from 'react';
import logoBlack from '../assets/images/Logo Black 01.png';
import logoWhite from '../assets/images/Logo White 01.png';

// Upper Strip Logos (Displayed on deep charcoal #0E2234 / #171717 background with white & gold accents)
const UPPER_STRIP_LOGOS = [
  {
    id: 'brandyatra-white',
    render: () => (
      <div className="flex items-center px-2 py-1">
        <img
          src={logoWhite}
          alt="Brand Yatra"
          width={120}
          height={24}
          loading="lazy"
          decoding="async"
          className="h-5 sm:h-6 md:h-7 w-auto object-contain"
        />
      </div>
    ),
  },
  {
    id: 'bepractical',
    render: () => (
      <div className="flex items-center gap-2">
        <svg viewBox="0 0 40 40" fill="none" className="w-6 h-6 sm:w-7 sm:h-7 text-[#FFFFFF]" aria-hidden="true">
          <circle cx="20" cy="11" r="3.5" fill="currentColor" />
          <path
            d="M8 28C10 21 16 17 20 17C24 17 30 21 32 28M15 34C17 31 19 28 20 28C21 28 23 31 25 34"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
        <div className="flex flex-col text-left">
          <span className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xs sm:text-sm md:text-base text-[#FFFFFF] tracking-tight leading-none">
            Be Practical<sup className="text-[8px] font-normal">®</sup>
          </span>
          <span className="text-[7px] sm:text-[8px] font-mono uppercase tracking-[0.2em] text-[#929292] mt-0.5">
            TECH SOLUTIONS
          </span>
        </div>
      </div>
    ),
  },
  {
    id: 'fipola',
    render: () => (
      <div className="flex items-center gap-1.5">
        <span className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-lg sm:text-xl md:text-2xl tracking-tight text-[#FFFFFF] flex items-center">
          f
          <span className="relative inline-flex items-center justify-center">
            <span className="w-1.5 h-1.5 bg-[#F8C311] rounded-sm absolute -top-1" />
            i
          </span>
          pola
        </span>
        <span className="text-[7px] font-mono text-[#F8C311] border border-[#F8C311]/40 px-1 py-0.2 rounded ml-1">
          DTC
        </span>
      </div>
    ),
  },
  {
    id: 'saloncentric',
    render: () => (
      <div className="flex items-center gap-2">
        <svg viewBox="0 0 36 36" fill="none" className="w-6 h-6 sm:w-7 sm:h-7 text-[#FFFFFF]" aria-hidden="true">
          <circle cx="18" cy="18" r="16" stroke="currentColor" strokeWidth="2.5" strokeDasharray="6 3" />
          <circle cx="18" cy="18" r="10" stroke="#F8C311" strokeWidth="2" />
          <circle cx="18" cy="18" r="4" fill="currentColor" />
        </svg>
        <span className="font-['Plus_Jakarta_Sans',sans-serif] font-medium text-xs sm:text-sm md:text-base text-[#FFFFFF] tracking-tight">
          SalonCentric<span className="text-[9px] text-[#929292]">™</span>
        </span>
      </div>
    ),
  },
  {
    id: 'hsbc',
    render: () => (
      <div className="flex items-center gap-2">
        <div className="relative w-5 h-5 flex items-center justify-center">
          <div className="w-2.5 h-2.5 bg-[#F8C311] transform rotate-45" />
          <div className="absolute w-1.5 h-1.5 bg-white transform rotate-45" />
        </div>
        <div className="flex flex-col text-left">
          <span className="font-['Manrope',sans-serif] font-extrabold text-xs sm:text-sm md:text-base text-[#FFFFFF] tracking-widest leading-none">
            HSBC
          </span>
          <span className="text-[7px] font-mono tracking-widest text-[#929292]">
            GLOBAL WEALTH
          </span>
        </div>
      </div>
    ),
  },
  {
    id: 'technova',
    render: () => (
      <div className="flex items-center gap-2">
        <svg viewBox="0 0 32 32" fill="none" className="w-5 h-5 sm:w-6 sm:h-6 text-[#F8C311]" aria-hidden="true">
          <polygon points="16,3 28,10 28,22 16,29 4,22 4,10" stroke="currentColor" strokeWidth="2" />
          <circle cx="16" cy="16" r="3" fill="#FFFFFF" />
        </svg>
        <span className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-xs sm:text-sm md:text-base text-[#FFFFFF] tracking-wider uppercase">
          TECHNOVA<span className="text-[#F8C311]">.AI</span>
        </span>
      </div>
    ),
  },
  {
    id: 'deforet',
    render: () => (
      <div className="flex items-center gap-2">
        <svg viewBox="0 0 30 30" fill="none" className="w-5 h-5 sm:w-6 sm:h-6 text-[#FFFFFF]" aria-hidden="true">
          <path d="M15 3C15 15 3 15 3 15C3 15 15 15 15 27C15 15 27 15 27 15C27 15 15 15 15 3Z" fill="#F8C311" />
        </svg>
        <span className="font-['Manrope',sans-serif] text-xs sm:text-sm md:text-base text-[#FFFFFF] tracking-widest uppercase">
          DEFÖRET BOTANICALS
        </span>
      </div>
    ),
  },
  {
    id: 'cesce',
    render: () => (
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded bg-[#F8C311]/20 border border-[#F8C311] flex items-center justify-center font-bold text-[10px] sm:text-xs text-[#F8C311]">
          C
        </div>
        <span className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xs sm:text-sm md:text-base text-[#FFFFFF] tracking-wider">
          CESCE GROUP
        </span>
      </div>
    ),
  },
  {
    id: 'apex',
    render: () => (
      <div className="flex items-center gap-2">
        <svg viewBox="0 0 32 32" fill="none" className="w-5 h-5 sm:w-6 sm:h-6 text-[#FFFFFF]" aria-hidden="true">
          <path d="M16 4L28 26H4L16 4Z" stroke="currentColor" strokeWidth="2" />
          <path d="M16 14L22 26H10L16 14Z" fill="#F8C311" />
        </svg>
        <span className="font-['Manrope',sans-serif] text-xs sm:text-sm md:text-base text-[#FFFFFF] tracking-widest uppercase">
          APEX HORIZON
        </span>
      </div>
    ),
  },
];

// Lower Strip Logos (Displayed on Brand Yatra Yellow #F8C311 background with dark charcoal #171717 icons & typography)
const LOWER_STRIP_LOGOS = [
  {
    id: 'brandyatra-black',
    render: () => (
      <div className="flex items-center px-2 py-1">
        <img
          src={logoBlack}
          alt="Brand Yatra"
          width={120}
          height={24}
          loading="lazy"
          decoding="async"
          className="h-5 sm:h-6 md:h-7 w-auto object-contain"
        />
      </div>
    ),
  },
  {
    id: 'stethcare',
    render: () => (
      <div className="flex items-center bg-[#171717] text-white px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-md shadow-sm border border-black/30">
        <span className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-xs sm:text-sm tracking-wider uppercase pr-1.5">
          STETH
        </span>
        <div className="w-4 h-4 sm:w-5 sm:h-5 bg-[#F8C311] text-[#171717] rounded-sm flex items-center justify-center mx-0.5">
          <svg viewBox="0 0 20 20" fill="none" className="w-3 h-3 text-[#171717]" aria-hidden="true">
            <path
              d="M10 2C10 6 6 8 6 11C6 14 8 16 10 18C12 16 14 14 14 11C14 8 10 6 10 2Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <span className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-xs sm:text-sm tracking-wider uppercase pl-1.5">
          CARE
        </span>
      </div>
    ),
  },
  {
    id: 'coffeemug',
    render: () => (
      <div className="flex items-center gap-1.5 text-[#171717]">
        <svg viewBox="0 0 28 28" fill="none" className="w-5 h-5 sm:w-6 sm:h-6 text-[#171717]" aria-hidden="true">
          <path
            d="M6 10H20V18C20 21 17 23 13 23C9 23 6 21 6 18V10Z"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path d="M20 12H22C23.5 12 24.5 13 24.5 14.5C24.5 16 23.5 17 22 17H20" stroke="currentColor" strokeWidth="2.5" />
          <path d="M10 5V7M14 4V7M18 5V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <span className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-base sm:text-lg md:text-xl tracking-widest text-[#171717]">
          C<span className="relative inline-flex items-center justify-center">
            <span className="w-1 h-1 bg-[#171717] rounded-full absolute -top-0.5" />
            O
          </span>
          FFEE MUG
        </span>
      </div>
    ),
  },
  {
    id: 'saloncentric-dark',
    render: () => (
      <div className="flex items-center gap-1.5 text-[#171717]">
        <svg viewBox="0 0 36 36" fill="none" className="w-5 h-5 sm:w-6 sm:h-6 text-[#171717]" aria-hidden="true">
          <circle cx="18" cy="18" r="16" stroke="currentColor" strokeWidth="3" strokeDasharray="6 3" />
          <circle cx="18" cy="18" r="10" stroke="currentColor" strokeWidth="2.5" />
          <circle cx="18" cy="18" r="4" fill="currentColor" />
        </svg>
        <span className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm sm:text-base md:text-lg text-[#171717] tracking-tight">
          SalonCentric<span className="text-[8px]">™</span>
        </span>
      </div>
    ),
  },
  {
    id: 'oneplus',
    render: () => (
      <div className="flex items-center gap-2 text-[#171717]">
        <div className="w-6 h-6 sm:w-7 sm:h-7 bg-[#171717] text-[#F8C311] font-black text-[10px] sm:text-xs flex items-center justify-center rounded border border-black/40">
          1+
        </div>
        <span className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-xs sm:text-sm md:text-base text-[#171717] tracking-tight">
          ONEPLUS TECH
        </span>
      </div>
    ),
  },
  {
    id: 'sobha',
    render: () => (
      <div className="flex items-center gap-2 text-[#171717]">
        <svg viewBox="0 0 32 32" fill="none" className="w-5 h-5 sm:w-6 sm:h-6 text-[#171717]" aria-hidden="true">
          <path d="M4 24L8 10L16 16L24 10L28 24H4Z" stroke="currentColor" strokeWidth="2.5" fill="currentColor" fillOpacity="0.2" />
          <circle cx="8" cy="8" r="2" fill="currentColor" />
          <circle cx="16" cy="13" r="2" fill="currentColor" />
          <circle cx="24" cy="8" r="2" fill="currentColor" />
        </svg>
        <span className="font-['Manrope',sans-serif] font-bold text-xs sm:text-sm md:text-base text-[#171717] tracking-widest uppercase">
          SOBHA LIMITED
        </span>
      </div>
    ),
  },
  {
    id: 'conceptcity',
    render: () => (
      <div className="flex items-center gap-1.5 text-[#171717]">
        <div className="flex flex-col gap-0.5">
          <div className="flex gap-0.5">
            <span className="w-1.5 h-1.5 bg-[#171717]" />
            <span className="w-1.5 h-1.5 bg-[#171717]" />
          </div>
          <div className="flex gap-0.5">
            <span className="w-1.5 h-1.5 bg-[#171717]" />
            <span className="w-1.5 h-1.5 bg-transparent border border-[#171717]" />
          </div>
        </div>
        <span className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-xs sm:text-sm md:text-base text-[#171717] tracking-wider uppercase">
          CONCEPT CITY
        </span>
      </div>
    ),
  },
  {
    id: 'srm',
    render: () => (
      <div className="flex items-center gap-2 text-[#171717]">
        <svg viewBox="0 0 30 30" fill="none" className="w-5 h-5 sm:w-6 sm:h-6 text-[#171717]" aria-hidden="true">
          <path
            d="M15 3L25 9V17C25 22 15 27 15 27C15 27 5 22 5 17V9L15 3Z"
            stroke="currentColor"
            strokeWidth="2.5"
          />
          <path d="M15 8V18M10 13H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <span className="font-['Manrope',sans-serif] font-bold text-xs sm:text-sm md:text-base text-[#171717] tracking-wider uppercase">
          SRM CAMPUS
        </span>
      </div>
    ),
  },
  {
    id: 'urbancraft',
    render: () => (
      <div className="flex items-center gap-2 text-[#171717]">
        <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-[#171717] rotate-45 flex items-center justify-center">
          <span className="w-1 h-1 bg-[#171717]" />
        </div>
        <span className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-xs sm:text-sm md:text-base text-[#171717] tracking-widest uppercase">
          URBAN CRAFT
        </span>
      </div>
    ),
  },
];

export const DiagonalMarquee: React.FC = () => {
  return (
    <div
      aria-label="Partner Brands Diagonal Marquee Divider"
      className="relative overflow-hidden w-full py-8 sm:py-12 bg-[#f5f6f7] select-none z-10"
    >
      <div className="relative space-y-2 sm:space-y-3">
        
        {/* UPPER STRIP: Deep charcoal (#171717) ribbon, scrolling RIGHT TO LEFT, rotated -2.5deg */}
        <div
          className="relative will-change-transform"
          style={{
            transform: 'rotate(-2.5deg)',
            width: '116%',
            marginLeft: '-8%',
          }}
        >
          <div
            className="relative h-13 sm:h-16 md:h-18 bg-[#0E2234] flex items-center overflow-hidden z-0 group"
            title="Clients & Partners"
          >
            <div className="animate-marquee-left group-hover:[animation-play-state:paused] flex items-center gap-8 sm:gap-12 px-4">
              {/* Duplicate array for seamless infinite looping */}
              {[...UPPER_STRIP_LOGOS, ...UPPER_STRIP_LOGOS, ...UPPER_STRIP_LOGOS, ...UPPER_STRIP_LOGOS].map((item, idx) => (
                <div
                  key={`up-${idx}`}
                  className="flex-shrink-0 flex items-center transition-transform hover:scale-105 duration-200 cursor-default"
                  aria-hidden={idx >= UPPER_STRIP_LOGOS.length ? 'true' : undefined}
                >
                  {item.render()}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* LOWER STRIP: Brand Yatra Yellow (#F8C311) ribbon, scrolling LEFT TO RIGHT, rotated 2.5deg */}
        <div
          className="relative will-change-transform -mt-3 sm:-mt-5 z-10"
          style={{
            transform: 'rotate(2.5deg)',
            width: '116%',
            marginLeft: '-8%',
          }}
        >
          <div
            className="relative h-14 sm:h-18 md:h-20 bg-[#F8C311] flex items-center overflow-hidden z-10 group"
            title="Featured Collaborations"
          >
            <div className="animate-marquee-right group-hover:[animation-play-state:paused] flex items-center gap-8 sm:gap-12 px-4">
              {/* Duplicate array for seamless infinite looping */}
              {[...LOWER_STRIP_LOGOS, ...LOWER_STRIP_LOGOS, ...LOWER_STRIP_LOGOS, ...LOWER_STRIP_LOGOS].map((item, idx) => (
                <div
                  key={`low-${idx}`}
                  className="flex-shrink-0 flex items-center transition-transform hover:scale-105 duration-200 cursor-default"
                  aria-hidden={idx >= LOWER_STRIP_LOGOS.length ? 'true' : undefined}
                >
                  {item.render()}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
