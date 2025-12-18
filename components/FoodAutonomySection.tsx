import React, { useState, useEffect } from 'react';
import { 
  Wheat, ShieldCheck, Users, Mail, ArrowRight, 
  HeartHandshake, Leaf, Truck, Globe,
  Calendar, CheckCircle, Target, Home, TrendingUp
} from 'lucide-react';
import { LanguageCode, ViewState } from '../types.ts';
import { translations } from '../utils/translations.ts';

interface FoodAutonomySectionProps {
  language: LanguageCode;
  setView?: (view: ViewState) => void;
}

const FoodAutonomySection: React.FC<FoodAutonomySectionProps> = ({ language, setView }) => {
  const t = translations[language] || translations['fr'];
  const [metrics, setMetrics] = useState({ squats: 0, people: 0, growth: 0, partners: 0 });

  useEffect(() => {
    const target = { squats: 10, people: 1000, growth: 10, partners: 50 };
    setMetrics(target);
  }, []);

  return (
    <div className="min-h-screen bg-soft-paper pb-24">
      {/* Header Doux */}
      <div className="bg-[#2D2D2D] text-white py-24 border-b-8 border-guinea-green relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 african-pattern"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="bg-guinea-green text-white inline-block px-5 py-2 font-bold rounded-full text-xs uppercase mb-8 shadow-lg">
             PROJET AUTONOMIE ALIMENTAIRE
          </div>
          <h1 className="text-6xl md:text-9xl font-serif font-black tracking-tighter leading-[0.8] mb-10">
            Nourrir <span className="text-guinea-green">l'espoir</span>,<br/>semer <span className="text-guinea-yellow">l'unité</span>
          </h1>
          <p className="text-xl md:text-3xl font-medium italic max-w-2xl leading-relaxed text-gray-300">
            "Récupérer les surplus pour restaurer la dignité de chacun."
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-16 relative z-20">
        
        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {[
            { value: metrics.squats, label: "Points de distribution", icon: <Home className="h-5 w-5" /> },
            { value: metrics.people, label: "Repas par mois", icon: <Users className="h-5 w-5" /> },
            { value: `x${metrics.growth}`, label: "Impact 2025", icon: <TrendingUp className="h-5 w-5" /> },
            { value: metrics.partners, label: "Partenaires locaux", icon: <HeartHandshake className="h-5 w-5" /> }
          ].map((metric, index) => (
            <div key={index} className="bg-white p-8 rounded-[2.5rem] shadow-soft-elegant border border-gray-100 flex flex-col items-center text-center">
              <div className="p-3 bg-guinea-green/10 text-guinea-green rounded-2xl mb-4">{metric.icon}</div>
              <div className="text-4xl font-serif font-black text-earth-black mb-1">{metric.value}</div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{metric.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Action Card */}
          <div className="bg-white p-12 rounded-[3.5rem] shadow-soft-elegant border border-gray-100 group transition-all">
             <div className="flex items-center gap-5 mb-10">
               <div className="p-5 bg-guinea-green/10 text-guinea-green rounded-[2rem] group-hover:scale-110 transition-transform"><Leaf className="h-10 w-10" /></div>
               <h3 className="text-4xl font-serif font-black text-earth-black">Notre Mission</h3>
             </div>
             <p className="text-xl text-gray-600 font-medium leading-relaxed mb-10">
               Nous collectons les surplus alimentaires des commerces de gros et détaillants pour approvisionner les cuisines collectives des squats et occupations de la diaspora.
             </p>
             <div className="space-y-4">
                {["Lutte contre le gaspillage", "Zéro frais pour les occupants", "Qualité nutritionnelle garantie"].map((benefit, i) => (
                   <div key={i} className="flex items-center gap-4 text-gray-700 font-bold">
                     <CheckCircle className="h-5 w-5 text-guinea-green" /> {benefit}
                   </div>
                ))}
             </div>
          </div>

          {/* Logistics Card */}
          <div className="bg-white p-12 rounded-[3.5rem] shadow-soft-elegant border border-gray-100 group transition-all">
             <div className="flex items-center gap-5 mb-10">
               <div className="p-5 bg-guinea-yellow/10 text-guinea-yellow rounded-[2rem] group-hover:scale-110 transition-transform"><Truck className="h-10 w-10" /></div>
               <h3 className="text-4xl font-serif font-black text-earth-black">Participer</h3>
             </div>
             <p className="text-xl text-gray-600 font-medium leading-relaxed mb-10">
               Vous êtes un commerçant avec des invendus ? Ou un collectif ayant besoin d'appui ? Rejoignez le réseau Ballal.
             </p>
             <div className="grid gap-4">
                <button onClick={() => setView?.(ViewState.FOOD_SUPPLIER)} className="bg-earth-black text-white p-6 rounded-2xl font-black uppercase text-xs tracking-widest flex items-center justify-between hover:bg-guinea-green transition-all shadow-md">
                   Je suis un fournisseur <ArrowRight className="h-5 w-5" />
                </button>
                <button onClick={() => setView?.(ViewState.FOOD_NETWORK)} className="border-2 border-earth-black text-earth-black p-6 rounded-2xl font-black uppercase text-xs tracking-widest flex items-center justify-between hover:bg-gray-50 transition-all">
                   Je suis un collectif <ArrowRight className="h-5 w-5" />
                </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodAutonomySection;