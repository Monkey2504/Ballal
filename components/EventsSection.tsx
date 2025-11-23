import React from 'react';
import { Calendar, MapPin, Users } from 'lucide-react';
import { CommunityEvent } from '../types';

const MOCK_EVENTS: CommunityEvent[] = [
  {
    id: '1',
    title: 'Dîner de Gala - Indépendance',
    date: '02 Octobre 2024 • 19:00',
    location: 'Salle La Madeleine, Bruxelles',
    description: 'Célébration de la fête de l\'indépendance avec musique live, repas traditionnel et réseautage.',
    type: 'Fête'
  },
  {
    id: '2',
    title: 'Networking Entrepreneurs Guinéens',
    date: '15 Novembre 2024 • 18:00',
    location: 'Co-Working Space, Liège',
    description: 'Rencontrez les entrepreneurs de la diaspora. Échange de cartes, pitchs et opportunités.',
    type: 'Business'
  },
  {
    id: '3',
    title: 'Atelier Cuisine : Le Fouti',
    date: '20 Novembre 2024 • 14:00',
    location: 'Centre Culturel, Anvers',
    description: 'Apprenez à cuisiner le Fouti Lafidi authentique. Ingrédients fournis.',
    type: 'Culture'
  }
];

const EventsSection: React.FC = () => {
  return (
    <div className="bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Agenda de la Communauté
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Ne manquez pas les prochains rassemblements en Belgique.
          </p>
        </div>
        
        <div className="space-y-6">
          {MOCK_EVENTS.map((event) => (
            <div key={event.id} className="bg-white rounded-lg shadow-sm hover:shadow border-l-4 border-yellow-400 p-6 transition-all duration-200">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      {event.type}
                    </span>
                    <span className="flex items-center text-sm text-gray-500">
                      <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                      {event.date}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                  <p className="text-gray-600 mb-3">{event.description}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                    {event.location}
                  </div>
                </div>
                <div className="mt-4 md:mt-0 md:ml-6 flex flex-shrink-0">
                  <button className="w-full md:w-auto inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700">
                    <Users className="mr-2 h-4 w-4" />
                    Je participe
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventsSection;