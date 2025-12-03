import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, Send, ShoppingBag, Users } from 'lucide-react';
import { LanguageCode, ViewState } from '../types';
import { translations } from '../utils/translations';

interface FoodFormProps {
  language: LanguageCode;
  onBack: () => void;
}

// FORMULAIRE FOURNISSEUR / DONATEUR
export const FoodSupplierForm: React.FC<FoodFormProps> = ({ language, onBack }) => {
  const t = translations[language];
  const [submitted, setSubmitted] = useState(false);
  
  // Simulation de soumission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Ici on pourrait aussi déclencher un mailto automatique avec les données
  };

  if (submitted) {
    return <SuccessView t={t} onBack={onBack} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <div className="max-w-3xl mx-auto px-4">
            <button onClick={onBack} className="flex items-center text-gray-500 hover:text-[#CE1126] mb-8 font-bold transition-colors">
                <ArrowLeft className="h-5 w-5 mr-2" />
                {t.form_back_btn}
            </button>

            {/* Header Image Générique Fournisseur */}
            <div className="relative h-64 rounded-3xl overflow-hidden shadow-lg mb-8">
                <img 
                    src="https://images.unsplash.com/photo-1593113630400-ea4288d2243e?q=80&w=1600&auto=format&fit=crop" 
                    alt="Fournisseur alimentaire"
                    className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8">
                    <h1 className="text-3xl font-black text-white mb-2">{t.form_supplier_title}</h1>
                    <p className="text-white/90 font-medium">{t.form_supplier_subtitle}</p>
                </div>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">{t.form_name_label}</label>
                            <input required type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#CE1126] focus:border-transparent outline-none transition-all" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">{t.form_org_label}</label>
                            <input required type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#CE1126] focus:border-transparent outline-none transition-all" />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">{t.form_email_label}</label>
                            <input required type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#CE1126] focus:border-transparent outline-none transition-all" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">{t.form_phone_label}</label>
                            <input required type="tel" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#CE1126] focus:border-transparent outline-none transition-all" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">{t.form_donation_type_label}</label>
                        <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#CE1126] focus:border-transparent outline-none transition-all bg-white">
                            <option>Denrées sèches (Riz, Pâtes, Conserves...)</option>
                            <option>Produits frais (Fruits, Légumes)</option>
                            <option>Produits surgelés</option>
                            <option>Matériel / Logistique</option>
                            <option>Autre</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">{t.form_message_label}</label>
                        <textarea rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#CE1126] focus:border-transparent outline-none transition-all"></textarea>
                    </div>

                    <button type="submit" className="w-full bg-[#CE1126] text-white font-black py-4 rounded-xl shadow-lg hover:bg-red-700 transition-all flex items-center justify-center text-lg">
                        <ShoppingBag className="mr-2 h-6 w-6" />
                        {t.form_submit_btn}
                    </button>
                    <p className="text-xs text-gray-400 text-center mt-4">En soumettant ce formulaire, vous acceptez d'être recontacté par Ballal ASBL.</p>
                </form>
            </div>
        </div>
    </div>
  );
};

// FORMULAIRE RÉSEAU / COLLECTIF
export const FoodNetworkForm: React.FC<FoodFormProps> = ({ language, onBack }) => {
  const t = translations[language];
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return <SuccessView t={t} onBack={onBack} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <div className="max-w-3xl mx-auto px-4">
            <button onClick={onBack} className="flex items-center text-gray-500 hover:text-[#009460] mb-8 font-bold transition-colors">
                <ArrowLeft className="h-5 w-5 mr-2" />
                {t.form_back_btn}
            </button>

            {/* Header Image Générique Réseau */}
            <div className="relative h-64 rounded-3xl overflow-hidden shadow-lg mb-8">
                <img 
                    src="https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?q=80&w=1600&auto=format&fit=crop" 
                    alt="Réseau communautaire"
                    className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8">
                    <h1 className="text-3xl font-black text-white mb-2">{t.form_network_title}</h1>
                    <p className="text-white/90 font-medium">{t.form_network_subtitle}</p>
                </div>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">{t.form_name_label}</label>
                            <input required type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#009460] focus:border-transparent outline-none transition-all" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">{t.form_org_label} (Collectif/Squat)</label>
                            <input required type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#009460] focus:border-transparent outline-none transition-all" />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                         <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">{t.form_location_label}</label>
                            <input required type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#009460] focus:border-transparent outline-none transition-all" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">{t.form_quantity_label}</label>
                            <input required type="number" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#009460] focus:border-transparent outline-none transition-all" />
                        </div>
                    </div>

                     <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">{t.form_email_label}</label>
                            <input required type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#009460] focus:border-transparent outline-none transition-all" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">{t.form_phone_label}</label>
                            <input required type="tel" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#009460] focus:border-transparent outline-none transition-all" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">{t.form_message_label}</label>
                        <textarea rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#009460] focus:border-transparent outline-none transition-all"></textarea>
                    </div>

                    <button type="submit" className="w-full bg-[#009460] text-white font-black py-4 rounded-xl shadow-lg hover:bg-green-700 transition-all flex items-center justify-center text-lg">
                        <Users className="mr-2 h-6 w-6" />
                        {t.form_submit_btn}
                    </button>
                    <p className="text-xs text-gray-400 text-center mt-4">En soumettant ce formulaire, vous acceptez d'être recontacté par Ballal ASBL.</p>
                </form>
            </div>
        </div>
    </div>
  );
};

const SuccessView: React.FC<{t: any, onBack: () => void}> = ({t, onBack}) => (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="bg-white p-10 rounded-3xl shadow-2xl text-center max-w-md border-t-8 border-green-500">
            <div className="mx-auto h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="text-3xl font-black text-gray-900 mb-4">{t.form_success_title}</h2>
            <p className="text-gray-600 mb-8 text-lg">{t.form_success_desc}</p>
            <button 
                onClick={onBack}
                className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-black transition-colors"
            >
                {t.form_back_btn}
            </button>
        </div>
    </div>
);
