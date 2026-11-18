export type PortfolioFilterCategory =
  | 'ALL PROJECTS'
  | 'BRANDING'
  | 'WEB DEVELOPMENT'
  | 'DIGITAL MARKETING'
  | 'CREATIVE STUDIO';

export interface ProjectVisualItem {
  src: string;
  alt: string;
  caption: string;
  layout: 'wide' | 'split-left' | 'split-right';
}

export interface PortfolioProject {
  slug: string;
  number: string;
  title: string;
  /** Primary display category shown below the card title and in project headers */
  serviceCategory: string;
  /** Portfolio filter groups this project belongs to (never modifies the 12 Services routes) */
  filterCategories: Exclude<PortfolioFilterCategory, 'ALL PROJECTS'>[];
  /** Optional verified year — omitted unless explicitly verified */
  year?: string;
  /** Approved project cover image path. If omitted, renders an honest labeled Brand Yatra archive placeholder */
  coverImage?: string;
  coverImageAlt: string;
  /** Monogram/wordmark styling used when rendering an honest archive placeholder frame */
  placeholderBrandStyle?: 'serif' | 'tracked' | 'luxury' | 'sans' | 'athletic';
  placeholderSublabel?: string;
  /** Controls whether full case-study documentation is published or marked coming soon */
  caseStudyStatus: 'published' | 'coming-soon';
  shortSummary: string;
  overview?: string[];
  brief?: string;
  creativeApproach?: string[];
  deliverables?: string[];
  gallery?: ProjectVisualItem[];
  seoTitle: string;
  seoDescription: string;
}

export const PORTFOLIO_FILTERS: PortfolioFilterCategory[] = [
  'ALL PROJECTS',
  'BRANDING',
  'WEB DEVELOPMENT',
  'DIGITAL MARKETING',
  'CREATIVE STUDIO',
];

export const FEATURED_CASE_STUDY_SLUG = 'nestora';

/**
 * Editable Brand Yatra portfolio dataset.
 * - Includes approved Brand Yatra studio showcases with verified visual assets (`Nestora`, `Veyra`, `Kairo`).
 * - Includes Brand Yatra client engagements (`BrightLight Immigration`, `TVISVA Jewels`,
 *   `Jubilee Imperia`, `CRESTA`, `Asian Legends League`) using clearly labeled archive visual slots
 *   until client-approved campaign photography is uploaded, with zero fabricated metrics or dates.
 */
export const PROJECTS_DATA: PortfolioProject[] = [
  {
    slug: 'nestora',
    number: '01',
    title: 'Nestora',
    serviceCategory: 'Brand Identity, Packaging & Digital',
    filterCategories: ['BRANDING', 'CREATIVE STUDIO'],
    coverImage: '/images/work/nestora-packaging-identity.jpg',
    coverImageAlt: 'Nestora embossed brand identity and tactile packaging presentation in warm studio daylight',
    caseStudyStatus: 'published',
    shortSummary:
      'A tactile brand identity, packaging architecture and digital launch crafted to establish unmistakable category presence.',
    overview: [
      'Nestora partnered with Brand Yatra to shape a cohesive visual and verbal identity capable of carrying the brand across physical packaging, retail collateral and digital touchpoints.',
      'Rather than relying on short-lived decorative trends, the engagement focused on durable typographic hierarchy, tactile material contrast and a disciplined brand system that internal teams can apply consistently.',
    ],
    brief:
      'Establish unmistakable brand recognition and cohesive visual standards across physical packaging, print touchpoints and digital launch channels.',
    creativeApproach: [
      'We began by defining Nestora’s strategic positioning and tone of voice—clarifying how the brand should feel in a customer’s hands as well as on a mobile screen.',
      'From there, our design studio crafted custom wordmark geometry, embossed monochrome packaging structures and a modular digital visual language documented inside comprehensive brand guidelines.',
    ],
    deliverables: [
      'Brand Positioning & Verbal Direction',
      'Wordmark & Monogram Architecture',
      'Packaging System & Print Specifications',
      'Digital Launch Direction',
      'Comprehensive Brand Guidelines',
    ],
    gallery: [
      {
        src: '/images/services/branding-identity-craft.jpg',
        alt: 'Embossed monogram detail on dark textured paper stock for identity study',
        caption: 'Tactile print and blind-deboss material study developed during identity exploration.',
        layout: 'split-left',
      },
      {
        src: '/images/about/design-process-flatlay.jpg',
        alt: 'Brand identity concept sketches, swatch books and grid proportions on studio desk',
        caption: 'Early typographic proportion studies and grid construction.',
        layout: 'split-right',
      },
      {
        src: '/images/work/nestora-packaging-identity.jpg',
        alt: 'Complete Nestora packaging and identity presentation',
        caption: 'Unified identity system translated across primary packaging and presentation collateral.',
        layout: 'wide',
      },
    ],
    seoTitle: 'Nestora Case Study — Brand Identity & Packaging | Brand Yatra',
    seoDescription:
      'Explore how Brand Yatra crafted Nestora’s brand positioning, custom wordmark geometry, packaging system and digital identity.',
  },
  {
    slug: 'veyra',
    number: '02',
    title: 'Veyra',
    serviceCategory: 'Website, UI/UX & Product Design',
    filterCategories: ['WEB DEVELOPMENT'],
    coverImage: '/images/work/veyra-digital-platform.jpg',
    coverImageAlt: 'Veyra responsive website and digital product experience displayed on studio workstation',
    caseStudyStatus: 'published',
    shortSummary:
      'An editorial digital platform engineered for intuitive navigation, product clarity and streamlined inquiry journeys.',
    overview: [
      'Veyra needed a modern digital presence that translated multi-layered product capabilities into a calm, structured browsing experience.',
      'Brand Yatra united user-experience architecture, interface design and responsive frontend development to create a fast, articulate web platform built around how real buyers evaluate solutions.',
    ],
    brief:
      'Translate complex product capabilities into an intuitive, responsive digital experience with clear navigation and frictionless inquiry pathways.',
    creativeApproach: [
      'We restructured the site’s information hierarchy from the ground up—replacing dense technical walls of text with progressive editorial storytelling and scannable product modules.',
      'Every screen state, interactive transition and responsive breakpoint was prototyped in UI/UX before engineering clean, accessible frontend templates.',
    ],
    deliverables: [
      'Information Architecture & Sitemap',
      'UI/UX Wireframes & Interactive Design System',
      'Responsive Frontend Web Development',
      'Technical SEO & Page-Speed Optimization',
      'Structured Inquiry & Lead Capture Flows',
    ],
    gallery: [
      {
        src: '/images/services/web-development-workstation.jpg',
        alt: 'Precision studio laptop hardware showcasing clean interface craftsmanship',
        caption: 'Desktop interface architecture engineered for clarity and visual restraint.',
        layout: 'split-left',
      },
      {
        src: '/images/work/brightlight-consultation-web.jpg',
        alt: 'Responsive business web layout displayed in an architectural studio environment',
        caption: 'Editorial page rhythm and structured decision points across key templates.',
        layout: 'split-right',
      },
      {
        src: '/images/work/veyra-digital-platform.jpg',
        alt: 'Veyra live web platform presentation',
        caption: 'Cohesive digital product showcase across desktop and responsive viewports.',
        layout: 'wide',
      },
    ],
    seoTitle: 'Veyra Case Study — Website, UI/UX & Digital Experience | Brand Yatra',
    seoDescription:
      'Discover how Brand Yatra designed and engineered Veyra’s responsive web platform, information architecture and UI/UX system.',
  },
  {
    slug: 'brightlight-immigration',
    number: '03',
    title: 'BrightLight Immigration',
    serviceCategory: 'Website & Digital Experience',
    filterCategories: ['WEB DEVELOPMENT'],
    coverImage: '/images/work/brightlight-consultation-web.jpg',
    coverImageAlt: 'BrightLight Immigration structured digital consultation platform and web experience',
    placeholderBrandStyle: 'sans',
    placeholderSublabel: 'IMMIGRATION',
    caseStudyStatus: 'coming-soon',
    shortSummary:
      'Structured digital experience and web presence designed to bring clarity and trust to complex immigration pathways.',
    seoTitle: 'BrightLight Immigration — Website & Digital Experience | Brand Yatra Work',
    seoDescription:
      'Selected Brand Yatra portfolio engagement for BrightLight Immigration: Website & Digital Experience.',
  },
  {
    slug: 'tvisva-jewels',
    number: '04',
    title: 'TVISVA Jewels',
    serviceCategory: 'E-commerce Creative & Digital Experience',
    filterCategories: ['WEB DEVELOPMENT', 'CREATIVE STUDIO'],
    coverImage: '/images/work/tvisva-fine-jewels.jpg',
    coverImageAlt: 'TVISVA Jewels fine gold jewellery editorial photography on dark travertine stone',
    placeholderBrandStyle: 'luxury',
    placeholderSublabel: 'JEWELS',
    caseStudyStatus: 'coming-soon',
    shortSummary:
      'Refined e-commerce creative direction and digital storefront experience tailored for fine jewellery presentation.',
    seoTitle: 'TVISVA Jewels — E-commerce Creative & Digital Experience | Brand Yatra Work',
    seoDescription:
      'Selected Brand Yatra portfolio engagement for TVISVA Jewels: E-commerce Creative & Digital Experience.',
  },
  {
    slug: 'kairo',
    number: '05',
    title: 'Kairo',
    serviceCategory: 'Branding, Website & Campaign',
    filterCategories: ['BRANDING', 'DIGITAL MARKETING'],
    coverImage: '/images/work/kairo-architectural-campaign.jpg',
    coverImageAlt: 'Kairo architectural brand signage and integrated multi-channel campaign presence',
    caseStudyStatus: 'published',
    shortSummary:
      'An integrated rebrand, digital presence and multi-channel launch campaign built for cohesive market visibility.',
    overview: [
      'Kairo engaged Brand Yatra for an end-to-end brand refresh spanning visual identity, environmental signage, responsive web presence and launch campaign communication.',
      'By aligning creative direction and digital campaign planning under one roof, every touchpoint spoke with the same visual confidence from day one.',
    ],
    brief:
      'Unify brand identity, digital presence and multi-channel campaign creative so audience touchpoints feel unmistakably connected.',
    creativeApproach: [
      'Our strategy and design teams established a high-contrast architectural identity system built to command attention across both physical signage and fast-moving paid digital feeds.',
      'We paired the visual rollout with dedicated campaign landing journeys and structured search and social creative formats.',
    ],
    deliverables: [
      'Rebrand Strategy & Visual Identity System',
      'Environmental & Architectural Signage Direction',
      'Campaign Landing Experience',
      'Multi-Channel Paid & Organic Creative Assets',
    ],
    gallery: [
      {
        src: '/images/services/lead-generation-funnel.jpg',
        alt: 'Architectural dark metallic geometric forms representing structured growth',
        caption: 'Structured campaign architecture connecting brand storytelling with audience intent.',
        layout: 'split-left',
      },
      {
        src: '/images/services/video-motion-studio.jpg',
        alt: 'Cinema-grade production setup inside Brand Yatra creative studio',
        caption: 'Studio production direction supporting Kairo’s launch communication.',
        layout: 'split-right',
      },
      {
        src: '/images/work/kairo-architectural-campaign.jpg',
        alt: 'Kairo architectural signage and brand rollout',
        caption: 'Integrated brand identity across physical signage and digital campaign channels.',
        layout: 'wide',
      },
    ],
    seoTitle: 'Kairo Case Study — Branding, Website & Campaign | Brand Yatra',
    seoDescription:
      'Explore Kairo’s integrated rebrand, architectural signage direction, web presence and launch campaign by Brand Yatra.',
  },
  {
    slug: 'jubilee-imperia',
    number: '06',
    title: 'Jubilee Imperia',
    serviceCategory: 'Real Estate Campaign Creatives',
    filterCategories: ['DIGITAL MARKETING', 'CREATIVE STUDIO'],
    coverImage: '/images/work/jubilee-imperia-architecture.jpg',
    coverImageAlt: 'Jubilee Imperia luxury architectural facade and real estate campaign art direction at dusk',
    placeholderBrandStyle: 'serif',
    placeholderSublabel: 'IMPERIA',
    caseStudyStatus: 'coming-soon',
    shortSummary:
      'Editorial campaign creatives and visual communication crafted for real estate brand positioning and buyer discovery.',
    seoTitle: 'Jubilee Imperia — Real Estate Campaign Creatives | Brand Yatra Work',
    seoDescription:
      'Selected Brand Yatra portfolio engagement for Jubilee Imperia: Real Estate Campaign Creatives.',
  },
  {
    slug: 'cresta',
    number: '07',
    title: 'CRESTA',
    serviceCategory: 'Brand Communication & Social Media',
    filterCategories: ['DIGITAL MARKETING', 'CREATIVE STUDIO'],
    coverImage: '/images/work/cresta-social-art-direction.jpg',
    coverImageAlt: 'CRESTA editorial brand communication and cohesive social media campaign direction',
    placeholderBrandStyle: 'tracked',
    caseStudyStatus: 'coming-soon',
    shortSummary:
      'Ongoing brand communication systems and cohesive social media creative direction built for consistent audience recall.',
    seoTitle: 'CRESTA — Brand Communication & Social Media | Brand Yatra Work',
    seoDescription:
      'Selected Brand Yatra portfolio engagement for CRESTA: Brand Communication & Social Media.',
  },
  {
    slug: 'asian-legends-league',
    number: '08',
    title: 'Asian Legends League',
    serviceCategory: 'Sports Branding & Campaign Design',
    filterCategories: ['BRANDING', 'CREATIVE STUDIO'],
    coverImage: '/images/work/asian-legends-broadcast-production.jpg',
    coverImageAlt: 'Asian Legends League dramatic stadium floodlight broadcast production and sports campaign design',
    placeholderBrandStyle: 'athletic',
    placeholderSublabel: 'LEAGUE',
    caseStudyStatus: 'coming-soon',
    shortSummary:
      'High-energy sports branding, tournament visual identity and multi-format campaign design.',
    seoTitle: 'Asian Legends League — Sports Branding & Campaign Design | Brand Yatra Work',
    seoDescription:
      'Selected Brand Yatra portfolio engagement for Asian Legends League: Sports Branding & Campaign Design.',
  },
];

export function getProjectBySlug(slug: string): PortfolioProject | undefined {
  return PROJECTS_DATA.find((project) => project.slug === slug);
}

export function getNextProject(currentSlug: string): PortfolioProject {
  const index = PROJECTS_DATA.findIndex((project) => project.slug === currentSlug);
  if (index === -1) return PROJECTS_DATA[0];
  return PROJECTS_DATA[(index + 1) % PROJECTS_DATA.length];
}

export function getProjectHref(slug: string): string {
  return `/work/${slug}`;
}
