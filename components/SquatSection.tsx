
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Siren, Hammer, X, Search, Home, Shield, Scale,
  Lightbulb, Clock, Eye, CheckCircle
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
  { phase: 'scouting',   title: 'Phase 1 : Repérage',     description: 'Trouve le bon spot.',         icon: Search, duration: '2-7 jours',   tips: ['Check cadastre', 'Observe boîtes aux lettres'], categories: ['general'] },
  { phase: 'entry',      title: 'Phase 2 : Entrée',        description: 'Accès au lieu.',              icon: Hammer, duration: '1 nuit',       tips: ["Pas d'effraction", 'Change barillet'],           categories: ['general', 'ot'] },
  { phase: 'anchoring',  title: 'Phase 3 : Ancrage',       description: "Preuve d'habitation.",        icon: Home,   duration: '1-3 jours',   tips: ['Boîte aux lettres', 'Noms visibles'],            categories: ['daily_life'] },
  { phase: 'defense',    title: 'Phase 4 : Défense',       description: "Éviter l'expulsion.",         icon: Shield, duration: 'Constant',     tips: ['Reste calme', 'Filme tout'],                     categories: ['negotiation'] },
  { phase: 'nego_legal', title: 'Phase 5 : Négociation',   description: 'Légalisation via OT.',        icon: Scale,  duration: '1-4 semaines', tips: ['Propose entretien', 'Évite taxes'],              categories: ['negotiation', 'refugee', 'ot'] },
  { phase: 'post',       title: 'Phase 6 : Long terme',    description: 'Gestion stable.',             icon: Clock,  duration: '3-24 mois',   tips: ['Réunions collectives', 'Dossier social'],        categories: ['daily_life', 'refugee'] },
];

