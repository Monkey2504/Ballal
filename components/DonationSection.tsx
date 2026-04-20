import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Copy, Check, CreditCard, Coins, TrendingUp, Shield, Target } from 'lucide-react';
import { LanguageCode } from '../types.ts';
import { translations } from '../utils/translations.ts';

interface DonationSectionProps {
  language: LanguageCode;
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
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
    { amount: 10,  description: 'Fournit un repas chaud à une personne dans le besoin',    icon: '🍲' },
    { amount: 25,  description: 'Finance une heure de consultation juridique gratuite',     icon: '⚖️' },
    { amount: 50,  description: "Permet l'organisation d'un atelier de sensibilisation",   icon: '👥' },
    { amount: 100, description: 'Contribue au transport de denrées alimentaires',           icon: '🚚' },
  ];

  return (
    <div
      className="min-h-screen py-12 md:py-20 bg-[#FAFAF8] relative overflow-hidden"
      dir={language === 'ar' ? 'rtl' : 'ltr'}
      role="main"
      aria-labelledby="donation-title"
    >
      <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-guinea-yellow opacity-5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-64 h-64 md:w-96 md:h-96 bg-guinea-red opacity-5 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" aria-hidden="true" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center justify-center p-4 bg-guinea-red/10 rounded-full mb-6" aria-hidden="true">
            <Heart className="h-10 w-10 text-guinea-red fill-current" />
          </div>
          <h1 id="donation-title" className="text-3xl md:text-5xl font-black text-[#0F0F0F] mb-4">
            {t.donate_title}
          </h1>
          <p className="text-lg md:text-xl text-[#6B6B6B] font-medium max-w-3xl mx-auto leading-relaxed">
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
          <div className="bg-[#0F0F0F] rounded-2xl p-6 md:p-8 text-center shadow-xl">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 divide-y md:divide-y-0 md:divide-x divide-white/10">
              <div className="text-white w-full pt-4 md:pt-0">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Target className="h-5 w-5 text-guinea-yellow" />
                  <p className="text-sm md:text-base opacity-80 font-bold uppercase tracking-wider">{t.donate_goal_annual}</p>
                </div>
                <span className="text-3xl md:text-5xl font-black text-white">5 000 €</span>
                <p className="text-xs text-white/40 mt-2">{t.donate_goal_annual_desc}</p>
              </div>
              <div className="text-white w-full pt-6 md:pt-0 md:pl-12">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Check className="h-5 w-5 text-guinea-green" />
                  <p className="text-sm md:text-base opacity-80 font-bold uppercase tracking-wider">{t.donate_goal_previous}</p>
                </div>
                <span className="text-2xl md:text-3xl font-bold text-white/80">4 520 €</span>
                <p className="text-xs text-white/40 mt-2">{t.donate_goal_previous_desc}</p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mb-8">
          <h2 className="text-2xl font-black text-[#0F0F0F] mb-6 text-center">Choisissez votre méthode de don</h2>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {donationMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setActiveMethod(method.id as any)}
                className={`flex items-center px-5 py-3 rounded-xl border-2 transition-all min-h-[44px] ${
                  activeMethod === method.id
                    ? `${method.color} ${method.bgColor} ${method.textColor} font-bold shadow-sm`
                    : 'border-[#E8E8E6] text-[#6B6B6B] hover:border-[#CCCCCA]'
                }`}
                aria-pressed={activeMethod === method.id}
              >
                <span className="mr-2">{method.icon}</span>
                {method.title}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-[20px] shadow-[0_8px_32px_rgba(0,0,0,0.08)] overflow-hidden border border-[#E8E8E6] mb-12">
          {activeMethod === 'iban' && (
            <>
              <div className="bg-[#0F0F0F] p-6 md:p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-white opacity-5 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2" aria-hidden="true" />
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <CreditCard className="h-10 w-10 text-guinea-yellow" aria-hidden="true" />
                        <h3 className="text-2xl font-bold">Virement Bancaire</h3>
                      </div>
                      <p className="text-white/60 text-sm">Transfert direct vers le compte de l'association</p>
                    </div>
                    <span className="font-mono text-sm opacity-70 tracking-widest hidden md:block">BALLAL ASBL</span>
                  </div>
                  <div className="space-y-4 md:space-y-6">
                    <div>
                      <label className="block text-sm text-white/40 uppercase tracking-wider font-bold mb-2">IBAN</label>
                      <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <div className="font-mono text-xl md:text-2xl font-bold tracking-wider bg-black/30 px-4 py-3 rounded-lg flex-grow">{IBAN}</div>
                        <button
                          onClick={() => handleCopy(IBAN)}
                          className={`px-6 py-3 rounded-lg transition-all min-h-[44px] flex items-center justify-center gap-2 min-w-[120px] ${
                            copied ? 'bg-guinea-green text-white' : 'bg-white/10 hover:bg-white/20 text-white'
                          }`}
                          aria-label="Copier l'IBAN"
                        >
                          {copied ? <><Check className="h-5 w-5" />Copié</> : <><Copy className="h-5 w-5" />Copier</>}
                        </button>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm text-white/40 uppercase font-bold mb-2">BIC / SWIFT</label>
                        <div className="font-mono text-lg bg-black/30 px-4 py-2 rounded-lg">{BIC}</div>
                      </div>
                      <div>
                        <label className="block text-sm text-white/40 uppercase font-bold mb-2">Communication structurée</label>
                        <div className="font-mono text-lg text-guinea-yellow font-bold bg-black/30 px-4 py-2 rounded-lg">"DON BALLAL"</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6 md:p-8 bg-white">
                <div className={`mb-6 transition-all duration-300 ${copied ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
                  <div className="bg-guinea-green/10 text-guinea-green px-4 py-3 rounded-xl text-center font-bold flex items-center justify-center border border-guinea-green/20" role="alert">
                    <Check className="h-5 w-5 mr-2" aria-hidden="true" />{t.donate_copy_success}
                  </div>
                </div>
                <div className="text-center">
                  <h4 className="font-bold text-[#0F0F0F] mb-2">IBAN en cours de configuration</h4>
                  <p className="text-[#6B6B6B] text-sm max-w-md mx-auto">Veuillez nous contacter directement si vous souhaitez faire un don urgent avant la mise à jour des coordonnées bancaires.</p>
                </div>
              </div>
            </>
          )}
          {activeMethod === 'paypal' && (
            <div className="p-8 text-center">
              <Coins className="h-16 w-16 text-blue-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-[#0F0F0F] mb-2">Don via PayPal</h3>
              <p className="text-[#6B6B6B] mb-6">Don sécurisé avec PayPal - Cartes bancaires acceptées</p>
              <a href={PAYPAL_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-bold rounded-xl opacity-50 pointer-events-none">
                Lien PayPal à venir
              </a>
            </div>
          )}
          {activeMethod === 'crypto' && (
            <div className="p-8">
              <div className="mb-6 text-center">
                <TrendingUp className="h-16 w-16 text-purple-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-[#0F0F0F] mb-2">Don en crypto-monnaies</h3>
                <p className="text-[#6B6B6B]">Adresse de portefeuille en cours de configuration</p>
              </div>
              <div className="bg-purple-50 p-6 rounded-xl">
                <label className="block text-sm text-[#6B6B6B] font-bold mb-3">Adresse Ethereum (ERC-20)</label>
                <div className="font-mono text-sm bg-white px-4 py-3 rounded-lg overflow-x-auto">{CRYPTO_ADDRESS}</div>
              </div>
            </div>
          )}
        </div>

        <div className="mb-12">
          <h3 className="text-2xl md:text-3xl font-black text-[#0F0F0F] mb-8 text-center">Votre impact en chiffres</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {donationImpact.map((item, i) => (
              <motion.div
                key={item.amount}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                className="bg-white p-6 rounded-[12px] shadow-[0_1px_3px_rgba(0,0,0,0.04)] border border-[#E8E8E6] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-shadow hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl" aria-hidden="true">{item.icon}</span>
                  <span className="text-2xl font-black text-guinea-red">{item.amount}€</span>
                </div>
                <p className="text-[#6B6B6B] text-sm font-medium">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="bg-white rounded-[20px] p-8 border border-[#E8E8E6] shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-guinea-green/10 rounded-xl flex items-center justify-center">
                <Shield className="h-6 w-6 text-guinea-green" />
              </div>
              <div>
                <h4 className="font-bold text-[#0F0F0F] mb-1">100% Sécurisé & Transparent</h4>
                <p className="text-[#6B6B6B] text-sm">Tous les dons sont certifiés et utilisés exclusivement pour nos missions</p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm text-[#6B6B6B] mb-2">Association reconnue d'utilité publique</p>
              <p className="text-[#0F0F0F] font-bold">ASBL Enregistrée</p>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default DonationSection;
