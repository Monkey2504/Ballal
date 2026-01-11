
import React from 'react';
import { 
  Mail, MapPin, Phone, Heart, ChevronRight, Shield, Building, Clock
} from 'lucide-react'; 
import { LanguageCode, ViewState } from '../types.ts';
import { translations } from '../utils/translations.ts';

interface FooterProps {
  language: LanguageCode;
  setView?: (view: ViewState) => void;
}

const Footer: React.FC<FooterProps> = ({ language, setView }) => {
  const t = translations[language] || translations['fr'];
  
  const contactInfo = {
    address: "Place Masui 9 Boîte 3, 1030 BRUXELLES",
    phone: "0493 43 43 83",
    email: "admin@ballal.be",
    bce: "1016.925.333",
    openingHours: "Sur rendez-vous"
  };

  const handleNavClick = (e: React.MouseEvent, view: ViewState) => {
    e.preventDefault();
    if (setView) setView(view);
  };

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-gray-300" role="contentinfo">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#CE1126] rounded-lg">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-3xl font-black text-white tracking-tight">BALLAL</h2>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Solidarité Guinée-Belgique. Logement, Nourriture, Droits.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Navigation</h3>
            <ul className="space-y-2">
              {[
                { name: "Accueil", view: ViewState.HOME },
                { name: "Logement", view: ViewState.SQUAT },
                { name: "Manger", view: ViewState.FOOD_AUTONOMY },
                { name: "Équipe", view: ViewState.TEAM },
                { name: "Festival", view: ViewState.FESTIVAL },
              ].map((link) => (
                <li key={link.view}>
                  <button 
                    onClick={(e) => handleNavClick(e, link.view)}
                    className="text-sm text-gray-400 hover:text-white flex items-center group"
                  >
                    <ChevronRight className="w-3 h-3 mr-2 group-hover:text-guinea-yellow" />
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Légal</h3>
            <ul className="space-y-2">
              <li>
                <button onClick={(e) => handleNavClick(e, ViewState.PRIVACY)} className="text-sm text-gray-400 hover:text-white flex items-center">
                  <Shield className="w-4 h-4 mr-2" /> Confidentialité
                </button>
              </li>
              <li>
                <button onClick={(e) => handleNavClick(e, ViewState.TERMS)} className="text-sm text-gray-400 hover:text-white flex items-center">
                  <Building className="w-4 h-4 mr-2" /> Mentions Légales
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Contact Urgent</h3>
            <address className="not-italic space-y-3">
              <div className="flex items-start space-x-3 text-sm">
                <MapPin className="h-4 w-4 text-gray-500 mt-1" />
                <span>{contactInfo.address}</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Phone className="h-4 w-4 text-gray-500" />
                <span className="font-bold">{contactInfo.phone}</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Mail className="h-4 w-4 text-gray-500" />
                <span>{contactInfo.email}</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Clock className="h-4 w-4 text-gray-500" />
                <span>{contactInfo.openingHours}</span>
              </div>
            </address>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} BALLAL ASBL. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
