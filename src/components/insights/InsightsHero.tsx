import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown } from 'lucide-react';
import { useGlobalInteractions } from '../ui/GlobalInteractions';
import { useSmoothScroll } from '../animations/SmoothScrollProvider';

gsap.registerPlugin(ScrollTrigger);

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export function InsightsHero() {
  const { scrollTo } = useSmoothScroll();
  const { isHeroReady } = useGlobalInteractions();
  const heroTlRef = useRef<gsap.core.Timeline | null>(null);

  const sectionRef = useRef<HTMLElement | null>(null);
  const driftWrapRef = useRef<HTMLDivElement | null>(null);
  const eyebrowRef = useRef<HTMLSpanElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const descRef = useRef<HTMLParagraphElement | null>(null);
  const dividerRef = useRef<HTMLDivElement | null>(null);
  const scrollCueRef = useRef<HTMLDivElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      const lines = headlineRef.current?.querySelectorAll('[data-insights-hero-line]');
      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: 'power3.out' },
      });

      if (eyebrowRef.current) {
        tl.fromTo(
          eyebrowRef.current,
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

      if (descRef.current) {
        tl.fromTo(
          descRef.current,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.78, clearProps: 'transform' },
          0.36
        );
      }

      if (dividerRef.current) {
        tl.fromTo(
          dividerRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.9, ease: 'power3.out' },
          0.42
        );
      }

      if (scrollCueRef.current) {
        tl.fromTo(
          scrollCueRef.current,
          { y: 10, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.65, clearProps: 'transform' },
          0.54
        );
      }

      if (driftWrapRef.current) {
        gsap.to(driftWrapRef.current, {
          yPercent: -4,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.6,
          },
        });
      }

      heroTlRef.current = tl;
    }, section);

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

  return (
    <section
      ref={sectionRef}
      data-cursor-theme="dark"
      className="bg-[#0D0D0D] text-white pt-32 sm:pt-36 lg:pt-44 pb-16 lg:pb-24"
    >
      <div ref={driftWrapRef} className="by-container will-change-transform">
        <span
          ref={eyebrowRef}
          className="eyebrow-label text-[#A8A8A8] block mb-5"
        >
          THE BRAND YATRA JOURNAL
        </span>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-end">
          {/* Left Oversized Four-Line Editorial Heading */}
          <div className="lg:col-span-7">
            <h1
              ref={headlineRef}
              className="font-heading text-[56px] sm:text-[78px] lg:text-[98px] xl:text-[110px] leading-[0.9] tracking-[0.012em] uppercase text-white"
            >
              <span className="block overflow-hidden py-[0.03em] -my-[0.02em]">
                <span data-insights-hero-line className="block">
                  IDEAS WORTH
                </span>
              </span>
              <span className="block overflow-hidden py-[0.03em] -my-[0.02em]">
                <span data-insights-hero-line className="block text-[#F8C311]">
                  SHARING.
                </span>
              </span>
              <span className="block overflow-hidden py-[0.03em] -my-[0.02em]">
                <span data-insights-hero-line className="block">
                  INSIGHTS WORTH
                </span>
              </span>
              <span className="block overflow-hidden py-[0.03em] -my-[0.02em]">
                <span data-insights-hero-line className="block">
                  EXPLORING.
                </span>
              </span>
            </h1>
          </div>

          {/* Lower-Right Aligned Supporting Description */}
          <div className="lg:col-span-5 lg:pb-2">
            <p
              ref={descRef}
              className="text-[16px] sm:text-[17px] leading-[1.64] text-[#A8A8A8] max-w-[460px] lg:ml-auto"
            >
              Fresh perspectives on branding, digital marketing, design, technology and the
              ideas shaping tomorrow&apos;s businesses.
            </p>
          </div>
        </div>

        {/* Thin Horizontal Divider + Minimal Scroll Indicator */}
        <div className="mt-12 lg:mt-16">
          <div
            ref={dividerRef}
            aria-hidden="true"
            className="h-[1px] w-full bg-white/[0.12] origin-left"
          />

          <div ref={scrollCueRef} className="pt-6 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => scrollTo('#featured-insight')}
              className="group inline-flex items-center gap-2.5 eyebrow-label text-[#A8A8A8] hover:text-white transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#F8C311]"
            >
              <span>SCROLL TO EXPLORE</span>
              <ArrowDown className="w-3.5 h-3.5 text-[#F8C311] transition-transform duration-300 group-hover:translate-y-1" />
            </button>

            <span className="hidden sm:inline eyebrow-label text-white/35">
              EDITORIAL PERSPECTIVES
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
