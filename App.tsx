import React, { useState, useEffect, ErrorInfo, ReactNode, Component } from 'react';
import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import Footer from './components/Footer.tsx';
import TeamSection from './components/TeamSection.tsx';
import { ViewState, LanguageCode } from './types.ts';
import { translations } from './utils/translations.ts';
import { AuthProvider } from './contexts/AuthContext.tsx';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

import LegalAidSection from './components/LegalAidSection.tsx';
import HistorySection from './components/HistorySection.tsx';
import ShareSection from './components/ShareSection.tsx';
import DonationSection from './components/DonationSection.tsx';
import FoodAutonomySection from './components/FoodAutonomySection.tsx';
import ContactSection from './components/ContactSection.tsx';
import FestivalSection from './components/FestivalSection.tsx';
import LegalDocSection from './components/LegalDocSection.tsx';
import NewsSection from './components/NewsSection.tsx'; // Import NewsSection
import { FoodSupplierForm, FoodNetworkForm } from './components/FoodForms.tsx';

interface ErrorBoundaryProps {
  children?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = { hasError: false };

  constructor(props: ErrorBoundaryProps) {
    super(props);
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("App internal error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[50vh] flex flex-col items-center justify-center p-8 text-center bg-red-50 rounded-xl m-4 border border-red-100">
          <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Une erreur est survenue</h2>
          <button 
            onClick={() => window.location.reload()}
            className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition-colors"
          >
            <RefreshCcw className="mr-2 h-4 w-4" /> Recharger
          </button>
        </div>
      );
    }
    // Prevent Error #31: Ensure we don't return undefined
    return this.props.children || null;
  }
}

const useAppNavigation = () => {
  const getHashFromView = (v: ViewState) => {
    switch(v) {
      case ViewState.LEGAL_AID: return 'legal';
      case ViewState.HISTORY: return 'history';
      case ViewState.NEWS: return 'news'; // Hash for news
      case ViewState.SHARE: return 'share';
      case ViewState.DONATE: return 'donate';
      case ViewState.FOOD_AUTONOMY: return 'food-project';
      case ViewState.FOOD_SUPPLIER: return 'food-supplier';
      case ViewState.FOOD_NETWORK: return 'food-network';
      case ViewState.CONTACT: return 'contact';
      case ViewState.FESTIVAL: return 'festival';
      case ViewState.PRIVACY: return 'privacy';
      case ViewState.TERMS: return 'terms';
      case ViewState.HOME: default: return '';
    }
  };

  const getViewFromHash = (): ViewState => {
    const hash = window.location.hash.replace(/^#/, '');
    if (hash === '' || hash === '#') return ViewState.HOME;
    
    switch(hash) {
      case 'legal': return ViewState.LEGAL_AID;
      case 'history': return ViewState.HISTORY;
      case 'news': return ViewState.NEWS; // View for news
      case 'share': return ViewState.SHARE;
      case 'donate': return ViewState.DONATE;
      case 'food-project': return ViewState.FOOD_AUTONOMY;
      case 'food-supplier': return ViewState.FOOD_SUPPLIER;
      case 'food-network': return ViewState.FOOD_NETWORK;
      case 'contact': return ViewState.CONTACT;
      case 'festival': return ViewState.FESTIVAL;
      case 'privacy': return ViewState.PRIVACY;
      case 'terms': return ViewState.TERMS;
      default: return ViewState.HOME;
    }
  };

  const [view, setView] = useState<ViewState>(getViewFromHash());

  useEffect(() => {
    const handleHashChange = () => {
      setView(getViewFromHash());
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (newView: ViewState) => {
    if (newView === view) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const hash = getHashFromView(newView);
    window.location.hash = hash;
  };

  return { view, navigate };
};

const usePersistedLanguage = () => {
  const [language, setLanguage] = useState<LanguageCode>(() => {
    try {
      const saved = localStorage.getItem('ballal_lang');
      return (saved as LanguageCode) || 'fr';
    } catch {
      return 'fr';
    }
  });

  useEffect(() => {
    localStorage.setItem('ballal_lang', language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  return { language, setLanguage };
};

const AppContent: React.FC = () => {
  const { view, navigate } = useAppNavigation();
  const { language, setLanguage } = usePersistedLanguage();

  // UX IMPROVEMENT: Remove Initial Loader when React is fully mounted
  useEffect(() => {
    const loader = document.getElementById('initial-loader');
    if (loader) {
      // Smooth fade out
      loader.style.transition = 'opacity 0.5s ease-out';
      loader.style.opacity = '0';
      
      // Remove from DOM after transition
      const timer = setTimeout(() => {
        if (loader.parentNode) {
          loader.parentNode.removeChild(loader);
        }
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, []);
  
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
            <TeamSection language={language} />
          </>
        );
      case ViewState.LEGAL_AID: return <LegalAidSection language={language} />;
      case ViewState.HISTORY: return <HistorySection language={language} />;
      case ViewState.NEWS: return <NewsSection language={language} />; // Render NewsSection
      case ViewState.SHARE: return <ShareSection language={language} />;
      case ViewState.DONATE: return <DonationSection language={language} />;
      case ViewState.FOOD_AUTONOMY: return <FoodAutonomySection language={language} setView={navigate} />;
      case ViewState.FOOD_SUPPLIER: return <FoodSupplierForm language={language} onBack={() => navigate(ViewState.FOOD_AUTONOMY)} />;
      case ViewState.FOOD_NETWORK: return <FoodNetworkForm language={language} onBack={() => navigate(ViewState.FOOD_AUTONOMY)} />;
      case ViewState.CONTACT: return <ContactSection language={language} />;
      case ViewState.FESTIVAL: return <FestivalSection language={language} />;
      case ViewState.PRIVACY: return <LegalDocSection language={language} mode="privacy" />;
      case ViewState.TERMS: return <LegalDocSection language={language} mode="terms" />;
      
      default:
        return (
            <Hero 
              onExplore={() => navigate(ViewState.LEGAL_AID)} 
              language={language}
              onShare={() => navigate(ViewState.SHARE)}
              onDonate={() => navigate(ViewState.DONATE)}
            />
        );
    }
  };

  return (
    <div className="min-h-screen bg-african-pattern text-slate-900 font-sans flex flex-col">
      <Navbar 
        currentView={view} 
        setView={navigate} 
        language={language} 
        setLanguage={setLanguage} 
      />
      
      {/* Ajout de 'relative z-0' pour créer un contexte d'empilement qui ne dépasse pas la navbar fixe */}
      <main id="main-content" className="flex-grow pt-20 relative z-0">
        <ErrorBoundary>
            {renderView()}
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