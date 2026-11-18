import { useRef } from 'react';
import { ServicePageData } from '../../data/services';
import { ResilientImage } from '../ui/ResilientImage';
import {
  useGSAPReveal,
  useParallax,
  useStaggerReveal,
  useTextReveal,
} from '../animations/gsapHooks';

interface ServiceOverviewProps {
  service: ServicePageData;
}

export function ServiceOverview({ service }: ServiceOverviewProps) {
  const imageWrapRef = useRef<HTMLDivElement | null>(null);
  const imageParallaxRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const copyRef = useRef<HTMLDivElement | null>(null);

  useGSAPReveal(imageWrapRef, { clipReveal: true, start: 'top 84%' });
  useParallax(imageParallaxRef, { yPercent: -5 });
  useTextReveal(headingRef, { stagger: 0.08, duration: 0.82 });
  useStaggerReveal(copyRef, { y: 18, stagger: 0.09, duration: 0.78 });

  return (
    <section
      id="service-overview"
      data-cursor-theme="light"
      className="bg-[#F6F5F2] text-[#0D0D0D] by-section-spacing"
    >
      <div className="by-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left Editorial Photograph */}
          <div className="lg:col-span-5">
            <div
              ref={imageWrapRef}
              className="relative aspect-[4/4.3] w-full overflow-hidden bg-[#E5E3DD]"
            >
              <div
                ref={imageParallaxRef}
                className="absolute -inset-y-7 inset-x-0 will-change-transform"
              >
                <ResilientImage
                  src={service.overviewImage}
                  alt={service.overviewImageAlt}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right Split Editorial Overview Copy */}
          <div className="lg:col-span-7">
            <span className="eyebrow-label text-[#0D0D0D]/60 block mb-5">
              {service.overviewEyebrow}
            </span>

            <h2 ref={headingRef} className="heading-section text-[#0D0D0D]">
              <span className="block overflow-hidden py-[0.03em] -my-[0.02em]">
                <span data-reveal-line className="block">
                  {service.overviewHeading[0]}
                </span>
              </span>
              <span className="block overflow-hidden py-[0.03em] -my-[0.02em]">
                <span data-reveal-line className="block text-[#0D0D0D]/75">
                  {service.overviewHeading[1]}
                </span>
              </span>
            </h2>

            <div
              ref={copyRef}
              className="mt-8 space-y-5 text-[16px] leading-[1.66] text-[#0D0D0D]/75 max-w-[600px]"
            >
              {service.overviewDescription.map((paragraph, idx) => (
                <p
                  key={idx}
                  data-stagger-item
                  className={idx === 0 ? 'text-[#0D0D0D] font-medium' : ''}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
