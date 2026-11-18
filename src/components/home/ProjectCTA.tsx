import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { BrandButton } from '../ui/BrandButton';
import { useGSAPReveal } from '../animations/gsapHooks';

interface ProjectCTAProps {
  onStartProject: () => void;
  onNavigateAbout: () => void;
}

export function ProjectCTA({ onStartProject, onNavigateAbout }: ProjectCTAProps) {
  const bannerRef = useRef<HTMLDivElement | null>(null);

  useGSAPReveal(bannerRef, { y: 22, duration: 0.85, start: 'top 90%' });

  return (
    <section
      id="contact"
      data-cursor-theme="yellow"
      className="bg-[#F8C311] text-[#0D0D0D] py-20 sm:py-24 lg:py-32"
    >
      <div ref={bannerRef} className="by-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-end">
          <div className="lg:col-span-7">
            <h2 className="font-heading text-[50px] sm:text-[68px] lg:text-[84px] leading-[0.92] tracking-[0.015em] uppercase text-[#0D0D0D]">
              HAVE A VISION?
              <br />
              LET&apos;S MAKE IT HAPPEN.
            </h2>

            <p className="text-[16px] sm:text-[17px] leading-[1.6] text-[#0D0D0D]/85 max-w-[520px] mt-5">
              Whether you&apos;re building a new brand, launching a website or
              scaling your digital presence, we&apos;re ready to bring your
              ideas to life.
            </p>
          </div>

          <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col xl:flex-row sm:items-center lg:items-start xl:items-center lg:justify-end gap-6">
            <BrandButton variant="dark" size="lg" onClick={onStartProject}>
              Start Your Project
            </BrandButton>

            <button
              type="button"
              onClick={onNavigateAbout}
              className="group inline-flex items-center gap-2 text-[14.5px] font-semibold text-[#0D0D0D] border-b border-[#0D0D0D]/40 hover:border-[#0D0D0D] pb-1 transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#0D0D0D]"
            >
              <span>About Brand Yatra</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.3] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
