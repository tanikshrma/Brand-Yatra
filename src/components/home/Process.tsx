import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Layers, Route, Search, TrendingUp, type LucideIcon } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

interface ProcessCardItem {
  number: string;
  title: string;
  description: string;
  Icon: LucideIcon;
}

const PROCESS_CARDS: ProcessCardItem[] = [
  {
    number: '01',
    title: 'DISCOVER',
    description:
      'We understand your brand, business objectives, target audience and market opportunities.',
    Icon: Search,
  },
  {
    number: '02',
    title: 'STRATEGIZE',
    description:
      'We transform insights into a focused roadmap that connects creativity with measurable goals.',
    Icon: Route,
  },
  {
    number: '03',
    title: 'CREATE',
    description:
      'Our team brings ideas to life through compelling design, smart technology and engaging content.',
    Icon: Layers,
  },
  {
    number: '04',
    title: 'GROW',
    description:
      'We launch, measure, optimize and continuously improve to support long-term business growth.',
    Icon: TrendingUp,
  },
];

export function Process() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const eyebrowRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const rightCopyRef = useRef<HTMLDivElement | null>(null);
  const cardsStageRef = useRef<HTMLDivElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      /* 1. Heading Sequence: Eyebrow fade-in -> Masked upward headline -> Right paragraph fade-in from right */
      if (eyebrowRef.current) {
        gsap.fromTo(
          eyebrowRef.current,
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: 'power3.out',
            clearProps: 'transform',
            scrollTrigger: {
              trigger: section,
              start: 'top 84%',
              once: true,
            },
          }
        );
      }

      if (headingRef.current) {
        const lines = headingRef.current.querySelectorAll('[data-process-heading-line]');
        if (lines.length) {
          gsap.fromTo(
            lines,
            { yPercent: 108 },
            {
              yPercent: 0,
              duration: 0.82,
              stagger: 0.1,
              ease: 'power3.out',
              clearProps: 'transform',
              scrollTrigger: {
                trigger: headingRef.current,
                start: 'top 85%',
                once: true,
              },
            }
          );
        }
      }

      if (rightCopyRef.current) {
        gsap.fromTo(
          rightCopyRef.current,
          { opacity: 0, x: 26 },
          {
            opacity: 1,
            x: 0,
            duration: 0.78,
            delay: 0.14,
            ease: 'power3.out',
            clearProps: 'transform',
            scrollTrigger: {
              trigger: rightCopyRef.current,
              start: 'top 86%',
              once: true,
            },
          }
        );
      }

      /* 2. 2x2 Process Box Grid Staggered Reveal */
      if (cardsStageRef.current) {
        const cards = cardsStageRef.current.querySelectorAll('[data-process-card]');
        if (cards.length) {
          gsap.fromTo(
            cards,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.75,
              stagger: 0.12,
              ease: 'power3.out',
              clearProps: 'transform',
              scrollTrigger: {
                trigger: cardsStageRef.current,
                start: 'top 84%',
                once: true,
              },
            }
          );
        }
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      aria-labelledby="process-section-heading"
      data-cursor-theme="light"
      className="bg-[#F8F7F4] text-[#111111] by-section-spacing"
    >
      <div className="by-container">
        {/* Section Heading — Spacious Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 lg:items-center">
          {/* Left Side: Yellow Hairline + Eyebrow + Condensed Uppercase Headline */}
          <div className="lg:col-span-7">
            <div ref={eyebrowRef} className="eyebrow-label text-[#0D0D0D]/60 mb-5">
              HOW WE WORK / OUR APPROACH
            </div>

            <h2
              id="process-section-heading"
              ref={headingRef}
              className="font-heading text-[44px] sm:text-[58px] lg:text-[68px] xl:text-[74px] leading-[0.94] tracking-[0.015em] uppercase text-[#111111]"
            >
              <span className="block overflow-hidden py-[0.03em] -my-[0.02em]">
                <span data-process-heading-line className="block">
                  FROM IDEAS TO IMPACT.
                </span>
              </span>
              <span className="block overflow-hidden py-[0.03em] -my-[0.02em]">
                <span data-process-heading-line className="block">
                  EVERY STEP <span className="text-[#F8C311]">MATTERS.</span>
                </span>
              </span>
            </h2>
          </div>

          {/* Right Side: Thin Vertical Black Divider + Supporting Paragraph Aligned With Headline Center */}
          <div className="lg:col-span-5 lg:mt-8">
            <div
              ref={rightCopyRef}
              className="flex items-stretch gap-5 sm:gap-6 max-w-[460px] lg:ml-auto"
            >
              <span
                aria-hidden="true"
                className="w-[1px] self-stretch bg-[#111111] shrink-0"
              />
              <p className="text-[16px] sm:text-[17px] leading-[1.64] text-[#555555] py-0.5">
                Great results begin with clear thinking, thoughtful collaboration
                and a process built around your business goals.
              </p>
            </div>
          </div>
        </div>

        {/* 2x2 Column Box Grid (2 Columns Per Row on Tablet & Desktop, 1 Column on Mobile) */}
        <div
          ref={cardsStageRef}
          className="mt-[56px] md:mt-[76px] lg:mt-[92px] grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7 lg:gap-8 xl:gap-10 items-stretch"
        >
          {PROCESS_CARDS.map(({ number, title, description, Icon }) => (
            <article
              key={number}
              data-process-card
              className="group relative h-full bg-[#FFFFFF] border border-[#222222] rounded-none p-[30px] sm:p-[36px] lg:p-[42px] flex flex-col transition-[transform,border-color] duration-300 ease-out hover:-translate-y-[5px] hover:border-[#F8C311]"
            >
              {/* Angular Top-Right Brand Yellow Corner Decoration With Diagonal Left Cut */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute top-0 right-0 w-[74px] h-[60px] bg-[#F8C311] [clip-path:polygon(0_0,100%_0,100%_100%,28%_100%)] flex items-center justify-end pr-[16px]"
              >
                <Icon className="w-[21px] h-[21px] text-[#111111] stroke-[1.75]" />
              </div>

              {/* Large Brand Yellow Step Number */}
              <div className="font-heading text-[68px] lg:text-[78px] leading-[0.86] tracking-[0.015em] text-[#F8C311] tabular-nums select-none pr-16">
                {number}
              </div>

              {/* Bold Black Condensed Title */}
              <h3 className="font-heading text-[30px] lg:text-[36px] leading-[1.02] tracking-[0.02em] uppercase text-[#111111] mt-5">
                {title}
              </h3>

              {/* Short Brand Yellow Underline */}
              <span
                aria-hidden="true"
                className="block w-10 h-[2.5px] bg-[#F8C311] mt-3.5 mb-4 shrink-0"
              />

              {/* Readable Step Description */}
              <p className="text-[16px] lg:text-[17px] leading-[1.64] text-[#555555] max-w-[48ch]">
                {description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
