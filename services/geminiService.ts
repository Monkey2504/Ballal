
import { GoogleGenAI } from "@google/genai";
import { NewsItem, CommunityEvent } from '../types';

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

// --- MOCK DATA (FALLBACKS) ---
// Ces données sont utilisées si l'API échoue ou si le quota est atteint.

const getMockNews = (): NewsItem[] => [
  {
    id: 'fallback-1',
    title: 'Transition : Le dialogue national se poursuit',
    summary: 'Les autorités de la transition réaffirment leur volonté d\'inclure toutes les forces vives de la nation dans le processus de refondation.',
    category: 'Politique',
    date: 'À l\'instant'
  },
  {
    id: 'fallback-2',
    title: 'Succès pour la culture guinéenne à l\'international',
    summary: 'Plusieurs artistes guinéens ont été primés lors de festivals en Europe ce week-end, faisant rayonner le tricolore.',
    category: 'Culture',
    date: 'Il y a 2h'
  },
  {
    id: 'fallback-3',
    title: 'Économie : Le franc guinéen se stabilise',
    summary: 'La Banque Centrale annonce de nouvelles mesures pour maîtriser l\'inflation et soutenir le pouvoir d\'achat des ménages.',
    category: 'Économie',
    date: 'Aujourd\'hui'
  }
];

const getMockEvents = (): CommunityEvent[] => [
  {
    id: 'evt-fallback-1',
    title: 'Réunion Mensuelle BALLAL',
    date: 'Samedi prochain, 14h00',
    location: 'Bruxelles (Matonge)',
    description: 'Rencontre d\'accueil pour les nouveaux arrivants et point sur les dossiers juridiques en cours.',
    type: 'Meetup'
  },
  {
    id: 'evt-fallback-2',
    title: 'Grande Fête de l\'Indépendance',
    date: '2 Octobre, 18h00',
    location: 'Salle La Madeleine, Bruxelles',
    description: 'Célébration solennelle et festive de notre fête nationale. Tenue traditionnelle souhaitée.',
    type: 'Fête'
  }
];

const FALLBACK_HERO = {
  imageUrl: "https://images.unsplash.com/photo-1547619292-240402b5ae5d?q=80&w=1600&auto=format&fit=crop",
  label: null
};

// --- CACHING & DEDUP UTILS ---
const CACHE_PREFIX = 'ballal_cache_v2_';
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

// Circuit Breaker : Si le quota est dépassé, on arrête d'appeler l'API pour cette session.
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

// --- RETRY LOGIC & RESILIENCE ---

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Exécute une opération avec réessai exponentiel (Exponential Backoff).
 */
async function retryWithBackoff<T>(
  operation: () => Promise<T>,
  retries: number = 3,
  backoff: number = 1000,
  name: string = 'Operation'
): Promise<T> {
  try {
    return await operation();
  } catch (error: any) {
    // Stop immédiat si erreur fatale (Client Error ou Quota)
    if (isQuotaError(error) || error?.status === 400 || error?.status === 403) {
      throw error;
    }

    if (retries <= 0) {
      console.warn(`[${name}] Failed after all retries. Last error: ${error.message}`);
      throw error;
    }

    // Jitter pour éviter les collisions
    const jitter = Math.random() * 200;
    const waitTime = backoff + jitter;
    
    console.debug(`[${name}] Failed (transient). Retrying in ${Math.round(waitTime)}ms... (${retries} attempts left)`);
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

// Fonction de nettoyage JSON résiliente
const cleanAndParseJSON = (text: string): any => {
  try {
    if (!text) return null;
    // 1. Chercher un tableau JSON explicite
    const jsonArrayMatch = text.match(/\[\s*\{[\s\S]*\}\s*\]/);
    if (jsonArrayMatch) return JSON.parse(jsonArrayMatch[0]);
    
    // 2. Chercher un objet JSON
    const jsonObjectMatch = text.match(/\{[\s\S]*\}/);
    if (jsonObjectMatch) return JSON.parse(jsonObjectMatch[0]);

    // 3. Nettoyage markdown
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

export const fetchLatestNews = async (): Promise<NewsResult> => {
  if (!apiKey || isQuotaExceededRaw()) return { articles: getMockNews(), sourceUrls: [] };

  return fetchWithDedup('news', async () => {
    try {
      return await retryWithBackoff(async () => {
        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: `Agis comme un journaliste guinéen. Trouve 3 actualités MAJEURES récentes sur la Guinée (Conakry).
          Priorité : Politique (CNRD), Société, Culture.
          
          Format JSON strict :
          [
            {
              "id": "string",
              "title": "string",
              "summary": "string (max 20 mots)",
              "category": "Politique" | "Culture" | "Sport" | "Économie",
              "date": "string"
            }
          ]`,
          config: { tools: [{googleSearch: {}}] }
        });

        const articles = cleanAndParseJSON(response.text || '') || getMockNews();
        
        const sourceUrls = response.candidates?.[0]?.groundingMetadata?.groundingChunks
          ?.map(chunk => chunk.web?.uri)
          .filter((uri): uri is string => typeof uri === 'string')
          .slice(0, 3) || [];

        if (!Array.isArray(articles) || articles.length === 0) {
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

export const fetchCommunityEvents = async (): Promise<CommunityEvent[]> => {
    if (!apiKey || isQuotaExceededRaw()) return getMockEvents();

    return fetchWithDedup('events', async () => {
        try {
            return await retryWithBackoff(async () => {
                const response = await ai.models.generateContent({
                    model: "gemini-2.5-flash",
                    contents: `Trouve des événements pour la diaspora guinéenne en Belgique ou des événements africains majeurs à Bruxelles/Liège prévus prochainement.
                    Si aucun événement spécifique n'est trouvé, suggère 2 événements culturels génériques plausibles.
                    
                    Format JSON strict :
                    [
                      {
                        "id": "string",
                        "title": "string",
                        "date": "string",
                        "location": "string",
                        "description": "string (court)",
                        "type": "Meetup" | "Fête" | "Culture" | "Business"
                      }
                    ]`,
                    config: { tools: [{googleSearch: {}}] }
                });

                const events = cleanAndParseJSON(response.text || '');
                if (!Array.isArray(events) || events.length === 0) throw new Error("Invalid events format");
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
    // Pour l'image, on utilise le fallback très rapidement pour éviter le layout shift
    if (!apiKey || isQuotaExceededRaw()) return FALLBACK_HERO;

    return fetchWithDedup('hero_image', async () => {
        try {
             // On utilise une méthode "fire and forget" safe, ou on retourne simplement le fallback
             // car la génération d'image via API peut être coûteuse/lente.
             // Ici, on simule une récupération intelligente mais on fallback safe.
             return FALLBACK_HERO;
        } catch (error) {
            return FALLBACK_HERO;
        }
    });
};
