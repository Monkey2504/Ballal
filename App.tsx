import React, { useState, ReactNode, Component, lazy, Suspense } from 'react';
import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import Footer from './components/Footer.tsx';
import { ViewState, LanguageCode } from './types.ts';
import { AuthProvider, useAuth } from './contexts/AuthContext.tsx';
import { AlertTriangle, RefreshCcw, ArrowRight } from 'lucide-react';
import { MAIN_NAV_ITEMS } from './constants/navigation.ts';
import { AuthModal } from './components/AuthModals.tsx';

// Lazy loading — chaque section chargée à la demande
const MemberDashboard    = lazy(() => import('./components/MemberDashboard.tsx'));
const LegalAidSection    = lazy(() => import('./components/LegalAidSection.tsx'));
const ShareSection       = lazy(() => import('./components/ShareSection.tsx'));
const DonationSection    = lazy(() => import('./components/DonationSection.tsx'));
const FoodAutonomySection = lazy(() => import('./components/FoodAutonomySection.tsx'));
const SquatSection       = lazy(() => import('./components/SquatSection.tsx'));
const ContactSection     = lazy(() => import('./components/ContactSection.tsx'));
const FestivalSection    = lazy(() => import('./components/FestivalSection.tsx'));
const TeamSection        = lazy(() => import('./components/TeamSection.tsx'));
const HistorySection     = lazy(() => import('./components/HistorySection.tsx'));
const GallerySection     = lazy(() => import('./components/GallerySection.tsx'));
const CommunitySection   = lazy(() => import('./components/CommunitySection.tsx'));
const SolidarityNetwork  = lazy(() => import('./components/SolidarityNetwork.tsx'));
const NewsSection        = lazy(() => import('./components/NewsSection.tsx'));
const LegalDocSection    = lazy(() => import('./components/LegalDocSection.tsx'));
const PressSection       = lazy(() => import('./components/PressSection.tsx'));
const FoundersWallSection = lazy(() => import('./components/FoundersWallSection.tsx'));
const FoodSupplierForm   = lazy(() => import('./components/FoodForms.tsx').then(m => ({ default: m.FoodSupplierForm })));
const FoodNetworkForm    = lazy(() => import('./components/FoodForms.tsx').then(m => ({ default: m.FoodNetworkForm })));

// ── ErrorBoundary ─────────────────────────────────────────────────────────────

interface ErrorBoundaryProps { children?: ReactNode; label?: string; }
interface ErrorBoundaryState { hasError: boolean; }

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[40vh] flex flex-col items-center justify-center p-8 text-center bg-red-50 m-4 rounded-2xl border border-red-100">
          <AlertTriangle className="h-10 w-10 text-red-400 mb-3" />
          <h2 className="text-lg font-bold text-slate-800 mb-1">
            {this.props.label ? `Erreur dans "${this.props.label}"` : 'Une erreur est survenue'}
          </h2>
          <p className="text-sm text-gray-500 mb-4">Cette section ne peut pas s'afficher.</p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg font-bold text-sm"
          >
            <RefreshCcw className="h-4 w-4" /> Réessayer
          </button>
        </div>
      );
    }
    return this.props.children ?? null;
  }
}

// Loader minimal affiché pendant le chargement lazy
const SectionLoader = () => (
  <div className="min-h-[50vh] flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-guinea-red border-t-transparent rounded-full animate-spin" />
  </div>
);

// Wrapper combinant ErrorBoundary + Suspense
const Section: React.FC<{ label: string; children: ReactNode }> = ({ label, children }) => (
  <ErrorBoundary label={label}>
    <Suspense fallback={<SectionLoader />}>
      {children}
    </Suspense>
  </ErrorBoundary>
);

// ── Page d'accueil publique ───────────────────────────────────────────────────

const TEAM_PHOTOS = [
  { name: "Thierno I. T. Diallo", role: "Président", src: "https://i.imgur.com/T2LT1pB.png" },
  { name: "Bah Ibrahim",          role: "Opérations", src: "https://i.imgur.com/l3UdDov.png" },
  { name: "Kadiatou Sow",         role: "Secrétaire", src: "https://i.imgur.com/THTzMBW.png" },
  { name: "Cissé Abdoulaye",      role: "Trésorier",  src: "https://i.imgur.com/7FduSwY.png" },
  { name: "François Halleux",     role: "Conseiller", src: "https://i.imgur.com/1qqkroP.png" },
];

