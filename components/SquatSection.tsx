import React, { useState } from 'react';
import {
  X, Search, Home, Shield, AlertTriangle, Lightbulb, MapPin,
  Clock, Users, Flame, RotateCcw, Scale, BarChart
} from 'lucide-react';
import { LanguageCode } from '../types.ts';

type TabType = 'manual' | 'checklists' | 'insides';
type PhaseType = 'scouting' | 'entry' | 'anchoring' | 'defense' | 'nego_legal' | 'post';
type InsideCategory = 'general' | 'refugee' | 'negotiation' | 'daily_life';

interface ChecklistItem { id: number; text: string; done: boolean; }
interface Checklists {
  scouting: ChecklistItem[];
  entry: ChecklistItem[];
  anchoring: ChecklistItem[];
  defense: ChecklistItem[];
  nego_legal: ChecklistItem[];
  post: ChecklistItem[];
}
interface Inside { id: number; text: string; source?: string; icon: React.ReactNode; category: InsideCategory; }
interface PhaseInfo {
  phase: PhaseType;
  title: string;
  description: string;
  icon: React.ReactNode;
  duration: string;
  detail: { objective: string; tips: string[]; insidesKeys: InsideCategory[]; };
}

const insidesData: Inside[] = [
  { id: 1, text: "Vérifie le statut du bâtiment via le cadastre gratuit (cadastre.brussels) pour identifier le propriétaire.", source: "Cadastre BXL", icon: <MapPin size={18} />, category: 'general' },
  { id: 2, text: "Si le bâtiment est un bien de spéculateur, propose une occupation temporaire légale pour lui éviter les taxes sur inoccupation (jusqu'à 3.000€/an).", source: "Région BXL", icon: <RotateCcw size={18} />, category: 'negotiation' },
  { id: 3, text: "Pivote vers l'occupation temporaire (OT) dès le scouting. 70% des propriétaires acceptent si tu gères l'entretien.", source: "Guichet OT/Perspective", icon: <Scale size={18} />, category: 'negotiation' },
  { id: 4, text: "Priorise les bâtiments fédéraux ou régionaux vides depuis longtemps. Meilleur interlocuteur institutionnel.", source: "Stratégie terrain", icon: <Home size={18} />, category: 'general' },
  { id: 5, text: "Vérifie la conformité incendie/hygiène avant l'entrée. Si pas safe, abandonne.", source: "Habitools/FéBUL", icon: <Flame size={18} />, category: 'general' },
  { id: 6, text: "Kit urgence : eau (jerrycans 20L), nourriture non-périssable, Signal app pour communications sécurisées.", source: "Expérience terrain", icon: <Shield size={18} />, category: 'general' },
  { id: 7, text: "Plus de 7.000 demandeurs d'asile sans-abri à BXL en 2025. Utilise ce chiffre pour l'angle humanitaire.", source: "FEANTSA/Fedasil 2025", icon: <BarChart size={18} />, category: 'refugee' },
  { id: 8, text: "Saturation de Fedasil (34k places, 3.900 en attente). Argument de poids pour l'état de nécessité.", source: "Fedasil 2025", icon: <Users size={18} />, category: 'refugee' },
  { id: 9, text: "Les sans-papiers peuvent signer des conventions précaires (OT). Fournis des preuves de précarité au CPAS.", source: "PICUM/CIRÉ", icon: <Shield size={18} />, category: 'refugee' },
  { id: 10, text: "Hotline CIRÉ (+32 2 629 77 10) pour conseils gratuits en FR/EN/AR sur les droits des étrangers.", source: "CIRÉ", icon: <Users size={18} />, category: 'refugee' },
  { id: 11, text: "Plateforme Citoyenne (+32 473 323 289) organise des hébergements citoyens d'urgence.", source: "Plateforme Citoyenne", icon: <Users size={18} />, category: 'refugee' },
  { id: 12, text: "Communa (communa.be) peut signer la convention légale d'occupation (pas squat) pour toi. Moyenne 2.5 ans.", source: "Communa", icon: <Home size={18} />, category: 'negotiation' },
  { id: 13, text: "Toestand.be facilite les négociations gratuites pour projets socio-culturels impliquant des réfugiés.", source: "Toestand", icon: <Scale size={18} />, category: 'negotiation' },
  { id: 14, text: "Mets en place une gestion collective inclusive dès le premier jour. Réunions hebdomadaires.", source: "Pigment vzw", icon: <Users size={18} />, category: 'daily_life' },
  { id: 15, text: "Samusocial (0800 99 340) pour nuits gratuites en hiver. MSF Brussels walk-in pour PTSD (vendredis).", source: "Samusocial/MSF", icon: <Shield size={18} />, category: 'daily_life' },
];

