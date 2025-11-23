import { GoogleGenAI, Type } from "@google/genai";
import { NewsItem } from '../types';

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const fetchLatestNews = async (): Promise<NewsItem[]> => {
  if (!apiKey) {
    console.warn("API Key is missing, returning mock data.");
    return getMockNews();
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Génère 4 articles d'actualité fictifs mais réalistes ou faits culturels intéressants récents concernant la Guinée (Conakry) qui intéresseraient la diaspora en Belgique. Varie les catégories (Sport, Culture, Économie).",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              title: { type: Type.STRING },
              summary: { type: Type.STRING },
              category: { type: Type.STRING, enum: ['Politique', 'Culture', 'Sport', 'Économie'] },
              date: { type: Type.STRING }
            },
            required: ["id", "title", "summary", "category", "date"]
          }
        }
      }
    });

    const text = response.text;
    if (text) {
      return JSON.parse(text) as NewsItem[];
    }
    return getMockNews();
  } catch (error) {
    console.error("Error fetching news from Gemini:", error);
    return getMockNews();
  }
};

const getMockNews = (): NewsItem[] => [
  {
    id: '1',
    title: 'Le Syli National prépare son prochain match',
    summary: 'L\'équipe nationale de football rassemble ses forces pour les qualifications de la CAN avec un soutien massif attendu de la diaspora.',
    category: 'Sport',
    date: '2023-10-24'
  },
  {
    id: '2',
    title: 'Festival des Arts de Conakry',
    summary: 'Un succès retentissant pour la culture guinéenne, mettant en avant les talents locaux et attirant des visiteurs internationaux.',
    category: 'Culture',
    date: '2023-10-23'
  },
  {
    id: '3',
    title: 'Nouvelles initiatives économiques à Kindia',
    summary: 'Le développement de l\'agriculture locale reçoit un coup de pouce grâce à de nouveaux investissements.',
    category: 'Économie',
    date: '2023-10-22'
  }
];