import React, { useEffect, useState } from 'react';
import { fetchLatestNews } from '../services/geminiService';
import { NewsItem } from '../types';
import { RefreshCcw, Newspaper, MapPin } from 'lucide-react';

const NewsSection: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  const loadNews = async () => {
    setLoading(true);
    const data = await fetchLatestNews();
    setNews(data);
    setLoading(false);
  };

  useEffect(() => {
    loadNews();
  }, []);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Sport': return 'bg-green-100 text-green-800';
      case 'Culture': return 'bg-yellow-100 text-yellow-800';
      case 'Politique': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900">Les Nouvelles du Pays</h2>
          <p className="mt-2 text-gray-600">Restez informé de ce qui se passe en Guinée.</p>
        </div>
        <button 
          onClick={loadNews}
          disabled={loading}
          className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium text-gray-700 transition-colors"
        >
          <RefreshCcw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Actualiser
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
                <div key={n} className="bg-white rounded-xl shadow-sm p-6 animate-pulse h-64 border border-gray-100">
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
            ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col">
              <div className="p-6 flex-1">
                <div className="flex justify-between items-start mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(item.category)}`}>
                    {item.category}
                  </span>
                  <span className="text-xs text-gray-400 flex items-center">
                    <Newspaper className="h-3 w-3 mr-1" />
                    {item.date}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{item.summary}</p>
              </div>
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                 <span className="text-xs font-medium text-gray-500 flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    Conakry / Bruxelles
                 </span>
                 <button className="text-red-600 hover:text-red-800 text-sm font-medium">Lire plus →</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsSection;