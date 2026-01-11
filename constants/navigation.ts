import { 
  Home as HomeIcon, 
  Tent as TentIcon, 
  Users as UsersIcon,
  Palette as CultureIcon,
  Zap as FestivalIcon
} from 'lucide-react';
import { ViewState } from '../types.ts';

export const MAIN_NAV_ITEMS = [
  { label: "ACCUEIL", value: ViewState.HOME, icon: HomeIcon, color: "bg-earth-black", desc: "Retour à l'accueil" },
  { label: "LOGEMENT", value: ViewState.SQUAT, icon: TentIcon, color: "bg-guinea-yellow text-earth-black", desc: "Guide squat et occupations temporaires." },
  { label: "CULTURE", value: ViewState.CULTURE, icon: CultureIcon, color: "bg-purple-600", desc: "Histoire et galerie de la communauté." },
  { label: "FESTIVAL", value: ViewState.FESTIVAL, icon: FestivalIcon, color: "bg-guinea-red", desc: "Le festival des sans-papiers." },
  { label: "ÉQUIPE", value: ViewState.TEAM, icon: UsersIcon, color: "bg-blue-600", desc: "Le Conseil d'Administration de Ballal." },
];