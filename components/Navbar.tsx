import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, X, Heart, Phone, LogIn, ChevronDown, LogOut, User } from 'lucide-react';
import { ViewState, LanguageCode } from '../types.ts';
import { MAIN_NAV_ITEMS } from '../constants/navigation.ts';
import { useAuth } from '../contexts/AuthContext.tsx';

interface NavbarProps {
  setView: (view: ViewState) => void;
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  onOpenAuth: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ setView, onOpenAuth }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (view: ViewState) => {
    setView(view);
    setIsMobileMenuOpen(false);
    setUserMenuOpen(false);
  };

  const isActive = (path: string): boolean =>
    location.pathname === path ||
    (path !== '/' && location.pathname.startsWith(path));

  return (
    <header className="fixed top-0 w-full z-[150]">
      {/* Emergency top bar */}
      <div className="bg-[#CE1126] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-1.5 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="hidden sm:block text-[10px] font-bold uppercase tracking-[0.25em] text-white/80">
              Ballal ASBL · BCE 1016.925.333
            </span>
          </div>
          <a
            href="tel:0493434383"
            className="flex items-center gap-1.5 text-[10px] font-black tracking-widest hover:text-[#FCD116] transition-colors"
            aria-label="Numéro d'urgence"
          >
            <Phone className="h-3 w-3" aria-hidden="true" />
            URGENCE 24H : 0493 43 43 83
          </a>
        </div>
      </div>

      {/* Main nav */}
      <nav
        aria-label="Navigation principale"
        className={`bg-white border-b transition-shadow duration-300 ${
          isScrolled ? 'shadow-md border-gray-200' : 'border-gray-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <button
              onClick={() => handleNavClick(ViewState.HOME)}
              className="flex items-center gap-3 group shrink-0"
              aria-label="Aller à l'accueil"
            >
              <div className="w-9 h-9 bg-[#CE1126] rounded-lg flex items-center justify-center group-hover:bg-[#b01020] transition-colors">
                <Heart className="h-5 w-5 text-white fill-white" aria-hidden="true" />
              </div>
              <div>
                <span className="block font-serif font-black text-lg leading-none text-gray-900 tracking-tight">
                  BALLAL
                </span>
                <span className="block text-[9px] font-bold tracking-[0.2em] text-[#CE1126] uppercase leading-none mt-0.5">
                  ASBL
                </span>
              </div>
            </button>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-0.5" role="list">
              {MAIN_NAV_ITEMS.map((item) => {
                const active = isActive(item.path);
                return (
                  <button
                    key={item.value}
                    onClick={() => handleNavClick(item.value)}
                    role="listitem"
                    aria-current={active ? 'page' : undefined}
                    className={`relative px-4 py-2 text-[11px] font-bold uppercase tracking-[0.12em] transition-colors rounded-md ${
                      active
                        ? 'text-[#CE1126]'
                        : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {item.label}
                    {active && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#CE1126] rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Right: Auth */}
            <div className="hidden lg:flex items-center gap-3">
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors text-sm font-bold text-gray-700"
                    aria-expanded={userMenuOpen}
                  >
                    <div className="w-6 h-6 rounded-full bg-[#CE1126] flex items-center justify-center text-white text-[10px] font-black">
                      {user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <span className="max-w-[100px] truncate text-[11px]">{user?.name}</span>
                    <ChevronDown className="h-3 w-3 text-gray-400" aria-hidden="true" />
                  </button>
                  {userMenuOpen && (
                    <div className="absolute right-0 mt-1 w-44 bg-white rounded-xl border border-gray-100 shadow-xl py-1 z-50">
                      <button
                        onClick={() => { logout(); setUserMenuOpen(false); }}
                        className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium"
                      >
                        <LogOut className="h-4 w-4" aria-hidden="true" />
                        Déconnexion
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={onOpenAuth}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-[11px] font-black uppercase tracking-widest rounded-lg hover:bg-[#CE1126] transition-colors"
                >
                  <LogIn className="h-3.5 w-3.5" aria-hidden="true" />
                  Connexion
                </button>
              )}
            </div>

            {/* Mobile burger */}
            <button
              className="lg:hidden p-2 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              {isMobileMenuOpen
                ? <X className="h-5 w-5 text-gray-700" aria-hidden="true" />
                : <Menu className="h-5 w-5 text-gray-700" aria-hidden="true" />
              }
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div
            id="mobile-menu"
            className="lg:hidden border-t border-gray-100 bg-white"
          >
            <div className="max-w-7xl mx-auto px-4 py-3 space-y-0.5">
              {MAIN_NAV_ITEMS.map((item) => {
                const active = isActive(item.path);
                return (
                  <button
                    key={item.value}
                    onClick={() => handleNavClick(item.value)}
                    aria-current={active ? 'page' : undefined}
                    className={`flex items-center gap-3 w-full px-3 py-3 rounded-lg text-sm font-bold uppercase tracking-widest transition-colors ${
                      active
                        ? 'bg-red-50 text-[#CE1126]'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <item.icon className="h-4 w-4" aria-hidden="true" />
                    {item.label}
                  </button>
                );
              })}
              <div className="pt-3 border-t border-gray-100 mt-3">
                {isAuthenticated ? (
                  <button
                    onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                    className="flex items-center gap-2 w-full px-3 py-3 text-sm font-bold text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <LogOut className="h-4 w-4" aria-hidden="true" />
                    Déconnexion ({user?.name})
                  </button>
                ) : (
                  <button
                    onClick={() => { onOpenAuth(); setIsMobileMenuOpen(false); }}
                    className="flex items-center gap-2 w-full px-3 py-3 bg-gray-900 text-white text-sm font-black rounded-lg hover:bg-[#CE1126] transition-colors"
                  >
                    <LogIn className="h-4 w-4" aria-hidden="true" />
                    Connexion / Accès Membre
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
