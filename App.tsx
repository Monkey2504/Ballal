import React, { useState, ReactNode, Component, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import Footer from './components/Footer.tsx';
import CookieConsent from './components/CookieConsent.tsx';
import SectionHeader from './components/ui/SectionHeader.tsx';
import Card from './components/ui/Card.tsx';
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

// ── Données programmes ─────────────────────────────────────────────────────
const PROGRAMS = [
  {
    view:        ViewState.LEGAL_AID,
    icon:        Scale,
    borderColor: 'var(--crimson)',
    iconBg:      'bg-guinea-red/10',
    iconColor:   'text-guinea-red',
    label:       'Droits & Juridique',
    desc:        "Votre domicile est protégé par la Constitution. Articles 9bis/9ter, scripts d'urgence, régularisation — nous vous outillons pour vous défendre.",
  },
  {
    view:        ViewState.SQUAT,
    icon:        Home,
    borderColor: 'var(--ink)',
    iconBg:      'bg-ink/10',
    iconColor:   'text-ink',
    label:       'Logement',
    desc:        "Nous gérons directement plusieurs occupations solidaires à Bruxelles depuis des années. Pas des conseils de l'extérieur — une présence physique, sur place, chaque jour.",
  },
  {
    view:        ViewState.FOOD_AUTONOMY,
    icon:        Utensils,
    borderColor: 'var(--emerald)',
    iconBg:      'bg-guinea-green/10',
    iconColor:   'text-guinea-green',
    label:       'Autonomie Alimentaire',
    desc:        "Chaque semaine, nous transformons les invendus en repas. Réseau de fournisseurs et cuisines collectives à Bruxelles.",
  },
  {
    view:        ViewState.SOLIDARITY_NETWORK,
    icon:        Users,
    borderColor: 'var(--gold)',
    iconBg:      'bg-guinea-yellow/20',
    iconColor:   'text-[#8B7000]',
    label:       'Entraide',
    desc:        "Trouver du travail, comprendre un document, naviguer dans les administrations — quelqu'un qui est passé par là change tout. C'est ce que nous faisons.",
  },
  {
    view:        ViewState.CULTURE,
    icon:        BookOpen,
    borderColor: 'var(--ink)',
    iconBg:      'bg-ink/10',
    iconColor:   'text-ink',
    label:       'Culture & Histoire',
    desc:        "La culture est notre levier politique. Elle nous rend visibles, renforce notre voix et nous permet d'aller plus loin encore dans ce que nous construisons.",
  },
];

const IMPACT_NUMBERS = [
  { value: '15 000+', label: 'Guinéens en Belgique',  accent: 'var(--crimson)' },
  { value: '5',       label: 'Programmes actifs',      accent: 'var(--gold)'    },
  { value: '3',       label: "Langues d'assistance",   accent: 'var(--emerald)' },
  { value: '24h',     label: "Ligne d'urgence",        accent: 'var(--crimson)' },
];

const cardVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const TEAM_MEMBERS = [
  { name: "Thierno I. T. Diallo", bio: "Président fondateur",    img: "https://i.imgur.com/T2LT1pB.png", accent: "var(--crimson)" },
  { name: "Bah Ibrahim",          bio: "Resp. des opérations",   img: "https://i.imgur.com/l3UdDov.png", accent: "var(--gold)"    },
  { name: "Kadiatou Sow",         bio: "Secrétaire",             img: "https://i.imgur.com/THTzMBW.png", accent: "var(--emerald)" },
  { name: "Cissé Abdoulaye",      bio: "Trésorier",              img: "https://i.imgur.com/7FduSwY.png", accent: "var(--ink)"     },
  { name: "Francois Halleux",     bio: "Conseiller stratégique", img: "https://i.imgur.com/1qqkroP.png", accent: "var(--ink)"     },
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

    {/* ── Bandeau de chiffres ───────────────────────────────────────────── */}
    <div className="bg-ink relative overflow-hidden">
      <div className="flag-line" aria-hidden="true"><span /><span /><span /></div>
      {/* Dot-grid overlay for depth on dark background */}
      <div className="absolute inset-0 dot-grid opacity-[0.13] pointer-events-none" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <dl className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/[0.08]">
          {IMPACT_NUMBERS.map((stat) => (
            <div key={stat.label} className="px-8 py-14 text-center flex flex-col-reverse gap-3">
              <dt className="text-label font-bold uppercase tracking-[0.2em] text-white/40">
                {stat.label}
              </dt>
              <dd className="text-4xl xl:text-5xl font-serif font-black leading-none" style={{ color: stat.accent }}>
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="flag-line" aria-hidden="true"><span /><span /><span /></div>
    </div>

    {/* ── Programmes ───────────────────────────────────────────────────── */}
    <section className="bg-ivory py-20 sm:py-28" aria-labelledby="programs-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <SectionHeader
          titleId="programs-title"
          eyebrow="Nos programmes"
          title="Du toit à l'indépendance — le parcours complet."
          description="Nous ne traitons pas les urgences une par une. Nous gérons le parcours entier : logement, droits, alimentation, emploi, communauté, culture — jusqu'à ce que la personne soit vraiment libre."
          flagLine
          className="mb-16"
        />

        {/* Featured layout: first card spans 2 cols, rest fills row below */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

          {/* Featured card — Droits, 2-col wide */}
          <motion.div
            custom={0}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            className="lg:col-span-2"
          >
            <Card
              hover
              onClick={() => navigate(PROGRAMS[0].view)}
              accentColor={PROGRAMS[0].borderColor}
              className="group p-8 sm:p-10 flex flex-col gap-6 h-full"
            >
              <div className="flex items-start gap-6">
                <div className={`w-14 h-14 ${PROGRAMS[0].iconBg} rounded-token-lg flex items-center justify-center shrink-0`}>
                  <PROGRAMS[0].icon className={`h-7 w-7 ${PROGRAMS[0].iconColor}`} aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <h3 className="font-serif font-black text-2xl text-ink mb-3 leading-tight group-hover:opacity-80 transition-opacity">
                    {PROGRAMS[0].label}
                  </h3>
                  <p className="text-body-lg text-ink-muted leading-relaxed">{PROGRAMS[0].desc}</p>
                </div>
              </div>
              <div
                className="flex items-center gap-1.5 text-label font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-200 mt-auto"
                style={{ color: PROGRAMS[0].borderColor }}
              >
                Accéder <ArrowRight className="h-3 w-3" aria-hidden="true" />
              </div>
            </Card>
          </motion.div>

          {/* Second card (Logement) — single column */}
          <motion.div
            custom={1}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
          >
            <Card
              hover
              onClick={() => navigate(PROGRAMS[1].view)}
              accentColor={PROGRAMS[1].borderColor}
              className="group p-7 flex flex-col gap-5 h-full"
            >
              <div className={`w-10 h-10 ${PROGRAMS[1].iconBg} rounded-token flex items-center justify-center shrink-0`}>
                <PROGRAMS[1].icon className={`h-5 w-5 ${PROGRAMS[1].iconColor}`} aria-hidden="true" />
              </div>
              <div className="flex-1">
                <h3 className="font-serif font-black text-lg text-ink mb-2 leading-tight group-hover:opacity-80 transition-opacity">
                  {PROGRAMS[1].label}
                </h3>
                <p className="text-body-sm text-ink-muted leading-relaxed">{PROGRAMS[1].desc}</p>
              </div>
              <div
                className="flex items-center gap-1.5 text-label font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                style={{ color: PROGRAMS[1].borderColor }}
              >
                Accéder <ArrowRight className="h-3 w-3" aria-hidden="true" />
              </div>
            </Card>
          </motion.div>

          {/* Remaining 3 cards — one per column */}
          {PROGRAMS.slice(2).map((prog, i) => (
            <motion.div
              key={prog.view}
              custom={i + 2}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
            >
              <Card
                hover
                onClick={() => navigate(prog.view)}
                accentColor={prog.borderColor}
                className="group p-7 flex flex-col gap-5 h-full"
              >
                <div className={`w-10 h-10 ${prog.iconBg} rounded-token flex items-center justify-center shrink-0`}>
                  <prog.icon className={`h-5 w-5 ${prog.iconColor}`} aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <h3 className="font-serif font-black text-lg text-ink mb-2 leading-tight group-hover:opacity-80 transition-opacity">
                    {prog.label}
                  </h3>
                  <p className="text-body-sm text-ink-muted leading-relaxed">{prog.desc}</p>
                </div>
                <div
                  className="flex items-center gap-1.5 text-label font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ color: prog.borderColor }}
                >
                  Accéder <ArrowRight className="h-3 w-3" aria-hidden="true" />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── CTA Don — section signature en jaune Guinée ──────────────────── */}
    <section className="bg-guinea-yellow relative overflow-hidden py-16 sm:py-20" aria-label="Soutenir Ballal ASBL">
      {/* Decorative background elements */}
      <div className="absolute -right-28 -bottom-28 w-[380px] h-[380px] bg-ink/[0.04] rounded-full pointer-events-none" aria-hidden="true" />
      <div className="absolute -left-14 -top-14 w-44 h-44 bg-guinea-red/[0.08] rounded-full pointer-events-none" aria-hidden="true" />
      <div className="absolute right-1/4 top-0 w-px h-full bg-ink/[0.06] pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <div className="max-w-xl">
            <p className="text-label font-bold uppercase tracking-[0.3em] text-ink/50 mb-3">Agir maintenant</p>
            <h2 className="font-serif font-black text-3xl sm:text-4xl text-ink leading-tight">
              Soutenir Ballal, c'est soutenir ceux qui savent.
            </h2>
            <p className="text-body-sm text-ink/70 mt-3 leading-relaxed">
              Une association de terrain, par et pour les sans-papiers. Chaque don finance directement le parcours vers l'indépendance.
            </p>
          </div>
          <motion.button
            onClick={() => navigate(ViewState.DONATE)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="shrink-0 inline-flex items-center gap-2.5 px-7 py-3.5 bg-ink text-white text-[12px] font-bold uppercase tracking-widest rounded-token hover:bg-guinea-red transition-colors duration-200 group focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/40 focus-visible:ring-offset-2"
          >
            Soutenir Ballal
            <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
          </motion.button>
        </div>
      </div>
    </section>

    {/* ── Conseil d'Administration ──────────────────────────────────────── */}
    <section className="bg-ivory py-20 sm:py-28 border-t border-border-subtle" aria-labelledby="team-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <SectionHeader
          titleId="team-title"
          eyebrow="Gouvernance"
          title="Conseil d'Administration"
          description="Notre direction vient de la rue. Certains ont été sans-papiers. Tous ont vécu ce que vivent nos bénéficiaires. C'est ce qui fait notre différence."
          flagLine
          className="mb-14"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
          {TEAM_MEMBERS.map((member, i) => (
            <motion.div
              key={member.name}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-30px' }}
            >
              <Card className="group overflow-hidden">
                <div className="relative aspect-[3/4] overflow-hidden bg-border-subtle">
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
                  <p className="font-black text-body-sm text-ink leading-tight">{member.name}</p>
                  <p className="text-label text-ink-muted font-medium mt-1">{member.bio}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 rounded-token-xl overflow-hidden relative shadow-soft-lg">
          <img
            src="https://i.imgur.com/CwnDz75.png"
            alt="Membres et militants de Ballal ASBL"
            className="w-full h-64 sm:h-80 object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" aria-hidden="true" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
            <p className="text-label font-black uppercase tracking-[0.3em] text-guinea-yellow mb-2">Membres & Militants</p>
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
  </AuthProvider>
);

export default App;
