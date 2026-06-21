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
      <div className="max-w-4xl mx-auto bg-ivory border border-border-subtle rounded-[8px] shadow-soft-xl overflow-hidden">
        <div className="flag-line" aria-hidden="true"><span /><span /><span /></div>
        <div className="flex items-start gap-4 p-5">
          <div className="shrink-0 p-2 bg-guinea-red/10 rounded-[4px]">
            <Cookie className="h-6 w-6 text-guinea-red" aria-hidden="true" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="dateline text-[11px] text-ink mb-1.5">
              Ce site utilise des cookies techniques
            </h2>
            <p className="text-body-sm text-ink-muted leading-relaxed">
              Nous utilisons uniquement des cookies strictement nécessaires au fonctionnement de l'application
              (session utilisateur, préférences de langue). Aucun cookie publicitaire ni de traçage tiers.
              Vos données restent dans votre navigateur, conformément au{' '}
              <strong className="text-ink">RGPD</strong>.
            </p>
          </div>
          <button
            onClick={decline}
            className="shrink-0 p-1 text-ink-muted hover:text-ink rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/40"
            aria-label="Fermer sans accepter"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
        <div className="flex gap-3 px-5 pb-5 justify-end">
          <button
            onClick={decline}
            className="px-5 py-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-ink border-2 border-ink rounded-[3px] hover:bg-ink hover:text-ivory transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/40 focus-visible:ring-offset-2"
          >
            Refuser (fonctionnel uniquement)
          </button>
          <button
            onClick={accept}
            className="px-5 py-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-ivory bg-ink rounded-[3px] hover:bg-guinea-red transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-guinea-red/50 focus-visible:ring-offset-2 flex items-center gap-2"
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
