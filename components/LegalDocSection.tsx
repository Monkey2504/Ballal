import React from 'react';
import { Lock, FileText, Shield } from 'lucide-react';
import { LanguageCode } from '../types';
import { translations } from '../utils/translations';

interface LegalDocSectionProps {
  language: LanguageCode;
  mode: 'privacy' | 'terms';
}

const LegalDocSection: React.FC<LegalDocSectionProps> = ({ language, mode }) => {
  const t = translations[language];

  // Content for Privacy Policy
  const privacyContent = (
    <div className="space-y-6">
        <section>
            <h3 className="text-xl font-bold text-gray-900 mb-3">1. Introduction</h3>
            <p className="text-gray-700 leading-relaxed">
                Ballal ASBL s'engage à protéger la vie privée de ses utilisateurs. Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos informations personnelles lorsque vous utilisez notre site web et nos services, conformément au Règlement Général sur la Protection des Données (RGPD).
            </p>
        </section>
        <section>
            <h3 className="text-xl font-bold text-gray-900 mb-3">2. Données collectées</h3>
            <p className="text-gray-700 leading-relaxed">
                Nous ne collectons que les données strictement nécessaires à nos activités :
                <ul className="list-disc ml-5 mt-2 space-y-1">
                    <li>Informations de contact (nom, email, téléphone) via nos formulaires de contact.</li>
                    <li>Données techniques (adresse IP, logs) nécessaires à la sécurité du site.</li>
                </ul>
                Aucune donnée sensible n'est stockée sans votre consentement explicite.
            </p>
        </section>
        <section>
            <h3 className="text-xl font-bold text-gray-900 mb-3">3. Utilisation des données</h3>
            <p className="text-gray-700 leading-relaxed">
                Vos données sont utilisées uniquement pour :
                <ul className="list-disc ml-5 mt-2 space-y-1">
                    <li>Répondre à vos demandes d'aide ou d'information.</li>
                    <li>Gérer les adhésions des membres.</li>
                    <li>Vous informer de nos événements (si vous avez accepté).</li>
                </ul>
                Nous ne vendons ni ne louons vos données à des tiers.
            </p>
        </section>
         <section>
            <h3 className="text-xl font-bold text-gray-900 mb-3">4. Vos droits</h3>
            <p className="text-gray-700 leading-relaxed">
                Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition au traitement de vos données. Pour exercer ces droits, contactez-nous à : <strong>admin@ballal.be</strong>.
            </p>
        </section>
    </div>
  );

  // Content for Terms of Use
  const termsContent = (
    <div className="space-y-6">
        <section>
            <h3 className="text-xl font-bold text-gray-900 mb-3">1. Acceptation</h3>
            <p className="text-gray-700 leading-relaxed">
                En accédant à ce site web, vous acceptez d'être lié par les présentes conditions d'utilisation, toutes les lois et réglementations applicables, et acceptez que vous êtes responsable du respect de toutes les lois locales applicables.
            </p>
        </section>
        <section>
            <h3 className="text-xl font-bold text-gray-900 mb-3">2. Licence d'utilisation</h3>
            <p className="text-gray-700 leading-relaxed">
                Il est permis de télécharger temporairement une copie des documents (informations ou logiciels) sur le site web de Ballal ASBL pour une visualisation transitoire personnelle et non commerciale uniquement.
            </p>
        </section>
        <section>
            <h3 className="text-xl font-bold text-gray-900 mb-3">3. Clause de non-responsabilité</h3>
            <p className="text-gray-700 leading-relaxed">
                Les documents sur le site web de Ballal ASBL sont fournis "tels quels". Ballal ASBL ne donne aucune garantie, expresse ou implicite, et décline par la présente toutes les autres garanties. De plus, Ballal ASBL ne garantit pas l'exactitude, les résultats probables ou la fiabilité de l'utilisation des documents sur son site web.
            </p>
        </section>
         <section>
            <h3 className="text-xl font-bold text-gray-900 mb-3">4. Limitations</h3>
            <p className="text-gray-700 leading-relaxed">
                En aucun cas, Ballal ASBL ou ses fournisseurs ne seront responsables de tout dommage (y compris, sans limitation, les dommages pour perte de données ou de profit, ou en raison d'une interruption d'activité) découlant de l'utilisation ou de l'impossibilité d'utiliser les documents sur le site web de Ballal ASBL.
            </p>
        </section>
    </div>
  );

  const isPrivacy = mode === 'privacy';
  const title = isPrivacy ? t.footer_privacy : t.footer_terms;
  const icon = isPrivacy ? Lock : FileText;
  const content = isPrivacy ? privacyContent : termsContent;

  return (
    <div className="min-h-screen bg-slate-50 py-16" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        <div className="text-center mb-12">
            <div className={`inline-flex items-center justify-center p-4 rounded-full mb-6 shadow-md ${isPrivacy ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
                {React.createElement(icon, { className: "h-10 w-10" })}
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">{title}</h1>
            <div className="h-1 w-24 bg-[#CE1126] mx-auto rounded-full"></div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            <div className="p-8 md:p-12">
                 {content}
            </div>
            <div className="bg-gray-50 p-6 text-center border-t border-gray-100">
                <p className="text-sm text-gray-500">
                    Dernière mise à jour : {new Date().toLocaleDateString(language === 'en' ? 'en-US' : 'fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
            </div>
        </div>

      </div>
    </div>
  );
};

export default LegalDocSection;