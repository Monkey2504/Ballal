import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, ShieldCheck, AlertTriangle } from 'lucide-react';
import { LanguageCode } from '../types.ts';
import { translations } from '../utils/translations.ts';
import { isValidEmail } from '../utils/validation.ts';

interface ContactSectionProps {
  language: LanguageCode;
}

const ContactSection: React.FC<ContactSectionProps> = ({ language }) => {
  const t = translations[language] || translations['fr'];
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    consent: false
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
    if (errors[e.target.name]) {
      const newErrors = { ...errors };
      delete newErrors[e.target.name];
      setErrors(newErrors);
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = t.form_error_required;
    if (!formData.email.trim() || !isValidEmail(formData.email)) newErrors.email = t.form_error_email;
    if (!formData.message.trim()) newErrors.message = t.form_error_required;
    if (!formData.consent) newErrors.consent = t.form_error_consent;
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const subject = formData.subject || t.email_subject_contact;
    const body = `De: ${formData.name} (${formData.email})\n\nMessage:\n${formData.message}`;
    window.location.href = `mailto:admin@ballal.be?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-ivory paper-grain flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-[4px] shadow-soft-lg text-center max-w-md border border-ink/10 border-t-4 border-t-guinea-red relative z-10">
          <div className="mx-auto h-16 w-16 bg-guinea-green/10 rounded-[4px] flex items-center justify-center mb-4">
            <Mail className="h-8 w-8 text-guinea-green" aria-hidden="true" />
          </div>
          <h2 className="font-serif font-black text-2xl text-ink mb-2">{t.form_success_title}</h2>
          <p className="text-ink-muted mb-6 leading-relaxed">{t.form_success_desc}</p>
          <button onClick={() => setSubmitted(false)} className="font-mono text-[12px] font-bold uppercase tracking-[0.08em] text-guinea-red hover:text-guinea-red-dark transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-guinea-red/40 focus-visible:ring-offset-2 rounded-[3px]">
            Envoyer un autre message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ivory paper-grain py-16" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="flag-line w-8 shrink-0" aria-hidden="true">
              <span /><span /><span />
            </span>
            <p className="dateline text-[11px] text-guinea-red">Nous écrire</p>
          </div>
          <h1 className="font-serif font-black text-[2rem] sm:text-[2.75rem] text-ink leading-[1.02] tracking-tight">{t.contact_form_title}</h1>
          <p className="mt-5 text-body-lg text-ink-muted leading-relaxed max-w-xl">{t.contact_form_subtitle}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="bg-white rounded-[4px] shadow-soft-lg overflow-hidden border border-ink/10"
        >
          <div className="bg-guinea-yellow/15 border-l-4 border-guinea-yellow p-4 flex items-start">
            <AlertTriangle className="h-5 w-5 text-ink mr-3 flex-shrink-0 mt-0.5" aria-hidden="true" />
            <p className="text-sm text-ink-muted">{t.form_demo_warning}</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div>
              <label htmlFor="name" className="dateline block text-[10px] text-ink mb-2">
                {t.form_name_label} <span className="text-guinea-red">*</span>
              </label>
              <input
                type="text" id="name" name="name" value={formData.name} onChange={handleChange}
                className={`w-full px-4 py-3 rounded-[3px] border bg-white ${errors.name ? 'border-guinea-red bg-guinea-red/5' : 'border-border-subtle'} focus:ring-2 focus:ring-guinea-red/40 focus:border-guinea-red outline-none transition-colors`}
              />
              {errors.name && <p className="text-guinea-red text-xs mt-1 font-bold">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="dateline block text-[10px] text-ink mb-2">
                {t.form_email_label} <span className="text-guinea-red">*</span>
              </label>
              <input
                type="email" id="email" name="email" value={formData.email} onChange={handleChange}
                placeholder="exemple@email.com"
                className={`w-full px-4 py-3 rounded-[3px] border bg-white ${errors.email ? 'border-guinea-red bg-guinea-red/5' : 'border-border-subtle'} focus:ring-2 focus:ring-guinea-red/40 focus:border-guinea-red outline-none transition-colors`}
              />
              {errors.email && <p className="text-guinea-red text-xs mt-1 font-bold">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="subject" className="dateline block text-[10px] text-ink mb-2">
                {t.contact_subject_label}
              </label>
              <select
                id="subject" name="subject" value={formData.subject} onChange={handleChange}
                className="w-full px-4 py-3 rounded-[3px] border border-border-subtle focus:ring-2 focus:ring-guinea-red/40 focus:border-guinea-red outline-none bg-white transition-colors"
              >
                <option value="">-- Sélectionner --</option>
                <option value={t.contact_subject_general}>{t.contact_subject_general}</option>
                <option value={t.contact_subject_partnership}>{t.contact_subject_partnership}</option>
                <option value={t.contact_subject_support}>{t.contact_subject_support}</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="dateline block text-[10px] text-ink mb-2">
                {t.form_message_label} <span className="text-guinea-red">*</span>
              </label>
              <textarea
                id="message" name="message" rows={5} value={formData.message} onChange={handleChange}
                className={`w-full px-4 py-3 rounded-[3px] border bg-white ${errors.message ? 'border-guinea-red bg-guinea-red/5' : 'border-border-subtle'} focus:ring-2 focus:ring-guinea-red/40 focus:border-guinea-red outline-none transition-colors resize-none`}
              />
              {errors.message && <p className="text-guinea-red text-xs mt-1 font-bold">{errors.message}</p>}
            </div>

            <div className={`p-4 rounded-[4px] border ${errors.consent ? 'border-guinea-red/40 bg-guinea-red/5' : 'border-border-subtle bg-paper'}`}>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="consent" name="consent" type="checkbox"
                    checked={formData.consent} onChange={handleChange}
                    className="h-5 w-5 rounded-[3px] border-border-subtle text-guinea-red focus:ring-guinea-red"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="consent" className="text-ink block">
                    {t.form_consent_gdpr} <span className="text-guinea-red">*</span>
                  </label>
                  <p className="text-xs text-ink-muted mt-1 flex items-center">
                    <ShieldCheck className="h-3 w-3 mr-1" aria-hidden="true" />
                    <a href="#privacy" className="underline hover:text-ink">{t.form_privacy_link}</a>
                  </p>
                </div>
              </div>
              {errors.consent && <p className="text-guinea-red text-xs mt-2 font-bold ml-8">{errors.consent}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-ink text-ivory font-mono text-[12px] font-bold uppercase tracking-[0.08em] py-4 rounded-[3px] hover:bg-guinea-red transition-colors duration-200 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-guinea-red/50 focus-visible:ring-offset-2"
            >
              <Send className="mr-2 h-5 w-5" aria-hidden="true" />
              {t.contact_send_btn}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactSection;
