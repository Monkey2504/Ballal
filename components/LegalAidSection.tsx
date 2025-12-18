
import React, { useState } from 'react';
import { Shield, Scale, Zap, GraduationCap, Home, X, Phone, MapPin, CheckCircle, Copy, ShieldAlert, ListChecks } from 'lucide-react';
import { LanguageCode } from '../types.ts';
import { translations } from '../utils/translations.ts';

interface LegalAidSectionProps {
  language?: LanguageCode;
}

const LegalAidSection: React.FC<LegalAidSectionProps> = ({ language = 'fr' }) => {
  const [isFlashMode, setIsFlashMode] = useState(false);
  const [copied, setCopied] = useState(false);
  const t = translations[language] || translations['fr'];

  const script = "Ceci est mon domicile privé. Je refuse l'entrée sans mandat (Art. 15 Const.). Je garde le silence jusqu'à l'arrivée de mon avocat.";

  const handleCopy = () => {
    navigator.clipboard.writeText(script);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const DuctTape = ({ className = "", color = "bg-earth-black/80" }) => (
    <div className={`absolute h-8 w-32 -rotate-3 z-30 border-x border-white/10 ${color} ${className}`}></div>
  );

  return (
    <div className="min-h-screen bg-soft-paper pb-24">
      
      {/* FLASH MODE (MODE SURVIE) */}
      {isFlashMode && (
        <div className="fixed inset-0 z-[200] bg-guinea-red text-white flex flex-col items-center justify-center p-8 animate-in fade-in duration-200">
           <button onClick={() => setIsFlashMode(false)} className="absolute top-8 right-8 text-white hover:scale-110 transition-transform">
             <X className="h-12 w-12" />
           </button>
           <ShieldAlert className="h-24 w-24 mb-8 animate-pulse text-guinea-yellow" />
           <h2 className="text-5xl md:text-8xl font-black uppercase text-center mb-10 tracking-tighter leading-none">NE PAS OUVRIR</h2>
           <div className="bg-white text-earth-black p-8 md:p-12 max-w-3xl w-full border-4 border-earth-black shadow-brutal rotate-1 relative">
             <p className="font-mono text-2xl md:text-4xl font-black uppercase leading-tight">
               "{script}"
             </p>
             <button 
                onClick={handleCopy}
                className="absolute -bottom-6 -right-6 bg-earth-black text-white p-4 rounded-xl shadow-xl flex items-center gap-2 hover:bg-guinea-green transition-all"
             >
                {copied ? <CheckCircle className="h-6 w-6" /> : <Copy className="h-6 w-6" />}
                <span className="font-black text-xs uppercase tracking-widest">{copied ? "COPIÉ" : "COPIER LE SCRIPT"}</span>
             </button>
           </div>
           <p className="mt-16 font-black uppercase tracking-[0.3em] animate-pulse flex items-center gap-4">
             <Zap className="h-6 w-6 text-guinea-yellow" /> Filmez tout • Gardez votre calme • Article 15 Constitution
           </p>
        </div>
      )}

      {/* HERO SECTION */}
      <div className="bg-earth-black text-white py-24 border-b-[12px] border-guinea-red relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 african-pattern"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="bg-guinea-yellow text-earth-black inline-block px-4 py-1 font-black uppercase -rotate-2 mb-6 border-2 border-white shadow-xl">
             GUIDE DE SURVIE JURIDIQUE
          </div>
          <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-none mb-6">
            TES <span className="text-guinea-red">DROITS</span>,<br/>TES <span className="text-guinea-green">ARMES</span>
          </h1>
          <p className="text-xl md:text-3xl font-bold italic max-w-3xl leading-tight border-l-8 border-guinea-yellow pl-8 uppercase">
            "{t.legal_intro}"
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-12 relative z-20">
        
        {/* SOS BUTTON */}
        <button 
          onClick={() => setIsFlashMode(true)}
          className="w-full bg-guinea-red text-white p-8 border-4 border-earth-black shadow-brutal hover:translate-y-1 hover:shadow-none transition-all flex items-center justify-center gap-6 group mb-20"
        >
          <Zap className="h-12 w-12 text-guinea-yellow group-hover:scale-125 transition-transform" />
          <span className="text-3xl md:text-5xl font-black uppercase tracking-tighter">MODE URGENCE POLICE</span>
          <Zap className="h-12 w-12 text-guinea-yellow group-hover:scale-125 transition-transform" />
        </button>

        <div className="grid md:grid-cols-2 gap-12">
          
          {/* Éducation */}
          <div className="bg-white border-4 border-earth-black p-8 shadow-brutal relative -rotate-1">
             <DuctTape className="-top-4 left-10 bg-guinea-green" />
             <div className="flex items-center gap-4 mb-6">
               <div className="p-3 bg-earth-black text-white rounded-lg"><GraduationCap className="h-8 w-8" /></div>
               <h3 className="text-2xl font-black uppercase leading-none">{t.legal_school_title}</h3>
             </div>
             <p className="text-lg font-bold mb-6 italic">"{t.legal_school_subtitle}"</p>
             <ul className="space-y-4 font-mono text-sm font-bold uppercase">
               <li className="flex gap-2"><CheckCircle className="h-5 w-5 text-guinea-green shrink-0" /> {t.legal_school_point1}</li>
               <li className="flex gap-2"><CheckCircle className="h-5 w-5 text-guinea-green shrink-0" /> {t.legal_school_point2}</li>
             </ul>
          </div>

          {/* Habitat - Lien Tactique */}
          <div className="bg-white border-4 border-earth-black p-8 shadow-brutal-red relative rotate-1">
             <DuctTape className="-top-4 right-10 bg-guinea-red" />
             <div className="flex items-center gap-4 mb-6">
               <div className="p-3 bg-earth-black text-white rounded-lg"><Home className="h-8 w-8" /></div>
               <h3 className="text-2xl font-black uppercase leading-none">{t.legal_home_title}</h3>
             </div>
             <div className="bg-guinea-red text-white p-4 font-black uppercase text-sm mb-4">
                {t.legal_home_warrant}
             </div>
             <p className="text-gray-700 font-bold mb-6">{t.legal_home_police}</p>
             <button 
                onClick={() => setIsFlashMode(true)}
                className="w-full bg-earth-black text-white py-4 font-black uppercase hover:bg-guinea-red transition-colors flex items-center justify-center gap-3"
             >
               <Zap className="h-5 w-5 text-guinea-yellow" />
               ACTIVER LE GUIDE D'URGENCE
             </button>
          </div>

          {/* Stratégies de Régularisation - Refonte Activiste */}
          <div className="md:col-span-2 bg-white border-4 border-earth-black p-10 shadow-brutal relative">
             <div className="inline-block bg-guinea-yellow text-earth-black px-4 py-1 font-black text-xs uppercase tracking-widest mb-6">STRATÉGIES DE LUTTE</div>
             <h3 className="text-4xl font-black uppercase mb-8 border-b-4 border-earth-black pb-4">Comment se régulariser ?</h3>
             
             <div className="grid md:grid-cols-2 gap-12">
                {/* Article 9ter - Mis en avant (Humanitaire) */}
                <div className="space-y-6">
                   <div className="flex items-center gap-3">
                      <h4 className="text-3xl font-black uppercase text-guinea-green underline italic decoration-4 underline-offset-8">Article 9ter</h4>
                      <span className="bg-guinea-green text-white text-[10px] px-2 py-0.5 font-bold rounded">PLUS ACCESSIBLE</span>
                   </div>
                   <p className="font-bold leading-tight uppercase text-lg">Circonstances exceptionnelles & Ancrage Social.</p>
                   <p className="text-sm text-gray-600 leading-relaxed italic">
                     "C'est la voie principale pour ceux qui ont des enfants scolarisés, qui travaillent ou sont impliqués dans la communauté."
                   </p>
                   <div className="bg-gray-50 p-6 rounded-2xl border-2 border-dashed border-gray-200">
                      <h5 className="font-black text-xs uppercase mb-4 flex items-center gap-2"><ListChecks className="h-4 w-4 text-guinea-green" /> TACTIQUE VISIBLE : PREUVES À COLLECTER</h5>
                      <ul className="text-[11px] font-bold space-y-2 uppercase">
                         <li className="flex gap-2">● Attestations de scolarité (enfants)</li>
                         <li className="flex gap-2">● Preuves de participation associative</li>
                         <li className="flex gap-2">● Contrats informels ou fiches de paie</li>
                         <li className="flex gap-2">● Factures et preuves de résidence continue</li>
                      </ul>
                   </div>
                </div>

                {/* Article 9bis - Secondaire (Médical) */}
                <div className="space-y-6">
                   <h4 className="text-3xl font-black uppercase text-guinea-red underline italic decoration-4 underline-offset-8">Article 9bis</h4>
                   <p className="font-bold leading-tight uppercase text-lg">Raisons Médicales Graves.</p>
                   <p className="text-sm text-gray-600 leading-relaxed italic">
                     "Extrêmement difficile à obtenir. Nécessite une pathologie dont le traitement est inexistant ou inaccessible en Guinée."
                   </p>
                   <div className="bg-gray-50 p-6 rounded-2xl border-2 border-dashed border-gray-200">
                      <h5 className="font-black text-xs uppercase mb-4 flex items-center gap-2"><ListChecks className="h-4 w-4 text-guinea-red" /> DOSSIER TECHNIQUE</h5>
                      <ul className="text-[11px] font-bold space-y-2 uppercase">
                         <li className="flex gap-2">● Rapport médical circonstancié</li>
                         <li className="flex gap-2">● Preuve de l'absence de soins en Guinée</li>
                         <li className="flex gap-2">● Certificat de non-voyageabilité</li>
                      </ul>
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* CONTACTS PRIORISÉS */}
        <div className="mt-24 grid md:grid-cols-2 gap-12 items-start">
           <div className="bg-earth-black text-white p-12 shadow-brutal-red -rotate-1">
              <h3 className="text-3xl font-black uppercase mb-8 text-guinea-red">URGENCES 24/7</h3>
              <div className="space-y-10">
                 <div className="border-b-4 border-guinea-yellow/20 pb-6 group cursor-pointer">
                    <span className="block text-xs uppercase font-mono text-guinea-yellow mb-2">1. RÉFLEXE AVOCAT (Urgence Juridique)</span>
                    <a href="tel:025115483" className="text-5xl md:text-7xl font-black tracking-tighter hover:text-guinea-yellow transition-colors">02 511 54 83</a>
                 </div>
                 <div>
                    <span className="block text-xs uppercase font-mono text-gray-500 mb-2">2. SECOURS (Si danger immédiat)</span>
                    <span className="text-4xl font-black tracking-tighter opacity-50">112</span>
                 </div>
              </div>
           </div>
           
           <div className="p-8 border-4 border-earth-black bg-white shadow-brutal rotate-1">
              <h3 className="text-3xl font-black uppercase mb-4">PERMANENCE BALLAL</h3>
              <p className="text-xl font-bold mb-6 italic uppercase">"Une main tendue, un bouclier levé."</p>
              <div className="space-y-6 font-black">
                 <a href="tel:0493434383" className="flex items-center gap-4 text-3xl hover:text-guinea-red transition-all">
                    <Phone className="h-10 w-10 text-guinea-green" /> 0493 43 43 83
                 </a>
                 <div className="flex items-start gap-4 text-sm uppercase">
                    <MapPin className="h-6 w-6 shrink-0 text-guinea-red" />
                    Place Masui 9, 1030 Bruxelles
                 </div>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default LegalAidSection;
