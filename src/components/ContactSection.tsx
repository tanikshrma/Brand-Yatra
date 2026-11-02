import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle2, AlertCircle, Mail, MapPin, Clock } from 'lucide-react';
import { SERVICES_LIST } from '../data/agencyData';
import { BtnShape } from './BtnShape';
import { WordRevealHeading } from './WordRevealHeading';

interface ContactSectionProps {
  onSuccessSubmit: (data: { name: string; email: string }) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onSuccessSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: 'Full Omnichannel Growth Package',
    details: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      onSuccessSubmit({ name: formData.name, email: formData.email });
    }, 600);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 lg:py-32 bg-[#0E2234] text-[#FFFFFF] relative border-t border-[#E5E9ED]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Direct Agency Contact & Credibility */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-clamp-label font-['Manrope',sans-serif] tracking-widest text-[#F8C311] uppercase font-semibold mb-3">
                <span>04</span>
                <span aria-hidden="true">·</span>
                <span>Direct Contact</span>
              </div>

              <WordRevealHeading
                as="h2"
                className="font-['Marcellus',serif] text-clamp-heading text-white font-normal tracking-tight leading-tight mb-6"
              >
                Let's Build Something <span className="text-[#F8C311]">Extraordinary.</span>
              </WordRevealHeading>

              <p className="font-['Inter',sans-serif] text-clamp-body text-[#D1D1D6] leading-relaxed mb-8 sm:mb-10">
                Ready to accelerate your brand authority and acquisition unit economics? Share your goals with our strategists to receive a custom proposal.
              </p>

              {/* Direct Info List */}
              <div className="space-y-5 sm:space-y-6 font-['Inter',sans-serif] text-sm text-[#D1D1D6]">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#0a1824] border border-white/10 flex items-center justify-center text-[#F8C311] shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-clamp-label uppercase tracking-wider text-[#929292] font-semibold">Direct Email</div>
                    <a href="mailto:hello@brandyatra.com" className="text-white font-bold hover:text-[#F8C311] transition-colors">
                      hello@brandyatra.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#0a1824] border border-white/10 flex items-center justify-center text-[#F8C311] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-clamp-label uppercase tracking-wider text-[#929292] font-semibold">Headquarters</div>
                    <div className="text-white font-bold text-sm">
                      Bengaluru, India · Global Remote Desk
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#0a1824] border border-white/10 flex items-center justify-center text-[#F8C311] shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-clamp-label uppercase tracking-wider text-[#929292] font-semibold">Desk Operating Hours</div>
                    <div className="text-white font-bold text-sm">
                      Mon – Sat: 09:00 – 19:00 IST
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Minimalist Inquiry Form */}
          <div className="lg:col-span-7 bg-[#0a1824] border border-white/10 p-6 sm:p-8 lg:p-10">
            {submitted ? (
              <div className="py-10 sm:py-12 text-center animate-in fade-in duration-300">
                <div className="w-16 h-16 bg-[#F8C311]/15 border border-[#F8C311]/40 text-[#F8C311] rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h3 className="font-['Marcellus',serif] text-xl sm:text-2xl font-bold text-white mb-2">
                  Inquiry Transmitted Successfully
                </h3>
                <p className="font-['Inter',sans-serif] text-clamp-body-sm text-[#D1D1D6] max-w-md mx-auto mb-6 leading-relaxed">
                  Thank you, <strong className="text-white">{formData.name}</strong> from{' '}
                  <strong className="text-white">{formData.company}</strong>. Our strategists will review your brief and respond within 24 business hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: '',
                      email: '',
                      phone: '',
                      company: '',
                      service: 'Full Omnichannel Growth Package',
                      details: '',
                    });
                  }}
                  className="font-['Inter',sans-serif] text-xs font-bold text-[#F8C311] hover:underline uppercase tracking-wider cursor-pointer py-2 px-4"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4 font-['Inter',sans-serif]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-clamp-label font-semibold uppercase tracking-wider text-[#D1D1D6] mb-1.5">
                      Your Name <span className="text-[#F8C311]">*</span>
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
                      className={`w-full bg-[#0E2234] border ${
                        errors.name ? 'border-red-400' : 'border-white/15'
                      } rounded-xl px-4 py-3 text-sm text-white placeholder-[#777777] focus:outline-none focus:border-[#F8C311] transition-colors`}
                    />
                    {errors.name && (
                      <span role="alert" className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.name}
                      </span>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-clamp-label font-semibold uppercase tracking-wider text-[#D1D1D6] mb-1.5">
                      Business Email <span className="text-[#F8C311]">*</span>
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
                      className={`w-full bg-[#0E2234] border ${
                        errors.email ? 'border-red-400' : 'border-white/15'
                      } rounded-xl px-4 py-3 text-sm text-white placeholder-[#777777] focus:outline-none focus:border-[#F8C311] transition-colors`}
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
                    <label htmlFor="contact-phone" className="block text-clamp-label font-semibold uppercase tracking-wider text-[#D1D1D6] mb-1.5">
                      Phone Number <span className="text-[#F8C311]">*</span>
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
                      className={`w-full bg-[#0E2234] border ${
                        errors.phone ? 'border-red-400' : 'border-white/15'
                      } rounded-xl px-4 py-3 text-sm text-white placeholder-[#777777] focus:outline-none focus:border-[#F8C311] transition-colors`}
                    />
                    {errors.phone && (
                      <span role="alert" className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.phone}
                      </span>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contact-company" className="block text-clamp-label font-semibold uppercase tracking-wider text-[#D1D1D6] mb-1.5">
                      Company Name <span className="text-[#F8C311]">*</span>
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
                      className={`w-full bg-[#0E2234] border ${
                        errors.company ? 'border-red-400' : 'border-white/15'
                      } rounded-xl px-4 py-3 text-sm text-white placeholder-[#777777] focus:outline-none focus:border-[#F8C311] transition-colors`}
                    />
                    {errors.company && (
                      <span role="alert" className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.company}
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-service" className="block text-clamp-label font-semibold uppercase tracking-wider text-[#D1D1D6] mb-1.5">
                    Primary Service Focus
                  </label>
                  <select
                    id="contact-service"
                    name="service"
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full bg-[#0E2234] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#F8C311] transition-colors cursor-pointer"
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
                  <label htmlFor="contact-details" className="block text-clamp-label font-semibold uppercase tracking-wider text-[#D1D1D6] mb-1.5">
                    Project Brief &amp; Targets
                  </label>
                  <textarea
                    id="contact-details"
                    name="details"
                    rows={3}
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    placeholder="Tell us about your target audience, growth goals, and timeline..."
                    className="w-full bg-[#0E2234] border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-[#777777] focus:outline-none focus:border-[#F8C311] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  aria-label="Send Inquiry Brief"
                  className="group relative w-full inline-flex items-center justify-center gap-2 text-[#0E2234] font-['Inter',sans-serif] font-extrabold text-xs sm:text-sm uppercase tracking-wider py-4 transition-all duration-300 filter drop-shadow-[0_8px_20px_rgba(248,195,17,0.3)] hover:-translate-y-1 active:translate-y-0 cursor-pointer mt-2 disabled:opacity-75"
                >
                  <BtnShape fill="#F8C311" />
                  <span className="relative z-10">{isSubmitting ? 'Transmitting...' : 'Send Inquiry Brief'}</span>
                  <ArrowUpRight className="relative z-10 w-4 h-4 stroke-[2.8] text-[#0E2234]" />
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
