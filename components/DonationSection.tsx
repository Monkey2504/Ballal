
import React, { useState } from 'react';
import { Heart, Copy, Check, CreditCard, Gift, Users, Scale } from 'lucide-react';
import { LanguageCode } from '../types';
import { translations } from '../utils/translations';

interface DonationSectionProps {
  language: LanguageCode;
}

const DonationSection: React.FC<DonationSectionProps> = ({ language }) => {
  const t = translations[language];
  const [copied, setCopied] = useState(false);
  const IBAN = "BE12 3456 7890 1234";
  const BIC = "GEBABEB1";

  const handleCopy = () => {
    navigator.clipboard.writeText(IBAN);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen py-16 bg-slate-50 relative overflow-hidden" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#FCD116] opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#CE1126] opacity-10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-4 bg-red-100 rounded-full mb-6 shadow-lg animate-pulse">
             <Heart className="h-10 w-10 text-[#CE1126] fill-current" />
          </div>
          <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">{t.donate_title}</h1>
          <p className="text-xl text-gray-600 font-medium max-w-2xl mx-auto">
            {t.donate_subtitle}
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 mb-12 transform transition-all hover:scale-[1.01]">
            <div className="bg-slate-900 p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2"></div>
                <div className="relative z-10 flex justify-between items-start mb-8">
                    <CreditCard className="h-12 w-12 text-[#FCD116]" />
                    <span className="font-mono text-sm opacity-70 tracking-widest">BALLAL ASBL DONATION</span>
                </div>
                
                <div className="space-y-2 mb-8">
                    <p className="text-sm text-gray-400 uppercase tracking-wider font-bold">{t.donate_iban_label}</p>
                    <div className="flex items-center space-x-4">
                        <p className="font-mono text-2xl sm:text-3xl font-bold tracking-wider text-white select-all">{IBAN}</p>
                        <button 
                            onClick={handleCopy}
                            className={`p-2 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-[#FCD116] transform active:scale-95 ${copied ? 'bg-green-500 text-white scale-110' : 'bg-white/10 hover:bg-white/20 text-white'}`}
                            title={t.share_copy}
                            aria-label={t.share_copy}
                        >
                            {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                        </button>
                    </div>
                </div>

                <div className="flex justify-between items-end">
                    <div>
                        <p className="text-xs text-gray-400 uppercase font-bold mb-1">BIC / SWIFT</p>
                        <p className="font-mono text-lg">{BIC}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-gray-400 uppercase font-bold mb-1">{t.donate_communication_label}</p>
                        <p className="font-mono text-yellow-400 font-bold">"{t.donate_communication_value}"</p>
                    </div>
                </div>
            </div>
            
            <div className="p-8 bg-white">
                <div className={`transition-all duration-300 transform ${copied ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-2 scale-95 h-0 overflow-hidden'}`}>
                    <div className="bg-green-50 text-green-800 px-4 py-3 rounded-xl mb-6 text-center font-bold flex items-center justify-center border border-green-200 shadow-sm">
                        <Check className="h-5 w-5 mr-2" />
                        {t.donate_copy_success}
                    </div>
                </div>
                <div className="flex justify-center">
                    <img 
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(IBAN)}&color=0f172a`} 
                        alt="QR Code IBAN" 
                        className="w-48 h-48 border-4 border-white shadow-lg rounded-xl"
                        loading="lazy"
                    />
                </div>
                <p className="text-center text-gray-500 text-sm mt-4 font-medium">
                    {t.donate_secure_msg}
                </p>
            </div>
        </div>

        <div className="mb-8">
            <h3 className="text-2xl font-black text-slate-900 mb-6 text-center">{t.donate_impact_title}</h3>
            <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border-t-4 border-[#CE1126] hover:shadow-md transition-shadow">
                    <div className="h-12 w-12 bg-red-50 rounded-xl flex items-center justify-center mb-4">
                        <Scale className="h-6 w-6 text-[#CE1126]" />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-2 text-lg">Justice</h3>
                    <p className="text-gray-500 text-sm font-medium">{t.donate_impact_1}</p>
                </div>
                
                <div className="bg-white p-6 rounded-2xl shadow-sm border-t-4 border-[#FCD116] hover:shadow-md transition-shadow">
                    <div className="h-12 w-12 bg-yellow-50 rounded-xl flex items-center justify-center mb-4">
                        <Gift className="h-6 w-6 text-yellow-600" />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-2 text-lg">Culture</h3>
                    <p className="text-gray-500 text-sm font-medium">{t.donate_impact_2}</p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border-t-4 border-[#009460] hover:shadow-md transition-shadow">
                    <div className="h-12 w-12 bg-green-50 rounded-xl flex items-center justify-center mb-4">
                        <Users className="h-6 w-6 text-[#009460]" />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-2 text-lg">Social</h3>
                    <p className="text-gray-500 text-sm font-medium">{t.donate_impact_3}</p>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default DonationSection;
