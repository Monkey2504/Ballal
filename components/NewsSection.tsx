import React, { useState, useEffect } from 'react';
import { Newspaper, RefreshCcw, ExternalLink, Calendar, Search, AlertCircle, Loader2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const NewsSection: React.FC = () => {
  const [news, setNews] = useState<string | null>(null);
  const [sources, setSources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    try {
      const ai = new GoogleGenAI({ apiKey: (process.env as any).API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: "Donne-moi un résumé structuré des 5 actualités les plus récentes et pertinentes concernant la Guinée (Conakry) et les activités de la diaspora guinéenne en Belgique. Utilise des titres clairs et des paragraphes concis. Termine par un message de solidarité.",
        config: {
          tools: [{ googleSearch: {} }],
        },
      });

      setNews(response.text || "Aucune actualité trouvée.");
      setSources(response.candidates?.[0]?.groundingMetadata?.groundingChunks || []);
    } catch (err) {
      console.error("Erreur lors de la récupération des news:", err);
      setError("Impossible de charger les actualités pour le moment. Veuillez réessayer plus tard.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div className="min-h-screen bg-soft-paper pb-20 pt-10">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-guinea-red text-white rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
              <Newspaper className="h-3 w-3" />
              Actualités en Direct
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-black text-earth-black tracking-tighter">
              FLASH <span className="text-guinea-green">GUINÉE</span>
            </h1>
          </div>
          <button 
            onClick={fetchNews}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-earth-black rounded-xl font-black text-xs uppercase tracking-widest hover:bg-earth-black hover:text-white transition-all shadow-brutal disabled:opacity-50"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCcw className="h-4 w-4" />}
            Actualiser
          </button>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <Loader2 className="h-12 w-12 text-guinea-red animate-spin" />
            <p className="font-bold text-gray-500 animate-pulse">Recherche des dernières dépêches...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border-4 border-red-600 p-8 rounded-3xl flex flex-col items-center text-center">
            <AlertCircle className="h-12 w-12 text-red-600 mb-4" />
            <p className="font-bold text-red-900">{error}</p>
            <button onClick={fetchNews} className="mt-4 underline font-black text-red-600 uppercase text-xs">Réessayer</button>
          </div>
        ) : (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="bg-white border-4 border-earth-black p-8 md:p-12 rounded-[2.5rem] shadow-brutal relative">
              <div className="absolute -top-4 -left-4 bg-guinea-yellow text-earth-black px-4 py-2 font-black text-xs uppercase tracking-widest border-2 border-earth-black">
                Rapport IA Gemini
              </div>
              <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:font-black prose-p:font-medium prose-p:text-gray-700">
                {news?.split('\n').map((line, i) => {
                  if (line.startsWith('#')) return <h3 key={i} className="text-2xl mt-6 mb-4">{line.replace(/#/g, '')}</h3>;
                  if (line.trim() === '') return <br key={i} />;
                  return <p key={i}>{line}</p>;
                })}
              </div>
            </div>

            {sources.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-xl font-black uppercase tracking-widest flex items-center gap-2">
                  <Search className="h-5 w-5 text-guinea-green" />
                  Sources et vérification
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {sources.map((chunk, i) => (
                    chunk.web && (
                      <a 
                        key={i} 
                        href={chunk.web.uri} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-4 bg-white border-2 border-gray-100 rounded-2xl hover:border-guinea-green transition-all group"
                      >
                        <span className="text-xs font-bold text-gray-600 truncate mr-2">{chunk.web.title || "Voir l'article"}</span>
                        <ExternalLink className="h-4 w-4 text-gray-300 group-hover:text-guinea-green" />
                      </a>
                    )
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsSection;