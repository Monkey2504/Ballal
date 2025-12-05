import { NewsItem, CommunityEvent } from '../types';

// --- SMART IMAGE BANK (HIGH QUALITY & DIVERSE) ---
// Banque d'images enrichie et diversifiée pour éviter les répétitions

const TOPIC_IMAGES: Record<string, string[]> = {
  POLITICS: [
    'https://images.unsplash.com/photo-1596521345347-160100d072f5?q=80&w=800&auto=format&fit=crop', // Conférence de presse (Microphones flous)
    'https://images.unsplash.com/photo-1529108190281-9a4f620bc2d8?q=80&w=800&auto=format&fit=crop', // Drapeau / Officiel
    'https://images.unsplash.com/photo-1555848962-6e79363ec58f?q=80&w=800&auto=format&fit=crop', // Vote / Urne
    'https://images.unsplash.com/photo-1541872703-74c5963631df?q=80&w=800&auto=format&fit=crop', // Bâtiment gouvernemental
    'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=800&auto=format&fit=crop' // Stylo et documents
  ],
  JUSTICE: [
    'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800&auto=format&fit=crop', // Marteau Juge
    'https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=800&auto=format&fit=crop', // Balance Justice
    'https://images.unsplash.com/photo-1589391886645-d51941baf7fb?q=80&w=800&auto=format&fit=crop', // Façade Tribunal
    'https://images.unsplash.com/photo-1453928582365-b6c57d2d040f?q=80&w=800&auto=format&fit=crop' // Code civil / Livres
  ],
  SOCCER: [
    'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=800&auto=format&fit=crop', // Ballon Foot sur herbe
    'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?q=80&w=800&auto=format&fit=crop', // Joueurs (flou)
    'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?q=80&w=800&auto=format&fit=crop', // Stade ambiance
    'https://images.unsplash.com/photo-1551958219-acbc608c6377?q=80&w=800&auto=format&fit=crop' // Equipe unie
  ],
  ECONOMY: [
    'https://images.unsplash.com/photo-1605218427368-35b0160d5c97?q=80&w=800&auto=format&fit=crop', // Port / Container
    'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?q=80&w=800&auto=format&fit=crop', // Finance / Monnaie
    'https://images.unsplash.com/photo-1565514020176-dbf2277f0c6e?q=80&w=800&auto=format&fit=crop', // Marché local
    'https://images.unsplash.com/photo-1526304640152-d4619684e485?q=80&w=800&auto=format&fit=crop', // Billets
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop' // Graphiques business
  ],
  MINING: [
    'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=800&auto=format&fit=crop', // Industrie / Usine
    'https://images.unsplash.com/photo-1595245863339-b9e7df18f2f6?q=80&w=800&auto=format&fit=crop', // Terre rouge / Bauxite
    'https://images.unsplash.com/photo-1516937941344-00b4e0337589?q=80&w=800&auto=format&fit=crop' // Machinerie
  ],
  CULTURE: [
    'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=800&auto=format&fit=crop', // Scène / Concert
    'https://images.unsplash.com/photo-1514525253440-b393452e8d26?q=80&w=800&auto=format&fit=crop', // Concert (lumières)
    'https://images.unsplash.com/photo-1519671482538-518b5c2bf7c6?q=80&w=800&auto=format&fit=crop', // Instruments musique
    'https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?q=80&w=800&auto=format&fit=crop' // Ambiance festive
  ],
  HEALTH: [
    'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=800&auto=format&fit=crop', // Médecin
    'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=800&auto=format&fit=crop', // Hôpital
    'https://images.unsplash.com/photo-1584036561566-b93a90a6b262?q=80&w=800&auto=format&fit=crop', // Soins
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop' // Recherche
  ],
  SOCIETY: [
    'https://images.unsplash.com/photo-1547619292-240402b5ae5d?q=80&w=800&auto=format&fit=crop', // Paysage Guinée
    'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop', // Solidarité
    'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?q=80&w=800&auto=format&fit=crop', // Discussion groupe
    'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?q=80&w=800&auto=format&fit=crop', // École
    'https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=800&auto=format&fit=crop' // Enfants
  ],
  DEFAULT: [
    'https://images.unsplash.com/photo-1547619292-240402b5ae5d?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?q=80&w=800&auto=format&fit=crop'
  ]
};

const getRandomImageForTopic = (topic: string | undefined): string => {
  const key = topic?.toUpperCase() || 'DEFAULT';
  const images = TOPIC_IMAGES[key] || TOPIC_IMAGES['DEFAULT'];
  // Utilise un random simple car c'est côté client
  const index = Math.floor(Math.random() * images.length);
  return images[index];
};

// --- MOCK DATA ---

