
import React, { useState } from 'react';
import { Menu, X, HeartHandshake, Globe, Share2, Users, LogOut, User as UserIcon } from 'lucide-react';
import { ViewState, LanguageCode } from '../types';
import { translations } from '../utils/translations';
import { useAuth } from '../contexts/AuthContext';
import { AuthModal } from './AuthModals';

interface NavbarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setView, language, setLanguage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  
  // Auth State
  const { user, logout } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const t = translations[language];

  const handleTeamClick = () => {
    setView(ViewState.HOME);
    setIsOpen(false);
    setTimeout(() => {
        const teamSection = document.getElementById('team-section');
        if (teamSection) {
            teamSection.scrollIntoView({ behavior: 'smooth' });
        }
    }, 100);
  };

  const openAuth = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
    setIsOpen(false); // Close mobile menu if open
  };

  const navItems = [
    { label: t.nav_home, value: ViewState.HOME },
    { label: t.nav_legal, value: ViewState.LEGAL_AID },
    { label: t.nav_food_project, value: ViewState.FOOD_AUTONOMY },
    { label: t.nav_news, value: ViewState.NEWS },
    { label: t.nav_history, value: ViewState.HISTORY },
    { label: t.nav_forum, value: ViewState.FORUM },
  ];

  const languages: {code: LanguageCode; label: string; flag: string}[] = [
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'nl', label: 'Nederlands', flag: '🇧🇪' },
    { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
    { code: 'ar', label: 'العربية', flag: '🇸🇦' },
    { code: 'pe', label: 'Pular', flag: '🇬🇳' },
    { code: 'ma', label: 'Malinké', flag: '🇬🇳' },
    { code: 'su', label: 'Soussou', flag: '🇬🇳' }
  ];

  return (
    <>
    <nav className="bg-white/95 backdrop-blur-sm sticky top-0 z-50 border-b border-orange-100/50 shadow-sm" aria-label="Navigation principale">
      <div className="h-1.5 w-full guinea-gradient-bg"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <button 
            onClick={() => setView(ViewState.HOME)}
            className="flex items-center cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#CE1126] rounded-lg p-1 group"
            aria-label="Ballal ASBL - Retour à l'accueil"
          >
            <div className="flex flex-col justify-center">
                <div className="flex items-center">
                    <div className="p-1.5 bg-red-50 rounded-lg mr-2 group-hover:bg-red-100 transition-colors">
                        <HeartHandshake className="h-7 w-7 text-[#CE1126]" aria-hidden="true" />
                    </div>
                    <div className="font-black text-2xl tracking-tighter text-gray-900 leading-none">
                        <span className="guinea-gradient-text">BALLAL</span>
                        <span className="text-gray-500 font-light ml-1 text-lg">ASBL</span>
                    </div>
                </div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#009460] font-bold ml-11 mt-1 opacity-80">
                    {t.nav_solidarity}
                </span>
            </div>
          </button>
          
          {/* Desktop Menu */}
          <div className="hidden xl:flex items-center space-x-1" role="menubar">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => setView(item.value)}
                role="menuitem"
                aria-current={currentView === item.value ? 'page' : undefined}
                className={`px-3 py-2 rounded-full text-xs font-bold transition-all duration-200 uppercase tracking-wide focus:outline-none focus:ring-2 focus:ring-[#CE1126] ${
                  currentView === item.value
                    ? 'text-white bg-[#CE1126] shadow-md transform scale-105'
                    : 'text-gray-600 hover:text-[#CE1126] hover:bg-orange-50'
                }`}
              >
                {item.label}
              </button>
            ))}

             <button
                onClick={handleTeamClick}
                role="menuitem"
                className="px-3 py-2 rounded-full text-xs font-bold text-gray-600 hover:text-[#CE1126] hover:bg-orange-50 transition-colors duration-200 uppercase tracking-wide focus:outline-none focus:ring-2 focus:ring-[#CE1126]"
              >
                {t.nav_team}
              </button>

             <button
                onClick={() => setView(ViewState.SHARE)}
                role="menuitem"
                aria-label={t.nav_share}
                className={`flex items-center px-3 py-2 rounded-full text-xs font-bold transition-all duration-200 uppercase tracking-wide ml-2 focus:outline-none focus:ring-2 focus:ring-[#CE1126] border border-transparent ${
                  currentView === ViewState.SHARE
                    ? 'text-[#CE1126] bg-red-50 border-red-100'
                    : 'text-gray-500 hover:text-[#CE1126] hover:bg-orange-50'
                }`}
              >
                <Share2 className="h-4 w-4 mr-1" aria-hidden="true" />
                {t.nav_share}
              </button>
            
            {/* Language Selector */}
            <div className="relative ml-2">
                <button 
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className="flex items-center bg-gray-50 text-gray-700 px-3 py-2 rounded-full text-sm font-bold hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-[#CE1126] border border-gray-100"
                >
                  <span className="mr-2 text-lg">{languages.find(l => l.code === language)?.flag}</span>
                  {languages.find(l => l.code === language)?.label.substring(0, 3).toUpperCase()}
                </button>
                {isLangOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl z-50 border border-gray-100 py-1 overflow-hidden">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => { setLanguage(lang.code); setIsLangOpen(false); }}
                        className={`w-full text-left px-4 py-2 text-sm flex items-center ${language === lang.code ? 'bg-orange-50 text-[#CE1126] font-bold' : 'text-gray-700 hover:bg-gray-50'}`}
                      >
                        <span className="mr-3 text-lg">{lang.flag}</span>
                        {lang.label}
                      </button>
                    ))}
                  </div>
                )}
            </div>
            
            {/* USER / LOGIN BUTTON */}
            <div className="ml-3 relative">
              {user ? (
                <>
                  <button 
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center space-x-2 bg-slate-100 pl-2 pr-4 py-1.5 rounded-full hover:bg-slate-200 transition-colors"
                  >
                    <div className="h-8 w-8 rounded-full bg-[#CE1126] text-white flex items-center justify-center font-bold shadow-sm">
                      {user.avatar}
                    </div>
                    <span className="text-sm font-bold text-gray-700 max-w-[100px] truncate">{user.name}</span>
                  </button>
                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl z-50 border border-gray-100 py-1 overflow-hidden">
                      <div className="px-4 py-2 border-b border-gray-100 bg-gray-50">
                        <p className="text-xs text-gray-500 font-bold uppercase">Connecté en tant que</p>
                        <p className="text-sm font-bold text-gray-900 truncate">{user.email}</p>
                      </div>
                      <button 
                        onClick={() => { logout(); setShowProfileMenu(false); }}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center font-bold"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Se déconnecter
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <button 
                  onClick={() => openAuth('login')}
                  className="flex items-center bg-slate-900 text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-black transition-all shadow-lg shadow-slate-200"
                >
                  <UserIcon className="h-4 w-4 mr-2" />
                  {t.nav_member_access}
                </button>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="xl:hidden flex items-center space-x-4">
            <div className="relative">
                <button 
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className="flex items-center bg-gray-50 text-gray-700 px-3 py-2 rounded-full text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#CE1126]"
                >
                  <span className="mr-1.5 text-base">{languages.find(l => l.code === language)?.flag}</span>
                  {language.toUpperCase()}
                </button>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-500 hover:text-[#CE1126] focus:outline-none focus:ring-2 focus:ring-[#CE1126] p-2 rounded-md"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="xl:hidden bg-white/95 backdrop-blur-md border-b border-gray-200 absolute w-full z-50 shadow-xl max-h-[90vh] overflow-y-auto">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => { setView(item.value); setIsOpen(false); }}
                className={`block w-full text-left px-4 py-3 rounded-lg text-base font-bold focus:outline-none focus:ring-2 focus:ring-[#CE1126] ${
                  currentView === item.value ? 'text-[#CE1126] bg-orange-50' : 'text-gray-600 hover:text-[#CE1126] hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}
             
             <button
                onClick={handleTeamClick}
                className="block w-full text-left px-4 py-3 rounded-lg text-base font-bold text-gray-600 hover:text-[#CE1126] hover:bg-gray-50"
             >
                {t.nav_team}
             </button>

             {/* Mobile User Section */}
             <div className="border-t border-gray-100 mt-4 pt-4 px-4">
              {user ? (
                 <div className="bg-gray-50 p-4 rounded-xl">
                    <div className="flex items-center mb-3">
                      <div className="h-10 w-10 rounded-full bg-[#CE1126] text-white flex items-center justify-center font-bold text-lg mr-3">
                        {user.avatar}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => { logout(); setIsOpen(false); }}
                      className="w-full bg-white border border-gray-200 text-red-600 py-2 rounded-lg text-sm font-bold flex items-center justify-center"
                    >
                      <LogOut className="h-4 w-4 mr-2" /> Se déconnecter
                    </button>
                 </div>
              ) : (
                <button 
                  onClick={() => openAuth('login')}
                  className="w-full text-left px-4 py-3 text-white bg-slate-900 font-bold rounded-lg flex items-center justify-center shadow-lg"
                >
                  <UserIcon className="h-5 w-5 mr-2" />
                  {t.nav_member_access}
                </button>
              )}
             </div>
          </div>
        </div>
      )}
    </nav>

    {/* Auth Modals */}
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
