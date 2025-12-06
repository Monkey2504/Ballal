import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, Flag, GraduationCap, Globe, Home, Users, 
  ArrowDown, ChevronRight, Sparkles, Target, Clock, 
  MapPin, Heart, Star, Award
} from 'lucide-react';
import { LanguageCode } from '../types.ts';
import { translations } from '../utils/translations.ts';

interface HistorySectionProps {
  language: LanguageCode;
}

interface TimelineEventData {
  year: string;
  title: string;
  description: string;
  icon: React.ElementType;
  iconLabel: string;
  themeColor: string;
  bgColor: string;
  keyAchievements?: string[];
  location?: string;
  significance?: string;
}

interface MilestoneProps {
  event: TimelineEventData;
  index: number;
  isActive: boolean;
  onActivate: () => void;
}

// --- SUB-COMPONENTS ---

const MilestoneDot: React.FC<{ event: TimelineEventData, isActive: boolean }> = ({ event, isActive }) => (
  <div className="relative">
    <div 
      className={`h-6 w-6 rounded-full border-4 bg-white transition-all duration-300 ${
        isActive 
          ? `${event.themeColor.replace('border-', 'border-')} scale-125 shadow-lg` 
          : 'border-gray-300'
      }`}
      aria-hidden="true"
    />
    {isActive && (
      <div 
        className={`absolute inset-0 rounded-full animate-ping opacity-75 ${
          event.themeColor.replace('border-', 'bg-')
        }`}
        aria-hidden="true"
      />
    )}
  </div>
);

const MilestoneCard: React.FC<MilestoneProps> = ({ event, index, isActive, onActivate }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isActive && cardRef.current) {
      cardRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  }, [isActive]);

  return (
    <article 
      ref={cardRef}
      onClick={onActivate}
      className={`relative cursor-pointer transition-all duration-500 ${
        isActive 
          ? 'transform scale-[1.02] z-10' 
          : 'opacity-90 hover:opacity-100'
      }`}
      role="button"
      tabIndex={0}
      aria-label={`Découvrir ${event.year}: ${event.title}`}
      onKeyPress={(e) => e.key === 'Enter' && onActivate()}
    >
      <div 
        className={`bg-white rounded-2xl shadow-lg border-2 overflow-hidden transition-all duration-300 ${
          isActive 
            ? `${event.themeColor} shadow-xl` 
            : 'border-gray-100 hover:border-gray-200 hover:shadow-md'
        }`}
      >
        {/* Card Header */}
        <div className={`p-6 ${event.bgColor} border-b border-opacity-20`}>
          <div className="flex items-center justify-between mb-3">
            <time 
              className="text-2xl md:text-3xl font-black text-slate-900" 
              dateTime={event.year}
            >
              {event.year}
            </time>
            <div 
              className={`p-3 rounded-full ${
                isActive ? 'bg-white' : event.bgColor
              } ${event.themeColor.replace('border-', 'text-')}`}
              aria-label={event.iconLabel}
              role="img"
            >
              <event.icon className="h-6 w-6" aria-hidden="true" />
            </div>
          </div>
          
          <h3 className={`text-xl font-bold leading-tight mb-2 ${
            isActive ? 'text-slate-900' : 'text-slate-800'
          }`}>
            {event.title}
          </h3>
          
          {event.location && (
            <div className="flex items-center gap-2 text-sm text-slate-600 mt-2">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              <span>{event.location}</span>
            </div>
          )}
        </div>

        {/* Card Body */}
        <div className="p-6">
          <p className="text-gray-700 leading-relaxed mb-4">
            {event.description}
          </p>
          
          {event.keyAchievements && isActive && (
            <div className="mt-6 pt-6 border-t border-gray-100">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Star className="h-4 w-4" aria-hidden="true" />
                Réalisations clés
              </h4>
              <ul className="space-y-2">
                {event.keyAchievements.map((achievement, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                    <ChevronRight className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {event.significance && isActive && (
            <div className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-200">
              <h4 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
                <Target className="h-4 w-4" aria-hidden="true" />
                Signification historique
              </h4>
              <p className="text-sm text-gray-700">{event.significance}</p>
            </div>
          )}

          {/* Active State Indicator */}
          {isActive && (
            <div className="mt-6 flex items-center justify-center">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Sparkles className="h-4 w-4 text-[#FCD116] animate-pulse" aria-hidden="true" />
                <span className="font-medium">Période active</span>
              </div>
            </div>
          )}
        </div>

        {/* Card Footer */}
        <div className={`px-6 py-4 border-t ${isActive ? 'border-gray-200' : 'border-gray-100'}`}>
          <button
            onClick={onActivate}
            className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
              isActive
                ? 'bg-slate-900 text-white hover:bg-black'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            aria-label={`${isActive ? 'Actuellement sélectionné' : 'En savoir plus sur'} ${event.year}`}
          >
            {isActive ? 'Sélectionné' : 'Explorer'}
            <ChevronRight className={`h-4 w-4 transition-transform ${isActive ? 'rotate-90' : ''}`} aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
};

const HistorySection: React.FC<HistorySectionProps> = ({ language }) => {
  const t = translations[language];
  const isRtl = language === 'ar';
  const [activeIndex, setActiveIndex] = useState(0);
  const [animateIn, setAnimateIn] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setAnimateIn(true);
    
    // Auto-rotate through milestones
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % events.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);

  const events: TimelineEventData[] = [
    {
      year: '1958',
      title: t.hist_1958_title || "L'Audace de la Dignité",
      description: t.hist_1958_desc || "Indépendance immédiate de la Guinée sous la conduite de Sékou Touré, marquant la fin de la colonisation française en Afrique de l'Ouest.",
      icon: Flag,
      iconLabel: "Indépendance",
      themeColor: 'border-[#CE1126]',
      bgColor: 'bg-gradient-to-br from-red-50 to-red-100',
      keyAchievements: [
        'Première colonie française à obtenir son indépendance',
        'Référendum historique du 28 septembre 1958',
        'Leadership panafricain de Sékou Touré'
      ],
      location: 'Conakry, Guinée',
      significance: 'Tournant décisif pour la décolonisation africaine'
    },
    {
      year: '1960-1980',
      title: t.hist_1960_title || "L'Élite Intellectuelle",
      description: t.hist_1960_desc || "Formation massive d'une élite estudiantine guinéenne en Europe, préparant les futurs cadres de la diaspora.",
      icon: GraduationCap,
      iconLabel: "Éducation",
      themeColor: 'border-[#FCD116]',
      bgColor: 'bg-gradient-to-br from-yellow-50 to-amber-100',
      keyAchievements: [
        'Bourses d\'études gouvernementales',
        'Formation en France, Belgique, Russie',
        'Création d\'associations étudiantes'
      ],
      location: 'Europe',
      significance: 'Fondation de la diaspora intellectuelle guinéenne'
    },
    {
      year: t.hist_1990_year || "Années 1990",
      title: t.hist_1990_title || "L'Exil et la Survie",
      description: t.hist_1990_desc || "Arrivée massive des Guinéens en Europe suite aux troubles politiques, marquant le début de l\'installation durable.",
      icon: Globe,
      iconLabel: "Diaspora",
      themeColor: 'border-slate-600',
      bgColor: 'bg-gradient-to-br from-slate-50 to-slate-100',
      keyAchievements: [
        'Premières associations communautaires',
        'Aide à l\'installation des nouveaux arrivants',
        'Maintien des liens culturels'
      ],
      location: 'Bruxelles, Paris, Liège',
      significance: 'Formation des premières communautés organisées'
    },
    {
      year: '2000-2010',
      title: t.hist_2000_title || "L'Enracinement",
      description: t.hist_2000_desc || "Installation durable avec création d\'entreprises, d\'associations et intégration socio-professionnelle réussie.",
      icon: Home,
      iconLabel: "Installation",
      themeColor: 'border-orange-500',
      bgColor: 'bg-gradient-to-br from-orange-50 to-amber-50',
      keyAchievements: [
        'Création d\'entreprises ethniques',
        'Participation à la vie politique locale',
        'Transmission culturelle à la 2e génération'
      ],
      location: 'Belgique, France',
      significance: 'Transition de diaspora à communauté établie'
    },
    {
      year: '2024',
      title: t.hist_2024_title || "Une Force Vive",
      description: t.hist_2024_desc || "La communauté guinéenne est aujourd\'hui pleinement intégrée tout en conservant son identité, avec des succès dans tous les domaines.",
      icon: Users,
      iconLabel: "Communauté",
      themeColor: 'border-[#009460]',
      bgColor: 'bg-gradient-to-br from-green-50 to-emerald-100',
      keyAchievements: [
        'Leadership dans le secteur associatif',
        'Excellence académique et professionnelle',
        'Influence culturelle et culinaire',
        'Engagement citoyen actif'
      ],
      location: 'Europe et Guinée',
      significance: 'Communauté modèle d\'intégration réussie'
    }
  ];

  const stats = [
    { value: '65+', label: 'Années d\'histoire', icon: Clock, color: 'text-[#CE1126]' },
    { value: '3', label: 'Générations', icon: Users, color: 'text-[#FCD116]' },
    { value: '50K+', label: 'Membres en Europe', icon: Heart, color: 'text-[#009460]' },
    { value: '100+', label: 'Associations actives', icon: Award, color: 'text-purple-600' }
  ];

  return (
    <section 
      className="min-h-screen py-12 md:py-20 bg-gradient-to-b from-[#FFFBF0] to-white"
      dir={isRtl ? 'rtl' : 'ltr'}
      aria-labelledby="history-heading"
      ref={containerRef}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#CE1126] opacity-5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#009460] opacity-5 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
        
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23CE1126' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            backgroundSize: '100px 100px'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className={`text-center mb-12 md:mb-20 max-w-4xl mx-auto transform transition-all duration-1000 ${
          animateIn ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-red-100 to-red-50 rounded-full mb-6 shadow-lg">
            <BookOpen className="h-10 w-10 text-[#CE1126]" aria-hidden="true" />
          </div>
          
          <h1 
            id="history-heading" 
            className="text-4xl md:text-6xl font-black text-slate-900 mb-6"
          >
            Notre <span className="text-[#CE1126]">Histoire</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-medium">
            {t.hist_subtitle || "Un voyage de résilience, d'intégration et de succès à travers les générations"}
          </p>
        </div>

        {/* Stats Overview */}
        <div className="mb-12 md:mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 ${
                  animateIn ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2 rounded-lg ${stat.color.replace('text-', 'bg-')} bg-opacity-10`}>
                    <stat.icon className={`h-5 w-5 ${stat.color}`} aria-hidden="true" />
                  </div>
                  <div className="text-3xl font-black text-slate-900">{stat.value}</div>
                </div>
                <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline Navigation */}
        <div className="relative mb-8">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-2 md:space-x-4 lg:space-x-8 overflow-x-auto pb-4 px-2">
              {events.map((event, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`flex flex-col items-center gap-3 p-4 rounded-xl transition-all duration-300 ${
                    activeIndex === index
                      ? `${event.bgColor} ${event.themeColor} border-2 shadow-lg`
                      : 'hover:bg-gray-50'
                  }`}
                  aria-label={`Aller à ${event.year}: ${event.title}`}
                  aria-current={activeIndex === index ? 'step' : undefined}
                >
                  <MilestoneDot event={event} isActive={activeIndex === index} />
                  <div className="text-center">
                    <div className={`text-lg font-bold ${
                      activeIndex === index ? 'text-slate-900' : 'text-gray-600'
                    }`}>
                      {event.year}
                    </div>
                    <div className="text-xs text-gray-500 mt-1 max-w-[120px] line-clamp-2">
                      {event.title}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          {/* Timeline Progress Bar */}
          <div className="mt-8">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#CE1126] via-[#FCD116] to-[#009460] transition-all duration-500"
                style={{ width: `${((activeIndex + 1) / events.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Active Milestone Display */}
        <div className="mb-16">
          <MilestoneCard
            event={events[activeIndex]}
            index={activeIndex}
            isActive={true}
            onActivate={() => {}}
          />
        </div>

        {/* Additional Milestones Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {events
            .filter((_, index) => index !== activeIndex)
            .map((event, index) => (
              <MilestoneCard
                key={index}
                event={event}
                index={index}
                isActive={false}
                onActivate={() => setActiveIndex(events.indexOf(event))}
              />
            ))
          }
        </div>

        {/* Did You Know Box */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 border border-green-200 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#009460] opacity-10 rounded-full -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-[#009460] rounded-xl">
                <Sparkles className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-[#009460]">
                {t.hist_did_you_know || "Le saviez-vous ?"}
              </h2>
            </div>
            
            <p className="text-lg md:text-xl text-slate-800 leading-relaxed max-w-3xl mb-6 font-medium">
              {t.hist_stat_text || "La communauté guinéenne en Belgique est l'une des plus dynamiques et mieux intégrées, avec des taux remarquables de réussite académique et entrepreneuriale."}
            </p>
            
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm text-slate-700">
                <Award className="h-4 w-4 text-[#FCD116]" aria-hidden="true" />
                <span>Excellence académique</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-700">
                <Heart className="h-4 w-4 text-[#CE1126]" aria-hidden="true" />
                <span>Solidarité communautaire</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-700">
                <Globe className="h-4 w-4 text-[#009460]" aria-hidden="true" />
                <span>Double culture enrichissante</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 text-gray-500 animate-bounce">
            <ArrowDown className="h-5 w-5" aria-hidden="true" />
            <span className="text-sm font-medium">Explorer l'histoire</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HistorySection;