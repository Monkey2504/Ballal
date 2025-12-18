import React, { useState, useRef, useEffect } from 'react';
import {
    Siren, Hammer, X, ChevronDown, Search, Home, Shield, FileText, AlertTriangle, Lightbulb, MapPin,
    Clock, Users, Download, Copy, Phone, BookOpen, Camera, Lock, AlertCircle, CheckCircle, Globe,
    Megaphone, BarChart, Eye, Zap, Flame, RotateCcw, Scale, LayoutList
} from 'lucide-react';
import { LanguageCode } from '../types.ts';

// Types
type TabType = 'manual' | 'checklists' | 'insides';
type PhaseType = 'scouting' | 'entry' | 'anchoring' | 'defense' | 'nego_legal' | 'post'; 
type EmergencyStatus = 'safe' | 'warning' | 'danger';
type InsideCategory = 'general' | 'refugee' | 'negotiation' | 'daily_life';

interface SquatSectionProps {
    language?: LanguageCode;
}

interface ChecklistItem {
    id: number;
    text: string;
    done: boolean;
}

interface Checklists {
    scouting: ChecklistItem[];
    entry: ChecklistItem[];
    anchoring: ChecklistItem[];
    defense: ChecklistItem[];
    nego_legal: ChecklistItem[]; 
    post: ChecklistItem[];
}

interface Inside {
    id: number;
    text: string;
    source?: string; // Ajout pour la fiabilité
    icon: React.ReactNode;
    category: InsideCategory;
}

interface PhaseInfo {
    phase: PhaseType;
    title: string;
    description: string;
    icon: React.ReactNode;
    duration: string;
    detail: {
        objective: string;
        tips: string[]; // Tips de base
        insidesKeys: InsideCategory[]; // Clés pour filtrer les insides globaux
    };
}

