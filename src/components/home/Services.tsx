import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SERVICES_DATA } from '../../data/site';
import { AppRoute, ServiceSlug, getServiceHref } from '../../data/services';
import { ResilientImage } from '../ui/ResilientImage';
import { useTextReveal, useStaggerReveal } from '../animations/gsapHooks';

interface ServicesProps {
  onNavigate: (path: AppRoute, hash?: string) => void;
}

interface CardRouteMapping {
  primarySlug: ServiceSlug;
  relatedLinks: { label: string; slug: ServiceSlug }[];
}

const SERVICE_CARD_ROUTES: Record<string, CardRouteMapping> = {
  'branding-identity': {
    primarySlug: 'branding',
    relatedLinks: [
      { label: 'Branding', slug: 'branding' },
      { label: 'Graphic Design', slug: 'graphic-design' },
      { label: 'Content', slug: 'content' },
    ],
  },
  'digital-marketing': {
    primarySlug: 'lead-generation',
    relatedLinks: [
      { label: 'Lead Generation', slug: 'lead-generation' },
      { label: 'Google Ads', slug: 'google-ads' },
      { label: 'SEO', slug: 'seo' },
      { label: 'Meta Ads', slug: 'meta-ads' },
      { label: 'Social Media', slug: 'social-media' },
    ],
  },
  'website-development': {
    primarySlug: 'web-development',
    relatedLinks: [
      { label: 'Web Development', slug: 'web-development' },
      { label: 'UI / UX', slug: 'ui-ux' },
      { label: 'Analytics & CRO', slug: 'analytics-cro' },
    ],
  },
  'creative-studio': {
    primarySlug: 'video-motion',
    relatedLinks: [
      { label: 'Video & Motion', slug: 'video-motion' },
      { label: 'Graphic Design', slug: 'graphic-design' },
      { label: 'Social Media', slug: 'social-media' },
    ],
  },
};

export function Services({ onNavigate }: ServicesProps) {
  const headerRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  useTextReveal(headerRef, { stagger: 0.08, duration: 0.8 });
  useStaggerReveal(gridRef, { y: 26, stagger: 0.1, duration: 0.8, start: 'top 84%' });

  return (
    <section
      id="services"
      data-cursor-theme="dark"
      className="bg-[#0D0D0D] text-white by-section-spacing"
    >
      <div className="by-container">
        {/* 12-Column Editorial Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 lg:items-end mb-16 lg:mb-24">
          <div ref={headerRef} className="lg:col-span-7">
            <span className="eyebrow-label text-[#A8A8A8] block mb-5">
              WHAT WE DO / CAPABILITIES
            </span>

            <h2 className="heading-section text-white">
              <span className="block overflow-hidden py-[0.04em] -my-[0.02em]">
                <span data-reveal-line className="block">
                  Everything your brand needs.
                </span>
              </span>
              <span className="block overflow-hidden py-[0.04em] -my-[0.02em]">
                <span data-reveal-line className="block">
                  All under <span className="text-[#F8C311]">one roof.</span>
                </span>
              </span>
            </h2>
          </div>

          <div className="lg:col-span-5">
            <p className="text-[16px] leading-[1.62] text-[#A8A8A8] max-w-[450px] lg:ml-auto">
              From shaping your brand&apos;s identity to engineering digital products and
              performance campaigns, explore our dedicated capabilities.
            </p>
          </div>
        </div>

        {/* Four Spacious Editorial Service Pillars Linking Directly to Dynamic Service Pages */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-10 gap-y-12 lg:gap-y-14"
        >
          {SERVICES_DATA.map((service) => {
            const mapping = SERVICE_CARD_ROUTES[service.id] ?? {
              primarySlug: 'branding' as ServiceSlug,
              relatedLinks: [],
            };
            const primaryHref = getServiceHref(mapping.primarySlug);

            return (
              <article
                key={service.id}
                data-stagger-item
                className="group relative bg-[#171717] flex flex-col justify-between overflow-hidden transition-colors duration-300 hover:bg-[#1C1C1C]"
              >
                {/* Clickable Image & Primary Service Link */}
                <a
                  href={primaryHref}
                  data-cursor="link"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(primaryHref);
                  }}
                  aria-label={`${service.title} — ${service.ctaLabel}`}
                  className="block focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#F8C311]"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#121212]">
                    <ResilientImage
                      src={service.image}
                      alt={service.imageAlt}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                  </div>

                  <div className="px-7 sm:px-9 pt-7 sm:pt-8">
                    <div className="flex items-baseline justify-between gap-4 mb-3">
                      <span className="text-xs font-semibold tracking-[0.14em] text-[#F8C311] tabular-nums">
                        {service.number} /
                      </span>
                      <ArrowUpRight className="w-5 h-5 text-white/45 group-hover:text-[#F8C311] transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
                    </div>

                    <h3 className="font-heading text-[30px] sm:text-[36px] leading-[1.02] tracking-[0.02em] text-white group-hover:text-[#F8C311] transition-colors duration-200">
                      {service.title}
                    </h3>

                    <p className="text-[16px] leading-[1.6] text-[#A8A8A8] mt-3 max-w-[500px]">
                      {service.description}
                    </p>
                  </div>
                </a>

                {/* Unboxed Direct Links to Individual Dynamic Service Pages */}
                <div className="px-7 sm:px-9 pb-7 sm:pb-8 pt-6 mt-6 border-t border-white/[0.08] flex flex-wrap items-center gap-x-2.5 gap-y-2 text-[13px] text-[#A8A8A8]">
                  {mapping.relatedLinks.map((rel, idx) => {
                    const relHref = getServiceHref(rel.slug);
                    return (
                      <span key={rel.slug} className="inline-flex items-center gap-2.5">
                        {idx > 0 && (
                          <span className="text-white/25" aria-hidden="true">
                            ·
                          </span>
                        )}
                        <a
                          href={relHref}
                          data-cursor="link"
                          onClick={(e) => {
                            e.preventDefault();
                            onNavigate(relHref);
                          }}
                          className="hover:text-[#F8C311] transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#F8C311]"
                        >
                          {rel.label}
                        </a>
                      </span>
                    );
                  })}
                </div>

                {/* AboutPage-Style Animated Yellow Bottom Hairline */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-full bg-[#F8C311] origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100"
                />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
