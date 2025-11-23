
import React, { useEffect, useState, useCallback } from 'react';
import { fetchLatestNews } from '../services/geminiService';
import { NewsItem } from '../types';
import { RefreshCcw, MapPin, ExternalLink, Radio, Volume2, Play, ArrowRight } from 'lucide-react';

const RADIO_STATIONS = [
  {
    id: 'espace',
    name: 'Radio Espace',
    frequency: '99.7 FM',
    webUrl: 'https://zeno.fm/radio/radio-espace-guinee',
    color: 'from-red-600 to-red-800'
  },
  {
    id: 'fim',
    name: 'FIM FM',
    frequency: '95.3 FM',
    webUrl: 'https://zeno.fm/radio/fim-fm',
    color: 'from-green-600 to-green-800'
  },
  {
    id: 'djoma',
    name: 'Djoma FM',
    frequency: '93.1 FM',
    webUrl: 'https://zeno.fm/radio/djoma-fm',
    color: 'from-yellow-500 to-yellow-600'
  }
];

const NewsSection: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [sources, setSources] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const loadNews = useCallback(async () => {
    setLoading(true);
    try {
        const data = await fetchLatestNews();
        setNews(data.articles);
        setSources(data.sourceUrls);
    } catch (e) {
        console.error(e);
    } finally {
        setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadNews();
  }, [loadNews]);

  const handleArticleClick = (item: NewsItem) => {
    // Génère une recherche Google précise pour trouver les articles complets sur le sujet
    const query = encodeURIComponent(`${item.title} Guinée actualité`);
    window.open(`https://www.google.com/search?q=${query}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      <div className="flex items-center justify-between mb-8">
        <div>
            <h2 className="text-3xl font-extrabold text-gray-900 flex items-center">
                Les Nouvelles du Pays
                <span className="ml-3 flex h-3 w-3 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
            </h2>
            <p className="text-gray-500 text-sm mt-1">Actualités vérifiées et radios en direct</p>
        </div>
        <button onClick={loadNews} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <RefreshCcw className={`h-5 w-5 text-gray-600 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* RADIO LINKS (Simple & Reliable) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        {RADIO_STATIONS.map((station) => {
            return (
                <a 
                  key={station.id} 
                  href={station.webUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`relative overflow-hidden rounded-xl shadow-lg bg-gradient-to-br ${station.color} text-white transition-transform hover:-translate-y-1 group block`}
                >
                    <div className="p-5 relative z-10">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-xs font-bold opacity-80 uppercase tracking-wider">{station.frequency}</p>
                                <h3 className="text-xl font-black mt-1">{station.name}</h3>
                            </div>
                            <div className="bg-white/20 p-2 rounded-full group-hover:scale-110 transition-transform">
                                <Radio className="h-5 w-5 text-white" />
                            </div>
                        </div>

                        <div className="mt-6 flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <span className="text-xs font-medium flex items-center">
                                    <ExternalLink className="h-3 w-3 mr-1" />
                                    Écouter sur Zeno.fm
                                </span>
                            </div>

                            <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-red-600 transition-colors">
                                <Play className="h-5 w-5 fill-current ml-1" />
                            </div>
                        </div>
                    </div>
                    {/* Background deco */}
                    <Volume2 className="absolute -bottom-4 -right-4 h-32 w-32 text-white opacity-10 rotate-12 group-hover:scale-110 transition-transform duration-500" />
                </a>
            );
        })}
      </div>
      
      {/* NEWS GRID */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {[1, 2, 3].map(i => (
               <div key={i} className="h-48 bg-gray-100 rounded-xl animate-pulse"></div>
           ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item, idx) => (
                <div 
                    key={idx} 
                    onClick={() => handleArticleClick(item)}
                    className="bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-xl hover:border-red-100 transition-all duration-300 p-6 flex flex-col cursor-pointer group hover:-translate-y-1"
                >
                    <div className="flex justify-between items-start mb-4">
                        <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide 
                            ${item.category === 'Politique' ? 'bg-red-50 text-red-700' : 
                              item.category === 'Sport' ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-700'}`}>
                            {item.category}
                        </span>
                        <span className="text-xs text-gray-400">{item.date}</span>
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2 group-hover:text-[#CE1126] transition-colors">{item.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-grow">{item.summary}</p>
                    <div className="pt-4 border-t border-gray-50 flex items-center justify-between text-xs text-gray-400">
                        <div className="flex items-center">
                             <MapPin className="h-3 w-3 mr-1" /> Conakry
                        </div>
                        <div className="flex items-center font-bold text-gray-300 group-hover:text-[#CE1126] transition-colors">
                            Lire l'article <ArrowRight className="h-3 w-3 ml-1" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
      )}
      
      {sources.length > 0 && (
        <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-400 mb-2 flex items-center"><ExternalLink className="h-3 w-3 mr-1"/> Sources vérifiées :</p>
            <div className="flex flex-wrap gap-2">
                {sources.map((url, i) => (
                    <a key={i} href={url} target="_blank" rel="noreferrer" className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded hover:bg-gray-200 transition-colors truncate max-w-[200px]">
                        {new URL(url).hostname}
                    </a>
                ))}
            </div>
        </div>
      )}
    </div>
  );
};

export default NewsSection;
