
import React, { useState } from 'react';
import {
  Siren, Hammer, X, ChevronDown, Search, Home, Shield, FileText, AlertTriangle, Lightbulb, MapPin,
  Clock, Users, Download, Copy, Phone, BookOpen, Camera, Lock, AlertCircle, CheckCircle, Globe,
  Megaphone, BarChart, Eye, Zap, Flame, RotateCcw, Scale, LayoutList, Share2, Info
} from 'lucide-react';
import { LanguageCode } from '../types.ts';

// Types
type TabType = 'manual' | 'checklists' | 'insides';
type PhaseType = 'scouting' | 'entry' | 'anchoring' | 'defense' | 'nego_legal' | 'post'; 
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
  source?: string;
  icon: React.ReactNode;
  category: InsideCategory;
  longText?: string;
}

interface PhaseInfo {
  phase: PhaseType;
  title: string;
  description: string;
  icon: React.ReactNode;
  duration: string;
  detail: {
    objective: string;
    tips: string[];
    insidesKeys: InsideCategory[];
  };
}

// Fix: Moved Building2 declaration before its usage in insidesData to resolve block-scoped variable usage before declaration error.
const Building2 = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/>
  </svg>
);

// Data: Insides
const insidesData: Inside[] = [
  { id: 1, text: "Vérifie le statut du bâtiment via le **cadastre gratuit** (cadastre.brussels) pour identifier le proprio et si c'est vide.", source: "Cadastre BXL", icon: <MapPin size={18} />, category: 'general', longText: "Le cadastre est votre premier outil de légitimité. En sachant exactement qui est le propriétaire (privé, public ou société écran), vous pouvez adapter votre discours. Un bâtiment appartenant à une société de spéculation immobilière est une cible idéale pour une défense basée sur l'intérêt social face au profit." },
  { id: 2, text: "Si le bâtiment est un bien de **spéculateur** (vide pour revendre), propose une occupation temporaire légale pour lui éviter les taxes sur inoccupation (jusqu'à 3.000€/an).", source: "Région BXL", icon: <RotateCcw size={18} />, category: 'negotiation', longText: "La taxe sur l'inoccupation est une épée de Damoclès pour les propriétaires à Bruxelles. Présentez votre occupation non pas comme un squat, mais comme un 'service de gardiennage actif'. Vous protégez le bâtiment contre le vandalisme et les dégradations naturelles, tout en évitant au propriétaire des amendes salées qui s'accumulent chaque mois." },
  { id: 3, text: "**Pivote vers l'occupation temporaire (OT)** dès le scouting. Contacte le proprio via cadastre pour une convention précaire (3-24 mois). 70% des proprios acceptent si tu gères l'entretien gratuit.", source: "Guichet OT/Perspective", icon: <Scale size={18} />, category: 'negotiation', longText: "L'OT est la version 'propre' du squat. En signant une convention précaire, vous obtenez une adresse légale, la possibilité de vous domicilier et l'accès garanti à l'eau et l'électricité. Pour le propriétaire, c'est l'assurance que son bien reste entretenu sans frais de gestion. C'est une stratégie gagnant-gagnant de plus en plus courante à Bruxelles." },
  { id: 4, text: "Priorise les bâtiments **FÉDÉRAUX ou RÉGIONAUX** vides depuis longtemps. C'est le meilleur moyen d'avoir un interlocuteur institutionnel.", source: "Stratégie Tactique", icon: <Building2 className="h-[18px] w-[18px]" />, category: 'general', longText: "Viser le domaine public (Régie des Bâtiments, SNCB, Communes) est un choix politique fort. Contrairement au privé qui cherche le profit, l'État a une obligation d'accueil. En occupant un bâtiment public vide, vous forcez les autorités à s'asseoir à la table des négociations pour transformer le lieu en centre d'accueil ou en logement conventionné. C'est là que le rapport de force est le plus légitime." },
  { id: 5, text: "Vérifie conformité **incendie/hygiène** avant entrée avec une app comme 'Habitools' (checklist gratuite). Si pas safe, abandonne.", source: "Habitools/FéBUL", icon: <Flame size={18} />, category: 'general', longText: "Votre sécurité physique passe avant l'abri. Un bâtiment insalubre peut causer des maladies respiratoires graves ou des accidents mortels. Utilisez Habitools pour lister les points critiques : stabilité des planchers, présence d'amiante, issues de secours bloquées. Si le lieu est un piège, ne prenez pas de risques inutiles." },
  { id: 6, text: "Prépare un **kit urgence** : Eau (jerrycans 20L), nourriture non-périssable (banques alimentaires à Molenbeek), et **Signal app** pour comms sécurisées.", source: "Expérience terrain", icon: <Lock size={18} />, category: 'general', longText: "Les premières 48h sont critiques. Vous ne pourrez peut-être pas sortir facilement. Prévoyez de l'eau en quantité suffisante, une batterie externe (Powerbank) chargée au max, et utilisez Signal pour communiquer : les groupes WhatsApp sont trop faciles à infiltrer ou à surveiller par les autorités locales." },
  { id: 7, text: "Explosion du **sans-abrisme** : +7.000 demandeurs d'asile sans-abri à BXL en 2025 (attente moyenne de 112 jours). Utilise ce chiffre pour négocier un angle humanitaire.", source: "FEANTSA/Fedasil 2025", icon: <BarChart size={18} />, category: 'refugee', longText: "Face à un juge ou à la police, montrez que votre acte est une réponse à la faillite de l'État. Citez les chiffres officiels : l'État belge est condamné des milliers de fois pour non-accueil. Votre occupation est un acte de survie face à une situation de force majeure documentée." },
  { id: 8, text: "Mentionne la **saturation de Fedasil** (34k places, 3.900 en attente août 2025) pour appuyer la nécessité de l'occupation solidaire.", source: "Fedasil Août 2025", icon: <Users size={18} />, category: 'refugee', longText: "La saturation de Fedasil est un fait public. En occupant un bâtiment, vous palliez le manque de places d'accueil officielles. C'est un argument de poids devant les tribunaux pour demander des délais d'occupation basés sur 'l'état de nécessité'." },
  { id: 9, text: "Les **sans-papiers** peuvent signer des conventions précaires (OT) : fournis des preuves de précarité au CPAS (attestation Fedasil) pour obtenir leur appui.", source: "PICUM/CIRÉ", icon: <FileText size={18} />, category: 'refugee', longText: "Même sans papiers belges, vous avez des droits humains fondamentaux. Une attestation de demande d'asile ou une preuve de suivi social par une ASBL reconnue permet au CPAS d'intervenir comme médiateur. Ne restez pas dans l'ombre juridique : la visibilité bien gérée est une protection." },
  { id: 10, text: "Hotline **CIRÉ** (+32 2 629 77 10) pour conseils gratuits en FR/EN/AR sur les droits des étrangers et sans-papiers.", source: "CIRÉ", icon: <Phone size={18} />, category: 'refugee', longText: "Le CIRÉ est une référence. Leurs juristes peuvent vous expliquer précisément les risques liés à l'expulsion selon votre statut administratif. Appelez-les avant toute action majeure pour sécuriser votre parcours de régularisation." },
  { id: 11, text: "Pour Palestiniens/Afghans/Syriens : Priorise occupations **près de Fedasil** (Rue des Champs, Anderlecht) pour accès aux aides.", source: "Réseaux d'asso", icon: <MapPin size={18} />, category: 'refugee', longText: "L'emplacement géographique est crucial pour les réfugiés. Être à proximité des centres d'aide permet de maintenir le lien administratif sans dépenser tout son budget en transports. Anderlecht et Molenbeek offrent le meilleur compromis entre bâtiments disponibles et services sociaux." },
  { id: 12, text: "**Plateforme Citoyenne** (+32 473 323 289) organise hébergements citoyens (40% des sans-abri asylum seekers en 2025).", source: "Plateforme Citoyenne", icon: <Users size={18} />, category: 'refugee', longText: "La Plateforme est un réseau de solidarité massif. Si un squat est expulsé, ils sont souvent les premiers à pouvoir proposer un hébergement d'urgence chez des particuliers pour les profils les plus vulnérables." },
  { id: 13, text: "Femmes/enfants vulnérables : Contacte **Pierre d'Angle** (+32 2 513 38 01) ou **Open Deur** pour abri d'urgence. Évite les squats mixtes pour la sécurité.", source: "Associations", icon: <Shield size={18} />, category: 'refugee', longText: "La sécurité des femmes et des enfants est primordiale. Les squats mixtes peuvent parfois être instables. Pierre d'Angle et Open Deur sont des structures spécialisées offrant un cadre sécurisé et des soins adaptés aux besoins spécifiques des familles et des femmes seules." },
  { id: 14, text: "Santé hiver 2025 : **Samusocial** (0800 99 340) pour nuits gratuites (appeler lundi 10h). **MSF Brussels** offre des check-ups walk-in pour PTSD (vendredis).", source: "Samusocial/MSF", icon: <AlertCircle size={18} />, category: 'refugee', longText: "En hiver, le risque d'hypothermie est réel dans les bâtiments mal isolés. Le Samusocial augmente ses capacités. MSF est essentiel pour le suivi psychologique : l'exil et l'occupation sont des facteurs de stress post-traumatique qu'il ne faut pas négliger." },
  { id: 15, text: "**Communa** (communa.be) peut signer la convention légale d'occupation (pas squat) pour toi, moyenne 2.5 ans de durée.", source: "Communa", icon: <Home size={18} />, category: 'negotiation', longText: "Communa agit comme un 'chapeau' juridique. Ils louent ou occupent le bâtiment pour vous, gèrent l'assurance et la relation avec le propriétaire. Cela enlève un poids énorme aux occupants et permet de se concentrer sur le projet de vie collective." },
  { id: 16, text: "**Toestand.be** facilite les négociations gratuites pour projets socio-culturels impliquant des réfugiés.", source: "Toestand", icon: <Globe size={18} />, category: 'negotiation', longText: "Toestand transforme des lieux vides en espaces de création et de rencontre. Si vous avez une dimension culturelle dans votre occupation (atelier de couture, cuisine partagée), ils peuvent vous aider à légitimer votre présence auprès de la commune." },
  { id: 17, text: "Argumente sur les **taxes** : le proprio évite des amendes d'inoccupation (jusqu'à 12.500€ si récidive) et des dégradations.", source: "Région BXL", icon: <FileText size={18} />, category: 'negotiation', longText: "L'argent est le meilleur argument. Une amende de 12.500€ est un cauchemar pour un propriétaire. Votre présence est sa meilleure assurance contre cette amende. Proposez-lui de signer un document attestant que le lieu est 'habité et entretenu'." },
  { id: 18, text: "Propose de la **'préfiguration'** : tester des usages futurs (logement social) pour le quartier avant le projet définitif du proprio.", source: "Perspective BXL", icon: <Eye size={18} />, category: 'negotiation', longText: "La préfiguration est un concept d'urbanisme moderne. Au lieu de laisser un bâtiment vide pendant l'étude d'un projet de 3 ans, on y installe des usages temporaires. C'est très bien vu par la Région et peut mener à un soutien financier public pour votre collectif." },
  { id: 19, text: "Deux bâtiments **fédéraux** ouverts pour sans-abri hiver 2025 (BXL/Liège) : contacte Guichet OT (perspective.brussels) pour obtenir des subventions liées.", source: "Guichet OT", icon: <Hammer size={18} />, category: 'negotiation', longText: "Il existe des exceptions pour les bâtiments fédéraux si l'urgence hivernale est décrétée. Restez à l'écoute des annonces du Guichet OT qui gère ces dossiers de crise pour réorienter les collectifs vers des lieux sécurisés." },
  { id: 20, text: "Implique le **CPAS** dans la négociation pour l'appui aux réfugiés : ils peuvent aider à co-financer de petites améliorations.", source: "CPAS", icon: <Users size={18} />, category: 'negotiation', longText: "Le CPAS a un budget pour 'l'aide au logement'. Dans certains cas, ils peuvent financer l'achat de radiateurs d'appoint ou de matériel de cuisine pour un collectif de réfugiés en occupation conventionnée." },
  { id: 21, text: "La **mobilisation collective** (pétitions + manifs) reporte les expulsions (ex: squat asylum seekers reporté août 2025). Rejoins **Voix des Sans-Papiers** (voixsp1@hotmail.com).", source: "Collectif Voix SP", icon: <Megaphone size={18} />, category: 'negotiation', longText: "Une expulsion silencieuse est une expulsion facile. Faites du bruit. Impliquez les médias, les réseaux sociaux et les collectifs militants. Plus le coût politique de l'expulsion est élevé, plus vous avez de chances d'obtenir des délais." },
  { id: 22, text: "Télécharge le **guide FéBUL** (PDF 2020, valable 2025) pour des modèles de contrats précaires incluant des clauses humanitaires.", source: "FéBUL", icon: <Download size={18} />, category: 'negotiation', longText: "Ne réinventez pas la roue. FéBUL fournit des contrats types qui ont déjà été validés par des avocats. Ces documents incluent des protections pour les occupants et des garanties pour les propriétaires." },
  { id: 23, text: "Mets en place l'**inclusion anti-racisme** : quotas diversité et formations (via **Pigment vzw** : +32 466 247 278).", source: "Pigment vzw", icon: <CheckCircle size={18} />, category: 'daily_life', longText: "La vie en collectif peut être un défi. Pigment vzw aide à structurer le groupe pour éviter les dominations et les tensions raciales ou culturelles. Une communauté soudée est plus forte face aux pressions extérieures." },
  { id: 24, text: "Finances hybrides : utilise les **dons** et le 'pay what you can' lors d'événements publics pour couvrir les coûts (via **Toestand** pour la visibilité).", source: "Toestand/Expérience", icon: <Lightbulb size={18} />, category: 'daily_life', longText: "Une occupation coûte de l'argent (assurance, petites réparations). Ne comptez pas seulement sur vos poches. Organisez des dîners communautaires ou des ateliers artistiques à prix libre. C'est aussi une façon de s'intégrer dans le quartier." },
  { id: 25, text: "Utilise l'OT (3-6 mois) pour faire des demandes de **logements sociaux** (liste d'attente via **CAW Brussels** : 0800 13 500).", source: "CAW Brussels", icon: <Home size={18} />, category: 'daily_life', longText: "L'occupation n'est qu'une étape. Le but ultime est le logement stable. Le CAW vous aide à constituer vos dossiers de logement social dès votre arrivée en occupation légale. N'attendez pas la fin de la convention pour agir." },
  { id: 26, text: "Pour l'emploi, utilise le **guide PICUM 2025** qui aide les immigrants et réfugiés sans-papiers.", source: "PICUM 2025", icon: <BookOpen size={18} />, category: 'daily_life', longText: "Travailler en étant sans papiers est complexe mais vital. PICUM fournit des conseils sur les droits du travail et les opportunités d'économie solidaire pour subvenir à vos besoins pendant l'occupation." },
  { id: 27, text: "Évite la **gentrification** : choisis des quartiers populaires et implique les voisins pour des projets communautaires.", source: "Analyse urbaine", icon: <Users size={18} />, category: 'daily_life', longText: "Ne soyez pas perçus comme des envahisseurs. Intégrez-vous. Si les voisins voient que votre présence améliore la sécurité ou la convivialité du quartier, ils deviendront vos meilleurs défenseurs en cas de menace d'expulsion." },
  { id: 28, text: "Réseaux extra : **Myria** (+32 2 212 30 00) pour les droits ; **Vluchtelingenwerk** (+32 2 225 44 00) pour l'asile.", source: "Institutions", icon: <Phone size={18} />, category: 'daily_life', longText: "Gardez ces numéros en favoris. Myria est le centre fédéral de lutte contre la discrimination. Leurs experts peuvent intervenir si vos droits fondamentaux sont bafoués pendant votre parcours migratoire." },
];

