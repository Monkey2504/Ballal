
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import NewsSection from './components/NewsSection';
import EventsSection from './components/EventsSection';
import ForumSection from './components/ForumSection';
import LegalAidSection from './components/LegalAidSection';
import GallerySection from './components/GallerySection';
import HistorySection from './components/HistorySection';
import DirectorySection from './components/DirectorySection';
import ShareSection from './components/ShareSection';
import { ViewState, LanguageCode } from './types';
import { ShieldAlert, Calendar, MessageCircle, HeartHandshake, Share2 } from 'lucide-react';
import { translations } from './utils/translations';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);
  const [language, setLanguage] = useState<LanguageCode>('fr');

  const t = translations[language];

  // Scroll to top whenever the view changes - Behavior instant pour éviter le lag visuel
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [currentView]);

  // Smart Share Handler
  const handleShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: 'BALLAL ASBL',
          text: "Retrouvez BALLAL, la plateforme d'entraide pour la communauté guinéenne en Belgique !",
          url: window.location.href,
        });
      } catch (err) {
        console.log('Partage annulé ou échoué', err);
      }
    } else {
      setCurrentView(ViewState.SHARE);
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case ViewState.HOME:
        return (
          <>
            <Hero 
              onExplore={() => setCurrentView(ViewState.LEGAL_AID)} 
              language={language}
              onShare={handleShare}
            />
            
            {/* Section Services de l'ASBL */}
            <div className="bg-slate-50 py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-extrabold text-gray-900">Les Pôles d'Action de BALLAL</h2>
                        <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
                            {language === 'fr' 
                             ? "Notre mission est de soutenir l'intégration et la dignité de chaque Guinéen en Belgique." 
                             : t.hero_desc}
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                         
                         {/* Card Militante - Mise en avant */}
                         <div className="bg-white p-8 rounded-xl border-t-4 border-[#CE1126] shadow-sm cursor-pointer hover:shadow-2xl transition-all duration-300 group relative overflow-hidden" onClick={() => setCurrentView(ViewState.LEGAL_AID)}>
                            <div className="absolute top-0 right-0 bg-[#CE1126] text-white text-xs font-bold px-3 py-1 rounded-bl-lg">PRIORITÉ</div>
                            <div className="flex items-center mb-6">
                                <div className="bg-red-50 p-4 rounded-full group-hover:bg-[#CE1126] transition-colors">
                                    <ShieldAlert className="h-8 w-8 text-[#CE1126] group-hover:text-white" />
                                </div>
                            </div>
                            <h3 className="font-bold text-2xl mb-3 text-gray-900">{t.nav_legal}</h3>
                            <p className="text-gray-600 mb-6 leading-relaxed">{t.lawyer_desc}</p>
                            <span className="text-[#CE1126] font-bold text-sm uppercase tracking-wider border-b-2 border-red-100 group-hover:border-[#CE1126] pb-1 transition-all">Consulter le guide →</span>
                         </div>

                         <div className="bg-white p-8 rounded-xl border-t-4 border-[#FCD116] shadow-sm cursor-pointer hover:shadow-2xl transition-all duration-300 group" onClick={() => setCurrentView(ViewState.FORUM)}>
                            <div className="flex items-center mb-6">
                                <div className="bg-yellow-50 p-4 rounded-full group-hover:bg-[#FCD116] transition-colors">
                                    <MessageCircle className="h-8 w-8 text-yellow-600 group-hover:text-white" />
                                </div>
                            </div>
                            <h3 className="font-bold text-2xl mb-3 text-gray-900">{t.nav_forum}</h3>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                {language === 'fr' ? "Un espace sécurisé pour échanger, trouver un logement ou du soutien." : "Espace d'échange et d'entraide."}
                            </p>
                            <span className="text-yellow-600 font-bold text-sm uppercase tracking-wider border-b-2 border-yellow-100 group-hover:border-[#FCD116] pb-1 transition-all">Accéder au forum →</span>
                         </div>

                         <div className="bg-white p-8 rounded-xl border-t-4 border-[#009460] shadow-sm cursor-pointer hover:shadow-2xl transition-all duration-300 group" onClick={() => setCurrentView(ViewState.EVENTS)}>
                            <div className="flex items-center mb-6">
                                <div className="bg-green-50 p-4 rounded-full group-hover:bg-[#009460] transition-colors">
                                    <Calendar className="h-8 w-8 text-[#009460] group-hover:text-white" />
                                </div>
                            </div>
                            <h3 className="font-bold text-2xl mb-3 text-gray-900">{t.nav_events}</h3>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                {language === 'fr' ? "Promotion de la culture guinéenne en Belgique. Fêtes et réseautage." : "Kibaru et Fêtes de la communauté."}
                            </p>
                            <span className="text-[#009460] font-bold text-sm uppercase tracking-wider border-b-2 border-green-100 group-hover:border-[#009460] pb-1 transition-all">Voir l'agenda →</span>
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
        return <LegalAidSection language={language} />;
      case ViewState.GALLERY:
        return <GallerySection />;
      case ViewState.HISTORY:
        return <HistorySection />;
      case ViewState.DIRECTORY:
        return <DirectorySection />;
      case ViewState.SHARE:
        return <ShareSection />;
      default:
        return <Hero onExplore={() => setCurrentView(ViewState.EVENTS)} language={language} onShare={handleShare} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar currentView={currentView} setView={setCurrentView} language={language} setLanguage={setLanguage} />
      
      <main className="flex-grow">
        {renderContent()}
      </main>

      <footer className="bg-slate-900 text-slate-300 border-t-4 border-transparent relative">
        <div className="absolute top-0 left-0 w-full h-1 guinea-gradient-bg"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center mb-4 text-white">
                  <HeartHandshake className="h-8 w-8 text-[#CE1126] mr-2" />
                  <span className="text-xl font-black tracking-tight">BALLAL ASBL</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Association Sans But Lucratif dédiée à l'entraide, à l'intégration et au rayonnement de la communauté guinéenne en Belgique.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-6">L'Association</h4>
              <ul className="space-y-3 text-sm">
                <li><button onClick={() => setCurrentView(ViewState.HOME)} className="hover:text-white transition-colors">{t.nav_home}</button></li>
                <li><button onClick={() => setCurrentView(ViewState.HISTORY)} className="hover:text-white transition-colors">{t.nav_history}</button></li>
                <li><button onClick={() => setCurrentView(ViewState.LEGAL_AID)} className="hover:text-[#CE1126] text-white font-medium transition-colors">{t.nav_legal}</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-6">Communauté</h4>
              <ul className="space-y-3 text-sm">
                <li><button onClick={() => setCurrentView(ViewState.DIRECTORY)} className="hover:text-white transition-colors">{t.nav_directory}</button></li>
                <li><button onClick={() => setCurrentView(ViewState.NEWS)} className="hover:text-white transition-colors">{t.nav_news}</button></li>
                <li><button onClick={() => setCurrentView(ViewState.EVENTS)} className="hover:text-white transition-colors">{t.nav_events}</button></li>
                <li><button onClick={() => setCurrentView(ViewState.FORUM)} className="hover:text-white transition-colors">{t.nav_forum}</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-6">Contact</h4>
              <p className="text-white font-bold text-sm mb-2">contact@ballal-asbl.be</p>
              
              <div className="flex space-x-4 mt-4">
                 <div className="w-8 h-8 bg-slate-800 rounded flex items-center justify-center hover:bg-blue-600 cursor-pointer transition-colors text-white font-bold text-xs">FB</div>
                 <div className="w-8 h-8 bg-slate-800 rounded flex items-center justify-center hover:bg-pink-600 cursor-pointer transition-colors text-white font-bold text-xs">IG</div>
                 <button onClick={() => setCurrentView(ViewState.SHARE)} className="w-8 h-8 bg-slate-800 rounded flex items-center justify-center hover:bg-green-600 cursor-pointer transition-colors text-white font-bold text-xs"><Share2 className="h-4 w-4"/></button>
              </div>
            </div>
          </div>
          <div className="mt-16 border-t border-slate-800 pt-8 text-center text-slate-600 text-xs flex justify-between items-center flex-col md:flex-row">
            <span>&copy; 2024 BALLAL ASBL.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
