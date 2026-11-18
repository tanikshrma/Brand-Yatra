export interface NavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
}

export interface HeroStat {
  id: string;
  numericValue: number;
  decimals?: number;
  suffix: string;
  label: string;
}

export interface ClientBrand {
  id: string;
  name: string;
  sublabel?: string;
  style: 'serif' | 'tracked' | 'luxury' | 'sans' | 'athletic';
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  serviceTags: string[];
  ctaLabel: string;
  image: string;
  imageAlt: string;
  iconType: 'branding' | 'marketing' | 'web' | 'studio';
}

export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  categories: string;
  description: string;
  image: string;
  imageAlt: string;
  challenge: string;
  solution: string;
  outcomes: string[];
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface WhyBenefit {
  id: string;
  number: string;
  title: string;
  description: string;
}

export interface InsightArticle {
  id: string;
  slug: string;
  number: string;
  category: string;
  readTime: string;
  title: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  paragraphs: string[];
  takeaways: string[];
}

export const SITE_CONFIG = {
  brandName: 'Brand Yatra',
  tagline: 'Think Bold. Create Better. Grow Further.',
  headerCta: "Let's Talk Business",
  footerDescription:
    'Brand Yatra is a creative digital marketing agency specializing in branding, web development, digital marketing and creative communication.',
  // Editable contact details configuration — populate verified phone/location/socials when available
  contact: {
    email: 'hello@brandyatra.com',
    phone: '',
    location: '',
  },
  socials: {
    instagram: '',
    linkedin: '',
    youtube: '',
    behance: '',
  } as Record<string, string>,
  footerQuickLinks: [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Our Work', href: '/work' },
    { label: 'Our Process', href: '/process' },
    { label: 'Insights', href: '/insights' },
    { label: 'Contact Us', href: '/contact' },
  ],
};

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '#services', hasDropdown: true },
  { label: 'Work', href: '/work' },
  { label: 'Process', href: '/process' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact', href: '/contact' },
];

export const HERO_STATS: HeroStat[] = [
  {
    id: 'projects',
    numericValue: 250,
    decimals: 0,
    suffix: '+',
    label: 'Projects Delivered',
  },
  {
    id: 'brands',
    numericValue: 80,
    decimals: 0,
    suffix: '+',
    label: 'Brands Collaborated',
  },
  {
    id: 'experience',
    numericValue: 10,
    decimals: 0,
    suffix: '+',
    label: 'Years of Creative Expertise',
  },
  {
    id: 'satisfaction',
    numericValue: 4.9,
    decimals: 1,
    suffix: '★',
    label: 'Client Satisfaction',
  },
];

export const CLIENT_BRANDS: ClientBrand[] = [
  { id: 'jubilee', name: 'JUBILEE', style: 'serif' },
  { id: 'cresta', name: 'CRESTA', style: 'tracked' },
  { id: 'tvisva', name: 'TVISVA', sublabel: 'JEWELS', style: 'luxury' },
  { id: 'brightlight', name: 'BrightLight', sublabel: 'IMMIGRATION', style: 'sans' },
  { id: 'asian-legends', name: 'Asian Legends', sublabel: 'LEAGUE', style: 'athletic' },
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'branding-identity',
    number: '01',
    title: 'Branding & Identity',
    tagline: 'Build a brand that people remember.',
    description:
      'We create distinctive brand identities that communicate your vision, connect with your audience and leave a lasting impression.',
    serviceTags: [
      'Brand Strategy',
      'Logo Design',
      'Visual Identity',
      'Brand Guidelines',
      'Packaging Design',
    ],
    ctaLabel: 'Explore Branding',
    image: '/images/home/what-we-do-branding.jpg',
    imageAlt: 'Blind-debossed luxury stationery, minimalist packaging box and brand color swatches on travertine stone',
    iconType: 'branding',
  },
  {
    id: 'digital-marketing',
    number: '02',
    title: 'Digital Marketing',
    tagline: 'Turn visibility into measurable growth.',
    description:
      'We combine data-driven strategies with compelling creativity to attract the right audience, increase engagement and generate meaningful business opportunities.',
    serviceTags: [
      'Social Media Marketing',
      'SEO',
      'Google Ads',
      'Meta Ads',
      'Performance Marketing',
    ],
    ctaLabel: 'Explore Marketing',
    image: '/images/home/what-we-do-marketing.jpg',
    imageAlt: 'Modern creative agency campaign strategy table and funnel planning workspace',
    iconType: 'marketing',
  },
  {
    id: 'website-development',
    number: '03',
    title: 'Website Development',
    tagline: 'Digital experiences designed to perform.',
    description:
      'We design and develop modern, responsive and high-performing websites that reflect your brand, engage visitors and turn attention into action.',
    serviceTags: [
      'UI/UX Design',
      'Business Websites',
      'E-commerce Development',
      'WordPress',
      'Custom Web Development',
    ],
    ctaLabel: 'Explore Websites',
    image: '/images/home/what-we-do-web.jpg',
    imageAlt: 'Responsive dark-and-ivory editorial website displayed on a calibrated studio workstation',
    iconType: 'web',
  },
  {
    id: 'creative-studio',
    number: '04',
    title: 'Creative Studio',
    tagline: 'Creative ideas. Powerful storytelling.',
    description:
      'From scroll-stopping social media creatives to engaging brand films, we produce visual experiences that make your brand impossible to overlook.',
    serviceTags: [
      'Graphic Design',
      'Social Media Creatives',
      'Video Production',
      'Motion Graphics',
      'Campaign Creatives',
    ],
    ctaLabel: 'Explore Creative Studio',
    image: '/images/home/what-we-do-studio.jpg',
    imageAlt: 'Professional cinema camera rig and diffused key lighting on a dark agency production set',
    iconType: 'studio',
  },
];

export const FEATURED_WORK: ProjectItem[] = [
  {
    id: 'nestora',
    number: '01',
    title: 'Nestora',
    categories: 'Brand Identity, Packaging & Digital',
    description:
      'A tactile brand identity, packaging architecture, and digital launch crafted to establish unmistakable category presence.',
    image: '/images/work/nestora-packaging-identity.jpg',
    imageAlt: 'Nestora luxury matte charcoal and ivory packaging presentation on travertine stone',
    challenge:
      'Establishing unmistakable brand recognition and cohesive visual standards across physical packaging and digital touchpoints.',
    solution:
      'Strategic brand positioning paired with custom wordmark geometry, tactile packaging structures, and comprehensive brand guidelines.',
    outcomes: [
      'Distinctive brand positioning and visual architecture',
      'Scalable identity system across print, packaging, and web',
      'Comprehensive brand guidelines for consistent rollout',
    ],
  },
  {
    id: 'veyra',
    number: '02',
    title: 'Veyra',
    categories: 'Website, UI/UX & Product Design',
    description:
      'An editorial digital platform engineered for intuitive navigation, product clarity, and measurable conversion.',
    image: '/images/work/veyra-digital-platform.jpg',
    imageAlt: 'Veyra dark editorial web interface displayed on a matte black laptop on sculpted basalt stone',
    challenge:
      'Translating complex product capabilities into an intuitive, fast-loading digital experience that converts visitors into inquiries.',
    solution:
      'User-first information architecture, editorial interface design, responsive frontend engineering, and streamlined inquiry flows.',
    outcomes: [
      'Modern responsive UI/UX tailored to buyer journeys',
      'Fast, accessible frontend architecture built for growth',
      'Clear conversion pathways and inquiry workflows',
    ],
  },
  {
    id: 'kairo',
    number: '03',
    title: 'Kairo',
    categories: 'Branding, Website & Campaign',
    description:
      'An integrated rebrand, digital presence, and multi-channel launch campaign built for ambitious market expansion.',
    image: '/images/work/kairo-architectural-campaign.jpg',
    imageAlt: 'Kairo matte black blade signage and backlit campaign poster on travertine facade at dusk',
    challenge:
      'Cutting through crowded digital channels to capture qualified audience attention and sustain measurable business momentum.',
    solution:
      'Unified brand identity paired with architectural signage, targeted digital campaigns, and ongoing performance optimization.',
    outcomes: [
      'Cross-channel campaign creative and brand storytelling',
      'Data-guided audience targeting across search and social',
      'Continuous performance tracking and conversion refinement',
    ],
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Discover',
    description:
      'We understand your brand, business objectives, target audience and market opportunities.',
  },
  {
    number: '02',
    title: 'Strategize',
    description:
      'We transform insights into a focused roadmap that connects creativity with measurable goals.',
  },
  {
    number: '03',
    title: 'Create',
    description:
      'Our team brings ideas to life through compelling design, smart technology and engaging content.',
  },
  {
    number: '04',
    title: 'Grow',
    description:
      'We launch, measure, optimize and continuously improve to support long-term business growth.',
  },
];

