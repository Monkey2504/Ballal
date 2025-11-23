
import React, { useEffect, useState, useCallback } from 'react';
import { fetchLatestNews } from '../services/geminiService';
import { NewsItem, LanguageCode } from '../types';
import { RefreshCcw, MapPin, ExternalLink, ArrowRight } from 'lucide-react';
import { translations } from '../utils/translations';

interface NewsSectionProps {
    language?: LanguageCode;
}

const NewsSection: React.FC<NewsSectionProps> = ({ language = 'fr' }) => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [sources, setSources] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const t = translations[language];

  const loadNews = useCallback(async () => {
    setLoading(true);
    try {
        const data = await fetchLatestNews(language);
        setNews(data.articles);
        setSources(data.sourceUrls);
    } catch (e) {
        console.error(e);
    } finally {
        setLoading(false);
    }
  }, [language]);

  useEffect(() => {
    loadNews();
  }, [loadNews]);

  const handleArticleClick = (item: NewsItem) => {
    // Génère une recherche Google précise pour trouver les articles complets sur le sujet
    const query = encodeURIComponent(`${item.title} Guinée actualité`);
    window.open(`https://www.google.com/search?q=${query}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      
      <div className="flex items-center justify-between mb-8">
        <div>
            {/* H1 SEO optimization */}
            <h1 className="text-3xl font-extrabold text-gray-900 flex items-center">
                {t.news_section_title}
                <span className="ml-3 flex h-3 w-3 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
            </h1>
            <p className="text-gray-500 text-sm mt-1">{t.news_section_subtitle}</p>
        </div>
        <button 
            onClick={loadNews} 
            className="p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-[#CE1126]"
            aria-label="Actualiser les nouvelles"
        >
            <RefreshCcw className={`h-5 w-5 text-gray-600 ${loading ? 'animate-spin' : ''}`} aria-hidden="true" />
        </button>
      </div>
      
      {/* NEWS GRID */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" aria-label="Chargement des actualités">
           {[1, 2, 3, 4, 5, 6].map(i => (
               <div key={i} className="h-48 bg-gray-100 rounded-xl animate-pulse" aria-hidden="true"></div>
           ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item, idx) => (
                <article 
                    key={idx} 
                    onClick={() => handleArticleClick(item)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleArticleClick(item);
                        }
                    }}
                    role="button"
                    tabIndex={0}
                    className="bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-xl hover:border-red-100 transition-all duration-300 p-6 flex flex-col cursor-pointer group hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#CE1126] focus:ring-offset-2"
                    aria-label={`${t.read_article} : ${item.title}`}
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
                             <MapPin className="h-3 w-3 mr-1" aria-hidden="true" /> Conakry
                        </div>
                        <div className="flex items-center font-bold text-gray-300 group-hover:text-[#CE1126] transition-colors">
                            {t.read_article} <ArrowRight className="h-3 w-3 ml-1" aria-hidden="true" />
                        </div>
                    </div>
                </article>
            ))}
        </div>
      )}
      
      {sources.length > 0 && (
        <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-400 mb-2 flex items-center"><ExternalLink className="h-3 w-3 mr-1" aria-hidden="true"/> {t.verified_sources}</p>
            <div className="flex flex-wrap gap-2">
                {sources.map((url, i) => (
                    <a 
                        key={i} 
                        href={url} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded hover:bg-gray-200 transition-colors truncate max-w-[200px] focus:outline-none focus:ring-2 focus:ring-[#CE1126]"
                        aria-label={`Source externe : ${new URL(url).hostname}`}
                    >
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
