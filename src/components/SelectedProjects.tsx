import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_SHOWCASE, PortfolioItem } from '../data/agencyData';
import { WordRevealHeading } from './WordRevealHeading';
import hsbcImage from '../assets/images/hsbc-campaign-preview.png';
import natureImage from '../assets/images/startup_brand_hero_1793614570968.jpg';
import universityImage from '../assets/images/hero_agency_showcase_1793503093065.jpg';

interface SelectedProjectsProps {
  onSelectProject: (project: PortfolioItem) => void;
}

const SUCCESS_STORIES = PORTFOLIO_SHOWCASE.slice(0, 3).map((project, index) => ({
  project,
  image: [hsbcImage, natureImage, universityImage][index],
}));

export const SelectedProjects: React.FC<SelectedProjectsProps> = ({ onSelectProject }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeStory = SUCCESS_STORIES[activeIndex];
  const previousIndex = (activeIndex - 1 + SUCCESS_STORIES.length) % SUCCESS_STORIES.length;
  const nextIndex = (activeIndex + 1) % SUCCESS_STORIES.length;

  const showStory = (index: number) => {
    setActiveIndex((index + SUCCESS_STORIES.length) % SUCCESS_STORIES.length);
  };

  if (!activeStory) return null;

  return (
    <section className="relative overflow-hidden bg-[var(--color-white)] py-16 text-[var(--color-dark-text)] sm:py-20 lg:py-24">
      <div className="site-gutter">
        <div className="mb-9 flex items-center gap-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[var(--color-navy)] font-mono text-xs font-bold text-[var(--color-white)]">
            5
          </div>
          <span className="font-['Marcellus',serif] text-clamp-label font-semibold uppercase tracking-[0.25em] text-[var(--color-navy)]">
            Our Works
          </span>
        </div>

        <div className="mb-10 flex flex-col gap-4 sm:mb-12">
          <WordRevealHeading
            as="h2"
            className="font-['Marcellus',serif] text-clamp-heading font-normal uppercase leading-[1.15] tracking-tight text-[var(--color-navy)]"
          >
            Success Stories
          </WordRevealHeading>
          <p className="max-w-2xl font-['Inter',sans-serif] text-clamp-body-sm leading-relaxed text-[var(--color-muted-slate)]">
            Explore selected work and the measurable outcomes behind each project.
          </p>
        </div>

        <div className="relative flex items-center justify-center gap-4 xl:gap-6">
          <button
            type="button"
            onClick={() => showStory(previousIndex)}
            aria-label={`Show previous success story: ${SUCCESS_STORIES[previousIndex]?.project.client}`}
            className="group hidden h-[250px] w-[84px] shrink-0 overflow-hidden rounded-2xl border-4 border-white bg-[var(--color-soft-grey)] shadow-[0_12px_30px_rgba(14,34,52,0.12)] transition duration-300 hover:-translate-y-1 xl:block"
          >
            <img
              src={SUCCESS_STORIES[previousIndex]?.image}
              alt=""
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </button>

          <article
            key={activeStory.project.id}
            className="grid w-full overflow-hidden rounded-[1.6rem] border border-[var(--color-border)] bg-white p-3 shadow-[0_18px_50px_rgba(14,34,52,0.14)] sm:p-4 lg:grid-cols-[0.92fr_1.08fr] lg:gap-2"
          >
            <div className="flex min-w-0 flex-col px-4 pb-5 pt-4 sm:px-6 sm:pb-6 sm:pt-5 lg:px-5 lg:py-5">
              <div className="mb-5 flex items-center justify-between gap-3">
                <span className="inline-flex max-w-full items-center rounded-md bg-[var(--color-soft-grey)] px-2.5 py-1 font-['Manrope',sans-serif] text-[10px] font-bold uppercase tracking-wider text-[var(--color-navy)]">
                  {activeStory.project.service}
                </span>
                <span className="shrink-0 font-mono text-xs text-[var(--color-muted-slate)]">
                  {String(activeIndex + 1).padStart(2, '0')} / {String(SUCCESS_STORIES.length).padStart(2, '0')}
                </span>
              </div>

              <h3 className="max-w-lg font-['Marcellus',serif] text-2xl font-normal leading-tight tracking-tight text-[var(--color-dark-text)] sm:text-3xl">
                {activeStory.project.headline}
              </h3>
              <p className="mt-4 line-clamp-4 font-['Inter',sans-serif] text-sm leading-relaxed text-[var(--color-muted-slate)] sm:line-clamp-5">
                {activeStory.project.description}
              </p>

              <div className="mt-auto pt-6">
                <div className="mb-5 inline-flex flex-col rounded-lg bg-[var(--color-soft-grey)] px-3 py-2">
                  <span className="font-['Marcellus',serif] text-2xl leading-none text-[var(--color-navy)] sm:text-3xl">
                    {activeStory.project.metrics[0]?.value}
                  </span>
                  <span className="mt-1 font-['Manrope',sans-serif] text-[9px] font-bold uppercase tracking-wider text-[var(--color-muted-slate)]">
                    {activeStory.project.metrics[0]?.label}
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--color-border)] pt-4">
                  <span className="font-['Manrope',sans-serif] text-xs font-bold uppercase tracking-wider text-[var(--color-dark-text)]">
                    {activeStory.project.client}
                  </span>
                  <button
                    type="button"
                    onClick={() => onSelectProject(activeStory.project)}
                    className="group inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)] px-4 py-2.5 font-['Inter',sans-serif] text-[10px] font-extrabold uppercase tracking-wide text-[var(--color-navy)] transition-transform hover:-translate-y-0.5"
                    aria-label={`Open case study: ${activeStory.project.client}`}
                  >
                    View Case Study
                    <ArrowUpRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onSelectProject(activeStory.project)}
              className="group relative min-h-[260px] w-full cursor-pointer overflow-hidden rounded-[1.1rem] bg-[var(--color-soft-grey)] text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 sm:min-h-[330px] lg:min-h-[420px]"
              aria-label={`Open case study: ${activeStory.project.client}`}
            >
              <img
                src={activeStory.image}
                alt={`${activeStory.project.client} project`}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" aria-hidden="true" />
              <span className="absolute bottom-5 left-5 font-['Manrope',sans-serif] text-sm font-bold uppercase tracking-[0.15em] text-white sm:bottom-7 sm:left-7">
                {activeStory.project.client}
              </span>
            </button>
          </article>

          <button
            type="button"
            onClick={() => showStory(nextIndex)}
            aria-label={`Show next success story: ${SUCCESS_STORIES[nextIndex]?.project.client}`}
            className="group hidden h-[250px] w-[84px] shrink-0 overflow-hidden rounded-2xl border-4 border-white bg-[var(--color-soft-grey)] shadow-[0_12px_30px_rgba(14,34,52,0.12)] transition duration-300 hover:-translate-y-1 xl:block"
          >
            <img
              src={SUCCESS_STORIES[nextIndex]?.image}
              alt=""
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </button>
        </div>

        <div className="mt-6 flex items-center justify-center gap-3 xl:hidden">
          <button
            type="button"
            onClick={() => showStory(previousIndex)}
            aria-label="Previous success story"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] bg-white text-[var(--color-navy)] transition-colors hover:bg-[var(--color-primary)]"
          >
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-1.5" aria-label={`Story ${activeIndex + 1} of ${SUCCESS_STORIES.length}`}>
            {SUCCESS_STORIES.map((story, index) => (
              <button
                key={story.project.id}
                type="button"
                onClick={() => showStory(index)}
                aria-label={`Show success story ${index + 1}: ${story.project.client}`}
                aria-current={index === activeIndex ? 'true' : undefined}
                className={`h-2 rounded-full transition-all ${index === activeIndex ? 'w-6 bg-[var(--color-primary)]' : 'w-2 bg-[var(--color-border)]'}`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => showStory(nextIndex)}
            aria-label="Next success story"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] bg-white text-[var(--color-navy)] transition-colors hover:bg-[var(--color-primary)]"
          >
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-9 text-center">
          <button
            onClick={() => onSelectProject(activeStory.project)}
            aria-label="Explore the featured success story"
            className="inline-flex items-center gap-2 font-['Inter',sans-serif] text-xs font-extrabold uppercase tracking-wider text-[var(--color-navy)] underline decoration-[var(--color-primary)] decoration-2 underline-offset-4 transition-colors hover:text-[var(--color-muted-slate)]"
          >
            Explore Featured Case Study
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
