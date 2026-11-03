import React, { useEffect, useRef, useState } from 'react';
import { X, CheckCircle2, ArrowUpRight, Check, Sparkles } from 'lucide-react';
import { ServiceItem, PortfolioItem, ArticleItem } from '../data/agencyData';
import { BtnShape } from './BtnShape';
import { buildContactMailto } from '../utils/contact';

const useModalAccessibility = (isOpen: boolean, onClose: () => void) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!isOpen) return;

    const previousFocus = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusTimer = window.setTimeout(() => {
      const focusable = dialogRef.current?.querySelector<HTMLElement>(
        'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled])',
      );
      (focusable ?? dialogRef.current)?.focus();
    }, 0);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onCloseRef.current();
        return;
      }
      if (event.key !== 'Tab') return;

      const focusableElements = Array.from(
        dialogRef.current?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled])',
        ) ?? [],
      ).filter((element) => element.getClientRects().length > 0);
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      if (!firstElement || !lastElement) {
        event.preventDefault();
        dialogRef.current?.focus();
        return;
      }

      if (event.shiftKey && (document.activeElement === firstElement || !dialogRef.current?.contains(document.activeElement))) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && (document.activeElement === lastElement || !dialogRef.current?.contains(document.activeElement))) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      window.clearTimeout(focusTimer);
      previousFocus?.focus();
    };
  }, [isOpen]);

  return dialogRef;
};

