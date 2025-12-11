import React, { useState } from 'react';
import { 
  Mail, MapPin, Phone, Link as LinkIcon, FileText, Lock, Users, 
  Heart, Globe, ChevronRight, ExternalLink, Shield, Building,
  Facebook, Instagram, Twitter, Youtube, Linkedin, Clock
} from 'lucide-react'; 
import { LanguageCode, ViewState } from '../types.ts';
import { translations } from '../utils/translations.ts';

interface FooterProps {
  language: LanguageCode;
  setView?: (view: ViewState) => void;
}

interface FooterLink {
  name: string;
  action?: (e: React.MouseEvent) => void;
  href?: string;
  isExternal?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
  badge?: string;
}

interface NavigationSection {
  name: string;
  links: FooterLink[];
}

const Footer: React.FC<FooterProps> = ({ language, setView }) => {
  // CORRECTION CRITIQUE : Fallback sur 'fr' si la langue sélectionnée n'a pas de fichier de traduction complet
  // Cela empêche le crash "Cannot read properties of undefined"
  const t = translations[language] || translations['fr'];
  
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  const contactInfo = {
    address: "Place Masui 9 Boîte 3, 1030 BRUXELLES",
    phone: "0493 43 43 83",
    email: "admin@ballal.be",
    bce: "1016.925.333",
    openingHours: "Sur rendez-vous"
  };

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#', color: 'hover:text-blue-500' },
    { name: 'Instagram', icon: Instagram, href: '#', color: 'hover:text-pink-500' },
    { name: 'Twitter', icon: Twitter, href: '#', color: 'hover:text-sky-500' },
    { name: 'YouTube', icon: Youtube, href: '#', color: 'hover:text-red-500' },
    { name: 'LinkedIn', icon: Linkedin, href: '#', color: 'hover:text-blue-600' },
  ];

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (setView) setView(ViewState.CONTACT);
  };

  const handleNavClick = (e: React.MouseEvent, view: ViewState) => {
    e.preventDefault();
    if (setView) setView(view);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      console.log('Newsletter subscription:', newsletterEmail);
      setNewsletterSubmitted(true);
      setTimeout(() => {
        setNewsletterEmail('');
        setNewsletterSubmitted(false);
      }, 3000);
    }
  };

  const navigationSections: NavigationSection[] = [
    { 
      name: t.footer_quick_links || "Navigation rapide",
      links: [
        { 
          name: t.nav_home || "Accueil", 
          action: (e) => handleNavClick(e, ViewState.HOME)
        },
        { 
          name: t.nav_legal || "Aide Juridique", 
          action: (e) => handleNavClick(e, ViewState.LEGAL_AID)
        },
        { 
          name: t.nav_food_project || "Projet Alimentaire", 
          action: (e) => handleNavClick(e, ViewState.FOOD_AUTONOMY)
        },
        { 
          name: t.nav_history || "Histoire", 
          action: (e) => handleNavClick(e, ViewState.HISTORY)
        }
      ]
    },
    { 
      name: t.footer_resources || "Ressources",
      links: [
        { 
          name: t.footer_member || "Devenir Membre", 
          action: handleContactClick,
          icon: Users
        },
        { 
          name: t.nav_festival || "Festival", 
          action: (e) => handleNavClick(e, ViewState.FESTIVAL)
        },
        { 
          name: t.nav_share || "Partager", 
          action: (e) => handleNavClick(e, ViewState.SHARE)
        }
      ]
    },
    { 
      name: "Légal",
      links: [
        { 
          name: t.footer_privacy || "Confidentialité", 
          action: (e) => handleNavClick(e, ViewState.PRIVACY),
          icon: Shield
        },
        { 
          name: t.footer_terms || "Conditions", 
          action: (e) => handleNavClick(e, ViewState.TERMS),
          icon: FileText
        },
        { 
          name: "Mentions légales", 
          href: "#", 
          action: (e) => handleNavClick(e, ViewState.PRIVACY),
          icon: Building
        },
        { 
          name: "Accessibilité", 
          href: "#accessibility",
          icon: Globe
        }
      ]
    }
  ];

  const renderLink = (link: FooterLink, index: number) => {
    const LinkContent = (
      <>
        {link.icon && <link.icon className="w-4 h-4 mr-2 flex-shrink-0" aria-hidden="true" />}
        {link.name}
        {link.badge && (
          <span className="ml-2 px-2 py-0.5 text-xs bg-gray-800 text-gray-300 rounded-full">
            {link.badge}
          </span>
        )}
      </>
    );

    if (link.action) {
      return (
        <button 
          key={index}
          onClick={link.action}
          className="flex items-center text-sm text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-200 py-2 group w-full text-left focus:outline-none focus:text-white"
          aria-label={link.name}
        >
          <ChevronRight className="w-3 h-3 mr-2 text-gray-600 group-hover:text-[#FCD116] transition-colors flex-shrink-0" aria-hidden="true" />
          <div className="flex items-center">
            {LinkContent}
          </div>
        </button>
      );
    }

    return (
      <a
        key={index}
        href={link.href}
        target={link.isExternal ? "_blank" : "_self"}
        rel={link.isExternal ? "noopener noreferrer" : undefined}
        className="flex items-center text-sm text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-200 py-2 group focus:outline-none focus:text-white"
        aria-label={link.name}
      >
        <div className="flex items-center pl-5">
           {LinkContent}
           {link.isExternal && <ExternalLink className="w-3 h-3 ml-2 opacity-70" aria-hidden="true" />}
        </div>
      </a>
    );
  };

  return (
    <footer 
      className="bg-gradient-to-b from-gray-900 to-black text-gray-300"
      role="contentinfo"
      aria-label="Pied de page"
    >
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#CE1126] rounded-lg shadow-lg shadow-red-900/20">
                  <Heart className="h-8 w-8 text-white" aria-hidden="true" />
                </div>
                <h2 className="text-3xl font-black text-white tracking-tight">BALLAL</h2>
              </div>
              <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
                {t.hero_asbl} - {t.hero_subtitle}
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4 text-gray-500" aria-hidden="true" />
                <span className="text-sm font-mono text-gray-500">N° d'entreprise : {contactInfo.bce}</span>
              </div>
              <p className="text-sm text-gray-500">
                Association reconnue d'utilité publique
              </p>
            </div>

            <div className="pt-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
                Suivez-nous
              </h3>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 bg-gray-800 rounded-lg ${social.color} transition-all hover:scale-110 active:scale-95`}
                    aria-label={`Suivez-nous sur ${social.name}`}
                  >
                    <social.icon className="h-5 w-5" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {navigationSections.map((section, index) => (
            <nav 
              key={index}
              className="space-y-4"
              aria-labelledby={`footer-section-${index}`}
            >
              <h3 
                id={`footer-section-${index}`}
                className="text-sm font-bold text-white uppercase tracking-wider pb-2 border-b border-gray-800"
              >
                {section.name}
              </h3>
              <ul role="list" className="space-y-1">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    {renderLink(link, linkIndex)}
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider pb-2 border-b border-gray-800">
                {t.footer_contact || "Contact"}
              </h3>
              <address className="not-italic space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-gray-500 flex-shrink-0 mt-1" aria-hidden="true" />
                  <p className="text-sm text-gray-400">{contactInfo.address}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gray-500 flex-shrink-0" aria-hidden="true" />
                  <span className="text-sm text-gray-400">
                    {contactInfo.phone}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-gray-500 flex-shrink-0" aria-hidden="true" />
                  <button 
                    onClick={handleContactClick}
                    className="text-sm text-gray-400 hover:text-white transition-colors text-left focus:outline-none focus:underline"
                  >
                    {contactInfo.email}
                  </button>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-gray-500 flex-shrink-0" aria-hidden="true" />
                  <p className="text-sm text-gray-400">{contactInfo.openingHours}</p>
                </div>
              </address>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Newsletter
              </h3>
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" aria-hidden="true" />
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Votre email"
                    className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FCD116] focus:border-transparent transition-all"
                    required
                    aria-label="Adresse email pour la newsletter"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#CE1126] to-red-700 text-white font-bold py-3 rounded-lg hover:from-red-700 hover:to-[#CE1126] transition-all focus:outline-none focus:ring-2 focus:ring-red-500 active:scale-95"
                >
                  {newsletterSubmitted ? 'Merci !' : "S'abonner"}
                </button>
              </form>
              {newsletterSubmitted && (
                <p className="text-sm text-green-400 animate-in slide-in-from-top-1">
                  Merci pour votre inscription !
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-sm text-gray-500">
                &copy; {new Date().getFullYear()} BALLAL ASBL. {t.footer_rights}
              </p>
              <p className="text-xs text-gray-600 mt-1">
                BCE: {contactInfo.bce} • Tous droits réservés.
              </p>
            </div>

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center text-sm text-gray-400 hover:text-white transition-colors p-2 active:scale-95"
              aria-label="Retour en haut de la page"
            >
              <ChevronRight className="h-4 w-4 mr-1 transform rotate-90" aria-hidden="true" />
              Haut de page
            </button>
          </div>
        </div>
      </div>

      <div className="relative h-2 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#CE1126] via-[#FCD116] to-[#009460] animate-gradient"></div>
        <div className="absolute inset-0 bg-black opacity-10"></div>
      </div>

      <div className="bg-black py-4 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-xs text-gray-600">
            Ce site s'engage à être accessible à tous. 
            <a href="#accessibility" className="ml-2 text-gray-500 hover:text-gray-400 underline">
              Déclaration d'accessibilité
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;