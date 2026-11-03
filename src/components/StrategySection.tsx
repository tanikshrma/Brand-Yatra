import React from 'react';
import { ArrowUpRight, Sparkle } from 'lucide-react';
import { STRATEGY_CARDS } from '../data/agencyData';
import { BtnShape } from './BtnShape';
import { WordRevealHeading } from './WordRevealHeading';

interface StrategySectionProps {
  onOpenConsultation: () => void;
}

export const StrategySection: React.FC<StrategySectionProps> = ({ onOpenConsultation }) => {
  return (
    <section id="strategy" className="relative overflow-hidden bg-[var(--color-soft-grey)] py-16 text-[var(--color-dark-text)] sm:py-20 lg:py-24">
      <div className="site-gutter">
        <div className="mb-9 flex items-center gap-2 font-['Manrope',sans-serif] text-clamp-label font-bold uppercase tracking-widest text-[var(--color-muted-slate)]">
          <span className="h-2 w-2 rounded-full bg-[var(--color-primary)]" aria-hidden="true" />
          <span>Integrated Growth Model</span>
        </div>

        <div className="mb-10 grid grid-cols-1 items-end gap-6 sm:mb-12 lg:grid-cols-12 lg:gap-10">
          <WordRevealHeading
            as="h2"
            className="font-['Marcellus',serif] text-[clamp(2rem,4.4vw,4.2rem)] font-normal leading-[1.06] tracking-tight text-[var(--color-navy)] lg:col-span-9"
          >
            One Strategy Across Search, Paid Media &amp; <span className="text-[var(--color-muted-slate)]">Brand Authority.</span>
          </WordRevealHeading>
          <p className="font-['Inter',sans-serif] text-clamp-body-sm leading-relaxed text-[var(--color-muted-slate)] lg:col-span-3">
            Connect search intent, paid acquisition, social engagement, and high-converting storytelling through one dedicated agency partner focused on pipeline revenue.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 lg:gap-x-8 lg:gap-y-8">
          {STRATEGY_CARDS.map((card, index) => (
            <article
              key={card.id}
              className={`relative flex min-h-[340px] flex-col border-t-2 px-1 py-6 text-left sm:min-h-[370px] ${
                card.isDark
                  ? 'border-[var(--color-primary)] bg-[var(--color-navy)] px-5 text-[var(--color-white)] sm:px-6'
                  : 'border-[var(--color-navy)]/20 text-[var(--color-dark-text)]'
              }`}
            >
              <span className={`mb-7 inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-2 font-['Inter',sans-serif] text-[10px] font-medium leading-none ${
                card.isDark
                  ? 'border-white/75 text-[var(--color-white)]'
                  : 'border-sky-100 bg-[var(--color-soft-grey)] text-[var(--color-dark-text)]'
              }`}>
                <Sparkle aria-hidden="true" className="h-3 w-3 fill-current" />
                {index === 0 ? 'Contact Us' : index === 1 ? 'Discuss Your Needs' : index === 2 ? 'Get a Customized Plan' : 'Grow Your Business'}
              </span>

              <div className="flex flex-1 flex-col">
                <span className={`mb-2 font-['Manrope',sans-serif] text-[10px] font-bold uppercase tracking-[0.14em] ${
                  card.isDark ? 'text-white/60' : 'text-[var(--color-muted-slate)]'
                }`}>
                  {card.label}
                </span>
                <h3 className="font-['Marcellus',serif] text-[clamp(1.3rem,1.8vw,1.65rem)] font-normal leading-[1.13] tracking-tight">
                  {card.headline}
                </h3>
                <p className={`mt-3 font-['Inter',sans-serif] text-xs leading-relaxed ${
                  card.isDark ? 'text-white/70' : 'text-[var(--color-muted-slate)]'
                }`}>
                  {card.body}
                </p>
                <ul className={`mt-4 space-y-2 border-t pt-4 font-['Inter',sans-serif] text-[11px] leading-relaxed ${
                  card.isDark ? 'border-white/15 text-white/75' : 'border-[var(--color-border)] text-[var(--color-muted-slate)]'
                }`}>
                  {card.points.map((point) => (
                    <li key={point} className="flex gap-2">
                      <span className="text-[var(--color-primary)]" aria-hidden="true">/</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={onOpenConsultation}
                aria-label={`Discuss ${card.label}`}
                className={`group inline-flex h-12 w-14 items-center justify-center rounded-[15px] border transition-colors ${
                  card.isDark
                    ? 'border-[var(--color-primary)] text-[var(--color-white)] hover:bg-[var(--color-primary)] hover:text-[var(--color-navy)]'
                    : 'border-[var(--color-dark-text)] text-[var(--color-dark-text)] hover:bg-[var(--color-dark-text)] hover:text-[var(--color-white)]'
                }`}
              >
                <ArrowUpRight aria-hidden="true" className="h-6 w-6 stroke-[1.5] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-5 rounded-xl bg-[var(--color-navy)] p-5 text-[var(--color-white)] sm:flex-row sm:items-center sm:p-7">
          <div>
            <div className="font-['Marcellus',serif] text-lg font-bold sm:text-xl">
              Ready to transform your acquisition unit economics?
            </div>
            <p className="mt-1 max-w-2xl font-['Inter',sans-serif] text-clamp-body-sm leading-relaxed text-white/65">
              Our team audits your current campaign data and builds a custom roadmap.
            </p>
          </div>
          <button
            onClick={onOpenConsultation}
            aria-label="Start Your Audit - Open Consultation Modal"
            className="group relative inline-flex shrink-0 items-center justify-center gap-2 px-6 py-3.5 font-['Inter',sans-serif] text-xs font-extrabold uppercase tracking-wider text-[var(--color-navy)]"
          >
            <BtnShape fill="#F8C311" />
            <span className="relative z-10">Start Your Audit</span>
            <ArrowUpRight className="relative z-10 h-4 w-4 stroke-[2.8]" />
          </button>
        </div>
      </div>
    </section>
  );
};
