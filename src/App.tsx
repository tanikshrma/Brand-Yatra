/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Suspense, lazy, useCallback, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  SmoothScrollProvider,
  useSmoothScroll,
} from './components/animations/SmoothScrollProvider';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { GlobalInteractions } from './components/ui/GlobalInteractions';
import { ScrollToTopButton } from './components/ui/ScrollToTopButton';
import { Hero } from './components/home/Hero';
import { About } from './components/home/About';
import { Services } from './components/home/Services';
import { FeaturedWork } from './components/home/FeaturedWork';
import { Process } from './components/home/Process';
import { WhyBrandYatra } from './components/home/WhyBrandYatra';
import { Insights } from './components/home/Insights';
import { ProjectCTA } from './components/home/ProjectCTA';
import {
  AppRoute,
  ServicePageData,
  getServiceBySlug,
} from './data/services';
import {
  PortfolioProject,
  getProjectBySlug,
} from './data/projects';
import {
  ArticleData,
  getPublishedArticleBySlug,
} from './data/articles';
import type { LegalDocSlug } from './pages/LegalPage';

/* Code-split secondary route bundles for optimal initial homepage LCP/INP */
const AboutPage = lazy(() =>
  import('./pages/AboutPage').then((m) => ({ default: m.AboutPage }))
);
const WorkPage = lazy(() =>
  import('./pages/WorkPage').then((m) => ({ default: m.WorkPage }))
);
const ProjectDetailPage = lazy(() =>
  import('./pages/ProjectDetailPage').then((m) => ({ default: m.ProjectDetailPage }))
);
const ProcessPage = lazy(() =>
  import('./pages/ProcessPage').then((m) => ({ default: m.ProcessPage }))
);
const InsightsPage = lazy(() =>
  import('./pages/InsightsPage').then((m) => ({ default: m.InsightsPage }))
);
const ArticleDetailPage = lazy(() =>
  import('./pages/ArticleDetailPage').then((m) => ({ default: m.ArticleDetailPage }))
);
const DynamicServicePage = lazy(() =>
  import('./pages/DynamicServicePage').then((m) => ({ default: m.DynamicServicePage }))
);
const ContactPage = lazy(() =>
  import('./pages/ContactPage').then((m) => ({ default: m.ContactPage }))
);
const LegalPage = lazy(() =>
  import('./pages/LegalPage').then((m) => ({ default: m.LegalPage }))
);
const NotFoundPage = lazy(() =>
  import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage }))
);
const LetsTalkModal = lazy(() =>
  import('./components/contact/LetsTalkModal').then((m) => ({
    default: m.LetsTalkModal,
  }))
);

gsap.registerPlugin(ScrollTrigger);

function getNormalizedRoute(): AppRoute {
  if (typeof window === 'undefined') return '/';
  return window.location.pathname.replace(/\/+$/, '') || '/';
}

function getQueryServiceParam(): string | undefined {
  if (typeof window === 'undefined') return undefined;
  const val = new URLSearchParams(window.location.search).get('service');
  return val ? val : undefined;
}

function resolveServiceFromPath(pathname: AppRoute): ServicePageData | undefined {
  if (!pathname.startsWith('/services/')) return undefined;
  const slug = pathname.slice('/services/'.length);
  if (!slug || slug.includes('/')) return undefined;
  return getServiceBySlug(slug);
}

function resolveProjectFromPath(pathname: AppRoute): PortfolioProject | undefined {
  if (!pathname.startsWith('/work/')) return undefined;
  const slug = pathname.slice('/work/'.length);
  if (!slug || slug.includes('/')) return undefined;
  return getProjectBySlug(slug);
}

function resolveArticleFromPath(pathname: AppRoute): ArticleData | undefined {
  if (!pathname.startsWith('/insights/')) return undefined;
  const slug = pathname.slice('/insights/'.length);
  if (!slug || slug.includes('/')) return undefined;
  return getPublishedArticleBySlug(slug);
}

function resolveLegalSlug(pathname: AppRoute): LegalDocSlug | undefined {
  if (pathname === '/privacy-policy') return 'privacy-policy';
  if (pathname === '/terms') return 'terms';
  if (pathname === '/cookie-policy') return 'cookie-policy';
  return undefined;
}

