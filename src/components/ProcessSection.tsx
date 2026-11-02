import React from 'react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { PROCESS_STEPS } from '../data/agencyData';
import { BtnShape } from './BtnShape';
import { WordRevealHeading } from './WordRevealHeading';

interface ProcessSectionProps {
  onOpenConsultation: () => void;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ onOpenConsultation }) => {
  return (
    <section id="process" className="py-16 sm:py-24 lg:py-32 bg-[#FFFFFF] text-[#17212B] relative overflow-hidden border-t border-[#E5E9ED]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-8 mb-12 sm:mb-16 pb-8 border-b border-[#E5E9ED]">
          <div>
            <div className="flex items-center gap-2 text-clamp-label font-['Manrope',sans-serif] tracking-widest text-[#66717D] uppercase font-bold mb-3">
              <span className="text-[#F8C311] bg-[#0E2234] px-2 py-0.5 rounded font-mono text-xs">03</span>
              <span aria-hidden="true">·</span>
              <span>Methodology &amp; Execution</span>
            </div>
            <WordRevealHeading
              as="h2"
              className="font-['Marcellus',serif] text-clamp-heading text-[#0E2234] font-normal tracking-tight leading-tight"
            >
              Our Proven <span className="text-[#0E2234] underline decoration-[#F8C311] decoration-4 underline-offset-8">Process.</span>
            </WordRevealHeading>
          </div>
          <p className="font-['Inter',sans-serif] text-clamp-body-sm text-[#66717D] max-w-md leading-relaxed">
            A clear, collaborative 4-step framework engineered to establish enduring brand authority and scale predictable acquisition pipeline.
          </p>
        </div>

        {/* Four-stage timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-y border-[#E5E9ED] mb-12 sm:mb-16">
          {PROCESS_STEPS.map((step, idx) => {
            const isHighlight = idx === 1;

            return (
              <div
                key={step.step}
                className={`relative py-7 sm:py-8 lg:py-9 px-5 sm:px-7 lg:px-6 border-b md:border-b-0 md:odd:border-r lg:border-r last:border-0 border-[#E5E9ED] ${
                  isHighlight ? 'bg-[#F5F6F7]' : 'bg-white'
                }`}
              >
                <div className="flex items-center justify-between gap-3 mb-7">
                  <span className={`font-mono text-4xl sm:text-5xl font-medium tracking-tight ${
                    isHighlight ? 'text-[#F8C311]' : 'text-[#66717D]'
                  }`}>
                    {step.step}
                  </span>
                  {idx < PROCESS_STEPS.length - 1 && (
                    <span aria-hidden="true" className="hidden lg:block h-px flex-1 bg-[#E5E9ED]" />
                  )}
                </div>

                <div>
                  <div className="text-clamp-label uppercase font-bold tracking-wider text-[#66717D] mb-2">
                    {step.subtitle}
                  </div>
                  <h3 className="font-['Marcellus',serif] text-xl sm:text-2xl font-bold text-[#0E2234] mb-4 leading-snug">
                    {step.title}
                  </h3>

                  <p className="font-['Inter',sans-serif] text-clamp-body-sm leading-relaxed text-[#66717D] mb-5">
                    {step.description}
                  </p>

                  <div className="pt-4 border-t border-[#E5E9ED] flex items-start gap-2 text-xs font-['Inter',sans-serif] font-semibold text-[#0E2234]">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-[#F8C311]" />
                    <span>{step.keyDeliverables}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Custom Strategy Call Banner */}
        <div className="bg-[#0E2234] text-white p-6 sm:p-7 md:p-9 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <div className="font-['Marcellus',serif] text-clamp-subheading font-bold text-white mb-2">
              Ready to execute a custom channel strategy?
            </div>
            <div className="font-['Inter',sans-serif] text-clamp-body-sm text-[#D1D1D6] max-w-xl">
              We align visual design, search intent, and media budget around your specific growth goals.
            </div>
          </div>
          <button
            onClick={onOpenConsultation}
            aria-label="Book Strategy Consultation"
            className="group relative inline-flex items-center justify-center gap-2 text-[#0E2234] font-['Inter',sans-serif] text-xs font-extrabold uppercase tracking-wider px-7 py-3.5 transition-all duration-300 hover:-translate-y-1 active:translate-y-0 shrink-0 cursor-pointer w-full sm:w-auto"
          >
            <BtnShape fill="#F8C311" />
            <span className="relative z-10">Book Strategy Consultation</span>
            <ArrowUpRight className="relative z-10 w-4 h-4 stroke-[2.8] text-[#0E2234]" />
          </button>
        </div>

      </div>
    </section>
  );
};
