import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { BtnShape } from './BtnShape';
import { WordRevealHeading } from './WordRevealHeading';
import heroImage from '../assets/images/startup_brand_hero_1793614570968.jpg';

interface HeroProps {
  onOpenConsultation?: () => void;
  onSuccessSubmit?: (formData: { name: string; email: string; phone: string; service: string }) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenConsultation }) => {
  const handleScrollToPortfolio = (e: React.MouseEvent) => {
    e.preventDefault();
    const portfolio = document.querySelector('#portfolio');
    if (portfolio) {
      portfolio.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAction = () => {
    if (onOpenConsultation) {
      onOpenConsultation();
    } else {
      const contact = document.querySelector('#contact');
      if (contact) {
        contact.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const startupPillars = [
    { code: '01', label: 'BRAND IDENTITY SYSTEMS', desc: 'Positioning, Logos, Messaging & Design Guidelines' },
    { code: '02', label: 'HIGH-CONVERTING WEBSITES', desc: 'React & Webflow Custom Web Experience Engineering' },
    { code: '03', label: 'STARTUP PERFORMANCE PPC', desc: 'High-Intent Google Ads & Paid Social Media Funnels' },
    { code: '04', label: 'ORGANIC SEARCH & AI GROWTH', desc: 'Technical SEO, GEO & Generative Citation Authority' },
  ];

  return (
    <section className="relative pt-28 sm:pt-32 lg:pt-40 pb-14 sm:pb-16 lg:pb-20 bg-[#FFFFFF] text-[#0E2234] overflow-hidden border-b border-[#E5E9ED]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Editorial hero split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-14 sm:mb-16 lg:mb-20">
          
          {/* LEFT COLUMN: STARTUP KICKER, HEADLINE, NARRATIVE, CTAS */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            
            {/* Editorial Eyebrow Tag matching other sections */}
            <div className="flex flex-wrap items-center gap-3 text-clamp-label font-['Manrope',sans-serif] tracking-[0.16em] uppercase font-bold mb-5">
              <span className="w-8 h-px bg-[#F8C311]" aria-hidden="true" />
              <span className="text-[#0E2234] font-semibold">Startup Branding &amp; Growth</span>
              <span aria-hidden="true" className="text-[#66717D]">/</span>
              <span className="text-[#66717D] font-medium">Independent Creative Studio</span>
            </div>

            {/* Word Reveal Startup Headline with Marcellus Serif */}
            <WordRevealHeading
              as="h1"
              className="font-['Marcellus',serif] text-clamp-hero font-normal text-[#0E2234] tracking-tight leading-[1.02] mb-6 max-w-[11ch]"
            >
              From Startup Idea to <span className="text-[#F8C311]">Standout Brand.</span>
            </WordRevealHeading>

            {/* Supporting Description matching body style across sections */}
            <p className="font-['Inter',sans-serif] text-clamp-body text-[#66717D] leading-relaxed max-w-xl mb-8 font-normal">
              We help ambitious startups build distinctive identities, powerful digital experiences and marketing strategies designed for growth.
            </p>

            {/* Two Action CTAs using signature Brand Yatra BtnShape */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8 sm:mb-10 w-full sm:w-auto">
              
              {/* Primary CTA Button: Floats up slightly on hover, no zoom */}
              <button
                onClick={handleAction}
                className="group relative inline-flex items-center justify-center gap-2.5 text-[#0E2234] font-['Inter',sans-serif] text-xs sm:text-sm font-extrabold uppercase tracking-wider px-8 py-4 transition-all duration-300 filter drop-shadow-[0_8px_20px_rgba(248,195,17,0.3)] hover:-translate-y-1 active:translate-y-0 cursor-pointer w-full sm:w-auto"
                aria-label="Build Your Brand - Book Consultation"
              >
                <BtnShape fill="#F8C311" />
                <span className="relative z-10">Build Your Brand</span>
                <ArrowUpRight className="relative z-10 w-4 h-4 stroke-[2.8] text-[#0E2234] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              {/* Secondary CTA Button: Floats up slightly on hover, no zoom */}
              <a
                href="#portfolio"
                onClick={handleScrollToPortfolio}
                className="group/btn relative inline-flex items-center justify-center gap-2 text-[#0E2234] font-['Inter',sans-serif] text-xs sm:text-sm font-extrabold uppercase tracking-wider px-7 py-4 transition-all duration-300 hover:-translate-y-1 active:translate-y-0 cursor-pointer w-full sm:w-auto"
                aria-label="Explore Our Work - Scroll to Portfolio"
              >
                <BtnShape fill="#E5E9ED" className="group-hover/btn:fill-[#F8C311] transition-colors" />
                <span className="relative z-10">Explore Our Work</span>
                <ArrowUpRight className="relative z-10 w-3.5 h-3.5 stroke-[2.8] text-[#0E2234] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </a>

            </div>

            {/* Startup Proof Indicators */}
            <div className="pt-6 border-t border-[#E5E9ED] grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-5 text-xs text-[#66717D] font-['Inter',sans-serif]">
              <div className="sm:border-r sm:border-[#E5E9ED]">
                <span className="font-['Manrope',sans-serif] font-extrabold text-[#0E2234] text-base sm:text-lg">120+</span>
                <span className="block mt-1 text-xs text-[#66717D] font-['Inter',sans-serif] font-medium">Startups Scaled</span>
              </div>
              <div className="sm:border-r sm:border-[#E5E9ED]">
                <span className="font-['Manrope',sans-serif] font-extrabold text-[#0E2234] text-base sm:text-lg">$150M+</span>
                <span className="block mt-1 text-xs text-[#66717D] font-['Inter',sans-serif] font-medium">Capital Raised by Clients</span>
              </div>
              <div>
                <span className="font-['Manrope',sans-serif] font-extrabold text-[#0E2234] text-base sm:text-lg">12+</span>
                <span className="block mt-1 text-xs text-[#66717D] font-['Inter',sans-serif] font-medium">Years Studio Excellence</span>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: STARTUP BRAND & APP SHOWCASE VISUAL */}
          <div className="lg:col-span-6 lg:pl-4 mt-2 lg:mt-0">
            <div className="relative">
              <div className="relative overflow-hidden aspect-[4/3] lg:aspect-[5/4] bg-[#F5F6F7]">
                  <img
                    src={heroImage}
                    alt="Brand Yatra Authentic Startup Brand Identity & Digital Product Showcase"
                    width={600}
                    height={450}
                    loading="eager"
                    fetchPriority="high"
                    referrerPolicy="no-referrer"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.01]"
                  />
              </div>
              <div className="mt-3 flex items-center justify-between gap-4 border-t border-[#E5E9ED] pt-3 text-xs font-['Manrope',sans-serif]">
                <span className="font-bold text-[#0E2234] uppercase tracking-wider">Startup identity &amp; digital experience</span>
                <span className="shrink-0 font-mono text-[10px] sm:text-[11px] text-[#66717D]">BRAND / DIGITAL / GROWTH</span>
              </div>
            </div>
          </div>

        </div>

        {/* Service index */}
        <div className="pt-7 border-t border-[#E5E9ED]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 lg:gap-x-8">
            {startupPillars.map((item) => (
              <div 
                key={item.code} 
                className="group relative border-t border-[#E5E9ED] py-4 sm:py-5 transition-colors duration-300 hover:border-[#F8C311]"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-xs tabular-nums text-[#66717D]">
                    {item.code}
                  </span>
                  <span className="font-['Manrope',sans-serif] text-[11px] font-extrabold tracking-wider text-[#0E2234] group-hover:text-[#66717D] transition-colors uppercase">
                    {item.label}
                  </span>
                </div>
                <p className="text-clamp-body-sm text-[#66717D] font-['Inter',sans-serif] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
