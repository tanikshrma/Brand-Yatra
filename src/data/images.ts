/**
 * Centralized Brand Yatra Image Asset Inventory
 * Organized under /public/images/{home,about,services,work,insights,contact}/
 */

export const BRAND_IMAGES = {
  logo: {
    markWhite: '/assets/brandyatra/Logo%20Mark%20white.png',
    wordmarkWhite: '/assets/brandyatra/Logo%20White%2001.png',
    wordmarkBlack: '/assets/brandyatra/Logo%20Black%2001.png',
  },

  home: {
    heroWide: '/images/home/hero-creative-studio-wide.jpg',
    heroMobile: '/images/home/hero-creative-director-mobile.jpg',
    aboutStudio: '/images/home/about-glass-studio.jpg',
    whatWeDoBranding: '/images/home/what-we-do-branding.jpg',
    whatWeDoMarketing: '/images/home/what-we-do-marketing.jpg',
    whatWeDoWeb: '/images/home/what-we-do-web.jpg',
    whatWeDoStudio: '/images/home/what-we-do-studio.jpg',
    advantageStudioChair: '/images/home/advantage-yellow-chair-studio.jpg',
  },

  about: {
    studioInterior: '/images/about/studio-glass-interior.jpg',
    teamCollaboration: '/images/about/team-creative-collaboration.jpg',
    designProcessFlatlay: '/images/about/design-process-flatlay.jpg',
  },

  contact: {
    heroWide: '/images/contact/studio-architectural-wide.jpg',
    heroMobile: '/images/contact/studio-architectural-mobile.jpg',
  },

  work: {
    nestora: '/images/work/nestora-packaging-identity.jpg',
    veyra: '/images/work/veyra-digital-platform.jpg',
    brightlight: '/images/work/brightlight-consultation-web.jpg',
    tvisva: '/images/work/tvisva-fine-jewels.jpg',
    kairo: '/images/work/kairo-architectural-campaign.jpg',
    jubileeImperia: '/images/work/jubilee-imperia-architecture.jpg',
    cresta: '/images/work/cresta-social-art-direction.jpg',
    asianLegends: '/images/work/asian-legends-broadcast-production.jpg',
  },

  services: {
    branding: '/images/services/branding-identity-craft.jpg',
    webDevelopment: '/images/services/web-development-workstation.jpg',
    graphicDesign: '/images/services/graphic-design-editorial.jpg',
    leadGeneration: '/images/services/lead-generation-funnel.jpg',
    socialMedia: '/images/services/social-media-production.jpg',
    googleAds: '/images/services/google-ads-campaigns.jpg',
    seo: '/images/services/seo-search-architecture.jpg',
    metaAds: '/images/services/meta-ads-creative.jpg',
    content: '/images/services/content-editorial-monograph.jpg',
    videoMotion: '/images/services/video-motion-studio.jpg',
    uiUx: '/images/services/ui-ux-interface-system.jpg',
    analyticsCro: '/images/services/analytics-cro-workspace.jpg',
  },

  insights: {
    whyBrandIdentityMatters: '/images/insights/why-brand-identity-matters.jpg',
    digitalMarketingStrategy: '/images/insights/digital-marketing-strategy.jpg',
    seoFundamentals: '/images/insights/seo-fundamentals-guide.jpg',
    effectiveBusinessWebsite: '/images/insights/effective-business-website.jpg',
    socialMediaWithPurpose: '/images/insights/social-media-with-purpose.jpg',
    powerOfVisualStorytelling: '/images/insights/power-of-visual-storytelling.jpg',
    googleAdsVsMetaAds: '/images/insights/google-ads-vs-meta-ads.jpg',
    brandStrategyVsVisualIdentity: '/images/insights/brand-strategy-vs-visual-identity.jpg',
    howContentAndSeoWorkTogether: '/images/insights/how-content-and-seo-work-together.jpg',
  },
} as const;
