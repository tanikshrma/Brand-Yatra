import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSmoothScroll } from '../animations/SmoothScrollProvider';
import { BRAND_IMAGES } from '../../data/images';

gsap.registerPlugin(ScrollTrigger);

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const LOGO_MARK_WHITE_SRC = BRAND_IMAGES.logo.markWhite;

/* Module-scoped guard so the preloader plays only once on initial full page load,
   never replaying on client-side route changes while remaining Strict-Mode safe. */
let hasCompletedInitialLoad = false;

export function hasPreloaderFinished(): boolean {
  return hasCompletedInitialLoad;
}

interface BrandPreloaderProps {
  onRevealReady: () => void;
  onComplete: () => void;
}

export function BrandPreloader({ onRevealReady, onComplete }: BrandPreloaderProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const topPanelRef = useRef<HTMLDivElement | null>(null);
  const bottomPanelRef = useRef<HTMLDivElement | null>(null);
  const centerStageRef = useRef<HTMLDivElement | null>(null);
  const logoImgRef = useRef<HTMLImageElement | null>(null);
  const fallbackLogoRef = useRef<HTMLDivElement | null>(null);
  const wordmarkRef = useRef<HTMLParagraphElement | null>(null);
  const captionRef = useRef<HTMLParagraphElement | null>(null);
  const progressTrackRef = useRef<HTMLDivElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  const [logoImgFailed, setLogoImgFailed] = useState(false);
  const [dismissed, setDismissed] = useState(() => hasCompletedInitialLoad);

  const { stopScroll, startScroll } = useSmoothScroll();

  useIsomorphicLayoutEffect(() => {
    if (hasCompletedInitialLoad) {
      onRevealReady();
      onComplete();
      setDismissed(true);
      return;
    }

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      hasCompletedInitialLoad = true;
      document.documentElement.classList.remove('by-preloader-lock');
      onRevealReady();
      onComplete();
      setDismissed(true);
      return;
    }

    const root = rootRef.current;
    if (!root) return;

    let isCancelled = false;
    let exitStarted = false;

    /* Lock scroll strictly while preloader is active */
    document.documentElement.classList.add('by-preloader-lock');
    stopScroll();

    const unlockAndFinish = () => {
      if (isCancelled) return;
      hasCompletedInitialLoad = true;
      document.documentElement.classList.remove('by-preloader-lock');
      startScroll();
      onRevealReady();
      onComplete();
      setDismissed(true);
      window.requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    };

    const ctx = gsap.context(() => {
      const logoTarget = logoImgRef.current || fallbackLogoRef.current;

      /* Initial GSAP states */
      gsap.set([topPanelRef.current, bottomPanelRef.current], { yPercent: 0 });
      if (logoTarget) {
        gsap.set(logoTarget, { autoAlpha: 0, scale: 0.9, y: 10 });
      }
      gsap.set([wordmarkRef.current, captionRef.current, progressTrackRef.current], {
        autoAlpha: 0,
        y: 8,
      });
      gsap.set(progressBarRef.current, { scaleX: 0, transformOrigin: 'left center' });

      /* Track real measurable critical assets: Logo Mark white.png, fonts, and eager hero media */
      const trackedPromises: Promise<void>[] = [];
      let loadedCount = 0;

      const preloadImage = (src: string) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          const done = () => resolve();
          img.onload = done;
          img.onerror = done;
          img.src = src;
          if (img.complete) resolve();
        });

      const eagerDomImages = Array.from(
        document.querySelectorAll<HTMLImageElement>('img[loading="eager"]')
      );

      const rawTasks: Promise<void>[] = [
        preloadImage(LOGO_MARK_WHITE_SRC),
        ...eagerDomImages.map(
          (img) =>
            new Promise<void>((resolve) => {
              if (img.complete) {
                resolve();
                return;
              }
              const done = () => resolve();
              img.addEventListener('load', done, { once: true });
              img.addEventListener('error', done, { once: true });
            })
        ),
      ];

      if (typeof document !== 'undefined' && 'fonts' in document && document.fonts?.ready) {
        rawTasks.push(
          document.fonts.ready.then(() => undefined).catch(() => undefined)
        );
      }

      const totalTasks = Math.max(rawTasks.length, 1);

      rawTasks.forEach((task) => {
        const tracked = task.then(() => {
          if (isCancelled || exitStarted) return;
          loadedCount += 1;
          const measurableProgress = Math.min(0.92, (loadedCount / totalTasks) * 0.92);
          if (progressBarRef.current) {
            gsap.to(progressBarRef.current, {
              scaleX: measurableProgress,
              duration: 0.28,
              ease: 'power3.out',
              overwrite: 'auto',
            });
          }
        });
        trackedPromises.push(tracked);
      });

      /* Master intro timeline showcasing Logo Mark white.png cleanly on #0D0D0D */
      const introTl = gsap.timeline();

      if (logoTarget) {
        introTl.to(
          logoTarget,
          {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            duration: 0.62,
            ease: 'power3.out',
          },
          0.06
        );
      }

      introTl.to(
        [wordmarkRef.current, captionRef.current, progressTrackRef.current],
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.46,
          stagger: 0.06,
          ease: 'power3.out',
        },
        0.24
      );

      /* Brief editorial hold so Logo Mark white.png registers crisply */
      introTl.to({}, { duration: 0.2 });

      const introDonePromise = new Promise<void>((resolve) => {
        introTl.eventCallback('onComplete', () => resolve());
      });

      /* Maximum asset timeout so slow/failed network assets can never stall the preloader */
      const maxAssetWaitPromise = new Promise<void>((resolve) => {
        window.setTimeout(resolve, 1100);
      });

      const runExitSequence = () => {
        if (isCancelled || exitStarted) return;
        exitStarted = true;

        const exitTl = gsap.timeline({
          onComplete: unlockAndFinish,
        });

        /* Complete loading progress line cleanly to 100% */
        exitTl
          .to(progressBarRef.current, {
            scaleX: 1,
            duration: 0.3,
            ease: 'power3.out',
            overwrite: 'auto',
          })
          .to(
            centerStageRef.current,
            {
              autoAlpha: 0,
              y: -10,
              scale: 0.985,
              duration: 0.26,
              ease: 'power2.inOut',
            },
            '+=0.08'
          )
          /* Split dark #0D0D0D editorial panels vertically to reveal site */
          .to(
            topPanelRef.current,
            {
              yPercent: -101,
              duration: 0.75,
              ease: 'power2.inOut',
            },
            '-=0.06'
          )
          .to(
            bottomPanelRef.current,
            {
              yPercent: 101,
              duration: 0.75,
              ease: 'power2.inOut',
            },
            '<'
          )
          .call(
            () => {
              if (!isCancelled) {
                onRevealReady();
              }
            },
            undefined,
            '-=0.14'
          );
      };

      Promise.all([
        introDonePromise,
        Promise.race([Promise.all(trackedPromises), maxAssetWaitPromise]),
      ]).then(() => {
        runExitSequence();
      });
    }, root);

    /* Hard failsafe timer: guarantees overlay can never remain stuck under any condition */
    const hardFailsafe = window.setTimeout(() => {
      unlockAndFinish();
    }, 4200);

    return () => {
      isCancelled = true;
      window.clearTimeout(hardFailsafe);
      document.documentElement.classList.remove('by-preloader-lock');
      startScroll();
      ctx.revert();
    };
  }, [onComplete, onRevealReady, startScroll, stopScroll]);

  if (dismissed) {
    return null;
  }

  return (
    <div
      ref={rootRef}
      role="status"
      aria-live="polite"
      aria-label="Loading Brand Yatra"
      data-cursor-theme="dark"
      className="fixed inset-0 z-[100] pointer-events-auto overflow-hidden select-none"
    >
      {/* Top Split #0D0D0D Panel so Logo Mark white.png (white monogram + yellow dot) renders with pure contrast */}
      <div
        ref={topPanelRef}
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-[calc(50%+1px)] bg-[#0D0D0D] will-change-transform"
      />

      {/* Bottom Split #0D0D0D Panel */}
      <div
        ref={bottomPanelRef}
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#0D0D0D] will-change-transform"
      />

      {/* Centered Original Logo Mark white.png (139x214 natural proportions) + Minimal Typography + Yellow Progress Line */}
      <div
        ref={centerStageRef}
        className="relative z-10 w-full h-full flex flex-col items-center justify-center px-6 will-change-transform"
      >
        {!logoImgFailed ? (
          <img
            ref={logoImgRef}
            src={LOGO_MARK_WHITE_SRC}
            alt="Brand Yatra Logo Mark"
            width={139}
            height={214}
            decoding="sync"
            onError={() => setLogoImgFailed(true)}
            className="h-[78px] sm:h-[90px] lg:h-[98px] w-auto object-contain block pointer-events-none will-change-transform"
          />
        ) : (
          <div
            ref={fallbackLogoRef}
            className="font-heading text-4xl sm:text-5xl tracking-[0.04em] text-white will-change-transform"
          >
            Brand<span className="text-[#F8C311]">Yatra</span>
          </div>
        )}

        {/* Minimal Typography Underneath */}
        <p
          ref={wordmarkRef}
          className="mt-6 font-heading text-[24px] sm:text-[28px] leading-none tracking-[0.14em] uppercase text-white will-change-transform"
        >
          BRAND YATRA
        </p>

        {/* Small Editorial Caption */}
        <p
          ref={captionRef}
          className="mt-2.5 text-[10px] sm:text-[10.5px] leading-none tracking-[0.26em] uppercase font-medium text-[#A8A8A8] will-change-transform"
        >
          CREATIVITY IN MOTION
        </p>

        {/* Thin Brand Yellow Loading Progress Line */}
        <div
          ref={progressTrackRef}
          aria-hidden="true"
          className="mt-6 w-44 sm:w-52 h-[2px] bg-white/12 overflow-hidden will-change-transform"
        >
          <div
            ref={progressBarRef}
            className="w-full h-full bg-[#F8C311] origin-left scale-x-0 will-change-transform"
          />
        </div>
      </div>
    </div>
  );
}
