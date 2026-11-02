/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { StrategySection } from './components/StrategySection';
import { PortfolioShowcase } from './components/PortfolioShowcase';
import { ProcessSection } from './components/ProcessSection';
import { WhyBrandYatra } from './components/WhyBrandYatra';
import { TickerMarquee } from './components/TickerMarquee';
import { CapabilitiesSection } from './components/CapabilitiesSection';
import { SelectedProjects } from './components/SelectedProjects';
import { InsightsSection } from './components/InsightsSection';
import { DiagonalMarquee } from './components/DiagonalMarquee';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import {
  ServiceModal,
  CaseStudyModal,
  ArticleModal,
  ConsultationModal,
  LegalModal,
} from './components/Modals';
import { ServiceItem, PortfolioItem, ArticleItem } from './data/agencyData';

export default function App() {
  // Modal states
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<ArticleItem | null>(null);
  const [consultationOpen, setConsultationOpen] = useState(false);
  const [prefilledService, setPrefilledService] = useState('');
  const [legalModalType, setLegalModalType] = useState<'terms' | 'privacy' | null>(null);

  const handleOpenConsultation = (serviceName?: string) => {
    if (serviceName) {
      setPrefilledService(serviceName);
    } else {
      setPrefilledService('');
    }
    setConsultationOpen(true);
  };

  const handleHeroSubmit = (formData: { name: string; email: string; phone: string; service: string }) => {
    // Visual feedback handled inside Hero card
  };

  const handleContactSubmit = (data: { name: string; email: string }) => {
    // Visual feedback handled inside Contact card
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#17212B] selection:bg-[#F8C311] selection:text-[#0E2234] font-['Inter',sans-serif] antialiased overflow-x-hidden">
      {/* 1. Header */}
      <Header onOpenConsultation={() => handleOpenConsultation()} />

      <main>
        {/* 2. Hero Section (Editorial Creative Agency Showcase) */}
        <Hero onOpenConsultation={() => handleOpenConsultation()} onSuccessSubmit={handleHeroSubmit} />

        {/* 3. Services Section (Dark with 8 items & circular orange badge) */}
        <ServicesSection
          onSelectService={(service) => setSelectedService(service)}
          onOpenConsultation={() => handleOpenConsultation()}
        />

        {/* 4. Light Strategy Section (Pale Sage-Ivory #E8E9D9 with 4 Arched Cards) */}
        <StrategySection onOpenConsultation={() => handleOpenConsultation()} />

        {/* 5. Portfolio Showcase (Dark with 3 Large Horizontal Cards) */}
        <PortfolioShowcase
          onSelectProject={(project) => setSelectedProject(project)}
          onOpenConsultation={() => handleOpenConsultation()}
        />

        {/* 6. Process Section (Light Sage-Ivory #E8E9D9 with 4 Process Blocks & 3D Emblem) */}
        <ProcessSection onOpenConsultation={() => handleOpenConsultation()} />

        {/* 7. Why Brand Yatra (Dark Narrow Section: Built Around Your Growth) */}
        <WhyBrandYatra onOpenConsultation={() => handleOpenConsultation()} />

        {/* 8. Running Ticker Marquee (Brand Yatra Orange Ribbon) */}
        <TickerMarquee />

        {/* 9. Services Capabilities Section (Dark with 12 Centered Orange Outlined Pills) */}
        <CapabilitiesSection onOpenConsultation={() => handleOpenConsultation()} />

        {/* 10. Selected Projects (Light #E8E9D9 with 3 Dark Arched Cards) */}
        <SelectedProjects onOpenConsultation={() => handleOpenConsultation()} />

        {/* 11. Insights Section (Dark with Editorial Cards & Carousel Controls) */}
        <InsightsSection
          onSelectArticle={(article) => setSelectedArticle(article)}
        />

        {/* 12. Dual Diagonal Scrolling Logo Marquee (Matching Reference Image) */}
        <DiagonalMarquee />

        {/* 13. Client Testimonials (CLIENT THOUGHTS) */}
        <TestimonialsSection />

        {/* 14. Contact and Enquiry Section (Dark with 2 Columns & Bold Orange SVG Graphic) */}
        <ContactSection onSuccessSubmit={handleContactSubmit} />
      </main>

      {/* 15. Footer (Dark with Oversized Circular PING US Button) */}
      <Footer
        onOpenConsultation={() => handleOpenConsultation()}
        onOpenLegal={(type) => setLegalModalType(type)}
      />

      {/* Interactive Modals */}
      <ServiceModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onBookService={(name) => handleOpenConsultation(name)}
      />

      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onBookProject={(name) => handleOpenConsultation(name)}
      />

      <ArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />

      <ConsultationModal
        isOpen={consultationOpen}
        prefilledService={prefilledService}
        onClose={() => setConsultationOpen(false)}
      />

      <LegalModal
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />
    </div>
  );
}