const initialChecklists: Checklists = {
  scouting: [
    { id: 1, text: "Repère un bâtiment vide depuis longtemps (fenêtres sales, pas de lumières).", done: false },
    { id: 2, text: "Vérifie l'adresse et le propriétaire via le cadastre.", done: false },
    { id: 3, text: "Vérifie la sécurité incendie avant toute décision.", done: false },
    { id: 4, text: "Décide du statut : squat ou tentative d'Occupation Temporaire (OT).", done: false },
  ],
  entry: [
    { id: 1, text: "Groupe discret (3-5 personnes max).", done: false },
    { id: 2, text: "Entrée sans dégradation visible.", done: false },
    { id: 3, text: "Changement de barillet propre.", done: false },
    { id: 4, text: "Kit urgence installé (eau, nourriture, Signal app).", done: false },
  ],
  anchoring: [
    { id: 1, text: "Installation immédiate d'une boîte aux lettres avec noms.", done: false },
    { id: 2, text: "Envoi de courriers à votre nom (preuve d'habitation).", done: false },
    { id: 3, text: "Rédige une charte de vie collective.", done: false },
  ],
  defense: [
    { id: 1, text: "Plan de réponse police : calme et caméra.", done: false },
    { id: 2, text: "Affichage des scripts légaux aux portes.", done: false },
    { id: 3, text: "Contact avocat / association de soutien identifié.", done: false },
  ],
  nego_legal: [
    { id: 1, text: "Prise de contact avec le propriétaire pour une convention d'OT.", done: false },
    { id: 2, text: "Médiation par une association spécialisée (Communa, Toestand).", done: false },
    { id: 3, text: "Dossier humanitaire préparé (preuves de précarité, Fedasil).", done: false },
  ],
  post: [
    { id: 1, text: "Réunions hebdomadaires et gestion des tâches.", done: false },
    { id: 2, text: "Maintien de l'entretien du bâtiment.", done: false },
    { id: 3, text: "Démarches pour logement social (CPAS, CAW).", done: false },
  ],
};

const phases: PhaseInfo[] = [
  { phase: 'scouting', title: 'PHASE 1 : REPÉRAGE', description: "Trouve le bon spot et vérifie son statut.", icon: <Search size={24} />, duration: '2-7 jours', detail: { objective: "Repérer un lieu abandonné.", tips: ["Marche discrètement.", "Vérifie le cadastre."], insidesKeys: ['general'] } },
  { phase: 'entry', title: 'PHASE 2 : ENTRÉE', description: 'Accès et sécurisation immédiate.', icon: <Flame size={24} />, duration: '1 nuit', detail: { objective: "Entrer sans casse.", tips: ["Kit urgence prêt.", "Changement barillet."], insidesKeys: ['general'] } },
  { phase: 'anchoring', title: 'PHASE 3 : ANCRAGE', description: "Établir la preuve d'habitation.", icon: <Home size={24} />, duration: '1-3 jours', detail: { objective: "Preuve légale.", tips: ["Boîte aux lettres.", "Voisins."], insidesKeys: ['daily_life'] } },
  { phase: 'defense', title: 'PHASE 4 : DÉFENSE', description: "Préparer la réponse aux autorités.", icon: <Shield size={24} />, duration: 'Constant', detail: { objective: "Éviter l'expulsion.", tips: ["Silence et calme.", "Droit au domicile."], insidesKeys: ['negotiation'] } },
  { phase: 'nego_legal', title: 'PHASE 5 : NÉGOCIATION', description: "Légaliser l'occupation.", icon: <Scale size={24} />, duration: '1-4 sem.', detail: { objective: "Convention OT.", tips: ["Intermédiaire associatif.", "Angle humanitaire."], insidesKeys: ['negotiation', 'refugee'] } },
  { phase: 'post', title: 'PHASE 6 : LONG TERME', description: 'Gestion et futur.', icon: <Clock size={24} />, duration: '3-24 mois', detail: { objective: "Stabilisation.", tips: ["Logement social.", "Vie commune."], insidesKeys: ['daily_life', 'refugee'] } },
];

