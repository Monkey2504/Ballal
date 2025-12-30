
import { 
  Home as HomeIcon, 
  Handshake as HandshakeIcon, 
  Utensils as UtensilsIcon, 
  Tent as TentIcon, 
  Flag as FlagIcon, 
  Users as UsersIcon,
  Search as SearchIcon
} from 'lucide-react';
import { ViewState } from '../types.ts';

export const MAIN_NAV_ITEMS = [
  { label: "ACCUEIL", value: ViewState.HOME, icon: HomeIcon, color: "bg-earth-black", desc: "Retour à l'accueil" },
  { label: "ANNUAIRE", value: ViewState.COMMUNITY, icon: SearchIcon, color: "bg-guinea-green", desc: "Trouver les commerces et services guinéens." },
  { label: "ENTRAIDE", value: ViewState.SOLIDARITY_NETWORK, icon: HandshakeIcon, color: "bg-guinea-red", desc: "Solidarité directe entre membres." },
  { label: "LOGEMENT", value: ViewState.SQUAT, icon: TentIcon, color: "bg-guinea-yellow text-earth-black", desc: "Guide squat et occupations temporaires." },
  { label: "ÉQUIPE", value: ViewState.TEAM, icon: UsersIcon, color: "bg-blue-600", desc: "Le Conseil d'Administration de Ballal." },
];