const initialChecklists: Checklists = {
  scouting: [
    { id: 1, text: "Repère un bâtiment FÉDÉRAL ou RÉGIONAL vide depuis longtemps (fenêtres sales, pas de lumière).", done: false },
    { id: 2, text: "Vérifie si y'a pas de caméras ou alarmes visibles.", done: false },
    { id: 3, text: "Identifie l'interlocuteur institutionnel via le cadastre (SNCB, Communes, État).", done: false },
    { id: 4, text: "Vérifie la sécurité et la conformité incendie/hygiène (via 'Habitools' si possible).", done: false },
    { id: 5, text: "**Décide du statut : Occupation politique pour forcer le relogement ou OT.**", done: false }
  ],
  entry: [
    { id: 1, text: "Prépare un petit groupe discret (3-5 personnes max).", done: false },
    { id: 2, text: "Entre la nuit, **sans casser** quoi que ce soit de visible pour éviter le flagrant délit.", done: false },
    { id: 3, text: "Change la serrure proprement et **garde l'ancienne** pour preuve de non-effraction.", done: false },
    { id: 4, text: "Prépare le kit urgence et le contact média immédiat pour visibiliser l'action.", done: false }
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
    description: "Vise en priorité les locaux FÉDÉRAUX ou INSTITUTIONNELS vides.",
    icon: <Search size={24} />,
    duration: '2-7 jours',
    detail: {
      objective: "Identifier des bâtiments publics délaissés pour forcer une réponse des autorités (État/Régie des Bâtiments).",
      tips: [
        "Vérifie le proprio via cadastre.brussels. Si c'est 'État Belge' ou 'SNCB', c'est un levier politique massif.",
        "Marche dans le quartier, repère les sites institutionnels sans activité depuis plus de 6 mois.",
        "Plus le bâtiment est grand et visible, plus le dialogue institutionnel sera inévitable.",
      ],
      insidesKeys: ['general', 'negotiation']
    }
  },
  {
    phase: 'entry',
    title: 'PHASE 2 : ENTRÉE',
    description: 'Entrée stratégique pour forcer le relogement.',
    icon: <Lock size={24} />,
    duration: '1 nuit',
    detail: {
      objective: "Occupation sans dégradation d'un lieu public pour forcer l'État à prendre ses responsabilités d'accueil.",
      tips: [
        "L'entrée dans le domaine public est plus risquée mais garantit un interlocuteur politique.",
        "Ne dégrade rien : l'aspect 'non-effraction' est ta seule protection contre une expulsion immédiate.",
        "Garde les preuves que le lieu était délabré/vide avant ton arrivée.",
      ],
      insidesKeys: ['general']
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
      insidesKeys: ['daily_life']
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
      insidesKeys: ['negotiation']
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
      insidesKeys: ['negotiation', 'refugee']
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
      insidesKeys: ['daily_life', 'refugee']
    }
  }
];

