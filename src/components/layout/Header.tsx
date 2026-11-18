import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { BrandLogo } from '../ui/BrandLogo';
import { BrandButton } from '../ui/BrandButton';
import { NAV_ITEMS, SITE_CONFIG } from '../../data/site';
import { AppRoute } from '../../data/services';
import { useSmoothScroll } from '../animations/SmoothScrollProvider';
import { ServicesMegaMenu } from './ServicesMegaMenu';
import { MobileNavigation } from './MobileNavigation';

interface HeaderProps {
  currentPath: AppRoute;
  onNavigate: (path: AppRoute, hash?: string) => void;
  onStartProject: (preselectedService?: string) => void;
}

const MEGA_MENU_ID = 'by-services-mega-menu';

export function Header({
  currentPath,
  onNavigate,
  onStartProject,
}: HeaderProps) {
  const headerRef = useRef<HTMLElement | null>(null);
  const servicesItemWrapRef = useRef<HTMLDivElement | null>(null);
  const servicesTriggerRef = useRef<HTMLButtonElement | null>(null);
  const firstMegaLinkRef = useRef<HTMLAnchorElement | null>(null);
  const closeHoverTimeoutRef = useRef<number | null>(null);

  const [isScrolled, setIsScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { scrollTo, stopScroll, startScroll } = useSmoothScroll();

  const clearHoverCloseTimer = () => {
    if (closeHoverTimeoutRef.current !== null) {
      window.clearTimeout(closeHoverTimeoutRef.current);
      closeHoverTimeoutRef.current = null;
    }
  };

  /* Close menus automatically whenever currentPath changes */
  useEffect(() => {
    setServicesOpen(false);
    setMobileMenuOpen(false);
  }, [currentPath]);

  /* Pause background smooth scrolling while the 100vh desktop mega menu is open */
  useEffect(() => {
    if (servicesOpen) {
      stopScroll();
      return () => {
        if (!mobileMenuOpen) {
          startScroll();
        }
      };
    }
  }, [servicesOpen, mobileMenuOpen, stopScroll, startScroll]);

  /* Track scroll threshold for desktop transparent-at-top -> frosted-blur navbar */
  useEffect(() => {
    const onScroll = () => {
      const y =
        window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
      setIsScrolled(y > 18);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Close mega menu & mobile overlay on Escape or outside click */
  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      if (
        servicesOpen &&
        servicesItemWrapRef.current &&
        e.target instanceof Node &&
        !servicesItemWrapRef.current.contains(e.target)
      ) {
        setServicesOpen(false);
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (servicesOpen) {
          const focusInsideMenu =
            servicesItemWrapRef.current &&
            document.activeElement instanceof Node &&
            servicesItemWrapRef.current.contains(document.activeElement);
          setServicesOpen(false);
          if (focusInsideMenu) {
            servicesTriggerRef.current?.focus();
          }
        }
        if (mobileMenuOpen) {
          setMobileMenuOpen(false);
        }
      }
    };

    document.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      clearHoverCloseTimer();
      document.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [servicesOpen, mobileMenuOpen]);

  const handleDesktopMouseEnter = () => {
    if (!window.matchMedia('(min-width: 1024px) and (hover: hover) and (pointer: fine)').matches) {
      return;
    }
    clearHoverCloseTimer();
    setServicesOpen(true);
  };

  const handleDesktopMouseLeave = () => {
    if (!window.matchMedia('(min-width: 1024px) and (hover: hover) and (pointer: fine)').matches) {
      return;
    }
    clearHoverCloseTimer();
    closeHoverTimeoutRef.current = window.setTimeout(() => {
      setServicesOpen(false);
    }, 130);
  };

  const handleNavClick = (label: string, href: string) => {
    clearHoverCloseTimer();
    setServicesOpen(false);
    setMobileMenuOpen(false);

    if (label === 'About') {
      onNavigate('/about');
      return;
    }

    if (label === 'Work') {
      onNavigate('/work');
      return;
    }

    if (label === 'Process') {
      onNavigate('/process');
      return;
    }

    if (label === 'Insights') {
      onNavigate('/insights');
      return;
    }

    if (label === 'Contact') {
      onNavigate('/contact');
      return;
    }

    if (label === 'Home') {
      if (currentPath === '/') {
        scrollTo('#home');
      } else {
        onNavigate('/');
      }
      return;
    }

    onNavigate(href);
  };

  const handleSelectServiceHref = (serviceHref: string) => {
    clearHoverCloseTimer();
    setServicesOpen(false);
    setMobileMenuOpen(false);
    onNavigate(serviceHref);
  };

  const isServicesRoute = currentPath.startsWith('/services/');

  return (
    <>
      <header
        ref={headerRef}
        data-cursor-theme="dark"
        className={`by-site-header ${
          servicesOpen ? 'is-mega-open' : isScrolled ? 'is-scrolled' : ''
        }`}
      >
        <div className="by-container h-16 lg:h-[78px] flex items-center justify-between gap-3 lg:gap-8">
          {/* Zone 1: Brand Wordmark */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('Home', '#home');
            }}
            className="inline-flex items-center min-w-0 shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F8C311]"
            aria-label="Brand Yatra Home"
          >
            <BrandLogo size="md" variant="white" priority />
          </a>

          {/* Zone 2: Primary Desktop Navigation + 12-Service Mega Menu */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center h-full gap-7 xl:gap-9"
          >
            {NAV_ITEMS.map((item) => {
              if (item.hasDropdown) {
                const isHighlighted = isServicesRoute;

                return (
                  <div
                    key={item.label}
                    ref={servicesItemWrapRef}
                    className="static h-full flex items-center"
                    onMouseEnter={handleDesktopMouseEnter}
                    onMouseLeave={handleDesktopMouseLeave}
                    onBlur={(e) => {
                      if (
                        servicesOpen &&
                        servicesItemWrapRef.current &&
                        e.relatedTarget instanceof Node &&
                        !servicesItemWrapRef.current.contains(e.relatedTarget)
                      ) {
                        setServicesOpen(false);
                      }
                    }}
                  >
                    <button
                      ref={servicesTriggerRef}
                      type="button"
                      data-cursor="link"
                      aria-expanded={servicesOpen}
                      aria-haspopup="true"
                      aria-controls={MEGA_MENU_ID}
                      onClick={() => {
                        clearHoverCloseTimer();
                        setServicesOpen((prev) => !prev);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'ArrowDown') {
                          e.preventDefault();
                          if (!servicesOpen) {
                            setServicesOpen(true);
                          }
                          window.requestAnimationFrame(() => {
                            firstMegaLinkRef.current?.focus();
                          });
                        }
                      }}
                      className={`group relative h-full inline-flex items-center gap-1 text-[13.5px] font-normal transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F8C311] ${
                        isHighlighted || servicesOpen
                          ? 'text-[#F8C311]'
                          : 'text-[#A8A8A8] hover:text-[#F8C311]'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          servicesOpen
                            ? 'rotate-180 text-[#F8C311]'
                            : isServicesRoute
                              ? 'text-[#F8C311]'
                              : 'text-white/50 group-hover:text-[#F8C311]'
                        }`}
                      />
                    </button>

                    <ServicesMegaMenu
                      id={MEGA_MENU_ID}
                      isOpen={servicesOpen}
                      currentPath={currentPath}
                      onSelectServiceHref={handleSelectServiceHref}
                      firstLinkRef={firstMegaLinkRef}
                    />
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
                <a
                  key={item.label}
                  href={linkHref}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.label, item.href);
                  }}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative h-full inline-flex items-center text-[13.5px] font-normal no-underline transition-colors duration-200 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F8C311] ${
                    isActive ? 'text-[#F8C311]' : 'text-[#A8A8A8] hover:text-white'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Desktop-Only Primary CTA + Mobile Hamburger Menu Toggle */}
          <div className="flex items-center shrink-0">
            <div className="hidden lg:flex">
              <BrandButton
                variant="gold"
                size="sm"
                onClick={() => {
                  clearHoverCloseTimer();
                  setServicesOpen(false);
                  setMobileMenuOpen(false);
                  onStartProject();
                }}
              >
                {SITE_CONFIG.headerCta}
              </BrandButton>
            </div>

            <button
              type="button"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="by-mobile-navigation-drawer"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className={`lg:hidden w-[42px] h-[42px] rounded-none border flex items-center justify-center cursor-pointer shrink-0 focus-visible:outline-2 focus-visible:outline-[#F8C311] ${
                mobileMenuOpen
                  ? 'border-[#F8C311] bg-[#171717] text-[#F8C311]'
                  : 'border-[#3A3A3A] bg-[#171717] text-white'
              }`}
            >
              {mobileMenuOpen ? (
                <X className="w-[21px] h-[21px] stroke-[2.2]" aria-hidden="true" />
              ) : (
                <Menu className="w-[21px] h-[21px] stroke-[2.2]" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      <MobileNavigation
        isOpen={mobileMenuOpen}
        currentPath={currentPath}
        onNavClick={handleNavClick}
        onSelectServiceHref={handleSelectServiceHref}
      />
    </>
  );
}