function updateRouteMetadata(route: AppRoute) {
  if (typeof document === 'undefined') return;

  let title = '404 — Page Not Found | Brand Yatra';
  let description =
    'The requested page could not be found. Explore Brand Yatra’s branding, web development, digital marketing and creative capabilities.';
  let ogType = 'website';
  let ogImagePath = '/images/home/hero-creative-studio-wide.jpg';

  if (route === '/') {
    title = 'Brand Yatra — Creative Digital Marketing Agency';
    description =
      'Brand Yatra is a creative digital marketing agency specializing in branding, web development, digital marketing and creative communication.';
  } else if (route === '/about') {
    title = 'About Us — Brand Yatra | Creative Digital Marketing Agency';
    description =
      'Discover Brand Yatra — a creative digital marketing agency uniting strategy, design, technology and storytelling to build remarkable brands.';
  } else if (route === '/work') {
    title = 'Selected Work & Portfolio — Brand Yatra | Creative Digital Agency';
    description =
      'Explore Brand Yatra’s selected portfolio across branding, web development, digital marketing and creative studio engagements.';
  } else if (route === '/process') {
    title = 'Our Process — Discover, Strategize, Create & Grow | Brand Yatra';
    description =
      'Explore Brand Yatra’s four-stage methodology—Discover, Strategize, Create and Grow—built to turn clear thinking into measurable brand momentum.';
  } else if (route === '/insights') {
    title = 'Insights & Journal — Brand Yatra | Branding, Marketing & Design Perspectives';
    description =
      'Fresh perspectives from Brand Yatra on branding, digital marketing, SEO, web development, social media and visual storytelling.';
    ogImagePath = '/images/insights/why-brand-identity-matters.jpg';
  } else if (route === '/contact') {
    title = 'Contact Us — Start a Project | Brand Yatra';
    description =
      'Start a conversation with Brand Yatra about branding, web development, SEO, paid advertising or creative production.';
  } else if (route === '/privacy-policy') {
    title = 'Privacy Policy | Brand Yatra';
    description =
      'Read how Brand Yatra collects, protects and handles project inquiry and contact information.';
  } else if (route === '/terms') {
    title = 'Terms & Conditions | Brand Yatra';
    description =
      'Review the Terms & Conditions governing use of the Brand Yatra website and published creative materials.';
  } else if (route === '/cookie-policy') {
    title = 'Cookie Policy | Brand Yatra';
    description =
      'Learn how Brand Yatra uses minimal technical browser storage for reliable website operation.';
  } else {
    const matchedService = resolveServiceFromPath(route);
    const matchedProject = resolveProjectFromPath(route);
    const matchedArticle = resolveArticleFromPath(route);
    if (matchedService) {
      title = matchedService.seoTitle;
      description = matchedService.seoDescription;
      ogImagePath = matchedService.heroImage;
    } else if (matchedProject) {
      title = matchedProject.seoTitle;
      description = matchedProject.seoDescription;
      if (matchedProject.coverImage) {
        ogImagePath = matchedProject.coverImage;
      }
    } else if (matchedArticle) {
      title = matchedArticle.seoTitle;
      description = matchedArticle.seoDescription;
      ogType = 'article';
      ogImagePath = matchedArticle.featuredImage;
    }
  }

  document.title = title;

  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', description);

  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', title);

  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute('content', description);

  const ogTypeMeta = document.querySelector('meta[property="og:type"]');
  if (ogTypeMeta) ogTypeMeta.setAttribute('content', ogType);

  const twitterTitle = document.querySelector('meta[name="twitter:title"]');
  if (twitterTitle) twitterTitle.setAttribute('content', title);

  const twitterDesc = document.querySelector('meta[name="twitter:description"]');
  if (twitterDesc) twitterDesc.setAttribute('content', description);

  if (typeof window !== 'undefined') {
    const origin = window.location.origin;
    const canonicalHref = `${origin}${route === '/' ? '/' : route}`;
    const absoluteImage = ogImagePath.startsWith('http')
      ? ogImagePath
      : `${origin}${ogImagePath}`;

    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) canonicalLink.setAttribute('href', canonicalHref);

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', canonicalHref);

    const ogImg = document.querySelector('meta[property="og:image"]');
    if (ogImg) ogImg.setAttribute('content', absoluteImage);

    const twitterImg = document.querySelector('meta[name="twitter:image"]');
    if (twitterImg) twitterImg.setAttribute('content', absoluteImage);
  }
}

