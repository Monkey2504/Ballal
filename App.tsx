

import React, { useState, useEffect, Suspense, lazy, Component, ErrorInfo, ReactNode } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import { ViewState, LanguageCode } from './types';
import { translations } from './utils/translations';
import { AuthProvider } from './contexts/AuthContext';
import { Loader2, AlertTriangle, RefreshCcw } from 'lucide-react';

// --- LAZY LOADING DES SECTIONS (PERFORMANCE P2) ---
// Réduit la taille du bundle initial.
const NewsSection = lazy(() => import('./components/NewsSection'));
const ForumSection = lazy(() => import('./components/ForumSection'));
const LegalAidSection = lazy(() => import('./components/LegalAidSection'));
const HistorySection = lazy(() => import('./components/HistorySection'));
const ShareSection = lazy(() => import('./components/ShareSection'));
const DonationSection = lazy(() => import('./components/DonationSection'));
const TeamSection = lazy(() => import('./components/TeamSection'));
const FoodAutonomySection = lazy(() => import('./components/FoodAutonomySection'));
const DirectorySection = lazy(() => import('./components/DirectorySection')); 
const ContactSection = lazy(() => import('./components/ContactSection'));

// Note: FoodForms importés dynamiquement ou gardés ici s'ils sont légers. 
// Pour simplifier l'exemple, importons-les normalement s'ils sont petits, sinon lazy.
// Ici, on va lazy load les forms aussi.
const FoodFormsImport = lazy(() => import('./components/FoodForms').then(module => ({ default: module.FoodSupplierForm })));
const FoodNetworkFormImport = lazy(() => import('./components/FoodForms').then(module => ({ default: module.FoodNetworkForm })));

// --- ERROR BOUNDARY (ROBUSTESSE P2/Yellow 3) ---
class ErrorBoundary extends Component<{ children: ReactNode, t: any }, { hasError: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[50vh] flex flex-col items-center justify-center p-8 text-center bg-red-50 rounded-xl m-4 border border-red-100">
          <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Une erreur est survenue</h2>
          <p className="text-gray-600 mb-6">Impossible de charger cette section. Vérifiez votre connexion.</p>
          <button 
            onClick={() => this.setState({ hasError: false })}
            className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition-colors"
          >
            <RefreshCcw className="mr-2 h-4 w-4" /> Réessayer
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// --- LOADING COMPONENT ---
const LoadingFallback = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center">
    <Loader2 className="h-10 w-10 text-[#CE1126] animate-spin mb-4" />
    <p className="text-gray-500 font-medium animate-pulse">Chargement...</p>
  </div>
);

// --- HOOKS PERSONNALISÉS ---

