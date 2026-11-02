import React from 'react';
import {
  Compass,
  TrendingUp,
  Search,
  Target,
  Share2,
  Layers,
  Monitor,
  PenTool,
  ArrowUpRight
} from 'lucide-react';
import { SERVICES_LIST, ServiceItem } from '../data/agencyData';
import { BtnShape } from './BtnShape';
import { WordRevealHeading } from './WordRevealHeading';

interface ServicesSectionProps {
  onSelectService: (service: ServiceItem) => void;
  onOpenConsultation: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectService,
  onOpenConsultation,
}) => {
  const getIcon = (iconName: string) => {
    const props = { className: 'w-5 h-5 text-[#F8C311] stroke-[2]' };
    switch (iconName) {
      case 'compass':
        return <Compass {...props} />;
      case 'trending-up':
        return <TrendingUp {...props} />;
      case 'search':
        return <Search {...props} />;
      case 'target':
        return <Target {...props} />;
      case 'share-2':
        return <Share2 {...props} />;
      case 'layers':
        return <Layers {...props} />;
      case 'monitor':
        return <Monitor {...props} />;
      case 'pen-tool':
        return <PenTool {...props} />;
      default:
        return <Target {...props} />;
    }
  };

  return (
    <section id="services" className="py-16 sm:py-24 lg:py-32 bg-[#FFFFFF] border-t border-[#E5E9ED] relative text-[#17212B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:items-end gap-6 lg:gap-10 mb-10 sm:mb-14 pb-8 sm:pb-10 border-b border-[#E5E9ED]">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-2 text-clamp-label font-['Manrope',sans-serif] tracking-widest text-[#F8C311] uppercase font-semibold mb-3">
              <span>Core Services</span>
              <span aria-hidden="true">·</span>
              <span>Growth Capabilities</span>
            </div>
            <WordRevealHeading
              as="h2"
              className="font-['Marcellus',serif] text-clamp-heading text-[#0E2234] font-normal tracking-tight leading-tight"
            >
              Discover Our <span className="text-[#F8C311]">Capabilities.</span>
            </WordRevealHeading>
          </div>

          <div className="lg:col-span-4 flex items-end justify-between gap-5">
            <p className="font-['Inter',sans-serif] text-clamp-body-sm text-[#66717D] leading-relaxed max-w-sm">
              Brand strategy, identity, websites and digital growth—built to work together.
            </p>
            <button
              onClick={onOpenConsultation}
              className="group relative w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-[#F8C311] hover:bg-[#e6b30c] text-[#0E2234] transition-all duration-300 flex flex-col items-center justify-center p-2 shadow-lg shadow-[#F8C311]/20 hover:-translate-y-1 active:translate-y-0 cursor-pointer shrink-0"
              aria-label="Let's Talk - Open Consultation Form"
            >
              <span className="font-['Marcellus',serif] text-[11px] sm:text-xs tracking-wider uppercase text-[#0E2234] leading-tight text-center font-bold">
                Let's
                <br />
                Talk
              </span>
              <ArrowUpRight className="w-4 h-4 text-[#0E2234] stroke-[2.8] mt-0.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Two-column service index */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 lg:gap-x-16">
          {SERVICES_LIST.map((service, index) => (
            <div
              key={service.id}
              className="group relative border-t border-[#E5E9ED] hover:border-[#F8C311] py-6 sm:py-7 transition-colors duration-300"
            >
              <div className="grid grid-cols-[2.5rem_minmax(0,1fr)] sm:grid-cols-[3rem_minmax(0,1fr)] gap-x-3 sm:gap-x-4">
                <span className="font-mono text-sm sm:text-base font-medium tracking-wide text-[#66717D] pt-0.5 tabular-nums">
                  {String(index + 1).padStart(2, '0')}
                </span>

                <div>
                  <div className="flex items-center justify-between gap-4 mb-3">
                    <span className="font-['Manrope',sans-serif] text-[10px] sm:text-[11px] uppercase tracking-[0.14em] font-bold text-[#66717D]">
                      {service.category}
                    </span>
                    <span className="shrink-0">{getIcon(service.icon)}</span>
                  </div>

                  <h3 className="font-['Marcellus',serif] text-lg sm:text-xl font-normal text-[#0E2234] mb-2.5 group-hover:text-[#66717D] transition-colors leading-snug">
                    {service.title}
                  </h3>

                  <p className="font-['Inter',sans-serif] text-clamp-body-sm text-[#66717D] leading-relaxed mb-5 max-w-xl">
                    {service.shortDesc}
                  </p>

                  <button
                    onClick={() => onSelectService(service)}
                    aria-label={`Explore details for ${service.title}`}
                    className="group/btn relative inline-flex min-w-[190px] items-center justify-between text-[#0E2234] group-hover/btn:text-[#0E2234] font-['Inter',sans-serif] text-[11px] font-extrabold uppercase tracking-wider py-3 px-4 rounded-lg transition-all duration-200 cursor-pointer"
                  >
                    <BtnShape fill="#E5E9ED" className="group-hover/btn:fill-[#F8C311] transition-colors" />
                    <span className="relative z-10">Explore Service</span>
                    <ArrowUpRight className="relative z-10 w-3.5 h-3.5 stroke-[2.5] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
