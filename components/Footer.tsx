import React from 'react';
import { Mail, MapPin, Phone, Heart, ChevronRight, Shield, FileText, ExternalLink } from 'lucide-react';
import { LanguageCode, ViewState } from '../types.ts';

interface FooterProps {
  language: LanguageCode;
  setView?: (view: ViewState) => void;
}

const NAV_LINKS = [
  { label: 'Accueil',         view: ViewState.HOME },
  { label: 'Entraide',        view: ViewState.SOLIDARITY_NETWORK },
  { label: 'Logement',        view: ViewState.SQUAT },
  { label: 'Droits & Juridique', view: ViewState.LEGAL_AID },
  { label: 'Autonomie Alimentaire', view: ViewState.FOOD_AUTONOMY },
  { label: 'Culture & Histoire', view: ViewState.CULTURE },
  { label: 'Festival',        view: ViewState.FESTIVAL },
  { label: 'Équipe',          view: ViewState.TEAM },
];

const LEGAL_LINKS = [
  { label: 'Politique de confidentialité', view: ViewState.PRIVACY, icon: Shield },
  { label: 'Mentions légales',             view: ViewState.TERMS,   icon: FileText },
  { label: 'Espace presse',               view: ViewState.PRESS,   icon: ExternalLink },
];

const Footer: React.FC<FooterProps> = ({ setView }) => {
  const go = (view: ViewState) => {
    if (setView) setView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-gray-300" role="contentinfo" aria-label="Pied de page">

      {/* Main footer body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

          {/* Brand column */}
          <div className="lg:col-span-1 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#CE1126] rounded-lg flex items-center justify-center shrink-0">
                <Heart className="h-5 w-5 text-white fill-white" aria-hidden="true" />
              </div>
              <div>
                <span className="block font-serif font-black text-xl text-white leading-none">BALLAL</span>
                <span className="block text-[9px] font-bold tracking-[0.25em] text-[#CE1126] uppercase leading-none mt-1">ASBL</span>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Solidarité Guinée-Belgique. Logement, droits, autonomie alimentaire et lien culturel pour la diaspora.
            </p>
            {/* Guinea flag strip */}
            <div className="flex gap-1 mt-4" aria-label="Couleurs du drapeau de Guinée">
              <span className="h-1.5 w-8 bg-[#CE1126] rounded-full" />
              <span className="h-1.5 w-8 bg-[#FCD116] rounded-full" />
              <span className="h-1.5 w-8 bg-[#009460] rounded-full" />
            </div>
          </div>

          {/* Navigation column */}
          <div className="space-y-4">
            <h3 className="text-[10px] font-black text-white uppercase tracking-[0.25em]">
              Navigation
            </h3>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.view}>
                  <button
                    onClick={() => go(link.view)}
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group"
                  >
                    <ChevronRight
                      className="w-3 h-3 text-gray-600 group-hover:text-[#CE1126] group-hover:translate-x-0.5 transition-all"
                      aria-hidden="true"
                    />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal column */}
          <div className="space-y-4">
            <h3 className="text-[10px] font-black text-white uppercase tracking-[0.25em]">
              Légal & Transparence
            </h3>
            <ul className="space-y-2.5">
              {LEGAL_LINKS.map((link) => (
                <li key={link.view}>
                  <button
                    onClick={() => go(link.view)}
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group"
                  >
                    <link.icon className="h-3.5 w-3.5 text-gray-600 group-hover:text-[#CE1126] transition-colors" aria-hidden="true" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
            <div className="pt-4 space-y-1.5">
              <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">N° BCE</p>
              <p className="text-sm text-gray-300 font-mono font-bold">1016.925.333</p>
            </div>
          </div>

          {/* Contact column */}
          <div className="space-y-4">
            <h3 className="text-[10px] font-black text-white uppercase tracking-[0.25em]">
              Contact & Urgence
            </h3>
            <address className="not-italic space-y-3.5">
              <div className="flex items-start gap-3 text-sm">
                <MapPin className="h-4 w-4 text-gray-500 mt-0.5 shrink-0" aria-hidden="true" />
                <span className="text-gray-400 leading-snug">
                  Place Masui 9 Boîte 3<br />
                  1030 Bruxelles, Belgique
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-gray-500 shrink-0" aria-hidden="true" />
                <a
                  href="tel:0493434383"
                  className="font-bold text-white hover:text-[#FCD116] transition-colors"
                >
                  0493 43 43 83
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-gray-500 shrink-0" aria-hidden="true" />
                <a
                  href="mailto:admin@ballal.be"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  admin@ballal.be
                </a>
              </div>
            </address>
            {/* Emergency CTA */}
            <a
              href="tel:0493434383"
              className="inline-flex items-center gap-2 mt-2 px-4 py-2.5 bg-[#CE1126] text-white text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-[#b01020] transition-colors"
            >
              <Phone className="h-3.5 w-3.5" aria-hidden="true" />
              Ligne d'urgence 24h
            </a>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} BALLAL ASBL · Tous droits réservés.
          </p>
          <p className="text-xs text-gray-600 italic">
            Association de solidarité Guinée-Belgique, agréée à Bruxelles.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