// Nouvelle Constante : Toutes les Insides
const insidesData: Inside[] = [
    // Insides Généraux pour Débutants (Risques & Prépa)
    { id: 1, text: "Vérifie le statut du bâtiment via le **cadastre gratuit** (cadastre.brussels) pour identifier le proprio et si c'est vide.", source: "Cadastre BXL", icon: <MapPin size={18} />, category: 'general' },
    { id: 2, text: "Si le bâtiment est un bien de **spéculateur** (vide pour revendre), propose une occupation temporaire légale pour lui éviter les taxes sur inoccupation (jusqu'à 3.000€/an).", source: "Région BXL", icon: <RotateCcw size={18} />, category: 'negotiation' },
    { id: 3, text: "**Pivote vers l'occupation temporaire (OT)** dès le scouting. Contacte le proprio via cadastre pour une convention précaire (3-24 mois). 70% des proprios acceptent si tu gères l'entretien gratuit.", source: "Guichet OT/Perspective", icon: <Scale size={18} />, category: 'negotiation' },
    { id: 4, text: "Évite les bâtiments **fédéraux ou EU** (risque d'expulsion massive, comme à Evere en nov 2025). Préfère sites privés via Guichet OT (Perspective Brussels).", source: "Rapports d'asso", icon: <AlertTriangle size={18} />, category: 'general' },
    { id: 5, text: "Vérifie conformité **incendie/hygiène** avant entrée avec une app comme 'Habitools' (checklist gratuite). Si pas safe, abandonne.", source: "Habitools/FéBUL", icon: <Flame size={18} />, category: 'general' },
    { id: 6, text: "Prépare un **kit urgence** : Eau (jerrycans 20L), nourriture non-périssable (banques alimentaires à Molenbeek), et **Signal app** pour comms sécurisées (la police scanne souvent les phones).", source: "Expérience terrain", icon: <Lock size={18} />, category: 'general' },
    
    // Insides pour Réfugiés & Vulnérables (2025 Spécifiques)
    { id: 7, text: "Explosion du **sans-abrisme** : +7.000 demandeurs d'asile sans-abri à BXL en 2025 (attente moyenne de 112 jours). Utilise ce chiffre pour négocier un angle humanitaire.", source: "FEANTSA/Fedasil 2025", icon: <BarChart size={18} />, category: 'refugee' },
    { id: 8, text: "Mentionne la **saturation de Fedasil** (34k places, 3.900 en attente août 2025) pour appuyer la nécessité de l'occupation solidaire.", source: "Fedasil Août 2025", icon: <Users size={18} />, category: 'refugee' },
    { id: 9, text: "Les **sans-papiers** peuvent signer des conventions précaires (OT) : fournis des preuves de précarité au CPAS (attestation Fedasil) pour obtenir leur appui.", source: "PICUM/CIRÉ", icon: <FileText size={18} />, category: 'refugee' },
    { id: 10, text: "Hotline **CIRÉ** (+32 2 629 77 10) pour conseils gratuits en FR/EN/AR sur les droits des étrangers et sans-papiers.", source: "CIRÉ", icon: <Phone size={18} />, category: 'refugee' },
    { id: 11, text: "Pour Palestiniens/Afghans/Syriens : Priorise occupations **près de Fedasil** (Rue des Champs, Anderlecht) pour accès aux aides.", source: "Réseaux d'asso", icon: <MapPin size={18} />, category: 'refugee' },
    { id: 12, text: "**Plateforme Citoyenne** (+32 473 323 289) organise hébergements citoyens (40% des sans-abri asylum seekers en 2025).", source: "Plateforme Citoyenne", icon: <Users size={18} />, category: 'refugee' },
    { id: 13, text: "Femmes/enfants vulnérables : Contacte **Pierre d'Angle** (+32 2 513 38 01) ou **Open Deur** (familles) pour abri d'urgence. Évite les squats mixtes pour la sécurité.", source: "Associations", icon: <Shield size={18} />, category: 'refugee' },
    { id: 14, text: "Santé hiver 2025 : **Samusocial** (0800 99 340) pour nuits gratuites (appeler lundi 10h). **MSF Brussels** offre des check-ups walk-in pour PTSD (vendredis).", source: "Samusocial/MSF", icon: <AlertCircle size={18} />, category: 'refugee' },

    // Insides pour Négociation & Occupations Temporaires
    { id: 15, text: "**Communa** (communa.be) peut signer la convention légale d'occupation (pas squat) pour toi, moyenne 2.5 ans de durée.", source: "Communa", icon: <Home size={18} />, category: 'negotiation' },
    { id: 16, text: "**Toestand.be** facilite les négociations gratuites pour projets socio-culturels impliquant des réfugiés.", source: "Toestand", icon: <Globe size={18} />, category: 'negotiation' },
    { id: 17, text: "Argumente sur les **taxes** : le proprio évite des amendes d'inoccupation (jusqu'à 12.500€ si récidive) et des dégradations.", source: "Région BXL", icon: <FileText size={18} />, category: 'negotiation' },
    { id: 18, text: "Propose de la **'préfiguration'** : tester des usages futurs (logement social) pour le quartier avant le projet définitif du proprio.", source: "Perspective BXL", icon: <Eye size={18} />, category: 'negotiation' },
    { id: 19, text: "Deux bâtiments **fédéraux** ouverts pour sans-abri hiver 2025 (BXL/Liège) : contacte Guichet OT (perspective.brussels) pour obtenir des subventions liées.", source: "Guichet OT", icon: <Hammer size={18} />, category: 'negotiation' },
    { id: 20, text: "Implique le **CPAS** dans la négociation pour l'appui aux réfugiés : ils peuvent aider à co-financer de petites améliorations.", source: "CPAS", icon: <Users size={18} />, category: 'negotiation' },
    { id: 21, text: "La **mobilisation collective** (pétitions + manifs) reporte les expulsions (ex: squat asylum seekers reporté août 2025). Rejoins **Voix des Sans-Papiers** (voixsp1@hotmail.com).", source: "Collectif Voix SP", icon: <Megaphone size={18} />, category: 'negotiation' },
    { id: 22, text: "Télécharge le **guide FéBUL** (PDF 2020, valable 2025) pour des modèles de contrats précaires incluant des clauses humanitaires.", source: "FéBUL", icon: <Download size={18} />, category: 'negotiation' },

    // Insides pour Vie Quotidienne & Long-Terme
    { id: 23, text: "Mets en place l'**inclusion anti-racisme** : quotas diversité et formations (via **Pigment vzw** : +32 466 247 278).", source: "Pigment vzw", icon: <CheckCircle size={18} />, category: 'daily_life' },
    { id: 24, text: "Finances hybrides : utilise les **dons** et le 'pay what you can' lors d'événements publics pour couvrir les coûts (via **Toestand** pour la visibilité).", source: "Toestand/Expérience", icon: <Lightbulb size={18} />, category: 'daily_life' },
    { id: 25, text: "Utilise l'OT (3-6 mois) pour faire des demandes de **logements sociaux** (liste d'attente via **CAW Brussels** : 0800 13 500).", source: "CAW Brussels", icon: <Home size={18} />, category: 'daily_life' },
    { id: 26, text: "Pour l'emploi, utilise le **guide PICUM 2025** qui aide les immigrants et réfugiés sans-papiers.", source: "PICUM 2025", icon: <BookOpen size={18} />, category: 'daily_life' },
    { id: 27, text: "Évite la **gentrification** : choisis des quartiers populaires et implique les voisins pour des projets communautaires.", source: "Analyse urbaine", icon: <Users size={18} />, category: 'daily_life' },
    { id: 28, text: "Réseaux extra : **Myria** (+32 2 212 30 00) pour les droits ; **Vluchtelingenwerk** (+32 2 225 44 00) pour l'asile.", source: "Institutions", icon: <Phone size={18} />, category: 'daily_life' },
];

