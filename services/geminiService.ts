
import { GoogleGenAI } from "@google/genai";
import { NewsItem, CommunityEvent } from '../types';

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

// --- CACHING & DEDUP UTILS ---
const CACHE_PREFIX = 'ballal_cache_v1_';
const QUOTA_ERROR_MARKER = 'ballal_quota_exceeded'; // Circuit breaker key
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

// Check if we have already hit the rate limit in this session
const isQuotaExceededRaw = () => {
  try {
    return sessionStorage.getItem(QUOTA_ERROR_MARKER) === 'true';
  } catch { return false; }
};

const markQuotaExceeded = () => {
  try {
    console.warn("Global Quota Exceeded detected - disabling AI features for this session.");
    sessionStorage.setItem(QUOTA_ERROR_MARKER, 'true');
  } catch {}
};

// Deduplication wrapper to prevent double-fetching in React StrictMode & save quota
const fetchWithDedup = async <T>(key: string, fetcher: () => Promise<T>): Promise<T> => {
  // 1. Check Session Storage
  const cached = getCached<T>(key);
  if (cached) return cached;

  // 2. Check In-Flight Requests (Dedup)
  if (pendingRequests[key]) {
    return pendingRequests[key];
  }

  // 3. Execute Request
  const promise = fetcher().then(data => {
    // Only cache if data is not null/undefined. 
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

// Helper to detect quota errors
const isQuotaError = (e: any) => {
  const msg = e?.message || JSON.stringify(e);
  return msg.includes('429') || msg.includes('quota') || msg.includes('RESOURCE_EXHAUSTED') || e?.status === 429;
};

export interface NewsResult {
  articles: NewsItem[];
  sourceUrls: string[];
}

// Fonction de nettoyage JSON ultra-robuste
const cleanAndParseJSON = (text: string): any => {
  try {
    if (!text) return null;
    
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    const cleaned = text.replace(/```json/g, '').replace(/```/g, '');
    
    const objectMatch = cleaned.match(/\{[\s\S]*\}/);
    if (objectMatch) {
        return JSON.parse(objectMatch[0]);
    }

    return JSON.parse(cleaned);
  } catch (e) {
    console.error("JSON Parsing Failed:", e);
    return null;
  }
};

export const fetchLatestNews = async (): Promise<NewsResult> => {
  // Immediate fallback if quota exceeded
  if (!apiKey || isQuotaExceededRaw()) return { articles: getMockNews(), sourceUrls: [] };

  return fetchWithDedup('news', async () => {
    try {
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

      return { articles, sourceUrls };
    } catch (error) {
      if (isQuotaError(error)) markQuotaExceeded();
      return { articles: getMockNews(), sourceUrls: [] };
    }
  });
};

export const fetchCommunityEvents = async (): Promise<CommunityEvent[]> => {
  if (!apiKey || isQuotaExceededRaw()) return getMockEvents();

  return fetchWithDedup('events', async () => {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Liste 3 événements potentiels pour la diaspora guinéenne en Belgique ou Europe proche.
        Format JSON strict :
        [{"id": "1", "title": "...", "date": "...", "location": "...", "description": "...", "type": "Fête"}]`,
        config: { tools: [{googleSearch: {}}] }
      });

      return cleanAndParseJSON(response.text || '') || getMockEvents();
    } catch (error) {
      if (isQuotaError(error)) markQuotaExceeded();
      return getMockEvents();
    }
  });
};

// --- HERO IMAGE HELPERS ---

const DEFAULT_HERO_URL = "https://images.unsplash.com/photo-1547619292-240402b5ae5d?q=80&w=1600&auto=format&fit=crop";

// Fallback object to be cached on error to prevent infinite retries
const FALLBACK_HERO = {
  imageUrl: DEFAULT_HERO_URL,
  label: null // Null label indicates fallback mode (no "AI" badge)
};

// Caching specific for HERO image (Local Storage for persistence across reloads)
const HERO_CACHE_KEY = 'ballal_hero_img_v2';
const HERO_CACHE_DURATION = 1000 * 60 * 60 * 24; // 24 hours

export const fetchHeroImage = async (): Promise<{ imageUrl: string; label: string | null } | null> => {
  // 1. Try to load from Local Storage first (Fastest, no quota usage)
  try {
    const cachedHero = localStorage.getItem(HERO_CACHE_KEY);
    if (cachedHero) {
      const { data, timestamp } = JSON.parse(cachedHero);
      // If cache is less than 24h old, use it
      if (Date.now() - timestamp < HERO_CACHE_DURATION) {
        return data;
      }
    }
  } catch (e) {
    // Ignore localStorage errors
  }

  if (!apiKey || isQuotaExceededRaw()) return FALLBACK_HERO;

  // 2. Fetch from API if no cache or expired
  return fetchWithDedup('hero_image', async () => {
    try {
      // Get creative concept
      const conceptResponse = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: `Imagine a spectacular, photorealistic landscape of Guinea (Conakry) for a website hero header. 
          It must be a real, recognizable place (e.g. Fouta Djallon mountains, Iles de Loos, Mont Nimba, Chutes de la Sala, Conakry Corniche).
          
          Return STRICT JSON format:
          {
              "prompt": "Detailed English description for image generation (lighting, view, style, max 40 words)",
              "label": "Short French name of the place (e.g. 'Les Chutes de la Sala', 'Mont Nimba')"
          }`,
          config: { responseMimeType: "application/json" }
      });

      const concept = cleanAndParseJSON(conceptResponse.text || '');
      if (!concept || !concept.prompt) throw new Error("Failed to generate concept");

      // Generate Image
      const imageResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            {
              text: `Cinematic wide shot, hero image, 16:9 aspect ratio. ${concept.prompt}. High quality, photorealistic, 8k.`
            }
          ],
        },
        config: {
          imageConfig: {
              aspectRatio: "16:9"
          }
        }
      });

      for (const part of imageResponse.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          const result = {
              imageUrl: `data:image/png;base64,${part.inlineData.data}`,
              label: concept.label || "Paysage de Guinée"
          };
          
          // Save to LocalStorage for future visits
          try {
            localStorage.setItem(HERO_CACHE_KEY, JSON.stringify({
                data: result,
                timestamp: Date.now()
            }));
          } catch (e) { console.warn("Quota exceeded for localStorage image cache"); }

          return result;
        }
      }
      return FALLBACK_HERO;
    } catch (e) {
      console.warn("Hero generation failed or quota exceeded - using fallback", e);
      if (isQuotaError(e)) markQuotaExceeded();
      return FALLBACK_HERO;
    }
  });
};

// --- MOCK DATA ---
const getMockNews = (): NewsItem[] => [
  { id: '1', title: 'Transition : Le CNRD annonce de nouvelles mesures', summary: 'Le gouvernement de transition précise le calendrier électoral.', category: 'Politique', date: '24/10/2023' },
  { id: '2', title: 'Simandou : Avancée majeure du projet minier', summary: 'Les infrastructures ferroviaires progressent en forêt.', category: 'Économie', date: '23/10/2023' },
  { id: '3', title: 'Syli National : Match décisif à venir', summary: 'L\'équipe se prépare pour les qualifications.', category: 'Sport', date: '22/10/2023' }
];

const getMockEvents = (): CommunityEvent[] => [
  { id: '1', title: 'Fête de l\'Indépendance', date: '02 Octobre', location: 'Bruxelles', description: 'Grand rassemblement communautaire.', type: 'Fête' },
  { id: '2', title: 'Rencontre des entrepreneurs', date: '15 Nov', location: 'Liège', description: 'Networking diaspora.', type: 'Business' }
];
