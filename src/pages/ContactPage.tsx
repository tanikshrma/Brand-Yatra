import { useMemo } from 'react';
import { AppRoute } from '../data/services';
import { CONTACT_FAQS } from '../data/contact';
import { SITE_CONFIG } from '../data/site';
import { ContactHero } from '../components/contact/ContactHero';
import { ContactForm } from '../components/contact/ContactForm';
import { ContactInfo } from '../components/contact/ContactInfo';
import { ContactFAQ } from '../components/contact/ContactFAQ';

interface ContactPageProps {
  initialService?: string;
  onNavigate: (path: AppRoute, hash?: string) => void;
}

export function ContactPage({ initialService, onNavigate }: ContactPageProps) {
  const structuredDataJson = useMemo(() => {
    const origin =
      typeof window !== 'undefined' ? window.location.origin : '';
    const canonicalUrl = `${origin}/contact`;

    const contactPageSchema = {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: 'Contact Brand Yatra — Start a Project',
      url: canonicalUrl,
      description:
        'Start a branding, web development or digital marketing project with Brand Yatra.',
      mainEntity: {
        '@type': 'Organization',
        name: SITE_CONFIG.brandName,
        email: SITE_CONFIG.contact.email,
      },
    };

    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: CONTACT_FAQS.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    };

    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: `${origin}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Contact',
          item: canonicalUrl,
        },
      ],
    };

    return JSON.stringify([contactPageSchema, faqSchema, breadcrumbSchema]);
  }, []);

  return (
    <div className="bg-[#0D0D0D] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: structuredDataJson }}
      />

      <ContactHero />
      <ContactForm initialService={initialService} onNavigate={onNavigate} />
      <ContactInfo />
      <ContactFAQ />
    </div>
  );
}
