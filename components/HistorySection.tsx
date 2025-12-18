import React from 'react';
import { Flag, GraduationCap, Quote, Newspaper, Camera, MapPin, TrendingUp, AlertCircle } from 'lucide-react';
import { LanguageCode } from '../types.ts';
import { translations } from '../utils/translations.ts';

interface HistorySectionProps {
  language: LanguageCode;
}

const HistorySection: React.FC<HistorySectionProps> = ({ language }) => {
  const t = translations[language] || translations['fr'];

  return (
    <section className="bg-soft-paper py-32 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER */}
        <div className="mb-32 relative text-center lg:text-left">
          <div className="inline-block py-2 px-6 bg-earth-black text-white font-bold text-[10px] uppercase tracking-[0.3em] mb-8 rounded-full">
            Notre Héritage
          </div>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-black text-earth-black tracking-tighter leading-none mb-12">
            Notre <span className="text-guinea-red/80">histoire</span>
          </h1>
          <p className="text-xl md:text-3xl font-medium text-gray-500 italic max-w-3xl leading-relaxed border-l-4 border-guinea-yellow pl-8">
            "{t.hist_subtitle}"
          </p>
        </div>

        {/* TIMELINE - Style Exposition Moderne */}
        <div className="space-y-48">
          
          {/* 1958 */}
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="relative group">
              <div className="absolute -inset-4 bg-guinea-red/5 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10 bg-white p-6 rounded-[3rem] shadow-soft-elegant border border-gray-100 transform -rotate-1 group-hover:rotate-0 transition-transform duration-700">
                 <img 
                  src="https://i.imgur.com/EPEdzOF.png" 
                  className="w-full h-[500px] object-cover rounded-[2rem] grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
                  alt="1958"
                 />
                 <div className="mt-6 px-4">
                    <span className="text-xs font-bold uppercase tracking-widest text-guinea-red">L'Indépendance</span>
                    <h3 className="font-serif font-black text-2xl mt-1">Septembre 1958 : Le Refus</h3>
                 </div>
              </div>
            </div>
            <div className="space-y-8">
              <span className="text-8xl font-black text-guinea-red/10 select-none">1958</span>
              <h2 className="text-4xl md:text-5xl font-serif font-black text-earth-black leading-tight">{t.hist_1958_title}</h2>
              <p className="text-xl text-gray-600 leading-relaxed font-medium">{t.hist_1958_desc}</p>
              <div className="bg-white/50 backdrop-blur-sm p-8 rounded-3xl border border-gray-100 italic font-medium text-gray-500 shadow-sm">
                 <Quote className="mb-4 h-8 w-8 text-guinea-yellow" />
                 "Préférer la liberté dans la pauvreté à la richesse dans l'esclavage."
              </div>
            </div>
          </div>

          {/* VAGUE 1 */}
          <div className="grid lg:grid-cols-2 gap-20 items-center lg:flex-row-reverse">
            <div className="order-2 lg:order-1 space-y-8">
              <span className="text-8xl font-black text-guinea-green/10 select-none">1960</span>
              <h2 className="text-4xl md:text-5xl font-serif font-black text-earth-black leading-tight">{t.hist_1960_title}</h2>
              <p className="text-xl text-gray-600 leading-relaxed font-medium">{t.hist_1960_desc}</p>
              <div className="flex flex-wrap gap-3">
                {['ULB', 'UCL', 'LIÈGE', 'MONS'].map(univ => (
                  <span key={univ} className="bg-guinea-green/10 text-guinea-green px-4 py-2 rounded-full font-bold text-[10px] tracking-widest border border-guinea-green/20">{univ}</span>
                ))}
              </div>
            </div>
            <div className="order-1 lg:order-2">
               <div className="bg-white p-6 rounded-[3rem] shadow-soft-elegant border border-gray-100 rotate-1 group">
                 <img 
                  src="https://i.imgur.com/9CxUOIj.png" 
                  className="w-full h-[500px] object-cover rounded-[2rem] grayscale opacity-80 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700"
                  alt="Étudiants"
                 />
               </div>
            </div>
          </div>

          {/* AUJOURD'HUI */}
          <div className="bg-[#2D2D2D] rounded-[4rem] p-12 md:p-24 text-white relative overflow-hidden shadow-2xl border-b-8 border-guinea-yellow">
             <div className="absolute top-0 right-0 w-96 h-96 bg-guinea-red/10 rounded-full blur-[100px]"></div>
             <div className="grid lg:grid-cols-12 gap-16 items-center relative z-10">
                <div className="lg:col-span-7 space-y-10">
                   <h2 className="text-5xl md:text-7xl font-serif font-black italic tracking-tighter leading-none">
                     {t.hist_2024_title}
                   </h2>
                   <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-medium">
                     {t.hist_2024_desc}
                   </p>
                   <div className="flex items-center gap-6 pt-6">
                      <div className="h-0.5 w-24 bg-guinea-yellow"></div>
                      <span className="text-xs font-bold uppercase tracking-[0.3em] text-guinea-yellow">RÉSILIENCE • TRAVAIL • DIGNITÉ</span>
                   </div>
                </div>
                <div className="lg:col-span-5">
                   <div className="rounded-[3rem] overflow-hidden rotate-2 shadow-2xl border-4 border-white/20">
                      <img src="https://i.imgur.com/s3XuBNm.png" className="w-full h-full object-cover grayscale brightness-110" />
                   </div>
                </div>
             </div>
          </div>

        </div>

        {/* STATS */}
        <div className="mt-40 pt-20 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-12">
           <div className="text-8xl md:text-9xl font-black text-earth-black tracking-tighter opacity-10">+25K</div>
           <p className="text-3xl md:text-4xl font-serif font-black text-earth-black leading-tight text-center md:text-right max-w-lg">
             Guinéens en Belgique. <br/>
             <span className="text-guinea-red/80">Une force collective.</span>
           </p>
        </div>
      </div>
    </section>
  );
};

export default HistorySection;