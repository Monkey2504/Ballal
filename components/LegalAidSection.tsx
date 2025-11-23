import React from 'react';
import { Shield, HeartPulse, Scale, Building, Phone, AlertCircle, Home, AlertTriangle, Info } from 'lucide-react';

const LegalAidSection: React.FC = () => {
  return (
    <div className="bg-slate-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Militant */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 uppercase tracking-wide">Solidarité & Droits</h2>
          <div className="h-1 w-24 bg-red-600 mx-auto my-4"></div>
          <p className="mt-4 text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Personne n'est illégal. Cette page est une ressource de <span className="font-bold text-red-600">survie et de combat juridique</span> pour nos frères et sœurs sans-papiers, en squat ou à la rue. Vous avez des droits fondamentaux, faites-les respecter.
          </p>
        </div>

        {/* Urgent Alert Banner */}
        <div className="bg-red-600 text-white p-4 mb-8 rounded-lg shadow-lg animate-pulse">
          <div className="flex items-center justify-center">
            <AlertCircle className="h-6 w-6 mr-3" />
            <p className="font-bold text-lg">
              En cas d'arrestation : Ne signez RIEN sans la présence d'un avocat. Demandez "Pro Deo" (Gratuit).
            </p>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 mb-12">
          
          {/* Section 1: Urgence Rue & Manger */}
          <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-yellow-500">
            <div className="flex items-center mb-4">
              <div className="bg-yellow-100 p-3 rounded-full">
                <Home className="h-6 w-6 text-yellow-600" />
              </div>
              <h3 className="ml-4 text-2xl font-bold text-gray-900">Urgence : Rue & Faim</h3>
            </div>
            <div className="space-y-4">
              <div className="bg-slate-50 p-3 rounded border border-slate-200">
                <p className="font-bold text-gray-800">Samusocial (Hébergement d'urgence)</p>
                <p className="text-red-600 font-mono text-xl font-bold flex items-center"><Phone className="h-4 w-4 mr-2"/> 0800 99 340</p>
                <p className="text-xs text-gray-500">Appelez tôt le matin (dès 8h) ou tard le soir.</p>
              </div>
              <div className="bg-slate-50 p-3 rounded border border-slate-200">
                <p className="font-bold text-gray-800">DoucheFLUX (Bruxelles)</p>
                <p className="text-sm text-gray-600">Douches, lessive, consignes et soutien social.</p>
                <p className="text-xs text-gray-500 italic">Rue des Vétérinaires 84, 1070 Anderlecht</p>
              </div>
              <div className="bg-slate-50 p-3 rounded border border-slate-200">
                <p className="font-bold text-gray-800">Restos du Cœur</p>
                <p className="text-sm text-gray-600">Repas chauds à prix symbolique ou gratuits.</p>
              </div>
            </div>
          </div>

          {/* Section 2: Santé (Vital) */}
          <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-green-600">
            <div className="flex items-center mb-4">
              <div className="bg-green-100 p-3 rounded-full">
                <HeartPulse className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="ml-4 text-2xl font-bold text-gray-900">Santé & AMU</h3>
            </div>
            <p className="text-gray-700 mb-4 font-medium">
              Un sans-papier a droit aux soins médicaux via l'Aide Médicale Urgente (AMU). C'est la loi.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-green-600 font-bold mr-2">1.</span>
                <span className="text-sm text-gray-600">Allez au CPAS de la commune où vous dormez (même en squat).</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 font-bold mr-2">2.</span>
                <span className="text-sm text-gray-600">Demandez un "Réquisitoire" pour voir un médecin.</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 font-bold mr-2">3.</span>
                <span className="text-sm text-gray-600">En cas de refus : Contactez <span className="font-bold">Médecins du Monde</span> (Rue Botanique 75, 1210 Bruxelles).</span>
              </li>
            </ul>
            <div className="mt-4 p-3 bg-green-50 rounded text-sm text-green-800 border border-green-200">
                <strong>Secret Médical :</strong> Le médecin et le CPAS n'ont PAS le droit de vous dénoncer à la police.
            </div>
          </div>

          {/* Section 3: Vie en Squat */}
          <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-gray-800">
            <div className="flex items-center mb-4">
              <div className="bg-gray-100 p-3 rounded-full">
                <AlertTriangle className="h-6 w-6 text-gray-800" />
              </div>
              <h3 className="ml-4 text-2xl font-bold text-gray-900">Vie en Squat</h3>
            </div>
            <div className="space-y-3 text-sm text-gray-700">
              <p>Si vous occupez un bâtiment vide :</p>
              <ul className="list-disc list-inside space-y-1 pl-2">
                <li><strong>Domiciliation :</strong> Vous pouvez demander une "adresse de référence" au CPAS si vous êtes sans abri.</li>
                <li><strong>Preuve de résidence :</strong> Gardez des preuves que vous habitez là (lettres, photos datées) pour empêcher une expulsion immédiate sans juge.</li>
                <li><strong>Expulsion :</strong> La police ne peut pas vous expulser sans une décision d'un juge de paix (sauf flagrant délit d'effraction immédiate).</li>
              </ul>
              <p className="font-bold mt-2">Si la police arrive : ne les laissez pas entrer sans mandat de perquisition.</p>
            </div>
          </div>

          {/* Section 4: Défense Juridique */}
          <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-blue-600">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Scale className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="ml-4 text-2xl font-bold text-gray-900">Défense Juridique</h3>
            </div>
            <div className="space-y-3">
              <div className="flex flex-col">
                  <span className="font-bold text-blue-800">Bureau d'Aide Juridique (BAJ)</span>
                  <span className="text-sm text-gray-600">Pour trouver un avocat Pro Deo (Gratuit).</span>
                  <span className="text-xs text-gray-500">Rue de la Régence 63, Bruxelles (Palais de Justice)</span>
              </div>
              <div className="flex flex-col">
                  <span className="font-bold text-blue-800">ADDE (Droit des étrangers)</span>
                  <span className="text-sm text-gray-600">Service juridique spécialisé immigration.</span>
                  <span className="text-xs text-gray-500">Tel: 02 227 42 41 (Lundi 9h-12h)</span>
              </div>
              <div className="flex flex-col">
                  <span className="font-bold text-blue-800">CIRE</span>
                  <span className="text-sm text-gray-600">Coordination pour les réfugiés. Service social.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section OQT et Police */}
        <div className="bg-slate-800 text-slate-100 rounded-xl p-8 mb-12">
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
                 <div className="bg-slate-700 p-4 rounded border border-slate-600">
                     <h4 className="font-bold text-white mb-2">Vos Droits</h4>
                     <ul className="list-disc list-inside text-sm space-y-1 text-slate-300">
                         <li>Vous avez le droit à un interprète.</li>
                         <li>Vous avez le droit de garder le silence.</li>
                         <li>Vous avez le droit de demander l'asile si vous craignez pour votre vie en Guinée.</li>
                     </ul>
                 </div>
             </div>
        </div>

         <div className="bg-red-50 p-6 rounded-lg text-center border border-red-100">
            <h4 className="font-bold text-red-900 mb-2 text-lg">Solidarité Communautaire</h4>
            <p className="text-red-700 mb-4">
                Ne restez pas isolé. La communauté guinéenne est grande. Si vous êtes en danger immédiat, utilisez le forum pour demander de l'aide (anonymement).
            </p>
            <button className="bg-red-600 text-white px-8 py-3 rounded-md hover:bg-red-700 transition-colors font-bold shadow">
                REJOINDRE L'ENTRAIDE
            </button>
        </div>
      </div>
    </div>
  );
};

export default LegalAidSection;