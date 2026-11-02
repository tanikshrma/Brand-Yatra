import React from 'react';
import { ArrowUpRight, ArrowUp, MessageCircle, Phone, Mail, MapPin } from 'lucide-react';
import { AGENCY_INFO, SERVICES_LIST } from '../data/agencyData';
import { WordRevealHeading } from './WordRevealHeading';
import logoImg from '../assets/images/Logo White 01.png';

interface FooterProps {
  onOpenConsultation: () => void;
  onOpenLegal: (type: 'terms' | 'privacy') => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenConsultation, onOpenLegal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0E2234] text-[#FFFFFF] border-t border-white/10 pt-16 sm:pt-20 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Giant Circular "PING US" Signature Action Area */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-12 pb-16 sm:pb-20 border-b border-white/10">
          <div className="max-w-xl text-center lg:text-left">
            <WordRevealHeading
              as="h2"
              className="font-['Marcellus',serif] text-clamp-heading uppercase tracking-tight text-[#FFFFFF] mb-4"
            >
              READY TO SCALE YOUR <span className="text-[#F8C311]">BRAND IMPACT?</span>
            </WordRevealHeading>
            <p className="font-['Plus_Jakarta_Sans',sans-serif] text-clamp-body-sm text-[#D1D1D6] leading-relaxed">
              Connect with our partners today to explore brand positioning, search dominance,
              and performance marketing calibrated for measurable revenue.
            </p>
          </div>

          {/* Reference-matched giant circular "PING US" button */}
          <div className="shrink-0">
            <button
              onClick={onOpenConsultation}
              aria-label="PING US - Start your project consultation"
              className="group w-38 h-38 sm:w-48 sm:h-48 lg:w-52 lg:h-52 rounded-full bg-[#F8C311] hover:bg-[#FFD13B] text-[#0E2234] flex flex-col items-center justify-center p-4 sm:p-6 shadow-2xl shadow-[#F8C311]/25 hover:-translate-y-1 active:translate-y-0 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center gap-1 mb-1">
                <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[3] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform text-[#0E2234]" />
                <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[3] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform delay-75 text-[#0E2234]" />
              </div>
              <span className="font-['Marcellus',serif] text-xl sm:text-2xl lg:text-3xl tracking-wider uppercase leading-none font-bold text-[#0E2234]">
                PING US
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#0E2234]/90 font-mono mt-1 font-['Plus_Jakarta_Sans',sans-serif] font-bold">
                START NOW
              </span>
            </button>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="py-12 sm:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10">
          {/* Col 1: Brand Wordmark & Summary */}
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="mb-5">
              <a href="#" aria-label="Brand Yatra Home" className="inline-block">
                <img
                  src={logoImg}
                  alt="Brand Yatra Logo"
                  width={160}
                  height={32}
                  className="h-7 sm:h-8 w-auto object-contain"
                />
              </a>
            </div>
            <p className="font-['Plus_Jakarta_Sans',sans-serif] text-clamp-body-sm text-[#D1D1D6] leading-relaxed max-w-sm mb-6">
              Brand Yatra is an elite creative branding and digital marketing agency.
              We build distinctive brands and run high-efficiency customer acquisition engines.
            </p>
            <div className="text-xs text-[#D1D1D6] space-y-2.5 font-['Plus_Jakarta_Sans',sans-serif]">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#F8C311] shrink-0" />
                <span>
                  {AGENCY_INFO.address.line1}, {AGENCY_INFO.address.city}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#F8C311] shrink-0" />
                <a href={`mailto:${AGENCY_INFO.email}`} className="hover:text-[#F8C311] transition-colors">
                  {AGENCY_INFO.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#F8C311] shrink-0" />
                <a href="tel:+918041228890" className="hover:text-[#F8C311] transition-colors">
                  {AGENCY_INFO.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Core Services */}
          <div>
            <div className="font-['Marcellus',serif] text-sm uppercase tracking-widest text-[#FFFFFF] font-bold mb-4">
              Core Services
            </div>
            <ul className="space-y-2.5 text-xs text-[#D1D1D6] font-['Plus_Jakarta_Sans',sans-serif]">
              {SERVICES_LIST.slice(0, 5).map((s) => (
                <li key={s.id}>
                  <a href="#services" className="hover:text-[#F8C311] transition-colors">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Useful Links */}
          <div>
            <div className="font-['Marcellus',serif] text-sm uppercase tracking-widest text-[#FFFFFF] font-bold mb-4">
              Navigation
            </div>
            <ul className="space-y-2.5 text-xs text-[#D1D1D6] font-['Plus_Jakarta_Sans',sans-serif]">
              <li>
                <a href="#services" className="hover:text-[#F8C311] transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#strategy" className="hover:text-[#F8C311] transition-colors">
                  Growth Strategy
                </a>
              </li>
              <li>
                <a href="#portfolio" className="hover:text-[#F8C311] transition-colors">
                  Case Studies
                </a>
              </li>
              <li>
                <a href="#process" className="hover:text-[#F8C311] transition-colors">
                  Our Process
                </a>
              </li>
              <li>
                <a href="#capabilities" className="hover:text-[#F8C311] transition-colors">
                  Capabilities
                </a>
              </li>
              <li>
                <a href="#insights" className="hover:text-[#F8C311] transition-colors">
                  Insights &amp; Articles
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Social Media */}
          <div>
            <div className="font-['Marcellus',serif] text-sm uppercase tracking-widest text-[#FFFFFF] font-bold mb-4">
              Social Media
            </div>
            <ul className="space-y-2.5 text-xs text-[#D1D1D6] font-['Plus_Jakarta_Sans',sans-serif]">
              {AGENCY_INFO.socials.map((soc) => (
                <li key={soc.name}>
                  <a
                    href={soc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#F8C311] transition-colors flex items-center gap-1.5"
                  >
                    <span>{soc.name}</span>
                    <ArrowUpRight className="w-3 h-3 text-[#D1D1D6]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#D1D1D6] font-['Plus_Jakarta_Sans',sans-serif]">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span>Copyright &copy; {new Date().getFullYear()} Brand Yatra. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => onOpenLegal('terms')}
              className="hover:text-[#FFFFFF] transition-colors cursor-pointer"
            >
              Terms &amp; Conditions
            </button>
            <button
              onClick={() => onOpenLegal('privacy')}
              className="hover:text-[#FFFFFF] transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
          </div>
        </div>
      </div>

      {/* Floating Action Buttons: WhatsApp & Back to Top */}
      <div className="fixed bottom-6 left-6 z-40">
        <a
          href="https://wa.me/918041228890?text=Hello%20Brand%20Yatra,%20I%20would%20like%20to%20discuss%20a%20project."
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-xl shadow-black/40 hover:-translate-y-1 active:translate-y-0 transition-all cursor-pointer"
          aria-label="Chat on WhatsApp with Brand Yatra"
          title="Chat with Brand Yatra"
        >
          <MessageCircle className="w-6 h-6" />
        </a>
      </div>

      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={scrollToTop}
          className="w-12 h-12 rounded-full bg-[#F8C311] hover:bg-[#FFD13B] text-[#0E2234] flex items-center justify-center shadow-xl shadow-[#F8C311]/25 hover:-translate-y-1 active:translate-y-0 transition-all cursor-pointer font-bold"
          aria-label="Scroll to top of page"
          title="Back to Top"
        >
          <ArrowUp className="w-5 h-5 stroke-[2.5]" />
        </button>
      </div>
    </footer>
  );
};
