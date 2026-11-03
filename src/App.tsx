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

  return (
    <div className="min-h-screen bg-[var(--color-white)] text-[var(--color-dark-text)] selection:bg-[var(--color-primary)] selection:text-[var(--color-navy)] font-['Inter',sans-serif] antialiased overflow-x-hidden">
      {/* 1. Header */}
      <Header onOpenConsultation={() => handleOpenConsultation()} />

      <main>
        {/* 2. Hero Section (Editorial Creative Agency Showcase) */}
        <Hero onOpenConsultation={() => handleOpenConsultation()} />

        {/* 3. Services Section */}
        <ServicesSection
          onSelectService={(service) => setSelectedService(service)}
          onOpenConsultation={() => handleOpenConsultation()}
        />

        {/* 4. Light Strategy Section */}
        <StrategySection onOpenConsultation={() => handleOpenConsultation()} />

        {/* 5. Portfolio Showcase */}
        <PortfolioShowcase
          onSelectProject={(project) => setSelectedProject(project)}
          onOpenConsultation={() => handleOpenConsultation()}
        />

        {/* 6. Why Brand Yatra */}
        <WhyBrandYatra onOpenConsultation={() => handleOpenConsultation()} />

        {/* 7. Process Section */}
        <ProcessSection onOpenConsultation={() => handleOpenConsultation()} />

        {/* 8. Running Ticker Marquee (Brand Yatra Yellow Ribbon) */}
        <TickerMarquee />

        {/* 9. Services Capabilities Section */}
        <CapabilitiesSection onOpenConsultation={(name) => handleOpenConsultation(name)} />

        {/* 10. Selected Projects */}
        <SelectedProjects onSelectProject={(project) => setSelectedProject(project)} />

        {/* 11. Insights Section */}
        <InsightsSection
          onSelectArticle={(article) => setSelectedArticle(article)}
        />

        {/* 12. Dual Diagonal Scrolling Logo Marquee (Matching Reference Image) */}
        <DiagonalMarquee />

        {/* 13. Client Testimonials (CLIENT THOUGHTS) */}
        <TestimonialsSection />

        {/* 14. Contact and Enquiry Section */}
        <ContactSection />
      </main>

      {/* 15. Footer */}
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
