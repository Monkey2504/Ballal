// components/Footer.tsx (VERSION COMPACTE, COORDONNÉES À JOUR)

import React from 'react';
import { Mail, MapPin, Phone, Facebook, Youtube, Link as LinkIcon } from 'lucide-react'; 
import { LanguageCode } from '../types';
import { translations } from '../utils/translations';

interface FooterProps {
  language: LanguageCode;
}

const Footer: React.FC<FooterProps> = ({ language }) => {
  const t = translations[language];
  const isFrench = language === 'fr';

  // --- Données du Pied de Page MISES À JOUR ---
  const contactInfo = {
    address: "Chaussée de Gand 645, 1080 Molenbeek-Saint-Jean, Belgique", // ✅ ADRESSE MISE À JOUR
    phone: "0493 43 43 83", // ✅ TÉLÉPHONE MISE À JOUR
    email: "Admin@ballal.be", // ✅ EMAIL MISE À JOUR
  };

  const socialLinks = [
    { name: 'Facebook', href: '#', icon: Facebook, color: 'text-blue-600' },
    { name: 'YouTube', href: '#', icon: Youtube, color: 'text-red-600' },
  ];

  const navigation = [
    { 
      name: t.footer_quick_links || "Quick Links",
      links: [
        { name: t.nav_home, href: "#top" },
        { name: t.nav_team, href: "#team" },
        { name: t.nav_legal, href: "#legal-aid" }, 
        { name: t.footer_contact || "Contact", href: "#contact" },
      ]
    },
    { 
      name: t.footer_resources || "Ressources",
      links: [
        { 
            name: t.footer_statutes || "Statuts (PDF)", 
            href: "https://drive.google.com/file/d/183EZtTCGNJ1Usn-EMPV-KYDV4ssfHod9/view?usp=sharing",
            isExternal: true
        },
        { name: t.footer_report || "Rapport Annuel", href: "#" },
        // ✅ LIEN DEVENIR MEMBRE MIS À JOUR VERS MAILTO
        { 
            name: t.footer_member || "Devenir Membre", 
            href: "mailto:Admin@ballal.be?subject=Demande%20d'adhésion%20à%20l'ASBL%20Ballal",
            isExternal: true 
        },
      ]
    },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 border-t-4 border-[#FCD116]" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        
        {/* Grille principale en 4 colonnes pour mieux répartir l'espace */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5"> 
          
          {/* Colonne 1: Logo et Mission (2 colonnes sur mobile) */}
          <div className="space-y-3 col-span-2 lg:col-span-2"> 
            <h3 className="text-2xl font-extrabold text-[#FCD116] tracking-wider">BALLAL</h3>
            <p className="text-gray-400 text-xs max-w-xs"> 
              {t.hero_asbl}
            </p>
            <div className="flex space-x-3 pt-2">
              {socialLinks.map((item) => (
                <a 
                  key={item.name} 
                  href={item.href} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-gray-700`}
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className={`h-5 w-5 ${item.color}`} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Colonnes Liens de Navigation */}
          {navigation.map((section) => (
            <div key={section.name} className="mt-6 md:mt-0">
              <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-2 border-b border-gray-700 pb-1">
                {section.name}
              </h3>
              <ul role="list" className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a 
                       href={link.href} 
                       target={link.isExternal ? "_blank" : "_self"} 
                       rel={link.isExternal ? "noopener noreferrer" : undefined}
                       className="text-xs text-gray-400 hover:text-[#CE1126] transition-colors flex items-center"
                    >
                      <LinkIcon className="w-3 h-3 mr-2" /> {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Colonne Contact */}
          <div className="mt-6 md:mt-0" id="contact">
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-2 border-b border-gray-700 pb-1">
              {t.footer_contact || "Contact"}
            </h3>
            <address className="space-y-2 not-italic text-xs">
              <p className="flex items-start text-gray-400">
                <MapPin className="h-4 w-4 mr-2 text-gray-500 flex-shrink-0" />
                {contactInfo.address}
              </p>
              <p className="flex items-center text-gray-400">
                <Phone className="h-4 w-4 mr-2 text-gray-500 flex-shrink-0" />
                <a href={`tel:${contactInfo.phone}`} className="hover:text-white transition-colors">{contactInfo.phone}</a>
              </p>
              <p className="flex items-center text-gray-400">
                <Mail className="h-4 w-4 mr-2 text-gray-500 flex-shrink-0" />
                <a href={`mailto:${contactInfo.email}`} className="hover:text-white transition-colors">{contactInfo.email}</a>
              </p>
            </address>
          </div>
        </div>

        {/* Ligne inférieure */}
        <div className="mt-8 border-t border-gray-700 pt-4">
          <p className="text-xs text-gray-500 xl:text-center">
            &copy; {new Date().getFullYear()} BALLAL ASBL. {t.footer_rights || "Tous droits réservés."}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;