const HomePage: React.FC<{ navigate: (v: ViewState) => void; language: LanguageCode }> = ({ navigate }) => (
  <div className="space-y-0">
    <Hero
      onExplore={() => navigate(ViewState.SQUAT)}
      onShare={() => navigate(ViewState.SHARE)}
      onDonate={() => navigate(ViewState.DONATE)}
    />

    {/* Grille de navigation */}
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="flex items-center gap-4 mb-12">
        <div className="h-1 w-12 bg-guinea-red" />
        <h2 className="text-xs font-black uppercase tracking-[0.4em] text-gray-400">Nos services</h2>
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

    {/* Notre équipe — photos Imgur */}
    <section className="bg-earth-black py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-1 w-12 bg-guinea-yellow" />
          <h2 className="text-xs font-black uppercase tracking-[0.4em] text-gray-400">Conseil d'Administration</h2>
        </div>
        <h3 className="text-4xl md:text-5xl font-serif font-black text-white mb-4">Notre équipe</h3>
        <p className="text-gray-400 max-w-2xl mb-12 leading-relaxed">
          Ballal ASBL est portée par 5 personnes engagées pour la dignité et les droits des sans-papiers guinéens à Bruxelles.
        </p>

        {/* Photo de groupe */}
        <div className="rounded-3xl overflow-hidden mb-8 shadow-2xl border-4 border-white/10">
          <img
            src="https://i.imgur.com/CwnDz75.png"
            alt="L'équipe Ballal ASBL"
            loading="lazy"
            className="w-full h-64 md:h-80 object-cover"
          />
        </div>

        {/* Photos individuelles */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {TEAM_PHOTOS.map((m) => (
            <div
              key={m.name}
              className="group cursor-pointer"
              onClick={() => navigate(ViewState.TEAM)}
            >
              <div className="aspect-square rounded-2xl overflow-hidden border-2 border-white/10 group-hover:border-guinea-yellow transition-all mb-3 shadow-lg">
                <img
                  src={m.src}
                  alt={m.name}
                  loading="lazy"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                />
              </div>
              <p className="text-white font-bold text-sm text-center leading-tight">{m.name}</p>
              <p className="text-gray-500 text-xs text-center uppercase tracking-wider mt-0.5">{m.role}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <button
            onClick={() => navigate(ViewState.TEAM)}
            className="inline-flex items-center gap-3 bg-guinea-yellow text-earth-black px-8 py-4 rounded-2xl font-black text-sm hover:-translate-y-0.5 transition-all shadow-xl"
          >
            Voir le CA complet <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  </div>
);

// ── AppContent ────────────────────────────────────────────────────────────────

const AppContent: React.FC = () => {
  const [view, setView]         = useState<ViewState>(ViewState.HOME);
  const [language, setLanguage] = useState<LanguageCode>('fr');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const { isAuthenticated } = useAuth();

  const navigate = (v: ViewState) => {
    setView(v);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderView = () => {
    switch (view) {
      case ViewState.HOME:
        return isAuthenticated
          ? <Section label="Dashboard"><MemberDashboard navigate={navigate} /></Section>
          : <HomePage navigate={navigate} language={language} />;
      case ViewState.NEWS:
        return <Section label="Actualités"><NewsSection /></Section>;
      case ViewState.SOLIDARITY_NETWORK:
        return <Section label="Entraide"><SolidarityNetwork /></Section>;
      case ViewState.COMMUNITY:
        return <Section label="Annuaire"><CommunitySection /></Section>;
      case ViewState.CULTURE:
        return (
          <Section label="Culture">
            <div className="space-y-0">
              <HistorySection language={language} />
              <GallerySection />
            </div>
          </Section>
        );
      case ViewState.SQUAT:
        return <Section label="Logement"><SquatSection language={language} /></Section>;
      case ViewState.FESTIVAL:
        return <Section label="Festival"><FestivalSection language={language} /></Section>;
      case ViewState.TEAM:
        return <Section label="Équipe"><TeamSection language={language} /></Section>;
      case ViewState.LEGAL_AID:
        return <Section label="Aide juridique"><LegalAidSection language={language} /></Section>;
      case ViewState.FOOD_AUTONOMY:
        return <Section label="Alimentation"><FoodAutonomySection language={language} setView={navigate} /></Section>;
      case ViewState.SHARE:
        return <Section label="Partager"><ShareSection language={language} /></Section>;
      case ViewState.DONATE:
        return <Section label="Dons"><DonationSection language={language} /></Section>;
      case ViewState.CONTACT:
        return <Section label="Contact"><ContactSection language={language} /></Section>;
      case ViewState.FOOD_SUPPLIER:
        return <Section label="Fournisseur"><FoodSupplierForm language={language} onBack={() => navigate(ViewState.FOOD_AUTONOMY)} /></Section>;
      case ViewState.FOOD_NETWORK:
        return <Section label="Réseau alimentaire"><FoodNetworkForm language={language} onBack={() => navigate(ViewState.FOOD_AUTONOMY)} /></Section>;
      case ViewState.PRIVACY:
        return <Section label="Confidentialité"><LegalDocSection language={language} mode="privacy" /></Section>;
      case ViewState.TERMS:
        return <Section label="CGU"><LegalDocSection language={language} mode="terms" /></Section>;
      case ViewState.PRESS:
        return <Section label="Presse"><PressSection /></Section>;
      case ViewState.FOUNDERS_WALL:
        return <Section label="Mur des Fondateurs"><FoundersWallSection /></Section>;
      default:
        return <HomePage navigate={navigate} language={language} />;
    }
  };

  return (
    <div className="min-h-screen bg-soft-paper text-earth-black african-pattern">
      <Navbar
        currentView={view}
        setView={navigate}
        language={language}
        setLanguage={setLanguage}
        onOpenAuth={() => { setAuthMode('login'); setIsAuthOpen(true); }}
      />
      <main className="pt-20">
        {renderView()}
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
