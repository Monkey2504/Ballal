
import React from 'react';
// Fix: Added missing 'Flag' to lucide-react imports.
import { ShieldCheck, Heart, ArrowRight, Flag } from 'lucide-react';
import { LanguageCode } from '../types.ts';

interface HeroProps {
  onExplore: () => void;
  language?: LanguageCode;
  onShare: () => void;
  onDonate: () => void;
}

const Hero: React.FC<HeroProps> = ({ onExplore, onDonate }) => {
  return (
    <div className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-20 overflow-hidden bg-soft-paper">
      <div className="absolute inset-0 african-pattern pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        
        <div className="space-y-12 text-center lg:text-left">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/50 backdrop-blur-sm text-guinea-red font-bold text-[10px] uppercase tracking-[0.3em] border border-guinea-red/10 shadow-sm">
            <ShieldCheck className="h-4 w-4" />
            Solidarité Guinée-Belgique
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-[110px] font-serif font-black leading-[0.85] tracking-tighter text-earth-black">
            <span className="block mb-2">Loger.</span>
            <span className="text-guinea-red/90 block mb-2">Nourrir.</span>
            <span className="text-guinea-green/90 block italic">Résister.</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
            Ici, on ne fait pas de longs discours. On s'organise pour que personne ne dorme dehors et que chacun trouve sa place.
          </p>

          <div className="flex flex-wrap justify-center lg:justify-start gap-6 pt-4">
            <button
              onClick={onExplore}
              className="bg-earth-black text-white px-10 py-5 rounded-2xl text-lg font-black hover:bg-guinea-red transition-all duration-500 flex items-center gap-3 shadow-soft-elegant group"
            >
              Rejoindre l'Entraide
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button
              onClick={onDonate}
              className="bg-white/80 backdrop-blur-sm text-earth-black border border-gray-200 px-10 py-5 rounded-2xl text-lg font-black hover:bg-gray-50 transition-all duration-500 flex items-center gap-3 shadow-soft-elegant"
            >
              <Heart className="h-5 w-5 text-guinea-red fill-guinea-red" />
              Soutenir Ballal
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="relative z-10 rounded-[3.5rem] overflow-hidden aspect-[4/5] shadow-2xl border-[12px] border-white transform lg:rotate-2 hover:rotate-0 transition-all duration-1000 ease-out bg-white group">
             <img 
               src="https://i.imgur.com/laZeGp9.jpeg"
               className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
               alt="Solidarité Guinée-Belgique"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-earth-black/30 via-transparent to-transparent opacity-60"></div>
             <div className="absolute bottom-12 left-10 right-10 text-white">
                <p className="font-serif italic text-2xl md:text-3xl leading-tight drop-shadow-md">"La dignité d'un homme ne se négocie pas."</p>
                <div className="h-1 w-16 bg-guinea-yellow mt-6 rounded-full"></div>
             </div>
          </div>
          
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-guinea-red/5 rounded-full blur-[80px]"></div>
          <div className="absolute -bottom-16 -left-16 w-80 h-80 bg-guinea-green/5 rounded-full blur-[100px]"></div>
          
          <div className="absolute -bottom-10 -right-10 z-20 bg-guinea-yellow w-32 h-32 rounded-3xl rotate-12 flex items-center justify-center shadow-xl border-4 border-white">
             <Flag className="h-12 w-12 text-earth-black fill-earth-black" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;