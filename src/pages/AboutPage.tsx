import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { AppRoute, ServiceSlug, getServiceHref } from '../data/services';
import { BrandButton } from '../components/ui/BrandButton';
import { useGlobalInteractions } from '../components/ui/GlobalInteractions';
import { ResilientImage } from '../components/ui/ResilientImage';
import { useSmoothScroll } from '../components/animations/SmoothScrollProvider';
import {
  useGSAPReveal,
  useParallax,
  useStaggerReveal,
  useTextReveal,
} from '../components/animations/gsapHooks';

gsap.registerPlugin(ScrollTrigger);

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

interface AboutPageProps {
  onNavigate: (path: AppRoute, hash?: string) => void;
  onStartProject: (preselectedService?: string) => void;
}

const BELIEF_VALUES = [
  {
    number: '01',
    title: 'Think Strategically',
    description:
      'Every decision begins with understanding your brand, audience and ambitions.',
  },
  {
    number: '02',
    title: 'Create With Purpose',
    description:
      'We bring ideas to life through thoughtful design and meaningful storytelling.',
  },
  {
    number: '03',
    title: 'Build For People',
    description:
      'We create digital experiences that are intuitive, engaging and genuinely useful.',
  },
  {
    number: '04',
    title: 'Grow Together',
    description:
      'We believe in transparent collaboration and long-term relationships.',
  },
];

const ABOUT_EXPERTISE: {
  number: string;
  title: string;
  description: string;
  slug: ServiceSlug;
}[] = [
  {
    number: '01',
    title: 'Branding & Identity',
    description:
      'Distinctive brand strategies and visual identities that make businesses recognizable and memorable.',
    slug: 'branding',
  },
  {
    number: '02',
    title: 'Digital Marketing',
    description:
      'Data-informed campaigns and creative communication that connect brands with the right audiences.',
    slug: 'lead-generation',
  },
  {
    number: '03',
    title: 'Website Development',
    description:
      'Modern, responsive digital experiences built for usability, performance and growth.',
    slug: 'web-development',
  },
  {
    number: '04',
    title: 'Creative Studio',
    description:
      'Visual storytelling, design and content that bring brands closer to their audiences.',
    slug: 'video-motion',
  },
];

const APPROACH_STAGES = [
  {
    number: '01',
    title: 'DISCOVER',
    description:
      'We understand your goals, audience, challenges and opportunities.',
  },
  {
    number: '02',
    title: 'DEFINE',
    description:
      'We build a focused strategy that gives every creative decision direction.',
  },
  {
    number: '03',
    title: 'DESIGN & DEVELOP',
    description:
      'We turn ideas into purposeful brand identities, digital products and campaigns.',
  },
  {
    number: '04',
    title: 'REFINE & GROW',
    description:
      'We measure, learn and continuously improve the experience.',
  },
];

const PEOPLE_WORKSPACE_IMAGE = '/images/about/team-creative-collaboration.jpg';

