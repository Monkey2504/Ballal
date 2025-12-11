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
const FlashMode: React.FC<{ onClose: () => void, t: any }> = ({ onClose, t }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [countdown, setCountdown] = useState(60);
  
  // Lock body scroll and handle keyboard
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    
    // Focus management
    if (modalRef.current) {
      modalRef.current.focus();
    }

    // Countdown timer
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
      {/* Close Button */}
      <button 
        className="absolute top-8 right-8 text-white hover:bg-white/20 rounded-full p-3 transition-colors focus:outline-none focus:ring-2 focus:ring-white z-10"
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        aria-label={t.flash_close || "Fermer le mode urgence"}
      >
        <X className="h-8 w-8" aria-hidden="true" />
      </button>
      
      {/* Main Content */}
      <div className="max-w-4xl mx-auto">
        {/* Warning Icon */}
        <div className="mb-8 animate-pulse">
          <div className="relative">
            <Shield className="h-32 w-32 text-white mx-auto" aria-hidden="true" />
            <div className="absolute inset-0 flex items-center justify-center">
              <ShieldAlert className="h-16 w-16 text-yellow-400 animate-bounce" />
            </div>
          </div>
        </div>
        
        {/* Title */}
        <h1 
          id="flash-title" 
          className="text-4xl sm:text-6xl md:text-7xl font-black text-white leading-tight uppercase tracking-tighter mb-6 drop-shadow-lg"
        >
          {t.flash_title?.split('\n')[0] || "MODE URGENCE"}
        </h1>
        
        {/* Emergency Card */}
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
          
          {/* Countdown */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-center gap-3">
              <Clock className="h-5 w-5 text-gray-500" aria-hidden="true" />
              <span className="text-sm font-medium text-gray-600">
                Fermeture automatique dans <span className="font-bold text-red-600">{countdown}s</span>
              </span>
            </div>
          </div>
        </div>

        {/* Emergency Contacts */}
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

        {/* Instructions */}
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
    className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl p-6 mb-8 border-l-4 border-amber-500 shadow-sm"
    role="note"
    aria-label="Avertissement juridique"
  >
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0">
        <div className="h-12 w-12 bg-amber-100 rounded-xl flex items-center justify-center">
          <AlertTriangle className="h-6 w-6 text-amber-600" aria-hidden="true" />
        </div>
      </div>
      <div>
        <h4 className="text-amber-900 font-bold text-lg mb-2">
          {t.legal_disclaimer_title || "Avis de non-responsabilité"}
        </h4>
        <p className="text-amber-800 leading-relaxed">
          {t.legal_disclaimer_text || "Ce contenu est fourni à titre informatif uniquement et ne constitue pas un avis juridique. Consultez un avocat qualifié pour des conseils adaptés à votre situation."}
        </p>
      </div>
    </div>
  </div>
);

// --- SUB-COMPONENT: LEGAL CARD ---
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
  <article className="bg-white rounded-2xl shadow-lg border-t-8 overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col group hover:-translate-y-1">
    <div className="p-6 md:p-8 flex-grow">
      {/* Header */}
      <div className="flex items-start gap-4 mb-6 pb-6 border-b border-gray-100">
        <div className={`p-4 rounded-xl ${bgColor} flex-shrink-0`}>
          <Icon className={`h-8 w-8 ${iconColor}`} aria-hidden="true" />
        </div>
        <div className="flex-grow">
          <h3 className="text-xl md:text-2xl font-black text-gray-900 leading-tight">
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
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
            <p className="text-red-900 font-bold text-sm flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" aria-hidden="true" />
              Mise en garde
            </p>
            <p className="text-gray-800 text-sm mt-1 font-medium">
              {warning}
            </p>
          </div>
        )}
        
        <p className="text-gray-700 leading-relaxed font-medium">
          {description}
        </p>
        
        {points && (
          <ul className="space-y-3">
            {points.map((point, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span className="text-sm text-gray-700">{point}</span>
              </li>
            ))}
          </ul>
        )}
        
        {children}
      </div>
    </div>
    
    {/* Footer */}
    <div className={`px-6 md:px-8 py-4 border-t border-gray-100 ${borderColor.replace('border-', 'bg-').replace('-600', '-50')}`}>
      <button className="flex items-center justify-between w-full text-sm font-bold text-gray-700 hover:text-gray-900 group-hover:gap-3 transition-all">
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
    {
      id: 'rights',
      label: 'Vos Droits',
      icon: Shield
    },
    {
      id: 'procedures',
      label: 'Procédures',
      icon: BookOpen
    },
    {
      id: 'resources',
      label: 'Ressources',
      icon: Briefcase
    },
    {
      id: 'contacts',
      label: 'Contacts',
      icon: Users
    }
  ];

  const quickActions = [
    {
      title: 'Télécharger le guide',
      description: 'PDF complet de vos droits',
      icon: FileText,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'Trouver un avocat',
      description: 'Annuaire des professionnels',
      icon: Gavel,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      title: 'Simulateur de situation',
      description: 'Évaluez vos options',
      icon: Scale,
      color: 'bg-green-100 text-green-600'
    },
    {
      title: 'FAQ Juridique',
      description: 'Questions fréquentes',
      icon: Info,
      color: 'bg-amber-100 text-amber-600'
    }
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
              points={[
                  t.legal_school_point1,
                  t.legal_school_point2,
                  t.legal_school_point3
              ]}
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
                <div className="bg-orange-50 p-3 rounded-lg mt-2">
                    <p className="text-xs text-orange-800 font-bold">{t.legal_home_action}</p>
                </div>
            </LegalCard>
            <LegalCard
              icon={HeartPulse}
              title={t.health_title}
              description={t.health_desc}
              points={[
                  t.health_step1,
                  t.health_step2,
                  t.health_step3
              ]}
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
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                      <h5 className="font-bold text-base text-purple-700 mb-2">9bis (Humanitaire)</h5>
                      <p className="text-sm text-gray-600">{t.legal_9bis_desc}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                      <h5 className="font-bold text-base text-purple-700 mb-2">9ter (Médical)</h5>
                      <p className="text-sm text-gray-600">{t.legal_9ter_desc}</p>
                  </div>
               </div>
            </LegalCard>
          </div>
        );
      case 'resources':
        return (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <Users className="h-6 w-6 text-slate-600" />
                  {t.allies_title}
              </h3>
              <p className="text-gray-600 mb-6">{t.allies_desc}</p>
              <div className="grid md:grid-cols-3 gap-6">
                  {[
                      { name: "CIRÉ", desc: t.legal_ally_cire, color: "bg-red-50 text-red-700" },
                      { name: "ADDE", desc: t.legal_ally_adde, color: "bg-blue-50 text-blue-700" },
                      { name: "LDH", desc: t.legal_ally_ldh, color: "bg-orange-50 text-orange-700" }
                  ].map((ally, i) => (
                      <div key={i} className="p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all">
                          <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-2 ${ally.color}`}>
                              {ally.name}
                          </div>
                          <p className="text-sm text-gray-600">{ally.desc}</p>
                      </div>
                  ))}
              </div>
          </div>
        );
      case 'contacts':
        return (
          <div className="grid md:grid-cols-2 gap-8 mb-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-bold mb-4">Contacts d'Urgence</h3>
                <ul className="space-y-4">
                  <li className="flex justify-between items-center border-b border-white/10 pb-2">
                    <span>Police / Urgence vitale</span>
                    <span className="font-mono text-xl font-bold text-yellow-400">112</span>
                  </li>
                  <li className="flex justify-between items-center border-b border-white/10 pb-2">
                    <span>Aide Juridique (Bureau)</span>
                    <span className="font-mono text-xl font-bold">02 511 54 83</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Samu Social</span>
                    <span className="font-mono text-xl font-bold text-green-400">0800 99 340</span>
                  </li>
                </ul>
             </div>
             <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Ballal ASBL</h3>
                <p className="text-gray-600 mb-4">
                  Notre équipe juridique assure une permanence tous les mardis de 14h à 17h.
                </p>
                <div className="space-y-2 text-sm">
                  <p className="flex items-center gap-2"><Phone className="h-4 w-4 text-slate-400"/> 0493 43 43 83</p>
                  <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-slate-400"/> Place Masui 9, 1030 Bruxelles</p>
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
      className="min-h-screen bg-gradient-to-b from-slate-50 to-white"
      dir={language === 'ar' ? 'rtl' : 'ltr'}
      role="main"
      aria-labelledby="legal-aid-title"
    >
      {/* FLASH MODE */}
      {isFlashMode && <FlashMode onClose={() => setIsFlashMode(false)} t={t} />}

      {/* HERO SECTION */}
      <div className="bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white py-16 md:py-24 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#CE1126] opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#009460] opacity-10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-[#CE1126] to-red-700 rounded-full mb-8 shadow-xl">
              <Shield className="h-12 w-12 text-white" aria-hidden="true" />
            </div>
            
            <h1 
              id="legal-aid-title"
              className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6"
            >
              Assistance <span className="text-[#FCD116]">Juridique</span> Urgente
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-medium">
              {t.legal_intro || "Connaissez vos droits, protégez-vous, agissez en toute connaissance"}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 -mt-8 relative z-20">
        
        {/* FLASH BUTTON */}
        <div className="mb-12">
          <button 
            onClick={() => setIsFlashMode(true)}
            className="w-full group focus:outline-none focus:ring-4 focus:ring-red-300 rounded-2xl"
            aria-label="Ouvrir le mode urgence juridique"
          >
            <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-300 group-hover:scale-[1.01]">
              <div className="p-6 md:p-8 text-center relative overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMzAgMTVMMzAgNDVNMTUgMzBMNDUgMzAiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLW9wYWNpdHk9IjAuMiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48L3N2Zz4=')] opacity-10" />
                
                <div className="relative z-10">
                  <div className="flex items-center justify-center gap-4 mb-6">
                    <Zap className="h-12 w-12 text-yellow-300 animate-pulse" aria-hidden="true" />
                    <div className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">
                      MODE URGENCE
                    </div>
                    <Zap className="h-12 w-12 text-yellow-300 animate-pulse" aria-hidden="true" />
                  </div>
                  
                  <p className="text-white/90 text-lg md:text-xl mb-8 max-w-2xl mx-auto font-medium">
                    Accès immédiat à vos droits fondamentaux en situation de crise
                  </p>
                  
                  <div className="inline-flex items-center gap-3 bg-black/40 backdrop-blur-sm px-6 py-3 rounded-full text-white font-bold text-lg">
                    <Camera className="h-5 w-5" aria-hidden="true" />
                    Capture d'écran recommandée
                    <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </div>
                </div>
              </div>
              
              <div className="bg-black/30 px-6 py-4 text-center text-sm font-mono flex flex-col md:flex-row items-center justify-between gap-2">
                <div className="text-white/90">Protection légale immédiate</div>
                <div className="flex items-center gap-2 text-yellow-400">
                  <Shield className="h-4 w-4" aria-hidden="true" />
                  <span>Art. 47bis Code d'instruction criminelle</span>
                </div>
              </div>
            </div>
          </button>
        </div>

        {/* DISCLAIMER */}
        <LegalDisclaimer t={t} />

        {/* QUICK ACTIONS */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-6">
            Actions Rapides
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <button
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 hover:-translate-y-1 text-left group"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${action.color}`}>
                    <action.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">{action.title}</h3>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* NAVIGATION TABS */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-2">
            {legalTopics.map((topic) => (
              <button
                key={topic.id}
                onClick={() => setActiveTab(topic.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-t-lg font-bold transition-all ${
                  activeTab === topic.id
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-gray-600 hover:text-slate-900 hover:bg-gray-100'
                }`}
                aria-label={`Voir ${topic.label}`}
                aria-selected={activeTab === topic.id}
                role="tab"
              >
                <topic.icon className="h-5 w-5" aria-hidden="true" />
                {topic.label}
              </button>
            ))}
          </div>
        </div>

        {/* DYNAMIC CONTENT AREA */}
        {renderContent()}

      </div>
    </div>
  );
};

export default LegalAidSection;