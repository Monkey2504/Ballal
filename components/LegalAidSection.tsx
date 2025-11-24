
import React, { useState } from 'react';
import { Shield, HeartPulse, Scale, AlertTriangle, Gavel, Home, Camera, X, Zap, GraduationCap, Lock, EyeOff } from 'lucide-react';
import { LanguageCode } from '../types';
import { translations } from '../utils/translations';

interface LegalAidSectionProps {
  language?: LanguageCode;
}

const LegalAidSection: React.FC<LegalAidSectionProps> = ({ language = 'fr' }) => {
  const [isFlashMode, setIsFlashMode] = useState(false);
  const [lastOpenTime, setLastOpenTime] = useState(0);
  const t = translations[language];

  // Empêcher le scroll quand le mode Flash est activé
  if (typeof document !== 'undefined') {
    document.body.style.overflow = isFlashMode ? 'hidden' : 'unset';
  }

  const openFlashMode = () => {
    setIsFlashMode(true);
    setLastOpenTime(Date.now());
  };

  const closeFlashMode = (e?: React.MouseEvent) => {
    // Prevent closing if opened less than 500ms ago (avoids accidental close on double click)
    if (Date.now() - lastOpenTime > 500) {
        setIsFlashMode(false);
    }
  };

  return (
    <div className="min-h-screen pb-12 bg-slate-50" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      
      {/* --- MODE FLASH (PLEIN ÉCRAN) --- */}
      {isFlashMode && (
        <div 
            className="fixed inset-0 z-[100] bg-[#CE1126] flex flex-col items-center justify-center p-4 text-center animate-in fade-in duration-200 cursor-pointer focus:outline-none"
            onClick={closeFlashMode}
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="flash-title"
            aria-describedby="flash-desc"
        >
            <button 
                className="absolute top-8 right-8 text-white/50 hover:text-white focus:text-white focus:outline-none focus:ring-2 focus:ring-white rounded-full p-2"
                onClick={(e) => { e.stopPropagation(); setIsFlashMode(false); }}
                aria-label={t.flash_close}
                autoFocus
            >
                <X className="h-10 w-10" aria-hidden="true" />
            </button>
            
            <Shield className="h-24 w-24 text-white mb-8 animate-pulse" aria-hidden="true" />
            
            <h1 id="flash-title" className="text-4xl sm:text-6xl font-black text-white leading-tight uppercase tracking-tighter mb-8 drop-shadow-md whitespace-pre-line">
                {t.flash_title}
            </h1>

            <div id="flash-desc" className="bg-white text-black p-6 rounded-xl max-w-md shadow-2xl transform rotate-1">
                <p className="font-bold text-lg mb-2 border-b-2 border-black pb-2 uppercase">{t.flash_msg_title}</p>
                <p className="text-sm font-mono leading-relaxed whitespace-pre-line">
                    {t.flash_msg_body}
                </p>
                <p className="text-xs font-mono mt-2 text-right">Art. 47bis Code Instruction Criminelle</p>
            </div>

            <p className="text-white/80 mt-12 text-sm font-bold animate-bounce uppercase">
                {t.flash_close}
            </p>
        </div>
      )}

      {/* HEADER ACTIVISTE */}
      <div className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-black text-white py-16 relative overflow-hidden border-b-8 border-[#CE1126]">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#CE1126] opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <div className="inline-flex items-center justify-center p-4 bg-[#CE1126] rounded-full mb-8 shadow-lg shadow-red-900/50 animate-pulse">
                <Gavel className="h-12 w-12 text-white" aria-hidden="true" />
            </div>
            {/* H1 SEO Optimization */}
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 leading-tight">
                {t.urgent_title}
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto font-medium leading-relaxed">
                {t.legal_intro}
            </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
        
        {/* LA FLASH CARD - DÉCLENCHEUR */}
        <div 
            className="mb-20 transform transition-all duration-300 hover:scale-[1.01] cursor-pointer focus:outline-none focus:ring-4 focus:ring-yellow-400 rounded-2xl shadow-2xl"
            onClick={openFlashMode}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && openFlashMode()}
            role="button"
            tabIndex={0}
            aria-label="Ouvrir le mode urgence police (Carte Flash)"
        >
            <div className="bg-white rounded-2xl overflow-hidden border-4 border-[#CE1126] relative max-w-3xl mx-auto group">
                
                {/* Bandeau clignotant */}
                <div className="bg-[#CE1126] text-white py-5 px-4 text-center font-black text-lg uppercase tracking-widest flex items-center justify-center animate-pulse">
                    <Zap className="h-8 w-8 mr-3 fill-yellow-400 text-yellow-400" aria-hidden="true" />
                    {t.legal_flash_btn}
                    <Zap className="h-8 w-8 ml-3 fill-yellow-400 text-yellow-400" aria-hidden="true" />
                </div>

                <div className="p-8 md:p-14 text-center space-y-8 bg-gradient-to-b from-red-50 to-white group-hover:from-red-100 group-hover:to-red-50 transition-colors">
                    <h3 className="text-3xl md:text-5xl font-black text-gray-900 leading-none tracking-tight whitespace-pre-line">
                         {t.flash_title.split('\n')[0]}...
                    </h3>
                    
                    <div className="inline-block bg-black text-white px-6 py-3 text-base font-bold rounded shadow-lg uppercase transform -rotate-1 hover:rotate-0 transition-transform">
                        {t.click_for_flash}
                    </div>
                </div>
                
                <div className="bg-gray-900 text-white p-4 text-center text-xs md:text-sm font-mono flex justify-between px-8 items-center border-t border-gray-800">
                    <span className="font-bold text-green-400">{t.legal_flash_protection}</span>
                    <span className="flex items-center text-gray-400"><Camera className="h-4 w-4 mr-2" aria-hidden="true"/> {t.legal_flash_screenshot}</span>
                </div>
            </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
            
            {/* 9bis vs 9ter - CLARIFICATION */}
            <div className="bg-white rounded-2xl shadow-lg border-t-8 border-blue-600 overflow-hidden hover:shadow-xl transition-all h-full flex flex-col">
                <div className="p-8 flex-grow">
                    <div className="flex items-center mb-6 border-b border-gray-100 pb-4">
                        <div className="bg-blue-50 p-3 rounded-lg mr-4">
                            <Scale className="h-8 w-8 text-blue-600" aria-hidden="true" />
                        </div>
                        <h3 className="text-2xl font-black text-gray-900 leading-tight">{t.legal_strategy_title}</h3>
                    </div>
                    
                    <div className="space-y-6">
                        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                            <p className="text-red-900 font-bold text-sm uppercase mb-1 flex items-center">
                                <AlertTriangle className="h-4 w-4 mr-2" />
                                Mise en garde
                            </p>
                            <p className="text-gray-800 text-sm font-medium leading-relaxed">
                                {t.legal_warning}
                            </p>
                        </div>
                        
                        <div className="space-y-4">
                            <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100 hover:bg-blue-50 transition-colors">
                                <h4 className="font-black text-blue-900 text-lg uppercase mb-2">
                                    {t.legal_9bis_title}
                                </h4>
                                <p className="text-sm text-gray-700 leading-relaxed">
                                    {t.legal_9bis_desc}
                                </p>
                            </div>
                            <div className="bg-indigo-50/50 p-5 rounded-xl border border-indigo-100 hover:bg-indigo-50 transition-colors">
                                <h4 className="font-black text-indigo-900 text-lg uppercase mb-2">
                                    {t.legal_9ter_title}
                                </h4>
                                <p className="text-sm text-gray-700 leading-relaxed">
                                    {t.legal_9ter_desc}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* L'ÉCOLE - SANCTUAIRE */}
            <div className="bg-white rounded-2xl shadow-lg border-t-8 border-[#FCD116] overflow-hidden hover:shadow-xl transition-all h-full flex flex-col">
                <div className="p-8 flex-grow">
                    <div className="flex items-center mb-6 border-b border-gray-100 pb-4">
                        <div className="bg-yellow-50 p-3 rounded-lg mr-4">
                            <GraduationCap className="h-8 w-8 text-yellow-600" aria-hidden="true" />
                        </div>
                        <h3 className="text-2xl font-black text-gray-900 leading-tight">
                            {t.legal_school_title}
                        </h3>
                    </div>
                    
                    <div className="space-y-6">
                        <div className="bg-yellow-50 p-5 rounded-xl border border-yellow-200">
                            <p className="font-black text-gray-900 text-lg mb-2">{t.legal_school_subtitle}</p>
                            <p className="text-sm text-gray-800 leading-relaxed font-medium">
                                {t.legal_school_desc}
                            </p>
                        </div>

                        <ul className="space-y-4 text-gray-700 font-medium">
                            <li className="flex items-start">
                                <div className="mt-1 mr-3 flex-shrink-0">
                                    <EyeOff className="h-5 w-5 text-green-600" aria-hidden="true" />
                                </div>
                                <span className="text-sm">{t.legal_school_point1}</span>
                            </li>
                            <li className="flex items-start">
                                <div className="mt-1 mr-3 flex-shrink-0">
                                    <Shield className="h-5 w-5 text-green-600" aria-hidden="true" />
                                </div>
                                <span className="text-sm">{t.legal_school_point2}</span>
                            </li>
                            <li className="flex items-start">
                                <div className="h-5 w-5 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-xs mr-3 mt-1 flex-shrink-0">!</div>
                                <span className="text-sm font-bold text-gray-900">{t.legal_school_point3}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* LOGEMENT & DOMICILE - INVIOLABLE */}
            <div className="bg-white rounded-2xl shadow-lg border-t-8 border-slate-800 overflow-hidden hover:shadow-xl transition-all h-full flex flex-col">
                <div className="p-8 flex-grow">
                    <div className="flex items-center mb-6 border-b border-gray-100 pb-4">
                        <div className="bg-slate-100 p-3 rounded-lg mr-4">
                            <Home className="h-8 w-8 text-slate-800" aria-hidden="true" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-black text-gray-900 leading-tight">{t.legal_home_title}</h3>
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">{t.legal_home_subtitle}</p>
                        </div>
                    </div>
                    
                    <div className="space-y-5">
                        <div className="p-6 bg-slate-100 rounded-xl border-2 border-slate-200 relative overflow-hidden group">
                            <Lock className="absolute top-4 right-4 h-16 w-16 text-slate-200 group-hover:text-slate-300 transition-colors" aria-hidden="true" />
                            <p className="font-black text-slate-900 text-xl mb-3 relative z-10">{t.legal_home_warrant}</p>
                            <p className="text-slate-700 font-medium relative z-10 text-sm leading-relaxed">
                                {t.legal_home_police}
                            </p>
                            <div className="mt-4 pt-4 border-t border-slate-200 relative z-10">
                                <p className="text-xs text-slate-500 italic">
                                    {t.legal_home_oqt}
                                </p>
                            </div>
                        </div>
                        
                        <div className="bg-red-600 text-white p-4 rounded-xl shadow-md flex items-start">
                            <AlertTriangle className="h-6 w-6 mr-3 flex-shrink-0 animate-pulse" aria-hidden="true" />
                            <span className="font-bold text-sm">{t.legal_home_action}</span>
                        </div>
                    </div>
                </div>
            </div>

             {/* SANTÉ (AMU) */}
             <div className="bg-white rounded-2xl shadow-lg border-t-8 border-[#009460] overflow-hidden hover:shadow-xl transition-all h-full flex flex-col">
                <div className="p-8 flex-grow">
                    <div className="flex items-center mb-6 border-b border-gray-100 pb-4">
                        <div className="bg-green-50 p-3 rounded-lg mr-4">
                            <HeartPulse className="h-8 w-8 text-[#009460]" aria-hidden="true" />
                        </div>
                        <h3 className="text-2xl font-black text-gray-900 leading-tight">{t.health_title}</h3>
                    </div>
                    
                    <div className="space-y-6">
                        <p className="text-sm text-gray-700 font-medium leading-relaxed">
                            {t.health_desc}
                        </p>
                        
                        <div className="bg-green-50 p-6 rounded-xl border border-green-100">
                            <h4 className="font-black text-green-900 mb-4 uppercase text-sm tracking-wide">{t.health_steps_title}</h4>
                            <ol className="list-decimal list-inside text-sm text-green-800 space-y-3 font-medium">
                                <li className="pl-2">{t.health_step1}</li>
                                <li className="pl-2">{t.health_step2}</li>
                                <li className="pl-2">{t.health_step3}</li>
                                <li className="pl-2 bg-white/50 p-2 rounded border border-green-200 text-green-900 font-bold shadow-sm">{t.health_step4}</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* ALLIÉS & EXPERTS */}
        <div className="bg-slate-900 rounded-3xl p-10 md:p-12 text-slate-200 relative overflow-hidden shadow-2xl">
             <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl"></div>
             <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#CE1126] opacity-5 rounded-full blur-3xl"></div>
             
            <div className="text-center mb-10 relative z-10">
                <h3 className="text-3xl font-black text-white mb-4 uppercase tracking-tight">{t.allies_title}</h3>
                <p className="text-slate-400 max-w-2xl mx-auto text-lg">{t.allies_desc}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 relative z-10">
                <a href="https://www.cire.be/" target="_blank" rel="noreferrer" className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl hover:bg-[#CE1126] transition-all duration-300 border border-slate-700 hover:border-red-500 group text-center focus:outline-none focus:ring-2 focus:ring-white flex flex-col h-full transform hover:-translate-y-1">
                    <h4 className="font-black text-white text-2xl mb-2">CIRÉ</h4>
                    <p className="text-xs text-slate-400 group-hover:text-red-100 font-medium leading-relaxed flex-grow">{t.legal_ally_cire}</p>
                </a>
                <a href="https://www.adde.be/" target="_blank" rel="noreferrer" className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl hover:bg-blue-600 transition-all duration-300 border border-slate-700 hover:border-blue-400 group text-center focus:outline-none focus:ring-2 focus:ring-white flex flex-col h-full transform hover:-translate-y-1">
                    <h4 className="font-black text-white text-2xl mb-2">ADDE</h4>
                    <p className="text-xs text-slate-400 group-hover:text-blue-100 font-medium leading-relaxed flex-grow">{t.legal_ally_adde}</p>
                </a>
                <a href="https://www.liguedh.be/" target="_blank" rel="noreferrer" className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl hover:bg-[#FCD116] hover:text-black transition-all duration-300 border border-slate-700 hover:border-yellow-400 group text-center focus:outline-none focus:ring-2 focus:ring-white flex flex-col h-full transform hover:-translate-y-1">
                    <h4 className="font-black text-white text-2xl mb-2 group-hover:text-black">LDH</h4>
                    <p className="text-xs text-slate-400 group-hover:text-black font-medium leading-relaxed flex-grow">{t.legal_ally_ldh}</p>
                </a>
            </div>
        </div>

      </div>
    </div>
  );
};

export default LegalAidSection;
