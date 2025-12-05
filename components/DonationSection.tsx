import React, { useState, useEffect } from 'react';
import { Heart, Copy, Check, CreditCard, Gift, Users, Scale, Shield, Coins, TrendingUp, Info } from 'lucide-react';
import { LanguageCode } from '../types.ts';
import { translations } from '../utils/translations.ts';

interface DonationSectionProps {
  language: LanguageCode;
}

const DonationSection: React.FC<DonationSectionProps> = ({ language }) => {
  const t = translations[language];
  const [copied, setCopied] = useState(false);
  const [activeMethod, setActiveMethod] = useState<'iban' | 'crypto' | 'paypal'>('iban');
  const [annualDonations, setAnnualDonations] = useState<number>(0);
  
  const IBAN = "BE12 3456 7890 1234";
  const BIC = "GEBABEBB";
  const PAYPAL_LINK = "https://www.paypal.me/ballalasbl";
  const CRYPTO_ADDRESS = "0x1234567890abcdef1234567890abcdef12345678";

  // Simulate annual donations counter (for demo purposes)
  useEffect(() => {
    const interval = setInterval(() => {
      setAnnualDonations(prev => {
        const increment = Math.floor(Math.random() * 5) + 1;
        return prev + increment;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (fallbackErr) {
        console.error('Failed to copy:', fallbackErr);
      }
      document.body.removeChild(textArea);
    }
  };

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

        {/* Donation Counter */}
        <div className="mb-8 md:mb-12">
          <div className="bg-gradient-to-r from-slate-900 to-black rounded-2xl p-6 md:p-8 text-center shadow-xl">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
              <div className="text-white">
                <p className="text-sm md:text-base opacity-80 mb-2">Dons annuels collectés</p>
                <div className="flex items-center justify-center gap-3">
                  <span className="text-3xl md:text-4xl font-black">
                    {(annualDonations * 25).toLocaleString()}€
                  </span>
                  <span className="text-green-400 text-sm md:text-base font-bold bg-green-900/30 px-3 py-1 rounded-full">
                    +{annualDonations} dons
                  </span>
                </div>
              </div>
              <div className="h-12 w-px bg-white/20 hidden md:block" aria-hidden="true" />
              <div className="text-white/90">
                <p className="text-sm md:text-base opacity-80 mb-2">Impact communautaire</p>
                <div className="flex items-center justify-center gap-2">
                  <Users className="h-5 w-5" aria-hidden="true" />
                  <span className="text-xl md:text-2xl font-bold">
                    {Math.floor((annualDonations * 25) / 10)} personnes aidées
                  </span>
                </div>
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
                <div 
                  className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-white opacity-5 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2"
                  aria-hidden="true"
                />
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <CreditCard className="h-10 w-10 text-[#FCD116]" aria-hidden="true" />
                        <h3 className="text-2xl font-bold">Virement Bancaire</h3>
                      </div>
                      <p className="text-gray-300 text-sm">
                        Transfert direct vers le compte de l'association
                      </p>
                    </div>
                    <span className="font-mono text-sm opacity-70 tracking-widest hidden md:block">BALLAL ASBL</span>
                  </div>
                  
                  <div className="space-y-4 md:space-y-6">
                    <div>
                      <label className="block text-sm text-gray-400 uppercase tracking-wider font-bold mb-2">
                        IBAN
                      </label>
                      <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <div className="font-mono text-xl md:text-2xl font-bold tracking-wider bg-black/30 px-4 py-3 rounded-lg flex-grow">
                          {IBAN}
                        </div>
                        <button 
                          onClick={() => handleCopy(IBAN)}
                          className={`px-6 py-3 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-[#FCD116] flex items-center justify-center gap-2 min-w-[120px] ${
                            copied 
                              ? 'bg-green-600 text-white' 
                              : 'bg-white/10 hover:bg-white/20 text-white'
                          }`}
                          aria-label="Copier l'IBAN"
                          aria-live="polite"
                        >
                          {copied ? (
                            <>
                              <Check className="h-5 w-5" aria-hidden="true" />
                              Copié
                            </>
                          ) : (
                            <>
                              <Copy className="h-5 w-5" aria-hidden="true" />
                              Copier
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm text-gray-400 uppercase font-bold mb-2">
                          BIC / SWIFT
                        </label>
                        <div className="font-mono text-lg bg-black/30 px-4 py-2 rounded-lg">
                          {BIC}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 uppercase font-bold mb-2">
                          Communication structurée
                        </label>
                        <div className="font-mono text-lg text-yellow-400 font-bold bg-black/30 px-4 py-2 rounded-lg">
                          "DON BALLAL 2024"
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6 md:p-8 bg-white">
                <div className={`mb-6 transition-all duration-300 ${
                  copied ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 h-0 overflow-hidden'
                }`}>
                  <div 
                    className="bg-green-50 text-green-800 px-4 py-3 rounded-xl text-center font-bold flex items-center justify-center border border-green-200 shadow-sm"
                    role="alert"
                    aria-live="assertive"
                  >
                    <Check className="h-5 w-5 mr-2" aria-hidden="true" />
                    {t.donate_copy_success}
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="text-center md:text-left">
                    <h4 className="font-bold text-slate-900 mb-2">QR Code pour mobile banking</h4>
                    <p className="text-gray-600 text-sm max-w-md">
                      Scannez ce code avec l'application de votre banque pour un virement rapide
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-2xl shadow-lg border-2 border-gray-100">
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(IBAN)}&color=0f172a&bgcolor=ffffff&margin=10`}
                      alt="QR Code IBAN pour virement bancaire"
                      className="w-44 h-44"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          {/* PayPal Method */}
          {activeMethod === 'paypal' && (
            <div className="p-8 text-center">
              <div className="mb-6">
                <Coins className="h-16 w-16 text-blue-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Don via PayPal</h3>
                <p className="text-gray-600 mb-6">
                  Don sécurisé avec PayPal - Cartes bancaires acceptées
                </p>
              </div>
              <a
                href={PAYPAL_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg"
              >
                Faire un don avec PayPal
              </a>
            </div>
          )}

          {/* Crypto Method */}
          {activeMethod === 'crypto' && (
            <div className="p-8">
              <div className="mb-6 text-center">
                <TrendingUp className="h-16 w-16 text-purple-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Don en crypto-monnaies</h3>
                <p className="text-gray-600">Ethereum, Bitcoin, et principales cryptos acceptées</p>
              </div>
              <div className="bg-purple-50 p-6 rounded-xl mb-6">
                <label className="block text-sm text-gray-700 font-bold mb-3">
                  Adresse Ethereum (ERC-20)
                </label>
                <div className="flex items-center gap-3 mb-4">
                  <div className="font-mono text-sm bg-white px-4 py-3 rounded-lg flex-grow overflow-x-auto">
                    {CRYPTO_ADDRESS}
                  </div>
                  <button
                    onClick={() => handleCopy(CRYPTO_ADDRESS)}
                    className="px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                  >
                    <Copy className="h-5 w-5" />
                  </button>
                </div>
                <p className="text-xs text-gray-500 flex items-center">
                  <Info className="h-3 w-3 mr-1" />
                  Réseau principal Ethereum uniquement
                </p>
              </div>
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
              <p className="text-slate-900 font-bold">BE 1234.567.890</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DonationSection;