const initialChecklists: Checklists = {
    scouting: [
        { id: 1, text: "Repère un bâtiment vide depuis longtemps (regarde les fenêtres sales, pas de lumières).", done: false },
        { id: 2, text: "Vérifie si y'a pas de caméras ou alarmes visibles.", done: false },
        { id: 3, text: "Vérifie l'adresse et le propriétaire via le **cadastre** (cadastre.brussels).", done: false },
        { id: 4, text: "Vérifie la sécurité et la conformité incendie/hygiène (via 'Habitools' si possible).", done: false },
        { id: 5, text: "**Décide du statut : squat illégal ou tenter l'Occupation Temporaire (OT) légale?**", done: false }
    ],
    entry: [
        { id: 1, text: "Prépare un petit groupe discret (3-5 personnes max).", done: false },
        { id: 2, text: "Entre la nuit, **sans casser** quoi que ce soit de visible (très important légalement).", done: false },
        { id: 3, text: "Change la serrure proprement (uniquement le barillet) et **garde l'ancienne**.", done: false },
        { id: 4, text: "Prépare le kit urgence (eau, nourriture, Signal app) juste après l'entrée.", done: false }
    ],
    anchoring: [
        { id: 1, text: "Installe une boîte aux lettres immédiatement avec les noms des occupants.", done: false },
        { id: 2, text: "Mets des lettres à ton nom dans la boîte tout de suite (preuve de domiciliation/habitation).", done: false },
        { id: 3, text: "Rends le lieu habitable : nettoie, range, aménage (aspect 'maison').", done: false },
        { id: 4, text: "Rédige une charte de vie collective et des règles claires (ex: anti-racisme, tâches).", done: false },
        { id: 5, text: "Contacte un réseau solidaire (Communa, Toestand, Chez Nous) pour l'appui.", done: false }
    ],
    defense: [
        { id: 1, text: "Prépare un plan si police arrive : reste calme, **filme** tout (témoin légal).", done: false },
        { id: 2, text: "Bloque les entrées avec des meubles sans détruire le lieu.", done: false },
        { id: 3, text: "Affiche le script 'policeArrival' bien en vue.", done: false },
        { id: 4, text: "Tiens un registre d'occupation (qui est là, depuis quand).", done: false }
    ],
    nego_legal: [
        { id: 1, text: "Contacte le proprio avec une proposition d'Occupation Temporaire (OT).", done: false },
        { id: 2, text: "Passe par une asso intermédiaire (Communa, Toestand) pour signer la convention.", done: false },
        { id: 3, text: "Implique le CPAS et/ou Fedasil pour renforcer le dossier humanitaire.", done: false },
        { id: 4, text: "Utilise le guide FéBUL pour le modèle de contrat si tu négocies seul(e).", done: false },
        { id: 5, text: "Fais pression via les réseaux sociaux / pétitions pour éviter une expulsion.", done: false }
    ],
    post: [
        { id: 1, text: "Maintiens une vie collective organisée (réunions hebdo, tâches partagées).", done: false },
        { id: 2, text: "Organise des événements publics ('pay what you can') pour les finances hybrides.", done: false },
        { id: 3, text: "Utilise le temps de l'occupation pour faire les démarches de logement social (CAW).", done: false },
        { id: 4, text: "Contacte Myria ou Vluchtelingenwerk pour le suivi des droits et demandes d'asile.", done: false }
    ]
};

