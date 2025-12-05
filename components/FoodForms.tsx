import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, Send, ShoppingBag, Users, AlertTriangle, ShieldCheck } from 'lucide-react';
import { LanguageCode } from '../types.ts';
import { translations, Translation } from '../utils/translations.ts';

// --- TYPES ---

interface FoodFormProps {
  language: LanguageCode;
  onBack: () => void;
}

interface ValidationErrors {
  [key: string]: string;
}

interface FormData {
  name: string;
  org: string;
  email: string;
  phone: string;
  type?: string;
  location?: string;
  quantity?: string;
  message: string;
  consent: boolean;
}

interface FormInputProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
}

// --- SHARED COMPONENTS (DRY & A11Y) ---

const FormInput = ({ 
  id, 
  label, 
  type = "text", 
  value, 
  onChange, 
  error, 
  placeholder,
  required = true
}: FormInputProps) => (
  <div>
    <label htmlFor={id} className="block text-sm font-bold text-gray-700 mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-3 rounded-xl border ${error ? 'border-red-500 bg-red-50' : 'border-gray-200'} focus:ring-2 focus:ring-current focus:border-transparent outline-none transition-all font-medium`}
      placeholder={placeholder}
      aria-invalid={!!error}
      aria-describedby={error ? `${id}-error` : undefined}
    />
    {error && (
      <p id={`${id}-error`} className="text-red-500 text-xs mt-1 font-bold animate-in slide-in-from-top-1">
        {error}
      </p>
    )}
  </div>
);

const FormTextArea = ({
  id,
  label,
  value,
  onChange,
  error
}: {
  id: string,
  label: string,
  value: string,
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void,
  error?: string
}) => (
  <div>
    <label htmlFor={id} className="block text-sm font-bold text-gray-700 mb-2">{label}</label>
    <textarea
      id={id}
      rows={4}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-current focus:border-transparent outline-none transition-all font-medium"
    />
  </div>
);

const SuccessView = ({ t, onBack }: { t: Translation, onBack: () => void }) => (
  <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4" role="alert">
    <div className="bg-white p-10 rounded-3xl shadow-2xl text-center max-w-md border-t-8 border-green-500 animate-in zoom-in-95">
      <div className="mx-auto h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
        <CheckCircle className="h-10 w-10 text-green-600" />
      </div>
      <h2 className="text-3xl font-black text-gray-900 mb-4">{t.form_success_title}</h2>
      <p className="text-gray-600 mb-8 text-lg">{t.form_success_desc}</p>
      <button 
        onClick={onBack}
        className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-black transition-colors focus:ring-4 focus:ring-gray-300"
      >
        {t.form_back_btn}
      </button>
    </div>
  </div>
);

// --- MAIN BASE COMPONENT ---

