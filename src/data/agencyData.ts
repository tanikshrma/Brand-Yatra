export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  shortDesc: string;
  fullDesc: string;
  deliverables: string[];
  icon: string;
}

export interface PortfolioItem {
  id: string;
  client: string;
  service: string;
  headline: string;
  description: string;
  tags: string[];
  metrics: { label: string; value: string }[];
  visualType: 'banking' | 'tech' | 'luxury' | 'webflow' | 'growth' | 'education';
  accentColor: string;
}

export interface ArticleItem {
  id: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  summary: string;
  content: string[];
  keyTakeaway: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  clientName: string;
  role: string;
  company: string;
  verified: boolean;
  rating: number;
}

export const AGENCY_INFO = {
  name: 'Brand Yatra',
  tagline: 'Creative Branding & Digital Marketing Agency',
  subheading: 'We engineer unfair advantages for forward-thinking brands across Google Search, Paid Media, Brand Identity, and Digital Experiences.',
  phone: '+91 98765 43210',
  email: 'hello@brandyatra.com',
  careersEmail: 'careers@brandyatra.com',
  address: {
    line1: 'Chandigarh, India',
    line2: 'Tricity Creative Hub',
    city: 'Chandigarh, India',
    country: 'India'
  },
  socials: [
    { name: 'Instagram', url: 'https://instagram.com' },
    { name: 'Behance', url: 'https://behance.net' },
    { name: 'LinkedIn', url: 'https://linkedin.com' },
    { name: 'X / Twitter', url: 'https://twitter.com' },
    { name: 'YouTube', url: 'https://youtube.com' }
  ]
};

export const HERO_STATS = [
  { value: '500+', label: 'Happy Clients', icon: 'users' },
  { value: '450+', label: 'Projects Completed', icon: 'briefcase' },
  { value: '12+', label: 'Years of Experience', icon: 'calendar' }
];

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'brand-strategy',
    title: 'Brand Strategy',
    category: 'Foundations',
    shortDesc: 'Positioning, narrative architecture, and market differentiation to give your brand enduring competitive advantage.',
    fullDesc: 'We dissect your market ecosystem, customer psychology, and competitive white spaces to sculpt a high-conviction brand proposition that commands premium market value.',
    deliverables: ['Market Positioning & White Space Mapping', 'Core Brand Narrative & Voice Matrix', 'Customer Persona & Journey Mapping', 'Category Creation Architecture'],
    icon: 'compass'
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    category: 'Omnichannel',
    shortDesc: 'Integrated cross-channel customer acquisition funnels built for sustainable pipeline growth and customer lifetime value.',
    fullDesc: 'From high-intent capture to retargeting and lifecycle nurture, we integrate modern omnichannel digital marketing engines aligned strictly to revenue outcomes.',
    deliverables: ['Omnichannel Growth Blueprints', 'Multi-Touch Attribution Modeling', 'Full-Funnel Lifecycle Marketing', 'Conversion Rate Optimization (CRO)'],
    icon: 'trending-up'
  },
  {
    id: 'seo',
    title: 'Search Engine Optimization',
    category: 'Organic Growth',
    shortDesc: 'Build sustainable organic search visibility with technical SEO, content velocity, and local/global authority.',
    fullDesc: 'Modern SEO goes far beyond keywords. We architect crawl-efficient technical foundations, programmatic topic clusters, and digital PR outreach to dominate SERPs.',
    deliverables: ['Technical SEO Audits & Core Web Vitals', 'High-Intent Semantic Topic Clusters', 'Authority Building & High-Tier Digital PR', 'Enterprise Programmatic SEO'],
    icon: 'search'
  },
  {
    id: 'google-ads-ppc',
    title: 'Google Ads & PPC',
    category: 'Performance',
    shortDesc: 'High-intent Google Ads campaigns focused on qualified inquiries, conversions, lower CPL, and scalable ROAS.',
    fullDesc: 'Data-driven paid media execution across Google Search, Performance Max, YouTube, and Display with granular bid management and ruthless budget efficiency.',
    deliverables: ['Search & Performance Max Campaigns', 'Negative Keyword Sculpting & Quality Score Boosts', 'Dynamic Retargeting Architecture', 'Automated Smart-Bidding Optimization'],
    icon: 'target'
  },
  {
    id: 'social-media-marketing',
    title: 'Social Media Marketing',
    category: 'Brand & Community',
    shortDesc: 'Build brand visibility, engagement, and demand with strategic social media content, campaigns, and paid social.',
    fullDesc: 'We turn passive social feeds into thriving brand communities and conversion engines through cultural relevance, bespoke creative assets, and micro-influencer leverage.',
    deliverables: ['Editorial Content Calendars & Production', 'Meta (Instagram & Facebook) Ads & Funnels', 'LinkedIn B2B Thought Leadership Campaigns', 'Social Community Management & Growth'],
    icon: 'share-2'
  },
  {
    id: 'branding-identity',
    title: 'Branding & Identity',
    category: 'Visual Design',
    shortDesc: 'Complete visual identity systems, logos, typography, color palettes, and comprehensive brand guideline manuals.',
    fullDesc: 'We craft timeless, memorable visual identities that stand out effortlessly in crowded markets, from bespoke wordmarks to digital-first design systems.',
    deliverables: ['Logo & Wordmark Systems', 'Typography & Bespoke Color Schemes', 'Comprehensive Brand Guidelines & Tokens', 'Collateral, Packaging & Presentation Decks'],
    icon: 'layers'
  },
  {
    id: 'website-design',
    title: 'Website Design & Dev',
    category: 'Digital Product',
    shortDesc: 'High-converting, responsive websites and web applications with flawless aesthetics and lightning-fast performance.',
    fullDesc: 'Modern web experiences crafted with editorial precision, bespoke micro-interactions, responsive mobile fluidity, and laser-targeted conversion hierarchy.',
    deliverables: ['UX Research & Wireframing', 'High-Fidelity Editorial UI Systems', 'Responsive React / Next.js Development', 'Speed Optimization & Accessibility Standards'],
    icon: 'monitor'
  },
  {
    id: 'creative-content',
    title: 'Creative Content Production',
    category: 'Storytelling',
    shortDesc: 'High-impact copy, video production, graphic design, and commercial storytelling that captivates and converts.',
    fullDesc: 'Every piece of content must earn its keep. We script, design, produce, and edit thumb-stopping commercial media that drives action.',
    deliverables: ['Video & Motion Graphics Production', 'Commercial Copywriting & Pitch Decks', 'Interactive Infographics & Visual Data', 'Campaign Key Visuals & Photoshoots'],
    icon: 'pen-tool'
  }
];

