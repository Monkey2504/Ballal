
import React, { useState } from 'react';
import { 
  Siren, Hammer, X, Search, Home, Shield, Scale, LayoutList, 
  Lightbulb, Zap, MapPin, Clock, BarChart, Eye, FileText, CheckCircle
} from 'lucide-react';
import { LanguageCode } from '../types.ts';
import { INSIDES_DATA, INITIAL_CHECKLISTS, Inside, InsideCategory } from '../data/squatData.ts';

type TabType = 'manual' | 'checklists' | 'insides';
type PhaseType = 'scouting' | 'entry' | 'anchoring' | 'defense' | 'nego_legal' | 'post';

interface PhaseInfo {
  phase: PhaseType;
  title: string;
  description: string;
  icon: any;
  duration: string;
  tips: string[];
  categories: InsideCategory[];
}

const PHASES: PhaseInfo[] = [
  { phase: 'scouting', title: 'Phase 1 : Repérage', description: "Trouve un bâtiment vide.", icon: Search, duration: '2-7 jours', tips: ["Consulte le cadastre", "Identifie le propriétaire"], categories: ['general'] },
  { phase: 'entry', title: 'Phase 2 : Contact', description: "Parle au propriétaire avant d'entrer.", icon: Hammer, duration: '1-4 semaines', tips: ["Écris au propriétaire", "Propose une convention"], categories: ['general', 'ot'] },
  { phase: 'anchoring', title: 'Phase 3 : Ancrage', description: "S'installer dans les règles.", icon: Home, duration: '1-3 jours', tips: ["Boîte aux lettres", "Charte de vie collective"], categories: ['daily_life'] },
  { phase: 'defense', title: 'Phase 4 : Tes droits', description: "En cas de visite de la police.", icon: Shield, duration: 'En continu', tips: ["Reste calme", "Demande le mandat"], categories: ['negotiation'] },
  { phase: 'nego_legal', title: 'Phase 5 : Négociation', description: "Convention d'occupation temporaire.", icon: Scale, duration: '1-4 semaines', tips: ["Propose l'entretien du bâtiment", "Fais-toi accompagner"], categories: ['negotiation', 'refugee', 'ot'] },
  { phase: 'post', title: 'Phase 6 : Long terme', description: "Gestion stable.", icon: Clock, duration: '3-24 mois', tips: ["Réunions collectives", "Dossier social"], categories: ['daily_life', 'refugee'] },
];

