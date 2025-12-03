
import React, { useState } from 'react';
import { Wheat, Handshake, ShieldCheck, Users, Mail, ArrowRight, ExternalLink, HeartHandshake } from 'lucide-react';
import { LanguageCode, ViewState } from '../types';
import { translations } from '../utils/translations';

interface FoodAutonomySectionProps {
  language: LanguageCode;
  setView?: (view: ViewState) => void;
}

const FoodAutonomySection: React.FC<FoodAutonomySectionProps> = ({ language, setView }) => {
  const t = translations[language];
  const [imgError, setImgError] = useState(false);

  // Fallback links if setView is not provided
  const donorContactLink = `mailto:Admin@ballal.be?subject=${encodeURIComponent(t.email_subject_food_donor)}&body=${encodeURIComponent(t.email_body_food_donor)}`;
  const collectiveContactLink = `mailto:Admin@ballal.be?subject=${encodeURIComponent(t.email_subject_food_network)}&body=${encodeURIComponent(t.email_body_food_network)}`;
  const generalContactLink = `mailto:Admin@ballal.be?subject=${encodeURIComponent(t.nav_food_project)}`;

  return (
    <div className="min-h-screen bg-slate-50" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Hero Header */}
      <div className="bg-[#009460] text-white py-20 relative overflow-hidden border-b-8 border-[#FCD116]">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#CE1126] opacity-10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <div className="inline-flex items-center justify-center p-4 bg-white/20 rounded-full mb-8 backdrop-blur-sm animate-pulse">
                <Wheat className="h-12 w-12 text-[#FCD116]" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 leading-tight">
                {t.food_title}
            </h1>
            <p className="text-xl md:text-2xl text-white max-w-4xl mx-auto font-medium leading-relaxed italic">
                "{t.food_slogan}"
            </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-10 relative z-20">
        
        {/* GENERIC FOOD DONATION IMAGE BANNER */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-16 border-4 border-white h-64 md:h-96 group">
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
            <img 
                src={imgError ? "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1600" : "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=1600&auto=format&fit=crop"}
                alt={t.food_image_alt}
                className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-105"
                loading="lazy"
                onError={() => setImgError(true)}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8 z-20">
                 <div className="flex items-center text-white font-bold text-xl md:text-2xl">
                    <HeartHandshake className="h-8 w-8 text-[#FCD116] mr-3" />
                    <span className="drop-shadow-md">{t.food_title}</span>
                 </div>
            </div>
        </div>

        {/* VISION CARD */}
        <article className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-16 border-t-8 border-[#CE1126]">
            <h2 className="text-3xl font-black text-slate-900 mb-6 flex items-center">
                <span className="w-2 h-8 bg-[#CE1126] mr-4 rounded-full"></span>
                {t.food_intro_title}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed font-medium">
                {t.food_intro_text}
            </p>
        </article>

        {/* COMPLIANCE / TRANSPARENCY SECTION */}
        <section className="bg-slate-900 rounded-3xl p-8 md:p-12 text-slate-200 mb-16 relative overflow-hidden shadow-2xl">
             <div className="absolute top-0 right-0 w-full h-full bg-wax-pattern opacity-5 mix-blend-overlay pointer-events-none"></div>
             
             <div className="relative z-10 flex flex-col md:flex-row gap-10 items-start">
                <div className="md:w-1/3 flex justify-center md:justify-start">
                    <div className="bg-white/10 p-6 rounded-2xl border border-white/20 backdrop-blur-sm">
                        <ShieldCheck className="h-24 w-24 text-[#009460]" />
                    </div>
                </div>
                <div className="md:w-2/3">
                    <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-wide flex items-center gap-3">
                        {t.food_compliance_title}
                        <span className="bg-[#009460] text-xs px-2 py-1 rounded text-white font-bold tracking-widest border border-green-400">STANDARD</span>
                    </h3>
                    <p className="text-slate-300 text-lg leading-relaxed mb-6">
                        {t.food_compliance_text}
                    </p>
                    <div className="flex flex-wrap gap-3">
                        <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-mono text-gray-400">#Traceability</span>
                        <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-mono text-gray-400">#GDPR</span>
                        <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-mono text-gray-400">#Accountability</span>
                    </div>
                </div>
             </div>
        </section>

        {/* DUAL ACTION GRID */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
            
            {/* PARTNERS CARD */}
            <article className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden flex flex-col card-hover-effect">
                <div className="bg-orange-50 p-6 border-b border-orange-100 flex items-center justify-between">
                    <h3 className="text-xl font-black text-slate-900">{t.food_partners_title}</h3>
                    <Handshake className="h-8 w-8 text-orange-500" />
                </div>
                <div className="p-8 flex-grow">
                    <p className="text-gray-600 mb-8 font-medium">
                        {t.food_partners_text}
                    </p>
                    {setView ? (
                        <button 
                            onClick={() => setView(ViewState.FOOD_SUPPLIER)}
                            aria-label={t.food_partners_btn}
                            className="w-full inline-flex items-center justify-center px-6 py-4 border border-transparent text-base font-bold rounded-xl text-white bg-slate-900 hover:bg-black transition-all hover:-translate-y-1 shadow-lg cursor-pointer focus:ring-4 focus:ring-orange-200"
                        >
                            <Mail className="mr-2 h-5 w-5" />
                            {t.food_partners_btn}
                        </button>
                    ) : (
                        <a 
                            href={donorContactLink}
                            aria-label={t.food_partners_btn}
                            className="w-full inline-flex items-center justify-center px-6 py-4 border border-transparent text-base font-bold rounded-xl text-white bg-slate-900 hover:bg-black transition-all hover:-translate-y-1 shadow-lg focus:ring-4 focus:ring-orange-200"
                        >
                            <Mail className="mr-2 h-5 w-5" />
                            {t.food_partners_btn}
                        </a>
                    )}
                </div>
            </article>

            {/* COLLECTIVES CARD */}
            <article className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden flex flex-col card-hover-effect">
                <div className="bg-red-50 p-6 border-b border-red-100 flex items-center justify-between">
                    <h3 className="text-xl font-black text-slate-900">{t.food_collectives_title}</h3>
                    <Users className="h-8 w-8 text-[#CE1126]" />
                </div>
                <div className="p-8 flex-grow">
                    <p className="text-gray-600 mb-8 font-medium">
                        {t.food_collectives_text}
                    </p>
                    {setView ? (
                        <button 
                            onClick={() => setView(ViewState.FOOD_NETWORK)}
                            aria-label={t.food_collectives_btn}
                            className="w-full inline-flex items-center justify-center px-6 py-4 border-2 border-[#CE1126] text-base font-bold rounded-xl text-[#CE1126] bg-white hover:bg-red-50 transition-all hover:-translate-y-1 cursor-pointer focus:ring-4 focus:ring-red-200"
                        >
                            <ExternalLink className="mr-2 h-5 w-5" />
                            {t.food_collectives_btn}
                        </button>
                    ) : (
                        <a 
                            href={collectiveContactLink}
                            aria-label={t.food_collectives_btn}
                            className="w-full inline-flex items-center justify-center px-6 py-4 border-2 border-[#CE1126] text-base font-bold rounded-xl text-[#CE1126] bg-white hover:bg-red-50 transition-all hover:-translate-y-1 focus:ring-4 focus:ring-red-200"
                        >
                            <ExternalLink className="mr-2 h-5 w-5" />
                            {t.food_collectives_btn}
                        </a>
                    )}
                </div>
            </article>
        </div>

        {/* FINAL CTA */}
        <div className="text-center py-12 bg-white rounded-[2rem] border-2 border-dashed border-gray-200">
            <h4 className="text-2xl font-bold text-gray-900 mb-6 max-w-2xl mx-auto">
                {t.food_contact_cta}
            </h4>
            <a 
                href={generalContactLink} 
                className="inline-flex items-center px-8 py-4 bg-[#FCD116] text-slate-900 rounded-full font-black text-lg shadow-xl shadow-yellow-200 hover:shadow-2xl hover:bg-[#ffe14d] transition-all transform hover:scale-105"
                aria-label={t.contact_btn}
            >
                {t.contact_btn} <ArrowRight className="ml-2 h-6 w-6" />
            </a>
        </div>

      </div>
    </div>
  );
};

export default FoodAutonomySection;
