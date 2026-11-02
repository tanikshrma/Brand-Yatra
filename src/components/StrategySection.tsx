import React from 'react';
import { ArrowUpRight, Search, Target, Share2 } from 'lucide-react';
import { STRATEGY_CARDS } from '../data/agencyData';
import { BtnShape } from './BtnShape';
import { WordRevealHeading } from './WordRevealHeading';

interface StrategySectionProps {
  onOpenConsultation: () => void;
}

export const StrategySection: React.FC<StrategySectionProps> = ({ onOpenConsultation }) => {
  return (
    <section id="strategy" className="py-16 sm:py-24 lg:py-32 bg-[#F5F6F7] text-[#17212B] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Eyebrow Header */}
        <div className="flex items-center gap-2.5 text-clamp-label font-['Manrope',sans-serif] tracking-widest text-[#66717D] uppercase font-bold mb-4">
          <span className="text-[#F8C311] bg-[#0E2234] px-2 py-0.5 rounded font-mono text-xs">01</span>
          <span aria-hidden="true">·</span>
          <span>Integrated Growth Model</span>
        </div>

        {/* Asymmetric 2-Column Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Dominant Editorial Statement */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full">
            <div>
              <WordRevealHeading
                as="h2"
                className="font-['Marcellus',serif] text-clamp-heading text-[#0E2234] font-normal tracking-tight leading-[1.12] mb-6"
              >
                One Strategy Across Search, Paid Media &amp; <span className="text-[#0E2234] underline decoration-[#F8C311] decoration-4 underline-offset-8">Brand Authority.</span>
              </WordRevealHeading>
              
              <p className="font-['Inter',sans-serif] text-clamp-body text-[#66717D] leading-relaxed mb-8 font-normal">
                Connect search intent, paid acquisition, social engagement, and high-converting storytelling through one dedicated agency partner focused on pipeline revenue.
              </p>
            </div>

            {/* Dark CTA Banner Panel */}
            <div className="bg-[#0E2234] text-white p-6 sm:p-7 border-l-2 border-[#F8C311] mt-2 sm:mt-6">
              <div className="text-clamp-label font-mono text-[#F8C311] font-bold uppercase tracking-wider mb-2">
                Compound Pipeline Impact
              </div>
              <h3 className="font-['Marcellus',serif] text-lg sm:text-xl font-bold text-white mb-3">
                Ready to transform your acquisition unit economics?
              </h3>
              <p className="font-['Inter',sans-serif] text-clamp-body-sm text-[#D1D1D6] leading-relaxed mb-6">
                Our team audits your current campaign data and builds a custom roadmap.
              </p>
              <button
                onClick={onOpenConsultation}
                aria-label="Start Your Audit - Open Consultation Modal"
                className="group relative inline-flex items-center justify-center gap-2 text-[#0E2234] font-['Inter',sans-serif] text-xs font-extrabold uppercase tracking-wider px-6 py-3.5 transition-all duration-300 hover:-translate-y-1 active:translate-y-0 cursor-pointer w-full sm:w-auto"
              >
                <BtnShape fill="#F8C311" />
                <span className="relative z-10">Start Your Audit</span>
                <ArrowUpRight className="relative z-10 w-4 h-4 stroke-[2.8] text-[#0E2234] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Column: 3-Step Editorial Strategy Breakdown */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6">
            {STRATEGY_CARDS.slice(0, 3).map((card, idx) => {
              const icons = [Search, Target, Share2];
              const IconComponent = icons[idx] || Search;
              const stepNum = (idx + 1).toString().padStart(2, '0');

              return (
                <div
                  key={card.id}
                  className="border-t border-[#E5E9ED] hover:border-[#F8C311] py-6 sm:py-8 transition-colors duration-300 group"
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm font-bold text-[#F8C311] bg-[#0E2234] px-2.5 py-1 rounded">
                        {stepNum}
                      </span>
                      <span className="font-['Manrope',sans-serif] text-xs font-bold uppercase tracking-wider text-[#66717D]">
                        {card.label}
                      </span>
                    </div>
                    <div className="w-9 h-9 border border-[#E5E9ED] flex items-center justify-center text-[#0E2234] group-hover:text-[#F8C311] group-hover:bg-[#0E2234] transition-colors shrink-0">
                      <IconComponent className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="font-['Marcellus',serif] text-lg sm:text-xl md:text-2xl text-[#0E2234] font-bold mb-3 group-hover:text-[#F8C311] transition-colors leading-snug">
                    {card.headline}
                  </h3>

                  <p className="font-['Inter',sans-serif] text-clamp-body-sm text-[#66717D] leading-relaxed mb-4">
                    {card.body}
                  </p>

                  <div className="pt-4 border-t border-[#E5E9ED] flex flex-wrap items-center justify-between gap-2 text-xs font-['Inter',sans-serif] text-[#0E2234] font-semibold">
                    <span className="text-[#66717D]">Target Outcome: <strong className="text-[#0E2234] font-bold">Revenue Growth</strong></span>
                    <button
                      onClick={onOpenConsultation}
                      aria-label={`Explore strategy pillar ${card.label}`}
                      className="inline-flex items-center gap-1 text-[#0E2234] group-hover:text-[#F8C311] font-bold transition-colors cursor-pointer"
                    >
                      <span>Explore Pillar</span>
                      <ArrowUpRight className="w-4 h-4 stroke-[2.2]" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
