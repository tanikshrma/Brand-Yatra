import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { INSIGHTS_ARTICLES } from '../../data/site';
import { AppRoute } from '../../data/services';
import { BrandButton } from '../ui/BrandButton';
import { ResilientImage } from '../ui/ResilientImage';
import {
  useGSAPReveal,
  useStaggerReveal,
  useTextReveal,
} from '../animations/gsapHooks';

interface InsightsProps {
  onNavigate: (path: AppRoute, hash?: string) => void;
}

export function Insights({ onNavigate }: InsightsProps) {
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  useTextReveal(headingRef, { stagger: 0.08, duration: 0.8 });
  useGSAPReveal(ctaRef, { y: 16, duration: 0.75, delay: 0.1 });
  useStaggerReveal(gridRef, { y: 24, stagger: 0.1, duration: 0.8 });

  return (
    <section
      id="insights"
      data-cursor-theme="light"
      className="bg-[#F6F5F2] text-[#0D0D0D] by-section-spacing"
    >
      <div className="by-container">
        {/* 12-Column Editorial Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-14 lg:mb-20">
          <div className="lg:col-span-8">
            <span className="eyebrow-label text-[#0D0D0D]/60 block mb-5">
              IDEAS &amp; INSIGHTS / EDITORIAL
            </span>
            <h2 ref={headingRef} className="heading-section text-[#0D0D0D]">
              <span className="block overflow-hidden py-[0.03em] -my-[0.02em]">
                <span data-reveal-line className="block">
                  Fresh perspectives.
                </span>
              </span>
              <span className="block overflow-hidden py-[0.03em] -my-[0.02em]">
                <span data-reveal-line className="block text-[#0D0D0D]/75">
                  Smarter digital thinking.
                </span>
              </span>
            </h2>
          </div>

          <div
            ref={ctaRef}
            className="lg:col-span-4 flex lg:justify-end"
          >
            <BrandButton
              variant="gold"
              size="md"
              onClick={() => onNavigate('/insights')}
            >
              Explore All Insights
            </BrandButton>
          </div>
        </div>

        {/* Three Clean Unboxed Editorial Article Cards Linking Directly to /insights/[slug] */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10"
        >
          {INSIGHTS_ARTICLES.map((article) => {
            const href = `/insights/${article.slug}`;
            return (
              <article
                key={article.id}
                data-stagger-item
                className="flex flex-col border-t border-[#0D0D0D]/15 pt-6"
              >
                <a
                  href={href}
                  data-cursor="link"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(href);
                  }}
                  aria-label={`Read article: ${article.title}`}
                  className="group flex flex-col flex-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0D0D0D]"
                >
                  <div className="flex items-center justify-between gap-2 mb-4 eyebrow-label text-[#0D0D0D]/55">
                    <div className="flex items-center gap-2.5">
                      <span>{article.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{article.readTime}</span>
                    </div>
                    <span className="tabular-nums text-[#0D0D0D]/40">{article.number}</span>
                  </div>

                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#E5E3DD]">
                    <ResilientImage
                      src={article.image}
                      alt={article.imageAlt}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                    />
                  </div>

                  <div className="pt-6 flex-1 flex flex-col">
                    <h3 className="font-heading text-[26px] lg:text-[30px] tracking-[0.018em] leading-[1.06] text-[#0D0D0D] group-hover:translate-x-1 transition-transform duration-300">
                      {article.title}
                    </h3>

                    <p className="text-[15.5px] leading-[1.62] text-[#0D0D0D]/70 mt-3 flex-1">
                      {article.excerpt}
                    </p>

                    <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0D0D0D]">
                      <span>Read Article</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
