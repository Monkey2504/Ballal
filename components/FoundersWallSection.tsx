import React, { useState } from 'react';
import {
  Star, Users, Target, Building2, Music, Copy, Check,
  ChevronDown, ChevronUp, Sparkles, Lock, Heart
} from 'lucide-react';
import { PAYMENT } from '../constants/payment.ts';
import { useClipboard } from '../utils/useClipboard.ts';

const GOAL_FOUNDERS = 200;
const PRICE_PER_FOUNDER = PAYMENT.MONTANT_FONDATEUR;
const TOTAL_GOAL = GOAL_FOUNDERS * PRICE_PER_FOUNDER; // 40 000 €

// Données fictives des fondateurs déjà inscrits (à remplacer par données réelles)
const EXISTING_FOUNDERS: { name: string; date: string; anonymous?: boolean }[] = [
  { name: "Mamadou D.", date: "Avril 2026" },
  { name: "Fatoumata B.", date: "Avril 2026" },
  { name: "Ibrahim S.", date: "Avril 2026" },
  { name: "Aïssatou K.", date: "Avril 2026" },
  { name: "Fondateur anonyme", date: "Avril 2026", anonymous: true },
  { name: "Thierno C.", date: "Avril 2026" },
  { name: "Mariama J.", date: "Avril 2026" },
  { name: "Fondateur anonyme", date: "Avril 2026", anonymous: true },
  { name: "Alpha O.", date: "Avril 2026" },
  { name: "Kadiatou D.", date: "Avril 2026" },
  { name: "Fondateur anonyme", date: "Avril 2026", anonymous: true },
  { name: "Oumar B.", date: "Avril 2026" },
];

const FOUNDERS_COUNT = EXISTING_FOUNDERS.length;
const REMAINING = GOAL_FOUNDERS - FOUNDERS_COUNT;
const PROGRESS_PCT = Math.round((FOUNDERS_COUNT / GOAL_FOUNDERS) * 100);
const AMOUNT_RAISED = FOUNDERS_COUNT * PRICE_PER_FOUNDER;

