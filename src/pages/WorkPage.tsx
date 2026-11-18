import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { AppRoute, ServiceSlug, getServiceHref } from '../data/services';
import {
  FEATURED_CASE_STUDY_SLUG,
  PORTFOLIO_FILTERS,
  PROJECTS_DATA,
  PortfolioFilterCategory,
  getProjectBySlug,
} from '../data/projects';
import { BrandButton } from '../components/ui/BrandButton';
import { useGlobalInteractions } from '../components/ui/GlobalInteractions';
import { useSmoothScroll } from '../components/animations/SmoothScrollProvider';
import {
  useGSAPReveal,
  useStaggerReveal,
  useTextReveal,
} from '../components/animations/gsapHooks';
import { ProjectFilters } from '../components/work/ProjectFilters';
import { ProjectGrid } from '../components/work/ProjectGrid';
import { FeaturedCaseStudy } from '../components/work/FeaturedCaseStudy';

gsap.registerPlugin(ScrollTrigger);

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

interface WorkPageProps {
  onNavigate: (path: AppRoute, hash?: string) => void;
  onStartProject: (preselectedService?: string) => void;
}

const CREATIVE_EXPERTISE_COLUMNS: {
  number: string;
  title: string;
  description: string;
  slug: ServiceSlug;
}[] = [
  {
    number: '01',
    title: 'Branding',
    description: 'Distinctive identities and brand systems.',
    slug: 'branding',
  },
  {
    number: '02',
    title: 'Web Development',
    description: 'Functional, engaging and responsive digital experiences.',
    slug: 'web-development',
  },
  {
    number: '03',
    title: 'Digital Marketing',
    description: 'Strategic campaigns and audience-focused communication.',
    slug: 'lead-generation',
  },
  {
    number: '04',
    title: 'Creative Studio',
    description: 'Visual storytelling, content and campaign design.',
    slug: 'video-motion',
  },
];

const PROJECT_APPROACH_STATEMENTS = [
  {
    number: '01',
    title: 'Understand the Challenge',
    description: 'We begin by understanding the brand, audience and goals.',
  },
  {
    number: '02',
    title: 'Create With Intention',
    description:
      'We translate insights into focused creative ideas and digital experiences.',
  },
  {
    number: '03',
    title: 'Refine Every Detail',
    description:
      'We improve the execution through collaboration, testing and thoughtful iteration.',
  },
];

