
import React, { useState } from 'react';
import { Menu, X, Globe, Heart } from 'lucide-react';
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
    { label: t.nav_home, value: ViewState.HOME },
    { label: t.nav_news, value: ViewState.NEWS },
    { label: t.nav_legal, value: ViewState.LEGAL_AID },
    { label: t.nav_squat, value: ViewState.SQUAT },
    { label: t.nav_food_project, value: ViewState.FOOD_AUTONOMY },
    { label: t.nav_history, value: ViewState.HISTORY },
  ];

  return (
    <nav className="fixed top-0 w-full z-[100] px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center bg-white/80 backdrop-blur-md px-8 py-4 rounded-[2rem] shadow-xl shadow-black/5 border border-white/20">
        
        <button 
          onClick={() => setView(ViewState.HOME)}
          className="flex items-center gap-3 group"
        >
          <div className="p-2 bg-warm-red rounded-xl group-hover:rotate-12 transition-transform">
            <Heart className="h-6 w-6 text-white fill-white" />
          </div>
          <div className="text-left">
            <span className="block font-serif font-black text-2xl leading-none text-earth-black">BALLAL</span>
            <span className="text-[10px] font-bold tracking-[0.2em] text-warm-gold uppercase">Solidarité</span>
          </div>
        </button>

        <div className="hidden lg:flex gap-1">
          {navItems.map((item) => (
            <button
              key={item.value}
              onClick={() => setView(item.value)}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
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
          <button 
            className="p-2.5 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            title="Changer de langue"
          >
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

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-24 left-6 right-6 bg-white rounded-[2.5rem] p-8 shadow-2xl border border-gray-100 animate-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => { setView(item.value); setIsMobileMenuOpen(false); }}
                className={`w-full py-4 text-left px-6 rounded-2xl font-black uppercase text-sm tracking-widest ${currentView === item.value ? 'bg-terracotta text-white' : 'text-gray-400 hover:bg-gray-50'}`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
