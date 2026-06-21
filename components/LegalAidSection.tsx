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
    role: 'Demande d\'asile et réfugiés',
    address: 'Rue Ernest Blerot 39, 1070 Anderlecht',
    phone: '02 205 51 11',
    url: 'cgvs.be',
    color: '#00843D',
  },
  {
    name: 'CIRÉ',
    role: 'Aide juridique et permanences gratuites',
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
    color: '#141210',
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
    <div className="min-h-screen bg-ivory pb-24">

      {/* FLASH MODE */}
      {isFlashMode && (
        <div className="fixed inset-0 z-[200] bg-guinea-red text-white flex flex-col items-center justify-center p-8 animate-in fade-in duration-300">
          <button onClick={() => setIsFlashMode(false)} className="absolute top-8 right-8 text-white hover:scale-110 transition-transform p-2 bg-black/10 rounded-[3px]" aria-label="Fermer">
            <X className="h-10 w-10" />
          </button>
          <ShieldAlert className="h-24 w-24 mb-8 text-guinea-yellow" aria-hidden="true" />
          <h2 className="font-serif font-black text-5xl md:text-8xl uppercase text-center mb-10 tracking-tighter leading-none">NE PAS OUVRIR</h2>
          <div className="bg-white text-ink p-8 md:p-12 max-w-3xl w-full rounded-[4px] shadow-soft-xl relative">
            <p className="font-mono text-2xl md:text-4xl font-bold uppercase leading-tight text-center">
              "{script}"
            </p>
            <button
              onClick={handleCopy}
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-ink text-ivory px-8 py-4 rounded-[3px] shadow-soft-lg flex items-center gap-3 hover:bg-guinea-green transition-colors font-mono font-bold text-xs uppercase tracking-[0.08em]"
            >
              {copied ? <CheckCircle className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
              <span>{copied ? 'Copié' : 'Copier le script'}</span>
            </button>
          </div>
        </div>
      )}

      {/* HERO */}
      <div className="bg-ink text-ivory py-20 relative overflow-hidden">
        <div className="flag-line absolute top-0 left-0 right-0" aria-hidden="true"><span /><span /><span /></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 pt-4">
          <p className="dateline text-[11px] text-guinea-yellow mb-8">
            Guide de protection juridique
          </p>
          <h1 className="text-6xl md:text-8xl font-serif font-black tracking-tighter leading-[0.9] mb-8">
            Tes <span className="text-guinea-red">droits</span>,<br />tes <span className="text-guinea-green">armes</span>
          </h1>
          <p className="text-body-lg md:text-xl font-medium italic max-w-2xl leading-relaxed text-ivory/50">
            "{t.legal_intro}"
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-16 relative z-20">

        {/* SOS BUTTON */}
        <button
          onClick={() => setIsFlashMode(true)}
          className="w-full bg-guinea-red text-white p-10 rounded-[4px] shadow-soft-lg hover:bg-guinea-red-dark hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-8 group mb-12"
        >
          <Zap className="h-8 w-8 text-guinea-yellow group-hover:scale-110 transition-transform" aria-hidden="true" />
          <span className="font-serif font-black text-3xl md:text-5xl uppercase tracking-tighter">Mode urgence police</span>
          <Zap className="h-8 w-8 text-guinea-yellow group-hover:scale-110 transition-transform" aria-hidden="true" />
        </button>

        {/* TAB NAVIGATION */}
        <nav className="flex rounded-[4px] bg-white border border-border-subtle shadow-soft-elegant overflow-hidden mb-12">
          {([
            { id: 'urgence',       label: 'Droits fondamentaux', icon: Shield },
            { id: 'regularisation', label: 'Régularisation',     icon: Scale },
            { id: 'ressources',    label: 'Ressources et FAQ',   icon: BookOpen },
          ] as { id: TabType; label: string; icon: any }[]).map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex-1 flex items-center justify-center gap-2 py-4 px-3 font-mono font-bold text-[11px] uppercase tracking-[0.08em] transition-all duration-200 ${
                activeTab === id
                  ? 'bg-ink text-ivory'
                  : 'text-ink-muted hover:bg-paper'
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </nav>

        {/* ── TAB 1 : DROITS FONDAMENTAUX ─────────────────────────────────── */}
        {activeTab === 'urgence' && (
          <div className="grid md:grid-cols-2 gap-8 animate-in fade-in duration-300">

            {/* Éducation */}
            <div className="bg-white p-10 rounded-[4px] shadow-soft-elegant border border-border-subtle hover:border-guinea-green/30 transition-colors group">
              <div className="flex items-center gap-5 mb-8">
                <div className="p-4 bg-guinea-green/10 text-guinea-green rounded-[4px]">
                  <GraduationCap className="h-8 w-8" aria-hidden="true" />
                </div>
                <h3 className="text-3xl font-serif font-black text-ink">{t.legal_school_title}</h3>
              </div>
              <p className="text-body-lg font-medium text-ink-muted mb-8 italic">"{t.legal_school_subtitle}"</p>
              <ul className="space-y-4">
                <li className="flex items-start gap-4 text-ink-muted font-medium">
                  <CheckCircle className="h-5 w-5 text-guinea-green shrink-0 mt-1" aria-hidden="true" />
                  {t.legal_school_point1}
                </li>
                <li className="flex items-start gap-4 text-ink-muted font-medium">
                  <CheckCircle className="h-5 w-5 text-guinea-green shrink-0 mt-1" aria-hidden="true" />
                  {t.legal_school_point2}
                </li>
              </ul>
            </div>

            {/* Habitat */}
            <div className="bg-white p-10 rounded-[4px] shadow-soft-elegant border border-border-subtle hover:border-guinea-red/30 transition-colors group">
              <div className="flex items-center gap-5 mb-8">
                <div className="p-4 bg-guinea-red/10 text-guinea-red rounded-[4px]">
                  <Home className="h-8 w-8" aria-hidden="true" />
                </div>
                <h3 className="text-3xl font-serif font-black text-ink">{t.legal_home_title}</h3>
              </div>
              <div className="bg-guinea-red text-white p-6 rounded-[4px] font-bold uppercase text-sm mb-6 shadow-soft-sm flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" aria-hidden="true" />
                {t.legal_home_warrant}
              </div>
              <p className="text-ink-muted font-medium mb-10 leading-relaxed">{t.legal_home_police}</p>
              <button
                onClick={() => setIsFlashMode(true)}
                className="w-full bg-ink text-ivory py-5 rounded-[3px] font-mono font-bold uppercase text-xs tracking-[0.08em] hover:bg-guinea-red transition-colors shadow-soft-sm flex items-center justify-center gap-3"
              >
                <Zap className="h-5 w-5 text-guinea-yellow" aria-hidden="true" />
                Script d'urgence
              </button>
            </div>
          </div>
        )}

        {/* ── TAB 2 : RÉGULARISATION ──────────────────────────────────────── */}
        {activeTab === 'regularisation' && (
          <div className="space-y-8 animate-in fade-in duration-300">

            {/* 9bis */}
            <div className="bg-white rounded-[4px] shadow-soft-elegant border border-border-subtle overflow-hidden">
              <div className="p-10 md:p-12">
                <div className="flex flex-wrap items-center gap-4 mb-8">
                  <h3 className="text-4xl font-serif font-black text-guinea-green">Article 9<em>bis</em></h3>
                  <span className="dateline bg-guinea-green/10 text-guinea-green text-[10px] px-3 py-1 rounded-[3px]">Humanitaire</span>
                  <span className="dateline ml-auto flex items-center gap-2 text-[10px] text-ink-muted">
                    <Clock className="h-4 w-4" aria-hidden="true" /> 6 mois – 2 ans
                  </span>
                </div>
                <p className="text-ink-muted font-medium leading-relaxed text-body-lg mb-10">
                  La voie humanitaire repose sur votre ancrage en Belgique. Il n'existe <strong>aucune durée minimale légale</strong> — mais 3 à 5 ans de séjour documenté et d'intégration sociale renforcent considérablement le dossier.
                </p>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-paper p-8 rounded-[4px] border border-border-subtle">
                    <h4 className="dateline text-[11px] text-ink-muted mb-6 flex items-center gap-2">
                      <ListChecks className="h-4 w-4 text-guinea-green" aria-hidden="true" /> Ce que vous devez prouver
                    </h4>
                    <ul className="space-y-4 text-sm font-medium text-ink-muted">
                      {[
                        'Durée et continuité du séjour (contrats de bail, factures, courriers)',
                        'Scolarisation des enfants (bulletins, attestations d\'inscription)',
                        'Intégration sociale : associations, bénévolat, cours de français',
                        'Liens familiaux avec Belges ou résidents légaux',
                        'Risque réel de persécution ou de violation des droits en cas de retour',
                        'Absence d\'antécédents pénaux graves',
                      ].map((item, i) => (
                        <li key={i} className="flex gap-3 items-start">
                          <div className="h-2 w-2 rounded-full bg-guinea-green mt-2 shrink-0" aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-paper p-8 rounded-[4px] border border-border-subtle">
                    <h4 className="dateline text-[11px] text-ink-muted mb-6 flex items-center gap-2">
                      <FileText className="h-4 w-4 text-guinea-green" aria-hidden="true" /> Documents à rassembler
                    </h4>
                    <ul className="space-y-4 text-sm font-medium text-ink-muted">
                      {[
                        'Formulaire de demande (téléchargeable sur dofi.ibz.be)',
                        'Passeport ou document d\'identité (même expiré)',
                        'Preuves de résidence sur 5 ans (baux, factures, courriers officiels)',
                        'Attestations d\'associations, de bénévolat, d\'intégration',
                        'Bulletins scolaires et attestations des enfants',
                        'Lettre de motivation personnelle détaillant votre situation',
                      ].map((item, i) => (
                        <li key={i} className="flex gap-3 items-start">
                          <div className="h-2 w-2 rounded-full bg-guinea-green mt-2 shrink-0" aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 bg-ink text-ivory p-8 rounded-[4px]">
                  <h4 className="dateline text-[11px] text-guinea-yellow mb-4">Procédure — 4 étapes</h4>
                  <ol className="space-y-3 text-sm font-medium text-ivory/80">
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
            <div className="bg-white rounded-[4px] shadow-soft-elegant border border-border-subtle overflow-hidden">
              <div className="p-10 md:p-12">
                <div className="flex flex-wrap items-center gap-4 mb-8">
                  <h3 className="text-4xl font-serif font-black text-guinea-red">Article 9<em>ter</em></h3>
                  <span className="dateline bg-guinea-red/10 text-guinea-red text-[10px] px-3 py-1 rounded-[3px]">Médical</span>
                  <span className="dateline ml-auto flex items-center gap-2 text-[10px] text-ink-muted">
                    <Clock className="h-4 w-4" aria-hidden="true" /> 4 mois minimum
                  </span>
                </div>
                <p className="text-ink-muted font-medium leading-relaxed text-body-lg mb-10">
                  Réservé aux personnes atteintes d'une <strong>pathologie grave</strong> dont le traitement adéquat est <strong>inaccessible en Guinée</strong> — inexistant, indisponible ou financièrement hors d'atteinte.
                </p>

                <div className="bg-guinea-red/8 border border-guinea-red/20 rounded-[4px] p-6 mb-8 flex gap-4 items-start">
                  <AlertTriangle className="h-5 w-5 text-guinea-red shrink-0 mt-0.5" aria-hidden="true" />
                  <p className="text-sm font-bold text-guinea-red leading-relaxed">
                    Un simple certificat de maladie ne suffit pas. Le rapport médical doit explicitement argumenter l'inaccessibilité du traitement en Guinée. Demandez à votre médecin d'inclure cette mention.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-paper p-8 rounded-[4px] border border-border-subtle">
                    <h4 className="dateline text-[11px] text-ink-muted mb-6 flex items-center gap-2">
                      <ListChecks className="h-4 w-4 text-guinea-red" aria-hidden="true" /> Critères obligatoires
                    </h4>
                    <ul className="space-y-4 text-sm font-medium text-ink-muted">
                      {[
                        'Maladie grave (pronostic vital ou risque sérieux d\'aggravation)',
                        'Traitement requis inexistant ou inaccessible en Guinée',
                        'Suivi médical actuel et documenté en Belgique',
                      ].map((item, i) => (
                        <li key={i} className="flex gap-3 items-start">
                          <div className="h-2 w-2 rounded-full bg-guinea-red mt-2 shrink-0" aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-paper p-8 rounded-[4px] border border-border-subtle">
                    <h4 className="dateline text-[11px] text-ink-muted mb-6 flex items-center gap-2">
                      <FileText className="h-4 w-4 text-guinea-red" aria-hidden="true" /> Documents clés
                    </h4>
                    <ul className="space-y-4 text-sm font-medium text-ink-muted">
                      {[
                        'Rapport médical détaillé : diagnostic, traitement requis, pronostic sans traitement, mention d\'inaccessibilité en Guinée',
                        'Preuve de prise en charge médicale actuelle en Belgique',
                        'Certificat de non-voyageabilité si applicable',
                        'Rapport OMS ou MSF sur le système de santé guinéen pour cette pathologie (optionnel mais renforçant)',
                      ].map((item, i) => (
                        <li key={i} className="flex gap-3 items-start">
                          <div className="h-2 w-2 rounded-full bg-guinea-red mt-2 shrink-0" aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Asile */}
            <div className="bg-white rounded-[4px] shadow-soft-elegant border border-border-subtle overflow-hidden">
              <div className="p-10 md:p-12">
                <div className="flex flex-wrap items-center gap-4 mb-8">
                  <h3 className="text-4xl font-serif font-black text-[#4B3D8F]">Demande d'asile</h3>
                  <span className="dateline bg-[#4B3D8F]/10 text-[#4B3D8F] text-[10px] px-3 py-1 rounded-[3px]">Convention de Genève</span>
                </div>

                <div className="bg-[#4B3D8F]/8 border border-[#4B3D8F]/20 rounded-[4px] p-6 mb-8 flex gap-4 items-start">
                  <AlertTriangle className="h-5 w-5 text-[#4B3D8F] shrink-0 mt-0.5" aria-hidden="true" />
                  <p className="text-sm font-bold text-[#4B3D8F] leading-relaxed">
                    Déposez dès que possible. Une demande tardive après plusieurs années en Belgique peut affaiblir la crédibilité de la crainte alléguée aux yeux du CGRS.
                  </p>
                </div>

                <p className="text-ink-muted font-medium leading-relaxed text-body-lg mb-10">
                  L'asile s'adresse aux personnes qui craignent d'être persécutées dans leur pays pour des raisons de <strong>race, religion, nationalité, appartenance à un groupe social ou opinion politique</strong>. La protection subsidiaire couvre les risques d'atteinte grave à l'intégrité physique.
                </p>

                <div className="bg-ink text-ivory p-8 rounded-[4px] mb-8">
                  <h4 className="dateline text-[11px] text-guinea-yellow mb-6">Procédure — 5 étapes</h4>
                  <ol className="space-y-4 text-sm font-medium text-ivory/80">
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
            <div className="bg-guinea-red/5 border-2 border-guinea-red/20 rounded-[4px] p-10 md:p-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-guinea-red text-white rounded-[4px]">
                  <AlertTriangle className="h-7 w-7" aria-hidden="true" />
                </div>
                <h3 className="text-3xl font-serif font-black text-guinea-red">Vous avez reçu un OQT ?</h3>
              </div>
              <p className="font-serif font-black text-xl text-ink mb-4">Ne paniquez pas. Un Ordre de Quitter le Territoire n'est pas une expulsion immédiate.</p>
              <p className="text-ink-muted font-medium leading-relaxed mb-8">
                C'est une décision administrative. Vous avez des droits. Un recours suspensif au CCE bloque l'exécution de l'OQT pendant toute la durée de la procédure. Vous disposez de <strong>30 jours</strong> pour agir.
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { label: 'Dans les 72h', text: 'Contactez la CIRÉ, un avocat ou Ballal ASBL', color: '#BE0000' },
                  { label: 'Dans les 30 jours', text: 'Introduire un recours suspensif au Conseil du Contentieux des Étrangers (CCE)', color: '#FFCC00' },
                  { label: 'En procédure', text: 'Si 9bis/9ter/asile en cours : votre recours est déjà suspensif — ne partez pas sans consulter', color: '#00843D' },
                ].map((item, i) => (
                  <div key={i} className="bg-white p-6 rounded-[4px] shadow-soft-sm border border-border-subtle">
                    <div className="dateline text-[10px] mb-2" style={{ color: item.color }}>{item.label}</div>
                    <p className="text-sm font-medium text-ink-muted">{item.text}</p>
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
              <h2 className="font-serif font-black text-3xl text-ink mb-8">Contacts essentiels — tous gratuits ou accessibles</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {CONTACTS.map((c, i) => (
                  <div key={i} className="bg-white p-8 rounded-[4px] shadow-soft-elegant border border-border-subtle flex gap-6 items-start">
                    <div className="w-1 self-stretch rounded-full shrink-0" style={{ backgroundColor: c.color }} aria-hidden="true" />
                    <div className="flex-grow">
                      <h3 className="font-serif font-black text-ink text-lg mb-1">{c.name}</h3>
                      <p className="dateline text-[11px] text-ink-muted mb-4">{c.role}</p>
                      <div className="space-y-2 text-sm font-medium text-ink-muted">
                        <div className="flex items-center gap-2"><MapPin className="h-4 w-4 shrink-0 text-ink-muted/50" aria-hidden="true" />{c.address}</div>
                        <div className="flex items-center gap-2"><Phone className="h-4 w-4 shrink-0 text-ink-muted/50" aria-hidden="true" />{c.phone}</div>
                        <div className="flex items-center gap-2">
                          <ExternalLink className="h-4 w-4 shrink-0 text-ink-muted/50" aria-hidden="true" />
                          <span style={{ color: c.color }} className="font-bold">{c.url}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ballal CTA */}
            <div className="bg-ink text-ivory rounded-[4px] p-10 md:p-12 flex flex-col md:flex-row items-center gap-8">
              <div className="flex-grow">
                <span className="flag-line w-24 mb-6" aria-hidden="true"><span /><span /><span /></span>
                <h3 className="text-3xl font-serif font-black mb-4">Ballal vous accompagne</h3>
                <p className="text-ivory/60 font-medium leading-relaxed max-w-xl">
                  Nous avons traversé ce que vous vivez. Constituer un dossier, comprendre vos droits, vous orienter vers le bon organisme — nous faisons ça depuis 2022, gratuitement, en français, peul et malinké.
                </p>
              </div>
              <a
                href="mailto:admin@ballal.be?subject=Demande d'aide juridique"
                className="shrink-0 bg-guinea-yellow text-ink px-8 py-4 rounded-[3px] font-mono font-bold uppercase text-[11px] tracking-[0.08em] hover:bg-white transition-colors shadow-soft-lg flex items-center gap-3"
              >
                <Phone className="h-5 w-5" aria-hidden="true" />
                Nous contacter
              </a>
            </div>

            {/* FAQ */}
            <div>
              <h2 className="font-serif font-black text-3xl text-ink mb-8">Questions fréquentes</h2>
              <div className="space-y-3">
                {FAQ.map((item, i) => (
                  <div key={i} className="bg-white rounded-[4px] shadow-soft-sm border border-border-subtle overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between p-7 text-left gap-4"
                      aria-expanded={openFaq === i}
                    >
                      <span className="font-serif font-black text-ink text-base leading-snug">{item.q}</span>
                      {openFaq === i
                        ? <ChevronUp className="h-5 w-5 text-guinea-red shrink-0" aria-hidden="true" />
                        : <ChevronDown className="h-5 w-5 text-ink-muted shrink-0" aria-hidden="true" />
                      }
                    </button>
                    {openFaq === i && (
                      <div className="px-7 pb-7 animate-in fade-in duration-200">
                        <div className="h-px bg-border-subtle mb-6" />
                        <p className="text-ink-muted font-medium leading-relaxed">{item.a}</p>
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
