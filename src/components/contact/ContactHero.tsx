import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowDownRight } from 'lucide-react';
import { BRAND_IMAGES } from '../../data/images';
import { BrandButton } from '../ui/BrandButton';
import { useGlobalInteractions } from '../ui/GlobalInteractions';
import { useSmoothScroll } from '../animations/SmoothScrollProvider';
import { useParallax } from '../animations/gsapHooks';

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export function ContactHero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const bgMediaRef = useRef<HTMLDivElement | null>(null);
  const eyebrowRef = useRef<HTMLSpanElement | null>(null);
  const line1Ref = useRef<HTMLSpanElement | null>(null);
  const line2Ref = useRef<HTMLSpanElement | null>(null);
  const line3Ref = useRef<HTMLSpanElement | null>(null);
  const copyRef = useRef<HTMLParagraphElement | null>(null);
  const ctaWrapRef = useRef<HTMLDivElement | null>(null);

  const heroTlRef = useRef<gsap.core.Timeline | null>(null);
  const { isHeroReady } = useGlobalInteractions();
  const { scrollTo } = useSmoothScroll();

  useParallax(bgMediaRef, { yPercent: 8, start: 'top top', end: 'bottom top' });

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
        eyebrowRef.current,
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, clearProps: 'transform' },
        0.04
      )
        .fromTo(
          [line1Ref.current, line2Ref.current, line3Ref.current],
          { yPercent: 112 },
          {
            yPercent: 0,
            duration: 0.86,
            stagger: 0.08,
            clearProps: 'transform',
          },
          0.1
        )
        .fromTo(
          copyRef.current,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.72, clearProps: 'transform' },
          0.34
        )
        .fromTo(
          ctaWrapRef.current,
          { y: 14, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.68, clearProps: 'transform' },
          0.44
        );

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
      className="relative overflow-hidden bg-[#0D0D0D] text-white min-h-[500px] sm:min-h-[560px] lg:min-h-[clamp(560px,72svh,780px)] flex items-end pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-20 lg:pb-24"
    >
      {/* Cinematic Architectural Studio Background with Responsive Desktop/Mobile Crops */}
      <div
        ref={bgMediaRef}
        aria-hidden="true"
        className="absolute -inset-y-8 inset-x-0 pointer-events-none select-none will-change-transform"
      >
        <picture>
          <source media="(min-width: 768px)" srcSet={BRAND_IMAGES.contact.heroWide} />
          <img
            src={BRAND_IMAGES.contact.heroMobile}
            alt=""
            loading="eager"
            decoding="async"
            fetchPriority="high"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center md:object-[center_45%]"
          />
        </picture>

        {/* Measured Editorial Contrast Scrim for Crisp Left-Aligned Headline Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D]/92 via-[#0D0D0D]/72 to-[#0D0D0D]/38" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-[#0D0D0D]/55" />
      </div>

      <div className="by-container relative z-10 w-full">
        <div className="max-w-[760px]">
          <span
            ref={eyebrowRef}
            className="eyebrow-label text-[#A8A8A8] block mb-5"
          >
            LET&apos;S CONNECT / BRAND YATRA
          </span>

          <h1 className="font-heading text-[54px] sm:text-[76px] lg:text-[98px] leading-[0.91] tracking-[0.014em] uppercase text-white">
            <span className="block overflow-hidden py-[0.03em] -my-[0.02em]">
              <span ref={line1Ref} className="block will-change-transform">
                LET&apos;S BUILD
              </span>
            </span>
            <span className="block overflow-hidden py-[0.03em] -my-[0.02em]">
              <span ref={line2Ref} className="block will-change-transform">
                SOMETHING
              </span>
            </span>
            <span className="block overflow-hidden py-[0.03em] -my-[0.02em]">
              <span
                ref={line3Ref}
                className="block text-[#F8C311] will-change-transform"
              >
                REMARKABLE.
              </span>
            </span>
          </h1>

          <p
            ref={copyRef}
            className="mt-6 lg:mt-7 text-[16px] sm:text-[17.5px] leading-[1.64] text-white/85 max-w-[540px]"
          >
            Every great collaboration begins with a conversation. Tell us your idea,
            your challenge or your next big goal.
          </p>

          <div ref={ctaWrapRef} className="mt-8 lg:mt-10">
            <BrandButton
              variant="gold"
              size="md"
              onClick={() => scrollTo('#contact-form-section')}
              icon={
                <ArrowDownRight className="w-4 h-4 stroke-[2.3] text-[#0D0D0D] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              }
            >
              Tell Us About Your Project
            </BrandButton>
          </div>
        </div>
      </div>
    </section>
  );
}
