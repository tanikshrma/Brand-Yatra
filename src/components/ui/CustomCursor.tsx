import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowUpRight } from 'lucide-react';

type CursorMode = 'default' | 'link' | 'view' | 'text';
type CursorSurfaceTheme = 'dark' | 'light' | 'yellow';

function detectCursorSupport(): boolean {
  if (typeof window === 'undefined') return false;
  const finePointerAndHover = window.matchMedia(
    '(hover: hover) and (pointer: fine)'
  ).matches;
  const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
  const reducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;
  return finePointerAndHover && !coarsePointer && !reducedMotion;
}

function resolveCursorState(target: Element | null): {
  mode: CursorMode;
  theme: CursorSurfaceTheme;
  onYellowButton: boolean;
} {
  if (!target) {
    return { mode: 'default', theme: 'dark', onYellowButton: false };
  }

  const themedAncestor = target.closest('[data-cursor-theme]');
  const rawTheme = themedAncestor?.getAttribute('data-cursor-theme');
  const theme: CursorSurfaceTheme =
    rawTheme === 'light' || rawTheme === 'yellow' ? rawTheme : 'dark';

  const buttonKind = target
    .closest('[data-cursor-button]')
    ?.getAttribute('data-cursor-button');
  const onYellowButton =
    buttonKind === 'yellow' || (theme === 'yellow' && buttonKind !== 'dark');

  /* 1. Native I-beam text cursor on inputs, textareas & editable controls */
  const textControl = target.closest(
    'input:not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, select, [contenteditable="true"], [data-cursor="text"]'
  );
  if (textControl) {
    return { mode: 'text', theme, onYellowButton: false };
  }

  /* 2. Explicit [data-cursor] & interactive buttons/links (including Services links) */
  const explicitCursorEl = target.closest('[data-cursor]');
  const interactiveEl = target.closest(
    'a[href], button:not(:disabled), [role="button"], [role="menuitem"], [role="combobox"], [role="option"], summary'
  );

  if (
    explicitCursorEl &&
    (!interactiveEl || interactiveEl.contains(explicitCursorEl))
  ) {
    const attr = explicitCursorEl.getAttribute('data-cursor');
    if (attr === 'view') {
      return { mode: 'view', theme, onYellowButton: false };
    }
    if (attr === 'link') {
      return { mode: 'link', theme, onYellowButton };
    }
    if (attr === 'default') {
      return { mode: 'default', theme, onYellowButton: false };
    }
  }

  if (interactiveEl) {
    const interactiveAttr = interactiveEl.getAttribute('data-cursor');
    if (interactiveAttr === 'view') {
      return { mode: 'view', theme, onYellowButton: false };
    }
    return { mode: 'link', theme, onYellowButton };
  }

  if (explicitCursorEl) {
    const attr = explicitCursorEl.getAttribute('data-cursor');
    if (attr === 'view') {
      return { mode: 'view', theme, onYellowButton: false };
    }
    if (attr === 'link') {
      return { mode: 'link', theme, onYellowButton };
    }
  }

  return { mode: 'default', theme, onYellowButton: false };
}

