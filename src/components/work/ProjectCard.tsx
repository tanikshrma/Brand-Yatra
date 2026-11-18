import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { AppRoute } from '../../data/services';
import { PortfolioProject, getProjectHref } from '../../data/projects';
import { ResilientImage } from '../ui/ResilientImage';
import { useParallax } from '../animations/gsapHooks';

export type ProjectCardVariant =
  | 'featured-large'
  | 'supporting-compact'
  | 'balanced-landscape'
  | 'balanced-editorial'
  | 'cinematic-wide';

interface ProjectCardProps {
  project: PortfolioProject;
  variant: ProjectCardVariant;
  onNavigate: (path: AppRoute, hash?: string) => void;
}

const ASPECT_BY_VARIANT: Record<ProjectCardVariant, string> = {
  'featured-large': 'aspect-[16/10.5] sm:aspect-[16/10]',
  'supporting-compact': 'aspect-[16/11] lg:aspect-[4/4.65]',
  'balanced-landscape': 'aspect-[16/11]',
  'balanced-editorial': 'aspect-[16/11] lg:aspect-[16/9.6]',
  'cinematic-wide': 'aspect-[16/10] sm:aspect-[16/8.6] lg:aspect-[21/9]',
};

function BrandArchivePlaceholder({ project }: { project: PortfolioProject }) {
  const brandWordmarkClass =
    project.placeholderBrandStyle === 'serif'
      ? 'font-serif tracking-[0.2em] text-[26px] sm:text-[34px] lg:text-[40px] font-medium'
      : project.placeholderBrandStyle === 'tracked'
        ? 'font-heading tracking-[0.26em] text-[34px] sm:text-[44px] lg:text-[52px]'
        : project.placeholderBrandStyle === 'luxury'
          ? 'font-serif tracking-[0.24em] text-[28px] sm:text-[36px] lg:text-[42px]'
          : project.placeholderBrandStyle === 'athletic'
            ? 'font-heading tracking-[0.08em] text-[34px] sm:text-[44px] lg:text-[54px]'
            : 'font-sans font-semibold tracking-tight text-[26px] sm:text-[34px] lg:text-[40px]';

  const primaryWord =
    project.slug === 'brightlight-immigration'
      ? 'BrightLight'
      : project.slug === 'tvisva-jewels'
        ? 'TVISVA'
        : project.slug === 'jubilee-imperia'
          ? 'JUBILEE'
          : project.slug === 'asian-legends-league'
            ? 'ASIAN LEGENDS'
            : project.title;

  return (
    <div
      role="img"
      aria-label={project.coverImageAlt}
      className="w-full h-full bg-[#151515] flex flex-col justify-between p-6 sm:p-8 lg:p-10 select-none"
    >
      <div className="flex items-center justify-between gap-4 text-[10.5px] font-medium tracking-[0.14em] uppercase text-white/40">
        <span>BRAND YATRA ARCHIVE · {project.number}</span>
        <span>ARCHIVE OVERVIEW</span>
      </div>

      <div className="my-auto py-6 text-center">
        <div className={`text-white/90 leading-none ${brandWordmarkClass}`}>
          {primaryWord}
        </div>
        {project.placeholderSublabel && (
          <div className="mt-2.5 text-[10.5px] tracking-[0.3em] uppercase text-[#F8C311]/85 font-medium">
            {project.placeholderSublabel}
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-white/[0.07] flex items-center justify-between gap-4 text-[11.5px] text-[#A8A8A8]">
        <span className="truncate">{project.serviceCategory}</span>
        <span className="text-[10.5px] uppercase tracking-[0.12em] text-white/45 shrink-0">
          Case Study Soon
        </span>
      </div>
    </div>
  );
}

export function ProjectCard({
  project,
  variant,
  onNavigate,
}: ProjectCardProps) {
  const parallaxRef = useRef<HTMLDivElement | null>(null);
  useParallax(parallaxRef, { yPercent: -5 });

  const href = getProjectHref(project.slug);
  const aspectClass = ASPECT_BY_VARIANT[variant];
  const isWide = variant === 'featured-large' || variant === 'cinematic-wide';

  return (
    <article data-work-card className="group">
      <a
        href={href}
        data-cursor="view"
        onClick={(e) => {
          e.preventDefault();
          onNavigate(href);
        }}
        aria-label={`${project.title} — ${project.serviceCategory}`}
        className="block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F8C311]"
      >
        {/* Project Visual Container (Sharp Architectural Frame, Subtle 1.035 Hover Scale & Darkening Scrim) */}
        <div
          data-work-image-mask
          className={`relative ${aspectClass} w-full overflow-hidden rounded-none bg-[#171717] border border-white/[0.08] transition-colors duration-300 group-hover:border-white/[0.18]`}
        >
          {project.coverImage ? (
            <div
              ref={parallaxRef}
              className="absolute -inset-y-6 inset-x-0 will-change-transform"
            >
              <ResilientImage
                src={project.coverImage}
                alt={project.coverImageAlt}
                fallbackLabel={project.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
              />
            </div>
          ) : (
            <div className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-[1.035]">
              <BrandArchivePlaceholder project={project} />
            </div>
          )}

          {/* Subtle Dark Scrim That Deepens Slightly On Hover */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-black/28"
          />

          {/* Subtle Editorial Hover Label ("VIEW PROJECT") */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-4 left-4 sm:bottom-5 sm:left-5 opacity-0 translate-y-1.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
          >
            <span className="text-[10.5px] font-semibold tracking-[0.16em] uppercase text-white/90">
              {project.caseStudyStatus === 'published' ? 'VIEW PROJECT' : 'PROJECT OVERVIEW'}
            </span>
          </div>
        </div>

        {/* Clean Below-Image Editorial Metadata Row */}
        <div className="pt-5 flex items-start justify-between gap-5">
          <div className="min-w-0">
            <h3
              className={`font-heading ${
                isWide
                  ? 'text-[30px] sm:text-[38px] lg:text-[42px]'
                  : 'text-[28px] sm:text-[34px]'
              } leading-[1.02] tracking-[0.02em] text-white transition-transform duration-300 ease-out group-hover:-translate-y-[3px]`}
            >
              {project.title}
            </h3>

            <div className="mt-1.5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[14px] sm:text-[14.5px] text-[#A8A8A8]">
              <span>{project.serviceCategory}</span>
              {project.year && (
                <>
                  <span aria-hidden="true" className="text-white/25">
                    ·
                  </span>
                  <span className="tabular-nums">{project.year}</span>
                </>
              )}
            </div>
          </div>

          {/* Right-Aligned Architectural Arrow Icon Rotating 45° on Hover */}
          <span
            aria-hidden="true"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-none border border-white/15 flex items-center justify-center text-white/80 shrink-0 transition-colors duration-300 group-hover:border-[#F8C311] group-hover:text-[#F8C311]"
          >
            <ArrowUpRight className="w-4 h-4 stroke-[1.9] transition-transform duration-300 ease-out group-hover:rotate-45" />
          </span>
        </div>
      </a>
    </article>
  );
}
