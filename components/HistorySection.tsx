
import React from 'react';
import { BookOpen, Clock, ArrowDown, Star } from 'lucide-react';
import { LanguageCode } from '../types';
import { translations } from '../utils/translations';

interface HistorySectionProps {
  language: LanguageCode;
}

const HistorySection: React.FC<HistorySectionProps> = ({ language }) => {
  const t = translations[language];

  const timelineEvents = [
    {
      year: '1958',
      title: t.hist_1958_title || 'La Dignité et l\'Indépendance',
      description: t.hist_1958_desc || 'Le 28 septembre, la Guinée dit "NON" au Général de Gaulle.',
      side: 'left',
      icon: '🇬🇳'
    },
    {
      year: '1960-1980',
      title: t.hist_1960_title || 'Premiers Liens Académiques',
      description: t.hist_1960_desc || 'Arrivée des premiers boursiers guinéens dans les universités belges.',
      side: 'right',
      icon: '🎓'
    },
    {
      year: t.hist_1990_year || '1990s',
      title: t.hist_1990_title || 'L\'Exil Politique et Économique',
      description: t.hist_1990_desc || 'L\'instabilité politique pousse de nombreux Guinéens à chercher refuge.',
      side: 'left',
      icon: '✈️'
    },
    {
      year: '2000-2010',
      title: t.hist_2000_title || '3ème Communauté Africaine',
      description: t.hist_2000_desc || 'La communauté guinéenne grandit pour devenir majeure.',
      side: 'right',
      icon: '🏘️'
    },
    {
      year: '2024',
      title: t.hist_2024_title || 'Une Force Vive',
      description: t.hist_2024_desc || 'Aujourd\'hui, les Belgo-Guinéens sont entrepreneurs, médecins, ouvriers, artistes.',
      side: 'left',
      icon: '🤝'
    }
  ];

  return (
    <div className="py-12 bg-slate-50" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-center mb-4">
             <BookOpen className="h-12 w-12 text-red-600" />
          </div>
          {/* H1 SEO Optimization */}
          <h1 className="text-4xl font-extrabold text-gray-900">{t.hist_title}</h1>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            {t.hist_subtitle}
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-red-500 via-yellow-400 to-green-600 hidden md:block opacity-80"></div>

          <div className="space-y-12">
            {timelineEvents.map((event, index) => (
              <div key={index} className={`flex flex-col md:flex-row items-center justify-between w-full ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                
                {/* Content Side */}
                <div className="w-full md:w-5/12 mb-4 md:mb-0">
                  <div className={`bg-white p-6 rounded-xl shadow-md border-t-4 ${index % 2 === 0 ? 'border-red-500' : 'border-green-600'} hover:shadow-lg transition-all hover:-translate-y-1`}>
                    <div className="flex items-center mb-3 justify-between">
                        <div className="flex items-center">
                             <Clock className="h-4 w-4 text-gray-400 mr-2" />
                             <span className="font-black text-2xl text-gray-800">{event.year}</span>
                        </div>
                        <span className="text-2xl">{event.icon}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 uppercase tracking-wide">{event.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>

                {/* Center Dot (Desktop only) */}
                <div className="hidden md:flex items-center justify-center w-2/12 relative z-10">
                  <div className="h-10 w-10 rounded-full bg-white border-4 border-yellow-400 shadow-md flex items-center justify-center">
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  </div>
                </div>

                 {/* Spacer Side (Desktop only) */}
                <div className="w-full md:w-5/12 hidden md:block"></div>
              </div>
            ))}
          </div>
            
          <div className="text-center mt-20 bg-green-50 p-8 rounded-xl border border-green-100 shadow-sm">
            <h3 className="text-2xl font-bold text-green-800 mb-4">{t.hist_did_you_know}</h3>
            <p className="text-gray-700 text-lg">
                {t.hist_stat_text}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HistorySection;
