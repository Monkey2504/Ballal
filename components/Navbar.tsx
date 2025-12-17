
import React, { useState } from 'react';
import { Menu, X, Globe, Heart, Phone, ShieldAlert } from 'lucide-react';
import { ViewState, LanguageCode } from '../types.ts';
import { translations } from '../utils/translations.ts';

interface NavbarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setView, language, setLanguage }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = translations[language] || translations['fr'];

  const navItems = [
    { label: "ACCUEIL", value: ViewState.HOME },
    { label: "DROITS", value: ViewState.LEGAL_AID },
    { label: "HABITAT", value: ViewState.SQUAT },
    { label: "ALIMENTATION", value: ViewState.FOOD_AUTONOMY },
    { label: "FESTIVAL", value: ViewState.FESTIVAL },
    { label: "HISTOIRE", value: ViewState.HISTORY },
  ];

  return (
    <div className="fixed top-0 w-full z-[150]">
      {/* BANDEAU D'URGENCE */}
      <div className="bg-warm-red text-white py-2 px-6 flex justify-between items-center shadow-lg border-b border-white/20">
        <div className="flex items-center gap-3 animate-pulse">
          <ShieldAlert className="h-4 w-4 text-warm-gold" />
          <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em]">Urgence Permanente</span>
        </div>
        <a href="tel:0493434383" className="flex items-center gap-2 font-black text-xs md:text-sm hover:text-warm-gold transition-colors">
          <Phone className="h-4 w-4" />
          LIGNE BALLAL : 0493 43 43 83
        </a>
      </div>

      <nav className="px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center bg-white/95 backdrop-blur-md px-8 py-4 rounded-[1.5rem] shadow-xl border border-gray-100">
          
          <button 
            onClick={() => setView(ViewState.HOME)}
            className="flex items-center gap-3 group"
          >
            <div className="p-2 bg-warm-green rounded-xl group-hover:rotate-12 transition-transform shadow-lg shadow-warm-green/20">
              <Heart className="h-6 w-6 text-white fill-white" />
            </div>
            <div className="text-left hidden sm:block">
              <span className="block font-serif font-black text-2xl leading-none text-earth-black">BALLAL</span>
              <span className="text-[9px] font-bold tracking-[0.2em] text-warm-gold uppercase">Solidarité Guinée</span>
            </div>
          </button>

          <div className="hidden lg:flex gap-1">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => setView(item.value)}
                className={`px-4 py-2 rounded-xl font-bold text-[11px] tracking-widest uppercase transition-all ${
                  currentView === item.value 
                  ? 'bg-earth-black text-white shadow-lg' 
                  : 'text-gray-500 hover:text-earth-black hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button className="p-2.5 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <Globe className="h-5 w-5 text-gray-600" />
            </button>
            <button 
              className="lg:hidden p-2.5 bg-earth-black text-white rounded-xl"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-24 left-6 right-6 bg-white rounded-[2rem] p-6 shadow-2xl border border-gray-100 animate-in slide-in-from-top-4 duration-300">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.value}
                  onClick={() => { setView(item.value); setIsMobileMenuOpen(false); }}
                  className={`w-full py-4 text-left px-6 rounded-2xl font-black uppercase text-xs tracking-widest ${currentView === item.value ? 'bg-warm-red text-white' : 'text-gray-500 hover:bg-gray-50'}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
