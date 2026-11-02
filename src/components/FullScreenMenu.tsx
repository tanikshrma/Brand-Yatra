import React, { useEffect, useRef } from 'react';
import { X, ArrowUpRight, ArrowUp } from 'lucide-react';
import { AGENCY_INFO } from '../data/agencyData';
import logoImg from '../assets/images/Logo White 01.png';

interface FullScreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
  triggerButtonRef?: React.RefObject<HTMLButtonElement | null>;
}

export const FullScreenMenu: React.FC<FullScreenMenuProps> = ({
  isOpen,
  onClose,
  triggerButtonRef,
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const mobileCloseButtonRef = useRef<HTMLButtonElement>(null);

  const menuLinks = [
    { label: 'Core Service', href: '#services', number: '01' },
    { label: 'What we do', href: '#strategy', number: '02' },
    { label: 'Features', href: '#capabilities', number: '03' },
    { label: 'Portfolio', href: '#portfolio', number: '04' },
    { label: 'Other Services', href: '#process', number: '05' },
    { label: 'Contact', href: '#contact', number: '06' },
  ];

  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const timer = setTimeout(() => {
        if (window.innerWidth < 1024) {
          mobileCloseButtonRef.current?.focus();
        } else {
          closeButtonRef.current?.focus();
        }
      }, 100);

      return () => {
        document.body.style.overflow = originalOverflow;
        clearTimeout(timer);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
        triggerButtonRef?.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, triggerButtonRef]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    onClose();

    const targetElement = document.querySelector(href);
    if (targetElement) {
      setTimeout(() => {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }, 350);
    } else {
      window.location.hash = href;
    }
  };

  const handleBackToTop = () => {
    onClose();
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 300);
  };

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label="Main Navigation Menu"
      className={`fixed inset-0 z-50 transition-all duration-700 ease-cinema ${
        isOpen
          ? 'opacity-100 pointer-events-auto visible'
          : 'opacity-0 pointer-events-none invisible'
      }`}
    >
      {/* Background backdrop blur */}
      <div
        className="absolute inset-0 bg-[#071521]/85 backdrop-blur-md transition-opacity duration-500"
        onClick={onClose}
      />

      <div className="relative w-full h-full flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden select-none">
        
        {/* MENU LINKS PANEL: Full width on mobile, 67% on desktop */}
        <div
          className={`w-full lg:w-[67%] bg-[#0E2234] text-[#FFFFFF] h-full min-h-[100dvh] lg:min-h-full flex flex-col justify-between p-6 sm:p-10 lg:p-16 xl:p-20 transition-transform duration-700 ease-cinema relative z-10 overflow-y-auto lg:overflow-visible ${
            isOpen ? 'translate-y-0 lg:translate-x-0' : '-translate-y-8 lg:-translate-x-12'
          }`}
        >
          {/* Top Bar inside Menu */}
          <div
            className={`flex items-center justify-between w-full transition-all duration-500 delay-100 ${
              isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
            }`}
          >
            {/* Left Brand Logo Image */}
            <div className="flex items-center gap-3">
              <img
                src={logoImg}
                alt="Brand Yatra Logo"
                width={140}
                height={28}
                className="h-6 sm:h-7 w-auto object-contain"
              />
            </div>

            {/* Mobile Close Button (< lg only) */}
            <button
              ref={mobileCloseButtonRef}
              onClick={onClose}
              aria-label="Close navigation menu"
              className="lg:hidden w-11 h-11 rounded-full bg-[#F8C311] hover:bg-[#E5B20D] text-[#0E2234] flex items-center justify-center transition-all duration-300 shadow-lg shadow-[#F8C311]/25 active:scale-95 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white font-bold"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>

          {/* Navigation Links - Centered & Prominent */}
          <nav className="my-auto py-6 sm:py-8 lg:py-0">
            <ul className="flex flex-col space-y-2.5 sm:space-y-4 md:space-y-5 lg:space-y-6 xl:space-y-7">
              {menuLinks.map((link, idx) => {
                const delayMs = isOpen ? idx * 50 + 100 : 0;

                return (
                  <li
                    key={link.label}
                    style={{
                      transitionDelay: `${delayMs}ms`,
                    }}
                    className={`transform transition-all duration-600 ease-cinema ${
                      isOpen
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-6'
                    }`}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="group flex items-baseline gap-3 sm:gap-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F8C311] rounded-lg py-1.5 active:text-[#F8C311]"
                    >
                      <span className="font-mono text-xs sm:text-sm text-[#F8C311]/70 group-hover:text-[#F8C311] group-active:text-[#F8C311] transition-colors duration-300 w-6 flex-shrink-0">
                        /{link.number}
                      </span>

                      {/* Marcellus Font for prominent large menu links */}
                      <span className="font-['Marcellus',serif] text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[58px] tracking-tight leading-[1.15] text-[#FFFFFF] group-hover:text-[#F8C311] group-hover:translate-x-2 group-active:text-[#F8C311] transition-all duration-300 ease-out">
                        {link.label}
                      </span>

                      <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 text-[#F8C311] opacity-0 -translate-x-2 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 ease-out hidden sm:inline-block" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Bottom Footer Info */}
          <div
            className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#929292] pt-4 border-t border-white/10 transition-all duration-700 delay-500 ${
              isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <span className="font-['Marcellus',serif] tracking-wider uppercase text-xs sm:text-sm text-[#FFFFFF]/90">
              Brand Yatra &copy; {new Date().getFullYear()} · Creative Agency
            </span>
            <span className="font-mono text-[11px] text-[#F8C311]">
              [TAP LINK OR CLOSE]
            </span>
          </div>
        </div>

        {/* RIGHT PANEL: 33% width on desktop */}
        <div
          className={`hidden lg:flex lg:w-[33%] bg-[#142F48] text-[#FFFFFF] border-l border-white/10 p-8 sm:p-12 lg:p-14 xl:p-16 flex-col justify-between relative transition-transform duration-700 ease-cinema ${
            isOpen ? 'translate-x-0' : 'translate-x-12'
          }`}
        >
          {/* Desktop Close Button */}
          <div className="flex justify-end mb-8 lg:mb-12">
            <button
              ref={closeButtonRef}
              onClick={onClose}
              aria-label="Close navigation menu"
              className="w-12 h-12 rounded-full bg-white/5 hover:bg-[#F8C311] text-[#FFFFFF] hover:text-[#0E2234] border border-white/10 hover:border-[#F8C311] flex items-center justify-center transition-all duration-300 cursor-pointer active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F8C311]"
            >
              <X className="w-6 h-6 stroke-[1.8]" />
            </button>
          </div>

          <div className="space-y-10 lg:space-y-12 my-auto">
            {/* GROUP 1: Brief Us */}
            <div
              className={`transition-all duration-700 delay-200 ${
                isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <h3 className="font-['Marcellus',serif] text-2xl sm:text-[28px] lg:text-[32px] text-[#FFFFFF] tracking-tight uppercase mb-3">
                Brief Us
              </h3>
              <a
                href={`mailto:${AGENCY_INFO.email}`}
                className="inline-block text-base sm:text-lg text-[#F8C311] hover:text-white font-semibold tracking-wide mb-2 transition-colors"
              >
                {AGENCY_INFO.email}
              </a>
              <p className="text-xs sm:text-sm text-[#777777] leading-relaxed max-w-xs font-['Plus_Jakarta_Sans',sans-serif]">
                We'd love to hear about your brand vision, creative strategy, and digital marketing requirements.
              </p>
            </div>

            {/* GROUP 2: Our Office */}
            <div
              className={`transition-all duration-700 delay-300 ${
                isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <h3 className="font-['Marcellus',serif] text-2xl sm:text-[28px] lg:text-[32px] text-[#FFFFFF] tracking-tight uppercase mb-3">
                Our Office
              </h3>
              <div className="text-xs sm:text-sm text-[#777777] leading-relaxed max-w-xs space-y-1 font-['Plus_Jakarta_Sans',sans-serif]">
                <p>{AGENCY_INFO.address.line1}</p>
                <p>{AGENCY_INFO.address.line2}</p>
                <p>{AGENCY_INFO.address.city}</p>
                <p className="pt-1 text-[#FFFFFF] font-mono text-xs">{AGENCY_INFO.phone}</p>
              </div>
            </div>

            {/* GROUP 3: Follow Us */}
            <div
              className={`transition-all duration-700 delay-400 ${
                isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <h3 className="font-['Marcellus',serif] text-2xl sm:text-[28px] lg:text-[32px] text-[#FFFFFF] tracking-tight uppercase mb-4">
                Follow Us
              </h3>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs sm:text-sm text-[#777777]">
                {AGENCY_INFO.socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:text-[#F8C311] transition-colors py-0.5"
                  >
                    <span>{social.name}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#777777] group-hover:text-[#F8C311]" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div
            className={`flex justify-end pt-8 transition-all duration-700 delay-500 ${
              isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <button
              onClick={handleBackToTop}
              aria-label="Back to top of page"
              className="w-11 h-11 bg-[#F8C311] hover:bg-[#E5B20D] text-[#171717] font-bold rounded-lg flex items-center justify-center transition-all duration-300 shadow-md shadow-[#F8C311]/25 active:scale-95 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <ArrowUp className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
