import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { FullScreenMenu } from './FullScreenMenu';
import logoImg from '../assets/images/Logo Black 01.png';

interface HeaderProps {
  onOpenConsultation?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenConsultation }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
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
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[#E5E9ED] shadow-sm'
            : 'bg-[#FFFFFF] border-b border-[#E5E9ED]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-24 flex items-center justify-between gap-8">
          
          {/* Zone 1: Brand Yatra Logo */}
          <a
            href="#"
            className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F8C311] rounded-lg py-1 shrink-0"
            aria-label="Brand Yatra Home"
          >
            <img
              src={logoImg}
              alt="Brand Yatra Logo"
              width={180}
              height={32}
              className="h-6 sm:h-7 lg:h-8 w-auto object-contain transition-transform duration-200 hover:scale-105"
            />
          </a>

          {/* Zone 2: Clean Title-Case Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 font-['Manrope',sans-serif] text-sm font-semibold text-[#66717D]">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-[#0E2234] transition-colors duration-200 py-1 relative group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F8C311] rounded whitespace-nowrap shrink-0"
              >
                <span>{link.name}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#F8C311] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Zone 3: Signature Hamburger Menu Button */}
          <div className="flex items-center shrink-0">
            <button
              ref={hamburgerRef}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? 'Close Navigation Menu' : 'Open Full Screen Navigation Menu'}
              className="group relative w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-[#F8C311] hover:bg-[#e6b30c] text-[#0E2234] flex items-center justify-center transition-all duration-300 shadow-md shadow-[#F8C311]/20 hover:shadow-lg hover:shadow-[#F8C311]/35 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0E2234]"
            >
              {isMenuOpen ? (
                <X className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2] animate-in spin-in-90 duration-200 text-[#0E2234]" />
              ) : (
                /* Minimalist Four-Square Grid Icon in Deep Navy */
                <div className="grid grid-cols-2 gap-1 sm:gap-1.5 w-4 h-4 sm:w-5 sm:h-5 items-center justify-center transition-transform duration-300 group-hover:rotate-90">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#0E2234] rounded-[2px] shadow-sm transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5" />
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#0E2234] rounded-[2px] shadow-sm transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#0E2234] rounded-[2px] shadow-sm transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:translate-y-0.5" />
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#0E2234] rounded-[2px] shadow-sm transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
                </div>
              )}
            </button>
          </div>

        </div>
      </header>

      {/* Full-Screen Split Overlay Menu */}
      <FullScreenMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        triggerButtonRef={hamburgerRef}
      />
    </>
  );
};
