import React from 'react';
import { BookOpen, Flag, GraduationCap, Globe, Home, Users, ArrowDown } from 'lucide-react';
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
  themeColor: string; // Tailwind border color class
  bgColor: string;   // Tailwind bg color class
}

// --- SUB-COMPONENT: TIMELINE CARD (DRY & ACCESSIBLE) ---
const TimelineCard: React.FC<{ 
  data: TimelineEventData; 
  index: number; 
  isRtl: boolean 
}> = ({ data, index, isRtl }) => {
  const isEven = index % 2 === 0;
  
  return (
    <div className={`flex flex-col lg:flex-row items-center justify-between w-full mb-8 lg:mb-16 ${isEven ? 'lg:flex-row-reverse' : ''}`}>
      
      {/* Content Side */}
      <article className="w-full lg:w-[45%] relative group">
        <div className={`bg-white p-6 md:p-8 rounded-2xl shadow-sm border-t-4 ${data.themeColor} hover:shadow-md transition-shadow duration-300 relative overflow-hidden`}>
          
          {/* Subtle Background Number */}
          <div className="absolute -right-2 -bottom-6 text-8xl font-black text-gray-50 opacity-40 select-none z-0" aria-hidden="true">
            {index + 1}
          </div>

          <div className="relative z-10">
            <header className="flex items-center justify-between mb-4 border-b border-gray-100 pb-3">
              <time className="flex items-center text-slate-800 font-black text-xl md:text-2xl tracking-tight" dateTime={data.year}>
                {data.year}
              </time>
              <div 
                className={`p-2 rounded-full ${data.bgColor} ${data.themeColor.replace('border-', 'text-').replace('600', '700')}`} 
                aria-label={data.iconLabel}
                role="img"
              >
                <data.icon className="h-6 w-6" aria-hidden="true" />
              </div>
            </header>
            
            <h3 className="text-xl font-bold text-slate-900 mb-3 leading-tight group-hover:text-[#CE1126] transition-colors">
              {data.title}
            </h3>
            
            <p className="text-gray-600 text-base leading-relaxed font-medium">
              {data.description}
            </p>
          </div>
        </div>
      </article>

      {/* Center Marker (Desktop) */}
      <div className="hidden lg:flex items-center justify-center w-[10%] relative z-10" aria-hidden="true">
        <div className={`h-4 w-4 rounded-full border-2 bg-white ${data.themeColor.replace('border-', 'border-')} z-20`}></div>
      </div>

      {/* Spacer (Desktop) */}
      <div className="w-full lg:w-[45%] hidden lg:block" aria-hidden="true"></div>
      
      {/* Mobile Connector Line (Visual only) */}
      {index < 4 && (
        <div className="lg:hidden h-8 w-0.5 bg-gray-200 my-2 rounded-full"></div>
      )}
    </div>
  );
};

const HistorySection: React.FC<HistorySectionProps> = ({ language }) => {
  const t = translations[language];
  const isRtl = language === 'ar';

  const events: TimelineEventData[] = [
    {
      year: '1958',
      title: t.hist_1958_title || "L'Audace de la Dignité",
      description: t.hist_1958_desc || "Indépendance immédiate.",
      icon: Flag,
      iconLabel: "Indépendance",
      themeColor: 'border-[#CE1126]', // Red for struggle/independence
      bgColor: 'bg-red-50'
    },
    {
      year: '1960-1980',
      title: t.hist_1960_title || "L'Élite Intellectuelle",
      description: t.hist_1960_desc || "Étudiants et savoir.",
      icon: GraduationCap,
      iconLabel: "Éducation",
      themeColor: 'border-[#FCD116]', // Yellow for intellect/wealth
      bgColor: 'bg-yellow-50'
    },
    {
      year: t.hist_1990_year || "1990s",
      title: t.hist_1990_title || "L'Exil et la Survie",
      description: t.hist_1990_desc || "Arrivée massive en Europe.",
      icon: Globe, // Neutral icon for migration/diaspora
      iconLabel: "Diaspora",
      themeColor: 'border-slate-600', // Grey for difficult times
      bgColor: 'bg-slate-50'
    },
    {
      year: '2000-2010',
      title: t.hist_2000_title || "L'Enracinement",
      description: t.hist_2000_desc || "Installation durable.",
      icon: Home,
      iconLabel: "Installation",
      themeColor: 'border-orange-500', // Orange for community building
      bgColor: 'bg-orange-50'
    },
    {
      year: '2024',
      title: t.hist_2024_title || "Une Force Vive",
      description: t.hist_2024_desc || "Intégration et succès.",
      icon: Users,
      iconLabel: "Communauté",
      themeColor: 'border-[#009460]', // Green for growth/future
      bgColor: 'bg-green-50'
    }
  ];

  return (
    <section className="py-16 bg-[#FFFBF0] relative" dir={isRtl ? 'rtl' : 'ltr'} aria-labelledby="history-heading">
      {/* Background Pattern - Optimized opacity */}
      <div className="absolute inset-0 bg-african-pattern opacity-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center p-3 bg-red-50 rounded-full mb-6 ring-4 ring-white shadow-sm">
            <BookOpen className="h-8 w-8 text-[#CE1126]" aria-hidden="true" />
          </div>
          <h1 id="history-heading" className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
            {t.hist_title}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 font-medium leading-relaxed">
            {t.hist_subtitle}
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-5xl mx-auto">
          
          {/* Central Line (Desktop) */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200 hidden lg:block rounded-full" aria-hidden="true"></div>

          <div className="relative">
            {events.map((event, index) => (
              <TimelineCard 
                key={index} 
                data={event} 
                index={index} 
                isRtl={isRtl}
              />
            ))}
          </div>

          {/* End Marker */}
          <div className="flex justify-center mt-8">
            <div className="bg-white p-2 rounded-full shadow-sm border border-gray-100">
               <ArrowDown className="h-5 w-5 text-gray-400" />
            </div>
          </div>
            
          {/* Did You Know Box */}
          <aside className="mt-20 bg-green-50 rounded-3xl p-8 md:p-12 border border-green-100 text-center relative overflow-hidden shadow-sm">
             <div className="absolute top-0 right-0 w-32 h-32 bg-[#009460] opacity-5 rounded-bl-full pointer-events-none"></div>
             
             <h2 className="text-2xl font-black text-[#009460] mb-4 relative z-10 tracking-tight">
                {t.hist_did_you_know}
             </h2>
             <p className="text-slate-800 text-lg md:text-xl max-w-3xl mx-auto font-medium leading-relaxed relative z-10">
                {t.hist_stat_text}
             </p>
          </aside>

        </div>
      </div>
    </section>
  );
};

export default HistorySection;