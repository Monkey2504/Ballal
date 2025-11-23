
import React, { useState, useEffect } from 'react';
import { ShieldCheck, Heart, Wand2, Share2 } from 'lucide-react';
import { fetchHeroImage } from '../services/geminiService';
import { LanguageCode } from '../types';
import { translations } from '../utils/translations';

interface HeroProps {
  onExplore: () => void;
  language?: LanguageCode;
  onShare: () => void;
}

const Hero: React.FC<HeroProps> = ({ onExplore, language = 'fr', onShare }) => {
  // Image par défaut en attendant l'IA
  const [bgImage, setBgImage] = useState("https://images.unsplash.com/photo-1547619292-240402b5ae5d?q=80&w=1600&auto=format&fit=crop");
  const [heroLabel, setHeroLabel] = useState<string | null>(null);

  const t = translations[language];

  useEffect(() => {
    const loadHero = async () => {
      // fetchHeroImage now returns a fallback object if quota is exceeded,
      // avoiding infinite retry loops.
      const result = await fetchHeroImage();
      if (result) {
        setBgImage(result.imageUrl);
        setHeroLabel(result.label); // label will be null if fallback is used
      }
    };
    loadHero();
  }, []);

  return (
    <div className="relative bg-white overflow-hidden border-b border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <div className="inline-flex items-center px-3 py-1 rounded-full border border-green-100 bg-green-50 text-[#009460] text-xs font-bold uppercase tracking-wider mb-4">
                 <span className="w-2 h-2 bg-[#009460] rounded-full mr-2"></span>
                 Association Sans But Lucratif
              </div>
              <h1 className="text-4xl tracking-tight font-black text-gray-900 sm:text-5xl md:text-6xl mb-4">
                <span className="block xl:inline">BALLAL ASBL</span>{' '}
                <span className="block xl:inline text-3xl sm:text-4xl md:text-5xl mt-2 font-extrabold guinea-gradient-text pb-1">
                  {t.hero_subtitle}
                </span>
              </h1>
              <p className="mt-3 text-base text-gray-600 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0 font-medium">
                {t.hero_desc}
              </p>
              <div className="mt-8 sm:mt-10 flex flex-wrap gap-3 justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <button
                    onClick={onExplore}
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-bold rounded-md text-white bg-[#CE1126] hover:bg-red-700 md:py-4 md:text-lg md:px-10 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    <ShieldCheck className="mr-2 h-5 w-5" />
                    {t.btn_assist}
                  </button>
                </div>
                <div className="mt-3 sm:mt-0">
                  <button
                    className="w-full flex items-center justify-center px-8 py-3 border-2 border-gray-100 text-base font-bold rounded-md text-gray-700 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10 transition-all hover:border-[#FCD116]"
                  >
                    <Heart className="mr-2 h-5 w-5 text-[#CE1126]" />
                    {t.btn_donate}
                  </button>
                </div>
                 <div className="mt-3 sm:mt-0">
                  <button
                    onClick={onShare}
                    className="w-full flex items-center justify-center px-4 py-3 border border-gray-100 text-base font-bold rounded-md text-gray-500 bg-gray-50 hover:bg-gray-100 md:py-4 md:text-lg transition-all"
                  >
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <p className="mt-4 text-xs text-gray-500 uppercase tracking-widest font-semibold">
                Conakry • Labé • Kankan • Nzérékoré • Bruxelles
              </p>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 bg-gray-50 flex items-center justify-center overflow-hidden relative">
        {/* Image spécifique */}
        <img
          className="h-56 w-full object-cover object-center sm:h-72 md:h-96 lg:w-full lg:h-full transition-transform hover:scale-105 duration-[2s]"
          src={bgImage}
          alt="Paysage de Guinée"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/20 to-transparent"></div>
        
        {/* Indicateur IA */}
        {heroLabel && (
            <div className="absolute bottom-4 right-4 bg-black/40 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-bold flex items-center border border-white/10 shadow-sm">
                <Wand2 className="h-3 w-3 mr-1.5 text-[#FCD116]" />
                {heroLabel} (Généré par IA)
            </div>
        )}
      </div>
      <div className="absolute bottom-0 w-full h-1 guinea-gradient-bg"></div>
    </div>
  );
};

export default Hero;
