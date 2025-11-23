import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import NewsSection from './components/NewsSection';
import EventsSection from './components/EventsSection';
import ForumSection from './components/ForumSection';
import LegalAidSection from './components/LegalAidSection';
import GallerySection from './components/GallerySection';
import HistorySection from './components/HistorySection';
import { ViewState } from './types';
import { ShieldAlert, Calendar, MessageCircle, HeartHandshake } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);

  const renderContent = () => {
    switch (currentView) {
      case ViewState.HOME:
        return (
          <>
            <Hero onExplore={() => setCurrentView(ViewState.LEGAL_AID)} />
            
            {/* Section Services de l'ASBL */}
            <div className="bg-slate-50 py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-extrabold text-gray-900">Les Pôles d'Action de BALLAL</h2>
                        <p className="mt-4 text-gray-500 max-w-2xl mx-auto">Notre mission est de soutenir l'intégration et la dignité de chaque Guinéen en Belgique.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                         
                         {/* Card Militante - Mise en avant */}
                         <div className="bg-white p-8 rounded-xl border-t-4 border-red-600 shadow-sm cursor-pointer hover:shadow-2xl transition-all duration-300 group relative overflow-hidden" onClick={() => setCurrentView(ViewState.LEGAL_AID)}>
                            <div className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">PRIORITÉ</div>
                            <div className="flex items-center mb-6">
                                <div className="bg-red-50 p-4 rounded-full group-hover:bg-red-600 transition-colors">
                                    <ShieldAlert className="h-8 w-8 text-red-600 group-hover:text-white" />
                                </div>
                            </div>
                            <h3 className="font-bold text-2xl mb-3 text-gray-900">Pôle Juridique & Social</h3>
                            <p className="text-gray-600 mb-6 leading-relaxed">Accompagnement d'urgence pour les sans-papiers. Accès à l'Aide Médicale Urgente (AMU), droits au logement et défense légale (Pro Deo).</p>
                            <span className="text-red-600 font-bold text-sm uppercase tracking-wider border-b-2 border-red-100 group-hover:border-red-600 pb-1 transition-all">Consulter le guide →</span>
                         </div>

                         <div className="bg-white p-8 rounded-xl border-t-4 border-yellow-400 shadow-sm cursor-pointer hover:shadow-2xl transition-all duration-300 group" onClick={() => setCurrentView(ViewState.FORUM)}>
                            <div className="flex items-center mb-6">
                                <div className="bg-yellow-50 p-4 rounded-full group-hover:bg-yellow-400 transition-colors">
                                    <MessageCircle className="h-8 w-8 text-yellow-600 group-hover:text-white" />
                                </div>
                            </div>
                            <h3 className="font-bold text-2xl mb-3 text-gray-900">Entraide Communautaire</h3>
                            <p className="text-gray-600 mb-6 leading-relaxed">Un espace sécurisé pour échanger, trouver un logement, un emploi ou simplement du soutien moral auprès de la diaspora.</p>
                            <span className="text-yellow-600 font-bold text-sm uppercase tracking-wider border-b-2 border-yellow-100 group-hover:border-yellow-400 pb-1 transition-all">Accéder au forum →</span>
                         </div>

                         <div className="bg-white p-8 rounded-xl border-t-4 border-green-600 shadow-sm cursor-pointer hover:shadow-2xl transition-all duration-300 group" onClick={() => setCurrentView(ViewState.EVENTS)}>
                            <div className="flex items-center mb-6">
                                <div className="bg-green-50 p-4 rounded-full group-hover:bg-green-600 transition-colors">
                                    <Calendar className="h-8 w-8 text-green-600 group-hover:text-white" />
                                </div>
                            </div>
                            <h3 className="font-bold text-2xl mb-3 text-gray-900">Culture & Événements</h3>
                            <p className="text-gray-600 mb-6 leading-relaxed">Promotion de la culture guinéenne en Belgique. Festivals, conférences, fêtes de l'indépendance et réseautage professionnel.</p>
                            <span className="text-green-600 font-bold text-sm uppercase tracking-wider border-b-2 border-green-100 group-hover:border-green-600 pb-1 transition-all">Voir l'agenda →</span>
                         </div>
                    </div>
                </div>
            </div>
            
            <NewsSection />
          </>
        );
      case ViewState.NEWS:
        return <NewsSection />;
      case ViewState.EVENTS:
        return <EventsSection />;
      case ViewState.FORUM:
        return <ForumSection />;
      case ViewState.LEGAL_AID:
        return <LegalAidSection />;
      case ViewState.GALLERY:
        return <GallerySection />;
      case ViewState.HISTORY:
        return <HistorySection />;
      default:
        return <Hero onExplore={() => setCurrentView(ViewState.EVENTS)} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar currentView={currentView} setView={setCurrentView} />
      
      <main className="flex-grow">
        {renderContent()}
      </main>

      <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center mb-4 text-white">
                  <HeartHandshake className="h-8 w-8 text-red-600 mr-2" />
                  <span className="text-xl font-black tracking-tight">BALLAL ASBL</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Association Sans But Lucratif dédiée à l'entraide, à l'intégration et au rayonnement de la communauté guinéenne en Belgique.
              </p>
              <div className="mt-6 text-xs text-slate-500">
                Numéro d'entreprise : 0XXX.XXX.XXX<br/>
                RPM Bruxelles
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-6">L'Association</h4>
              <ul className="space-y-3 text-sm">
                <li><button onClick={() => setCurrentView(ViewState.HOME)} className="hover:text-white transition-colors">Accueil</button></li>
                <li><button onClick={() => setCurrentView(ViewState.HISTORY)} className="hover:text-white transition-colors">Notre Mission</button></li>
                <li><button onClick={() => setCurrentView(ViewState.LEGAL_AID)} className="hover:text-red-500 text-white font-medium transition-colors">Aide Juridique</button></li>
                <li><button className="hover:text-white transition-colors">Devenir Bénévole</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-6">Communauté</h4>
              <ul className="space-y-3 text-sm">
                <li><button onClick={() => setCurrentView(ViewState.NEWS)} className="hover:text-white transition-colors">Actualités</button></li>
                <li><button onClick={() => setCurrentView(ViewState.EVENTS)} className="hover:text-white transition-colors">Agenda</button></li>
                <li><button onClick={() => setCurrentView(ViewState.FORUM)} className="hover:text-white transition-colors">Forum de discussion</button></li>
                <li><button onClick={() => setCurrentView(ViewState.GALLERY)} className="hover:text-white transition-colors">Galerie Photos</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-6">Contact</h4>
              <p className="text-slate-400 text-sm mb-2">Maison des Associations</p>
              <p className="text-slate-400 text-sm mb-4">Rue de la Solidarité 12, 1000 Bruxelles</p>
              <p className="text-white font-bold text-sm mb-6">contact@ballal-asbl.be</p>
              
              <div className="flex space-x-4">
                 <div className="w-8 h-8 bg-slate-800 rounded flex items-center justify-center hover:bg-blue-600 cursor-pointer transition-colors text-white font-bold text-xs">FB</div>
                 <div className="w-8 h-8 bg-slate-800 rounded flex items-center justify-center hover:bg-pink-600 cursor-pointer transition-colors text-white font-bold text-xs">IG</div>
                 <div className="w-8 h-8 bg-slate-800 rounded flex items-center justify-center hover:bg-blue-400 cursor-pointer transition-colors text-white font-bold text-xs">TW</div>
              </div>
            </div>
          </div>
          <div className="mt-16 border-t border-slate-800 pt-8 text-center text-slate-600 text-xs flex justify-between items-center flex-col md:flex-row">
            <span>&copy; 2024 BALLAL ASBL. Tous droits réservés.</span>
            <div className="space-x-4 mt-4 md:mt-0">
                <span className="hover:text-slate-400 cursor-pointer">Politique de confidentialité</span>
                <span className="hover:text-slate-400 cursor-pointer">Mentions légales</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;