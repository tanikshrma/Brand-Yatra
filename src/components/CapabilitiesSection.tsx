import React, { useState } from 'react';
import { CAPABILITY_TAGS } from '../data/agencyData';
import { ArrowUpRight } from 'lucide-react';
import { WordRevealHeading } from './WordRevealHeading';
import { BtnShape } from './BtnShape';

interface CapabilitiesSectionProps {
  onOpenConsultation: () => void;
}

export const CapabilitiesSection: React.FC<CapabilitiesSectionProps> = ({ onOpenConsultation }) => {
  const [activeCapability, setActiveCapability] = useState<string>(CAPABILITY_TAGS[0].id);

  return (
    <section id="capabilities" className="py-16 sm:py-24 lg:py-32 bg-[#F5F6F7] text-[#17212B] relative overflow-hidden border-t border-[#E5E9ED]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-8 mb-12 sm:mb-16 pb-8 border-b border-[#E5E9ED]">
          <div>
            <div className="flex items-center gap-2 text-clamp-label font-['Manrope',sans-serif] tracking-widest text-[#F8C311] uppercase font-semibold mb-3">
              <span>Capabilities</span>
              <span aria-hidden="true">·</span>
              <span>Full-Spectrum Brand Growth</span>
            </div>
            <WordRevealHeading
              as="h2"
              className="font-['Marcellus',serif] text-clamp-heading text-[#0E2234] font-normal tracking-tight leading-tight"
            >
              Get Found. Get Chosen. <span className="text-[#F8C311]">Grow Faster.</span>
            </WordRevealHeading>
          </div>
          <p className="font-['Inter',sans-serif] text-clamp-body-sm text-[#66717D] max-w-md leading-relaxed">
            We unite visual identity, search intent dominance, and performance acquisition into one high-converting commercial engine.
          </p>
        </div>

        {/* Editorial Index Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16">
          {CAPABILITY_TAGS.map((item, index) => {
            const isSelected = activeCapability === item.id;
            const itemNumber = (index + 1).toString().padStart(2, '0');

            return (
              <div
                key={item.id}
                role="button"
                tabIndex={0}
                aria-pressed={isSelected}
                aria-label={`Capability ${item.name}: ${item.desc}`}
                onClick={() => setActiveCapability(item.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveCapability(item.id);
                  }
                }}
                className={`group cursor-pointer p-5 sm:p-7 border transition-colors duration-300 flex flex-col justify-between min-h-[220px] ${
                  isSelected
                    ? 'bg-[#0E2234] border-[#0E2234] text-white'
                    : 'bg-white border-[#E5E9ED] hover:border-[#F8C311]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4 sm:mb-5">
                    <span className={`font-mono text-xs font-bold tracking-wider ${
                      isSelected ? 'text-[#F8C311]' : 'text-[#66717D]'
                    }`}>
                      {itemNumber}
                    </span>
                    <ArrowUpRight className={`w-4 h-4 transition-transform duration-300 ${
                      isSelected ? 'text-[#F8C311]' : 'text-[#66717D] group-hover:text-[#0E2234] group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
                    }`} />
                  </div>

                  <h3 className={`font-['Marcellus',serif] text-base sm:text-lg font-bold mb-2 transition-colors leading-snug ${
                    isSelected ? 'text-white' : 'text-[#0E2234] group-hover:text-[#66717D]'
                  }`}>
                    {item.name}
                  </h3>

                  <p className={`font-['Inter',sans-serif] text-clamp-body-sm leading-relaxed ${
                    isSelected ? 'text-[#D1D1D6]' : 'text-[#66717D]'
                  }`}>
                    {item.desc}
                  </p>
                </div>

                <div className={`mt-5 sm:mt-6 pt-4 border-t flex items-center gap-2 text-[11px] font-['Inter',sans-serif] ${
                  isSelected ? 'border-white/15 text-[#D1D1D6]' : 'border-[#E5E9ED] text-[#66717D]'
                }`}>
                  <span className="w-1.5 h-1.5 bg-[#F8C311]" />
                  <span>Strategic Agency Core</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Editorial Action Bar */}
        <div className="bg-[#0E2234] border border-[#0E2234] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl text-white">
          <div>
            <div className="font-['Marcellus',serif] text-clamp-subheading font-bold text-white mb-1">
              Need an integrated channel audit for your business?
            </div>
            <div className="font-['Inter',sans-serif] text-clamp-body-sm text-[#D1D1D6]">
              Our strategists analyze your search positioning, visual branding, and funnel unit economics.
            </div>
          </div>
          <button
            onClick={onOpenConsultation}
            aria-label="Request Growth Audit - Open Consultation"
            className="group relative inline-flex items-center justify-center gap-2 text-[#0E2234] font-['Inter',sans-serif] text-xs font-extrabold uppercase tracking-wider px-7 py-3.5 transition-all duration-300 hover:-translate-y-1 active:translate-y-0 shrink-0 cursor-pointer w-full sm:w-auto"
          >
            <BtnShape fill="#F8C311" />
            <span className="relative z-10">Request Growth Audit</span>
            <ArrowUpRight className="relative z-10 w-4 h-4 stroke-[2.8] text-[#0E2234]" />
          </button>
        </div>

      </div>
    </section>
  );
};
