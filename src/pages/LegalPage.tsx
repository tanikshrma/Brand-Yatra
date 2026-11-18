import { ArrowLeft } from 'lucide-react';
import { AppRoute } from '../data/services';
import { SITE_CONFIG } from '../data/site';

export type LegalDocSlug = 'privacy-policy' | 'terms' | 'cookie-policy';

interface LegalPageProps {
  slug: LegalDocSlug;
  onNavigate: (path: AppRoute, hash?: string) => void;
}

interface LegalSectionItem {
  heading: string;
  paragraphs: string[];
}

const LEGAL_CONTENT: Record<
  LegalDocSlug,
  {
    eyebrow: string;
    title: string;
    intro: string;
    sections: LegalSectionItem[];
  }
> = {
  'privacy-policy': {
    eyebrow: 'LEGAL / PRIVACY POLICY',
    title: 'Privacy Policy',
    intro:
      'Brand Yatra respects your privacy and is committed to handling personal and business contact details transparently and responsibly.',
    sections: [
      {
        heading: '1. Information We Collect',
        paragraphs: [
          'When you submit a project inquiry through our Contact page, we collect the information you voluntarily provide: your full name, email address, optional phone number, optional company or brand name, selected service interest, optional budget range and project details.',
          'Basic technical request metadata (such as IP address) is processed momentarily on our server strictly to prevent automated spam and enforce rate limits.',
        ],
      },
      {
        heading: '2. How We Use Your Information',
        paragraphs: [
          'We use submitted inquiry details solely to review your project requirements, respond to your questions, prepare scope recommendations and communicate with you regarding potential collaboration.',
          'Brand Yatra does not sell, rent or trade personal information to third-party marketers or data brokers.',
        ],
      },
      {
        heading: '3. Email Delivery & Data Security',
        paragraphs: [
          'Project inquiries are validated on our server and transmitted over encrypted HTTPS connections to our configured business inbox via our transactional email provider.',
          'Access to inquiry correspondence is restricted to authorized Brand Yatra team members involved in client communication and project scoping.',
        ],
      },
      {
        heading: '4. Your Rights & Contact',
        paragraphs: [
          `You may request access to, correction of, or deletion of any inquiry details you have shared with us at any time by contacting ${SITE_CONFIG.contact.email}.`,
        ],
      },
    ],
  },
  terms: {
    eyebrow: 'LEGAL / TERMS OF USE',
    title: 'Terms & Conditions',
    intro:
      'These Terms & Conditions govern your access to and use of the Brand Yatra website and its published creative, editorial and service materials.',
    sections: [
      {
        heading: '1. Website Content & Intellectual Property',
        paragraphs: [
          'All text, brand marks, visual design systems, case study documentation and editorial articles published on this website are owned by Brand Yatra or used with permission of respective partner brands.',
          'You may view and share links to public pages for informational purposes, but you may not copy, republish or commercially redistribute website assets without prior written consent.',
        ],
      },
      {
        heading: '2. Project Inquiries & Proposals',
        paragraphs: [
          'Submitting an inquiry through this website does not establish a formal agency-client engagement. Project scopes, deliverables, timelines and commercial terms take effect only upon execution of a mutually agreed written proposal or service agreement.',
        ],
      },
      {
        heading: '3. Accuracy & External Links',
        paragraphs: [
          'We strive to keep all service descriptions and editorial articles accurate and helpful. Any links to external platforms are provided for convenience; Brand Yatra is not responsible for the content or privacy practices of external websites.',
        ],
      },
    ],
  },
  'cookie-policy': {
    eyebrow: 'LEGAL / COOKIE POLICY',
    title: 'Cookie Policy',
    intro:
      'Brand Yatra keeps browser storage minimal and focused on smooth website operation.',
    sections: [
      {
        heading: '1. Essential Technical Operation',
        paragraphs: [
          'Our website uses minimal technical browser features strictly necessary to deliver responsive layouts, remember accessibility preferences (such as reduced-motion settings) and protect inquiry forms against automated abuse.',
        ],
      },
      {
        heading: '2. Managing Browser Preferences',
        paragraphs: [
          'Most web browsers allow you to review, block or clear site storage and cookies through your browser privacy settings at any time.',
          `If you have questions about our privacy or cookie practices, please contact us at ${SITE_CONFIG.contact.email}.`,
        ],
      },
    ],
  },
};

export function LegalPage({ slug, onNavigate }: LegalPageProps) {
  const doc = LEGAL_CONTENT[slug];

  return (
    <article
      data-cursor-theme="dark"
      className="bg-[#0D0D0D] text-white pt-32 sm:pt-36 lg:pt-44 pb-24 lg:pb-32"
    >
      <div className="by-container">
        <div className="max-w-[780px]">
          <a
            href="/contact"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/contact');
            }}
            className="group inline-flex items-center gap-2 eyebrow-label text-[#A8A8A8] hover:text-[#F8C311] transition-colors mb-8"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#F8C311] transition-transform duration-200 group-hover:-translate-x-1" />
            <span>BACK TO CONTACT</span>
          </a>

          <span className="eyebrow-label text-[#A8A8A8] block mb-5">
            {doc.eyebrow}
          </span>

          <h1 className="font-heading text-[52px] sm:text-[68px] lg:text-[84px] leading-[0.93] tracking-[0.014em] uppercase text-white">
            {doc.title}
          </h1>

          <p className="mt-6 text-[17px] leading-[1.68] text-white/85">
            {doc.intro}
          </p>

          <div className="mt-12 pt-10 border-t border-white/[0.1] space-y-10">
            {doc.sections.map((sec) => (
              <section key={sec.heading}>
                <h2 className="font-heading text-[28px] sm:text-[32px] leading-[1.04] tracking-[0.02em] uppercase text-white">
                  {sec.heading}
                </h2>
                <div className="mt-3 space-y-4 text-[16px] leading-[1.72] text-[#A8A8A8]">
                  {sec.paragraphs.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-14 pt-8 border-t border-white/[0.1] flex flex-wrap items-center gap-6 text-[13.5px] text-[#A8A8A8]">
            <a
              href="/privacy-policy"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/privacy-policy');
              }}
              className={
                slug === 'privacy-policy'
                  ? 'text-[#F8C311] font-medium'
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
                slug === 'terms'
                  ? 'text-[#F8C311] font-medium'
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
                slug === 'cookie-policy'
                  ? 'text-[#F8C311] font-medium'
                  : 'hover:text-white transition-colors'
              }
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
