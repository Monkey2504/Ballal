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
    <div className="space-y-8 text-gray-700 leading-relaxed">
        <div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">{t.footer_privacy || "Politique de confidentialité"}</h1>
            <p className="text-sm text-gray-500 bg-gray-50 p-4 rounded-lg border border-gray-100">
                <strong>{t.privacy_updated}</strong> {new Date().toLocaleDateString()} <br/>
                <strong>{t.privacy_controller}</strong> BALLAL ASBL
            </p>
        </div>
        
        <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
                {t.privacy_sec1_title}
            </h2>
            <p className="mb-4">
                {t.privacy_sec1_desc}
            </p>
            <ul className="list-disc pl-6 space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <li><strong>{t.privacy_address}</strong> Place Masui 9 Boîte 3, 1030 BRUXELLES, Belgique</li>
                <li><strong>{t.footer_bce}</strong></li>
                <li><strong>{t.privacy_email}</strong> admin@ballal.be</li>
                <li><strong>{t.privacy_phone}</strong> 0493 43 43 83</li>
            </ul>
        </section>

        <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
                {t.privacy_sec2_title}
            </h2>
            <p className="mb-4">
                {t.privacy_sec2_desc}
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-4">
                <div className="bg-white border border-gray-200 p-5 rounded-xl">
                    <h3 className="font-bold text-slate-900 mb-2">{t.privacy_form_contact}</h3>
                    <p className="text-sm">
                        <strong>{t.privacy_data_types}</strong> Nom, Prénom, Adresse email, Numéro de téléphone, Objet de la demande.
                        <br/><br/>
                        <strong>{t.privacy_purpose}</strong> Répondre à vos demandes d'information, gérer les adhésions, coordonner l'aide alimentaire ou juridique.
                    </p>
                </div>
                <div className="bg-white border border-gray-200 p-5 rounded-xl">
                    <h3 className="font-bold text-slate-900 mb-2">{t.privacy_newsletter}</h3>
                    <p className="text-sm">
                        <strong>{t.privacy_data_types}</strong> Adresse email.
                        <br/><br/>
                        <strong>{t.privacy_purpose}</strong> Vous envoyer des informations sur nos activités, événements et appels à la solidarité. Vous pouvez vous désinscrire à tout moment via le lien inclus dans chaque email.
                    </p>
                </div>
            </div>
        </section>

        <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span>
                {t.privacy_sec3_title}
            </h2>
            <p className="mb-4">
                {t.privacy_sec3_desc}
            </p>
            <p className="mb-4">
                Elles peuvent être partagées uniquement dans les cas suivants, avec votre consentement explicite ou si la loi l'exige :
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm">
                <li>Avec nos partenaires juridiques (avocats) si vous sollicitez une aide légale spécifique.</li>
                <li>Avec les autorités compétentes si une obligation légale nous y contraint.</li>
                <li>Avec nos fournisseurs techniques (hébergement web, service d'envoi d'emails) qui respectent le RGPD.</li>
            </ul>
        </section>

        <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">4</span>
                {t.privacy_sec4_title}
            </h2>
            <p className="mb-4">
                {t.privacy_sec4_desc}
            </p>
            <p className="text-sm bg-blue-50 p-4 rounded-lg text-blue-800">
                Nous n'utilisons <strong>pas de cookies publicitaires tiers</strong> pour traquer votre navigation à des fins commerciales.
            </p>
        </section>

        <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">5</span>
                {t.privacy_sec5_title}
            </h2>
            <p className="mb-4">
                {t.privacy_sec5_desc}
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
                <li><strong>Droit d'accès :</strong> Savoir quelles données nous détenons sur vous.</li>
                <li><strong>Droit de rectification :</strong> Corriger des données inexactes.</li>
                <li><strong>Droit à l'effacement :</strong> Demander la suppression de vos données ("droit à l'oubli").</li>
                <li><strong>Droit à la limitation :</strong> Restreindre l'utilisation de vos données.</li>
            </ul>
            <div className="bg-slate-900 text-white p-6 rounded-xl text-center">
                <p className="mb-4 font-medium">{t.privacy_contact_rights}</p>
                <a href="mailto:admin@ballal.be" className="inline-block bg-white text-slate-900 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
                    admin@ballal.be
                </a>
            </div>
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