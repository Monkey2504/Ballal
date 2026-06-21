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
    <div className="min-h-screen bg-ivory pb-24">
      {/* Header */}
      <div className="bg-ink text-ivory py-20 relative overflow-hidden">
        {/* Flag line top */}
        <div className="flag-line absolute top-0 left-0 right-0" aria-hidden="true"><span /><span /><span /></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 pt-4">
          <p className="dateline text-[11px] text-guinea-yellow mb-8">
            Projet — autonomie alimentaire
          </p>
          <h1 className="text-6xl md:text-8xl font-serif font-black tracking-tight leading-[0.9] mb-8">
            Nourrir <span className="text-guinea-green">l'espoir</span>,<br/>semer <span className="text-guinea-yellow">l'unité</span>
          </h1>
          <p className="text-body-lg md:text-xl font-serif italic max-w-2xl leading-relaxed text-ivory/60">
            « Récupérer les surplus pour restaurer la dignité de chacun. »
          </p>
        </div>
        {/* Flag line bottom */}
        <div className="flag-line absolute bottom-0 left-0 right-0" aria-hidden="true"><span /><span /><span /></div>
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
            <div key={index} className="bg-white p-8 rounded-[4px] shadow-soft-elegant border border-ink/10 flex flex-col items-center text-center">
              <div className="p-3 bg-guinea-green/10 text-guinea-green rounded-[4px] mb-4">{metric.icon}</div>
              <div className="text-4xl font-serif font-black text-ink mb-1">{metric.value}</div>
              <div className="dateline text-[9px] text-ink-muted">{metric.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Action Card */}
          <div className="bg-white p-12 rounded-[4px] shadow-soft-elegant border border-ink/10 group transition-all">
             <div className="flex items-center gap-5 mb-10">
               <div className="p-5 bg-guinea-green/10 text-guinea-green rounded-[4px]"><Leaf className="h-10 w-10" /></div>
               <h3 className="text-4xl font-serif font-black text-ink">Ce que nous faisons</h3>
             </div>
             <p className="text-body-lg text-ink-muted leading-relaxed mb-10">
               Chaque semaine, nous collectons les invendus des commerces bruxellois pour approvisionner directement les cuisines collectives de la diaspora. Zéro déchet. Zéro facture pour les familles.
             </p>
             <div className="space-y-4">
                {["Zéro gaspillage, zéro frais", "Approvisionnement direct — sans intermédiaire", "Qualité nutritionnelle vérifiée"].map((benefit, i) => (
                   <div key={i} className="flex items-center gap-4 text-ink font-bold">
                     <CheckCircle className="h-5 w-5 text-guinea-green shrink-0" /> {benefit}
                   </div>
                ))}
             </div>
          </div>

          {/* Logistics Card */}
          <div className="bg-white p-12 rounded-[4px] shadow-soft-elegant border border-ink/10 group transition-all">
             <div className="flex items-center gap-5 mb-10">
               <div className="p-5 bg-guinea-yellow/15 text-guinea-yellow rounded-[4px]"><Truck className="h-10 w-10" /></div>
               <h3 className="text-4xl font-serif font-black text-ink">Rejoignez le réseau</h3>
             </div>
             <p className="text-body-lg text-ink-muted leading-relaxed mb-10">
               Vous avez des surplus alimentaires ? Vous gérez un collectif en besoin ? Deux clics. Un réseau. Un impact réel.
             </p>
             <div className="grid gap-4">
                <button onClick={() => setView?.(ViewState.FOOD_SUPPLIER)} className="bg-ink text-ivory p-6 rounded-[3px] font-mono font-bold uppercase text-xs tracking-[0.08em] flex items-center justify-between hover:bg-guinea-green transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-guinea-green/50 focus-visible:ring-offset-2">
                   Je donne des surplus <ArrowRight className="h-5 w-5" />
                </button>
                <button onClick={() => setView?.(ViewState.FOOD_NETWORK)} className="border-2 border-ink text-ink p-6 rounded-[3px] font-mono font-bold uppercase text-xs tracking-[0.08em] flex items-center justify-between hover:bg-ink hover:text-ivory transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/40 focus-visible:ring-offset-2">
                   Mon collectif a besoin <ArrowRight className="h-5 w-5" />
                </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodAutonomySection;