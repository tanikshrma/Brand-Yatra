import { ArrowUpRight } from 'lucide-react';
import { AppRoute } from '../../data/services';
import {
  ArticleData,
  calculateReadingTimeMinutes,
  getArticleHref,
} from '../../data/articles';
import { ResilientImage } from '../ui/ResilientImage';

interface ArticleCardProps {
  article: ArticleData;
  onNavigate: (path: AppRoute, hash?: string) => void;
}

export function ArticleCard({ article, onNavigate }: ArticleCardProps) {
  const href = getArticleHref(article.slug);
  const readingMinutes = calculateReadingTimeMinutes(article);

  return (
    <article
      data-insight-card
      className="group flex flex-col border-t border-[#0D0D0D]/15 pt-6"
    >
      <a
        href={href}
        data-cursor="link"
        onClick={(e) => {
          e.preventDefault();
          onNavigate(href);
        }}
        aria-label={`Read article: ${article.title}`}
        className="flex-1 flex flex-col focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0D0D0D]"
      >
        {/* Clean Unboxed Metadata Row */}
        <div className="flex flex-wrap items-center gap-2 mb-4 eyebrow-label text-[#0D0D0D]/55">
          <span className="text-[#0D0D0D]/85 font-semibold">
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

        {/* Large Editorial Thumbnail With Subtle Hover Zoom */}
        <div className="relative aspect-[16/10.5] w-full overflow-hidden bg-[#E5E3DD]">
          <ResilientImage
            src={article.featuredImage}
            alt={article.imageAlt}
            fallbackLabel={article.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
          />
        </div>

        {/* Title, Short Excerpt & Minimal Arrow Link */}
        <div className="pt-6 flex-1 flex flex-col">
          <h3 className="font-heading text-[28px] sm:text-[31px] leading-[1.04] tracking-[0.018em] text-[#0D0D0D] transition-transform duration-300 group-hover:translate-x-1">
            {article.title}
          </h3>

          <p className="text-[15.5px] leading-[1.62] text-[#0D0D0D]/70 mt-3 flex-1">
            {article.excerpt}
          </p>

          <div className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#0D0D0D]">
            <span>Read Article</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </a>
    </article>
  );
}
