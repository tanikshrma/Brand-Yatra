import type { AppRoute } from './services.ts';

export type ArticleCategory =
  | 'Branding'
  | 'Digital Marketing'
  | 'SEO'
  | 'Web Development'
  | 'Social Media'
  | 'Design & Creative';

export type ArticleFilterCategory =
  | 'ALL'
  | 'BRANDING'
  | 'DIGITAL MARKETING'
  | 'SEO'
  | 'WEB DEVELOPMENT'
  | 'SOCIAL MEDIA'
  | 'DESIGN & CREATIVE';

export type ArticleStatus = 'published' | 'draft';

export interface ArticleAuthor {
  name: string;
  role?: string;
}

export interface ArticleInternalLink {
  label: string;
  href: AppRoute;
  description: string;
}

export interface ArticleSection {
  id: string;
  heading: string;
  paragraphs: string[];
  subheading?: string;
  subParagraphs?: string[];
  keyPoints?: string[];
}

export interface ArticleData {
  slug: string;
  title: string;
  category: ArticleCategory;
  excerpt: string;
  featuredImage: string;
  imageAlt: string;
  /** Optional verified author — never invented; rendered only if supplied */
  author?: ArticleAuthor;
  /** Optional verified publication ISO/display date — never invented; rendered only if supplied */
  publishedAt?: string;
  updatedAt?: string;
  featured?: boolean;
  status: ArticleStatus;
  introduction: string[];
  sections: ArticleSection[];
  internalLinks?: ArticleInternalLink[];
  seoTitle: string;
  seoDescription: string;
}

export const ARTICLE_FILTER_CATEGORIES: ArticleFilterCategory[] = [
  'ALL',
  'BRANDING',
  'DIGITAL MARKETING',
  'SEO',
  'WEB DEVELOPMENT',
  'SOCIAL MEDIA',
  'DESIGN & CREATIVE',
];

export const ARTICLES_PER_PAGE = 6;

/**
 * Dynamically calculates estimated reading time in minutes from real article prose.
 */
