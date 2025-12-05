import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, HeartHandshake, Share2, LogOut, User as UserIcon, ChevronDown, Check } from 'lucide-react';
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
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  
  const { user, logout } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  const langMenuRef = useRef<HTMLDivElement>(null);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useClickOutside(langMenuRef, () => setIsLangMenuOpen(false));
  useClickOutside(profileMenuRef, () => setIsProfileMenuOpen(false));
  useClickOutside(mobileMenuRef, () => setIsMobileMenuOpen(false));

  const t = translations[language] || translations['fr'];

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
  };

  const navItems = [
    { label: t.nav_home, value: ViewState.HOME },
    { label: t.nav_legal, value: ViewState.LEGAL_AID },
    { label: t.nav_food_project, value: ViewState.FOOD_AUTONOMY },
    { label: t.nav_history, value: ViewState.HISTORY },
    { label: t.nav_festival, value: ViewState.FESTIVAL },
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

  return (
    <>
    <header className="bg-white/95 backdrop-blur-md fixed top-0 w-full z-50 border-b border-orange-100/50 shadow-sm transition-all duration-200">
      <div className="h-1.5 w-full guinea-gradient-bg" role="presentation"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* LOGO */}
          <div className="flex-shrink-0 flex items-center">
            <button 
                type="button"
                onClick={() => setView(ViewState.HOME)}
                className="flex items-center group focus:outline-none focus:ring-2 focus:ring-[#CE1126] rounded-lg p-1"
                aria-label="Ballal ASBL - Retour à l'accueil"
            >
                <div className="p-2 bg-red-50 rounded-xl mr-3 group-hover:bg-red-100 transition-colors">
                    <HeartHandshake className="h-8 w-8 text-[#CE1126]" aria-hidden="true" />
                </div>
                <div className="flex flex-col text-left">
                    <span className="font-black text-2xl tracking-tighter text-gray-900 leading-none group-hover:text-[#CE1126] transition-colors">
                        BALLAL<span className="text-gray-400 font-light ml-1">ASBL</span>
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#009460] font-bold mt-0.5">
                        {t.nav_solidarity}
                    </span>
                </div>
            </button>
          </div>
          
          {/* DESKTOP NAVIGATION */}
          <nav className="hidden xl:flex items-center space-x-1" aria-label="Navigation principale">
            <ul className="flex space-x-1 p-1 bg-gray-50/50 rounded-full border border-gray-100">
                {navItems.map((item) => (
                <li key={item.value}>
                    <button
                        type="button"
                        onClick={() => setView(item.value)}
                        aria-current={currentView === item.value ? 'page' : undefined}
                        className={`px-3 py-2 rounded-full text-[11px] font-bold transition-all duration-200 uppercase tracking-wide focus:outline-none focus:ring-2 focus:ring-[#CE1126] ${
                            currentView === item.value
                            ? 'text-white bg-[#CE1126] shadow-md'
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
                    className="text-gray-500 hover:text-[#CE1126] font-bold text-xs uppercase tracking-wide px-3 py-2 rounded-lg hover:bg-red-50 transition-colors focus:outline-none focus:ring-2 focus:ring-[#CE1126]"
                >
                    {t.nav_team}
                </button>

                <button
                    type="button"
                    onClick={() => setView(ViewState.SHARE)}
                    aria-label={t.nav_share}
                    className={`p-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-[#CE1126] ${
                        currentView === ViewState.SHARE ? 'text-[#CE1126] bg-red-50' : 'text-gray-400 hover:text-[#CE1126] hover:bg-gray-100'
                    }`}
                >
                    <Share2 className="h-5 w-5" />
                </button>

                {/* LANGUAGE SELECTOR */}
                <div className="relative" ref={langMenuRef}>
                    <button 
                        type="button"
                        onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                        aria-expanded={isLangMenuOpen}
                        aria-haspopup="true"
                        aria-label={`Langue actuelle : ${currentLang.label}`}
                        className="flex items-center space-x-2 bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-full text-xs font-bold hover:border-gray-300 hover:bg-gray-50 transition-all focus:outline-none focus:ring-2 focus:ring-[#CE1126]"
                    >
                        <span className="text-base" aria-hidden="true">{currentLang.icon}</span>
                        <span className="hidden 2xl:inline">{currentLang.code.toUpperCase()}</span>
                        <ChevronDown className={`h-3 w-3 transition-transform ${isLangMenuOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {isLangMenuOpen && (
                        <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl z-50 border border-gray-100 py-2 overflow-hidden animate-in fade-in slide-in-from-top-2">
                            <div className="px-4 py-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-50 mb-1">
                                Sélectionner la langue
                            </div>
                            <div className="max-h-[300px] overflow-y-auto">
                                {languages.map((lang) => (
                                    <button
                                        key={lang.code}
                                        type="button"
                                        onClick={() => { setLanguage(lang.code); setIsLangMenuOpen(false); }}
                                        className={`w-full text-left px-4 py-2.5 text-sm flex items-center justify-between group hover:bg-gray-50 transition-colors ${language === lang.code ? 'bg-orange-50/50' : ''}`}
                                    >
                                        <div className="flex items-center">
                                            <span className="mr-3 text-lg" aria-hidden="true">{lang.icon}</span>
                                            <span className={`font-medium ${language === lang.code ? 'text-[#CE1126] font-bold' : 'text-gray-700 group-hover:text-gray-900'}`}>
                                                {lang.label}
                                            </span>
                                        </div>
                                        {language === lang.code && <Check className="h-4 w-4 text-[#CE1126]" />}
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
                                className="flex items-center space-x-2 pl-1 pr-3 py-1 rounded-full border border-transparent hover:border-gray-200 hover:bg-gray-50 transition-all focus:outline-none focus:ring-2 focus:ring-[#CE1126]"
                            >
                                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#CE1126] to-red-600 text-white flex items-center justify-center font-bold text-sm shadow-md">
                                    {user.avatar}
                                </div>
                                <span className="text-xs font-bold text-gray-700 max-w-[80px] truncate">{user.name}</span>
                            </button>

                            {isProfileMenuOpen && (
                                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl z-50 border border-gray-100 py-2 overflow-hidden animate-in fade-in slide-in-from-top-2">
                                    <div className="px-5 py-3 border-b border-gray-50 bg-gray-50/30">
                                        <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Connecté en tant que</p>
                                        <p className="text-sm font-bold text-gray-900 truncate">{user.email}</p>
                                    </div>
                                    <div className="p-2">
                                        <button 
                                            type="button"
                                            onClick={() => { logout(); setIsProfileMenuOpen(false); }}
                                            className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-xl flex items-center font-bold transition-colors"
                                        >
                                            <LogOut className="h-4 w-4 mr-2" />
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
                            className="flex items-center bg-slate-900 text-white px-5 py-2 rounded-full text-xs font-bold hover:bg-black transition-all shadow-lg shadow-slate-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900"
                        >
                            <UserIcon className="h-3 w-3 mr-2" />
                            {t.nav_member_access}
                        </button>
                    )}
                </div>
             </div>
          </nav>

          {/* MOBILE MENU BUTTON */}
          <div className="xl:hidden flex items-center space-x-3">
             <button 
                type="button"
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center bg-gray-50 text-gray-900 px-3 py-2 rounded-lg text-sm font-bold border border-gray-100"
                aria-label="Changer de langue"
             >
                <span className="mr-1">{currentLang.icon}</span>
                {currentLang.code.toUpperCase()}
             </button>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-500 hover:text-[#CE1126] focus:outline-none focus:ring-2 focus:ring-[#CE1126] p-2 rounded-lg bg-gray-50 hover:bg-red-50 transition-colors"
              aria-expanded={isMobileMenuOpen}
              aria-label="Menu principal"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE NAVIGATION DROPDOWN */}
      {isMobileMenuOpen && (
        <div 
            ref={mobileMenuRef}
            className="xl:hidden bg-white/98 backdrop-blur-xl border-t border-gray-100 absolute w-full z-40 shadow-2xl max-h-[85vh] overflow-y-auto animate-in slide-in-from-top-5"
        >
          <div className="px-4 pt-4 pb-6 space-y-2">
            
            {navItems.map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => { setView(item.value); setIsMobileMenuOpen(false); }}
                className={`block w-full text-left px-4 py-3 rounded-xl text-base font-bold transition-all ${
                  currentView === item.value 
                    ? 'text-[#CE1126] bg-red-50 ring-1 ring-red-100' 
                    : 'text-gray-600 hover:text-[#CE1126] hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}
             
             <button
                type="button"
                onClick={handleTeamClick}
                className="block w-full text-left px-4 py-3 rounded-xl text-base font-bold text-gray-600 hover:text-[#CE1126] hover:bg-gray-50"
             >
                {t.nav_team}
             </button>

             <div className="border-t border-gray-100 mt-4 pt-4 px-2">
                
                {/* Mobile Language Selector */}
                {isLangMenuOpen && (
                    <div className="mb-4 bg-gray-50 rounded-xl p-2 grid grid-cols-2 gap-2">
                        {languages.map(lang => (
                            <button
                                key={lang.code}
                                type="button"
                                onClick={() => { setLanguage(lang.code); setIsLangMenuOpen(false); }}
                                className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium ${language === lang.code ? 'bg-white text-[#CE1126] shadow-sm' : 'text-gray-600'}`}
                            >
                                <span className="mr-2">{lang.icon}</span> {lang.label}
                            </button>
                        ))}
                    </div>
                )}

              {user ? (
                 <div className="bg-slate-900 p-4 rounded-2xl text-white shadow-lg">
                    <div className="flex items-center mb-4">
                      <div className="h-12 w-12 rounded-full bg-[#CE1126] text-white flex items-center justify-center font-bold text-xl mr-3 border-2 border-white/20">
                        {user.avatar}
                      </div>
                      <div className="overflow-hidden">
                        <p className="font-bold text-lg truncate">{user.name}</p>
                        <p className="text-xs text-slate-400 truncate">{user.email}</p>
                      </div>
                    </div>
                    <button 
                      type="button"
                      onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                      className="w-full bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl text-sm font-bold flex items-center justify-center transition-colors"
                    >
                      <LogOut className="h-4 w-4 mr-2" /> Se déconnecter
                    </button>
                 </div>
              ) : (
                <button 
                  type="button"
                  onClick={() => openAuth('login')}
                  className="w-full text-left px-4 py-4 text-white bg-slate-900 font-bold rounded-xl flex items-center justify-center shadow-lg hover:bg-black transition-colors"
                >
                  <UserIcon className="h-5 w-5 mr-2" />
                  {t.nav_member_access}
                </button>
              )}
             </div>
          </div>
        </div>
      )}
    </header>

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