import { useRef } from 'react';
import { ServicePageData } from '../../data/services';
import {
  useGSAPReveal,
  useStaggerReveal,
  useTextReveal,
} from '../animations/gsapHooks';

interface ServiceCapabilitiesProps {
  service: ServicePageData;
}

export function ServiceCapabilities({ service }: ServiceCapabilitiesProps) {
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const introRef = useRef<HTMLParagraphElement | null>(null);
  const rowsRef = useRef<HTMLDivElement | null>(null);

  useTextReveal(headingRef, { stagger: 0.08, duration: 0.82 });
  useGSAPReveal(introRef, { y: 18, duration: 0.75, delay: 0.08 });
  useStaggerReveal(rowsRef, { y: 22, stagger: 0.08, duration: 0.78 });

  return (
    <section
      data-cursor-theme="dark"
      className="bg-[#0D0D0D] text-white by-section-spacing border-t border-white/[0.08]"
    >
      <div className="by-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-16 lg:mb-24">
          <div className="lg:col-span-7">
            <span className="eyebrow-label text-[#A8A8A8] block mb-5">
              WHAT WE DELIVER / {service.title.toUpperCase()}
            </span>

            <h2 ref={headingRef} className="heading-section text-white">
              <span className="block overflow-hidden py-[0.03em] -my-[0.02em]">
                <span data-reveal-line className="block">
                  {service.capabilitiesHeading[0]}
                </span>
              </span>
              <span className="block overflow-hidden py-[0.03em] -my-[0.02em]">
                <span data-reveal-line className="block">
                  <span className="text-[#F8C311]">{service.capabilitiesHeading[1]}</span>
                </span>
              </span>
            </h2>
          </div>

          <div className="lg:col-span-5">
            <p
              ref={introRef}
              className="text-[16px] leading-[1.62] text-[#A8A8A8] max-w-[460px] lg:ml-auto"
            >
              {service.capabilitiesIntro}
            </p>
          </div>
        </div>

        {/* Clean Unboxed Editorial Capability Rows (Zero Generic Icon Cards) */}
        <div ref={rowsRef} className="border-t border-white/[0.1]">
          {service.capabilities.map((cap) => (
            <div
              key={cap.number}
              data-stagger-item
              className="group relative border-b border-white/[0.1] py-8 sm:py-10 lg:py-11 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-baseline"
            >
              <div className="md:col-span-2 flex items-baseline gap-2">
                <span className="font-heading text-[40px] sm:text-[50px] leading-none tracking-[0.02em] text-white/30 group-hover:text-[#F8C311] transition-colors duration-300 tabular-nums">
                  {cap.number}
                </span>
                <span className="text-white/25 text-lg font-light" aria-hidden="true">
                  /
                </span>
              </div>

              <div className="md:col-span-4 transition-transform duration-300 ease-out group-hover:translate-x-2">
                <h3 className="font-heading text-[28px] sm:text-[34px] leading-[1.03] tracking-[0.02em] text-white">
                  {cap.title}
                </h3>
              </div>

              <div className="md:col-span-6 transition-transform duration-300 ease-out group-hover:translate-x-1">
                <p className="text-[16px] leading-[1.62] text-[#A8A8A8] max-w-[540px]">
                  {cap.description}
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
  );
}
