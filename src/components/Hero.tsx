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
    <section className="relative pt-24 sm:pt-28 pb-14 sm:pb-16 lg:pt-36 lg:pb-24 bg-[#FFFFFF] text-[#0E2234] overflow-hidden border-b border-[#E5E9ED]">
      
      {/* Subtle Hairline Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.18] pointer-events-none bg-[linear-gradient(to_right,#E5E9ED_1px,transparent_1px),linear-gradient(to_bottom,#E5E9ED_1px,transparent_1px)] bg-[size:5rem_5rem]" 
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Asymmetrical Editorial Split: 7 Cols Left / 5 Cols Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center mb-12 sm:mb-16 lg:mb-20">
          
          {/* LEFT COLUMN: STARTUP KICKER, HEADLINE, NARRATIVE, CTAS */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Editorial Eyebrow Tag matching other sections */}
            <div className="flex flex-wrap items-center gap-2 text-clamp-label font-['Manrope',sans-serif] tracking-widest text-[#F8C311] uppercase font-bold mb-4">
              <span className="text-[#F8C311] bg-[#0E2234] px-2.5 py-0.5 rounded font-mono text-xs font-bold">01</span>
              <span aria-hidden="true" className="text-[#66717D]">·</span>
              <span className="text-[#0E2234] font-semibold">Startup Branding &amp; Growth</span>
              <span aria-hidden="true" className="text-[#66717D]">·</span>
              <span className="text-[#66717D] font-medium">Your Creative Growth Partner</span>
            </div>

            {/* Word Reveal Startup Headline with Marcellus Serif */}
            <WordRevealHeading
              as="h1"
              className="font-['Marcellus',serif] text-clamp-hero font-normal text-[#0E2234] tracking-tight leading-[1.08] mb-6"
            >
              From Startup Idea to <span className="text-[#F8C311]">Standout Brand.</span>
            </WordRevealHeading>

            {/* Supporting Description matching body style across sections */}
            <p className="font-['Inter',sans-serif] text-clamp-body text-[#66717D] leading-relaxed max-w-2xl mb-8 font-normal">
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
            <div className="pt-6 border-t border-[#E5E9ED] flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-[#66717D] font-['Inter',sans-serif]">
              <div>
                <span className="font-['Manrope',sans-serif] font-extrabold text-[#0E2234] text-base sm:text-lg">120+</span>
                <span className="ml-1.5 text-xs text-[#66717D] font-['Inter',sans-serif] font-medium">Startups Scaled</span>
              </div>
              <span aria-hidden="true" className="text-[#E5E9ED] hidden sm:inline">|</span>
              <div>
                <span className="font-['Manrope',sans-serif] font-extrabold text-[#0E2234] text-base sm:text-lg">$150M+</span>
                <span className="ml-1.5 text-xs text-[#66717D] font-['Inter',sans-serif] font-medium">Capital Raised by Clients</span>
              </div>
              <span aria-hidden="true" className="text-[#E5E9ED] hidden sm:inline">|</span>
              <div>
                <span className="font-['Manrope',sans-serif] font-extrabold text-[#0E2234] text-base sm:text-lg">12+</span>
                <span className="ml-1.5 text-xs text-[#66717D] font-['Inter',sans-serif] font-medium">Years Studio Excellence</span>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: STARTUP BRAND & APP SHOWCASE VISUAL */}
          <div className="lg:col-span-5 mt-4 lg:mt-0">
            <div className="relative">
              
              {/* Asymmetrical Frame Backing */}
              <div 
                className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 w-full h-full border border-[#0E2234]/15 bg-[#F5F6F7] pointer-events-none rounded-2xl"
                aria-hidden="true"
              />

              {/* Startup Brand Showcase Card */}
              <div className="relative z-10 bg-white p-2.5 sm:p-3 border border-[#E5E9ED] rounded-2xl shadow-lg">
                <div className="relative overflow-hidden aspect-[4/3] bg-[#F5F6F7] rounded-xl">
                  <img
                    src={heroImage}
                    alt="Brand Yatra Authentic Startup Brand Identity & Digital Product Showcase"
                    width={600}
                    height={450}
                    loading="eager"
                    fetchPriority="high"
                    referrerPolicy="no-referrer"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.02]"
                  />
                </div>

                {/* Art-Directed Caption Strip */}
                <div className="mt-3 pt-3 border-t border-[#E5E9ED] flex items-center justify-between px-1 text-xs font-['Manrope',sans-serif]">
                  <div className="font-bold text-[#0E2234] uppercase tracking-wider text-[11px] sm:text-xs">
                    Startup App &amp; Identity System
                  </div>
                  <span className="font-mono text-[10px] sm:text-[11px] text-[#F8C311] bg-[#0E2234] px-2 sm:px-2.5 py-0.5 rounded border border-white/10 font-bold">
                    STUDIO SHOWCASE
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* BOTTOM INFORMATION STRIP */}
        <div className="pt-8 border-t border-[#E5E9ED]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {startupPillars.map((item) => (
              <div 
                key={item.code} 
                className="group relative bg-[#F5F6F7] border border-[#E5E9ED] hover:border-[#F8C311] rounded-2xl p-4 sm:p-5 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-xs font-bold text-[#F8C311] bg-[#0E2234] px-2 py-0.5 rounded">
                    {item.code}
                  </span>
                  <span className="font-['Manrope',sans-serif] text-xs font-extrabold tracking-wider text-[#0E2234] group-hover:text-[#F8C311] transition-colors uppercase">
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
