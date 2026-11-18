import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SITE_CONFIG } from '../../data/site';
import { useStaggerReveal } from '../animations/gsapHooks';

function isUnverifiedPlaceholder(value: string): boolean {
  const trimmed = value.trim();
  return !trimmed || (trimmed.startsWith('[') && trimmed.endsWith(']'));
}

export function ContactInfo() {
  const stripRef = useRef<HTMLDivElement | null>(null);

  useStaggerReveal(stripRef, {
    y: 20,
    stagger: 0.08,
    duration: 0.78,
    start: 'top 90%',
  });

  const configuredSocials = Object.entries(SITE_CONFIG.socials || {}).filter(
    ([, url]) => typeof url === 'string' && url.trim().length > 0
  );

  return (
    <section
      data-cursor-theme="dark"
      aria-label="Direct Contact Information"
      className="bg-[#171717] text-white py-16 sm:py-20 lg:py-24 border-t border-white/[0.08]"
    >
      <div className="by-container">
        <div
          ref={stripRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8"
        >
          {/* EMAIL */}
          <div
            data-stagger-item
            className="pt-5 border-t border-white/[0.12]"
          >
            <span className="eyebrow-label text-[#A8A8A8] block mb-3">
              EMAIL
            </span>
            <a
              href={`mailto:${SITE_CONFIG.contact.email}`}
              className="text-[18px] sm:text-[19px] font-medium text-white hover:text-[#F8C311] transition-colors break-words focus-visible:outline-2 focus-visible:outline-[#F8C311]"
            >
              {SITE_CONFIG.contact.email}
            </a>
          </div>

          {/* PHONE */}
          <div
            data-stagger-item
            className="pt-5 border-t border-white/[0.12]"
          >
            <span className="eyebrow-label text-[#A8A8A8] block mb-3">
              PHONE
            </span>
            {isUnverifiedPlaceholder(SITE_CONFIG.contact.phone) ? (
              <p className="text-[16px] leading-[1.55] text-white/85">
                Shared upon inquiry confirmation
              </p>
            ) : (
              <a
                href={`tel:${SITE_CONFIG.contact.phone.replace(/\s+/g, '')}`}
                className="text-[18px] sm:text-[19px] font-medium text-white hover:text-[#F8C311] transition-colors tabular-nums"
              >
                {SITE_CONFIG.contact.phone}
              </a>
            )}
          </div>

          {/* LOCATION */}
          <div
            data-stagger-item
            className="pt-5 border-t border-white/[0.12]"
          >
            <span className="eyebrow-label text-[#A8A8A8] block mb-3">
              LOCATION
            </span>
            <p className="text-[16px] leading-[1.55] text-white/85">
              {isUnverifiedPlaceholder(SITE_CONFIG.contact.location)
                ? 'India · Remote & On-Site Studio Collaboration'
                : SITE_CONFIG.contact.location}
            </p>
          </div>

          {/* SOCIAL LINKS */}
          <div
            data-stagger-item
            className="pt-5 border-t border-white/[0.12]"
          >
            <span className="eyebrow-label text-[#A8A8A8] block mb-3">
              SOCIAL LINKS
            </span>
            {configuredSocials.length > 0 ? (
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                {configuredSocials.map(([platform, url]) => (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[15px] font-medium capitalize text-white hover:text-[#F8C311] transition-colors whitespace-nowrap"
                  >
                    <span>{platform}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#F8C311]" />
                  </a>
                ))}
              </div>
            ) : (
              <a
                href={`mailto:${SITE_CONFIG.contact.email}`}
                className="inline-flex items-center gap-1.5 text-[16px] font-medium text-white hover:text-[#F8C311] transition-colors"
              >
                <span>Direct Studio Inbox</span>
                <ArrowUpRight className="w-4 h-4 text-[#F8C311]" />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
