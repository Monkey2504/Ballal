import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Newspaper, Handshake, Download, Mail, Phone, MapPin,
  Building, FileText, Users, Calendar, Heart, ArrowRight,
  Check, Copy, Shield, Globe,
  ChevronRight, Award, Target
} from 'lucide-react';

const PRESS_CONTACTS = {
  email: 'admin@ballal.be',
  phone: '0493 43 43 83',
  address: 'Place Masui 9 Boîte 3, 1030 Bruxelles',
  bce: '1016.925.333',
};

const KEY_FIGURES = [
  { value: '130', label: 'Personnes accompagnées', sub: 'actuellement en suivi actif', icon: Users, color: 'text-guinea-red' },
  { value: '3 ans', label: "D'existence", sub: 'fondée et active depuis 2022', icon: Calendar, color: 'text-guinea-green' },
  { value: '150+', label: 'Actions menées', sub: 'consultations, hébergements, distributions', icon: Heart, color: 'text-guinea-yellow' },
  { value: '1', label: 'Permanence hebdomadaire', sub: 'accueil sur rendez-vous à Bruxelles', icon: Building, color: 'text-ink' },
];

const MISSIONS = [
  { title: "Logement d'urgence", desc: "Accompagnement et orientation des personnes sans abri, coordination avec les structures d'accueil bruxelloises.", icon: Building, color: 'border-guinea-red' },
  { title: 'Autonomie alimentaire', desc: 'Collecte et redistribution de surplus alimentaires aux occupations solidaires. Zéro frais pour les bénéficiaires.', icon: Heart, color: 'border-guinea-green' },
  { title: 'Aide juridique', desc: 'Information sur les droits (9bis, 9ter), orientation vers les avocats partenaires, soutien aux démarches administratives.', icon: Shield, color: 'border-guinea-yellow' },
  { title: 'Festival des Sans-Papiers', desc: 'Événement annuel de visibilisation et de revendication culturelle, prévu en septembre 2026 à Bruxelles.', icon: Globe, color: 'border-ink' },
];

const PARTNERSHIP_TYPES = [
  { title: 'Partenaires institutionnels', items: ['Communes et CPAS bruxellois', 'Associations juridiques et sociales', "Structures d'hébergement d'urgence"] },
  { title: 'Partenaires opérationnels', items: ['Fournisseurs alimentaires (invendus, surplus)', 'Espaces de réunion et de permanence', 'Bénévoles qualifiés (droit, médical, social)'] },
  { title: 'Partenaires financiers', items: ['Fondations et fonds philanthropiques', 'Entreprises engagées RSE', 'Programmes de subsides publics'] },
];

const PressSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activeTab, setActiveTab] = useState<'press' | 'partners'>('press');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PRESS_CONTACTS.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="min-h-screen bg-ivory pb-24">

      <div className="bg-ink text-ivory py-20 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="max-w-7xl mx-auto px-6 relative z-10 pt-4"
        >
          <div className="flex items-center gap-3 mb-8">
            <span className="flag-line w-8 shrink-0" aria-hidden="true"><span /><span /><span /></span>
            <span className="dateline text-[11px] text-guinea-yellow">
              Espace presse et partenaires
            </span>
          </div>
          <h1 className="font-serif font-black text-5xl md:text-8xl tracking-tight leading-[0.9] mb-8">
            Ballal <span className="text-guinea-red">ASBL</span><br />
            <span className="text-guinea-yellow italic">en chiffres.</span>
          </h1>
          <p className="text-body-lg text-ivory/70 max-w-2xl leading-relaxed">
            Association reconnue, active depuis 2022 à Bruxelles. Logement, alimentation, droits — pour les personnes sans papiers.
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-12 relative z-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {KEY_FIGURES.map((fig, i) => (
            <div key={i} className="bg-white p-8 rounded-[4px] shadow-soft-elegant border border-border-subtle flex flex-col items-center text-center">
              <div className={`p-3 rounded-[4px] bg-paper mb-4 ${fig.color}`}><fig.icon className="h-6 w-6" /></div>
              <div className="font-serif font-black text-4xl text-ink mb-1">{fig.value}</div>
              <div className="text-body-sm font-black text-ink mb-1.5">{fig.label}</div>
              <div className="dateline text-[9px] text-ink-muted normal-case tracking-[0.1em]">{fig.sub}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-16">
        <div className="bg-white border border-border-subtle rounded-[4px] p-10 md:p-14 shadow-soft-elegant mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="dateline text-[11px] text-guinea-red mb-6">Fiche institutionnelle</p>
              <h2 className="font-serif font-black text-4xl text-ink mb-6 tracking-tight">Ballal ASBL</h2>
              <div className="space-y-4 text-body-sm font-medium text-ink-muted">
                <div className="flex items-start gap-3"><Award className="h-4 w-4 text-guinea-red mt-1 flex-shrink-0" /><div><span className="font-black text-ink">Forme juridique : </span>Association Sans But Lucratif (ASBL), droit belge</div></div>
                <div className="flex items-start gap-3"><Building className="h-4 w-4 text-guinea-red mt-1 flex-shrink-0" /><div><span className="font-black text-ink">Numéro BCE : </span>{PRESS_CONTACTS.bce}</div></div>
                <div className="flex items-start gap-3"><MapPin className="h-4 w-4 text-guinea-red mt-1 flex-shrink-0" /><div><span className="font-black text-ink">Siège social : </span>{PRESS_CONTACTS.address}</div></div>
                <div className="flex items-start gap-3"><Calendar className="h-4 w-4 text-guinea-red mt-1 flex-shrink-0" /><div><span className="font-black text-ink">Active depuis : </span>2022 — 3 ans d'opérations continues</div></div>
                <div className="flex items-start gap-3"><Globe className="h-4 w-4 text-guinea-red mt-1 flex-shrink-0" /><div><span className="font-black text-ink">Zone d'action : </span>Région de Bruxelles-Capitale</div></div>
              </div>
            </div>
            <div className="bg-ink text-ivory rounded-[4px] p-10">
              <div className="flex items-center gap-3 mb-8"><Newspaper className="h-6 w-6 text-guinea-yellow" /><span className="dateline text-[11px] text-guinea-yellow">Contact unique</span></div>
              <p className="text-ivory/70 font-medium mb-8 leading-relaxed">Toutes les demandes presse, interviews et demandes de partenariat sont traitées via un point de contact unique.</p>
              <div className="space-y-4">
                <button onClick={handleCopyEmail} className="w-full flex items-center justify-between bg-white/10 hover:bg-white/20 transition-colors p-4 rounded-[4px] group focus:outline-none focus-visible:ring-2 focus-visible:ring-guinea-yellow/50">
                  <div className="flex items-center gap-3"><Mail className="h-5 w-5 text-guinea-yellow" /><span className="font-black">{PRESS_CONTACTS.email}</span></div>
                  {copiedEmail ? <Check className="h-4 w-4 text-guinea-green" /> : <Copy className="h-4 w-4 text-ivory/50 group-hover:text-ivory" />}
                </button>
                <a href={`tel:${PRESS_CONTACTS.phone}`} className="w-full flex items-center gap-3 bg-white/10 hover:bg-white/20 transition-colors p-4 rounded-[4px]">
                  <Phone className="h-5 w-5 text-guinea-yellow" /><span className="font-black">{PRESS_CONTACTS.phone}</span>
                </a>
              </div>
              <p className="dateline text-[9px] text-ivory/40 mt-6">Réponse sous 48h ouvrables</p>
            </div>
          </div>
        </div>

        <div className="flex gap-4 mb-10">
          {(['press', 'partners'] as const).map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-8 py-4 rounded-[3px] font-mono text-xs font-bold uppercase tracking-[0.08em] transition-colors flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-guinea-red/40 focus-visible:ring-offset-2 ${activeTab === tab ? 'bg-ink text-ivory shadow-soft-elegant' : 'bg-white text-ink-muted border border-border-subtle hover:text-ink'}`}
            >
              {tab === 'press' ? <><Newspaper className="h-4 w-4" aria-hidden="true" /> Espace presse</> : <><Handshake className="h-4 w-4" aria-hidden="true" /> Partenariats</>}
            </button>
          ))}
        </div>

        {activeTab === 'press' && (
          <div className="space-y-10 animate-in fade-in duration-300">
            <div>
              <h2 className="font-serif font-black text-3xl text-ink mb-8 tracking-tight">Nos missions</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {MISSIONS.map((m, i) => (
                  <div key={i} className={`bg-white p-8 rounded-[4px] shadow-soft-elegant border-l-4 ${m.color}`}>
                    <div className="flex items-center gap-4 mb-4"><m.icon className="h-6 w-6 text-ink-muted" /><h3 className="font-serif font-black text-xl text-ink">{m.title}</h3></div>
                    <p className="text-ink-muted font-medium leading-relaxed">{m.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-guinea-red text-white rounded-[4px] p-10">
              <div className="flex items-center gap-3 mb-8"><FileText className="h-6 w-6 text-guinea-yellow" /><h2 className="font-serif font-black text-2xl">Éléments de langage</h2></div>
              <div className="space-y-4">
                {['Ballal ASBL accompagne 130 personnes sans papiers à Bruxelles.',"Fondée en 2022, l'association intervient sur le logement d'urgence, l'alimentation et les droits.",'Ballal est une ASBL de droit belge (BCE 1016.925.333), active en Région de Bruxelles-Capitale.',"L'association organise le Festival des Sans-Papiers, événement annuel prévu en septembre 2026."].map((point, i) => (
                  <div key={i} className="flex items-start gap-4"><Check className="h-5 w-5 text-guinea-yellow flex-shrink-0 mt-0.5" /><p className="font-medium leading-relaxed">{point}</p></div>
                ))}
              </div>
            </div>
            <div className="bg-white border border-border-subtle rounded-[4px] p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-soft-elegant">
              <div>
                <h3 className="font-serif font-black text-2xl text-ink mb-2">Kit presse</h3>
                <p className="text-ink-muted font-medium">Logo haute résolution, photos libres de droits, fiche de présentation PDF. Disponible sur demande.</p>
              </div>
              <a href="mailto:admin@ballal.be?subject=Demande kit presse Ballal ASBL" className="flex-shrink-0 bg-ink text-ivory px-8 py-4 rounded-[3px] font-mono text-[12px] font-bold uppercase tracking-[0.08em] hover:bg-guinea-red transition-colors flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-guinea-red/50 focus-visible:ring-offset-2">
                <Download className="h-4 w-4" />Demander le kit
              </a>
            </div>
          </div>
        )}

        {activeTab === 'partners' && (
          <div className="space-y-10 animate-in fade-in duration-300">
            <div className="grid md:grid-cols-3 gap-6">
              {PARTNERSHIP_TYPES.map((type, i) => (
                <div key={i} className="bg-white p-8 rounded-[4px] shadow-soft-elegant border border-border-subtle">
                  <h3 className="font-serif font-black text-lg text-ink mb-6 pb-4 border-b border-border-subtle">{type.title}</h3>
                  <ul className="space-y-3">
                    {type.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-3 text-body-sm font-medium text-ink-muted">
                        <ChevronRight className="h-4 w-4 text-guinea-green flex-shrink-0 mt-0.5" />{item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="bg-ink text-ivory rounded-[4px] p-10">
              <div className="flex items-center gap-3 mb-8"><Target className="h-6 w-6 text-guinea-yellow" /><h2 className="font-serif font-black text-2xl">Ce que Ballal peut apporter</h2></div>
              <div className="grid md:grid-cols-2 gap-6">
                {[{titre:'Ancrage territorial',desc:'Présence directe à Molenbeek et réseau de confiance avec les communautés.'},{titre:'Légitimité opérationnelle',desc:"3 ans d'actions concrètes, 130 personnes suivies, ASBL enregistrée."},{titre:'Réseau de terrain',desc:'Liens avec les squats, occupations solidaires et associations partenaires bruxelloises.'},{titre:'Visibilité militante',desc:'Festival, présence médiatique en construction — audience engagée.'}].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <Check className="h-5 w-5 text-guinea-green flex-shrink-0 mt-0.5" />
                    <div><div className="font-black text-ivory mb-1">{item.titre}</div><div className="text-body-sm text-ivory/60 font-medium">{item.desc}</div></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white border-l-4 border-guinea-green rounded-[4px] p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-soft-elegant">
              <div>
                <h3 className="font-serif font-black text-2xl text-ink mb-2">Proposer un partenariat</h3>
                <p className="text-ink-muted font-medium max-w-lg">Décrivez votre organisation et votre idée de collaboration. Nous revenons vers vous sous 48h ouvrables.</p>
              </div>
              <a href="mailto:admin@ballal.be?subject=Proposition de partenariat" className="flex-shrink-0 bg-guinea-green text-white px-8 py-4 rounded-[3px] font-mono text-[12px] font-bold uppercase tracking-[0.08em] hover:bg-guinea-red transition-colors flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-guinea-green/50 focus-visible:ring-offset-2">
                <Handshake className="h-4 w-4" />Nous écrire<ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PressSection;
