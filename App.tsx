import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import NewsSection from './components/NewsSection';
import EventsSection from './components/EventsSection';
import ForumSection from './components/ForumSection';
import DirectorySection from './components/DirectorySection';
import LegalAidSection from './components/LegalAidSection';
import HistorySection from './components/HistorySection';
import ShareSection from './components/ShareSection';
import TeamSection from './components/TeamSection';
import { ViewState, LanguageCode } from './types';
import { translations } from './utils/translations';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);
  const [language, setLanguage] = useState<LanguageCode>('fr');
  const t = translations[language];

  // --- GESTION SEO DYNAMIQUE ---
  useEffect(() => {
    // Définition des titres par vue
    const titles: Record<ViewState, string> = {
      [ViewState.HOME]: t.hero_title,
      [ViewState.NEWS]: t.nav_news,
      [ViewState.EVENTS]: t.nav_events,
      [ViewState.FORUM]: t.nav_forum,
      [ViewState.DIRECTORY]: t.nav_directory,
      [ViewState.LEGAL_AID]: t.nav_legal,
      [ViewState.HISTORY]: t.nav_history,
      [ViewState.SHARE]: t.nav_share,
    };

    // Définition des descriptions par vue
    const descriptions: Record<ViewState, string> = {
      [ViewState.HOME]: t.hero_desc,
      [ViewState.NEWS]: `Actualités vérifiées de la Guinée et de la diaspora en Belgique. ${t.nav_news}.`,
      [ViewState.EVENTS]: `Agenda des événements culturels, fêtes et meetups de la communauté guinéenne. ${t.nav_events}.`,
      [ViewState.FORUM]: "Espace de discussion, d'entraide et de partage pour les Guinéens de Belgique.",
      [ViewState.DIRECTORY]: "Annuaire des commerces, entrepreneurs et services guinéens en Belgique.",
      [ViewState.LEGAL_AID]: t.urgent_alert,
      [ViewState.HISTORY]: "Découvrez l'histoire de la communauté guinéenne en Belgique, de 1958 à nos jours.",
      [ViewState.SHARE]: "Partagez l'application Ballal ASBL pour renforcer notre communauté."
    };

    // Mise à jour du Document Title
    document.title = `BALLAL | ${titles[currentView]}`;

    // Mise à jour de la Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', descriptions[currentView] || t.hero_desc);

  }, [currentView, language, t]);

  const renderView = () => {
    switch (currentView) {
      case ViewState.HOME:
        return (
          <>
            <Hero 
              onExplore={() => setCurrentView(ViewState.LEGAL_AID)} 
              language={language}
              onShare={() => setCurrentView(ViewState.SHARE)}
            />
            <TeamSection language={language} />
          </>
        );
      case ViewState.NEWS:
        return <NewsSection />;
      case ViewState.EVENTS:
        return <EventsSection />;
      case ViewState.FORUM:
        return <ForumSection />;
      case ViewState.DIRECTORY:
        return <DirectorySection />;
      case ViewState.LEGAL_AID:
        return <LegalAidSection language={language} />;
      case ViewState.HISTORY:
        return <HistorySection />;
      case ViewState.SHARE:
        return <ShareSection />;
      default:
        return (
          <>
            <Hero 
              onExplore={() => setCurrentView(ViewState.LEGAL_AID)} 
              language={language}
              onShare={() => setCurrentView(ViewState.SHARE)}
            />
            <TeamSection language={language} />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#CE1126] focus:text-white focus:font-bold focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-4 focus:ring-yellow-400"
      >
        Aller au contenu principal
      </a>
      
      <Navbar 
        currentView={currentView} 
        setView={setCurrentView} 
        language={language} 
        setLanguage={setLanguage} 
      />
      
      <main id="main-content" tabIndex={-1} className="outline-none">
        {renderView()}
      </main>
    </div>
  );
};

export default App;