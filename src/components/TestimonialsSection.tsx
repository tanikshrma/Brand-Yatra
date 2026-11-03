import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, BadgeCheck, Star } from 'lucide-react';
import { TESTIMONIALS_LIST } from '../data/agencyData';
import { WordRevealHeading } from './WordRevealHeading';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const showTestimonial = (index: number) => {
    setCurrentIndex((index + TESTIMONIALS_LIST.length) % TESTIMONIALS_LIST.length);
  };

  const handlePrev = () => showTestimonial(currentIndex - 1);
  const handleNext = () => showTestimonial(currentIndex + 1);

  const visibleTestimonials = [-1, 0, 1].map((offset) => ({
    testimonial: TESTIMONIALS_LIST[
      (currentIndex + offset + TESTIMONIALS_LIST.length) % TESTIMONIALS_LIST.length
    ],
    offset,
  }));

  return (
    <section id="testimonials" className="relative overflow-hidden bg-[var(--color-soft-grey)] text-[var(--color-dark-text)]">
      <div className="site-gutter py-16 sm:py-20 lg:py-24">
        <div className="mb-12 text-center sm:mb-14">
          <div className="mb-3 flex items-center justify-center gap-2 font-['Manrope',sans-serif] text-clamp-label font-semibold uppercase tracking-widest text-[var(--color-navy)]">
            <span>Partner Voices</span>
            <span aria-hidden="true">·</span>
            <span>Verified Client Results</span>
          </div>
          <WordRevealHeading
            as="h2"
            className="mx-auto max-w-4xl font-['Marcellus',serif] text-clamp-heading font-normal leading-tight tracking-tight text-[var(--color-dark-text)]"
          >
            What Leaders Say About <span className="text-[var(--color-navy)]">Brand Yatra.</span>
          </WordRevealHeading>
        </div>

        <div className="relative">
          <Star className="pointer-events-none absolute -left-2 top-1 hidden h-7 w-7 fill-[var(--color-primary)] text-[var(--color-primary)]/70 sm:block lg:-left-4 lg:top-4" aria-hidden="true" />
          <Star className="pointer-events-none absolute -right-2 top-8 hidden h-5 w-5 fill-[var(--color-primary)] text-[var(--color-primary)]/70 sm:block lg:-right-4" aria-hidden="true" />

          <div className="grid grid-cols-1 items-center gap-5 md:grid-cols-3 md:gap-4 lg:gap-7">
            {visibleTestimonials.map(({ testimonial, offset }) => {
              const isActive = offset === 0;
              if (!testimonial) return null;

              return (
                <article
                  key={testimonial.id}
                  aria-current={isActive ? 'true' : undefined}
                  aria-label={`${testimonial.clientName}, ${testimonial.role} at ${testimonial.company}`}
                  className={`relative flex min-h-[360px] flex-col rounded-[1.6rem] border border-white bg-white px-6 py-7 shadow-[0_16px_44px_rgba(14,34,52,0.08)] transition-all duration-500 sm:min-h-[390px] sm:px-7 sm:py-8 ${
                    isActive
                      ? 'z-10 opacity-100 shadow-[0_24px_60px_rgba(14,34,52,0.14)] md:scale-[1.03]'
                      : 'hidden opacity-80 md:flex'
                  } ${
                    offset < 0
                      ? 'md:-rotate-[5deg] md:translate-y-4'
                      : offset > 0
                        ? 'md:rotate-[5deg] md:translate-y-4'
                        : ''
                  }`}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-[var(--color-primary)] font-['Marcellus',serif] text-lg font-bold text-[var(--color-navy)] shadow-[0_4px_14px_rgba(14,34,52,0.12)]">
                      {testimonial.clientName.charAt(0)}
                    </div>
                    <h3 className="font-['Manrope',sans-serif] text-sm font-bold text-[var(--color-dark-text)] sm:text-base">
                      {testimonial.clientName}
                    </h3>
                    <p className="mt-1 max-w-full font-['Inter',sans-serif] text-[11px] leading-relaxed text-[var(--color-muted-slate)]">
                      {testimonial.role}
                      <span aria-hidden="true"> · </span>
                      {testimonial.company}
                    </p>
                    {testimonial.verified && (
                      <span className="mt-2 inline-flex items-center gap-1 font-['Manrope',sans-serif] text-[9px] font-semibold uppercase tracking-wide text-[var(--color-navy)]/75">
                        <BadgeCheck aria-hidden="true" className="h-3.5 w-3.5 text-[var(--color-primary)]" />
                        Verified client
                      </span>
                    )}
                  </div>

                  <div className="my-5 flex items-center justify-center gap-1" aria-label={`${testimonial.rating} out of 5 stars`}>
                    {Array.from({ length: testimonial.rating }, (_, index) => (
                      <Star key={index} aria-hidden="true" className="h-4 w-4 fill-[var(--color-primary)] text-[var(--color-primary)]" />
                    ))}
                    <span className="ml-1 font-mono text-[10px] font-semibold text-[var(--color-dark-text)]">
                      {testimonial.rating.toFixed(1)}
                    </span>
                  </div>

                  <blockquote className={`mt-auto text-center font-['Marcellus',serif] leading-relaxed text-[var(--color-dark-text)] ${
                    isActive ? 'text-base sm:text-lg' : 'text-sm'
                  }`}>
                    “{testimonial.quote}”
                  </blockquote>
                </article>
              );
            })}
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-5">
          <div className="flex items-center gap-1.5" aria-label={`Testimonial ${currentIndex + 1} of ${TESTIMONIALS_LIST.length}`}>
            {TESTIMONIALS_LIST.map((testimonial, index) => (
              <button
                key={testimonial.id}
                type="button"
                onClick={() => showTestimonial(index)}
                aria-label={`Go to testimonial ${index + 1} by ${testimonial.clientName}`}
                aria-current={index === currentIndex ? 'true' : undefined}
                className="flex h-6 items-center px-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
              >
                <span className={`block h-1.5 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'w-7 bg-[var(--color-primary)]' : 'w-1.5 bg-[var(--color-muted-slate)]/30'
                }`} />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrev}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border)] bg-white text-[var(--color-navy)] transition-colors hover:bg-[var(--color-primary)]"
              aria-label="Previous testimonial"
            >
              <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-navy)] text-white transition-colors hover:bg-[var(--color-primary)] hover:text-[var(--color-navy)]"
              aria-label="Next testimonial"
            >
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
