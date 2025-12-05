import React from 'react';
import { Flag, Megaphone, Users, Calendar, MapPin, Target, Wallet, Lightbulb, CheckCircle, HeartHandshake } from 'lucide-react';
import { LanguageCode } from '../types.ts';
import { translations } from '../utils/translations.ts';

interface FestivalSectionProps {
  language: LanguageCode;
}

const FestivalSection: React.FC<FestivalSectionProps> = ({ language }) => {
  const t = translations[language];

  // Note: Since this is a specific dossier provided in French, the content is hardcoded in French 
  // but structural elements use the language prop if needed for future translation.
  
  return (
    <div className="min-h-screen bg-slate-50" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      
      {/* HERO HEADER */}
      <div className="bg-gradient-to-r from-red-700 via-red-600 to-orange-500 text-white py-20 relative overflow-hidden border-b-8 border-[#FCD116]">
        <div className="absolute inset-0 bg-african-pattern opacity-10 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <div className="inline-flex items-center justify-center p-4 bg-white/20 rounded-full mb-8 backdrop-blur-sm animate-pulse">
                <Flag className="h-12 w-12 text-[#FCD116]" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 leading-tight">
                Festival des Sans-Papiers
            </h1>
            <p className="text-xl md:text-2xl text-white max-w-4xl mx-auto font-medium leading-relaxed italic">
                "Célébrer la fierté, revendiquer la dignité."
            </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-10 relative z-20">
        
        {/* FESTIVAL IMAGE BANNER */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-12 border-4 border-white h-64 md:h-96 group">
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
            <img 
                src="https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?q=80&w=1600&auto=format&fit=crop"
                alt="Ambiance festival et concert solidaire"
                className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-105"
                loading="lazy"
            />
             <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8 z-20">
                 <div className="flex items-center text-white font-bold text-xl md:text-2xl">
                    <Megaphone className="h-8 w-8 text-[#FCD116] mr-3" />
                    <span className="drop-shadow-md">Une célébration de la dignité</span>
                 </div>
            </div>
        </div>

        {/* RÉSUMÉ GÉNÉRAL */}
        <article className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-12 border-t-8 border-[#009460]">
            <h2 className="text-3xl font-black text-slate-900 mb-6 flex items-center">
                <Target className="h-8 w-8 text-[#009460] mr-4" />
                Résumé Général
            </h2>
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed font-medium">
                <p>
                    <strong>Objectif Principal :</strong> La priorité immédiate pour cette première édition est de réussir un événement clair, visible et mobilisateur de 1000 personnes. Il s’agit de poser une base solide, de créer un rendez-vous cohérent et rassembleur, et de démontrer la faisabilité et l’impact du projet.
                </p>
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                    <div className="bg-red-50 p-6 rounded-xl border-l-4 border-red-500">
                        <h3 className="font-bold text-red-900 mb-2">Politique & Social</h3>
                        <p className="text-sm text-gray-800">
                            Visibiliser la cause des sans-papiers à travers un événement emblématique annuel, comparable à la Pride, symbolisant l’affirmation de leurs droits et de leur présence dans la société.
                        </p>
                    </div>
                    <div className="bg-yellow-50 p-6 rounded-xl border-l-4 border-yellow-500">
                        <h3 className="font-bold text-yellow-900 mb-2">Mobilisation</h3>
                        <p className="text-sm text-gray-800">
                            Établir un point de ralliement culturel impactant pour les soutiens et allié·e·s, afin de renforcer le tissu de solidarité citoyenne.
                        </p>
                    </div>
                </div>
            </div>
        </article>

        {/* PRÉSENTATION */}
        <section className="mb-16">
            <h2 className="text-3xl font-black text-slate-900 mb-8 tracking-tight">Le Concept</h2>
            <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
                <div className="relative z-10">
                    <p className="text-xl font-light leading-relaxed mb-6">
                        Le Festival des Sans-Papiers se donne pour mission de célébrer la fierté identitaire des personnes sans papiers, leur rappeler que naître ailleurs ne fait pas d’eux des criminels et de faire résonner leur voix dans l’espace public de façon non clivante et fédératrice.
                    </p>
                    <p className="text-gray-400 font-medium">
                        S’inscrivant dans une démarche politique affirmée, il vise à créer un événement annuel comparable aux marches des Fiertés LGBT+, mais dédié à la cause des Sans-Papiers, avec l'ambition et les moyens de durer dans le temps.
                    </p>
                </div>
            </div>
        </section>

        {/* OBJECTIFS DÉTAILLÉS */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-red-500 hover:shadow-xl transition-shadow">
                <Megaphone className="h-10 w-10 text-red-500 mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-3">Politique</h3>
                <p className="text-gray-600 text-sm">
                    Faire de la cause des Sans-Papiers une question politique majeure. Porter le message que l'accès aux droits fondamentaux est une question de dignité humaine.
                </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-yellow-500 hover:shadow-xl transition-shadow">
                <Users className="h-10 w-10 text-yellow-600 mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-3">Collectif</h3>
                <p className="text-gray-600 text-sm">
                    Affirmer la fierté et l’unité. Créer un espace festif et revendicatif où l’affirmation d’identité devient un acte politique fort.
                </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-green-500 hover:shadow-xl transition-shadow">
                <HeartHandshake className="h-10 w-10 text-green-600 mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-3">Solidarité</h3>
                <p className="text-gray-600 text-sm">
                    Mobiliser le grand public, les artistes et les acteurs culturels pour faire évoluer les mentalités et construire un large soutien.
                </p>
            </div>
        </div>

        {/* PUBLIC & TEMPORALITÉ */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white rounded-2xl shadow-md p-8">
                <h3 className="text-xl font-black text-slate-900 mb-4 flex items-center">
                    <Users className="h-6 w-6 mr-2 text-gray-400" />
                    Publics Visés
                </h3>
                <ul className="space-y-3">
                    <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 font-medium">Personnes sans papiers (acteurs premiers)</span>
                    </li>
                    <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 font-medium">Artistes engagés (migrants ou alliés)</span>
                    </li>
                    <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 font-medium">Acteurs culturels bruxellois</span>
                    </li>
                    <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 font-medium">Grand public et citoyens solidaires</span>
                    </li>
                </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-8">
                <h3 className="text-xl font-black text-slate-900 mb-4 flex items-center">
                    <Calendar className="h-6 w-6 mr-2 text-gray-400" />
                    Calendrier & Lieux
                </h3>
                <div className="space-y-6">
                    <div>
                        <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wide mb-1">Soirées Locales</h4>
                        <p className="text-gray-600 text-sm">
                            Rendez-vous dans divers lieux culturels de Bruxelles (Concerts, projections, tables rondes) pour préparer la mobilisation.
                        </p>
                    </div>
                    <div className="border-t border-gray-100 pt-4">
                        <h4 className="font-bold text-red-600 text-sm uppercase tracking-wide mb-1">Finale Nationale</h4>
                        <p className="text-gray-600 text-sm">
                            Grande soirée de rassemblement de clôture. Moment fédérateur à l'échelle du pays avec collectifs, artistes et porte-parole.
                        </p>
                    </div>
                </div>
            </div>
        </div>

        {/* AXES PARTENAIRES & PLAN D'ACTION */}
        <div className="mb-16">
            <h2 className="text-3xl font-black text-slate-900 mb-8 tracking-tight">Structuration & Action</h2>
            
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                    <div className="p-8">
                        <h3 className="font-bold text-lg mb-4 flex items-center text-blue-900">
                            <Lightbulb className="h-5 w-5 mr-2" />
                            Axes Partenaires
                        </h3>
                        <ul className="space-y-4 text-sm text-gray-600">
                            <li>
                                <strong className="text-gray-900 block mb-1">Innovate / SAW-B</strong>
                                Structuration juridique (ASBL + SA), gouvernance partagée, modèle économique hybride.
                            </li>
                            <li>
                                <strong className="text-gray-900 block mb-1">CoopCity</strong>
                                Incubation, méthodologie, structuration sociale et culturelle.
                            </li>
                        </ul>
                    </div>
                    
                    <div className="p-8 bg-gray-50">
                        <h3 className="font-bold text-lg mb-4 flex items-center text-slate-900">
                            <MapPin className="h-5 w-5 mr-2" />
                            Plan d'Action (Timing)
                        </h3>
                        <div className="space-y-4 text-sm">
                            <div>
                                <span className="font-bold text-xs uppercase text-gray-400 tracking-wider">Septembre</span>
                                <p className="text-gray-800 font-medium">Infos CoopCity, RDV Innovate, Canevas dossier Ville.</p>
                            </div>
                            <div>
                                <span className="font-bold text-xs uppercase text-gray-400 tracking-wider">Octobre-Novembre</span>
                                <p className="text-gray-800 font-medium">Budget détaillé, Programmation artistique, Méthodologie bénéficiaires.</p>
                            </div>
                            <div>
                                <span className="font-bold text-xs uppercase text-gray-400 tracking-wider">Décembre-Janvier</span>
                                <p className="text-gray-800 font-medium">Dépôt dossier Ville, Affirmation légitimité politique.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* BUDGET & RETOMBÉES */}
        <div className="grid md:grid-cols-2 gap-8">
             <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
                <h3 className="font-bold text-lg mb-4 flex items-center text-slate-900">
                    <Wallet className="h-5 w-5 mr-2 text-green-600" />
                    Modèle Économique
                </h3>
                <div className="space-y-4">
                    <div>
                        <h4 className="text-sm font-bold text-gray-500 uppercase">Dépenses</h4>
                        <p className="text-sm text-gray-700">Location, cachets artistiques, logistique, communication, assurances.</p>
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-gray-500 uppercase">Recettes</h4>
                        <p className="text-sm text-gray-700">Subventions, sponsoring, financement participatif, tokens, billetterie.</p>
                    </div>
                </div>
             </div>

             <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
                <h3 className="font-bold text-lg mb-4 flex items-center text-slate-900">
                    <CheckCircle className="h-5 w-5 mr-2 text-blue-600" />
                    Retombées Attendues
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 mt-1.5"></span>
                        <strong>Culturelles :</strong> Enrichissement du tissu culturel bruxellois.
                    </li>
                    <li className="flex items-start">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 mt-1.5"></span>
                        <strong>Sociales :</strong> Inclusion, empowerment des sans-papiers.
                    </li>
                    <li className="flex items-start">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 mt-1.5"></span>
                        <strong>Politiques :</strong> Reconnaissance institutionnelle.
                    </li>
                </ul>
             </div>
        </div>

      </div>
    </div>
  );
};

export default FestivalSection;