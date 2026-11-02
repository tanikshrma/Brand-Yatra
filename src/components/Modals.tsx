import React, { useState } from 'react';
import { X, CheckCircle2, ArrowUpRight, Check, Sparkles } from 'lucide-react';
import { ServiceItem, PortfolioItem, ArticleItem } from '../data/agencyData';
import { BtnShape } from './BtnShape';

// Service Explorer Modal
export const ServiceModal: React.FC<{
  service: ServiceItem | null;
  onClose: () => void;
  onBookService: (serviceName: string) => void;
}> = ({ service, onClose, onBookService }) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#222222] border border-[#333333] rounded-3xl max-w-xl w-full p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-[#171717] text-[#D1D1D6] hover:text-white border border-[#333333] cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#F8C311] mb-2 font-['Plus_Jakarta_Sans',sans-serif]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{service.category}</span>
        </div>

        <h3 className="font-['Marcellus',serif] text-2xl sm:text-3xl text-[#FFFFFF] uppercase tracking-wide mb-4">
          {service.title}
        </h3>

        <p className="font-['Plus_Jakarta_Sans',sans-serif] text-sm text-[#D1D1D6] leading-relaxed mb-6 font-normal">
          {service.fullDesc}
        </p>

        <div className="mb-8">
          <h4 className="font-['Marcellus',serif] text-sm uppercase tracking-wider text-[#FFFFFF] mb-3 font-semibold">
            Core Agency Deliverables
          </h4>
          <ul className="space-y-2.5 font-['Plus_Jakarta_Sans',sans-serif]">
            {service.deliverables.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-[#D1D1D6]">
                <div className="w-4 h-4 rounded-full bg-[#F8C311]/20 border border-[#F8C311] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-2.5 h-2.5 text-[#F8C311]" />
                </div>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-3 pt-6 border-t border-[#333333]">
          <button
            onClick={() => {
              onClose();
              onBookService(service.title);
            }}
            className="group/btn relative flex-1 inline-flex items-center justify-center gap-2 text-[#0E2234] font-['Plus_Jakarta_Sans',sans-serif] text-xs font-bold uppercase tracking-wider py-3.5 transition-all filter drop-shadow-[0_4px_12px_rgba(248,195,17,0.3)] active:scale-95 cursor-pointer"
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
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#222222] border border-[#333333] rounded-3xl max-w-2xl w-full p-6 sm:p-10 relative max-h-[90vh] overflow-y-auto shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-[#171717] text-[#D1D1D6] hover:text-white border border-[#333333] cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#F8C311] mb-2 font-['Plus_Jakarta_Sans',sans-serif]">
          <span>{project.client}</span>
          <span className="text-[#8E8E93]">·</span>
          <span className="text-[#D1D1D6]">{project.service}</span>
        </div>

        <h3 className="font-['Marcellus',serif] text-2xl sm:text-3xl text-[#FFFFFF] uppercase tracking-wide mb-4 leading-snug">
          {project.headline}
        </h3>

        <p className="font-['Plus_Jakarta_Sans',sans-serif] text-sm text-[#D1D1D6] leading-relaxed mb-6 font-normal">
          {project.description}
        </p>

        {/* Audited Metrics */}
        <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-[#171717] border border-[#333333] mb-6">
          {project.metrics.map((m, idx) => (
            <div key={idx} className="text-center">
              <div className="font-['Marcellus',serif] text-2xl sm:text-3xl text-[#F8C311]">
                {m.value}
              </div>
              <div className="text-[10px] uppercase tracking-wider text-[#D1D1D6] mt-0.5 font-['Plus_Jakarta_Sans',sans-serif]">
                {m.label}
              </div>
            </div>
          ))}
        </div>

        <div className="mb-6">
          <h4 className="font-['Marcellus',serif] text-sm uppercase tracking-wider text-[#FFFFFF] mb-2 font-semibold">
            Execution Scope
          </h4>
          <div className="flex flex-wrap gap-2 font-['Plus_Jakarta_Sans',sans-serif]">
            {project.tags.map((t, i) => (
              <span
                key={i}
                className="text-[11px] font-mono uppercase bg-[#171717] border border-[#333333] px-3 py-1 rounded text-[#FFFFFF]"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="pt-6 border-t border-[#333333] flex items-center gap-3">
          <button
            onClick={() => {
              onClose();
              onBookProject(project.client);
            }}
            className="group/btn relative w-full inline-flex items-center justify-center gap-2 text-[#171717] font-['Plus_Jakarta_Sans',sans-serif] text-xs font-bold uppercase tracking-wider py-3.5 transition-all filter drop-shadow-[0_4px_12px_rgba(248,195,17,0.3)] active:scale-95 cursor-pointer"
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
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#222222] border border-[#333333] rounded-3xl max-w-2xl w-full p-6 sm:p-10 relative max-h-[90vh] overflow-y-auto shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-[#171717] text-[#D1D1D6] hover:text-white border border-[#333333] cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#F8C311] mb-3 font-['Plus_Jakarta_Sans',sans-serif]">
          <span>{article.category}</span>
          <span className="text-[#8E8E93]">·</span>
          <span className="text-[#D1D1D6]">{article.readTime}</span>
          <span className="text-[#8E8E93]">·</span>
          <span className="text-[#D1D1D6]">{article.date}</span>
        </div>

        <h3 className="font-['Marcellus',serif] text-2xl sm:text-3xl text-[#FFFFFF] leading-snug mb-6">
          {article.title}
        </h3>

        {/* Highlight Callout */}
        <div className="bg-[#171717] border-l-4 border-[#F8C311] p-4 rounded-r-xl mb-6 text-xs sm:text-sm text-[#FFFFFF] italic font-['Plus_Jakarta_Sans',sans-serif]">
          <strong>Key Takeaway:</strong> {article.keyTakeaway}
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-[#D1D1D6] leading-relaxed mb-8 font-['Plus_Jakarta_Sans',sans-serif]">
          {article.content.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>

        <div className="pt-6 border-t border-[#333333] flex justify-end">
          <button
            onClick={onClose}
            className="bg-[#171717] hover:bg-[#F8C311] hover:text-[#171717] text-white border border-[#333333] hover:border-[#F8C311] font-['Plus_Jakarta_Sans',sans-serif] text-xs font-bold uppercase tracking-wider px-6 py-2.5 rounded-lg transition-all cursor-pointer"
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
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState(prefilledService || 'Brand Strategy & Growth');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#222222] border border-[#333333] rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-[#171717] text-[#D1D1D6] hover:text-white border border-[#333333] cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center font-['Plus_Jakarta_Sans',sans-serif]">
            <div className="w-14 h-14 bg-[#F8C311]/20 border border-[#F8C311] text-[#F8C311] rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-['Marcellus',serif] text-2xl text-white mb-2 uppercase">
              Consultation Requested!
            </h3>
            <p className="text-xs text-[#D1D1D6] mb-6">
              Our strategy directors will review your website and contact you within 24 hours.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="bg-[#F8C311] text-[#171717] text-xs font-bold uppercase tracking-wider px-6 py-2.5 rounded-lg cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#F8C311] mb-2 font-['Plus_Jakarta_Sans',sans-serif]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>DIRECT STRATEGY DESK</span>
            </div>
            <h3 className="font-['Marcellus',serif] text-2xl text-[#FFFFFF] uppercase tracking-wide mb-2">
              LET'S TALK ABOUT GROWTH
            </h3>
            <p className="font-['Plus_Jakarta_Sans',sans-serif] text-xs text-[#D1D1D6] mb-6">
              Schedule a 30-minute private growth audit with Brand Yatra senior leadership.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 font-['Plus_Jakarta_Sans',sans-serif]">
              <div>
                <label htmlFor="consult-name" className="block text-[11px] font-semibold uppercase tracking-wider text-[#D1D1D6] mb-1">
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
                  className="w-full bg-[#171717] border border-[#333333] rounded-xl px-4 py-2.5 text-xs text-white placeholder-[#8E8E93] focus:outline-none focus:border-[#F8C311] focus:ring-1 focus:ring-[#F8C311]"
                />
              </div>

              <div>
                <label htmlFor="consult-email" className="block text-[11px] font-semibold uppercase tracking-wider text-[#D1D1D6] mb-1">
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
                  className="w-full bg-[#171717] border border-[#333333] rounded-xl px-4 py-2.5 text-xs text-white placeholder-[#8E8E93] focus:outline-none focus:border-[#F8C311] focus:ring-1 focus:ring-[#F8C311]"
                />
              </div>

              <div>
                <label htmlFor="consult-phone" className="block text-[11px] font-semibold uppercase tracking-wider text-[#D1D1D6] mb-1">
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
                  className="w-full bg-[#171717] border border-[#333333] rounded-xl px-4 py-2.5 text-xs text-white placeholder-[#8E8E93] focus:outline-none focus:border-[#F8C311] focus:ring-1 focus:ring-[#F8C311]"
                />
              </div>

              <div>
                <label htmlFor="consult-service" className="block text-[11px] font-semibold uppercase tracking-wider text-[#D1D1D6] mb-1">
                  Interest / Requirement
                </label>
                <input
                  id="consult-service"
                  name="service"
                  type="text"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  placeholder="e.g. Google Ads, SEO, Brand Identity"
                  className="w-full bg-[#171717] border border-[#333333] rounded-xl px-4 py-2.5 text-xs text-white placeholder-[#8E8E93] focus:outline-none focus:border-[#F8C311] focus:ring-1 focus:ring-[#F8C311]"
                />
              </div>

              <button
                type="submit"
                aria-label="Confirm Audit Request"
                className="group/btn relative w-full inline-flex items-center justify-center text-[#171717] font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xs uppercase tracking-wider py-3.5 transition-all filter drop-shadow-[0_4px_12px_rgba(248,195,17,0.3)] active:scale-95 cursor-pointer mt-2"
              >
                <BtnShape fill="#F8C311" />
                <span className="relative z-10">CONFIRM AUDIT REQUEST</span>
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
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#222222] border border-[#333333] rounded-3xl max-w-xl w-full p-6 sm:p-8 relative max-h-[85vh] overflow-y-auto shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-[#171717] text-[#D1D1D6] hover:text-white border border-[#333333] cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="font-['Marcellus',serif] text-2xl text-[#FFFFFF] uppercase tracking-wide mb-4">
          {type === 'terms' ? 'Terms & Conditions' : 'Privacy Policy'}
        </h3>

        <div className="space-y-4 text-xs text-[#D1D1D6] leading-relaxed mb-6 font-['Plus_Jakarta_Sans',sans-serif]">
          <p>
            Welcome to Brand Yatra. By accessing our services, websites, or engaging in strategic
            campaign audits, you agree to our standard terms of engagement.
          </p>
          <p>
            All campaign data, client analytical metrics, and proprietary strategy blueprints
            developed by Brand Yatra remain protected under strict non-disclosure obligations.
          </p>
          <p>
            We do not sell, rent, or distribute client contact credentials or business metrics
            to third-party advertising syndicates. Any information submitted via our forms is used
            solely to prepare tailored growth proposals and provide ongoing campaign reporting.
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-[#171717] hover:bg-[#F8C311] hover:text-[#171717] text-white border border-[#333333] font-['Plus_Jakarta_Sans',sans-serif] text-xs font-bold uppercase tracking-wider py-2.5 rounded-lg transition-colors cursor-pointer"
        >
          Close Document
        </button>
      </div>
    </div>
  );
};
