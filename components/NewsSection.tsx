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
    const query = encodeURIComponent(`${item.title} Guinée actualité`);
    window.open(`https://www.google.com/search?q=${query}`, '_blank');
  };

  // Helper to get border color based on index to create a rhythm
  const getBorderColorClass = (idx: number) => {
      const colors = ['border-b-[#CE1126]', 'border-b-[#FCD116]', 'border-b-[#009460]'];
      return colors[idx % 3];
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 border-b border-orange-100 pb-6">
        <div>
            {/* H1 SEO optimization */}
            <h1 className="text-3xl font-black text-slate-900 flex items-center tracking-tight">
                {t.news_section_title}
                <span className="ml-3 flex h-3 w-3 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[#CE1126]"></span>
                </span>
            </h1>
            <p className="text-gray-600 text-lg mt-2 font-medium">{t.news_section_subtitle}</p>
        </div>
        <button 
            onClick={loadNews} 
            className="mt-4 sm:mt-0 p-3 rounded-full bg-white hover:bg-orange-50 text-gray-600 border border-gray-200 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#CE1126] flex items-center text-sm font-bold"
            aria-label="Actualiser les nouvelles"
        >
            <RefreshCcw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} aria-hidden="true" />
            Actualiser
        </button>
      </div>
      
      {/* NEWS GRID */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" aria-label="Chargement des actualités">
           {[1, 2, 3, 4, 5, 6].map(i => (
               <div key={i} className="bg-white rounded-2xl shadow-sm overflow-hidden animate-pulse border border-gray-100">
                   <div className="h-56 bg-gray-200"></div>
                   <div className="p-6">
                       <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                       <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                       <div className="h-4 bg-gray-200 rounded w-full"></div>
                   </div>
               </div>
           ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                    className={`bg-white rounded-2xl shadow-sm card-hover-effect border border-gray-100 flex flex-col h-full focus:outline-none focus:ring-4 focus:ring-red-100 overflow-hidden border-b-8 ${getBorderColorClass(idx)}`}
                    aria-label={`${t.read_article} : ${item.title}`}
                >
                    <div className="h-56 overflow-hidden relative">
                         {item.imageUrl ? (
                             <img 
                                src={item.imageUrl} 
                                alt={item.category} 
                                className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-110"
                             />
                         ) : (
                             <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                                 Pas d'image
                             </div>
                         )}
                         <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                         <div className="absolute top-4 left-4">
                             <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wide shadow-lg
                                ${item.category === 'Politique' ? 'bg-[#CE1126] text-white' : 
                                  item.category === 'Sport' ? 'bg-[#009460] text-white' : 
                                  item.category === 'Culture' ? 'bg-[#FCD116] text-black' :
                                  'bg-slate-800 text-white'}`}>
                                {item.category}
                            </span>
                         </div>
                    </div>

                    <div className="p-6 flex flex-col flex-grow relative">
                        {/* Motif discret en fond de carte */}
                        <div className="absolute top-0 right-0 w-24 h-24 bg-african-pattern opacity-30 rounded-bl-full pointer-events-none"></div>

                        <span className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2 block">{item.date}</span>
                        <h3 className="font-bold text-slate-900 text-xl mb-3 line-clamp-2 hover:text-[#CE1126] transition-colors leading-tight">
                            {item.title}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-3 mb-6 flex-grow leading-relaxed">
                            {item.summary}
                        </p>
                        
                        <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
                             <div className="flex items-center text-xs text-gray-400 font-medium">
                                <MapPin className="h-3 w-3 mr-1 text-red-400" aria-hidden="true" /> Conakry
                            </div>
                             <div className="flex items-center font-bold text-sm text-[#CE1126] group hover:underline cursor-pointer">
                                {t.read_article} <ArrowRight className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                            </div>
                        </div>
                    </div>
                </article>
            ))}
        </div>
      )}
      
      {sources.length > 0 && (
        <div className="mt-16 pt-8 border-t border-gray-200">
            <p className="text-xs text-gray-400 mb-3 flex items-center uppercase tracking-wider font-bold"><ExternalLink className="h-3 w-3 mr-1" aria-hidden="true"/> {t.verified_sources}</p>
            <div className="flex flex-wrap gap-2">
                {sources.map((url, i) => (
                    <a 
                        key={i} 
                        href={url} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="text-xs bg-white text-gray-600 px-3 py-1.5 rounded-lg shadow-sm hover:bg-gray-50 transition-colors truncate max-w-[200px] border border-gray-200 font-medium"
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