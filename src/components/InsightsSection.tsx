import React, { useState } from 'react';
import { ArrowUpRight, Clock } from 'lucide-react';
import { ARTICLES_LIST, ArticleItem } from '../data/agencyData';
import { WordRevealHeading } from './WordRevealHeading';
import brandImage from '../assets/images/brandyatra_portfolio_hero_1793613937052.jpg';
import agencyImage from '../assets/images/hero_agency_showcase_1793503093065.jpg';
import startupImage from '../assets/images/startup_brand_hero_1793614570968.jpg';

interface InsightsSectionProps {
  onSelectArticle: (article: ArticleItem) => void;
}

export const InsightsSection: React.FC<InsightsSectionProps> = ({ onSelectArticle }) => {
  const [activeArticleIndex] = useState(0);

  const mainArticle = ARTICLES_LIST[activeArticleIndex];
  const sideArticles = ARTICLES_LIST.filter((_, idx) => idx !== activeArticleIndex);

  return (
    <section id="insights" className="py-16 sm:py-24 lg:py-32 bg-[#F5F6F7] text-[#17212B] border-t border-[#E5E9ED] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-8 mb-12 sm:mb-16 pb-8 border-b border-[#E5E9ED]">
          <div>
            <div className="flex items-center gap-2 text-clamp-label font-['Manrope',sans-serif] tracking-widest text-[#F8C311] uppercase font-semibold mb-3">
              <span>Agency Intelligence</span>
              <span aria-hidden="true">·</span>
              <span>Editorial &amp; Growth Insights</span>
            </div>
            <WordRevealHeading
              as="h2"
              className="font-['Marcellus',serif] text-clamp-heading text-[#0E2234] font-normal tracking-tight leading-tight"
            >
              Strategic Perspectives &amp; <span className="text-[#F8C311]">Analysis.</span>
            </WordRevealHeading>
          </div>
        </div>

        {/* Magazine Editorial Spread Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Main Cover Feature Story (Left 7 Cols) */}
          <div
            role="button"
            tabIndex={0}
            aria-label={`Read main article: ${mainArticle.title}`}
            onClick={() => onSelectArticle(mainArticle)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelectArticle(mainArticle);
              }
            }}
            className="lg:col-span-7 group cursor-pointer"
          >
            <div className="relative aspect-[16/9] overflow-hidden mb-6 border border-[#E5E9ED]">
              <img
                src={
                  mainArticle.id === 'art-1'
                    ? brandImage
                    : mainArticle.id === 'art-2'
                      ? agencyImage
                      : startupImage
                }
                alt="Brand Yatra identity and digital design work"
                width={1000}
                height={562}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E2234]/70 via-transparent to-transparent opacity-60" />
            </div>

            {/* Unboxed Metadata */}
            <div className="flex flex-wrap items-center gap-2 text-clamp-label font-['Inter',sans-serif] text-[#66717D] mb-3">
              <span className="text-[#F8C311] font-bold uppercase tracking-wider bg-[#0E2234] px-2 py-0.5 rounded text-[11px]">
                {mainArticle.category}
              </span>
              <span aria-hidden="true">·</span>
              <span>March 2026</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1 font-mono text-xs">
                <Clock className="w-3 h-3 text-[#66717D]" />
                {mainArticle.readTime}
              </span>
            </div>

            <h3 className="font-['Marcellus',serif] text-clamp-subheading font-bold text-[#0E2234] mb-4 group-hover:text-[#F8C311] transition-colors leading-tight">
              {mainArticle.title}
            </h3>

            <p className="font-['Inter',sans-serif] text-clamp-body-sm text-[#66717D] leading-relaxed mb-6">
              {mainArticle.summary}
            </p>

            <div className="pt-4 border-t border-[#E5E9ED] flex items-center justify-between text-xs font-['Inter',sans-serif] font-bold text-[#0E2234] group-hover:text-[#F8C311] transition-colors">
              <span className="uppercase tracking-wider">Read Full Editorial</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>

          {/* Secondary Editorial Column (Right 5 Cols) */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-6">
            {sideArticles.map((article) => (
              <div
                key={article.id}
                role="button"
                tabIndex={0}
                aria-label={`Read article: ${article.title}`}
                onClick={() => onSelectArticle(article)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectArticle(article);
                  }
                }}
                className="border-t border-[#E5E9ED] hover:border-[#F8C311] py-5 sm:py-6 transition-colors duration-300 group cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-clamp-label font-['Inter',sans-serif] text-[#66717D] mb-2">
                    <span className="text-[#F8C311] font-bold uppercase tracking-wider text-[11px] bg-[#0E2234] px-2 py-0.5 rounded">
                      {article.category}
                    </span>
                    <span className="font-mono text-[11px] text-[#66717D]">
                      {article.readTime}
                    </span>
                  </div>

                  <h4 className="font-['Marcellus',serif] text-base sm:text-lg font-bold text-[#0E2234] mb-2 group-hover:text-[#F8C311] transition-colors leading-snug">
                    {article.title}
                  </h4>

                  <p className="font-['Inter',sans-serif] text-clamp-body-sm text-[#66717D] line-clamp-2 leading-relaxed mb-4">
                    {article.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E5E9ED] flex items-center justify-between text-[11px] font-['Inter',sans-serif] font-bold text-[#66717D] group-hover:text-[#0E2234] transition-colors">
                  <span>Read Article</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
