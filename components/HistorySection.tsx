
import React from 'react';
import { BookOpen, Clock, Star } from 'lucide-react';
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
      title: t.hist_1958_title,
      description: t.hist_1958_desc,
      side: 'left',
      icon: '🇬🇳'
    },
    {
      year: '1960-1980',
      title: t.hist_1960_title,
      description: t.hist_1960_desc,
      side: 'right',
      icon: '🎓'
    },
    {
      year: t.hist_1990_year,
      title: t.hist_1990_title,
      description: t.hist_1990_desc,
      side: 'left',
      icon: '✈️'
    },
    {
      year: '2000-2010',
      title: t.hist_2000_title,
      description: t.hist_2000_desc,
      side: 'right',
      icon: '🏘️'
    },
    {
      year: '2024',
      title: t.hist_2024_title,
      description: t.hist_2024_desc,
      side: 'left',
      icon: '🤝'
    }
  ];

  return (
    <div className="py-16 bg-[#FFFBF0]" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20 bg-white p-10 rounded-[2rem] shadow-lg border-b-8 border-red-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-african-pattern opacity-20 pointer-events-none"></div>
          <div className="relative z-10">
            <div className="flex justify-center mb-6">
                <div className="p-4 bg-red-50 rounded-full">
                    <BookOpen className="h-12 w-12 text-[#CE1126]" />
                </div>
            </div>
            {/* H1 SEO Optimization */}
            <h1 className="text-4xl font-black text-slate-900 mb-6 tracking-tight">{t.hist_title}</h1>
            <p className="mt-4 text-xl text-gray-600 max-w-4xl mx-auto font-medium leading-relaxed">
                {t.hist_subtitle}
            </p>
          </div>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-[#CE1126] via-[#FCD116] to-[#009460] hidden lg:block opacity-60 rounded-full"></div>

          <div className="space-y-12 lg:space-y-24">
            {timelineEvents.map((event, index) => (
              <div key={index} className={`flex flex-col lg:flex-row items-center justify-between w-full ${index % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}>
                
                {/* Content Side */}
                <div className="w-full lg:w-[45%] mb-6 lg:mb-0">
                  <div className={`bg-white p-8 lg:p-10 rounded-2xl shadow-md border-t-8 ${index % 2 === 0 ? 'border-[#CE1126]' : 'border-[#009460]'} hover:shadow-xl transition-all hover:-translate-y-1 group relative overflow-hidden`}>
                    
                    {/* Background number */}
                    <div className="absolute -right-4 -bottom-4 text-[8rem] font-black text-gray-50 opacity-50 select-none z-0">
                        {index + 1}
                    </div>

                    <div className="relative z-10">
                        <div className="flex items-center mb-6 justify-between border-b border-gray-100 pb-4">
                            <div className="flex items-center">
                                <Clock className="h-5 w-5 text-gray-400 mr-2" />
                                <span className="font-black text-2xl text-slate-800 tracking-tight">{event.year}</span>
                            </div>
                            <span className="text-4xl filter drop-shadow-sm transform group-hover:scale-110 transition-transform">{event.icon}</span>
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 mb-4 uppercase tracking-wide leading-tight group-hover:text-[#CE1126] transition-colors">{event.title}</h3>
                        <p className="text-gray-600 text-lg leading-relaxed font-medium text-justify">
                        {event.description}
                        </p>
                    </div>
                  </div>
                </div>

                {/* Center Dot (Desktop only) */}
                <div className="hidden lg:flex items-center justify-center w-[10%] relative z-10">
                  <div className="h-16 w-16 rounded-full bg-white border-4 border-[#FCD116] shadow-lg flex items-center justify-center transform transition-transform hover:scale-110 z-20">
                    <Star className="h-8 w-8 text-[#FCD116] fill-current" />
                  </div>
                </div>

                 {/* Spacer Side (Desktop only) */}
                <div className="w-full lg:w-[45%] hidden lg:block"></div>
              </div>
            ))}
          </div>
            
          <div className="text-center mt-24 bg-[#009460]/5 p-12 rounded-3xl border-2 border-[#009460]/10 shadow-sm relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-[#009460] opacity-5 rounded-bl-full pointer-events-none"></div>
             <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#009460] opacity-5 rounded-tr-full pointer-events-none"></div>

            <h3 className="text-3xl font-black text-[#009460] mb-6 relative z-10">{t.hist_did_you_know}</h3>
            <p className="text-slate-700 text-2xl max-w-3xl mx-auto font-medium leading-relaxed relative z-10">
                {t.hist_stat_text}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HistorySection;
