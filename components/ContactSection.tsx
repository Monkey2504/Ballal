import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Send, ShieldCheck, AlertTriangle } from 'lucide-react';
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
    setFormData({
      ...formData,
      [e.target.name]: value
    });
    // Clear error
    if (errors[e.target.name]) {
        const newErrors = {...errors};
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

    // Construct Mailto
    const subject = formData.subject || t.email_subject_contact;
    const body = `De: ${formData.name} (${formData.email})\n\nMessage:\n${formData.message}`;
    window.location.href = `mailto:admin@ballal.be?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  };

  if (submitted) {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
             <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md border-t-4 border-[#BE0000]">
                 <div className="mx-auto h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                     <Mail className="h-8 w-8 text-green-600" />
                 </div>
                 <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.form_success_title}</h2>
                 <p className="text-gray-600 mb-6">{t.form_success_desc}</p>
                 <button 
                    onClick={() => setSubmitted(false)}
                    className="text-[#BE0000] font-bold hover:underline"
                 >
                    Envoyer un autre message
                 </button>
             </div>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF8] py-12 sm:py-16" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-10"
        >
            <div className="inline-flex items-center justify-center p-3 bg-[#BE0000]/10 rounded-full mb-4">
                <MessageSquare className="h-6 w-6 text-[#BE0000]" aria-hidden="true" />
            </div>
            <h1 className="text-3xl font-black text-[#0F0F0F] mb-2">{t.contact_form_title}</h1>
            <p className="text-[#6B6B6B] font-medium text-sm sm:text-base">{t.contact_form_subtitle}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="bg-white rounded-[20px] shadow-[0_8px_32px_rgba(0,0,0,0.08)] overflow-hidden border border-[#E8E8E6]"
        >
            
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 flex items-start">
                <AlertTriangle className="h-5 w-5 text-amber-600 mr-3 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-amber-800 font-medium">{t.form_demo_warning}</p>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">
                        {t.form_name_label} <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full h-12 px-4 rounded-[8px] border text-sm ${errors.name ? 'border-[#BE0000] bg-[#BE0000]/5' : 'border-[#E8E8E6]'} focus:ring-2 focus:ring-[#BE0000] focus:border-[#BE0000] outline-none transition-colors`}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1 font-bold">{errors.name}</p>}
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
                        {t.form_email_label} <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="exemple@email.com"
                        className={`w-full h-12 px-4 rounded-[8px] border text-sm ${errors.email ? 'border-[#BE0000] bg-[#BE0000]/5' : 'border-[#E8E8E6]'} focus:ring-2 focus:ring-[#BE0000] focus:border-[#BE0000] outline-none transition-colors`}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1 font-bold">{errors.email}</p>}
                </div>

                <div>
                    <label htmlFor="subject" className="block text-sm font-bold text-gray-700 mb-2">
                        {t.contact_subject_label}
                    </label>
                    <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full h-12 px-4 rounded-[8px] border border-[#E8E8E6] focus:ring-2 focus:ring-[#BE0000] focus:border-[#BE0000] outline-none bg-white text-sm transition-colors"
                    >
                        <option value="">-- Sélectionner --</option>
                        <option value={t.contact_subject_general}>{t.contact_subject_general}</option>
                        <option value={t.contact_subject_partnership}>{t.contact_subject_partnership}</option>
                        <option value={t.contact_subject_support}>{t.contact_subject_support}</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-2">
                        {t.form_message_label} <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-[8px] border text-sm ${errors.message ? 'border-[#BE0000] bg-[#BE0000]/5' : 'border-[#E8E8E6]'} focus:ring-2 focus:ring-[#BE0000] focus:border-[#BE0000] outline-none transition-colors resize-none`}
                    ></textarea>
                    {errors.message && <p className="text-red-500 text-xs mt-1 font-bold">{errors.message}</p>}
                </div>

                {/* GDPR Consent */}
                <div className={`p-4 rounded-xl border ${errors.consent ? 'border-red-300 bg-red-50' : 'border-gray-100 bg-gray-50'}`}>
                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input
                                id="consent"
                                name="consent"
                                type="checkbox"
                                checked={formData.consent}
                                onChange={handleChange}
                                className="h-5 w-5 rounded border-gray-300 text-[#BE0000] focus:ring-[#BE0000]"
                            />
                        </div>
                        <div className="ml-3 text-sm">
                            <label htmlFor="consent" className="font-medium text-gray-700 block">
                                {t.form_consent_gdpr} <span className="text-red-500">*</span>
                            </label>
                            <p className="text-xs text-gray-500 mt-1 flex items-center">
                                <ShieldCheck className="h-3 w-3 mr-1" />
                                <a href="#privacy" className="underline hover:text-black">{t.form_privacy_link}</a>
                            </p>
                        </div>
                    </div>
                    {errors.consent && <p className="text-red-500 text-xs mt-2 font-bold ml-8">{errors.consent}</p>}
                </div>

                <button
                    type="submit"
                    className="w-full h-12 bg-[#BE0000] text-white font-black rounded-[8px] hover:bg-[#9B0000] transition-colors flex items-center justify-center gap-2 text-[11px] uppercase tracking-widest"
                >
                    <Send className="h-4 w-4" aria-hidden="true" />
                    {t.contact_send_btn}
                </button>
            </form>
        </motion.div>

      </div>
    </div>
  );
};

export default ContactSection;