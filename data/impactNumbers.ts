export interface ImpactNumber {
  value: string;
  label: string;
  accent: string;
}

export const IMPACT_NUMBERS: ImpactNumber[] = [
  { value: '15 000+', label: 'Guinéens en Belgique',  accent: 'var(--crimson)' },
  { value: '5',       label: 'Programmes actifs',      accent: 'var(--gold)'    },
  { value: '3',       label: "Langues d'assistance",   accent: 'var(--emerald)' },
  { value: '24h',     label: "Ligne d'urgence",        accent: 'var(--crimson)' },
];
