import React, { useState, ReactNode, Component } from 'react';
import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import Footer from './components/Footer.tsx';
import { ViewState, LanguageCode } from './types.ts';
import { AuthProvider } from './contexts/AuthContext.tsx';
import { AlertTriangle, RefreshCcw, Users, HeartHandshake, ArrowRight, Newspaper } from 'lucide-react';
import { MAIN_NAV_ITEMS } from './constants/navigation.ts';

import LegalAidSection from './components/LegalAidSection.tsx';
import ShareSection from './components/ShareSection.tsx';
import DonationSection from './components/DonationSection.tsx';
import FoodAutonomySection from './components/FoodAutonomySection.tsx';
import SquatSection from './components/SquatSection.tsx';
import ContactSection from './components/ContactSection.tsx';
import FestivalSection from './components/FestivalSection.tsx';
import TeamSection from './components/TeamSection.tsx';
import HistorySection from './components/HistorySection.tsx';
import GallerySection from './components/GallerySection.tsx';
import CommunitySection from './components/CommunitySection.tsx';
import SolidarityNetwork from './components/SolidarityNetwork.tsx';
import NewsSection from './components/NewsSection.tsx';
import { AuthModal } from './components/AuthModals.tsx';
import { FoodSupplierForm, FoodNetworkForm } from './components/FoodForms.tsx';
import LegalDocSection from './components/LegalDocSection.tsx';

interface ErrorBoundaryProps { children?: ReactNode; }
interface ErrorBoundaryState { hasError: boolean; }

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState;
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(_: Error): ErrorBoundaryState { return { hasError: true }; }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[50vh] flex flex-col items-center justify-center p-8 text-center bg-red-50 m-4 rounded-xl border border-red-100">
          <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
          <h2 className="text-xl font-bold mb-2">Une erreur est survenue</h2>
          <button onClick={() => window.location.reload()} className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg font-bold">
            <RefreshCcw className="mr-2 h-4 w-4" /> Recharger
          </button>
        </div>
      );
    }
    return this.props.children || null;
  }
}

const HomePage: React.FC<{ navigate: (v: ViewState) => void, language: LanguageCode }> = ({ navigate, language }) => (
  <div className="space-y-0">
    <Hero 
      onExplore={() => navigate(ViewState.NEWS)} 
      language={language}
      onShare={() => navigate(ViewState.SHARE)}
      onDonate={() => navigate(ViewState.DONATE)}
    />
    
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="flex items-center gap-4 mb-12">
        <div className="h-1 w-12 bg-guinea-red"></div>
        <h2 className="text-xs font-black uppercase tracking-[0.4em] text-gray-400">Services & Connexion</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MAIN_NAV_ITEMS.filter(item => item.value !== ViewState.HOME).map((pill, i) => (
          <button 
            key={i} 
            onClick={() => navigate(pill.value)}
            className="bg-white p-8 rounded-[2.5rem] shadow-soft-elegant border border-gray-100 text-left hover:translate-y-[-4px] transition-all group overflow-hidden relative"
          >
            <div className="absolute -right-4 -top-4 opacity-[0.03] group-hover:scale-110 transition-transform">
                <pill.icon className="h-32 w-32" />
            </div>
            <div className={`p-4 rounded-2xl ${pill.color} text-white w-fit mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
              <pill.icon className="h-6 w-6" />
            </div>
            <h3 className="text-2xl font-serif font-black mb-2">{pill.label}</h3>
            <p className="text-gray-500 text-sm font-medium leading-tight">{pill.desc}</p>
          </button>
        ))}
      </div>
    </section>

    <section className="bg-earth-black text-white py-20 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-guinea-red/5 skew-x-12 translate-x-32"></div>
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
        <div className="max-w-2xl text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3 text-guinea-yellow mb-4">
            <Newspaper className="h-6 w-6" />
            <span className="font-bold uppercase tracking-widest text-xs">Actualités Diaspora</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-black mb-6">Restez connecté aux nouvelles du pays.</h2>
          <p className="text-gray-400 text-lg mb-8 italic">Notre IA analyse en temps réel les informations pertinentes pour les Guinéens de Belgique.</p>
          <button 
            onClick={() => navigate(ViewState.NEWS)}
            className="bg-guinea-red text-white px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl hover:bg-white hover:text-earth-black transition-all flex items-center gap-3 mx-auto md:mx-0"
          >
            Lire le Flash Pays <ArrowRight className="h-4 w-4" />
          </button>
        </div>
        <div className="w-full md:w-1/3 aspect-square bg-white/5 rounded-[3rem] border border-white/10 flex items-center justify-center group">
           <HeartHandshake className="h-32 w-32 text-white/20 group-hover:scale-110 group-hover:text-guinea-yellow transition-all" />
        </div>
      </div>
    </section>
  </div>
);

const AppContent: React.FC = () => {
  const [view, setView] = useState<ViewState>(ViewState.HOME);
  const [language, setLanguage] = useState<LanguageCode>('fr');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  const navigate = (v: ViewState) => {
    setView(v);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openAuth = (mode: 'login' | 'register' = 'login') => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  const renderView = () => {
    switch (view) {
      case ViewState.HOME: return <HomePage navigate={navigate} language={language} />;
      case ViewState.NEWS: return <NewsSection />;
      case ViewState.SOLIDARITY_NETWORK: return <SolidarityNetwork />;
      case ViewState.COMMUNITY: return <CommunitySection />;
      case ViewState.CULTURE: 
        return (
          <div className="space-y-0">
            <HistorySection language={language} />
            <GallerySection />
          </div>
        );
      case ViewState.SQUAT: return <SquatSection language={language} />;
      case ViewState.FESTIVAL: return <FestivalSection language={language} />;
      case ViewState.TEAM: return <TeamSection language={language} />;
      case ViewState.LEGAL_AID: return <LegalAidSection language={language} />;
      case ViewState.FOOD_AUTONOMY: return <FoodAutonomySection language={language} setView={navigate} />;
      case ViewState.SHARE: return <ShareSection language={language} />;
      case ViewState.DONATE: return <DonationSection language={language} />;
      case ViewState.CONTACT: return <ContactSection language={language} />;
      case ViewState.FOOD_SUPPLIER: return <FoodSupplierForm language={language} onBack={() => navigate(ViewState.FOOD_AUTONOMY)} />;
      case ViewState.FOOD_NETWORK: return <FoodNetworkForm language={language} onBack={() => navigate(ViewState.FOOD_AUTONOMY)} />;
      case ViewState.PRIVACY: return <LegalDocSection language={language} mode="privacy" />;
      case ViewState.TERMS: return <LegalDocSection language={language} mode="terms" />;
      default: return <HomePage navigate={navigate} language={language} />;
    }
  };

  return (
    <div className="min-h-screen bg-soft-paper text-earth-black african-pattern">
      <Navbar 
        currentView={view} 
        setView={navigate} 
        language={language} 
        setLanguage={setLanguage} 
        onOpenAuth={() => openAuth('login')}
      />
      <main className="pt-20">
        <ErrorBoundary>
          {renderView()}
        </ErrorBoundary>
      </main>
      <Footer language={language} setView={navigate} />
      
      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        mode={authMode} 
        switchTo={(m) => setAuthMode(m)} 
      />
    </div>
  );
};

const App: React.FC = () => <AuthProvider><AppContent /></AuthProvider>;
export default App;