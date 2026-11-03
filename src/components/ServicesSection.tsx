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
    const props = { className: 'w-5 h-5 text-[var(--color-navy)] stroke-[2]' };
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
    <section id="services" className="relative bg-[var(--color-soft-grey)] py-16 text-[var(--color-dark-text)] sm:py-24 lg:py-28">
      <div className="site-gutter">
        
        {/* Section Header */}
        <div className="mb-10 grid grid-cols-1 gap-6 border-b border-[var(--color-border)] pb-8 sm:mb-14 sm:pb-10 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-8">
            <div className="mb-3 flex items-center gap-2 font-['Manrope',sans-serif] text-clamp-label font-semibold uppercase tracking-widest text-[var(--color-navy)]">
              <span>Core Services</span>
              <span aria-hidden="true">·</span>
              <span>Growth Capabilities</span>
            </div>
            <WordRevealHeading
              as="h2"
              className="font-['Marcellus',serif] text-clamp-heading font-normal leading-tight tracking-tight text-[var(--color-dark-text)]"
            >
              Discover Our <span className="text-[var(--color-navy)]">Capabilities.</span>
            </WordRevealHeading>
          </div>

          <div className="lg:col-span-4 flex items-end justify-between gap-5">
            <p className="max-w-sm font-['Inter',sans-serif] text-clamp-body-sm leading-relaxed text-[var(--color-muted-slate)]">
              Brand strategy, identity, websites and digital growth—built to work together.
            </p>
            <button
              onClick={onOpenConsultation}
              className="group relative w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-[var(--color-primary)] hover:bg-[var(--color-primary)] text-[var(--color-navy)] transition-all duration-300 flex flex-col items-center justify-center p-2 shadow-lg shadow-[var(--color-primary)]/20 hover:-translate-y-1 active:translate-y-0 cursor-pointer shrink-0"
              aria-label="Let's Talk - Open Consultation Form"
            >
              <span className="font-['Marcellus',serif] text-[11px] sm:text-xs tracking-wider uppercase text-[var(--color-navy)] leading-tight text-center font-bold">
                Let's
                <br />
                Talk
              </span>
              <ArrowUpRight className="w-4 h-4 text-[var(--color-navy)] stroke-[2.8] mt-0.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

        <div className="divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
          {SERVICES_LIST.map((service, index) => (
            <article
              key={service.id}
              className="group grid grid-cols-[auto_1fr] items-start gap-x-4 gap-y-3 py-6 transition-colors duration-300 hover:bg-white/60 sm:grid-cols-[3.5rem_minmax(11rem,0.9fr)_minmax(16rem,1.4fr)_auto] sm:items-center sm:gap-x-6 sm:py-7"
            >
              <span className="row-span-2 flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-white)] text-[var(--color-navy)] sm:row-span-1">
                {getIcon(service.icon)}
              </span>
              <div className="min-w-0">
                <span className="mb-1 block font-mono text-xs font-medium tracking-wide text-[var(--color-primary)]">
                  {String(index + 1).padStart(2, '0')} <span className="px-1 text-[var(--color-muted-slate)]">/</span> {service.category}
                </span>
                <h3 className="font-['Marcellus',serif] text-lg font-normal leading-snug text-[var(--color-dark-text)] transition-colors group-hover:text-[var(--color-navy)] sm:text-xl">
                  {service.title}
                </h3>
              </div>
              <p className="col-start-2 max-w-2xl font-['Inter',sans-serif] text-clamp-body-sm leading-relaxed text-[var(--color-muted-slate)] sm:col-start-auto">
                {service.shortDesc}
              </p>
              <button
                onClick={() => onSelectService(service)}
                aria-label={`Explore details for ${service.title}`}
                className="group/btn relative col-start-2 inline-flex min-w-[160px] items-center justify-between rounded-lg px-4 py-3 font-['Inter',sans-serif] text-[11px] font-extrabold uppercase tracking-wider text-[var(--color-navy)] transition-all duration-200 sm:col-start-auto"
              >
                <BtnShape fill="#F8C311" className="group-hover/btn:fill-white transition-colors" />
                <span className="relative z-10">Explore Service</span>
                <ArrowUpRight className="relative z-10 w-3.5 h-3.5 stroke-[2.5] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </button>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};
