import React, { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { PROCESS_STEPS } from '../data/agencyData';
import { BtnShape } from './BtnShape';
import { WordRevealHeading } from './WordRevealHeading';

interface ProcessSectionProps {
  onOpenConsultation: () => void;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ onOpenConsultation }) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll<HTMLElement>('[data-process-card]');
    if (!cards?.length) return;

    const revealAll = () => cards.forEach((card) => card.setAttribute('data-revealed', 'true'));
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      revealAll();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.setAttribute('data-revealed', 'true');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="process" className="relative overflow-hidden bg-[var(--color-soft-grey)] py-14 text-[var(--color-dark-text)] sm:py-18 lg:py-20">
      <div className="site-gutter">
        <div className="mb-10 flex flex-col gap-3 border-b border-[var(--color-border)] pb-7 sm:mb-12">
          <div>
            <div className="mb-3 flex items-center gap-2 font-['Manrope',sans-serif] text-clamp-label font-semibold uppercase tracking-widest text-[var(--color-navy)]">
              <span>Methodology &amp; Execution</span>
            </div>
            <WordRevealHeading
              as="h2"
              className="font-['Marcellus',serif] text-clamp-heading font-normal leading-tight tracking-tight text-[var(--color-dark-text)]"
            >
              Our Proven <span className="text-[var(--color-muted-slate)]">Process.</span>
            </WordRevealHeading>
          </div>
          <p className="max-w-2xl font-['Inter',sans-serif] text-clamp-body-sm leading-relaxed text-[var(--color-muted-slate)]">
            Five clear stages take your brand from discovery to sustained growth.
          </p>
        </div>

        <div className="relative py-3 md:py-8">
          <svg
            className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
            viewBox="0 0 1000 1000"
            preserveAspectRatio="none"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M750 30 C750 105 250 105 250 230 S750 305 750 430 S250 505 250 630 S750 705 750 830 S750 905 750 970"
              stroke="var(--color-muted-slate)"
              strokeOpacity="0.35"
              strokeWidth="2"
              strokeDasharray="5 10"
            />
          </svg>
          {PROCESS_STEPS.map((step, index) => (
            <div
              key={step.step}
              data-process-card
              data-revealed="false"
              style={{ transitionDelay: `${Math.min(index, 3) * 90}ms` }}
              className={`relative z-10 flex min-h-0 translate-y-8 items-center py-4 opacity-0 transition-[opacity,translate] duration-700 ease-out data-[revealed=true]:translate-y-0 data-[revealed=true]:opacity-100 motion-reduce:translate-y-0 motion-reduce:opacity-100 md:min-h-[205px] md:py-2 ${
                index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'
              }`}
            >
              <article
                className={`relative w-full rounded-[1.4rem] border border-[var(--color-border)] bg-white px-5 pb-6 pt-8 shadow-[0_16px_30px_rgba(14,34,52,0.12)] transition-transform duration-300 hover:-translate-y-1 sm:px-6 sm:pb-7 md:max-w-[390px] ${
                  index % 2 === 0 ? 'md:-rotate-3' : 'md:rotate-3'
                }`}
              >
                <span className="absolute left-1/2 top-0 flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--color-border)] bg-white shadow-[0_3px_8px_rgba(14,34,52,0.16)]">
                  <span className="h-3 w-3 rounded-full bg-[var(--color-navy)] shadow-inner" />
                </span>
                <div className="mb-3 font-mono text-xs font-semibold tracking-wide text-[var(--color-muted-slate)]">
                  {step.step}
                </div>
                <h3 className="font-['Marcellus',serif] text-xl font-normal leading-snug text-[var(--color-dark-text)] sm:text-2xl">
                  {step.stage}
                </h3>
                <p className="mt-2 font-['Inter',sans-serif] text-clamp-body-sm leading-relaxed text-[var(--color-muted-slate)]">
                  {step.description}
                </p>
              </article>
            </div>
          ))}
        </div>

        <div className="mt-9 flex flex-col items-start justify-between gap-4 border-t border-[var(--color-border)] pt-6 sm:flex-row sm:items-center">
          <div>
            <div className="font-['Marcellus',serif] text-lg font-bold text-[var(--color-dark-text)]">
              Ready to get started?
            </div>
            <p className="mt-1 max-w-xl font-['Inter',sans-serif] text-clamp-body-sm text-[var(--color-muted-slate)]">
              Let’s map the right next step for your brand.
            </p>
          </div>
          <button
            onClick={onOpenConsultation}
            aria-label="Book Strategy Consultation"
            className="group relative inline-flex w-full shrink-0 items-center justify-center gap-2 px-7 py-3.5 font-['Inter',sans-serif] text-xs font-extrabold uppercase tracking-wider text-[var(--color-navy)] sm:w-auto"
          >
            <BtnShape fill="#F8C311" />
            <span className="relative z-10">Book Strategy Consultation</span>
            <ArrowUpRight className="relative z-10 h-4 w-4 stroke-[2.8]" />
          </button>
        </div>
      </div>
    </section>
  );
};
