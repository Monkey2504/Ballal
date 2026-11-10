export interface ImpactNumber {
  value: string;
  label: string;
  accent: string;
}

export const IMPACT_NUMBERS: ImpactNumber[] = [
  { value: '130',     label: 'Personnes accompagnées', accent: 'var(--crimson)' },
  { value: '5',       label: 'Programmes actifs',      accent: 'var(--gold)'    },
  { value: '3',       label: "Langues d'assistance",   accent: 'var(--emerald)' },
  { value: '1',       label: 'Permanence par semaine', accent: 'var(--crimson)' },
];
