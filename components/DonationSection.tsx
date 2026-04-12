import React, { useState } from 'react';
import { Heart, Copy, Check, CreditCard, Coins, TrendingUp, Shield, Target } from 'lucide-react';
import { LanguageCode } from '../types.ts';
import { translations } from '../utils/translations.ts';
import { PAYMENT } from '../constants/payment.ts';
import { useClipboard } from '../utils/useClipboard.ts';

interface DonationSectionProps {
  language: LanguageCode;
}

const DonationSection: React.FC<DonationSectionProps> = ({ language }) => {
  const t = translations[language] || translations['fr'];
  const { copy, copied } = useClipboard();
  const [activeMethod, setActiveMethod] = useState<'iban' | 'crypto' | 'paypal'>('iban');

  const donationMethods = [
    {
      id: 'iban',
      title: 'Virement Bancaire',
      icon: <CreditCard className="h-5 w-5" />,
      color: 'border-[#CE1126]',
      bgColor: 'bg-red-50',
      textColor: 'text-[#CE1126]'
    },
    {
      id: 'paypal',
      title: 'PayPal',
      icon: <Coins className="h-5 w-5" />,
      color: 'border-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-500'
    },
    {
      id: 'crypto',
      title: 'Crypto-monnaies',
      icon: <TrendingUp className="h-5 w-5" />,
      color: 'border-purple-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-500'
    }
  ];

  const donationImpact = [
    {
      amount: 10,
      description: 'Fournit un repas chaud à une personne dans le besoin',
      icon: '🍲'
    },
    {
      amount: 25,
      description: 'Finance une heure de consultation juridique gratuite',
      icon: '⚖️'
    },
    {
      amount: 50,
      description: 'Permet l\'organisation d\'un atelier de sensibilisation',
      icon: '👥'
    },
    {
      amount: 100,
      description: 'Contribue au transport de denrées alimentaires',
      icon: '🚚'
    }
  ];

  return (
    <div 
      className="min-h-screen py-12 md:py-20 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden"
      dir={language === 'ar' ? 'rtl' : 'ltr'}
      role="main"
      aria-labelledby="donation-title"
    >
      {/* Background elements */}
      <div 
        className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-[#FCD116] opacity-5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"
        aria-hidden="true"
      />
      <div 
        className="absolute bottom-0 left-0 w-64 h-64 md:w-96 md:h-96 bg-[#CE1126] opacity-5 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div 
            className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-red-100 to-red-50 rounded-full mb-6 shadow-lg"
            aria-hidden="true"
          >
            <Heart className="h-10 w-10 text-[#CE1126] fill-current animate-pulse" />
          </div>
          <h1 
            id="donation-title"
            className="text-3xl md:text-5xl font-black text-slate-900 mb-4"
          >
            {t.donate_title}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 font-medium max-w-3xl mx-auto leading-relaxed">
            {t.donate_subtitle}
          </p>
        </div>

        {/* Donation Statistics (Static & Honest) */}
        <div className="mb-8 md:mb-12">
          <div className="bg-gradient-to-r from-slate-900 to-black rounded-2xl p-6 md:p-8 text-center shadow-xl border border-gray-800">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 divide-y md:divide-y-0 md:divide-x divide-white/10">
              
              {/* Objectif */}
              <div className="text-white w-full pt-4 md:pt-0">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Target className="h-5 w-5 text-[#FCD116]" />
                  <p className="text-sm md:text-base opacity-80 font-bold uppercase tracking-wider">{t.donate_goal_annual}</p>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <span className="text-3xl md:text-5xl font-black text-white">
                    5 000 €
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-2">{t.donate_goal_annual_desc}</p>
              </div>

              {/* Bilan Précédent */}
              <div className="text-white w-full pt-6 md:pt-0 md:pl-12">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Check className="h-5 w-5 text-[#009460]" />
                  <p className="text-sm md:text-base opacity-80 font-bold uppercase tracking-wider">{t.donate_goal_previous}</p>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-2xl md:text-3xl font-bold text-gray-200">
                    4 520 €
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-2">{t.donate_goal_previous_desc}</p>
              </div>

            </div>
          </div>
        </div>

        {/* Donation Methods Tabs */}
        <div className="mb-8">
          <h2 className="text-2xl font-black text-slate-900 mb-6 text-center">
            Choisissez votre méthode de don
          </h2>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {donationMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setActiveMethod(method.id as any)}
                className={`flex items-center px-5 py-3 rounded-xl border-2 transition-all ${
                  activeMethod === method.id
                    ? `${method.color} ${method.bgColor} ${method.textColor} font-bold shadow-sm`
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
                aria-pressed={activeMethod === method.id}
              >
                <span className="mr-2">{method.icon}</span>
                {method.title}
              </button>
            ))}
          </div>
        </div>

        {/* Donation Details */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 mb-12 transition-all duration-300">
          
          {/* IBAN Method */}
          {activeMethod === 'iban' && (
            <>
              <div className="bg-slate-900 p-6 md:p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-white opacity-5 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2" aria-hidden="true" />
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <CreditCard className="h-10 w-10 text-[#FCD116]" aria-hidden="true" />
                        <h3 className="text-2xl font-bold">Virement Bancaire</h3>
                      </div>
                      <p className="text-gray-300 text-sm">Transfert direct vers le compte de l'association</p>
                    </div>
                    <span className="font-mono text-sm opacity-70 tracking-widest hidden md:block">{PAYMENT.ACCOUNT_NAME}</span>
                  </div>
                  <div className="space-y-4 md:space-y-6">
                    <div>
                      <label className="block text-sm text-gray-400 uppercase tracking-wider font-bold mb-2">IBAN</label>
                      <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <div className="font-mono text-xl md:text-2xl font-bold tracking-wider bg-black/30 px-4 py-3 rounded-lg flex-grow">
                          {PAYMENT.IBAN}
                        </div>
                        <button
                          onClick={() => copy(PAYMENT.IBAN)}
                          className={`px-6 py-3 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-[#FCD116] flex items-center justify-center gap-2 min-w-[120px] ${copied ? 'bg-green-600 text-white' : 'bg-white/10 hover:bg-white/20 text-white'}`}
                          aria-label="Copier l'IBAN"
                        >
                          {copied ? <><Check className="h-5 w-5" aria-hidden="true" />Copié</> : <><Copy className="h-5 w-5" aria-hidden="true" />Copier</>}
                        </button>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm text-gray-400 uppercase font-bold mb-2">BIC / SWIFT</label>
                        <div className="font-mono text-lg bg-black/30 px-4 py-2 rounded-lg">{PAYMENT.BIC}</div>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 uppercase font-bold mb-2">Communication</label>
                        <div className="font-mono text-lg text-yellow-400 font-bold bg-black/30 px-4 py-2 rounded-lg">"{PAYMENT.COMMUNICATION_DON}"</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6 md:p-8 bg-white">
                {copied && (
                  <div className="mb-6 bg-green-50 text-green-800 px-4 py-3 rounded-xl text-center font-bold flex items-center justify-center border border-green-200 shadow-sm" role="alert">
                    <Check className="h-5 w-5 mr-2" aria-hidden="true" />
                    {t.donate_copy_success}
                  </div>
                )}
                <p className="text-center text-gray-500 text-sm">Virement sécurisé directement sur le compte de l'ASBL.</p>
              </div>
            </>
          )}

          {/* PayPal Method */}
          {activeMethod === 'paypal' && (
            <div className="p-8 text-center">
              <Coins className="h-16 w-16 text-blue-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Don via PayPal</h3>
              <p className="text-gray-500 mb-6">Le lien PayPal sera disponible prochainement. En attendant, utilisez le virement bancaire.</p>
            </div>
          )}

          {/* Crypto Method */}
          {activeMethod === 'crypto' && (
            <div className="p-8 text-center">
              <TrendingUp className="h-16 w-16 text-purple-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Don en crypto-monnaies</h3>
              <p className="text-gray-500">Les adresses de portefeuille seront disponibles prochainement.</p>
            </div>
          )}
        </div>

        {/* Impact Visualization */}
        <div className="mb-12">
          <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-8 text-center">
            Votre impact en chiffres
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {donationImpact.map((item) => (
              <div 
                key={item.amount}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl" aria-hidden="true">{item.icon}</span>
                  <span className="text-2xl font-black text-[#CE1126]">{item.amount}€</span>
                </div>
                <p className="text-gray-600 text-sm font-medium">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trust & Security */}
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 border border-gray-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-1">100% Sécurisé & Transparent</h4>
                <p className="text-gray-600 text-sm">
                  Tous les dons sont certifiés et utilisés exclusivement pour nos missions
                </p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm text-gray-500 mb-2">Association reconnue d'utilité publique</p>
              <p className="text-slate-900 font-bold">ASBL Enregistrée</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DonationSection;