const getMockNews = (): NewsItem[] => [
  {
    id: 'fallback-1',
    title: 'Transition : Le CNT adopte le volet budgétaire',
    summary: 'Les conseillers nationaux ont validé hier la loi de finances rectificative, mettant l\'accent sur les infrastructures routières.',
    category: 'Politique',
    date: 'Aujourd\'hui',
    source: 'Guineenews',
    imageUrl: getRandomImageForTopic('POLITICS')
  },
  {
    id: 'fallback-2',
    title: 'Syli National : Liste des convoqués dévoilée',
    summary: 'Le sélectionneur a publié la liste des 23 joueurs pour la prochaine trêve internationale. Quelques surprises en attaque.',
    category: 'Sport',
    date: 'Il y a 2h',
    source: 'Foot224',
    imageUrl: getRandomImageForTopic('SOCCER')
  },
  {
    id: 'fallback-3',
    title: 'Boké : Reprise des exportations de bauxite',
    summary: 'Après une brève interruption technique, le train minéralier a repris ses rotations vers le port de Kamsar.',
    category: 'Économie',
    date: 'Hier',
    source: 'Mines Guinée',
    imageUrl: getRandomImageForTopic('MINING')
  },
  {
    id: 'fallback-4',
    title: 'Concert géant sur l\'Esplanade',
    summary: 'Les stars de la musique urbaine guinéenne se sont produites devant une foule immense pour la paix.',
    category: 'Culture',
    date: 'Ce week-end',
    source: 'Africaguinee',
    imageUrl: getRandomImageForTopic('CULTURE')
  },
  {
    id: 'fallback-5',
    title: 'Justice : Ouverture du procès des événements',
    summary: 'Le tribunal de Dixinn a ouvert ce matin l\'audience tant attendue. Sécurité renforcée autour du tribunal.',
    category: 'Justice',
    date: 'Il y a 4h',
    source: 'Kaloumpresse',
    imageUrl: getRandomImageForTopic('JUSTICE')
  },
  {
    id: 'fallback-6',
    title: 'Rentrée scolaire : Les dates confirmées',
    summary: 'Le Ministère de l\'Enseignement Pré-Universitaire confirme la date de la rentrée et annonce de nouvelles mesures.',
    category: 'Société',
    date: 'Hier',
    source: 'MEPU-A',
    imageUrl: getRandomImageForTopic('SOCIETY')
  }
];

const getMockEvents = (): CommunityEvent[] => [
  {
    id: 'evt-fallback-1',
    title: 'Réunion Mensuelle BALLAL',
    date: 'Samedi prochain, 14h00',
    location: 'Bruxelles (Matonge)',
    description: 'Rencontre d\'accueil pour les nouveaux arrivants et point sur les dossiers juridiques en cours.',
    type: 'Meetup',
    imageUrl: getRandomImageForTopic('SOCIETY')
  },
  {
    id: 'evt-fallback-2',
    title: 'Grande Fête de l\'Indépendance',
    date: '2 Octobre, 18h00',
    location: 'Salle La Madeleine, Bruxelles',
    description: 'Célébration solennelle et festive de notre fête nationale. Tenue traditionnelle souhaitée.',
    type: 'Fête',
    imageUrl: getRandomImageForTopic('CULTURE')
  },
  {
    id: 'evt-fallback-3',
    title: 'Forum Business Guinée-Benelux',
    date: '15 du mois prochain, 09h00',
    location: 'Sheraton Brussels Airport',
    description: 'Networking pour les entrepreneurs de la diaspora. Opportunités d\'investissement au pays.',
    type: 'Business',
    imageUrl: getRandomImageForTopic('ECONOMY')
  },
  {
    id: 'evt-fallback-4',
    title: 'Tournoi de Foot Solidaire',
    date: 'Dimanche 24, 10h00',
    location: 'Stade de Schaerbeek',
    description: 'Match de gala entre les vétérans et la jeunesse. Les fonds iront à une école à Mamou.',
    type: 'Sport',
    imageUrl: getRandomImageForTopic('SOCCER')
  },
  {
    id: 'evt-fallback-5',
    title: 'Permanence Juridique Gratuite',
    date: 'Tous les mercredis, 14h-17h',
    location: 'Siège Ballal (Ixelles)',
    description: 'Consultations gratuites avec nos avocats partenaires pour vos dossiers de régularisation.',
    type: 'Meetup',
    imageUrl: getRandomImageForTopic('JUSTICE')
  },
  {
    id: 'evt-fallback-6',
    title: 'Soirée Contes et Légendes du Fouta',
    date: 'Vendredi soir, 19h30',
    location: 'Centre Culturel PianoFabriek',
    description: 'Une immersion dans notre patrimoine oral avec des conteurs venus spécialement de Labé.',
    type: 'Culture',
    imageUrl: getRandomImageForTopic('CULTURE')
  }
];

const FALLBACK_HERO = {
  imageUrl: "https://images.unsplash.com/photo-1547619292-240402b5ae5d?q=80&w=1600&auto=format&fit=crop",
  label: null
};

export interface NewsResult {
  articles: NewsItem[];
  sourceUrls: string[];
}

// --- STATIC SERVICE METHODS (NO API) ---

export const fetchLatestNews = async (language: string = 'fr'): Promise<NewsResult> => {
  // Retourne toujours les données mockées (statique)
  return { articles: getMockNews(), sourceUrls: [] };
};

export const fetchCommunityEvents = async (): Promise<CommunityEvent[]> => {
    // Retourne toujours les données mockées (statique)
    return getMockEvents();
};

export interface HeroImageResult {
    imageUrl: string;
    label: string | null;
}

export const fetchHeroImage = async (): Promise<HeroImageResult> => {
    return FALLBACK_HERO;
};