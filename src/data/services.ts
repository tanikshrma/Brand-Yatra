export type ServiceSlug =
  | 'branding'
  | 'web-development'
  | 'graphic-design'
  | 'lead-generation'
  | 'social-media'
  | 'google-ads'
  | 'seo'
  | 'meta-ads'
  | 'content'
  | 'video-motion'
  | 'ui-ux'
  | 'analytics-cro';

export type AppRoute = string;

export interface ServiceCapability {
  number: string;
  title: string;
  description: string;
}

export interface ServiceApproachStep {
  number: string;
  title: string;
  description: string;
}

export interface ServiceBenefitItem {
  number: string;
  title: string;
  description: string;
}

export interface ServiceFAQItem {
  question: string;
  answer: string;
}

export interface ServicePageData {
  slug: ServiceSlug;
  number: string;
  title: string;
  navigationLabel: string;
  eyebrow: string;
  heroHeadlineLines: [string, string];
  highlightedHeadlineText: string;
  shortDescription: string;
  heroImage: string;
  heroImageAlt: string;
  overviewEyebrow: string;
  overviewHeading: [string, string];
  overviewDescription: string[];
  overviewImage: string;
  overviewImageAlt: string;
  capabilitiesHeading: [string, string];
  capabilitiesIntro: string;
  capabilities: ServiceCapability[];
  approachHeading: [string, string];
  approachIntro: string;
  approach: ServiceApproachStep[];
  benefitsHeading: [string, string];
  benefitsIntro: string;
  benefits: ServiceBenefitItem[];
  faqs: ServiceFAQItem[];
  ctaHeading: [string, string];
  ctaDescription: string;
  ctaText: string;
  seoTitle: string;
  seoDescription: string;
}

/**
 * Centralized strongly-typed configuration for all 12 Brand Yatra services.
 * Strictly restricted to the exact 12 services and routes in exact order.
 */
