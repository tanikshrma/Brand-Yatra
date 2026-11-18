import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ServicePageData } from '../../data/services';
import { useGSAPReveal, useTextReveal } from '../animations/gsapHooks';

gsap.registerPlugin(ScrollTrigger);

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

interface ServiceApproachProps {
  service: ServicePageData;
}

export function ServiceApproach({ service }: ServiceApproachProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const introRef = useRef<HTMLParagraphElement | null>(null);
  const desktopTimelineRef = useRef<HTMLDivElement | null>(null);
  const desktopLineRef = useRef<HTMLDivElement | null>(null);
  const mobileTimelineRef = useRef<HTMLDivElement | null>(null);
  const mobileLineRef = useRef<HTMLDivElement | null>(null);

  useTextReveal(headingRef, { stagger: 0.08, duration: 0.82 });
  useGSAPReveal(introRef, { y: 18, duration: 0.75, delay: 0.08 });

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
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

        const nums = desktopTimelineRef.current.querySelectorAll('[data-srv-stage-num]');
        const bodies = desktopTimelineRef.current.querySelectorAll('[data-srv-stage-body]');

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

        if (bodies.length) {
          gsap.fromTo(
            bodies,
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

        const mobileItems = mobileTimelineRef.current.querySelectorAll('[data-srv-mobile-stage]');
        if (mobileItems.length) {
          gsap.fromTo(
            mobileItems,
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
  }, [service.slug]);

  return (
    <section
      ref={sectionRef}
      data-cursor-theme="dark"
      className="bg-[#171717] text-white by-section-spacing border-t border-white/[0.08]"
    >
      <div className="by-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          <div className="lg:col-span-7">
            <span className="eyebrow-label text-[#A8A8A8] block mb-5">
              OUR APPROACH / WORKFLOW
            </span>

            <h2 ref={headingRef} className="heading-section text-white">
              <span className="block overflow-hidden py-[0.03em] -my-[0.02em]">
                <span data-reveal-line className="block">
                  {service.approachHeading[0]}
                </span>
              </span>
              <span className="block overflow-hidden py-[0.03em] -my-[0.02em]">
                <span data-reveal-line className="block text-white/85">
                  {service.approachHeading[1]}
                </span>
              </span>
            </h2>
          </div>

          <div className="lg:col-span-5">
            <p
              ref={introRef}
              className="text-[16px] leading-[1.62] text-[#A8A8A8] max-w-[450px] lg:ml-auto"
            >
              {service.approachIntro}
            </p>
          </div>
        </div>

        {/* Desktop 4-Stage Horizontal Timeline */}
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
            {service.approach.map((stage) => (
              <div key={stage.number} className="relative">
                <span
                  className="block w-2 h-2 bg-[#F8C311] -mt-[52px] mb-10"
                  aria-hidden="true"
                />

                <div
                  data-srv-stage-num
                  className="font-heading text-[48px] lg:text-[58px] leading-none tracking-[0.02em] text-[#F8C311] tabular-nums"
                >
                  {stage.number}
                </div>

                <div data-srv-stage-body className="mt-4">
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

        {/* Mobile 4-Stage Vertical Timeline */}
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
            {service.approach.map((stage) => (
              <div key={stage.number} data-srv-mobile-stage className="relative">
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
  );
}
