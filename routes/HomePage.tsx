import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Hero from '../components/Hero.tsx';
import SectionHeader from '../components/ui/SectionHeader.tsx';
import Card from '../components/ui/Card.tsx';
import { ViewState, LanguageCode } from '../types.ts';
import { PROGRAMS } from '../data/programs.ts';
import { IMPACT_NUMBERS } from '../data/impactNumbers.ts';
import { TEAM_MEMBERS } from '../data/team.ts';

const cardVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.05, duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

// Couleur de numéro lisible sur fond sombre (l'encre devient ivoire)
const numberColorDark = (border: string) =>
  border === 'var(--ink)' ? '#FAF7F0' : border === 'var(--gold)' ? '#FFCC00' : border;

interface HomePageProps {
  navigate: (v: ViewState) => void;
  language: LanguageCode;
}

const HomePage: React.FC<HomePageProps> = ({ navigate, language }) => {
  return (
    <div>
      <Hero
        onExplore={() => navigate(ViewState.SOLIDARITY_NETWORK)}
        language={language}
        onShare={() => navigate(ViewState.SHARE)}
        onDonate={() => navigate(ViewState.DONATE)}
      />

      {/* Programmes — sommaire éditorial sur fond sombre (pièce maîtresse) */}
      <section className="bg-ink relative overflow-hidden" aria-labelledby="programs-title">
        <div className="flag-line" aria-hidden="true"><span /><span /><span /></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl mb-14"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="flag-line w-8 shrink-0" aria-hidden="true"><span /><span /><span /></span>
              <p className="dateline text-[11px] text-guinea-yellow">Sommaire — nos programmes</p>
            </div>
            <h2 id="programs-title" className="font-serif font-black text-[2rem] sm:text-[2.75rem] text-ivory leading-[1.02] tracking-tight">
              Du toit à l'indépendance, le parcours complet.
            </h2>
            <p className="mt-5 text-body-lg text-white/55 leading-relaxed">
              Nous ne traitons pas les urgences une par une. Nous gérons le parcours entier :
              logement, droits, alimentation, emploi, communauté, culture — jusqu'à ce que la
              personne soit vraiment libre.
            </p>
          </motion.div>

          <ul className="border-t border-white/15">
            {PROGRAMS.map((prog, i) => {
              const Icon = prog.icon;
              const color = numberColorDark(prog.borderColor);
              return (
                <motion.li
                  key={prog.view}
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                >
                  <button
                    onClick={() => navigate(prog.view)}
                    className="group w-full text-left flex items-baseline gap-5 sm:gap-8 py-7 border-b border-white/15 transition-colors hover:bg-white/[0.04] focus:outline-none focus-visible:ring-2 focus-visible:ring-guinea-yellow/40 -mx-3 px-3"
                  >
                    <span
                      className="font-mono font-bold text-lg sm:text-2xl shrink-0 w-10 tabular-nums"
                      style={{ color }}
                      aria-hidden="true"
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    <span className="flex-1 min-w-0">
                      <span className="flex items-center gap-3">
                        <Icon className="h-5 w-5 shrink-0" style={{ color }} aria-hidden="true" />
                        <span className="font-serif font-black text-xl sm:text-2xl text-ivory leading-tight group-hover:text-guinea-yellow transition-colors">
                          {prog.label}
                        </span>
                      </span>
                      <span className="block text-body-sm text-white/50 leading-relaxed mt-2 max-w-2xl">
                        {prog.desc}
                      </span>
                    </span>

                    <ArrowRight
                      className="h-5 w-5 text-white/40 shrink-0 self-center opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                      aria-hidden="true"
                    />
                  </button>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Chiffres — ledger éditorial clair */}
      <section className="bg-ivory paper-grain border-b border-border-subtle" aria-label="Ballal en chiffres">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <dl className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-ink/10">
            {IMPACT_NUMBERS.map((stat) => (
              <div key={stat.label} className="px-6 sm:px-8 py-12 sm:py-14 flex flex-col-reverse gap-3">
                <dt className="dateline text-[10px] text-ink-muted">
                  {stat.label}
                </dt>
                <dd className="text-4xl xl:text-5xl font-serif font-black leading-none" style={{ color: stat.accent }}>
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* CTA Don */}
      <section className="bg-guinea-yellow py-16 sm:py-20" aria-label="Soutenir Ballal ASBL">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
            <div className="max-w-xl">
              <p className="dateline text-[11px] text-ink/55 mb-3">Agir maintenant</p>
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
              className="shrink-0 inline-flex items-center gap-2.5 px-7 py-3.5 bg-ink text-ivory font-mono text-[12px] font-bold uppercase tracking-[0.08em] rounded-[3px] hover:bg-guinea-red transition-colors duration-200 group focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/40 focus-visible:ring-offset-2"
            >
              Soutenir Ballal
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
            </motion.button>
          </div>
        </div>
      </section>

      {/* Conseil d'Administration */}
      <section className="bg-ivory paper-grain py-20 sm:py-28" aria-labelledby="team-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <SectionHeader
            titleId="team-title"
            eyebrow="Gouvernance"
            title="Conseil d'administration"
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
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
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
                    <p className="dateline text-[9px] text-ink-muted mt-1.5 normal-case tracking-[0.1em]">{member.bio}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <figure className="mt-12 overflow-hidden relative shadow-soft-lg border-x border-b border-ink/15">
            <div className="flag-rule" aria-hidden="true"><span /><span /><span /></div>
            <img
              src="https://i.imgur.com/CwnDz75.png"
              alt="Membres et militants de Ballal ASBL"
              className="w-full h-64 sm:h-80 object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent" aria-hidden="true" />
            <figcaption className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <p className="dateline text-[10px] text-guinea-yellow mb-2">Membres et militants</p>
              <p className="font-serif font-black text-xl sm:text-2xl text-ivory leading-snug max-w-xl">
                Derrière chaque action Ballal, des femmes et des hommes qui ne lâchent pas.
              </p>
            </figcaption>
          </figure>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
