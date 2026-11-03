import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_SHOWCASE, PortfolioItem } from '../data/agencyData';
import { BtnShape } from './BtnShape';
import { WordRevealHeading } from './WordRevealHeading';
import hsbcImage from '../assets/images/hsbc-campaign-preview.png';
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
    <section id="portfolio" className="by-hero-surface relative isolate overflow-hidden py-16 text-[var(--color-white)] sm:py-24 lg:py-28">
      <div className="pointer-events-none absolute -left-32 top-24 h-96 w-96 rounded-full bg-sky-500/10 blur-[110px]" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-40 bottom-10 h-[30rem] w-[30rem] rounded-full bg-blue-500/10 blur-[130px]" aria-hidden="true" />
      <div className="site-gutter relative z-10">
        <div className="mb-10 sm:mb-14">
          <WordRevealHeading
            as="h2"
            className="font-['Marcellus',serif] text-[clamp(2rem,5vw,4.25rem)] font-normal uppercase leading-[1.05] tracking-tight text-[var(--color-white)]"
          >
            Showcasing Our Excellence
          </WordRevealHeading>
        </div>

        <div className="space-y-8 sm:space-y-12">
          {PORTFOLIO_SHOWCASE.map((project) => {
            const image = project.visualType === 'banking'
              ? hsbcImage
              : project.visualType === 'tech'
                ? startupImage
                : agencyImage;
            const serviceTitle = project.service;
            const clientName = project.client;

            return (
              <article
                key={project.id}
                className="relative isolate min-h-[690px] overflow-hidden rounded-[1.75rem] border border-white/15 bg-white/[0.045] px-7 py-9 shadow-[0_24px_70px_rgba(0,0,0,0.22)] backdrop-blur-xl sm:min-h-[590px] sm:px-12 sm:py-12 lg:min-h-[590px] lg:px-16 lg:py-14"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 1000 500"
                  preserveAspectRatio="none"
                  className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
                >
                  <path
                    d="M34 2H966Q998 2 998 34V466Q998 498 966 498H34Q2 498 2 466V34Q2 2 34 2Z"
                    fill="#071C2B"
                    fillOpacity="0.58"
                    stroke="#E5E9ED"
                    strokeOpacity="0.28"
                    strokeWidth="1"
                    strokeDasharray="7 9"
                    strokeLinecap="round"
                  />
                </svg>

                <div className="grid h-full grid-cols-1 items-center gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-12">
                  <div className="flex flex-col items-start">
                    <span className="mb-4 font-['Manrope',sans-serif] text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--color-primary)]">
                      {serviceTitle}
                    </span>
                    <h3 className="font-['Marcellus',serif] text-[clamp(2rem,3.8vw,3.25rem)] font-normal leading-[1.08] tracking-tight text-[var(--color-white)]">
                      {clientName}
                    </h3>
                    <p className="mt-3 max-w-xl font-['Marcellus',serif] text-xl leading-snug text-white/85 sm:text-2xl">
                      {project.headline}
                    </p>
                    <p className="mt-5 max-w-xl font-['Inter',sans-serif] text-sm leading-8 text-white/65 sm:text-base">
                      {project.description}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/15 px-3 py-1 font-['Manrope',sans-serif] text-[9px] font-semibold uppercase tracking-wider text-white/65"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-8">
                      <button
                        onClick={onOpenConsultation}
                        aria-label={`Get a quote for ${project.client}`}
                        className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-4 font-['Inter',sans-serif] text-xs font-extrabold uppercase tracking-wider text-[var(--color-navy)] filter drop-shadow-[0_8px_20px_rgba(248,195,17,0.3)]"
                      >
                        <BtnShape fill="#F8C311" />
                        <span className="relative z-10">Get a Quote</span>
                        <ArrowUpRight className="relative z-10 h-4 w-4 stroke-[2.8] text-[var(--color-navy)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectProject(project)}
                    aria-label={`View case study: ${project.client} ${project.headline}`}
                    className="group/image relative aspect-[16/10] w-full cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-[var(--color-navy)] lg:aspect-[4/3]"
                  >
                    <img
                      src={image}
                      alt={`${project.client} case study`}
                      width={1200}
                      height={900}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover/image:scale-[1.02]"
                    />
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-10 text-center sm:mt-14">
          <button
            onClick={onOpenConsultation}
            aria-label="Explore the full portfolio"
            className="group relative inline-flex items-center justify-center gap-2 px-7 py-3.5 font-['Inter',sans-serif] text-xs font-bold uppercase tracking-wider text-[var(--color-navy)]"
          >
            <BtnShape fill="#F8C311" />
            <span className="relative z-10">Explore Full Portfolio</span>
            <ArrowUpRight aria-hidden="true" className="relative z-10 h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
