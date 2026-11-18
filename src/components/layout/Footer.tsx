import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { BrandLogo } from '../ui/BrandLogo';
import { BrandButton } from '../ui/BrandButton';
import { SITE_CONFIG } from '../../data/site';
import { AppRoute, SERVICES_LIST, getServiceHref } from '../../data/services';
import { useSmoothScroll } from '../animations/SmoothScrollProvider';
import { useGSAPReveal } from '../animations/gsapHooks';

interface FooterProps {
  currentPath: AppRoute;
  onNavigate: (path: AppRoute, hash?: string) => void;
  onStartProject: (service?: string) => void;
}

export function Footer({
  currentPath,
  onNavigate,
  onStartProject,
}: FooterProps) {
  const footerRef = useRef<HTMLDivElement | null>(null);
  const { scrollTo } = useSmoothScroll();

  useGSAPReveal(footerRef, { y: 18, duration: 0.8, start: 'top 94%' });

  const handleFooterLink = (href: string) => {
    if (href === '/' && currentPath === '/') {
      scrollTo('#home');
      return;
    }
    onNavigate(href);
  };

  const configuredSocials = Object.entries(SITE_CONFIG.socials || {}).filter(
    ([, url]) => typeof url === 'string' && url.trim().length > 0
  );

  return (
    <footer
      id="footer-connect"
      data-cursor-theme="dark"
      className="bg-[#0D0D0D] text-white border-t border-white/[0.08]"
    >
      <div
        ref={footerRef}
        className="by-container pt-20 pb-12 lg:pt-28 lg:pb-14"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-10 pb-16 lg:pb-20">
          {/* Left Editorial Brand Column */}
          <div className="lg:col-span-4">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                handleFooterLink('/');
              }}
              className="inline-flex items-center focus-visible:outline-2 focus-visible:outline-[#F8C311]"
              aria-label="Brand Yatra Home"
            >
              <BrandLogo size="md" variant="white" />
            </a>

            <p className="font-heading uppercase whitespace-nowrap text-[14.5px] min-[375px]:text-[17px] sm:text-[21px] lg:text-[14.5px] xl:text-[18.5px] 2xl:text-[20px] tracking-[0.018em] leading-none text-white mt-6">
              {SITE_CONFIG.tagline}
            </p>

            <p className="text-[15.5px] leading-[1.6] text-[#A8A8A8] mt-4 max-w-[360px]">
              {SITE_CONFIG.footerDescription}
            </p>

            {configuredSocials.length > 0 && (
              <div className="flex flex-wrap items-center gap-4 mt-8">
                {configuredSocials.map(([platform, url]) => (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[13px] uppercase tracking-[0.12em] text-white/75 hover:text-[#F8C311] transition-colors"
                  >
                    <span>{platform}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#F8C311]" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Right Navigation, All 12 Dynamic Service Routes & Connect */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-6">
            {/* Navigation Column */}
            <div className="lg:col-span-3">
              <h3 className="eyebrow-label text-white/50 mb-5">Navigation</h3>
              <ul className="space-y-3">
                {SITE_CONFIG.footerQuickLinks.map((link) => {
                  const isCurrent =
                    (link.href === '/' && currentPath === '/') ||
                    (link.href === '/about' && currentPath === '/about') ||
                    (link.href === '/work' &&
                      (currentPath === '/work' || currentPath.startsWith('/work/'))) ||
                    (link.href === '/process' && currentPath === '/process') ||
                    (link.href === '/insights' &&
                      (currentPath === '/insights' || currentPath.startsWith('/insights/'))) ||
                    (link.href === '/contact' && currentPath === '/contact');

                  return (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        data-cursor="link"
                        aria-current={isCurrent ? 'page' : undefined}
                        onClick={(e) => {
                          e.preventDefault();
                          handleFooterLink(link.href);
                        }}
                        className={`inline-block py-0.5 text-[15px] transition-colors ${
                          isCurrent
                            ? 'text-[#F8C311] font-medium'
                            : 'text-[#A8A8A8] hover:text-white'
                        }`}
                      >
                        {link.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Services Column (Single Column on Mobile, Clean Two-Subcolumn Grid on Tablet/Desktop) */}
            <div className="lg:col-span-5">
              <h3 className="eyebrow-label text-white/50 mb-5">Services</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5">
                {SERVICES_LIST.map((service) => {
                  const href = getServiceHref(service.slug);
                  const isCurrent = currentPath === href;
                  return (
                    <li key={service.slug}>
                      <a
                        href={href}
                        data-cursor="link"
                        aria-current={isCurrent ? 'page' : undefined}
                        onClick={(e) => {
                          e.preventDefault();
                          onNavigate(href);
                        }}
                        className={`inline-block py-0.5 text-[14.5px] transition-colors ${
                          isCurrent
                            ? 'text-[#F8C311] font-medium'
                            : 'text-[#A8A8A8] hover:text-white'
                        }`}
                      >
                        {service.navigationLabel}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Connect Column */}
            <div className="lg:col-span-4">
              <h3 className="eyebrow-label text-white/50 mb-5">Connect</h3>
              <div className="space-y-3 text-[15px] text-[#A8A8A8]">
                <a
                  href={`mailto:${SITE_CONFIG.contact.email}`}
                  className="block text-white hover:text-[#F8C311] transition-colors break-words"
                >
                  {SITE_CONFIG.contact.email}
                </a>
                {SITE_CONFIG.contact.phone && (
                  <a
                    href={`tel:${SITE_CONFIG.contact.phone.replace(/\s+/g, '')}`}
                    className="block tabular-nums hover:text-white transition-colors"
                  >
                    {SITE_CONFIG.contact.phone}
                  </a>
                )}
                {SITE_CONFIG.contact.location && (
                  <p>{SITE_CONFIG.contact.location}</p>
                )}
              </div>

              <div className="mt-7">
                <BrandButton
                  variant="gold"
                  size="sm"
                  onClick={() => onStartProject()}
                >
                  {SITE_CONFIG.headerCta}
                </BrandButton>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal Bar with Crawlable Legal Routes */}
        <div className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A8A8A8]">
          <p>© {new Date().getFullYear()} Brand Yatra. All Rights Reserved.</p>
          <div className="flex flex-wrap items-center gap-6">
            <a
              href="/privacy-policy"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/privacy-policy');
              }}
              className={
                currentPath === '/privacy-policy'
                  ? 'text-[#F8C311]'
                  : 'hover:text-white transition-colors'
              }
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/terms');
              }}
              className={
                currentPath === '/terms'
                  ? 'text-[#F8C311]'
                  : 'hover:text-white transition-colors'
              }
            >
              Terms &amp; Conditions
            </a>
            <a
              href="/cookie-policy"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/cookie-policy');
              }}
              className={
                currentPath === '/cookie-policy'
                  ? 'text-[#F8C311]'
                  : 'hover:text-white transition-colors'
              }
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