const brusselsDistricts = [
  { id: '1070', name: 'Anderlecht', risk: 'faible', notes: 'Grands entrepôts vides, moins de pression – idéal pour débutants.' },
  { id: '1080', name: 'Molenbeek', risk: 'moyen', notes: 'Solidarité locale forte, bons réseaux pour réfugiés.' }
];

// --- SUB-COMPONENTS ---

const InsideDetailModal: React.FC<{ inside: Inside; onClose: () => void }> = ({ inside, onClose }) => (
  <div className="fixed inset-0 z-[400] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300">
    <div className="bg-white rounded-[3rem] max-w-2xl w-full border-8 border-earth-black shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-500">
      <div className="bg-earth-black p-10 text-white flex justify-between items-start">
        <div className="space-y-4">
          <div className="p-4 bg-guinea-yellow text-earth-black rounded-2xl inline-block shadow-lg">
            {inside.icon}
          </div>
          <h2 className="text-sm font-black uppercase tracking-[0.3em] text-guinea-yellow">Carte Tactique #{inside.id}</h2>
        </div>
        <button onClick={onClose} className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-white">
          <X size={28} />
        </button>
      </div>
      <div className="p-10 md:p-14 space-y-10">
        <div>
          <h3 className="text-3xl md:text-4xl font-serif font-black text-earth-black leading-tight mb-4">
            {inside.text.replace(/\*\*(.*?)\*\*/g, '$1')}
          </h3>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-gray-100 text-[10px] font-black uppercase tracking-widest text-gray-500 rounded-full">Source: {inside.source}</span>
            <span className="px-3 py-1 bg-guinea-red/10 text-[10px] font-black uppercase tracking-widest text-guinea-red rounded-full">Catégorie: {inside.category}</span>
          </div>
        </div>
        <div className="space-y-6">
          <h4 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 flex items-center gap-3">
             <Info size={14} className="text-guinea-red" /> ANALYSE & EXPLICATIONS
          </h4>
          <p className="text-lg font-medium text-gray-700 leading-relaxed italic">
            {inside.longText}
          </p>
        </div>
        <div className="pt-10 border-t-2 border-dashed border-gray-100 flex gap-4">
           <button onClick={() => { navigator.clipboard.writeText(`${inside.text} - Source: ${inside.source}`); alert("Conseil copié !"); }} className="flex-1 bg-guinea-green text-white py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:scale-105 transition-transform flex items-center justify-center gap-3 shadow-lg">
             <Copy size={16} /> Copier le conseil
           </button>
           <button onClick={onClose} className="px-10 py-5 bg-gray-100 text-gray-500 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-gray-200 transition-colors">
             Fermer
           </button>
        </div>
      </div>
    </div>
  </div>
);

