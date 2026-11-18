import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { BRAND_IMAGES } from '../../data/images';
import { HERO_STATS, HeroStat } from '../../data/site';
import { AppRoute } from '../../data/services';
import { BrandButton } from '../ui/BrandButton';
import { useGlobalInteractions } from '../ui/GlobalInteractions';

gsap.registerPlugin(ScrollTrigger);

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

interface HeroProps {
  onStartProject: (preselectedService?: string) => void;
  onNavigate: (path: AppRoute, hash?: string) => void;
}

function HeroBaselineStat({
  stat,
  isReady,
  showDivider,
}: {
  stat: HeroStat;
  isReady: boolean;
  showDivider: boolean;
}) {
  const valueRef = useRef<HTMLSpanElement | null>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    const el = valueRef.current;
    if (!el || !isReady || hasAnimatedRef.current) return;

    const decimals = stat.decimals ?? 0;
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    hasAnimatedRef.current = true;

    if (reduced) {
      el.textContent = stat.numericValue.toFixed(decimals);
      return;
    }

    const counter = { val: 0 };
    const tween = gsap.to(counter, {
      val: stat.numericValue,
      duration: 1.15,
      delay: 0.35,
      ease: 'power2.out',
      onUpdate: () => {
        el.textContent = counter.val.toFixed(decimals);
      },
    });

    return () => {
      tween.kill();
    };
  }, [isReady, stat.decimals, stat.numericValue]);

  return (
    <div className="flex items-center gap-5 xl:gap-6">
      {showDivider && (
        <span
          aria-hidden="true"
          className="hidden sm:block h-8 w-[1px] bg-white/[0.12] shrink-0"
        />
      )}
      <div className="flex flex-col">
        <div className="font-heading text-[30px] sm:text-[34px] xl:text-[38px] leading-[0.9] tracking-[0.02em] tabular-nums flex items-baseline">
          <span ref={valueRef} className="text-white">
            {stat.numericValue.toFixed(stat.decimals ?? 0)}
          </span>
          <span className="text-[#F8C311] ml-0.5">{stat.suffix}</span>
        </div>
        <span className="text-[11.5px] sm:text-[12px] leading-[1.3] text-white/75 mt-1 font-normal sm:whitespace-nowrap">
          {stat.label}
        </span>
      </div>
    </div>
  );
}

interface HeroPartnerBrand {
  name: string;
  href: AppRoute;
  wordmarkClass: string;
}

const HERO_MARQUEE_BRANDS: HeroPartnerBrand[] = [
  {
    name: 'Jubilee',
    href: '/work/jubilee-imperia',
    wordmarkClass: 'font-semibold tracking-[0.05em]',
  },
  {
    name: 'Cresta',
    href: '/work/cresta',
    wordmarkClass: 'font-semibold italic tracking-[-0.01em]',
  },
  {
    name: 'TVISVA',
    href: '/work/tvisva-jewels',
    wordmarkClass: 'font-semibold tracking-[0.14em] uppercase',
  },
  {
    name: 'BrightLight',
    href: '/work/brightlight-immigration',
    wordmarkClass: 'font-medium tracking-[0.01em]',
  },
  {
    name: 'Nestora',
    href: '/work/nestora',
    wordmarkClass: 'font-semibold tracking-[0.06em] uppercase',
  },
  {
    name: 'Veyra',
    href: '/work/veyra',
    wordmarkClass: 'font-semibold tracking-[0.12em] uppercase',
  },
  {
    name: 'Kairo',
    href: '/work/kairo',
    wordmarkClass: 'font-heading text-[18px] tracking-[0.08em] uppercase',
  },
  {
    name: 'Asian Legends',
    href: '/work/asian-legends-league',
    wordmarkClass: 'font-semibold tracking-[0.04em] uppercase text-[12.5px]',
  },
];

