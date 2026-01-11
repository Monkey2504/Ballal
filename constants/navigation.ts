import { 
  Home as HomeIcon, 
  Tent as TentIcon, 
  Users as UsersIcon,
  Palette as CultureIcon,
  Zap as FestivalIcon,
  HeartHandshake as SolidarityIcon,
  Search as SearchIcon
} from 'lucide-react';
import { ViewState } from '../types.ts';

export const MAIN_NAV_ITEMS = [
  { label: "ACCUEIL", value: ViewState.HOME, icon: HomeIcon, color: "bg-earth-black", desc: "Retour à l'accueil" },
  { label: "ENTRAIDE", value: ViewState.SOLIDARITY_NETWORK, icon: SolidarityIcon, color: "bg-guinea-red", desc: "Besoin d'aide ou envie d'aider ?" },
  { label: "ANNUAIRE", value: ViewState.COMMUNITY, icon: SearchIcon, color: "bg-guinea-green", desc: "Commerces et services de la communauté." },
  { label: "LOGEMENT", value: ViewState.SQUAT, icon: TentIcon, color: "bg-guinea-yellow text-earth-black", desc: "Guide squat et occupations temporaires." },
  { label: "CULTURE", value: ViewState.CULTURE, icon: CultureIcon, color: "bg-purple-600", desc: "Histoire et patrimoine." },
  { label: "FESTIVAL", value: ViewState.FESTIVAL, icon: FestivalIcon, color: "bg-blue-600", desc: "Événements et festival des sans-papiers." },
];