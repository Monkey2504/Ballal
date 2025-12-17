
import React from 'react';
import { Share2, Sparkles, Heart, ArrowRight } from 'lucide-react';
import { LanguageCode } from '../types.ts';
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
    <div className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
        
        <div className="space-y-8 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-warm-green/10 text-warm-green font-bold text-sm uppercase tracking-wider">
            <Sparkles className="h-4 w-4" />
            {t.hero_asbl}
          </div>

          <h1 className="text-6xl md:text-8xl font-serif font-black leading-[1.1] text-earth-black">
            L'Union fait <br/>
            <span className="text-terracotta italic">notre force.</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
            {t.hero_desc}
          </p>

          <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
            <button
              onClick={onExplore}
              className="bg-warm-green text-white px-8 py-4 rounded-2xl text-lg font-bold hover:bg-opacity-90 transition-all flex items-center gap-3 shadow-xl shadow-warm-green/20"
            >
              Découvrir nos actions
              <ArrowRight className="h-5 w-5" />
            </button>
            
            <button
              onClick={onDonate}
              className="bg-white text-earth-black border border-gray-200 px-8 py-4 rounded-2xl text-lg font-bold hover:bg-gray-50 transition-all flex items-center gap-3 soft-shadow"
            >
              <Heart className="h-5 w-5 text-warm-red fill-warm-red" />
              Soutenir Ballal
            </button>
          </div>
        </div>

        <div className="relative">
          {/* Collage élégant */}
          <div className="relative z-10 rounded-[2.5rem] overflow-hidden aspect-[4/5] shadow-2xl">
             <img 
               src="https://images.unsplash.com/photo-1523438097201-5121b33c6035?q=80&w=1200&auto=format&fit=crop"
               className="w-full h-full object-cover"
               alt="Communauté"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-earth-black/60 to-transparent"></div>
             <div className="absolute bottom-8 left-8 right-8 text-white">
                <p className="font-serif italic text-2xl">"Ensemble pour la dignité et l'avenir de notre communauté en Belgique."</p>
             </div>
          </div>
          
          {/* Décoration culturelle */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-warm-gold/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-terracotta/10 rounded-full blur-3xl animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
