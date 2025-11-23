
import { GoogleGenAI } from "@google/genai";
import { NewsItem, CommunityEvent } from '../types';

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

// --- SMART IMAGE BANK (HIGH QUALITY & DIVERSE) ---
// Banque d'images classée par thèmes visuels précis pour éviter l'effet "générique"

const TOPIC_IMAGES: Record<string, string[]> = {
  POLITICS: [
    'https://images.unsplash.com/photo-1575320181282-9afab399332c?q=80&w=800&auto=format&fit=crop', // Microphones
    'https://images.unsplash.com/photo-1541872703-74c5963631df?q=80&w=800&auto=format&fit=crop', // Bâtiment officiel
    'https://images.unsplash.com/photo-1576670159805-381a9de1e2b9?q=80&w=800&auto=format&fit=crop', // Poignée de main
    'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=800&auto=format&fit=crop', // Documents/Stylo
    'https://images.unsplash.com/photo-1529108190281-9a4f620bc2d8?q=80&w=800&auto=format&fit=crop'  // Drapeau/Officiel
  ],
  JUSTICE: [
    'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800&auto=format&fit=crop', // Marteau juge
    'https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=800&auto=format&fit=crop', // Balance
    'https://images.unsplash.com/photo-1589391886645-d51941baf7fb?q=80&w=800&auto=format&fit=crop'  // Palais justice
  ],
  SOCCER: [
    'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=800&auto=format&fit=crop', // Ballon
    'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?q=80&w=800&auto=format&fit=crop', // Joueurs terrain
    'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?q=80&w=800&auto=format&fit=crop', // Stade foule
    'https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=800&auto=format&fit=crop'  // Action foot
  ],
  ECONOMY: [
    'https://images.unsplash.com/photo-1605218427368-35b0160d5c97?q=80&w=800&auto=format&fit=crop', // Port/Container
    'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?q=80&w=800&auto=format&fit=crop', // Argent/Finance
    'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=800&auto=format&fit=crop', // Industrie/Mines
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop'  // Graphiques
  ],
  MINING: [
     'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=800&auto=format&fit=crop', // Usine
     'https://images.unsplash.com/photo-1595245863339-b9e7df18f2f6?q=80&w=800&auto=format&fit=crop', // Terre rouge
     'https://images.unsplash.com/photo-1516937941344-00b4e0337589?q=80&w=800&auto=format&fit=crop'  // Industriel
  ],
  CULTURE: [
    'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=800&auto=format&fit=crop', // Scène
    'https://images.unsplash.com/photo-1514525253440-b393452e8d26?q=80&w=800&auto=format&fit=crop', // Artiste
    'https://images.unsplash.com/photo-1519671482538-518b5c2bf7c6?q=80&w=800&auto=format&fit=crop', // Instruments
    'https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=800&auto=format&fit=crop'  // Fête
  ],
  SOCIETY: [
    'https://images.unsplash.com/photo-1547619292-240402b5ae5d?q=80&w=800&auto=format&fit=crop', // Paysage Guinée
    'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop', // Groupe solidaire
    'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?q=80&w=800&auto=format&fit=crop', // Discussion
    'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?q=80&w=800&auto=format&fit=crop'  // Enfants/École
  ],
  DEFAULT: [
    'https://images.unsplash.com/photo-1547619292-240402b5ae5d?q=80&w=800&auto=format&fit=crop'
  ]
};

const getRandomImageForTopic = (topic: string | undefined): string => {
  const key = topic?.toUpperCase() || 'DEFAULT';
  const images = TOPIC_IMAGES[key] || TOPIC_IMAGES['DEFAULT'];
  // Utilise le temps actuel pour pseudo-randomiser mais garder une constance si appelé en boucle rapide
  const index = Math.floor(Math.random() * images.length);
  return images[index];
};

// --- MOCK DATA (UPDATED) ---

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

export interface NewsResult {
  articles: NewsItem[];
  sourceUrls: string[];
}

