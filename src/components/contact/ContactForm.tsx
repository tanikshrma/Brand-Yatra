import { FormEvent, useEffect, useRef, useState } from 'react';
import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle2,
  Loader2,
} from 'lucide-react';
import { SITE_CONFIG } from '../../data/site';
import { AppRoute } from '../../data/services';
import {
  CONTACT_BUDGET_OPTIONS,
  CONTACT_SERVICE_OPTIONS,
  ContactFieldErrors,
  ContactFieldKey,
  normalizePreselectedService,
  validateContactPayload,
} from '../../data/contact';
import { BrandButton } from '../ui/BrandButton';
import { BrandCheckbox, BrandSelect } from '../ui/BrandFormControls';
import { useGSAPReveal, useTextReveal } from '../animations/gsapHooks';

interface ContactFormProps {
  initialService?: string;
  onNavigate: (path: AppRoute, hash?: string) => void;
}

type SubmissionStatus =
  | { state: 'idle' }
  | { state: 'submitting' }
  | { state: 'success'; message: string }
  | { state: 'error'; message: string };

function isUnverifiedPlaceholder(value: string): boolean {
  const trimmed = value.trim();
  return !trimmed || (trimmed.startsWith('[') && trimmed.endsWith(']'));
}

export function ContactForm({ initialService, onNavigate }: ContactFormProps) {
  const leftHeadingRef = useRef<HTMLHeadingElement | null>(null);
  const leftDetailsRef = useRef<HTMLDivElement | null>(null);
  const formContainerRef = useRef<HTMLDivElement | null>(null);

  useTextReveal(leftHeadingRef, { stagger: 0.08, duration: 0.8 });
  useGSAPReveal(leftDetailsRef, { y: 20, duration: 0.8, delay: 0.08 });
  useGSAPReveal(formContainerRef, { y: 24, duration: 0.85, start: 'top 86%' });

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [service, setService] = useState<string>(() =>
    normalizePreselectedService(initialService)
  );
  const [budget, setBudget] = useState<string>('');
  const [projectDetails, setProjectDetails] = useState('');
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [websiteHoneypot, setWebsiteHoneypot] = useState('');

  const [fieldErrors, setFieldErrors] = useState<ContactFieldErrors>({});
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>({
    state: 'idle',
  });

  useEffect(() => {
    const matched = normalizePreselectedService(initialService);
    if (matched) {
      setService(matched);
    }
  }, [initialService]);

  const clearFieldError = (key: ContactFieldKey) => {
    setFieldErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submissionStatus.state === 'submitting') return;

    const clientCheck = validateContactPayload({
      fullName,
      email,
      phone,
      company,
      service,
      budget,
      projectDetails,
      privacyConsent,
      website: websiteHoneypot,
    });

    if (!clientCheck.valid && !clientCheck.isSpamHoneypot) {
      setFieldErrors(clientCheck.errors);
      return;
    }

    setFieldErrors({});
    setSubmissionStatus({ state: 'submitting' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          company,
          service,
          budget,
          projectDetails,
          privacyConsent,
          website: websiteHoneypot,
        }),
      });

      const payload = (await response.json().catch(() => null)) as {
        ok?: boolean;
        code?: string;
        message?: string;
        missingVars?: string[];
        fieldErrors?: ContactFieldErrors;
      } | null;

      if (response.status === 400 && payload?.code === 'VALIDATION_ERROR' && payload.fieldErrors) {
        setFieldErrors(payload.fieldErrors);
        setSubmissionStatus({ state: 'idle' });
        return;
      }

      if (!response.ok || !payload?.ok) {
        const serverMsg =
          (payload?.code === 'RATE_LIMITED' ||
            payload?.code === 'EMAIL_NOT_CONFIGURED') &&
          payload.message
            ? payload.message
            : "We couldn't send your inquiry right now. Please try again or contact us by email.";
        setSubmissionStatus({
          state: 'error',
          message: serverMsg,
        });
        return;
      }

      /* Clear form fields ONLY after confirmed provider acceptance */
      setFullName('');
      setEmail('');
      setPhone('');
      setCompany('');
      setService('');
      setBudget('');
      setProjectDetails('');
      setPrivacyConsent(false);
      setWebsiteHoneypot('');
      setFieldErrors({});
      setSubmissionStatus({
        state: 'success',
        message: 'Thank you! Your inquiry has been received. Our team will be in touch.',
      });
    } catch {
      setSubmissionStatus({
        state: 'error',
        message:
          "We couldn't send your inquiry right now. Please try again or contact us by email.",
      });
    }
  };

  const configuredSocials = Object.entries(SITE_CONFIG.socials || {}).filter(
    ([, url]) => typeof url === 'string' && url.trim().length > 0
  );

  const isSubmitting = submissionStatus.state === 'submitting';

  const labelClass =
    'block text-[11px] font-semibold tracking-[0.13em] uppercase text-[#B5B5B5] mb-2.5';

  const getBoxInputClass = (hasErr: boolean, extra = '') =>
    `w-full h-[54px] px-4 rounded-none bg-[#0D0D0D] border text-[15px] text-white placeholder:text-white/30 outline-none transition-colors ${
      hasErr
        ? 'border-[#F8C311] focus:border-[#F8C311]'
        : 'border-[#2B2B2B] hover:border-white/30 focus:border-[#F8C311]'
    } ${extra}`;

  return (
    <section
      id="contact-form-section"
      data-cursor-theme="dark"
      className="bg-[#0D0D0D] text-white by-section-spacing border-t border-white/[0.08] scroll-mt-20"
    >
      <div className="by-container">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,38%)_minmax(0,62%)] gap-12 lg:gap-16 xl:gap-20 items-start">
          {/* ===============================================================
              LEFT COLUMN (38%): Editorial Introduction & Verified Details
             =============================================================== */}
          <div>
            <span className="eyebrow-label text-[#A8A8A8] block mb-5">
              START A CONVERSATION
            </span>

            <h2
              ref={leftHeadingRef}
              className="font-heading text-[50px] sm:text-[64px] lg:text-[76px] leading-[0.93] tracking-[0.015em] uppercase text-white"
            >
              <span className="block overflow-hidden py-[0.03em] -my-[0.02em]">
                <span data-reveal-line className="block">
                  BIG IDEAS
                </span>
              </span>
              <span className="block overflow-hidden py-[0.03em] -my-[0.02em]">
                <span data-reveal-line className="block text-[#F8C311]">
                  START HERE.
                </span>
              </span>
            </h2>

            <p className="mt-6 text-[16px] leading-[1.66] text-[#A8A8A8] max-w-[430px]">
              Whether you&apos;re launching a brand, building a website or looking to
              grow your digital presence, we&apos;d love to hear what you&apos;re working
              on.
            </p>

            <div
              ref={leftDetailsRef}
              className="mt-10 pt-10 border-t border-white/[0.1] space-y-7"
            >
              <div>
                <span className="eyebrow-label text-white/45 block mb-2.5">
                  EMAIL
                </span>
                <a
                  href={`mailto:${SITE_CONFIG.contact.email}`}
                  className="text-[18px] sm:text-[20px] font-medium text-white hover:text-[#F8C311] transition-colors break-words focus-visible:outline-2 focus-visible:outline-[#F8C311]"
                >
                  {SITE_CONFIG.contact.email}
                </a>
              </div>

              <div>
                <span className="eyebrow-label text-white/45 block mb-2.5">
                  PHONE
                </span>
                {isUnverifiedPlaceholder(SITE_CONFIG.contact.phone) ? (
                  <p className="text-[15.5px] text-[#A8A8A8]">
                    Direct phone consultation scheduled upon project inquiry
                  </p>
                ) : (
                  <a
                    href={`tel:${SITE_CONFIG.contact.phone.replace(/\s+/g, '')}`}
                    className="text-[18px] font-medium text-white hover:text-[#F8C311] transition-colors tabular-nums"
                  >
                    {SITE_CONFIG.contact.phone}
                  </a>
                )}
              </div>

              <div>
                <span className="eyebrow-label text-white/45 block mb-2.5">
                  LOCATION
                </span>
                <p className="text-[15.5px] text-white/90">
                  {isUnverifiedPlaceholder(SITE_CONFIG.contact.location)
                    ? 'Collaborating remotely & on-site with brands across India and globally'
                    : SITE_CONFIG.contact.location}
                </p>
              </div>

              {configuredSocials.length > 0 && (
                <div>
                  <span className="eyebrow-label text-white/45 block mb-3">
                    SOCIAL
                  </span>
                  <div className="flex flex-wrap items-center gap-5">
                    {configuredSocials.map(([platform, url]) => (
                      <a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[13.5px] uppercase tracking-[0.1em] text-[#A8A8A8] hover:text-[#F8C311] transition-colors whitespace-nowrap"
                      >
                        <span>{platform}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#F8C311]" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ===============================================================
              RIGHT COLUMN (62%): Validated Project Inquiry Form Container
             =============================================================== */}
          <div
            ref={formContainerRef}
            className="by-dark-form bg-[#121212] border border-[#292929] rounded-none p-6 sm:p-9 lg:p-12"
          >
            <div className="pb-6 border-b border-[#222222]">
              <span className="eyebrow-label text-[#8E8E8E] block mb-2.5">
                PROJECT BRIEF
              </span>
              <h3 className="font-heading text-[34px] sm:text-[44px] leading-[0.96] tracking-[0.018em] uppercase text-white">
                TELL US ABOUT YOUR <span className="text-[#F8C311]">PROJECT.</span>
              </h3>
              <p className="mt-2 text-[15px] leading-[1.6] text-[#A8A8A8]">
                Share a few details below and our senior team will get back to you.
              </p>
            </div>

            {submissionStatus.state === 'success' ? (
              <div
                role="status"
                aria-live="polite"
                className="mt-8 p-8 sm:p-10 rounded-none bg-[#0D0D0D] border border-[#F8C311]/45 text-left"
              >
                <div className="w-12 h-12 rounded-none bg-[#F8C311]/12 border border-[#F8C311]/45 flex items-center justify-center mb-5">
                  <CheckCircle2 className="w-6 h-6 text-[#F8C311]" />
                </div>

                <h4 className="font-heading text-[32px] sm:text-[38px] leading-none tracking-[0.02em] uppercase text-white">
                  Inquiry Received
                </h4>

                <p className="mt-3 text-[16px] leading-[1.64] text-white/90 max-w-[520px]">
                  {submissionStatus.message}
                </p>

                <div className="mt-7">
                  <BrandButton
                    variant="gold"
                    size="md"
                    onClick={() => setSubmissionStatus({ state: 'idle' })}
                  >
                    Send Another Inquiry
                  </BrandButton>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-6">
                {/* Hidden Anti-Spam Honeypot Field */}
                <div className="sr-only" aria-hidden="true">
                  <label htmlFor="by-contact-website">Website</label>
                  <input
                    id="by-contact-website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={websiteHoneypot}
                    onChange={(e) => setWebsiteHoneypot(e.target.value)}
                  />
                </div>

                {/* Row 1: Full Name & Email Address */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                  <div>
                    <label htmlFor="contact-full-name" className={labelClass}>
                      Full Name <span className="text-[#F8C311]">*</span>
                    </label>
                    <input
                      id="contact-full-name"
                      name="fullName"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="Your full name"
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        clearFieldError('fullName');
                      }}
                      aria-invalid={Boolean(fieldErrors.fullName)}
                      aria-describedby={
                        fieldErrors.fullName ? 'contact-full-name-error' : undefined
                      }
                      className={getBoxInputClass(Boolean(fieldErrors.fullName))}
                    />
                    {fieldErrors.fullName && (
                      <p
                        id="contact-full-name-error"
                        role="alert"
                        className="mt-2 text-[12.5px] text-[#F8C311]"
                      >
                        {fieldErrors.fullName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contact-email" className={labelClass}>
                      Email Address <span className="text-[#F8C311]">*</span>
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="you@company.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        clearFieldError('email');
                      }}
                      aria-invalid={Boolean(fieldErrors.email)}
                      aria-describedby={
                        fieldErrors.email ? 'contact-email-error' : undefined
                      }
                      className={getBoxInputClass(Boolean(fieldErrors.email))}
                    />
                    {fieldErrors.email && (
                      <p
                        id="contact-email-error"
                        role="alert"
                        className="mt-2 text-[12.5px] text-[#F8C311]"
                      >
                        {fieldErrors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Row 2: Phone Number & Company / Brand Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                  <div>
                    <label htmlFor="contact-phone" className={labelClass}>
                      Phone Number
                    </label>
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="+91 XXXXX XXXXX"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        clearFieldError('phone');
                      }}
                      aria-invalid={Boolean(fieldErrors.phone)}
                      aria-describedby={
                        fieldErrors.phone ? 'contact-phone-error' : undefined
                      }
                      className={getBoxInputClass(
                        Boolean(fieldErrors.phone),
                        'tabular-nums'
                      )}
                    />
                    {fieldErrors.phone && (
                      <p
                        id="contact-phone-error"
                        role="alert"
                        className="mt-2 text-[12.5px] text-[#F8C311]"
                      >
                        {fieldErrors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contact-company" className={labelClass}>
                      Company / Brand Name
                    </label>
                    <input
                      id="contact-company"
                      name="company"
                      type="text"
                      autoComplete="organization"
                      placeholder="Your company name"
                      value={company}
                      onChange={(e) => {
                        setCompany(e.target.value);
                        clearFieldError('company');
                      }}
                      className={getBoxInputClass(false)}
                    />
                  </div>
                </div>

                {/* Row 3: Service Interested In (12 Exact Services) & Estimated Project Budget */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                  <div>
                    <label htmlFor="contact-service" className={labelClass}>
                      Service Interested In <span className="text-[#F8C311]">*</span>
                    </label>
                    <BrandSelect
                      id="contact-service"
                      name="service"
                      required
                      showIndex
                      variant="box"
                      value={service}
                      options={CONTACT_SERVICE_OPTIONS}
                      placeholder="Select a service"
                      hasError={Boolean(fieldErrors.service)}
                      describedBy={
                        fieldErrors.service ? 'contact-service-error' : undefined
                      }
                      onChange={(nextVal) => {
                        setService(nextVal);
                        clearFieldError('service');
                      }}
                    />
                    {fieldErrors.service && (
                      <p
                        id="contact-service-error"
                        role="alert"
                        className="mt-2 text-[12.5px] text-[#F8C311]"
                      >
                        {fieldErrors.service}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contact-budget" className={labelClass}>
                      Estimated Project Budget
                    </label>
                    <BrandSelect
                      id="contact-budget"
                      name="budget"
                      variant="box"
                      value={budget}
                      options={CONTACT_BUDGET_OPTIONS}
                      placeholder="Select budget range (optional)"
                      clearLabel="Optional — No preference"
                      hasError={Boolean(fieldErrors.budget)}
                      describedBy={
                        fieldErrors.budget ? 'contact-budget-error' : undefined
                      }
                      onChange={(nextVal) => {
                        setBudget(nextVal);
                        clearFieldError('budget');
                      }}
                    />
                    {fieldErrors.budget && (
                      <p
                        id="contact-budget-error"
                        role="alert"
                        className="mt-2 text-[12.5px] text-[#F8C311]"
                      >
                        {fieldErrors.budget}
                      </p>
                    )}
                  </div>
                </div>

                {/* Row 4: Full-Width Project Details */}
                <div>
                  <label htmlFor="contact-project-details" className={labelClass}>
                    Project Details <span className="text-[#F8C311]">*</span>
                  </label>
                  <textarea
                    id="contact-project-details"
                    name="projectDetails"
                    required
                    rows={5}
                    placeholder="Tell us about your goals, ideas, timeline and what you need help with."
                    value={projectDetails}
                    onChange={(e) => {
                      setProjectDetails(e.target.value);
                      clearFieldError('projectDetails');
                    }}
                    aria-invalid={Boolean(fieldErrors.projectDetails)}
                    aria-describedby={
                      fieldErrors.projectDetails ? 'contact-details-error' : undefined
                    }
                    className={`w-full min-h-[148px] p-4 rounded-none bg-[#0D0D0D] border text-[15px] leading-[1.6] text-white placeholder:text-white/30 outline-none transition-colors resize-y ${
                      fieldErrors.projectDetails
                        ? 'border-[#F8C311] focus:border-[#F8C311]'
                        : 'border-[#2B2B2B] hover:border-white/30 focus:border-[#F8C311]'
                    }`}
                  />
                  {fieldErrors.projectDetails && (
                    <p
                      id="contact-details-error"
                      role="alert"
                      className="mt-2 text-[12.5px] text-[#F8C311]"
                    >
                      {fieldErrors.projectDetails}
                    </p>
                  )}
                </div>

                {/* Row 5: Custom Sharp-Edged Privacy Consent Checkbox */}
                <div>
                  <BrandCheckbox
                    id="contact-privacy-consent"
                    name="privacyConsent"
                    checked={privacyConsent}
                    hasError={Boolean(fieldErrors.privacyConsent)}
                    describedBy={
                      fieldErrors.privacyConsent ? 'contact-consent-error' : undefined
                    }
                    onChange={(checked) => {
                      setPrivacyConsent(checked);
                      clearFieldError('privacyConsent');
                    }}
                  >
                    I agree to be contacted about my inquiry and acknowledge the{' '}
                    <a
                      href="/privacy-policy"
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate('/privacy-policy');
                      }}
                      className="text-white underline underline-offset-4 hover:text-[#F8C311] transition-colors"
                    >
                      Privacy Policy
                    </a>
                    . <span className="text-[#F8C311]">*</span>
                  </BrandCheckbox>

                  {fieldErrors.privacyConsent && (
                    <p
                      id="contact-consent-error"
                      role="alert"
                      className="mt-2 text-[12.5px] text-[#F8C311]"
                    >
                      {fieldErrors.privacyConsent}
                    </p>
                  )}
                </div>

                {/* Submission Error Feedback (Preserves Entered Data) */}
                {submissionStatus.state === 'error' && (
                  <div
                    role="alert"
                    aria-live="assertive"
                    className="p-4 rounded-none bg-[#0D0D0D] border border-[#F8C311]/55 flex items-start gap-3 text-[14px] leading-[1.58] text-white"
                  >
                    <AlertCircle className="w-5 h-5 text-[#F8C311] shrink-0 mt-0.5" />
                    <div>
                      <p>{submissionStatus.message}</p>
                      <p className="mt-1.5 text-[13px] text-[#A8A8A8]">
                        Direct email:{' '}
                        <a
                          href={`mailto:${SITE_CONFIG.contact.email}`}
                          className="text-[#F8C311] underline underline-offset-4 hover:text-white"
                        >
                          {SITE_CONFIG.contact.email}
                        </a>
                      </p>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <div className="pt-2 border-t border-[#222222]">
                  <BrandButton
                    type="submit"
                    variant="gold"
                    size="lg"
                    disabled={isSubmitting}
                    showArrow={!isSubmitting}
                    className="w-full sm:w-auto mt-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending Inquiry...</span>
                      </>
                    ) : (
                      <span>Send Project Inquiry</span>
                    )}
                  </BrandButton>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
