import {
  createContext,
  useContext,
  useEffect,
  useRef,
  ReactNode,
  useCallback,
} from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollContextValue {
  scrollTo: (
    target: string | HTMLElement | number,
    options?: { immediate?: boolean }
  ) => void;
  stopScroll: () => void;
  startScroll: () => void;
  resizeScroll: () => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextValue>({
  scrollTo: () => {},
  stopScroll: () => {},
  startScroll: () => {},
  resizeScroll: () => {},
});

export function useSmoothScroll() {
  return useContext(SmoothScrollContext);
}

const SMOOTH_EASING = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const stopRequestedBeforeMountRef = useRef(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      lerp: 0.085,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1,
      syncTouch: false,
      autoResize: true,
      allowNestedScroll: true,
    });

    lenisRef.current = lenis;

    if (stopRequestedBeforeMountRef.current) {
      lenis.stop();
    }

    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    let resizeTimer: number | null = null;
    const syncDimensions = () => {
      if (resizeTimer !== null) {
        window.clearTimeout(resizeTimer);
      }
      resizeTimer = window.setTimeout(() => {
        lenis.resize();
        ScrollTrigger.refresh();
      }, 120);
    };

    const bodyObserver =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => {
            lenis.resize();
          })
        : null;

    if (bodyObserver && document.body) {
      bodyObserver.observe(document.body);
    }

    window.addEventListener('load', syncDimensions);
    syncDimensions();

    return () => {
      if (resizeTimer !== null) {
        window.clearTimeout(resizeTimer);
      }
      window.removeEventListener('load', syncDimensions);
      bodyObserver?.disconnect();
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollTo = useCallback(
    (
      target: string | HTMLElement | number,
      options?: { immediate?: boolean }
    ) => {
      const immediate = Boolean(options?.immediate);
      const offset = -76;

      if (lenisRef.current) {
        lenisRef.current.resize();

        if (target === '#home' || target === 0) {
          if (immediate) {
            lenisRef.current.scrollTo(0, { immediate: true, force: true });
            window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
          } else {
            lenisRef.current.scrollTo(0, {
              duration: 1.05,
              easing: SMOOTH_EASING,
              force: true,
            });
          }
          return;
        }

        lenisRef.current.scrollTo(target, {
          offset,
          duration: immediate ? 0 : 1.1,
          easing: immediate ? undefined : SMOOTH_EASING,
          immediate,
          force: true,
        });
        return;
      }

      // Fallback when reduced-motion is enabled or Lenis is inactive
      const fallbackBehavior: ScrollBehavior = immediate ? 'auto' : 'smooth';
      if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior: fallbackBehavior });
      } else if (typeof target === 'string') {
        if (target === '#home') {
          window.scrollTo({ top: 0, behavior: fallbackBehavior });
          return;
        }
        const el = document.querySelector(target);
        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY + offset;
          window.scrollTo({ top: y, behavior: fallbackBehavior });
        }
      } else {
        const y = target.getBoundingClientRect().top + window.scrollY + offset;
        window.scrollTo({ top: y, behavior: fallbackBehavior });
      }
    },
    []
  );

  const stopScroll = useCallback(() => {
    stopRequestedBeforeMountRef.current = true;
    lenisRef.current?.stop();
  }, []);

  const startScroll = useCallback(() => {
    stopRequestedBeforeMountRef.current = false;
    if (lenisRef.current) {
      lenisRef.current.start();
      lenisRef.current.resize();
    }
  }, []);

  const resizeScroll = useCallback(() => {
    lenisRef.current?.resize();
  }, []);

  return (
    <SmoothScrollContext.Provider
      value={{ scrollTo, stopScroll, startScroll, resizeScroll }}
    >
      {children}
    </SmoothScrollContext.Provider>
  );
}
