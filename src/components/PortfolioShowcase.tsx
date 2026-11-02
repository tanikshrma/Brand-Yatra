import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_SHOWCASE, PortfolioItem } from '../data/agencyData';
import { BtnShape } from './BtnShape';
import { WordRevealHeading } from './WordRevealHeading';
import portfolioImage from '../assets/images/brandyatra_portfolio_hero_1793613937052.jpg';
import agencyImage from '../assets/images/hero_agency_showcase_1793503093065.jpg';
import startupImage from '../assets/images/startup_brand_hero_1793614570968.jpg';

interface PortfolioShowcaseProps {
  onSelectProject: (project: PortfolioItem) => void;
  onOpenConsultation: () => void;
}

export const PortfolioShowcase: React.FC<PortfolioShowcaseProps> = ({
  onSelectProject,
  onOpenConsultation,
}) => {
  return (
    <section id="portfolio" className="py-16 sm:py-24 lg:py-32 bg-[#F5F6F7] text-[#17212B] relative border-t border-[#E5E9ED]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-8 mb-12 sm:mb-16 pb-8 border-b border-[#E5E9ED]">
          <div>
            <div className="flex items-center gap-2 text-clamp-label font-['Manrope',sans-serif] tracking-widest text-[#F8C311] uppercase font-semibold mb-3">
              <span>02</span>
              <span aria-hidden="true">·</span>
              <span>Case Studies &amp; Visual Excellence</span>
            </div>
            <WordRevealHeading
              as="h2"
              className="font-['Marcellus',serif] text-clamp-heading text-[#0E2234] font-normal tracking-tight leading-tight"
            >
              Showcasing Our <span className="text-[#F8C311]">Work.</span>
            </WordRevealHeading>
          </div>
          <p className="font-['Inter',sans-serif] text-clamp-body-sm text-[#66717D] max-w-md leading-relaxed">
            High-intent customer acquisition, brand transformations, and digital flagship experiences delivered for market leaders.
          </p>
        </div>

        {/* 3 Distinct Case Study Layouts */}
        <div className="space-y-12 sm:space-y-20 lg:space-y-28">
          {PORTFOLIO_SHOWCASE.map((project, idx) => {
            const isEven = idx % 2 === 1;

            return (
              <div
                key={project.id}
                className="group relative border-t border-[#E5E9ED] pt-7 sm:pt-10 lg:pt-12 transition-colors duration-300"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center ${
                  isEven ? 'lg:flex-row-reverse' : ''
                }`}>
                  
                  {/* Text Details & Quantified Metrics */}
                  <div className={`lg:col-span-5 flex flex-col justify-between ${
                    isEven ? 'lg:order-2' : 'lg:order-1'
                  }`}>
                    <div>
                      {/* Unboxed Metadata */}
                      <div className="flex items-center gap-2 text-clamp-label font-['Inter',sans-serif] text-[#66717D] mb-3">
                        <span className="text-[#F8C311] font-bold uppercase tracking-wider bg-[#0E2234] px-2 py-0.5 rounded">
                          {project.client}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{project.service}</span>
                      </div>

                      <h3 className="font-['Marcellus',serif] text-clamp-subheading text-[#0E2234] font-bold tracking-tight mb-4 group-hover:text-[#F8C311] transition-colors leading-tight">
                        {project.headline}
                      </h3>

                      <p className="font-['Inter',sans-serif] text-clamp-body-sm text-[#66717D] leading-relaxed mb-6 sm:mb-8">
                        {project.description}
                      </p>

                      {/* Quantified Metrics Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 pt-5 sm:pt-6 border-t border-[#E5E9ED] mb-6 sm:mb-8">
                        {project.metrics.map((m, mIdx) => (
                          <div key={mIdx}>
                            <div className="font-['Marcellus',serif] text-lg sm:text-2xl text-[#F8C311] font-bold">
                              {m.value}
                            </div>
                            <div className="text-[11px] text-[#66717D] font-['Inter',sans-serif] font-medium leading-tight mt-0.5">
                              {m.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                      <button
                        onClick={() => onSelectProject(project)}
                        aria-label={`View Case Study: ${project.client} ${project.headline}`}
                        className="group/btn relative inline-flex items-center justify-center gap-2 text-[#0E2234] font-['Inter',sans-serif] text-xs font-extrabold uppercase tracking-wider px-6 py-3.5 transition-all duration-300 hover:-translate-y-1 active:translate-y-0 cursor-pointer w-full sm:w-auto"
                      >
                        <BtnShape fill="#F8C311" />
                        <span className="relative z-10">View Case Study</span>
                        <ArrowUpRight className="relative z-10 w-3.5 h-3.5 stroke-[2.8]" />
                      </button>
                      <button
                        onClick={onOpenConsultation}
                        aria-label={`Request consultation to get similar results to ${project.client}`}
                        className="text-xs font-semibold text-[#66717D] hover:text-[#0E2234] uppercase tracking-wider px-3 py-2 cursor-pointer font-['Inter',sans-serif] transition-colors text-center"
                      >
                        Get Similar Results →
                      </button>
                    </div>
                  </div>

                  {/* Visual Image Presentation Card */}
                  <div className={`lg:col-span-7 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="relative overflow-hidden border border-[#E5E9ED] bg-[#F5F6F7] group/img aspect-[16/10] sm:aspect-[16/9]">
                      <img
                        src={
                          project.visualType === 'banking'
                            ? portfolioImage
                            : project.visualType === 'tech'
                              ? startupImage
                              : agencyImage
                        }
                        alt=""
                        width={1200}
                        height={675}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover/img:scale-[1.02] transition-transform duration-700"
                      />

                      {/* Scrim Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0E2234]/70 via-transparent to-transparent opacity-80" />

                      {/* Quiet Unboxed Badge */}
                      <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5 flex items-center justify-between text-xs text-white">
                        <span className="font-['Manrope',sans-serif] font-bold text-xs sm:text-sm text-white">
                          {project.client}
                        </span>
                        <span className="font-mono text-[10px] sm:text-[11px] text-[#F8C311] bg-[#0E2234]/90 px-2.5 sm:px-3 py-1 rounded border border-white/10 font-bold">
                          Verified Audit Result
                        </span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* View All Projects CTA */}
        <div className="mt-12 sm:mt-16 text-center">
          <button
            onClick={onOpenConsultation}
            aria-label="Explore Full Portfolio and Archives"
            className="group relative inline-flex items-center justify-center gap-2.5 text-[#0E2234] font-['Inter',sans-serif] text-xs sm:text-sm font-extrabold uppercase tracking-wider px-8 py-4 transition-all duration-300 filter drop-shadow-[0_8px_20px_rgba(248,195,17,0.3)] hover:-translate-y-1 active:translate-y-0 cursor-pointer w-full sm:w-auto"
          >
            <BtnShape fill="#F8C311" />
            <span className="relative z-10">Explore Full Portfolio &amp; Archives</span>
            <ArrowUpRight className="relative z-10 w-4 h-4 stroke-[2.8]" />
          </button>
        </div>

      </div>
    </section>
  );
};
