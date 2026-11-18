import { useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import { ArrowUpRight } from 'lucide-react';
import { AppRoute, SERVICES_LIST, getServiceHref } from '../data/services';
import { PROCESS_STEPS } from '../data/site';
import { BrandButton } from '../components/ui/BrandButton';
import { useGlobalInteractions } from '../components/ui/GlobalInteractions';
import {
  useGSAPReveal,
  useStaggerReveal,
  useTextReveal,
} from '../components/animations/gsapHooks';

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

interface ProcessPageProps {
  onNavigate: (path: AppRoute, hash?: string) => void;
  onStartProject: (preselectedService?: string) => void;
}

const PROCESS_PHASES_DETAIL = [
  {
    number: '01',
    title: 'Discover',
    subtitle: 'Business context, audience insight & category clarity',
    summary:
      'We begin by listening closely—examining your business model, commercial priorities, customer questions and competitive landscape before proposing creative or technical direction.',
    deliverables: [
      'Stakeholder discovery & objective alignment',
      'Audience needs & buyer-journey review',
      'Brand, website or channel audit',
      'Clear scope, milestones & success criteria',
    ],
  },
  {
    number: '02',
    title: 'Strategize',
    subtitle: 'Positioning, architecture & channel roadmap',
    summary:
      'Insights become an actionable plan. Whether defining brand positioning, structuring website information architecture or planning search and paid media funnels, every decision is anchored in purpose.',
    deliverables: [
      'Brand positioning & messaging framework',
      'Sitemap, UX wireframes & content hierarchy',
      'Search, content & paid media planning',
      'Measurement & conversion tracking blueprint',
    ],
  },
  {
    number: '03',
    title: 'Create',
    subtitle: 'Design craft, engineering & compelling storytelling',
    summary:
      'Designers, writers and developers collaborate closely to turn strategy into cohesive visual identities, responsive websites and campaign creative built with precision.',
    deliverables: [
      'Visual identity systems & brand guidelines',
      'Responsive UI design & frontend development',
      'Editorial copywriting, video & campaign assets',
      'Cross-device QA, accessibility & performance checks',
    ],
  },
  {
    number: '04',
    title: 'Grow',
    subtitle: 'Launch, measurement & continuous refinement',
    summary:
      'Launch is the starting line. We monitor real user engagement, search visibility and campaign performance—refining creative, landing experiences and conversion pathways over time.',
    deliverables: [
      'Structured rollout & technical launch support',
      'Analytics, event & conversion verification',
      'Iterative campaign & landing-page optimization',
      'Transparent reporting & next-step recommendations',
    ],
  },
];

const COLLABORATION_STANDARDS = [
  {
    number: '01',
    title: 'Senior attention from day one',
    description:
      'You collaborate directly with the strategists, designers and developers shaping your work—keeping communication clear and feedback loops fast.',
  },
  {
    number: '02',
    title: 'Structured milestones, zero guesswork',
    description:
      'Every phase includes defined deliverables, review checkpoints and realistic timelines so your internal team always knows what comes next.',
  },
  {
    number: '03',
    title: 'Connected disciplines under one roof',
    description:
      'Brand identity, web development, content and digital marketing are planned together so your message stays cohesive across every touchpoint.',
  },
];

export function ProcessPage({ onNavigate, onStartProject }: ProcessPageProps) {
  const { isHeroReady } = useGlobalInteractions();
  const heroSectionRef = useRef<HTMLElement | null>(null);
  const eyebrowRef = useRef<HTMLSpanElement | null>(null);
  const line1Ref = useRef<HTMLSpanElement | null>(null);
  const line2Ref = useRef<HTMLSpanElement | null>(null);
  const line3Ref = useRef<HTMLSpanElement | null>(null);
  const heroCopyRef = useRef<HTMLParagraphElement | null>(null);
  const heroDividerRef = useRef<HTMLDivElement | null>(null);

  const phasesHeadingRef = useRef<HTMLHeadingElement | null>(null);
  const phasesListRef = useRef<HTMLDivElement | null>(null);
  const standardsHeadingRef = useRef<HTMLHeadingElement | null>(null);
  const standardsGridRef = useRef<HTMLDivElement | null>(null);
  const closingCtaRef = useRef<HTMLDivElement | null>(null);

  const heroTlRef = useRef<gsap.core.Timeline | null>(null);

  useTextReveal(phasesHeadingRef, { stagger: 0.08, duration: 0.8 });
  useStaggerReveal(phasesListRef, { y: 24, stagger: 0.1, duration: 0.82 });
  useTextReveal(standardsHeadingRef, { stagger: 0.08, duration: 0.8 });
  useStaggerReveal(standardsGridRef, { y: 22, stagger: 0.09, duration: 0.8 });
  useGSAPReveal(closingCtaRef, { y: 22, duration: 0.85, start: 'top 88%' });

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

      tl.fromTo(
        eyebrowRef.current,
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, clearProps: 'transform' },
        0.04
      )
        .fromTo(
          [line1Ref.current, line2Ref.current, line3Ref.current],
          { yPercent: 110 },
          { yPercent: 0, duration: 0.86, stagger: 0.08, clearProps: 'transform' },
          0.1
        )
        .fromTo(
          heroCopyRef.current,
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.72, clearProps: 'transform' },
          0.34
        )
        .fromTo(
          heroDividerRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.88, clearProps: 'transform' },
          0.38
        );

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

  const structuredDataJson = useMemo(() => {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
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
          name: 'Process',
          item: `${origin}/process`,
        },
      ],
    };

    const howToSchema = {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: 'How Brand Yatra Delivers Branding, Web & Marketing Engagements',
      step: PROCESS_STEPS.map((step, idx) => ({
        '@type': 'HowToStep',
        position: idx + 1,
        name: step.title,
        text: step.description,
      })),
    };

    return JSON.stringify([breadcrumbSchema, howToSchema]);
  }, []);

  return (
    <div className="bg-[#0D0D0D] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: structuredDataJson }}
      />

      {/* ===================================================================
          SECTION 01 | PROCESS HERO
         =================================================================== */}
      <section
        ref={heroSectionRef}
        data-cursor-theme="dark"
        className="bg-[#0D0D0D] text-white pt-32 sm:pt-36 lg:pt-44 pb-18 sm:pb-24 lg:pb-28"
      >
        <div className="by-container">
          <span
            ref={eyebrowRef}
            className="eyebrow-label text-[#A8A8A8] block mb-5"
          >
            HOW WE WORK / BRAND YATRA METHODOLOGY
          </span>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-end">
            <div className="lg:col-span-8">
              <h1 className="font-heading text-[54px] sm:text-[78px] lg:text-[104px] leading-[0.91] tracking-[0.012em] uppercase text-white">
                <span className="block overflow-hidden py-[0.03em] -my-[0.02em]">
                  <span ref={line1Ref} className="block will-change-transform">
                    CLEAR THINKING.
                  </span>
                </span>
                <span className="block overflow-hidden py-[0.03em] -my-[0.02em]">
                  <span ref={line2Ref} className="block will-change-transform">
                    DISCIPLINED <span className="text-[#F8C311]">CRAFT.</span>
                  </span>
                </span>
                <span className="block overflow-hidden py-[0.03em] -my-[0.02em]">
                  <span ref={line3Ref} className="block will-change-transform">
                    MEASURABLE GROWTH.
                  </span>
                </span>
              </h1>
            </div>

            <div className="lg:col-span-4">
              <p
                ref={heroCopyRef}
                className="text-[16px] sm:text-[17px] leading-[1.64] text-[#A8A8A8] max-w-[400px]"
              >
                Every engagement follows a structured four-stage framework designed
                to move smoothly from strategic clarity to durable execution.
              </p>
            </div>
          </div>

          <div
            ref={heroDividerRef}
            aria-hidden="true"
            className="mt-14 lg:mt-20 h-[1px] w-full bg-white/[0.12] origin-left"
          />
        </div>
      </section>

      {/* ===================================================================
          SECTION 02 | FOUR-STAGE ENGAGEMENT ARCHITECTURE (Warm Off-White)
         =================================================================== */}
      <section
        data-cursor-theme="light"
        className="bg-[#F6F5F2] text-[#0D0D0D] by-section-spacing"
      >
        <div className="by-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16 lg:mb-24">
            <div className="lg:col-span-7">
              <span className="eyebrow-label text-[#0D0D0D]/60 block mb-5">
                FOUR STAGES OF EXECUTION
              </span>
              <h2 ref={phasesHeadingRef} className="heading-section text-[#0D0D0D]">
                <span className="block overflow-hidden py-[0.03em] -my-[0.02em]">
                  <span data-reveal-line className="block">
                    From first conversation
                  </span>
                </span>
                <span className="block overflow-hidden py-[0.03em] -my-[0.02em]">
                  <span data-reveal-line className="block text-[#0D0D0D]/75">
                    to lasting momentum.
                  </span>
                </span>
              </h2>
            </div>

            <div className="lg:col-span-5">
              <p className="text-[16px] leading-[1.64] text-[#0D0D0D]/70 max-w-[440px] lg:ml-auto">
                Whether you partner with us for a focused capability or a full-scale
                brand and digital launch, each phase builds intentionally on the last.
              </p>
            </div>
          </div>

          <div
            ref={phasesListRef}
            className="divide-y divide-[#0D0D0D]/14 border-y border-[#0D0D0D]/14"
          >
            {PROCESS_PHASES_DETAIL.map((phase) => (
              <article
                key={phase.number}
                data-stagger-item
                className="py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start"
              >
                <div className="lg:col-span-4">
                  <span className="font-heading text-[56px] sm:text-[68px] leading-none tracking-[0.02em] text-[#0D0D0D] tabular-nums block">
                    {phase.number}
                  </span>
                  <h3 className="font-heading text-[34px] sm:text-[42px] leading-none tracking-[0.02em] uppercase text-[#0D0D0D] mt-3">
                    {phase.title}
                  </h3>
                  <p className="text-[14px] font-medium text-[#0D0D0D]/60 mt-2">
                    {phase.subtitle}
                  </p>
                </div>

                <div className="lg:col-span-4">
                  <p className="text-[16px] leading-[1.68] text-[#0D0D0D]/80">
                    {phase.summary}
                  </p>
                </div>

                <div className="lg:col-span-4">
                  <span className="eyebrow-label text-[#0D0D0D]/50 block mb-4">
                    KEY FOCUS AREAS
                  </span>
                  <ul className="space-y-2.5">
                    {phase.deliverables.map((item) => (
                      <li
                        key={item}
                        className="flex items-baseline gap-3 text-[15px] leading-[1.55] text-[#0D0D0D]/85"
                      >
                        <span
                          aria-hidden="true"
                          className="w-1.5 h-1.5 bg-[#0D0D0D] shrink-0 translate-y-[-2px]"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================================
          SECTION 03 | COLLABORATION PRINCIPLES & CAPABILITIES
         =================================================================== */}
      <section
        data-cursor-theme="dark"
        className="bg-[#0D0D0D] text-white by-section-spacing"
      >
        <div className="by-container">
          <div className="max-w-[720px] mb-14 lg:mb-20">
            <span className="eyebrow-label text-[#A8A8A8] block mb-5">
              WORKING TOGETHER
            </span>
            <h2 ref={standardsHeadingRef} className="heading-section text-white">
              <span className="block overflow-hidden py-[0.03em] -my-[0.02em]">
                <span data-reveal-line className="block">
                  Built for clarity, speed
                </span>
              </span>
              <span className="block overflow-hidden py-[0.03em] -my-[0.02em]">
                <span data-reveal-line className="block">
                  and <span className="text-[#F8C311]">accountability.</span>
                </span>
              </span>
            </h2>
          </div>

          <div
            ref={standardsGridRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10"
          >
            {COLLABORATION_STANDARDS.map((item) => (
              <div
                key={item.number}
                data-stagger-item
                className="pt-7 border-t border-white/[0.12]"
              >
                <span className="text-xs font-semibold tracking-[0.14em] text-[#F8C311] tabular-nums block mb-4">
                  {item.number} /
                </span>
                <h3 className="font-heading text-[28px] sm:text-[32px] leading-[1.04] tracking-[0.02em] uppercase text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-[15.5px] leading-[1.64] text-[#A8A8A8]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* Direct Links to All 12 Capabilities */}
          <div className="mt-20 pt-12 border-t border-white/[0.08]">
            <span className="eyebrow-label text-[#A8A8A8] block mb-6">
              EXPLORE DEDICATED CAPABILITIES
            </span>
            <div className="grid grid-cols-1 min-[420px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 sm:gap-x-8 gap-y-3.5 sm:gap-y-4">
              {SERVICES_LIST.map((service) => {
                const href = getServiceHref(service.slug);
                return (
                  <a
                    key={service.slug}
                    href={href}
                    data-cursor="link"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(href);
                    }}
                    className="group flex items-center justify-between gap-2 py-2.5 border-b border-white/[0.08] text-[14.5px] text-white/80 hover:text-[#F8C311] transition-colors focus-visible:outline-2 focus-visible:outline-[#F8C311]"
                  >
                    <span>{service.navigationLabel}</span>
                    <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-[#F8C311] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          SECTION 04 | CLOSING CTA
         =================================================================== */}
      <section
        data-cursor-theme="yellow"
        className="bg-[#F8C311] text-[#0D0D0D] py-20 sm:py-24 lg:py-32"
      >
        <div ref={closingCtaRef} className="by-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-end">
            <div className="lg:col-span-7">
              <span className="eyebrow-label text-[#0D0D0D]/60 block mb-5">
                START YOUR JOURNEY
              </span>
              <h2 className="font-heading text-[50px] sm:text-[68px] lg:text-[84px] leading-[0.92] tracking-[0.015em] uppercase text-[#0D0D0D]">
                READY TO PUT A CLEAR
                <br />
                PROCESS IN MOTION?
              </h2>
            </div>

            <div className="lg:col-span-5 flex flex-col sm:flex-row lg:justify-end sm:items-center gap-6">
              <BrandButton
                variant="dark"
                size="lg"
                onClick={() => onStartProject()}
              >
                Start a Project
              </BrandButton>

              <a
                href="/work"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/work');
                }}
                className="group inline-flex items-center gap-2 text-[14.5px] font-semibold text-[#0D0D0D] border-b border-[#0D0D0D]/40 hover:border-[#0D0D0D] pb-1 transition-colors whitespace-nowrap shrink-0"
              >
                <span>View Selected Work</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.25]" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
