
import React from 'react';
import { Flag, GraduationCap, Quote, Newspaper, Camera, MapPin, TrendingUp, AlertCircle } from 'lucide-react';
import { LanguageCode } from '../types.ts';
import { translations } from '../utils/translations.ts';

interface HistorySectionProps {
  language: LanguageCode;
}

const HistorySection: React.FC<HistorySectionProps> = ({ language }) => {
  const t = translations[language] || translations['fr'];

  const DuctTape = ({ className = "", color = "bg-gray-500/50" }) => (
    <div className={`absolute h-8 w-32 -rotate-3 z-30 shadow-sm border-x border-white/10 ${color} ${className}`}></div>
  );

  return (
    <section className="bg-punk-paper py-24 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER TRACT */}
        <div className="mb-24 relative">
          <div className="bg-punk-black text-white inline-block px-8 py-4 brutal-shadow -rotate-1 mb-8">
            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter">
              NOTRE <span className="text-punk-yellow">HISTOIRE</span>
            </h1>
          </div>
          <p className="text-2xl md:text-3xl font-mono italic max-w-3xl leading-tight border-l-8 border-punk-red pl-6 mt-4 uppercase">
            "{t.hist_subtitle}"
          </p>
        </div>

        {/* TIMELINE ZINE STYLE */}
        <div className="space-y-40">
          
          {/* 1958 */}
          <div className="grid md:grid-cols-2 gap-16 items-center relative">
            <DuctTape className="-top-4 left-10 bg-punk-red/60" />
            <div className="bg-white p-4 brutal-shadow rotate-1 border-4 border-punk-black group">
               <img 
                src="https://i.imgur.com/EPEdzOF.png" 
                className="w-full h-[400px] object-cover grayscale contrast-150 group-hover:grayscale-0 transition-all"
                alt="1958"
               />
               <div className="mt-4 font-black text-2xl uppercase italic">Septembre 1958 : Le Refus</div>
            </div>
            <div className="space-y-6">
              <div className="text-7xl font-black text-punk-red opacity-20 absolute -top-20 right-0 select-none">1958</div>
              <h2 className="text-4xl font-black uppercase leading-none">{t.hist_1958_title}</h2>
              <p className="text-xl font-bold leading-tight">{t.hist_1958_desc}</p>
              <div className="bg-punk-yellow p-6 border-4 border-punk-black -rotate-1">
                 <Quote className="mb-2 h-8 w-8" />
                 <p className="font-mono text-sm font-black uppercase">"Préférer la liberté dans la pauvreté..."</p>
              </div>
            </div>
          </div>

          {/* VAGUE 1 */}
          <div className="grid md:grid-cols-2 gap-16 items-center md:flex-row-reverse">
            <div className="order-2 md:order-1 space-y-6">
              <div className="text-7xl font-black text-punk-green opacity-20 select-none uppercase">L'Elite</div>
              <h2 className="text-4xl font-black uppercase leading-none">{t.hist_1960_title}</h2>
              <p className="text-xl font-bold leading-tight">{t.hist_1960_desc}</p>
              <div className="flex gap-2">
                <span className="bg-punk-black text-white px-3 py-1 font-black text-xs uppercase">ULB</span>
                <span className="bg-punk-black text-white px-3 py-1 font-black text-xs uppercase">UCL</span>
                <span className="bg-punk-black text-white px-3 py-1 font-black text-xs uppercase">LIEGE</span>
              </div>
            </div>
            <div className="order-1 md:order-2 relative">
               <DuctTape className="top-1/2 -right-10 rotate-90 bg-punk-green/60" />
               <div className="bg-white p-4 brutal-shadow -rotate-2 border-4 border-punk-black">
                 <img 
                  src="https://i.imgur.com/9CxUOIj.png" 
                  className="w-full h-[400px] object-cover grayscale brightness-90"
                  alt="Students"
                 />
               </div>
            </div>
          </div>

          {/* VAGUE 4 - AUJOURD'HUI */}
          <div className="bg-punk-black text-white p-12 brutal-shadow-red relative">
             <DuctTape className="-top-4 right-20 bg-punk-yellow" />
             <div className="grid md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-8 space-y-6">
                   <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter">
                     {t.hist_2024_title}
                   </h2>
                   <p className="text-xl md:text-2xl font-mono leading-tight text-punk-yellow">
                     {t.hist_2024_desc}
                   </p>
                   <div className="bg-white/10 p-4 border-2 border-dashed border-white/30 text-sm font-bold">
                     <AlertCircle className="inline mr-2 h-4 w-4" />
                     RÉSILIENCE • TRAVAIL • DIGNITÉ
                   </div>
                </div>
                <div className="md:col-span-4">
                   <div className="border-8 border-punk-red rotate-3 overflow-hidden">
                      <img src="https://imgur.com/s3XuBNm.png" className="w-full h-full object-cover grayscale contrast-125" />
                   </div>
                </div>
             </div>
          </div>

        </div>

        {/* FOOTER STATS BRUT */}
        <div className="mt-40 border-t-8 border-punk-black pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="text-8xl font-black leading-none">+25K</div>
           <p className="text-3xl font-black uppercase text-right leading-none max-w-md">
             Guinéens en Belgique. <br/>
             <span className="text-punk-red">Une force collective.</span>
           </p>
        </div>
      </div>
    </section>
  );
};

export default HistorySection;
