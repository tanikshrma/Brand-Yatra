import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { NAV_ITEMS } from '../../data/site';
import { AppRoute, SERVICES_LIST, getServiceHref } from '../../data/services';
import { useSmoothScroll } from '../animations/SmoothScrollProvider';

interface MobileNavigationProps {
  isOpen: boolean;
  currentPath: AppRoute;
  onNavClick: (label: string, href: string) => void;
  onSelectServiceHref: (href: string) => void;
}

export function MobileNavigation({
  isOpen,
  currentPath,
  onNavClick,
  onSelectServiceHref,
}: MobileNavigationProps) {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const accordionWrapRef = useRef<HTMLDivElement | null>(null);
  const accordionInnerRef = useRef<HTMLUListElement | null>(null);
  const [servicesExpanded, setServicesExpanded] = useState(false);

  const { stopScroll, startScroll } = useSmoothScroll();

  const hasMountedRef = useRef(false);

  /* Sync scroll lock and staggered entrance when mobile overlay opens/closes */
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      if (!isOpen) {
        gsap.set(overlay, { autoAlpha: 0 });
        return;
      }
    }

    if (isOpen) {
      stopScroll();
      const ctx = gsap.context(() => {
        const items = overlay.querySelectorAll('[data-mobile-nav-item]');
        gsap.set(overlay, { autoAlpha: 1 });
        if (!reduced && items.length) {
          gsap.fromTo(
            items,
            { y: 18, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.36,
              stagger: 0.04,
              ease: 'power3.out',
              delay: 0.03,
              clearProps: 'transform',
            }
          );
        }
      }, overlay);

      return () => {
        ctx.revert();
        startScroll();
      };
    }

    setServicesExpanded(false);
    const tween = gsap.to(overlay, {
      autoAlpha: 0,
      duration: reduced ? 0.01 : 0.18,
      ease: 'power2.out',
    });

    return () => {
      tween.kill();
    };
  }, [isOpen, stopScroll, startScroll]);

  /* Smooth GSAP accordion height transition for the 12 mobile service links */
  useEffect(() => {
    const wrap = accordionWrapRef.current;
    const inner = accordionInnerRef.current;
    if (!wrap || !inner) return;
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    gsap.killTweensOf(wrap);

    if (reduced) {
      gsap.set(wrap, {
        height: servicesExpanded ? 'auto' : 0,
        autoAlpha: servicesExpanded ? 1 : 0,
      });
      return;
    }

    if (servicesExpanded) {
      gsap.set(wrap, { autoAlpha: 1 });
      gsap.fromTo(
        wrap,
        { height: wrap.offsetHeight },
        {
          height: inner.offsetHeight,
          duration: 0.3,
          ease: 'power2.out',
          onComplete: () => {
            gsap.set(wrap, { height: 'auto' });
          },
        }
      );
    } else {
      gsap.fromTo(
        wrap,
        { height: wrap.offsetHeight, autoAlpha: 1 },
        {
          height: 0,
          autoAlpha: 0,
          duration: 0.24,
          ease: 'power2.inOut',
        }
      );
    }
  }, [servicesExpanded]);

  const isServicesActive = currentPath.startsWith('/services/');

  return (
    <div
      id="by-mobile-navigation-drawer"
      ref={overlayRef}
      data-cursor-theme="dark"
      data-lenis-prevent
      aria-hidden={!isOpen}
      className={`fixed inset-0 z-[75] bg-[#0D0D0D] lg:hidden overflow-y-auto overflow-x-hidden flex flex-col pt-24 pb-10 px-5 md:px-9 ${
        isOpen ? 'pointer-events-auto' : 'pointer-events-none invisible opacity-0'
      }`}
    >
      <nav aria-label="Mobile Navigation" className="flex flex-col gap-3">
        {NAV_ITEMS.map((item) => {
          if (item.hasDropdown) {
            return (
              <div
                key={item.label}
                data-mobile-nav-item
                className="border-b border-[#262626] pb-3"
              >
                <button
                  type="button"
                  aria-expanded={servicesExpanded}
                  aria-controls="by-mobile-services-accordion"
                  onClick={() => setServicesExpanded((prev) => !prev)}
                  className={`w-full min-h-[44px] flex items-center justify-between font-heading text-[32px] leading-none tracking-[0.02em] cursor-pointer focus-visible:outline-2 focus-visible:outline-[#F8C311] ${
                    isServicesActive || servicesExpanded ? 'text-[#F8C311]' : 'text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#F8C311] transition-transform duration-200 ${
                      servicesExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <div
                  id="by-mobile-services-accordion"
                  ref={accordionWrapRef}
                  className="overflow-hidden h-0 opacity-0"
                >
                  <ul
                    ref={accordionInnerRef}
                    className="mt-3 border-t border-[#292929] divide-y divide-[#292929] flex flex-col"
                  >
                    {SERVICES_LIST.map((service) => {
                      const href = getServiceHref(service.slug);
                      const isCurrent = currentPath === href;

                      return (
                        <li key={service.slug}>
                          <a
                            href={href}
                            tabIndex={isOpen && servicesExpanded ? 0 : -1}
                            aria-current={isCurrent ? 'page' : undefined}
                            onClick={(e) => {
                              e.preventDefault();
                              setServicesExpanded(false);
                              onSelectServiceHref(href);
                            }}
                            className={`group/msrv min-h-[52px] py-2.5 px-1 flex items-center justify-between gap-4 transition-colors focus-visible:outline-2 focus-visible:outline-[#F8C311] ${
                              isCurrent
                                ? 'text-[#F8C311]'
                                : 'text-white hover:text-[#F8C311]'
                            }`}
                          >
                            <span className="flex items-center min-w-0">
                              <span
                                className={`w-[32px] shrink-0 font-sans text-[12.5px] font-semibold tabular-nums transition-colors ${
                                  isCurrent
                                    ? 'text-[#F8C311]'
                                    : 'text-[#777777] group-hover/msrv:text-[#F8C311]'
                                }`}
                              >
                                {service.number}
                              </span>
                              <span className="font-heading uppercase text-[23px] sm:text-[25px] leading-[1.1] tracking-[0.012em] truncate">
                                {service.navigationLabel}
                              </span>
                            </span>
                            <ArrowUpRight
                              className={`w-[18px] h-[18px] shrink-0 transition-colors ${
                                isCurrent
                                  ? 'text-[#F8C311]'
                                  : 'text-[#777777] group-hover/msrv:text-[#F8C311]'
                              }`}
                            />
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            );
          }

          const isWorkRoute =
            currentPath === '/work' || currentPath.startsWith('/work/');
          const isInsightsRoute =
            currentPath === '/insights' || currentPath.startsWith('/insights/');

          const isActive =
            (item.label === 'Home' && currentPath === '/') ||
            (item.label === 'About' && currentPath === '/about') ||
            (item.label === 'Work' && isWorkRoute) ||
            (item.label === 'Process' && currentPath === '/process') ||
            (item.label === 'Insights' && isInsightsRoute) ||
            (item.label === 'Contact' && currentPath === '/contact');

          const linkHref =
            item.label === 'Home'
              ? '/'
              : item.label === 'About'
                ? '/about'
                : item.label === 'Work'
                  ? '/work'
                  : item.label === 'Process'
                    ? '/process'
                    : item.label === 'Insights'
                      ? '/insights'
                      : item.label === 'Contact'
                        ? '/contact'
                        : item.href;

          return (
            <div key={item.label} data-mobile-nav-item className="border-b border-[#262626] pb-3">
              <a
                href={linkHref}
                tabIndex={isOpen ? 0 : -1}
                aria-current={isActive ? 'page' : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  onNavClick(item.label, item.href);
                }}
                className={`min-h-[44px] flex items-center justify-between font-heading text-[32px] leading-none tracking-[0.02em] focus-visible:outline-2 focus-visible:outline-[#F8C311] ${
                  isActive ? 'text-[#F8C311]' : 'text-white'
                }`}
              >
                <span>{item.label}</span>
                <ArrowUpRight className="w-5 h-5 text-[#F8C311]" />
              </a>
            </div>
          );
        })}
      </nav>
    </div>
  );
}
