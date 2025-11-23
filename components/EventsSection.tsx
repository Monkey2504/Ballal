import React, { useState, useEffect, useCallback } from 'react';
import { Calendar, MapPin, Users, RefreshCw, Search, Info, Clock, ArrowRight } from 'lucide-react';
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

  const getEventTypeColor = (type: string) => {
      switch (type) {
          case 'Fête': return 'text-[#CE1126] bg-red-50 border-red-100';
          case 'Business': return 'text-[#FCD116] bg-yellow-50 border-yellow-100 text-yellow-700';
          case 'Culture': return 'text-[#009460] bg-green-50 border-green-100';
          case 'Meetup': return 'text-purple-600 bg-purple-50 border-purple-100';
          default: return 'text-gray-600 bg-gray-50';
      }
  };

  return (
    <div className="py-16 min-h-screen bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 bg-white p-12 rounded-[2rem] shadow-sm border-b-8 border-[#FCD116] relative overflow-hidden">
          <div className="absolute inset-0 bg-african-pattern opacity-30 pointer-events-none"></div>
          
          <div className="relative z-10">
            {/* H1 SEO Optimization */}
            <h1 className="text-4xl font-black text-slate-900 sm:text-5xl mb-6 tracking-tight">
              Agenda de la Communauté
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-gray-600 font-medium leading-relaxed">
              Les événements incontournables : Fêtes, Business, Culture et Rencontres.
            </p>
            
            <div className="mt-10 flex justify-center">
              <button 
                  onClick={loadEvents}
                  disabled={loading}
                  className="inline-flex items-center px-8 py-4 border border-transparent text-base font-bold rounded-full shadow-lg text-white bg-slate-900 hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 disabled:opacity-70 transition-all hover:-translate-y-1"
              >
                  <RefreshCw className={`mr-2 h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
                  {loading ? 'Recherche en cours...' : 'Actualiser l\'agenda'}
              </button>
            </div>
          </div>
        </div>
        
        {loading ? (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="bg-white rounded-2xl shadow-sm overflow-hidden animate-pulse border border-gray-100 h-96">
                        <div className="h-48 bg-gray-200"></div>
                        <div className="p-6 space-y-4">
                            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        </div>
                    </div>
                ))}
             </div>
        ) : (
            <div className="space-y-6">
            {events.length > 0 ? (
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                 {events.map((event, index) => (
                    <div key={index} className="bg-white rounded-3xl shadow-md card-hover-effect overflow-hidden flex flex-col border border-gray-100 group">
                        {/* Image Header */}
                        <div className="h-56 overflow-hidden relative">
                             <div className="absolute inset-0 bg-gray-900/10 group-hover:bg-transparent transition-colors z-10"></div>
                             {event.imageUrl ? (
                                <img 
                                    src={event.imageUrl} 
                                    alt={event.type} 
                                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                                />
                             ) : (
                                <div className="w-full h-full bg-slate-200"></div>
                             )}
                             <div className="absolute top-4 right-4 z-20">
                                 <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider border ${getEventTypeColor(event.type)} shadow-lg`}>
                                     {event.type}
                                 </span>
                             </div>
                             {/* Date Badge */}
                             <div className="absolute bottom-4 left-4 z-20 bg-white/95 backdrop-blur text-slate-900 px-3 py-1 rounded-lg font-bold text-xs shadow-md border border-gray-100 flex items-center">
                                <Calendar className="h-3 w-3 mr-1.5 text-[#CE1126]" />
                                {event.date.split(',')[0]}
                             </div>
                        </div>

                        {/* Content */}
                        <div className="p-7 flex flex-col flex-grow relative bg-white">
                            
                            <h3 className="text-xl font-black text-slate-900 mb-3 group-hover:text-[#CE1126] transition-colors line-clamp-2 leading-tight">
                                {event.title}
                            </h3>
                            
                            <div className="flex items-center text-xs font-bold text-gray-500 mb-4 uppercase tracking-wide">
                                <Clock className="h-3 w-3 mr-1.5 text-gray-400" />
                                <span className="truncate">{event.date}</span>
                            </div>

                            <p className="text-gray-600 text-sm mb-6 line-clamp-3 flex-grow leading-relaxed font-medium">
                                {event.description}
                            </p>
                            
                            <div className="pt-5 border-t border-gray-100 mt-auto">
                                <div className="flex items-center text-sm text-gray-500 mb-5">
                                    <MapPin className="h-4 w-4 mr-2 text-[#009460]" />
                                    <span className="truncate font-semibold">{event.location}</span>
                                </div>
                                <button className="w-full inline-flex items-center justify-center px-4 py-3 border border-transparent text-sm font-bold rounded-xl text-white bg-[#CE1126] hover:bg-red-700 transition-colors shadow-red-100 shadow-lg">
                                    <Users className="mr-2 h-4 w-4" />
                                    Je participe
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
                    <Info className="h-16 w-16 text-gray-300 mx-auto mb-6" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Aucun événement trouvé</h3>
                    <p className="text-gray-500 text-lg">Revenez plus tard ou proposez votre événement.</p>
                </div>
            )}
            
            <div className="mt-12 text-center text-xs text-gray-400 flex items-center justify-center font-medium">
                <Search className="h-3 w-3 mr-2 opacity-50" />
                Résultats agrégés via Google Search AI.
            </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default EventsSection;