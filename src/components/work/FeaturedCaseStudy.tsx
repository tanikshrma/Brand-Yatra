import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { AppRoute } from '../../data/services';
import { PortfolioProject, getProjectHref } from '../../data/projects';
import { ResilientImage } from '../ui/ResilientImage';
import {
  useGSAPReveal,
  useParallax,
  useTextReveal,
} from '../animations/gsapHooks';

interface FeaturedCaseStudyProps {
  project: PortfolioProject;
  onNavigate: (path: AppRoute, hash?: string) => void;
}

export function FeaturedCaseStudy({
  project,
  onNavigate,
}: FeaturedCaseStudyProps) {
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const copyWrapRef = useRef<HTMLDivElement | null>(null);
  const imageWrapRef = useRef<HTMLDivElement | null>(null);
  const imageParallaxRef = useRef<HTMLDivElement | null>(null);

  useTextReveal(headingRef, { stagger: 0.09, duration: 0.84 });
  useGSAPReveal(copyWrapRef, { y: 20, duration: 0.8, delay: 0.1 });
  useGSAPReveal(imageWrapRef, { clipReveal: true, start: 'top 84%' });
  useParallax(imageParallaxRef, { yPercent: -6 });

  const href = getProjectHref(project.slug);

  return (
    <section
      data-cursor-theme="dark"
      className="bg-[#171717] text-white by-section-spacing border-y border-white/[0.07]"
    >
      <div className="by-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Editorial Narrative Column */}
          <div className="lg:col-span-5">
            <span className="eyebrow-label text-[#A8A8A8] block mb-5">
              FEATURED CASE STUDY
            </span>

            <h2 ref={headingRef} className="heading-section text-white">
              <span className="block overflow-hidden py-[0.03em] -my-[0.02em]">
                <span data-reveal-line className="block">
                  CREATIVE THINKING.
                </span>
              </span>
              <span className="block overflow-hidden py-[0.03em] -my-[0.02em]">
                <span data-reveal-line className="block text-white/85">
                  PURPOSEFUL EXECUTION.
                </span>
              </span>
            </h2>

            <div ref={copyWrapRef} className="mt-8 pt-7 border-t border-white/[0.1]">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="font-heading text-[32px] sm:text-[38px] leading-none tracking-[0.02em] text-white">
                  {project.title}
                </h3>
                <span aria-hidden="true" className="text-white/25">
                  ·
                </span>
                <span className="text-[14px] text-[#A8A8A8]">
                  {project.serviceCategory}
                </span>
              </div>

              <p className="text-[16px] leading-[1.64] text-[#A8A8A8] mt-4 max-w-[470px]">
                Discover how strategy, design and digital thinking come together to shape
                meaningful brand experiences. {project.shortSummary}
              </p>

              <div className="mt-8">
                <a
                  href={href}
                  data-cursor="link"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(href);
                  }}
                  className="group inline-flex items-center gap-2 text-[14.5px] font-semibold text-white border-b border-[#F8C311] pb-1.5 hover:text-[#F8C311] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F8C311]"
                >
                  <span>View Case Study</span>
                  <ArrowUpRight className="w-4 h-4 text-[#F8C311] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Large Cinematic Project Image */}
          <div className="lg:col-span-7">
            <a
              href={href}
              data-cursor="view"
              onClick={(e) => {
                e.preventDefault();
                onNavigate(href);
              }}
              aria-label={`View ${project.title} case study`}
              className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F8C311]"
            >
              <div
                ref={imageWrapRef}
                className="relative aspect-[16/10] w-full overflow-hidden rounded-none bg-[#0D0D0D] border border-white/[0.08]"
              >
                <div
                  ref={imageParallaxRef}
                  className="absolute -inset-y-8 inset-x-0 will-change-transform"
                >
                  <ResilientImage
                    src={project.coverImage}
                    alt={project.coverImageAlt}
                    fallbackLabel={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                </div>

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-black/22"
                />
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
