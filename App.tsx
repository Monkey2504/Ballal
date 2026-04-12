import React, { useState, ReactNode, Component, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import Footer from './components/Footer.tsx';
import CookieConsent from './components/CookieConsent.tsx';
import { ViewState, LanguageCode, ROUTE_MAP, VIEW_FROM_ROUTE } from './types.ts';
import { AuthProvider } from './contexts/AuthContext.tsx';
import { AlertTriangle, RefreshCcw, ArrowRight, Shield, Utensils, Home, Scale, Users, BookOpen } from 'lucide-react';
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
import SolidarityNetwork from './components/SolidarityNetwork.tsx';
import { AuthModal } from './components/AuthModals.tsx';
import { FoodSupplierForm, FoodNetworkForm } from './components/FoodForms.tsx';
import LegalDocSection from './components/LegalDocSection.tsx';
import PressSection from './components/PressSection.tsx';

// Page titles for SEO — keyed by route path
const PAGE_TITLES: Record<string, string> = {
  '/':                       'BALLAL ASBL | Solidarité Guinée-Belgique',
  '/entraide':               'Entraide & Solidarité | BALLAL ASBL',
  '/logement':               'Logement & Squat | BALLAL ASBL',
  '/culture':                'Culture & Histoire | BALLAL ASBL',
  '/droits':                 'Aide & Droits | BALLAL ASBL',
  '/alimentation':           'Projet Alimentaire | BALLAL ASBL',
  '/alimentation/fournisseur': 'Fournisseur Alimentaire | BALLAL ASBL',
  '/alimentation/collectif': 'Collectif Alimentaire | BALLAL ASBL',
  '/equipe':                 'Équipe | BALLAL ASBL',
  '/festival':               'Festival Sans-Papiers | BALLAL ASBL',
  '/don':                    'Faire un Don | BALLAL ASBL',
  '/partager':               'Partager | BALLAL ASBL',
  '/contact':                'Contact | BALLAL ASBL',
  '/confidentialite':        'Politique de Confidentialité | BALLAL ASBL',
  '/mentions-legales':       'Mentions Légales | BALLAL ASBL',
  '/presse':                 'Espace Presse | BALLAL ASBL',
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
    // In production we hide the technical message; in dev we show it
    const isDev = import.meta.env.DEV;
    return {
      hasError: true,
      errorMessage: isDev ? error.message : null,
    };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[50vh] flex flex-col items-center justify-center p-8 text-center bg-red-50 m-4 rounded-xl border border-red-100">
          <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
          <h2 className="text-xl font-bold mb-2">Une erreur est survenue</h2>
          {this.state.errorMessage && (
            <p className="text-sm text-gray-600 mb-4 font-mono bg-white px-3 py-2 rounded border border-red-100">
              {this.state.errorMessage}
            </p>
          )}
          <button
            onClick={() => window.location.reload()}
            className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition-colors"
          >
            <RefreshCcw className="mr-2 h-4 w-4" /> Recharger
          </button>
        </div>
      );
    }
    return this.props.children || null;
  }
}

// ── Programme card data ────────────────────────────────────────────────────
const PROGRAMS = [
  {
    view: ViewState.LEGAL_AID,
    icon: Scale,
    color: 'bg-[#CE1126]',
    label: 'Droits & Juridique',
    desc: 'Scripts de protection domiciliaire, articles 9bis/9ter, accompagnement administratif.',
  },
  {
    view: ViewState.SQUAT,
    icon: Home,
    color: 'bg-gray-800',
    label: 'Logement',
    desc: "Guide d'accès au logement, occupations temporaires, médiation propriétaires.",
  },
  {
    view: ViewState.FOOD_AUTONOMY,
    icon: Utensils,
    color: 'bg-[#009460]',
    label: 'Autonomie Alimentaire',
    desc: 'Réseau de dons alimentaires, collectifs, fournisseurs solidaires.',
  },
  {
    view: ViewState.SOLIDARITY_NETWORK,
    icon: Users,
    color: 'bg-[#FCD116]',
    textColor: 'text-gray-900',
    label: 'Entraide',
    desc: 'Plateforme de mise en relation : besoins et offres de la communauté.',
  },
  {
    view: ViewState.CULTURE,
    icon: BookOpen,
    color: 'bg-purple-700',
    label: 'Culture & Histoire',
    desc: 'Histoire de la diaspora guinéenne, patrimoine, événements culturels.',
  },
];

const IMPACT_NUMBERS = [
  { value: '25 000+', label: 'Guinéens en Belgique' },
  { value: '5',       label: 'Programmes actifs' },
  { value: '3',       label: "Langues d'assistance" },
  { value: '24h',     label: 'Urgence disponible' },
];