export const WHY_BENEFITS: WhyBenefit[] = [
  {
    id: 'strategy',
    number: '01',
    title: 'Strategy-led creativity',
    description:
      'Every creative decision begins with clear positioning and audience insight.',
  },
  {
    id: 'execution',
    number: '02',
    title: 'End-to-end execution',
    description:
      'Branding, websites, content and performance working together under one roof.',
  },
  {
    id: 'collaborative',
    number: '03',
    title: 'Collaborative & transparent',
    description:
      'Direct partnership with your team, clear milestones and open communication.',
  },
  {
    id: 'growth',
    number: '04',
    title: 'Built for long-term growth',
    description:
      'Durable brand systems and digital platforms engineered for lasting impact.',
  },
];

export const INSIGHTS_ARTICLES: InsightArticle[] = [
  {
    id: 'strong-brand-identity-essential',
    slug: 'why-a-strong-brand-identity-matters-more-than-ever',
    number: '01',
    category: 'BRANDING',
    readTime: '5 MIN READ',
    title: 'Why a Strong Brand Identity Matters More Than Ever',
    excerpt:
      'Discover how thoughtful branding builds recognition, trust and long-term customer relationships.',
    image: '/images/insights/why-brand-identity-matters.jpg',
    imageAlt: 'Creative director sketchbook, architectural scale ruler and tactile brand color swatches on travertine',
    paragraphs: [
      'Discover how thoughtful branding builds recognition, trust and long-term customer relationships across every touchpoint where buyers encounter your business.',
    ],
    takeaways: [
      'Anchor visual design decisions in clear business positioning and audience insight.',
    ],
  },
  {
    id: 'performance-marketing-grow-smarter',
    slug: 'building-a-digital-marketing-strategy-that-actually-makes-sense',
    number: '02',
    category: 'DIGITAL MARKETING',
    readTime: '6 MIN READ',
    title: 'Building a Digital Marketing Strategy That Actually Makes Sense',
    excerpt:
      'A practical framework for aligning business goals, audience intent and channel selection before spending on campaigns.',
    image: '/images/insights/digital-marketing-strategy.jpg',
    imageAlt: 'Creative strategists and designers collaborating over campaign layouts at a sunlit oak studio table',
    paragraphs: [
      'Explore how strategic advertising, audience insights and campaign optimization can improve marketing outcomes while keeping budgets focused on measurable return.',
    ],
    takeaways: [
      'Pair data-driven targeting on Google and Meta with compelling creative assets.',
    ],
  },
  {
    id: 'high-converting-business-website',
    slug: 'seo-fundamentals-every-growing-business-should-understand',
    number: '03',
    category: 'SEO',
    readTime: '6 MIN READ',
    title: 'SEO Fundamentals Every Growing Business Should Understand',
    excerpt:
      'Understand how technical site structure, search intent and helpful content compound into sustainable organic visibility.',
    image: '/images/insights/seo-fundamentals-guide.jpg',
    imageAlt: 'Studio laptop on travertine desk displaying site architecture tree and organic visibility curve',
    paragraphs: [
      'Understand the technical architecture and content structure principles that help qualified buyers discover your business organically.',
    ],
    takeaways: [
      'Align technical site structure with real buyer search intent.',
    ],
  },
];
