import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown } from 'lucide-react';
import { ServicePageData } from '../../data/services';
import { BrandButton } from '../ui/BrandButton';
import { useGlobalInteractions } from '../ui/GlobalInteractions';
import { ResilientImage } from '../ui/ResilientImage';
import { useSmoothScroll } from '../animations/SmoothScrollProvider';
import { useParallax } from '../animations/gsapHooks';

gsap.registerPlugin(ScrollTrigger);

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

interface ServiceHeroProps {
  service: ServicePageData;
  onStartProject: (serviceTitle: string) => void;
}

export function ServiceHero({ service, onStartProject }: ServiceHeroProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const eyebrowRef = useRef<HTMLSpanElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const copyWrapRef = useRef<HTMLDivElement | null>(null);
  const imageFrameRef = useRef<HTMLDivElement | null>(null);
  const imageParallaxRef = useRef<HTMLDivElement | null>(null);
  const heroTlRef = useRef<gsap.core.Timeline | null>(null);

  const { scrollTo } = useSmoothScroll();
  const { isHeroReady } = useGlobalInteractions();

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      const lines = headlineRef.current?.querySelectorAll('[data-service-hero-line]');
      const copyItems = copyWrapRef.current?.querySelectorAll('[data-service-hero-copy]');

      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: 'power3.out' },
      });

      if (eyebrowRef.current) {
        tl.fromTo(
          eyebrowRef.current,
          { y: 12, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, clearProps: 'transform' },
          0.04
        );
      }

      if (lines && lines.length) {
        tl.fromTo(
          lines,
          { yPercent: 108 },
          {
            yPercent: 0,
            duration: 0.86,
            stagger: 0.08,
            clearProps: 'transform',
          },
          0.12
        );
      }

      if (copyItems && copyItems.length) {
        tl.fromTo(
          copyItems,
          { y: 16, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.72,
            stagger: 0.08,
            clearProps: 'transform',
          },
          0.36
        );
      }

      if (imageFrameRef.current) {
        tl.fromTo(
          imageFrameRef.current,
          { clipPath: 'inset(10% 0% 10% 0%)', opacity: 0 },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            opacity: 1,
            duration: 0.95,
            clearProps: 'clipPath',
          },
          0.22
        );
      }

      heroTlRef.current = tl;
    }, section);

    return () => {
      heroTlRef.current = null;
      ctx.revert();
    };
  }, [service.slug]);

  useEffect(() => {
    if (isHeroReady && heroTlRef.current) {
      heroTlRef.current.play(0);
    }
  }, [isHeroReady, service.slug]);

  useParallax(imageParallaxRef, { yPercent: -5 });

  return (
    <section
      ref={sectionRef}
      data-cursor-theme="dark"
      className="bg-[#0D0D0D] text-white pt-32 sm:pt-36 lg:pt-44 pb-16 lg:pb-24"
    >
      <div className="by-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-end">
          {/* Left Editorial Typography & Primary CTA (7 Cols) */}
          <div className="lg:col-span-7">
            <span
              ref={eyebrowRef}
              className="eyebrow-label text-[#A8A8A8] block mb-5"
            >
              {service.eyebrow}
            </span>

            <h1
              ref={headlineRef}
              className="font-heading text-[52px] sm:text-[72px] lg:text-[92px] xl:text-[104px] leading-[0.91] tracking-[0.012em] uppercase text-white"
            >
              <span className="block overflow-hidden py-[0.03em] -my-[0.02em]">
                <span data-service-hero-line className="block">
                  {service.heroHeadlineLines[0]}
                </span>
              </span>
              <span className="block overflow-hidden py-[0.03em] -my-[0.02em]">
                <span data-service-hero-line className="block">
                  {service.heroHeadlineLines[1]}
                </span>
              </span>
              <span className="block overflow-hidden py-[0.03em] -my-[0.02em]">
                <span data-service-hero-line className="block text-[#F8C311]">
                  {service.highlightedHeadlineText}
                </span>
              </span>
            </h1>

            <div ref={copyWrapRef} className="mt-8 lg:mt-10 max-w-[560px]">
              <p
                data-service-hero-copy
                className="text-[16px] sm:text-[17px] leading-[1.64] text-[#A8A8A8]"
              >
                {service.shortDescription}
              </p>

              <div
                data-service-hero-copy
                className="mt-8 lg:mt-9 flex flex-wrap items-center gap-6"
              >
                <BrandButton
                  variant="gold"
                  size="lg"
                  onClick={() => onStartProject(service.title)}
                >
                  {service.ctaText}
                </BrandButton>

                <button
                  type="button"
                  onClick={() => scrollTo('#service-overview')}
                  className="group inline-flex items-center gap-2.5 eyebrow-label text-[#A8A8A8] hover:text-white transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#F8C311]"
                >
                  <span>EXPLORE {service.title.toUpperCase()}</span>
                  <ArrowDown className="w-3.5 h-3.5 text-[#F8C311] transition-transform duration-300 group-hover:translate-y-1" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Editorial Studio Visual (5 Cols) */}
          <div className="lg:col-span-5">
            <div
              ref={imageFrameRef}
              className="relative aspect-[4/3] lg:aspect-[4/4.35] w-full overflow-hidden bg-[#171717]"
            >
              <div
                ref={imageParallaxRef}
                className="absolute -inset-y-7 inset-x-0 will-change-transform"
              >
                <ResilientImage
                  src={service.heroImage}
                  alt={service.heroImageAlt}
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/45 via-transparent to-transparent pointer-events-none"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
