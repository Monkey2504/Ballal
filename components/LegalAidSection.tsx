
import React, { useState } from 'react';
import { Shield, HeartPulse, Scale, AlertTriangle, Gavel, Home, Camera, X, Zap, GraduationCap, Lock, EyeOff } from 'lucide-react';
import { LanguageCode } from '../types';
import { translations } from '../utils/translations';

interface LegalAidSectionProps {
  language?: LanguageCode;
}

const LegalAidSection: React.FC<LegalAidSectionProps> = ({ language = 'fr' }) => {
  const [isFlashMode, setIsFlashMode] = useState(false);
  const t = translations[language];

  // Empêcher le scroll quand le mode Flash est activé
  if (typeof document !== 'undefined') {
    document.body.style.overflow = isFlashMode ? 'hidden' : 'unset';
  }

  return (
    <div className="min-h-screen pb-12 bg-slate-50" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      
      {/* --- MODE FLASH (PLEIN ÉCRAN) --- */}
      {isFlashMode && (
        <div 
            className="fixed inset-0 z-[100] bg-[#CE1126] flex flex-col items-center justify-center p-4 text-center animate-in fade-in duration-200 cursor-pointer"
            onClick={() => setIsFlashMode(false)}
        >
            <button className="absolute top-8 right-8 text-white/50 hover:text-white">
                <X className="h-10 w-10" />
            </button>
            
            <Shield className="h-24 w-24 text-white mb-8 animate-pulse" />
            
            <h1 className="text-4xl sm:text-6xl font-black text-white leading-tight uppercase tracking-tighter mb-8 drop-shadow-md whitespace-pre-line">
                {t.flash_title}
            </h1>

            <div className="bg-white text-black p-6 rounded-xl max-w-md shadow-2xl transform rotate-1">
                <p className="font-bold text-lg mb-2 border-b-2 border-black pb-2 uppercase">{t.flash_msg_title}</p>
                <p className="text-sm font-mono leading-relaxed">
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
      <div className="bg-slate-900 text-white py-12 relative overflow-hidden border-b-8 border-[#CE1126]">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#CE1126] opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <div className="inline-flex items-center justify-center p-3 bg-[#CE1126] rounded-full mb-6 shadow-lg animate-pulse">
                <Gavel className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">
                {t.urgent_title}
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto font-medium leading-relaxed">
                {language === 'ar' 
                  ? "بالتعاون مع رابطة حقوق الإنسان و CIRÉ. الصمت هو أفضل حماية لك." 
                  : language === 'es'
                  ? "En colaboración con la Liga de Derechos Humanos y CIRÉ. Ante la arbitrariedad, el silencio es su mejor protección."
                  : language === 'en'
                  ? "In collaboration with the Human Rights League and CIRÉ. Against arbitrariness, silence is your best protection."
                  : "En collaboration (de combat) avec la Ligue des Droits Humains et le CIRÉ. Face à l'arbitraire, le silence est votre meilleure protection."
                }
            </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
        
        {/* LA FLASH CARD - DÉCLENCHEUR */}
        <div className="mb-16 transform transition-all duration-300 hover:scale-[1.02] cursor-pointer" onClick={() => setIsFlashMode(true)}>
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden border-4 border-[#CE1126] relative max-w-2xl mx-auto group">
                
                {/* Bandeau clignotant */}
                <div className="bg-[#CE1126] text-white p-4 text-center font-black uppercase tracking-widest flex items-center justify-center animate-pulse">
                    <Zap className="h-6 w-6 mr-2 fill-yellow-400 text-yellow-400" />
                    {language === 'ar' ? 'انقر هنا في حالة طوارئ الشرطة' : "CLIQUEZ ICI EN CAS D'URGENCE POLICE"}
                    <Zap className="h-6 w-6 ml-2 fill-yellow-400 text-yellow-400" />
                </div>

                <div className="p-8 md:p-12 text-center space-y-6 bg-red-50 group-hover:bg-red-100 transition-colors">
                    <h3 className="text-3xl md:text-4xl font-black text-gray-900 leading-none tracking-tight whitespace-pre-line">
                         {t.flash_title.split('\n')[0]}...
                    </h3>
                    
                    <div className="inline-block bg-black text-white px-4 py-2 text-sm font-bold rounded uppercase transform -rotate-2">
                        {t.click_for_flash}
                    </div>
                </div>
                
                <div className="bg-gray-900 text-white p-3 text-center text-xs font-mono flex justify-between px-6">
                    <span>Ceci est une protection légale.</span>
                    <span className="flex items-center"><Camera className="h-3 w-3 mr-1"/> Screenshot conseillé</span>
                </div>
            </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
            
            {/* 9bis vs 9ter - CLARIFICATION */}
            <div className="bg-white rounded-xl shadow-md border-l-8 border-blue-600 overflow-hidden hover:shadow-lg transition-all">
                <div className="p-6">
                    <div className="flex items-center mb-6">
                        <Scale className="h-8 w-8 text-blue-600 mr-3" />
                        <h3 className="text-2xl font-black text-gray-900">La Stratégie Papiers</h3>
                    </div>
                    
                    <div className="space-y-6">
                        <p className="text-gray-700 font-medium">
                             {language === 'ar' ? "احذر من الفخاخ. لا تخلط أبداً بين هذين الإجراءين." : "Attention aux pièges. Ne confondez jamais ces deux procédures."}
                        </p>
                        
                        <div className="space-y-4">
                            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                                <h4 className="font-bold text-blue-900 text-lg uppercase flex items-center justify-between">
                                    9bis <span className="text-xs bg-white px-2 py-1 rounded text-blue-600">Humanitaire</span>
                                </h4>
                                <p className="text-sm text-gray-800 mt-1">
                                    C'est la preuve de votre intégration (travail, longue présence).
                                    <br/><span className="font-bold text-red-600">Impératif :</span> Il faut présenter une carte d'identité ou un passeport valide. Sans ça, c'est le rejet.
                                </p>
                            </div>
                            <div className="bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-500">
                                <h4 className="font-bold text-indigo-900 text-lg uppercase flex items-center justify-between">
                                    9ter <span className="text-xs bg-white px-2 py-1 rounded text-indigo-600">Médical</span>
                                </h4>
                                <p className="text-sm text-gray-800 mt-1">
                                    Uniquement si vous êtes <strong>trop malade</strong> pour être soigné en Guinée (risque vital).
                                    <br/>Le filtre médical est extrêmement sévère. Ne jouez pas avec ça sans avocat.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* L'ÉCOLE - SANCTUAIRE (NOUVEAU) */}
            <div className="bg-white rounded-xl shadow-md border-l-8 border-[#FCD116] overflow-hidden hover:shadow-lg transition-all">
                <div className="p-6">
                    <div className="flex items-center mb-6">
                        <GraduationCap className="h-8 w-8 text-yellow-600 mr-3" />
                        <h3 className="text-2xl font-black text-gray-900">
                            {language === 'ar' ? "المدرسة: منطقة آمنة" : "L'École : Zone Sanctuaire"}
                        </h3>
                    </div>
                    
                    <div className="space-y-4">
                        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                            <p className="font-bold text-gray-900 text-lg mb-2">Pas de papiers ? Pas de problème.</p>
                            <p className="text-sm text-gray-800">
                                L'inscription à l'école est un <strong>droit fondamental</strong> et une obligation. Les directeurs d'école n'ont pas le droit de refuser un enfant parce qu'il n'a pas de papiers.
                            </p>
                        </div>

                        <ul className="space-y-3 text-gray-700 font-medium">
                            <li className="flex items-start">
                                <EyeOff className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                                <span>L'école ne dénonce JAMAIS les familles à la police. C'est interdit.</span>
                            </li>
                            <li className="flex items-start">
                                <Shield className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                                <span>La police n'entre pas dans les écoles pour chercher des enfants.</span>
                            </li>
                            <li className="flex items-start">
                                <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-xs mr-2 mt-0.5 flex-shrink-0">!</div>
                                <span className="text-sm">Mettre votre enfant à l'école est la meilleure preuve de votre volonté d'intégration pour le dossier 9bis.</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* LOGEMENT & DOMICILE - INVIOLABLE */}
            <div className="bg-white rounded-xl shadow-md border-l-8 border-slate-800 overflow-hidden hover:shadow-lg transition-all">
                <div className="p-6">
                    <div className="flex items-center mb-6">
                        <Home className="h-8 w-8 text-slate-800 mr-3" />
                        <div className="flex flex-col">
                            <h3 className="text-2xl font-black text-gray-900">Domicile = Forteresse</h3>
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Inviolabilité du logement</span>
                        </div>
                    </div>
                    
                    <div className="space-y-4">
                        <div className="p-5 bg-slate-100 rounded-lg border-2 border-slate-200 relative overflow-hidden">
                            <Lock className="absolute top-2 right-2 h-12 w-12 text-slate-200" />
                            <p className="font-black text-slate-900 text-xl mb-2">"AVEZ-VOUS UN MANDAT ?"</p>
                            <p className="text-slate-700 font-medium">
                                La police ne peut <span className="underline decoration-red-500 decoration-2">jamais</span> entrer chez vous sans l'autorisation d'un <strong>Juge d'Instruction</strong>.
                            </p>
                            <p className="text-sm text-slate-600 mt-2">
                                Un ordre de l'Office des Étrangers (O.Q.T.) ne suffit pas pour forcer votre porte.
                            </p>
                        </div>
                        
                        <div className="bg-red-50 p-3 rounded text-red-800 text-sm font-bold flex items-start">
                            <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0" />
                            Si on frappe : Ne parlez pas. N'ouvrez pas. Demandez à voir le mandat par la fenêtre ou sous la porte.
                        </div>
                    </div>
                </div>
            </div>

             {/* SANTÉ (AMU) */}
             <div className="bg-white rounded-xl shadow-md border-l-8 border-[#009460] overflow-hidden hover:shadow-lg transition-all">
                <div className="p-6">
                    <div className="flex items-center mb-6">
                        <HeartPulse className="h-8 w-8 text-[#009460] mr-3" />
                        <h3 className="text-2xl font-black text-gray-900">{t.health_title}</h3>
                    </div>
                    
                    <div className="space-y-4">
                        <p className="text-sm text-gray-600 font-medium">
                            {t.health_desc}
                        </p>
                        
                        <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                            <h4 className="font-bold text-green-900 mb-2">La procédure CPAS :</h4>
                            <ol className="list-decimal list-inside text-sm text-green-800 space-y-2">
                                <li>Allez au CPAS de votre commune de résidence.</li>
                                <li>Demandez une enquête sociale pour l'AMU.</li>
                                <li>Le CPAS vérifie l'indigence (manque d'argent) et le séjour illégal.</li>
                                <li><span className="font-bold">Le CPAS ne vous dénonce pas.</span></li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* ALLIÉS & EXPERTS */}
        <div className="bg-slate-800 rounded-xl p-8 text-slate-200 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full blur-2xl"></div>
            <div className="text-center mb-8 relative z-10">
                <h3 className="text-2xl font-bold text-white mb-2">Vos Alliés Stratégiques</h3>
                <p className="text-slate-400">Ne faites jamais confiance à la rumeur ("le cousin m'a dit..."). Faites confiance aux juristes.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 relative z-10">
                <a href="https://www.cire.be/" target="_blank" rel="noreferrer" className="bg-slate-700/80 p-5 rounded hover:bg-red-900 transition-colors border border-slate-600 hover:border-red-500 group text-center">
                    <h4 className="font-bold text-white text-xl group-hover:text-red-100 mb-1">CIRÉ</h4>
                    <p className="text-xs text-slate-400 group-hover:text-white">La coordination politique des étrangers.</p>
                </a>
                <a href="https://www.adde.be/" target="_blank" rel="noreferrer" className="bg-slate-700/80 p-5 rounded hover:bg-blue-900 transition-colors border border-slate-600 hover:border-blue-500 group text-center">
                    <h4 className="font-bold text-white text-xl group-hover:text-blue-100 mb-1">ADDE</h4>
                    <p className="text-xs text-slate-400 group-hover:text-white">L'arme du droit pur. Fiches juridiques.</p>
                </a>
                <a href="https://www.liguedh.be/" target="_blank" rel="noreferrer" className="bg-slate-700/80 p-5 rounded hover:bg-[#FCD116] hover:text-black transition-colors border border-slate-600 hover:border-white group text-center">
                    <h4 className="font-bold text-white text-xl group-hover:text-black mb-1">LDH</h4>
                    <p className="text-xs text-slate-400 group-hover:text-black">Contre les violences policières.</p>
                </a>
            </div>
        </div>

      </div>
    </div>
  );
};

export default LegalAidSection;
