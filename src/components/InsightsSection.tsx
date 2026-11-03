import React, { useRef } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Clock } from 'lucide-react';
import { ARTICLES_LIST, ArticleItem } from '../data/agencyData';
import { WordRevealHeading } from './WordRevealHeading';
import brandImage from '../assets/images/brandyatra_portfolio_hero_1793613937052.jpg';
import agencyImage from '../assets/images/hero_agency_showcase_1793503093065.jpg';
import startupImage from '../assets/images/startup_brand_hero_1793614570968.jpg';

interface InsightsSectionProps {
  onSelectArticle: (article: ArticleItem) => void;
}

export const InsightsSection: React.FC<InsightsSectionProps> = ({ onSelectArticle }) => {
  const articlesRef = useRef<HTMLDivElement>(null);
  const getImage = (article: ArticleItem) => (
    article.id === 'art-1' ? brandImage : article.id === 'art-2' ? agencyImage : startupImage
  );
  const scrollArticles = (direction: -1 | 1) => {
    const carousel = articlesRef.current;
    if (carousel) {
      carousel.scrollBy({ left: direction * carousel.clientWidth * 0.85, behavior: 'smooth' });
    }
  };

  return (
    <section id="insights" className="relative overflow-hidden bg-[var(--color-soft-grey)] py-16 text-[var(--color-dark-text)] sm:py-20 lg:py-24">
      <div className="site-gutter">
        <div className="mb-10 flex flex-col gap-5 border-b border-[var(--color-border)] pb-8 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2 font-['Manrope',sans-serif] text-clamp-label font-semibold uppercase tracking-widest text-[var(--color-navy)]">
              <span>Agency Intelligence</span>
              <span aria-hidden="true">·</span>
              <span>Editorial &amp; Growth Insights</span>
            </div>
            <WordRevealHeading
              as="h2"
              className="font-['Marcellus',serif] text-clamp-heading font-normal leading-tight tracking-tight text-[var(--color-dark-text)]"
            >
              Strategic Perspectives &amp; <span className="text-[var(--color-muted-slate)]">Analysis.</span>
            </WordRevealHeading>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => scrollArticles(-1)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-soft-grey)] text-[var(--color-dark-text)] transition-colors hover:bg-[var(--color-primary)] hover:text-[var(--color-navy)]"
              aria-label="Previous insight articles"
            >
              <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            </button>
            <button
              onClick={() => scrollArticles(1)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-soft-grey)] text-[var(--color-dark-text)] transition-colors hover:bg-[var(--color-primary)] hover:text-[var(--color-navy)]"
              aria-label="Next insight articles"
            >
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div ref={articlesRef} className="hide-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3">
          {ARTICLES_LIST.map((article) => (
            <article
              key={article.id}
              role="button"
              tabIndex={0}
              aria-label={`Read article: ${article.title}`}
              onClick={() => onSelectArticle(article)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  onSelectArticle(article);
                }
              }}
              className="group min-w-[85%] snap-start cursor-pointer rounded-xl border border-[var(--color-border)] bg-[var(--color-white)] p-4 transition-colors hover:border-[var(--color-primary)]/60 sm:min-w-[47%] lg:min-w-[31.5%] sm:p-5"
            >
              <div className="relative mb-5 aspect-[16/10] overflow-hidden rounded-lg">
                <img
                  src={getImage(article)}
                  alt={`${article.title} editorial thumbnail`}
                  width={720}
                  height={450}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>

              <div className="mb-3 flex flex-wrap items-center gap-2 font-['Inter',sans-serif] text-[10px] text-[var(--color-muted-slate)]">
                <span className="rounded-full bg-[var(--color-primary)] px-2.5 py-1 font-bold uppercase tracking-wider text-[var(--color-navy)]">
                  {article.category}
                </span>
                <span aria-hidden="true">·</span>
                <span className="font-mono">{article.date}</span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1 font-mono">
                  <Clock aria-hidden="true" className="h-3 w-3" />
                  {article.readTime}
                </span>
              </div>

              <h3 className="font-['Marcellus',serif] text-lg font-bold leading-snug text-[var(--color-dark-text)] transition-colors group-hover:text-[var(--color-navy)]">
                {article.title}
              </h3>
              <p className="mt-3 line-clamp-3 font-['Inter',sans-serif] text-clamp-body-sm leading-relaxed text-[var(--color-muted-slate)]">
                {article.summary}
              </p>

              <div className="mt-5 flex items-center justify-between border-t border-[var(--color-border)] pt-4 font-['Inter',sans-serif] text-xs font-bold uppercase tracking-wider text-[var(--color-muted-slate)] transition-colors group-hover:text-[var(--color-dark-text)]">
                <span>Read Article</span>
                <ArrowUpRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
