import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { useSmoothScroll } from '../animations/SmoothScrollProvider';

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 360);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      aria-hidden={!isVisible}
      tabIndex={isVisible ? 0 : -1}
      data-cursor="link"
      data-cursor-button="yellow"
      data-cursor-theme="light"
      onClick={() => scrollTo(0)}
      className={`group fixed bottom-5 right-5 sm:bottom-8 sm:right-8 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-none bg-[#F8C311] border border-[#F8C311] text-[#0D0D0D] shadow-[0_14px_32px_-10px_rgba(0,0,0,0.6)] flex items-center justify-center cursor-pointer transition-[opacity,transform] duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F8C311] ${
        isVisible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-3 pointer-events-none'
      }`}
    >
      <ArrowUp
        aria-hidden="true"
        className="w-5 h-5 stroke-[2.3] transition-transform duration-200 group-hover:-translate-y-0.5"
      />
    </button>
  );
}
