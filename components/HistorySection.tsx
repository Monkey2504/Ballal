import React, { useState } from 'react';
import { 
  BookOpen, Flag, GraduationCap, Globe, Home, Users, 
  ArrowDown, ChevronRight, Sparkles, MapPin, Quote, Camera, 
  Newspaper, Coffee, ImageOff
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
    independance: "https://images.unsplash.com/photo-1589705321653-240960ac0e94?q=80&w=1600&auto=format&fit=crop", // Noir et blanc, foule, ambiance historique
    students: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1600&auto=format&fit=crop", // Université vintage
    exil: "https://images.unsplash.com/photo-1532074205216-d0e1f4b87368?q=80&w=1600&auto=format&fit=crop", // Manifestation / Foule floue
    matonge: "https://images.unsplash.com/photo-1596265371388-43edb10d5638?q=80&w=1600&auto=format&fit=crop", // Couleurs vives / Marché
    route: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=1600&auto=format&fit=crop" // Espoir / Horizon
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
      <article className="relative py-24 bg-white overflow-hidden">
        {/* Pattern de fond type tissu africain/wax stylisé */}
        <div className="absolute inset-0 opacity-5" 
             style={{ backgroundImage: 'radial-gradient(#CE1126 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="text-[#009460] font-black text-lg tracking-widest uppercase mb-2 block">Vague 3 : 2000-2010</span>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6">
              Matonge & La Famille
            </h2>
            <div className="w-24 h-2 bg-[#FCD116] mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Colonne 1 : Texte */}
            <div className="md:col-span-1 space-y-6 text-gray-700">
              <p className="first-letter:text-5xl first-letter:font-black first-letter:float-left first-letter:mr-3 first-letter:text-[#009460]">
                C'est le temps des retrouvailles. Les régularisations (2000, 2009) permettent le regroupement familial. La communauté change de visage : elle se féminise, elle rajeunit.
              </p>
              <p>
                Les enfants naissent belges. On ne vit plus dans l'attente du retour, on s'installe. On achète des maisons à Liège, à Charleroi. On ouvre des commerces.
              </p>
            </div>

            {/* Colonne 2 : L'ambiance visuelle */}
            <div className="md:col-span-1 relative">
              <div className="absolute inset-0 bg-black rounded-full blur-xl opacity-20 transform translate-y-4"></div>
              <img 
                src={images.matonge} 
                alt="Matonge Couleurs" 
                className="relative rounded-2xl shadow-lg w-full h-80 object-cover rotate-2 hover:rotate-0 transition-transform duration-500 bg-gray-200"
                onError={handleImageError}
              />
              <div className="absolute -right-4 top-10 bg-white p-3 shadow-lg rounded-lg max-w-[150px] text-xs font-bold text-slate-900 transform rotate-6">
                <MapPin className="h-4 w-4 inline mr-1 text-red-500" />
                Galerie d'Ixelles
              </div>
            </div>

            {/* Colonne 3 : L'ambiance sonore/goût */}
            <div className="md:col-span-1 bg-slate-50 p-6 rounded-2xl border-2 border-dashed border-gray-300">
              <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                <Coffee className="h-5 w-5 text-brown-600" />
                L'atmosphère
              </h3>
              <ul className="space-y-4 text-sm text-gray-600">
                <li className="flex gap-3">
                  <span className="font-bold text-slate-900">Le bruit :</span>
                  Les coiffeurs de la Chaussée de Wavre, la musique guinéenne qui s'échappe des boutiques.
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-slate-900">Le goût :</span>
                  L'odeur du soupou kandia le dimanche, les maquis qui ouvrent discrètement.
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-slate-900">Le lien :</span>
                  Les tontines de femmes qui deviennent les banques solidaires de la communauté.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </article>

      {/* --- CHAPITRE 4 : AUJOURD'HUI (2010-2024) --- */}
      <article className="relative py-20 bg-gradient-to-br from-[#009460] to-emerald-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-12">
            
            <div className="md:w-1/2">
              <h2 className="text-6xl md:text-8xl font-black text-white/10 absolute -top-10 left-0 select-none">
                FUTUR
              </h2>
              <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <Sparkles className="h-6 w-6 text-yellow-300" />
                  Génération "La Route" & Résilience
                </h3>
                <p className="text-lg text-emerald-100 mb-6 leading-relaxed">
                  C'est la vague la plus récente, la plus jeune, et peut-être la plus courageuse. Ils sont arrivés par la Méditerranée, traversant l'enfer pour chercher la dignité.
                </p>
                <p className="text-lg text-emerald-100 mb-8 leading-relaxed">
                  Souvent mineurs à leur arrivée (MENA), ils font preuve d'une soif d'apprendre incroyable. Ils remplissent les écoles de promotion sociale, les chantiers de formation. Ils sont la force vive de demain.
                </p>
                
                <a href="#contact" className="inline-flex items-center px-6 py-3 bg-white text-emerald-900 font-bold rounded-full hover:bg-emerald-50 transition-colors">
                  Rejoindre la communauté <ChevronRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="md:w-1/2 grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
                <div className="text-4xl font-black text-yellow-400 mb-2">25K+</div>
                <div className="text-sm text-emerald-100 font-medium">Guinéens en Belgique aujourd'hui</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 mt-8">
                <div className="text-4xl font-black text-yellow-400 mb-2">3</div>
                <div className="text-sm text-emerald-100 font-medium">Villes majeures : Bruxelles, Liège, Charleroi</div>
              </div>
              <div className="col-span-2 relative h-48 rounded-2xl overflow-hidden shadow-lg border-2 border-white/30">
                <img 
                  src={images.route} 
                  alt="Jeunesse Guinéenne" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 bg-emerald-800"
                  onError={handleImageError}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                  <p className="font-bold text-white">L'histoire continue...</p>
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