export function WorkPage({ onNavigate, onStartProject }: WorkPageProps) {
  const [activeCategory, setActiveCategory] =
    useState<PortfolioFilterCategory>('ALL PROJECTS');

  const { scrollTo } = useSmoothScroll();
  const { isHeroReady } = useGlobalInteractions();
  const heroTlRef = useRef<gsap.core.Timeline | null>(null);

  /* Section 01: Portfolio Hero Refs */
  const heroSectionRef = useRef<HTMLElement | null>(null);
  const heroScrollDriftRef = useRef<HTMLDivElement | null>(null);
  const heroEyebrowRef = useRef<HTMLSpanElement | null>(null);
  const heroHeadlineRef = useRef<HTMLHeadingElement | null>(null);
  const heroRightColRef = useRef<HTMLDivElement | null>(null);
  const heroDividerRef = useRef<HTMLDivElement | null>(null);
  const heroScrollCueRef = useRef<HTMLDivElement | null>(null);

  /* Section 05: Creative Expertise Refs */
  const expertiseHeadingRef = useRef<HTMLHeadingElement | null>(null);
  const expertiseIntroRef = useRef<HTMLParagraphElement | null>(null);
  const expertiseGridRef = useRef<HTMLDivElement | null>(null);

  /* Section 06: Approach Refs */
  const approachHeadingRef = useRef<HTMLHeadingElement | null>(null);
  const approachIntroRef = useRef<HTMLParagraphElement | null>(null);
  const approachListRef = useRef<HTMLDivElement | null>(null);

  /* Section 07: Project CTA Refs */
  const ctaRef = useRef<HTMLDivElement | null>(null);

  /* Compute counts & filtered project array in React state without page reload */
  const projectCounts = useMemo(() => {
    const counts = {} as Record<PortfolioFilterCategory, number>;
    for (const category of PORTFOLIO_FILTERS) {
      counts[category] =
        category === 'ALL PROJECTS'
          ? PROJECTS_DATA.length
          : PROJECTS_DATA.filter((p) => p.filterCategories.includes(category)).length;
    }
    return counts;
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'ALL PROJECTS') return PROJECTS_DATA;
    return PROJECTS_DATA.filter((project) =>
      project.filterCategories.includes(activeCategory)
    );
  }, [activeCategory]);

  const featuredCaseStudy = useMemo(
    () => getProjectBySlug(FEATURED_CASE_STUDY_SLUG) || PROJECTS_DATA[0],
    []
  );

  /* Hero Masked Reveal, Divider Line Expansion & Gentle Scroll-Linked Drift */
  useIsomorphicLayoutEffect(() => {
    const hero = heroSectionRef.current;
    if (!hero) return;
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      const lines = heroHeadlineRef.current?.querySelectorAll('[data-work-hero-line]');
      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: 'power3.out' },
      });

      if (heroEyebrowRef.current) {
        tl.fromTo(
          heroEyebrowRef.current,
          { y: 12, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.65, clearProps: 'transform' },
          0.05
        );
      }

      if (lines && lines.length) {
        tl.fromTo(
          lines,
          { yPercent: 108 },
          {
            yPercent: 0,
            duration: 0.88,
            stagger: 0.08,
            clearProps: 'transform',
          },
          0.14
        );
      }

      if (heroRightColRef.current) {
        tl.fromTo(
          heroRightColRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.78, clearProps: 'transform' },
          0.34
        );
      }

      if (heroDividerRef.current) {
        tl.fromTo(
          heroDividerRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.9, ease: 'power3.out' },
          0.42
        );
      }

      if (heroScrollCueRef.current) {
        tl.fromTo(
          heroScrollCueRef.current,
          { y: 10, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.65, clearProps: 'transform' },
          0.54
        );
      }

      /* Gentle scroll-linked movement on the hero editorial block */
      if (heroScrollDriftRef.current) {
        gsap.to(heroScrollDriftRef.current, {
          yPercent: -4,
          ease: 'none',
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.6,
          },
        });
      }

      heroTlRef.current = tl;
    }, hero);

    return () => {
      heroTlRef.current = null;
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    if (isHeroReady && heroTlRef.current) {
      heroTlRef.current.play(0);
    }
  }, [isHeroReady]);

  /* Sections 05, 06 & 07 Scroll Animations */
  useTextReveal(expertiseHeadingRef, { stagger: 0.08, duration: 0.82 });
  useGSAPReveal(expertiseIntroRef, { y: 18, duration: 0.75, delay: 0.08 });
  useStaggerReveal(expertiseGridRef, { y: 22, stagger: 0.08, duration: 0.78 });

  useTextReveal(approachHeadingRef, { stagger: 0.08, duration: 0.82 });
  useGSAPReveal(approachIntroRef, { y: 18, duration: 0.75, delay: 0.08 });
  useStaggerReveal(approachListRef, { y: 22, stagger: 0.09, duration: 0.8 });

  useGSAPReveal(ctaRef, { y: 24, duration: 0.85, start: 'top 88%' });

  return (
    <div className="bg-[#0D0D0D] text-white">
      {/* ===================================================================
          SECTION 01 | PORTFOLIO HERO (Typography-First Editorial Composition)
         =================================================================== */}
      <section
        ref={heroSectionRef}
        data-cursor-theme="dark"
        className="bg-[#0D0D0D] text-white pt-32 sm:pt-36 lg:pt-44 pb-12 lg:pb-16"
      >
        <div ref={heroScrollDriftRef} className="by-container will-change-transform">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-end">
            {/* Left Column: Eyebrow + Oversized Four-Line Headline */}
            <div className="lg:col-span-7">
              <span
                ref={heroEyebrowRef}
                className="eyebrow-label text-[#A8A8A8] block mb-5"
              >
                SELECTED WORK / BRAND YATRA
              </span>

              <h1
                ref={heroHeadlineRef}
                className="font-heading text-[56px] sm:text-[78px] lg:text-[98px] xl:text-[112px] leading-[0.9] tracking-[0.012em] uppercase text-white"
              >
                <span className="block overflow-hidden py-[0.03em] -my-[0.02em]">
                  <span data-work-hero-line className="block">
                    IDEAS MADE
                  </span>
                </span>
                <span className="block overflow-hidden py-[0.03em] -my-[0.02em]">
                  <span data-work-hero-line className="block text-[#F8C311]">
                    VISIBLE.
                  </span>
                </span>
                <span className="block overflow-hidden py-[0.03em] -my-[0.02em]">
                  <span data-work-hero-line className="block">
                    IMPACT MADE
                  </span>
                </span>
                <span className="block overflow-hidden py-[0.03em] -my-[0.02em]">
                  <span data-work-hero-line className="block">
                    REAL.
                  </span>
                </span>
              </h1>
            </div>

            {/* Right Column: Supporting Description + Explore Projects ↘ Link */}
            <div ref={heroRightColRef} className="lg:col-span-5 lg:pb-2">
              <div className="max-w-[460px] lg:ml-auto">
                <p className="text-[16px] sm:text-[17px] leading-[1.64] text-[#A8A8A8]">
                  Every brand has a story. We turn ambitious ideas into distinctive
                  identities, engaging digital experiences and creative campaigns that make
                  an impact.
                </p>

                <div className="mt-7">
                  <button
                    type="button"
                    data-cursor="link"
                    onClick={() => scrollTo('#portfolio-projects')}
                    className="group inline-flex items-center gap-2 text-[14.5px] font-semibold text-white border-b border-white/30 hover:border-[#F8C311] hover:text-[#F8C311] pb-1 transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F8C311]"
                  >
                    <span>Explore Projects</span>
                    <ArrowDownRight className="w-4 h-4 text-[#F8C311] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Subtle Horizontal Divider Expansion + Minimal Scroll Indicator */}
          <div className="mt-12 lg:mt-16">
            <div
              ref={heroDividerRef}
              aria-hidden="true"
              className="h-[1px] w-full bg-white/[0.12] origin-left"
            />

            <div
              ref={heroScrollCueRef}
              className="pt-6 flex items-center justify-between gap-4"
            >
              <button
                type="button"
                onClick={() => scrollTo('#portfolio-projects')}
                className="group inline-flex items-center gap-2.5 eyebrow-label text-[#A8A8A8] hover:text-white transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#F8C311]"
              >
                <span>SCROLL TO PORTFOLIO</span>
                <ArrowDown className="w-3.5 h-3.5 text-[#F8C311] transition-transform duration-300 group-hover:translate-y-1" />
              </button>

              <span className="hidden sm:inline eyebrow-label text-white/35 tabular-nums">
                {String(PROJECTS_DATA.length).padStart(2, '0')} SELECTED ENGAGEMENTS
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          SECTION 02 | PROJECT FILTERS
         =================================================================== */}
      <ProjectFilters
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        projectCounts={projectCounts}
      />

      {/* ===================================================================
          SECTION 03 | FEATURED PROJECTS (Asymmetric Editorial Grid)
         =================================================================== */}
      <ProjectGrid
        projects={filteredProjects}
        activeCategory={activeCategory}
        onNavigate={onNavigate}
      />

      {/* ===================================================================
          SECTION 04 | FEATURED CASE STUDY (#171717 Editorial Feature)
         =================================================================== */}
      <FeaturedCaseStudy
        project={featuredCaseStudy}
        onNavigate={onNavigate}
      />

      {/* ===================================================================
          SECTION 05 | OUR CREATIVE EXPERTISE (Warm Off-White Contrast)
         =================================================================== */}
      <section
        data-cursor-theme="light"
        className="bg-[#F6F5F2] text-[#0D0D0D] by-section-spacing"
      >
        <div className="by-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-16 lg:mb-24">
            <div className="lg:col-span-7">
              <span className="eyebrow-label text-[#0D0D0D]/60 block mb-5">
                WHAT WE BRING TO EVERY PROJECT
              </span>

              <h2 ref={expertiseHeadingRef} className="heading-section text-[#0D0D0D]">
                <span className="block overflow-hidden py-[0.03em] -my-[0.02em]">
                  <span data-reveal-line className="block">
                    Different disciplines.
                  </span>
                </span>
                <span className="block overflow-hidden py-[0.03em] -my-[0.02em]">
                  <span data-reveal-line className="block text-[#0D0D0D]/75">
                    One creative vision.
                  </span>
                </span>
              </h2>
            </div>

            <div className="lg:col-span-5">
              <p
                ref={expertiseIntroRef}
                className="text-[16px] leading-[1.62] text-[#0D0D0D]/70 max-w-[460px] lg:ml-auto"
              >
                From the first idea to the final execution, our work connects brand
                thinking, digital experiences and creative communication.
              </p>
            </div>
          </div>

          {/* Four Minimal Editorial Columns With Thin Dividers & Minimal Arrows */}
          <div
            ref={expertiseGridRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 lg:gap-x-10 gap-y-12"
          >
            {CREATIVE_EXPERTISE_COLUMNS.map((item) => {
              const href = getServiceHref(item.slug);
              return (
                <a
                  key={item.number}
                  href={href}
                  data-stagger-item
                  data-cursor="link"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(href);
                  }}
                  aria-label={`${item.title} — ${item.description}`}
                  className="group block border-t border-[#0D0D0D]/15 pt-7 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0D0D0D]"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-semibold tracking-[0.14em] text-[#0D0D0D]/50 tabular-nums">
                      {item.number} /
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-[#0D0D0D]/45 transition-all duration-300 group-hover:text-[#0D0D0D] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
                  </div>

                  <h3 className="font-heading text-[30px] sm:text-[34px] leading-[1.02] tracking-[0.02em] text-[#0D0D0D] mt-5 transition-transform duration-300 group-hover:translate-x-1">
                    {item.title}
                  </h3>

                  <p className="text-[15.5px] leading-[1.6] text-[#0D0D0D]/70 mt-3">
                    {item.description}
                  </p>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================================================================
          SECTION 06 | OUR APPROACH TO EVERY PROJECT (Dark Editorial Statements)
         =================================================================== */}
      <section
        data-cursor-theme="dark"
        className="bg-[#0D0D0D] text-white by-section-spacing"
      >
        <div className="by-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-16 lg:mb-24">
            <div className="lg:col-span-7">
              <span className="eyebrow-label text-[#A8A8A8] block mb-5">
                THE THINKING BEHIND THE WORK
              </span>

              <h2 ref={approachHeadingRef} className="heading-section text-white">
                <span className="block overflow-hidden py-[0.03em] -my-[0.02em]">
                  <span data-reveal-line className="block">
                    Not just good-looking.
                  </span>
                </span>
                <span className="block overflow-hidden py-[0.03em] -my-[0.02em]">
                  <span data-reveal-line className="block">
                    Built with <span className="text-[#F8C311]">purpose.</span>
                  </span>
                </span>
              </h2>
            </div>

            <div className="lg:col-span-5">
              <p
                ref={approachIntroRef}
                className="text-[16px] leading-[1.62] text-[#A8A8A8] max-w-[470px] lg:ml-auto"
              >
                Every project begins with understanding the challenge. We combine research,
                strategy, creativity and execution to create work that communicates clearly
                and supports meaningful business objectives.
              </p>
            </div>
          </div>

          {/* Three Large Unboxed Editorial Statements With Horizontal Separators */}
          <div ref={approachListRef} className="border-t border-white/[0.1]">
            {PROJECT_APPROACH_STATEMENTS.map((item) => (
              <div
                key={item.number}
                data-stagger-item
                className="group relative border-b border-white/[0.1] py-9 sm:py-11 lg:py-14 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-baseline"
              >
                <div className="md:col-span-2 flex items-baseline gap-2">
                  <span className="font-heading text-[42px] sm:text-[52px] leading-none tracking-[0.02em] text-white/30 group-hover:text-[#F8C311] transition-colors duration-300 tabular-nums">
                    {item.number}
                  </span>
                  <span className="text-white/25 text-lg font-light" aria-hidden="true">
                    /
                  </span>
                </div>

                <div className="md:col-span-5 transition-transform duration-300 ease-out group-hover:translate-x-2">
                  <h3 className="font-heading text-[32px] sm:text-[38px] leading-[1.02] tracking-[0.02em] text-white">
                    {item.title}
                  </h3>
                </div>

                <div className="md:col-span-5 transition-transform duration-300 ease-out group-hover:translate-x-1">
                  <p className="text-[16px] leading-[1.62] text-[#A8A8A8] max-w-[460px]">
                    {item.description}
                  </p>
                </div>

                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-[-1px] left-0 h-[1.5px] w-full bg-[#F8C311] origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================================
          SECTION 07 | PROJECT CTA (Full-Width Brand Yatra Yellow)
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
