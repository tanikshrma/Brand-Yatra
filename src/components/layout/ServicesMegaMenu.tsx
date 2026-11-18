import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowUpRight } from 'lucide-react';
import {
  AppRoute,
  SERVICES_LIST,
  ServicePageData,
  getServiceHref,
} from '../../data/services';

interface ServicesMegaMenuProps {
  id: string;
  isOpen: boolean;
  currentPath: AppRoute;
  onSelectServiceHref: (href: string) => void;
  firstLinkRef?: React.RefObject<HTMLAnchorElement | null>;
}

export function ServicesMegaMenu({
  id,
  isOpen,
  currentPath,
  onSelectServiceHref,
  firstLinkRef,
}: ServicesMegaMenuProps) {
  const menuWrapRef = useRef<HTMLDivElement | null>(null);
  const hasMountedRef = useRef(false);

  const leftColumn = SERVICES_LIST.slice(0, 6);
  const rightColumn = SERVICES_LIST.slice(6, 12);

  useEffect(() => {
    const el = menuWrapRef.current;
    if (!el) return;

    const rows = el.querySelectorAll<HTMLElement>('[data-mega-service-row]');
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* Initial mount while closed: set hidden state immediately without playing close tween */
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      if (!isOpen) {
        gsap.set(el, { autoAlpha: 0, y: -12 });
        return;
      }
    }

    gsap.killTweensOf(el);
    if (rows.length) {
      gsap.killTweensOf(rows);
    }

    if (isOpen) {
      if (reduced) {
        gsap.set(el, { autoAlpha: 1, y: 0 });
        if (rows.length) {
          gsap.set(rows, { opacity: 1, y: 0 });
        }
      } else {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: -12 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.35,
            ease: 'power3.out',
            overwrite: 'auto',
          }
        );

        if (rows.length) {
          gsap.fromTo(
            rows,
            { opacity: 0, y: -8 },
            {
              opacity: 1,
              y: 0,
              duration: 0.32,
              stagger: 0.024,
              ease: 'power3.out',
              clearProps: 'transform',
              overwrite: 'auto',
            }
          );
        }
      }
    } else {
      gsap.to(el, {
        autoAlpha: 0,
        y: -8,
        duration: reduced ? 0.01 : 0.2,
        ease: 'power2.inOut',
        overwrite: 'auto',
      });
    }

    return () => {
      gsap.killTweensOf(el);
      if (rows.length) {
        gsap.killTweensOf(rows);
      }
    };
  }, [isOpen]);

  const renderServiceRow = (service: ServicePageData, isFirstItem = false) => {
    const href = getServiceHref(service.slug);
    const isCurrent = currentPath === href;

    return (
      <li
        key={service.slug}
        data-mega-service-row
        className="flex-1 flex border-b border-[#292929]"
      >
        <a
          ref={isFirstItem ? firstLinkRef : undefined}
          href={href}
          data-cursor="link"
          tabIndex={isOpen ? 0 : -1}
          aria-current={isCurrent ? 'page' : undefined}
          onClick={(e) => {
            e.preventDefault();
            onSelectServiceHref(href);
          }}
          className={`group/srv w-full min-h-[66px] xl:min-h-[76px] px-3 flex items-center justify-between gap-6 rounded-none transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#F8C311] ${
            isCurrent
              ? 'bg-[#171717]'
              : 'bg-transparent hover:bg-[#1B1B1B] focus-visible:bg-[#1B1B1B]'
          }`}
        >
          {/* Left: Fixed-Width Service Number + Large Condensed Display Title */}
          <span className="flex items-center min-w-0">
            <span
              className={`w-[36px] shrink-0 font-sans text-[13.5px] font-semibold leading-none tabular-nums transition-colors duration-200 ${
                isCurrent
                  ? 'text-[#F8C311]'
                  : 'text-[#777777] group-hover/srv:text-[#F8C311] group-focus-visible/srv:text-[#F8C311]'
              }`}
            >
              {service.number}
            </span>

            <span
              className={`font-heading uppercase text-[28px] xl:text-[33px] min-[1440px]:text-[38px] leading-[1.06] tracking-[0.012em] transition-[transform,color] duration-200 ease-out will-change-transform ${
                isCurrent
                  ? 'text-[#F8C311]'
                  : 'text-white group-hover/srv:text-[#F8C311] group-hover/srv:translate-x-[6px] group-focus-visible/srv:text-[#F8C311] group-focus-visible/srv:translate-x-[6px]'
              }`}
            >
              {service.navigationLabel}
            </span>
          </span>

          {/* Right: Minimal Diagonal Arrow-Up-Right Icon */}
          <ArrowUpRight
            className={`w-[20px] h-[20px] shrink-0 stroke-[1.85] transition-[transform,color] duration-200 ease-out will-change-transform ${
              isCurrent
                ? 'text-[#F8C311]'
                : 'text-[#777777] group-hover/srv:text-[#F8C311] group-hover/srv:translate-x-[4px] group-hover/srv:-translate-y-[4px] group-focus-visible/srv:text-[#F8C311] group-focus-visible/srv:translate-x-[4px] group-focus-visible/srv:-translate-y-[4px]'
            }`}
          />
        </a>
      </li>
    );
  };

  return (
    <div
      id={id}
      ref={menuWrapRef}
      aria-hidden={!isOpen}
      data-cursor-theme="dark"
      data-lenis-prevent
      className={`hidden lg:block absolute left-0 right-0 top-full w-full h-[calc(100vh-78px)] supports-[height:100dvh]:h-[calc(100dvh-78px)] z-50 bg-[#111111] border-t border-b border-[#292929] overflow-y-auto overscroll-contain invisible opacity-0 will-change-transform ${
        isOpen ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
    >
      <div className="min-h-full w-full max-w-[1440px] mx-auto px-10 xl:px-[64px] py-8 xl:py-12 flex flex-col justify-center">
        <div className="flex-1 max-h-[680px] grid grid-cols-2 gap-x-[48px] xl:gap-x-[88px] 2xl:gap-x-[100px]">
          {/* Left Column: Services 01–06 */}
          <ul className="flex flex-col border-t border-[#292929]">
            {leftColumn.map((service, idx) => renderServiceRow(service, idx === 0))}
          </ul>

          {/* Right Column: Services 07–12 */}
          <ul className="flex flex-col border-t border-[#292929]">
            {rightColumn.map((service) => renderServiceRow(service, false))}
          </ul>
        </div>
      </div>
    </div>
  );
}
