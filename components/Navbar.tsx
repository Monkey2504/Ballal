

import React, { useState } from 'react';
import { Menu, X, HeartHandshake, Globe, Share2, Users } from 'lucide-react';
import { ViewState, LanguageCode } from '../types';
import { translations } from '../utils/translations';

interface NavbarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setView, language, setLanguage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const t = translations[language];

  const handleTeamClick = () => {
    setView(ViewState.HOME);
    setIsOpen(false);
    // Petit délai pour laisser le temps au DOM de se mettre à jour si on n'était pas sur HOME
    setTimeout(() => {
        const teamSection = document.getElementById('team-section');
        if (teamSection) {
            teamSection.scrollIntoView({ behavior: 'smooth' });
        }
    }, 100);
  };

  const navItems = [
    { label: t.nav_home, value: ViewState.HOME },
    { label: t.nav_legal, value: ViewState.LEGAL_AID }, // Positionné juste après l'accueil
    { label: t.nav_news, value: ViewState.NEWS },
    { label: t.nav_events, value: ViewState.EVENTS },
    { label: t.nav_history, value: ViewState.HISTORY },
    { label: t.nav_forum, value: ViewState.FORUM },
  ];

  const languages: {code: LanguageCode; label: string}[] = [
    { code: 'fr', label: 'Français' },
    { code: 'en', label: 'English' },
    { code: 'nl', label: 'Nederlands' },
    { code: 'de', label: 'Deutsch' },
    { code: 'es', label: 'Español' },
    { code: 'ar', label: 'العربية' },
    { code: 'pe', label: 'Pular' },
    { code: 'ma', label: 'Malinké' },
    { code: 'su', label: 'Soussou' }
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-sm sticky top-0 z-50 border-b border-orange-100/50 shadow-sm" dir="ltr" aria-label="Navigation principale">
      {/* Top border with Guinean Flag Gradient */}
      <div className="h-1.5 w-full guinea-gradient-bg"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <button 
            onClick={() => setView(ViewState.HOME)}
            className="flex items-center cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#CE1126] rounded-lg p-1 group"
            aria-label="Retour à l'accueil Ballal ASBL"
          >
            <div className="flex flex-col justify-center">
                <div className="flex items-center">
                    <div className="p-1.5 bg-red-50 rounded-lg mr-2 group-hover:bg-red-100 transition-colors">
                        <HeartHandshake className="h-7 w-7 text-[#CE1126]" aria-hidden="true" />
                    </div>
                    {/* Changed H1 to DIV to allow semantic H1 on page content */}
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

             {/* Team Link (Scroll anchor) */}
             <button
                onClick={handleTeamClick}
                role="menuitem"
                className="px-3 py-2 rounded-full text-xs font-bold text-gray-600 hover:text-[#CE1126] hover:bg-orange-50 transition-colors duration-200 uppercase tracking-wide focus:outline-none focus:ring-2 focus:ring-[#CE1126]"
              >
                {t.nav_team}
              </button>

            {/* Share Button (Special) */}
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
            
            <div className="relative ml-2">
                <button 
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  aria-haspopup="true"
                  aria-expanded={isLangOpen}
                  aria-label="Changer de langue"
                  className="flex items-center bg-gray-50 text-gray-700 px-3 py-2 rounded-full text-sm font-bold hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-[#CE1126] border border-gray-100"
                >
                  <Globe className="h-4 w-4 mr-2" aria-hidden="true" />
                  {languages.find(l => l.code === language)?.label.substring(0, 3).toUpperCase()}
                </button>
                {isLangOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl z-50 border border-gray-100 py-1 overflow-hidden" role="menu">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => { setLanguage(lang.code); setIsLangOpen(false); }}
                        role="menuitem"
                        className={`block w-full text-left px-4 py-2 text-sm focus:outline-none focus:bg-gray-50 ${language === lang.code ? 'bg-orange-50 text-[#CE1126] font-bold' : 'text-gray-700 hover:bg-gray-50'}`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>
                )}
            </div>
            
            {/* Desktop Member Access Button (Optional/Visual) */}
            <button 
              className="ml-3 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
              title={t.nav_member_access}
            >
              <Users className="h-5 w-5" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="xl:hidden flex items-center space-x-4">
            {/* Language Switcher Mobile */}
             <div className="relative">
                <button 
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  aria-haspopup="true"
                  aria-expanded={isLangOpen}
                  aria-label="Changer de langue"
                  className="flex items-center bg-gray-50 text-gray-700 px-3 py-2 rounded-full text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#CE1126]"
                >
                  <Globe className="h-3 w-3 mr-1" aria-hidden="true" />
                  {language.toUpperCase()}
                </button>
                {isLangOpen && (
                  <div className="absolute right-0 mt-2 w-32 bg-white rounded-xl shadow-xl z-50 border border-gray-100 py-1" role="menu">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => { setLanguage(lang.code); setIsLangOpen(false); }}
                        role="menuitem"
                        className={`block w-full text-left px-4 py-2 text-sm ${language === lang.code ? 'bg-orange-50 text-[#CE1126] font-bold' : 'text-gray-700 hover:bg-gray-50'}`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>
                )}
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
              className="text-gray-500 hover:text-[#CE1126] focus:outline-none focus:ring-2 focus:ring-[#CE1126] p-2 rounded-md"
            >
              {isOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="xl:hidden bg-white/95 backdrop-blur-md border-b border-gray-200 absolute w-full z-50 shadow-xl">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => {
                  setView(item.value);
                  setIsOpen(false);
                }}
                className={`block w-full text-left px-4 py-3 rounded-lg text-base font-bold focus:outline-none focus:ring-2 focus:ring-[#CE1126] ${
                  currentView === item.value
                    ? 'text-[#CE1126] bg-orange-50'
                    : 'text-gray-600 hover:text-[#CE1126] hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}
             
             <button
                onClick={handleTeamClick}
                className="block w-full text-left px-4 py-3 rounded-lg text-base font-bold text-gray-600 hover:text-[#CE1126] hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#CE1126]"
             >
                {t.nav_team}
             </button>

             <button
                onClick={() => {
                  setView(ViewState.SHARE);
                  setIsOpen(false);
                }}
                className={`block w-full text-left px-4 py-3 rounded-lg text-base font-bold flex items-center focus:outline-none focus:ring-2 focus:ring-[#CE1126] ${
                  currentView === ViewState.SHARE
                    ? 'text-[#CE1126] bg-orange-50'
                    : 'text-gray-600 hover:text-[#CE1126] hover:bg-gray-50'
                }`}
              >
                <Share2 className="h-4 w-4 mr-2" aria-hidden="true" />
                {t.nav_share}
              </button>

             <button 
                title={t.nav_member_access}
                className="w-full text-left px-4 py-3 text-white bg-slate-900 font-bold mt-2 border-l-4 border-[#FCD116] focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded-r-lg"
             >
              {t.nav_member_access}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;