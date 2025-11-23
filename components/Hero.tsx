import React from 'react';
import { ArrowRight, ShieldCheck, Heart } from 'lucide-react';

interface HeroProps {
  onExplore: () => void;
}

const Hero: React.FC<HeroProps> = ({ onExplore }) => {
  return (
    <div className="relative bg-white overflow-hidden border-b border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <div className="inline-flex items-center px-3 py-1 rounded-full border border-green-100 bg-green-50 text-green-800 text-xs font-bold uppercase tracking-wider mb-4">
                 <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                 Association Sans But Lucratif
              </div>
              <h1 className="text-4xl tracking-tight font-black text-gray-900 sm:text-5xl md:text-6xl mb-4">
                <span className="block xl:inline">BALLAL ASBL</span>{' '}
                <span className="block text-red-600 xl:inline text-3xl sm:text-4xl md:text-5xl mt-2 font-extrabold">
                  Accueillir. Protéger. Unir.
                </span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                La structure de référence pour la communauté guinéenne en Belgique. Nous offrons une assistance juridique aux sans-papiers, un soutien social aux nouveaux arrivants et un espace de promotion culturelle.
              </p>
              <div className="mt-8 sm:mt-10 sm:flex sm:justify-center lg:justify-start gap-3">
                <div className="rounded-md shadow">
                  <button
                    onClick={onExplore}
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-bold rounded-md text-white bg-red-600 hover:bg-red-700 md:py-4 md:text-lg md:px-10 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    <ShieldCheck className="mr-2 h-5 w-5" />
                    Assistance & Droits
                  </button>
                </div>
                <div className="mt-3 sm:mt-0">
                  <button
                    className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-bold rounded-md text-gray-700 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10 transition-all"
                  >
                    <Heart className="mr-2 h-5 w-5 text-red-500" />
                    Faire un don
                  </button>
                </div>
              </div>
              <p className="mt-4 text-xs text-gray-400 uppercase tracking-widest">
                Agrée par la communauté • Fondée en 2024
              </p>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 bg-slate-100 flex items-center justify-center overflow-hidden">
        <img
          className="h-56 w-full object-cover object-center sm:h-72 md:h-96 lg:w-full lg:h-full"
          src="https://images.unsplash.com/photo-1531384441138-2736e62e0919?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
          alt="Communauté solidaire"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/20 to-transparent"></div>
      </div>
    </div>
  );
};

export default Hero;