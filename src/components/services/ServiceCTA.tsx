import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { AppRoute, ServicePageData } from '../../data/services';
import { BrandButton } from '../ui/BrandButton';
import { useGSAPReveal } from '../animations/gsapHooks';

interface ServiceCTAProps {
  service: ServicePageData;
  onStartProject: (serviceTitle: string) => void;
  onNavigate: (path: AppRoute, hash?: string) => void;
}

export function ServiceCTA({
  service,
  onStartProject,
  onNavigate,
}: ServiceCTAProps) {
  const ctaRef = useRef<HTMLDivElement | null>(null);

  useGSAPReveal(ctaRef, { y: 22, duration: 0.82, start: 'top 88%' });

  return (
    <section
      data-cursor-theme="yellow"
      className="bg-[#F8C311] text-[#0D0D0D] py-20 sm:py-24 lg:py-32"
    >
      <div ref={ctaRef} className="by-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-end">
          <div className="lg:col-span-7">
            <h2 className="font-heading text-[50px] sm:text-[68px] lg:text-[84px] leading-[0.92] tracking-[0.015em] uppercase text-[#0D0D0D]">
              {service.ctaHeading[0]}
              <br />
              {service.ctaHeading[1]}
            </h2>

            <p className="text-[16px] sm:text-[17px] leading-[1.6] text-[#0D0D0D]/85 max-w-[520px] mt-5">
              {service.ctaDescription}
            </p>
          </div>

          <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col xl:flex-row sm:items-center lg:items-start xl:items-center lg:justify-end gap-6">
            <BrandButton
              variant="dark"
              size="lg"
              onClick={() => onStartProject(service.title)}
            >
              {service.ctaText}
            </BrandButton>

            <button
              type="button"
              onClick={() => onNavigate('/work')}
              className="group inline-flex items-center gap-2 text-[14.5px] font-semibold text-[#0D0D0D] border-b border-[#0D0D0D]/40 hover:border-[#0D0D0D] pb-1 transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#0D0D0D]"
            >
              <span>Explore Selected Work</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.3] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
