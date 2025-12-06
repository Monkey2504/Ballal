import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowLeft, CheckCircle, Send, ShoppingBag, Users, 
  AlertTriangle, ShieldCheck, Building2, MapPin, Phone, Mail,
  Package, Scale, Calendar, Clock, HeartHandshake
} from 'lucide-react';
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
  organization: string;
  email: string;
  phone: string;
  donationType?: string;
  location?: string;
  capacity?: string;
  frequency?: string;
  message: string;
  consent: boolean;
  receiveUpdates: boolean;
}

interface FormInputProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
  icon?: React.ReactNode;
  options?: Array<{ value: string; label: string }>;
  as?: 'input' | 'select' | 'textarea';
  rows?: number;
}

// --- SHARED COMPONENTS ---

const FormInput: React.FC<FormInputProps> = ({ 
  id, 
  label, 
  type = "text", 
  value, 
  onChange, 
  error, 
  placeholder,
  required = true,
  icon,
  options,
  as = 'input',
  rows = 4
}) => {
  const inputClass = `w-full px-4 py-3 rounded-xl border-2 ${
    error 
      ? 'border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-200' 
      : 'border-gray-200 focus:border-[#CE1126] focus:ring-2 focus:ring-[#CE1126]/20'
  } outline-none transition-all duration-200`;

  const commonProps = {
    id,
    value,
    onChange,
    placeholder,
    'aria-required': required,
    'aria-invalid': !!error,
    'aria-describedby': error ? `${id}-error` : undefined,
    className: inputClass
  };

  return (
    <div>
      <label 
        htmlFor={id} 
        className="block text-sm font-bold text-gray-700 mb-2"
      >
        {label} {required && <span className="text-red-500" aria-hidden="true">*</span>}
        <span className="sr-only">{required ? ' (obligatoire)' : ' (optionnel)'}</span>
      </label>
      
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        
        {as === 'textarea' ? (
          <textarea
            {...commonProps}
            rows={rows}
            className={`${inputClass} ${icon ? 'pl-10' : ''} resize-none`}
          />
        ) : as === 'select' ? (
          <select
            {...commonProps}
            className={`${inputClass} ${icon ? 'pl-10' : ''} cursor-pointer appearance-none`}
          >
            <option value="">-- Sélectionner --</option>
            {options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            {...commonProps}
            type={type}
            className={`${inputClass} ${icon ? 'pl-10' : ''}`}
          />
        )}
      </div>
      
      {error && (
        <p 
          id={`${id}-error`} 
          className="text-red-600 text-sm font-medium mt-2 flex items-center animate-in slide-in-from-top-1"
          role="alert"
        >
          <AlertTriangle className="h-4 w-4 mr-1" />
          {error}
        </p>
      )}
    </div>
  );
};

const CheckboxInput: React.FC<{
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
  required?: boolean;
}> = ({ id, label, checked, onChange, error, required }) => (
  <div className="flex items-start">
    <div className="flex items-center h-5">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className="h-5 w-5 rounded border-2 border-gray-300 text-[#CE1126] focus:ring-2 focus:ring-[#CE1126]/40 focus:border-[#CE1126] transition-colors"
      />
    </div>
    <label 
      htmlFor={id} 
      className="ml-3 text-sm cursor-pointer"
    >
      <span className="font-medium text-gray-700">
        {label} {required && <span className="text-red-500" aria-hidden="true">*</span>}
      </span>
      {error && (
        <p 
          id={`${id}-error`} 
          className="text-red-600 text-sm font-medium mt-1 flex items-center"
          role="alert"
        >
          <AlertTriangle className="h-4 w-4 mr-1" />
          {error}
        </p>
      )}
    </label>
  </div>
);

const SuccessView: React.FC<{ t: Translation, onBack: () => void, mode: string }> = ({ t, onBack, mode }) => {
  const [autoRedirect, setAutoRedirect] = useState(10);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setAutoRedirect(prev => {
        if (prev <= 1) {
          onBack();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [onBack]);
  
  return (
    <div 
      className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center px-4"
      role="alert"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl text-center max-w-md w-full border-t-8 border-green-500 animate-in zoom-in-95 duration-300">
        <div className="mx-auto h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="h-10 w-10 text-green-600" aria-hidden="true" />
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4">
          {t.form_success_title}
        </h2>
        <p className="text-gray-600 mb-6 leading-relaxed">
          {t.form_success_desc}
          <br />
          <span className="text-sm text-gray-400 block mt-2">
            (Mode démo : le formulaire n'a pas été réellement envoyé)
          </span>
        </p>
        
        <div className="bg-green-50 p-4 rounded-xl mb-6">
          <p className="text-sm text-green-800 font-medium">
            Retour automatique dans {autoRedirect} secondes
          </p>
        </div>
        
        <div className="space-y-3">
          <button 
            onClick={onBack}
            className="w-full bg-slate-900 text-white font-bold py-3 px-6 rounded-xl hover:bg-black transition-all focus:outline-none focus:ring-4 focus:ring-slate-200"
          >
            {mode === 'supplier' ? 'Revenir aux donateurs' : 'Revenir aux collectifs'}
          </button>
          <button 
            onClick={() => window.location.reload()}
            className="w-full text-slate-700 font-medium py-3 px-6 rounded-xl hover:bg-slate-50 transition-all border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-300"
          >
            Nouveau formulaire
          </button>
        </div>
      </div>
    </div>
  );
};

// --- MAIN BASE COMPONENT ---

const BaseFoodForm: React.FC<{
  language: LanguageCode,
  onBack: () => void,
  mode: 'supplier' | 'network'
}> = ({ language, onBack, mode }) => {
  const t = translations[language] || translations['fr'];
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    organization: '',
    email: '',
    phone: '',
    donationType: '',
    location: '',
    capacity: '',
    frequency: '',
    message: '',
    consent: false,
    receiveUpdates: false
  });
  
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imgError, setImgError] = useState(false);

  const isSupplier = mode === 'supplier';
  const themeColor = isSupplier ? '#CE1126' : '#009460';
  const themeBg = isSupplier ? 'bg-red-600' : 'bg-green-600';
  const themeHover = isSupplier ? 'hover:bg-red-700' : 'hover:bg-green-700';
  const Icon = isSupplier ? ShoppingBag : Users;
  const FormIcon = isSupplier ? Package : HeartHandshake;

  const donationTypes = [
    { value: 'dry', label: 'Denrées sèches (Riz, Pâtes, Conserves)' },
    { value: 'fresh', label: 'Produits frais (Fruits, Légumes)' },
    { value: 'frozen', label: 'Produits surgelés' },
    { value: 'dairy', label: 'Produits laitiers' },
    { value: 'bakery', label: 'Boulangerie / Pâtisserie' },
    { value: 'equipment', label: 'Matériel / Équipement' },
    { value: 'logistics', label: 'Services logistiques' },
    { value: 'other', label: 'Autre type de don' }
  ];

  const frequencies = [
    { value: 'daily', label: 'Quotidien' },
    { value: 'weekly', label: 'Hebdomadaire' },
    { value: 'biweekly', label: 'Bi-hebdomadaire' },
    { value: 'monthly', label: 'Mensuel' },
    { value: 'occasional', label: 'Occasionnel' },
    { value: 'on-demand', label: 'Sur demande' }
  ];

  const validate = (): boolean => {
    const newErrors: ValidationErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\d\s\+\-\(\)]{10,}$/;

    // Required fields
    if (!formData.name.trim()) newErrors.name = t.form_error_required;
    if (!formData.organization.trim()) newErrors.organization = t.form_error_required;
    if (!formData.email.trim()) newErrors.email = t.form_error_required;
    else if (!emailRegex.test(formData.email)) newErrors.email = t.form_error_email;
    if (!formData.phone.trim()) newErrors.phone = t.form_error_required;
    else if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) newErrors.phone = 'Format de téléphone invalide';
    
    if (isSupplier && !formData.donationType) newErrors.donationType = t.form_error_required;
    if (!isSupplier && !formData.location) newErrors.location = t.form_error_required;
    if (!formData.consent) newErrors.consent = t.form_error_consent;

    setErrors(newErrors);
    
    // Focus first error
    if (Object.keys(newErrors).length > 0) {
      const firstError = Object.keys(newErrors)[0];
      const errorElement = document.getElementById(firstError);
      errorElement?.focus();
    }
    
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call for better UX
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      // Log form data (in a real app, you'd send this to your backend)
      console.log(`${mode} form submitted:`, formData);
      
      // Simulate success
      setSubmitted(true);
      setErrors({});
    } catch (error) {
      console.error('Form submission error:', error);
      setErrors({
        submit: 'Une erreur est survenue. Veuillez réessayer.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => {
        const newErrs = { ...prev };
        delete newErrs[field];
        return newErrs;
      });
    }
  };

  if (submitted) {
    return <SuccessView t={t} onBack={onBack} mode={mode} />;
  }

  const headerImg = imgError 
    ? "https://placehold.co/1600x400/png?text=Ballal+Food+Network"
    : (isSupplier 
        ? "https://images.unsplash.com/photo-1593113630400-ea4288d2243e?q=80&w=1600&auto=format&fit=crop"
        : "https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?q=80&w=1600&auto=format&fit=crop"
      );

  return (
    <div 
      className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-8 md:py-12"
      dir={language === 'ar' ? 'rtl' : 'ltr'}
      role="main"
      aria-labelledby={`${mode}-form-title`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation */}
        <div className="mb-8">
          <button 
            onClick={onBack} 
            className="flex items-center text-gray-600 hover:text-slate-900 font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-current rounded-lg p-2"
            aria-label={`Retour à ${isSupplier ? 'la page donateurs' : 'la page collectifs'}`}
          >
            <ArrowLeft className="h-5 w-5 mr-2" aria-hidden="true" />
            {t.form_back_btn}
          </button>
        </div>

        {/* Header */}
        <div className="relative rounded-3xl overflow-hidden shadow-xl mb-8">
          <img 
            src={headerImg}
            alt={isSupplier ? "Donation de nourriture" : "Communauté solidaire"}
            className="w-full h-48 md:h-64 object-cover"
            onError={() => setImgError(true)}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6 md:p-10">
            <div className="flex items-center gap-3 mb-2">
              <div className={`p-3 rounded-xl ${themeBg} bg-opacity-90`}>
                <FormIcon className="h-8 w-8 text-white" aria-hidden="true" />
              </div>
              <h1 
                id={`${mode}-form-title`}
                className="text-2xl md:text-4xl font-black text-white"
              >
                {isSupplier ? t.form_supplier_title : t.form_network_title}
              </h1>
            </div>
            <p className="text-white/90 text-lg font-medium">
              {isSupplier ? t.form_supplier_subtitle : t.form_network_subtitle}
            </p>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center">
              <div className={`h-3 w-3 rounded-full ${themeBg}`} />
              <div className={`h-1 w-12 md:w-24 ${themeBg} bg-opacity-50`} />
              <div className={`h-3 w-3 rounded-full ${themeBg} bg-opacity-50`} />
              <div className={`h-1 w-12 md:w-24 ${themeBg} bg-opacity-30`} />
              <div className="h-3 w-3 rounded-full bg-gray-300" />
            </div>
          </div>
          <p className="text-center text-sm text-gray-600">
            Étape 1 sur 3 - Informations de contact
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-3xl shadow-lg p-6 md:p-10 border border-gray-200">
          
          {/* Demo Warning */}
          <div 
            className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-8 rounded-r-lg flex items-start"
            role="alert"
          >
            <AlertTriangle className="h-5 w-5 text-amber-500 mr-3 flex-shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="text-sm font-bold text-amber-800 mb-1">Mode démonstration</p>
              <p className="text-sm text-amber-700">
                {t.form_demo_warning}
              </p>
            </div>
          </div>

          {/* Error message */}
          {errors.submit && (
            <div 
              className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded-r-lg"
              role="alert"
            >
              <p className="text-red-700 font-medium">
                <AlertTriangle className="h-5 w-5 inline mr-2" aria-hidden="true" />
                {errors.submit}
              </p>
            </div>
          )}

          <form 
            ref={formRef}
            onSubmit={handleSubmit} 
            className="space-y-8"
            noValidate
          >
            {/* Contact Information */}
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Building2 className="h-5 w-5" aria-hidden="true" />
                Informations de contact
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <FormInput 
                  id="name"
                  label={t.form_name_label}
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  error={errors.name}
                  placeholder="Votre nom complet"
                  icon={<Users className="h-5 w-5" />}
                />
                
                <FormInput 
                  id="organization"
                  label={t.form_org_label}
                  value={formData.organization}
                  onChange={(e) => handleChange('organization', e.target.value)}
                  error={errors.organization}
                  placeholder="Nom de votre organisation"
                  icon={<Building2 className="h-5 w-5" />}
                />
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <FormInput 
                  id="email"
                  label={t.form_email_label}
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  error={errors.email}
                  placeholder="contact@organisation.be"
                  icon={<Mail className="h-5 w-5" />}
                />
                
                <FormInput 
                  id="phone"
                  label={t.form_phone_label}
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  error={errors.phone}
                  placeholder="+32 123 45 67 89"
                  icon={<Phone className="h-5 w-5" />}
                />
              </div>
            </section>

            {/* Specific Information */}
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Package className="h-5 w-5" aria-hidden="true" />
                {isSupplier ? 'Détails du don' : 'Informations du collectif'}
              </h2>
              
              {isSupplier ? (
                <>
                  <FormInput 
                    id="donationType"
                    label={t.form_donation_type_label}
                    value={formData.donationType || ''}
                    onChange={(e) => handleChange('donationType', e.target.value)}
                    error={errors.donationType}
                    as="select"
                    options={donationTypes}
                    icon={<Package className="h-5 w-5" />}
                  />
                  
                  <div className="grid md:grid-cols-2 gap-6 mt-6">
                    <FormInput 
                      id="capacity"
                      label="Capacité de don"
                      value={formData.capacity || ''}
                      onChange={(e) => handleChange('capacity', e.target.value)}
                      placeholder="ex: 50kg par semaine"
                      required={false}
                      icon={<Scale className="h-5 w-5" />}
                    />
                    
                    <FormInput 
                      id="frequency"
                      label="Fréquence des dons"
                      value={formData.frequency || ''}
                      onChange={(e) => handleChange('frequency', e.target.value)}
                      as="select"
                      options={frequencies}
                      required={false}
                      icon={<Calendar className="h-5 w-5" />}
                    />
                  </div>
                </>
              ) : (
                <>
                  <FormInput 
                    id="location"
                    label={t.form_location_label}
                    value={formData.location || ''}
                    onChange={(e) => handleChange('location', e.target.value)}
                    error={errors.location}
                    placeholder="Ville, commune ou adresse"
                    icon={<MapPin className="h-5 w-5" />}
                  />
                  
                  <div className="grid md:grid-cols-2 gap-6 mt-6">
                    <FormInput 
                      id="capacity"
                      label="Capacité d'accueil"
                      value={formData.capacity || ''}
                      onChange={(e) => handleChange('capacity', e.target.value)}
                      placeholder="ex: 100 bénéficiaires"
                      required={false}
                      icon={<Users className="h-5 w-5" />}
                    />
                    
                    <FormInput 
                      id="frequency"
                      label="Fréquence de distribution"
                      value={formData.frequency || ''}
                      onChange={(e) => handleChange('frequency', e.target.value)}
                      as="select"
                      options={frequencies}
                      required={false}
                      icon={<Clock className="h-5 w-5" />}
                    />
                  </div>
                </>
              )}
            </section>

            {/* Additional Information */}
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-6">Informations complémentaires</h2>
              
              <FormInput 
                id="message"
                label={t.form_message_label}
                value={formData.message}
                onChange={(e) => handleChange('message', e.target.value)}
                placeholder={isSupplier 
                  ? "Décrivez votre proposition de don, conditions spécifiques, horaires de collecte..."
                  : "Décrivez votre collectif, besoins spécifiques, horaires de distribution..."
                }
                as="textarea"
                rows={4}
                required={false}
              />
            </section>

            {/* Consent & Preferences */}
            <section className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Confidentialité et préférences</h2>
              
              <div className="space-y-4">
                <CheckboxInput 
                  id="consent"
                  label={t.form_consent_gdpr}
                  checked={formData.consent}
                  onChange={(checked) => handleChange('consent', checked)}
                  error={errors.consent}
                  required={true}
                />
                
                <div className="ml-8 pl-4 border-l-2 border-gray-300">
                  <p className="text-sm text-gray-600 mb-4">
                    Vos données seront traitées conformément à notre politique de confidentialité et ne seront utilisées que pour traiter votre demande.
                  </p>
                  <a 
                    href="#privacy"
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center"
                  >
                    <ShieldCheck className="h-4 w-4 mr-2" aria-hidden="true" />
                    Lire notre politique de confidentialité
                  </a>
                </div>
                
                <CheckboxInput 
                  id="receiveUpdates"
                  label="Je souhaite recevoir des nouvelles du réseau Ballal (événements, opportunités, newsletters)"
                  checked={formData.receiveUpdates}
                  onChange={(checked) => handleChange('receiveUpdates', checked)}
                  required={false}
                />
              </div>
            </section>

            {/* Submit Button */}
            <div className="pt-6 border-t border-gray-200">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`w-full ${themeBg} ${themeHover} text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 focus:outline-none focus:ring-4 focus:ring-current focus:ring-opacity-40`}
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <Icon className="h-5 w-5" aria-hidden="true" />
                    {t.form_submit_btn}
                    <Send className="h-5 w-5" aria-hidden="true" />
                  </>
                )}
              </button>
              
              <p className="text-center text-sm text-gray-500 mt-4">
                <AlertTriangle className="h-4 w-4 inline mr-1" aria-hidden="true" />
                Ce formulaire est une démonstration. Dans la version finale, les données seront envoyées à notre équipe.
              </p>
            </div>
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