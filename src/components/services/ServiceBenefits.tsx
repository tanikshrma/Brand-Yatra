import { useRef } from 'react';
import { ServicePageData } from '../../data/services';
import {
  useGSAPReveal,
  useStaggerReveal,
  useTextReveal,
} from '../animations/gsapHooks';

interface ServiceBenefitsProps {
  service: ServicePageData;
}

export function ServiceBenefits({ service }: ServiceBenefitsProps) {
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const introRef = useRef<HTMLParagraphElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  useTextReveal(headingRef, { stagger: 0.08, duration: 0.82 });
  useGSAPReveal(introRef, { y: 18, duration: 0.75, delay: 0.08 });
  useStaggerReveal(gridRef, { y: 22, stagger: 0.08, duration: 0.78 });

  return (
    <section
      data-cursor-theme="light"
      className="bg-[#F6F5F2] text-[#0D0D0D] by-section-spacing"
    >
      <div className="by-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-16 lg:mb-24">
          <div className="lg:col-span-7">
            <span className="eyebrow-label text-[#0D0D0D]/60 block mb-5">
              WHY IT MATTERS / PRACTICAL VALUE
            </span>

            <h2 ref={headingRef} className="heading-section text-[#0D0D0D]">
              <span className="block overflow-hidden py-[0.03em] -my-[0.02em]">
                <span data-reveal-line className="block">
                  {service.benefitsHeading[0]}
                </span>
              </span>
              <span className="block overflow-hidden py-[0.03em] -my-[0.02em]">
                <span data-reveal-line className="block text-[#0D0D0D]/75">
                  {service.benefitsHeading[1]}
                </span>
              </span>
            </h2>
          </div>

          <div className="lg:col-span-5">
            <p
              ref={introRef}
              className="text-[16px] leading-[1.62] text-[#0D0D0D]/70 max-w-[460px] lg:ml-auto"
            >
              {service.benefitsIntro}
            </p>
          </div>
        </div>

        {/* Clean Two-Column Editorial Value Architecture */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-20 gap-y-12 lg:gap-y-16"
        >
          {service.benefits.map((benefit) => (
            <div
              key={benefit.number}
              data-stagger-item
              className="border-t border-[#0D0D0D]/15 pt-8 sm:pt-10"
            >
              <span className="text-xs font-semibold tracking-[0.14em] text-[#0D0D0D]/50 tabular-nums block">
                {benefit.number}
              </span>

              <h3 className="font-heading text-[30px] sm:text-[36px] leading-[1.03] tracking-[0.02em] text-[#0D0D0D] mt-4">
                {benefit.title}
              </h3>

              <p className="text-[16px] leading-[1.62] text-[#0D0D0D]/70 mt-3.5 max-w-[500px]">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
