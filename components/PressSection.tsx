import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Newspaper, Handshake, Download, Mail, Phone, MapPin,
  Building, FileText, Users, Calendar, Heart, ArrowRight,
  CheckCircle, Copy, Check, Shield, Globe,
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
  { value: '1', label: 'Permanence hebdomadaire', sub: 'accueil sur rendez-vous à Bruxelles', icon: Building, color: 'text-[#0F0F0F]' },
];

const MISSIONS = [
  {
    title: 'Logement d\'urgence',
    desc: 'Accompagnement et orientation des personnes sans abri, coordination avec les structures d\'accueil bruxelloises.',
    icon: Building,
    color: 'border-guinea-red',
  },
  {
    title: 'Autonomie alimentaire',
    desc: 'Collecte et redistribution de surplus alimentaires aux occupations solidaires. Zéro frais pour les bénéficiaires.',
    icon: Heart,
    color: 'border-guinea-green',
  },
  {
    title: 'Aide juridique',
    desc: 'Information sur les droits (9bis, 9ter), orientation vers les avocats partenaires, soutien aux démarches administratives.',
    icon: Shield,
    color: 'border-guinea-yellow',
  },
  {
    title: 'Festival des Sans-Papiers',
    desc: 'Événement annuel de visibilisation et de revendication culturelle, prévu en septembre 2026 à Bruxelles.',
    icon: Globe,
    color: 'border-[#0F0F0F]',
  },
];

