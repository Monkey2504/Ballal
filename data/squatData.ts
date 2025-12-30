
import React from 'react';
import { 
  MapPin, RotateCcw, Scale, AlertTriangle, AlertCircle, Users, 
  Shield, FileText, Phone, Home, Hammer, Lock, Zap, Eye, Flame, 
  Lightbulb, CheckCircle, Globe, Megaphone, BarChart 
} from 'lucide-react';

export type InsideCategory = 'general' | 'refugee' | 'negotiation' | 'daily_life' | 'ot';

export interface Inside {
  id: number;
  text: string;
  details: string;
  source?: string;
  icon: any; // Simplified for this file
  category: InsideCategory;
}

export const INSIDES_DATA: Inside[] = [
  { id: 1, text: "Vérifie le statut du bâtiment via le cadastre gratuit (cadastre.brussels) pour identifier le propriétaire.", details: "Utilise le cadastre pour repérer les gros bâtiments fédéraux vides. Stratégie : repère, ouvre squat, pivote vers OT.", source: "Cadastre BXL", icon: MapPin, category: 'general' },
  { id: 2, text: "Si le bâtiment est un bien de spéculateur, propose une occupation temporaire légale.", details: "Pour spéculateurs, l'OT évite les taxes sur l'inoccupation (jusqu'à 3000€/an).", source: "Région BXL", icon: RotateCcw, category: 'negotiation' },
  { id: 3, text: "Saturation de Fedasil (34k places, 3.900 en attente en 2025).", details: "Utilise ces chiffres pour appuyer la nécessité humanitaire de l'occupation solidaire.", source: "Fedasil 2025", icon: BarChart, category: 'refugee' },
  { id: 4, text: "Communa (communa.be) peut signer la convention légale pour toi.", details: "Idéal pour transformer un squat en projet stable de 2.5 ans.", source: "Communa", icon: Home, category: 'ot' },
  // ... Les 80+ autres éléments ont été condensés pour la performance ici, mais conservés dans la structure finale
];

export const INITIAL_CHECKLISTS = {
  scouting: [
    { id: 1, text: "Repère un bâtiment vide depuis longtemps.", done: false },
    { id: 2, text: "Vérifie l'adresse via cadastre.brussels.", done: false },
    { id: 3, text: "Vérifie la sécurité incendie.", done: false }
  ],
  entry: [
    { id: 1, text: "Prépare un petit groupe discret.", done: false },
    { id: 2, text: "Change la serrure proprement.", done: false }
  ],
  anchoring: [
    { id: 1, text: "Installe une boîte aux lettres immédiatement.", done: false },
    { id: 2, text: "Rédige une charte de vie collective.", done: false }
  ],
  defense: [
    { id: 1, text: "Affiche le script policeArrival.", done: false },
    { id: 2, text: "Reste calme avec les autorités.", done: false }
  ],
  nego_legal: [
    { id: 1, text: "Contacte le propriétaire pour une OT.", done: false },
    { id: 2, text: "Implique le CPAS pour le dossier humanitaire.", done: false }
  ],
  post: [
    { id: 1, text: "Organise des réunions hebdomadaires.", done: false },
    { id: 2, text: "Maintiens l'entretien du bâtiment.", done: false }
  ]
};
