import { useState } from 'react';
import { ArrowLeft, ArrowUpRight, Check, Share2 } from 'lucide-react';
import { AppRoute } from '../../data/services';
import { ArticleData } from '../../data/articles';
import { useSmoothScroll } from '../animations/SmoothScrollProvider';

interface ArticleContentProps {
  article: ArticleData;
  onNavigate: (path: AppRoute, hash?: string) => void;
}

export function ArticleContent({ article, onNavigate }: ArticleContentProps) {
  const [copied, setCopied] = useState(false);
  const { scrollTo } = useSmoothScroll();

  const showToc = article.sections.length >= 3;

  const handleShare = async () => {
    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
    if (!shareUrl) return;

    if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: shareUrl,
        });
        return;
      } catch {
        /* Fall back cleanly to clipboard copy when native share is dismissed or unavailable */
      }
    }

    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2400);
      } catch {
        setCopied(false);
      }
    }
  };

  return (
    <section
      data-cursor-theme="light"
      className="bg-[#F6F5F2] text-[#0D0D0D] py-16 sm:py-20 lg:py-28"
    >
      <div className="by-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Sticky Editorial Table of Contents & Share Rail on Desktop */}
          <aside className="lg:col-span-4 lg:sticky lg:top-28 space-y-8">
            {showToc && (
              <nav
                aria-label="Table of contents"
                className="border-t border-[#0D0D0D]/15 pt-6"
              >
                <span className="eyebrow-label text-[#0D0D0D]/55 block mb-4">
                  IN THIS ARTICLE
                </span>
                <ol className="space-y-3">
                  {article.sections.map((section, idx) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          scrollTo(`#${section.id}`);
                        }}
                        className="group flex items-baseline gap-2.5 text-[14px] leading-[1.45] text-[#0D0D0D]/70 hover:text-[#0D0D0D] transition-colors focus-visible:outline-2 focus-visible:outline-[#0D0D0D]"
                      >
                        <span className="text-[11px] font-semibold tabular-nums text-[#0D0D0D]/40 group-hover:text-[#0D0D0D] shrink-0">
                          {String(idx + 1).padStart(2, '0')}.
                        </span>
                        <span>{section.heading}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}

            <div className="border-t border-[#0D0D0D]/15 pt-6 flex flex-wrap lg:flex-col items-start gap-4">
              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-2 min-h-[42px] px-4 py-2 border border-[#0D0D0D]/20 text-xs font-semibold tracking-[0.12em] uppercase text-[#0D0D0D] cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#0D0D0D]"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Article Link Copied</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share Article</span>
                  </>
                )}
              </button>

              <a
                href="/insights"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/insights');
                }}
                className="group inline-flex items-center gap-2 text-[13.5px] font-medium text-[#0D0D0D]/70 hover:text-[#0D0D0D] transition-colors focus-visible:outline-2 focus-visible:outline-[#0D0D0D]"
              >
                <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-1" />
                <span>Back to Insights</span>
              </a>
            </div>
          </aside>

          {/* Calm, Distraction-Free 760px Max-Width Article Reading Column */}
          <div className="lg:col-span-8">
            <div className="max-w-[760px]">
              {/* Article Introduction */}
              <div className="space-y-6 pb-10 border-b border-[#0D0D0D]/12">
                {article.introduction.map((para, idx) => (
                  <p
                    key={idx}
                    className={
                      idx === 0
                        ? 'text-[19px] sm:text-[21px] leading-[1.68] font-medium text-[#0D0D0D]'
                        : 'text-[17px] sm:text-[18px] leading-[1.76] text-[#0D0D0D]/85'
                    }
                  >
                    {para}
                  </p>
                ))}
              </div>

              {/* Semantic H2 & H3 Article Sections */}
              <div className="divide-y divide-[#0D0D0D]/10">
                {article.sections.map((section) => (
                  <section
                    key={section.id}
                    id={section.id}
                    className="py-10 sm:py-12 scroll-mt-28"
                  >
                    <h2 className="font-heading text-[34px] sm:text-[42px] leading-[1.02] tracking-[0.018em] text-[#0D0D0D]">
                      {section.heading}
                    </h2>

                    <div className="mt-5 space-y-5 text-[17px] sm:text-[18px] leading-[1.76] text-[#0D0D0D]/85">
                      {section.paragraphs.map((paragraph, pIdx) => (
                        <p key={pIdx}>{paragraph}</p>
                      ))}
                    </div>

                    {section.subheading && (
                      <div className="mt-8">
                        <h3 className="font-sans text-[20px] sm:text-[22px] font-semibold leading-[1.35] tracking-[-0.01em] text-[#0D0D0D]">
                          {section.subheading}
                        </h3>
                        {section.subParagraphs && (
                          <div className="mt-3 space-y-4 text-[17px] sm:text-[18px] leading-[1.76] text-[#0D0D0D]/85">
                            {section.subParagraphs.map((subPara, sIdx) => (
                              <p key={sIdx}>{subPara}</p>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {section.keyPoints && section.keyPoints.length > 0 && (
                      <ul className="mt-7 pt-6 border-t border-[#0D0D0D]/10 space-y-3">
                        {section.keyPoints.map((point) => (
                          <li
                            key={point}
                            className="flex items-baseline gap-3 text-[16.5px] sm:text-[17px] leading-[1.68] text-[#0D0D0D]/85"
                          >
                            <span
                              aria-hidden="true"
                              className="w-1.5 h-1.5 bg-[#0D0D0D] shrink-0 translate-y-[-2px]"
                            />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>
                ))}
              </div>

              {/* Contextual Internal Capabilities & Portfolio Links */}
              {article.internalLinks && article.internalLinks.length > 0 && (
                <div className="mt-6 pt-10 border-t border-[#0D0D0D]/15">
                  <span className="eyebrow-label text-[#0D0D0D]/55 block mb-5">
                    EXPLORE RELATED BRAND YATRA CAPABILITIES
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {article.internalLinks.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        data-cursor="link"
                        onClick={(e) => {
                          e.preventDefault();
                          onNavigate(link.href);
                        }}
                        className="group block border-t border-[#0D0D0D]/20 pt-5 focus-visible:outline-2 focus-visible:outline-[#0D0D0D]"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span className="font-heading text-[25px] leading-none tracking-[0.02em] text-[#0D0D0D]">
                            {link.label}
                          </span>
                          <ArrowUpRight className="w-4 h-4 text-[#0D0D0D]/60 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
                        </div>
                        <p className="text-[14.5px] leading-[1.55] text-[#0D0D0D]/70 mt-2">
                          {link.description}
                        </p>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
