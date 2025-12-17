import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, HeartHandshake, Share2, LogOut, User as UserIcon, ChevronDown, Check, Globe } from 'lucide-react';
import { ViewState, LanguageCode } from '../types.ts';
import { translations } from '../utils/translations.ts';
import { useAuth } from '../contexts/AuthContext.tsx';
import { AuthModal } from './AuthModals.tsx';

interface NavbarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
}

// Hook pour détecter les clics à l'extérieur
function useClickOutside(ref: React.RefObject<HTMLElement>, handler: () => void) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler();
    };
    
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setView, language, setLanguage }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false); 
  const [isMobileLangMenuOpen, setIsMobileLangMenuOpen] = useState(false); 
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  
  const { user, logout } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  const langMenuRef = useRef<HTMLDivElement>(null);
  const mobileLangMenuRef = useRef<HTMLDivElement>(null);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useClickOutside(langMenuRef, () => setIsLangMenuOpen(false));
  useClickOutside(mobileLangMenuRef, () => setIsMobileLangMenuOpen(false));
  useClickOutside(profileMenuRef, () => setIsProfileMenuOpen(false));
  
  const t = translations[language] || translations['fr'];

  // SÉCURITÉ : Fermer le menu mobile automatiquement dès que la vue change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = 'auto'; // Réactiver le scroll au cas où
  }, [currentView]);

  const handleTeamClick = () => {
    setView(ViewState.HOME);
    setIsMobileMenuOpen(false); 
    
    setTimeout(() => {
      const teamSection = document.getElementById('team-section');
      if (teamSection) {
        teamSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const openAuth = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
    setIsMobileMenuOpen(false);
    setIsProfileMenuOpen(false);
  };

  const navItems = [
    { label: t.nav_home || 'Accueil', value: ViewState.HOME },
    { label: t.nav_news || 'Actualités', value: ViewState.NEWS },
    { label: t.nav_legal || 'Droits', value: ViewState.LEGAL_AID },
    { label: t.nav_squat || 'Squat', value: ViewState.SQUAT }, // Nouvel onglet Squat
    { label: t.nav_food_project || 'Alimentation', value: ViewState.FOOD_AUTONOMY },
    { label: t.nav_history || 'Histoire', value: ViewState.HISTORY },
    { label: t.nav_festival || 'Festival', value: ViewState.FESTIVAL },
  ];

  const languages: {code: LanguageCode; label: string; icon: string}[] = [
    { code: 'fr', label: 'Français', icon: '🇫🇷' },
    { code: 'en', label: 'English', icon: '🇬🇧' },
    { code: 'nl', label: 'Nederlands', icon: '🇧🇪' },
    { code: 'de', label: 'Deutsch', icon: '🇩🇪' },
    { code: 'es', label: 'Español', icon: '🇪🇸' },
    { code: 'ar', label: 'العربية', icon: '🌍' },
    { code: 'pe', label: 'Pular', icon: '🗣️' },
    { code: 'ma', label: 'Malinké', icon: '🗣️' },
    { code: 'su', label: 'Soussou', icon: '🗣️' }
  ];

  const currentLang = languages.find(l => l.code === language) || languages[0];

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header 
        className="bg-white fixed top-0 w-full z-50 border-b border-gray-100 shadow-sm"
        role="banner"
        aria-label="Navigation principale"
      >
        <div className="h-1 w-full bg-gradient-to-r from-[#CE1126] via-[#FCD116] to-[#009460]" aria-hidden="true"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            
            {/* LOGO */}
            <div className="flex-shrink-0 flex items-center">
              <button 
                type="button"
                onClick={() => setView(ViewState.HOME)}
                className="flex items-center group focus:outline-none focus:ring-2 focus:ring-[#CE1126] rounded-lg p-1 transition-all duration-200 active:scale-95"
                aria-label="Ballal ASBL - Retour à l'accueil"
              >
                <div className="p-2 bg-gradient-to-br from-red-50 to-red-100 rounded-xl mr-3 group-hover:from-red-100 group-hover:to-red-200 transition-all duration-200 shadow-sm">
                  <HeartHandshake className="h-8 w-8 text-[#CE1126]" aria-hidden="true" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-black text-2xl tracking-tight text-gray-900 leading-none group-hover:text-[#CE1126] transition-colors">
                    BALLAL<span className="text-gray-400 font-light ml-1">ASBL</span>
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#009460] font-bold mt-0.5">
                    {t.nav_solidarity || 'Solidarité'}
                  </span>
                </div>
              </button>
            </div>
            
            {/* DESKTOP NAVIGATION */}
            <nav className="hidden xl:flex items-center space-x-2" aria-label="Navigation principale">
              <ul className="flex space-x-1 p-1 bg-gray-50/50 rounded-full border border-gray-100">
                {navItems.map((item) => (
                  <li key={item.value}>
                    <button
                      type="button"
                      onClick={() => setView(item.value)}
                      aria-current={currentView === item.value ? 'page' : undefined}
                      className={`px-3 py-2.5 rounded-full text-xs font-bold transition-all duration-200 uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-[#CE1126] focus:ring-offset-2 active:scale-95 ${
                        currentView === item.value
                          ? 'text-white bg-gradient-to-r from-[#CE1126] to-red-600 shadow-md transform scale-105'
                          : 'text-gray-600 hover:text-[#CE1126] hover:bg-white hover:shadow-sm'
                      }`}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>

              <div className="flex items-center space-x-3 ml-4 border-l border-gray-200 pl-4 h-10">
                <button
                  type="button"
                  onClick={handleTeamClick}
                  className="text-gray-600 hover:text-[#CE1126] font-bold text-xs uppercase tracking-wide px-3 py-2 rounded-lg hover:bg-red-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#CE1126] active:scale-95"
                >
                  {t.nav_team || 'Équipe'}
                </button>

                <button
                  type="button"
                  onClick={() => setView(ViewState.SHARE)}
                  aria-label={t.nav_share || 'Partager'}
                  className={`p-2 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#CE1126] focus:ring-offset-2 active:scale-90 ${
                    currentView === ViewState.SHARE 
                      ? 'text-[#CE1126] bg-red-50 shadow-sm' 
                      : 'text-gray-400 hover:text-[#CE1126] hover:bg-gray-100'
                  }`}
                >
                  <Share2 className="h-5 w-5" aria-hidden="true" />
                </button>

                {/* DESKTOP LANGUAGE SELECTOR */}
                <div className="relative" ref={langMenuRef}>
                  <button 
                    type="button"
                    onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                    aria-expanded={isLangMenuOpen}
                    aria-haspopup="true"
                    aria-label={`Langue actuelle : ${currentLang.label}. Changer de langue`}
                    className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-full text-xs font-bold hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#CE1126] active:scale-95"
                  >
                    <Globe className="h-3.5 w-3.5" aria-hidden="true" />
                    <span className="hidden 2xl:inline">{currentLang.code.toUpperCase()}</span>
                    <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${isLangMenuOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                  </button>
                  
                  {isLangMenuOpen && (
                    <div 
                      className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl z-[100] border border-gray-100 py-2 overflow-hidden animate-in fade-in-50 slide-in-from-top-2 duration-200"
                      role="menu"
                      aria-orientation="vertical"
                    >
                      <div className="px-4 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-50 mb-1">
                        Sélectionner la langue
                      </div>
                      <div className="max-h-[300px] overflow-y-auto py-1">
                        {languages.map((lang) => (
                          <button
                            key={lang.code}
                            type="button"
                            onClick={() => { 
                              setLanguage(lang.code); 
                              setIsLangMenuOpen(false); 
                            }}
                            role="menuitem"
                            className={`w-full text-left px-4 py-2.5 text-sm flex items-center justify-between group hover:bg-gray-50 transition-colors duration-150 ${
                              language === lang.code ? 'bg-orange-50/50' : ''
                            }`}
                          >
                            <div className="flex items-center">
                              <span className="mr-3 text-lg" aria-hidden="true">{lang.icon}</span>
                              <span className={`font-medium ${language === lang.code ? 'text-[#CE1126] font-bold' : 'text-gray-700 group-hover:text-gray-900'}`}>
                                {lang.label}
                              </span>
                            </div>
                            {language === lang.code && <Check className="h-4 w-4 text-[#CE1126]" aria-hidden="true" />}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* USER PROFILE */}
                <div className="relative" ref={profileMenuRef}>
                  {user ? (
                    <>
                      <button 
                        type="button"
                        onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                        aria-expanded={isProfileMenuOpen}
                        aria-haspopup="true"
                        aria-label={`Profil de ${user.name}. Menu utilisateur`}
                        className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full border border-transparent hover:border-gray-200 hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#CE1126] active:scale-95"
                      >
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#CE1126] to-red-600 text-white flex items-center justify-center font-bold text-sm shadow-md">
                          {user.avatar || user.name.charAt(0)}
                        </div>
                        <span className="text-xs font-bold text-gray-700 max-w-[80px] truncate">
                          {user.name}
                        </span>
                      </button>

                      {isProfileMenuOpen && (
                        <div 
                          className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl z-[100] border border-gray-100 py-2 overflow-hidden animate-in fade-in-50 slide-in-from-top-2 duration-200"
                          role="menu"
                          aria-orientation="vertical"
                        >
                          <div className="px-5 py-3 border-b border-gray-50 bg-gray-50/30">
                            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">
                              Connecté en tant que
                            </p>
                            <p className="text-sm font-bold text-gray-900 truncate">
                              {user.email}
                            </p>
                          </div>
                          <div className="p-2">
                            <button 
                              type="button"
                              onClick={() => { logout(); setIsProfileMenuOpen(false); }}
                              role="menuitem"
                              className="w-full text-left px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-lg flex items-center font-bold transition-colors duration-150"
                            >
                              <LogOut className="h-4 w-4 mr-2" aria-hidden="true" />
                              Se déconnecter
                            </button>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <button 
                      type="button"
                      onClick={() => openAuth('login')}
                      className="flex items-center bg-gradient-to-r from-slate-900 to-black text-white px-5 py-2.5 rounded-full text-xs font-bold hover:from-black hover:to-slate-900 transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 active:scale-95"
                      aria-label="Accès membre - Se connecter"
                    >
                      <UserIcon className="h-3.5 w-3.5 mr-2" aria-hidden="true" />
                      {t.nav_member_access || 'Membre'}
                    </button>
                  )}
                </div>
              </div>
            </nav>

            {/* MOBILE HEADER BUTTONS */}
            <div className="xl:hidden flex items-center space-x-3">
              <div className="relative" ref={mobileLangMenuRef}>
                <button 
                  type="button"
                  onClick={() => setIsMobileLangMenuOpen(!isMobileLangMenuOpen)}
                  className="flex items-center bg-gray-50 text-gray-900 px-3 py-2 rounded-lg text-sm font-bold border border-gray-100 hover:bg-gray-100 transition-all duration-200 active:scale-95"
                  aria-label="Changer de langue"
                  aria-expanded={isMobileLangMenuOpen}
                >
                  <span className="mr-2" aria-hidden="true">{currentLang.icon}</span>
                  {currentLang.code.toUpperCase()}
                </button>

                {isMobileLangMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl z-[100] border border-gray-100 py-1 overflow-hidden animate-in fade-in-50 slide-in-from-top-2">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        type="button"
                        onClick={() => { 
                          setLanguage(lang.code); 
                          setIsMobileLangMenuOpen(false); 
                        }}
                        className={`w-full text-left px-4 py-3 text-sm flex items-center gap-3 hover:bg-gray-50 transition-colors ${
                          language === lang.code ? 'bg-red-50 text-[#CE1126] font-bold' : 'text-gray-700'
                        }`}
                      >
                        <span className="text-lg">{lang.icon}</span>
                        {lang.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* MOBILE MENU TOGGLE */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-600 hover:text-[#CE1126] focus:outline-none focus:ring-2 focus:ring-[#CE1126] p-2.5 rounded-lg bg-gray-50 hover:bg-red-50 transition-all duration-200 active:scale-90"
                aria-expanded={isMobileMenuOpen}
                aria-label={isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE NAVIGATION DROPDOWN */}
        {isMobileMenuOpen && (
          <div 
            ref={mobileMenuRef}
            className="xl:hidden bg-white border-t border-gray-100 fixed top-20 left-0 right-0 bottom-0 z-[100] overflow-y-auto"
            style={{ backgroundColor: '#ffffff' }}
            role="dialog"
            aria-modal="true"
            aria-label="Menu mobile"
          >
            <div className="px-4 pt-6 pb-8 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => { 
                    setView(item.value); 
                    setIsMobileMenuOpen(false); 
                  }}
                  className={`block w-full text-left px-5 py-3.5 rounded-xl text-base font-bold transition-all duration-150 active:scale-98 ${
                    currentView === item.value 
                      ? 'text-[#CE1126] bg-red-50 ring-2 ring-red-100' 
                      : 'text-gray-700 hover:text-[#CE1126] hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              
              <button
                type="button"
                onClick={handleTeamClick}
                className="block w-full text-left px-5 py-3.5 rounded-xl text-base font-bold text-gray-700 hover:text-[#CE1126] hover:bg-gray-50 transition-all duration-150 active:scale-98"
              >
                {t.nav_team || 'Équipe'}
              </button>

              <div className="border-t border-gray-100 mt-6 pt-6">
                {user ? (
                  <div className="bg-gradient-to-r from-slate-900 to-gray-900 p-5 rounded-2xl text-white shadow-lg">
                    <div className="flex items-center mb-5">
                      <div className="h-14 w-14 rounded-full bg-gradient-to-br from-[#CE1126] to-red-600 text-white flex items-center justify-center font-bold text-xl mr-4 border-2 border-white/20">
                        {user.avatar || user.name.charAt(0)}
                      </div>
                      <div className="overflow-hidden">
                        <p className="font-bold text-lg truncate">{user.name}</p>
                        <p className="text-sm text-slate-300 truncate mt-1">{user.email}</p>
                      </div>
                    </div>
                    <button 
                      type="button"
                      onClick={() => { 
                        logout(); 
                        setIsMobileMenuOpen(false); 
                      }}
                      className="w-full bg-white/10 hover:bg-white/20 text-white py-3.5 rounded-xl text-base font-bold flex items-center justify-center transition-all duration-150 active:scale-98"
                    >
                      <LogOut className="h-5 w-5 mr-2" aria-hidden="true" /> 
                      Se déconnecter
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <button 
                      type="button"
                      onClick={() => openAuth('login')}
                      className="w-full text-left px-5 py-4 text-white bg-gradient-to-r from-slate-900 to-black font-bold rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95"
                    >
                      <UserIcon className="h-5 w-5 mr-2" aria-hidden="true" />
                      {t.nav_member_access || 'Connexion Membre'}
                    </button>
                    <button 
                      type="button"
                      onClick={() => openAuth('register')}
                      className="w-full text-left px-5 py-4 text-[#CE1126] bg-white border-2 border-[#CE1126] font-bold rounded-xl flex items-center justify-center hover:bg-red-50 transition-all duration-200 active:scale-95"
                    >
                      Créer un compte
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Modal d'authentification */}
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
        mode={authMode}
        switchTo={(mode) => setAuthMode(mode)}
      />
    </>
  );
};

export default Navbar;
