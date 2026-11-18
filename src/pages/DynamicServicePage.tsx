import { useMemo } from 'react';
import { AppRoute, ServicePageData, getServiceHref } from '../data/services';
import { SITE_CONFIG } from '../data/site';
import { ServiceHero } from '../components/services/ServiceHero';
import { ServiceOverview } from '../components/services/ServiceOverview';
import { ServiceCapabilities } from '../components/services/ServiceCapabilities';
import { ServiceApproach } from '../components/services/ServiceApproach';
import { ServiceBenefits } from '../components/services/ServiceBenefits';
import { ServiceFAQ } from '../components/services/ServiceFAQ';
import { ServiceCTA } from '../components/services/ServiceCTA';

interface DynamicServicePageProps {
  service: ServicePageData;
  onNavigate: (path: AppRoute, hash?: string) => void;
  onStartProject: (serviceTitle?: string) => void;
}

export function DynamicServicePage({
  service,
  onNavigate,
  onStartProject,
}: DynamicServicePageProps) {
  const structuredDataJson = useMemo(() => {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const canonicalUrl = `${origin}${getServiceHref(service.slug)}`;

    const serviceSchema = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: `${service.title} Services — Brand Yatra`,
      serviceType: service.title,
      description: service.seoDescription,
      url: canonicalUrl,
      provider: {
        '@type': 'Organization',
        name: SITE_CONFIG.brandName,
        email: SITE_CONFIG.contact.email,
      },
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
          name: service.title,
          item: canonicalUrl,
        },
      ],
    };

    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: service.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    };

    return JSON.stringify([serviceSchema, breadcrumbSchema, faqSchema]);
  }, [service]);

  return (
    <div className="bg-[#0D0D0D] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: structuredDataJson }}
      />

      <ServiceHero service={service} onStartProject={onStartProject} />
      <ServiceOverview service={service} />
      <ServiceCapabilities service={service} />
      <ServiceApproach service={service} />
      <ServiceBenefits service={service} />
      <ServiceFAQ service={service} />
      <ServiceCTA
        service={service}
        onStartProject={onStartProject}
        onNavigate={onNavigate}
      />
    </div>
  );
}
