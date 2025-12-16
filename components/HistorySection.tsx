import React, { useState } from 'react';
import { 
  BookOpen, Flag, GraduationCap, Globe, Home, Users, 
  ArrowDown, ChevronRight, Sparkles, MapPin, Quote, Camera, 
  Newspaper, Coffee, ImageOff, TrendingUp, AlertCircle, Smartphone, Briefcase
} from 'lucide-react';
import { LanguageCode } from '../types.ts';
import { translations } from '../utils/translations.ts';

interface HistorySectionProps {
  language: LanguageCode;
}

const HistorySection: React.FC<HistorySectionProps> = ({ language }) => {
  const t = translations[language] || translations['fr'];
  const isRtl = language === 'ar';

  // Fonction de gestion d'erreur d'image
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.onerror = null; // Empêche la boucle infinie
    // Image de secours abstraite et légère
    e.currentTarget.src = "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop"; 
    e.currentTarget.alt = "Image non disponible";
    // Ajout d'une classe pour indiquer le mode fallback si nécessaire (optionnel)
    e.currentTarget.classList.add('opacity-50', 'grayscale'); 
  };

  // Images d'illustration fiabilisées
  const images = {
    independance: "https://i.imgur.com/EPEdzOF.png", // Photo historique De Gaulle / Guinée 1958
    students: "https://i.imgur.com/9CxUOIj.png", // Photo historique Boursiers d'État
    exil: "https://i.imgur.com/o9pUOZw.png", // Photo historique Exil / Asile
    matonge: "https://i.imgur.com/EZdOQPM.png", // Photo Vague 3 (Ancrage)
    route: "https://imgur.com/s3XuBNm.png" // Nouvelle photo Vague 4 (Jeunesse/Groupe)
  };

  return (
    <section 
      id="history-section"
      className="min-h-screen bg-[#FFFBF0] overflow-hidden font-sans"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* --- EN-TÊTE TYPE "MAGAZINE" --- */}
      <div className="relative pt-24 pb-16 md:pt-32 md:pb-24 px-4 sm:px-6 lg:px-8 border-b-4 border-black">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none" 
             style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'1\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'3\'/%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'3\'/%3E%3C/g%3E%3C/svg%3E")' }}>
        </div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <span className="inline-block py-1 px-3 border-2 border-black font-black text-xs uppercase tracking-[0.2em] mb-4 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            Dossier Spécial
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 leading-none tracking-tight">
            L'ÉPOPÉE <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#CE1126] via-[#FCD116] to-[#009460]">
              BELGO-GUINÉENNE
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 font-serif italic max-w-3xl mx-auto leading-relaxed border-l-4 border-[#CE1126] pl-6 text-left">
            "De l'audace de 1958 aux trottoirs vibrants de Matonge en 2024. Une histoire en quatre actes d'une communauté qui a su rester debout, loin de ses terres."
          </p>
        </div>
      </div>

      {/* --- CHAPITRE 0 : L'ÉTINCELLE (1958) --- */}
      <article className="relative py-20 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-full h-full border-4 border-[#CE1126] z-0"></div>
              <img 
                src={images.independance} 
                alt="Indépendance Guinée" 
                className="relative z-10 w-full h-[500px] object-cover grayscale contrast-125 shadow-xl bg-gray-200"
                onError={handleImageError}
              />
              <div className="absolute bottom-4 left-4 z-20 bg-black text-white px-4 py-2 font-mono text-sm">
                ARCHIVE : CONAKRY, 1958
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-[#CE1126]">
                <Flag className="h-8 w-8" />
                <span className="font-black text-4xl tracking-tighter">1958</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
                Le "NON" qui a résonné jusqu'à Bruxelles.
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed font-serif">
                Tout commence par un refus. Le 28 septembre 1958, la Guinée dit "NON" au Général de Gaulle. Ce n'est pas seulement une date politique, c'est l'acte de naissance d'une identité : la <strong className="text-slate-900">Fierté Guinéenne</strong>.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed font-serif">
                En Belgique, ancienne puissance coloniale, ce geste est observé avec stupeur. Pour les rares Guinéens présents à l'époque, c'est le début d'une singularité : ils ne sont pas des "colonisés", ils sont les citoyens de la première nation libre d'Afrique francophone subsaharienne.
              </p>
              
              <div className="bg-[#FFFBF0] p-6 border-l-4 border-black mt-6 relative">
                <Quote className="absolute top-4 right-4 h-8 w-8 text-gray-200" />
                <h4 className="font-bold text-sm uppercase tracking-wide mb-2 flex items-center gap-2">
                  <Newspaper className="h-4 w-4" /> Le contexte de l'époque
                </h4>
                <p className="text-sm text-gray-700 italic">
                  "Nous préférons la pauvreté dans la liberté à la richesse dans l'esclavage." <br/>
                  — Sékou Touré. Une phrase qui deviendra le ciment moral de la diaspora, même dans les moments les plus durs de l'exil.
                </p>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* --- CHAPITRE 1 : L'ÉLITE (1960-1980) --- */}
      <article className="relative py-20 bg-slate-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center md:flex-row-reverse">
            
            {/* Contenu Texte (Gauche sur desktop pour alternance) */}
            <div className="space-y-6 order-2 md:order-1">
              <div className="flex items-center gap-4 text-[#FCD116]">
                <GraduationCap className="h-8 w-8 text-yellow-600" />
                <span className="font-black text-4xl tracking-tighter text-slate-900">VAGUE 1</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
                Les "Boursiers d'État" : L'Excellence comme mission.
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed font-serif">
                Ils n'étaient pas venus pour rester. Ils étaient venus pour apprendre et repartir bâtir la nation. Dans les années 60 et 70, la Belgique accueille la crème de la jeunesse guinéenne.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed font-serif">
                À l'ULB (Bruxelles), à l'UCL (Louvain) ou à Liège, ces étudiants en médecine, polytechnique ou droit se distinguent par leur rigueur. C'est une immigration masculine, intellectuelle, structurée.
              </p>

              {/* Note du Reporter */}
              <div className="relative mt-8 group cursor-pointer perspective">
                <div className="absolute inset-0 bg-yellow-100 transform rotate-1 rounded-lg border-2 border-slate-900 translate-x-2 translate-y-2 transition-transform group-hover:translate-x-3 group-hover:translate-y-3"></div>
                <div className="relative bg-white p-6 rounded-lg border-2 border-slate-900 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="bg-slate-900 text-white p-1 rounded">
                      <Camera className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm uppercase">Focus : Le "Cercle"</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        C'est à cette époque que naissent les premières associations d'étudiants guinéens. Des lieux de débats passionnés sur le Pan-africanisme, où l'on refaisait le monde autour d'une bière belge, en rêvant de Conakry.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Image (Droite sur desktop) */}
            <div className="relative order-1 md:order-2">
              <div className="aspect-[4/5] md:aspect-square overflow-hidden rounded-xl border-4 border-white shadow-2xl">
                <img 
                  src={images.students} 
                  alt="Étudiants années 70" 
                  className="w-full h-full object-cover sepia-[.3] bg-gray-200"
                  onError={handleImageError}
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-[#FCD116] text-slate-900 px-6 py-4 font-black text-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-black transform -rotate-2">
                1960 — 1980
              </div>
            </div>

          </div>
        </div>
      </article>

      {/* --- CHAPITRE 2 : L'EXIL (1990s) --- */}
      <article className="relative py-20 bg-slate-900 text-white border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            
            <div className="relative">
              {/* Effet photo polaroid sombre */}
              <div className="bg-white p-2 pb-12 shadow-2xl transform rotate-1 rounded-sm">
                <img 
                  src={images.exil} 
                  alt="Manifestation Bruxelles" 
                  className="w-full h-[400px] object-cover grayscale contrast-125 bg-gray-800"
                  onError={handleImageError}
                />
                <div className="text-black font-handwriting text-center mt-4 text-xl font-bold opacity-80" style={{fontFamily: 'cursive'}}>
                  Bruxelles, l'hiver de l'exil
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="inline-block px-3 py-1 bg-red-600 text-white font-bold text-sm tracking-wider mb-2">
                VAGUE 2 : RUPTURE POLITIQUE
              </div>
              <h2 className="text-4xl md:text-5xl font-black leading-none">
                Quand l'asile devient <br/>la seule issue.
              </h2>
              <p className="text-xl text-gray-300 font-serif leading-relaxed">
                Les années 90 marquent un tournant sombre. L'instabilité politique à Conakry pousse des milliers d'opposants, de journalistes et de militants sur les routes.
              </p>
              <p className="text-lg text-gray-400 leading-relaxed">
                La Belgique n'est plus seulement une université, elle devient un <strong>refuge</strong>. On ne vient plus par choix, mais par survie. C'est l'époque des centres d'accueil, de l'attente angoissante des papiers, de la solidarité qui s'organise dans les sous-sols.
              </p>
              
              <div className="border-l-2 border-red-600 pl-6 py-2">
                <p className="text-white italic text-lg">
                  "On est arrivés avec nos valises et nos diplômes, mais ici, il a fallu tout recommencer à zéro. Laver la vaisselle, conduire des taxis, en attendant que le statut change."
                </p>
                <p className="text-sm text-red-400 mt-2">— Témoignage d'un ancien, arrivé en 1992.</p>
              </div>
            </div>

          </div>
        </div>
      </article>

      {/* --- CHAPITRE 3 : L'ENRACINEMENT (2000s) --- */}
      <article className="relative py-24 bg-gradient-to-br from-amber-50 to-orange-100 overflow-hidden border-b border-orange-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            
            {/* Colonne Gauche : Faits Historiques */}
            <div className="lg:w-1/2 space-y-8">
              <div>
                <span className="text-orange-700 font-black text-lg tracking-widest uppercase mb-2 block flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" /> Vague 3 : 2000-2010
                </span>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
                  L'Ancrage & La Citoyenneté
                </h2>
                <div className="w-20 h-2 bg-orange-500 mb-6"></div>
              </div>

              <div className="prose prose-lg text-gray-800">
                <p>
                  Ce n'est plus seulement une immigration de passage, c'est une <strong>implantation durable</strong>. Les années 2000 marquent un tournant législatif et démographique majeur pour la communauté guinéenne en Belgique.
                </p>
                
                <ul className="space-y-6 mt-6">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-white rounded-full flex items-center justify-center border-2 border-orange-200 shadow-sm mt-1">
                      <span className="font-black text-orange-600">01</span>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-bold text-slate-900 text-lg">La Grande Régularisation (2000)</h4>
                      <p className="text-sm text-gray-700 mt-1">
                        La "Loi Golde" permet à des milliers de sans-papiers, dont une forte proportion de Guinéens, d'obtenir enfin un statut légal. C'est le début du regroupement familial massif et de la stabilisation des foyers.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-white rounded-full flex items-center justify-center border-2 border-orange-200 shadow-sm mt-1">
                      <span className="font-black text-orange-600">02</span>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-bold text-slate-900 text-lg">Le Choc du 28 Septembre 2009</h4>
                      <p className="text-sm text-gray-700 mt-1">
                        Suite aux événements tragiques du stade de Conakry, la diaspora belge organise des manifestations historiques à Bruxelles (Schuman). La communauté devient un acteur politique visible et structuré.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Colonne Droite : Visuel et Stats */}
            <div className="lg:w-1/2 relative">
              {/* Carte des Stats */}
              <div className="absolute -left-8 top-12 z-20 bg-white p-6 rounded-xl shadow-2xl border-l-4 border-orange-500 max-w-xs hidden md:block transform -rotate-3">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Impact Communautaire</h4>
                <div className="space-y-4">
                  <div>
                    <div className="text-3xl font-black text-slate-900">35%</div>
                    <div className="text-xs font-medium text-gray-600">Augmentation des commerces guinéens à Matonge</div>
                  </div>
                  <div className="w-full h-px bg-gray-100"></div>
                  <div>
                    <div className="text-3xl font-black text-slate-900">2009</div>
                    <div className="text-xs font-medium text-gray-600">Année charnière de mobilisation politique</div>
                  </div>
                </div>
              </div>

              {/* Image Principale */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white rotate-2 hover:rotate-0 transition-transform duration-500 group">
                <img 
                  src={images.matonge} 
                  alt="Communauté Guinéenne années 2000" 
                  className="w-full h-[500px] object-cover filter sepia-[0.15] contrast-110"
                  onError={handleImageError}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent">
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="h-5 w-5 text-orange-400" />
                      <span className="font-bold uppercase tracking-widest text-sm">Ixelles & Liège</span>
                    </div>
                    <p className="font-medium text-sm text-gray-200">
                      Les familles s'installent, les enfants grandissent en Belgique. La communauté prend racine.
                    </p>
                  </div>
                </div>
              </div>

              {/* Note contextuelle */}
              <div className="mt-8 bg-white/60 backdrop-blur-sm p-4 rounded-lg border border-orange-200 flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-orange-900 font-medium">
                  <strong>Le saviez-vous ?</strong> C'est durant cette décennie que naissent les principales fédérations d'associations guinéennes, unifiant les peuls, malinkés, soussous et forestiers sous une bannière solidaire en Belgique.
                </p>
              </div>

            </div>
          </div>
        </div>
      </article>

      {/* --- CHAPITRE 4 : AUJOURD'HUI (2010-2024) --- */}
      <article className="relative py-24 bg-[#F0FDF4] overflow-hidden border-b border-green-200">
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-100 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            
            <div className="md:w-1/2">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white border border-green-200 shadow-sm mb-6">
                <span className="flex h-3 w-3 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-xs font-bold text-green-800 uppercase tracking-wide">Vague 4 : 2010 - Présent</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
                La Génération <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-800">
                  Résilience & Digitale
                </span>
              </h2>
              
              <div className="prose prose-lg text-gray-600 mb-8">
                <p>
                  Les années 2010 marquent une rupture démographique et sociologique. C'est l'ère de la "route", des MENA (Mineurs Étrangers Non Accompagnés) et de l'hyper-connexion.
                </p>
              </div>

              {/* Timeline Vague 4 */}
              <div className="space-y-6 border-l-4 border-green-200 pl-6 ml-2">
                <div className="relative">
                  <div className="absolute -left-[34px] top-1 h-5 w-5 rounded-full border-4 border-white bg-green-500"></div>
                  <h4 className="font-bold text-slate-900 text-lg">2015 : La Crise de l'Accueil</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Arrivée massive de mineurs isolés. La communauté s'organise via WhatsApp pour pallier les manquements de l'État (hébergement citoyen, aide d'urgence).
                  </p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[34px] top-1 h-5 w-5 rounded-full border-4 border-white bg-green-500"></div>
                  <h4 className="font-bold text-slate-900 text-lg">L'Intégration par le Métier</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Faute de reconnaissance des diplômes, cette génération se tourne massivement vers les métiers en pénurie : soins de santé, construction, logistique et IT. Ils deviennent des piliers essentiels de l'économie belge.
                  </p>
                </div>
              </div>

              <a href="#contact" className="inline-flex items-center mt-10 px-8 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-black transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                <Briefcase className="mr-2 h-5 w-5" />
                Rejoindre le réseau pro
              </a>
            </div>

            <div className="md:w-1/2 relative">
              {/* Carte Stats Flottante */}
              <div className="absolute -top-10 -right-10 z-20 bg-white p-6 rounded-2xl shadow-xl border border-green-100 max-w-[280px] hidden lg:block animate-in fade-in slide-in-from-bottom-4 duration-1000">
                <div className="flex items-center gap-3 mb-4 border-b border-gray-100 pb-3">
                  <Smartphone className="h-6 w-6 text-green-600" />
                  <span className="font-bold text-slate-900 text-sm uppercase">Solidarité 2.0</span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500 font-medium">Groupes WhatsApp</span>
                    <span className="font-black text-slate-900">50+</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-green-500 h-full w-[80%]"></div>
                  </div>
                  <p className="text-xs text-gray-400 italic mt-2">
                    Le smartphone est devenu l'outil n°1 de l'organisation communautaire.
                  </p>
                </div>
              </div>

              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-white group">
                <img 
                  src={images.route} 
                  alt="Jeunesse Guinéenne Active" 
                  className="w-full h-[550px] object-cover hover:scale-105 transition-transform duration-700"
                  onError={handleImageError}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-900/90 via-transparent to-transparent">
                  <div className="absolute bottom-8 left-8 right-8">
                    <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-bold rounded mb-3 border border-white/30">
                      AUJOURD'HUI
                    </span>
                    <p className="text-white font-medium text-lg leading-relaxed shadow-sm">
                      "Ils ne demandent pas l'aumône, ils demandent du travail. C'est une génération d'entrepreneurs et de bâtisseurs qui émerge."
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </article>

      {/* --- FOOTER DE SECTION --- */}
      <div className="bg-black py-12 text-center">
        <p className="text-gray-500 uppercase tracking-widest text-sm mb-4">Ballal ASBL</p>
        <p className="text-white text-xl font-serif max-w-2xl mx-auto italic">
          "Nous sommes le fruit de ces quatre vagues. Une communauté plurielle, fière de ses racines et actrice de son avenir en Belgique."
        </p>
        <div className="mt-8">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-white hover:text-[#CE1126] transition-colors">
            <ArrowDown className="h-6 w-6 mx-auto rotate-180" />
            <span className="text-xs font-bold mt-2 block">REMONTER LE TEMPS</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HistorySection;