export const STRATEGY_CARDS = [
  {
    id: 'search-mktg',
    label: 'Search Marketing',
    headline: 'No Fixed Packages:',
    body: 'Strategies built around your market, search intent, real conversion goals, budget, and customer journey.',
    points: ['High-Intent Search Capture', 'Technical Core Optimization', 'Semantic Topic Domination'],
    isDark: false
  },
  {
    id: 'paid-ads',
    label: 'Paid Advertising',
    headline: 'Performance First:',
    body: 'Campaigns engineered for qualified leads, minimum CAC, maximum ROAS, and zero wasted ad spend.',
    points: ['Google Search & PMax', 'Meta & LinkedIn Performance', 'Dynamic Creative Optimization'],
    isDark: false
  },
  {
    id: 'social-creative',
    label: 'Social & Creative',
    headline: 'Unified Brand Growth:',
    body: 'Creative strategy, high-touch video, and social amplification working together to turn viewers into buyers.',
    points: ['Editorial Storytelling', 'Brand Affinity & Retention', 'Omnichannel Retargeting'],
    isDark: false
  },
  {
    id: 'start-now',
    label: 'Ready to Accelerate?',
    headline: 'START NOW!',
    body: 'Book your comprehensive 1-on-1 brand growth audit with our senior creative and performance directors.',
    points: ['Full Competitor Gap Review', 'Custom Channel Mix Roadmap', 'Direct Strategy Recommendations'],
    isDark: true
  }
];