// 1. Gestion du Routing via Hash (P1)
const useHashRouting = (initialView: ViewState) => {
  // Mapping ViewState <-> Hash slug
  const getHashFromView = (view: ViewState) => {
    switch(view) {
      case ViewState.HOME: return '';
      case ViewState.NEWS: return 'news';
      case ViewState.FORUM: return 'forum';
      case ViewState.LEGAL_AID: return 'legal';
      case ViewState.HISTORY: return 'history';
      case ViewState.SHARE: return 'share';
      case ViewState.DONATE: return 'donate';
      case ViewState.FOOD_AUTONOMY: return 'food-project';
      case ViewState.FOOD_SUPPLIER: return 'food-supplier';
      case ViewState.FOOD_NETWORK: return 'food-network';
      case ViewState.CONTACT: return 'contact';
      // case ViewState.DIRECTORY: return 'directory'; // Si on réactive l'annuaire
      default: return '';
    }
  };

  const getViewFromHash = () => {
    const hash = window.location.hash.replace('#', '');
    switch(hash) {
      case 'news': return ViewState.NEWS;
      case 'forum': return ViewState.FORUM;
      case 'legal': return ViewState.LEGAL_AID;
      case 'history': return ViewState.HISTORY;
      case 'share': return ViewState.SHARE;
      case 'donate': return ViewState.DONATE;
      case 'food-project': return ViewState.FOOD_AUTONOMY;
      case 'food-supplier': return ViewState.FOOD_SUPPLIER;
      case 'food-network': return ViewState.FOOD_NETWORK;
      case 'contact': return ViewState.CONTACT;
      // case 'directory': return ViewState.DIRECTORY;
      default: return ViewState.HOME;
    }
  };

  const [view, setView] = useState<ViewState>(getViewFromHash());

  useEffect(() => {
    const handleHashChange = () => {
      setView(getViewFromHash());
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (newView: ViewState) => {
    const hash = getHashFromView(newView);
    if (hash === '') {
       // Clean URL for home
       history.pushState(null, '', window.location.pathname + window.location.search);
       // Manually trigger update since pushState doesn't fire hashchange
       setView(ViewState.HOME);
    } else {
       window.location.hash = hash;
    }
    // Scroll top logic is handled in focus management
  };

  return { view, navigate };
};

// 2. Gestion de la Langue avec Persistance (Yellow 2)
const usePersistedLanguage = () => {
  const getInitialLang = (): LanguageCode => {
    const saved = localStorage.getItem('ballal_lang');
    if (saved && ['fr', 'en', 'nl', 'de', 'es', 'ar', 'pe', 'ma', 'su'].includes(saved)) {
      return saved as LanguageCode;
    }
    // Détection navigateur simple
    const browserLang = navigator.language.split('-')[0];
    if (['fr', 'en', 'nl', 'de', 'es', 'ar'].includes(browserLang)) {
      return browserLang as LanguageCode;
    }
    return 'fr';
  };

  const [language, setLanguage] = useState<LanguageCode>(getInitialLang());

  useEffect(() => {
    localStorage.setItem('ballal_lang', language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  return { language, setLanguage };
};

// 3. Gestion SEO Dynamique (P3)
const useSEO = (view: ViewState, t: any) => {
  useEffect(() => {
    const titles: Record<string, string> = {
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
      [ViewState.CONTACT]: t.nav_contact,
    };

    const descriptions: Record<string, string> = {
      [ViewState.HOME]: t.meta_desc_home || t.hero_desc,
      [ViewState.NEWS]: t.meta_desc_news,
      [ViewState.FORUM]: t.meta_desc_forum,
      [ViewState.LEGAL_AID]: t.meta_desc_legal,
      [ViewState.HISTORY]: t.meta_desc_history,
      [ViewState.SHARE]: t.meta_desc_share,
      [ViewState.DONATE]: t.donate_subtitle,
      [ViewState.FOOD_AUTONOMY]: t.meta_desc_food,
      [ViewState.CONTACT]: t.meta_desc_contact,
    };

    const pageTitle = titles[view] || t.hero_title;
    document.title = `BALLAL | ${pageTitle}`;

    // Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', descriptions[view] || t.hero_desc);

    // Open Graph (Basic)
    const setMetaTag = (property: string, content: string) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    setMetaTag('og:title', `BALLAL - ${pageTitle}`);
    setMetaTag('og:description', descriptions[view] || t.hero_desc);
    setMetaTag('og:url', window.location.href);
    // On pourrait ajouter og:image dynamiquement ici selon la vue

  }, [view, t]);
};

// 4. Gestion Accessibilité & Focus (P4)
const useFocusManagement = (view: ViewState) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    const main = document.getElementById('main-content');
    if (main) {
      main.focus();
    }
  }, [view]);
};

// --- COMPOSANT PRINCIPAL ---

const AppContent: React.FC = () => {
  const { view, navigate } = useHashRouting(ViewState.HOME);
  const { language, setLanguage } = usePersistedLanguage();
  const t = translations[language];

  useSEO(view, t);
  useFocusManagement(view);

  // Rendu conditionnel optimisé (Switch)
  const renderView = () => {
    switch (view) {
      case ViewState.HOME:
        return (
          <>
            <Hero 
              onExplore={() => navigate(ViewState.LEGAL_AID)} 
              language={language}
              onShare={() => navigate(ViewState.SHARE)}
              onDonate={() => navigate(ViewState.DONATE)}
            />
            {/* Team est lazy loaded mais visible en bas de home */}
            <Suspense fallback={<div className="h-64 bg-gray-50 animate-pulse"></div>}>
               <TeamSection language={language} />
            </Suspense>
          </>
        );
      case ViewState.NEWS:
        return <NewsSection language={language} />;
      case ViewState.FORUM:
        return <ForumSection language={language} />;
      case ViewState.LEGAL_AID:
        return <LegalAidSection language={language} />;
      case ViewState.HISTORY:
        return <HistorySection language={language} />;
      case ViewState.SHARE:
        return <ShareSection language={language} />;
      case ViewState.DONATE:
        return <DonationSection language={language} />;
      case ViewState.FOOD_AUTONOMY:
        return <FoodAutonomySection language={language} setView={navigate} />;
      case ViewState.FOOD_SUPPLIER:
        return <FoodFormsImport language={language} onBack={() => navigate(ViewState.FOOD_AUTONOMY)} />;
      case ViewState.FOOD_NETWORK:
        return <FoodNetworkFormImport language={language} onBack={() => navigate(ViewState.FOOD_AUTONOMY)} />;
      case ViewState.CONTACT:
        return <ContactSection language={language} />;
      // case ViewState.DIRECTORY: return <DirectorySection language={language} />;
      default:
        return <NewsSection language={language} />; // Fallback safe
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
        currentView={view} 
        setView={navigate} 
        language={language} 
        setLanguage={setLanguage} 
      />
      
      <main 
        id="main-content" 
        tabIndex={-1} // Permet le focus programmatique (useFocusManagement) sans être dans le tab order naturel
        className="outline-none flex-grow focus:outline-none"
        role="main"
      >
        <ErrorBoundary t={t}>
          <Suspense fallback={<LoadingFallback />}>
            {renderView()}
          </Suspense>
        </ErrorBoundary>
      </main>

      <Footer language={language} setView={navigate} />
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