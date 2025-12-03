
import React from 'react';
import { Mail, MapPin, Phone, Link as LinkIcon, FileText, Lock, Users } from 'lucide-react'; 
import { LanguageCode, ViewState } from '../types';
import { translations } from '../utils/translations';

interface FooterProps {
  language: LanguageCode;
  setView?: (view: ViewState) => void;
}

const Footer: React.FC<FooterProps> = ({ language, setView }) => {
  const t = translations[language];

  const contactInfo = {
    address: "Chaussée de Gand 645, 1080 Molenbeek-Saint-Jean, Belgique", 
    phone: "0493 43 43 83", 
    email: "admin@ballal.be", 
  };

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (setView) setView(ViewState.CONTACT);
  };

  const navigation = [
    { 
      name: t.footer_quick_links || "Quick Links",
      links: [
        { name: t.nav_home, href: "#" }, // Managed by setView normally
        { name: t.nav_legal, href: "#legal" }, 
        { name: t.footer_contact, action: handleContactClick },
      ]
    },
    { 
      name: t.footer_resources || "Ressources",
      links: [
        { 
            name: t.footer_statutes, 
            href: "/documents/statuts-ballal.pdf", // Local path simulation
            isExternal: true,
            icon: FileText
        },
        { 
            name: t.footer_member, 
            action: handleContactClick, // Reuse contact form for membership
            icon: Users
        },
      ]
    },
  ];

  // Helper for rendering links or buttons
  const renderLink = (link: any) => {
      if (link.action) {
          return (
              <button 
                onClick={link.action}
                className="text-xs text-gray-300 hover:text-[#CE1126] transition-colors flex items-center text-left"
              >
                 <LinkIcon className="w-3 h-3 mr-2" aria-hidden="true" /> {link.name}
              </button>
          );
      }
      return (
        <a 
            href={link.href} 
            target={link.isExternal ? "_blank" : "_self"} 
            rel={link.isExternal ? "noopener noreferrer nofollow" : undefined}
            className="text-xs text-gray-300 hover:text-[#CE1126] transition-colors flex items-center"
        >
            {link.icon ? <link.icon className="w-3 h-3 mr-2" /> : <LinkIcon className="w-3 h-3 mr-2" />} 
            {link.name}
        </a>
      );
  };

  return (
    <footer className="bg-gray-900 text-gray-300 border-t-4 border-[#FCD116]" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"> 
          
          {/* Identity Column */}
          <div className="space-y-4"> 
            <h3 className="text-3xl font-extrabold text-[#FCD116] tracking-wider">BALLAL</h3>
            <p className="text-gray-400 text-sm max-w-xs leading-relaxed"> 
              {t.hero_asbl} - {t.hero_subtitle}
            </p>
            {/* BCE Number */}
            <p className="text-xs text-gray-500 font-mono border-l-2 border-gray-700 pl-2">
                {t.footer_bce}
            </p>
          </div>

          {/* Navigation Columns */}
          {navigation.map((section) => (
            <nav key={section.name} aria-label={section.name}>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-b border-gray-700 pb-2 w-max">
                {section.name}
              </h3>
              <ul role="list" className="space-y-3">
                {section.links.map((link: any) => (
                  <li key={link.name}>
                    {renderLink(link)}
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Contact Column */}
          <address className="not-italic space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-b border-gray-700 pb-2 w-max">
              {t.footer_contact}
            </h3>
            <div className="space-y-3 text-sm">
              <p className="flex items-start text-gray-300">
                <MapPin className="h-5 w-5 mr-3 text-gray-500 flex-shrink-0" aria-hidden="true" />
                {contactInfo.address}
              </p>
              <p className="flex items-center text-gray-300">
                <Phone className="h-5 w-5 mr-3 text-gray-500 flex-shrink-0" aria-hidden="true" />
                <a href={`tel:${contactInfo.phone}`} className="hover:text-white transition-colors">{contactInfo.phone}</a>
              </p>
              {/* Button instead of direct mailto for better UX/GDPR flow */}
              <button onClick={handleContactClick} className="flex items-center text-gray-300 hover:text-white transition-colors text-left">
                <Mail className="h-5 w-5 mr-3 text-gray-500 flex-shrink-0" aria-hidden="true" />
                {contactInfo.email}
              </button>
            </div>
          </address>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} BALLAL ASBL. {t.footer_rights}
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-gray-300 flex items-center"><Lock className="w-3 h-3 mr-1"/> {t.footer_privacy}</a>
              <a href="#" className="hover:text-gray-300 flex items-center"><FileText className="w-3 h-3 mr-1"/> {t.footer_terms}</a>
          </div>
        </div>
      </div>
      
      {/* Decorative Bottom Bar */}
      <div className="h-1 w-full bg-gradient-to-r from-[#CE1126] via-[#FCD116] to-[#009460]"></div>
    </footer>
  );
};

export default Footer;
