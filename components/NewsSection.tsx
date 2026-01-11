import React, { useState, useEffect } from 'react';
import { Newspaper, RefreshCcw, ExternalLink, AlertCircle, Loader2, Sparkles, ShieldAlert } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const NewsSection: React.FC = () => {
  const [news, setNews] = useState<string | null>(null);
  const [sources, setSources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = async () => {
    // Vérification de la clé API avant de lancer l'appel
    if (!process.env.API_KEY) {
      setError("Le service d'actualités IA est momentanément indisponible (Clé API manquante).");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: "Génère un résumé journalistique des 5 actualités les plus importantes de 2024-2025 pour la Guinée et sa diaspora en Belgique. Utilise des titres impactants et une analyse brève pour chaque point.",
        config: {
          tools: [{ googleSearch: {} }],
        },
      });

      const text = response.text;
      if (text) {
        setNews(text);
        setSources(response.candidates?.[0]?.groundingMetadata?.groundingChunks || []);
      } else {
        throw new Error("Aucun contenu généré.");
      }
    } catch (err: any) {
      console.error("Erreur News Gemini:", err);
      // Gestion spécifique des erreurs de blocage ou réseau
      setError("Impossible de charger les nouvelles en temps réel. Veuillez réessayer plus tard.");
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
        <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-4 border-earth-black pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1 bg-guinea-red text-white font-bold text-[10px] uppercase tracking-widest rounded-full mb-4">
              <Sparkles className="h-3 w-3" /> IA Intelligence Collective
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-black text-earth-black tracking-tighter leading-none">Flash <span className="text-guinea-red">Pays</span></h1>
          </div>
          <button 
            onClick={fetchNews} 
            disabled={loading}
            className="flex items-center gap-3 px-8 py-4 bg-earth-black text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-guinea-red transition-all shadow-lg disabled:opacity-50"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCcw className="h-4 w-4" />}
            Actualiser
          </button>
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-6 text-center">
            <div className="relative">
              <div className="h-20 w-20 border-8 border-gray-100 rounded-full"></div>
              <div className="h-20 w-20 border-8 border-guinea-red border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
            </div>
            <p className="font-serif italic text-2xl text-gray-500">Scan des sources internationales...</p>
          </div>
        ) : error ? (
          <div className="bg-white p-12 rounded-[3rem] shadow-soft-elegant border border-red-100 text-center">
            <ShieldAlert className="h-16 w-16 text-red-500 mx-auto mb-6" />
            <h3 className="text-2xl font-black mb-4">Oups !</h3>
            <p className="text-lg font-medium text-gray-600 mb-8">{error}</p>
            <button onClick={fetchNews} className="bg-earth-black text-white px-8 py-4 rounded-xl font-black uppercase text-xs">Réessayer</button>
          </div>
        ) : (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="bg-white p-10 md:p-16 rounded-[3.5rem] shadow-soft-elegant border border-gray-100 relative">
              <div className="absolute -top-6 -left-6 bg-guinea-yellow p-4 rounded-2xl shadow-lg rotate-[-10deg]">
                <Newspaper className="h-8 w-8 text-earth-black" />
              </div>
              <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:font-black prose-p:font-medium prose-p:text-gray-600 leading-relaxed whitespace-pre-wrap">
                {news}
              </div>
            </div>

            {sources.length > 0 && (
              <div className="space-y-6">
                <h2 className="text-xs font-black uppercase tracking-[0.4em] text-gray-400 flex items-center gap-4">
                  Sources vérifiées
                  <div className="h-px flex-grow bg-gray-200"></div>
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {sources.slice(0, 4).map((chunk, i) => chunk.web && (
                    <a key={i} href={chunk.web.uri} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-6 bg-white rounded-2xl border border-gray-100 hover:border-guinea-green/30 transition-all group shadow-sm">
                      <div className="flex flex-col overflow-hidden">
                        <span className="text-[10px] font-bold text-gray-400 uppercase mb-1">Source Externe</span>
                        <span className="text-xs font-bold text-earth-black group-hover:text-guinea-green transition-colors truncate">{chunk.web.title || "Lien externe"}</span>
                      </div>
                      <ExternalLink className="h-4 w-4 text-gray-300 group-hover:text-guinea-green flex-shrink-0 ml-4" />
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