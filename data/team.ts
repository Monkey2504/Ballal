export interface TeamMember {
  name: string;
  bio: string;
  img: string;
  accent: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  { name: "Thierno I. T. Diallo", bio: "Président fondateur",    img: "https://i.imgur.com/T2LT1pB.png", accent: "var(--crimson)" },
  { name: "Bah Ibrahim",          bio: "Resp. des opérations",   img: "https://i.imgur.com/l3UdDov.png", accent: "var(--gold)"    },
  { name: "Kadiatou Sow",         bio: "Secrétaire",             img: "https://i.imgur.com/THTzMBW.png", accent: "var(--emerald)" },
  { name: "Cissé Abdoulaye",      bio: "Trésorier",              img: "https://i.imgur.com/7FduSwY.png", accent: "var(--ink)"     },
  { name: "Francois Halleux",     bio: "Conseiller stratégique", img: "https://i.imgur.com/1qqkroP.png", accent: "var(--ink)"     },
];
