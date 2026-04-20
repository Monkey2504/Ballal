import React, { useState, ReactNode, Component, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Navbar from './components/Navbar.tsx';
import Footer from './components/Footer.tsx';
import CookieConsent from './components/CookieConsent.tsx';
import { ViewState, LanguageCode, ROUTE_MAP, VIEW_FROM_ROUTE } from './types.ts';
import { AuthProvider } from './contexts/AuthContext.tsx';
import { AlertTriangle, RefreshCcw } from 'lucide-react';
import HomePage from './routes/HomePage.tsx';

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
import SolidarityNetwork from './components/SolidarityNetwork.tsx';
import { AuthModal } from './components/AuthModals.tsx';
import { FoodSupplierForm, FoodNetworkForm } from './components/FoodForms.tsx';
import LegalDocSection from './components/LegalDocSection.tsx';
import PressSection from './components/PressSection.tsx';

const PAGE_TITLES: Record<string, string> = {
  '/':                         'BALLAL ASBL | Solidarité Guinée-Belgique',
  '/entraide':                 'Entraide & Solidarité | BALLAL ASBL',
  '/logement':                 'Logement & Squat | BALLAL ASBL',
  '/culture':                  'Culture & Histoire | BALLAL ASBL',
  '/droits':                   'Aide & Droits | BALLAL ASBL',
  '/alimentation':             'Projet Alimentaire | BALLAL ASBL',
  '/alimentation/fournisseur': 'Fournisseur Alimentaire | BALLAL ASBL',
  '/alimentation/collectif':   'Collectif Alimentaire | BALLAL ASBL',
  '/equipe':                   'Équipe | BALLAL ASBL',
  '/festival':                 'Festival Sans-Papiers | BALLAL ASBL',
  '/don':                      'Faire un Don | BALLAL ASBL',
  '/partager':                 'Partager | BALLAL ASBL',
  '/contact':                  'Contact | BALLAL ASBL',
  '/confidentialite':          'Politique de Confidentialité | BALLAL ASBL',
  '/mentions-legales':         'Mentions Légales | BALLAL ASBL',
  '/presse':                   'Espace Presse | BALLAL ASBL',
};

interface ErrorBoundaryProps { children?: ReactNode; }
interface ErrorBoundaryState { hasError: boolean; errorMessage: string | null; }

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState;
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, errorMessage: null };
  }
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    const isDev = import.meta.env.DEV;
    return { hasError: true, errorMessage: isDev ? error.message : null };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[50vh] flex flex-col items-center justify-center p-8 text-center bg-guinea-red/5 m-4 rounded-token-lg border border-guinea-red/15">
          <AlertTriangle className="h-12 w-12 text-guinea-red mb-4" />
          <h2 className="text-xl font-bold mb-2">Une erreur est survenue</h2>
          {this.state.errorMessage && (
            <p className="text-body-sm text-ink-muted mb-4 font-mono bg-white px-3 py-2 rounded-token border border-border-subtle">
              {this.state.errorMessage}
            </p>
          )}
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 px-4 py-2 bg-guinea-red text-white rounded-token font-bold hover:bg-guinea-red-dark transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-guinea-red/50 focus-visible:ring-offset-2"
          >
            <RefreshCcw className="h-4 w-4" aria-hidden="true" /> Recharger
          </button>
        </div>
      );
    }
    return this.props.children || null;
  }
}

const AppContent: React.FC = () => {
  const [language, setLanguage] = useState<LanguageCode>('fr');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  const routerNavigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const title = PAGE_TITLES[location.pathname] ?? 'BALLAL ASBL';
    document.title = title;
  }, [location.pathname]);

  const navigate = (v: ViewState) => {
    routerNavigate(ROUTE_MAP[v]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openAuth = (mode: 'login' | 'register' = 'login') => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  return (
    <div className="min-h-screen bg-ivory text-ink">
      <Navbar
        setView={navigate}
        language={language}
        setLanguage={setLanguage}
        onOpenAuth={() => openAuth('login')}
      />

      {/* pt-[71px] = 3px flag-line + 68px nav */}
      <main id="main-content" className="pt-[71px]">
        <ErrorBoundary>
          <Routes>
            <Route path="/"                         element={<HomePage navigate={navigate} language={language} />} />
            <Route path="/entraide"                 element={<SolidarityNetwork />} />
            <Route path="/logement"                 element={<SquatSection language={language} />} />
            <Route path="/culture"                  element={<div className="space-y-0"><HistorySection language={language} /><GallerySection /></div>} />
            <Route path="/droits"                   element={<LegalAidSection language={language} />} />
            <Route path="/alimentation"             element={<FoodAutonomySection language={language} setView={navigate} />} />
            <Route path="/alimentation/fournisseur" element={<FoodSupplierForm language={language} onBack={() => navigate(ViewState.FOOD_AUTONOMY)} />} />
            <Route path="/alimentation/collectif"   element={<FoodNetworkForm language={language} onBack={() => navigate(ViewState.FOOD_AUTONOMY)} />} />
            <Route path="/equipe"                   element={<TeamSection language={language} />} />
            <Route path="/festival"                 element={<FestivalSection language={language} />} />
            <Route path="/don"                      element={<DonationSection language={language} />} />
            <Route path="/partager"                 element={<ShareSection language={language} />} />
            <Route path="/contact"                  element={<ContactSection language={language} />} />
            <Route path="/confidentialite"          element={<LegalDocSection language={language} mode="privacy" />} />
            <Route path="/mentions-legales"         element={<LegalDocSection language={language} mode="terms" />} />
            <Route path="/presse"                   element={<PressSection />} />
            <Route path="*"                         element={<Navigate to="/" replace />} />
          </Routes>
        </ErrorBoundary>
      </main>

      <Footer language={language} setView={navigate} />
      <CookieConsent />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        mode={authMode}
        switchTo={(m) => setAuthMode(m)}
      />
    </div>
  );
};

const App: React.FC = () => (
  <AuthProvider>
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
    <Analytics />
    <SpeedInsights />
  </AuthProvider>
);

export default App;
