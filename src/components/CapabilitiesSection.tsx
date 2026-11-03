import React from 'react';
import { CAPABILITY_TAGS } from '../data/agencyData';
import {
  ArrowUpRight,
  BarChart3,
  Globe2,
  Megaphone,
  Palette,
  Search,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  WandSparkles,
  MousePointerClick,
} from 'lucide-react';
import { WordRevealHeading } from './WordRevealHeading';

const CAPABILITY_VISUALS = [
  { icon: Megaphone },
  { icon: Target },
  { icon: Search },
  { icon: BarChart3 },
  { icon: WandSparkles },
  { icon: Sparkles },
  { icon: TrendingUp },
  { icon: Users },
  { icon: ShoppingBag },
  { icon: MousePointerClick },
  { icon: Palette },
  { icon: Smartphone },
  { icon: Globe2 },
];

interface CapabilitiesSectionProps {
  onOpenConsultation: (serviceName: string) => void;
}

export const CapabilitiesSection: React.FC<CapabilitiesSectionProps> = ({ onOpenConsultation }) => {

  return (
    <section id="capabilities" className="relative overflow-hidden bg-[var(--color-soft-grey)] py-16 text-[var(--color-dark-text)] sm:py-20 lg:py-24">
      <div className="site-gutter relative z-10">
        
        {/* Section Header */}
        <div className="mb-10 flex flex-col gap-6 border-b border-[var(--color-border)] pb-8 sm:mb-12 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
          <div>
            <div className="mb-3 flex items-center gap-2 font-['Manrope',sans-serif] text-clamp-label font-semibold uppercase tracking-widest text-[var(--color-navy)]">
              <span>Capabilities</span>
              <span aria-hidden="true">·</span>
              <span>Full-Spectrum Brand Growth</span>
            </div>
            <WordRevealHeading
              as="h2"
              className="font-['Marcellus',serif] text-clamp-heading font-normal leading-tight tracking-tight text-[var(--color-dark-text)]"
            >
              Get Found. Get Chosen. <span className="text-[var(--color-navy)]">Grow Faster.</span>
            </WordRevealHeading>
          </div>
          <p className="max-w-md font-['Inter',sans-serif] text-clamp-body-sm leading-relaxed text-[var(--color-muted-slate)]">
            We unite visual identity, search intent dominance, and performance acquisition into one high-converting commercial engine.
          </p>
        </div>

        <div className="mb-10 grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3 xl:gap-6">
          {CAPABILITY_TAGS.map((item, index) => {
            const visual = CAPABILITY_VISUALS[index] ?? CAPABILITY_VISUALS[0];
            const Icon = visual.icon;

            return (
              <article
                key={item.id}
                className="group relative isolate flex min-h-[260px] flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white p-5 text-[var(--color-dark-text)] shadow-[0_8px_24px_rgba(14,34,52,0.045)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-primary)]/70 hover:shadow-[0_18px_38px_rgba(14,34,52,0.10)] sm:p-6"
              >
                <div className="relative z-10 flex items-center justify-between">
                  <span className="font-mono text-[10px] font-semibold tracking-[0.16em] text-[var(--color-muted-slate)]">
                    0{index + 1}
                  </span>
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-soft-grey)] text-[var(--color-navy)] transition-colors duration-300 group-hover:bg-[var(--color-primary)]/20">
                  <Icon
                    aria-hidden="true"
                    className="h-5 w-5"
                    strokeWidth={1.8}
                  />
                  </span>
                </div>
                <h3 className="relative z-10 mt-5 max-w-[18rem] font-['Manrope',sans-serif] text-lg font-bold leading-snug sm:text-xl">
                  {item.name}
                </h3>
                <p className="relative z-10 mt-2 max-w-[21rem] font-['Inter',sans-serif] text-sm leading-relaxed text-[var(--color-muted-slate)]">
                  {item.desc}
                </p>
                <button
                  type="button"
                  aria-label={`Discuss ${item.name}`}
                  onClick={() => onOpenConsultation(item.name)}
                  className="group/action relative z-10 mt-auto inline-flex w-fit items-center gap-2 pt-5 font-['Manrope',sans-serif] text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--color-navy)]"
                >
                  <span>Discuss this capability</span>
                  <ArrowUpRight aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover/action:translate-x-0.5 group-hover/action:-translate-y-0.5" />
                </button>
                <svg
                  viewBox="0 0 180 110"
                  className="pointer-events-none absolute -bottom-1 right-0 z-0 h-[96px] w-[150px] opacity-[0.12] transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                  style={{ color: '#0E2234' }}
                  fill="none"
                  aria-hidden="true"
                >
                  <defs>
                    <pattern id={`capability-lines-${item.id}`} width="8" height="8" patternTransform="rotate(35)" patternUnits="userSpaceOnUse">
                      <path d="M0 0V8" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.5" />
                    </pattern>
                  </defs>
                  <rect x="72" y="18" width="72" height="50" rx="2" fill="currentColor" fillOpacity="0.65" />
                  <rect x="72" y="18" width="72" height="50" rx="2" fill={`url(#capability-lines-${item.id})`} />
                  <circle cx="128" cy="73" r="27" fill="currentColor" fillOpacity="0.7" />
                  <circle cx="128" cy="73" r="27" fill={`url(#capability-lines-${item.id})`} />
                  <path d="M42 54H91V103H42C28.5 103 18 92.5 18 79S28.5 54 42 54Z" fill="currentColor" fillOpacity="0.6" />
                  <path d="M42 54H91V103H42C28.5 103 18 92.5 18 79S28.5 54 42 54Z" fill={`url(#capability-lines-${item.id})`} />
                  <circle cx="78" cy="29" r="12" fill="white" fillOpacity="0.88" />
                </svg>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
};
