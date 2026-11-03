import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FullScreenMenu } from './FullScreenMenu';
import logoWhite from '../assets/images/Logo White 01.png';

interface HeaderProps {
  onOpenConsultation?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenConsultation }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 48);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Strategy', href: '#strategy' },
    { name: 'Capabilities', href: '#capabilities' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Process', href: '#process' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,backdrop-filter,border-color,box-shadow] duration-300 ease-out ${
          isScrolled
            ? 'border-b border-white/10 bg-[#03090f]/85 shadow-[0_10px_25px_rgba(14,34,52,0.12)] backdrop-blur-[8px]'
            : 'border-b border-transparent bg-transparent backdrop-blur-0'
        }`}
      >
        <div className="site-gutter h-20 sm:h-24 flex items-center justify-between gap-8">
          
          {/* Zone 1: Brand Yatra Logo */}
          <a
            href="/"
            className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] rounded-lg py-1 shrink-0"
            aria-label="Brand Yatra Home"
          >
            <img
              src={logoWhite}
              alt="Brand Yatra Logo"
              width={180}
              height={32}
              className="h-6 sm:h-7 lg:h-8 w-auto object-contain transition-transform duration-200 hover:scale-105"
            />
          </a>

          {/* Zone 2: Clean Title-Case Navigation Links */}
          <nav className={`hidden lg:flex items-center gap-8 font-['Manrope',sans-serif] text-sm font-semibold transition-colors duration-300 ${
            isScrolled ? 'text-white/80' : 'text-white/75'
          }`}>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`transition-colors duration-200 py-1 relative group focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] rounded whitespace-nowrap shrink-0 ${
                  'hover:text-[var(--color-white)]'
                }`}
              >
                <span>{link.name}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[var(--color-primary)] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Zone 3: Signature Hamburger Menu Button */}
          <div className="flex items-center shrink-0">
            <button
              ref={hamburgerRef}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-controls="fullscreen-navigation"
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? 'Close Navigation Menu' : 'Open Full Screen Navigation Menu'}
              className="group relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[var(--color-primary)]/80 bg-[var(--color-primary)] text-[var(--color-navy)] shadow-[0_8px_24px_rgba(248,195,17,0.22)] transition-[background-color,border-color,box-shadow] duration-300 hover:bg-[#FFD33D] hover:shadow-[0_12px_30px_rgba(248,195,17,0.32)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:h-12 sm:w-12"
            >
              <span className="relative flex h-4 w-5 items-center justify-center sm:h-[18px] sm:w-[22px]" aria-hidden="true">
                <span className={`absolute h-[2px] w-full rounded-full bg-current transition-transform duration-300 ease-out ${isMenuOpen ? 'rotate-45' : '-translate-y-[5px] group-hover:-translate-y-[6px]'}`} />
                <span className={`absolute h-[2px] w-full rounded-full bg-current transition-transform duration-300 ease-out ${isMenuOpen ? '-rotate-45' : 'translate-y-[5px] group-hover:translate-y-[6px]'}`} />
              </span>
            </button>
          </div>

        </div>
      </header>

      {/* Full-Screen Split Overlay Menu */}
      <FullScreenMenu
        isOpen={isMenuOpen}
        onClose={closeMenu}
        triggerButtonRef={hamburgerRef}
      />
    </>
  );
};
