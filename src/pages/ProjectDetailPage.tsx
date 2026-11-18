import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { AppRoute } from '../data/services';
import {
  PortfolioProject,
  getNextProject,
  getProjectHref,
} from '../data/projects';
import { BrandButton } from '../components/ui/BrandButton';
import { useGlobalInteractions } from '../components/ui/GlobalInteractions';
import { ResilientImage } from '../components/ui/ResilientImage';
import {
  useGSAPReveal,
  useParallax,
  useStaggerReveal,
  useTextReveal,
} from '../components/animations/gsapHooks';

gsap.registerPlugin(ScrollTrigger);

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

interface ProjectDetailPageProps {
  project: PortfolioProject;
  onNavigate: (path: AppRoute, hash?: string) => void;
  onStartProject: (preselectedService?: string) => void;
}

export function ProjectDetailPage({
  project,
  onNavigate,
  onStartProject,
}: ProjectDetailPageProps) {
  const { isHeroReady } = useGlobalInteractions();
  const detailHeroTlRef = useRef<gsap.core.Timeline | null>(null);

  const heroSectionRef = useRef<HTMLElement | null>(null);
  const heroMetaRef = useRef<HTMLDivElement | null>(null);
  const heroTitleRef = useRef<HTMLHeadingElement | null>(null);
  const heroSummaryRef = useRef<HTMLParagraphElement | null>(null);
  const heroMediaWrapRef = useRef<HTMLDivElement | null>(null);
  const heroMediaParallaxRef = useRef<HTMLDivElement | null>(null);

  const overviewHeadingRef = useRef<HTMLHeadingElement | null>(null);
  const overviewBodyRef = useRef<HTMLDivElement | null>(null);

  const approachHeadingRef = useRef<HTMLHeadingElement | null>(null);
  const approachBodyRef = useRef<HTMLDivElement | null>(null);
  const galleryRef = useRef<HTMLDivElement | null>(null);
  const deliverablesRef = useRef<HTMLDivElement | null>(null);

  const nextSectionRef = useRef<HTMLDivElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);

  const nextProject = getNextProject(project.slug);
  const nextHref = getProjectHref(nextProject.slug);
  const isPublished = project.caseStudyStatus === 'published';

  /* Hero Entrance + Media Clip Reveal */
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

      if (heroMetaRef.current) {
        tl.fromTo(
          heroMetaRef.current,
          { y: 12, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, clearProps: 'transform' },
          0.05
        );
      }

      if (heroTitleRef.current) {
        tl.fromTo(
          heroTitleRef.current,
          { y: 26, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.85, clearProps: 'transform' },
          0.14
        );
      }

      if (heroSummaryRef.current) {
        tl.fromTo(
          heroSummaryRef.current,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.75, clearProps: 'transform' },
          0.28
        );
      }

      if (heroMediaWrapRef.current) {
        tl.fromTo(
          heroMediaWrapRef.current,
          { clipPath: 'inset(8% 0% 8% 0%)', opacity: 0 },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            opacity: 1,
            duration: 0.98,
            clearProps: 'clipPath',
          },
          0.32
        );
      }

      detailHeroTlRef.current = tl;
    }, hero);

    return () => {
      detailHeroTlRef.current = null;
      ctx.revert();
    };
  }, [project.slug]);

  useEffect(() => {
    if (isHeroReady && detailHeroTlRef.current) {
      detailHeroTlRef.current.play(0);
    }
  }, [isHeroReady, project.slug]);

  useParallax(heroMediaParallaxRef, { yPercent: -6 });
  useTextReveal(overviewHeadingRef, { stagger: 0.08, duration: 0.8 });
  useStaggerReveal(overviewBodyRef, { y: 18, stagger: 0.08, duration: 0.78 });
  useTextReveal(approachHeadingRef, { stagger: 0.08, duration: 0.8 });
  useStaggerReveal(approachBodyRef, { y: 18, stagger: 0.08, duration: 0.78 });
  useStaggerReveal(galleryRef, { y: 24, stagger: 0.1, duration: 0.85 });
  useStaggerReveal(deliverablesRef, { y: 18, stagger: 0.07, duration: 0.75 });
  useGSAPReveal(nextSectionRef, { y: 20, duration: 0.8 });
  useGSAPReveal(ctaRef, { y: 22, duration: 0.82, start: 'top 88%' });

  return (
    <div className="bg-[#0D0D0D] text-white">
      {/* ===================================================================
          1–3. PROJECT HERO, CATEGORY, TITLE & HERO VISUAL
         =================================================================== */}
      <section
        ref={heroSectionRef}
        data-cursor-theme="dark"
        className="bg-[#0D0D0D] text-white pt-32 sm:pt-36 lg:pt-44 pb-20 lg:pb-28"
      >
        <div className="by-container">
          <div
            ref={heroMetaRef}
            className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-white/[0.1]"
          >
            <a
              href="/work"
              data-cursor="link"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/work');
              }}
              className="group inline-flex items-center gap-2 eyebrow-label text-[#A8A8A8] hover:text-[#F8C311] transition-colors focus-visible:outline-2 focus-visible:outline-[#F8C311]"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#F8C311] transition-transform duration-200 group-hover:-translate-x-1" />
              <span>BACK TO SELECTED WORK</span>
            </a>

            <div className="flex items-center gap-2.5 eyebrow-label text-[#A8A8A8]">
              <span className="text-[#F8C311] tabular-nums">{project.number}</span>
              <span aria-hidden="true">/</span>
              <span>{project.serviceCategory}</span>
              {project.year && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="tabular-nums">{project.year}</span>
                </>
              )}
            </div>
          </div>

          <div className="mt-10 lg:mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
            <div className="lg:col-span-7">
              <h1
                ref={heroTitleRef}
                className="font-heading text-[54px] sm:text-[76px] lg:text-[98px] leading-[0.91] tracking-[0.014em] uppercase text-white"
              >
                {project.title}
              </h1>
            </div>

            <div className="lg:col-span-5">
              <p
                ref={heroSummaryRef}
                className="text-[16px] sm:text-[17px] leading-[1.64] text-[#A8A8A8] max-w-[460px] lg:ml-auto"
              >
                {project.shortSummary}
              </p>
            </div>
          </div>

          {/* Hero Visual Frame */}
          <div
            ref={heroMediaWrapRef}
            className="mt-12 lg:mt-16 relative aspect-[16/10] lg:aspect-[21/9] w-full overflow-hidden rounded-none bg-[#171717] border border-white/[0.08]"
          >
            {project.coverImage ? (
              <div
                ref={heroMediaParallaxRef}
                className="absolute -inset-y-8 inset-x-0 will-change-transform"
              >
                <ResilientImage
                  src={project.coverImage}
                  alt={project.coverImageAlt}
                  fallbackLabel={project.title}
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-full h-full bg-[#151515] flex flex-col justify-between p-7 sm:p-10 lg:p-14">
                <div className="flex items-center justify-between gap-4 text-[11px] font-medium tracking-[0.14em] uppercase text-white/40">
                  <span>BRAND YATRA PORTFOLIO ARCHIVE · {project.number}</span>
                  <span>APPROVED CLIENT VISUALS PENDING</span>
                </div>

                <div className="my-auto py-8 text-center">
                  <div className="font-heading text-[44px] sm:text-[64px] lg:text-[82px] tracking-[0.06em] leading-none text-white/90 uppercase">
                    {project.title}
                  </div>
                  <p className="mt-3 eyebrow-label text-[#A8A8A8]">
                    {project.serviceCategory}
                  </p>
                </div>

                <div className="pt-5 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#A8A8A8]">
                  <span>Brand Yatra Selected Client Archive</span>
                  <span className="uppercase tracking-[0.12em] text-white/45">
                    Case Study Documentation In Progress
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {isPublished ? (
        <>
          {/* ===============================================================
              4 & 5. PROJECT OVERVIEW + VERIFIED BRIEF (Warm Off-White)
             =============================================================== */}
          <section
            data-cursor-theme="light"
            className="bg-[#F6F5F2] text-[#0D0D0D] by-section-spacing"
          >
            <div className="by-container">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                <div className="lg:col-span-5">
                  <span className="eyebrow-label text-[#0D0D0D]/60 block mb-5">
                    PROJECT OVERVIEW
                  </span>

                  <h2 ref={overviewHeadingRef} className="heading-section text-[#0D0D0D]">
                    <span className="block overflow-hidden py-[0.03em] -my-[0.02em]">
                      <span data-reveal-line className="block">
                        Context &amp;
                      </span>
                    </span>
                    <span className="block overflow-hidden py-[0.03em] -my-[0.02em]">
                      <span data-reveal-line className="block text-[#0D0D0D]/75">
                        strategic brief.
                      </span>
                    </span>
                  </h2>
                </div>

                <div
                  ref={overviewBodyRef}
                  className="lg:col-span-7 space-y-6 text-[16px] sm:text-[16.5px] leading-[1.66] text-[#0D0D0D]/80"
                >
                  {project.overview?.map((paragraph, idx) => (
                    <p key={idx} data-stagger-item>
                      {paragraph}
                    </p>
                  ))}

                  {project.brief && (
                    <div
                      data-stagger-item
                      className="pt-8 mt-8 border-t border-[#0D0D0D]/15"
                    >
                      <span className="eyebrow-label text-[#0D0D0D]/55 block mb-3">
                        THE BRIEF
                      </span>
                      <p className="text-[18px] sm:text-[20px] leading-[1.52] font-medium text-[#0D0D0D]">
                        {project.brief}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* ===============================================================
              6, 7 & 8. CREATIVE APPROACH, APPROVED VISUALS & DELIVERABLES
             =============================================================== */}
          <section
            data-cursor-theme="dark"
            className="bg-[#0D0D0D] text-white by-section-spacing"
          >
            <div className="by-container">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                <div className="lg:col-span-5">
                  <span className="eyebrow-label text-[#A8A8A8] block mb-5">
                    CREATIVE APPROACH
                  </span>

                  <h2 ref={approachHeadingRef} className="heading-section text-white">
                    <span className="block overflow-hidden py-[0.03em] -my-[0.02em]">
                      <span data-reveal-line className="block">
                        From insight
                      </span>
                    </span>
                    <span className="block overflow-hidden py-[0.03em] -my-[0.02em]">
                      <span data-reveal-line className="block text-white/85">
                        to execution.
                      </span>
                    </span>
                  </h2>
                </div>

                <div
                  ref={approachBodyRef}
                  className="lg:col-span-7 space-y-5 text-[16px] sm:text-[16.5px] leading-[1.66] text-[#A8A8A8]"
                >
                  {project.creativeApproach?.map((paragraph, idx) => (
                    <p key={idx} data-stagger-item>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Approved Project Visuals Gallery */}
              {project.gallery && project.gallery.length > 0 && (
                <div
                  ref={galleryRef}
                  className="mt-16 lg:mt-24 grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8"
                >
                  {project.gallery.map((item, idx) => {
                    const isWide = item.layout === 'wide';
                    return (
                      <figure
                        key={idx}
                        data-stagger-item
                        className={
                          isWide ? 'md:col-span-12' : 'md:col-span-6'
                        }
                      >
                        <div
                          className={`relative ${
                            isWide
                              ? 'aspect-[16/9] lg:aspect-[21/9]'
                              : 'aspect-[4/3.2]'
                          } w-full overflow-hidden rounded-none bg-[#171717] border border-white/[0.08]`}
                        >
                          <ResilientImage
                            src={item.src}
                            alt={item.alt}
                            fallbackLabel={project.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <figcaption className="pt-3 text-[13px] text-[#A8A8A8]">
                          {item.caption}
                        </figcaption>
                      </figure>
                    );
                  })}
                </div>
              )}

              {/* Deliverables List */}
              {project.deliverables && project.deliverables.length > 0 && (
                <div className="mt-20 lg:mt-28 pt-14 lg:pt-16 border-t border-white/[0.1] grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
                  <div className="lg:col-span-4">
                    <span className="eyebrow-label text-[#A8A8A8] block mb-4">
                      SCOPE &amp; DELIVERABLES
                    </span>
                    <h3 className="font-heading text-[36px] sm:text-[44px] leading-[0.98] tracking-[0.02em] text-white">
                      WHAT WE CREATED.
                    </h3>
                  </div>

                  <div ref={deliverablesRef} className="lg:col-span-8 border-t border-white/[0.1]">
                    {project.deliverables.map((deliverable, idx) => (
                      <div
                        key={deliverable}
                        data-stagger-item
                        className="py-5 border-b border-white/[0.1] flex items-baseline gap-5"
                      >
                        <span className="text-xs font-semibold tracking-[0.14em] text-[#F8C311] tabular-nums shrink-0">
                          {String(idx + 1).padStart(2, '0')} /
                        </span>
                        <span className="text-[16px] sm:text-[17px] text-white font-medium">
                          {deliverable}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        </>
      ) : (
        /* ===================================================================
           HONEST "CASE STUDY COMING SOON" STATE FOR PENDING CLIENT ARCHIVES
           =================================================================== */
        <section
          data-cursor-theme="light"
          className="bg-[#F6F5F2] text-[#0D0D0D] by-section-spacing"
        >
          <div className="by-container">
            <div className="max-w-[780px]">
              <span className="eyebrow-label text-[#0D0D0D]/60 block mb-5">
                CASE STUDY COMING SOON
              </span>

              <h2 className="heading-section text-[#0D0D0D]">
                Full project documentation is being prepared.
              </h2>

              <p className="text-[16.5px] leading-[1.65] text-[#0D0D0D]/75 mt-6 max-w-[620px]">
                Approved campaign visuals, project brief details and deliverable
                documentation for <strong className="font-semibold text-[#0D0D0D]">{project.title}</strong> ({project.serviceCategory}) are currently being curated for publication. Want to discuss similar work for your brand? Reach out directly to our team.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-6">
                <BrandButton
                  variant="gold"
                  size="md"
                  onClick={() => onStartProject()}
                >
                  Request Credentials
                </BrandButton>

                <a
                  href="/work"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/work');
                  }}
                  className="group inline-flex items-center gap-2 text-[14.5px] font-semibold text-[#0D0D0D] border-b border-[#0D0D0D]/35 hover:border-[#0D0D0D] pb-1 transition-colors"
                >
                  <span>Browse All Selected Work</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ===================================================================
          9. NEXT PROJECT NAVIGATION (#171717)
         =================================================================== */}
      <section
        data-cursor-theme="dark"
        className="bg-[#171717] text-white py-16 sm:py-20 lg:py-24 border-t border-white/[0.08]"
      >
        <div ref={nextSectionRef} className="by-container">
          <a
            href={nextHref}
            data-cursor="link"
            onClick={(e) => {
              e.preventDefault();
              onNavigate(nextHref);
            }}
            className="group flex flex-col sm:flex-row sm:items-end justify-between gap-6 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F8C311]"
          >
            <div>
              <span className="eyebrow-label text-[#A8A8A8] block mb-5">
                NEXT PROJECT · {nextProject.number}
              </span>
              <h2 className="font-heading text-[44px] sm:text-[62px] lg:text-[78px] leading-[0.92] tracking-[0.015em] uppercase text-white transition-transform duration-300 group-hover:translate-x-2">
                {nextProject.title}
              </h2>
              <p className="text-[15px] text-[#A8A8A8] mt-2">
                {nextProject.serviceCategory}
              </p>
            </div>

            <span className="w-12 h-12 sm:w-14 sm:h-14 rounded-none border border-white/20 flex items-center justify-center text-white shrink-0 transition-colors duration-300 group-hover:border-[#F8C311] group-hover:text-[#F8C311]">
              <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:rotate-45" />
            </span>
          </a>
        </div>
      </section>

      {/* ===================================================================
          10. PROJECT INQUIRY CTA (Full-Width Brand Yellow)
         =================================================================== */}
      <section
        data-cursor-theme="yellow"
        className="bg-[#F8C311] text-[#0D0D0D] py-20 sm:py-24 lg:py-32"
      >
        <div ref={ctaRef} className="by-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-end">
            <div className="lg:col-span-7">
              <h2 className="font-heading text-[50px] sm:text-[68px] lg:text-[84px] leading-[0.92] tracking-[0.015em] uppercase text-[#0D0D0D]">
                YOUR PROJECT
                <br />
                COULD BE NEXT.
              </h2>

              <p className="text-[16px] sm:text-[17px] leading-[1.6] text-[#0D0D0D]/85 max-w-[500px] mt-5">
                Have a brand to build, a website to launch or a story to tell? Let&apos;s
                create something meaningful together.
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
                onClick={() => onNavigate('/work')}
                className="group inline-flex items-center gap-2 text-[14.5px] font-semibold text-[#0D0D0D] border-b border-[#0D0D0D]/40 hover:border-[#0D0D0D] pb-1 transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#0D0D0D]"
              >
                <span>All Selected Work</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.3] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