const EmergencyModal: React.FC<{ onClose: () => void; tacticalScripts: Record<string, string>; copiedItem: string | null; handleCopyScript: (key: string) => void }> = ({ onClose, tacticalScripts, copiedItem, handleCopyScript }) => (
  <div className="fixed inset-0 z-[300] bg-black/95 flex items-center justify-center p-4">
    <div className="bg-white rounded-3xl max-w-2xl w-full p-8 relative">
      <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full">
        <X size={24} />
      </button>
      <h2 className="text-3xl font-black mb-8 text-center uppercase tracking-tight">🚨 Scripts d'urgence</h2>
      <div className="space-y-4">
        {Object.entries(tacticalScripts).map(([key, script]) => (
          <div key={key} className="border rounded-xl p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold uppercase text-xs">{key}</h3>
              <button onClick={() => handleCopyScript(key)} className="text-xs font-bold text-red-600">
                {copiedItem === key ? 'COPIÉ' : 'COPIER'}
              </button>
            </div>
            <p className="text-sm font-mono bg-gray-50 p-3 rounded">{script}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const PhaseSelector: React.FC<{ phases: PhaseInfo[]; activePhase: PhaseType; setActivePhase: (phase: PhaseType) => void }> = ({ phases, activePhase, setActivePhase }) => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
    {phases.map(p => (
      <button key={p.phase} onClick={() => setActivePhase(p.phase)} className={`p-4 border-4 transition-all text-center ${activePhase === p.phase ? 'border-warm-red bg-guinea-yellow shadow-brutal-red scale-105' : 'border-earth-black bg-white opacity-60'}`}>
        <div className="mb-2 text-warm-red flex justify-center">{p.icon}</div>
        <h3 className="text-[10px] font-black uppercase">{p.title.split(':')[0]}</h3>
      </button>
    ))}
  </div>
);

const PhaseDetail: React.FC<{ phaseData: PhaseInfo; checklists: Checklists; toggleChecklistItem: (phase: keyof Checklists, id: number) => void }> = ({ phaseData, checklists, toggleChecklistItem }) => (
  <div className="bg-white border-4 border-earth-black p-8 shadow-brutal animate-in fade-in slide-in-from-bottom-4">
    <h2 className="text-3xl font-black mb-6 uppercase flex items-center gap-3">
      <span className="text-warm-red">{phaseData.icon}</span>
      {phaseData.title}
    </h2>
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <h3 className="font-black text-sm uppercase mb-4 flex items-center gap-2">
          <LayoutList className='h-4 w-4 text-earth-black' /> Checklist ({phaseData.duration})
        </h3>
        <div className="space-y-2">
          {checklists[phaseData.phase]?.map(item => (
            <label key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl cursor-pointer">
              <input type="checkbox" checked={item.done} onChange={() => toggleChecklistItem(phaseData.phase, item.id)} className="accent-warm-red" />
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
          {phaseData.detail.tips.map((tip, i) => <li key={`tip-${i}`}>• {tip}</li>)}
          {getInsidesForPhase(phaseData.phase).slice(0, 3).map(inside => (
            <li key={`inside-${inside.id}`} className="mt-2 text-guinea-yellow font-bold">
              • {inside.text.replace(/\*\*(.*?)\*\*/g, (match, p1) => p1.toUpperCase())} <span className="text-gray-400 italic">({inside.source})</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

const getInsidesForPhase = (phase: PhaseType) => {
  const phaseData = phases.find(p => p.phase === phase);
  if (!phaseData) return [];
  return insidesData.filter(inside => phaseData.detail.insidesKeys.includes(inside.category));
};

// --- MAIN SECTION COMPONENT ---

const SquatSection: React.FC<SquatSectionProps> = ({ language = 'fr' }) => {
  const [activeTab, setActiveTab] = useState<TabType>('manual');
  const [activePhase, setActivePhase] = useState<PhaseType>('scouting');
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [checklists, setChecklists] = useState<Checklists>(initialChecklists);
  const [selectedInside, setSelectedInside] = useState<Inside | null>(null);

  const tacticalScripts = {
    policeArrival: `⚠️ DIS SIMPLEMENT : "Ceci est notre domicile privé. Nous refusons l'entrée sans mandat (Art. 15 Const.). Appelez nos services sociaux ou notre avocat."`,
    ownerNegotiation: `📝 DIS : "Nous occupons ce lieu pour notre survie. Nous sommes ouverts à une convention d'Occupation Temporaire (OT) pour entretenir votre bien."`,
    communePoliceNegotiation: `📝 ARGUMENT : "L'occupation d'un bâtiment PUBLIC forcé l'État à assumer son obligation d'accueil. Nous attendons un dialogue institutionnel."`,
  };

  const toggleChecklistItem = (phase: keyof Checklists, id: number) => {
    setChecklists(prev => ({
      ...prev,
      [phase]: prev[phase].map(item =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    }));
  };

  const handleCopyScript = async (scriptKey: string) => {
    try {
      await navigator.clipboard.writeText(tacticalScripts[scriptKey as keyof typeof tacticalScripts]);
      setCopiedItem(scriptKey);
      setTimeout(() => setCopiedItem(null), 2000);
    } catch (err) {
      console.error('Erreur copie:', err);
    }
  };

  const renderInsidesByCategory = (category: InsideCategory, title: string) => {
    const filteredInsides = insidesData.filter(i => i.category === category);
    if (filteredInsides.length === 0) return null;

    return (
      <div className="bg-white border-4 border-earth-black p-10 shadow-brutal rounded-[3rem]">
        <h4 className="text-2xl font-black mb-8 uppercase text-guinea-red flex items-center gap-4">
          <div className="h-1 flex-grow bg-guinea-red/10 rounded-full"></div>
          {title}
          <div className="h-1 flex-grow bg-guinea-red/10 rounded-full"></div>
        </h4>
        <div className="grid gap-4">
          {filteredInsides.map(inside => (
            <button key={inside.id} onClick={() => setSelectedInside(inside)} className="p-6 bg-gray-50 border-2 border-transparent hover:border-earth-black hover:bg-white hover:scale-[1.02] transition-all text-left rounded-3xl group flex items-start gap-5">
              <div className="p-3 bg-white border border-gray-100 rounded-2xl group-hover:bg-guinea-yellow group-hover:text-earth-black transition-colors shrink-0">
                 {inside.icon}
              </div>
              <div className="space-y-2">
                <p className="font-bold text-earth-black leading-relaxed">
                  {inside.text.split('**').map((part, i) => i % 2 === 1 ? <span key={i} className="text-guinea-red uppercase">{part}</span> : part)}
                </p>
                <div className="flex items-center gap-2">
                   <span className="text-[9px] font-black uppercase text-gray-400 tracking-widest">{inside.source}</span>
                   <span className="text-[9px] font-bold text-guinea-red underline decoration-dotted opacity-0 group-hover:opacity-100 transition-opacity">CLIQUEZ POUR LE DÉTAIL TACTIQUE</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  };

  const currentPhaseData = phases.find(p => p.phase === activePhase);

  return (
    <div className="min-h-screen bg-soft-paper pb-20 font-sans">
      {emergencyMode && <EmergencyModal onClose={() => setEmergencyMode(false)} tacticalScripts={tacticalScripts} copiedItem={copiedItem} handleCopyScript={handleCopyScript} />}
      {selectedInside && <InsideDetailModal inside={selectedInside} onClose={() => setSelectedInside(null)} />}
      <header className="pt-32 pb-16 px-6 text-center max-w-5xl mx-auto">
        <div className="inline-block px-5 py-2 bg-guinea-red text-white font-black text-[10px] uppercase tracking-[0.4em] mb-6 rounded-full shadow-lg">Protection • Dignité • Logement</div>
        <h1 className="text-7xl md:text-[120px] font-serif font-black mb-8 uppercase tracking-tighter leading-[0.8]">GUIDE <span className="text-guinea-red">SQUAT</span> <br/><span className="text-earth-black">BALLAL</span> BXL</h1>
        <p className="text-xl md:text-2xl text-gray-500 max-w-3xl mx-auto font-medium italic leading-relaxed">"Priorisez le domaine public pour forcer l'État à ses obligations d'accueil."</p>
        <div className="flex flex-wrap justify-center gap-4 mt-12">
          <button onClick={() => setEmergencyMode(true)} className="bg-guinea-red text-white px-10 py-5 rounded-full font-black uppercase tracking-widest border-4 border-earth-black shadow-brutal hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all flex items-center gap-3"><Zap className="animate-pulse" /> SCRIPT URGENCE POLICE</button>
          <a href="tel:080013500" className="bg-white text-earth-black px-10 py-5 rounded-full font-black uppercase tracking-widest border-4 border-earth-black shadow-brutal hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all flex items-center gap-3"><Phone /> APPEL CAW (LOGEMENT)</a>
        </div>
      </header>
      <nav className="flex justify-center mb-16 px-6 max-w-4xl mx-auto sticky top-24 z-[100]">
        <div className="flex bg-white/80 backdrop-blur-md p-2 rounded-[2.5rem] border-4 border-earth-black shadow-brutal-thin w-full overflow-x-auto no-scrollbar">
          {['manual', 'checklists', 'insides'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab as TabType)} className={`flex-1 min-w-[120px] px-8 py-5 rounded-[2rem] font-black text-[11px] uppercase tracking-[0.2em] transition-all whitespace-nowrap ${activeTab === tab ? 'bg-earth-black text-white shadow-xl' : 'text-gray-400 hover:text-earth-black'}`}>{tab === 'manual' ? '🛡️ Manuel Phases' : tab === 'checklists' ? '✅ Listes Tactiques' : '💡 Secrets Insiders'}</button>
          ))}
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-6">
        {activeTab === 'manual' && (
          <div className="space-y-12 animate-in fade-in duration-700">
            <PhaseSelector phases={phases} activePhase={activePhase} setActivePhase={setActivePhase} />
            {currentPhaseData && <PhaseDetail phaseData={currentPhaseData} checklists={checklists} toggleChecklistItem={toggleChecklistItem} />}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
               {[{ label: "Sans-Abri BXL 2025", val: "+7.000", color: "text-guinea-red" }, { label: "Saturation Fedasil", val: "100%", color: "text-guinea-red" }, { label: "Attente Moyenne", val: "112J", color: "text-guinea-yellow" }, { label: "Réussite Nego OT", val: "70%", color: "text-guinea-green" }].map((s, i) => (
                 <div key={i} className="bg-white p-6 rounded-3xl border-2 border-gray-100 flex flex-col items-center"><span className={`text-3xl font-black mb-1 ${s.color}`}>{s.val}</span><span className="text-[9px] font-black uppercase text-gray-400 tracking-widest">{s.label}</span></div>
               ))}
            </div>
          </div>
        )}
        {activeTab === 'checklists' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in duration-700">
            {(Object.keys(checklists) as Array<keyof Checklists>).map(phase => (
              <div key={phase} className="bg-white border-4 border-earth-black p-8 rounded-[3rem] shadow-brutal hover:scale-[1.01] transition-transform">
                <div className="flex items-center gap-4 mb-8"><div className="p-3 bg-guinea-red/10 text-guinea-red rounded-2xl">{phases.find(p => p.phase === phase)?.icon || <CheckCircle />}</div><h3 className="text-xl font-black uppercase tracking-tight text-earth-black">{phases.find(p => p.phase === phase)?.title.split(':')[1].trim() || phase.toUpperCase()}</h3></div>
                <div className="space-y-4">{checklists[phase].map(item => (<label key={item.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl cursor-pointer hover:bg-guinea-yellow/10 transition-colors group"><input type="checkbox" checked={item.done} onChange={() => toggleChecklistItem(phase, item.id)} className="mt-1 h-5 w-5 accent-guinea-red flex-shrink-0" /><span className={`text-sm font-bold leading-relaxed ${item.done ? 'line-through text-gray-400' : 'text-earth-black group-hover:text-guinea-red'}`}>{item.text}</span></label>))}</div>
              </div>
            ))}
          </div>
        )}
        {activeTab === 'insides' && (
          <div className="space-y-12 animate-in fade-in duration-700">
            <div className="text-center mb-16 space-y-4"><h2 className="text-4xl md:text-6xl font-serif font-black uppercase tracking-tighter">Le Savoir <span className="text-guinea-red">Terrain</span> 2025</h2><p className="text-gray-500 font-medium italic">"Cliquez sur un conseil pour accéder à l'analyse tactique détaillée."</p></div>
            <div className="grid lg:grid-cols-2 gap-10">{renderInsidesByCategory('general', '⚡ Préparation & Risques')}{renderInsidesByCategory('negotiation', '⚖️ Négocier & Légaliser (OT)')}</div>
            <div className="grid lg:grid-cols-2 gap-10">{renderInsidesByCategory('refugee', '🫂 Réfugiés & Vulnérables')}{renderInsidesByCategory('daily_life', '🗓️ Vie Quotidienne')}</div>
          </div>
        )}
      </main>
      <div className="mt-32 h-20 african-pattern opacity-10"></div>
    </div>
  );
};

export default SquatSection;
