import React, { useState, useEffect } from 'react';
import { 
  Flag, Megaphone, Users, Calendar, MapPin, Target, Wallet, 
  Lightbulb, CheckCircle, HeartHandshake, Music, Film, BookOpen,
  ChevronRight, ExternalLink, Clock, BarChart, TrendingUp
} from 'lucide-react';
import { LanguageCode } from '../types.ts';
import { translations } from '../utils/translations.ts';

interface FestivalSectionProps {
  language: LanguageCode;
}

const FestivalSection: React.FC<FestivalSectionProps> = ({ language }) => {
  const t = translations[language] || translations['fr'];
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Countdown to next festival (September 15, 2026)
  useEffect(() => {
    const calculateCountdown = () => {
      const targetDate = new Date('2026-09-15T18:00:00').getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setCountdown({ days, hours, minutes, seconds });
      }
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const festivalData = {
    title: "Festival des Sans-Papiers",
    tagline: "Célébrer la fierté, revendiquer la dignité.",
    date: "15-16 Septembre 2026",
    location: "Bruxelles, Belgique",
    expectedAttendance: 1000,
    mainObjectives: [
      "Visibiliser la cause des sans-papiers à travers un événement emblématique annuel",
      "Établir un point de ralliement culturel impactant pour les soutiens et allié·e·s",
      "Renforcer le tissu de solidarité citoyenne"
    ],
    activities: [
      { name: "Concerts", icon: <Music className="h-5 w-5" />, color: "bg-red-100 text-red-600" },
      { name: "Projections", icon: <Film className="h-5 w-5" />, color: "bg-blue-100 text-blue-600" },
      { name: "Tables rondes", icon: <Users className="h-5 w-5" />, color: "bg-green-100 text-green-600" },
      { name: "Ateliers", icon: <BookOpen className="h-5 w-5" />, color: "bg-yellow-100 text-yellow-600" }
    ],
    timeline: [
      { month: "Janvier 2026", tasks: ["Lancement de l'appel à projets", "Inscription des bénévoles", "Recherche de partenaires"] },
      { month: "Juin 2026", tasks: ["Conférence de presse", "Annonce de la programmation", "Lancement de la campagne"] },
      { month: "Septembre 2026", tasks: ["Montage du site", "Grand rassemblement", "Clôture festive"] }
    ],
    impacts: [
      { area: "Culturelles", description: "Enrichissement du tissu culturel bruxellois", value: "+15 événements" },
      { area: "Sociales", description: "Inclusion et empowerment des sans-papiers", value: "1000 participants" },
      { area: "Politiques", description: "Reconnaissance institutionnelle", value: "5 partenaires institutionnels" }
    ]
  };

  return (
    <div 
      className="min-h-screen bg-gradient-to-b from-slate-50 to-white"
      dir={language === 'ar' ? 'rtl' : 'ltr'}
      role="main"
      aria-labelledby="festival-title"
    >
      
      {/* HERO HEADER */}
      <div className="bg-gradient-to-br from-red-700 via-red-600 to-orange-600 text-white py-16 md:py-24 relative overflow-hidden border-b-8 border-[#FCD116]">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}
          aria-hidden="true"
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div 
              className="inline-flex items-center justify-center p-4 bg-white/20 rounded-full mb-8 backdrop-blur-sm animate-pulse"
              aria-hidden="true"
            >
              <Flag className="h-12 w-12 text-[#FCD116]" />
            </div>
            
            <h1 
              id="festival-title"
              className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6"
            >
              {festivalData.title}
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto font-medium italic mb-8">
              "{festivalData.tagline}"
            </p>

            {/* Countdown */}
            <div className="flex justify-center items-center gap-4 mb-8">
              <Clock className="h-6 w-6 text-[#FCD116]" aria-hidden="true" />
              <span className="text-lg font-bold">Prochaine édition: {festivalData.date}</span>
            </div>

            {/* Countdown Timer */}
            <div className="flex justify-center gap-4 md:gap-6 mb-12">
              {Object.entries(countdown).map(([unit, value]) => (
                <div key={unit} className="text-center">
                  <div className="bg-black/20 backdrop-blur-sm rounded-xl px-4 py-3 min-w-[80px]">
                    <div className="text-3xl md:text-4xl font-black">
                      {value.toString().padStart(2, '0')}
                    </div>
                    <div className="text-sm uppercase tracking-wider opacity-80 mt-1">
                      {unit === 'days' ? 'jours' : 
                       unit === 'hours' ? 'heures' : 
                       unit === 'minutes' ? 'minutes' : 'secondes'}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Info */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-12">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-[#FCD116]" aria-hidden="true" />
                <span className="font-medium">{festivalData.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-[#FCD116]" aria-hidden="true" />
                <span className="font-medium">{festivalData.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-[#FCD116]" aria-hidden="true" />
                <span className="font-medium">{festivalData.expectedAttendance} participants attendus</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 -mt-8 relative z-20">
        
        {/* Activities Overview */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-8 text-center">
            Activités du Festival
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {festivalData.activities.map((activity, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center"
              >
                <div className={`inline-flex items-center justify-center p-3 rounded-xl mb-4 ${activity.color}`}>
                  {activity.icon}
                </div>
                <h3 className="font-bold text-slate-900">{activity.name}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Sections */}
        <div className="space-y-12 md:space-y-16">
          
          {/* Introduction */}
          <section className="bg-gradient-to-r from-slate-900 to-black text-white rounded-3xl p-8 md:p-12 shadow-2xl">
            <div className="flex items-start gap-4 mb-6">
              <Megaphone className="h-8 w-8 text-[#FCD116] flex-shrink-0" aria-hidden="true" />
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Notre Mission
                </h2>
                <p className="text-lg leading-relaxed opacity-90">
                  Le Festival des Sans-Papiers se donne pour mission de célébrer la fierté identitaire des personnes sans papiers, 
                  leur rappeler que naître ailleurs ne fait pas d'eux des criminels et de faire résonner leur voix dans l'espace 
                  public de façon non clivante et fédératrice.
                </p>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-white/20">
              <p className="opacity-80">
                S'inscrivant dans une démarche politique affirmée, il vise à créer un événement annuel comparable aux marches des Fiertés LGBT+, 
                mais dédié à la cause des Sans-Papiers, avec l'ambition et les moyens de durer dans le temps.
              </p>
            </div>
          </section>

          {/* Objectives */}
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-8">
              Objectifs Stratégiques
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-red-500 hover:shadow-xl transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 bg-red-100 rounded-xl flex items-center justify-center">
                    <Target className="h-6 w-6 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Politique</h3>
                </div>
                <p className="text-gray-600">
                  Faire de la cause des Sans-Papiers une question politique majeure. Porter le message que l'accès aux droits 
                  fondamentaux est une question de dignité humaine.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-yellow-500 hover:shadow-xl transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                    <Users className="h-6 w-6 text-yellow-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Collectif</h3>
                </div>
                <p className="text-gray-600">
                  Affirmer la fierté et l'unité. Créer un espace festif et revendicatif où l'affirmation d'identité devient 
                  un acte politique fort.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-green-500 hover:shadow-xl transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <HeartHandshake className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Solidarité</h3>
                </div>
                <p className="text-gray-600">
                  Mobiliser le grand public, les artistes et les acteurs culturels pour faire évoluer les mentalités et 
                  construire un large soutien.
                </p>
              </div>
            </div>
          </section>

          {/* Detailed Information */}
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Target Audience */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <Users className="h-6 w-6 text-slate-400" />
                Publics Visés
              </h3>
              <ul className="space-y-4">
                {[
                  "Personnes sans papiers (acteurs premiers)",
                  "Artistes engagés (migrants ou alliés)",
                  "Acteurs culturels bruxellois",
                  "Grand public et citoyens solidaires",
                  "Associations et collectifs de soutien",
                  "Médias et influenceurs"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-gray-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <Calendar className="h-6 w-6 text-slate-400" />
                Calendrier & Lieux
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wide mb-2 flex items-center">
                    <ChevronRight className="h-4 w-4 mr-1 text-red-500" />
                    Soirées Locales
                  </h4>
                  <p className="text-gray-600">
                    Rendez-vous dans divers lieux culturels de Bruxelles (Concerts, projections, tables rondes) 
                    pour préparer la mobilisation et créer une dynamique locale.
                  </p>
                </div>
                <div className="border-t border-gray-100 pt-4">
                  <h4 className="font-bold text-red-600 text-sm uppercase tracking-wide mb-2 flex items-center">
                    <ChevronRight className="h-4 w-4 mr-1 text-red-600" />
                    Finale Nationale
                  </h4>
                  <p className="text-gray-600">
                    Grande soirée de rassemblement de clôture. Moment fédérateur à l'échelle du pays avec collectifs, 
                    artistes et porte-parole des différentes communautés.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Impact & Results */}
          <section className="bg-gradient-to-r from-slate-50 to-white rounded-3xl p-8 md:p-12 border border-gray-200">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-8 flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-green-600" />
              Impact & Résultats Attendus
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {festivalData.impacts.map((impact, index) => (
                <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <BarChart className="h-5 w-5 text-blue-600" />
                    </div>
                    <span className="text-2xl font-black text-slate-900">{impact.value}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 mb-2">{impact.area}</h4>
                  <p className="text-sm text-gray-600">{impact.description}</p>
                </div>
              ))}
            </div>

            {/* Action Timeline */}
            <div className="mt-12">
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <Lightbulb className="h-6 w-6 text-yellow-600" />
                Feuille de Route
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                {festivalData.timeline.map((phase, index) => (
                  <div key={index} className="bg-white p-6 rounded-xl border-l-4 border-blue-500">
                    <h4 className="font-bold text-blue-900 mb-2">{phase.month}</h4>
                    <ul className="space-y-2">
                      {phase.tasks.map((task, taskIndex) => (
                        <li key={taskIndex} className="text-sm text-gray-600 flex items-center">
                          <ChevronRight className="h-3 w-3 mr-2 text-blue-400" />
                          {task}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-3xl p-8 md:p-12 text-center text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Participez au Festival des Sans-Papiers
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Rejoignez-nous pour célébrer la dignité et revendiquer les droits fondamentaux.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-red-600 font-bold rounded-xl hover:bg-gray-100 transition-colors shadow-lg flex items-center justify-center gap-2">
                S'inscrire comme bénévole
                <ExternalLink className="h-5 w-5" />
              </button>
              <button className="px-8 py-4 bg-black/30 text-white font-bold rounded-xl hover:bg-black/40 transition-colors border border-white/30 flex items-center justify-center gap-2">
                Proposer une activité
                <ExternalLink className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FestivalSection;