// Service Explorer Modal
export const ServiceModal: React.FC<{
  service: ServiceItem | null;
  onClose: () => void;
  onBookService: (serviceName: string) => void;
}> = ({ service, onClose, onBookService }) => {
  const dialogRef = useModalAccessibility(Boolean(service), onClose);
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[var(--color-navy)]/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="service-dialog-title" tabIndex={-1} className="bg-[var(--color-navy)] border border-[var(--color-border)] rounded-3xl max-w-xl w-full p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-[var(--color-dark-text)] text-[var(--color-white)] hover:text-[var(--color-white)] border border-[var(--color-border)] cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[var(--color-primary)] mb-2 font-['Plus_Jakarta_Sans',sans-serif]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{service.category}</span>
        </div>

        <h3 id="service-dialog-title" className="font-['Marcellus',serif] text-2xl sm:text-3xl text-[var(--color-white)] uppercase tracking-wide mb-4">
          {service.title}
        </h3>

        <p className="font-['Plus_Jakarta_Sans',sans-serif] text-sm text-[var(--color-white)] leading-relaxed mb-6 font-normal">
          {service.fullDesc}
        </p>

        <div className="mb-8">
          <h4 className="font-['Marcellus',serif] text-sm uppercase tracking-wider text-[var(--color-white)] mb-3 font-semibold">
            Core Agency Deliverables
          </h4>
          <ul className="space-y-2.5 font-['Plus_Jakarta_Sans',sans-serif]">
            {service.deliverables.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-[var(--color-white)]">
                <div className="w-4 h-4 rounded-full bg-[var(--color-primary)]/20 border border-[var(--color-primary)] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-2.5 h-2.5 text-[var(--color-primary)]" />
                </div>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-3 pt-6 border-t border-[var(--color-border)]">
          <button
            onClick={() => {
              onClose();
              onBookService(service.title);
            }}
            className="group/btn relative flex-1 inline-flex items-center justify-center gap-2 text-[var(--color-navy)] font-['Plus_Jakarta_Sans',sans-serif] text-xs font-bold uppercase tracking-wider py-3.5 transition-all filter drop-shadow-[0_4px_12px_rgba(248,195,17,0.3)] active:scale-95 cursor-pointer"
          >
            <BtnShape fill="#F8C311" />
            <span className="relative z-10">REQUEST AUDIT FOR THIS SERVICE</span>
            <ArrowUpRight className="relative z-10 w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Case Study Modal
export const CaseStudyModal: React.FC<{
  project: PortfolioItem | null;
  onClose: () => void;
  onBookProject: (projectName: string) => void;
}> = ({ project, onClose, onBookProject }) => {
  const dialogRef = useModalAccessibility(Boolean(project), onClose);
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[var(--color-navy)]/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="case-study-dialog-title" tabIndex={-1} className="bg-[var(--color-navy)] border border-[var(--color-border)] rounded-3xl max-w-2xl w-full p-6 sm:p-10 relative max-h-[90vh] overflow-y-auto shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-[var(--color-dark-text)] text-[var(--color-white)] hover:text-[var(--color-white)] border border-[var(--color-border)] cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--color-primary)] mb-2 font-['Plus_Jakarta_Sans',sans-serif]">
          <span>{project.client}</span>
          <span className="text-[var(--color-muted-slate)]">·</span>
          <span className="text-[var(--color-white)]">{project.service}</span>
        </div>

        <h3 id="case-study-dialog-title" className="font-['Marcellus',serif] text-2xl sm:text-3xl text-[var(--color-white)] uppercase tracking-wide mb-4 leading-snug">
          {project.headline}
        </h3>

        <p className="font-['Plus_Jakarta_Sans',sans-serif] text-sm text-[var(--color-white)] leading-relaxed mb-6 font-normal">
          {project.description}
        </p>

        {/* Audited Metrics */}
        <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-[var(--color-dark-text)] border border-[var(--color-border)] mb-6">
          {project.metrics.map((m, idx) => (
            <div key={idx} className="text-center">
              <div className="font-['Marcellus',serif] text-2xl sm:text-3xl text-[var(--color-primary)]">
                {m.value}
              </div>
              <div className="text-[10px] uppercase tracking-wider text-[var(--color-white)] mt-0.5 font-['Plus_Jakarta_Sans',sans-serif]">
                {m.label}
              </div>
            </div>
          ))}
        </div>

        <div className="mb-6">
          <h4 className="font-['Marcellus',serif] text-sm uppercase tracking-wider text-[var(--color-white)] mb-2 font-semibold">
            Execution Scope
          </h4>
          <div className="flex flex-wrap gap-2 font-['Plus_Jakarta_Sans',sans-serif]">
            {project.tags.map((t, i) => (
              <span
                key={i}
                className="text-[11px] font-mono uppercase bg-[var(--color-dark-text)] border border-[var(--color-border)] px-3 py-1 rounded text-[var(--color-white)]"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="pt-6 border-t border-[var(--color-border)] flex items-center gap-3">
          <button
            onClick={() => {
              onClose();
              onBookProject(project.client);
            }}
            className="group/btn relative w-full inline-flex items-center justify-center gap-2 text-[var(--color-dark-text)] font-['Plus_Jakarta_Sans',sans-serif] text-xs font-bold uppercase tracking-wider py-3.5 transition-all filter drop-shadow-[0_4px_12px_rgba(248,195,17,0.3)] active:scale-95 cursor-pointer"
          >
            <BtnShape fill="#F8C311" />
            <span className="relative z-10">REPLICATE THESE RESULTS FOR YOUR BRAND</span>
            <ArrowUpRight className="relative z-10 w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Article Reader Modal
export const ArticleModal: React.FC<{
  article: ArticleItem | null;
  onClose: () => void;
}> = ({ article, onClose }) => {
  const dialogRef = useModalAccessibility(Boolean(article), onClose);
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[var(--color-navy)]/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="article-dialog-title" tabIndex={-1} className="bg-[var(--color-navy)] border border-[var(--color-border)] rounded-3xl max-w-2xl w-full p-6 sm:p-10 relative max-h-[90vh] overflow-y-auto shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-[var(--color-dark-text)] text-[var(--color-white)] hover:text-[var(--color-white)] border border-[var(--color-border)] cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--color-primary)] mb-3 font-['Plus_Jakarta_Sans',sans-serif]">
          <span>{article.category}</span>
          <span className="text-[var(--color-muted-slate)]">·</span>
          <span className="text-[var(--color-white)]">{article.readTime}</span>
          <span className="text-[var(--color-muted-slate)]">·</span>
          <span className="text-[var(--color-white)]">{article.date}</span>
        </div>

        <h3 id="article-dialog-title" className="font-['Marcellus',serif] text-2xl sm:text-3xl text-[var(--color-white)] leading-snug mb-6">
          {article.title}
        </h3>

        {/* Highlight Callout */}
        <div className="bg-[var(--color-dark-text)] border-l-4 border-[var(--color-primary)] p-4 rounded-r-xl mb-6 text-xs sm:text-sm text-[var(--color-white)] italic font-['Plus_Jakarta_Sans',sans-serif]">
          <strong>Key Takeaway:</strong> {article.keyTakeaway}
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-[var(--color-white)] leading-relaxed mb-8 font-['Plus_Jakarta_Sans',sans-serif]">
          {article.content.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>

        <div className="pt-6 border-t border-[var(--color-border)] flex justify-end">
          <button
            onClick={onClose}
            className="bg-[var(--color-dark-text)] hover:bg-[var(--color-primary)] hover:text-[var(--color-dark-text)] text-[var(--color-white)] border border-[var(--color-border)] hover:border-[var(--color-primary)] font-['Plus_Jakarta_Sans',sans-serif] text-xs font-bold uppercase tracking-wider px-6 py-2.5 rounded-lg transition-all cursor-pointer"
          >
            Close Article
          </button>
        </div>
      </div>
    </div>
  );
};

// Quick Consultation Modal
export const ConsultationModal: React.FC<{
  isOpen: boolean;
  prefilledService?: string;
  onClose: () => void;
}> = ({ isOpen, prefilledService, onClose }) => {
  const dialogRef = useModalAccessibility(isOpen, onClose);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState(prefilledService || 'Brand Strategy & Growth');
  const [submitted, setSubmitted] = useState(false);
  const [emailDraftUrl, setEmailDraftUrl] = useState('');

  useEffect(() => {
    if (isOpen) {
      setService(prefilledService || 'Brand Strategy & Growth');
    }
  }, [isOpen, prefilledService]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setEmailDraftUrl(buildContactMailto('Brand Yatra consultation request', {
      Name: name,
      'Business email': email,
      Phone: phone,
      'Interest / requirement': service,
    }));
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[var(--color-navy)]/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="consultation-dialog-title" tabIndex={-1} className="bg-[var(--color-navy)] border border-[var(--color-border)] rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-[var(--color-dark-text)] text-[var(--color-white)] hover:text-[var(--color-white)] border border-[var(--color-border)] cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div role="status" aria-live="polite" className="py-8 text-center font-['Plus_Jakarta_Sans',sans-serif]">
            <div className="w-14 h-14 bg-[var(--color-primary)]/20 border border-[var(--color-primary)] text-[var(--color-primary)] rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 id="consultation-dialog-title" className="font-['Marcellus',serif] text-2xl text-[var(--color-white)] mb-2 uppercase">
              Your email draft is ready
            </h3>
            <p className="text-xs text-[var(--color-white)] mb-6">
              Your email app has not sent this request yet. Open the prepared draft and send it to contact Brand Yatra.
            </p>
            <a
              href={emailDraftUrl}
              className="inline-flex items-center justify-center rounded-full bg-[var(--color-primary)] px-6 py-3 text-xs font-bold uppercase tracking-wider text-[var(--color-navy)]"
            >
              Open email draft
            </a>
            <button
              onClick={() => {
                setSubmitted(false);
                setEmailDraftUrl('');
                onClose();
              }}
              className="bg-[var(--color-primary)] text-[var(--color-dark-text)] text-xs font-bold uppercase tracking-wider px-6 py-2.5 rounded-lg cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[var(--color-primary)] mb-2 font-['Plus_Jakarta_Sans',sans-serif]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>DIRECT STRATEGY DESK</span>
            </div>
            <h3 id="consultation-dialog-title" className="font-['Marcellus',serif] text-2xl text-[var(--color-white)] uppercase tracking-wide mb-2">
              LET'S TALK ABOUT GROWTH
            </h3>
            <p className="font-['Plus_Jakarta_Sans',sans-serif] text-xs text-[var(--color-white)] mb-6">
              Schedule a 30-minute private growth audit with Brand Yatra senior leadership.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 font-['Plus_Jakarta_Sans',sans-serif]">
              <div>
                <label htmlFor="consult-name" className="block text-[11px] font-semibold uppercase tracking-wider text-[var(--color-white)] mb-1">
                  Your Full Name *
                </label>
                <input
                  id="consult-name"
                  name="name"
                  autoComplete="name"
                  required
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. John Doe"
                  className="w-full bg-[var(--color-dark-text)] border border-[var(--color-border)] rounded-xl px-4 py-2.5 text-xs text-[var(--color-white)] placeholder-[var(--color-muted-slate)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]"
                />
              </div>

              <div>
                <label htmlFor="consult-email" className="block text-[11px] font-semibold uppercase tracking-wider text-[var(--color-white)] mb-1">
                  Business Email *
                </label>
                <input
                  id="consult-email"
                  name="email"
                  autoComplete="email"
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@company.com"
                  className="w-full bg-[var(--color-dark-text)] border border-[var(--color-border)] rounded-xl px-4 py-2.5 text-xs text-[var(--color-white)] placeholder-[var(--color-muted-slate)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]"
                />
              </div>

              <div>
                <label htmlFor="consult-phone" className="block text-[11px] font-semibold uppercase tracking-wider text-[var(--color-white)] mb-1">
                  Phone Number
                </label>
                <input
                  id="consult-phone"
                  name="phone"
                  autoComplete="tel"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="w-full bg-[var(--color-dark-text)] border border-[var(--color-border)] rounded-xl px-4 py-2.5 text-xs text-[var(--color-white)] placeholder-[var(--color-muted-slate)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]"
                />
              </div>

              <div>
                <label htmlFor="consult-service" className="block text-[11px] font-semibold uppercase tracking-wider text-[var(--color-white)] mb-1">
                  Interest / Requirement
                </label>
                <input
                  id="consult-service"
                  name="service"
                  type="text"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  placeholder="e.g. Google Ads, SEO, Brand Identity"
                  className="w-full bg-[var(--color-dark-text)] border border-[var(--color-border)] rounded-xl px-4 py-2.5 text-xs text-[var(--color-white)] placeholder-[var(--color-muted-slate)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]"
                />
              </div>

              <button
                type="submit"
                aria-label="Prepare Audit Email"
                className="group/btn relative w-full inline-flex items-center justify-center text-[var(--color-dark-text)] font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xs uppercase tracking-wider py-3.5 transition-all filter drop-shadow-[0_4px_12px_rgba(248,195,17,0.3)] active:scale-95 cursor-pointer mt-2"
              >
                <BtnShape fill="#F8C311" />
                <span className="relative z-10">PREPARE AUDIT EMAIL</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

// Legal Modal (Terms / Privacy)
export const LegalModal: React.FC<{
  type: 'terms' | 'privacy' | null;
  onClose: () => void;
}> = ({ type, onClose }) => {
  const dialogRef = useModalAccessibility(Boolean(type), onClose);
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[var(--color-navy)]/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="legal-dialog-title" tabIndex={-1} className="bg-[var(--color-navy)] border border-[var(--color-border)] rounded-3xl max-w-xl w-full p-6 sm:p-8 relative max-h-[85vh] overflow-y-auto shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-[var(--color-dark-text)] text-[var(--color-white)] hover:text-[var(--color-white)] border border-[var(--color-border)] cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 id="legal-dialog-title" className="font-['Marcellus',serif] text-2xl text-[var(--color-white)] uppercase tracking-wide mb-4">
          {type === 'terms' ? 'Terms & Conditions' : 'Privacy Policy'}
        </h3>

        <div className="space-y-4 text-xs text-[var(--color-white)] leading-relaxed mb-6 font-['Plus_Jakarta_Sans',sans-serif]">
          {type === 'terms' ? (
            <p>
              Formal terms are not published on this website. Please contact Brand Yatra to request
              the applicable terms before beginning an engagement.
            </p>
          ) : (
            <p>
              Website inquiry forms prepare an email draft locally and do not send data to a Brand
              Yatra server. Your inquiry is shared only if you choose to send it from your email app.
              For privacy questions, contact{' '}
              <a className="text-[var(--color-primary)] underline" href="mailto:hello@brandyatra.com">
                hello@brandyatra.com
              </a>.
            </p>
          )}
        </div>

        <button
          onClick={onClose}
          className="w-full bg-[var(--color-dark-text)] hover:bg-[var(--color-primary)] hover:text-[var(--color-dark-text)] text-[var(--color-white)] border border-[var(--color-border)] font-['Plus_Jakarta_Sans',sans-serif] text-xs font-bold uppercase tracking-wider py-2.5 rounded-lg transition-colors cursor-pointer"
        >
          Close Document
        </button>
      </div>
    </div>
  );
};
