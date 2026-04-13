import React, { useState } from 'react';
import {
  Shield, Scale, Zap, GraduationCap, Home, X, Phone, MapPin,
  CheckCircle, Copy, ShieldAlert, ListChecks, FileText, AlertTriangle,
  ChevronDown, ChevronUp, ExternalLink, Clock, BookOpen, Users
} from 'lucide-react';
import { LanguageCode } from '../types.ts';
import { translations } from '../utils/translations.ts';

interface LegalAidSectionProps {
  language?: LanguageCode;
}

type TabType = 'urgence' | 'regularisation' | 'ressources';

const CONTACTS = [
  {
    name: 'Office des Étrangers (OE)',
    role: 'Dépôt des demandes de séjour',
    address: 'WTC II, Bd du Roi Albert II 26/III, 1000 Bruxelles',
    phone: '02 793 80 00',
    url: 'dofi.ibz.be',
    color: '#BE0000',
  },
  {
    name: 'CGRS — Commissariat Général',
    role: 'Demande d\'asile & réfugiés',
    address: 'Rue Ernest Blerot 39, 1070 Anderlecht',
    phone: '02 205 51 11',
    url: 'cgvs.be',
    color: '#00843D',
  },
  {
    name: 'CIRÉ',
    role: 'Aide juridique & permanences gratuites',
    address: 'Avenue Poincaré 50, 1070 Bruxelles',
    phone: '02 629 77 10',
    url: 'cire.be',
    color: '#FFCC00',
  },
  {
    name: 'Aide juridique de 1ère ligne',
    role: 'Avocat gratuit (30 min) — tous palais de justice',
    address: 'Barreau de Bruxelles',
    phone: '02 508 68 10',
    url: 'avocats.be',
    color: '#0F0F0F',
  },
];

const FAQ = [
  {
    q: 'Mon dossier 9bis a été refusé. Que faire ?',
    a: 'Vous avez 30 jours à partir du refus pour introduire un recours au Conseil du Contentieux des Étrangers (CCE). Ce recours est suspensif — vous ne pouvez pas être expulsé pendant son instruction. Contactez immédiatement un avocat ou la CIRÉ.',
  },
  {
    q: 'Combien de temps faut-il être en Belgique pour un 9bis ?',
    a: 'Il n\'y a aucune durée minimale légale. Mais en pratique, 3 à 5 ans de séjour documenté et continu renforcent considérablement le dossier. La durée seule ne suffit pas : l\'intégration sociale, la scolarisation, l\'ancrage associatif comptent autant.',
  },
  {
    q: 'Je n\'ai pas de papiers d\'identité. Puis-je déposer une demande ?',
    a: 'Oui. L\'absence de documents d\'identité n\'empêche pas le dépôt d\'une demande. Elle complique l\'instruction, mais ne l\'interdit pas. Un accompagnement juridique est fortement recommandé pour constituer un dossier solide malgré ce manque.',
  },
  {
    q: 'J\'ai reçu un Ordre de Quitter le Territoire (OQT). Dois-je partir ?',
    a: 'Pas nécessairement. Un OQT est une décision administrative contestable. Vous avez 30 jours pour introduire un recours. Si vous êtes en procédure (9bis, 9ter, asile en cours), un recours suspensif bloque l\'exécution. Agissez immédiatement.',
  },
  {
    q: 'Puis-je travailler pendant ma procédure de régularisation ?',
    a: 'Cela dépend de votre situation précise. Pendant une demande d\'asile : pas les 4 premiers mois. Avec un accusé de réception 9bis/9ter : en principe non, mais des exceptions existent. Consultez un avocat pour votre cas spécifique.',
  },
  {
    q: 'La CIRÉ et l\'aide juridique, c\'est vraiment gratuit ?',
    a: 'Oui. L\'aide juridique de première ligne (30 min avec un avocat dans les palais de justice) est entièrement gratuite. Si votre dossier est complexe, l\'aide juridique de deuxième ligne (avocat commis d\'office) est possible sous conditions de ressources.',
  },
  {
    q: 'Quelle est la différence entre 9bis et une demande d\'asile ?',
    a: 'Le 9bis est une régularisation pour raisons humanitaires (ancrage social, durée de séjour). L\'asile s\'adresse aux personnes craignant des persécutions dans leur pays d\'origine pour des raisons de race, religion, nationalité, groupe social ou opinion politique. Les deux voies peuvent coexister.',
  },
];

