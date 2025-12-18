import React, { useState, useEffect } from 'react';
import { Newspaper, RefreshCcw, ExternalLink, Search, AlertCircle, Loader2 } from 'lucide-react';
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
      console.error("Erreur news:", err);
      setError("Impossible de charger les actualités pour le moment.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchNews(); }, []);

  return (
    <div className="min-h-screen bg-soft-paper pb-20 pt-10 px-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-block px-4 py-1 bg-guinea-red/10 text-guinea-red font-bold text-[10px] uppercase tracking-widest rounded-full mb-4">Dépêches communautaires</div>
            <h1 className="text-5xl md:text-7xl font-serif font-black text-earth-black tracking-tighter">Flash <span className="text-guinea-red">Pays</span></h1>
          </div>
          <button 
            onClick={fetchNews} 
            disabled={loading}
            className="flex items-center gap-3 px-8 py-4 bg-earth-black text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-guinea-red transition-all shadow-soft-elegant disabled:opacity-50"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCcw className="h-4 w-4" />}
            Actualiser
          </button>
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-6">
            <div className="h-16 w-16 border-4 border-guinea-red border-t-transparent rounded-full animate-spin"></div>
            <p className="font-serif italic text-2xl text-gray-400">Récupération des nouvelles...</p>
          </div>
        ) : error ? (
          <div className="bg-white p-12 rounded-[3rem] shadow-soft-elegant border border-red-100 text-center">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-6" />
            <p className="text-xl font-medium text-gray-600 mb-8">{error}</p>
            <button onClick={fetchNews} className="text-guinea-red font-black uppercase text-xs underline decoration-2 underline-offset-8">Réessayer</button>
          </div>
        ) : (
          <div className="space-y-12">
            <div className="bg-white p-10 md:p-16 rounded-[3.5rem] shadow-soft-elegant border border-gray-100">
              <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:font-black prose-p:font-medium prose-p:text-gray-600 leading-relaxed">
                {news?.split('\n').map((line, i) => {
                  if (line.startsWith('#')) return <h3 key={i} className="text-3xl text-earth-black mt-10 mb-6">{line.replace(/#/g, '')}</h3>;
                  if (line.trim() === '') return <div key={i} className="h-4" />;
                  return <p key={i} className="mb-4">{line}</p>;
                })}
              </div>
            </div>

            {sources.length > 0 && (
              <div className="space-y-6">
                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 flex items-center gap-4">
                  <div className="h-px flex-grow bg-gray-200"></div>
                  Sources Vérifiées
                  <div className="h-px flex-grow bg-gray-200"></div>
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {sources.map((chunk, i) => chunk.web && (
                    <a key={i} href={chunk.web.uri} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-6 bg-white rounded-2xl border border-gray-100 hover:border-guinea-green/30 transition-all group">
                      <span className="text-[10px] font-bold text-gray-600 uppercase truncate mr-4">{chunk.web.title || "Lien Source"}</span>
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