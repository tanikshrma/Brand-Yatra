import { useRef, useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { CONTACT_FAQS } from '../../data/contact';
import { useGSAPReveal, useTextReveal } from '../animations/gsapHooks';

export function ContactFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  useTextReveal(headingRef, { stagger: 0.08, duration: 0.8 });
  useGSAPReveal(listRef, { y: 24, duration: 0.85, start: 'top 86%' });

  const toggleItem = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section
      data-cursor-theme="light"
      className="bg-[#F6F5F2] text-[#0D0D0D] by-section-spacing border-t border-[#0D0D0D]/10"
    >
      <div className="by-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Header Column */}
          <div className="lg:col-span-5">
            <span className="eyebrow-label text-[#0D0D0D]/60 block mb-5">
              BEFORE WE GET STARTED
            </span>

            <h2
              ref={headingRef}
              className="heading-section text-[#0D0D0D]"
            >
              <span className="block overflow-hidden py-[0.03em] -my-[0.02em]">
                <span data-reveal-line className="block">
                  A FEW THINGS
                </span>
              </span>
              <span className="block overflow-hidden py-[0.03em] -my-[0.02em]">
                <span data-reveal-line className="block text-[#0D0D0D]/75">
                  YOU MIGHT ASK.
                </span>
              </span>
            </h2>
          </div>

          {/* Right Single-Open Accessible Accordion */}
          <div
            ref={listRef}
            className="lg:col-span-7 divide-y divide-[#0D0D0D]/14 border-y border-[#0D0D0D]/14"
          >
            {CONTACT_FAQS.map((faq, idx) => {
              const isOpen = openIndex === idx;
              const panelId = `contact-faq-panel-${faq.number}`;
              const buttonId = `contact-faq-trigger-${faq.number}`;

              return (
                <div key={faq.number} className="py-6 sm:py-7">
                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => toggleItem(idx)}
                      className="w-full min-h-[44px] flex items-start justify-between gap-6 text-left cursor-pointer group focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0D0D0D]"
                    >
                      <span className="flex items-baseline gap-4 sm:gap-5">
                        <span className="text-[12px] font-semibold tracking-[0.14em] text-[#0D0D0D]/45 tabular-nums shrink-0">
                          {faq.number}.
                        </span>
                        <span className="text-[18px] sm:text-[20px] font-semibold leading-[1.35] text-[#0D0D0D] group-hover:text-[#0D0D0D]/80 transition-colors">
                          {faq.question}
                        </span>
                      </span>

                      <span
                        aria-hidden="true"
                        className="mt-1 w-8 h-8 border border-[#0D0D0D]/20 flex items-center justify-center shrink-0 transition-colors group-hover:border-[#0D0D0D] group-hover:bg-[#0D0D0D] group-hover:text-white"
                      >
                        {isOpen ? (
                          <Minus className="w-4 h-4" />
                        ) : (
                          <Plus className="w-4 h-4" />
                        )}
                      </span>
                    </button>
                  </h3>

                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                      isOpen
                        ? 'grid-rows-[1fr] opacity-100 mt-4'
                        : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="pl-9 sm:pl-11 pr-4 text-[16px] leading-[1.68] text-[#0D0D0D]/75 max-w-[600px]">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