const phases: PhaseInfo[] = [
    {
        phase: 'scouting',
        title: 'PHASE 1 : REPÉRAGE',
        description: "Trouve le bon spot sans te faire remarquer, et vérifie son statut légal.",
        icon: <Search size={24} />,
        duration: '2-7 jours',
        detail: {
            objective: "Repérer un bâtiment abandonné, vérifier son statut (cadastre) et sa sécurité (incendie).",
            tips: [
                "Marche dans le quartier, note les adresses discrètement, mais ne prends pas de photos qui révèlent ta position.",
                "Vise les quartiers moins pressés comme Anderlecht, ou ceux avec une forte solidarité (Molenbeek).",
                "Évite les bâtiments fédéraux/EU : préfère le privé (via Guichet OT pour l'aide).",
            ],
            insidesKeys: ['general', 'negotiation'] // Utilisera les insides G (cadastre/sécurité) + N (pivoter vers OT)
        }
    },
    {
        phase: 'entry',
        title: 'PHASE 2 : ENTRÉE',
        description: 'Accès au lieu et sécurisation immédiate.',
        icon: <Lock size={24} />,
        duration: '1 nuit',
        detail: {
            objective: "Entrer sans dégradation (effraction) et changer la serrure pour prouver l'habitation.",
            tips: [
                "Travaille en petit groupe silencieux. La discrétion est clé.",
                "Assure-toi que les accès (fenêtres, portes) sont intacts après l'entrée pour la preuve de non-effraction.",
                "Installe le kit d'urgence immédiatement.",
            ],
            insidesKeys: ['general'] // Utilise l'inside général sur le kit urgence/Signal
        }
    },
    {
        phase: 'anchoring',
        title: 'PHASE 3 : ANCRAGE',
        description: 'Établir la preuve d’habitation et organiser la vie collective.',
        icon: <Home size={24} />,
        duration: '1-3 jours',
        detail: {
            objective: "Créer un espace de vie visible et des preuves d'occupation légale (boîte aux lettres, charte).",
            tips: [
                "La boîte aux lettres est la première preuve légale d'habitation. Fais-la immédiatement.",
                "Rends l'intérieur 'habité' le plus vite possible (meubles, déco, cuisine).",
                "Contacte les voisins pour obtenir un soutien moral ou logistique.",
            ],
            insidesKeys: ['daily_life'] // Utilise les insides sur les règles collectives/inclusion
        }
    },
    {
        phase: 'defense',
        title: 'PHASE 4 : DÉFENSE',
        description: 'Préparer la réponse en cas d’arrivée de la police ou du propriétaire.',
        icon: <Shield size={24} />,
        duration: 'Constant',
        detail: {
            objective: "Éviter l'expulsion immédiate en utilisant la loi sur le domicile (inviolabilité).",
            tips: [
                "NE JAMAIS devenir agressif avec les autorités. Reste calme et silencieux.",
                "Utilise les scripts d'urgence (mode urgence de l'app) sans hésiter.",
                "Si un juge vient, demande immédiatement l'aide d'un avocat pro-squat.",
            ],
            insidesKeys: ['negotiation'] // Utilise l'inside sur la mobilisation collective/pétition
        }
    },
    {
        phase: 'nego_legal',
        title: 'PHASE 5 : NÉGO LÉGALE',
        description: 'Légaliser ton occupation pour une durée stable (convention).',
        icon: <Scale size={24} />,
        duration: '1-4 semaines',
        detail: {
            objective: "Transformer le squat en occupation temporaire légale (OT) ou convention humanitaire.",
            tips: [
                "Passe par des assos facilitatrices comme Communa ou Toestand, qui ont l'habitude de ce type de contrat.",
                "Mets en avant le service rendu au proprio (entretien gratuit, évite la taxe inoccupation, évite la dégradation).",
                "Si tu héberges des réfugiés/sans-abri, fais appuyer ta demande par le CPAS/Fedasil pour l'angle humanitaire.",
            ],
            insidesKeys: ['negotiation', 'refugee'] // Utilise les insides N (taxes/Communa) + R (Fedasil/sans-abri)
        }
    },
    {
        phase: 'post',
        title: 'PHASE 6 : LONG TERME',
        description: 'Gestion de la communauté et préparation du futur.',
        icon: <Clock size={24} />,
        duration: '3-24 mois',
        detail: {
            objective: "Maximiser la durée de l'occupation, préparer le relogement des occupants vulnérables et maintenir l'harmonie.",
            tips: [
                "Planifie les demandes de logement social dès que possible (longue attente).",
                "Implique la communauté dans le financement et l'entretien (événements, 'pay what you can').",
                "Ne néglige pas le soutien psychologique (PTSD) et le conseil légal (CIRÉ, Myria).",
            ],
            insidesKeys: ['daily_life', 'refugee'] // Utilise les insides VL (logement/PICUM) + R (santé/hotlines)
        }
    }
];