export function calculateReadingTimeMinutes(article: ArticleData): number {
  const chunks: string[] = [
    article.title,
    article.excerpt,
    ...article.introduction,
  ];

  for (const section of article.sections) {
    chunks.push(section.heading);
    chunks.push(...section.paragraphs);
    if (section.subheading) chunks.push(section.subheading);
    if (section.subParagraphs) chunks.push(...section.subParagraphs);
    if (section.keyPoints) chunks.push(...section.keyPoints);
  }

  const totalWords = chunks
    .join(' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(2, Math.ceil(totalWords / 195));
}

export function getArticleHref(slug: string): string {
  return `/insights/${slug}`;
}

/**
 * Centralized structured journal repository for Brand Yatra.
 * - Published entries contain complete, original long-form editorial articles with authentic photography.
 * - Draft entries (`status: 'draft'`) remain strictly unpublished and excluded from public listings,
 *   related recommendations, sitemap entries and public route resolution until completed and approved.
 * - `publishedAt` and `author` are omitted unless verified so no dates or identities are fabricated.
 */
export const ARTICLES_DATA: ArticleData[] = [
  /* =========================================================================
     ARTICLE 01 — FEATURED EDITOR'S PICK (Branding)
     ========================================================================= */
  {
    slug: 'why-a-strong-brand-identity-matters-more-than-ever',
    title: 'Why a Strong Brand Identity Matters More Than Ever',
    category: 'Branding',
    excerpt:
      'Explore how a clear and consistent brand identity helps businesses communicate their value, earn trust and create meaningful connections.',
    featuredImage: '/images/insights/why-brand-identity-matters.jpg',
    imageAlt:
      'Designer arranging tactile brand identity swatch books, embossed stationery and layout grids in studio',
    featured: true,
    status: 'published',
    introduction: [
      'In crowded digital markets, buyers rarely evaluate businesses in isolation. Within seconds of landing on a website, scrolling past a campaign creative or opening a proposal, prospective customers form an instinct about whether a company feels credible, coherent and worth their attention.',
      'A strong brand identity is the system that shapes that first impression—and sustains it across every interaction that follows. Far more than a decorative logo, it translates business strategy into unmistakable visual and verbal clarity.',
    ],
    sections: [
      {
        id: 'beyond-a-surface-mark',
        heading: 'Identity Is Much More Than a Logo',
        paragraphs: [
          'Many growing businesses treat branding as a one-time graphic exercise: choose a mark, pick two colors and move straight into advertising. Yet a standalone symbol cannot carry messaging consistency across a website, product packaging, sales presentations and social channels on its own.',
          'A complete brand identity brings together positioning, typographic hierarchy, color architecture, photography direction and tone of voice. When these elements are designed as one system, every customer touchpoint reinforces the same core promise.',
        ],
        keyPoints: [
          'Clear visual hierarchy helps audiences recognize your brand before reading a single headline.',
          'Defined verbal guidelines ensure founders, marketers and sales teams speak with one coherent voice.',
          'Scalable design rules reduce creative friction whenever launching new campaigns or digital products.',
        ],
      },
      {
        id: 'how-consistency-builds-trust',
        heading: 'How Visual and Verbal Consistency Earns Trust',
        paragraphs: [
          'Trust is built through familiarity and reliability. When a prospect encounters a polished advertisement on social media, clicks through to a mismatched landing page and receives a generic PDF deck, subtle doubt creeps into the buying journey.',
          'Cohesive identity design removes that disconnect. Deliberate typography, restrained color usage and authentic imagery signal operational maturity—reassuring buyers that the care invested in your communication reflects the quality of your product or service.',
        ],
        subheading: 'Standing Apart Without Shouting',
        subParagraphs: [
          'Distinctiveness does not require loud gimmicks. Often, the most memorable brands stand out through discipline: owning a specific color accent, maintaining generous editorial whitespace and communicating complex ideas in plain, confident language.',
        ],
      },
      {
        id: 'supporting-performance-and-growth',
        heading: 'How Brand Identity Strengthens Digital Performance',
        paragraphs: [
          'Brand building and performance marketing are frequently treated as separate budgets, yet they directly influence one another. Paid search, social campaigns and SEO bring prospects to the door, while brand clarity determines how confidently those visitors engage and inquire.',
          'When audiences immediately understand who you serve, what sets your approach apart and why your organization is credible, every downstream marketing channel works more efficiently.',
        ],
      },
      {
        id: 'building-for-the-long-term',
        heading: 'Designing an Identity Built to Evolve',
        paragraphs: [
          'The strongest brand systems are practical tools for everyday execution. Documenting clear usage rules—spacing, type scales, contrast pairings and real-world templates—empowers internal teams and external partners to move quickly without diluting quality.',
          'Whether launching a new venture or refining an established organization, investing in thoughtful brand identity lays the groundwork for durable recognition and long-term customer relationships.',
        ],
      },
    ],
    internalLinks: [
      {
        label: 'Explore Branding Services',
        href: '/services/branding',
        description: 'See how Brand Yatra crafts positioning, visual systems and brand guidelines.',
      },
      {
        label: 'View Selected Brand Work',
        href: '/work',
        description: 'Browse recent identity, packaging and digital brand engagements.',
      },
    ],
    seoTitle: 'Why a Strong Brand Identity Matters More Than Ever | Brand Yatra Journal',
    seoDescription:
      'Discover how strategic branding and consistent visual identity help businesses communicate value, build trust and strengthen digital growth.',
  },

  /* =========================================================================
     ARTICLE 02 — Digital Marketing
     ========================================================================= */
  {
    slug: 'building-a-digital-marketing-strategy-that-actually-makes-sense',
    title: 'Building a Digital Marketing Strategy That Actually Makes Sense',
    category: 'Digital Marketing',
    excerpt:
      'Learn how to connect business goals, audience insights, channels and measurement into a focused marketing plan.',
    featuredImage: '/images/insights/digital-marketing-strategy.jpg',
    imageAlt:
      'Strategic marketing workstation mapping audience journeys, channels and commercial goals',
    status: 'published',
    introduction: [
      'Many organizations stay busy with marketing activity—publishing sporadic posts, boosting occasional ads and testing disconnected tools—without feeling confident about what is genuinely moving the business forward.',
      'An effective digital marketing strategy replaces scattered tactics with a clear sequence of decisions: who you need to reach, what problem they are trying to solve, which channels match their intent and how progress will be measured.',
    ],
    sections: [
      {
        id: 'start-with-commercial-clarity',
        heading: 'Start With Commercial Objectives, Not Platforms',
        paragraphs: [
          'Choosing channels before clarifying business goals is one of the most common planning mistakes. A B2B consultancy seeking qualified discovery conversations requires a fundamentally different channel mix than a consumer brand launching a seasonal product line.',
          'Before allocating budget to search, social or content production, align on concrete commercial priorities—such as improving lead quality, shortening sales education cycles or expanding awareness in a new regional market.',
        ],
      },
      {
        id: 'mapping-audience-intent',
        heading: 'Understand How Your Audience Evaluates Options',
        paragraphs: [
          'Real buyers rarely convert on their very first interaction. Some are actively searching for an immediate solution, while others are comparing approaches, reading educational perspectives or looking for proof of capability.',
          'Mapping these stages helps your team pair the right message with the right moment: high-intent search and focused landing pages for active buyers, paired with clear brand storytelling and social proof for prospects still weighing their options.',
        ],
        keyPoints: [
          'Capture active demand where buyers are already searching for answers.',
          'Build familiarity and credibility through consistent educational and creative content.',
          'Ensure landing pages answer practical buyer questions without friction.',
        ],
      },
      {
        id: 'connecting-creative-and-conversion',
        heading: 'Align Creative Execution With Landing Experience',
        paragraphs: [
          'Even sharp audience targeting underperforms when campaign creative and website experience feel disconnected. If an advertisement promises a specific solution, the destination page should immediately validate that promise with clear hierarchy, relevant proof and an effortless next step.',
          'Treating creative assets, landing page copy and conversion forms as a single connected journey prevents wasted media spend.',
        ],
      },
      {
        id: 'meaningful-measurement',
        heading: 'Measure Signals That Guide Better Decisions',
        paragraphs: [
          'Impressions and surface clicks can indicate reach, but sustainable strategy relies on tracking meaningful actions—qualified inquiries, consultation bookings, engaged reading depth and pipeline contribution.',
          'Reviewing clean, honest data on a regular cadence allows teams to refine messaging, pause underperforming angles and invest confidently in the channels that support real growth.',
        ],
      },
    ],
    internalLinks: [
      {
        label: 'Lead Generation Capabilities',
        href: '/services/lead-generation',
        description: 'Explore structured funnel architecture and qualified demand generation.',
      },
      {
        label: 'Analytics & CRO Services',
        href: '/services/analytics-cro',
        description: 'Learn how clean measurement and conversion optimization sharpen campaign ROI.',
      },
    ],
    seoTitle: 'Building a Digital Marketing Strategy That Makes Sense | Brand Yatra',
    seoDescription:
      'Learn how to connect commercial goals, audience intent, creative channels and clean measurement into a focused digital marketing strategy.',
  },

  /* =========================================================================
     ARTICLE 03 — SEO
     ========================================================================= */
  {
    slug: 'seo-fundamentals-every-growing-business-should-understand',
    title: 'SEO Fundamentals Every Growing Business Should Understand',
    category: 'SEO',
    excerpt:
      'Explore the essential elements of search visibility, from technical foundations to useful content.',
    featuredImage: '/images/insights/seo-fundamentals-guide.jpg',
    imageAlt:
      'Digital strategist reviewing search structure and technical website architecture on a studio monitor',
    status: 'published',
    introduction: [
      'Organic search remains one of the most dependable ways for growing businesses to connect with people actively looking for expertise, products or solutions. Yet search engine optimization often gets obscured behind technical jargon or short-lived shortcuts.',
      'At its core, modern SEO rewards clarity: websites that search engines can crawl effortlessly, pages organized around genuine user intent and content that answers questions thoroughly.',
    ],
    sections: [
      {
        id: 'technical-foundations',
        heading: 'Technical Health Creates the Foundation',
        paragraphs: [
          'Before individual pages can compete in search results, search engines need to discover, crawl and understand your site structure reliably. Clean URL hierarchies, logical internal linking, accurate canonical tags and XML sitemaps give crawlers an unambiguous map of your most important pages.',
          'Equally important is real-world page performance. Fast mobile loading speeds, stable layouts and accessible HTML improve both search crawlability and human engagement.',
        ],
      },
      {
        id: 'search-intent-and-structure',
        heading: 'Organizing Pages Around Real Search Intent',
        paragraphs: [
          'Effective keyword research is less about repeating phrases and more about understanding what a person actually wants to accomplish when typing a query. Someone searching for a specific service expects clear scope, approach and inquiry options, whereas someone researching a concept wants an honest, well-structured explanation.',
          'Giving each core service and topic its own dedicated, focused URL prevents pages from competing against one another and makes navigation intuitive for visitors.',
        ],
        keyPoints: [
          'Dedicated service pages capture commercial queries with clear relevance.',
          'Semantic H1, H2 and H3 headings clarify document hierarchy for readers and search engines alike.',
          'Descriptive title tags and meta descriptions earn higher click-through from search results.',
        ],
      },
      {
        id: 'helpful-authoritative-content',
        heading: 'Substance Over Surface Keyword Stuffing',
        paragraphs: [
          'Search algorithms have grown increasingly adept at distinguishing helpful, experience-backed writing from thin, repetitive filler. Pages that address real customer questions, explain trade-offs transparently and connect related concepts naturally tend to earn stronger long-term visibility.',
        ],
      },
      {
        id: 'compounding-long-term-asset',
        heading: 'Treating Search Visibility as a Compounding Asset',
        paragraphs: [
          'Unlike paid campaigns that pause the moment media spend stops, well-maintained technical architecture and evergreen editorial pages compound over time—continuing to attract relevant visitors and reinforce brand authority month after month.',
        ],
      },
    ],
    internalLinks: [
      {
        label: 'SEO Services at Brand Yatra',
        href: '/services/seo',
        description: 'Technical SEO audits, search architecture and on-page optimization.',
      },
      {
        label: 'Web Development Services',
        href: '/services/web-development',
        description: 'Fast, semantic websites engineered with clean search foundations.',
      },
    ],
    seoTitle: 'SEO Fundamentals Every Growing Business Should Understand | Brand Yatra',
    seoDescription:
      'Understand the core pillars of sustainable SEO—from technical site health and page speed to search intent and helpful content.',
  },

  /* =========================================================================
     ARTICLE 04 — Web Development
     ========================================================================= */
  {
    slug: 'what-makes-a-business-website-effective',
    title: 'What Makes a Business Website Effective?',
    category: 'Web Development',
    excerpt:
      'Understand how performance, usability, accessibility and clear messaging contribute to better digital experiences.',
    featuredImage: '/images/insights/effective-business-website.jpg',
    imageAlt:
      'Modern responsive business website interface displayed on a sleek workstation in a creative studio',
    status: 'published',
    introduction: [
      'A business website sits at the center of almost every marketing and sales conversation. Whether a prospect discovers your company through a referral, a search query or a paid campaign, your website is where curiosity turns into evaluation.',
      'An effective website does more than look contemporary—it communicates value immediately, guides visitors without friction and performs reliably across every screen size.',
    ],
    sections: [
      {
        id: 'immediate-clarity-above-the-fold',
        heading: 'Immediate Clarity Within the First Few Seconds',
        paragraphs: [
          'Visitors should never have to puzzle out what your organization does or whom it helps. Strong business websites pair a confident, readable headline with concise supporting context and a clear primary action.',
          'Restrained visual hierarchy—generous whitespace, legible typography and purposeful contrast—keeps attention focused on your core message rather than competing animations or cluttered banners.',
        ],
      },
      {
        id: 'intuitive-navigation-and-ux',
        heading: 'Intuitive Navigation and User-First Structure',
        paragraphs: [
          'Great usability feels effortless. When navigation menus are predictable, service pages follow a scannable rhythm and supporting proof appears right where questions arise, visitors move naturally from overview to inquiry.',
          'Designing for mobile users with the same rigor as desktop desktops is essential: tap targets must be comfortable, layouts must adapt cleanly without horizontal overflow and forms should ask only for what is genuinely needed.',
        ],
      },
      {
        id: 'engineering-speed-and-accessibility',
        heading: 'Performance, Accessibility and Technical Craft',
        paragraphs: [
          'Behind the visual layer, engineering discipline determines how trustworthy a site feels in motion. Optimized imagery, lean scripts, keyboard-accessible controls and strong color contrast ensure every visitor experiences a responsive, inclusive interface.',
        ],
        keyPoints: [
          'Fast asset delivery prevents visitor drop-off on mobile connections.',
          'Semantic HTML and keyboard focus states support accessibility and search engines.',
          'Clear, low-friction inquiry pathways turn engaged readers into conversations.',
        ],
      },
      {
        id: 'built-to-scale-with-your-business',
        heading: 'Modular Architecture Ready for Growth',
        paragraphs: [
          'As your offerings, case studies and insights expand, a modular component structure allows your team to publish new pages consistently without breaking visual harmony or rebuilding templates from scratch.',
        ],
      },
    ],
    internalLinks: [
      {
        label: 'Web Development Services',
        href: '/services/web-development',
        description: 'Custom responsive websites engineered for speed, clarity and scalability.',
      },
      {
        label: 'UI / UX Design Capabilities',
        href: '/services/ui-ux',
        description: 'User journeys, wireframing and interactive interface systems.',
      },
    ],
    seoTitle: 'What Makes a Business Website Effective? | Brand Yatra Journal',
    seoDescription:
      'Explore how clear messaging, intuitive UX, mobile responsiveness, accessibility and fast performance create an effective business website.',
  },

  /* =========================================================================
     ARTICLE 05 — Social Media
     ========================================================================= */
  {
    slug: 'creating-social-media-content-with-a-clear-purpose',
    title: 'Creating Social Media Content With a Clear Purpose',
    category: 'Social Media',
    excerpt:
      'Explore how content strategy and consistent communication can help brands connect with their audiences.',
    featuredImage: '/images/insights/social-media-with-purpose.jpg',
    imageAlt:
      'Editorial art direction tabletop prepared for purposeful social media content production',
    status: 'published',
    introduction: [
      'Publishing on social channels simply to fill a calendar rarely builds lasting brand equity. Audiences scroll past generic filler instinctively, yet pause when a brand shares a sharp perspective, useful insight or unmistakable visual craft.',
      'Purposeful social media begins by replacing volume-for-volume’s-sake with clear content pillars anchored in your brand’s expertise and audience curiosities.',
    ],
    sections: [
      {
        id: 'defining-editorial-pillars',
        heading: 'Anchor Every Post in Clear Content Pillars',
        paragraphs: [
          'Rather than improvising topics week by week, structured social strategies establish three to four recurring pillars—such as educational insights, behind-the-work craft, product clarity and brand perspective.',
          'Each pillar serves a distinct role: some formats earn discovery from new audiences, while others deepen credibility with people already considering working with you.',
        ],
      },
      {
        id: 'visual-cohesion-in-fast-feeds',
        heading: 'Maintain Visual Recognition Across Formats',
        paragraphs: [
          'Whether someone encounters a static carousel, a short-form vertical reel or an announcement graphic, your typography, color restraint and art direction should feel unmistakably yours before they even glance at the account handle.',
        ],
        keyPoints: [
          'Lead carousels and short videos with a clear, honest hook rather than clickbait.',
          'Adapt pacing and aspect ratios natively for each platform.',
          'Pair strong visual direction with concise, human copywriting.',
        ],
      },
      {
        id: 'sustainable-publishing-rhythm',
        heading: 'Consistency Outperforms Sporadic Bursts',
        paragraphs: [
          'A steady, sustainable publishing cadence—backed by batched creative production and thoughtful community interaction—builds far stronger audience familiarity than brief bursts of posting followed by weeks of silence.',
        ],
      },
      {
        id: 'learning-from-audience-signals',
        heading: 'Listen to Qualitative and Quantitative Signals',
        paragraphs: [
          'Saves, shares, thoughtful comments and profile visits often reveal far more about resonance than raw view counts alone. Paying attention to the topics audiences bookmark and share helps sharpen future campaigns across your entire marketing ecosystem.',
        ],
      },
    ],
    internalLinks: [
      {
        label: 'Social Media Services',
        href: '/services/social-media',
        description: 'Content pillars, creative direction and channel management for modern brands.',
      },
      {
        label: 'Content Strategy & Copywriting',
        href: '/services/content',
        description: 'Editorial frameworks and brand voice systems across digital touchpoints.',
      },
    ],
    seoTitle: 'Creating Social Media Content With a Clear Purpose | Brand Yatra',
    seoDescription:
      'Learn how structured content pillars, cohesive visual direction and consistent communication make brand social media meaningful.',
  },

  /* =========================================================================
     ARTICLE 06 — Design & Creative
     ========================================================================= */
  {
    slug: 'the-power-of-visual-storytelling-in-modern-marketing',
    title: 'The Power of Visual Storytelling in Modern Marketing',
    category: 'Design & Creative',
    excerpt:
      'Discover how photography, video, motion and design can strengthen brand communication.',
    featuredImage: '/images/insights/power-of-visual-storytelling.jpg',
    imageAlt:
      'Cinema camera rig and warm tungsten lighting setup prepared for visual brand storytelling',
    status: 'published',
    introduction: [
      'Before an audience reads a paragraph of product specifications, visual craft sets the emotional and intellectual tone. Authentic photography, considered graphic design and purposeful motion help people grasp complex ideas intuitively.',
      'Visual storytelling is not decoration added at the end of a project—it is a strategic medium for communicating character, precision and intent.',
    ],
    sections: [
      {
        id: 'authenticity-over-generic-imagery',
        heading: 'Why Authentic Imagery Outperforms Generic Visuals',
        paragraphs: [
          'Audiences quickly recognize overused stock clichés and synthetic visual tropes. Real architectural textures, honest product photography, documentary workspace moments and intentional typography immediately signal that a brand values craft.',
          'Selecting fewer, stronger visuals—and giving them room to breathe within spacious layouts—creates far greater impact than crowding every section with competing graphics.',
        ],
      },
      {
        id: 'motion-with-editorial-purpose',
        heading: 'Using Video and Motion to Clarify, Not Distract',
        paragraphs: [
          'Short brand films, product walkthroughs and restrained motion graphics excel at demonstrating how something works or capturing atmosphere in ways static text cannot.',
          'On the web and in social feeds alike, motion works best when paced deliberately: guiding the eye toward focal messages rather than overwhelming the viewer with constant movement.',
        ],
        keyPoints: [
          'Use photography to establish human warmth, material quality and real-world context.',
          'Use graphic design and typography to structure complex information cleanly.',
          'Use video and motion to pace narrative hooks and product demonstrations.',
        ],
      },
      {
        id: 'unifying-campaign-touchpoints',
        heading: 'Keeping Creative Direction Unified Across Touchpoints',
        paragraphs: [
          'When campaign stills, motion edits, landing pages and print collateral share a unified art direction, every impression compounds—turning isolated creative assets into a recognizable brand world.',
        ],
      },
    ],
    internalLinks: [
      {
        label: 'Video & Motion Production',
        href: '/services/video-motion',
        description: 'Brand films, motion graphics and campaign video storytelling.',
      },
      {
        label: 'Graphic Design Studio',
        href: '/services/graphic-design',
        description: 'Editorial layouts, campaign creatives and brand collateral.',
      },
    ],
    seoTitle: 'The Power of Visual Storytelling in Modern Marketing | Brand Yatra',
    seoDescription:
      'Discover how authentic photography, editorial design and purposeful motion strengthen modern brand communication.',
  },

  /* =========================================================================
     ARTICLE 07 — Digital Marketing
     ========================================================================= */
  {
    slug: 'google-ads-vs-meta-ads-choosing-the-right-approach',
    title: 'Google Ads vs Meta Ads: Choosing the Right Approach',
    category: 'Digital Marketing',
    excerpt:
      'Understand how search intent and audience discovery influence paid advertising strategy.',
    featuredImage: '/images/insights/google-ads-vs-meta-ads.jpg',
    imageAlt:
      'Contemporary creative studio strategy workspace comparing search intent and paid social creative',
    status: 'published',
    introduction: [
      'When planning paid media budgets, businesses frequently ask whether Google Ads or Meta Ads is the better investment. In practice, the two ecosystems solve fundamentally different moments in a buyer’s journey.',
      'Choosing wisely—or combining both effectively—starts with understanding the distinction between capturing active search intent and generating visual audience discovery.',
    ],
    sections: [
      {
        id: 'capturing-existing-demand-on-google',
        heading: 'Google Ads: Capturing High-Intent Search Demand',
        paragraphs: [
          'Search advertising connects your business with people who are actively typing a problem, service or product category into Google right now. Because the user already has intent, success depends on tight keyword selection, negative keyword hygiene, clear ad copy and high-converting landing pages.',
          'Google Ads is particularly effective when established search volume already exists for your offering and buyers compare providers directly.',
        ],
      },
      {
        id: 'generating-discovery-on-meta',
        heading: 'Meta Ads: Sparking Demand Through Creative Discovery',
        paragraphs: [
          'On Instagram and Facebook, users are not actively typing search queries—they are browsing visual feeds. Meta Ads excel at introducing distinctive products, services and ideas to relevant audiences before they even know your category solution exists.',
          'Here, creative quality is the primary performance lever: thumb-stopping video hooks, clear visual demonstrations and relatable messaging determine whether audiences engage.',
        ],
        keyPoints: [
          'Prioritize Google Search when prospects actively search for your exact service or solution.',
          'Prioritize Meta Ads when visual storytelling, brand discovery or new-offer education drives interest.',
          'Pair both channels when you want discovery creative to feed branded search and retargeting.',
        ],
      },
      {
        id: 'how-search-and-social-work-together',
        heading: 'How Both Channels Reinforce One Another',
        paragraphs: [
          'For many growing brands, the strongest architecture pairs both platforms purposefully: Meta campaigns build awareness and Consideration through compelling creative, while Google Ads captures high-intent searches—and structured retargeting guides returning visitors toward inquiry or purchase.',
        ],
      },
    ],
    internalLinks: [
      {
        label: 'Google Ads Management',
        href: '/services/google-ads',
        description: 'High-intent search architecture, keyword strategy and conversion tracking.',
      },
      {
        label: 'Meta Ads Campaigns',
        href: '/services/meta-ads',
        description: 'Creative-led paid social campaigns across Instagram and Facebook.',
      },
    ],
    seoTitle: 'Google Ads vs Meta Ads: Choosing the Right Approach | Brand Yatra',
    seoDescription:
      'Compare Google Ads search intent vs Meta Ads visual discovery to choose the right paid advertising approach for your business.',
  },

  /* =========================================================================
     ARTICLE 08 — Branding
     ========================================================================= */
  {
    slug: 'brand-strategy-vs-visual-identity-whats-the-difference',
    title: "Brand Strategy vs Visual Identity: What's the Difference?",
    category: 'Branding',
    excerpt:
      'Learn how positioning, messaging and visual design work together to create a coherent brand.',
    featuredImage: '/images/insights/brand-strategy-vs-visual-identity.jpg',
    imageAlt:
      'Brand strategy notes paired with typographic specimen sheets and identity swatches on walnut desk',
    status: 'published',
    introduction: [
      'In everyday conversation, “brand strategy” and “visual identity” are often used interchangeably. Yet confusing the two can lead organizations to redesign their look when the real challenge is unclear positioning—or to write a positioning document that never translates into how customers experience the brand.',
      'Understanding how strategy and visual identity complement one another helps leadership teams invest in the right work at the right stage.',
    ],
    sections: [
      {
        id: 'what-brand-strategy-defines',
        heading: 'Brand Strategy: The Thinking Behind the Brand',
        paragraphs: [
          'Brand strategy answers foundational business questions: Who is our ideal customer? What meaningful problem do we solve better or differently than alternatives? What values and personality should guide how we communicate?',
          'It produces practical strategic tools—positioning statements, audience profiles, messaging pillars and tone-of-voice principles—that align leadership, marketing and product teams.',
        ],
      },
      {
        id: 'what-visual-identity-expresses',
        heading: 'Visual Identity: Strategy Made Visible',
        paragraphs: [
          'Visual identity translates that strategic foundation into tangible sensory elements: logomarks, typography pairings, color palettes, grid proportions, photography style and packaging or digital templates.',
          'Without strategy underneath it, visual design becomes subjective guesswork. Grounded in clear strategy, design choices become purposeful and straightforward to evaluate.',
        ],
        keyPoints: [
          'Strategy defines positioning, audience focus, value proposition and verbal voice.',
          'Visual identity expresses that positioning through typography, color, marks and layout systems.',
          'Together, they ensure your brand both says the right thing and looks unmistakably credible.',
        ],
      },
      {
        id: 'bringing-both-together',
        heading: 'Why Coherent Brands Connect Both Disciplines',
        paragraphs: [
          'When positioning, messaging and visual craft are developed in conversation with one another, every touchpoint—from website headlines to pitch decks and campaign creative—reinforces a single, memorable identity.',
        ],
      },
    ],
    internalLinks: [
      {
        label: 'Branding & Identity Services',
        href: '/services/branding',
        description: 'Uniting strategic positioning, verbal messaging and visual identity systems.',
      },
      {
        label: 'Explore Nestora Case Study',
        href: '/work/nestora',
        description: 'See how strategy, typography and packaging came together for Nestora.',
      },
    ],
    seoTitle: "Brand Strategy vs Visual Identity: What's the Difference? | Brand Yatra",
    seoDescription:
      'Understand the difference between brand strategy and visual identity, and how positioning, messaging and design work together.',
  },

  /* =========================================================================
     ARTICLE 09 — SEO
     ========================================================================= */
  {
    slug: 'how-content-and-seo-work-together',
    title: 'How Content and SEO Work Together',
    category: 'SEO',
    excerpt:
      'Explore how relevant, useful content and search optimization support long-term discoverability.',
    featuredImage: '/images/insights/how-content-and-seo-work-together.jpg',
    imageAlt:
      'Printed editorial monographs and clean desk setup representing structured writing and search clarity',
    status: 'published',
    introduction: [
      'Content strategy and search engine optimization are sometimes treated as competing priorities: writers worry that SEO rules will make prose robotic, while technical marketers worry that unguided articles will never be discovered.',
      'In reality, thoughtful editorial content and clean search optimization strengthen each other naturally when both focus on serving real human questions.',
    ],
    sections: [
      {
        id: 'seo-provides-topic-direction',
        heading: 'Search Insights Reveal What Audiences Actually Ask',
        paragraphs: [
          'Search research uncovers the exact questions, comparisons and terminology buyers use while evaluating options. Rather than guessing what to write next, editorial teams can prioritize topics with genuine audience demand.',
          'Structuring articles and service guides around clear search intent ensures your expertise meets readers at the moment they are looking for clarity.',
        ],
      },
      {
        id: 'editorial-quality-earns-engagement',
        heading: 'Editorial Depth Turns Clicks Into Credibility',
        paragraphs: [
          'Technical optimization can help earn an impression and click, but only clear, original writing keeps a visitor reading. Well-organized headings, honest explanations and practical examples demonstrate real subject-matter command.',
        ],
        keyPoints: [
          'Pair search-informed topic selection with clear, jargon-free human writing.',
          'Connect educational articles naturally to relevant service and portfolio pages.',
          'Refresh cornerstone guides periodically so guidance stays accurate and useful.',
        ],
      },
      {
        id: 'internal-linking-and-topic-depth',
        heading: 'Connecting Topics Into a Cohesive Knowledge Hub',
        paragraphs: [
          'When related articles and dedicated capability pages cross-reference one another logically, both readers and search engines gain a clearer understanding of your agency’s core areas of expertise—supporting sustainable, long-term discoverability.',
        ],
      },
    ],
    internalLinks: [
      {
        label: 'Content Strategy & Copywriting',
        href: '/services/content',
        description: 'Purposeful editorial content, website copywriting and brand storytelling.',
      },
      {
        label: 'SEO Services',
        href: '/services/seo',
        description: 'Search architecture, content optimization and organic visibility.',
      },
    ],
    seoTitle: 'How Content and SEO Work Together | Brand Yatra Journal',
    seoDescription:
      'Explore how search-informed planning and clear, original editorial content work together to build long-term organic visibility.',
  },

  /* =========================================================================
     UNPUBLISHED DRAFT ENTRIES (`status: 'draft'`)
     Strictly excluded from public listing, sitemap, related posts & routes
     ========================================================================= */
  {
    slug: 'designing-landing-pages-for-high-intent-campaigns-draft',
    title: 'Designing Landing Pages for High-Intent Campaigns',
    category: 'Web Development',
    excerpt:
      'Editorial draft in progress exploring message match, page hierarchy and inquiry clarity for paid campaigns.',
    featuredImage: '/images/insights/effective-business-website.jpg',
    imageAlt: 'Editorial draft preview',
    status: 'draft',
    introduction: [],
    sections: [],
    seoTitle: 'Draft — Designing Landing Pages for High-Intent Campaigns',
    seoDescription: 'Unpublished editorial draft.',
  },
  {
    slug: 'motion-systems-for-digital-first-identities-draft',
    title: 'Motion Systems for Digital-First Brand Identities',
    category: 'Design & Creative',
    excerpt:
      'Editorial draft in progress examining how kinetic guidelines extend static brand books.',
    featuredImage: '/images/insights/power-of-visual-storytelling.jpg',
    imageAlt: 'Editorial draft preview',
    status: 'draft',
    introduction: [],
    sections: [],
    seoTitle: 'Draft — Motion Systems for Digital-First Brand Identities',
    seoDescription: 'Unpublished editorial draft.',
  },
];

/**
 * Returns strictly published articles (`status === 'published'`) with non-empty body sections.
 */
export function getPublishedArticles(): ArticleData[] {
  return ARTICLES_DATA.filter(
    (article) => article.status === 'published' && article.sections.length > 0
  );
}

/**
 * Resolves a single published article by slug. Returns `undefined` for unknown or draft slugs.
 */
export function getPublishedArticleBySlug(slug: string): ArticleData | undefined {
  return getPublishedArticles().find((article) => article.slug === slug);
}

/**
 * Resolves the primary Editor's Pick featured article from published entries.
 */
export function getFeaturedArticle(): ArticleData {
  const published = getPublishedArticles();
  return published.find((article) => article.featured) || published[0];
}

/**
 * Returns up to `limit` published related articles, prioritizing matching categories.
 */
export function getRelatedArticles(current: ArticleData, limit = 3): ArticleData[] {
  const others = getPublishedArticles().filter((a) => a.slug !== current.slug);
  const sameCategory = others.filter((a) => a.category === current.category);
  const differentCategory = others.filter((a) => a.category !== current.category);
  return [...sameCategory, ...differentCategory].slice(0, limit);
}
