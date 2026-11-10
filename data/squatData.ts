
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
  { id: 1, text: "Vérifie le statut du bâtiment via le cadastre gratuit (cadastre.brussels) pour identifier le propriétaire.", details: "Le cadastre permet de repérer les grands bâtiments publics vides et de savoir à quel propriétaire écrire pour proposer une occupation temporaire.", source: "Cadastre BXL", icon: MapPin, category: 'general' },
  { id: 2, text: "Si le bâtiment est vide depuis longtemps, propose au propriétaire une occupation temporaire légale.", details: "Un bâtiment occupé avec une convention n'est plus soumis à la taxe sur les immeubles inoccupés : c'est un argument pour le propriétaire.", source: "Région BXL", icon: RotateCcw, category: 'negotiation' },
  { id: 3, text: "Saturation de Fedasil (34k places, 3.900 en attente en 2025).", details: "Ces chiffres montrent pourquoi les occupations solidaires répondent à un besoin humanitaire réel.", source: "Fedasil 2025", icon: BarChart, category: 'refugee' },
  { id: 4, text: "Communa (communa.be) peut signer la convention légale pour toi.", details: "Une convention donne un cadre stable, souvent pour deux ans ou plus.", source: "Communa", icon: Home, category: 'ot' },
];

export const INITIAL_CHECKLISTS = {
  scouting: [
    { id: 1, text: "Repère un bâtiment vide depuis longtemps.", done: false },
    { id: 2, text: "Vérifie l'adresse via cadastre.brussels.", done: false },
    { id: 3, text: "Vérifie la sécurité incendie.", done: false }
  ],
  entry: [
    { id: 1, text: "Écris au propriétaire pour proposer une occupation temporaire.", done: false },
    { id: 2, text: "Fais-toi accompagner par une association (Communa, FéBUL).", done: false }
  ],
  anchoring: [
    { id: 1, text: "Installe une boîte aux lettres immédiatement.", done: false },
    { id: 2, text: "Rédige une charte de vie collective.", done: false }
  ],
  defense: [
    { id: 1, text: "Affiche tes droits près de l'entrée (voir la page Droits).", done: false },
    { id: 2, text: "Reste calme avec les autorités.", done: false }
  ],
  nego_legal: [
    { id: 1, text: "Négocie la convention avec le propriétaire.", done: false },
    { id: 2, text: "Implique le CPAS pour le dossier humanitaire.", done: false }
  ],
  post: [
    { id: 1, text: "Organise des réunions hebdomadaires.", done: false },
    { id: 2, text: "Maintiens l'entretien du bâtiment.", done: false }
  ]
};