const FoundersWallSection: React.FC = () => {
  const { copy, copied } = useClipboard();
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-earth-black via-slate-900 to-slate-800">

      {/* ── HERO ── */}
      <div className="relative overflow-hidden bg-earth-black text-white py-20 md:py-32 border-b-8 border-guinea-yellow">
        {/* fond motif */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, #FCD116 0, #FCD116 1px, transparent 0, transparent 50%)`,
            backgroundSize: '20px 20px',
          }}
          aria-hidden="true"
        />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-guinea-yellow/20 text-guinea-yellow border border-guinea-yellow/40 rounded-full px-5 py-2 text-xs font-black uppercase tracking-widest mb-8">
            <Sparkles className="h-4 w-4" />
            Campagne de fondation — Édition 2026
          </div>

          <h1 className="text-5xl md:text-7xl font-serif font-black mb-6 leading-none">
            Le Mur<br />
            <span className="text-guinea-yellow">des Fondateurs</span>
          </h1>

          <p className="text-xl md:text-2xl text-white/70 max-w-2xl mx-auto leading-relaxed mb-4">
            200 personnes. 200&nbsp;€ chacune. Un entrepôt pour le collectif des sans-papiers guinéens à Bruxelles.
          </p>
          <p className="text-white/50 text-base max-w-xl mx-auto mb-12">
            Un espace à nous pour organiser des fêtes, générer des revenus et faire vivre le mouvement — une année entière.
          </p>

          {/* Compteur */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {[
              { value: `${FOUNDERS_COUNT}`, label: "Fondateurs", color: "text-guinea-yellow" },
              { value: `${AMOUNT_RAISED.toLocaleString('fr-FR')} €`, label: "Levés", color: "text-guinea-green" },
              { value: `${REMAINING}`, label: "Places restantes", color: "text-white" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className={`text-4xl md:text-5xl font-black ${stat.color}`}>{stat.value}</div>
                <div className="text-white/50 text-sm uppercase tracking-widest mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 md:py-20 space-y-16">

        {/* ── BARRE DE PROGRESSION ── */}
        <section>
          <div className="bg-white/5 rounded-3xl p-8 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Target className="h-6 w-6 text-guinea-yellow" />
                <h2 className="text-white font-bold text-xl">Progression de la campagne</h2>
              </div>
              <span className="text-guinea-yellow font-black text-2xl">{PROGRESS_PCT}%</span>
            </div>

            <div className="w-full bg-white/10 rounded-full h-5 overflow-hidden mb-3">
              <div
                className="h-full bg-gradient-to-r from-guinea-red via-guinea-yellow to-guinea-green rounded-full transition-all duration-1000"
                style={{ width: `${PROGRESS_PCT}%` }}
              />
            </div>

            <div className="flex justify-between text-sm text-white/40">
              <span>{FOUNDERS_COUNT} fondateurs / {GOAL_FOUNDERS}</span>
              <span>Objectif : {TOTAL_GOAL.toLocaleString('fr-FR')} €</span>
            </div>

            {/* Milestone chips */}
            <div className="flex flex-wrap gap-3 mt-6">
              {[
                { at: 25, label: "Dépôt de garantie", reached: FOUNDERS_COUNT >= 25 },
                { at: 100, label: "Premier mois de loyer", reached: FOUNDERS_COUNT >= 100 },
                { at: 150, label: "Équipement sono", reached: FOUNDERS_COUNT >= 150 },
                { at: 200, label: "Entrepôt acheté !", reached: FOUNDERS_COUNT >= 200 },
              ].map((m) => (
                <div
                  key={m.at}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold border transition-all ${
                    m.reached
                      ? 'bg-guinea-green/20 border-guinea-green text-guinea-green'
                      : 'bg-white/5 border-white/20 text-white/40'
                  }`}
                >
                  {m.reached ? <Check className="h-3 w-3" /> : <Lock className="h-3 w-3" />}
                  {m.at} fondateurs — {m.label}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── LE MUR (grille des 200 places) ── */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-serif font-black text-white mb-3">
              Le Mur des Fondateurs
            </h2>
            <p className="text-white/50">Chaque case = un fondateur. Les cases dorées sont prises, les grises t'attendent.</p>
          </div>

          <div className="grid grid-cols-10 sm:grid-cols-20 gap-1.5 mb-6">
            {Array.from({ length: GOAL_FOUNDERS }).map((_, i) => {
              const founder = EXISTING_FOUNDERS[i];
              return (
                <div
                  key={i}
                  title={founder ? (founder.anonymous ? 'Fondateur anonyme' : founder.name) : `Place #${i + 1}`}
                  className={`aspect-square rounded-md transition-all ${
                    founder
                      ? founder.anonymous
                        ? 'bg-guinea-yellow/40 border border-guinea-yellow/60'
                        : 'bg-guinea-yellow border border-guinea-yellow shadow-[0_0_8px_rgba(252,209,22,0.4)]'
                      : 'bg-white/5 border border-white/10 hover:bg-white/10'
                  }`}
                />
              );
            })}
          </div>

          <div className="flex justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-guinea-yellow" />
              <span className="text-white/60">Fondateur inscrit</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-guinea-yellow/40 border border-guinea-yellow/60" />
              <span className="text-white/60">Anonyme</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-white/5 border border-white/10" />
              <span className="text-white/60">Libre</span>
            </div>
          </div>
        </section>

        {/* ── LISTE DES FONDATEURS ── */}
        <section>
          <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-3">
            <Users className="h-7 w-7 text-guinea-yellow" />
            Les {FOUNDERS_COUNT} premiers fondateurs
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {EXISTING_FOUNDERS.map((f, i) => (
              <div
                key={i}
                className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-5 py-4"
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${f.anonymous ? 'bg-white/10' : 'bg-guinea-yellow/20'}`}>
                  {f.anonymous
                    ? <Lock className="h-4 w-4 text-white/40" />
                    : <Star className="h-4 w-4 text-guinea-yellow" />
                  }
                </div>
                <div>
                  <div className="text-white font-bold text-sm">{f.name}</div>
                  <div className="text-white/40 text-xs">{f.date} · Fondateur #{i + 1}</div>
                </div>
              </div>
            ))}
            {/* Prochaine place disponible */}
            <div className="flex items-center gap-4 bg-guinea-yellow/5 border-2 border-dashed border-guinea-yellow/30 rounded-2xl px-5 py-4">
              <div className="w-10 h-10 rounded-full bg-guinea-yellow/10 flex items-center justify-center flex-shrink-0">
                <Heart className="h-4 w-4 text-guinea-yellow" />
              </div>
              <div>
                <div className="text-guinea-yellow font-bold text-sm">Ta place t'attend</div>
                <div className="text-white/40 text-xs">Fondateur #{FOUNDERS_COUNT + 1}</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── À QUOI SERT L'ARGENT ── */}
        <section>
          <h2 className="text-2xl font-black text-white mb-8 flex items-center gap-3">
            <Building2 className="h-7 w-7 text-guinea-green" />
            À quoi servent les 40 000 € ?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <Building2 className="h-8 w-8 text-guinea-green" />,
                title: "L'entrepôt",
                desc: "Achat ou location longue durée d'un espace à Bruxelles, propriété du collectif, accessible à toute la communauté guinéenne.",
                color: "border-guinea-green",
              },
              {
                icon: <Music className="h-8 w-8 text-guinea-yellow" />,
                title: "Les fêtes",
                desc: "Organiser des événements culturels, des soirées, des concerts. Chaque événement génère des revenus reversés au mouvement.",
                color: "border-guinea-yellow",
              },
              {
                icon: <Heart className="h-8 w-8 text-guinea-red" />,
                title: "Le mouvement",
                desc: "Financer une année entière d'activités pour les sans-papiers guinéens : aide juridique, alimentation, solidarité.",
                color: "border-guinea-red",
              },
            ].map((item) => (
              <div key={item.title} className={`bg-white/5 rounded-3xl p-8 border-t-4 ${item.color} border border-white/10`}>
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-white font-black text-xl mb-3">{item.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── DEVENIR FONDATEUR ── */}
        <section id="devenir-fondateur">
          <div className="bg-gradient-to-br from-guinea-yellow/10 to-guinea-red/10 rounded-3xl border border-guinea-yellow/30 overflow-hidden">

            {/* Header CTA */}
            <div className="bg-guinea-yellow px-8 py-6 text-center">
              <h2 className="text-earth-black font-black text-3xl md:text-4xl font-serif">
                Devenir Fondateur
              </h2>
              <p className="text-earth-black/70 font-bold mt-1">
                200 € · Un seul virement · Ton nom sur ce mur pour toujours
              </p>
            </div>

            <div className="p-8 md:p-12 space-y-8">

              {/* Comment ça marche */}
              <div>
                <button
                  onClick={() => setShowHowItWorks(!showHowItWorks)}
                  className="flex items-center justify-between w-full text-left text-white font-bold text-lg"
                >
                  <span>Comment ça marche ?</span>
                  {showHowItWorks ? <ChevronUp className="h-5 w-5 text-guinea-yellow" /> : <ChevronDown className="h-5 w-5 text-guinea-yellow" />}
                </button>
                {showHowItWorks && (
                  <ol className="mt-4 space-y-3 text-white/70 text-sm">
                    <li className="flex gap-3"><span className="bg-guinea-yellow text-earth-black font-black w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs">1</span>Tu fais un virement de 200&nbsp;€ avec la communication "FONDATEUR BALLAL".</li>
                    <li className="flex gap-3"><span className="bg-guinea-yellow text-earth-black font-black w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs">2</span>Tu nous envoies une capture ou confirmation de ton virement par e-mail ou WhatsApp.</li>
                    <li className="flex gap-3"><span className="bg-guinea-yellow text-earth-black font-black w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs">3</span>Ton nom (ou "Anonyme" si tu préfères) apparaît sur ce mur dans les 48h.</li>
                    <li className="flex gap-3"><span className="bg-guinea-yellow text-earth-black font-black w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs">4</span>Quand on atteint 200 fondateurs, on passe à l'action.</li>
                  </ol>
                )}
              </div>

              {/* IBAN */}
              <div className="bg-black/30 rounded-2xl p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-white/60 text-sm font-bold uppercase tracking-widest">Virement bancaire</span>
                  <span className="text-guinea-yellow font-mono text-sm font-bold">BALLAL ASBL</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-white/40 text-xs uppercase tracking-wider font-bold mb-2">IBAN</label>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="flex-1 font-mono text-xl font-black text-white bg-white/5 px-4 py-3 rounded-xl tracking-wider">
                        {PAYMENT.IBAN}
                      </div>
                      <button
                        onClick={() => copy(PAYMENT.IBAN)}
                        aria-label="Copier l'IBAN"
                        className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                          copied ? 'bg-guinea-green text-white' : 'bg-guinea-yellow text-earth-black hover:bg-yellow-300'
                        }`}
                      >
                        {copied ? <><Check className="h-4 w-4" /> Copié !</> : <><Copy className="h-4 w-4" /> Copier</>}
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/40 text-xs uppercase tracking-wider font-bold mb-2">Montant</label>
                      <div className="font-mono text-lg font-black text-guinea-yellow bg-white/5 px-4 py-2 rounded-xl">
                        200,00 €
                      </div>
                    </div>
                    <div>
                      <label className="block text-white/40 text-xs uppercase tracking-wider font-bold mb-2">Communication</label>
                      <div className="font-mono text-sm font-bold text-guinea-yellow bg-white/5 px-4 py-2 rounded-xl">
                        FONDATEUR BALLAL
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Urgence */}
              <div className="flex items-start gap-4 bg-guinea-red/10 border border-guinea-red/30 rounded-2xl px-6 py-5">
                <Sparkles className="h-5 w-5 text-guinea-red flex-shrink-0 mt-0.5" />
                <p className="text-white/80 text-sm leading-relaxed">
                  <strong className="text-white">La campagne est ouverte maintenant.</strong> Les places sont limitées à 200. Dès que l'objectif est atteint, on lance les démarches pour l'entrepôt. Plus on est nombreux rapidement, plus on agit vite.
                </p>
              </div>

              {/* Partager */}
              <div className="text-center pt-2">
                <p className="text-white/50 text-sm">
                  Tu ne peux pas donner maintenant ? <strong className="text-white/80">Parle-en autour de toi.</strong> Chaque fondateur compte.
                </p>
              </div>

            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default FoundersWallSection;
