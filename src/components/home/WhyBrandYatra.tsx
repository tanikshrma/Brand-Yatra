import { useRef } from 'react';
import { BRAND_IMAGES } from '../../data/images';
import { WHY_BENEFITS } from '../../data/site';
import { ResilientImage } from '../ui/ResilientImage';
import {
  useGSAPReveal,
  useParallax,
  useStaggerReveal,
  useTextReveal,
} from '../animations/gsapHooks';

export function WhyBrandYatra() {
  const imageParallaxRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const introRef = useRef<HTMLParagraphElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  useParallax(imageParallaxRef, { yPercent: -6 });
  useTextReveal(headingRef, { stagger: 0.08, duration: 0.8 });
  useGSAPReveal(introRef, { y: 18, duration: 0.75, delay: 0.08 });
  useStaggerReveal(listRef, { y: 20, stagger: 0.08, duration: 0.75 });

  return (
    <section
      id="why-brand-yatra"
      data-cursor-theme="dark"
      className="bg-[#0D0D0D] text-white border-t border-white/[0.06]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left 50%: Preserved Studio Yellow Chair Photograph */}
        <div className="relative min-h-[400px] sm:min-h-[500px] lg:min-h-[780px] overflow-hidden bg-[#191919]">
          <div
            ref={imageParallaxRef}
            className="absolute -inset-y-8 inset-x-0"
          >
            <ResilientImage
              src={BRAND_IMAGES.home.advantageStudioChair}
              alt="Modern architectural creative studio bathed in natural sunlight featuring a sculptural yellow armchair"
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div
            className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/45 via-transparent to-transparent lg:bg-none pointer-events-none"
            aria-hidden="true"
          />
        </div>

        {/* Right 50%: Editorial Heading & Interactive Hover-Underline Value Rows */}
        <div className="flex items-center px-5 sm:px-9 lg:px-16 xl:px-24 py-20 lg:py-32">
          <div className="w-full max-w-[560px]">
            <span className="eyebrow-label text-[#A8A8A8] block mb-5">
              THE BRAND YATRA ADVANTAGE
            </span>

            <h2 ref={headingRef} className="heading-section text-white">
              <span className="block overflow-hidden py-[0.03em] -my-[0.02em]">
                <span data-reveal-line className="block">
                  Not just an agency.
                </span>
              </span>
              <span className="block overflow-hidden py-[0.03em] -my-[0.02em]">
                <span data-reveal-line className="block">
                  Your creative <span className="text-[#F8C311]">growth partner.</span>
                </span>
              </span>
            </h2>

            <p
              ref={introRef}
              className="text-[16px] leading-[1.62] text-[#A8A8A8] mt-6"
            >
              We combine strategic clarity, design precision and digital
              performance to build brands that earn attention and sustain growth.
            </p>

            <div
              ref={listRef}
              className="mt-12 border-t border-white/[0.1]"
            >
              {WHY_BENEFITS.map((benefit) => (
                <div
                  key={benefit.id}
                  data-stagger-item
                  className="group relative border-b border-white/[0.1] py-6 sm:py-7 flex items-baseline gap-5 sm:gap-7"
                >
                  <span className="font-heading text-[34px] sm:text-[40px] leading-none tracking-[0.02em] text-white/30 group-hover:text-[#F8C311] transition-colors duration-300 tabular-nums shrink-0">
                    {benefit.number}
                  </span>

                  <div className="transition-transform duration-300 ease-out group-hover:translate-x-1.5">
                    <h3 className="font-heading text-[26px] sm:text-[30px] tracking-[0.02em] text-white leading-[1.04]">
                      {benefit.title}
                    </h3>
                    <p className="text-[15.5px] leading-[1.6] text-[#A8A8A8] mt-1.5">
                      {benefit.description}
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
        </div>
      </div>
    </section>
  );
}
