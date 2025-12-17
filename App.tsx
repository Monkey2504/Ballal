
import React, { useState, ReactNode } from 'react';
import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import Footer from './components/Footer.tsx';
import TeamSection from './components/TeamSection.tsx';
import { ViewState, LanguageCode } from './types.ts';
import { AuthProvider } from './contexts/AuthContext.tsx';
import { AlertTriangle, RefreshCcw, Flag } from 'lucide-react';

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

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
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

  const HomeView = (
    <div className="space-y-0">
      <Hero 
        onExplore={() => navigate(ViewState.LEGAL_AID)} 
        language={language}
        onShare={() => navigate(ViewState.SHARE)}
        onDonate={() => navigate(ViewState.DONATE)}
      />
      
      {/* Face A : Le Conseil d'Administration (Sourire Institutionnel) */}
      <TeamSection language={language} />

      {/* Pont : La Bannière Festival */}
      <div className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto bg-guinea-red text-white p-12 md:p-24 rounded-[3rem] text-center shadow-brutal border-y-8 border-guinea-yellow relative overflow-hidden">
            <div className="absolute inset-0 african-pattern opacity-10"></div>
            <Flag className="h-20 w-20 mx-auto mb-8 text-guinea-yellow animate-bounce" />
            <h2 className="text-5xl md:text-8xl font-serif font-black uppercase mb-6 tracking-tighter">Festival des Sans-Papiers</h2>
            <p className="text-xl md:text-3xl max-w-3xl mx-auto mb-12 font-medium italic opacity-90">"Célébrer la fierté, revendiquer la dignité."</p>
            <button 
                onClick={() => navigate(ViewState.FESTIVAL)}
                className="bg-white text-guinea-red px-16 py-6 rounded-2xl font-black uppercase tracking-widest shadow-xl hover:scale-105 transition-all text-xl"
            >
                Voir le programme
            </button>
        </div>
      </div>

      {/* Histoire */}
      <HistorySection language={language} />
    </div>
  );

  const renderView = () => {
    switch (view) {
      case ViewState.HOME: return HomeView;
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
      default: return HomeView;
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
