
import React, { useState } from 'react';
import { Menu, X, Heart, ShieldAlert, LogIn } from 'lucide-react';
import { ViewState, LanguageCode } from '../types.ts';
import { MAIN_NAV_ITEMS } from '../constants/navigation.ts';
import { useAuth } from '../contexts/AuthContext.tsx';

interface NavbarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  onOpenAuth: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setView, onOpenAuth }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  const handleNavClick = (view: ViewState) => {
    setView(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="fixed top-0 w-full z-[150]">
      <div className="bg-guinea-red text-white py-2 px-6 flex justify-between items-center border-b border-white/10">
        <div className="flex items-center gap-3">
          <ShieldAlert className="h-3 w-3 text-guinea-yellow" />
          <span className="text-[9px] font-bold uppercase tracking-[0.2em]">Réseau Ballal Belgique</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="tel:0493434383" className="font-bold text-[9px] hover:text-guinea-yellow transition-colors tracking-widest">
            URGENCE : 0493 43 43 83
          </a>
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-bold uppercase">{user?.name}</span>
              <button onClick={logout} className="text-[9px] font-bold underline hover:text-guinea-yellow">DÉCONNEXION</button>
            </div>
          ) : (
            <button onClick={onOpenAuth} className="flex items-center gap-1 text-[9px] font-bold hover:text-guinea-yellow transition-colors">
              <LogIn className="h-3 w-3" /> ACCÈS MEMBRE
            </button>
          )}
        </div>
      </div>

      <nav className="px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center bg-white/95 backdrop-blur-md px-6 py-3 rounded-2xl shadow-soft-elegant border border-gray-100">
          <button onClick={() => handleNavClick(ViewState.HOME)} className="flex items-center gap-3 group">
            <div className="p-2 bg-guinea-green rounded-xl group-hover:rotate-6 transition-transform">
              <Heart className="h-5 w-5 text-white fill-white" />
            </div>
            <div className="text-left hidden sm:block">
              <span className="block font-serif font-black text-xl leading-none text-earth-black">BALLAL</span>
              <span className="text-[8px] font-bold tracking-[0.2em] text-guinea-red uppercase">Solidarité</span>
            </div>
          </button>

          <div className="hidden lg:flex gap-1">
            {MAIN_NAV_ITEMS.map((item) => (
              <button
                key={item.value}
                onClick={() => handleNavClick(item.value)}
                className={`px-4 py-2 rounded-xl font-bold text-[10px] tracking-widest uppercase transition-all flex items-center gap-2 ${
                  currentView === item.value ? 'bg-earth-black text-white' : 'text-gray-500 hover:text-earth-black hover:bg-gray-50'
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
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 bg-white rounded-2xl shadow-2xl p-4 border border-gray-100 animate-in slide-in-from-top-4">
            <div className="flex flex-col gap-2">
              {MAIN_NAV_ITEMS.map((item) => (
                <button
                  key={item.value}
                  onClick={() => handleNavClick(item.value)}
                  className={`flex items-center gap-4 p-4 rounded-xl font-bold text-xs uppercase tracking-widest ${
                    currentView === item.value ? 'bg-guinea-red text-white' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
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
