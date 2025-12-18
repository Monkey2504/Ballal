import React from 'react';
import { ShieldCheck, Heart, ArrowRight } from 'lucide-react';
import { LanguageCode, ViewState } from '../types.ts';
import { translations } from '../utils/translations.ts';

interface HeroProps {
  onExplore: () => void;
  language?: LanguageCode;
  onShare: () => void;
  onDonate: () => void;
}

const Hero: React.FC<HeroProps> = ({ onExplore, language = 'fr', onShare, onDonate }) => {
  const t = translations[language] || translations['fr'];
  
  return (
    <div className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden bg-soft-paper">
      <div className="absolute inset-0 african-pattern opacity-5 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        
        <div className="space-y-10 text-center lg:text-left">
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-guinea-green/10 text-guinea-green font-black text-[10px] uppercase tracking-[0.3em] border border-guinea-green/20 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <ShieldCheck className="h-4 w-4" />
            {t.hero_asbl}
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-[100px] font-serif font-black leading-[0.9] tracking-tighter drop-shadow-sm">
            <span className="text-guinea-red block">Accueillir.</span>
            <span className="text-guinea-yellow block">Protéger.</span>
            <span className="text-guinea-green block italic">Unir.</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-700 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
            {t.hero_desc}
          </p>

          <div className="flex flex-wrap justify-center lg:justify-start gap-5">
            <button
              onClick={onExplore}
              className="bg-earth-black text-white px-10 py-5 rounded-2xl text-lg font-black hover:bg-guinea-green transition-all flex items-center gap-3 shadow-xl"
            >
              Découvrir nos actions
              <ArrowRight className="h-5 w-5" />
            </button>
            
            <button
              onClick={onDonate}
              className="bg-white text-earth-black border-4 border-earth-black px-10 py-5 rounded-2xl text-lg font-black hover:bg-gray-50 transition-all flex items-center gap-3 shadow-brutal"
            >
              <Heart className="h-5 w-5 text-guinea-red fill-guinea-red" />
              Soutenir Ballal
            </button>
          </div>
        </div>

        <div className="relative group min-h-[500px] flex items-center justify-center">
          <div className="relative z-20 rounded-[3rem] overflow-hidden w-full max-w-[500px] aspect-[3/4] shadow-2xl border-8 border-white transform lg:-rotate-2 group-hover:rotate-0 transition-all duration-700">
             <img 
               src="https://images.unsplash.com/photo-1547619292-240402b5ae5d?q=80&w=1200&auto=format&fit=crop"
               className="w-full h-full object-cover transition-opacity duration-500"
               alt="Communauté et Solidarité"
               onLoad={(e) => (e.currentTarget.style.opacity = '1')}
               style={{ opacity: 0 }}
             />
             <div className="absolute inset-0 bg-gradient-to-t from-earth-black/60 via-transparent to-transparent"></div>
             <div className="absolute bottom-10 left-10 right-10 text-white">
                <p className="font-serif italic text-2xl md:text-3xl leading-tight">"S'enraciner pour mieux s'élever ensemble."</p>
                <div className="h-1 w-20 bg-guinea-yellow mt-4"></div>
             </div>
          </div>
          
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-guinea-red/20 rounded-full blur-3xl z-0"></div>
          <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-guinea-green/20 rounded-full blur-3xl z-0"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;