const SquatSection: React.FC<{ language?: LanguageCode }> = () => {
  const [activeTab, setActiveTab] = useState<TabType>('manual');
  const [activePhase, setActivePhase] = useState<PhaseType>('scouting');
  const [selectedInside, setSelectedInside] = useState<Inside | null>(null);
  const [checklists, setChecklists] = useState(INITIAL_CHECKLISTS);

  const toggleCheck = (phase: any, id: number) => {
    setChecklists({
      ...checklists,
      [phase]: checklists[phase as keyof typeof checklists].map(item => 
        item.id === id ? { ...item, done: !item.done } : item
      )
    });
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] pb-20">
      {/* Flag line header */}
      <div className="flag-line" aria-hidden="true"><span /><span /><span /></div>
      <header className="pt-20 pb-12 px-6 text-center bg-[#0F0F0F] text-white">
        <div className="inline-flex items-center gap-2 bg-[#BE0000]/20 text-[#BE0000] px-5 py-2 font-bold rounded-full text-[10px] uppercase tracking-[0.25em] mb-6 border border-[#BE0000]/30">
          GUIDE PRATIQUE
        </div>
        <h1 className="text-5xl md:text-7xl font-serif font-black mb-4 leading-tight">
          Votre droit au <span className="text-[#FFCC00]">logement</span>.
        </h1>
        <p className="text-lg text-white/50 max-w-2xl mx-auto font-medium">
          De la rue à la convention d'occupation : chaque étape pour se loger avec dignité et en sécurité.
        </p>
        <p className="text-sm text-white/40 max-w-2xl mx-auto font-medium mt-4">
          Depuis la loi du 18 octobre 2017, entrer dans un bâtiment sans l'accord du propriétaire est une infraction pénale en Belgique. Ce guide décrit la voie légale : l'occupation temporaire avec convention.
        </p>
        <div className="flag-line mt-8" aria-hidden="true"><span /><span /><span /></div>
      </header>

      <nav className="flex justify-center border-b border-[#E8E8E6] bg-white sticky top-[71px] z-50">
        {['manual', 'checklists', 'insides'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as TabType)}
            className={`px-8 py-4 font-black text-[11px] uppercase tracking-widest transition-colors ${activeTab === tab ? 'bg-[#FFCC00] text-[#0F0F0F]' : 'bg-white text-[#6B6B6B] hover:bg-[#FAFAF8]'}`}
          >
            {tab === 'manual' ? 'Guide' : tab === 'checklists' ? 'Checklists' : 'Conseils de terrain'}
          </button>
        ))}
      </nav>

      <main className="max-w-6xl mx-auto px-6 mt-12">
        {activeTab === 'manual' && (
          <div className="space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              {PHASES.map(p => (
                <button
                  key={p.phase}
                  onClick={() => setActivePhase(p.phase)}
                  className={`p-4 border-4 transition-all ${activePhase === p.phase ? 'border-guinea-red bg-guinea-red text-white scale-105 shadow-lg' : 'border-[#E8E8E6] bg-white opacity-60'}`}
                >
                  <p.icon className="mx-auto mb-2" />
                  <h3 className="text-[10px] font-black uppercase leading-tight">{p.title}</h3>
                </button>
              ))}
            </div>
            
            {PHASES.find(p => p.phase === activePhase) && (
              <div className="bg-white border border-gray-100 p-8 shadow-soft-elegant animate-in fade-in">
                <h2 className="text-3xl font-black mb-6 uppercase flex items-center gap-3">
                  {PHASES.find(p => p.phase === activePhase)!.title}
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-black text-sm uppercase mb-4 flex items-center gap-2">Checklist</h3>
                    <div className="space-y-2">
                      {checklists[activePhase as keyof typeof checklists].map(item => (
                        <label key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl cursor-pointer">
                          <input type="checkbox" checked={item.done} onChange={() => toggleCheck(activePhase, item.id)} className="accent-guinea-red" />
                          <span className={`text-sm font-bold ${item.done ? 'line-through text-gray-400' : ''}`}>{item.text}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="bg-[#0F0F0F] text-white p-6 rounded-3xl">
                    <h3 className="font-black text-sm uppercase mb-4 text-guinea-yellow">Conseils Clés</h3>
                    <ul className="space-y-3 text-xs opacity-80">
                      {PHASES.find(p => p.phase === activePhase)!.tips.map((t, i) => <li key={i}>• {t}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'insides' && (
          <div className="grid md:grid-cols-2 gap-6">
            {INSIDES_DATA.map(inside => (
              <div 
                key={inside.id} 
                onClick={() => setSelectedInside(inside)}
                className="bg-white border border-gray-100 p-6 shadow-soft-elegant cursor-pointer hover:bg-guinea-yellow/20"
              >
                <div className="flex items-start gap-4">
                  <inside.icon className="h-6 w-6 text-guinea-red flex-shrink-0" />
                  <div>
                    <p className="font-black text-sm mb-2 uppercase leading-tight">{inside.text}</p>
                    <p className="text-xs text-gray-500 italic">Source: {inside.source}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'checklists' && (
          <div className="grid md:grid-cols-2 gap-6">
            {PHASES.map(phase => (
              <div key={phase.phase} className="bg-white border border-gray-100 p-6 shadow-soft-elegant">
                <h3 className="font-black mb-4 uppercase text-guinea-red">{phase.title}</h3>
                <div className="space-y-2">
                  {checklists[phase.phase as keyof typeof checklists].map(item => (
                    <div key={item.id} className="text-sm font-bold flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${item.done ? 'bg-guinea-green' : 'bg-gray-200'}`} />
                      {item.text}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {selectedInside && (
        <div className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-4" onClick={() => setSelectedInside(null)}>
          <div className="bg-white p-8 rounded-3xl max-w-2xl w-full relative" onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelectedInside(null)} className="absolute top-4 right-4"><X /></button>
            <h2 className="text-2xl font-black mb-4 uppercase">{selectedInside.text}</h2>
            <p className="text-gray-600 leading-relaxed mb-6">{selectedInside.details}</p>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Source : {selectedInside.source}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SquatSection;
