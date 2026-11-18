import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Plus } from 'lucide-react';
import { ServiceFAQItem, ServicePageData } from '../../data/services';
import { useStaggerReveal, useTextReveal } from '../animations/gsapHooks';

interface FAQAccordionItemProps {
  item: ServiceFAQItem;
  index: number;
  serviceSlug: string;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQAccordionItem({
  item,
  index,
  serviceSlug,
  isOpen,
  onToggle,
}: FAQAccordionItemProps) {
  const contentWrapRef = useRef<HTMLDivElement | null>(null);
  const contentInnerRef = useRef<HTMLDivElement | null>(null);
  const isFirstMountRef = useRef(true);

  const buttonId = `faq-trigger-${serviceSlug}-${index}`;
  const panelId = `faq-panel-${serviceSlug}-${index}`;

  useEffect(() => {
    const wrap = contentWrapRef.current;
    const inner = contentInnerRef.current;
    if (!wrap || !inner) return;

    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isFirstMountRef.current) {
      isFirstMountRef.current = false;
      gsap.set(wrap, {
        height: isOpen ? 'auto' : 0,
        autoAlpha: isOpen ? 1 : 0,
      });
      return;
    }

    if (reduced) {
      gsap.set(wrap, {
        height: isOpen ? 'auto' : 0,
        autoAlpha: isOpen ? 1 : 0,
      });
      return;
    }

    if (isOpen) {
      gsap.killTweensOf(wrap);
      gsap.set(wrap, { autoAlpha: 1 });
      gsap.fromTo(
        wrap,
        { height: wrap.offsetHeight },
        {
          height: inner.offsetHeight,
          duration: 0.32,
          ease: 'power2.out',
          onComplete: () => {
            gsap.set(wrap, { height: 'auto' });
          },
        }
      );
    } else {
      gsap.killTweensOf(wrap);
      gsap.fromTo(
        wrap,
        { height: wrap.offsetHeight, autoAlpha: 1 },
        {
          height: 0,
          autoAlpha: 0,
          duration: 0.26,
          ease: 'power2.inOut',
        }
      );
    }
  }, [isOpen]);

  return (
    <div
      data-stagger-item
      className="border-b border-white/[0.1]"
    >
      <h3>
        <button
          id={buttonId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          data-cursor="link"
          className="w-full py-6 sm:py-7 flex items-center justify-between gap-6 text-left group cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#F8C311]"
        >
          <span className="flex items-baseline gap-4 sm:gap-6">
            <span className="text-xs font-semibold tracking-[0.14em] text-[#F8C311] tabular-nums shrink-0">
              0{index + 1}
            </span>
            <span className="text-[17px] sm:text-[19px] font-medium text-white group-hover:text-[#F8C311] transition-colors leading-snug">
              {item.question}
            </span>
          </span>

          <span
            aria-hidden="true"
            className={`w-8 h-8 border flex items-center justify-center shrink-0 transition-all duration-200 ${
              isOpen
                ? 'border-[#F8C311] bg-[#F8C311] text-[#0D0D0D] rotate-45'
                : 'border-white/15 text-white/70 group-hover:border-[#F8C311] group-hover:text-[#F8C311]'
            }`}
          >
            <Plus className="w-4 h-4 stroke-[2]" />
          </span>
        </button>
      </h3>

      <div
        id={panelId}
        ref={contentWrapRef}
        role="region"
        aria-labelledby={buttonId}
        className="overflow-hidden h-0 opacity-0"
      >
        <div
          ref={contentInnerRef}
          className="pb-7 pl-8 sm:pl-11 pr-4 sm:pr-12 text-[15.5px] sm:text-[16px] leading-[1.65] text-[#A8A8A8] max-w-[740px]"
        >
          {item.answer}
        </div>
      </div>
    </div>
  );
}

interface ServiceFAQProps {
  service: ServicePageData;
}

export function ServiceFAQ({ service }: ServiceFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setOpenIndex(0);
  }, [service.slug]);

  useTextReveal(headingRef, { stagger: 0.08, duration: 0.82 });
  useStaggerReveal(listRef, { y: 18, stagger: 0.07, duration: 0.75 });

  return (
    <section
      data-cursor-theme="dark"
      className="bg-[#0D0D0D] text-white by-section-spacing border-t border-white/[0.08]"
    >
      <div className="by-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Sticky Editorial Heading */}
          <div className="lg:col-span-5">
            <span className="eyebrow-label text-[#A8A8A8] block mb-5">
              FREQUENTLY ASKED QUESTIONS
            </span>

            <h2 ref={headingRef} className="heading-section text-white">
              <span className="block overflow-hidden py-[0.03em] -my-[0.02em]">
                <span data-reveal-line className="block">
                  Common questions
                </span>
              </span>
              <span className="block overflow-hidden py-[0.03em] -my-[0.02em]">
                <span data-reveal-line className="block text-[#A8A8A8]">
                  about {service.title}.
                </span>
              </span>
            </h2>

            <p className="text-[16px] leading-[1.62] text-[#A8A8A8] mt-6 max-w-[400px]">
              Straightforward answers on how we scope, execute and collaborate on{' '}
              {service.title.toLowerCase()} engagements.
            </p>
          </div>

          {/* Right Accessible GSAP Accordion */}
          <div ref={listRef} className="lg:col-span-7 border-t border-white/[0.1]">
            {service.faqs.map((faq, idx) => (
              <FAQAccordionItem
                key={faq.question}
                item={faq}
                index={idx}
                serviceSlug={service.slug}
                isOpen={openIndex === idx}
                onToggle={() =>
                  setOpenIndex((prev) => (prev === idx ? null : idx))
                }
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
