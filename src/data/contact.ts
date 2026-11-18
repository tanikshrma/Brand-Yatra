export const CONTACT_SERVICE_OPTIONS = [
  'Branding',
  'Web Development',
  'Graphic Design',
  'Lead Generation',
  'Social Media',
  'Google Ads',
  'SEO',
  'Meta Ads',
  'Content',
  'Video & Motion',
  'UI / UX',
  'Analytics & CRO',
] as const;

export type ContactServiceOption = (typeof CONTACT_SERVICE_OPTIONS)[number];

export const CONTACT_BUDGET_OPTIONS = [
  'Not Sure Yet',
  'Under ₹25,000',
  '₹25,000–₹50,000',
  '₹50,000–₹1,00,000',
  '₹1,00,000–₹3,00,000',
  '₹3,00,000+',
] as const;

export type ContactBudgetOption = (typeof CONTACT_BUDGET_OPTIONS)[number];

export interface ContactFormPayload {
  fullName: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  budget?: string;
  projectDetails: string;
  privacyConsent: boolean;
  /** Hidden anti-spam honeypot field — must remain empty for human submissions */
  website?: string;
}

export type ContactFieldKey =
  | 'fullName'
  | 'email'
  | 'phone'
  | 'company'
  | 'service'
  | 'budget'
  | 'projectDetails'
  | 'privacyConsent';

export type ContactFieldErrors = Partial<Record<ContactFieldKey, string>>;

export interface ValidatedContactInquiry {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  service: ContactServiceOption;
  budget: ContactBudgetOption | '';
  projectDetails: string;
  privacyConsent: true;
}

export interface ContactFAQItem {
  number: string;
  question: string;
  answer: string;
}

export const CONTACT_FAQS: ContactFAQItem[] = [
  {
    number: '01',
    question: 'How do I start a project with Brand Yatra?',
    answer:
      'Complete the inquiry form with your project details. Our team can then review your requirements and discuss the next steps.',
  },
  {
    number: '02',
    question: 'Can I inquire about multiple services?',
    answer:
      'Yes. Select the most relevant service and mention any additional requirements in the project description.',
  },
  {
    number: '03',
    question: 'Do you work with startups and established businesses?',
    answer:
      "Brand Yatra's services can support businesses at different stages, from new brand launches to established digital operations.",
  },
  {
    number: '04',
    question: 'How is project pricing determined?',
    answer:
      'Pricing depends on the scope, complexity, deliverables and timeline. We discuss requirements before preparing a proposal.',
  },
];

function sanitizeSingleLine(value: unknown, maxLength: number): string {
  if (typeof value !== 'string') return '';
  return value
    .replace(/[\u0000-\u001F\u007F]/g, ' ')
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);
}

function sanitizeMultiline(value: unknown, maxLength: number): string {
  if (typeof value !== 'string') return '';
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .replace(/<[^>]*>/g, '')
    .trim()
    .slice(0, maxLength);
}

/**
 * Shared client & server validation and sanitization for Brand Yatra project inquiries.
 */
export function validateContactPayload(raw: Partial<ContactFormPayload>): {
  valid: boolean;
  errors: ContactFieldErrors;
  sanitized?: ValidatedContactInquiry;
  isSpamHoneypot?: boolean;
} {
  if (typeof raw.website === 'string' && raw.website.trim().length > 0) {
    return {
      valid: false,
      errors: {},
      isSpamHoneypot: true,
    };
  }

  const fullName = sanitizeSingleLine(raw.fullName, 120);
  const email = sanitizeSingleLine(raw.email, 160).toLowerCase();
  const phone = sanitizeSingleLine(raw.phone, 28);
  const company = sanitizeSingleLine(raw.company, 140);
  const service = sanitizeSingleLine(raw.service, 80);
  const budget = sanitizeSingleLine(raw.budget, 80);
  const projectDetails = sanitizeMultiline(raw.projectDetails, 4000);
  const privacyConsent = raw.privacyConsent === true;

  const errors: ContactFieldErrors = {};

  if (!fullName || fullName.length < 2) {
    errors.fullName = 'Please enter your full name (at least 2 characters).';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!email) {
    errors.email = 'Please enter your email address.';
  } else if (!emailRegex.test(email)) {
    errors.email = 'Please enter a valid email address (for example, you@company.com).';
  }

  if (phone) {
    const digitsOnly = phone.replace(/\D/g, '');
    const phonePattern = /^[+\d\s().-]{7,25}$/;
    if (!phonePattern.test(phone) || digitsOnly.length < 7 || digitsOnly.length > 16) {
      errors.phone = 'Please enter a valid international or local phone number.';
    }
  }

  const isAllowedService = (CONTACT_SERVICE_OPTIONS as readonly string[]).includes(service);
  if (!service || !isAllowedService) {
    errors.service = 'Please select the primary service you are inquiring about.';
  }

  const isAllowedBudget =
    budget === '' || (CONTACT_BUDGET_OPTIONS as readonly string[]).includes(budget);
  if (!isAllowedBudget) {
    errors.budget = 'Please choose one of the listed budget inquiry ranges.';
  }

  if (!projectDetails || projectDetails.length < 15) {
    errors.projectDetails =
      'Please share at least 15 characters describing your project goals or timeline.';
  }

  if (!privacyConsent) {
    errors.privacyConsent =
      'Please confirm that we may contact you regarding your inquiry and acknowledge our Privacy Policy.';
  }

  if (Object.keys(errors).length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    errors: {},
    sanitized: {
      fullName,
      email,
      phone,
      company,
      service: service as ContactServiceOption,
      budget: budget as ContactBudgetOption | '',
      projectDetails,
      privacyConsent: true,
    },
  };
}

/**
 * Matches an incoming service query parameter or service title to one of the 12 allowed form options.
 */
export function normalizePreselectedService(rawService?: string | null): ContactServiceOption | '' {
  if (!rawService) return '';
  const cleaned = rawService.trim().toLowerCase();

  const exact = CONTACT_SERVICE_OPTIONS.find(
    (opt) => opt.toLowerCase() === cleaned
  );
  if (exact) return exact;

  if (cleaned.includes('brand')) return 'Branding';
  if (cleaned.includes('web')) return 'Web Development';
  if (cleaned.includes('graphic')) return 'Graphic Design';
  if (cleaned.includes('lead')) return 'Lead Generation';
  if (cleaned.includes('social')) return 'Social Media';
  if (cleaned.includes('google')) return 'Google Ads';
  if (cleaned.includes('seo') || cleaned.includes('search')) return 'SEO';
  if (cleaned.includes('meta')) return 'Meta Ads';
  if (cleaned.includes('content') || cleaned.includes('copy')) return 'Content';
  if (cleaned.includes('video') || cleaned.includes('motion')) return 'Video & Motion';
  if (cleaned.includes('ui') || cleaned.includes('ux')) return 'UI / UX';
  if (cleaned.includes('analytic') || cleaned.includes('cro') || cleaned.includes('conversion')) {
    return 'Analytics & CRO';
  }

  return '';
}