export const PORTFOLIO_SHOWCASE: PortfolioItem[] = [
  {
    id: 'case-hsbc',
    client: 'HSBC GLOBAL ASSET',
    service: 'Paid Per Click & Enterprise Lead Generation',
    headline: 'Acquisition Architecture for High-Value Wealth Portfolios',
    description: 'We collaborated with HSBC Asset Management teams to execute hyper-targeted search and display campaigns, resulting in the compliant acquisition of high-net-worth accounts across international metros.',
    tags: ['Google Search Ads', 'Performance Max', 'Financial Compliance', 'Lead Qualification'],
    metrics: [
      { label: 'Qualified Inquiries', value: '+340%' },
      { label: 'Cost Per Acquisition', value: '-42%' },
      { label: 'Audited ROAS', value: '7.8x' }
    ],
    visualType: 'banking',
    accentColor: '#F8C311'
  },
  {
    id: 'case-oneplus',
    client: 'ONEPLUS TECH',
    service: 'Branding & Digital Product Launch',
    headline: 'Digital Flagship Experience & Community Hype Engine',
    description: 'Years of expertise in high-impact digital experiences allowed us to design viral interactive product landing hubs and cross-channel digital marketing campaigns that shattered pre-order targets.',
    tags: ['Interactive Webflow', 'Motion Graphics', 'Community Engagement', 'Launch Strategy'],
    metrics: [
      { label: 'First-Day Pre-orders', value: '120K+' },
      { label: 'Organic Social Impressions', value: '18.4M' },
      { label: 'Average Session Time', value: '4m 12s' }
    ],
    visualType: 'tech',
    accentColor: '#F8C311'
  },
  {
    id: 'case-sobha',
    client: 'SOBHA LIMITED',
    service: 'PPC Campaigns & Real Estate Growth',
    headline: 'Ultra-Luxury Real Estate Demand Engine in Key Metros',
    description: 'Collaborating with Sobha Limited to launch bespoke luxury villa and penthouse developments, generating qualified buyers and private viewings through geo-fenced high-intent PPC campaigns.',
    tags: ['High-Intent Search PPC', 'Geo-Targeted Media', 'Luxury Branding', 'VIP Inquiry Desk'],
    metrics: [
      { label: 'High-Ticket Inquiries', value: '2,100+' },
      { label: 'Lead-to-Tour Ratio', value: '31%' },
      { label: 'Inventory Cleared', value: '94%' }
    ],
    visualType: 'luxury',
    accentColor: '#F8C311'
  }
];

export const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Discovery & Research',
    subtitle: 'Market Audit & Audience Profiling',
    description: 'We audit your current brand footprint, analyze competitors, uncover untapped search and audience opportunities, and set exact quantitative growth benchmarks.',
    keyDeliverables: 'Audience Persona Matrix, Competitive Gap Analysis, Baseline Analytics Audit'
  },
  {
    step: '02',
    title: 'Strategy & Planning',
    subtitle: 'Channel Mix & Value Proposition',
    description: 'We construct a unified growth roadmap specifying exact channel priorities, messaging hooks, funnel stages, and budget allocations for predictable scale.',
    keyDeliverables: 'Media Spend Architecture, Value Proposition Canvas, Channel Priority Plan'
  },
  {
    step: '03',
    title: 'Creative Execution',
    subtitle: 'Production & Campaign Deployment',
    description: 'Our design and copy squads produce world-class creative assets, launch optimized landing experiences, and build out high-intent search and paid media setups.',
    keyDeliverables: 'High-Converting Ad Creatives, Conversion Landing Pages, Campaign Tracking Infrastructure'
  },
  {
    step: '04',
    title: 'Measurement & Optimization',
    subtitle: 'Iterative Scaling & Revenue Expansion',
    description: 'Continuous multivariate testing, bid adjustments, creative refreshes, and CRO audits ensure your customer acquisition cost drops while revenue multiplies.',
    keyDeliverables: 'Weekly ROAS & CPA Dashboards, A/B Testing Logs, Scale Recommendations'
  }
];

