import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Copy, Check, CreditCard, Coins, TrendingUp, Shield, Target, Utensils, Scale, Users, Truck } from 'lucide-react';
import { LanguageCode } from '../types.ts';
import { translations } from '../utils/translations.ts';

interface DonationSectionProps {
  language: LanguageCode;
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.05, duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const DonationSection: React.FC<DonationSectionProps> = ({ language }) => {
  const t = translations[language] || translations['fr'];
  const [copied, setCopied] = useState(false);
  const [activeMethod, setActiveMethod] = useState<'iban' | 'crypto' | 'paypal'>('iban');

  const IBAN = 'BE43 0020 2412 8201';
  const BIC = 'À RENSEIGNER';
  const PAYPAL_LINK = '#';
  const CRYPTO_ADDRESS = 'Adresse portefeuille à venir';

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch {}
      document.body.removeChild(ta);
    }
  };

  const donationMethods = [
    { id: 'iban',   title: 'Virement Bancaire',  icon: <CreditCard className="h-5 w-5" />, color: 'border-guinea-red',    bgColor: 'bg-guinea-red/10',  textColor: 'text-guinea-red' },
    { id: 'paypal', title: 'PayPal',              icon: <Coins      className="h-5 w-5" />, color: 'border-blue-500',    bgColor: 'bg-blue-50',        textColor: 'text-blue-500' },
    { id: 'crypto', title: 'Crypto-monnaies',     icon: <TrendingUp className="h-5 w-5" />, color: 'border-purple-500', bgColor: 'bg-purple-50',      textColor: 'text-purple-500' },
  ];

  const donationImpact = [
    { amount: 10,  description: 'Fournit un repas chaud à une personne dans le besoin',    icon: Utensils },
    { amount: 25,  description: 'Finance une heure de consultation juridique gratuite',     icon: Scale },
    { amount: 50,  description: "Permet l'organisation d'un atelier de sensibilisation",   icon: Users },
    { amount: 100, description: 'Contribue au transport de denrées alimentaires',           icon: Truck },
  ];

  return (
    <div
      className="min-h-screen py-12 md:py-20 bg-ivory paper-grain"
      dir={language === 'ar' ? 'rtl' : 'ltr'}
      role="main"
      aria-labelledby="donation-title"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="max-w-2xl mb-12 md:mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="flag-line w-8 shrink-0" aria-hidden="true">
              <span /><span /><span />
            </span>
            <p className="dateline text-[11px] text-guinea-red">Soutenir le combat</p>
          </div>
          <h1 id="donation-title" className="font-serif font-black text-[2rem] sm:text-[2.75rem] text-ink leading-[1.02] tracking-tight">
            {t.donate_title}
          </h1>
          <p className="mt-5 text-body-lg text-ink-muted leading-relaxed max-w-xl">
            {t.donate_subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-8 md:mb-12"
        >
          <div className="bg-ink rounded-[4px] p-6 md:p-8 text-center shadow-soft-xl relative overflow-hidden">
            <div className="flag-line" aria-hidden="true"><span /><span /><span /></div>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 divide-y md:divide-y-0 md:divide-x divide-white/10">
              <div className="text-ivory w-full pt-4 md:pt-0">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Target className="h-5 w-5 text-guinea-yellow" aria-hidden="true" />
                  <p className="dateline text-[10px] text-ivory/60">{t.donate_goal_annual}</p>
                </div>
                <span className="font-serif font-black text-3xl md:text-5xl text-ivory">5 000 €</span>
                <p className="text-xs text-ivory/40 mt-2">{t.donate_goal_annual_desc}</p>
              </div>
              <div className="text-ivory w-full pt-6 md:pt-0 md:pl-12">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Check className="h-5 w-5 text-guinea-green" aria-hidden="true" />
                  <p className="dateline text-[10px] text-ivory/60">{t.donate_goal_previous}</p>
                </div>
                <span className="font-serif font-black text-2xl md:text-3xl text-ivory/80">4 520 €</span>
                <p className="text-xs text-ivory/40 mt-2">{t.donate_goal_previous_desc}</p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mb-8">
          <h2 className="font-serif font-black text-2xl text-ink mb-6 text-center">Choisissez votre méthode de don</h2>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {donationMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setActiveMethod(method.id as any)}
                className={`flex items-center px-5 py-3 rounded-[3px] border-2 font-mono text-[12px] font-bold uppercase tracking-[0.08em] transition-colors min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-guinea-red/40 focus-visible:ring-offset-2 ${
                  activeMethod === method.id
                    ? 'border-ink bg-ink text-ivory'
                    : 'border-border-subtle text-ink-muted hover:border-ink'
                }`}
                aria-pressed={activeMethod === method.id}
              >
                <span className="mr-2" aria-hidden="true">{method.icon}</span>
                {method.title}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-[4px] shadow-soft-lg overflow-hidden border border-ink/10 mb-12">
          {activeMethod === 'iban' && (
            <>
              <div className="bg-ink p-6 md:p-8 text-ivory">
                <div>
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <CreditCard className="h-10 w-10 text-guinea-yellow" aria-hidden="true" />
                        <h3 className="font-serif font-black text-2xl">Virement bancaire</h3>
                      </div>
                      <p className="text-ivory/60 text-sm">Transfert direct vers le compte de l'association</p>
                    </div>
                    <span className="dateline text-[10px] text-ivory/60 hidden md:block">BALLAL ASBL</span>
                  </div>
                  <div className="space-y-4 md:space-y-6">
                    <div>
                      <label className="dateline block text-[10px] text-ivory/40 mb-2">IBAN</label>
                      <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <div className="font-mono text-xl md:text-2xl font-bold tracking-wider bg-black/30 px-4 py-3 rounded-[3px] flex-grow">{IBAN}</div>
                        <button
                          onClick={() => handleCopy(IBAN)}
                          className={`px-6 py-3 rounded-[3px] font-mono text-[12px] font-bold uppercase tracking-[0.08em] transition-colors min-h-[44px] flex items-center justify-center gap-2 min-w-[120px] focus:outline-none focus-visible:ring-2 focus-visible:ring-guinea-yellow/50 focus-visible:ring-offset-2 focus-visible:ring-offset-ink ${
                            copied ? 'bg-guinea-green text-white' : 'bg-white/10 hover:bg-white/20 text-ivory'
                          }`}
                          aria-label="Copier l'IBAN"
                        >
                          {copied ? <><Check className="h-5 w-5" />Copié</> : <><Copy className="h-5 w-5" />Copier</>}
                        </button>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="dateline block text-[10px] text-ivory/40 mb-2">BIC / SWIFT</label>
                        <div className="font-mono text-lg bg-black/30 px-4 py-2 rounded-[3px]">{BIC}</div>
                      </div>
                      <div>
                        <label className="dateline block text-[10px] text-ivory/40 mb-2">Communication structurée</label>
                        <div className="font-mono text-lg text-guinea-yellow font-bold bg-black/30 px-4 py-2 rounded-[3px]">« DON BALLAL »</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6 md:p-8 bg-white">
                <div className={`mb-6 transition-all duration-300 ${copied ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
                  <div className="bg-guinea-green/10 text-guinea-green px-4 py-3 rounded-[4px] text-center font-bold flex items-center justify-center border border-guinea-green/20" role="alert">
                    <Check className="h-5 w-5 mr-2" aria-hidden="true" />{t.donate_copy_success}
                  </div>
                </div>
                <div className="text-center">
                  <h4 className="font-serif font-black text-ink mb-2">IBAN en cours de configuration</h4>
                  <p className="text-ink-muted text-sm max-w-md mx-auto leading-relaxed">Veuillez nous contacter directement si vous souhaitez faire un don urgent avant la mise à jour des coordonnées bancaires.</p>
                </div>
              </div>
            </>
          )}
          {activeMethod === 'paypal' && (
            <div className="p-8 text-center">
              <Coins className="h-16 w-16 text-ink mx-auto mb-4" aria-hidden="true" />
              <h3 className="font-serif font-black text-2xl text-ink mb-2">Don via PayPal</h3>
              <p className="text-ink-muted mb-6">Don sécurisé avec PayPal — cartes bancaires acceptées</p>
              <a href={PAYPAL_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-4 bg-ink text-ivory font-mono text-[12px] font-bold uppercase tracking-[0.08em] rounded-[3px] opacity-50 pointer-events-none">
                Lien PayPal à venir
              </a>
            </div>
          )}
          {activeMethod === 'crypto' && (
            <div className="p-8">
              <div className="mb-6 text-center">
                <TrendingUp className="h-16 w-16 text-ink mx-auto mb-4" aria-hidden="true" />
                <h3 className="font-serif font-black text-2xl text-ink mb-2">Don en crypto-monnaies</h3>
                <p className="text-ink-muted">Adresse de portefeuille en cours de configuration</p>
              </div>
              <div className="bg-paper p-6 rounded-[4px] border border-border-subtle">
                <label className="dateline block text-[10px] text-ink-muted mb-3">Adresse Ethereum (ERC-20)</label>
                <div className="font-mono text-sm bg-white px-4 py-3 rounded-[3px] overflow-x-auto border border-border-subtle">{CRYPTO_ADDRESS}</div>
              </div>
            </div>
          )}
        </div>

        <div className="mb-12">
          <h3 className="font-serif font-black text-2xl md:text-3xl text-ink mb-8 text-center">Votre impact en chiffres</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {donationImpact.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.amount}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  className="bg-white p-6 rounded-[4px] shadow-soft-sm border border-ink/10 hover:shadow-soft-lg transition-shadow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <Icon className="h-5 w-5 text-guinea-red" aria-hidden="true" />
                    <span className="font-serif font-black text-2xl text-guinea-red">{item.amount}€</span>
                  </div>
                  <p className="text-ink-muted text-sm leading-relaxed">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="bg-white rounded-[4px] p-8 border border-ink/10 shadow-soft-sm"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-guinea-green/10 rounded-[4px] flex items-center justify-center">
                <Shield className="h-6 w-6 text-guinea-green" aria-hidden="true" />
              </div>
              <div>
                <h4 className="font-serif font-black text-ink mb-1">100% sécurisé et transparent</h4>
                <p className="text-ink-muted text-sm">Tous les dons sont certifiés et utilisés exclusivement pour nos missions</p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm text-ink-muted mb-2">Association reconnue d'utilité publique</p>
              <p className="dateline text-[10px] text-ink">ASBL enregistrée</p>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default DonationSection;
