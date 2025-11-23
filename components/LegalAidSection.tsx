
import React from 'react';
import { Shield, HeartPulse, Scale, Building, Phone, AlertCircle, Home, AlertTriangle, Info } from 'lucide-react';
import { LanguageCode } from '../types';
import { translations } from '../utils/translations';

interface LegalAidSectionProps {
  language?: LanguageCode;
}

const LegalAidSection: React.FC<LegalAidSectionProps> = ({ language = 'fr' }) => {
  const t = translations[language];

  return (
    <div className="bg-slate-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Militant */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 uppercase tracking-wide">{t.urgent_title}</h2>
          <div className="h-1.5 w-32 mx-auto my-4 guinea-gradient-bg rounded-full"></div>
          <p className="mt-4 text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            {language === 'fr' 
             ? "Personne n'est illégal. Cette page est une ressource de survie et de combat juridique." 
             : t.hero_desc}
          </p>
        </div>

        {/* Urgent Alert Banner */}
        <div className="bg-[#CE1126] text-white p-4 mb-8 rounded-lg shadow-lg animate-pulse">
          <div className="flex items-center justify-center">
            <AlertCircle className="h-6 w-6 mr-3" />
            <p className="font-bold text-lg">
              {t.urgent_alert}
            </p>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 mb-12">
          
          {/* Section 1: Urgence Rue & Manger */}
          <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-[#FCD116]">
            <div className="flex items-center mb-4">
              <div className="bg-yellow-100 p-3 rounded-full">
                <Home className="h-6 w-6 text-[#FCD116]" />
              </div>
              <h3 className="ml-4 text-2xl font-bold text-gray-900">Urgence : Rue & Faim</h3>
            </div>
            <div className="space-y-4">
              <div className="bg-slate-50 p-3 rounded border border-slate-200">
                <p className="font-bold text-gray-800">Samusocial (Hébergement d'urgence)</p>
                <p className="text-[#CE1126] font-mono text-xl font-bold flex items-center"><Phone className="h-4 w-4 mr-2"/> 0800 99 340</p>
                <p className="text-xs text-gray-500">Appelez tôt le matin (dès 8h) ou tard le soir.</p>
              </div>
            </div>
          </div>

          {/* Section 2: Santé (Vital) */}
          <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-[#009460]">
            <div className="flex items-center mb-4">
              <div className="bg-green-100 p-3 rounded-full">
                <HeartPulse className="h-6 w-6 text-[#009460]" />
              </div>
              <h3 className="ml-4 text-2xl font-bold text-gray-900">{t.health_title}</h3>
            </div>
            <p className="text-gray-700 mb-4 font-medium">
              {t.health_desc}
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-[#009460] font-bold mr-2">1.</span>
                <span className="text-sm text-gray-600">Allez au CPAS de la commune où vous dormez (même en squat).</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#009460] font-bold mr-2">3.</span>
                <span className="text-sm text-gray-600">En cas de refus : Contactez <span className="font-bold">Médecins du Monde</span>.</span>
              </li>
            </ul>
          </div>

          {/* Section 4: Défense Juridique */}
          <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-blue-600">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Scale className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="ml-4 text-2xl font-bold text-gray-900">{t.lawyer_title}</h3>
            </div>
            <div className="space-y-3">
              <p className="text-gray-700 font-medium">{t.lawyer_desc}</p>
              <div className="flex flex-col">
                  <span className="font-bold text-blue-800">Bureau d'Aide Juridique (BAJ)</span>
                  <span className="text-sm text-gray-600">Rue de la Régence 63, Bruxelles (Palais de Justice)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section OQT et Police */}
        <div className="bg-slate-800 text-slate-100 rounded-xl p-8 mb-12 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 guinea-gradient-bg"></div>
             <h3 className="text-2xl font-bold text-red-400 mb-4 flex items-center">
                <Shield className="mr-2" /> Ordre de Quitter le Territoire (OQT)
             </h3>
             <p className="mb-4">
                 Si vous recevez un OQT (papier orange ou blanc), vous avez des délais très courts pour faire recours (souvent 30 jours, parfois moins).
             </p>
             <div className="grid md:grid-cols-2 gap-6">
                 <div className="bg-slate-700 p-4 rounded border border-slate-600">
                     <h4 className="font-bold text-white mb-2">Ce qu'il faut faire</h4>
                     <ul className="list-disc list-inside text-sm space-y-1 text-slate-300">
                         <li>Prendre une photo du document immédiatement.</li>
                         <li>Contacter un avocat le jour même.</li>
                         <li>Ne pas se présenter seul à l'Office des Étrangers.</li>
                     </ul>
                 </div>
             </div>
        </div>
      </div>
    </div>
  );
};

export default LegalAidSection;
