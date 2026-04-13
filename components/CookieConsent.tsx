import React, { useState, useEffect } from 'react';
import { Shield, X, Cookie } from 'lucide-react';

const CONSENT_KEY = 'ballal_cookie_consent';

const CookieConsent: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CONSENT_KEY);
      if (!stored) setVisible(true);
    } catch {
      // localStorage unavailable — don't show banner
    }
  }, []);

  const accept = () => {
    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify({ accepted: true, date: new Date().toISOString() }));
    } catch { /* ignore */ }
    setVisible(false);
  };

  const decline = () => {
    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify({ accepted: false, date: new Date().toISOString() }));
    } catch { /* ignore */ }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Gestion des cookies"
      className="fixed bottom-0 left-0 right-0 z-[200] p-4 sm:p-6"
    >
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-start gap-4 p-5">
          <div className="shrink-0 p-2 bg-[#BE0000]/10 rounded-xl">
            <Cookie className="h-6 w-6 text-[#BE0000]" aria-hidden="true" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-sm font-black text-gray-900 uppercase tracking-wide mb-1">
              Ce site utilise des cookies techniques
            </h2>
            <p className="text-xs text-gray-600 leading-relaxed">
              Nous utilisons uniquement des cookies strictement nécessaires au fonctionnement de l'application
              (session utilisateur, préférences de langue). Aucun cookie publicitaire ni de traçage tiers.
              Vos données restent dans votre navigateur, conformément au{' '}
              <strong>RGPD</strong>.
            </p>
          </div>
          <button
            onClick={decline}
            className="shrink-0 p-1 text-gray-400 hover:text-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
            aria-label="Fermer sans accepter"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
        <div className="flex gap-3 px-5 pb-5 justify-end">
          <button
            onClick={decline}
            className="px-4 py-2 text-xs font-bold text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Refuser (fonctionnel uniquement)
          </button>
          <button
            onClick={accept}
            className="px-4 py-2 text-xs font-black text-white bg-[#BE0000] rounded-xl hover:bg-[#b01020] transition-colors focus:outline-none focus:ring-2 focus:ring-[#BE0000] focus:ring-offset-2 flex items-center gap-2"
          >
            <Shield className="h-3.5 w-3.5" aria-hidden="true" />
            Accepter et continuer
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