const HomePage: React.FC<{ navigate: (v: ViewState) => void; language: LanguageCode }> = ({ navigate, language }) => (
  <div>
    {/* Hero */}
    <Hero
      onExplore={() => navigate(ViewState.SOLIDARITY_NETWORK)}
      language={language}
      onShare={() => navigate(ViewState.SHARE)}
      onDonate={() => navigate(ViewState.DONATE)}
    />

    {/* ── Impact numbers strip ───────────────────────────────────────────── */}
    <div className="bg-gray-900 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <dl className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10">
          {IMPACT_NUMBERS.map((stat) => (
            <div key={stat.label} className="px-8 py-8 text-center">
              <dt className="text-3xl xl:text-4xl font-serif font-black text-white leading-none">
                {stat.value}
              </dt>
              <dd className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                {stat.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>

    {/* ── Programs section ──────────────────────────────────────────────── */}
    <section className="bg-white py-20 sm:py-28" aria-labelledby="programs-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Section header */}
        <div className="max-w-2xl mb-16">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#CE1126] mb-3">
            Nos programmes
          </p>
          <h2 id="programs-title" className="font-serif font-black text-3xl sm:text-4xl text-gray-900 leading-tight">
            Ce que nous faisons, concrètement.
          </h2>
          <p className="mt-4 text-gray-500 text-base leading-relaxed">
            Six axes d'action au service de la dignité et de l'autonomie des Guinéens de Belgique.
          </p>
        </div>

        {/* Programs grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-100 border border-gray-100 rounded-2xl overflow-hidden">
          {PROGRAMS.map((prog) => (
            <button
              key={prog.view}
              onClick={() => navigate(prog.view)}
              className="group bg-white p-8 text-left hover:bg-gray-50 transition-colors flex flex-col gap-5"
            >
              <div className={`w-11 h-11 ${prog.color} rounded-xl flex items-center justify-center shrink-0`}>
                <prog.icon className={`h-5 w-5 ${prog.textColor ?? 'text-white'}`} aria-hidden="true" />
              </div>
              <div className="flex-1">
                <h3 className="font-serif font-black text-lg text-gray-900 mb-1.5 group-hover:text-[#CE1126] transition-colors">
                  {prog.label}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">{prog.desc}</p>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-[#CE1126] opacity-0 group-hover:opacity-100 transition-opacity">
                En savoir plus <ArrowRight className="h-3 w-3" aria-hidden="true" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>

    {/* ── Donate CTA ────────────────────────────────────────────────────── */}
    <section className="bg-white py-16 border-t border-gray-100" aria-label="Soutenir Ballal ASBL">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-8">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-2">Faire un geste</p>
          <h2 className="font-serif font-black text-2xl text-gray-900">
            Chaque don finance du concret.
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Hébergement d'urgence · Aide alimentaire · Accompagnement juridique
          </p>
        </div>
        <button
          onClick={() => navigate(ViewState.DONATE)}
          className="shrink-0 inline-flex items-center gap-2.5 px-7 py-3.5 bg-gray-900 text-white text-sm font-black uppercase tracking-widest rounded-lg hover:bg-[#CE1126] transition-colors group"
        >
          Soutenir Ballal
          <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
        </button>
      </div>
    </section>
  </div>
);

const AppContent: React.FC = () => {
  const [language, setLanguage] = useState<LanguageCode>('fr');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  const routerNavigate = useNavigate();
  const location = useLocation();

  // Update document.title on every route change
  useEffect(() => {
    const title = PAGE_TITLES[location.pathname] ?? 'BALLAL ASBL';
    document.title = title;
  }, [location.pathname]);

  // Navigate by ViewState — keeps internal code unchanged
  const navigate = (v: ViewState) => {
    routerNavigate(ROUTE_MAP[v]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openAuth = (mode: 'login' | 'register' = 'login') => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  return (
    <div className="min-h-screen bg-soft-paper text-earth-black african-pattern">
      {/* Skip to main content — WCAG 2.1 */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[300] focus:px-4 focus:py-2 focus:bg-[#CE1126] focus:text-white focus:font-bold focus:rounded-lg focus:shadow-lg"
      >
        Aller au contenu principal
      </a>

      <Navbar
        setView={navigate}
        language={language}
        setLanguage={setLanguage}
        onOpenAuth={() => openAuth('login')}
      />

      <main id="main-content" className="pt-20">
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
  </AuthProvider>
);

export default App;
