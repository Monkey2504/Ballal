
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import NewsSection from './components/NewsSection';
import ForumSection from './components/ForumSection';
import LegalAidSection from './components/LegalAidSection';
import HistorySection from './components/HistorySection';
import ShareSection from './components/ShareSection';
import DonationSection from './components/DonationSection';
import TeamSection from './components/TeamSection';
import FoodAutonomySection from './components/FoodAutonomySection';
import { FoodSupplierForm, FoodNetworkForm } from './components/FoodForms';
import Footer from './components/Footer';
import { ViewState, LanguageCode } from './types';
import { translations } from './utils/translations';
import { AuthProvider } from './contexts/AuthContext';

const AppContent: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);
  const [language, setLanguage] = useState<LanguageCode>('fr');
  const t = translations[language];

  // --- GESTION SEO & ACCESSIBILITÉ (RTL) ---
  useEffect(() => {
    // 1. Gestion RTL (Right-to-Left) pour l'Arabe
    const dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.lang = language;

    // 2. Définition des titres par vue
    const titles: Record<ViewState, string> = {
      [ViewState.HOME]: t.hero_title,
      [ViewState.NEWS]: t.news_section_title,
      [ViewState.FORUM]: t.nav_forum,
      [ViewState.LEGAL_AID]: t.nav_legal,
      [ViewState.HISTORY]: t.nav_history,
      [ViewState.SHARE]: t.nav_share,
      [ViewState.DONATE]: t.btn_donate,
      [ViewState.FOOD_AUTONOMY]: t.nav_food_project,
      [ViewState.FOOD_SUPPLIER]: t.form_supplier_title,
      [ViewState.FOOD_NETWORK]: t.form_network_title,
    };

    // 3. Définition des descriptions par vue (Dynamique via traductions)
    const descriptions: Record<ViewState, string> = {
      [ViewState.HOME]: t.meta_desc_home || t.hero_desc,
      [ViewState.NEWS]: t.meta_desc_news,
      [ViewState.FORUM]: t.meta_desc_forum,
      [ViewState.LEGAL_AID]: t.meta_desc_legal,
      [ViewState.HISTORY]: t.meta_desc_history,
      [ViewState.SHARE]: t.meta_desc_share,
      [ViewState.DONATE]: t.donate_subtitle,
      [ViewState.FOOD_AUTONOMY]: t.meta_desc_food,
      [ViewState.FOOD_SUPPLIER]: t.meta_desc_food,
      [ViewState.FOOD_NETWORK]: t.meta_desc_food,
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
              onDonate={() => setCurrentView(ViewState.DONATE)}
            />
            <TeamSection language={language} />
          </>
        );
      case ViewState.NEWS:
        return <NewsSection language={language} />;
      case ViewState.FORUM:
        return <ForumSection language={language} />;
      case ViewState.LEGAL_AID:
        return <LegalAidSection language={language} />;
      case ViewState.FOOD_AUTONOMY:
        return <FoodAutonomySection language={language} setView={setCurrentView} />;
      case ViewState.FOOD_SUPPLIER:
        return <FoodSupplierForm language={language} onBack={() => setCurrentView(ViewState.FOOD_AUTONOMY)} />;
      case ViewState.FOOD_NETWORK:
        return <FoodNetworkForm language={language} onBack={() => setCurrentView(ViewState.FOOD_AUTONOMY)} />;
      case ViewState.HISTORY:
        return <HistorySection language={language} />;
      case ViewState.SHARE:
        return <ShareSection language={language} />;
      case ViewState.DONATE:
        return <DonationSection language={language} />;
      default:
        return (
          <>
            <Hero 
              onExplore={() => setCurrentView(ViewState.LEGAL_AID)} 
              language={language}
              onShare={() => setCurrentView(ViewState.SHARE)}
              onDonate={() => setCurrentView(ViewState.DONATE)}
            />
            <TeamSection language={language} />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-african-pattern text-slate-900 font-sans flex flex-col">
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
      
      <main id="main-content" tabIndex={-1} className="outline-none flex-grow">
        {renderView()}
      </main>

      <Footer language={language} />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
