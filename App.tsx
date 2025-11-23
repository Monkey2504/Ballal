
import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import NewsSection from './components/NewsSection';
import EventsSection from './components/EventsSection';
import ForumSection from './components/ForumSection';
import LegalAidSection from './components/LegalAidSection';
import HistorySection from './components/HistorySection';
import DirectorySection from './components/DirectorySection';
import ShareSection from './components/ShareSection';
import TeamSection from './components/TeamSection';
import { ViewState, LanguageCode } from './types';
import { ShieldAlert, Calendar, MessageCircle, HeartHandshake, Share2, Users, Image as ImageIcon, Upload } from 'lucide-react';
import { translations } from './utils/translations';

// --- CONFIGURATION IMAGE MEMBRES ---
// COLLEZ LE LIEN DE VOTRE PHOTO CI-DESSOUS ENTRE LES GUILLEMETS
const VOTRE_LIEN_IMAGE_ICI = "https://drive.google.com/uc?export=view&id=1GC-ZOAU1Pu8RwdXYgzaIoPBjg8qXs9tr"; 
// Exemple : "https://monsite.com/photo.jpg" ou le lien Google Storage public

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);
  const [language, setLanguage] = useState<LanguageCode>('fr');
  
  // État pour la photo des membres
  const [memberPhoto, setMemberPhoto] = useState(VOTRE_LIEN_IMAGE_ICI);
  const [photoError, setPhotoError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const t = translations[language];

  // Scroll to top whenever the view changes - Behavior instant pour éviter le lag visuel
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [currentView]);

  // Si l'utilisateur change le lien dans le code, on met à jour l'état
  useEffect(() => {
    setMemberPhoto(VOTRE_LIEN_IMAGE_ICI);
    setPhotoError(false);
  }, []);

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
  
  // Gestionnaire d'upload de photo locale
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setMemberPhoto(url);
      setPhotoError(false);
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
            <div className="bg-white py-16 border-b border-gray-100 shadow-sm">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-extrabold text-gray-900">Les Pôles d'Action de BALLAL</h2>
                        <p className="mt-4 text-gray-600 font-medium max-w-2xl mx-auto">
                            {language === 'fr' 
                             ? "Notre mission est de soutenir l'intégration et la dignité de chaque Guinéen en Belgique." 
                             : t.hero_desc}
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                         
                         {/* Card Militante - Mise en avant */}
                         <div className="bg-white p-8 rounded-xl border-t-4 border-[#CE1126] shadow-md cursor-pointer hover:shadow-2xl transition-all duration-300 group relative overflow-hidden" onClick={() => setCurrentView(ViewState.LEGAL_AID)}>
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

                         <div className="bg-white p-8 rounded-xl border-t-4 border-[#FCD116] shadow-md cursor-pointer hover:shadow-2xl transition-all duration-300 group" onClick={() => setCurrentView(ViewState.FORUM)}>
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

                         <div className="bg-white p-8 rounded-xl border-t-4 border-[#009460] shadow-md cursor-pointer hover:shadow-2xl transition-all duration-300 group" onClick={() => setCurrentView(ViewState.EVENTS)}>
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
            
            {/* SECTION BUREAU EXÉCUTIF */}
            <div className="bg-slate-50">
               <TeamSection language={language} />
            </div>

            {/* SECTION NOS MEMBRES (Photo de groupe) */}
            <div className="bg-white py-20 border-t border-gray-100">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10">
                   <div className="inline-flex items-center justify-center p-3 bg-red-50 rounded-full mb-4">
                      <Users className="h-8 w-8 text-[#CE1126]" />
                   </div>
                   <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                     Nos Membres
                   </h2>
                   <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600 font-medium">
                     La force de BALLAL, c'est son union. Plus de 500 membres actifs à travers la Belgique.
                   </p>
                </div>
                
                {/* Conteneur image robuste avec position absolue et Upload manuel */}
                <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-slate-100 bg-gray-200 relative group h-96 md:h-[600px]">
                  
                  {/* Input File invisible */}
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handlePhotoUpload} 
                    className="hidden" 
                    accept="image/*"
                  />

                  {/* Fallback en cas d'erreur de chargement ou pas de lien */}
                  <div className={`absolute inset-0 flex items-center justify-center text-gray-400 z-0 bg-slate-100 ${photoError || !memberPhoto ? 'z-20' : ''}`}>
                     <div className="text-center p-6">
                        <ImageIcon className="h-16 w-16 mx-auto mb-4 opacity-30" />
                        
                        {!memberPhoto ? (
                             <div className="bg-red-50 border border-red-200 p-4 rounded-lg max-w-md mx-auto">
                                <p className="font-bold text-red-700 mb-2">Aucune image configurée</p>
                                <p className="text-sm text-red-600 mb-4">
                                    Veuillez coller le lien de votre image dans le fichier <code>App.tsx</code> à la ligne 15.
                                </p>
                             </div>
                        ) : (
                            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg max-w-md mx-auto">
                                <p className="font-bold text-yellow-800 mb-2">Erreur d'affichage</p>
                                <p className="text-sm text-yellow-700 mb-4">
                                    Le lien de l'image ne fonctionne pas ou est privé. Vérifiez le lien dans le code.
                                </p>
                             </div>
                        )}

                        <button 
                            onClick={() => fileInputRef.current?.click()}
                            className="mt-6 bg-white border border-gray-300 px-4 py-2 rounded-full text-sm font-bold text-gray-700 hover:bg-gray-50 flex items-center mx-auto shadow-sm transition-all hover:scale-105"
                        >
                            <Upload className="h-4 w-4 mr-2" />
                            Charger une photo (Visible uniquement pour vous)
                        </button>
                     </div>
                  </div>
                  
                  {/* L'image elle-même */}
                  {memberPhoto && !photoError && (
                      <img 
                        src={memberPhoto} 
                        alt="Membres de BALLAL ASBL"
                        className="absolute inset-0 w-full h-full object-cover z-10 transition-transform duration-700 group-hover:scale-105"
                        onError={() => setPhotoError(true)}
                        referrerPolicy="no-referrer"
                      />
                  )}
                  
                  {/* Bouton Edit discret (visible au survol) */}
                  <div className="absolute top-4 right-4 z-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                     <button 
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-black/40 hover:bg-black/70 text-white p-2.5 rounded-full backdrop-blur-md transition-all shadow-lg border border-white/20"
                        title="Changer la photo pour ma session"
                     >
                        <Upload className="h-5 w-5" />
                     </button>
                  </div>
                  
                  {/* Overlay dégradé */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-20 pointer-events-none ${(photoError || !memberPhoto) ? 'hidden' : ''}`}></div>
                  
                  {/* Légende */}
                  <div className={`absolute bottom-6 left-6 z-30 text-white pointer-events-none ${(photoError || !memberPhoto) ? 'hidden' : ''}`}>
                     <p className="font-bold text-lg uppercase tracking-wider">L'Union fait la force</p>
                     <p className="text-sm opacity-90">Rassemblement 2024</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50">
               <NewsSection />
            </div>
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
    <div className="min-h-screen flex flex-col font-sans relative bg-slate-50" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      
      {/* CONTENU PRINCIPAL */}
      <div className="relative z-10 flex flex-col min-h-screen">
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
    </div>
  );
};

export default App;
