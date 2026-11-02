import React from 'react';
import { ArrowUpRight, Zap, Target, Layers, BarChart3 } from 'lucide-react';
import { BtnShape } from './BtnShape';
import { WordRevealHeading } from './WordRevealHeading';

interface WhyBrandYatraProps {
  onOpenConsultation: () => void;
}

export const WhyBrandYatra: React.FC<WhyBrandYatraProps> = ({ onOpenConsultation }) => {
  const pillars = [
    {
      icon: <Zap className="w-4 h-4 text-[#F8C311]" />,
      title: 'Aesthetic Conviction',
      desc: 'Distinct visual identity and premium editorial design that sets your brand apart from generic digital templates.',
    },
    {
      icon: <Target className="w-4 h-4 text-[#F8C311]" />,
      title: 'Intent-First Acquisition',
      desc: 'Laser-focused Google Ads and SEO funnels capturing buyers at the exact moment of commercial consideration.',
    },
    {
      icon: <Layers className="w-4 h-4 text-[#F8C311]" />,
      title: 'Connected Execution',
      desc: 'Zero siloed handoffs. Brand strategists, media buyers, and UI engineers work in lockstep under one roof.',
    },
    {
      icon: <BarChart3 className="w-4 h-4 text-[#F8C311]" />,
      title: 'Compounding Revenue',
      desc: 'Data pipelines calibrated around true contribution margin, ROAS, and customer lifetime value.',
    },
  ];

  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-[#F5F6F7] text-[#17212B] border-y border-[#E5E9ED] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-6">
            <div className="flex items-center gap-2 text-clamp-label font-['Manrope',sans-serif] tracking-widest text-[#F8C311] uppercase font-semibold mb-3">
              <span>Why Brand Yatra</span>
            </div>

            <WordRevealHeading
              as="h2"
              className="font-['Marcellus',serif] text-clamp-heading text-[#0E2234] font-normal tracking-tight leading-tight mb-6"
            >
              Built Around <span className="text-[#F8C311]">Your Growth.</span>
            </WordRevealHeading>

            <p className="font-['Inter',sans-serif] text-clamp-body text-[#66717D] leading-relaxed mb-8 max-w-lg">
              Creative thinking, clear strategy, and connected execution help every part of your brand work together seamlessly to deliver compounding commercial outcomes.
            </p>

            <div>
              <button
                onClick={onOpenConsultation}
                aria-label="Let's Build Something Better - Open Consultation"
                className="group relative inline-flex items-center justify-center gap-2.5 text-[#0E2234] font-['Inter',sans-serif] text-xs sm:text-sm font-extrabold uppercase tracking-wider px-8 py-4 transition-all duration-300 filter drop-shadow-[0_8px_20px_rgba(248,195,17,0.3)] hover:-translate-y-1 active:translate-y-0 cursor-pointer w-full sm:w-auto"
              >
                <BtnShape fill="#F8C311" />
                <span className="relative z-10">Let's Build Something Better</span>
                <ArrowUpRight className="relative z-10 w-4 h-4 stroke-[2.8] text-[#0E2234]" />
              </button>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-6">
            {pillars.map((item, idx) => (
              <div
                key={idx}
                className="group relative grid grid-cols-[2.5rem_1fr] sm:grid-cols-[3rem_1fr] gap-x-4 sm:gap-x-5 border-t border-[#E5E9ED] py-5 sm:py-6"
              >
                <div className="relative z-10 contents">
                  <div className="w-10 h-10 bg-[#F5F6F7] border border-[#E5E9ED] group-hover:border-[#F8C311] flex items-center justify-center transition-colors">
                    {item.icon}
                  </div>
                  <div>
                    <div className="flex items-baseline gap-3 mb-1">
                      <span className="font-mono text-[11px] text-[#66717D]">0{idx + 1}</span>
                      <h3 className="font-['Marcellus',serif] text-base sm:text-lg font-bold text-[#0E2234] leading-snug">
                        {item.title}
                      </h3>
                    </div>
                    <p className="font-['Inter',sans-serif] text-clamp-body-sm text-[#66717D] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
