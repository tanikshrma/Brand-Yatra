import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { TESTIMONIALS_LIST } from '../data/agencyData';
import { WordRevealHeading } from './WordRevealHeading';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const current = TESTIMONIALS_LIST[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS_LIST.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS_LIST.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="testimonials" className="bg-[#F5F6F7] text-[#17212B] relative overflow-hidden">
      <div className="py-16 sm:py-24 lg:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 sm:gap-8 mb-12 sm:mb-16 pb-8 border-b border-[#E5E9ED]">
          <div>
            <div className="flex items-center gap-2 text-clamp-label font-['Manrope',sans-serif] tracking-widest text-[#F8C311] uppercase font-semibold mb-3">
              <span>Partner Voices</span>
              <span aria-hidden="true">·</span>
              <span>Verified Client Results</span>
            </div>
            <WordRevealHeading
              as="h2"
              className="font-['Marcellus',serif] text-clamp-heading text-[#0E2234] font-normal tracking-tight leading-tight"
            >
              What Leaders Say About <span className="text-[#F8C311]">Brand Yatra.</span>
            </WordRevealHeading>
          </div>
          
          {/* Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              className="w-11 h-11 rounded-full bg-white border border-[#E5E9ED] hover:border-[#F8C311] text-[#0E2234] hover:text-[#F8C311] flex items-center justify-center transition-all cursor-pointer hover:-translate-y-1 active:translate-y-0 shadow-sm"
              aria-label="Previous testimonial"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="w-11 h-11 rounded-full bg-white border border-[#E5E9ED] hover:border-[#F8C311] text-[#0E2234] hover:text-[#F8C311] flex items-center justify-center transition-all cursor-pointer hover:-translate-y-1 active:translate-y-0 shadow-sm"
              aria-label="Next testimonial"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Spacious Editorial Quote Layout */}
        <div className="bg-white border-y border-[#E5E9ED] p-6 sm:p-10 lg:p-12 relative">
          <div className="max-w-4xl">
            <span className="font-['Marcellus',serif] text-5xl sm:text-6xl text-[#F8C311] leading-none block mb-3 sm:mb-4" aria-hidden="true">
              “
            </span>

            <blockquote className="font-['Marcellus',serif] text-clamp-subheading text-[#0E2234] font-normal leading-relaxed mb-6 sm:mb-8">
              {current.quote}
            </blockquote>

            {/* Unboxed Attribution */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-5 sm:pt-6 border-t border-[#E5E9ED]">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#F8C311] text-[#0E2234] font-['Marcellus',serif] flex items-center justify-center text-base sm:text-lg font-bold shadow-md shrink-0">
                {current.clientName.charAt(0)}
              </div>
              <div>
                <div className="font-['Marcellus',serif] text-base sm:text-lg text-[#0E2234] font-bold">
                  {current.clientName}
                </div>
                <div className="text-clamp-label text-[#66717D] font-['Inter',sans-serif]">
                  {current.role} <span aria-hidden="true">·</span> <span className="text-[#F8C311] font-semibold bg-[#0E2234] px-2 py-0.5 rounded text-[11px] inline-block mt-0.5">{current.company}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Slide Indicator Dots */}
          <div className="flex items-center gap-2 mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-[#E5E9ED]">
            {TESTIMONIALS_LIST.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`py-2 px-1 cursor-pointer focus:outline-none`}
                aria-label={`Go to slide ${i + 1} of ${TESTIMONIALS_LIST.length}`}
              >
                <span
                  className={`block h-1.5 rounded-full transition-all duration-300 ${
                    currentIndex === i ? 'w-8 bg-[#F8C311]' : 'w-2 bg-[#E5E9ED]'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
