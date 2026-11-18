import { useRef } from 'react';
import { BRAND_IMAGES } from '../../data/images';
import { BrandButton } from '../ui/BrandButton';
import { ResilientImage } from '../ui/ResilientImage';
import {
  useGSAPReveal,
  useParallax,
  useStaggerReveal,
  useTextReveal,
} from '../animations/gsapHooks';

interface AboutProps {
  onNavigateAbout: () => void;
}

export function About({ onNavigateAbout }: AboutProps) {
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
      id="about"
      data-cursor-theme="light"
      className="bg-[#F6F5F2] text-[#0D0D0D] by-section-spacing"
    >
      <div className="by-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left Collaborative Studio Photograph (Matching AboutPage Editorial Craft) */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div
              ref={imageWrapRef}
              className="relative w-full aspect-[4/4.1] overflow-hidden bg-[#E5E3DD]"
            >
              <div
                ref={imageParallaxRef}
                className="absolute -inset-y-7 inset-x-0 will-change-transform"
              >
                <ResilientImage
                  src={BRAND_IMAGES.home.aboutStudio}
                  alt="Brand Yatra modern creative agency studio with black-framed glass partitions and travertine meeting table"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right Editorial Narrative Column */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <span className="eyebrow-label text-[#0D0D0D]/60 block mb-5">
              WHO WE ARE
            </span>

            <h2 ref={headingRef} className="heading-section text-[#0D0D0D]">
              <span className="block overflow-hidden py-[0.03em] -my-[0.02em]">
                <span data-reveal-line className="block">
                  Great brands don&apos;t happen.
                </span>
              </span>
              <span className="block overflow-hidden py-[0.03em] -my-[0.02em]">
                <span data-reveal-line className="block text-[#0D0D0D]/75">
                  They&apos;re built with intention.
                </span>
              </span>
            </h2>

            <div
              ref={copyRef}
              className="mt-8 space-y-5 text-[16px] leading-[1.65] text-[#0D0D0D]/75 max-w-[540px]"
            >
              <p data-stagger-item className="text-[#0D0D0D] font-medium">
                Brand Yatra is a creative digital marketing agency where strategy meets
                imagination, technology meets design, and ambitious ideas become meaningful brand
                experiences.
              </p>

              <p data-stagger-item>
                From distinctive brand identities to high-performing websites and measurable
                campaigns, we bring every stage of your brand&apos;s growth together with clarity
                and purpose.
              </p>

              <div data-stagger-item className="pt-4">
                <BrandButton variant="gold" size="md" onClick={onNavigateAbout}>
                  Discover Our Story
                </BrandButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