const brusselsDistricts = [
    { id: '1070', name: 'Anderlecht', risk: 'faible', notes: 'Grands entrepôts vides, moins de pression – idéal pour débutants.' },
    { id: '1080', name: 'Molenbeek', risk: 'moyen', notes: 'Solidarité locale forte, bons réseaux pour réfugiés.' }
];

const SquatSection: React.FC<SquatSectionProps> = ({ language = 'fr' }) => {
    const [activeTab, setActiveTab] = useState<TabType>('manual');
    const [activePhase, setActivePhase] = useState<PhaseType>('scouting');
    const [emergencyMode, setEmergencyMode] = useState(false);
    const [copiedItem, setCopiedItem] = useState<string | null>(null);
   
    // Mise à jour de l'état initial des checklists
    const [checklists, setChecklists] = useState<Checklists>(initialChecklists);

    const tacticalScripts = {
        policeArrival: `⚠️ DIS SIMPLEMENT : "On habite ici par besoin, c'est notre maison maintenant. On filme tout. Appelez le CPAS s'il vous plaît." (Garde ça calme, pas agressif.)`,
        ownerNegotiation: `📝 DIS : "On peut entretenir le lieu gratuitement en attendant vos travaux. On est ouverts au dialogue – contactez-nous via un ami commun ou asso comme Communa."`,
        communePoliceNegotiation: `📝 POUR COMMUNE/POLICE : "On propose une convention temporaire légale pour occuper pacifiquement. On entretient, pas de dégradations. Contactez notre asso (e.g., Toestand) pour discuter avec appui CPAS/Fedasil."`,
    };

    const toggleChecklistItem = (phase: keyof Checklists, id: number) => {
        setChecklists(prev => ({
            ...prev,
            [phase]: prev[phase].map(item =>
                item.id === id ? { ...item, done: !item.done } : item
            )
        }));
    };

    const handleCopyScript = async (scriptKey: keyof typeof tacticalScripts) => {
        try {
            await navigator.clipboard.writeText(tacticalScripts[scriptKey as keyof typeof tacticalScripts]);
            setCopiedItem(scriptKey);
            setTimeout(() => setCopiedItem(null), 2000);
        } catch (err) {
            console.error('Erreur copie:', err);
        }
    };

    const currentPhaseData = phases.find(p => p.phase === activePhase);
    const getInsidesForPhase = (phase: PhaseType) => {
        const phaseData = phases.find(p => p.phase === phase);
        if (!phaseData) return [];
        return insidesData.filter(inside => phaseData.detail.insidesKeys.includes(inside.category));
    };

    // Fonctions utilitaires pour le rendu des Insides
    const renderInsidesByCategory = (category: InsideCategory, title: string) => {
        const filteredInsides = insidesData.filter(i => i.category === category);
        if (filteredInsides.length === 0) return null;

        return (
            <div className="bg-white border-4 border-earth-black p-6 shadow-brutal">
                <h4 className="text-xl font-black mb-4 uppercase text-warm-red flex items-center gap-2">
                    <Lightbulb className="h-5 w-5" /> {title}
                </h4>
                <div className="space-y-4">
                    {filteredInsides.map(inside => (
                        <div key={inside.id} className="p-4 bg-gray-50 border border-gray-200 rounded-xl flex items-start gap-3">
                            <span className="text-earth-black flex-shrink-0 mt-0.5">{inside.icon}</span>
                            <div className="text-sm">
                                <p className="font-bold mb-1">{inside.text}</p>
                                {inside.source && <p className="text-xs italic text-gray-500">Source: {inside.source}</p>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-soft-paper pb-20">
            {emergencyMode && (
                <div className="fixed inset-0 z-[300] bg-black/95 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl max-w-2xl w-full p-8 relative">
                        <button onClick={() => setEmergencyMode(false)} className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full">
                            <X size={24} />
                        </button>
                        <h2 className="text-3xl font-black mb-8 text-center uppercase tracking-tight">🚨 Scripts d'urgence</h2>
                        <div className="space-y-4">
                            {Object.keys(tacticalScripts).map((key) => (
                                <div key={key} className="border rounded-xl p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-bold uppercase text-xs">{key}</h3>
                                        <button onClick={() => handleCopyScript(key as any)} className="text-xs font-bold text-red-600">
                                            {copiedItem === key ? 'COPIÉ' : 'COPIER'}
                                        </button>
                                    </div>
                                    <p className="text-sm font-mono bg-gray-50 p-3 rounded">{(tacticalScripts as any)[key]}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <header className="pt-24 pb-12 px-6 text-center">
                <h1 className="text-5xl md:text-7xl font-serif font-black mb-4 uppercase tracking-tighter">
                    GUIDE <span className="text-warm-red">SQUAT</span> BXL
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto italic">
                    Conseils de terrain pour occuper en toute sécurité.
                </p>
                <button
                    onClick={() => setEmergencyMode(true)}
                    className="mt-8 bg-warm-red text-white px-8 py-4 rounded-full font-black uppercase border-4 border-earth-black shadow-brutal active:shadow-none transition-all"
                >
                    URGENCE & SCRIPTS
                </button>
            </header>

            <nav className="flex justify-center gap-2 mb-12 px-6 overflow-x-auto border-y-4 border-earth-black bg-white sticky top-20 z-50">
                {['manual', 'checklists', 'insides'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab as TabType)}
                        className={`px-6 py-4 font-black text-xs uppercase tracking-widest border-x-2 border-earth-black transition-colors ${activeTab === tab ? 'bg-guinea-yellow' : 'bg-white hover:bg-gray-50'}`}
                    >
                        {tab === 'manual' ? 'Phases' : tab === 'checklists' ? 'Listes' : 'Astuces'}
                    </button>
                ))}
            </nav>

            <main className="max-w-6xl mx-auto px-6">
                {activeTab === 'manual' && (
                    <div className="space-y-8">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                            {phases.map(p => (
                                <button
                                    key={p.phase}
                                    onClick={() => setActivePhase(p.phase)}
                                    className={`p-4 border-4 transition-all text-center ${activePhase === p.phase ? 'border-warm-red bg-guinea-yellow shadow-brutal-red scale-105' : 'border-earth-black bg-white opacity-60'}`}
                                >
                                    <div className="mb-2 text-warm-red flex justify-center">{p.icon}</div>
                                    <h3 className="text-[10px] font-black uppercase">{p.title.split(':')[0]}</h3>
                                </button>
                            ))}
                        </div>

                        {currentPhaseData && (
                            <div className="bg-white border-4 border-earth-black p-8 shadow-brutal animate-in fade-in slide-in-from-bottom-4">
                                <h2 className="text-3xl font-black mb-6 uppercase flex items-center gap-3">
                                    <span className="text-warm-red">{currentPhaseData.icon}</span>
                                    {currentPhaseData.title}
                                </h2>
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div>
                                        <h3 className="font-black text-sm uppercase mb-4 flex items-center gap-2">
                                            <LayoutList className='h-4 w-4 text-earth-black' /> Checklist ({currentPhaseData.duration})
                                        </h3>
                                        <div className="space-y-2">
                                            {checklists[currentPhaseData.phase]?.map(item => (
                                                <label key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={item.done}
                                                        onChange={() => toggleChecklistItem(currentPhaseData.phase, item.id)}
                                                        className="accent-warm-red"
                                                    />
                                                    <span className={`text-sm font-bold ${item.done ? 'line-through text-gray-400' : ''}`}>{item.text}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="bg-earth-black text-white p-6 rounded-3xl">
                                        <h3 className="font-black text-sm uppercase mb-4 text-warm-red flex items-center gap-2">
                                            <Zap className="h-4 w-4" /> Tips Terrain & Insides Clés
                                        </h3>
                                        <ul className="space-y-3 text-xs font-mono opacity-80">
                                            {currentPhaseData.detail.tips.map((tip, i) => <li key={`tip-${i}`}>• {tip}</li>)}
                                            {getInsidesForPhase(currentPhaseData.phase).slice(0, 3).map(inside => (
                                                <li key={`inside-${inside.id}`} className="mt-2 text-guinea-yellow font-bold">
                                                    • {inside.text.replace(/\*\*(.*?)\*\*/g, (match, p1) => p1.toUpperCase())} <span className="text-gray-400 italic">({inside.source})</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'checklists' && (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {(Object.keys(checklists) as Array<keyof Checklists>).map(phase => (
                            <div key={phase} className="bg-white border-4 border-earth-black p-6 shadow-brutal">
                                <h3 className="text-xl font-black mb-4 uppercase">{phases.find(p => p.phase === phase)?.title || phase.toUpperCase()}</h3>
                                <div className="space-y-3">
                                    {checklists[phase].map(item => (
                                        <label key={item.id} className="flex items-start gap-3 p-2 bg-gray-50 rounded cursor-pointer hover:bg-guinea-yellow/30 transition-colors">
                                            <input type="checkbox" checked={item.done} onChange={() => toggleChecklistItem(phase, item.id)} className="mt-1 accent-warm-red flex-shrink-0" />
                                            <span className={`text-sm font-bold ${item.done ? 'line-through text-gray-400' : 'text-earth-black'}`}>{item.text}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'insides' && (
                    <div className="space-y-8">
                        <h3 className="text-4xl font-black mb-6 uppercase text-center text-earth-black">
                            <Lightbulb className="inline h-8 w-8 text-guinea-yellow" /> Secrets d'Insiders 2025
                        </h3>

                        <div className="grid md:grid-cols-2 gap-6">
                            {renderInsidesByCategory('general', '⚡ Généraux (Risques & Prépa)')}
                            {renderInsidesByCategory('negotiation', '⚖️ Négociation & Légalisation (OT)')}
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            {renderInsidesByCategory('refugee', '🫂 Réfugiés & Vulnérables (Urgence Hiver 2025)')}
                            {renderInsidesByCategory('daily_life', '🗓️ Vie Quotidienne & Long-Terme')}
                        </div>

                        <div className="bg-warm-red text-white border-4 border-earth-black p-6 rounded-xl shadow-brutal-red">
                            <h4 className="font-black mb-4 uppercase tracking-widest text-guinea-yellow flex items-center gap-2">
                                <MapPin className='h-4 w-4' /> Zones Clés à BXL
                            </h4>
                            <ul className="text-sm space-y-2 font-bold">
                                {brusselsDistricts.map(d => (
                                    <li key={d.id} className="border-l-2 border-white pl-3">
                                        <span className="text-guinea-yellow">{d.name} ({d.id})</span>: {d.notes}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

const ListChecks = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>
);

export default SquatSection;