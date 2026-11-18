import { useEffect, useLayoutEffect, RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

function isReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

/**
 * Subtle GSAP fade + upward translate or clip-path reveal on scroll.
 * Clears transform/clipPath on completion so CSS hover transitions remain conflict-free.
 */
export function useGSAPReveal<T extends HTMLElement>(
  ref: RefObject<T | null>,
  options?: {
    y?: number;
    duration?: number;
    delay?: number;
    start?: string;
    clipReveal?: boolean;
  }
) {
  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el || isReducedMotion()) return;

    const {
      y = 24,
      duration = 0.85,
      delay = 0,
      start = 'top 88%',
      clipReveal = false,
    } = options || {};

    const ctx = gsap.context(() => {
      if (clipReveal) {
        gsap.fromTo(
          el,
          {
            clipPath: 'inset(8% 0% 8% 0%)',
            opacity: 0,
          },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            opacity: 1,
            duration: 0.95,
            delay,
            ease: 'power3.out',
            clearProps: 'clipPath',
            scrollTrigger: {
              trigger: el,
              start,
              once: true,
            },
          }
        );
      } else {
        gsap.fromTo(
          el,
          { y, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration,
            delay,
            ease: 'power3.out',
            clearProps: 'transform',
            scrollTrigger: {
              trigger: el,
              start,
              once: true,
            },
          }
        );
      }
    }, el);

    return () => ctx.revert();
  }, [ref, options?.y, options?.duration, options?.delay, options?.start, options?.clipReveal]);
}

/**
 * Masked line-by-line text reveal for `[data-reveal-line]` elements.
 */
export function useTextReveal<T extends HTMLElement>(
  containerRef: RefObject<T | null>,
  options?: {
    stagger?: number;
    duration?: number;
    delay?: number;
    start?: string;
  }
) {
  useIsomorphicLayoutEffect(() => {
    const container = containerRef.current;
    if (!container || isReducedMotion()) return;

    const {
      stagger = 0.08,
      duration = 0.8,
      delay = 0,
      start = 'top 88%',
    } = options || {};

    const ctx = gsap.context(() => {
      const lines = container.querySelectorAll('[data-reveal-line]');
      if (!lines.length) return;

      gsap.fromTo(
        lines,
        { yPercent: 105, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration,
          delay,
          stagger,
          ease: 'power3.out',
          clearProps: 'transform',
          scrollTrigger: {
            trigger: container,
            start,
            once: true,
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, [containerRef, options?.stagger, options?.duration, options?.delay, options?.start]);
}

/**
 * Restrained scroll-scrubbed vertical parallax within an overflow-hidden parent.
 */
export function useParallax<T extends HTMLElement>(
  targetRef: RefObject<T | null>,
  options?: {
    yPercent?: number;
    start?: string;
    end?: string;
  }
) {
  useIsomorphicLayoutEffect(() => {
    const el = targetRef.current;
    if (!el || isReducedMotion()) return;

    const {
      yPercent = -6,
      start = 'top bottom',
      end = 'bottom top',
    } = options || {};

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: -yPercent * 0.5 },
        {
          yPercent: yPercent * 0.5,
          ease: 'none',
          scrollTrigger: {
            trigger: el.parentElement || el,
            start,
            end,
            scrub: 0.5,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [targetRef, options?.yPercent, options?.start, options?.end]);
}

/**
 * Staggered children reveal using `[data-stagger-item]` selector.
 * Clears transform after completion so card hover transforms never conflict.
 */
export function useStaggerReveal<T extends HTMLElement>(
  containerRef: RefObject<T | null>,
  options?: {
    y?: number;
    stagger?: number;
    duration?: number;
    start?: string;
    selector?: string;
  }
) {
  useIsomorphicLayoutEffect(() => {
    const container = containerRef.current;
    if (!container || isReducedMotion()) return;

    const {
      y = 26,
      stagger = 0.09,
      duration = 0.8,
      start = 'top 86%',
      selector = '[data-stagger-item]',
    } = options || {};

    const ctx = gsap.context(() => {
      const items = container.querySelectorAll(selector);
      if (!items.length) return;

      gsap.fromTo(
        items,
        { y, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration,
          stagger,
          ease: 'power3.out',
          clearProps: 'transform',
          scrollTrigger: {
            trigger: container,
            start,
            once: true,
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, [
    containerRef,
    options?.y,
    options?.stagger,
    options?.duration,
    options?.start,
    options?.selector,
  ]);
}

/**
 * Scroll-triggered numeric counter animation.
 */
export function useCountUp<T extends HTMLElement>(
  elRef: RefObject<T | null>,
  endValue: number,
  decimals = 0,
  duration = 1.0
) {
  useIsomorphicLayoutEffect(() => {
    const el = elRef.current;
    if (!el) return;

    if (isReducedMotion()) {
      el.textContent = endValue.toFixed(decimals);
      return;
    }

    const counter = { val: 0 };
    const ctx = gsap.context(() => {
      gsap.to(counter, {
        val: endValue,
        duration,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 94%',
          once: true,
        },
        onUpdate: () => {
          el.textContent = counter.val.toFixed(decimals);
        },
      });
    }, el);

    return () => ctx.revert();
  }, [elRef, endValue, decimals, duration]);
}