const BaseFoodForm = ({
  language,
  onBack,
  mode
}: {
  language: LanguageCode,
  onBack: () => void,
  mode: 'supplier' | 'network'
}) => {
  const t = translations[language];
  const [formData, setFormData] = useState<FormData>({
    name: '', org: '', email: '', phone: '', type: '', location: '', quantity: '', message: '', consent: false
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [imgError, setImgError] = useState(false);

  const isSupplier = mode === 'supplier';
  const themeColor = isSupplier ? 'text-[#CE1126]' : 'text-[#009460]';
  const ringColor = isSupplier ? 'focus:ring-[#CE1126]' : 'focus:ring-[#009460]';
  const btnBg = isSupplier ? 'bg-[#CE1126] hover:bg-red-700' : 'bg-[#009460] hover:bg-green-700';
  const Icon = isSupplier ? ShoppingBag : Users;

  const validate = (): boolean => {
    const newErrors: ValidationErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) newErrors.name = t.form_error_required;
    if (!formData.org.trim()) newErrors.org = t.form_error_required;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) newErrors.email = t.form_error_email;
    if (!formData.phone.trim()) newErrors.phone = t.form_error_required;
    if (isSupplier && !formData.type) newErrors.type = t.form_error_required;
    if (!isSupplier && !formData.location) newErrors.location = t.form_error_required;
    if (!formData.consent) newErrors.consent = t.form_error_consent;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // GENERATE MAILTO LINK (Secure fallback for no backend)
      const subject = isSupplier ? t.email_subject_food_donor : t.email_subject_food_network;
      const body = `
${t.form_name_label}: ${formData.name}
${t.form_org_label}: ${formData.org}
${t.form_email_label}: ${formData.email}
${t.form_phone_label}: ${formData.phone}
${isSupplier ? `${t.form_donation_type_label}: ${formData.type}` : `${t.form_location_label}: ${formData.location}`}
${isSupplier ? '' : `${t.form_quantity_label}: ${formData.quantity}`}
${t.form_message_label}: ${formData.message}
      `;
      
      window.location.href = `mailto:admin@ballal.be?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setSubmitted(true);
    }
  };

  const handleChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const newErrs = { ...prev };
        delete newErrs[field];
        return newErrs;
      });
    }
  };

  if (submitted) return <SuccessView t={t} onBack={onBack} />;

  const headerImg = isSupplier 
    ? "https://images.unsplash.com/photo-1593113630400-ea4288d2243e?q=80&w=1600&auto=format&fit=crop"
    : "https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?q=80&w=1600&auto=format&fit=crop";

  return (
    <div className={`min-h-screen bg-slate-50 py-12 ${themeColor}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-3xl mx-auto px-4">
        
        {/* Navigation */}
        <button 
          onClick={onBack} 
          className={`flex items-center text-gray-500 hover:text-current mb-8 font-bold transition-colors focus:outline-none focus:ring-2 rounded-lg p-2 ${ringColor}`}
          aria-label={t.form_back_btn}
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          {t.form_back_btn}
        </button>

        {/* Header Image */}
        <div className="relative h-64 rounded-3xl overflow-hidden shadow-lg mb-8 bg-gray-200">
          <img 
            src={imgError ? "https://placehold.co/1600x400/png" : headerImg}
            alt={isSupplier ? "Donation" : "Community"}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
            <h1 className="text-3xl font-black text-white mb-2 shadow-sm">
              {isSupplier ? t.form_supplier_title : t.form_network_title}
            </h1>
            <p className="text-white/90 font-medium shadow-sm">
              {isSupplier ? t.form_supplier_subtitle : t.form_network_subtitle}
            </p>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100 relative">
            
            {/* Demo Warning Banner */}
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-8 rounded-r-lg flex items-start">
                <AlertTriangle className="h-5 w-5 text-amber-500 mr-3 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-amber-800 font-medium">
                    {t.form_demo_warning}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div className="grid md:grid-cols-2 gap-6">
                    <FormInput 
                        id="name" 
                        label={t.form_name_label} 
                        value={formData.name} 
                        onChange={(e) => handleChange('name', e.target.value)}
                        error={errors.name}
                    />
                    <FormInput 
                        id="org" 
                        label={t.form_org_label} 
                        value={formData.org} 
                        onChange={(e) => handleChange('org', e.target.value)}
                        error={errors.org}
                    />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <FormInput 
                        id="email" 
                        label={t.form_email_label} 
                        type="email"
                        value={formData.email} 
                        onChange={(e) => handleChange('email', e.target.value)}
                        error={errors.email}
                        placeholder="nom@exemple.com"
                    />
                    <FormInput 
                        id="phone" 
                        label={t.form_phone_label} 
                        type="tel"
                        value={formData.phone} 
                        onChange={(e) => handleChange('phone', e.target.value)}
                        error={errors.phone}
                    />
                </div>

                {isSupplier ? (
                    <div>
                         <label htmlFor="type" className="block text-sm font-bold text-gray-700 mb-2">
                             {t.form_donation_type_label} <span className="text-red-500">*</span>
                         </label>
                         <select 
                            id="type"
                            value={formData.type}
                            onChange={(e) => handleChange('type', e.target.value)}
                            className={`w-full px-4 py-3 rounded-xl border ${errors.type ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-current outline-none bg-white`}
                         >
                            <option value="">-- Sélectionner --</option>
                            <option value="dry">Denrées sèches (Riz, Pâtes...)</option>
                            <option value="fresh">Produits frais (Fruits, Légumes)</option>
                            <option value="frozen">Produits surgelés</option>
                            <option value="equipment">Matériel / Logistique</option>
                            <option value="other">Autre</option>
                         </select>
                         {errors.type && <p className="text-red-500 text-xs mt-1 font-bold">{errors.type}</p>}
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 gap-6">
                        <FormInput 
                            id="location" 
                            label={t.form_location_label} 
                            value={formData.location || ''} 
                            onChange={(e) => handleChange('location', e.target.value)}
                            error={errors.location}
                        />
                         <FormInput 
                            id="quantity" 
                            label={t.form_quantity_label} 
                            type="number"
                            required={false}
                            value={formData.quantity || ''} 
                            onChange={(e) => handleChange('quantity', e.target.value)}
                        />
                    </div>
                )}

                <FormTextArea 
                    id="message"
                    label={t.form_message_label}
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                />

                {/* GDPR Consent */}
                <div className={`p-4 rounded-xl border ${errors.consent ? 'border-red-300 bg-red-50' : 'border-gray-100 bg-gray-50'}`}>
                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input
                                id="consent"
                                type="checkbox"
                                checked={formData.consent}
                                onChange={(e) => handleChange('consent', e.target.checked)}
                                className={`h-5 w-5 rounded border-gray-300 ${ringColor}`}
                            />
                        </div>
                        <div className="ml-3 text-sm">
                            <label htmlFor="consent" className="font-medium text-gray-700 block">
                                {t.form_consent_gdpr} <span className="text-red-500">*</span>
                            </label>
                            <p className="text-xs text-gray-500 mt-1 flex items-center">
                                <ShieldCheck className="h-3 w-3 mr-1" />
                                <a href="#" className="underline hover:text-black">{t.form_privacy_link}</a>
                            </p>
                        </div>
                    </div>
                    {errors.consent && <p className="text-red-500 text-xs mt-2 font-bold ml-8">{errors.consent}</p>}
                </div>

                <button 
                    type="submit" 
                    className={`w-full text-white font-black py-4 rounded-xl shadow-lg transition-all flex items-center justify-center text-lg ${btnBg} transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-gray-300`}
                >
                    <Icon className="mr-2 h-6 w-6" />
                    {t.form_submit_btn}
                </button>
            </form>
        </div>
      </div>
    </div>
  );
};

// --- EXPORTS ---

export const FoodSupplierForm: React.FC<FoodFormProps> = (props) => (
  <BaseFoodForm {...props} mode="supplier" />
);

export const FoodNetworkForm: React.FC<FoodFormProps> = (props) => (
  <BaseFoodForm {...props} mode="network" />
);