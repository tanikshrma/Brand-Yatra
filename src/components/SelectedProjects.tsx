import React from 'react';
import { ArrowUpRight, Globe, TrendingUp, Zap } from 'lucide-react';
import { BtnShape } from './BtnShape';
import { WordRevealHeading } from './WordRevealHeading';

interface SelectedProjectsProps {
  onOpenConsultation: () => void;
}

export const SelectedProjects: React.FC<SelectedProjectsProps> = ({ onOpenConsultation }) => {
  const successItems = [
    {
      id: 'brand-web',
      tag: 'BRAND & WEB',
      icon: <Globe className="w-8 h-8 text-[#F8C311] stroke-[1.8]" />,
      title: 'Digital Ecosystem & Brand Architecture',
      description: 'High-conversion digital flagship architecture and cohesive visual identity system delivering measurable pipeline growth.',
      stat: '240% Conversion Lift',
    },
    {
      id: 'organic-paid',
      tag: 'ORGANIC & PAID',
      icon: <TrendingUp className="w-8 h-8 text-[#F8C311] stroke-[1.8]" />,
      title: 'Search Domination & Paid Acquisition',
      description: 'Integrated omnichannel search engine optimization and targeted meta acquisition scaling organic visibility and qualified leads.',
      stat: '340+ Admissions',
    },
    {
      id: 'performance-ppc',
      tag: 'PERFORMANCE PPC',
      icon: <Zap className="w-8 h-8 text-[#F8C311] stroke-[1.8]" />,
      title: 'High-Intent Customer Performance Media',
      description: 'Laser-targeted search PPC and retargeting workflows acquiring high-LTV customers while slashing CPA by over 42%.',
      stat: '7.8x Audited ROAS',
    },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-28 bg-[#FFFFFF] text-[#17212B] relative border-t border-[#E5E9ED]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Number Badge & Eyebrow */}
        <div className="flex items-center gap-3 mb-4 sm:mb-6">
          <div className="w-7 h-7 rounded-full bg-[#0E2234] text-[#FFFFFF] text-xs font-bold flex items-center justify-center font-mono">
            5
          </div>
          <span className="text-clamp-label font-['Marcellus',serif] uppercase tracking-[0.25em] text-[#0E2234] font-semibold">
            OUR WORKS
          </span>
        </div>

        {/* Section Heading with Marcellus */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <WordRevealHeading
            as="h2"
            className="font-['Marcellus',serif] text-clamp-heading text-[#0E2234] tracking-tight uppercase leading-[1.15] mb-4"
          >
            SUCCESS STORIES
          </WordRevealHeading>
          <p className="font-['Plus_Jakarta_Sans',sans-serif] text-clamp-body-sm text-[#66717D] leading-relaxed">
            Proven commercial milestones achieved through disciplined strategy, technical SEO,
            and high-converting creative execution.
          </p>
        </div>

        {/* Three editorial project summaries */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-y border-[#E5E9ED] mb-12 sm:mb-14">
          {successItems.map((item, index) => (
            <div
              key={item.id}
              className={`group relative p-5 sm:p-7 lg:p-8 transition-colors duration-300 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#E5E9ED] last:border-0 ${
                index === 1 ? 'bg-[#F5F6F7]' : 'bg-white'
              }`}
            >
              <div>
                {/* Related Icon Above Tag */}
                <div className="flex items-center justify-between mb-5">
                  <span className="font-mono text-sm text-[#66717D]">0{index + 1}</span>
                  {item.icon}
                </div>

                {/* Service Tag */}
                <div className="mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#0E2234] font-['Plus_Jakarta_Sans',sans-serif] bg-[#F8C311] px-3 py-1">
                    {item.tag}
                  </span>
                </div>

                {/* Service Headline */}
                <h3 className="font-['Marcellus',serif] text-lg sm:text-xl md:text-2xl text-[#0E2234] mb-3 group-hover:text-[#F8C311] transition-colors leading-snug font-semibold">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="font-['Plus_Jakarta_Sans',sans-serif] text-clamp-body-sm text-[#66717D] leading-relaxed mb-6 font-normal">
                  {item.description}
                </p>
              </div>

              <div>
                {/* Stat Badge */}
                <div className="mb-6">
                  <span className="text-xs bg-[#0E2234] text-[#FFFFFF] font-bold uppercase tracking-wider px-3.5 py-1.5 font-['Plus_Jakarta_Sans',sans-serif] inline-block">
                    {item.stat}
                  </span>
                </div>

                {/* Bottom Action Arrow */}
                <div className="pt-4 border-t border-[#E5E9ED] flex items-center justify-between">
                  <span className="font-['Plus_Jakarta_Sans',sans-serif] text-[11px] font-semibold uppercase tracking-wider text-[#66717D] group-hover:text-[#0E2234] transition-colors">
                    Case Review
                  </span>
                  <button
                    onClick={onOpenConsultation}
                    className="w-10 h-10 rounded-full border border-[#E5E9ED] group-hover:bg-[#F8C311] group-hover:border-[#F8C311] group-hover:text-[#0E2234] text-[#0E2234] flex items-center justify-center transition-all duration-200 cursor-pointer bg-white"
                    aria-label={`View details and case review for ${item.title}`}
                  >
                    <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Center CTA Button using BtnShape */}
        <div className="text-center">
          <button
            onClick={onOpenConsultation}
            aria-label="Get a Strategy Call with Brand Yatra"
            className="group relative inline-flex items-center justify-center gap-2.5 text-[#0E2234] font-['Plus_Jakarta_Sans',sans-serif] text-xs font-bold uppercase tracking-wider px-8 py-4 transition-all duration-200 filter drop-shadow-[0_8px_20px_rgba(248,195,17,0.25)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] cursor-pointer w-full sm:w-auto"
          >
            <BtnShape fill="#F8C311" />
            <span className="relative z-10">GET A STRATEGY CALL</span>
            <ArrowUpRight className="relative z-10 w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </section>
  );
};
