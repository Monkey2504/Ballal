import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Heart } from 'lucide-react';
import { LanguageCode } from '../types.ts';

interface HeroProps {
  onExplore: () => void;
  language?: LanguageCode;
  onShare: () => void;
  onDonate: () => void;
}

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden:  { opacity: 0, y: 18 },
  visible: (delay: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease, delay },
  }),
};

const Hero: React.FC<HeroProps> = ({ onExplore, onDonate }) => {
  return (
    <section
      className="relative bg-ivory paper-grain overflow-hidden"
      aria-label="Présentation de Ballal ASBL"
      id="hero"
    >
      {/* Folio / bandeau d'édition — façon une de journal */}
      <div className="relative z-10 border-b border-ink/15">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex items-center justify-between py-2.5 dateline text-[9px] sm:text-[10px] text-ink-muted">
            <span className="text-ink">Ballal — N° 01</span>
            <span className="hidden sm:block">Solidarité Guinée · Belgique</span>
            <span>Bruxelles · est. 2022</span>
          </div>
        </div>
      </div>

      {/* Filet tricolore franc — signature unique */}
      <div className="flag-rule relative z-10" aria-hidden="true"><span /><span /><span /></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        <div className="grid lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_480px] gap-12 xl:gap-16 items-center min-h-[82dvh] py-14 lg:py-16">

          {/* LEFT — Content */}
          <div className="space-y-7">

            {/* Dateline kicker */}
            <motion.div
              custom={0.1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex items-center gap-3"
            >
              <span className="flag-line w-8 shrink-0" aria-hidden="true">
                <span /><span /><span />
              </span>
              <p className="dateline text-[11px] text-guinea-red">
                Dossier — qui nous sommes
              </p>
            </motion.div>

            {/* Headline — three staggered lines in one h1 */}
            <motion.h1
              className="font-serif font-black leading-[0.85] tracking-[-0.02em]"
              aria-label="Accueillir. Défendre. Rassembler."
            >
              <motion.span
                className="block text-[3.5rem] sm:text-[5.5rem] xl:text-[7rem] text-ink"
                custom={0.2}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
              >
                Accueillir.
              </motion.span>

              <motion.span
                className="block italic text-[3.5rem] sm:text-[5.5rem] xl:text-[7rem] text-guinea-red"
                custom={0.32}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
              >
                Défendre.
              </motion.span>

              <motion.span
                className="block text-[3.5rem] sm:text-[5.5rem] xl:text-[7rem] text-ink"
                custom={0.44}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
              >
                <span className="highlight-mark">Rassembler.</span>
              </motion.span>
            </motion.h1>

            {/* Mission paragraph */}
            <motion.p
              custom={0.55}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-body-lg text-ink-muted leading-[1.7] max-w-xl"
            >
              Ballal n'est pas une association qui vous aide de l'extérieur.
              Nous sommes des sans-papiers et d'anciens sans-papiers qui prennent
              soin de leurs frères — du logement d'urgence jusqu'à l'emploi,
              de la rue jusqu'à l'autonomie réelle.
            </motion.p>

            {/* CTAs */}
            <motion.div
              custom={0.65}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-3 pt-1"
            >
              <motion.button
                onClick={onExplore}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-ink text-ivory font-mono text-[12px] font-bold uppercase tracking-[0.08em] rounded-[3px] hover:bg-guinea-red transition-colors duration-200 group focus:outline-none focus-visible:ring-2 focus-visible:ring-guinea-red/50 focus-visible:ring-offset-2"
              >
                Rejoindre le combat
                <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
              </motion.button>

              <motion.button
                onClick={onDonate}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 border-2 border-ink text-ink font-mono text-[12px] font-bold uppercase tracking-[0.08em] rounded-[3px] hover:bg-ink hover:text-ivory transition-colors duration-200 group focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/40 focus-visible:ring-offset-2"
              >
                <Heart className="h-4 w-4 text-guinea-red fill-guinea-red group-hover:text-guinea-yellow group-hover:fill-guinea-yellow transition-colors" aria-hidden="true" />
                Soutenir Ballal
              </motion.button>
            </motion.div>

            {/* Stat ledger */}
            <motion.div
              custom={0.78}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="pt-6 mt-1 border-t border-ink/15"
            >
              <dl className="grid grid-cols-3 divide-x divide-ink/12">
                {[
                  { value: 'Fondée',  label: 'par des sans-papiers' },
                  { value: '2022',    label: 'Molenbeek, Bruxelles' },
                  { value: 'Du toit', label: "jusqu'à l'autonomie" },
                ].map((stat, i) => (
                  <div key={stat.label} className={i === 0 ? 'pr-5' : 'px-5'}>
                    <dd className="font-serif font-black text-2xl text-ink leading-none tracking-tight">{stat.value}</dd>
                    <dt className="dateline text-[9px] text-ink-muted mt-2 normal-case tracking-[0.1em]">{stat.label}</dt>
                  </div>
                ))}
              </dl>
            </motion.div>
          </div>

          {/* RIGHT — Press photo */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.3 }}
            className="relative"
          >
            {/* Tricolor top edge */}
            <div className="flag-rule" aria-hidden="true"><span /><span /><span /></div>

            <figure className="relative bg-ink overflow-hidden aspect-[4/5] shadow-soft-xl border-x border-b border-ink/15">
              <img
                src="https://i.imgur.com/laZeGp9.jpeg"
                className="w-full h-full object-cover"
                alt="Membres de la communauté Ballal ASBL à Bruxelles"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-ink/5" aria-hidden="true" />

              {/* Press caption — top-left */}
              <figcaption className="absolute top-4 left-4">
                <span className="dateline text-[9px] text-ivory bg-ink/60 backdrop-blur-sm px-2.5 py-1.5">
                  Photo — archives Ballal
                </span>
              </figcaption>

              {/* Quote — bottom */}
              <blockquote className="absolute bottom-0 left-0 right-0 p-6">
                <p className="font-serif italic font-medium text-ivory text-xl leading-snug">
                  « On vient de là où tu viens. Et on ne lâche pas. »
                </p>
                <p className="dateline text-[9px] text-guinea-yellow mt-3">
                  Molenbeek · Bruxelles — est. 2022
                </p>
              </blockquote>
            </figure>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
