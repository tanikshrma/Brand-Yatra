import { FormEvent, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  X,
} from 'lucide-react';
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
import { useSmoothScroll } from '../animations/SmoothScrollProvider';

interface LetsTalkModalProps {
  isOpen: boolean;
  initialService?: string;
  onClose: () => void;
  onNavigate: (path: AppRoute, hash?: string) => void;
}

type SubmissionStatus =
  | { state: 'idle' }
  | { state: 'submitting' }
  | { state: 'success'; message: string }
  | { state: 'error'; message: string };

export function LetsTalkModal({
  isOpen,
  initialService,
  onClose,
  onNavigate,
}: LetsTalkModalProps) {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const firstInputRef = useRef<HTMLInputElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const [isRendered, setIsRendered] = useState(isOpen);

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

  const { stopScroll, startScroll } = useSmoothScroll();

  /* Sync preselected service whenever modal opens from a specific service page */
  useEffect(() => {
    if (!isOpen) return;
    const matched = normalizePreselectedService(initialService);
    if (matched) {
      setService(matched);
      setFieldErrors((prev) => {
        if (!prev.service) return prev;
        const next = { ...prev };
        delete next.service;
        return next;
      });
    }
  }, [isOpen, initialService]);

  /* Mount/unmount lifecycle + GSAP entrance/exit + scroll lock + focus restore */
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current =
        document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;
      setIsRendered(true);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isRendered) return;

    const overlay = overlayRef.current;
    const dialog = dialogRef.current;
    if (!overlay || !dialog) return;

    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    gsap.killTweensOf([overlay, dialog]);

    if (isOpen) {
      stopScroll();
      const prevBodyOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      if (reduced) {
        gsap.set(overlay, { autoAlpha: 1 });
        gsap.set(dialog, { autoAlpha: 1, y: 0 });
      } else {
        gsap.fromTo(
          overlay,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.22, ease: 'power2.out' }
        );
        gsap.fromTo(
          dialog,
          { autoAlpha: 0, y: 14 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.3,
            ease: 'power3.out',
            clearProps: 'transform',
          }
        );
      }

      const shouldAutoFocus = window.matchMedia(
        '(min-width: 768px) and (pointer: fine)'
      ).matches;
      const focusTimer = shouldAutoFocus
        ? window.setTimeout(() => {
            firstInputRef.current?.focus();
          }, 90)
        : null;

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          e.stopPropagation();
          onClose();
          return;
        }

        if (e.key === 'Tab' && dialogRef.current) {
          const focusable = Array.from(
            dialogRef.current.querySelectorAll<HTMLElement>(
              'a[href], button:not(:disabled), input:not(:disabled):not([tabindex="-1"]), textarea:not(:disabled), select:not(:disabled), [tabindex]:not([tabindex="-1"])'
            )
          ).filter((el) => el.offsetParent !== null || el.classList.contains('sr-only'));

          if (focusable.length > 0) {
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (e.shiftKey && document.activeElement === first) {
              e.preventDefault();
              last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
              e.preventDefault();
              first.focus();
            }
          }
        }
      };

      window.addEventListener('keydown', handleKeyDown);

      return () => {
        if (focusTimer !== null) {
          window.clearTimeout(focusTimer);
        }
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = prevBodyOverflow;
        startScroll();
      };
    } else {
      if (reduced) {
        setIsRendered(false);
        previousFocusRef.current?.focus?.();
        return;
      }

      const tl = gsap.timeline({
        onComplete: () => {
          setIsRendered(false);
          previousFocusRef.current?.focus?.();
        },
      });

      tl.to(
        dialog,
        {
          autoAlpha: 0,
          y: 8,
          duration: 0.15,
          ease: 'power2.in',
        },
        0
      ).to(
        overlay,
        {
          autoAlpha: 0,
          duration: 0.17,
          ease: 'power2.inOut',
        },
        0.02
      );

      return () => {
        tl.kill();
      };
    }
  }, [isOpen, isRendered, onClose, stopScroll, startScroll]);

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
        fieldErrors?: ContactFieldErrors;
      } | null;

      if (
        response.status === 400 &&
        payload?.code === 'VALIDATION_ERROR' &&
        payload.fieldErrors
      ) {
        setFieldErrors(payload.fieldErrors);
        setSubmissionStatus({ state: 'idle' });
        return;
      }

      if (!response.ok || !payload?.ok) {
        const serverMsg =
          payload?.code === 'RATE_LIMITED' && payload.message
            ? payload.message
            : payload?.code === 'EMAIL_NOT_CONFIGURED'
              ? 'Online inquiry delivery is not yet configured in this environment. Please try again later.'
              : "We couldn't send your inquiry right now. Please try again shortly.";
        setSubmissionStatus({
          state: 'error',
          message: serverMsg,
        });
        return;
      }

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
        message:
          'Thank you! Your inquiry has been received. Our team will review your brief and get back to you shortly.',
      });
    } catch {
      setSubmissionStatus({
        state: 'error',
        message: "We couldn't send your inquiry right now. Please try again shortly.",
      });
    }
  };

  if (!isRendered) return null;

  const isSubmitting = submissionStatus.state === 'submitting';
  const firstValidationMessage =
    fieldErrors.fullName ||
    fieldErrors.email ||
    fieldErrors.phone ||
    fieldErrors.service ||
    fieldErrors.budget ||
    fieldErrors.projectDetails ||
    fieldErrors.privacyConsent;

  const labelClass =
    'block text-[10px] sm:text-[10.5px] font-semibold tracking-[0.13em] uppercase text-[#9A9A9A] mb-0.5 sm:mb-1 whitespace-nowrap';

  const getUnderlineInputClass = (hasErr: boolean, extra = '') =>
    `w-full h-[36px] sm:h-[40px] px-0 rounded-none bg-transparent border-0 border-b text-[16px] sm:text-[14.5px] text-white placeholder:text-white/30 outline-none transition-colors ${
      hasErr
        ? 'border-[#F8C311] focus:border-[#F8C311]'
        : 'border-[#2B2B2B] hover:border-white/35 focus:border-[#F8C311]'
    } ${extra}`;

  return (
    <div
      ref={overlayRef}
      data-cursor-theme="dark"
      data-lenis-prevent
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      className="fixed inset-0 z-[90] bg-black/86 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-hidden"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="lets-talk-modal-title"
        className="by-dark-form by-dropdown-scroll relative w-full max-w-[440px] sm:max-w-[780px] max-h-[calc(100dvh-24px)] overflow-y-auto overscroll-contain bg-[#0D0D0D] border border-[#292929] border-t-2 border-t-[#F8C311] rounded-none shadow-[0_36px_96px_rgba(0,0,0,0.92)] text-white"
      >
        {/* =================================================================
            EDITORIAL STUDIO MASTHEAD
           ================================================================= */}
        <div className="px-5 sm:px-9 pt-4 sm:pt-7 pb-3.5 sm:pb-5 border-b border-[#222222] flex items-start justify-between gap-3">
          <div className="min-w-0">
            <span className="eyebrow-label text-[#A8A8A8] block mb-1.5 sm:mb-2.5">
              START A CONVERSATION
            </span>
            <h2
              id="lets-talk-modal-title"
              className="font-heading text-[27px] min-[390px]:text-[30px] sm:text-[42px] leading-[0.94] tracking-[0.016em] uppercase text-white"
            >
              TELL US ABOUT YOUR{' '}
              <span className="text-[#F8C311]">PROJECT.</span>
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close inquiry popup"
            data-cursor="link"
            className="w-9 h-9 rounded-none bg-[#141414] border border-[#2E2E2E] text-white/90 inline-flex items-center justify-center shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#F8C311]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* =================================================================
            ARCHITECTURAL UNDERLINE FORM SHEET (Mobile & Desktop Balanced Fit)
           ================================================================= */}
        <div className="px-5 sm:px-9 py-4 sm:py-6">
          {submissionStatus.state === 'success' ? (
            <div
              role="status"
              aria-live="polite"
              className="py-6 sm:py-8 text-left"
            >
              <div className="w-11 h-11 rounded-none bg-[#F8C311]/12 border border-[#F8C311]/45 flex items-center justify-center mb-5">
                <CheckCircle2 className="w-5 h-5 text-[#F8C311]" />
              </div>

              <h3 className="font-heading text-[32px] sm:text-[38px] leading-none tracking-[0.02em] uppercase text-white">
                INQUIRY <span className="text-[#F8C311]">RECEIVED.</span>
              </h3>

              <p className="mt-3 text-[15px] leading-[1.64] text-[#B5B5B5] max-w-[540px]">
                {submissionStatus.message}
              </p>

              <div className="mt-6 pt-5 border-t border-[#222222] flex flex-wrap items-center gap-3">
                <BrandButton
                  variant="gold"
                  size="sm"
                  onClick={() => setSubmissionStatus({ state: 'idle' })}
                >
                  Send Another Inquiry
                </BrandButton>
                <BrandButton
                  variant="outline"
                  size="sm"
                  showArrow={false}
                  onClick={onClose}
                >
                  Done
                </BrandButton>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-3 sm:space-y-4">
              {/* Hidden Anti-Spam Honeypot */}
              <div className="sr-only" aria-hidden="true">
                <label htmlFor="modal-contact-website">Website</label>
                <input
                  id="modal-contact-website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={websiteHoneypot}
                  onChange={(e) => setWebsiteHoneypot(e.target.value)}
                />
              </div>

              {/* Row 1: Full Name & Email (Full-Width Stacked on Mobile, 2-Col on Desktop) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 sm:gap-x-8">
                <div>
                  <label htmlFor="modal-full-name" className={labelClass}>
                    Full Name <span className="text-[#F8C311]">*</span>
                  </label>
                  <input
                    ref={firstInputRef}
                    id="modal-full-name"
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
                    className={getUnderlineInputClass(
                      Boolean(fieldErrors.fullName)
                    )}
                  />
                </div>

                <div>
                  <label htmlFor="modal-email" className={labelClass}>
                    Email Address <span className="text-[#F8C311]">*</span>
                  </label>
                  <input
                    id="modal-email"
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
                    className={getUnderlineInputClass(Boolean(fieldErrors.email))}
                  />
                </div>
              </div>

              {/* Row 2: Phone & Company (Aligned 2-Col Pair) */}
              <div className="grid grid-cols-2 gap-x-4 sm:gap-x-8 items-end">
                <div className="min-w-0">
                  <label htmlFor="modal-phone" className={labelClass}>
                    <span className="sm:hidden">Phone</span>
                    <span className="hidden sm:inline">Phone Number</span>
                  </label>
                  <input
                    id="modal-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="Phone number"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      clearFieldError('phone');
                    }}
                    aria-invalid={Boolean(fieldErrors.phone)}
                    className={getUnderlineInputClass(
                      Boolean(fieldErrors.phone),
                      'tabular-nums'
                    )}
                  />
                </div>

                <div className="min-w-0">
                  <label htmlFor="modal-company" className={labelClass}>
                    <span className="sm:hidden">Company</span>
                    <span className="hidden sm:inline">Company / Brand</span>
                  </label>
                  <input
                    id="modal-company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    placeholder="Brand name"
                    value={company}
                    onChange={(e) => {
                      setCompany(e.target.value);
                      clearFieldError('company');
                    }}
                    className={getUnderlineInputClass(false)}
                  />
                </div>
              </div>

              {/* Row 3: Service & Estimated Budget (Full-Width Stacked on Mobile, 2-Col on Desktop) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 sm:gap-x-8">
                <div className="min-w-0">
                  <label htmlFor="modal-service" className={labelClass}>
                    Service <span className="text-[#F8C311]">*</span>
                  </label>
                  <BrandSelect
                    id="modal-service"
                    name="service"
                    required
                    showIndex
                    variant="underline"
                    value={service}
                    options={CONTACT_SERVICE_OPTIONS}
                    placeholder="Select service"
                    hasError={Boolean(fieldErrors.service)}
                    onChange={(nextVal) => {
                      setService(nextVal);
                      clearFieldError('service');
                    }}
                  />
                </div>

                <div className="min-w-0">
                  <label htmlFor="modal-budget" className={labelClass}>
                    Estimated Budget
                  </label>
                  <BrandSelect
                    id="modal-budget"
                    name="budget"
                    variant="underline"
                    value={budget}
                    options={CONTACT_BUDGET_OPTIONS}
                    placeholder="Optional"
                    clearLabel="Optional — No preference"
                    hasError={Boolean(fieldErrors.budget)}
                    onChange={(nextVal) => {
                      setBudget(nextVal);
                      clearFieldError('budget');
                    }}
                  />
                </div>
              </div>

              {/* Row 4: Project Details */}
              <div>
                <label htmlFor="modal-project-details" className={labelClass}>
                  Project Details <span className="text-[#F8C311]">*</span>
                </label>
                <textarea
                  id="modal-project-details"
                  name="projectDetails"
                  required
                  rows={2}
                  placeholder="Briefly describe your goals, scope and timeline..."
                  value={projectDetails}
                  onChange={(e) => {
                    setProjectDetails(e.target.value);
                    clearFieldError('projectDetails');
                  }}
                  aria-invalid={Boolean(fieldErrors.projectDetails)}
                  className={`w-full h-[44px] sm:h-[54px] py-1 sm:py-1.5 px-0 rounded-none bg-transparent border-0 border-b text-[16px] sm:text-[14.5px] leading-[1.45] text-white placeholder:text-white/30 outline-none transition-colors resize-none ${
                    fieldErrors.projectDetails
                      ? 'border-[#F8C311] focus:border-[#F8C311]'
                      : 'border-[#2B2B2B] hover:border-white/35 focus:border-[#F8C311]'
                  }`}
                />
              </div>

              {/* Compact Inline Validation / Error Feedback */}
              {(firstValidationMessage || submissionStatus.state === 'error') && (
                <div
                  role="alert"
                  aria-live="assertive"
                  className="pt-0.5 flex items-start gap-2 text-[12px] leading-snug text-[#F8C311]"
                >
                  <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  <span className="line-clamp-2">
                    {firstValidationMessage ||
                      (submissionStatus.state === 'error'
                        ? submissionStatus.message
                        : '')}
                  </span>
                </div>
              )}

              {/* Row 5: Footer Bar — Custom Checkbox + Brand Yellow CTA */}
              <div className="pt-3.5 sm:pt-4 border-t border-[#222222] flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 sm:gap-4">
                <div className="min-w-0">
                  <BrandCheckbox
                    id="modal-privacy-consent"
                    name="privacyConsent"
                    compact
                    checked={privacyConsent}
                    hasError={Boolean(fieldErrors.privacyConsent)}
                    onChange={(checked) => {
                      setPrivacyConsent(checked);
                      clearFieldError('privacyConsent');
                    }}
                  >
                    I agree to be contacted &amp; accept the{' '}
                    <a
                      href="/privacy-policy"
                      onClick={(e) => {
                        e.preventDefault();
                        onClose();
                        onNavigate('/privacy-policy');
                      }}
                      className="text-white underline underline-offset-4 hover:text-[#F8C311] transition-colors"
                    >
                      Privacy Policy
                    </a>
                    . <span className="text-[#F8C311]">*</span>
                  </BrandCheckbox>
                </div>

                <BrandButton
                  type="submit"
                  variant="gold"
                  size="sm"
                  disabled={isSubmitting}
                  showArrow={!isSubmitting}
                  className="w-full sm:w-auto min-h-[46px] sm:min-h-[42px]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <span>Send Inquiry</span>
                  )}
                </BrandButton>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