function AppShell() {
  const [currentPath, setCurrentPath] = useState<AppRoute>(getNormalizedRoute);
  const [pendingHash, setPendingHash] = useState<string | null>(null);
  const [preselectedService, setPreselectedService] = useState<string | undefined>(
    getQueryServiceParam
  );
  const [isLetsTalkOpen, setIsLetsTalkOpen] = useState(false);
  const [hasLoadedModal, setHasLoadedModal] = useState(false);
  const [modalService, setModalService] = useState<string | undefined>(undefined);

  const { scrollTo, resizeScroll } = useSmoothScroll();

  const handleNavigate = useCallback(
    (nextPath: AppRoute, hash?: string) => {
      const [rawPathname, rawSearch] = nextPath.split('?');
      const normalizedNext = rawPathname.replace(/\/+$/, '') || '/';
      const searchSuffix = rawSearch ? `?${rawSearch}` : '';
      const fullUrl = `${normalizedNext}${searchSuffix}${hash ?? ''}`;

      const nextServiceParam = rawSearch
        ? new URLSearchParams(rawSearch).get('service') ?? undefined
        : undefined;
      setPreselectedService(nextServiceParam);

      if (normalizedNext !== currentPath || searchSuffix !== window.location.search) {
        window.history.pushState({}, '', fullUrl);
        setCurrentPath(normalizedNext);
        setPendingHash(hash ?? null);
      } else if (hash) {
        scrollTo(hash);
      } else {
        scrollTo(0);
      }
    },
    [currentPath, scrollTo]
  );

  /* Open the dedicated "Let's Talk Business" project inquiry popup modal */
  const handleStartProject = useCallback((serviceTitle?: string) => {
    setModalService(
      serviceTitle && serviceTitle.trim() ? serviceTitle.trim() : undefined
    );
    setHasLoadedModal(true);
    setIsLetsTalkOpen(true);
  }, []);

  useEffect(() => {
    const onPopState = () => {
      const route = getNormalizedRoute();
      setCurrentPath(route);
      setPreselectedService(getQueryServiceParam());
      setPendingHash(window.location.hash || null);
    };

    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    updateRouteMetadata(currentPath);

    if (pendingHash) {
      const hashTarget = pendingHash;
      setPendingHash(null);
      const timer = window.setTimeout(() => {
        resizeScroll();
        ScrollTrigger.refresh();
        scrollTo(hashTarget);
      }, 140);
      return () => window.clearTimeout(timer);
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    scrollTo(0, { immediate: true });

    const refreshTimer = window.setTimeout(() => {
      resizeScroll();
      ScrollTrigger.refresh();
    }, 220);

    return () => window.clearTimeout(refreshTimer);
  }, [currentPath, pendingHash, scrollTo, resizeScroll]);

  const matchedService = resolveServiceFromPath(currentPath);
  const matchedProject = resolveProjectFromPath(currentPath);
  const matchedArticle = resolveArticleFromPath(currentPath);
  const matchedLegalSlug = resolveLegalSlug(currentPath);

  return (
    <div
      data-cursor-theme="dark"
      className="min-h-screen bg-[#0D0D0D] text-white flex flex-col"
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[120] focus:px-4 focus:py-2.5 focus:bg-[#F8C311] focus:text-[#0D0D0D] focus:text-xs focus:font-semibold focus:uppercase focus:tracking-[0.12em] focus:outline-none"
      >
        Skip to main content
      </a>

      <Header
        currentPath={currentPath}
        onNavigate={handleNavigate}
        onStartProject={handleStartProject}
      />

      <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
        {currentPath === '/' ? (
          <>
            <Hero
              onStartProject={handleStartProject}
              onNavigate={handleNavigate}
            />
            <About onNavigateAbout={() => handleNavigate('/about')} />
            <Services onNavigate={handleNavigate} />
            <FeaturedWork onNavigate={handleNavigate} />
            <Process />
            <WhyBrandYatra />
            <Insights onNavigate={handleNavigate} />
            <ProjectCTA
              onStartProject={() => handleStartProject()}
              onNavigateAbout={() => handleNavigate('/about')}
            />
          </>
        ) : (
          <Suspense
            fallback={
              <div className="min-h-[65vh] bg-[#0D0D0D]" aria-busy="true" />
            }
          >
            {currentPath === '/about' ? (
              <AboutPage
                onNavigate={handleNavigate}
                onStartProject={handleStartProject}
              />
            ) : currentPath === '/work' ? (
              <WorkPage
                onNavigate={handleNavigate}
                onStartProject={handleStartProject}
              />
            ) : currentPath === '/process' ? (
              <ProcessPage
                onNavigate={handleNavigate}
                onStartProject={handleStartProject}
              />
            ) : currentPath === '/insights' ? (
              <InsightsPage
                onNavigate={handleNavigate}
                onStartProject={handleStartProject}
              />
            ) : currentPath === '/contact' ? (
              <ContactPage
                initialService={preselectedService}
                onNavigate={handleNavigate}
              />
            ) : matchedLegalSlug ? (
              <LegalPage slug={matchedLegalSlug} onNavigate={handleNavigate} />
            ) : matchedArticle ? (
              <ArticleDetailPage
                key={matchedArticle.slug}
                article={matchedArticle}
                onNavigate={handleNavigate}
                onStartProject={handleStartProject}
              />
            ) : matchedProject ? (
              <ProjectDetailPage
                key={matchedProject.slug}
                project={matchedProject}
                onNavigate={handleNavigate}
                onStartProject={handleStartProject}
              />
            ) : matchedService ? (
              <DynamicServicePage
                key={matchedService.slug}
                service={matchedService}
                onNavigate={handleNavigate}
                onStartProject={handleStartProject}
              />
            ) : (
              <NotFoundPage onNavigate={handleNavigate} />
            )}
          </Suspense>
        )}
      </main>

      <Footer
        currentPath={currentPath}
        onNavigate={handleNavigate}
        onStartProject={handleStartProject}
      />

      <ScrollToTopButton />

      {hasLoadedModal && (
        <Suspense fallback={null}>
          <LetsTalkModal
            isOpen={isLetsTalkOpen}
            initialService={modalService}
            onClose={() => setIsLetsTalkOpen(false)}
            onNavigate={handleNavigate}
          />
        </Suspense>
      )}
    </div>
  );
}

export default function App() {
  return (
    <SmoothScrollProvider>
      <GlobalInteractions>
        <AppShell />
      </GlobalInteractions>
    </SmoothScrollProvider>
  );
}