export function AboutPage({
  onNavigate,
  onStartProject,
}: AboutPageProps) {
  const { scrollTo } = useSmoothScroll();
  const { isHeroReady } = useGlobalInteractions();
  const aboutHeroTlRef = useRef<gsap.core.Timeline | null>(null);

  /* Section 01: Hero Refs */
  const heroSectionRef = useRef<HTMLElement | null>(null);
  const heroEyebrowRef = useRef<HTMLSpanElement | null>(null);
  const heroHeadlineRef = useRef<HTMLHeadingElement | null>(null);
  const heroDescRef = useRef<HTMLDivElement | null>(null);
  const heroImageFrameRef = useRef<HTMLDivElement | null>(null);
  const heroImageParallaxRef = useRef<HTMLDivElement | null>(null);

  /* Section 02: Our Story Refs */
  const storyImageWrapRef = useRef<HTMLDivElement | null>(null);
  const storyImageParallaxRef = useRef<HTMLDivElement | null>(null);
  const storyHeadingRef = useRef<HTMLHeadingElement | null>(null);
  const storyCopyRef = useRef<HTMLDivElement | null>(null);

  /* Section 03: What We Believe Refs */
  const beliefHeadingRef = useRef<HTMLHeadingElement | null>(null);
  const beliefIntroRef = useRef<HTMLParagraphElement | null>(null);
  const beliefListRef = useRef<HTMLDivElement | null>(null);

  /* Section 04: What We Do Refs */
  const expertiseHeadingRef = useRef<HTMLHeadingElement | null>(null);
  const expertiseIntroRef = useRef<HTMLParagraphElement | null>(null);
  const expertiseGridRef = useRef<HTMLDivElement | null>(null);

  /* Section 05: How We Think Refs */
  const approachSectionRef = useRef<HTMLElement | null>(null);
  const approachHeadingRef = useRef<HTMLHeadingElement | null>(null);
  const approachIntroRef = useRef<HTMLParagraphElement | null>(null);
  const desktopTimelineRef = useRef<HTMLDivElement | null>(null);
  const desktopLineRef = useRef<HTMLDivElement | null>(null);
  const mobileTimelineRef = useRef<HTMLDivElement | null>(null);
  const mobileLineRef = useRef<HTMLDivElement | null>(null);

  /* Section 06: Our People Refs */
  const peopleHeadingRef = useRef<HTMLHeadingElement | null>(null);
  const peopleIntroRef = useRef<HTMLParagraphElement | null>(null);
  const peopleImageRef = useRef<HTMLDivElement | null>(null);

  /* Section 07: Our Commitment Refs */
  const commitmentHeadingRef = useRef<HTMLHeadingElement | null>(null);
  const commitmentCopyRef = useRef<HTMLParagraphElement | null>(null);

  /* Section 08: Final CTA Refs */
  const finalCtaRef = useRef<HTMLDivElement | null>(null);

  /* Hero Entrance & Image Clip Reveal + Parallax */
  useIsomorphicLayoutEffect(() => {
    const hero = heroSectionRef.current;
    if (!hero) return;
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      const lines = heroHeadlineRef.current?.querySelectorAll('[data-about-hero-line]');
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
            duration: 0.9,
            stagger: 0.09,
            clearProps: 'transform',
          },
          0.14
        );
      }

      if (heroDescRef.current) {
        tl.fromTo(
          heroDescRef.current,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.78, clearProps: 'transform' },
          0.42
        );
      }

      if (heroImageFrameRef.current) {
        tl.fromTo(
          heroImageFrameRef.current,
          { clipPath: 'inset(10% 0% 10% 0%)', opacity: 0 },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            opacity: 1,
            duration: 1.05,
            clearProps: 'clipPath',
          },
          0.32
        );
      }

      aboutHeroTlRef.current = tl;
    }, hero);

    return () => {
      aboutHeroTlRef.current = null;
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    if (isHeroReady && aboutHeroTlRef.current) {
      aboutHeroTlRef.current.play(0);
    }
  }, [isHeroReady]);

  useParallax(heroImageParallaxRef, { yPercent: -6 });

  /* Section 02 Animations */
  useGSAPReveal(storyImageWrapRef, { clipReveal: true, start: 'top 84%' });
  useParallax(storyImageParallaxRef, { yPercent: -5 });
  useTextReveal(storyHeadingRef, { stagger: 0.08, duration: 0.82 });
  useStaggerReveal(storyCopyRef, { y: 18, stagger: 0.09, duration: 0.78 });

  /* Section 03 Animations */
  useTextReveal(beliefHeadingRef, { stagger: 0.08, duration: 0.82 });
  useGSAPReveal(beliefIntroRef, { y: 18, duration: 0.75, delay: 0.08 });
  useStaggerReveal(beliefListRef, { y: 22, stagger: 0.09, duration: 0.8 });

  /* Section 04 Animations */
  useTextReveal(expertiseHeadingRef, { stagger: 0.08, duration: 0.82 });
  useGSAPReveal(expertiseIntroRef, { y: 18, duration: 0.75, delay: 0.08 });
  useStaggerReveal(expertiseGridRef, { y: 24, stagger: 0.09, duration: 0.8 });

  /* Section 05 Timeline Animations */
  useTextReveal(approachHeadingRef, { stagger: 0.08, duration: 0.82 });
  useGSAPReveal(approachIntroRef, { y: 18, duration: 0.75, delay: 0.08 });

  useIsomorphicLayoutEffect(() => {
    const section = approachSectionRef.current;
    if (!section) return;
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      if (desktopLineRef.current && desktopTimelineRef.current) {
        gsap.fromTo(
          desktopLineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.05,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: desktopTimelineRef.current,
              start: 'top 84%',
              once: true,
            },
          }
        );

        const nums = desktopTimelineRef.current.querySelectorAll('[data-stage-num]');
        const texts = desktopTimelineRef.current.querySelectorAll('[data-stage-body]');

        if (nums.length) {
          gsap.fromTo(
            nums,
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.78,
              stagger: 0.1,
              ease: 'power3.out',
              clearProps: 'transform',
              scrollTrigger: {
                trigger: desktopTimelineRef.current,
                start: 'top 84%',
                once: true,
              },
            }
          );
        }

        if (texts.length) {
          gsap.fromTo(
            texts,
            { y: 18, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              delay: 0.12,
              stagger: 0.1,
              ease: 'power3.out',
              clearProps: 'transform',
              scrollTrigger: {
                trigger: desktopTimelineRef.current,
                start: 'top 84%',
                once: true,
              },
            }
          );
        }
      }

      if (mobileLineRef.current && mobileTimelineRef.current) {
        gsap.fromTo(
          mobileLineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 1.05,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: mobileTimelineRef.current,
              start: 'top 86%',
              once: true,
            },
          }
        );

        const mobileStages = mobileTimelineRef.current.querySelectorAll('[data-mobile-stage]');
        if (mobileStages.length) {
          gsap.fromTo(
            mobileStages,
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.75,
              stagger: 0.09,
              ease: 'power3.out',
              clearProps: 'transform',
              scrollTrigger: {
                trigger: mobileTimelineRef.current,
                start: 'top 86%',
                once: true,
              },
            }
          );
        }
      }
    }, section);

    return () => ctx.revert();
  }, []);

  /* Section 06, 07 & 08 Animations */
  useTextReveal(peopleHeadingRef, { stagger: 0.08, duration: 0.82 });
  useGSAPReveal(peopleIntroRef, { y: 18, duration: 0.75, delay: 0.08 });
  useGSAPReveal(peopleImageRef, { clipReveal: true, start: 'top 84%' });

  useTextReveal(commitmentHeadingRef, { stagger: 0.09, duration: 0.88 });
  useGSAPReveal(commitmentCopyRef, { y: 18, duration: 0.8, delay: 0.12 });

  useGSAPReveal(finalCtaRef, { y: 24, duration: 0.85, start: 'top 88%' });

  return (
    <div className="bg-[#0D0D0D] text-white">
      {/* ===================================================================
          SECTION 01 | ABOUT HERO
         =================================================================== */}
      <section
        ref={heroSectionRef}
        data-cursor-theme="dark"
        className="bg-[#0D0D0D] text-white pt-32 sm:pt-36 lg:pt-44 pb-20 lg:pb-28"
      >
        <div className="by-container">
          <span
            ref={heroEyebrowRef}
            className="eyebrow-label text-[#A8A8A8] block mb-5"
          >
            ABOUT BRAND YATRA
          </span>

          {/* Oversized Left-Aligned Headline */}
          <h1
            ref={heroHeadlineRef}
            className="font-heading text-[52px] sm:text-[74px] lg:text-[98px] xl:text-[110px] leading-[0.91] tracking-[0.012em] uppercase text-white max-w-[1060px]"
          >
            <span className="block overflow-hidden py-[0.03em] -my-[0.02em]">
              <span data-about-hero-line className="block">
                WE DON&apos;T JUST
              </span>
            </span>
            <span className="block overflow-hidden py-[0.03em] -my-[0.02em]">
              <span data-about-hero-line className="block">
                BUILD BRANDS.
              </span>
            </span>
            <span className="block overflow-hidden py-[0.03em] -my-[0.02em]">
              <span data-about-hero-line className="block">
                WE BUILD <span className="text-[#F8C311]">WHAT&apos;S NEXT.</span>
              </span>
            </span>
          </h1>

          {/* Subtle Horizontal Divider + Minimal Scroll Indicator (Left) & Supporting Copy (Lower Right) */}
          <div
            ref={heroDescRef}
            className="mt-12 lg:mt-16 pt-8 lg:pt-10 border-t border-white/[0.1] grid grid-cols-1 lg:grid-cols-12 gap-8 items-end"
          >
            <div className="lg:col-span-5">
              <button
                type="button"
                onClick={() => scrollTo('#about-story')}
                className="group inline-flex items-center gap-2.5 eyebrow-label text-[#A8A8A8] hover:text-white transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#F8C311]"
              >
                <span>SCROLL TO EXPLORE</span>
                <ArrowDown className="w-3.5 h-3.5 text-[#F8C311] transition-transform duration-300 group-hover:translate-y-1" />
              </button>
            </div>

            <div className="lg:col-span-7 lg:pl-12">
              <p className="text-[16px] sm:text-[17.5px] leading-[1.64] text-[#A8A8A8] max-w-[560px] lg:ml-auto">
                Brand Yatra is a creative digital marketing agency where strategy meets
                imagination, technology meets design, and ambitious ideas become meaningful brand
                experiences.
              </p>
            </div>
          </div>

          {/* Wide Authentic Studio Photograph With Cinematic Crop */}
          <div
            ref={heroImageFrameRef}
            className="mt-14 lg:mt-20 relative aspect-[16/9] lg:aspect-[21/9] w-full overflow-hidden bg-[#191919]"
          >
            <div
              ref={heroImageParallaxRef}
              className="absolute -inset-y-8 inset-x-0 will-change-transform"
            >
              <ResilientImage
                src="/images/about/studio-glass-interior.jpg"
                alt="Brand Yatra contemporary creative studio interior with black-framed glass partitions and travertine meeting table"
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          SECTION 02 | OUR STORY (Warm Off-White Editorial Contrast)
         =================================================================== */}
      <section
        id="about-story"
        data-cursor-theme="light"
        className="bg-[#F6F5F2] text-[#0D0D0D] by-section-spacing"
      >
        <div className="by-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            {/* Collaborative Workspace Image Column */}
            <div className="lg:col-span-6">
              <div
                ref={storyImageWrapRef}
                className="relative aspect-[4/4.2] w-full overflow-hidden bg-[#E6E4DE]"
              >
                <div
                  ref={storyImageParallaxRef}
                  className="absolute -inset-y-7 inset-x-0 will-change-transform"
                >
                  <ResilientImage
                    src="/images/about/design-process-flatlay.jpg"
                    alt="Creative director studio desk with layout proportion sketchbook, scale ruler and tactile brand color swatches"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Editorial Narrative Column */}
            <div className="lg:col-span-6">
              <span className="eyebrow-label text-[#0D0D0D]/60 block mb-5">
                OUR STORY
              </span>

              <h2 ref={storyHeadingRef} className="heading-section text-[#0D0D0D]">
                <span className="block overflow-hidden py-[0.03em] -my-[0.02em]">
                  <span data-reveal-line className="block">
                    Every great journey
                  </span>
                </span>
                <span className="block overflow-hidden py-[0.03em] -my-[0.02em]">
                  <span data-reveal-line className="block text-[#0D0D0D]/80">
                    begins with an idea.
                  </span>
                </span>
              </h2>

              <div
                ref={storyCopyRef}
                className="mt-8 space-y-5 text-[16px] leading-[1.65] text-[#0D0D0D]/75 max-w-[540px]"
              >
                <p data-stagger-item className="text-[#0D0D0D] font-medium">
                  At Brand Yatra, we believe the most powerful brands are built with intention.
                </p>
                <p data-stagger-item>
                  We bring together strategic thinking, thoughtful design, technology and
                  storytelling to help businesses find their voice, strengthen their identity and
                  connect with the people who matter.
                </p>
                <p data-stagger-item>
                  Our work goes beyond making things look good. We focus on building experiences
                  that communicate clearly, create value and support long-term business growth.
                </p>

                <div data-stagger-item className="pt-4">
                  <BrandButton
                    variant="gold"
                    size="md"
                    onClick={() => onNavigate('/work')}
                  >
                    Explore Our Work
                  </BrandButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          SECTION 03 | WHAT WE BELIEVE (Dark Editorial Value Rows)
         =================================================================== */}
      <section
        data-cursor-theme="dark"
        className="bg-[#0D0D0D] text-white by-section-spacing"
      >
        <div className="by-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-16 lg:mb-24">
            <div className="lg:col-span-7">
              <span className="eyebrow-label text-[#A8A8A8] block mb-5">
                OUR PHILOSOPHY
              </span>

              <h2 ref={beliefHeadingRef} className="heading-section text-white">
                <span className="block overflow-hidden py-[0.03em] -my-[0.02em]">
                  <span data-reveal-line className="block">
                    Good design gets attention.
                  </span>
                </span>
                <span className="block overflow-hidden py-[0.03em] -my-[0.02em]">
                  <span data-reveal-line className="block">
                    Great thinking <span className="text-[#F8C311]">creates impact.</span>
                  </span>
                </span>
              </h2>
            </div>

            <div className="lg:col-span-5">
              <p
                ref={beliefIntroRef}
                className="text-[16px] leading-[1.62] text-[#A8A8A8] max-w-[450px] lg:ml-auto"
              >
                We believe creativity works best when it&apos;s guided by purpose, backed by
                insight and connected to real business objectives.
              </p>
            </div>
          </div>

          {/* Four Editorial Value Rows With Large Numbers & Animated Hover Underline */}
          <div ref={beliefListRef} className="border-t border-white/[0.1]">
            {BELIEF_VALUES.map((item) => (
              <div
                key={item.number}
                data-stagger-item
                className="group relative border-b border-white/[0.1] py-8 sm:py-10 lg:py-12 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-baseline"
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
                  <h3 className="font-heading text-[30px] sm:text-[36px] leading-[1.02] tracking-[0.02em] text-white">
                    {item.title}
                  </h3>
                </div>

                <div className="md:col-span-5 transition-transform duration-300 ease-out group-hover:translate-x-1">
                  <p className="text-[16px] leading-[1.6] text-[#A8A8A8] max-w-[460px]">
                    {item.description}
                  </p>
                </div>

                {/* Animated Yellow Hover Underline */}
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
          SECTION 04 | WHAT WE DO (Off-White Two-Column Expertise Grid)
         =================================================================== */}
      <section
        data-cursor-theme="light"
        className="bg-[#F6F5F2] text-[#0D0D0D] by-section-spacing"
      >
        <div className="by-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-16 lg:mb-24">
            <div className="lg:col-span-7">
              <span className="eyebrow-label text-[#0D0D0D]/60 block mb-5">
                OUR EXPERTISE
              </span>

              <h2 ref={expertiseHeadingRef} className="heading-section text-[#0D0D0D]">
                <span className="block overflow-hidden py-[0.03em] -my-[0.02em]">
                  <span data-reveal-line className="block">
                    One creative partner.
                  </span>
                </span>
                <span className="block overflow-hidden py-[0.03em] -my-[0.02em]">
                  <span data-reveal-line className="block text-[#0D0D0D]/75">
                    Every digital possibility.
                  </span>
                </span>
              </h2>
            </div>

            <div className="lg:col-span-5">
              <p
                ref={expertiseIntroRef}
                className="text-[16px] leading-[1.62] text-[#0D0D0D]/70 max-w-[440px] lg:ml-auto"
              >
                From shaping a brand&apos;s identity to building its digital presence, we connect
                every part of the creative process.
              </p>
            </div>
          </div>

          <div
            ref={expertiseGridRef}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-20 gap-y-12 lg:gap-y-16"
          >
            {ABOUT_EXPERTISE.map((item) => {
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
                  aria-label={`Explore ${item.title}`}
                  className="group block border-t border-[#0D0D0D]/15 pt-8 sm:pt-10 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0D0D0D]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-xs font-semibold tracking-[0.14em] text-[#0D0D0D]/50 tabular-nums">
                      {item.number}
                    </span>
                    <ArrowUpRight className="w-5 h-5 text-[#0D0D0D]/45 group-hover:text-[#0D0D0D] transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
                  </div>

                  <h3 className="font-heading text-[32px] sm:text-[38px] leading-[1.02] tracking-[0.02em] text-[#0D0D0D] mt-4 group-hover:translate-x-1 transition-transform duration-300">
                    {item.title}
                  </h3>

                  <p className="text-[16px] leading-[1.62] text-[#0D0D0D]/70 mt-3.5 max-w-[490px]">
                    {item.description}
                  </p>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================================================================
          SECTION 05 | HOW WE THINK (Dark Charcoal Timeline)
         =================================================================== */}
      <section
        ref={approachSectionRef}
        data-cursor-theme="dark"
        className="bg-[#191919] text-white by-section-spacing"
      >
        <div className="by-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
            <div className="lg:col-span-7">
              <span className="eyebrow-label text-[#A8A8A8] block mb-5">
                OUR APPROACH
              </span>

              <h2 ref={approachHeadingRef} className="heading-section text-white">
                <span className="block overflow-hidden py-[0.03em] -my-[0.02em]">
                  <span data-reveal-line className="block">
                    From the first conversation
                  </span>
                </span>
                <span className="block overflow-hidden py-[0.03em] -my-[0.02em]">
                  <span data-reveal-line className="block text-white/85">
                    to the final detail.
                  </span>
                </span>
              </h2>
            </div>

            <div className="lg:col-span-5">
              <p
                ref={approachIntroRef}
                className="text-[16px] leading-[1.62] text-[#A8A8A8] max-w-[440px] lg:ml-auto"
              >
                We approach every project with curiosity, clarity and a commitment to creating
                meaningful work.
              </p>
            </div>
          </div>

          {/* Desktop Horizontal Timeline */}
          <div ref={desktopTimelineRef} className="hidden md:block mt-20 lg:mt-24">
            <div className="relative mb-12">
              <div className="h-[1px] w-full bg-white/[0.12]" aria-hidden="true" />
              <div
                ref={desktopLineRef}
                className="absolute inset-y-0 left-0 w-full h-[1px] bg-[#F8C311] origin-left"
                aria-hidden="true"
              />
            </div>

            <div className="grid grid-cols-4 gap-8">
              {APPROACH_STAGES.map((stage) => (
                <div key={stage.number} className="relative">
                  <span
                    className="block w-2 h-2 bg-[#F8C311] -mt-[52px] mb-10"
                    aria-hidden="true"
                  />

                  <div
                    data-stage-num
                    className="font-heading text-[48px] lg:text-[58px] leading-none tracking-[0.02em] text-[#F8C311] tabular-nums"
                  >
                    {stage.number}
                  </div>

                  <div data-stage-body className="mt-4">
                    <h3 className="text-[13px] font-semibold tracking-[0.14em] uppercase text-white">
                      {stage.title}
                    </h3>
                    <p className="text-[15.5px] leading-[1.6] text-[#A8A8A8] mt-3 pr-2">
                      {stage.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Vertical Timeline */}
          <div ref={mobileTimelineRef} className="md:hidden relative mt-14 pl-8">
            <div
              className="absolute left-[3px] top-2 bottom-2 w-[1px] bg-white/[0.12]"
              aria-hidden="true"
            />
            <div
              ref={mobileLineRef}
              className="absolute left-[3px] top-2 bottom-2 w-[1px] bg-[#F8C311] origin-top"
              aria-hidden="true"
            />

            <div className="space-y-11">
              {APPROACH_STAGES.map((stage) => (
                <div key={stage.number} data-mobile-stage className="relative">
                  <span
                    className="absolute -left-8 top-2 w-[7px] h-[7px] bg-[#F8C311]"
                    aria-hidden="true"
                  />
                  <div className="font-heading text-[42px] leading-none tracking-[0.02em] text-[#F8C311] tabular-nums">
                    {stage.number}
                  </div>
                  <h3 className="text-[13px] font-semibold tracking-[0.14em] uppercase text-white mt-2">
                    {stage.title}
                  </h3>
                  <p className="text-[15.5px] leading-[1.6] text-[#A8A8A8] mt-2">
                    {stage.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          SECTION 06 | THE PEOPLE BEHIND THE WORK (Warm Off-White Editorial)
         =================================================================== */}
      <section
        data-cursor-theme="light"
        className="bg-[#F6F5F2] text-[#0D0D0D] by-section-spacing"
      >
        <div className="by-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-14 lg:mb-20">
            <div className="lg:col-span-7">
              <span className="eyebrow-label text-[#0D0D0D]/60 block mb-5">
                OUR PEOPLE
              </span>

              <h2 ref={peopleHeadingRef} className="heading-section text-[#0D0D0D]">
                <span className="block overflow-hidden py-[0.03em] -my-[0.02em]">
                  <span data-reveal-line className="block">
                    Different minds.
                  </span>
                </span>
                <span className="block overflow-hidden py-[0.03em] -my-[0.02em]">
                  <span data-reveal-line className="block text-[#0D0D0D]/75">
                    One shared ambition.
                  </span>
                </span>
              </h2>
            </div>

            <div className="lg:col-span-5">
              <p
                ref={peopleIntroRef}
                className="text-[16px] leading-[1.62] text-[#0D0D0D]/70 max-w-[460px] lg:ml-auto"
              >
                Great work comes from collaboration. We bring together creative thinking,
                technical expertise and a shared commitment to making every project better.
              </p>
            </div>
          </div>

          {/* Authentic Studio Environment Frame — Clearly Replaceable With Verified Team Photograph */}
          <figure ref={peopleImageRef} className="w-full">
            <div className="relative aspect-[16/9] lg:aspect-[16/8.2] w-full overflow-hidden bg-[#E5E3DD]">
              <ResilientImage
                src={PEOPLE_WORKSPACE_IMAGE}
                alt="Inside the Brand Yatra creative studio environment"
                className="w-full h-full object-cover object-center"
              />
            </div>

            <figcaption className="pt-4 border-b border-[#0D0D0D]/12 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[12.5px] text-[#0D0D0D]/60">
              <span>Brand Yatra Creative Studio — Strategists, Designers, Technologists &amp; Storytellers</span>
              <span className="uppercase tracking-[0.1em] text-[11px] font-medium text-[#0D0D0D]/45">
                Inside Our Studio
              </span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ===================================================================
          SECTION 07 | OUR COMMITMENT (Oversized Dark Statement)
         =================================================================== */}
      <section
        data-cursor-theme="dark"
        className="bg-[#0D0D0D] text-white py-28 sm:py-36 lg:py-44 border-t border-white/[0.06]"
      >
        <div className="by-container">
          <div className="max-w-[1040px]">
            <h2
              ref={commitmentHeadingRef}
              className="font-heading text-[48px] sm:text-[68px] lg:text-[90px] leading-[0.93] tracking-[0.014em] uppercase text-white"
            >
              <span className="block overflow-hidden py-[0.03em] -my-[0.02em]">
                <span data-reveal-line className="block">
                  We believe every brand
                </span>
              </span>
              <span className="block overflow-hidden py-[0.03em] -my-[0.02em]">
                <span data-reveal-line className="block">
                  deserves to be <span className="text-[#F8C311]">remarkable.</span>
                </span>
              </span>
            </h2>

            <p
              ref={commitmentCopyRef}
              className="text-[16.5px] sm:text-[18px] leading-[1.64] text-[#A8A8A8] max-w-[580px] mt-8 lg:mt-10"
            >
              Whether you&apos;re starting something new or taking your business further,
              we&apos;re here to help you turn your vision into a brand experience that matters.
            </p>
          </div>
        </div>
      </section>

      {/* ===================================================================
          SECTION 08 | FINAL CTA (Full-Width Brand Yatra Yellow)
         =================================================================== */}
      <section
        data-cursor-theme="yellow"
        className="bg-[#F8C311] text-[#0D0D0D] py-20 sm:py-24 lg:py-32"
      >
        <div ref={finalCtaRef} className="by-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-end">
            <div className="lg:col-span-7">
              <h2 className="font-heading text-[50px] sm:text-[68px] lg:text-[84px] leading-[0.92] tracking-[0.015em] uppercase text-[#0D0D0D]">
                YOUR NEXT CHAPTER
                <br />
                STARTS HERE.
              </h2>

              <p className="text-[16px] sm:text-[17px] leading-[1.6] text-[#0D0D0D]/85 max-w-[500px] mt-5">
                Have an idea, a challenge or an ambitious goal? Let&apos;s build something
                meaningful together.
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
                <span>Explore Our Work</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.3] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