export const CAPABILITY_TAGS = [
  { id: 'dm', name: 'Digital Marketing', desc: 'Holistic growth frameworks connecting paid, organic, and email channels.' },
  { id: 'ppc', name: 'Google Ads / PPC', desc: 'Precision intent targeting across Search, PMax, Shopping, and YouTube.' },
  { id: 'seo', name: 'Search Engine Optimization', desc: 'Organic authority, technical crawl health, and keyword dominance.' },
  { id: 'aso', name: 'AI Search Optimization', desc: 'Optimizing brand visibility for ChatGPT, Perplexity, and AI search engines.' },
  { id: 'aeo', name: 'AEO – Answer Engine Optimization', desc: 'Winning direct answer boxes, featured snippets, and voice queries.' },
  { id: 'geo', name: 'GEO – Generative Engine Optimization', desc: 'Positioning your brand inside generative citations and AI summary cards.' },
  { id: 'perf', name: 'Performance Marketing', desc: 'Ruthless focus on customer acquisition cost, conversion rate, and ROAS.' },
  { id: 'smm', name: 'Social Media Marketing', desc: 'Culturally attuned creative content and paid social that sparks viral action.' },
  { id: 'ecom', name: 'Ecommerce Marketing', desc: 'Shopify, Amazon, and DTC store scaling through optimized ad funnels.' },
  { id: 'cro', name: 'Landing Page & CRO', desc: 'Editorial landing pages engineered to convert cold visitors into buyers.' },
  { id: 'brand', name: 'Branding & Identity', desc: 'Visual identity systems, typography, logos, and distinct brand tone.' },
  { id: 'web', name: 'Web Design & Dev', desc: 'Ultra-fast, responsive web experiences with refined creative interactions.' },
  { id: 'graphic', name: 'Graphic Design', desc: 'Editorial collateral, packaging, pitch decks, and commercial illustrations.' }
];

export const SELECTED_PROJECTS = [
  {
    id: 'proj-concept',
    tag: 'BRAND & WEB',
    client: 'CONCEPT CITY',
    title: 'Modern Architecture & Web Presence',
    description: 'Designed a comprehensive webflow experience aligned with architectural brand guidelines to deliver an outstanding modern website.',
    stat: '3.4x Inquiries',
    accent: '#F8C311'
  },
  {
    id: 'proj-deforet',
    tag: 'ORGANIC & PAID',
    client: 'DEFORET BOTANICALS',
    title: 'DTC E-Commerce Growth Sprint',
    description: 'Delivered 200% organic search traffic growth and an audited 8.5x ROAS in PPC alongside versatile community social media expansion.',
    stat: '200% Organic Growth',
    accent: '#F8C311'
  },
  {
    id: 'proj-srm',
    tag: 'PERFORMANCE PPC',
    client: 'SRM UNIVERSITY',
    title: 'Global Student Admission Campaign',
    description: '340+ international postgraduate admissions and 68% organic visibility expansion through integrated SEO, SMM, and PPC campaigns.',
    stat: '340+ Admissions',
    accent: '#F8C311'
  }
];

