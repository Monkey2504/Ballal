
import React, { useState } from 'react';
import { Menu, X, User, HeartHandshake, Globe, Share2 } from 'lucide-react';
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

  const navItems = [
    { label: t.nav_home, value: ViewState.HOME },
    { label: t.nav_directory, value: ViewState.DIRECTORY },
    { label: t.nav_news, value: ViewState.NEWS },
    { label: t.nav_events, value: ViewState.EVENTS },
    { label: t.nav_legal, value: ViewState.LEGAL_AID },
    { label: t.nav_history, value: ViewState.HISTORY },
    { label: t.nav_gallery, value: ViewState.GALLERY },
    { label: t.nav_forum, value: ViewState.FORUM },
  ];

  const languages: {code: LanguageCode; label: string}[] = [
    { code: 'fr', label: 'Français' },
    { code: 'en', label: 'English' },
    { code: 'nl', label: 'Nederlands' },
    { code: 'es', label: 'Español' },
    { code: 'ar', label: 'العربية' },
    { code: 'pe', label: 'Pular' },
    { code: 'ma', label: 'Malinké' },
    { code: 'su', label: 'Soussou' }
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100" dir="ltr">
      {/* Top border with Guinean Flag Gradient */}
      <div className="h-1 w-full guinea-gradient-bg"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center cursor-pointer" onClick={() => setView(ViewState.HOME)}>
            <div className="flex flex-col justify-center">
                <div className="flex items-center">
                    <HeartHandshake className="h-8 w-8 text-[#CE1126] mr-2" />
                    <h1 className="font-black text-2xl tracking-tighter text-gray-900">
                        <span className="guinea-gradient-text">BALLAL</span>
                        <span className="text-gray-400 font-light ml-1">ASBL</span>
                    </h1>
                </div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#009460] font-bold ml-10 -mt-1">
                    Solidarité Guinée-Belgique
                </span>
            </div>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden xl:flex items-center space-x-2">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => setView(item.value)}
                className={`px-3 py-2 rounded-md text-xs font-bold transition-colors duration-200 uppercase tracking-wide ${
                  currentView === item.value
                    ? 'text-[#CE1126] bg-red-50'
                    : 'text-gray-500 hover:text-[#CE1126] hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}

            {/* Share Button (Special) */}
             <button
                onClick={() => setView(ViewState.SHARE)}
                className={`flex items-center px-3 py-2 rounded-md text-xs font-bold transition-colors duration-200 uppercase tracking-wide ml-2 ${
                  currentView === ViewState.SHARE
                    ? 'text-[#CE1126] bg-red-50'
                    : 'text-gray-500 hover:text-[#CE1126] hover:bg-gray-50'
                }`}
              >
                <Share2 className="h-4 w-4 mr-1" />
                {t.nav_share}
              </button>
            
            <div className="relative ml-2">
                <button 
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className="flex items-center bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-sm font-bold hover:bg-gray-200 transition-colors"
                >
                  <Globe className="h-4 w-4 mr-2" />
                  {languages.find(l => l.code === language)?.label.substring(0, 3).toUpperCase()}
                </button>
                {isLangOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl z-50 border border-gray-100 py-1">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => { setLanguage(lang.code); setIsLangOpen(false); }}
                        className={`block w-full text-left px-4 py-2 text-sm ${language === lang.code ? 'bg-red-50 text-[#CE1126] font-bold' : 'text-gray-700 hover:bg-gray-50'}`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>
                )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="xl:hidden flex items-center space-x-4">
            {/* Language Switcher Mobile */}
             <div className="relative">
                <button 
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className="flex items-center bg-gray-100 text-gray-700 px-2 py-1.5 rounded-lg text-xs font-bold"
                >
                  <Globe className="h-3 w-3 mr-1" />
                  {language.toUpperCase()}
                </button>
                {isLangOpen && (
                  <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-xl z-50 border border-gray-100 py-1">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => { setLanguage(lang.code); setIsLangOpen(false); }}
                        className={`block w-full text-left px-4 py-2 text-sm ${language === lang.code ? 'bg-red-50 text-[#CE1126] font-bold' : 'text-gray-700 hover:bg-gray-50'}`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>
                )}
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-500 hover:text-gray-900 focus:outline-none p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="xl:hidden bg-white border-b border-gray-200 absolute w-full z-50 shadow-xl">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => {
                  setView(item.value);
                  setIsOpen(false);
                }}
                className={`block w-full text-left px-4 py-3 rounded-md text-base font-bold ${
                  currentView === item.value
                    ? 'text-[#CE1126] bg-red-50'
                    : 'text-gray-600 hover:text-[#CE1126] hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}
             <button
                onClick={() => {
                  setView(ViewState.SHARE);
                  setIsOpen(false);
                }}
                className={`block w-full text-left px-4 py-3 rounded-md text-base font-bold flex items-center ${
                  currentView === ViewState.SHARE
                    ? 'text-[#CE1126] bg-red-50'
                    : 'text-gray-600 hover:text-[#CE1126] hover:bg-gray-50'
                }`}
              >
                <Share2 className="h-4 w-4 mr-2" />
                {t.nav_share}
              </button>

             <button className="w-full text-left px-4 py-3 text-white bg-gray-900 font-bold mt-2 border-l-4 border-[#FCD116]">
              Accès Membre
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
