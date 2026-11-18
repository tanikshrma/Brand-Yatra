import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { AppRoute } from '../../data/services';
import {
  ArticleData,
  calculateReadingTimeMinutes,
  getArticleHref,
} from '../../data/articles';
import { ResilientImage } from '../ui/ResilientImage';
import {
  useGSAPReveal,
  useParallax,
  useTextReveal,
} from '../animations/gsapHooks';

interface FeaturedArticleProps {
  article: ArticleData;
  onNavigate: (path: AppRoute, hash?: string) => void;
}

export function FeaturedArticle({ article, onNavigate }: FeaturedArticleProps) {
  const sectionHeadingRef = useRef<HTMLHeadingElement | null>(null);
  const imageWrapRef = useRef<HTMLDivElement | null>(null);
  const imageParallaxRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useTextReveal(sectionHeadingRef, { stagger: 0.08, duration: 0.82 });
  useGSAPReveal(imageWrapRef, { clipReveal: true, start: 'top 84%' });
  useParallax(imageParallaxRef, { yPercent: -5 });
  useGSAPReveal(contentRef, { y: 20, duration: 0.8, delay: 0.1 });

  const href = getArticleHref(article.slug);
  const readingMinutes = calculateReadingTimeMinutes(article);

  return (
    <section
      id="featured-insight"
      data-cursor-theme="light"
      className="bg-[#F6F5F2] text-[#0D0D0D] pt-20 sm:pt-24 lg:pt-32 pb-16 sm:pb-20 lg:pb-28 scroll-mt-20"
    >
      <div className="by-container">
        <div className="mb-12 lg:mb-16">
          <span className="eyebrow-label text-[#0D0D0D]/60 block mb-5">
            EDITOR&apos;S PICK
          </span>

          <h2 ref={sectionHeadingRef} className="heading-section text-[#0D0D0D]">
            <span className="block overflow-hidden py-[0.03em] -my-[0.02em]">
              <span data-reveal-line className="block">
                A closer look at
              </span>
            </span>
            <span className="block overflow-hidden py-[0.03em] -my-[0.02em]">
              <span data-reveal-line className="block text-[#0D0D0D]/75">
                what matters.
              </span>
            </span>
          </h2>
        </div>

        {/* Two-Column Editorial Featured Story */}
        <article className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left: Large Authentic Editorial Photograph */}
          <div className="lg:col-span-7">
            <a
              href={href}
              data-cursor="view"
              onClick={(e) => {
                e.preventDefault();
                onNavigate(href);
              }}
              aria-label={`Read featured article: ${article.title}`}
              className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0D0D0D]"
            >
              <div
                ref={imageWrapRef}
                className="relative aspect-[16/10.5] w-full overflow-hidden bg-[#E5E3DD]"
              >
                <div
                  ref={imageParallaxRef}
                  className="absolute -inset-y-7 inset-x-0 will-change-transform"
                >
                  <ResilientImage
                    src={article.featuredImage}
                    alt={article.imageAlt}
                    fallbackLabel={article.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                  />
                </div>
              </div>
            </a>
          </div>

          {/* Right: Unboxed Metadata, Large Article Title, Excerpt & Read Article Link */}
          <div ref={contentRef} className="lg:col-span-5">
            <div className="flex flex-wrap items-center gap-2.5 eyebrow-label text-[#0D0D0D]/60">
              <span className="text-[#0D0D0D] font-semibold">
                {article.category.toUpperCase()}
              </span>
              {article.publishedAt && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>{article.publishedAt}</span>
                </>
              )}
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">{readingMinutes} MIN READ</span>
            </div>

            <h3 className="font-heading text-[36px] sm:text-[46px] lg:text-[52px] leading-[0.98] tracking-[0.016em] text-[#0D0D0D] mt-5">
              <a
                href={href}
                data-cursor="link"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(href);
                }}
                className="hover:text-[#0D0D0D]/80 transition-colors focus-visible:outline-2 focus-visible:outline-[#0D0D0D]"
              >
                {article.title}
              </a>
            </h3>

            <p className="text-[16px] sm:text-[16.5px] leading-[1.65] text-[#0D0D0D]/75 mt-5 max-w-[460px]">
              {article.excerpt}
            </p>

            <div className="mt-8">
              <a
                href={href}
                data-cursor="link"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(href);
                }}
                className="group inline-flex items-center gap-2 text-[14.5px] font-semibold text-[#0D0D0D] border-b border-[#0D0D0D] pb-1.5 hover:opacity-75 transition-opacity whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0D0D0D]"
              >
                <span>Read Article</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