export function CustomCursor() {
  const [isSupported, setIsSupported] = useState(false);

  /* Smoothly trailing subtle yellowish glow behind default dot */
  const trailPosRef = useRef<HTMLDivElement | null>(null);
  const trailGlowRef = useRef<HTMLDivElement | null>(null);

  /* Primary cursor position wrapper + dot + 46px link circle + 72px view circle */
  const cursorPosRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const linkCircleRef = useRef<HTMLDivElement | null>(null);
  const linkArrowWrapRef = useRef<HTMLSpanElement | null>(null);
  const viewCircleRef = useRef<HTMLDivElement | null>(null);

  const activeModeRef = useRef<CursorMode>('default');
  const activeThemeRef = useRef<CursorSurfaceTheme>('dark');
  const activeYellowBtnRef = useRef(false);
  const hasPointerEnteredRef = useRef(false);
  const lastCoordsRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const fineMq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const coarseMq = window.matchMedia('(pointer: coarse)');
    const motionMq = window.matchMedia('(prefers-reduced-motion: reduce)');

    const syncSupport = () => {
      const supported = detectCursorSupport();
      setIsSupported(supported);
      if (!supported) {
        document.documentElement.classList.remove('by-custom-cursor-active');
      }
    };

    syncSupport();

    fineMq.addEventListener('change', syncSupport);
    coarseMq.addEventListener('change', syncSupport);
    motionMq.addEventListener('change', syncSupport);

    return () => {
      fineMq.removeEventListener('change', syncSupport);
      coarseMq.removeEventListener('change', syncSupport);
      motionMq.removeEventListener('change', syncSupport);
      document.documentElement.classList.remove('by-custom-cursor-active');
    };
  }, []);

  useEffect(() => {
    if (!isSupported) return;

    const trailPosEl = trailPosRef.current;
    const trailGlowEl = trailGlowRef.current;
    const posEl = cursorPosRef.current;
    const dotEl = dotRef.current;
    const linkCircleEl = linkCircleRef.current;
    const linkArrowWrapEl = linkArrowWrapRef.current;
    const viewCircleEl = viewCircleRef.current;

    if (
      !trailPosEl ||
      !trailGlowEl ||
      !posEl ||
      !dotEl ||
      !linkCircleEl ||
      !linkArrowWrapEl ||
      !viewCircleEl
    ) {
      return;
    }

    document.documentElement.classList.add('by-custom-cursor-active');

    const ctx = gsap.context(() => {
      gsap.set([posEl, trailPosEl], { x: -120, y: -120, autoAlpha: 0 });
      gsap.set(trailGlowEl, { scale: 1, autoAlpha: 0.72 });
      gsap.set(dotEl, {
        scale: 1,
        autoAlpha: 1,
        backgroundColor: '#F8C311',
      });
      gsap.set(linkCircleEl, {
        scale: 0.35,
        autoAlpha: 0,
        backgroundColor: '#F8C311',
        borderColor: '#F8C311',
      });
      gsap.set(linkArrowWrapEl, { color: '#0D0D0D' });
      gsap.set(viewCircleEl, {
        scale: 0.35,
        autoAlpha: 0,
      });
    });

    const quickX = gsap.quickTo(posEl, 'x', {
      duration: 0.085,
      ease: 'power3.out',
    });
    const quickY = gsap.quickTo(posEl, 'y', {
      duration: 0.085,
      ease: 'power3.out',
    });

    const trailQuickX = gsap.quickTo(trailPosEl, 'x', {
      duration: 0.36,
      ease: 'power3.out',
    });
    const trailQuickY = gsap.quickTo(trailPosEl, 'y', {
      duration: 0.36,
      ease: 'power3.out',
    });

    const applyVisualState = (
      mode: CursorMode,
      theme: CursorSurfaceTheme,
      onYellowButton: boolean
    ) => {
      activeModeRef.current = mode;
      activeThemeRef.current = theme;
      activeYellowBtnRef.current = onYellowButton;

      const defaultDotColor = theme === 'dark' ? '#F8C311' : '#111111';

      if (mode === 'text') {
        gsap.to(trailGlowEl, {
          scale: 0.35,
          autoAlpha: 0,
          duration: 0.18,
          ease: 'power2.out',
          overwrite: 'auto',
        });
        gsap.to(dotEl, {
          scale: 0.2,
          autoAlpha: 0,
          duration: 0.16,
          ease: 'power2.out',
          overwrite: 'auto',
        });
        gsap.to([linkCircleEl, viewCircleEl], {
          scale: 0.35,
          autoAlpha: 0,
          duration: 0.16,
          ease: 'power2.out',
          overwrite: 'auto',
        });
        return;
      }

      if (mode === 'link') {
        /* Yellow button hover -> White bg + Yellow border + Yellow arrow.
           All other links & buttons (incl. Services links) -> Yellow bg + Dark arrow. */
        const circleBg = onYellowButton ? '#FFFFFF' : '#F8C311';
        const circleBorder = '#F8C311';
        const arrowColor = onYellowButton ? '#F8C311' : '#0D0D0D';

        gsap.to(trailGlowEl, {
          scale: 0.5,
          autoAlpha: 0,
          duration: 0.2,
          ease: 'power2.out',
          overwrite: 'auto',
        });
        gsap.to(dotEl, {
          scale: 0.2,
          autoAlpha: 0,
          duration: 0.16,
          ease: 'power2.out',
          overwrite: 'auto',
        });
        gsap.to(viewCircleEl, {
          scale: 0.35,
          autoAlpha: 0,
          duration: 0.18,
          ease: 'power2.out',
          overwrite: 'auto',
        });
        gsap.to(linkCircleEl, {
          scale: 1,
          autoAlpha: 1,
          backgroundColor: circleBg,
          borderColor: circleBorder,
          duration: 0.24,
          ease: 'power3.out',
          overwrite: 'auto',
        });
        gsap.to(linkArrowWrapEl, {
          color: arrowColor,
          duration: 0.18,
          ease: 'power2.out',
          overwrite: 'auto',
        });
        return;
      }

      if (mode === 'view') {
        gsap.to(trailGlowEl, {
          scale: 0.5,
          autoAlpha: 0,
          duration: 0.2,
          ease: 'power2.out',
          overwrite: 'auto',
        });
        gsap.to(dotEl, {
          scale: 0.2,
          autoAlpha: 0,
          duration: 0.16,
          ease: 'power2.out',
          overwrite: 'auto',
        });
        gsap.to(linkCircleEl, {
          scale: 0.35,
          autoAlpha: 0,
          duration: 0.18,
          ease: 'power2.out',
          overwrite: 'auto',
        });
        gsap.to(viewCircleEl, {
          scale: 1,
          autoAlpha: 1,
          duration: 0.26,
          ease: 'power3.out',
          overwrite: 'auto',
        });
        return;
      }

      /* Default state: crisp dot + soft trailing glow */
      gsap.to(trailGlowEl, {
        scale: 1,
        autoAlpha: theme === 'yellow' ? 0.32 : 0.72,
        duration: 0.26,
        ease: 'power3.out',
        overwrite: 'auto',
      });
      gsap.to(dotEl, {
        scale: 1,
        autoAlpha: 1,
        backgroundColor: defaultDotColor,
        duration: 0.22,
        ease: 'power3.out',
        overwrite: 'auto',
      });
      gsap.to([linkCircleEl, viewCircleEl], {
        scale: 0.35,
        autoAlpha: 0,
        duration: 0.2,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    const syncTargetState = (target: Element | null) => {
      const next = resolveCursorState(target);
      if (
        next.mode !== activeModeRef.current ||
        next.theme !== activeThemeRef.current ||
        next.onYellowButton !== activeYellowBtnRef.current
      ) {
        applyVisualState(next.mode, next.theme, next.onYellowButton);
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;

      lastCoordsRef.current.x = e.clientX;
      lastCoordsRef.current.y = e.clientY;

      if (!hasPointerEnteredRef.current) {
        hasPointerEnteredRef.current = true;
        gsap.set([posEl, trailPosEl], {
          x: e.clientX,
          y: e.clientY,
          autoAlpha: 1,
        });
      } else {
        quickX(e.clientX);
        quickY(e.clientY);
        trailQuickX(e.clientX);
        trailQuickY(e.clientY);
      }

      const elTarget = e.target instanceof Element ? e.target : null;
      syncTargetState(elTarget);
    };

    const onPointerOver = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      const elTarget = e.target instanceof Element ? e.target : null;
      syncTargetState(elTarget);
    };

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === 'touch' || activeModeRef.current === 'text') return;
      if (activeModeRef.current === 'link') {
        gsap.to(linkCircleEl, { scale: 0.88, duration: 0.12, ease: 'power2.out' });
      } else if (activeModeRef.current === 'view') {
        gsap.to(viewCircleEl, { scale: 0.9, duration: 0.12, ease: 'power2.out' });
      } else {
        gsap.to(dotEl, { scale: 0.78, duration: 0.12, ease: 'power2.out' });
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      if (e.pointerType === 'touch' || activeModeRef.current === 'text') return;
      applyVisualState(
        activeModeRef.current,
        activeThemeRef.current,
        activeYellowBtnRef.current
      );
    };

    const onDocumentLeave = () => {
      hasPointerEnteredRef.current = false;
      gsap.to([posEl, trailPosEl], {
        autoAlpha: 0,
        duration: 0.18,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    const onDocumentEnter = (e: MouseEvent) => {
      lastCoordsRef.current.x = e.clientX;
      lastCoordsRef.current.y = e.clientY;
      hasPointerEnteredRef.current = true;
      gsap.set([posEl, trailPosEl], { x: e.clientX, y: e.clientY });
      gsap.to([posEl, trailPosEl], {
        autoAlpha: 1,
        duration: 0.18,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    let scrollRafId = 0;
    let clickTimerId = 0;

    const refreshFromLastCoords = () => {
      const { x, y } = lastCoordsRef.current;
      if (x >= 0 && y >= 0) {
        const hit = document.elementFromPoint(x, y);
        syncTargetState(hit);
      }
    };

    const onScroll = () => {
      if (!hasPointerEnteredRef.current || scrollRafId !== 0) return;
      scrollRafId = window.requestAnimationFrame(() => {
        scrollRafId = 0;
        refreshFromLastCoords();
      });
    };

    const onClick = () => {
      if (!hasPointerEnteredRef.current) return;
      if (clickTimerId !== 0) {
        window.clearTimeout(clickTimerId);
      }
      clickTimerId = window.setTimeout(() => {
        clickTimerId = 0;
        refreshFromLastCoords();
      }, 60);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('pointerover', onPointerOver, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('pointerup', onPointerUp, { passive: true });
    window.addEventListener('click', onClick, { passive: true });
    document.addEventListener('mouseleave', onDocumentLeave);
    document.addEventListener('mouseenter', onDocumentEnter);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      if (scrollRafId !== 0) {
        window.cancelAnimationFrame(scrollRafId);
      }
      if (clickTimerId !== 0) {
        window.clearTimeout(clickTimerId);
      }
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerover', onPointerOver);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('click', onClick);
      document.removeEventListener('mouseleave', onDocumentLeave);
      document.removeEventListener('mouseenter', onDocumentEnter);
      window.removeEventListener('scroll', onScroll);
      document.documentElement.classList.remove('by-custom-cursor-active');
      ctx.revert();
    };
  }, [isSupported]);

  if (!isSupported) {
    return null;
  }

  return (
    <>
      {/* Subtle Trailing Yellowish Glow Behind Default Dot */}
      <div
        ref={trailPosRef}
        aria-hidden="true"
        className="fixed top-0 left-0 z-[109] pointer-events-none select-none opacity-0 will-change-transform"
      >
        <div className="relative w-[34px] h-[34px] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
          <div
            ref={trailGlowRef}
            className="w-[28px] h-[28px] rounded-full bg-[#F8C311]/50 blur-[7px] will-change-transform"
          />
        </div>
      </div>

      {/* Primary Cursor: 10px Dot -> 46px Arrow Circle on Buttons/Links -> 72px VIEW Badge on Cards */}
      <div
        ref={cursorPosRef}
        aria-hidden="true"
        className="fixed top-0 left-0 z-[110] pointer-events-none select-none opacity-0 will-change-transform"
      >
        <div className="relative w-[72px] h-[72px] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
          {/* Default 10px Dot */}
          <div
            ref={dotRef}
            className="w-[10px] h-[10px] rounded-full bg-[#F8C311] will-change-transform"
          />

          {/* 46px Interactive Circle for Buttons & Links (White + Yellow Border/Arrow on Yellow Buttons; Yellow + Dark Arrow on Links) */}
          <div
            ref={linkCircleRef}
            className="absolute w-[46px] h-[46px] rounded-full border-[1.5px] border-[#F8C311] bg-[#F8C311] shadow-[0_10px_28px_rgba(0,0,0,0.28)] flex items-center justify-center will-change-transform"
          >
            <span
              ref={linkArrowWrapRef}
              className="inline-flex items-center justify-center text-[#0D0D0D]"
            >
              <ArrowUpRight className="w-[18px] h-[18px] stroke-[2.3]" />
            </span>
          </div>

          {/* 72px Editorial VIEW Badge for Portfolio & Featured Cards */}
          <div
            ref={viewCircleRef}
            className="absolute inset-0 rounded-full border-[1.5px] border-[#F8C311] bg-[#F8C311] shadow-[0_14px_34px_rgba(0,0,0,0.34)] flex items-center justify-center gap-0.5 text-[#0D0D0D] will-change-transform"
          >
            <span className="text-[10.5px] font-semibold tracking-[0.14em] uppercase leading-none">
              VIEW
            </span>
            <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.4] shrink-0" />
          </div>
        </div>
      </div>
    </>
  );
}
