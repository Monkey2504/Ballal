import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Shield, HeartPulse, Scale, AlertTriangle, Gavel, Home, 
  Camera, X, Zap, GraduationCap, Lock, EyeOff, Info, 
  BookOpen, Users, Phone, MapPin, ExternalLink, ChevronRight,
  FileText, Clock, CheckCircle, Target, ShieldAlert, Briefcase
} from 'lucide-react';
import { LanguageCode } from '../types.ts';
import { translations } from '../utils/translations.ts';

interface LegalAidSectionProps {
  language?: LanguageCode;
}

// --- SUB-COMPONENT: FLASH MODE (URGENCE) ---
// (Le code du FlashMode reste identique, c'est une modale plein écran)
const FlashMode: React.FC<{ onClose: () => void, t: any }> = ({ onClose, t }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [countdown, setCountdown] = useState(60);
  
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    
    if (modalRef.current) {
      modalRef.current.focus();
    }

    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
      clearInterval(timer);
    };
  }, [onClose]);

  const emergencyContacts = [
    { name: 'Police', number: '112', description: 'Urgences immédiates' },
    { name: 'Avocat de permanence', number: '0800 123 45', description: 'Assistance juridique 24/7' },
    { name: 'Centre de crise', number: '107', description: 'Écoute et soutien psychologique' }
  ];

  return (
    <div 
      ref={modalRef}
      className="fixed inset-0 z-[100] bg-gradient-to-b from-[#CE1126] to-red-900 flex flex-col items-center justify-center p-4 text-center cursor-pointer focus:outline-none"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="flash-title"
      aria-describedby="flash-desc"
      tabIndex={-1}
    >
      <button 
        className="absolute top-8 right-8 text-white hover:bg-white/20 rounded-full p-3 transition-colors focus:outline-none focus:ring-2 focus:ring-white z-10"
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        aria-label={t.flash_close || "Fermer le mode urgence"}
      >
        <X className="h-8 w-8" aria-hidden="true" />
      </button>
      
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 animate-pulse">
          <div className="relative">
            <Shield className="h-32 w-32 text-white mx-auto" aria-hidden="true" />
            <div className="absolute inset-0 flex items-center justify-center">
              <ShieldAlert className="h-16 w-16 text-yellow-400 animate-bounce" />
            </div>
          </div>
        </div>
        
        <h1 
          id="flash-title" 
          className="text-4xl sm:text-6xl md:text-7xl font-black text-white leading-tight uppercase tracking-tighter mb-6 drop-shadow-lg"
        >
          {t.flash_title?.split('\n')[0] || "MODE URGENCE"}
        </h1>
        
        <div 
          id="flash-desc"
          className="bg-white rounded-2xl p-6 md:p-8 shadow-2xl transform rotate-1 md:rotate-2 max-w-2xl mx-auto mb-8"
        >
          <div className="flex items-center justify-between mb-4 border-b-2 border-black pb-3">
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 bg-red-600 rounded-full animate-pulse"></div>
              <p className="font-black text-xl uppercase tracking-wider">URGENCE JURIDIQUE</p>
            </div>
            <div className="text-xs font-mono bg-black text-white px-3 py-1 rounded-full">
              Art. 47bis
            </div>
          </div>
          
          <div className="space-y-4">
            <p className="font-bold text-lg leading-relaxed">
              {t.flash_msg_title || "Vos droits face aux forces de l'ordre"}
            </p>
            <p className="text-gray-800 leading-relaxed font-medium whitespace-pre-line">
              {t.flash_msg_body || "Vous avez le droit de garder le silence. Vous avez le droit à un avocat. Vous avez le droit de ne pas vous incriminer vous-même. Exercez ces droits calmement et clairement."}
            </p>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-center gap-3">
              <Clock className="h-5 w-5 text-gray-500" aria-hidden="true" />
              <span className="text-sm font-medium text-gray-600">
                Fermeture automatique dans <span className="font-bold text-red-600">{countdown}s</span>
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {emergencyContacts.map((contact, index) => (
            <div 
              key={index}
              className="bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-white/20"
            >
              <div className="text-white font-bold text-lg mb-1">{contact.name}</div>
              <div className="text-2xl font-black text-yellow-400 mb-1">{contact.number}</div>
              <div className="text-white/80 text-sm">{contact.description}</div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-white/90 max-w-2xl mx-auto">
          <p className="text-lg font-medium mb-2">
            {t.flash_close || "Cliquez n'importe où ou appuyez sur Échap pour fermer"}
          </p>
          <p className="text-sm opacity-80">
            Cette information est à titre informatif. En cas d'urgence réelle, appelez immédiatement le 112.
          </p>
        </div>
      </div>
    </div>
  );
};

// --- SUB-COMPONENT: LEGAL DISCLAIMER ---
const LegalDisclaimer: React.FC<{ t: any }> = ({ t }) => (
  <div 
    className="bg-[#FFFBF0] border-2 border-slate-900 rounded-xl p-6 mb-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
    role="note"
    aria-label="Avertissement juridique"
  >
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0">
        <div className="h-10 w-10 bg-slate-900 rounded-full flex items-center justify-center text-white">
          <AlertTriangle className="h-5 w-5" aria-hidden="true" />
        </div>
      </div>
      <div>
        <h4 className="text-slate-900 font-black text-lg mb-2 uppercase">
          {t.legal_disclaimer_title || "Avis de non-responsabilité"}
        </h4>
        <p className="text-gray-700 leading-relaxed font-medium text-sm">
          {t.legal_disclaimer_text || "Ce contenu est fourni à titre informatif uniquement et ne constitue pas un avis juridique. Consultez un avocat qualifié pour des conseils adaptés à votre situation."}
        </p>
      </div>
    </div>
  </div>
);

// --- SUB-COMPONENT: LEGAL CARD (REDESIGNED) ---
const LegalCard: React.FC<{
  icon: React.ElementType;
  title: string;
  subtitle?: string;
  description: string;
  borderColor: string;
  bgColor: string;
  iconColor: string;
  warning?: string;
  points?: string[];
  children?: React.ReactNode;
}> = ({ icon: Icon, title, subtitle, description, borderColor, bgColor, iconColor, warning, points, children }) => (
  <article className={`bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 h-full flex flex-col group border-2 border-slate-900`}>
    <div className="p-6 md:p-8 flex-grow">
      {/* Header */}
      <div className="flex items-start gap-4 mb-6 pb-6 border-b-2 border-slate-100">
        <div className={`p-4 rounded-xl ${bgColor} flex-shrink-0 border-2 border-slate-900`}>
          <Icon className={`h-8 w-8 ${iconColor}`} aria-hidden="true" />
        </div>
        <div className="flex-grow">
          <h3 className="text-xl md:text-2xl font-black text-slate-900 leading-tight uppercase">
            {title}
          </h3>
          {subtitle && (
            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mt-1">
              {subtitle}
            </p>
          )}
        </div>
      </div>
      
      {/* Content */}
      <div className="space-y-6">
        {warning && (
          <div className="bg-red-50 border-l-4 border-red-600 p-4">
            <p className="text-red-900 font-black text-sm flex items-center gap-2 uppercase">
              <AlertTriangle className="h-4 w-4" aria-hidden="true" />
              Mise en garde
            </p>
            <p className="text-gray-800 text-sm mt-2 font-medium">
              {warning}
            </p>
          </div>
        )}
        
        <p className="text-gray-700 leading-relaxed font-serif text-lg">
          {description}
        </p>
        
        {points && (
          <ul className="space-y-3 mt-4">
            {points.map((point, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-[#009460] flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span className="text-sm font-bold text-gray-700">{point}</span>
              </li>
            ))}
          </ul>
        )}
        
        {children}
      </div>
    </div>
    
    {/* Footer */}
    <div className="px-6 md:px-8 py-4 bg-slate-50 border-t-2 border-slate-900">
      <button className="flex items-center justify-between w-full text-sm font-black text-slate-900 uppercase tracking-widest hover:gap-4 transition-all">
        <span>En savoir plus</span>
        <ChevronRight className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  </article>
);

// --- MAIN COMPONENT ---
const LegalAidSection: React.FC<LegalAidSectionProps> = ({ language = 'fr' }) => {
  const [isFlashMode, setIsFlashMode] = useState(false);
  const [activeTab, setActiveTab] = useState('rights');
  const t = translations[language] || translations['fr'];

  const legalTopics = [
    { id: 'rights', label: 'Vos Droits', icon: Shield },
    { id: 'procedures', label: 'Procédures', icon: BookOpen },
    { id: 'resources', label: 'Ressources', icon: Briefcase },
    { id: 'contacts', label: 'Contacts', icon: Users }
  ];

  const quickActions = [
    { title: 'Télécharger le guide', description: 'PDF complet de vos droits', icon: FileText, color: 'bg-blue-100 text-blue-600' },
    { title: 'Trouver un avocat', description: 'Annuaire des professionnels', icon: Gavel, color: 'bg-purple-100 text-purple-600' },
    { title: 'Simulateur de situation', description: 'Évaluez vos options', icon: Scale, color: 'bg-green-100 text-green-600' },
    { title: 'FAQ Juridique', description: 'Questions fréquentes', icon: Info, color: 'bg-amber-100 text-amber-600' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'rights':
        return (
          <div className="grid md:grid-cols-2 gap-8 mb-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <LegalCard
              icon={GraduationCap}
              title={t.legal_school_title}
              subtitle={t.legal_school_subtitle}
              description={t.legal_school_desc}
              points={[t.legal_school_point1, t.legal_school_point2, t.legal_school_point3]}
              borderColor="border-blue-600"
              bgColor="bg-blue-50"
              iconColor="text-blue-600"
            />
            <LegalCard
              icon={Home}
              title={t.legal_home_title}
              subtitle={t.legal_home_subtitle}
              description={t.legal_home_police}
              warning={t.legal_home_warrant}
              borderColor="border-orange-600"
              bgColor="bg-orange-50"
              iconColor="text-orange-600"
            >
                <div className="bg-[#FFFBF0] border border-orange-200 p-3 rounded-lg mt-2">
                    <p className="text-xs text-orange-900 font-bold uppercase">{t.legal_home_action}</p>
                </div>
            </LegalCard>
            <LegalCard
              icon={HeartPulse}
              title={t.health_title}
              description={t.health_desc}
              points={[t.health_step1, t.health_step2, t.health_step3]}
              borderColor="border-green-600"
              bgColor="bg-green-50"
              iconColor="text-green-600"
            />
          </div>
        );
      case 'procedures':
        return (
          <div className="grid md:grid-cols-1 gap-8 mb-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <LegalCard
              icon={Scale}
              title={t.legal_strategy_title || "Stratégie de Séjour"}
              subtitle="Art. 9bis & 9ter"
              description={t.legal_intro || "Comprendre les procédures de régularisation pour raisons humanitaires ou médicales est essentiel."}
              warning={t.legal_warning}
              borderColor="border-purple-600"
              bgColor="bg-purple-50"
              iconColor="text-purple-600"
            >
               <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div className="p-4 bg-gray-50 rounded-lg border-2 border-slate-900">
                      <h5 className="font-black text-base text-slate-900 mb-2 uppercase">9bis (Humanitaire)</h5>
                      <p className="text-sm text-gray-600 font-medium">{t.legal_9bis_desc}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg border-2 border-slate-900">
                      <h5 className="font-black text-base text-slate-900 mb-2 uppercase">9ter (Médical)</h5>
                      <p className="text-sm text-gray-600 font-medium">{t.legal_9ter_desc}</p>
                  </div>
               </div>
            </LegalCard>
          </div>
        );
      case 'resources':
        return (
          <div className="bg-white rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-slate-900 p-8 mb-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-2 uppercase">
                  <Users className="h-6 w-6 text-slate-600" />
                  {t.allies_title}
              </h3>
              <p className="text-gray-700 mb-6 font-medium">{t.allies_desc}</p>
              <div className="grid md:grid-cols-3 gap-6">
                  {[
                      { name: "CIRÉ", desc: t.legal_ally_cire, color: "bg-red-50 text-red-700" },
                      { name: "ADDE", desc: t.legal_ally_adde, color: "bg-blue-50 text-blue-700" },
                      { name: "LDH", desc: t.legal_ally_ldh, color: "bg-orange-50 text-orange-700" }
                  ].map((ally, i) => (
                      <div key={i} className="p-4 rounded-xl border-2 border-gray-100 hover:border-slate-900 transition-all">
                          <div className={`inline-block px-3 py-1 rounded-full text-xs font-black mb-2 uppercase ${ally.color}`}>
                              {ally.name}
                          </div>
                          <p className="text-sm text-gray-600 font-medium">{ally.desc}</p>
                      </div>
                  ))}
              </div>
          </div>
        );
      case 'contacts':
        return (
          <div className="grid md:grid-cols-2 gap-8 mb-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl">
                <h3 className="text-2xl font-black mb-6 uppercase tracking-wider">Contacts d'Urgence</h3>
                <ul className="space-y-6">
                  <li className="flex justify-between items-center border-b border-white/10 pb-4">
                    <span className="font-bold">Police / Urgence vitale</span>
                    <span className="font-mono text-3xl font-black text-[#CE1126]">112</span>
                  </li>
                  <li className="flex justify-between items-center border-b border-white/10 pb-4">
                    <span className="font-bold">Aide Juridique (Bureau)</span>
                    <span className="font-mono text-xl font-bold">02 511 54 83</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="font-bold">Samu Social</span>
                    <span className="font-mono text-xl font-bold text-green-400">0800 99 340</span>
                  </li>
                </ul>
             </div>
             <div className="bg-white p-8 rounded-2xl shadow-xl border-2 border-slate-900">
                <h3 className="text-2xl font-black text-slate-900 mb-4 uppercase">Ballal ASBL</h3>
                <p className="text-gray-600 mb-6 font-serif italic text-lg">
                  Notre équipe juridique assure une permanence tous les mardis de 14h à 17h.
                </p>
                <div className="space-y-4 text-sm font-bold">
                  <p className="flex items-center gap-3"><Phone className="h-5 w-5 text-slate-900"/> 0493 43 43 83</p>
                  <p className="flex items-center gap-3"><MapPin className="h-5 w-5 text-slate-900"/> Place Masui 9, 1030 Bruxelles</p>
                </div>
             </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div 
      className="min-h-screen bg-[#FFFBF0]"
      dir={language === 'ar' ? 'rtl' : 'ltr'}
      role="main"
      aria-labelledby="legal-aid-title"
    >
      {/* FLASH MODE */}
      {isFlashMode && <FlashMode onClose={() => setIsFlashMode(false)} t={t} />}

      {/* HERO SECTION */}
      <div className="bg-slate-900 text-white py-16 md:py-24 relative overflow-hidden border-b-8 border-[#CE1126]">
        {/* Pattern subtil */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center p-4 bg-white/10 rounded-full mb-8 backdrop-blur-sm border border-white/20">
              <Shield className="h-12 w-12 text-[#FCD116]" aria-hidden="true" />
            </div>
            
            <h1 
              id="legal-aid-title"
              className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-6"
            >
              Assistance <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FCD116] to-yellow-500">Juridique</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-serif italic">
              "{t.legal_intro || "Connaissez vos droits, protégez-vous, agissez en toute connaissance"}"
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 -mt-12 relative z-20">
        
        {/* FLASH BUTTON */}
        <div className="mb-16">
          <button 
            onClick={() => setIsFlashMode(true)}
            className="w-full group focus:outline-none rounded-2xl transform hover:-translate-y-2 transition-transform duration-300"
            aria-label="Ouvrir le mode urgence juridique"
          >
            <div className="bg-[#CE1126] rounded-2xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-4 border-slate-900">
              <div className="p-6 md:p-10 text-center relative">
                <div className="relative z-10">
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <Zap className="h-10 w-10 text-[#FCD116] animate-pulse" aria-hidden="true" />
                    <div className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">
                      MODE URGENCE
                    </div>
                    <Zap className="h-10 w-10 text-[#FCD116] animate-pulse" aria-hidden="true" />
                  </div>
                  
                  <p className="text-white/90 text-lg font-bold mb-6">
                    Accès immédiat à vos droits fondamentaux en situation de crise
                  </p>
                  
                  <div className="inline-flex items-center gap-3 bg-white text-slate-900 px-8 py-3 rounded-full font-black text-sm uppercase tracking-widest hover:bg-slate-100 transition-colors">
                    <Camera className="h-5 w-5" aria-hidden="true" />
                    Afficher le texte légal
                  </div>
                </div>
              </div>
            </div>
          </button>
        </div>

        {/* DISCLAIMER */}
        <LegalDisclaimer t={t} />

        {/* QUICK ACTIONS */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-8 uppercase tracking-tight">
            Actions Rapides
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <button
                key={index}
                className="bg-white p-6 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] border-2 border-slate-100 hover:border-slate-900 transition-all duration-300 hover:-translate-y-1 text-left group"
              >
                <div className="flex flex-col gap-4">
                  <div className={`p-3 rounded-lg ${action.color} w-fit`}>
                    <action.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1 group-hover:text-[#CE1126] transition-colors">{action.title}</h3>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">{action.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* NAVIGATION TABS */}
        <div className="mb-10">
          <div className="flex flex-wrap gap-4 border-b-4 border-slate-200 pb-1">
            {legalTopics.map((topic) => (
              <button
                key={topic.id}
                onClick={() => setActiveTab(topic.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-t-lg font-black uppercase text-sm tracking-wide transition-all mb-[-4px] border-t-4 border-x-4 ${
                  activeTab === topic.id
                    ? 'bg-white text-slate-900 border-slate-900 border-b-white z-10'
                    : 'bg-transparent text-gray-400 border-transparent hover:text-slate-600'
                }`}
                aria-label={`Voir ${topic.label}`}
                aria-selected={activeTab === topic.id}
                role="tab"
              >
                <topic.icon className="h-4 w-4" aria-hidden="true" />
                {topic.label}
              </button>
            ))}
          </div>
        </div>

        {/* DYNAMIC CONTENT AREA */}
        <div className="min-h-[400px]">
            {renderContent()}
        </div>

      </div>
    </div>
  );
};

export default LegalAidSection;