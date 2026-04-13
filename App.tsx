import React, { useState, ReactNode, Component, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import Footer from './components/Footer.tsx';
import CookieConsent from './components/CookieConsent.tsx';
import { ViewState, LanguageCode, ROUTE_MAP, VIEW_FROM_ROUTE } from './types.ts';
import { AuthProvider } from './contexts/AuthContext.tsx';
import { AlertTriangle, RefreshCcw, ArrowRight, Utensils, Home, Scale, Users, BookOpen } from 'lucide-react';

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
    const isDev = import.meta.env.DEV;
    return { hasError: true, errorMessage: isDev ? error.message : null };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[50vh] flex flex-col items-center justify-center p-8 text-center bg-[#BE0000]/5 m-4 rounded-[12px] border border-[#BE0000]/15">
          <AlertTriangle className="h-12 w-12 text-[#BE0000] mb-4" />
          <h2 className="text-xl font-bold mb-2">Une erreur est survenue</h2>
          {this.state.errorMessage && (
            <p className="text-sm text-[#6B6B6B] mb-4 font-mono bg-white px-3 py-2 rounded border border-[#E8E8E6]">
              {this.state.errorMessage}
            </p>
          )}
          <button
            onClick={() => window.location.reload()}
            className="flex items-center px-4 py-2 bg-[#BE0000] text-white rounded-[8px] font-bold hover:bg-[#9B0000] transition-colors"
          >
            <RefreshCcw className="mr-2 h-4 w-4" /> Recharger
          </button>
        </div>
      );
    }
    return this.props.children || null;
  }
}

// ── Programme data ─────────────────────────────────────────────────────────
const PROGRAMS = [
  {
    view:        ViewState.LEGAL_AID,
    icon:        Scale,
    borderColor: '#BE0000',
    iconBg:      'bg-[#BE0000]/10',
    iconColor:   'text-[#BE0000]',
    label:       'Droits & Juridique',
    desc:        "Votre domicile est protégé par la Constitution. Articles 9bis/9ter, scripts d'urgence, régularisation — nous vous outillons pour vous défendre.",
  },
  {
    view:        ViewState.SQUAT,
    icon:        Home,
    borderColor: '#0F0F0F',
    iconBg:      'bg-[#0F0F0F]/8',
    iconColor:   'text-[#0F0F0F]',
    label:       'Logement',
    desc:        "Nous gérons directement plusieurs occupations solidaires à Bruxelles depuis des années. Pas des conseils de l'extérieur — une présence physique, sur place, chaque jour.",
  },
  {
    view:        ViewState.FOOD_AUTONOMY,
    icon:        Utensils,
    borderColor: '#00843D',
    iconBg:      'bg-[#00843D]/10',
    iconColor:   'text-[#00843D]',
    label:       'Autonomie Alimentaire',
    desc:        "Chaque semaine, nous transformons les invendus en repas. Réseau de fournisseurs et cuisines collectives à Bruxelles.",
  },
  {
    view:        ViewState.SOLIDARITY_NETWORK,
    icon:        Users,
    borderColor: '#FFCC00',
    iconBg:      'bg-[#FFCC00]/20',
    iconColor:   'text-[#8B7000]',
    label:       'Entraide',
    desc:        "Trouver du travail, comprendre un document, naviguer dans les administrations — quelqu'un qui est passé par là change tout. C'est ce que nous faisons.",
  },
  {
    view:        ViewState.CULTURE,
    icon:        BookOpen,
    borderColor: '#4B3D8F',
    iconBg:      'bg-[#4B3D8F]/10',
    iconColor:   'text-[#4B3D8F]',
    label:       'Culture & Histoire',
    desc:        "La culture est notre levier politique. Elle nous rend visibles, renforce notre voix et nous permet d'aller plus loin encore dans ce que nous construisons.",
  },
];

const IMPACT_NUMBERS = [
  { value: '15 000+', label: 'Guinéens en Belgique',    accent: '#BE0000' },
  { value: '5',       label: 'Programmes actifs',        accent: '#FFCC00' },
  { value: '3',       label: "Langues d'assistance",     accent: '#00843D' },
  { value: '24h',     label: "Ligne d'urgence",          accent: '#BE0000' },
];

const cardVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

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
    <div className="bg-[#0F0F0F] relative overflow-hidden">
      {/* Flag line top */}
      <div className="flag-line" aria-hidden="true"><span /><span /><span /></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <dl className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/8">
          {IMPACT_NUMBERS.map((stat) => (
            <div key={stat.label} className="px-8 py-10 text-center">
              <dt
                className="text-3xl xl:text-4xl font-serif font-black leading-none"
                style={{ color: stat.accent }}
              >
                {stat.value}
              </dt>
              <dd className="mt-2.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                {stat.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
      {/* Flag line bottom */}
      <div className="flag-line" aria-hidden="true"><span /><span /><span /></div>
    </div>

    {/* ── Programs section ──────────────────────────────────────────────── */}
    <section className="bg-[#FAFAF8] py-20 sm:py-28" aria-labelledby="programs-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Section header */}
        <div className="max-w-2xl mb-16">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#BE0000] mb-3">
            Nos programmes
          </p>
          <h2 id="programs-title" className="font-serif font-black text-3xl sm:text-4xl text-[#0F0F0F] leading-tight">
            Du toit à l'indépendance — le parcours complet.
          </h2>
          <p className="mt-4 text-[#6B6B6B] text-base leading-relaxed">
            Nous ne traitons pas les urgences une par une. Nous gérons le parcours entier : logement, droits, alimentation, emploi, communauté, culture — jusqu'à ce que la personne soit vraiment libre.
          </p>
        </div>

        {/* Programs grid — cards with colored top border */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PROGRAMS.map((prog, i) => (
            <motion.button
              key={prog.view}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              onClick={() => navigate(prog.view)}
              whileHover={{ y: -4, transition: { type: 'spring', stiffness: 350, damping: 22 } }}
              className="group bg-white border border-[#E8E8E6] rounded-[12px] p-7 text-left flex flex-col gap-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-shadow focus:outline-none overflow-hidden relative"
            >
              {/* Colored top border */}
              <div
                className="absolute top-0 left-0 right-0 h-[3px] rounded-t-[12px]"
                style={{ background: prog.borderColor }}
                aria-hidden="true"
              />

              <div className={`w-10 h-10 ${prog.iconBg} rounded-[8px] flex items-center justify-center shrink-0`}>
                <prog.icon className={`h-5 w-5 ${prog.iconColor}`} aria-hidden="true" />
              </div>

              <div className="flex-1">
                <h3
                  className="font-serif font-black text-lg text-[#0F0F0F] mb-2 leading-tight transition-colors duration-200"
                  style={{ ['--hover-color' as string]: prog.borderColor }}
                >
                  <span className="group-hover:opacity-80 transition-opacity">{prog.label}</span>
                </h3>
                <p className="text-[13px] text-[#6B6B6B] leading-relaxed">{prog.desc}</p>
              </div>

              <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ color: prog.borderColor }}>
                Accéder <ArrowRight className="h-3 w-3" aria-hidden="true" />
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>

    {/* ── Donate CTA ────────────────────────────────────────────────────── */}
    <section className="bg-white py-16 border-t border-[#E8E8E6]" aria-label="Soutenir Ballal ASBL">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-8">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#6B6B6B] mb-2">Agir maintenant</p>
          <h2 className="font-serif font-black text-2xl text-[#0F0F0F]">
            Soutenir Ballal, c'est soutenir ceux qui savent.
          </h2>
          <p className="text-[13px] text-[#6B6B6B] mt-1.5">
            Une association de terrain, par et pour les sans-papiers. Chaque don finance directement le parcours vers l'indépendance.
          </p>
        </div>
        <motion.button
          onClick={() => navigate(ViewState.DONATE)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="shrink-0 inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#0F0F0F] text-white text-[12px] font-black uppercase tracking-widest rounded-[8px] hover:bg-[#BE0000] transition-colors duration-200 group focus:outline-none"
        >
          Soutenir Ballal
          <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
        </motion.button>
      </div>
    </section>

    {/* ── Conseil d'Administration ──────────────────────────────────────── */}
    <section className="bg-[#FAFAF8] py-20 sm:py-28 border-t border-[#E8E8E6]" aria-labelledby="team-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <div className="max-w-2xl mb-14">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#BE0000] mb-3">
            Gouvernance
          </p>
          <h2 id="team-title" className="font-serif font-black text-3xl sm:text-4xl text-[#0F0F0F] leading-tight">
            Conseil d'Administration
          </h2>
          <p className="mt-3 text-[#6B6B6B] text-base">
            Notre direction vient de la rue. Certains ont été sans-papiers. Tous ont vécu ce que vivent nos bénéficiaires. C'est ce qui fait notre différence.
          </p>
        </div>

        {/* Admin cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
          {[
            { name: "Thierno I. T. Diallo", bio: "Président fondateur",    img: "https://i.imgur.com/T2LT1pB.png", accent: "#BE0000" },
            { name: "Bah Ibrahim",          bio: "Resp. des opérations",   img: "https://i.imgur.com/l3UdDov.png", accent: "#FFCC00" },
            { name: "Kadiatou Sow",         bio: "Secrétaire",             img: "https://i.imgur.com/THTzMBW.png", accent: "#00843D" },
            { name: "Cissé Abdoulaye",      bio: "Trésorier",              img: "https://i.imgur.com/7FduSwY.png", accent: "#0F0F0F" },
            { name: "Francois Halleux",     bio: "Conseiller stratégique", img: "https://i.imgur.com/1qqkroP.png", accent: "#2563EB" },
          ].map((member, i) => (
            <motion.div
              key={member.name}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-30px' }}
              className="bg-white rounded-[12px] overflow-hidden border border-[#E8E8E6] shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-shadow group"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-[#F0F0EE]">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div
                  className="absolute bottom-0 left-0 right-0 h-[3px]"
                  style={{ backgroundColor: member.accent }}
                  aria-hidden="true"
                />
              </div>
              <div className="p-4">
                <p className="font-black text-[13px] text-[#0F0F0F] leading-tight">{member.name}</p>
                <p className="text-[10px] text-[#6B6B6B] font-medium mt-1">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Members collective photo */}
        <div className="mt-12 rounded-[20px] overflow-hidden relative shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
          <img
            src="https://i.imgur.com/CwnDz75.png"
            alt="Membres et militants de Ballal ASBL"
            className="w-full h-64 sm:h-80 object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F]/80 via-[#0F0F0F]/20 to-transparent" aria-hidden="true" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#FFCC00] mb-2">Membres & Militants</p>
            <p className="font-serif font-black text-xl sm:text-2xl text-white leading-snug max-w-xl">
              Derrière chaque action Ballal, des femmes et des hommes qui ne lâchent pas.
            </p>
          </div>
        </div>

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
    <div className="min-h-screen bg-[#FAFAF8] text-[#0F0F0F]">
      <Navbar
        setView={navigate}
        language={language}
        setLanguage={setLanguage}
        onOpenAuth={() => openAuth('login')}
      />

      {/* pt accounts for: 3px flag line + 68px nav */}
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
  </AuthProvider>
);

export default App;
