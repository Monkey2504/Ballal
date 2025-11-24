
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
      [ViewState.NEWS]: t.news_section_title, // Use full title
      [ViewState.EVENTS]: t.nav_events,
      [ViewState.FORUM]: t.nav_forum,
      [ViewState.DIRECTORY]: t.nav_directory,
      [ViewState.LEGAL_AID]: t.nav_legal,
      [ViewState.HISTORY]: t.nav_history,
      [ViewState.SHARE]: t.nav_share,
    };

    // Définition des descriptions par vue (Dynamique via traductions)
    const descriptions: Record<ViewState, string> = {
      [ViewState.HOME]: t.meta_desc_home || t.hero_desc,
      [ViewState.NEWS]: t.meta_desc_news,
      [ViewState.EVENTS]: t.meta_desc_events,
      [ViewState.FORUM]: t.meta_desc_forum,
      [ViewState.DIRECTORY]: t.meta_desc_directory,
      [ViewState.LEGAL_AID]: t.meta_desc_legal,
      [ViewState.HISTORY]: t.meta_desc_history,
      [ViewState.SHARE]: t.meta_desc_share
    };

    // Mise à jour du Document Title
    const pageTitle = titles[currentView] || t.hero_title;
    document.title = `BALLAL | ${pageTitle}`;

    // Mise à jour de la Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    const pageDesc = descriptions[currentView] || t.hero_desc;
    metaDescription.setAttribute('content', pageDesc);

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
            {/* La section membres est bien ici */}
            <TeamSection language={language} />
          </>
        );
      case ViewState.NEWS:
        return <NewsSection language={language} />;
      case ViewState.EVENTS:
        return <EventsSection language={language} />;
      case ViewState.FORUM:
        return <ForumSection language={language} />;
      case ViewState.DIRECTORY:
        return <DirectorySection language={language} />;
      case ViewState.LEGAL_AID:
        return <LegalAidSection language={language} />;
      case ViewState.HISTORY:
        return <HistorySection language={language} />;
      case ViewState.SHARE:
        return <ShareSection language={language} />;
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
    <div className="min-h-screen bg-african-pattern text-slate-900 font-sans">
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