const SquatSection: React.FC<{ language?: LanguageCode }> = () => {
  const [activeTab, setActiveTab] = useState<TabType>('manual');
  const [activePhase, setActivePhase] = useState<PhaseType>('scouting');
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [checklists, setChecklists] = useState<Checklists>(initialChecklists);

  const tacticalScripts = {
    police: `On habite ici, c'est notre domicile. Nous refusons l'entrée sans mandat (Art. 15 Const.). Appelez nos services sociaux.`,
    proprio: `Nous occupons ce lieu pour éviter qu'il ne se dégrade. Nous sommes ouverts à une convention d'occupation temporaire.`,
  };

  const toggleChecklistItem = (phase: keyof Checklists, id: number) => {
    setChecklists(prev => ({
      ...prev,
      [phase]: prev[phase].map(item => item.id === id ? { ...item, done: !item.done } : item)
    }));
  };

  const currentPhaseData = phases.find(p => p.phase === activePhase);
  const filteredInsides = insidesData.filter(i => currentPhaseData?.detail.insidesKeys.includes(i.category));

  return (
    <div className="min-h-screen bg-soft-paper pb-20 pt-10 px-6">

      {/* Modal urgence */}
      {emergencyMode && (
        <div
          className="fixed inset-0 z-[300] bg-earth-black/95 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setEmergencyMode(false)}
        >
          <div className="bg-white rounded-[2.5rem] max-w-2xl w-full p-10 relative shadow-2xl" onClick={e => e.stopPropagation()}>
            <button onClick={() => setEmergencyMode(false)} className="absolute top-8 right-8 p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X size={28} />
            </button>
            <h2 className="text-3xl font-black mb-8 text-earth-black flex items-center gap-3">
              <AlertTriangle className="text-guinea-red" /> SCRIPTS D'URGENCE
            </h2>
            <div className="space-y-6">
              {Object.entries(tacticalScripts).map(([key, script]) => (
                <div key={key} className="p-6 bg-gray-50 rounded-2xl border border-gray-200">
                  <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">
                    {key === 'police' ? 'Face à la police' : 'Face au propriétaire'}
                  </h3>
                  <p className="text-lg font-medium leading-relaxed italic">"{script}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-16 text-center">
          <div className="inline-block px-6 py-2 bg-guinea-red/10 text-guinea-red font-bold text-[10px] uppercase tracking-[0.3em] rounded-full mb-6">
            Logement & Occupation
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-black mb-6 text-earth-black tracking-tighter">
            Guide de <span className="text-guinea-red">Survie</span> Urbaine
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium leading-relaxed">
            Conseils tactiques et légaux pour transformer des lieux vides en espaces de vie solidaires.
          </p>
          <button
            onClick={() => setEmergencyMode(true)}
            className="mt-10 bg-guinea-red text-white px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-soft-elegant hover:-translate-y-1 transition-all flex items-center gap-3 mx-auto"
          >
            <AlertTriangle className="h-5 w-5" /> SOS Police / Proprio
          </button>
        </header>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-12 p-1 bg-white/50 backdrop-blur rounded-2xl shadow-sm max-w-md mx-auto border border-gray-100">
          {(['manual', 'checklists', 'insides'] as TabType[]).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 px-4 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-earth-black text-white' : 'text-gray-400 hover:text-earth-black'}`}
            >
              {tab === 'manual' ? 'Phases' : tab === 'checklists' ? 'Listes' : 'Secrets'}
            </button>
          ))}
        </div>

        {/* Tab: Phases */}
        {activeTab === 'manual' && (
          <div className="space-y-10">
            <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
              {phases.map(p => (
                <button
                  key={p.phase}
                  onClick={() => setActivePhase(p.phase)}
                  className={`p-4 rounded-2xl border transition-all text-center ${activePhase === p.phase ? 'bg-white border-guinea-red shadow-soft-elegant scale-105 z-10' : 'bg-transparent border-gray-200 grayscale opacity-50'}`}
                >
                  <div className={`mb-2 flex justify-center ${activePhase === p.phase ? 'text-guinea-red' : 'text-gray-400'}`}>
                    {p.icon}
                  </div>
                  <h3 className="text-[8px] font-black uppercase tracking-widest leading-none">
                    {p.title.split(':')[0]}
                  </h3>
                </button>
              ))}
            </div>

            {currentPhaseData && (
              <div className="bg-white rounded-[3rem] p-10 md:p-14 shadow-soft-elegant border border-gray-100">
                <div className="grid lg:grid-cols-2 gap-16">
                  <div className="space-y-8">
                    <div className="flex items-center gap-4">
                      <div className="p-4 bg-soft-paper text-guinea-red rounded-2xl">{currentPhaseData.icon}</div>
                      <h2 className="text-3xl font-serif font-black">{currentPhaseData.title}</h2>
                    </div>
                    <p className="text-lg font-medium text-gray-600 leading-relaxed italic">
                      "{currentPhaseData.description}"
                    </p>
                    <div className="space-y-3">
                      {checklists[activePhase]?.map(item => (
                        <label key={item.id} className="flex items-center gap-4 p-5 bg-soft-paper/50 rounded-2xl cursor-pointer hover:bg-white border border-transparent hover:border-gray-100 transition-all">
                          <input
                            type="checkbox"
                            checked={item.done}
                            onChange={() => toggleChecklistItem(activePhase, item.id)}
                            className="w-5 h-5 rounded border-gray-300 text-guinea-red focus:ring-guinea-red"
                          />
                          <span className={`text-sm font-bold ${item.done ? 'line-through text-gray-400' : 'text-earth-black'}`}>
                            {item.text}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="bg-[#2D2D2D] text-white p-10 rounded-[2.5rem] shadow-xl space-y-8">
                    <h3 className="font-bold text-xs uppercase tracking-[0.3em] text-guinea-yellow flex items-center gap-3">
                      <Lightbulb className="h-4 w-4" /> Conseils d'Insiders
                    </h3>
                    <div className="space-y-6">
                      {filteredInsides.map(inside => (
                        <div key={inside.id} className="flex gap-4">
                          <div className="text-guinea-yellow mt-1">{inside.icon}</div>
                          <div>
                            <p className="text-sm font-medium text-gray-200 leading-relaxed">{inside.text}</p>
                            <p className="text-[9px] font-bold text-gray-500 uppercase mt-2 tracking-widest">{inside.source}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab: Listes */}
        {activeTab === 'checklists' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(Object.keys(checklists) as Array<keyof Checklists>).map(phase => (
              <div key={phase} className="bg-white p-8 rounded-[2.5rem] shadow-soft-elegant border border-gray-100">
                <h3 className="text-lg font-serif font-black mb-6 uppercase tracking-tighter border-b border-gray-50 pb-4">
                  {phases.find(p => p.phase === phase)?.title.split(':')[1]?.trim() || phase}
                </h3>
                <div className="space-y-4">
                  {checklists[phase].map(item => (
                    <label key={item.id} className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={item.done}
                        onChange={() => toggleChecklistItem(phase, item.id)}
                        className="mt-1 w-4 h-4 rounded text-guinea-red border-gray-300"
                      />
                      <span className={`text-xs font-bold leading-tight ${item.done ? 'line-through text-gray-400' : 'text-gray-600 group-hover:text-earth-black'}`}>
                        {item.text}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab: Secrets */}
        {activeTab === 'insides' && (
          <div className="grid md:grid-cols-2 gap-6">
            {insidesData.map(inside => (
              <div key={inside.id} className="bg-white p-6 rounded-2xl shadow-soft-elegant border border-gray-100 flex items-start gap-4 hover:border-guinea-red/30 transition-all">
                <div className="text-guinea-red mt-1">{inside.icon}</div>
                <div>
                  <p className="text-sm font-bold text-earth-black leading-relaxed mb-2">{inside.text}</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{inside.source}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SquatSection;
