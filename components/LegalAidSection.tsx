
import React, { useState } from 'react';
import { Shield, Scale, AlertTriangle, Gavel, Home, X, Zap, GraduationCap, Phone, MapPin, ChevronRight, FileText, Clock, CheckCircle } from 'lucide-react';
import { LanguageCode } from '../types.ts';
import { translations } from '../utils/translations.ts';

interface LegalAidSectionProps {
  language?: LanguageCode;
}

const LegalAidSection: React.FC<LegalAidSectionProps> = ({ language = 'fr' }) => {
  const [isFlashMode, setIsFlashMode] = useState(false);
  const t = translations[language] || translations['fr'];

  const DuctTape = ({ className = "" }) => (
    <div className={`absolute h-8 w-32 bg-punk-black/80 -rotate-3 z-30 border-x border-white/10 ${className}`}></div>
  );

  return (
    <div className="min-h-screen bg-punk-paper pb-24">
      
      {/* FLASH MODE OVERLAY (Militant script) */}
      {isFlashMode && (
        <div className="fixed inset-0 z-[200] bg-punk-red text-white flex flex-col items-center justify-center p-8 animate-in fade-in duration-200">
           <button onClick={() => setIsFlashMode(false)} className="absolute top-8 right-8 text-white hover:scale-110 transition-transform">
             <X className="h-12 w-12" />
           </button>
           <Zap className="h-24 w-24 mb-8 animate-pulse text-punk-yellow" />
           <h2 className="text-5xl md:text-8xl font-black uppercase text-center mb-10 tracking-tighter leading-none">NE PAS OUVRIR</h2>
           <div className="bg-white text-punk-black p-8 md:p-12 max-w-3xl w-full brutal-shadow border-4 border-punk-black rotate-1">
             <p className="font-mono text-2xl md:text-3xl font-black uppercase leading-tight">
               "Ceci est mon domicile privé. Je refuse l'entrée sans mandat d'un juge d'instruction. Je garde le silence jusqu'à l'arrivée de mon avocat."
             </p>
           </div>
           <p className="mt-12 font-black uppercase tracking-widest animate-pulse">Filmez tout • Gardez votre calme • Article 15 Constitution</p>
        </div>
      )}

      {/* HERO SECTION BRUTALE */}
      <div className="bg-punk-black text-white py-24 border-b-[12px] border-punk-red relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="bg-punk-yellow text-punk-black inline-block px-4 py-1 font-black uppercase -rotate-2 mb-6 border-2 border-white shadow-xl">
             GUIDE DE SURVIE JURIDIQUE
          </div>
          <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-none mb-6">
            TES <span className="text-punk-red">DROITS</span>,<br/>TES <span className="text-punk-green">ARMES</span>
          </h1>
          <p className="text-xl md:text-3xl font-bold italic max-w-3xl leading-tight border-l-8 border-punk-yellow pl-8 uppercase">
            "{t.legal_intro}"
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-12 relative z-20">
        
        {/* SOS BUTTON MASSIVE */}
        <button 
          onClick={() => setIsFlashMode(true)}
          className="w-full bg-punk-red text-white p-8 border-4 border-punk-black brutal-shadow hover:translate-y-1 hover:shadow-none transition-all flex items-center justify-center gap-6 group mb-20"
        >
          <Zap className="h-12 w-12 text-punk-yellow group-hover:scale-125 transition-transform" />
          <span className="text-3xl md:text-5xl font-black uppercase tracking-tighter">MODE URGENCE POLICE</span>
          <Zap className="h-12 w-12 text-punk-yellow group-hover:scale-125 transition-transform" />
        </button>

        {/* LEGAL TRACTS GRID */}
        <div className="grid md:grid-cols-2 gap-12">
          
          {/* Card 1: School */}
          <div className="bg-white border-4 border-punk-black p-8 brutal-shadow relative -rotate-1">
             <DuctTape className="-top-4 left-10 bg-punk-green/80" />
             <div className="flex items-center gap-4 mb-6">
               <div className="p-3 bg-punk-black text-white rounded-lg"><GraduationCap className="h-8 w-8" /></div>
               <h3 className="text-2xl font-black uppercase leading-none">{t.legal_school_title}</h3>
             </div>
             <p className="text-lg font-bold mb-6 italic">"{t.legal_school_subtitle}"</p>
             <ul className="space-y-4 font-mono text-sm font-bold uppercase">
               <li className="flex gap-2"><CheckCircle className="h-5 w-5 text-punk-green shrink-0" /> {t.legal_school_point1}</li>
               <li className="flex gap-2"><CheckCircle className="h-5 w-5 text-punk-green shrink-0" /> {t.legal_school_point2}</li>
             </ul>
          </div>

          {/* Card 2: Home */}
          <div className="bg-white border-4 border-punk-black p-8 brutal-shadow-red relative rotate-1">
             <DuctTape className="-top-4 right-10 bg-punk-red/80" />
             <div className="flex items-center gap-4 mb-6">
               <div className="p-3 bg-punk-black text-white rounded-lg"><Home className="h-8 w-8" /></div>
               <h3 className="text-2xl font-black uppercase leading-none">{t.legal_home_title}</h3>
             </div>
             <div className="bg-punk-red text-white p-4 font-black uppercase text-sm mb-4">
                {t.legal_home_warrant}
             </div>
             <p className="text-gray-700 font-bold mb-4">{t.legal_home_police}</p>
             <button className="w-full bg-punk-black text-white py-3 font-black uppercase hover:bg-punk-red transition-colors">
               VOIR LE SCRIPT DE PORTE
             </button>
          </div>

          {/* Card 3: 9bis/9ter */}
          <div className="md:col-span-2 bg-punk-yellow border-4 border-punk-black p-10 brutal-shadow relative">
             <h3 className="text-4xl font-black uppercase mb-8 border-b-4 border-punk-black pb-4">{t.legal_strategy_title}</h3>
             <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-4">
                   <h4 className="text-2xl font-black uppercase text-punk-red underline italic">Article 9bis</h4>
                   <p className="font-bold leading-tight uppercase">{t.legal_9bis_desc}</p>
                </div>
                <div className="space-y-4">
                   <h4 className="text-2xl font-black uppercase text-punk-green underline italic">Article 9ter</h4>
                   <p className="font-bold leading-tight uppercase">{t.legal_9ter_desc}</p>
                </div>
             </div>
             <div className="mt-8 bg-punk-black text-white p-4 font-mono text-xs uppercase font-black">
                {t.legal_warning}
             </div>
          </div>

        </div>

        {/* CONTACTS BRUTAUX */}
        <div className="mt-24 grid md:grid-cols-2 gap-12 items-start">
           <div className="bg-punk-black text-white p-12 brutal-shadow-red -rotate-1">
              <h3 className="text-3xl font-black uppercase mb-8 text-punk-red">URGENCES 24/7</h3>
              <div className="space-y-8">
                 <div className="border-b-2 border-white/20 pb-4">
                    <span className="block text-xs uppercase font-mono text-gray-400">POLICE / SECOURS</span>
                    <span className="text-6xl font-black tracking-tighter">112</span>
                 </div>
                 <div className="border-b-2 border-white/20 pb-4">
                    <span className="block text-xs uppercase font-mono text-gray-400">AIDE JURIDIQUE</span>
                    <span className="text-4xl font-black tracking-tighter">02 511 54 83</span>
                 </div>
              </div>
           </div>
           
           <div className="p-8 border-4 border-punk-black bg-white brutal-shadow rotate-1">
              <h3 className="text-3xl font-black uppercase mb-4">BALLAL DIRECT</h3>
              <p className="text-xl font-bold mb-6 italic uppercase">"On ne te laisse pas seul."</p>
              <div className="space-y-4 font-black">
                 <a href="tel:0493434383" className="flex items-center gap-4 text-2xl hover:text-punk-red">
                    <Phone className="h-8 w-8" /> 0493 43 43 83
                 </a>
                 <div className="flex items-start gap-4 text-sm uppercase">
                    <MapPin className="h-8 w-8 shrink-0" />
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
