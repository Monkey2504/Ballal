import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Flag, Megaphone, Users, Calendar, MapPin, Target, Wallet,
  Lightbulb, Check, HeartHandshake, Music, Film, BookOpen,
  ChevronRight, ExternalLink, Clock, BarChart, TrendingUp
} from 'lucide-react';
import { LanguageCode } from '../types.ts';
import { translations } from '../utils/translations.ts';

interface FestivalSectionProps {
  language: LanguageCode;
}

const FestivalSection: React.FC<FestivalSectionProps> = ({ language }) => {
  const t = translations[language] || translations['fr'];
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateCountdown = () => {
      const targetDate = new Date('2026-09-15T18:00:00').getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;
      if (difference > 0) {
        setCountdown({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
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
    activities: [
      { name: "Concerts", icon: <Music className="h-5 w-5" />, color: "text-guinea-red" },
      { name: "Projections", icon: <Film className="h-5 w-5" />, color: "text-ink" },
      { name: "Tables rondes", icon: <Users className="h-5 w-5" />, color: "text-guinea-green" },
      { name: "Ateliers", icon: <BookOpen className="h-5 w-5" />, color: "text-guinea-red" }
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
      className="min-h-screen bg-ivory"
      dir={language === 'ar' ? 'rtl' : 'ltr'}
      role="main"
      aria-labelledby="festival-title"
    >
      <div className="bg-ink text-white py-16 md:py-24 relative overflow-hidden">
        <div className="flag-line absolute top-0 left-0 right-0" aria-hidden="true"><span /><span /><span /></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <Flag className="h-5 w-5 text-guinea-yellow" aria-hidden="true" />
              <p className="dateline text-[11px] text-guinea-yellow">Édition 15-16 septembre 2026</p>
            </div>
            <h1 id="festival-title" className="font-serif font-black text-4xl md:text-6xl leading-[0.95] tracking-tight mb-6">
              {festivalData.title}
            </h1>
            <p className="font-serif text-xl md:text-2xl text-white/90 max-w-4xl mx-auto italic mb-8">
              « {festivalData.tagline} »
            </p>
            <div className="flex justify-center items-center gap-3 mb-8">
              <Clock className="h-5 w-5 text-guinea-yellow" aria-hidden="true" />
              <span className="dateline text-[11px] text-white/80">Prochaine édition : {festivalData.date}</span>
            </div>
            <div className="flex justify-center gap-3 md:gap-4 mb-12">
              {Object.entries(countdown).map(([unit, value]) => (
                <div key={unit} className="text-center">
                  <div className="bg-white/[0.06] border border-white/10 rounded-[4px] px-4 py-3 min-w-[80px]">
                    <div className="font-serif font-black text-3xl md:text-4xl tabular-nums">{value.toString().padStart(2, '0')}</div>
                    <div className="dateline text-[9px] text-white/50 mt-1">
                      {unit === 'days' ? 'jours' : unit === 'hours' ? 'heures' : unit === 'minutes' ? 'minutes' : 'secondes'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-6 md:gap-12">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-guinea-yellow" aria-hidden="true" />
                <span className="font-medium">{festivalData.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-guinea-yellow" aria-hidden="true" />
                <span className="font-medium">{festivalData.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-guinea-yellow" aria-hidden="true" />
                <span className="font-medium">{festivalData.expectedAttendance} participants attendus</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 relative z-10">
        <div className="mb-12 md:mb-16">
          <h2 className="font-serif font-black text-2xl md:text-3xl text-ink mb-8 text-center">Activités du festival</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {festivalData.activities.map((activity, index) => (
              <div key={index} className="bg-white p-6 rounded-[4px] border border-ink/10 shadow-soft-sm hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1 text-center">
                <div className={`inline-flex items-center justify-center mb-4 ${activity.color}`}>{activity.icon}</div>
                <h3 className="font-black text-ink">{activity.name}</h3>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-12 md:space-y-16">
          <section className="bg-ink text-white rounded-[4px] p-8 md:p-12 shadow-soft-lg">
            <div className="flex items-start gap-4 mb-6">
              <Megaphone className="h-8 w-8 text-guinea-yellow flex-shrink-0" aria-hidden="true" />
              <div>
                <h2 className="font-serif font-black text-2xl md:text-3xl mb-4">Notre mission</h2>
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

          <section>
            <h2 className="font-serif font-black text-2xl md:text-3xl text-ink mb-8">Objectifs stratégiques</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-8 rounded-[4px] border border-ink/10 border-t-4 border-t-guinea-red shadow-soft-sm hover:shadow-soft-lg transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <Target className="h-6 w-6 text-guinea-red" aria-hidden="true" />
                  <h3 className="font-serif font-black text-xl text-ink">Politique</h3>
                </div>
                <p className="text-ink-muted">Faire de la cause des Sans-Papiers une question politique majeure. Porter le message que l'accès aux droits fondamentaux est une question de dignité humaine.</p>
              </div>
              <div className="bg-white p-8 rounded-[4px] border border-ink/10 border-t-4 border-t-guinea-yellow shadow-soft-sm hover:shadow-soft-lg transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="h-6 w-6 text-ink" aria-hidden="true" />
                  <h3 className="font-serif font-black text-xl text-ink">Collectif</h3>
                </div>
                <p className="text-ink-muted">Affirmer la fierté et l'unité. Créer un espace festif et revendicatif où l'affirmation d'identité devient un acte politique fort.</p>
              </div>
              <div className="bg-white p-8 rounded-[4px] border border-ink/10 border-t-4 border-t-guinea-green shadow-soft-sm hover:shadow-soft-lg transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <HeartHandshake className="h-6 w-6 text-guinea-green" aria-hidden="true" />
                  <h3 className="font-serif font-black text-xl text-ink">Solidarité</h3>
                </div>
                <p className="text-ink-muted">Mobiliser le grand public, les artistes et les acteurs culturels pour faire évoluer les mentalités et construire un large soutien.</p>
              </div>
            </div>
          </section>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-[4px] border border-ink/10 shadow-soft-sm p-8">
              <h3 className="font-serif font-black text-xl text-ink mb-6 flex items-center gap-3"><Users className="h-6 w-6 text-ink-muted" aria-hidden="true" />Publics visés</h3>
              <ul className="space-y-4">
                {["Personnes sans papiers (acteurs premiers)","Artistes engagés (migrants ou alliés)","Acteurs culturels bruxellois","Grand public et citoyens solidaires","Associations et collectifs de soutien","Médias et influenceurs"].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-guinea-green mr-3 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-ink font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-[4px] border border-ink/10 shadow-soft-sm p-8">
              <h3 className="font-serif font-black text-xl text-ink mb-6 flex items-center gap-3"><Calendar className="h-6 w-6 text-ink-muted" aria-hidden="true" />Calendrier et lieux</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="dateline text-[11px] text-ink mb-2 flex items-center"><ChevronRight className="h-4 w-4 mr-1 text-guinea-red" aria-hidden="true" />Soirées locales</h4>
                  <p className="text-ink-muted">Rendez-vous dans divers lieux culturels de Bruxelles (concerts, projections, tables rondes) pour préparer la mobilisation et créer une dynamique locale.</p>
                </div>
                <div className="border-t border-border-subtle pt-4">
                  <h4 className="dateline text-[11px] text-guinea-red mb-2 flex items-center"><ChevronRight className="h-4 w-4 mr-1 text-guinea-red" aria-hidden="true" />Finale nationale</h4>
                  <p className="text-ink-muted">Grande soirée de rassemblement de clôture. Moment fédérateur à l'échelle du pays avec collectifs, artistes et porte-parole des différentes communautés.</p>
                </div>
              </div>
            </div>
          </div>

          <section className="bg-paper rounded-[4px] p-8 md:p-12 border border-border-subtle">
            <h2 className="font-serif font-black text-2xl md:text-3xl text-ink mb-8 flex items-center gap-3"><TrendingUp className="h-8 w-8 text-guinea-green" aria-hidden="true" />Impact et résultats attendus</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {festivalData.impacts.map((impact, index) => (
                <div key={index} className="bg-white p-6 rounded-[4px] shadow-soft-sm border border-ink/10">
                  <div className="flex items-center justify-between mb-4">
                    <BarChart className="h-6 w-6 text-ink-muted" aria-hidden="true" />
                    <span className="font-serif font-black text-2xl text-ink">{impact.value}</span>
                  </div>
                  <h4 className="font-black text-ink mb-2">{impact.area}</h4>
                  <p className="text-sm text-ink-muted">{impact.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-12">
              <h3 className="font-serif font-black text-xl text-ink mb-6 flex items-center gap-3"><Lightbulb className="h-6 w-6 text-guinea-yellow" aria-hidden="true" />Feuille de route</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {festivalData.timeline.map((phase, index) => (
                  <div key={index} className="bg-white p-6 rounded-[4px] border border-ink/10 border-l-4 border-l-guinea-red">
                    <h4 className="font-serif font-black text-ink mb-2">{phase.month}</h4>
                    <ul className="space-y-2">
                      {phase.tasks.map((task, taskIndex) => (
                        <li key={taskIndex} className="text-sm text-ink-muted flex items-center">
                          <ChevronRight className="h-3 w-3 mr-2 text-guinea-red shrink-0" aria-hidden="true" />{task}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <div className="bg-guinea-red rounded-[4px] p-8 md:p-12 text-center text-white">
            <h2 className="font-serif font-black text-2xl md:text-3xl mb-6">Participez au Festival des Sans-Papiers</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">Rejoignez-nous pour célébrer la dignité et revendiquer les droits fondamentaux.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-guinea-red font-mono text-[12px] font-bold uppercase tracking-[0.08em] rounded-[3px] hover:bg-ivory transition-colors shadow-soft-sm flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-guinea-red">
                S'inscrire comme bénévole <ExternalLink className="h-5 w-5" aria-hidden="true" />
              </button>
              <button className="px-8 py-4 border-2 border-white text-white font-mono text-[12px] font-bold uppercase tracking-[0.08em] rounded-[3px] hover:bg-white hover:text-guinea-red transition-colors flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-guinea-red">
                Proposer une activité <ExternalLink className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FestivalSection;