export const fetchLatestNews = async (language: string = 'fr'): Promise<NewsResult> => {
  if (!apiKey || isQuotaExceededRaw()) return { articles: getMockNews(), sourceUrls: [] };

  const cacheKey = `news_${language}_v3`;

  return fetchWithDedup(cacheKey, async () => {
    try {
      return await retryWithBackoff(async () => {
        // Prompt optimisé pour la qualité et les images
        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: `Agis comme un rédacteur en chef expert sur la Guinée (Conakry).
          Cherche les 6 actualités MAJEURES et VÉRIFIÉES des dernières 48 heures.
          
          Règles strictes :
          1. Pas de rumeurs, que des faits.
          2. Cite la source principale (ex: Guineenews, Africaguinee, RFI).
          3. Assigne un 'visual_topic' précis pour l'illustration.
          
          Langue de réponse : ${language === 'fr' ? 'Français' : language === 'en' ? 'Anglais' : language === 'ar' ? 'Arabe' : 'Français'}.
          
          Format JSON strict (Tableau) :
          [
            {
              "id": "string",
              "title": "string (Titre accrocheur et court)",
              "summary": "string (Résumé informatif max 25 mots)",
              "category": "Politique" | "Culture" | "Sport" | "Économie" | "Société" | "Justice",
              "date": "string (ex: 'Il y a 2h', 'Ce matin')",
              "source": "string (Nom du média source)",
              "visual_topic": "POLITICS" | "SOCCER" | "ECONOMY" | "CULTURE" | "JUSTICE" | "SOCIETY" | "MINING"
            }
          ]`,
          config: { tools: [{googleSearch: {}}] }
        });

        const rawArticles = cleanAndParseJSON(response.text || '') || getMockNews();
        
        // Enrichissement intelligent des images
        const articles = Array.isArray(rawArticles) ? rawArticles.map((article: any) => ({
          ...article,
          // On force l'utilisation de notre banque d'images HD basée sur le topic retourné par l'IA
          imageUrl: getRandomImageForTopic(article.visual_topic || mapCategoryToTopic(article.category))
        })) : getMockNews();
        
        const sourceUrls = response.candidates?.[0]?.groundingMetadata?.groundingChunks
          ?.map(chunk => chunk.web?.uri)
          .filter((uri): uri is string => typeof uri === 'string')
          .slice(0, 3) || [];

        if (articles.length === 0) {
            throw new Error("Invalid news data format");
        }

        return { articles, sourceUrls };
      }, 3, 1000, 'fetchLatestNews');
    } catch (error) {
        console.error("News Fetch Failed (Fallback used):", error);
        if (isQuotaError(error)) markQuotaExceeded();
        return { articles: getMockNews(), sourceUrls: [] };
    }
  });
};

// Fallback mapping if AI forgets visual_topic
const mapCategoryToTopic = (category: string): string => {
    const c = category?.toUpperCase() || '';
    if (c.includes('POLITIQUE')) return 'POLITICS';
    if (c.includes('SPORT') || c.includes('FOOT')) return 'SOCCER';
    if (c.includes('ECONOM') || c.includes('MINE')) return 'ECONOMY';
    if (c.includes('CULTURE') || c.includes('ART')) return 'CULTURE';
    if (c.includes('JUSTICE')) return 'JUSTICE';
    return 'SOCIETY';
};

export const fetchCommunityEvents = async (): Promise<CommunityEvent[]> => {
    if (!apiKey || isQuotaExceededRaw()) return getMockEvents();

    return fetchWithDedup('events_v3', async () => {
        try {
            return await retryWithBackoff(async () => {
                const response = await ai.models.generateContent({
                    model: "gemini-2.5-flash",
                    contents: `Trouve des événements pour la diaspora guinéenne en Belgique (Bruxelles/Liège) ou des événements africains majeurs.
                    Priorité aux événements réels futurs. Si rien, propose des événements génériques réalistes.
                    
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
    if (!apiKey || isQuotaExceededRaw()) return FALLBACK_HERO;
    // On garde le fallback Hero car l'API de génération d'image n'est pas demandée ici et risque de ralentir
    return FALLBACK_HERO;
};
