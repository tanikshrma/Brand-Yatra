import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { FEATURED_WORK } from '../../data/site';
import { AppRoute } from '../../data/services';
import { BrandButton } from '../ui/BrandButton';
import { ResilientImage } from '../ui/ResilientImage';
import { useTextReveal, useStaggerReveal } from '../animations/gsapHooks';

interface FeaturedWorkProps {
  onNavigate: (path: AppRoute, hash?: string) => void;
}

export function FeaturedWork({ onNavigate }: FeaturedWorkProps) {
  const headerRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  useTextReveal(headerRef, { stagger: 0.08, duration: 0.8 });
  useStaggerReveal(gridRef, { y: 28, stagger: 0.12, duration: 0.85, start: 'top 84%' });

  const [featuredProject, ...secondaryProjects] = FEATURED_WORK;

  return (
    <section
      id="work"
      data-cursor-theme="dark"
      className="bg-[#0D0D0D] text-white by-section-spacing border-t border-white/[0.08]"
    >
      <div className="by-container">
        {/* 12-Column Editorial Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 lg:items-end mb-16 lg:mb-24">
          <div ref={headerRef} className="lg:col-span-8">
            <span className="eyebrow-label text-[#A8A8A8] block mb-5">
              SELECTED WORK / PORTFOLIO
            </span>

            <h2 className="heading-section text-white">
              <span className="block overflow-hidden py-[0.04em] -my-[0.02em]">
                <span data-reveal-line className="block">
                  Ideas made visible.
                </span>
              </span>
              <span className="block overflow-hidden py-[0.04em] -my-[0.02em]">
                <span data-reveal-line className="block text-[#A8A8A8]">
                  Creativity made <span className="text-[#F8C311]">impactful.</span>
                </span>
              </span>
            </h2>
          </div>

          <div className="lg:col-span-4 flex lg:justify-end">
            <BrandButton variant="gold" size="md" onClick={() => onNavigate('/work')}>
              View All Projects
            </BrandButton>
          </div>
        </div>

        {/* Asymmetric Editorial Portfolio Layout: 1 Large 2-Col Feature + 2 Smaller Projects */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-10 gap-y-14 lg:gap-y-16"
        >
          {/* Featured Flagship Project Spanning Two Columns */}
          {featuredProject && (
            <article data-stagger-item className="md:col-span-2">
              <a
                href={`/work/${featuredProject.id}`}
                data-cursor="view"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(`/work/${featuredProject.id}`);
                }}
                aria-label={`${featuredProject.title} — ${featuredProject.categories}`}
                className="group relative block pb-6 border-b border-white/[0.1] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F8C311]"
              >
                <div className="relative aspect-[16/9] lg:aspect-[16/8.2] overflow-hidden bg-[#191919]">
                  <ResilientImage
                    src={featuredProject.image}
                    alt={featuredProject.imageAlt}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 pt-6">
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-5">
                    <span className="text-xs font-semibold tracking-[0.14em] text-[#F8C311] tabular-nums">
                      {featuredProject.number} /
                    </span>
                    <h3 className="font-heading text-[32px] sm:text-[40px] leading-none text-white group-hover:text-[#F8C311] transition-colors tracking-[0.02em]">
                      {featuredProject.title}
                    </h3>
                    <span className="text-[15px] text-[#A8A8A8]">
                      {featuredProject.categories}
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1.5 text-[14px] font-medium text-white/75 group-hover:text-[#F8C311] transition-colors">
                    <span>View Case Study</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>

                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-[-1px] left-0 h-[1.5px] w-full bg-[#F8C311] origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100"
                />
              </a>
            </article>
          )}

          {/* Two Secondary Editorial Projects */}
          {secondaryProjects.map((project, index) => (
            <article
              key={project.id}
              data-stagger-item
              className={index === 1 ? 'md:mt-10' : ''}
            >
              <a
                href={`/work/${project.id}`}
                data-cursor="view"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(`/work/${project.id}`);
                }}
                aria-label={`${project.title} — ${project.categories}`}
                className="group relative block pb-6 border-b border-white/[0.1] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F8C311]"
              >
                <div className="relative aspect-[16/10.5] overflow-hidden bg-[#191919]">
                  <ResilientImage
                    src={project.image}
                    alt={project.imageAlt}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                  />
                </div>

                <div className="flex items-start justify-between gap-4 pt-5">
                  <div>
                    <span className="text-xs font-semibold tracking-[0.14em] text-[#F8C311] tabular-nums block mb-2">
                      {project.number} /
                    </span>
                    <h3 className="font-heading text-[28px] sm:text-[34px] leading-none text-white group-hover:text-[#F8C311] transition-colors tracking-[0.02em]">
                      {project.title}
                    </h3>
                    <p className="text-[15px] text-[#A8A8A8] mt-1.5">
                      {project.categories}
                    </p>
                  </div>

                  <ArrowUpRight className="w-5 h-5 text-white/50 group-hover:text-[#F8C311] transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0 mt-1" />
                </div>

                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-[-1px] left-0 h-[1.5px] w-full bg-[#F8C311] origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100"
                />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
