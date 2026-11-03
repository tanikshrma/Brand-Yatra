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
    { label: 'Services', href: '#services', number: '01' },
    { label: 'Strategy', href: '#strategy', number: '02' },
    { label: 'Capabilities', href: '#capabilities', number: '03' },
    { label: 'Portfolio', href: '#portfolio', number: '04' },
    { label: 'Process', href: '#process', number: '05' },
    { label: 'Contact', href: '#contact', number: '06' },
  ];

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const timer = setTimeout(() => {
      if (window.innerWidth < 1024) {
        mobileCloseButtonRef.current?.focus();
      } else {
        closeButtonRef.current?.focus();
      }
    }, 100);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab') return;

      const focusableElements = Array.from(
        overlayRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      ).filter((element) => element.getClientRects().length > 0);
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      if (!firstElement || !lastElement) return;

      if (event.shiftKey && (document.activeElement === firstElement || !overlayRef.current?.contains(document.activeElement))) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && (document.activeElement === lastElement || !overlayRef.current?.contains(document.activeElement))) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timer);
      triggerButtonRef?.current?.focus();
    };
  }, [isOpen, onClose, triggerButtonRef]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    onClose();

    const targetElement = document.querySelector(href);
    if (targetElement) {
      window.history.pushState(null, '', href);
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
      id="fullscreen-navigation"
      role="dialog"
      aria-modal="true"
      aria-label="Main Navigation Menu"
      tabIndex={-1}
      className={`by-menu-surface fixed inset-0 z-50 overflow-hidden transition-all duration-700 ease-cinema ${
        isOpen
          ? 'opacity-100 pointer-events-auto visible'
          : 'opacity-0 pointer-events-none invisible'
      }`}
    >
      <div
        className="absolute inset-0 bg-black/10 transition-opacity duration-500"
        onClick={onClose}
      />

      <div className="relative flex h-full min-h-0 w-full flex-col overflow-hidden lg:flex-row">
        
        {/* MENU LINKS PANEL: Full width on mobile, 67% on desktop */}
        <div
          className={`relative z-10 flex h-full min-h-0 w-full flex-col justify-between p-6 text-[var(--color-white)] transition-transform duration-700 ease-cinema sm:p-10 lg:w-[67%] lg:px-[100px] lg:py-10 xl:py-12 ${
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
            <a href="/" aria-label="Brand Yatra Home" className="inline-flex shrink-0 items-center rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]">
              <img
                src={logoImg}
                alt="Brand Yatra Logo"
                width={180}
                height={32}
                className="h-auto w-[min(180px,55vw)] object-contain"
              />
            </a>

            {/* Mobile Close Button (< lg only) */}
            <button
              ref={mobileCloseButtonRef}
              onClick={onClose}
              aria-label="Close navigation menu"
              className="lg:hidden w-11 h-11 rounded-full bg-[var(--color-primary)] hover:bg-[var(--color-primary)] text-[var(--color-navy)] flex items-center justify-center transition-all duration-300 shadow-lg shadow-[var(--color-primary)]/25 active:scale-95 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white font-bold"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>

          {/* Navigation Links - Centered & Prominent */}
          <nav className="my-auto w-full py-[clamp(0.5rem,2vh,1.5rem)]">
            <ul className="flex flex-col divide-y divide-white/10 border-y border-white/10">
              {menuLinks.map((link, idx) => {
                const delayMs = isOpen ? idx * 50 + 100 : 0;

                return (
                  <li
                    key={link.label}
                    style={{
                      transitionDelay: `${delayMs}ms`,
                    }}
                    className={`transform py-[clamp(0.2rem,0.65vh,0.5rem)] transition-all duration-600 ease-cinema ${
                      isOpen
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-6'
                    }`}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="group flex items-center gap-3 rounded-lg py-0.5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] active:text-[var(--color-primary)] sm:gap-5"
                    >
                      <span className="font-mono text-xs sm:text-sm text-[var(--color-primary)]/70 group-hover:text-[var(--color-primary)] group-active:text-[var(--color-primary)] transition-colors duration-300 w-6 flex-shrink-0">
                        /{link.number}
                      </span>

                      {/* Marcellus Font for prominent large menu links */}
                      <span className="font-['Marcellus',serif] text-[clamp(1.5rem,4.2vw,3.25rem)] leading-[1.1] tracking-tight text-[var(--color-white)] transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:text-[var(--color-primary)] group-active:text-[var(--color-primary)]">
                        {link.label}
                      </span>

                      <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--color-primary)] opacity-0 -translate-x-2 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 ease-out hidden sm:inline-block" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Bottom Footer Info */}
          <div
            className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[var(--color-muted-slate)] pt-4 border-t border-white/10 transition-all duration-700 delay-500 ${
              isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <span className="font-['Marcellus',serif] tracking-wider uppercase text-xs sm:text-sm text-[var(--color-white)]/90">
              Brand Yatra &copy; {new Date().getFullYear()} · Creative Agency
            </span>
          </div>
        </div>

        {/* RIGHT PANEL: 33% width on desktop */}
        <div
          className={`relative hidden flex-col justify-between border-l border-white/10 p-8 text-[var(--color-white)] transition-transform duration-700 ease-cinema sm:p-12 lg:flex lg:w-[33%] lg:p-12 xl:p-14 ${
            isOpen ? 'translate-x-0' : 'translate-x-12'
          }`}
        >
          {/* Desktop Close Button */}
          <div className="flex justify-end mb-8 lg:mb-12">
            <button
              ref={closeButtonRef}
              onClick={onClose}
              aria-label="Close navigation menu"
              className="w-12 h-12 rounded-full bg-white/5 hover:bg-[var(--color-primary)] text-[var(--color-white)] hover:text-[var(--color-navy)] border border-white/10 hover:border-[var(--color-primary)] flex items-center justify-center transition-all duration-300 cursor-pointer active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
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
              <h3 className="font-['Marcellus',serif] text-2xl sm:text-[28px] lg:text-[32px] text-[var(--color-white)] tracking-tight uppercase mb-3">
                Brief Us
              </h3>
              <a
                href={`mailto:${AGENCY_INFO.email}`}
                className="inline-block text-base sm:text-lg text-[var(--color-primary)] hover:text-[var(--color-white)] font-semibold tracking-wide mb-2 transition-colors"
              >
                {AGENCY_INFO.email}
              </a>
              <p className="text-xs sm:text-sm text-[var(--color-muted-slate)] leading-relaxed max-w-xs font-['Plus_Jakarta_Sans',sans-serif]">
                We'd love to hear about your brand vision, creative strategy, and digital marketing requirements.
              </p>
            </div>

            {/* GROUP 2: Our Office */}
            <div
              className={`transition-all duration-700 delay-300 ${
                isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <h3 className="font-['Marcellus',serif] text-2xl sm:text-[28px] lg:text-[32px] text-[var(--color-white)] tracking-tight uppercase mb-3">
                Our Office
              </h3>
              <div className="text-xs sm:text-sm text-[var(--color-muted-slate)] leading-relaxed max-w-xs space-y-1 font-['Plus_Jakarta_Sans',sans-serif]">
                <p>{AGENCY_INFO.address.city}</p>
                <a href={`tel:${AGENCY_INFO.phone.replace(/\s+/g, '')}`} className="inline-block pt-1 text-[var(--color-white)] font-mono text-xs hover:text-[var(--color-primary)]">
                  {AGENCY_INFO.phone}
                </a>
              </div>
            </div>

            {/* GROUP 3: Follow Us */}
            {AGENCY_INFO.socials.length > 0 && (
              <div
                className={`transition-all duration-700 delay-400 ${
                  isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
              >
                <h3 className="font-['Marcellus',serif] text-2xl sm:text-[28px] lg:text-[32px] text-[var(--color-white)] tracking-tight uppercase mb-4">
                  Follow Us
                </h3>
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs sm:text-sm text-[var(--color-muted-slate)]">
                  {AGENCY_INFO.socials.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 hover:text-[var(--color-primary)] transition-colors py-0.5"
                    >
                      <span>{social.name}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[var(--color-muted-slate)] group-hover:text-[var(--color-primary)]" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div
            className={`flex justify-end pt-8 transition-all duration-700 delay-500 ${
              isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <button
              onClick={handleBackToTop}
              aria-label="Back to top of page"
              className="w-11 h-11 bg-[var(--color-primary)] hover:bg-[var(--color-primary)] text-[var(--color-dark-text)] font-bold rounded-lg flex items-center justify-center transition-all duration-300 shadow-md shadow-[var(--color-primary)]/25 active:scale-95 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <ArrowUp className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
