import { 
  Home as HomeIcon, 
  Tent as TentIcon, 
  Search as SearchIcon,
  Palette as CultureIcon,
  Zap as FestivalIcon,
  HeartHandshake as SolidarityIcon,
  Newspaper as NewsIcon
} from 'lucide-react';
import { ViewState } from '../types.ts';

export const MAIN_NAV_ITEMS = [
  { label: "ACCUEIL", value: ViewState.HOME, icon: HomeIcon, color: "bg-earth-black", desc: "Retour à l'accueil" },
  { label: "NEWS", value: ViewState.NEWS, icon: NewsIcon, color: "bg-guinea-yellow text-earth-black", desc: "L'actualité du pays et de la diaspora." },
  { label: "ENTRAIDE", value: ViewState.SOLIDARITY_NETWORK, icon: SolidarityIcon, color: "bg-guinea-red", desc: "Besoin d'aide ou envie d'aider ?" },
  { label: "ANNUAIRE", value: ViewState.COMMUNITY, icon: SearchIcon, color: "bg-guinea-green", desc: "Commerces et services." },
  { label: "LOGEMENT", value: ViewState.SQUAT, icon: TentIcon, color: "bg-earth-black", desc: "Guide squat et occupations." },
  { label: "CULTURE", value: ViewState.CULTURE, icon: CultureIcon, color: "bg-purple-600", desc: "Histoire et patrimoine." },
];