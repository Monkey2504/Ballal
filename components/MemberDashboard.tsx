import React from 'react';
import { useAuth } from '../contexts/AuthContext.tsx';
import {
  Scale, Utensils, Home, Star, Users, Heart,
  ArrowRight, LogOut
} from 'lucide-react';
import { ViewState } from '../types.ts';

interface MemberDashboardProps {
  navigate: (v: ViewState) => void;
}

const teamMembers = [
  {
    name: "Thierno I. T. Diallo",
    role: "Président fondateur",
    image: "https://i.imgur.com/T2LT1pB.png",
    color: "border-guinea-red",
  },
  {
    name: "Bah Ibrahim",
    role: "Responsable des opérations",
    image: "https://i.imgur.com/l3UdDov.png",
    color: "border-guinea-yellow",
  },
  {
    name: "Kadiatou Sow",
    role: "Secrétaire",
    image: "https://i.imgur.com/THTzMBW.png",
    color: "border-guinea-green",
  },
  {
    name: "Cissé Abdoulaye",
    role: "Trésorier",
    image: "https://i.imgur.com/7FduSwY.png",
    color: "border-earth-black",
  },
  {
    name: "François Halleux",
    role: "Conseiller stratégique",
    image: "https://i.imgur.com/1qqkroP.png",
    color: "border-blue-500",
  },
];

const missions = [
  {
    icon: <Scale className="h-6 w-6" />,
    title: "Aide juridique",
    desc: "Accompagnement des sans-papiers dans leurs démarches administratives et juridiques : régularisation, recours, droits fondamentaux.",
    color: "bg-guinea-red/10 text-guinea-red",
  },
  {
    icon: <Utensils className="h-6 w-6" />,
    title: "Autonomie alimentaire",
    desc: "Organisation de distributions alimentaires et création de réseaux de solidarité pour garantir l'accès à une alimentation digne.",
    color: "bg-guinea-green/10 text-guinea-green",
  },
  {
    icon: <Home className="h-6 w-6" />,
    title: "Logement & Occupation",
    desc: "Aide à la recherche de logement, guide pratique d'occupation temporaire et négociation avec les propriétaires et institutions.",
    color: "bg-earth-black/10 text-earth-black",
  },
  {
    icon: <Heart className="h-6 w-6" />,
    title: "Culture & Identité",
    desc: "Préservation du patrimoine guinéen à Bruxelles, organisation d'événements culturels et transmission aux nouvelles générations.",
    color: "bg-purple-100 text-purple-700",
  },
  {
    icon: <Star className="h-6 w-6" />,
    title: "Campagne Fondateurs",
    desc: "Lever 40 000 € avec 200 fondateurs pour acquérir un espace propre au collectif — générer des revenus et pérenniser le mouvement.",
    color: "bg-guinea-yellow/20 text-earth-black",
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Gouvernance & Transparence",
    desc: "Le CA de Ballal ASBL est élu par les membres. Chaque décision engageant l'association est prise collectivement et rendue publique.",
    color: "bg-blue-100 text-blue-700",
  },
];

const MemberDashboard: React.FC<MemberDashboardProps> = ({ navigate }) => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-soft-paper pb-20">

      {/* ── WELCOME BANNER ── */}
      <div className="bg-earth-black text-white py-14 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-guinea-red/10 rounded-full blur-[100px]" aria-hidden="true" />
        <div className="max-w-5xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-guinea-yellow font-black text-xs uppercase tracking-widest mb-2">Espace membre</p>
            <h1 className="text-4xl md:text-5xl font-serif font-black leading-tight">
              Bienvenue,<br />
              <span className="text-guinea-yellow">{user?.name || 'Membre'}</span>
            </h1>
            <p className="text-gray-400 mt-3 text-base font-medium max-w-lg">
              Tu fais partie de Ballal ASBL. Voici ce que nous faisons ensemble pour la communauté des sans-papiers guinéens à Bruxelles.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => navigate(ViewState.FOUNDERS_WALL)}
              className="flex items-center gap-2 bg-guinea-yellow text-earth-black px-6 py-3 rounded-xl font-black text-sm hover:-translate-y-0.5 transition-all shadow-lg"
            >
              <Star className="h-4 w-4" /> Mur des Fondateurs
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={logout}
              className="flex items-center gap-2 bg-white/10 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-white/20 transition-all"
            >
              <LogOut className="h-4 w-4" /> Se déconnecter
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-14 space-y-20">

        {/* ── CE QUE FAIT LE CA ── */}
        <section>
          <div className="flex items-center gap-4 mb-10">
            <div className="h-1 w-10 bg-guinea-red" />
            <h2 className="text-3xl md:text-4xl font-serif font-black text-earth-black">
              Ce que fait le CA
            </h2>
          </div>
          <p className="text-gray-600 text-lg leading-relaxed mb-10 max-w-3xl">
            Le Conseil d'Administration de Ballal ASBL coordonne 6 axes d'action pour défendre la dignité et les droits des sans-papiers guinéens en Belgique.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {missions.map((m, i) => (
              <div key={i} className="bg-white rounded-3xl p-7 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 ${m.color}`}>
                  {m.icon}
                </div>
                <h3 className="font-black text-earth-black text-lg mb-3">{m.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── L'ÉQUIPE ── */}
        <section>
          <div className="flex items-center gap-4 mb-10">
            <div className="h-1 w-10 bg-guinea-yellow" />
            <h2 className="text-3xl md:text-4xl font-serif font-black text-earth-black">
              Notre équipe
            </h2>
          </div>
          <p className="text-gray-600 text-lg leading-relaxed mb-10 max-w-3xl">
            Le CA de Ballal ASBL est composé de 5 personnes engagées, issues de la communauté guinéenne de Bruxelles et de ses alliés.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {teamMembers.map((member, i) => (
              <div key={i} className="group flex flex-col items-center text-center">
                <div className={`w-full aspect-square rounded-3xl overflow-hidden border-4 ${member.color} mb-4 shadow-md group-hover:shadow-xl transition-all group-hover:-translate-y-1`}>
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <h3 className="font-black text-earth-black text-sm leading-tight mb-1">{member.name}</h3>
                <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">{member.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA Fondateurs ── */}
        <section className="bg-earth-black rounded-3xl p-10 md:p-14 text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-guinea-yellow/5 rounded-full blur-[80px]" aria-hidden="true" />
          <div className="relative z-10 max-w-xl">
            <p className="text-guinea-yellow font-black text-xs uppercase tracking-widest mb-3">Campagne en cours</p>
            <h3 className="text-3xl font-serif font-black mb-4">Deviens fondateur de l'entrepôt</h3>
            <p className="text-gray-400 leading-relaxed">
              200 personnes × 200 € = 40 000 € pour acheter un espace au collectif. Un lieu pour les fêtes, les événements, les revenus du mouvement.
            </p>
          </div>
          <button
            onClick={() => navigate(ViewState.FOUNDERS_WALL)}
            className="flex-shrink-0 flex items-center gap-3 bg-guinea-yellow text-earth-black px-8 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-yellow-300 transition-all shadow-xl relative z-10"
          >
            Voir la campagne <ArrowRight className="h-5 w-5" />
          </button>
        </section>

      </div>
    </div>
  );
};

export default MemberDashboard;