const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

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
      ),
    });
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] pb-16 sm:pb-20">
      {/* Flag line */}
      <div className="flag-line" aria-hidden="true"><span /><span /><span /></div>

      {/* Header */}
      <header className="pt-12 sm:pt-20 pb-10 sm:pb-12 px-4 sm:px-6 text-center bg-[#0F0F0F] text-white">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="inline-flex items-center gap-2 bg-[#BE0000]/20 text-[#BE0000] px-5 py-2 font-bold rounded-full text-[10px] uppercase tracking-[0.25em] mb-6 border border-[#BE0000]/30">
            GUIDE PRATIQUE
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif font-black mb-4 leading-tight">
            Votre droit au <span className="text-[#FFCC00]">logement</span>.
          </h1>
          <p className="text-sm sm:text-lg text-white/50 max-w-2xl mx-auto font-medium">
            Du squat à la convention légale — chaque étape documentée pour occuper avec dignité et sécurité.
          </p>
        </motion.div>
        <div className="flag-line mt-8" aria-hidden="true"><span /><span /><span /></div>
      </header>

      {/* Tab nav */}
      <nav className="flex justify-center border-b border-[#E8E8E6] bg-white sticky top-[71px] z-40" aria-label="Sections du guide">
        {(['manual', 'checklists', 'insides'] as TabType[]).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 sm:px-8 py-4 font-black text-[10px] sm:text-[11px] uppercase tracking-widest transition-colors min-h-[44px] ${activeTab === tab ? 'bg-[#FFCC00] text-[#0F0F0F]' : 'bg-white text-[#6B6B6B] hover:bg-[#FAFAF8]'}`}
          >
            {tab === 'manual' ? 'Guide' : tab === 'checklists' ? 'Checklists' : 'Conseils de terrain'}
          </button>
        ))}
      </nav>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 mt-10 sm:mt-12">

        {/* Manual tab */}
        {activeTab === 'manual' && (
          <div className="space-y-8">
            <motion.div
              initial="hidden"
              animate="visible"
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4"
            >
              {PHASES.map((p, i) => (
                <motion.button
                  key={p.phase}
                  custom={i}
                  variants={fadeUp}
                  onClick={() => setActivePhase(p.phase)}
                  className={`p-4 border-2 rounded-[8px] transition-all min-h-[80px] ${activePhase === p.phase ? 'border-[#BE0000] bg-[#BE0000] text-white scale-[1.03] shadow-lg' : 'border-[#E8E8E6] bg-white opacity-70 hover:opacity-100'}`}
                >
                  <p.icon className="mx-auto mb-2 h-5 w-5" aria-hidden="true" />
                  <h3 className="text-[9px] sm:text-[10px] font-black uppercase leading-tight">{p.title}</h3>
                </motion.button>
              ))}
            </motion.div>

            <AnimatePresence mode="wait">
              {PHASES.find(p => p.phase === activePhase) && (
                <motion.div
                  key={activePhase}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="bg-white border border-[#E8E8E6] rounded-[12px] p-6 sm:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
                >
                  <h2 className="text-2xl sm:text-3xl font-black mb-6 uppercase flex items-center gap-3">
                    {PHASES.find(p => p.phase === activePhase)!.title}
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                    <div>
                      <h3 className="font-black text-sm uppercase mb-4">Checklist</h3>
                      <div className="space-y-2">
                        {checklists[activePhase as keyof typeof checklists].map(item => (
                          <label key={item.id} className="flex items-center gap-3 p-3 bg-[#FAFAF8] rounded-[8px] cursor-pointer min-h-[44px]">
                            <input
                              type="checkbox"
                              checked={item.done}
                              onChange={() => toggleCheck(activePhase, item.id)}
                              className="accent-[#BE0000] w-4 h-4"
                            />
                            <span className={`text-sm font-bold ${item.done ? 'line-through text-[#6B6B6B]' : ''}`}>{item.text}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="bg-[#0F0F0F] text-white p-6 rounded-[12px]">
                      <h3 className="font-black text-sm uppercase mb-4 text-[#FFCC00]">Conseils clés</h3>
                      <ul className="space-y-3 text-sm text-white/70">
                        {PHASES.find(p => p.phase === activePhase)!.tips.map((t, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-[#FFCC00] mt-0.5">•</span>
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Insides tab */}
        {activeTab === 'insides' && (
          <motion.div
            initial="hidden"
            animate="visible"
            className="grid sm:grid-cols-2 gap-4 sm:gap-6"
          >
            {INSIDES_DATA.map((inside, i) => (
              <motion.div
                key={inside.id}
                custom={i}
                variants={fadeUp}
                onClick={() => setSelectedInside(inside)}
                className="bg-white border border-[#E8E8E6] rounded-[12px] p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] cursor-pointer hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all"
              >
                <div className="flex items-start gap-4">
                  <inside.icon className="h-6 w-6 text-[#BE0000] flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="font-black text-sm mb-2 uppercase leading-tight">{inside.text}</p>
                    <p className="text-xs text-[#6B6B6B] italic">Source : {inside.source}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Checklists tab */}
        {activeTab === 'checklists' && (
          <motion.div
            initial="hidden"
            animate="visible"
            className="grid sm:grid-cols-2 gap-4 sm:gap-6"
          >
            {PHASES.map((phase, i) => (
              <motion.div
                key={phase.phase}
                custom={i}
                variants={fadeUp}
                className="bg-white border border-[#E8E8E6] rounded-[12px] p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
              >
                <h3 className="font-black mb-4 uppercase text-[#BE0000] text-sm">{phase.title}</h3>
                <div className="space-y-2">
                  {checklists[phase.phase as keyof typeof checklists].map(item => (
                    <div key={item.id} className="text-sm font-bold flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full flex-shrink-0 ${item.done ? 'bg-[#00843D]' : 'bg-[#E8E8E6]'}`} />
                      {item.text}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </main>

      {/* Inside modal */}
      <AnimatePresence>
        {selectedInside && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/80 flex items-center justify-center p-4"
            onClick={() => setSelectedInside(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 8 }}
              transition={{ type: 'spring', stiffness: 350, damping: 28 }}
              className="bg-white p-6 sm:p-8 rounded-[20px] max-w-2xl w-full relative"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedInside(null)}
                aria-label="Fermer"
                className="absolute top-4 right-4 p-2 rounded-[8px] hover:bg-[#FAFAF8] transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
              <h2 className="text-xl sm:text-2xl font-black mb-4 uppercase pr-10">{selectedInside.text}</h2>
              <p className="text-[#6B6B6B] leading-relaxed mb-6 text-sm sm:text-base">{selectedInside.details}</p>
              <p className="text-xs font-bold text-[#6B6B6B] uppercase tracking-widest">Source : {selectedInside.source}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SquatSection;