export const SERVICES_LIST: ServicePageData[] = [
  {
    slug: 'branding',
    number: '01',
    title: 'Branding',
    navigationLabel: 'Branding',
    eyebrow: '01 / BRANDING · BRAND YATRA',
    heroHeadlineLines: ['BUILD AN IDENTITY', 'PEOPLE INSTANTLY'],
    highlightedHeadlineText: 'REMEMBER.',
    shortDescription:
      'We define strategic brand positioning, distinctive visual systems and practical guidelines that give ambitious businesses clarity across every touchpoint.',
    heroImage: '/images/services/branding-identity-craft.jpg',
    heroImageAlt: 'Embossed Brand Yatra identity stationery and tactile paper stock craftsmanship',
    overviewEyebrow: 'STRATEGIC IDENTITY ARCHITECTURE',
    overviewHeading: ['More than a mark.', 'A complete brand foundation.'],
    overviewDescription: [
      'A strong brand goes far beyond a logo. It shapes how customers perceive your credibility, understand your value and recognize your business across crowded physical and digital markets.',
      'At Brand Yatra, we start by clarifying what sets your organization apart—your positioning, audience expectations and voice—before translating that strategy into typography, color architecture, logomarks and living brand guidelines.',
      'Whether you are launching a new venture or repositioning an established company, our branding work gives your internal team and partners a unified system built for consistency.',
    ],
    overviewImage: '/images/work/nestora-packaging-identity.jpg',
    overviewImageAlt: 'Tactile brand identity and packaging presentation crafted in studio',
    capabilitiesHeading: ['Strategic clarity.', 'Cohesive visual craft.'],
    capabilitiesIntro:
      'Every branding engagement is structured around practical deliverables your team can apply immediately across digital, print and physical environments.',
    capabilities: [
      {
        number: '01',
        title: 'Brand Strategy & Positioning',
        description:
          'Market landscape review, audience definition, value proposition clarity and brand architecture that establish where you stand and how you compete.',
      },
      {
        number: '02',
        title: 'Logo & Mark Systems',
        description:
          'Primary wordmarks, responsive secondary marks and icon geometry engineered for legibility from mobile favicons to architectural signage.',
      },
      {
        number: '03',
        title: 'Visual Identity System',
        description:
          'Curated typographic pairings, intentional color palettes, grid rules, art direction and graphic motifs tailored to your category.',
      },
      {
        number: '04',
        title: 'Verbal Identity & Tone of Voice',
        description:
          'Messaging pillars, taglines and writing principles so your brand speaks with the same conviction it shows visually.',
      },
      {
        number: '05',
        title: 'Comprehensive Brand Guidelines',
        description:
          'Clear usage documentation, asset libraries and real-world application examples that keep internal teams and future partners aligned.',
      },
    ],
    approachHeading: ['From core insight', 'to living brand system.'],
    approachIntro:
      'Our branding workflow moves deliberately from strategic alignment to visual exploration and structured rollout.',
    approach: [
      {
        number: '01',
        title: 'IMMERSION & AUDIT',
        description:
          'We examine your business model, existing brand perception, competitors and audience expectations.',
      },
      {
        number: '02',
        title: 'POSITIONING & DIRECTION',
        description:
          'We define your strategic territory, verbal pillars and creative territories before sketching visual marks.',
      },
      {
        number: '03',
        title: 'IDENTITY CRAFT',
        description:
          'We design and stress-test logomarks, typography, color systems and real-world touchpoint mockups.',
      },
      {
        number: '04',
        title: 'SYSTEM & HANDOFF',
        description:
          'We assemble production-ready vector assets, templates and comprehensive brand guidelines for seamless adoption.',
      },
    ],
    benefitsHeading: ['Why intentional branding', 'shapes lasting trust.'],
    benefitsIntro:
      'Clear brand architecture removes guesswork from marketing, aligns leadership teams and helps buyers understand your value faster.',
    benefits: [
      {
        number: '01',
        title: 'Unmistakable Market Differentiation',
        description:
          'Stand apart from generic category templates with a visual and verbal identity rooted in what makes your business distinct.',
      },
      {
        number: '02',
        title: 'Cross-Channel Consistency',
        description:
          'Present a unified, recognizable presence across your website, social channels, sales decks and physical collateral.',
      },
      {
        number: '03',
        title: 'Faster Creative Execution',
        description:
          'Documented design rules and asset kits empower your team to launch new campaigns without reinventing visuals each time.',
      },
      {
        number: '04',
        title: 'Stronger Buyer Confidence',
        description:
          'Cohesive, well-crafted presentation signals operational maturity and care at every stage of the customer journey.',
      },
    ],
    faqs: [
      {
        question: 'What is included in a typical Brand Yatra branding engagement?',
        answer:
          'Most engagements cover discovery and positioning strategy, primary and secondary logo marks, typography and color systems, key application mockups, production asset exports and a structured brand guidelines document.',
      },
      {
        question: 'Can you refresh an existing brand without losing recognition?',
        answer:
          'Yes. When evolving an established business, we audit which visual elements carry existing customer equity and refine typography, proportions, color and messaging around them rather than discarding what already works.',
      },
      {
        question: 'Do we receive editable source files and full usage rights?',
        answer:
          'Upon project completion, you receive organized vector master files, web and print exports, font licensing guidance and comprehensive brand documentation.',
      },
      {
        question: 'How involved does our leadership team need to be?',
        answer:
          'We structure focused workshops at discovery and clear review milestones at positioning and visual presentation stages so stakeholders stay aligned without disrupting daily operations.',
      },
      {
        question: 'Can you extend our new brand directly into a website and launch collateral?',
        answer:
          'Yes. Because our identity designers collaborate directly with our UI/UX, web development and content teams, we smoothly translate new brand systems into digital platforms and campaign assets.',
      },
    ],
    ctaHeading: ['READY TO SHAPE YOUR', 'BRAND IDENTITY?'],
    ctaDescription:
      'Tell us where your business is headed. Let’s build a strategic brand foundation designed to endure.',
    ctaText: "Let's Talk Business",
    seoTitle: 'Branding Services — Brand Yatra | Strategy, Visual Identity & Guidelines',
    seoDescription:
      'Strategic branding services by Brand Yatra: brand positioning, logo systems, visual identity architecture, tone of voice and comprehensive brand guidelines.',
  },
  {
    slug: 'web-development',
    number: '02',
    title: 'Web Development',
    navigationLabel: 'Web Development',
    eyebrow: '02 / WEB DEVELOPMENT · BRAND YATRA',
    heroHeadlineLines: ['MODERN WEBSITES', 'ENGINEERED TO'],
    highlightedHeadlineText: 'PERFORM.',
    shortDescription:
      'We build responsive, fast-loading and maintainable websites that express your brand clearly and guide visitors toward meaningful action.',
    heroImage: '/images/services/web-development-workstation.jpg',
    heroImageAlt: 'Precision matte black workstation displaying clean web architecture in studio',
    overviewEyebrow: 'CUSTOM DIGITAL ENGINEERING',
    overviewHeading: ['Clean architecture.', 'Built for real-world speed.'],
    overviewDescription: [
      'Your website is often the primary environment where prospects evaluate your credibility, explore your offerings and decide whether to get in touch.',
      'Brand Yatra engineers custom business websites and digital platforms with clean semantic code, responsive layouts, accessible navigation and reliable content management workflows.',
      'We pair editorial design sensibility with modern frontend engineering, technical SEO foundations and third-party CRM or analytics integrations so your site stays resilient as your business grows.',
    ],
    overviewImage: '/images/work/veyra-digital-platform.jpg',
    overviewImageAlt: 'Responsive business website displayed on studio hardware',
    capabilitiesHeading: ['Engineered precision.', 'Flexible management.'],
    capabilitiesIntro:
      'From marketing websites to custom interactive platforms, we focus on clean code, responsive fidelity and practical maintainability.',
    capabilities: [
      {
        number: '01',
        title: 'Responsive Frontend Development',
        description:
          'Fluid, mobile-first builds crafted to look sharp and operate smoothly across desktop monitors, tablets and smartphones.',
      },
      {
        number: '02',
        title: 'Custom Web & CMS Architecture',
        description:
          'Structured content models and intuitive editing workflows—whether built on modern React/Next.js stacks or tailored WordPress setups.',
      },
      {
        number: '03',
        title: 'Performance & Core Web Vitals Focus',
        description:
          'Optimized asset delivery, clean bundle sizing, semantic markup and rendering discipline for brisk page loads.',
      },
      {
        number: '04',
        title: 'CRM, Form & API Integrations',
        description:
          'Reliable connections between your website inquiry flows, lead capture forms, marketing tools, analytics and CRM pipelines.',
      },
      {
        number: '05',
        title: 'Accessibility & Technical SEO Readiness',
        description:
          'Keyboard-navigable interfaces, proper heading hierarchy, clean URL structures, structured metadata and crawlable sitemaps.',
      },
    ],
    approachHeading: ['Structured builds.', 'Predictable launches.'],
    approachIntro:
      'Every development project follows a disciplined engineering sequence from technical planning to pre-launch verification.',
    approach: [
      {
        number: '01',
        title: 'TECHNICAL SCOPING',
        description:
          'We map site architecture, content types, required integrations and hosting infrastructure before writing code.',
      },
      {
        number: '02',
        title: 'COMPONENT ENGINEERING',
        description:
          'We translate approved interfaces into modular, reusable components with responsive layouts and purposeful motion.',
      },
      {
        number: '03',
        title: 'INTEGRATION & CONTENT',
        description:
          'We wire CMS schemas, lead forms, analytics events and SEO metadata alongside real content population.',
      },
      {
        number: '04',
        title: 'QA & DEPLOYMENT',
        description:
          'We test cross-browser behavior, mobile viewports, accessibility and redirects for a clean production launch.',
      },
    ],
    benefitsHeading: ['Why technical craft', 'protects your brand.'],
    benefitsIntro:
      'A well-engineered website reduces maintenance headaches, supports marketing campaigns and earns visitor confidence immediately.',
    benefits: [
      {
        number: '01',
        title: 'Dependable Cross-Device Experience',
        description:
          'Visitors encounter thoughtful spacing, legible typography and working interactions whether browsing on mobile or desktop.',
      },
      {
        number: '02',
        title: 'Scalable Component Foundation',
        description:
          'Modular architecture lets your team launch new service pages, landing pages and insights without rebuilding from scratch.',
      },
      {
        number: '03',
        title: 'Search & Campaign Readiness',
        description:
          'Fast load behavior and clean metadata strengthen both organic discoverability and paid campaign landing experiences.',
      },
      {
        number: '04',
        title: 'Clean Ownership & Maintainability',
        description:
          'Well-organized code and straightforward content tools ensure your website stays easy to update post-launch.',
      },
    ],
    faqs: [
      {
        question: 'Which technologies and platforms do you build with?',
        answer:
          'We select the stack around your operational needs—ranging from modern TypeScript, React and Next.js applications to custom-engineered WordPress websites when editorial teams prefer familiar publishing workflows.',
      },
      {
        question: 'Will our team be able to update text and pages internally?',
        answer:
          'Yes. Whenever ongoing content updates are part of your workflow, we configure clean CMS fields and provide walkthrough documentation so non-technical team members can publish confidently.',
      },
      {
        question: 'Do you handle both UI/UX design and web development?',
        answer:
          'Yes. We can take your website from sitemap, copywriting and interface design all the way through frontend/backend engineering, or develop directly from approved design files.',
      },
      {
        question: 'How do you handle SEO during a website rebuild?',
        answer:
          'We preserve existing search equity through URL mapping and 301 redirect planning, while implementing semantic HTML, clean meta tags, OpenGraph data and fast asset delivery.',
      },
      {
        question: 'Can you integrate our CRM, booking system or analytics tools?',
        answer:
          'Yes. We routinely integrate inquiry forms, webhook endpoints, CRM platforms, scheduling embeds and GA4/Tag Manager measurement setups.',
      },
    ],
    ctaHeading: ['PLANNING A NEW WEBSITE', 'OR DIGITAL PLATFORM?'],
    ctaDescription:
      'Share your goals, timeline and technical requirements. We’ll recommend the cleanest path from concept to launch.',
    ctaText: "Let's Talk Business",
    seoTitle: 'Web Development Services — Brand Yatra | Custom Responsive Websites',
    seoDescription:
      'Custom web development by Brand Yatra: responsive frontend engineering, CMS architecture, technical performance and seamless business integrations.',
  },
  {
    slug: 'graphic-design',
    number: '03',
    title: 'Graphic Design',
    navigationLabel: 'Graphic Design',
    eyebrow: '03 / GRAPHIC DESIGN · BRAND YATRA',
    heroHeadlineLines: ['VISUAL CRAFT THAT', 'COMMUNICATES WITH'],
    highlightedHeadlineText: 'CLARITY.',
    shortDescription:
      'We design cohesive campaign creatives, marketing collateral and digital graphics that translate complex messages into sharp visual communication.',
    heroImage: '/images/services/graphic-design-editorial.jpg',
    heroImageAlt: 'Editorial layout exploration, typography grids and print swatch books in studio',
    overviewEyebrow: 'PURPOSEFUL VISUAL COMMUNICATION',
    overviewHeading: ['Intentional hierarchy.', 'Every detail considered.'],
    overviewDescription: [
      'Every presentation deck, campaign visual, brochure and digital banner shapes how audiences judge the quality of your offering.',
      'At Brand Yatra, graphic design is treated as visual problem-solving rather than surface decoration. We focus on typographic hierarchy, grid discipline, Negative space and brand alignment so your key message lands immediately.',
      'Whether supporting an upcoming product launch, equipping a sales team with sharp collateral or producing ongoing campaign graphics, we keep your visual presence cohesive across channels.',
    ],
    overviewImage: '/images/work/kairo-architectural-campaign.jpg',
    overviewImageAlt: 'Printed graphic design and architectural brand collateral craftsmanship',
    capabilitiesHeading: ['Cohesive assets', 'across print and digital.'],
    capabilitiesIntro:
      'We create high-craft visual deliverables designed to work harmoniously within your brand identity.',
    capabilities: [
      {
        number: '01',
        title: 'Campaign Key Visuals & Digital Ad Creatives',
        description:
          'Cohesive visual concepts adapted cleanly across display placements, social formats and promotional banners.',
      },
      {
        number: '02',
        title: 'Marketing & Sales Collateral',
        description:
          'Company profiles, pitch decks, capability presentations, one-pagers and brochures structured for persuasive reading.',
      },
      {
        number: '03',
        title: 'Packaging & Print Communication',
        description:
          'Print-ready layouts, packaging dielines, event graphics and environmental signage prepared with accurate production specs.',
      },
      {
        number: '04',
        title: 'Infographics & Editorial Layouts',
        description:
          'Clear visual explanations, reports, whitepapers and structured diagrams that make dense information approachable.',
      },
    ],
    approachHeading: ['Brief to final artwork.', 'Without visual noise.'],
    approachIntro:
      'Our graphic design workflow balances creative exploration with disciplined brand consistency and accurate production handoff.',
    approach: [
      {
        number: '01',
        title: 'MESSAGE & FORMAT BRIEF',
        description:
          'We clarify the core communication goal, target viewer, placement specs and hierarchy of information.',
      },
      {
        number: '02',
        title: 'CONCEPT & COMPOSITION',
        description:
          'We establish layout grids, typographic emphasis and art direction aligned with your brand standards.',
      },
      {
        number: '03',
        title: 'REFINEMENT & ADAPTATION',
        description:
          'We polish spacing, contrast and copy fit before scaling approved creative across required dimensions.',
      },
      {
        number: '04',
        title: 'PRODUCTION DELIVERY',
        description:
          'We supply organized print-ready PDFs, optimized digital exports and reusable templates where needed.',
      },
    ],
    benefitsHeading: ['Why disciplined design', 'elevates communication.'],
    benefitsIntro:
      'Strong graphic design makes information effortless to absorb while reinforcing brand recognition across every touchpoint.',
    benefits: [
      {
        number: '01',
        title: 'Immediate Message Comprehension',
        description:
          'Clear typographic hierarchy guides the eye naturally from headline to supporting proof and action.',
      },
      {
        number: '02',
        title: 'Elevated Brand Perception',
        description:
          'Editorial spacing and restrained color usage replace cluttered, template-looking marketing materials.',
      },
      {
        number: '03',
        title: 'Print & Digital Production Accuracy',
        description:
          'Proper color profiles, bleed settings and aspect-ratio adaptations prevent costly last-minute rework.',
      },
      {
        number: '04',
        title: 'Consistent Multi-Channel Rollouts',
        description:
          'Your sales decks, social campaigns and event materials look unmistakably authored by the same brand.',
      },
    ],
    faqs: [
      {
        question: 'Can you work within our existing brand guidelines?',
        answer:
          'Yes. If you already have established brand guidelines, we design strictly within your typography, color and logo standards while elevating layout craft and visual clarity.',
      },
      {
        question: 'Do you prepare files ready for commercial printing?',
        answer:
          'Yes. For print collateral, packaging and signage, we deliver press-ready files with proper CMYK/spot color setup, bleeds, trim marks and dieline alignment.',
      },
      {
        question: 'Can you design executive pitch decks and editable presentation templates?',
        answer:
          'Yes. We design structured presentations and master slide systems so your leadership and sales teams can tailor decks cleanly for individual prospects.',
      },
      {
        question: 'Do you support both one-off campaigns and ongoing creative needs?',
        answer:
          'We support standalone project briefs—such as launch collateral or annual reports—as well as ongoing creative partnerships for active marketing teams.',
      },
    ],
    ctaHeading: ['NEED SHARP VISUAL', 'COMMUNICATION?'],
    ctaDescription:
      'From campaign key visuals to executive presentations and print collateral, let’s craft design work that speaks clearly.',
    ctaText: "Let's Talk Business",
    seoTitle: 'Graphic Design Services — Brand Yatra | Campaign Creatives & Collateral',
    seoDescription:
      'Editorial graphic design services by Brand Yatra: campaign creatives, marketing collateral, pitch decks, packaging graphics and visual communication systems.',
  },
  {
    slug: 'lead-generation',
    number: '04',
    title: 'Lead Generation',
    navigationLabel: 'Lead Generation',
    eyebrow: '04 / LEAD GENERATION · BRAND YATRA',
    heroHeadlineLines: ['CONNECT WITH BUYERS', 'WHO ARE READY TO'],
    highlightedHeadlineText: 'ENGAGE.',
    shortDescription:
      'We build structured acquisition funnels combining audience targeting, persuasive landing pages and transparent tracking to attract qualified business inquiries.',
    heroImage: '/images/services/lead-generation-funnel.jpg',
    heroImageAlt: 'Strategy workstation mapping digital acquisition funnels and buyer conversion pathways',
    overviewEyebrow: 'FULL-FUNNEL DEMAND & INQUIRY SYSTEMS',
    overviewHeading: ['Relevance over volume.', 'Built around buyer intent.'],
    overviewDescription: [
      'Effective lead generation is not about collecting random form fills—it is about putting a clear, credible offer in front of decision-makers who genuinely need what your business provides.',
      'At Brand Yatra, we connect the entire acquisition path: audience research, channel selection, ad messaging, dedicated conversion landing pages and CRM handoff tracking.',
      'By aligning creative messaging with landing-page clarity and lead-quality feedback loops, we help your sales and marketing teams focus their energy on meaningful conversations.',
    ],
    overviewImage: '/images/work/brightlight-consultation-web.jpg',
    overviewImageAlt: 'Integrated campaign landing page and conversion pathway design',
    capabilitiesHeading: ['Every stage of the', 'inquiry journey aligned.'],
    capabilitiesIntro:
      'We design and manage cohesive lead-generation systems rather than disconnected ad placements.',
    capabilities: [
      {
        number: '01',
        title: 'Audience & Intent Strategy',
        description:
          'Defining ideal customer profiles, decision-maker pain points and the search or social channels where active demand exists.',
      },
      {
        number: '02',
        title: 'Conversion-Focused Landing Pages',
        description:
          'Dedicated campaign pages featuring clear value propositions, structured proof, fast mobile load times and frictionless inquiry forms.',
      },
      {
        number: '03',
        title: 'Lead Funnel & Offer Architecture',
        description:
          'Structuring consultation requests, capability assessments, gated resources or multi-step qualification forms around buyer readiness.',
      },
      {
        number: '04',
        title: 'Campaign Management & Refinement',
        description:
          'Ongoing creative testing, audience exclusions, form-drop analysis and budget allocation guided by lead relevance.',
      },
    ],
    approachHeading: ['Clear positioning.', 'Structured conversion paths.'],
    approachIntro:
      'Our lead-generation process connects offer clarity with disciplined tracking and iterative refinement.',
    approach: [
      {
        number: '01',
        title: 'ICP & OFFER ALIGNMENT',
        description:
          'We define who constitutes a qualified inquiry and craft an offer that addresses their immediate business priority.',
      },
      {
        number: '02',
        title: 'FUNNEL & PAGE BUILD',
        description:
          'We design and instrument dedicated landing pages, qualification fields, CRM routing and conversion events.',
      },
      {
        number: '03',
        title: 'TARGETED LAUNCH',
        description:
          'We deploy creative and copy across high-intent search or paid social channels matched to your buyer journey.',
      },
      {
        number: '04',
        title: 'QUALITY OPTIMIZATION',
        description:
          'We review inquiry quality alongside your sales team to refine targeting, messaging and form qualification.',
      },
    ],
    benefitsHeading: ['Why unified funnels', 'outperform isolated ads.'],
    benefitsIntro:
      'Sending paid traffic to generic homepages wastes attention. Dedicated funnels align every click with a clear next step.',
    benefits: [
      {
        number: '01',
        title: 'Stronger Message-to-Page Continuity',
        description:
          'Prospects land on a focused page that directly answers the exact promise made in the campaign creative.',
      },
      {
        number: '02',
        title: 'Better Inquiry Qualification',
        description:
          'Thoughtful form design filters out mismatched traffic while keeping submission straightforward for serious buyers.',
      },
      {
        number: '03',
        title: 'End-to-End Attribution Visibility',
        description:
          'Clean event tracking and UTM discipline show which campaigns and topics drive genuine sales conversations.',
      },
      {
        number: '04',
        title: 'Sales & Marketing Alignment',
        description:
          'Shared visibility into lead sources and qualification criteria keeps marketing efforts grounded in commercial reality.',
      },
    ],
    faqs: [
      {
        question: 'How do you focus on lead quality rather than raw form volume?',
        answer:
          'We combine intent-focused targeting, clear positioning copy that disqualifies poor-fit clicks, structured form qualification questions and regular feedback reviews with your sales team.',
      },
      {
        question: 'Do you build the landing pages as well as run the campaigns?',
        answer:
          'Yes. Because landing-page clarity heavily influences conversion behavior, our designers, copywriters and developers create dedicated campaign pages alongside your ad strategy.',
      },
      {
        question: 'Which industries do your lead-generation systems suit?',
        answer:
          'Our structured funnel approach is well suited to B2B services, technology providers, real estate, education, healthcare practices and high-consideration consumer offerings.',
      },
      {
        question: 'Can inquiries flow directly into our existing CRM?',
        answer:
          'Yes. We configure direct form integrations or webhook automations so new inquiries—along with source and campaign parameters—arrive cleanly in your team’s workflow.',
      },
    ],
    ctaHeading: ['READY TO BUILD A CLEARER', 'ACQUISITION PIPELINE?'],
    ctaDescription:
      'Let’s discuss your ideal customer profile, sales cycle and how a unified funnel can support sustainable inquiries.',
    ctaText: "Let's Talk Business",
    seoTitle: 'Lead Generation Services — Brand Yatra | Funnels, Landing Pages & Campaigns',
    seoDescription:
      'Structured lead generation services by Brand Yatra: audience targeting, conversion landing pages, qualification funnels and ongoing campaign optimization.',
  },
  {
    slug: 'social-media',
    number: '05',
    title: 'Social Media',
    navigationLabel: 'Social Media',
    eyebrow: '05 / SOCIAL MEDIA · BRAND YATRA',
    heroHeadlineLines: ['BUILD CONSISTENT', 'PRESENCE WHERE PEOPLE'],
    highlightedHeadlineText: 'CONNECT.',
    shortDescription:
      'We shape strategic social media programs combining content pillars, editorial calendars, high-craft creative and clear reporting to keep your brand relevant.',
    heroImage: '/images/services/social-media-production.jpg',
    heroImageAlt: 'Creative art direction set styling content for modern brand social channels',
    overviewEyebrow: 'STRATEGIC SOCIAL STORYTELLING',
    overviewHeading: ['Intentional storytelling.', 'Never filler posting.'],
    overviewDescription: [
      'Audiences scroll past generic corporate updates in milliseconds. Meaningful social presence requires a clear point of view, recognizable visual craft and formats native to how people actually use each platform.',
      'At Brand Yatra, we build structured social media strategies grounded in defined content pillars—educating, proving capability and humanizing your brand across Instagram, LinkedIn, Facebook and YouTube.',
      'From monthly editorial planning and custom carousels to short-form motion assets and clear performance reviews, we turn sporadic posting into a disciplined brand channel.',
    ],
    overviewImage: '/images/about/team-creative-collaboration.jpg',
    overviewImageAlt: 'Editorial team collaborating on monthly social content planning',
    capabilitiesHeading: ['Structured planning.', 'Distinctive execution.'],
    capabilitiesIntro:
      'Every social program is organized around repeatable editorial systems tailored to your audience and key platforms.',
    capabilities: [
      {
        number: '01',
        title: 'Platform & Content Pillar Strategy',
        description:
          'Selecting the right channels for your audience and establishing core thematic pillars, visual templates and voice guidelines.',
      },
      {
        number: '02',
        title: 'Editorial Calendars & Copywriting',
        description:
          'Structured monthly publishing schedules pairing concise, platform-native captions with clear hooks and calls to action.',
      },
      {
        number: '03',
        title: 'Custom Carousels, Statics & Reels Direction',
        description:
          'Art-directed static visuals, educational carousels and short-form video concepts crafted to hold attention in the feed.',
      },
      {
        number: '04',
        title: 'Community Monitoring & Performance Reporting',
        description:
          'Consistent publishing discipline paired with clear monthly insights on content resonance, saves, shares and profile actions.',
      },
    ],
    approachHeading: ['Consistent cadence.', 'Cohesive brand voice.'],
    approachIntro:
      'Our social workflow gives your team visibility ahead of every publishing cycle while leaving room for timely cultural or company moments.',
    approach: [
      {
        number: '01',
        title: 'CHANNEL & VOICE AUDIT',
        description:
          'We evaluate your current profiles, audience behavior, visual consistency and priority platforms.',
      },
      {
        number: '02',
        title: 'PILLARS & VISUAL SYSTEM',
        description:
          'We define recurring content formats, typographic grids and tone rules specific to social feeds.',
      },
      {
        number: '03',
        title: 'MONTHLY CALENDAR & PRODUCTION',
        description:
          'We draft captions, design visuals and edit short-form clips in structured approval batches.',
      },
      {
        number: '04',
        title: 'PUBLISH & REVIEW',
        description:
          'We schedule approved posts, monitor engagement trends and refine upcoming themes around what resonates.',
      },
    ],
    benefitsHeading: ['Why disciplined social', 'reinforces credibility.'],
    benefitsIntro:
      'Prospects, partners and prospective hires routinely check social channels to see whether a brand is active, thoughtful and credible.',
    benefits: [
      {
        number: '01',
        title: 'Recognizable Feed Aesthetic',
        description:
          'Cohesive typography, color restraint and art direction make your posts identifiable before viewers even read the handle.',
      },
      {
        number: '02',
        title: 'Reliable Publishing Rhythm',
        description:
          'Structured advance calendars eliminate last-minute scrambles and long stretches of silent profiles.',
      },
      {
        number: '03',
        title: 'Stronger Audience Familiarity',
        description:
          'Educational carousels, behind-the-scenes stories and proof points keep your brand top-of-mind throughout longer buying cycles.',
      },
      {
        number: '04',
        title: 'Actionable Creative Insights',
        description:
          'Understanding which topics spark saves, comments and profile visits informs broader content and paid ad messaging.',
      },
    ],
    faqs: [
      {
        question: 'Which social media platforms do you manage?',
        answer:
          'We primarily focus on Instagram, LinkedIn, Facebook and YouTube Shorts—recommending only the channels where your specific buyers or community actually spend time.',
      },
      {
        question: 'How does the monthly content approval workflow work?',
        answer:
          'Ahead of each cycle, we share a structured content calendar containing post concepts, visual designs and captions so your team can review and approve everything cleanly before scheduling.',
      },
      {
        question: 'Can you combine organic social management with paid Meta Ads?',
        answer:
          'Yes. Pairing organic brand storytelling with targeted paid distribution allows high-resonating posts and dedicated ad creatives to reach broader qualified audiences.',
      },
      {
        question: 'Do you also produce video and motion content for social feeds?',
        answer:
          'Yes. Our social strategists collaborate directly with our Video & Motion team to edit short-form reels, animated explainers and motion graphics.',
      },
    ],
    ctaHeading: ['READY TO ELEVATE YOUR', 'SOCIAL PRESENCE?'],
    ctaDescription:
      'Let’s build a purposeful content strategy and visual system that represents your brand with clarity.',
    ctaText: "Let's Talk Business",
    seoTitle: 'Social Media Services — Brand Yatra | Strategy, Calendars & Content',
    seoDescription:
      'Strategic social media management by Brand Yatra: content strategy, editorial calendars, custom social creatives, community engagement and reporting.',
  },
  {
    slug: 'google-ads',
    number: '06',
    title: 'Google Ads',
    navigationLabel: 'Google Ads',
    eyebrow: '06 / GOOGLE ADS · BRAND YATRA',
    heroHeadlineLines: ['CAPTURE DEMAND AT', 'THE EXACT MOMENT OF'],
    highlightedHeadlineText: 'SEARCH.',
    shortDescription:
      'We structure, manage and refine Google Search, Display and YouTube campaigns grounded in intent-focused keyword architecture and clean conversion measurement.',
    heroImage: '/images/services/google-ads-campaigns.jpg',
    heroImageAlt: 'Performance workstation analyzing high-intent search campaign architecture',
    overviewEyebrow: 'INTENT-DRIVEN SEARCH & DISPLAY ADVERTISING',
    overviewHeading: ['Meet active buyers', 'with relevant answers.'],
    overviewDescription: [
      'When prospective customers search on Google, they are actively expressing a problem, comparison or purchase need. Capturing that intent profitably requires disciplined account structure rather than broad, unmonitored automation.',
      'At Brand Yatra, we build clean Google Ads architectures around high-intent keyword themes, thorough negative-keyword hygiene, compelling ad copy extensions and accurate conversion tracking.',
      'We pair search and display management with landing-page alignment so budgets stay concentrated on queries that reflect genuine commercial interest.',
    ],
    overviewImage: '/images/services/lead-generation-funnel.jpg',
    overviewImageAlt: 'Structured search conversion pathway and landing experience alignment',
    capabilitiesHeading: ['Disciplined structure.', 'Transparent measurement.'],
    capabilitiesIntro:
      'Our Google Ads management covers technical tracking setup, campaign architecture and continuous search-term refinement.',
    capabilities: [
      {
        number: '01',
        title: 'Search Campaign Architecture',
        description:
          'Intent-segmented ad groups, match-type discipline, negative keyword lists and responsive search copy written around buyer priorities.',
      },
      {
        number: '02',
        title: 'Display, Remarketing & YouTube',
        description:
          'Visual display placements and video remarketing sequences that keep your brand visible to warm visitors evaluating options.',
      },
      {
        number: '03',
        title: 'Conversion Tracking & Tag Hygiene',
        description:
          'Accurate Google Tag Manager, GA4 and enhanced conversion tracking for form submissions, calls and key funnel actions.',
      },
      {
        number: '04',
        title: 'Ongoing Bid, Query & Copy Optimization',
        description:
          'Regular search-term audits, ad asset testing, geographic/schedule adjustments and landing-page alignment.',
      },
    ],
    approachHeading: ['Built on intent.', 'Refined with clean data.'],
    approachIntro:
      'We treat Google Ads as an active discipline—auditing real search queries and conversion paths continuously.',
    approach: [
      {
        number: '01',
        title: 'ACCOUNT & TRACKING AUDIT',
        description:
          'We verify conversion tags, review historical search terms and map commercial keyword opportunities.',
      },
      {
        number: '02',
        title: 'CAMPAIGN ARCHITECTURE',
        description:
          'We structure segmented campaigns, ad extensions, negative lists and dedicated landing destinations.',
      },
      {
        number: '03',
        title: 'CONTROLLED LAUNCH',
        description:
          'We deploy campaigns with clear pacing controls while closely monitoring initial query match quality.',
      },
      {
        number: '04',
        title: 'ITERATIVE OPTIMIZATION',
        description:
          'We prune irrelevant search terms, refine bidding signals and test ad messaging against conversion data.',
      },
    ],
    benefitsHeading: ['Why account hygiene', 'protects ad spend.'],
    benefitsIntro:
      'Well-structured Google Ads accounts reduce wasted clicks on irrelevant searches and clarify which offerings attract real demand.',
    benefits: [
      {
        number: '01',
        title: 'Immediate High-Intent Visibility',
        description:
          'Appear prominently when decision-makers actively search for your specific services or product categories.',
      },
      {
        number: '02',
        title: 'Reduced Spend on Irrelevant Queries',
        description:
          'Proactive match-type controls and negative keyword management prevent budget leakage on informational or mismatched terms.',
      },
      {
        number: '03',
        title: 'Reliable Conversion Signals',
        description:
          'Verified tracking ensures automated bidding strategies optimize toward meaningful inquiries rather than accidental clicks.',
      },
      {
        number: '04',
        title: 'Clear Search Market Intelligence',
        description:
          'Real search-term data reveals the exact language customers use, informing your broader SEO and website messaging.',
      },
    ],
    faqs: [
      {
        question: 'Can you audit and restructure an existing Google Ads account?',
        answer:
          'Yes. We begin existing-account engagements by auditing conversion tracking accuracy, wasted spend in search-term reports, campaign segmentation and landing-page alignment.',
      },
      {
        question: 'Does our ad budget go directly to Google?',
        answer:
          'Yes. You retain full administrative ownership of your Google Ads account and pay media spend directly to Google, while Brand Yatra manages strategy, setup and ongoing optimization.',
      },
      {
        question: 'Do you set up conversion tracking before launching ads?',
        answer:
          'Always. Launching paid search without verified conversion tracking leaves bidding blind, so we configure and test GTM and GA4 conversion events prior to go-live.',
      },
      {
        question: 'Should we run Google Ads alongside SEO?',
        answer:
          'They complement each other naturally: Google Ads captures immediate search demand for priority terms while SEO builds compounding organic visibility across informational and commercial topics.',
      },
    ],
    ctaHeading: ['WANT CLEANER SEARCH', 'CAMPAIGN EXECUTION?'],
    ctaDescription:
      'Let’s review your search landscape, current account structure and landing experience together.',
    ctaText: "Let's Talk Business",
    seoTitle: 'Google Ads Services — Brand Yatra | Search, Display & Conversion Tracking',
    seoDescription:
      'Google Ads management by Brand Yatra: intent-focused search campaigns, display remarketing, conversion tracking hygiene and continuous query optimization.',
  },
  {
    slug: 'seo',
    number: '07',
    title: 'SEO',
    navigationLabel: 'SEO',
    eyebrow: '07 / SEO · BRAND YATRA',
    heroHeadlineLines: ['EARN COMPOUNDING', 'DISCOVERABILITY IN'],
    highlightedHeadlineText: 'ORGANIC SEARCH.',
    shortDescription:
      'We strengthen technical site foundations, search-intent architecture and editorial content quality to improve sustainable organic visibility.',
    heroImage: '/images/services/seo-search-architecture.jpg',
    heroImageAlt: 'Brand Yatra workstation focused on technical search architecture and content strategy',
    overviewEyebrow: 'TECHNICAL & EDITORIAL SEARCH OPTIMIZATION',
    overviewHeading: ['Built for searchers.', 'Structured for crawlers.'],
    overviewDescription: [
      'Sustainable organic visibility comes from aligning clean technical site architecture with genuinely helpful, well-structured content that answers what your buyers are searching for.',
      'At Brand Yatra, we eschew outdated keyword-stuffing tactics. Instead, we audit crawlability, indexation health, internal linking, site speed, page hierarchy and search intent across your commercial and educational pages.',
      'By pairing technical engineering fixes with thoughtful on-page optimization and editorial roadmaps, we help your website build durable search equity over time.',
    ],
    overviewImage: '/images/services/web-development-workstation.jpg',
    overviewImageAlt: 'Clean website structure and semantic search hierarchy on studio display',
    capabilitiesHeading: ['Sound foundations.', 'Intent-led content.'],
    capabilitiesIntro:
      'Our SEO work spans technical health, commercial service-page optimization and topical authority planning.',
    capabilities: [
      {
        number: '01',
        title: 'Technical SEO Audits & Site Health',
        description:
          'Resolving crawl errors, indexation bloat, canonical conflicts, broken redirects, sitemap structure, Core Web Vitals and schema markup.',
      },
      {
        number: '02',
        title: 'Search Intent & Keyword Mapping',
        description:
          'Researching commercial, comparison and informational queries and mapping them cleanly to dedicated pages without keyword cannibalization.',
      },
      {
        number: '03',
        title: 'On-Page Architecture & Internal Linking',
        description:
          'Refining title tags, meta descriptions, semantic H1–H3 structure, URL clarity and contextual internal link pathways.',
      },
      {
        number: '04',
        title: 'Content Optimization & Editorial Briefs',
        description:
          'Upgrading thin or outdated pages and crafting structured content briefs that address buyer questions with depth and authority.',
      },
    ],
    approachHeading: ['Methodical execution.', 'Compounding foundations.'],
    approachIntro:
      'Effective SEO is systematic—fixing structural bottlenecks first before scaling content and topical depth.',
    approach: [
      {
        number: '01',
        title: 'TECHNICAL & CONTENT AUDIT',
        description:
          'We benchmark crawl health, current rankings, Search Console signals and competitor content gaps.',
      },
      {
        number: '02',
        title: 'ARCHITECTURE & KEYWORD MAP',
        description:
          'We assign target topics to existing and planned pages so every URL serves a distinct search purpose.',
      },
      {
        number: '03',
        title: 'ON-PAGE & TECHNICAL IMPLEMENTATION',
        description:
          'We deploy metadata improvements, schema markup, internal links and structural page refinements.',
      },
      {
        number: '04',
        title: 'EDITORIAL GROWTH & MONITORING',
        description:
          'We guide ongoing content publishing, track Search Console query trends and iterate based on organic performance.',
      },
    ],
    benefitsHeading: ['Why organic foundations', 'strengthen every channel.'],
    benefitsIntro:
      'Improvements made for SEO—clearer page hierarchy, faster performance and stronger content—simultaneously make your site better for human visitors.',
    benefits: [
      {
        number: '01',
        title: 'Durable Organic Discovery',
        description:
          'Well-structured service and resource pages continue attracting relevant search visitors beyond individual campaign flights.',
      },
      {
        number: '02',
        title: 'Clearer Site Information Architecture',
        description:
          'Logical page grouping and internal linking help both search engines and buyers navigate your full scope of expertise.',
      },
      {
        number: '03',
        title: 'Higher-Trust Educational Presence',
        description:
          'Answering real industry questions thoroughly positions your brand as a knowledgeable authority early in research cycles.',
      },
      {
        number: '04',
        title: 'Synergy With Paid Search & Web Teams',
        description:
          'Because our SEO specialists work alongside our developers and writers, technical recommendations actually get implemented.',
      },
    ],
    faqs: [
      {
        question: 'Do you implement technical SEO changes directly or only deliver audit PDFs?',
        answer:
          'Unlike standalone consultants who hand over static spreadsheets, our SEO specialists collaborate directly with our web developers and writers to implement approved technical and on-page improvements.',
      },
      {
        question: 'How long does SEO typically take to show meaningful movement?',
        answer:
          'Organic search is a cumulative discipline. While technical fixes and title/metadata updates can improve crawl clarity relatively quickly, competitive topical visibility builds steadily over multiple months of consistent execution.',
      },
      {
        question: 'Do you use safe, search-guideline-compliant practices?',
        answer:
          'Strictly. We focus exclusively on clean technical engineering, genuine topical relevance, user-first content quality and natural internal architecture—never spammy link schemes or automated filler text.',
      },
      {
        question: 'Can you support SEO during a domain migration or website redesign?',
        answer:
          'Yes. Involving SEO before a redesign launches allows us to preserve high-value URLs, plan 301 redirect maps and build clean page hierarchies from day one.',
      },
    ],
    ctaHeading: ['READY TO STRENGTHEN YOUR', 'SEARCH FOUNDATIONS?'],
    ctaDescription:
      'Let’s evaluate your current technical health, site structure and organic search opportunities.',
    ctaText: "Let's Talk Business",
    seoTitle: 'SEO Services — Brand Yatra | Technical SEO, On-Page & Content Strategy',
    seoDescription:
      'Search Engine Optimization services by Brand Yatra: technical SEO audits, intent-led keyword mapping, on-page structure and editorial content optimization.',
  },
  {
    slug: 'meta-ads',
    number: '08',
    title: 'Meta Ads',
    navigationLabel: 'Meta Ads',
    eyebrow: '08 / META ADS · BRAND YATRA',
    heroHeadlineLines: ['CREATIVE-LED SOCIAL', 'CAMPAIGNS BUILT TO'],
    highlightedHeadlineText: 'CONVERT.',
    shortDescription:
      'We pair scroll-stopping ad creative with structured audience testing and clean Meta Pixel / Conversions API tracking across Facebook and Instagram.',
    heroImage: '/images/services/meta-ads-creative.jpg',
    heroImageAlt: 'Studio production setup crafting creative assets for Meta advertising campaigns',
    overviewEyebrow: 'FACEBOOK & INSTAGRAM PERFORMANCE ADVERTISING',
    overviewHeading: ['Creative is the lever.', 'Data guides the scale.'],
    overviewDescription: [
      'On Facebook and Instagram, people are not typing search queries—creative storytelling, visual clarity and offer framing do the heavy lifting of earning attention and qualifying interest.',
      'At Brand Yatra, our paid media specialists work side-by-side with our graphic designers, copywriters and motion editors to test distinct creative angles, hooks and formats across Reels, Stories and Feed placements.',
      'Backed by clean Meta Pixel and server-side Conversions API setup, structured funnel stages and disciplined creative refresh cycles, we turn paid social into a measurable acquisition and remarketing channel.',
    ],
    overviewImage: '/images/services/social-media-production.jpg',
    overviewImageAlt: 'Art-directed paid social campaign visuals and vertical creative production',
    capabilitiesHeading: ['Sharp creative.', 'Clean campaign structure.'],
    capabilitiesIntro:
      'We manage the full lifecycle of Meta advertising—from tracking instrumentation and creative production to testing and optimization.',
    capabilities: [
      {
        number: '01',
        title: 'Campaign & Funnel Architecture',
        description:
          'Clean account structures balancing prospecting discovery, engaged-viewer nurturing and high-intent website remarketing.',
      },
      {
        number: '02',
        title: 'Ad Creative & Hook Testing',
        description:
          'Static visuals, multi-card carousels and native vertical video ads designed to test distinct value propositions and avoid ad fatigue.',
      },
      {
        number: '03',
        title: 'Audience Strategy & Signal Hygiene',
        description:
          'Thoughtful customer-list exclusions, broad creative-led targeting, lookalike seeds and custom engagement segments.',
      },
      {
        number: '04',
        title: 'Pixel, Conversions API & Landing Alignment',
        description:
          'Reliable browser and server-side event configuration paired with fast, mobile-optimized landing destinations.',
      },
    ],
    approachHeading: ['Test methodically.', 'Iterate on real signals.'],
    approachIntro:
      'Successful Meta advertising relies on structured creative hypotheses rather than guesswork.',
    approach: [
      {
        number: '01',
        title: 'SIGNAL & FUNNEL SETUP',
        description:
          'We verify Meta Business Manager permissions, domain verification, Pixel/CAPI events and landing-page speed.',
      },
      {
        number: '02',
        title: 'CREATIVE MATRIX DESIGN',
        description:
          'We develop distinct visual formats and messaging angles tailored to Reels, Stories and Feed placements.',
      },
      {
        number: '03',
        title: 'STRUCTURED TESTING',
        description:
          'We launch controlled creative and audience tests to identify which hooks hold attention and drive action.',
      },
      {
        number: '04',
        title: 'REFRESH & OPTIMIZE',
        description:
          'We rotate fresh creative iterations proactively before frequency fatigue erodes campaign efficiency.',
      },
    ],
    benefitsHeading: ['Why integrated creative', 'changes paid social.'],
    benefitsIntro:
      'When media buyers and studio designers collaborate under one roof, campaign insights translate rapidly into stronger ad iterations.',
    benefits: [
      {
        number: '01',
        title: 'Proactive Demand Generation',
        description:
          'Introduce your brand and offer to qualified audiences before they even begin comparing competitors in search.',
      },
      {
        number: '02',
        title: 'Faster Creative Iteration Cycles',
        description:
          'Performance data on thumb-stop rates and click behavior directly informs the next batch of studio visuals and scripts.',
      },
      {
        number: '03',
        title: 'High-Craft Brand Protection',
        description:
          'Performance ads remain visually refined and faithful to your brand identity—never resorting to loud, off-brand gimmicks.',
      },
      {
        number: '04',
        title: 'Full-Funnel Remarketing Continuity',
        description:
          'Re-engage website visitors with tailored proof, FAQs and product angles aligned with their stage of consideration.',
      },
    ],
    faqs: [
      {
        question: 'Do you produce the ad graphics and videos as well as manage Ads Manager?',
        answer:
          'Yes. Creative quality is central to Meta performance, so our graphic designers, copywriters and motion editors collaborate directly with our media specialists on campaign assets.',
      },
      {
        question: 'Can you help configure Meta Pixel and Conversions API properly?',
        answer:
          'Yes. We audit and configure browser Pixel events, Conversions API setups, event deduplication and UTM parameters so campaign reporting stays reliable.',
      },
      {
        question: 'How do you prevent ad fatigue on Instagram and Facebook?',
        answer:
          'We monitor frequency and engagement decay closely and plan ongoing creative variations—testing new opening hooks, static layouts and carousel angles on a regular cadence.',
      },
      {
        question: 'Should we use Meta lead forms or send traffic to a landing page?',
        answer:
          'It depends on your offer and sales workflow. Dedicated landing pages often provide stronger buyer context and qualification, while native instant forms with custom qualifying questions can work well for rapid mobile inquiries—we test and align with your team.',
      },
    ],
    ctaHeading: ['READY TO LAUNCH SMARTER', 'META CAMPAIGNS?'],
    ctaDescription:
      'Let’s align your creative storytelling, audience strategy and conversion tracking across Facebook and Instagram.',
    ctaText: "Let's Talk Business",
    seoTitle: 'Meta Ads Services — Brand Yatra | Facebook & Instagram Advertising',
    seoDescription:
      'Meta Ads services by Brand Yatra: Facebook and Instagram campaign strategy, scroll-stopping ad creatives, audience segmentation and Pixel/CAPI tracking.',
  },
  {
    slug: 'content',
    number: '09',
    title: 'Content',
    navigationLabel: 'Content',
    eyebrow: '09 / CONTENT · BRAND YATRA',
    heroHeadlineLines: ['WORDS AND STORIES', 'THAT MOVE PEOPLE TO'],
    highlightedHeadlineText: 'UNDERSTAND.',
    shortDescription:
      'We develop clear content strategies, persuasive website copywriting and editorial narratives that articulate your expertise without industry jargon.',
    heroImage: '/images/services/content-editorial-monograph.jpg',
    heroImageAlt: 'Editorial brand narrative, printed monographs and structured messaging documentation',
    overviewEyebrow: 'CONTENT STRATEGY & EDITORIAL COPYWRITING',
    overviewHeading: ['Sharp thinking.', 'Articulate expression.'],
    overviewDescription: [
      'Even the most refined visual design falls flat if the words on the page are vague, repetitive or overloaded with buzzwords.',
      'At Brand Yatra, our writers and strategists craft clear, substantive messaging that explains what you do, why it matters and what buyers should do next—across websites, landing pages, articles, sales decks and campaigns.',
      'Every piece of content is written with a defined audience, clear structural flow and disciplined tone of voice so your brand earns credibility through substance.',
    ],
    overviewImage: '/images/about/team-creative-collaboration.jpg',
    overviewImageAlt: 'Brand Yatra editorial planning and collaborative strategy workspace',
    capabilitiesHeading: ['Strategic messaging', 'for every touchpoint.'],
    capabilitiesIntro:
      'From foundational website copy to ongoing thought leadership, we write with precision and commercial intent.',
    capabilities: [
      {
        number: '01',
        title: 'Content Strategy & Messaging Architecture',
        description:
          'Defining core value propositions, audience pain-point narratives, editorial themes and channel-specific voice rules.',
      },
      {
        number: '02',
        title: 'Website & Landing Page Copywriting',
        description:
          'Clear, conversion-minded headlines, service explanations, product narratives and microcopy structured alongside UI design.',
      },
      {
        number: '03',
        title: 'Editorial Articles, Guides & Case Narratives',
        description:
          'Well-researched insights, industry explainers and structured project stories that demonstrate real subject-matter depth.',
      },
      {
        number: '04',
        title: 'Campaign, Ad & Sales Enablement Copy',
        description:
          'Concise ad scripts, email sequences, capability brochures and executive presentation narratives.',
      },
    ],
    approachHeading: ['Research first.', 'Every sentence intentional.'],
    approachIntro:
      'Good copywriting starts with listening closely to how your team and your customers talk about the problems you solve.',
    approach: [
      {
        number: '01',
        title: 'SUBJECT & AUDIENCE DISCOVERY',
        description:
          'We interview stakeholders, review existing materials and map the questions prospects ask before buying.',
      },
      {
        number: '02',
        title: 'MESSAGING HIERARCHY',
        description:
          'We outline page structures, headline hooks, proof sequencing and tone calibration before full drafting.',
      },
      {
        number: '03',
        title: 'EDITORIAL DRAFTING',
        description:
          'We write concise, jargon-free copy formatted specifically for digital scanning and visual layout rhythm.',
      },
      {
        number: '04',
        title: 'POLISH & ALIGNMENT',
        description:
          'We refine phrasing with your subject-matter experts and verify seamless fit inside final design layouts.',
      },
    ],
    benefitsHeading: ['Why clear writing', 'accelerates decisions.'],
    benefitsIntro:
      'Confident, plain-spoken copy respects your reader’s time and removes friction across sales and digital journeys.',
    benefits: [
      {
        number: '01',
        title: 'Immediate Value Clarity',
        description:
          'Visitors understand what your organization offers and whom you serve within seconds of landing on a page.',
      },
      {
        number: '02',
        title: 'Unified Organizational Voice',
        description:
          'Your website, ad campaigns and sales decks reinforce the exact same positioning story.',
      },
      {
        number: '03',
        title: 'Copy & Design Built Together',
        description:
          'Writing alongside UI/UX and graphic designers prevents awkward text overflow or hollow placeholder layouts.',
      },
      {
        number: '04',
        title: 'Search & Reader Alignment',
        description:
          'Structured, informative content satisfies search intent naturally without reading like robotic SEO text.',
      },
    ],
    faqs: [
      {
        question: 'Can you write technical or B2B content accurately?',
        answer:
          'Yes. We begin with structured stakeholder interviews and reference reviews to capture accurate domain nuance, then translate complex concepts into clear, executive-ready prose.',
      },
      {
        question: 'Should website copywriting happen before or after UI design?',
        answer:
          'Ideally alongside or ahead of visual layout. Establishing real messaging hierarchy early ensures interfaces are designed around actual arguments rather than generic placeholder blocks.',
      },
      {
        question: 'Do you optimize editorial content for SEO?',
        answer:
          'Yes. Our writers work directly with our SEO strategists to structure headings, topical coverage and metadata around real search intent while keeping human readability first.',
      },
      {
        question: 'Can you refine copy our internal team has already drafted?',
        answer:
          'Yes. We can either write from scratch based on discovery interviews or editorially sharpen, restructure and unify existing internal drafts.',
      },
    ],
    ctaHeading: ['NEED CLEARER WORDS FOR', 'YOUR NEXT LAUNCH?'],
    ctaDescription:
      'Whether rewriting a full website or structuring an editorial roadmap, let’s articulate your story with precision.',
    ctaText: "Let's Talk Business",
    seoTitle: 'Content & Copywriting Services — Brand Yatra | Strategy & Website Copy',
    seoDescription:
      'Content strategy and copywriting by Brand Yatra: messaging architecture, website and landing page copy, editorial insights and campaign storytelling.',
  },
  {
    slug: 'video-motion',
    number: '10',
    title: 'Video & Motion',
    navigationLabel: 'Video & Motion',
    eyebrow: '10 / VIDEO & MOTION · BRAND YATRA',
    heroHeadlineLines: ['BRING YOUR BRAND', 'STORY TO LIFE IN'],
    highlightedHeadlineText: 'MOTION.',
    shortDescription:
      'We craft brand films, motion graphics, product explainers and short-form social edits engineered to hold attention across modern screens.',
    heroImage: '/images/services/video-motion-studio.jpg',
    heroImageAlt: 'Cinema-grade camera rig inside Brand Yatra dark production studio',
    overviewEyebrow: 'BRAND FILMS, EDITING & MOTION DESIGN',
    overviewHeading: ['Pacing, rhythm', 'and visual storytelling.'],
    overviewDescription: [
      'Movement captures attention and explains nuanced ideas in ways static imagery alone cannot—whether introducing a product interface, opening a website hero or stopping a fast-moving social feed.',
      'At Brand Yatra, our editors and motion designers focus on disciplined pacing, kinetic typography, clean visual transitions, sound design and multi-aspect adaptation.',
      'From concise short-form campaign cuts to polished brand films and UI motion explainers, every frame is crafted to reflect your brand’s aesthetic standards.',
    ],
    overviewImage: '/images/home/hero-creative-director-mobile.jpg',
    overviewImageAlt: 'Creative director reviewing motion storyboards and visual pacing in studio',
    capabilitiesHeading: ['Crafted for feeds,', 'presentations and web.'],
    capabilitiesIntro:
      'We deliver versatile video and motion assets formatted cleanly for their target viewing environments.',
    capabilities: [
      {
        number: '01',
        title: 'Brand Films & Corporate Showcases',
        description:
          'Narrative-driven edits combining live footage, typography, color grading and sound design to introduce your company.',
      },
      {
        number: '02',
        title: '2D Motion Graphics & Kinetic Typography',
        description:
          'Animated brand systems, product UI walkthroughs, explainer sequences and logo/title reveals.',
      },
      {
        number: '03',
        title: 'Short-Form Social & Ad Video Edits',
        description:
          'Vertical 9:16 Reels, YouTube Shorts and paid-social video variations built with strong opening hooks and crisp captions.',
      },
      {
        number: '04',
        title: 'Post-Production, Grading & Format Adaptation',
        description:
          'Precision editing, audio balancing, subtitle styling and multi-ratio exports (16:9, 1:1, 4:5 and 9:16).',
      },
    ],
    approachHeading: ['Concept to final cut.', 'Frame by frame.'],
    approachIntro:
      'Clear pre-visualization keeps motion production efficient and aligned with your brand direction.',
    approach: [
      {
        number: '01',
        title: 'SCRIPT & STORYBOARD',
        description:
          'We lock narrative pacing, visual beats, aspect ratios and script hooks before animation or assembly begins.',
      },
      {
        number: '02',
        title: 'STYLEFRAMES & DIRECTION',
        description:
          'We establish key visual frames, typographic treatments and motion principles matching your brand palette.',
      },
      {
        number: '03',
        title: 'EDITING & ANIMATION',
        description:
          'We assemble cuts, animate motion layers, integrate sound design and refine timing curves.',
      },
      {
        number: '04',
        title: 'FINISHING & EXPORTS',
        description:
          'We complete color polish, captioned/uncaptioned masters and platform-optimized delivery codecs.',
      },
    ],
    benefitsHeading: ['Why purposeful motion', 'deepens engagement.'],
    benefitsIntro:
      'Well-paced video distills complex offerings quickly while giving digital channels unmistakable energy.',
    benefits: [
      {
        number: '01',
        title: 'Faster Product & Concept Clarity',
        description:
          'Demonstrate workflows, services or brand stories in 30–60 seconds rather than paragraphs of dense text.',
      },
      {
        number: '02',
        title: 'Stronger Paid & Organic Feed Stopping Power',
        description:
          'Purpose-built opening frames and captioned vertical edits hold viewer attention with or without sound.',
      },
      {
        number: '03',
        title: 'Multi-Channel Asset Leverage',
        description:
          'A single core narrative can be adapted cleanly across website headers, sales presentations and social ad variations.',
      },
      {
        number: '04',
        title: 'Brand-Consistent Motion Language',
        description:
          'Restrained easing, clean typography and disciplined color grading ensure videos elevate your brand identity.',
      },
    ],
    faqs: [
      {
        question: 'Can you create polished videos using our existing footage or UI assets?',
        answer:
          'Yes. Even without a new live-action shoot, we frequently combine existing brand footage, product interfaces, custom 2D motion graphics and kinetic typography into compelling films and ad cuts.',
      },
      {
        question: 'Do you deliver multiple aspect ratios for different platforms?',
        answer:
          'Yes. We reframe compositions intentionally—rather than simply center-cropping—so text and focal points stay balanced across 16:9 widescreen, 4:5 feed and 9:16 vertical placements.',
      },
      {
        question: 'Do you include captions for silent mobile viewing?',
        answer:
          'Yes. Because many social and web viewers watch with audio muted initially, we design brand-aligned on-screen captions as well as clean uncaptioned masters.',
      },
      {
        question: 'Can you produce multiple hook variations for paid social testing?',
        answer:
          'Yes. Working closely with our Meta and Google Ads specialists, we can export modular opening hooks and end-cards to support structured creative testing.',
      },
    ],
    ctaHeading: ['READY TO PUT YOUR', 'BRAND IN MOTION?'],
    ctaDescription:
      'Share your story, launch goals or campaign brief—let’s plan video and motion work built for modern screens.',
    ctaText: "Let's Talk Business",
    seoTitle: 'Video & Motion Services — Brand Yatra | Motion Graphics & Brand Videos',
    seoDescription:
      'Video editing and motion design by Brand Yatra: brand films, 2D motion graphics, product explainers and short-form social video production.',
  },
  {
    slug: 'ui-ux',
    number: '11',
    title: 'UI / UX',
    navigationLabel: 'UI / UX',
    eyebrow: '11 / UI / UX · BRAND YATRA',
    heroHeadlineLines: ['INTUITIVE INTERFACES', 'DESIGNED AROUND'],
    highlightedHeadlineText: 'REAL PEOPLE.',
    shortDescription:
      'We research user journeys, structure clear wireframes, craft modular interface systems and build interactive prototypes that make digital products effortless to use.',
    heroImage: '/images/services/ui-ux-interface-system.jpg',
    heroImageAlt: 'Editorial UI/UX interface system and digital product architecture on studio monitor',
    overviewEyebrow: 'USER EXPERIENCE & INTERFACE SYSTEMS',
    overviewHeading: ['Clarity in structure.', 'Precision in every screen.'],
    overviewDescription: [
      'Great digital experiences feel effortless because the underlying information architecture, navigation patterns and visual hierarchy were resolved long before final polish.',
      'At Brand Yatra, our UI/UX process bridges business objectives with real human behavior—mapping user flows, resolving friction in wireframes, crafting accessible interface components and validating journeys with interactive prototypes.',
      'Whether designing a conversion-focused marketing platform, a SaaS web application or redesigning an intricate customer portal, we create scalable design systems ready for clean engineering handoff.',
    ],
    overviewImage: '/images/work/brightlight-consultation-web.jpg',
    overviewImageAlt: 'Designer reviewing digital product usability and layout hierarchy in studio',
    capabilitiesHeading: ['Thoughtful journeys.', 'Scalable design systems.'],
    capabilitiesIntro:
      'Our UI/UX deliverables give stakeholders clarity early and give developers exact specifications for implementation.',
    capabilities: [
      {
        number: '01',
        title: 'UX Research & Journey Mapping',
        description:
          'Auditing existing user friction, defining primary user tasks, mapping navigation flows and structuring logical sitemaps.',
      },
      {
        number: '02',
        title: 'Information Architecture & Wireframing',
        description:
          'Low- and mid-fidelity structural layouts that establish content priority, page flow and interaction logic without visual distraction.',
      },
      {
        number: '03',
        title: 'High-Fidelity Interface Design & Design Systems',
        description:
          'Responsive desktop and mobile screens built on tokenized typography, spacing scales, accessible contrast and reusable UI components.',
      },
      {
        number: '04',
        title: 'Interactive Prototyping & Usability Refinement',
        description:
          'Clickable prototypes for stakeholder walkthroughs, user feedback sessions and unambiguous developer specifications.',
      },
    ],
    approachHeading: ['Structure before surface.', 'Validated before code.'],
    approachIntro:
      'Resolving flow and usability questions inside interactive prototypes saves substantial engineering rework.',
    approach: [
      {
        number: '01',
        title: 'DISCOVERY & UX AUDIT',
        description:
          'We evaluate user goals, business actions, accessibility requirements and friction points in current flows.',
      },
      {
        number: '02',
        title: 'FLOWS & WIREFRAMES',
        description:
          'We map end-to-end user journeys and page structures so navigation and hierarchy feel intuitive.',
      },
      {
        number: '03',
        title: 'UI CRAFT & SYSTEMIZATION',
        description:
          'We apply brand-aligned visual craft across responsive viewports and assemble documented component libraries.',
      },
      {
        number: '04',
        title: 'PROTOTYPE & DEV HANDOFF',
        description:
          'We validate interactive states—hover, focus, empty, loading and error—and prepare developer-ready specs.',
      },
    ],
    benefitsHeading: ['Why UX discipline', 'reduces digital friction.'],
    benefitsIntro:
      'Intuitive interfaces help users accomplish what they came for quickly while keeping product teams aligned on a shared component language.',
    benefits: [
      {
        number: '01',
        title: 'Lower Visitor Confusion & Drop-Off',
        description:
          'Clear navigation, scannable hierarchy and predictable controls keep users moving confidently toward key actions.',
      },
      {
        number: '02',
        title: 'Reusable Component Consistency',
        description:
          'Documented buttons, forms, cards and spacing tokens ensure future features stay cohesive as your platform expands.',
      },
      {
        number: '03',
        title: 'Smoother Engineering Implementation',
        description:
          'Complete responsive breakpoints and edge-case states eliminate guesswork between design and development.',
      },
      {
        number: '04',
        title: 'Built-In Accessibility Standards',
        description:
          'WCAG-conscious color contrast, legible type scales, touch-target sizing and keyboard focus states are designed in from the start.',
      },
    ],
    faqs: [
      {
        question: 'Do you design both marketing websites and web applications?',
        answer:
          'Yes. Our UI/UX team designs editorial brand websites, conversion landing systems, SaaS dashboards, customer portals and multi-step digital workflows.',
      },
      {
        question: 'What deliverables do our developers receive if we build in-house?',
        answer:
          'Your engineering team receives organized Figma component libraries, style tokens, responsive desktop and mobile layouts, interactive prototypes and state documentation—or our Web Development team can build it directly.',
      },
      {
        question: 'Can you audit and improve UX on an existing live product?',
        answer:
          'Yes. A focused UX audit identifies high-friction navigation, confusing form steps, mobile usability bottlenecks and hierarchy issues prioritized by practical impact.',
      },
      {
        question: 'How do you handle mobile vs. desktop design?',
        answer:
          'Every key screen is designed intentionally across desktop and mobile breakpoints rather than leaving mobile layouts as an afterthought during coding.',
      },
    ],
    ctaHeading: ['DESIGNING A PRODUCT', 'OR RETHINKING UX?'],
    ctaDescription:
      'Let’s map a clearer, more intuitive digital experience for your users and your team.',
    ctaText: "Let's Talk Business",
    seoTitle: 'UI / UX Design Services — Brand Yatra | User Research, Wireframes & Interfaces',
    seoDescription:
      'UI/UX design services by Brand Yatra: user journey mapping, wireframes, responsive interface systems, interactive prototypes and usability refinement.',
  },
  {
    slug: 'analytics-cro',
    number: '12',
    title: 'Analytics & CRO',
    navigationLabel: 'Analytics & CRO',
    eyebrow: '12 / ANALYTICS & CRO · BRAND YATRA',
    heroHeadlineLines: ['TURN CLEAN DATA INTO', 'SMARTER CONVERSION'],
    highlightedHeadlineText: 'DECISIONS.',
    shortDescription:
      'We configure trustworthy GA4 measurement, custom funnel tracking, behavioral analysis and structured UX experiments to improve how existing traffic converts.',
    heroImage: '/images/services/analytics-cro-workspace.jpg',
    heroImageAlt: 'Brand Yatra strategy workspace dedicated to GA4 measurement and conversion optimization',
    overviewEyebrow: 'MEASUREMENT ARCHITECTURE & CONVERSION OPTIMIZATION',
    overviewHeading: ['Trustworthy numbers.', 'Evidence-led improvements.'],
    overviewDescription: [
      'Making marketing or website decisions on broken tags, duplicate events or vanity pageviews leads teams astray. Equally, driving more traffic to a leaky funnel leaves opportunity on the table.',
      'At Brand Yatra, Analytics & CRO brings measurement integrity and user-experience refinement together. We start by instrumenting clean GA4 and Google Tag Manager event schemas so you can trust where visitors come from and where they hesitate.',
      'From there, we combine funnel drop-off data, scroll/interaction behavior and qualitative UX review to formulate clear hypotheses and test practical page improvements.',
    ],
    overviewImage: '/images/services/seo-search-architecture.jpg',
    overviewImageAlt: 'Digital platform conversion pathway and behavioral analytics review',
    capabilitiesHeading: ['Accurate tracking.', 'Structured experimentation.'],
    capabilitiesIntro:
      'We build clean measurement foundations first, then apply insights systematically to high-traffic journeys.',
    capabilities: [
      {
        number: '01',
        title: 'GA4 & Google Tag Manager Architecture',
        description:
          'Auditing, cleaning up and documenting custom events, conversions, cross-domain tracking and UTM attribution hygiene.',
      },
      {
        number: '02',
        title: 'Funnel & Behavioral Drop-Off Analysis',
        description:
          'Mapping step-by-step progression across landing pages, inquiry forms and key journeys to pinpoint exactly where visitors abandon.',
      },
      {
        number: '03',
        title: 'Heuristic UX & Conversion Audits',
        description:
          'Evaluating value-proposition clarity, CTA placement, form friction, mobile load behavior and trust signals on priority pages.',
      },
      {
        number: '04',
        title: 'Hypothesis Testing & Iterative Refinement',
        description:
          'Designing, deploying and measuring structured page, copy and form experiments grounded in observed user behavior.',
      },
    ],
    approachHeading: ['Measure accurately.', 'Improve methodically.'],
    approachIntro:
      'Conversion optimization is an ongoing discipline of instrumentation, diagnosis, hypothesis design and verification.',
    approach: [
      {
        number: '01',
        title: 'MEASUREMENT AUDIT',
        description:
          'We verify GA4, GTM and ad-platform tags to eliminate duplicate, missing or misleading conversion events.',
      },
      {
        number: '02',
        title: 'FUNNEL DIAGNOSIS',
        description:
          'We combine quantitative funnel drop-off reports with behavioral UX review across desktop and mobile.',
      },
      {
        number: '03',
        title: 'HYPOTHESIS & DESIGN',
        description:
          'We prioritize high-leverage page, copy or form refinements and craft clean test variations.',
      },
      {
        number: '04',
        title: 'MEASURE & ITERATE',
        description:
          'We evaluate outcomes against primary conversion goals and roll validated learnings across your digital presence.',
      },
    ],
    benefitsHeading: ['Why measurement clarity', 'sharpens every investment.'],
    benefitsIntro:
      'Clean analytics and thoughtful CRO amplify the effectiveness of every SEO, paid search and social campaign you already run.',
    benefits: [
      {
        number: '01',
        title: 'Confidence in Your Reporting',
        description:
          'Eliminate conflicting numbers across GA4, ad platforms and CRM inquiries through documented event governance.',
      },
      {
        number: '02',
        title: 'More Value From Existing Traffic',
        description:
          'Removing confusing copy, slow mobile elements or unnecessary form fields helps interested visitors complete actions.',
      },
      {
        number: '03',
        title: 'Decisions Backed by Evidence',
        description:
          'Replace subjective internal debates over page layouts with observed funnel behavior and structured tests.',
      },
      {
        number: '04',
        title: 'Continuous Cross-Team Feedback',
        description:
          'Insights from conversion analysis directly inform paid landing pages, website UX updates and sales messaging.',
      },
    ],
    faqs: [
      {
        question: 'Our current GA4 setup feels messy or inaccurate—can you fix that first?',
        answer:
          'Yes. Almost every engagement begins with a measurement audit where we clean up Google Tag Manager containers, remove duplicate tags and establish a documented event naming structure.',
      },
      {
        question: 'Do we need massive website traffic to benefit from CRO?',
        answer:
          'No. While high-traffic sites can run rapid split tests, moderate-traffic businesses gain substantial clarity from funnel drop-off diagnostics, mobile usability fixes, form simplification and message-clarity improvements.',
      },
      {
        question: 'Can your team design and code the landing-page improvements directly?',
        answer:
          'Yes. Because our analysts collaborate directly with Brand Yatra’s copywriters, UI/UX designers and web developers, approved improvements move smoothly from insight to live deployment.',
      },
      {
        question: 'Do you create executive dashboards that are easy to read?',
        answer:
          'Yes. We structure focused reporting views centered on meaningful commercial actions, traffic quality and funnel health rather than overwhelming spreadsheets.',
      },
    ],
    ctaHeading: ['WANT CLEARER DATA AND', 'STRONGER CONVERSIONS?'],
    ctaDescription:
      'Let’s audit your current GA4 tracking, key landing journeys and conversion bottlenecks together.',
    ctaText: "Let's Talk Business",
    seoTitle: 'Analytics & CRO Services — Brand Yatra | GA4 Tracking & Conversion Optimization',
    seoDescription:
      'Analytics and CRO services by Brand Yatra: GA4 measurement architecture, event tracking, funnel analysis and structured conversion optimization.',
  },
];

export const SERVICE_BY_SLUG: Record<ServiceSlug, ServicePageData> = SERVICES_LIST.reduce(
  (acc, item) => {
    acc[item.slug] = item;
    return acc;
  },
  {} as Record<ServiceSlug, ServicePageData>
);

export function getServiceBySlug(slug: string): ServicePageData | undefined {
  return (SERVICE_BY_SLUG as Record<string, ServicePageData | undefined>)[slug];
}

export function getServiceHref(slug: ServiceSlug): string {
  return `/services/${slug}`;
}
