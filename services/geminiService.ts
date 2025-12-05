import { GoogleGenAI } from "@google/genai";
import { CommunityEvent } from '../types';

// The API key must be obtained exclusively from the environment variable process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

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

// --- MOCK DATA (UPDATED) ---

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

// --- CACHING & DEDUP UTILS ---
const CACHE_PREFIX = 'ballal_cache_v3_';
const QUOTA_ERROR_MARKER = 'ballal_quota_exceeded';
const pendingRequests: Record<string, Promise<any>> = {};

const getCached = <T>(key: string): T | null => {
  try {
    const cached = sessionStorage.getItem(CACHE_PREFIX + key);
    if (cached) return JSON.parse(cached);
  } catch (e) { return null; }
  return null;
};

const setCached = (key: string, data: any) => {
  try {
    sessionStorage.setItem(CACHE_PREFIX + key, JSON.stringify(data));
  } catch (e) {}
};

const isQuotaExceededRaw = () => {
  try {
    return sessionStorage.getItem(QUOTA_ERROR_MARKER) === 'true';
  } catch { return false; }
};

const markQuotaExceeded = () => {
  try {
    console.warn("Global Quota Exceeded detected - switching to offline mode for this session.");
    sessionStorage.setItem(QUOTA_ERROR_MARKER, 'true');
  } catch {}
};

const isQuotaError = (e: any) => {
  const msg = e?.message || JSON.stringify(e);
  return msg.includes('429') || msg.includes('quota') || msg.includes('RESOURCE_EXHAUSTED') || e?.status === 429;
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function retryWithBackoff<T>(
  operation: () => Promise<T>,
  retries: number = 3,
  backoff: number = 1000,
  name: string = 'Operation'
): Promise<T> {
  try {
    return await operation();
  } catch (error: any) {
    if (isQuotaError(error) || error?.status === 400 || error?.status === 403) {
      throw error;
    }
    if (retries <= 0) {
      console.warn(`[${name}] Failed after all retries. Last error: ${error.message}`);
      throw error;
    }
    const jitter = Math.random() * 200;
    const waitTime = backoff + jitter;
    await delay(waitTime);
    return retryWithBackoff(operation, retries - 1, backoff * 1.5, name);
  }
}

const fetchWithDedup = async <T>(key: string, fetcher: () => Promise<T>): Promise<T> => {
  const cached = getCached<T>(key);
  if (cached) return cached;

  if (pendingRequests[key]) {
    return pendingRequests[key];
  }

  const promise = fetcher().then(data => {
    if (data !== null && data !== undefined) setCached(key, data);
    delete pendingRequests[key];
    return data;
  }).catch(err => {
    delete pendingRequests[key];
    throw err;
  });

  pendingRequests[key] = promise;
  return promise;
};

const cleanAndParseJSON = (text: string): any => {
  try {
    if (!text) return null;
    const jsonArrayMatch = text.match(/\[\s*\{[\s\S]*\}\s*\]/);
    if (jsonArrayMatch) return JSON.parse(jsonArrayMatch[0]);
    const jsonObjectMatch = text.match(/\{[\s\S]*\}/);
    if (jsonObjectMatch) return JSON.parse(jsonObjectMatch[0]);
    const cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleaned);
  } catch (e) {
    console.error("JSON Parsing Failed. Raw text sample:", text.substring(0, 50) + "...");
    return null;
  }
};

// Fallback mapping if AI forgets visual_topic
const mapCategoryToTopic = (category: string): string => {
    const c = category?.toUpperCase() || '';
    if (c.includes('POLITIQUE') || c.includes('POLITI')) return 'POLITICS';
    if (c.includes('SPORT') || c.includes('FOOT') || c.includes('MATCH')) return 'SOCCER';
    if (c.includes('ECONOM') || c.includes('MINE') || c.includes('FINANCE') || c.includes('ARGENT')) return 'ECONOMY';
    if (c.includes('CULTURE') || c.includes('ART') || c.includes('MUSIQUE') || c.includes('CONCERT')) return 'CULTURE';
    if (c.includes('JUSTICE') || c.includes('TRIBUNAL') || c.includes('DROIT')) return 'JUSTICE';
    if (c.includes('SANTE') || c.includes('SANTÉ') || c.includes('HOPITAL') || c.includes('MALADIE')) return 'HEALTH';
    return 'SOCIETY';
};

export const fetchCommunityEvents = async (): Promise<CommunityEvent[]> => {
    if (!process.env.API_KEY || isQuotaExceededRaw()) return getMockEvents();

    return fetchWithDedup('events_v3', async () => {
        try {
            return await retryWithBackoff(async () => {
                const response = await ai.models.generateContent({
                    model: "gemini-2.5-flash",
                    contents: `Trouve des événements pour la diaspora guinéenne en Belgique (Bruxelles/Liège) ou des événements africains majeurs à venir.
                    Priorité aux événements réels futurs (Concerts, Conférences, Fêtes nationales). Si rien de spécifique, propose des événements génériques réalistes (Réunion mensuelle, Permanence, etc.).
                    
                    Format JSON strict :
                    [
                      {
                        "id": "string",
                        "title": "string",
                        "date": "string",
                        "location": "string",
                        "description": "string",
                        "type": "Meetup" | "Fête" | "Culture" | "Business" | "Sport",
                        "visual_topic": "SOCIETY" | "CULTURE" | "ECONOMY" | "SOCCER"
                      }
                    ]`,
                    config: { tools: [{googleSearch: {}}] }
                });

                const rawEvents = cleanAndParseJSON(response.text || '');
                
                const events = Array.isArray(rawEvents) ? rawEvents.map((event: any) => ({
                  ...event,
                  imageUrl: getRandomImageForTopic(event.visual_topic || mapCategoryToTopic(event.type))
                })) : getMockEvents();

                if (events.length === 0) throw new Error("Invalid events format");
                return events;
            }, 3, 1000, 'fetchCommunityEvents');
        } catch (error) {
            console.error("Events Fetch Failed (Fallback used):", error);
            if (isQuotaError(error)) markQuotaExceeded();
            return getMockEvents();
        }
    });
};

export interface HeroImageResult {
    imageUrl: string;
    label: string | null;
}

export const fetchHeroImage = async (): Promise<HeroImageResult> => {
    if (!process.env.API_KEY || isQuotaExceededRaw()) return FALLBACK_HERO;
    return FALLBACK_HERO;
};
