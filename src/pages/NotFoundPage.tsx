import { ArrowUpRight } from 'lucide-react';
import { AppRoute, SERVICES_LIST, getServiceHref } from '../data/services';
import { BrandButton } from '../components/ui/BrandButton';

interface NotFoundPageProps {
  onNavigate: (path: AppRoute, hash?: string) => void;
}

export function NotFoundPage({ onNavigate }: NotFoundPageProps) {
  return (
    <section
      data-cursor-theme="dark"
      className="bg-[#0D0D0D] text-white pt-36 sm:pt-44 pb-24 lg:pb-32 min-h-[75vh] flex flex-col justify-between"
    >
      <div className="by-container">
        <span className="eyebrow-label text-[#A8A8A8] block mb-5">
          404 / PAGE NOT FOUND
        </span>

        <h1 className="font-heading text-[56px] sm:text-[80px] lg:text-[106px] leading-[0.91] tracking-[0.012em] uppercase text-white max-w-[920px]">
          THIS ROUTE DOES NOT <span className="text-[#F8C311]">EXIST.</span>
        </h1>

        <p className="text-[16px] sm:text-[17px] leading-[1.64] text-[#A8A8A8] max-w-[540px] mt-6">
          The page or service URL you requested could not be found. Return to the Brand Yatra
          homepage or explore one of our dedicated capabilities below.
        </p>

        <div className="mt-9">
          <BrandButton variant="gold" size="md" onClick={() => onNavigate('/')}>
            Return to Homepage
          </BrandButton>
        </div>

        <div className="mt-16 pt-10 border-t border-white/[0.1]">
          <span className="eyebrow-label text-[#A8A8A8] block mb-6">
            DEDICATED SERVICES
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
                  className="group flex items-center justify-between gap-2 py-2 border-b border-white/[0.08] text-[14.5px] text-white/80 hover:text-[#F8C311] transition-colors focus-visible:outline-2 focus-visible:outline-[#F8C311]"
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
  );
}