const LegalAidSection: React.FC<LegalAidSectionProps> = ({ language = 'fr' }) => {
  const [isFlashMode, setIsFlashMode] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('urgence');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const t = translations[language] || translations['fr'];

  const script = "Ceci est mon domicile privé. Je refuse l'entrée sans mandat (Art. 15 Const.). Je garde le silence jusqu'à l'arrivée de mon avocat.";

  const handleCopy = () => {
    navigator.clipboard.writeText(script);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] pb-24">

      {/* FLASH MODE */}
      {isFlashMode && (
        <div className="fixed inset-0 z-[200] bg-guinea-red text-white flex flex-col items-center justify-center p-8 animate-in fade-in duration-300">
          <button onClick={() => setIsFlashMode(false)} className="absolute top-8 right-8 text-white hover:scale-110 transition-transform p-2 bg-black/10 rounded-full">
            <X className="h-10 w-10" />
          </button>
          <ShieldAlert className="h-24 w-24 mb-8 animate-pulse text-guinea-yellow" />
          <h2 className="text-5xl md:text-8xl font-black uppercase text-center mb-10 tracking-tighter leading-none">NE PAS OUVRIR</h2>
          <div className="bg-white text-[#0F0F0F] p-8 md:p-12 max-w-3xl w-full rounded-[2rem] shadow-2xl relative">
            <p className="font-mono text-2xl md:text-4xl font-black uppercase leading-tight text-center">
              "{script}"
            </p>
            <button
              onClick={handleCopy}
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-[#0F0F0F] text-white px-8 py-4 rounded-full shadow-xl flex items-center gap-3 hover:bg-guinea-green transition-all"
            >
              {copied ? <CheckCircle className="h-6 w-6" /> : <Copy className="h-6 w-6" />}
              <span className="font-black text-xs uppercase tracking-widest">{copied ? 'COPIÉ' : 'COPIER LE SCRIPT'}</span>
            </button>
          </div>
        </div>
      )}

      {/* HERO */}
      <div className="bg-[#0F0F0F] text-white py-20 relative overflow-hidden">
        <div className="flag-line absolute top-0 left-0 right-0" aria-hidden="true"><span /><span /><span /></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 pt-4">
          <div className="inline-flex items-center gap-2 bg-[#FFCC00]/15 text-[#FFCC00] px-5 py-2 font-bold rounded-full text-[10px] uppercase tracking-[0.25em] mb-8 border border-[#FFCC00]/25">
            GUIDE DE PROTECTION JURIDIQUE
          </div>
          <h1 className="text-6xl md:text-8xl font-serif font-black tracking-tighter leading-[0.9] mb-8">
            Tes <span className="text-[#BE0000]">droits</span>,<br />tes <span className="text-[#00843D]">armes</span>
          </h1>
          <p className="text-lg md:text-xl font-medium italic max-w-2xl leading-relaxed text-white/50">
            "{t.legal_intro}"
          </p>
        </div>
        <div className="flag-line absolute bottom-0 left-0 right-0" aria-hidden="true"><span /><span /><span /></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-16 relative z-20">

        {/* SOS BUTTON */}
        <button
          onClick={() => setIsFlashMode(true)}
          className="w-full bg-guinea-red text-white p-10 rounded-[2.5rem] shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 flex items-center justify-center gap-8 group mb-12 overflow-hidden relative"
        >
          <div className="absolute inset-0 bg-white/5 group-hover:bg-transparent transition-colors" />
          <Zap className="h-10 w-10 text-guinea-yellow group-hover:scale-125 transition-transform" />
          <span className="text-3xl md:text-5xl font-black uppercase tracking-tighter">MODE URGENCE POLICE</span>
          <Zap className="h-10 w-10 text-guinea-yellow group-hover:scale-125 transition-transform" />
        </button>

        {/* TAB NAVIGATION */}
        <nav className="flex rounded-[1rem] bg-white border border-gray-100 shadow-soft-elegant overflow-hidden mb-12">
          {([
            { id: 'urgence',       label: 'Droits fondamentaux', icon: Shield },
            { id: 'regularisation', label: 'Régularisation',     icon: Scale },
            { id: 'ressources',    label: 'Ressources & FAQ',    icon: BookOpen },
          ] as { id: TabType; label: string; icon: any }[]).map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex-1 flex items-center justify-center gap-2 py-4 px-3 font-black text-[11px] uppercase tracking-widest transition-all duration-200 ${
                activeTab === id
                  ? 'bg-[#0F0F0F] text-white'
                  : 'text-[#6B6B6B] hover:bg-[#FAFAF8]'
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </nav>

        {/* ── TAB 1 : DROITS FONDAMENTAUX ─────────────────────────────────── */}
        {activeTab === 'urgence' && (
          <div className="grid md:grid-cols-2 gap-8 animate-in fade-in duration-300">

            {/* Éducation */}
            <div className="bg-white p-10 rounded-[2.5rem] shadow-soft-elegant border border-gray-100 hover:border-guinea-green/20 transition-all group">
              <div className="flex items-center gap-5 mb-8">
                <div className="p-4 bg-guinea-green/10 text-guinea-green rounded-2xl group-hover:scale-110 transition-transform">
                  <GraduationCap className="h-8 w-8" />
                </div>
                <h3 className="text-3xl font-serif font-black text-[#0F0F0F]">{t.legal_school_title}</h3>
              </div>
              <p className="text-lg font-medium text-gray-600 mb-8 italic">"{t.legal_school_subtitle}"</p>
              <ul className="space-y-4">
                <li className="flex items-start gap-4 text-gray-700 font-medium">
                  <CheckCircle className="h-5 w-5 text-guinea-green shrink-0 mt-1" />
                  {t.legal_school_point1}
                </li>
                <li className="flex items-start gap-4 text-gray-700 font-medium">
                  <CheckCircle className="h-5 w-5 text-guinea-green shrink-0 mt-1" />
                  {t.legal_school_point2}
                </li>
              </ul>
            </div>

            {/* Habitat */}
            <div className="bg-white p-10 rounded-[2.5rem] shadow-soft-elegant border border-gray-100 hover:border-guinea-red/20 transition-all group">
              <div className="flex items-center gap-5 mb-8">
                <div className="p-4 bg-guinea-red/10 text-guinea-red rounded-2xl group-hover:scale-110 transition-transform">
                  <Home className="h-8 w-8" />
                </div>
                <h3 className="text-3xl font-serif font-black text-[#0F0F0F]">{t.legal_home_title}</h3>
              </div>
              <div className="bg-guinea-red text-white p-6 rounded-2xl font-bold uppercase text-sm mb-6 shadow-sm">
                ⚠️ {t.legal_home_warrant}
              </div>
              <p className="text-gray-600 font-medium mb-10 leading-relaxed">{t.legal_home_police}</p>
              <button
                onClick={() => setIsFlashMode(true)}
                className="w-full bg-[#0F0F0F] text-white py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-guinea-red transition-all shadow-md flex items-center justify-center gap-3"
              >
                <Zap className="h-5 w-5 text-guinea-yellow" />
                Script d'urgence
              </button>
            </div>
          </div>
        )}

        {/* ── TAB 2 : RÉGULARISATION ──────────────────────────────────────── */}
        {activeTab === 'regularisation' && (
          <div className="space-y-8 animate-in fade-in duration-300">

            {/* 9bis */}
            <div className="bg-white rounded-[2.5rem] shadow-soft-elegant border border-gray-100 overflow-hidden">
              <div className="p-10 md:p-12">
                <div className="flex flex-wrap items-center gap-4 mb-8">
                  <h3 className="text-4xl font-serif font-black text-guinea-green">Article 9<em>bis</em></h3>
                  <span className="bg-guinea-green/10 text-guinea-green text-[10px] px-3 py-1 font-black rounded-full uppercase tracking-widest">Humanitaire</span>
                  <span className="ml-auto flex items-center gap-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    <Clock className="h-4 w-4" /> 6 mois – 2 ans
                  </span>
                </div>
                <p className="text-gray-700 font-medium leading-relaxed text-lg mb-10">
                  La voie humanitaire repose sur votre ancrage en Belgique. Il n'existe <strong>aucune durée minimale légale</strong> — mais 3 à 5 ans de séjour documenté et d'intégration sociale renforcent très significativement le dossier.
                </p>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-[#FAFAF8] p-8 rounded-2xl border border-gray-100">
                    <h4 className="font-black text-xs uppercase text-gray-400 mb-6 flex items-center gap-2">
                      <ListChecks className="h-4 w-4 text-guinea-green" /> Ce que vous devez prouver
                    </h4>
                    <ul className="space-y-4 text-sm font-medium text-gray-700">
                      {[
                        'Durée et continuité du séjour (contrats de bail, factures, courriers)',
                        'Scolarisation des enfants (bulletins, attestations d\'inscription)',
                        'Intégration sociale : associations, bénévolat, cours de français',
                        'Liens familiaux avec Belges ou résidents légaux',
                        'Risque réel de persécution ou de violation des droits en cas de retour',
                        'Absence d\'antécédents pénaux graves',
                      ].map((item, i) => (
                        <li key={i} className="flex gap-3 items-start">
                          <div className="h-2 w-2 rounded-full bg-guinea-green mt-2 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-[#FAFAF8] p-8 rounded-2xl border border-gray-100">
                    <h4 className="font-black text-xs uppercase text-gray-400 mb-6 flex items-center gap-2">
                      <FileText className="h-4 w-4 text-guinea-green" /> Documents à rassembler
                    </h4>
                    <ul className="space-y-4 text-sm font-medium text-gray-700">
                      {[
                        'Formulaire de demande (téléchargeable sur dofi.ibz.be)',
                        'Passeport ou document d\'identité (même expiré)',
                        'Preuves de résidence sur 5 ans (baux, factures, courriers officiels)',
                        'Attestations d\'associations, de bénévolat, d\'intégration',
                        'Bulletins scolaires et attestations des enfants',
                        'Lettre de motivation personnelle détaillant votre situation',
                      ].map((item, i) => (
                        <li key={i} className="flex gap-3 items-start">
                          <div className="h-2 w-2 rounded-full bg-guinea-green mt-2 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 bg-[#0F0F0F] text-white p-8 rounded-2xl">
                  <h4 className="font-black text-xs uppercase text-guinea-yellow mb-4 tracking-widest">Procédure — 4 étapes</h4>
                  <ol className="space-y-3 text-sm font-medium text-white/80">
                    {[
                      'Déposer le dossier complet à l\'Office des Étrangers (en mains propres ou recommandé avec accusé de réception)',
                      'Recevoir l\'accusé de réception → PROTECTION TEMPORAIRE contre l\'expulsion pendant l\'instruction',
                      'Instruction par l\'OE (durée non garantie : 6 mois à 2 ans)',
                      'Décision : titre de séjour accordé — ou refus motivé (recours possible dans 30 jours)',
                    ].map((step, i) => (
                      <li key={i} className="flex gap-4 items-start">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-guinea-green text-white text-[10px] font-black flex items-center justify-center">{i + 1}</span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>

            {/* 9ter */}
            <div className="bg-white rounded-[2.5rem] shadow-soft-elegant border border-gray-100 overflow-hidden">
              <div className="p-10 md:p-12">
                <div className="flex flex-wrap items-center gap-4 mb-8">
                  <h3 className="text-4xl font-serif font-black text-guinea-red">Article 9<em>ter</em></h3>
                  <span className="bg-guinea-red/10 text-guinea-red text-[10px] px-3 py-1 font-black rounded-full uppercase tracking-widest">Médical</span>
                  <span className="ml-auto flex items-center gap-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    <Clock className="h-4 w-4" /> 4 mois minimum
                  </span>
                </div>
                <p className="text-gray-700 font-medium leading-relaxed text-lg mb-10">
                  Réservé aux personnes atteintes d'une <strong>pathologie grave</strong> dont le traitement adéquat est <strong>inaccessible en Guinée</strong> — inexistant, indisponible ou financièrement hors d'atteinte.
                </p>

                <div className="bg-guinea-red/8 border border-guinea-red/20 rounded-2xl p-6 mb-8 flex gap-4 items-start">
                  <AlertTriangle className="h-5 w-5 text-guinea-red shrink-0 mt-0.5" />
                  <p className="text-sm font-bold text-guinea-red leading-relaxed">
                    Un simple certificat de maladie ne suffit pas. Le rapport médical doit explicitement argumenter l'inaccessibilité du traitement en Guinée. Demandez à votre médecin d'inclure cette mention.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-[#FAFAF8] p-8 rounded-2xl border border-gray-100">
                    <h4 className="font-black text-xs uppercase text-gray-400 mb-6 flex items-center gap-2">
                      <ListChecks className="h-4 w-4 text-guinea-red" /> Critères obligatoires
                    </h4>
                    <ul className="space-y-4 text-sm font-medium text-gray-700">
                      {[
                        'Maladie grave (pronostic vital ou risque sérieux d\'aggravation)',
                        'Traitement requis inexistant ou inaccessible en Guinée',
                        'Suivi médical actuel et documenté en Belgique',
                      ].map((item, i) => (
                        <li key={i} className="flex gap-3 items-start">
                          <div className="h-2 w-2 rounded-full bg-guinea-red mt-2 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-[#FAFAF8] p-8 rounded-2xl border border-gray-100">
                    <h4 className="font-black text-xs uppercase text-gray-400 mb-6 flex items-center gap-2">
                      <FileText className="h-4 w-4 text-guinea-red" /> Documents clés
                    </h4>
                    <ul className="space-y-4 text-sm font-medium text-gray-700">
                      {[
                        'Rapport médical détaillé : diagnostic, traitement requis, pronostic sans traitement, mention d\'inaccessibilité en Guinée',
                        'Preuve de prise en charge médicale actuelle en Belgique',
                        'Certificat de non-voyageabilité si applicable',
                        'Rapport OMS ou MSF sur le système de santé guinéen pour cette pathologie (optionnel mais renforcant)',
                      ].map((item, i) => (
                        <li key={i} className="flex gap-3 items-start">
                          <div className="h-2 w-2 rounded-full bg-guinea-red mt-2 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Asile */}
            <div className="bg-white rounded-[2.5rem] shadow-soft-elegant border border-gray-100 overflow-hidden">
              <div className="p-10 md:p-12">
                <div className="flex flex-wrap items-center gap-4 mb-8">
                  <h3 className="text-4xl font-serif font-black text-[#4B3D8F]">Demande d'asile</h3>
                  <span className="bg-[#4B3D8F]/10 text-[#4B3D8F] text-[10px] px-3 py-1 font-black rounded-full uppercase tracking-widest">Convention de Genève</span>
                </div>

                <div className="bg-[#4B3D8F]/8 border border-[#4B3D8F]/20 rounded-2xl p-6 mb-8 flex gap-4 items-start">
                  <AlertTriangle className="h-5 w-5 text-[#4B3D8F] shrink-0 mt-0.5" />
                  <p className="text-sm font-bold text-[#4B3D8F] leading-relaxed">
                    Déposez dès que possible. Une demande tardive après plusieurs années en Belgique peut affaiblir la crédibilité de la crainte alléguée aux yeux du CGRS.
                  </p>
                </div>

                <p className="text-gray-700 font-medium leading-relaxed text-lg mb-10">
                  L'asile s'adresse aux personnes qui craignent d'être persécutées dans leur pays pour des raisons de <strong>race, religion, nationalité, appartenance à un groupe social ou opinion politique</strong>. La protection subsidiaire couvre les risques d'atteinte grave à l'intégrité physique.
                </p>

                <div className="bg-[#0F0F0F] text-white p-8 rounded-2xl mb-8">
                  <h4 className="font-black text-xs uppercase text-guinea-yellow mb-6 tracking-widest">Procédure — 5 étapes</h4>
                  <ol className="space-y-4 text-sm font-medium text-white/80">
                    {[
                      { step: 'Enregistrement à l\'OE (Petit-Château, Bruxelles) — vous recevez une attestation d\'immatriculation (AI), document officiel de séjour', color: '#BE0000' },
                      { step: 'Entretien(s) au CGRS — plusieurs mois d\'attente possible. Préparez votre récit avec précision et cohérence', color: '#FFCC00' },
                      { step: 'Décision du CGRS : reconnaissance du statut de réfugié, protection subsidiaire, ou refus', color: '#00843D' },
                      { step: 'Pendant la procédure : droit à l\'hébergement (Fedasil), aide médicale urgente (AMU), interdiction de travailler les 4 premiers mois', color: '#FFCC00' },
                      { step: 'En cas de refus : recours au CCE dans les 30 jours — ce recours est suspensif', color: '#BE0000' },
                    ].map(({ step, color }, i) => (
                      <li key={i} className="flex gap-4 items-start">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full text-white text-[10px] font-black flex items-center justify-center" style={{ backgroundColor: color }}>{i + 1}</span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>

            {/* OQT */}
            <div className="bg-guinea-red/5 border-2 border-guinea-red/20 rounded-[2.5rem] p-10 md:p-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-guinea-red text-white rounded-2xl">
                  <AlertTriangle className="h-7 w-7" />
                </div>
                <h3 className="text-3xl font-serif font-black text-guinea-red">Vous avez reçu un OQT ?</h3>
              </div>
              <p className="text-xl font-black text-[#0F0F0F] mb-4">Ne paniquez pas. Un Ordre de Quitter le Territoire n'est pas une expulsion immédiate.</p>
              <p className="text-gray-700 font-medium leading-relaxed mb-8">
                C'est une décision administrative. Vous avez des droits. Un recours suspensif au CCE bloque l'exécution de l'OQT pendant toute la durée de la procédure. Vous disposez de <strong>30 jours</strong> pour agir.
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { label: 'Dans les 72h', text: 'Contactez la CIRÉ, un avocat ou Ballal ASBL', color: '#BE0000' },
                  { label: 'Dans les 30 jours', text: 'Introduire un recours suspensif au Conseil du Contentieux des Étrangers (CCE)', color: '#FFCC00' },
                  { label: 'En procédure', text: 'Si 9bis/9ter/asile en cours : votre recours est déjà suspensif — ne partez pas sans consulter', color: '#00843D' },
                ].map((item, i) => (
                  <div key={i} className="bg-white p-6 rounded-2xl shadow-soft-sm">
                    <div className="text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: item.color }}>{item.label}</div>
                    <p className="text-sm font-medium text-gray-700">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ── TAB 3 : RESSOURCES & FAQ ────────────────────────────────────── */}
        {activeTab === 'ressources' && (
          <div className="space-y-12 animate-in fade-in duration-300">

            {/* Contacts */}
            <div>
              <h2 className="font-serif font-black text-3xl text-[#0F0F0F] mb-8">Contacts essentiels — tous gratuits ou accessibles</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {CONTACTS.map((c, i) => (
                  <div key={i} className="bg-white p-8 rounded-[2rem] shadow-soft-elegant border border-gray-100 flex gap-6 items-start">
                    <div className="w-1 self-stretch rounded-full shrink-0" style={{ backgroundColor: c.color }} />
                    <div className="flex-grow">
                      <h3 className="font-black text-[#0F0F0F] text-lg mb-1">{c.name}</h3>
                      <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-4">{c.role}</p>
                      <div className="space-y-2 text-sm font-medium text-gray-600">
                        <div className="flex items-center gap-2"><MapPin className="h-4 w-4 shrink-0 text-gray-300" />{c.address}</div>
                        <div className="flex items-center gap-2"><Phone className="h-4 w-4 shrink-0 text-gray-300" />{c.phone}</div>
                        <div className="flex items-center gap-2">
                          <ExternalLink className="h-4 w-4 shrink-0 text-gray-300" />
                          <span style={{ color: c.color }} className="font-bold">{c.url}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ballal CTA */}
            <div className="bg-[#0F0F0F] text-white rounded-[2.5rem] p-10 md:p-12 flex flex-col md:flex-row items-center gap-8">
              <div className="flex-grow">
                <div className="flex gap-0.5 mb-6" aria-hidden="true">
                  <span className="h-[3px] w-8 bg-[#BE0000] rounded-full" />
                  <span className="h-[3px] w-8 bg-[#FFCC00] rounded-full" />
                  <span className="h-[3px] w-8 bg-[#00843D] rounded-full" />
                </div>
                <h3 className="text-3xl font-serif font-black mb-4">Ballal vous accompagne</h3>
                <p className="text-white/60 font-medium leading-relaxed max-w-xl">
                  Nous avons traversé ce que vous vivez. Constituer un dossier, comprendre vos droits, vous orienter vers le bon organisme — nous faisons ça depuis 2022, gratuitement, en Français, Peul et Malinké.
                </p>
              </div>
              <a
                href="mailto:admin@ballal.be?subject=Demande d'aide juridique"
                className="shrink-0 bg-guinea-yellow text-[#0F0F0F] px-8 py-4 rounded-2xl font-black uppercase text-[11px] tracking-widest hover:bg-white transition-all shadow-lg flex items-center gap-3"
              >
                <Phone className="h-5 w-5" />
                Nous contacter
              </a>
            </div>

            {/* FAQ */}
            <div>
              <h2 className="font-serif font-black text-3xl text-[#0F0F0F] mb-8">Questions fréquentes</h2>
              <div className="space-y-3">
                {FAQ.map((item, i) => (
                  <div key={i} className="bg-white rounded-[1.5rem] shadow-soft-sm border border-gray-100 overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between p-7 text-left gap-4"
                    >
                      <span className="font-black text-[#0F0F0F] text-base leading-snug">{item.q}</span>
                      {openFaq === i
                        ? <ChevronUp className="h-5 w-5 text-guinea-red shrink-0" />
                        : <ChevronDown className="h-5 w-5 text-gray-400 shrink-0" />
                      }
                    </button>
                    {openFaq === i && (
                      <div className="px-7 pb-7 animate-in fade-in duration-200">
                        <div className="h-px bg-gray-100 mb-6" />
                        <p className="text-gray-700 font-medium leading-relaxed">{item.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default LegalAidSection;
