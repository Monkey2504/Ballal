import React, { useState, useEffect, useCallback } from 'react';
import { Calendar, MapPin, Users, RefreshCw, Search, Info } from 'lucide-react';
import { CommunityEvent } from '../types';
import { fetchCommunityEvents } from '../services/geminiService';

const EventsSection: React.FC = () => {
  const [events, setEvents] = useState<CommunityEvent[]>([]);
  const [loading, setLoading] = useState(true);

  const loadEvents = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchCommunityEvents();
      setEvents(data);
    } catch (error) {
      console.error("Erreur chargement événements", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  const getEventTypeStyle = (type: string) => {
      switch (type) {
          case 'Fête': return 'bg-pink-100 text-pink-800 border-pink-200';
          case 'Business': return 'bg-blue-100 text-blue-800 border-blue-200';
          case 'Culture': return 'bg-purple-100 text-purple-800 border-purple-200';
          case 'Meetup': return 'bg-orange-100 text-orange-800 border-orange-200';
          default: return 'bg-gray-100 text-gray-800 border-gray-200';
      }
  };

  return (
    <div className="py-12 min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          {/* H1 SEO Optimization */}
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Agenda de la Communauté
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-600 font-medium sm:mt-4">
            Les événements publics détectés en Belgique pour la diaspora.
          </p>
          
          <div className="mt-6 flex justify-center">
            <button 
                onClick={loadEvents}
                disabled={loading}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-slate-800 hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 disabled:opacity-50 transition-all"
            >
                <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                {loading ? 'Recherche en cours...' : 'Scanner le Web pour des événements'}
            </button>
          </div>
        </div>
        
        {loading ? (
             <div className="space-y-6 max-w-4xl mx-auto">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white rounded-lg shadow-sm p-6 animate-pulse border-l-4 border-gray-200">
                        <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                        <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                ))}
             </div>
        ) : (
            <div className="space-y-6 max-w-4xl mx-auto">
            {events.length > 0 ? (
                 events.map((event, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-sm hover:shadow-md border-l-4 border-[#FCD116] p-6 transition-all duration-200 group">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${getEventTypeStyle(event.type)}`}>
                            {event.type}
                            </span>
                            <span className="flex items-center text-sm text-gray-500 font-medium">
                            <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-red-500" />
                            {event.date}
                            </span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#CE1126] transition-colors">{event.title}</h3>
                        <p className="text-gray-600 mb-3 text-sm leading-relaxed">{event.description}</p>
                        <div className="flex items-center text-sm text-gray-500 bg-gray-50 inline-block px-2 py-1 rounded">
                            <MapPin className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                            {event.location}
                        </div>
                        </div>
                        <div className="mt-4 md:mt-0 md:ml-6 flex flex-shrink-0">
                        <button className="w-full md:w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-bold rounded-md text-white bg-[#009460] hover:bg-green-700 shadow transition-transform transform active:scale-95">
                            <Users className="mr-2 h-4 w-4" />
                            Ça m'intéresse
                        </button>
                        </div>
                    </div>
                    </div>
                ))
            ) : (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                    <Info className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900">Aucun événement trouvé pour le moment</h3>
                    <p className="text-gray-500">Essayez de rafraîchir la recherche ou revenez plus tard.</p>
                </div>
            )}
            
            <div className="mt-8 text-center text-xs text-gray-500 bg-white p-2 rounded-full inline-block mx-auto flex items-center justify-center max-w-fit px-4 border border-gray-100">
                <Search className="h-3 w-3 mr-1" />
                Résultats générés via Google Search AI. Vérifiez toujours les dates officielles auprès des organisateurs.
            </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default EventsSection;