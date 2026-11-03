import React from 'react';
import { ArrowUpRight, Zap, Target, Layers, BarChart3 } from 'lucide-react';
import { BtnShape } from './BtnShape';
import { WordRevealHeading } from './WordRevealHeading';

interface WhyBrandYatraProps {
  onOpenConsultation: () => void;
}

export const WhyBrandYatra: React.FC<WhyBrandYatraProps> = ({ onOpenConsultation }) => {
  const pillars = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: 'Aesthetic Conviction',
      desc: 'Distinct visual identity and premium editorial design that sets your brand apart from generic digital templates.',
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: 'Intent-First Acquisition',
      desc: 'Laser-focused Google Ads and SEO funnels capturing buyers at the exact moment of commercial consideration.',
    },
    {
      icon: <Layers className="h-6 w-6" />,
      title: 'Connected Execution',
      desc: 'Zero siloed handoffs. Brand strategists, media buyers, and UI engineers work in lockstep under one roof.',
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: 'Compounding Revenue',
      desc: 'Data pipelines calibrated around true contribution margin, ROAS, and customer lifetime value.',
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[var(--color-soft-grey)] py-16 text-[var(--color-dark-text)] sm:py-20 lg:py-24">
      <div className="site-gutter">
        <div className="mb-9 flex items-center gap-2 font-['Manrope',sans-serif] text-clamp-label font-semibold uppercase tracking-widest text-[var(--color-muted-slate)]">
          <span>Why Brand Yatra</span>
        </div>

        <div className="mb-10 grid grid-cols-1 items-end gap-6 lg:grid-cols-12">
          <WordRevealHeading
            as="h2"
            className="font-['Marcellus',serif] text-clamp-heading font-normal leading-tight tracking-tight text-[var(--color-navy)] lg:col-span-6"
          >
            Built Around <span className="text-[var(--color-muted-slate)]">Your Growth.</span>
          </WordRevealHeading>
          <p className="max-w-xl font-['Inter',sans-serif] text-clamp-body text-[var(--color-muted-slate)] lg:col-span-5 lg:col-start-8">
            Creative thinking, clear strategy, and connected execution help every part of your brand work together seamlessly to deliver compounding commercial outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
          {pillars.map((item, idx) => (
            <article
              key={idx}
              className="relative flex min-h-[330px] flex-col items-center overflow-hidden rounded-[3.25rem] border border-[var(--color-border)] bg-white px-5 pb-[4.75rem] pt-8 text-center shadow-[0_14px_30px_rgba(14,34,52,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-primary)] hover:shadow-[0_18px_38px_rgba(14,34,52,0.1)] sm:px-6"
            >
              <span className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-soft-grey)] text-[var(--color-navy)] [&>svg]:stroke-[var(--color-navy)]">
                {item.icon}
              </span>
              <h3 className="font-['Manrope',sans-serif] text-base font-bold leading-snug text-[var(--color-dark-text)] sm:text-lg">
                {item.title}
              </h3>
              <p className="mt-3 font-['Inter',sans-serif] text-xs leading-relaxed text-[var(--color-muted-slate)]">
                {item.desc}
              </p>
              <span
                className="absolute bottom-0 left-1/2 flex h-[3.75rem] w-24 -translate-x-1/2 items-center justify-center rounded-t-[2.25rem] bg-[var(--color-navy)] font-['Marcellus',serif] text-2xl font-bold text-[var(--color-primary)]"
                aria-label={`Step ${idx + 1}`}
              >
                0{idx + 1}
              </span>
            </article>
          ))}
        </div>

        <div className="mt-8">
          <button
            onClick={onOpenConsultation}
            aria-label="Let's Build Something Better - Open Consultation"
            className="group relative inline-flex w-full items-center justify-center gap-2.5 px-8 py-4 font-['Inter',sans-serif] text-xs font-extrabold uppercase tracking-wider text-[var(--color-navy)] sm:w-auto sm:text-sm"
          >
            <BtnShape fill="#F8C311" />
            <span className="relative z-10">Let's Build Something Better</span>
            <ArrowUpRight className="relative z-10 h-4 w-4 stroke-[2.8]" />
          </button>
        </div>
      </div>
    </section>
  );
};
