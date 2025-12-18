
import React, { useState, ReactNode, Component } from 'react';
import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import Footer from './components/Footer.tsx';
import TeamSection from './components/TeamSection.tsx';
import { ViewState, LanguageCode } from './types.ts';
import { AuthProvider } from './contexts/AuthContext.tsx';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

import LegalAidSection from './components/LegalAidSection.tsx';
import HistorySection from './components/HistorySection.tsx';
import ShareSection from './components/ShareSection.tsx';
import DonationSection from './components/DonationSection.tsx';
import FoodAutonomySection from './components/FoodAutonomySection.tsx';
import SquatSection from './components/SquatSection.tsx'; 
import ContactSection from './components/ContactSection.tsx';
import FestivalSection from './components/FestivalSection.tsx';
import { FoodSupplierForm, FoodNetworkForm } from './components/FoodForms.tsx';
import LegalDocSection from './components/LegalDocSection.tsx';

interface ErrorBoundaryProps { children?: ReactNode; }
interface ErrorBoundaryState { hasError: boolean; }

// Fix: Use Component from named imports to ensure props and state are correctly inherited in the type system for ErrorBoundary.
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };
  static getDerivedStateFromError(_: Error): ErrorBoundaryState { return { hasError: true }; }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[50vh] flex flex-col items-center justify-center p-8 text-center bg-red-50 m-4 rounded-xl border border-red-100">
          <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
          <h2 className="text-xl font-bold mb-2">Erreur interne</h2>
          <button onClick={() => window.location.reload()} className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg font-bold">
            <RefreshCcw className="mr-2 h-4 w-4" /> Recharger
          </button>
        </div>
      );
    }
    return this.props.children || null;
  }
}

const AppContent: React.FC = () => {
  const [view, setView] = useState<ViewState>(ViewState.HOME);
  const [language, setLanguage] = useState<LanguageCode>('fr');

  const navigate = (v: ViewState) => {
    setView(v);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderView = () => {
    switch (view) {
      case ViewState.HOME: return (
        <div className="space-y-0">
          <Hero 
            onExplore={() => navigate(ViewState.FESTIVAL)} 
            language={language}
            onShare={() => navigate(ViewState.SHARE)}
            onDonate={() => navigate(ViewState.DONATE)}
          />
          <TeamSection language={language} />
          <HistorySection language={language} />
        </div>
      );
      case ViewState.LEGAL_AID: return <LegalAidSection language={language} />;
      case ViewState.SQUAT: return <SquatSection language={language} />;
      case ViewState.FOOD_AUTONOMY: return <FoodAutonomySection language={language} setView={navigate} />;
      case ViewState.FESTIVAL: return <FestivalSection language={language} />;
      case ViewState.HISTORY: return <HistorySection language={language} />;
      case ViewState.SHARE: return <ShareSection language={language} />;
      case ViewState.DONATE: return <DonationSection language={language} />;
      case ViewState.CONTACT: return <ContactSection language={language} />;
      case ViewState.FOOD_SUPPLIER: return <FoodSupplierForm language={language} onBack={() => navigate(ViewState.FOOD_AUTONOMY)} />;
      case ViewState.FOOD_NETWORK: return <FoodNetworkForm language={language} onBack={() => navigate(ViewState.FOOD_AUTONOMY)} />;
      case ViewState.PRIVACY: return <LegalDocSection language={language} mode="privacy" />;
      case ViewState.TERMS: return <LegalDocSection language={language} mode="terms" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-soft-paper text-earth-black african-pattern transition-colors duration-500">
      <Navbar currentView={view} setView={navigate} language={language} setLanguage={setLanguage} />
      <main className="pt-20">
        <ErrorBoundary>
          {renderView()}
        </ErrorBoundary>
      </main>
      <Footer language={language} setView={navigate} />
    </div>
  );
};

const App: React.FC = () => <AuthProvider><AppContent /></AuthProvider>;
export default App;
