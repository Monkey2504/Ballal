import React, { useState } from 'react';
import { Menu, X, Heart, ShieldAlert, Home, History } from 'lucide-react';
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
    { label: "ACCUEIL", value: ViewState.HOME, icon: Home },
    { label: "AIDE JURIDIQUE", value: ViewState.LEGAL_AID, icon: ShieldAlert },
    { label: "SOLIDARITÉ", value: ViewState.FOOD_AUTONOMY, icon: Heart },
    { label: "HISTOIRE", value: ViewState.HISTORY, icon: History },
  ];

  return (
    <div className="fixed top-0 w-full z-[150]">
      <div className="bg-guinea-red text-white py-2 px-6 flex justify-between items-center shadow-md border-b border-white/10">
        <div className="flex items-center gap-3">
          <ShieldAlert className="h-3 w-3 text-guinea-yellow" />
          <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em]">Soutien Communautaire</span>
        </div>
        <div className="flex gap-4">
           <a href="tel:0493434383" className="font-bold text-[10px] hover:text-guinea-yellow transition-colors tracking-widest">
             BALLAL : 0493 43 43 83
           </a>
        </div>
      </div>

      <nav className="px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center bg-white/90 backdrop-blur-md px-6 py-3 rounded-2xl shadow-lg border border-gray-100">
          
          <button 
            onClick={() => setView(ViewState.HOME)}
            className="flex items-center gap-3 group"
          >
            <div className="p-2 bg-guinea-green rounded-xl group-hover:rotate-6 transition-transform">
              <Heart className="h-5 w-5 text-white fill-white" />
            </div>
            <div className="text-left hidden sm:block">
              <span className="block font-serif font-black text-xl leading-none text-earth-black">BALLAL</span>
              <span className="text-[8px] font-bold tracking-[0.2em] text-guinea-red uppercase">Belgique</span>
            </div>
          </button>

          <div className="hidden lg:flex gap-1">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => setView(item.value)}
                className={`px-4 py-2 rounded-xl font-bold text-[10px] tracking-widest uppercase transition-all flex items-center gap-2 ${
                  currentView === item.value 
                  ? 'bg-earth-black text-white' 
                  : 'text-gray-500 hover:text-earth-black hover:bg-gray-50'
                }`}
              >
                <item.icon className="h-3 w-3" />
                {item.label}
              </button>
            ))}
          </div>

          <div className="lg:hidden">
            <button 
              className="p-2 bg-earth-black text-white rounded-xl"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-24 left-6 right-6 bg-white rounded-2xl p-4 shadow-2xl border border-gray-100">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <button
                  key={item.value}
                  onClick={() => { setView(item.value); setIsMobileMenuOpen(false); }}
                  className={`w-full py-4 text-left px-6 rounded-xl font-bold uppercase text-[10px] tracking-widest flex items-center gap-4 ${currentView === item.value ? 'bg-guinea-red text-white' : 'text-gray-500 hover:bg-gray-50'}`}
                >
                  <item.icon className="h-4 w-4" />
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