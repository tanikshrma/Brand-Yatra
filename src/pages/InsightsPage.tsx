import { useMemo, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { AppRoute } from '../data/services';
import {
  ARTICLES_PER_PAGE,
  ArticleFilterCategory,
  getFeaturedArticle,
  getPublishedArticles,
} from '../data/articles';
import { BrandButton } from '../components/ui/BrandButton';
import { useSmoothScroll } from '../components/animations/SmoothScrollProvider';
import { useGSAPReveal, useTextReveal } from '../components/animations/gsapHooks';
import { InsightsHero } from '../components/insights/InsightsHero';
import { FeaturedArticle } from '../components/insights/FeaturedArticle';
import { ArticleFilters } from '../components/insights/ArticleFilters';
import { ArticleGrid } from '../components/insights/ArticleGrid';
import { ArticlePagination } from '../components/insights/ArticlePagination';

interface InsightsPageProps {
  onNavigate: (path: AppRoute, hash?: string) => void;
  onStartProject: (preselectedService?: string) => void;
}

export function InsightsPage({ onNavigate, onStartProject }: InsightsPageProps) {
  const [activeCategory, setActiveCategory] = useState<ArticleFilterCategory>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const { scrollTo } = useSmoothScroll();
  const journalHeadingRef = useRef<HTMLHeadingElement | null>(null);
  const closingCtaRef = useRef<HTMLDivElement | null>(null);

  useTextReveal(journalHeadingRef, { stagger: 0.08, duration: 0.82 });
  useGSAPReveal(closingCtaRef, { y: 22, duration: 0.85, start: 'top 88%' });

  const publishedArticles = useMemo(() => getPublishedArticles(), []);
  const featuredArticle = useMemo(() => getFeaturedArticle(), []);

  /* Dynamically filter published articles by category + search query (title, category, summary) */
  const filteredArticles = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return publishedArticles.filter((article) => {
      const matchesCategory =
        activeCategory === 'ALL' ||
        article.category.toUpperCase() === activeCategory;

      if (!matchesCategory) return false;

      if (!normalizedQuery) return true;

      const haystack = `${article.title} ${article.category} ${article.excerpt}`.toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [publishedArticles, activeCategory, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);

  const paginatedArticles = useMemo(() => {
    const start = (safePage - 1) * ARTICLES_PER_PAGE;
    return filteredArticles.slice(start, start + ARTICLES_PER_PAGE);
  }, [filteredArticles, safePage]);

  const handleSelectCategory = (category: ArticleFilterCategory) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setActiveCategory('ALL');
    setSearchQuery('');
    setCurrentPage(1);
  };

  const handlePageChange = (nextPage: number) => {
    if (nextPage < 1 || nextPage > totalPages) return;
    setCurrentPage(nextPage);
    scrollTo('#all-insights');
  };

  const transitionKey = `${activeCategory}|${searchQuery.trim().toLowerCase()}|${safePage}`;

  return (
    <div className="bg-[#0D0D0D] text-white">
      {/* ===================================================================
          SECTION 01 | INSIGHTS HERO
         =================================================================== */}
      <InsightsHero />

      {/* ===================================================================
          SECTION 02 | FEATURED ARTICLE (Warm Off-White Editor's Pick)
         =================================================================== */}
      {featuredArticle && (
        <FeaturedArticle article={featuredArticle} onNavigate={onNavigate} />
      )}

      {/* ===================================================================
          SECTION 03 & 05 | ALL INSIGHTS + DYNAMIC FILTERS, SEARCH & PAGINATION
         =================================================================== */}
      <section
        id="all-insights"
        data-cursor-theme="light"
        className="bg-[#F6F5F2] text-[#0D0D0D] pt-16 sm:pt-20 lg:pt-28 pb-24 lg:pb-36 border-t border-[#0D0D0D]/12 scroll-mt-20"
      >
        <div className="by-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12 lg:mb-16">
            <div className="lg:col-span-8">
              <span className="eyebrow-label text-[#0D0D0D]/60 block mb-5">
                EXPLORE THE JOURNAL
              </span>

              <h2 ref={journalHeadingRef} className="heading-section text-[#0D0D0D]">
                <span className="block overflow-hidden py-[0.03em] -my-[0.02em]">
                  <span data-reveal-line className="block">
                    Perspectives that
                  </span>
                </span>
                <span className="block overflow-hidden py-[0.03em] -my-[0.02em]">
                  <span data-reveal-line className="block text-[#0D0D0D]/75">
                    move ideas forward.
                  </span>
                </span>
              </h2>
            </div>

            <div className="lg:col-span-4 lg:text-right">
              <span className="eyebrow-label text-[#0D0D0D]/50 tabular-nums">
                {String(filteredArticles.length).padStart(2, '0')}{' '}
                {filteredArticles.length === 1 ? 'ARTICLE' : 'ARTICLES'}
              </span>
            </div>
          </div>

          <ArticleFilters
            activeCategory={activeCategory}
            searchQuery={searchQuery}
            onSelectCategory={handleSelectCategory}
            onSearchChange={handleSearchChange}
          />

          <ArticleGrid
            articles={paginatedArticles}
            transitionKey={transitionKey}
            onNavigate={onNavigate}
            onResetFilters={handleResetFilters}
          />

          <ArticlePagination
            currentPage={safePage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </section>

      {/* ===================================================================
          SECTION 06 | CLOSING CTA (Matches Home Page Brand Yellow CTA)
         =================================================================== */}
      <section
        data-cursor-theme="yellow"
        className="bg-[#F8C311] text-[#0D0D0D] py-20 sm:py-24 lg:py-32"
      >
        <div ref={closingCtaRef} className="by-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-end">
            <div className="lg:col-span-7">
              <h2 className="font-heading text-[50px] sm:text-[68px] lg:text-[84px] leading-[0.92] tracking-[0.015em] uppercase text-[#0D0D0D]">
                GOOD IDEAS
                <br />
                DESERVE TO TRAVEL.
              </h2>

              <p className="text-[16px] sm:text-[17px] leading-[1.6] text-[#0D0D0D]/85 max-w-[520px] mt-5">
                Explore fresh thinking, creative perspectives and practical insights from
                Brand Yatra—or partner with us to bring your next big idea to life.
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col xl:flex-row sm:items-center lg:items-start xl:items-center lg:justify-end gap-6">
              <BrandButton
                variant="dark"
                size="lg"
                onClick={() => onStartProject()}
              >
                Start Your Project
              </BrandButton>

              <button
                type="button"
                onClick={() => onNavigate('/', '#services')}
                className="group inline-flex items-center gap-2 text-[14.5px] font-semibold text-[#0D0D0D] border-b border-[#0D0D0D]/40 hover:border-[#0D0D0D] pb-1 transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#0D0D0D]"
              >
                <span>Explore Our Services</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.3] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
