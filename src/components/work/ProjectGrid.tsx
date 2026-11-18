import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AppRoute } from '../../data/services';
import { PortfolioFilterCategory, PortfolioProject } from '../../data/projects';
import { ProjectCard, ProjectCardVariant } from './ProjectCard';

gsap.registerPlugin(ScrollTrigger);

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

interface ProjectGridProps {
  projects: PortfolioProject[];
  activeCategory: PortfolioFilterCategory;
  onNavigate: (path: AppRoute, hash?: string) => void;
}

/**
 * Resolves the asymmetric editorial layout slot for each card in a 5-item repeating cadence:
 * - Row 1: ~65% featured large (`lg:col-span-8`) + ~35% supporting (`lg:col-span-4`)
 * - Row 2: Two balanced project cards (`lg:col-span-6` + `lg:col-span-6`) with distinct image ratios
 * - Row 3: Full-width cinematic showcase (`lg:col-span-12`)
 * Also handles partial trailing rows cleanly when filtering reduces item count.
 */
function resolveLayoutSlot(
  index: number,
  total: number
): { colSpanClass: string; variant: ProjectCardVariant } {
  if (total === 1) {
    return {
      colSpanClass: 'md:col-span-2 lg:col-span-12',
      variant: 'cinematic-wide',
    };
  }

  const slot = index % 5;
  const isLast = index === total - 1;

  if (slot === 0) {
    if (isLast) {
      return {
        colSpanClass: 'md:col-span-2 lg:col-span-12',
        variant: 'cinematic-wide',
      };
    }
    return {
      colSpanClass: 'md:col-span-1 lg:col-span-8',
      variant: 'featured-large',
    };
  }

  if (slot === 1) {
    return {
      colSpanClass: 'md:col-span-1 lg:col-span-4',
      variant: 'supporting-compact',
    };
  }

  if (slot === 2) {
    if (isLast) {
      return {
        colSpanClass: 'md:col-span-2 lg:col-span-12',
        variant: 'cinematic-wide',
      };
    }
    return {
      colSpanClass: 'md:col-span-1 lg:col-span-6',
      variant: 'balanced-landscape',
    };
  }

  if (slot === 3) {
    return {
      colSpanClass: 'md:col-span-1 lg:col-span-6 lg:mt-10',
      variant: 'balanced-editorial',
    };
  }

  return {
    colSpanClass: 'md:col-span-2 lg:col-span-12',
    variant: 'cinematic-wide',
  };
}

export function ProjectGrid({
  projects,
  activeCategory,
  onNavigate,
}: ProjectGridProps) {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const hasInitializedRef = useRef(false);

  /* Initial ScrollTrigger clip-path & staggered card entrance */
  useIsomorphicLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!hasInitializedRef.current) {
      hasInitializedRef.current = true;
      if (reduced) return;

      const ctx = gsap.context(() => {
        const cards = grid.querySelectorAll('[data-work-card]');
        const masks = grid.querySelectorAll('[data-work-image-mask]');

        if (cards.length) {
          gsap.fromTo(
            cards,
            { y: 28, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.82,
              stagger: 0.09,
              ease: 'power3.out',
              clearProps: 'transform',
              scrollTrigger: {
                trigger: grid,
                start: 'top 86%',
                once: true,
              },
            }
          );
        }

        if (masks.length) {
          gsap.fromTo(
            masks,
            { clipPath: 'inset(7% 0% 7% 0%)' },
            {
              clipPath: 'inset(0% 0% 0% 0%)',
              duration: 0.92,
              stagger: 0.09,
              ease: 'power3.out',
              clearProps: 'clipPath',
              scrollTrigger: {
                trigger: grid,
                start: 'top 86%',
                once: true,
              },
            }
          );
        }
      }, grid);

      return () => ctx.revert();
    }

    /* Smooth GSAP filter switch animation without resetting scroll position */
    if (reduced) {
      ScrollTrigger.refresh();
      return;
    }

    const ctx = gsap.context(() => {
      const cards = grid.querySelectorAll('[data-work-card]');
      if (cards.length) {
        gsap.fromTo(
          cards,
          { y: 18, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.62,
            stagger: 0.06,
            ease: 'power3.out',
            clearProps: 'transform',
            onComplete: () => {
              ScrollTrigger.refresh();
            },
          }
        );
      }
    }, grid);

    return () => ctx.revert();
  }, [activeCategory]);

  return (
    <section
      data-cursor-theme="dark"
      aria-label="Selected Brand Yatra Projects"
      className="bg-[#0D0D0D] text-white pb-24 lg:pb-36"
    >
      <div className="by-container">
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-x-6 lg:gap-x-8 gap-y-12 lg:gap-y-16 items-start"
        >
          {projects.map((project, index) => {
            const { colSpanClass, variant } = resolveLayoutSlot(index, projects.length);
            return (
              <div key={project.slug} className={colSpanClass}>
                <ProjectCard
                  project={project}
                  variant={variant}
                  onNavigate={onNavigate}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