export function Hero({ onStartProject, onNavigate }: HeroProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const bgWrapRef = useRef<HTMLDivElement | null>(null);
  const kickerRef = useRef<HTMLDivElement | null>(null);
  const line1Ref = useRef<HTMLSpanElement | null>(null);
  const line2Ref = useRef<HTMLSpanElement | null>(null);
  const line3Ref = useRef<HTMLSpanElement | null>(null);
  const copyRef = useRef<HTMLParagraphElement | null>(null);
  const ctaWrapRef = useRef<HTMLDivElement | null>(null);
  const bottomBarRef = useRef<HTMLDivElement | null>(null);

  const heroTlRef = useRef<gsap.core.Timeline | null>(null);
  const { isHeroReady } = useGlobalInteractions();

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: 'power3.out' },
      });

      tl.fromTo(
        kickerRef.current,
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.62, clearProps: 'transform' },
        0.04
      )
        .fromTo(
          [line1Ref.current, line2Ref.current, line3Ref.current],
          { yPercent: 110 },
          {
            yPercent: 0,
            duration: 0.88,
            stagger: 0.08,
            clearProps: 'transform',
          },
          0.1
        )
        .fromTo(
          copyRef.current,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.74, clearProps: 'transform' },
          0.34
        )
        .fromTo(
          ctaWrapRef.current,
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, clearProps: 'transform' },
          0.44
        )
        .fromTo(
          bottomBarRef.current,
          { y: 12, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.72, clearProps: 'transform' },
          0.5
        );

      heroTlRef.current = tl;

      /* Gentle scroll movement on the studio photograph without zoom distortion */
      if (bgWrapRef.current) {
        gsap.fromTo(
          bgWrapRef.current,
          { yPercent: -2.5 },
          {
            yPercent: 4,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: 'bottom top',
              scrub: 0.6,
            },
          }
        );
      }
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
      id="home"
      ref={sectionRef}
      data-cursor-theme="dark"
      className="relative min-h-[100svh] lg:min-h-[720px] flex flex-col justify-between overflow-hidden bg-[#0D0D0D] pt-24 sm:pt-28 lg:pt-28 pb-7 lg:pb-9"
    >
      {/* Unified Creative Studio Architectural Photograph Across Desktop & Mobile */}
      <div
        ref={bgWrapRef}
        aria-hidden="true"
        className="absolute -inset-y-6 inset-x-0 pointer-events-none select-none will-change-transform"
      >
        <img
          src={BRAND_IMAGES.home.heroWide}
          alt=""
          loading="eager"
          decoding="async"
          fetchPriority="high"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-[78%_center] sm:object-[74%_center] md:object-[64%_center]"
        />

        {/* Mobile-Only High-Contrast Editorial Scrim + Unchanged Desktop Left-to-Right Scrim */}
        <div className="md:hidden absolute inset-0 bg-[#0D0D0D]/68" />
        <div className="md:hidden absolute inset-0 bg-gradient-to-r from-[#0D0D0D]/90 via-[#0D0D0D]/74 to-[#0D0D0D]/44" />
        <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-[#0D0D0D]/95 via-[#0D0D0D]/74 to-[#0D0D0D]/22" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/95 via-transparent to-[#0D0D0D]/58" />
      </div>

      {/* Main Flush-Left Editorial Hero Content */}
      <div className="by-container relative z-10 flex-1 flex items-center py-6 lg:py-4">
        <div className="max-w-[780px] text-left">
          <div
            ref={kickerRef}
            className="eyebrow-label text-[#A8A8A8] mb-5"
          >
            BRAND YATRA — CREATIVE DIGITAL MARKETING AGENCY
          </div>

          {/* Balanced Three-Line Editorial Headline */}
          <h1 className="heading-hero select-none">
            <span className="block overflow-hidden py-[0.03em] -my-[0.02em]">
              <span
                ref={line1Ref}
                className="block sm:whitespace-nowrap will-change-transform"
              >
                <span className="text-[#F8C311]">YOUR</span>{' '}
                <span className="text-white">BRAND.</span>
              </span>
            </span>
            <span className="block overflow-hidden py-[0.03em] -my-[0.02em]">
              <span
                ref={line2Ref}
                className="block sm:whitespace-nowrap will-change-transform"
              >
                <span className="text-white">OUR</span>{' '}
                <span className="text-[#F8C311]">STRATEGY.</span>
              </span>
            </span>
            <span className="block overflow-hidden py-[0.03em] -my-[0.02em]">
              <span
                ref={line3Ref}
                className="block sm:whitespace-nowrap text-white will-change-transform"
              >
                LIMITLESS POSSIBILITIES.
              </span>
            </span>
          </h1>

          <p
            ref={copyRef}
            className="mt-6 lg:mt-8 text-[16px] sm:text-[17px] leading-[1.64] text-white/85 max-w-[530px]"
          >
            We turn ambitious ideas into memorable brand identities, high-performing
            websites and measurable digital growth through strategy, design and
            technology.
          </p>

          {/* Primary Yellow CTA + Restrained Outlined Secondary CTA */}
          <div
            ref={ctaWrapRef}
            className="mt-8 lg:mt-10 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6"
          >
            <BrandButton
              variant="gold"
              size="lg"
              onClick={() => onStartProject()}
              className="w-full sm:w-auto"
            >
              Start a Project
            </BrandButton>

            <a
              href="/work"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/work');
              }}
              className="group inline-flex items-center justify-center sm:justify-start gap-2 min-h-[52px] px-6 sm:px-2 border border-white/20 sm:border-0 sm:border-b sm:border-white/35 hover:border-[#F8C311] text-[14px] font-semibold text-white hover:text-[#F8C311] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F8C311]"
            >
              <span>Explore Selected Work</span>
              <ArrowUpRight className="w-4 h-4 text-[#F8C311] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Grounded Editorial Baseline Bar: Agency Impact Metrics + Seamless Partner Brand Marquee */}
      <div
        ref={bottomBarRef}
        className="by-container relative z-20 pt-5 border-t border-white/[0.14]"
      >
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-5 xl:gap-10">
          {/* 4 Agency Impact Stats */}
          <div
            aria-label="Agency Impact Metrics"
            className="grid grid-cols-2 sm:flex sm:flex-wrap xl:flex-nowrap items-start sm:items-center gap-y-4 gap-x-5 xl:gap-x-6 shrink-0"
          >
            {HERO_STATS.map((stat, idx) => (
              <HeroBaselineStat
                key={stat.id}
                stat={stat}
                isReady={isHeroReady}
                showDivider={idx > 0}
              />
            ))}
          </div>

          {/* Seamless Infinite Partner Brand Marquee */}
          <div
            className="w-full xl:flex-1 xl:max-w-[460px] min-w-0 pt-4 xl:pt-0 border-t xl:border-t-0 border-white/[0.10] overflow-hidden by-marquee-mask"
            aria-label="Selected Client Collaborations"
          >
            <div className="by-marquee-track items-center text-white/65 text-[14px]">
              {[0, 1].map((copyIdx) => (
                <div
                  key={copyIdx}
                  aria-hidden={copyIdx === 1 ? 'true' : undefined}
                  className="flex items-center shrink-0"
                >
                  {HERO_MARQUEE_BRANDS.map((brand) => (
                    <span
                      key={`${copyIdx}-${brand.name}`}
                      className="inline-flex items-center"
                    >
                      <a
                        href={brand.href}
                        tabIndex={copyIdx === 1 ? -1 : undefined}
                        onClick={(e) => {
                          e.preventDefault();
                          onNavigate(brand.href);
                        }}
                        className={`${brand.wordmarkClass} px-4 sm:px-5 hover:text-[#F8C311] transition-colors whitespace-nowrap`}
                      >
                        {brand.name}
                      </a>
                      <span
                        aria-hidden="true"
                        className="text-[#F8C311]/55 text-[11px] select-none"
                      >
                        ·
                      </span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
