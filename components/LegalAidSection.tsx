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

  return (
    <div className="min-h-screen bg-[#FAFAF8] pb-24">
      
      {/* FLASH MODE (MODE SURVIE) - On garde l'impact ici car c'est une urgence */}
      {isFlashMode && (
        <div className="fixed inset-0 z-[200] bg-guinea-red text-white flex flex-col items-center justify-center p-8 animate-in fade-in duration-300 backdrop-blur-md">
           <button onClick={() => setIsFlashMode(false)} className="absolute top-8 right-8 text-white hover:scale-110 transition-transform p-2 bg-black/10 rounded-full">
             <X className="h-10 w-10" />
           </button>
           <ShieldAlert className="h-24 w-24 mb-8 animate-pulse text-guinea-yellow" />
           <h2 className="text-5xl md:text-8xl font-black uppercase text-center mb-10 tracking-tighter leading-none">NE PAS OUVRIR</h2>
           <div className="bg-white text-[#0F0F0F] p-8 md:p-12 max-w-3xl w-full rounded-[2rem] shadow-2xl relative">
             <p className="font-mono text-2xl md:text-4xl font-black uppercase leading-tight text-center">
               "{script}"
             </p>
             <button 
                onClick={handleCopy}
                className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-[#0F0F0F] text-white px-8 py-4 rounded-full shadow-xl flex items-center gap-3 hover:bg-guinea-green transition-all"
             >
                {copied ? <CheckCircle className="h-6 w-6" /> : <Copy className="h-6 w-6" />}
                <span className="font-black text-xs uppercase tracking-widest">{copied ? "COPIÉ" : "COPIER LE SCRIPT"}</span>
             </button>
           </div>
        </div>
      )}

      {/* HERO SECTION */}
      <div className="bg-[#0F0F0F] text-white py-20 relative overflow-hidden">
        <div className="flag-line absolute top-0 left-0 right-0" aria-hidden="true"><span /><span /><span /></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 pt-4">
          <div className="inline-flex items-center gap-2 bg-[#FFCC00]/15 text-[#FFCC00] px-5 py-2 font-bold rounded-full text-[10px] uppercase tracking-[0.25em] mb-8 border border-[#FFCC00]/25">
            GUIDE DE PROTECTION JURIDIQUE
          </div>
          <h1 className="text-6xl md:text-8xl font-serif font-black tracking-tighter leading-[0.9] mb-8">
            Tes <span className="text-[#BE0000]">droits</span>,<br/>tes <span className="text-[#00843D]">armes</span>
          </h1>
          <p className="text-lg md:text-xl font-medium italic max-w-2xl leading-relaxed text-white/50">
            "{t.legal_intro}"
          </p>
        </div>
        <div className="flag-line absolute bottom-0 left-0 right-0" aria-hidden="true"><span /><span /><span /></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-16 relative z-20">
        
        {/* SOS BUTTON - Moins brutal, plus élégant */}
        <button 
          onClick={() => setIsFlashMode(true)}
          className="w-full bg-guinea-red text-white p-10 rounded-[2.5rem] shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 flex items-center justify-center gap-8 group mb-20 overflow-hidden relative"
        >
          <div className="absolute inset-0 bg-white/5 group-hover:bg-transparent transition-colors"></div>
          <Zap className="h-10 w-10 text-guinea-yellow group-hover:scale-125 transition-transform" />
          <span className="text-3xl md:text-5xl font-black uppercase tracking-tighter">MODE URGENCE POLICE</span>
          <Zap className="h-10 w-10 text-guinea-yellow group-hover:scale-125 transition-transform" />
        </button>

        <div className="grid md:grid-cols-2 gap-12">
          
          {/* Éducation */}
          <div className="bg-white p-10 rounded-[2.5rem] shadow-soft-elegant border border-gray-100 hover:border-guinea-green/20 transition-all group">
             <div className="flex items-center gap-5 mb-8">
               <div className="p-4 bg-guinea-green/10 text-guinea-green rounded-2xl group-hover:scale-110 transition-transform"><GraduationCap className="h-8 w-8" /></div>
               <h3 className="text-3xl font-serif font-black text-[#0F0F0F]">{t.legal_school_title}</h3>
             </div>
             <p className="text-lg font-medium text-gray-600 mb-8 italic">"{t.legal_school_subtitle}"</p>
             <ul className="space-y-4">
               <li className="flex items-start gap-4 text-gray-700 font-medium">
                 <CheckCircle className="h-5 w-5 text-guinea-green shrink-0 mt-1" /> 
                 {t.legal_school_point1}
               </li>
               <li className="flex items-start gap-4 text-gray-700 font-medium">
                 <CheckCircle className="h-5 w-5 text-guinea-green shrink-0 mt-1" /> 
                 {t.legal_school_point2}
               </li>
             </ul>
          </div>

          {/* Habitat */}
          <div className="bg-white p-10 rounded-[2.5rem] shadow-soft-elegant border border-gray-100 hover:border-guinea-red/20 transition-all group">
             <div className="flex items-center gap-5 mb-8">
               <div className="p-4 bg-guinea-red/10 text-guinea-red rounded-2xl group-hover:scale-110 transition-transform"><Home className="h-8 w-8" /></div>
               <h3 className="text-3xl font-serif font-black text-[#0F0F0F]">{t.legal_home_title}</h3>
             </div>
             <div className="bg-guinea-red text-white p-6 rounded-2xl font-bold uppercase text-sm mb-6 shadow-sm">
                ⚠️ {t.legal_home_warrant}
             </div>
             <p className="text-gray-600 font-medium mb-10 leading-relaxed">{t.legal_home_police}</p>
             <button 
                onClick={() => setIsFlashMode(true)}
                className="w-full bg-[#0F0F0F] text-white py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-guinea-red transition-all shadow-md flex items-center justify-center gap-3"
             >
               <Zap className="h-5 w-5 text-guinea-yellow" />
               Guide d'Urgence
             </button>
          </div>

          {/* Stratégies de Régularisation */}
          <div className="md:col-span-2 bg-white p-12 rounded-[3rem] shadow-soft-elegant border border-gray-100">
             <div className="inline-block bg-guinea-yellow/20 text-[#0F0F0F] px-4 py-1 rounded-full font-bold text-[10px] uppercase tracking-widest mb-8 border border-guinea-yellow/30">
                STRATÉGIES DE LUTTE
             </div>
             <h3 className="text-4xl md:text-5xl font-serif font-black text-[#0F0F0F] mb-12">Comment se régulariser ?</h3>
             
             <div className="grid md:grid-cols-2 gap-16">
                <div className="space-y-8">
                   <div className="flex items-center gap-4">
                      <h4 className="text-3xl font-serif font-black text-guinea-green underline decoration-guinea-green/30 underline-offset-8">Article 9bis</h4>
                      <span className="bg-guinea-green/10 text-guinea-green text-[10px] px-3 py-1 font-bold rounded-full uppercase">Humanitaire</span>
                   </div>
                   <p className="text-gray-700 font-medium leading-relaxed">
                     La voie principale basée sur l'ancrage social, les enfants scolarisés ou l'implication communautaire.
                   </p>
                   <div className="bg-[#FAFAF8] p-8 rounded-3xl border border-gray-100">
                      <h5 className="font-bold text-xs uppercase text-gray-400 mb-6 flex items-center gap-3"><ListChecks className="h-4 w-4" /> DOSSIER VISIBLE</h5>
                      <ul className="text-sm font-bold text-gray-600 space-y-4">
                         <li className="flex gap-3 items-start"><div className="h-2 w-2 rounded-full bg-guinea-green mt-2"></div> Scolarité des enfants</li>
                         <li className="flex gap-3 items-start"><div className="h-2 w-2 rounded-full bg-guinea-green mt-2"></div> Participation associative</li>
                         <li className="flex gap-3 items-start"><div className="h-2 w-2 rounded-full bg-guinea-green mt-2"></div> Preuves de résidence continue</li>
                      </ul>
                   </div>
                </div>

                <div className="space-y-8">
                   <div className="flex items-center gap-4">
                      <h4 className="text-3xl font-serif font-black text-guinea-red underline decoration-guinea-red/30 underline-offset-8">Article 9ter</h4>
                      <span className="bg-guinea-red/10 text-guinea-red text-[10px] px-3 py-1 font-bold rounded-full uppercase">Médical</span>
                   </div>
                   <p className="text-gray-700 font-medium leading-relaxed">
                     Raisons médicales graves nécessitant une pathologie dont le traitement est inaccessible en Guinée.
                   </p>
                   <div className="bg-[#FAFAF8] p-8 rounded-3xl border border-gray-100">
                      <h5 className="font-bold text-xs uppercase text-gray-400 mb-6 flex items-center gap-3"><ListChecks className="h-4 w-4" /> DOSSIER TECHNIQUE</h5>
                      <ul className="text-sm font-bold text-gray-600 space-y-4">
                         <li className="flex gap-3 items-start"><div className="h-2 w-2 rounded-full bg-guinea-red mt-2"></div> Rapport médical circonstancié</li>
                         <li className="flex gap-3 items-start"><div className="h-2 w-2 rounded-full bg-guinea-red mt-2"></div> Certificat de non-voyageabilité</li>
                      </ul>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalAidSection;