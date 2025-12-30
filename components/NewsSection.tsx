
import React, { useState, useEffect } from 'react';
import { Newspaper, RefreshCcw, ExternalLink, AlertCircle, Loader2 } from 'lucide-react';
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
      // Create a new instance right before making the call as per guidelines
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: "Génère un résumé structuré des 5 actualités les plus récentes (2024-2025) concernant la Guinée (politique, économie, culture) et la vie de la communauté guinéenne en Belgique. Utilise des titres en gras. Termine par un message de solidarité pour l'ASBL Ballal.",
        config: {
          tools: [{ googleSearch: {} }],
        },
      });

      // Use .text property directly
      setNews(response.text || "Aucune actualité récente n'a été trouvée.");
      setSources(response.candidates?.[0]?.groundingMetadata?.groundingChunks || []);
    } catch (err) {
      console.error("Erreur news:", err);
      setError("Désolé, nous n'avons pas pu récupérer les dernières nouvelles. Vérifiez votre connexion.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    fetchNews(); 
  }, []);

  return (
    <div className="min-h-screen bg-soft-paper pb-20 pt-10 px-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-block px-4 py-1 bg-guinea-red/10 text-guinea-red font-bold text-[10px] uppercase tracking-widest rounded-full mb-4">Le Pouls de la Communauté</div>
            <h1 className="text-5xl md:text-7xl font-serif font-black text-earth-black tracking-tighter leading-none">Flash <span className="text-guinea-red">Pays</span></h1>
          </div>
          <button 
            onClick={fetchNews} 
            disabled={loading}
            className="flex items-center gap-3 px-8 py-4 bg-earth-black text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-guinea-red transition-all shadow-soft-elegant disabled:opacity-50"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCcw className="h-4 w-4" />}
            Actualiser les infos
          </button>
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-6">
            <div className="h-16 w-16 border-4 border-guinea-red border-t-transparent rounded-full animate-spin"></div>
            <p className="font-serif italic text-2xl text-gray-400">Recherche des dernières nouvelles...</p>
          </div>
        ) : error ? (
          <div className="bg-white p-12 rounded-[3rem] shadow-soft-elegant border border-red-100 text-center">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-6" />
            <p className="text-xl font-medium text-gray-600 mb-8">{error}</p>
            <button onClick={fetchNews} className="text-guinea-red font-black uppercase text-xs underline decoration-2 underline-offset-8">Réessayer la recherche</button>
          </div>
        ) : (
          <div className="space-y-12">
            <div className="bg-white p-10 md:p-16 rounded-[3.5rem] shadow-soft-elegant border border-gray-100 animate-in fade-in duration-700">
              <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:font-black prose-p:font-medium prose-p:text-gray-600 leading-relaxed whitespace-pre-wrap">
                {news}
              </div>
            </div>

            {sources.length > 0 && (
              <div className="space-y-6">
                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 flex items-center gap-4">
                  <div className="h-px flex-grow bg-gray-200"></div>
                  Sources Google Search
                  <div className="h-px flex-grow bg-gray-200"></div>
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {sources.map((chunk, i) => chunk.web && (
                    <a key={i} href={chunk.web.uri} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-6 bg-white rounded-2xl border border-gray-100 hover:border-guinea-green/30 transition-all group shadow-sm">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-gray-400 uppercase mb-1">Source {i + 1}</span>
                        <span className="text-xs font-bold text-earth-black group-hover:text-guinea-green transition-colors truncate max-w-[200px]">{chunk.web.title || "Voir l'article complet"}</span>
                      </div>
                      <ExternalLink className="h-4 w-4 text-gray-300 group-hover:text-guinea-green" />
                    </a>
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