export const ARTICLES_LIST: ArticleItem[] = [
  {
    id: 'art-1',
    title: 'Building a Recognizable Brand in an AI-Cluttered World',
    category: 'Brand Strategy',
    readTime: '5 min read',
    date: 'OCT 2026',
    summary: 'When AI can generate infinite synthetic content, distinctive taste, human conviction, and bold editorial points of view become the ultimate competitive moat.',
    content: [
      'The barrier to generating words, images, and video has collapsed to zero. As a result, digital feeds are flooded with generic, derivative corporate fluff that consumers instinctively tune out.',
      'To build a recognizable brand today, companies must double down on idiosyncrasy: distinct visual language, unyielding brand beliefs, and clear aesthetic signatures that cannot be hallucinated by a prompt.',
      'Brands that win in 2026 and beyond treat their identity not as a static styleguide, but as a living cultural artifact that sparks curiosity and demands attention.'
    ],
    keyTakeaway: 'Differentiate through aesthetic bravery and authentic point-of-view, not volume.'
  },
  {
    id: 'art-2',
    title: 'Paid Advertising That Actually Converts: Beyond Default Bidding',
    category: 'Performance Media',
    readTime: '6 min read',
    date: 'OCT 2026',
    summary: 'How relying solely on algorithmic broad-match leads to wasted spend, and how custom data signals and creative velocity reclaim control.',
    content: [
      'Google and Meta algorithms are phenomenal at finding efficiency for their own ad revenue, but without strict custom conversion signals, they will optimize for low-quality clicks that never become paying customers.',
      'We outline how our team feeds verified CRM offline conversion events back into the ad algorithms, ensuring bid adjustments prioritize high-LTV customers instead of empty lead forms.',
      'Combined with a high-velocity creative testing cadence where new hooks and visuals are introduced weekly, client ROAS consistently beats industry medians.'
    ],
    keyTakeaway: 'Feed first-party customer value data directly into bidding algorithms.'
  },
  {
    id: 'art-3',
    title: 'From SEO to GEO: Winning in Generative & Answer Engines',
    category: 'Search & AI',
    readTime: '7 min read',
    date: 'OCT 2026',
    summary: 'Search is no longer just ten blue links. Learn how to structure content so Perplexity, ChatGPT, and Google Gemini cite your brand as the definitive authority.',
    content: [
      'Over 40% of queries that previously clicked through to websites are now resolved directly within AI-generated summaries and conversational answer engines.',
      'Generative Engine Optimization (GEO) requires proprietary data, original research citations, structured semantic schemas, and clear quotable soundbites that LLMs index and summarize with high confidence.',
      'Brand Yatra helps brands conduct original benchmark studies that guarantee your company becomes the canonical cited source when buyers ask AI for recommendations.'
    ],
    keyTakeaway: 'Publish primary research and structured data to become the authoritative LLM source.'
  },
  {
    id: 'art-4',
    title: 'Creating High-Converting Landing Pages: Anatomy of 20%+ Conversion',
    category: 'CRO & Design',
    readTime: '4 min read',
    date: 'OCT 2026',
    summary: 'The precise structural hierarchy, friction-elimination principles, and micro-copy secrets behind top-tier B2B and consumer landing pages.',
    content: [
      'Most landing pages fail because they try to explain everything all at once. High-converting landing pages focus on one primary emotional trigger and clear next step.',
      'By placing a streamlined qualifying enquiry card in the viewport, reinforcing with verified third-party proofs, and cutting cognitive load to the bone, conversion rates leap dramatically.',
      'Every input field removed from your initial contact form can boost submission rates by up to 14%.'
    ],
    keyTakeaway: 'Clarity over cleverness: singular message, visible value, zero friction.'
  }
];

export const TESTIMONIALS_LIST: TestimonialItem[] = [
  {
    id: 'test-1',
    quote: 'Brand Yatra has been great in helping our company from the scratch. They understood our requirements quite well. The team is quite impressive which is what a creative social media & performance agency should be like. I am really thankful to Brand Yatra for being our digital partner.',
    clientName: 'Phanindra Varma',
    role: 'Managing Director & CMO',
    company: 'Apex Horizon Ventures',
    verified: true,
    rating: 5
  },
  {
    id: 'test-2',
    quote: 'Our transition to Brand Yatra resulted in a 340% increase in qualified pipeline within our first 90 days. Their ability to fuse high-fashion branding aesthetics with ruthless PPC conversion tracking is unmatched in the industry.',
    clientName: 'Ananya Deshmukh',
    role: 'VP of Growth & Brand',
    company: 'UrbanCraft Living',
    verified: true,
    rating: 5
  },
  {
    id: 'test-3',
    quote: 'We were skeptical about digital agencies after burning through two large firms. Brand Yatra took complete ownership of our Google Ads, SEO, and landing page UX. Our ROAS climbed from 2.1x to 7.8x in under 6 months.',
    clientName: 'Vikramaditya Rao',
    role: 'Chief Executive Officer',
    company: 'FinTech Magna',
    verified: true,
    rating: 5
  }
];

export const CLIENT_LOGOS = [
  { name: 'CESCE', tag: 'FINANCIAL SERVICES' },
  { name: 'BE PRACTICAL', tag: 'TECH SOLUTIONS' },
  { name: 'FIPOLA', tag: 'DTC RETAIL' },
  { name: 'TECHNOVA', tag: 'ENTERPRISE AI' },
  { name: 'SOBHA', tag: 'LUXURY REAL ESTATE' },
  { name: 'APEX', tag: 'GLOBAL VENTURES' }
];
