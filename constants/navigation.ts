import {
  Home as HomeIcon,
  Tent as TentIcon,
  Palette as CultureIcon,
  HeartHandshake as SolidarityIcon,
} from 'lucide-react';
import { ViewState, ROUTE_MAP } from '../types.ts';

export const MAIN_NAV_ITEMS = [
  { label: "ACCUEIL",  value: ViewState.HOME,             path: ROUTE_MAP[ViewState.HOME],             icon: HomeIcon,        color: "bg-earth-black", desc: "Retour à l'accueil" },
  { label: "ENTRAIDE", value: ViewState.SOLIDARITY_NETWORK, path: ROUTE_MAP[ViewState.SOLIDARITY_NETWORK], icon: SolidarityIcon, color: "bg-guinea-red",  desc: "Besoin d'aide ou envie d'aider ?" },
  { label: "LOGEMENT", value: ViewState.SQUAT,            path: ROUTE_MAP[ViewState.SQUAT],            icon: TentIcon,        color: "bg-earth-black", desc: "Guide squat et occupations." },
  { label: "CULTURE",  value: ViewState.CULTURE,          path: ROUTE_MAP[ViewState.CULTURE],          icon: CultureIcon,     color: "bg-purple-600",  desc: "Histoire et patrimoine." },
];
