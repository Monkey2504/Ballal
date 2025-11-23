
import { GoogleGenAI } from "@google/genai";
import { NewsItem, CommunityEvent, GalleryItem } from '../types';

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

// --- STATIC GALLERY DATA (REMPLACEMENT IA) ---
const STATIC_GALLERY_DB: GalleryItem[] = [
  {
    id: '1',
    title: 'Architecture de Dalaba',
    location: 'Fouta Djallon',
    description: 'Cette maison aux balcons ouvragés et aux murs bleus rappelle l\'architecture coloniale du Fouta Djallon, notamment à Dalaba, ville climatique prisée.',
    tags: ['Ville', 'Fouta Djallon'],
    category: 'urban',
    imageUrl: 'https://images.unsplash.com/photo-1577083288073-40892c0860a4?q=80&w=800'
  },
  {
    id: '2',
    title: 'Le Tressage au Village',
    location: 'Basse-Guinée',
    description: 'Moment de partage et de convivialité entre femmes. La coiffure traditionnelle est un art qui se transmet de mère en fille au cœur du village.',
    tags: ['Société', 'Basse-Guinée'],
    category: 'culture',
    imageUrl: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=800'
  },
  {
    id: '3',
    title: 'Football au Crépuscule',
    location: 'Conakry',
    description: 'Sur la plage de Bénarès ou de Rogbane, les enfants profitent de la marée basse et du coucher de soleil pour taper dans le ballon. Le rêve de devenir le prochain grand joueur.',
    tags: ['Sport', 'Conakry'],
    category: 'urban',
    imageUrl: 'https://images.unsplash.com/photo-1500468776905-559d2737604b?q=80&w=800'
  },
  {
    id: '4',
    title: 'Pirogue sur le Fleuve',
    location: 'Basse-Guinée',
    description: 'Le calme du soir sur le littoral. Cette pirogue traditionnelle symbolise l\'importance de la pêche artisanale pour les communautés côtières.',
    tags: ['Mer', 'Basse-Guinée'],
    category: 'water',
    imageUrl: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?q=80&w=800'
  },
  {
    id: '5',
    title: 'Abondance du Marché',
    location: 'Conakry',
    description: 'Étalages colorés de piments, céréales et épices. Le marché est le cœur battant de l\'économie locale, où l\'on trouve tous les produits du terroir.',
    tags: ['Ville', 'Conakry'],
    category: 'urban',
    imageUrl: 'https://images.unsplash.com/photo-1516646255117-f9f933680173?q=80&w=800'
  },
  {
    id: '6',
    title: 'Le Griot et sa Kora',
    location: 'Haute-Guinée',
    description: 'Sous l\'arbre à palabres, le maître de la parole joue de la Kora. Il raconte l\'épopée de Soundiata Keïta aux enfants, perpétuant l\'histoire orale.',
    tags: ['Culture', 'Haute-Guinée'],
    category: 'culture',
    imageUrl: 'https://images.unsplash.com/photo-1514525253440-b393452e2729?q=80&w=800'
  },
  {
    id: '7',
    title: 'Retour du Champ',
    location: 'Guinée Forestière',
    description: 'L\'élégance et la force. Ces femmes rapportent la récolte de fruits dans des paniers tressés, marchant en file indienne sur les pistes de terre rouge.',
    tags: ['Nature', 'Forêt'],
    category: 'nature',
    imageUrl: 'https://images.unsplash.com/photo-1530932029582-73047240a5ee?q=80&w=800'
  },
  {
    id: '8',
    title: 'Rizières de la Guinée',
    location: 'Guinée Forestière',
    description: 'Paysage agraire typique. La riziculture est essentielle à l\'alimentation. Ici, les champs inondés reflètent le ciel, promettant une bonne moisson.',
    tags: ['Nature', 'Forêt'],
    category: 'nature',
    imageUrl: 'https://images.unsplash.com/photo-1621360841013-c768371e93cf?q=80&w=800'
  },
  {
    id: '9',
    title: 'Transports Urbains',
    location: 'Conakry',
    description: 'L\'ambiance frénétique des gares routières. Les minibus chargés de bagages et de passagers relient la capitale à l\'intérieur du pays.',
    tags: ['Ville', 'Conakry'],
    category: 'urban',
    imageUrl: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=800'
  },
  {
    id: '10',
    title: 'Cascade en Forêt',
    location: 'Fouta Djallon',
    description: 'La Guinée, château d\'eau de l\'Afrique de l\'Ouest. Cette chute d\'eau, nichée dans une végétation luxuriante, offre fraîcheur et beauté pure.',
    tags: ['Nature', 'Fouta Djallon'],
    category: 'nature',
    imageUrl: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=80&w=800'
  },
  {
    id: '11',
    title: 'Célébration Nationale',
    location: 'Conakry',
    description: 'La ferveur populaire. La foule brandit les drapeaux Rouge-Jaune-Vert, célébrant l\'unité et la fierté d\'appartenir à la nation guinéenne.',
    tags: ['Société', 'Conakry'],
    category: 'culture',
    imageUrl: 'https://images.unsplash.com/photo-1532446756857-418247db6a4f?q=80&w=800'
  }
];

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

export const fetchGalleryMemories = async (filter: string): Promise<GalleryItem[]> => {
  // Return static DB immediately. No more AI dependency for gallery.
  return new Promise((resolve) => {
    setTimeout(() => {
        if (filter === 'Tout' || filter === 'Paysages et Vie en Guinée') {
            resolve(STATIC_GALLERY_DB);
        } else {
            const lowerFilter = filter.toLowerCase();
            const filtered = STATIC_GALLERY_DB.filter(item => 
                item.location.toLowerCase().includes(lowerFilter) || 
                item.description.toLowerCase().includes(lowerFilter) ||
                item.tags.some(t => t.toLowerCase().includes(lowerFilter))
            );
            resolve(filtered.length > 0 ? filtered : STATIC_GALLERY_DB);
        }
    }, 100);
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
