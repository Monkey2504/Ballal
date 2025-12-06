import React from 'react';
import { Lock, FileText, Shield, ArrowLeft } from 'lucide-react';
import { LanguageCode } from '../types.ts';
import { translations } from '../utils/translations.ts';

interface LegalDocSectionProps {
  language: LanguageCode;
  mode: 'privacy' | 'terms';
}

const LegalDocSection: React.FC<LegalDocSectionProps> = ({ language, mode }) => {
  const t = translations[language] || translations['fr'];

  const content = mode === 'privacy' ? (
    <div className="space-y-6">
        <h1 className="text-3xl font-black text-slate-900 mb-6">{t.footer_privacy || "Politique de confidentialité"}</h1>
        <p className="text-gray-700">
            <strong>Dernière mise à jour :</strong> {new Date().toLocaleDateString()}
        </p>
        
        <section>
            <h2 className="text-xl font-bold text-slate-800 mb-3">1. Collecte des données</h2>
            <p className="text-gray-600 mb-4">
                L'ASBL Ballal accorde une importance primordiale à la protection de votre vie privée. 
                Nous ne collectons que les données strictement nécessaires au fonctionnement de nos services (formulaires de contact, adhésion).
                Aucune donnée n'est vendue à des tiers.
            </p>
        </section>

        <section>
            <h2 className="text-xl font-bold text-slate-800 mb-3">2. Cookies</h2>
            <p className="text-gray-600 mb-4">
                Ce site utilise un stockage local (localStorage) pour mémoriser votre choix de langue. 
                Aucun cookie tiers de traçage publicitaire n'est actif par défaut.
            </p>
        </section>

        <section>
            <h2 className="text-xl font-bold text-slate-800 mb-3">3. Vos droits (GDPR)</h2>
            <p className="text-gray-600 mb-4">
                Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, 
                de rectification et de suppression de vos données personnelles. Pour exercer ce droit, contactez-nous à admin@ballal.be.
            </p>
        </section>
    </div>
  ) : (
    <div className="space-y-6">
        <h1 className="text-3xl font-black text-slate-900 mb-6">{t.footer_terms || "Conditions d'utilisation"}</h1>
        
        <section>
            <h2 className="text-xl font-bold text-slate-800 mb-3">1. Objet</h2>
            <p className="text-gray-600 mb-4">
                Les présentes conditions régissent l'utilisation de l'application web de l'ASBL Ballal. 
                En accédant à ce site, vous acceptez ces conditions sans réserve.
            </p>
        </section>

        <section>
            <h2 className="text-xl font-bold text-slate-800 mb-3">2. Propriété intellectuelle</h2>
            <p className="text-gray-600 mb-4">
                L'ensemble du contenu (textes, logos, images) est la propriété exclusive de l'ASBL Ballal ou de ses partenaires. 
                Toute reproduction est interdite sans autorisation.
            </p>
        </section>

        <section>
            <h2 className="text-xl font-bold text-slate-800 mb-3">3. Responsabilité</h2>
            <p className="text-gray-600 mb-4">
                L'ASBL Ballal s'efforce de fournir des informations juridiques et sociales exactes mais ne saurait être tenue responsable 
                des erreurs ou omissions. Les informations juridiques (section Droits) sont fournies à titre informatif et ne remplacent pas l'avis d'un avocat.
            </p>
        </section>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 py-12" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100">
            <div className="flex items-center justify-center mb-8">
                <div className="p-4 bg-slate-100 rounded-full">
                    {mode === 'privacy' ? <Lock className="h-8 w-8 text-slate-700" /> : <FileText className="h-8 w-8 text-slate-700" />}
                </div>
            </div>
            
            {content}

            <div className="mt-12 pt-8 border-t border-gray-100 text-center">
                <button 
                    onClick={() => window.history.back()}
                    className="inline-flex items-center text-slate-600 hover:text-[#CE1126] font-bold transition-colors"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Retour
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default LegalDocSection;