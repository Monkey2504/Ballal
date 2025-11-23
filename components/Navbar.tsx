import React, { useState } from 'react';
import { Menu, X, User, HeartHandshake } from 'lucide-react';
import { ViewState } from '../types';

interface NavbarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setView }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Accueil', value: ViewState.HOME },
    { label: 'Actualités', value: ViewState.NEWS },
    { label: 'Agenda', value: ViewState.EVENTS },
    { label: 'Aide & Droits', value: ViewState.LEGAL_AID },
    { label: 'Notre Histoire', value: ViewState.HISTORY },
    { label: 'Galerie', value: ViewState.GALLERY },
    { label: 'Forum', value: ViewState.FORUM },
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-t-4 border-red-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center cursor-pointer" onClick={() => setView(ViewState.HOME)}>
            <div className="flex flex-col justify-center">
                <div className="flex items-center">
                    <HeartHandshake className="h-8 w-8 text-red-600 mr-2" />
                    <h1 className="font-black text-2xl tracking-tighter text-gray-900">
                        BALLAL<span className="text-gray-400 font-light ml-1">ASBL</span>
                    </h1>
                </div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-green-700 font-bold ml-10 -mt-1">
                    Solidarité Guinée-Belgique
                </span>
            </div>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden xl:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => setView(item.value)}
                className={`px-3 py-2 rounded-md text-sm font-bold transition-colors duration-200 uppercase tracking-wide ${
                  currentView === item.value
                    ? 'text-red-600 bg-red-50'
                    : 'text-gray-500 hover:text-red-600 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button className="bg-gray-900 text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors flex items-center shadow-lg">
              <User className="h-4 w-4 mr-2" />
              Espace Membre
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="xl:hidden flex items-center">
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
                    ? 'text-red-600 bg-red-50'
                    : 'text-gray-600 hover:text-red-600 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}
             <button className="w-full text-left px-4 py-3 text-white bg-gray-900 font-bold mt-2">
              Accès Membre
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;