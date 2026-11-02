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
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16 pb-8 border-b border-[#E5E9ED]">
          <div>
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

          <button
            onClick={onOpenConsultation}
            className="group relative w-18 h-18 sm:w-24 sm:h-24 rounded-full bg-[#F8C311] hover:bg-[#e6b30c] text-[#0E2234] transition-all duration-300 flex flex-col items-center justify-center p-2 shadow-lg shadow-[#F8C311]/20 hover:-translate-y-1 active:translate-y-0 cursor-pointer shrink-0 self-start sm:self-auto"
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

        {/* 8 Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-7">
          {SERVICES_LIST.map((service, index) => (
            <div
              key={service.id}
              className="group relative border-t border-[#E5E9ED] hover:border-[#F8C311] py-5 sm:py-6 transition-colors duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="font-mono text-xs font-semibold tracking-wider text-[#66717D]">
                    0{index + 1}
                  </span>
                  {getIcon(service.icon)}
                </div>

                <h3 className="font-['Marcellus',serif] text-lg sm:text-xl font-normal text-[#0E2234] mb-2.5 group-hover:text-[#66717D] transition-colors leading-snug">
                  {service.title}
                </h3>

                <p className="font-['Inter',sans-serif] text-clamp-body-sm text-[#66717D] leading-relaxed mb-5">
                  {service.shortDesc}
                </p>
              </div>

              <div className="relative z-10 pt-2 border-t border-[#E5E9ED]">
                <button
                  onClick={() => onSelectService(service)}
                  aria-label={`Explore details for ${service.title}`}
                  className="group/btn relative w-full flex items-center justify-between text-[#0E2234] group-hover/btn:text-[#0E2234] font-['Inter',sans-serif] text-[11px] font-extrabold uppercase tracking-wider py-3 px-4 rounded-lg transition-all duration-200 cursor-pointer"
                >
                  <BtnShape fill="#E5E9ED" className="group-hover/btn:fill-[#F8C311] transition-colors" />
                  <span className="relative z-10">Explore Service</span>
                  <ArrowUpRight className="relative z-10 w-3.5 h-3.5 stroke-[2.5] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
