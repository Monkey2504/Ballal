import { type LucideIcon, Scale, Home, Utensils, Users, BookOpen } from 'lucide-react';
import { ViewState } from '../types.ts';

export interface Program {
  view: ViewState;
  icon: LucideIcon;
  borderColor: string;
  iconBg: string;
  iconColor: string;
  label: string;
  desc: string;
}

export const PROGRAMS: Program[] = [
  {
    view:        ViewState.LEGAL_AID,
    icon:        Scale,
    borderColor: 'var(--crimson)',
    iconBg:      'bg-guinea-red/10',
    iconColor:   'text-guinea-red',
    label:       'Droits & Juridique',
    desc:        "Votre domicile est protégé par la Constitution. Articles 9bis/9ter, scripts d'urgence, régularisation — nous vous outillons pour vous défendre.",
  },
  {
    view:        ViewState.SQUAT,
    icon:        Home,
    borderColor: 'var(--ink)',
    iconBg:      'bg-ink/10',
    iconColor:   'text-ink',
    label:       'Logement',
    desc:        "Nous gérons directement plusieurs occupations solidaires à Bruxelles depuis des années. Pas des conseils de l'extérieur — une présence physique, sur place, chaque jour.",
  },
  {
    view:        ViewState.FOOD_AUTONOMY,
    icon:        Utensils,
    borderColor: 'var(--emerald)',
    iconBg:      'bg-guinea-green/10',
    iconColor:   'text-guinea-green',
    label:       'Autonomie Alimentaire',
    desc:        "Chaque semaine, nous transformons les invendus en repas. Réseau de fournisseurs et cuisines collectives à Bruxelles.",
  },
  {
    view:        ViewState.SOLIDARITY_NETWORK,
    icon:        Users,
    borderColor: 'var(--gold)',
    iconBg:      'bg-guinea-yellow/20',
    iconColor:   'text-[#8B7000]',
    label:       'Entraide',
    desc:        "Trouver du travail, comprendre un document, naviguer dans les administrations — quelqu'un qui est passé par là change tout. C'est ce que nous faisons.",
  },
  {
    view:        ViewState.CULTURE,
    icon:        BookOpen,
    borderColor: 'var(--ink)',
    iconBg:      'bg-ink/10',
    iconColor:   'text-ink',
    label:       'Culture & Histoire',
    desc:        "La culture est notre levier politique. Elle nous rend visibles, renforce notre voix et nous permet d'aller plus loin encore dans ce que nous construisons.",
  },
];