const PARTNERSHIP_TYPES = [
  {
    title: 'Partenaires institutionnels',
    items: ['Communes et CPAS bruxellois', 'Associations juridiques et sociales', 'Structures d\'hébergement d\'urgence'],
  },
  {
    title: 'Partenaires opérationnels',
    items: ['Fournisseurs alimentaires (invendus, surplus)', 'Espaces de réunion et de permanence', 'Bénévoles qualifiés (droit, médical, social)'],
  },
  {
    title: 'Partenaires financiers',
    items: ['Fondations et fonds philanthropiques', 'Entreprises engagées RSE', 'Programmes de subsides publics'],
  },
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
    <div className="min-h-screen bg-[#FAFAF8] pb-24">

      <div className="bg-[#0F0F0F] text-white py-20 relative overflow-hidden">
        <div className="flag-line absolute top-0 left-0 right-0" aria-hidden="true"><span /><span /><span /></div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 pt-4"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="h-1 w-12 bg-[#BE0000]" aria-hidden="true" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#FFCC00]">
              Espace presse et partenaires
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-8xl font-serif font-black tracking-tighter leading-[0.9] mb-6 sm:mb-8">
            Ballal <span className="text-[#BE0000]">ASBL</span><br />
            <span className="text-[#FFCC00] italic">en chiffres.</span>
          </h1>
          <p className="text-base sm:text-xl md:text-2xl font-medium text-white/60 max-w-2xl leading-relaxed">
            Association reconnue, active depuis 2022 à Bruxelles. Logement, alimentation, droits — pour les personnes sans papiers.
          </p>
        </motion.div>
        <div className="flag-line absolute bottom-0 left-0 right-0" aria-hidden="true"><span /><span /><span /></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-12 relative z-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {KEY_FIGURES.map((fig, i) => (
            <div key={i} className="bg-white p-8 rounded-[2.5rem] shadow-soft-elegant border border-gray-100 flex flex-col items-center text-center">
              <div className={`p-3 rounded-2xl bg-gray-50 mb-4 ${fig.color}`}>
                <fig.icon className="h-6 w-6" />
              </div>
              <div className="text-4xl font-serif font-black text-[#0F0F0F] mb-1">{fig.value}</div>
              <div className="text-sm font-black text-gray-700 mb-1">{fig.label}</div>
              <div className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">{fig.sub}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-16">

        <div className="bg-white border border-gray-100 rounded-[3rem] p-10 md:p-14 shadow-soft-elegant mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="inline-block bg-guinea-yellow/20 text-[#0F0F0F] px-4 py-1 rounded-full font-black text-[10px] uppercase tracking-widest mb-6 border border-guinea-yellow/30">
                Fiche institutionnelle
              </div>
              <h2 className="text-4xl font-serif font-black text-[#0F0F0F] mb-6">Ballal ASBL</h2>
              <div className="space-y-4 text-sm font-medium text-gray-700">
                <div className="flex items-start gap-3">
                  <Award className="h-4 w-4 text-guinea-red mt-1 flex-shrink-0" />
                  <div><span className="font-black text-[#0F0F0F]">Forme juridique : </span>Association Sans But Lucratif (ASBL), droit belge</div>
                </div>
                <div className="flex items-start gap-3">
                  <Building className="h-4 w-4 text-guinea-red mt-1 flex-shrink-0" />
                  <div><span className="font-black text-[#0F0F0F]">Numéro BCE : </span>{PRESS_CONTACTS.bce}</div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-guinea-red mt-1 flex-shrink-0" />
                  <div><span className="font-black text-[#0F0F0F]">Siège social : </span>{PRESS_CONTACTS.address}</div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="h-4 w-4 text-guinea-red mt-1 flex-shrink-0" />
                  <div><span className="font-black text-[#0F0F0F]">Active depuis : </span>2022 — 3 ans d'opérations continues</div>
                </div>
                <div className="flex items-start gap-3">
                  <Globe className="h-4 w-4 text-guinea-red mt-1 flex-shrink-0" />
                  <div><span className="font-black text-[#0F0F0F]">Zone d'action : </span>Région de Bruxelles-Capitale</div>
                </div>
              </div>
            </div>

            <div className="bg-[#0F0F0F] text-white rounded-[2rem] p-10">
              <div className="flex items-center gap-3 mb-8">
                <Newspaper className="h-6 w-6 text-guinea-yellow" />
                <span className="font-black text-[10px] uppercase tracking-widest text-guinea-yellow">Contact unique</span>
              </div>
              <p className="text-gray-300 font-medium mb-8 leading-relaxed">
                Toutes les demandes presse, interviews et demandes de partenariat sont traitées via un point de contact unique.
              </p>
              <div className="space-y-4">
                <button
                  onClick={handleCopyEmail}
                  className="w-full flex items-center justify-between bg-white/10 hover:bg-white/20 transition-all p-4 rounded-2xl group"
                >
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-guinea-yellow" />
                    <span className="font-black">{PRESS_CONTACTS.email}</span>
                  </div>
                  {copiedEmail ? <Check className="h-4 w-4 text-guinea-green" /> : <Copy className="h-4 w-4 text-gray-400 group-hover:text-white" />}
                </button>
                <a href={`tel:${PRESS_CONTACTS.phone}`} className="w-full flex items-center gap-3 bg-white/10 hover:bg-white/20 transition-all p-4 rounded-2xl">
                  <Phone className="h-5 w-5 text-guinea-yellow" />
                  <span className="font-black">{PRESS_CONTACTS.phone}</span>
                </a>
              </div>
              <p className="text-[10px] text-gray-500 mt-6 uppercase tracking-wider">Réponse sous 48h ouvrables</p>
            </div>
          </div>
        </div>

        <div className="flex gap-4 mb-10">
          {(['press', 'partners'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-[#0F0F0F] text-white shadow-soft-elegant' : 'bg-white text-gray-400 border border-gray-200 hover:text-[#0F0F0F]'}`}
            >
              {tab === 'press' ? '📰 Espace Presse' : '🤝 Partenariats'}
            </button>
          ))}
        </div>

        {activeTab === 'press' && (
          <div className="space-y-10 animate-in fade-in duration-300">
            <div>
              <h2 className="text-3xl font-serif font-black text-[#0F0F0F] mb-8">Nos missions</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {MISSIONS.map((m, i) => (
                  <div key={i} className={`bg-white p-8 rounded-[2rem] shadow-soft-elegant border-l-8 ${m.color}`}>
                    <div className="flex items-center gap-4 mb-4">
                      <m.icon className="h-6 w-6 text-gray-400" />
                      <h3 className="text-xl font-black text-[#0F0F0F]">{m.title}</h3>
                    </div>
                    <p className="text-gray-600 font-medium leading-relaxed">{m.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-guinea-red text-white rounded-[2rem] p-10">
              <div className="flex items-center gap-3 mb-8">
                <FileText className="h-6 w-6 text-guinea-yellow" />
                <h2 className="text-2xl font-serif font-black">Éléments de langage</h2>
              </div>
              <div className="space-y-4">
                {[
                  'Ballal ASBL accompagne 130 personnes sans papiers à Bruxelles.',
                  'Fondée en 2022, l\'association intervient sur le logement d\'urgence, l\'alimentation et les droits.',
                  'Ballal est une ASBL de droit belge (BCE 1016.925.333), active en Région de Bruxelles-Capitale.',
                  'L\'association organise le Festival des Sans-Papiers, événement annuel prévu en septembre 2026.',
                ].map((point, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <CheckCircle className="h-5 w-5 text-guinea-yellow flex-shrink-0 mt-0.5" />
                    <p className="font-medium leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-[2rem] p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-soft-elegant">
              <div>
                <h3 className="text-2xl font-serif font-black text-[#0F0F0F] mb-2">Kit presse</h3>
                <p className="text-gray-600 font-medium">Logo haute résolution, photos libres de droits, fiche de présentation PDF. Disponible sur demande.</p>
              </div>
              <a href="mailto:admin@ballal.be?subject=Demande kit presse Ballal ASBL" className="flex-shrink-0 bg-[#0F0F0F] text-white px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-guinea-red transition-all flex items-center gap-3 shadow-soft-elegant">
                <Download className="h-4 w-4" />
                Demander le kit
              </a>
            </div>
          </div>
        )}

        {activeTab === 'partners' && (
          <div className="space-y-10 animate-in fade-in duration-300">
            <div className="grid md:grid-cols-3 gap-6">
              {PARTNERSHIP_TYPES.map((type, i) => (
                <div key={i} className="bg-white p-8 rounded-[2rem] shadow-soft-elegant border border-gray-100">
                  <h3 className="text-lg font-black text-[#0F0F0F] mb-6 pb-4 border-b border-gray-100">{type.title}</h3>
                  <ul className="space-y-3">
                    {type.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm font-medium text-gray-700">
                        <ChevronRight className="h-4 w-4 text-guinea-green flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="bg-[#0F0F0F] text-white rounded-[2rem] p-10">
              <div className="flex items-center gap-3 mb-8">
                <Target className="h-6 w-6 text-guinea-yellow" />
                <h2 className="text-2xl font-serif font-black">Ce que Ballal peut apporter</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { titre: 'Ancrage territorial', desc: 'Présence directe à Molenbeek et réseau de confiance avec les communautés.' },
                  { titre: 'Légitimité opérationnelle', desc: '3 ans d\'actions concrètes, 130 personnes suivies, ASBL enregistrée.' },
                  { titre: 'Réseau de terrain', desc: 'Liens avec les squats, occupations solidaires et associations partenaires bruxelloises.' },
                  { titre: 'Visibilité militante', desc: 'Festival, présence médiatique en construction — audience engagée.' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <CheckCircle className="h-5 w-5 text-guinea-green flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-black text-white mb-1">{item.titre}</div>
                      <div className="text-sm text-gray-400 font-medium">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border-4 border-guinea-green rounded-[2rem] p-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-serif font-black text-[#0F0F0F] mb-2">Proposer un partenariat</h3>
                <p className="text-gray-600 font-medium max-w-lg">Décrivez votre organisation et votre idée de collaboration. Nous revenons vers vous sous 48h ouvrables.</p>
              </div>
              <a href="mailto:admin@ballal.be?subject=Proposition de partenariat" className="flex-shrink-0 bg-guinea-green text-white px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-guinea-red transition-all flex items-center gap-3 shadow-md">
                <Handshake className="h-4 w-4" />
                Nous écrire
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PressSection;
