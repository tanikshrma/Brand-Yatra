import { useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { AppRoute } from '../data/services';
import {
  ArticleData,
  calculateReadingTimeMinutes,
  getArticleHref,
  getRelatedArticles,
} from '../data/articles';
import { BrandButton } from '../components/ui/BrandButton';
import { useGlobalInteractions } from '../components/ui/GlobalInteractions';
import { ResilientImage } from '../components/ui/ResilientImage';
import { useGSAPReveal } from '../components/animations/gsapHooks';
import { ArticleContent } from '../components/insights/ArticleContent';
import { RelatedArticles } from '../components/insights/RelatedArticles';

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

interface ArticleDetailPageProps {
  article: ArticleData;
  onNavigate: (path: AppRoute, hash?: string) => void;
  onStartProject: (preselectedService?: string) => void;
}

export function ArticleDetailPage({
  article,
  onNavigate,
  onStartProject,
}: ArticleDetailPageProps) {
  const { isHeroReady } = useGlobalInteractions();
  const heroTlRef = useRef<gsap.core.Timeline | null>(null);

  const heroSectionRef = useRef<HTMLElement | null>(null);
  const breadcrumbRef = useRef<HTMLElement | null>(null);
  const metaRowRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const imageWrapRef = useRef<HTMLDivElement | null>(null);
  const footerCtaRef = useRef<HTMLDivElement | null>(null);

  useGSAPReveal(footerCtaRef, { y: 22, duration: 0.85, start: 'top 88%' });

  const readingMinutes = useMemo(
    () => calculateReadingTimeMinutes(article),
    [article]
  );

  const relatedArticles = useMemo(
    () => getRelatedArticles(article, 3),
    [article]
  );

  /* Calm Editorial Header Entrance */
  useIsomorphicLayoutEffect(() => {
    const hero = heroSectionRef.current;
    if (!hero) return;
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: 'power3.out' },
      });

      if (breadcrumbRef.current) {
        tl.fromTo(
          breadcrumbRef.current,
          { y: 10, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55, clearProps: 'transform' },
          0.04
        );
      }

      if (metaRowRef.current) {
        tl.fromTo(
          metaRowRef.current,
          { y: 12, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, clearProps: 'transform' },
          0.1
        );
      }

      if (titleRef.current) {
        tl.fromTo(
          titleRef.current,
          { y: 22, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.82, clearProps: 'transform' },
          0.16
        );
      }

      if (imageWrapRef.current) {
        tl.fromTo(
          imageWrapRef.current,
          { clipPath: 'inset(7% 0% 7% 0%)', opacity: 0 },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            opacity: 1,
            duration: 0.95,
            clearProps: 'clipPath',
          },
          0.28
        );
      }

      heroTlRef.current = tl;
    }, hero);

    return () => {
      heroTlRef.current = null;
      ctx.revert();
    };
  }, [article.slug]);

  useEffect(() => {
    if (isHeroReady && heroTlRef.current) {
      heroTlRef.current.play(0);
    }
  }, [isHeroReady, article.slug]);

  /* Schema.org Article + BreadcrumbList JSON-LD Structured Data (Published Articles Only) */
  const structuredDataJson = useMemo(() => {
    const origin =
      typeof window !== 'undefined' ? window.location.origin : '';
    const canonicalUrl = `${origin}${getArticleHref(article.slug)}`;
    const imageUrl = article.featuredImage.startsWith('http')
      ? article.featuredImage
      : `${origin}${article.featuredImage}`;

    const articleSchema: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: article.title,
      description: article.seoDescription,
      image: [imageUrl],
      articleSection: article.category,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': canonicalUrl,
      },
      publisher: {
        '@type': 'Organization',
        name: 'Brand Yatra',
      },
      author: article.author
        ? {
            '@type': 'Person',
            name: article.author.name,
            ...(article.author.role ? { jobTitle: article.author.role } : {}),
          }
        : {
            '@type': 'Organization',
            name: 'Brand Yatra',
          },
    };

    if (article.publishedAt) {
      articleSchema.datePublished = article.publishedAt;
    }
    if (article.updatedAt) {
      articleSchema.dateModified = article.updatedAt;
    }

    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: `${origin}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Insights',
          item: `${origin}/insights`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: article.title,
          item: canonicalUrl,
        },
      ],
    };

    return JSON.stringify([articleSchema, breadcrumbSchema]);
  }, [article]);

  return (
    <article className="bg-[#0D0D0D] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: structuredDataJson }}
      />

      {/* ===================================================================
          ARTICLE EDITORIAL HEADER & FEATURED PHOTOGRAPH
         =================================================================== */}
      <header
        ref={heroSectionRef}
        data-cursor-theme="dark"
        className="bg-[#0D0D0D] text-white pt-32 sm:pt-36 lg:pt-44 pb-14 sm:pb-18 lg:pb-24"
      >
        <div className="by-container">
          {/* Breadcrumb + Back to Insights Link */}
          <nav
            ref={breadcrumbRef}
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-white/[0.1]"
          >
            <a
              href="/insights"
              data-cursor="link"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/insights');
              }}
              className="group inline-flex items-center gap-2 eyebrow-label text-[#A8A8A8] hover:text-[#F8C311] transition-colors focus-visible:outline-2 focus-visible:outline-[#F8C311]"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#F8C311] transition-transform duration-200 group-hover:-translate-x-1" />
              <span>BACK TO INSIGHTS</span>
            </a>

            <ol className="flex flex-wrap items-center gap-2 text-[11px] tracking-[0.12em] uppercase text-[#A8A8A8]">
              <li>
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Home
                </a>
              </li>
              <li aria-hidden="true" className="text-white/30">
                /
              </li>
              <li>
                <a
                  href="/insights"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/insights');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Insights
                </a>
              </li>
              <li aria-hidden="true" className="text-white/30">
                /
              </li>
              <li className="text-[#F8C311]">{article.category}</li>
            </ol>
          </nav>

          {/* Category, Verified Date (if supplied), Calculated Reading Time & Author (if supplied) */}
          <div
            ref={metaRowRef}
            className="mt-10 lg:mt-14 flex flex-wrap items-center gap-x-3 gap-y-2 eyebrow-label text-[#A8A8A8]"
          >
            <span className="text-[#F8C311] font-semibold">
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
            {article.author && (
              <>
                <span aria-hidden="true">·</span>
                <span>
                  BY {article.author.name}
                  {article.author.role ? `, ${article.author.role}` : ''}
                </span>
              </>
            )}
          </div>

          {/* Large Editorial Title */}
          <h1
            ref={titleRef}
            className="font-heading text-[46px] sm:text-[64px] lg:text-[84px] leading-[0.94] tracking-[0.014em] uppercase text-white max-w-[1040px] mt-5"
          >
            {article.title}
          </h1>

          {/* Large Featured Editorial Image */}
          <div
            ref={imageWrapRef}
            className="mt-12 lg:mt-16 relative aspect-[16/9] lg:aspect-[21/9] w-full overflow-hidden bg-[#171717]"
          >
            <ResilientImage
              src={article.featuredImage}
              alt={article.imageAlt}
              fallbackLabel={article.title}
              loading="eager"
              decoding="async"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </header>

      {/* ===================================================================
          READABLE ARTICLE BODY, TOC, INTERNAL LINKS & SHARE
         =================================================================== */}
      <ArticleContent article={article} onNavigate={onNavigate} />

      {/* ===================================================================
          RELATED PUBLISHED ARTICLES
         =================================================================== */}
      <RelatedArticles articles={relatedArticles} onNavigate={onNavigate} />

      {/* ===================================================================
          ARTICLE CLOSING CTA
         =================================================================== */}
      <section
        data-cursor-theme="yellow"
        className="bg-[#F8C311] text-[#0D0D0D] py-20 sm:py-24 lg:py-32"
      >
        <div ref={footerCtaRef} className="by-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-end">
            <div className="lg:col-span-7">
              <h2 className="font-heading text-[48px] sm:text-[66px] lg:text-[82px] leading-[0.92] tracking-[0.015em] uppercase text-[#0D0D0D]">
                READY TO TURN INSIGHT
                <br />
                INTO ACTION?
              </h2>

              <p className="text-[16px] sm:text-[17px] leading-[1.6] text-[#0D0D0D]/85 max-w-[510px] mt-5">
                Partner with Brand Yatra across branding, websites, content and digital
                marketing built for meaningful business growth.
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col xl:flex-row sm:items-center lg:items-start xl:items-center lg:justify-end gap-6">
              <BrandButton
                variant="dark"
                size="lg"
                onClick={() => onStartProject()}
              >
                Start a Project
              </BrandButton>

              <button
                type="button"
                onClick={() => onNavigate('/insights')}
                className="group inline-flex items-center gap-2 text-[14.5px] font-semibold text-[#0D0D0D] border-b border-[#0D0D0D]/40 hover:border-[#0D0D0D] pb-1 transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#0D0D0D]"
              >
                <span>Back to All Insights</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.3] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
