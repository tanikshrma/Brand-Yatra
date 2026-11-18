import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { AppRoute } from '../../data/services';
import { ArticleData } from '../../data/articles';
import { useStaggerReveal } from '../animations/gsapHooks';
import { ArticleCard } from './ArticleCard';

interface RelatedArticlesProps {
  articles: ArticleData[];
  onNavigate: (path: AppRoute, hash?: string) => void;
}

export function RelatedArticles({ articles, onNavigate }: RelatedArticlesProps) {
  const gridRef = useRef<HTMLDivElement | null>(null);
  useStaggerReveal(gridRef, {
    y: 22,
    stagger: 0.08,
    duration: 0.78,
    selector: '[data-insight-card]',
  });

  if (articles.length === 0) return null;

  return (
    <section
      data-cursor-theme="light"
      className="bg-[#F6F5F2] text-[#0D0D0D] pb-20 sm:pb-24 lg:pb-32 border-t border-[#0D0D0D]/12 pt-16 sm:pt-20"
    >
      <div className="by-container">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 lg:mb-16">
          <div>
            <span className="eyebrow-label text-[#0D0D0D]/60 block mb-4">
              CONTINUE READING
            </span>
            <h2 className="heading-section text-[#0D0D0D]">
              Related perspectives.
            </h2>
          </div>

          <a
            href="/insights"
            data-cursor="link"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/insights');
            }}
            className="group inline-flex items-center gap-2 text-[14.5px] font-semibold text-[#0D0D0D] border-b border-[#0D0D0D]/40 hover:border-[#0D0D0D] pb-1 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#0D0D0D]"
          >
            <span>All Journal Articles</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 lg:gap-x-10 gap-y-12"
        >
          {articles.map((article) => (
            <ArticleCard
              key={article.slug}
              article={article}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
