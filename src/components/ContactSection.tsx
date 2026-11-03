import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle2, AlertCircle, Mail, MapPin, Phone } from 'lucide-react';
import { AGENCY_INFO, SERVICES_LIST } from '../data/agencyData';
import { BtnShape } from './BtnShape';
import { WordRevealHeading } from './WordRevealHeading';
import { buildContactMailto } from '../utils/contact';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: 'Full Omnichannel Growth Package',
    details: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [emailDraftUrl, setEmailDraftUrl] = useState('');

  const validate = () => {
    const err: Record<string, string> = {};
    if (!formData.name.trim()) err.name = 'Full name is required';
    if (!formData.email.trim()) {
      err.email = 'Business email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      err.email = 'Please provide a valid business email';
    }
    if (!formData.phone.trim()) {
      err.phone = 'Phone number is required';
    }
    if (!formData.company.trim()) {
      err.company = 'Company name is required';
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setEmailDraftUrl(buildContactMailto('Brand Yatra website inquiry', {
      Name: formData.name,
      'Business email': formData.email,
      Phone: formData.phone,
      Company: formData.company,
      'Primary service focus': formData.service,
      'Project brief': formData.details,
    }));
    setSubmitted(true);
  };

  return (
    <section id="contact" className="by-hero-surface relative py-16 text-[var(--color-white)] sm:py-20 lg:py-24">
      <div className="site-gutter">
        
        <div className="grid grid-cols-1 items-start gap-8 sm:gap-12 lg:grid-cols-12 lg:gap-16">
          
          {/* Left Column: Direct Agency Contact & Credibility */}
          <div className="flex flex-col justify-between lg:order-2 lg:col-span-5 lg:col-start-8">
            <div>
              <div className="flex items-center gap-2 text-clamp-label font-['Manrope',sans-serif] tracking-widest text-[var(--color-primary)] uppercase font-semibold mb-3">
                <span>04</span>
                <span aria-hidden="true">·</span>
                <span>Direct Contact</span>
              </div>

              <WordRevealHeading
                as="h2"
                className="font-['Marcellus',serif] text-clamp-heading text-[var(--color-white)] font-normal tracking-tight leading-tight mb-6"
              >
                Let's Build Something <span className="text-[var(--color-primary)]">Extraordinary.</span>
              </WordRevealHeading>

              <p className="font-['Inter',sans-serif] text-clamp-body text-[var(--color-white)] leading-relaxed mb-8 sm:mb-10">
                Ready to accelerate your brand authority and acquisition unit economics? Share your goals with our strategists to receive a custom proposal.
              </p>

              {/* Direct Info List */}
              <div className="space-y-5 sm:space-y-6 font-['Inter',sans-serif] text-sm text-[var(--color-white)]">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[var(--color-navy)] border border-white/10 flex items-center justify-center text-[var(--color-primary)] shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-clamp-label uppercase tracking-wider text-white/60 font-semibold">Direct Email</div>
                    <a href={`mailto:${AGENCY_INFO.email}`} className="text-[var(--color-white)] font-bold hover:text-[var(--color-primary)] transition-colors">
                      {AGENCY_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[var(--color-navy)] border border-white/10 flex items-center justify-center text-[var(--color-primary)] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-clamp-label uppercase tracking-wider text-white/60 font-semibold">Headquarters</div>
                    <div className="text-[var(--color-white)] font-bold text-sm">
                      {AGENCY_INFO.address.city}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[var(--color-navy)] border border-white/10 flex items-center justify-center text-[var(--color-primary)] shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-clamp-label uppercase tracking-wider text-white/60 font-semibold">Phone</div>
                    <a href={`tel:${AGENCY_INFO.phone.replace(/\s+/g, '')}`} className="text-[var(--color-white)] font-bold text-sm hover:text-[var(--color-primary)] transition-colors">
                      {AGENCY_INFO.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Minimalist Inquiry Form */}
          <div className="rounded-2xl border border-[var(--color-primary)]/35 bg-[var(--color-navy)] p-6 sm:p-8 lg:order-1 lg:col-span-7 lg:p-10">
            {submitted ? (
              <div role="status" aria-live="polite" className="py-10 sm:py-12 text-center animate-in fade-in duration-300">
                <div className="w-16 h-16 bg-[var(--color-primary)]/15 border border-[var(--color-primary)]/40 text-[var(--color-primary)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h3 className="font-['Marcellus',serif] text-xl sm:text-2xl font-bold text-[var(--color-white)] mb-2">
                  Your inquiry is ready to email
                </h3>
                <p className="font-['Inter',sans-serif] text-clamp-body-sm text-[var(--color-white)] max-w-md mx-auto mb-6 leading-relaxed">
                  Thank you, <strong className="text-[var(--color-white)]">{formData.name}</strong>. This form does not send data to a server. Open the prepared draft in your email app and send it to contact Brand Yatra.
                </p>
                <a
                  href={emailDraftUrl}
                  className="inline-flex items-center justify-center rounded-full bg-[var(--color-primary)] px-6 py-3 text-xs font-bold uppercase tracking-wider text-[var(--color-navy)] transition-colors hover:bg-white"
                >
                  Open email draft
                </a>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setEmailDraftUrl('');
                    setFormData({
                      name: '',
                      email: '',
                      phone: '',
                      company: '',
                      service: 'Full Omnichannel Growth Package',
                      details: '',
                    });
                  }}
                  className="font-['Inter',sans-serif] text-xs font-bold text-[var(--color-primary)] hover:underline uppercase tracking-wider cursor-pointer py-2 px-4"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4 font-['Inter',sans-serif]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-clamp-label font-semibold uppercase tracking-wider text-[var(--color-white)] mb-1.5">
                      Your Name <span className="text-[var(--color-primary)]">*</span>
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: '' });
                      }}
                      placeholder="Maya Sharma"
                      className={`w-full bg-[var(--color-navy)] border ${
                        errors.name ? 'border-red-400' : 'border-white/15'
                      } rounded-xl px-4 py-3 text-sm text-[var(--color-white)] placeholder-[var(--color-muted-slate)] focus:outline-none focus:border-[var(--color-primary)] transition-colors`}
                    />
                    {errors.name && (
                      <span role="alert" className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.name}
                      </span>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-clamp-label font-semibold uppercase tracking-wider text-[var(--color-white)] mb-1.5">
                      Business Email <span className="text-[var(--color-primary)]">*</span>
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: '' });
                      }}
                      placeholder="maya@enterprise.com"
                      className={`w-full bg-[var(--color-navy)] border ${
                        errors.email ? 'border-red-400' : 'border-white/15'
                      } rounded-xl px-4 py-3 text-sm text-[var(--color-white)] placeholder-[var(--color-muted-slate)] focus:outline-none focus:border-[var(--color-primary)] transition-colors`}
                    />
                    {errors.email && (
                      <span role="alert" className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-phone" className="block text-clamp-label font-semibold uppercase tracking-wider text-[var(--color-white)] mb-1.5">
                      Phone Number <span className="text-[var(--color-primary)]">*</span>
                    </label>
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData({ ...formData, phone: e.target.value });
                        if (errors.phone) setErrors({ ...errors, phone: '' });
                      }}
                      placeholder="+91 98765 43210"
                      className={`w-full bg-[var(--color-navy)] border ${
                        errors.phone ? 'border-red-400' : 'border-white/15'
                      } rounded-xl px-4 py-3 text-sm text-[var(--color-white)] placeholder-[var(--color-muted-slate)] focus:outline-none focus:border-[var(--color-primary)] transition-colors`}
                    />
                    {errors.phone && (
                      <span role="alert" className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.phone}
                      </span>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contact-company" className="block text-clamp-label font-semibold uppercase tracking-wider text-[var(--color-white)] mb-1.5">
                      Company Name <span className="text-[var(--color-primary)]">*</span>
                    </label>
                    <input
                      id="contact-company"
                      name="company"
                      type="text"
                      autoComplete="organization"
                      required
                      value={formData.company}
                      onChange={(e) => {
                        setFormData({ ...formData, company: e.target.value });
                        if (errors.company) setErrors({ ...errors, company: '' });
                      }}
                      placeholder="Horizon Labs"
                      className={`w-full bg-[var(--color-navy)] border ${
                        errors.company ? 'border-red-400' : 'border-white/15'
                      } rounded-xl px-4 py-3 text-sm text-[var(--color-white)] placeholder-[var(--color-muted-slate)] focus:outline-none focus:border-[var(--color-primary)] transition-colors`}
                    />
                    {errors.company && (
                      <span role="alert" className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.company}
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-service" className="block text-clamp-label font-semibold uppercase tracking-wider text-[var(--color-white)] mb-1.5">
                    Primary Service Focus
                  </label>
                  <select
                    id="contact-service"
                    name="service"
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full bg-[var(--color-navy)] border border-white/15 rounded-xl px-4 py-3 text-sm text-[var(--color-white)] focus:outline-none focus:border-[var(--color-primary)] transition-colors cursor-pointer"
                  >
                    <option value="Full Omnichannel Growth Package">Full Omnichannel Growth Package</option>
                    {SERVICES_LIST.map((s) => (
                      <option key={s.id} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-details" className="block text-clamp-label font-semibold uppercase tracking-wider text-[var(--color-white)] mb-1.5">
                    Project Brief &amp; Targets
                  </label>
                  <textarea
                    id="contact-details"
                    name="details"
                    rows={3}
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    placeholder="Tell us about your target audience, growth goals, and timeline..."
                    className="w-full bg-[var(--color-navy)] border border-white/15 rounded-xl px-4 py-3 text-sm text-[var(--color-white)] placeholder-[var(--color-muted-slate)] focus:outline-none focus:border-[var(--color-primary)] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  aria-label="Prepare Inquiry Email"
                  className="group relative w-full inline-flex items-center justify-center gap-2 text-[var(--color-navy)] font-['Inter',sans-serif] font-extrabold text-xs sm:text-sm uppercase tracking-wider py-4 transition-all duration-300 filter drop-shadow-[0_8px_20px_rgba(248,195,17,0.3)] hover:-translate-y-1 active:translate-y-0 cursor-pointer mt-2"
                >
                  <BtnShape fill="#F8C311" />
                  <span className="relative z-10">Prepare Inquiry Email</span>
                  <ArrowUpRight className="relative z-10 w-4 h-4 stroke-[2.8] text-[var(--color-navy)]" />
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
