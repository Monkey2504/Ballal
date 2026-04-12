import {
  Home as HomeIcon,
  Tent as TentIcon,
  Palette as CultureIcon,
  Star as StarIcon,
  Users as UsersIcon
} from 'lucide-react';
import { ViewState } from '../types.ts';

export const MAIN_NAV_ITEMS = [
  { label: "ACCUEIL",    value: ViewState.HOME,          icon: HomeIcon,    color: "bg-earth-black",                   desc: "Retour à l'accueil" },
  { label: "LOGEMENT",   value: ViewState.SQUAT,         icon: TentIcon,    color: "bg-earth-black",                   desc: "Guide squat et occupations." },
  { label: "CULTURE",    value: ViewState.CULTURE,       icon: CultureIcon, color: "bg-purple-600",                    desc: "Histoire et patrimoine." },
  { label: "ÉQUIPE",     value: ViewState.TEAM,          icon: UsersIcon,   color: "bg-blue-600",                      desc: "Le Conseil d'Administration de Ballal." },
  { label: "FONDATEURS", value: ViewState.FOUNDERS_WALL, icon: StarIcon,    color: "bg-guinea-yellow text-earth-black", desc: "200 fondateurs · 200 € · Un entrepôt pour le collectif." },
];
