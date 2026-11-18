import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AppRoute } from '../../data/services';
import { ArticleData } from '../../data/articles';
import { BrandButton } from '../ui/BrandButton';
import { ArticleCard } from './ArticleCard';

gsap.registerPlugin(ScrollTrigger);

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

interface ArticleGridProps {
  articles: ArticleData[];
  transitionKey: string;
  onNavigate: (path: AppRoute, hash?: string) => void;
  onResetFilters: () => void;
}

export function ArticleGrid({
  articles,
  transitionKey,
  onNavigate,
  onResetFilters,
}: ArticleGridProps) {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const hasMountedRef = useRef(false);

  useIsomorphicLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      if (reduced) return;

      const ctx = gsap.context(() => {
        const cards = grid.querySelectorAll('[data-insight-card]');
        if (cards.length) {
          gsap.fromTo(
            cards,
            { y: 24, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.08,
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
      }, grid);

      return () => ctx.revert();
    }

    if (reduced) {
      ScrollTrigger.refresh();
      return;
    }

    const ctx = gsap.context(() => {
      const cards = grid.querySelectorAll('[data-insight-card]');
      if (cards.length) {
        gsap.fromTo(
          cards,
          { y: 16, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
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
  }, [transitionKey]);

  if (articles.length === 0) {
    return (
      <div className="py-16 border-t border-[#0D0D0D]/12 text-center">
        <p className="font-heading text-[32px] tracking-[0.02em] text-[#0D0D0D]">
          NO MATCHING ARTICLES FOUND.
        </p>
        <p className="text-[15.5px] text-[#0D0D0D]/70 mt-2 max-w-md mx-auto">
          Try adjusting your search keywords or selecting a different editorial category.
        </p>
        <div className="mt-7 flex justify-center">
          <BrandButton
            variant="dark"
            size="sm"
            showArrow={false}
            onClick={onResetFilters}
          >
            Reset Filters
          </BrandButton>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={gridRef}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 lg:gap-x-10 gap-y-12 lg:gap-y-16"
    >
      {articles.map((article) => (
        <ArticleCard
          key={article.slug}
          article={article}
          onNavigate={onNavigate}
        />
      ))}
    </div>
  );
}
