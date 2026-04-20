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
    transition: { duration: 0.45, ease, delay },
  }),
};

const Hero: React.FC<HeroProps> = ({ onExplore, onDonate }) => {
  return (
    <section
      className="relative bg-ivory overflow-hidden"
      aria-label="Présentation de Ballal ASBL"
      id="hero"
    >
      {/* Dot-grid texture — adds atmospheric depth */}
      <div className="absolute inset-0 dot-grid pointer-events-none" aria-hidden="true" />

      {/* Vertical Guinea flag strip — left-edge signature */}
      <div className="absolute left-0 top-0 bottom-0 w-[5px] flex flex-col z-20 pointer-events-none" aria-hidden="true">
        <span className="flex-1 bg-guinea-red" />
        <span className="flex-1 bg-guinea-yellow" />
        <span className="flex-1 bg-guinea-green" />
      </div>

      {/* Color atmosphere blobs */}
      <div className="absolute top-0 right-0 w-[55%] h-full pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 right-8 w-[480px] h-[480px] bg-guinea-red/[0.07] rounded-full blur-[130px]" />
        <div className="absolute bottom-1/3 right-1/3 w-72 h-72 bg-guinea-green/[0.05] rounded-full blur-[90px]" />
        <div className="absolute top-1/2 right-0 w-80 h-80 bg-guinea-yellow/[0.09] rounded-full blur-[110px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        <div className="grid lg:grid-cols-[1fr_440px] xl:grid-cols-[1fr_520px] gap-12 xl:gap-16 items-center min-h-[92dvh] py-20 lg:py-24">

          {/* LEFT — Content */}
          <div className="space-y-8 pl-3">

            {/* Status badge */}
            <motion.div
              custom={0.1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 text-label font-bold uppercase tracking-[0.28em] text-guinea-red/80"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-guinea-red animate-pulse" aria-hidden="true" />
              ASBL agréée · BCE 1016.925.333 · Bruxelles
            </motion.div>

            {/* Headline — three staggered lines in one h1 */}
            <motion.h1
              className="font-serif font-black leading-[0.92] tracking-tight"
              aria-label="Accueillir. Défendre. Rassembler."
            >
              <motion.span
                className="block text-5xl sm:text-6xl xl:text-[80px] text-ink"
                custom={0.2}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
              >
                Accueillir.
              </motion.span>

              <motion.span
                className="block italic text-5xl sm:text-6xl xl:text-[80px] text-guinea-red"
                custom={0.32}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
              >
                Défendre.
              </motion.span>

              <motion.span
                className="block text-5xl sm:text-6xl xl:text-[80px] text-ink"
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
              className="text-body-lg text-ink-muted leading-[1.75] max-w-lg"
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
                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-guinea-red text-white text-[12px] font-bold uppercase tracking-widest rounded-token shadow-[0_4px_20px_rgba(190,0,0,0.28)] hover:bg-guinea-red-dark transition-colors duration-200 group focus:outline-none focus-visible:ring-2 focus-visible:ring-guinea-red/50 focus-visible:ring-offset-2"
              >
                Rejoindre le combat
                <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
              </motion.button>

              <motion.button
                onClick={onDonate}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 border-2 border-ink text-ink text-[12px] font-bold uppercase tracking-widest rounded-token hover:bg-ink hover:text-white transition-colors duration-200 group focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/40 focus-visible:ring-offset-2"
              >
                <Heart className="h-4 w-4 text-guinea-red fill-guinea-red group-hover:text-guinea-yellow group-hover:fill-guinea-yellow transition-colors" aria-hidden="true" />
                Soutenir Ballal
              </motion.button>
            </motion.div>

            {/* Stat bars */}
            <motion.div
              custom={0.78}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="pt-6 border-t border-border-subtle"
            >
              <div className="flex flex-wrap gap-8">
                {[
                  { value: 'Fondée',   label: 'par des sans-papiers', color: '#BE0000' },
                  { value: '2022',     label: 'Molenbeek, Bruxelles', color: '#FFCC00' },
                  { value: 'Du toit',  label: "jusqu'à l'autonomie",  color: '#00843D' },
                ].map((stat) => (
                  <div key={stat.label} className="flex items-start gap-3">
                    <div
                      className="w-[3px] h-10 rounded-full shrink-0 mt-0.5"
                      style={{ background: stat.color }}
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-[17px] font-bold text-ink leading-none tracking-tight">{stat.value}</p>
                      <p className="text-label text-ink-muted font-medium mt-1 uppercase tracking-[0.14em]">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* RIGHT — Visual */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.25 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[420px] xl:max-w-[520px]">

              {/* Rotated yellow accent border */}
              <div
                className="absolute inset-0 rotate-2 border-2 border-guinea-yellow/65 rounded-[22px]"
                aria-hidden="true"
              />

              {/* Green corner accent */}
              <div
                className="absolute -right-3 -top-3 w-14 h-14 bg-guinea-green/20 rounded-token-lg"
                aria-hidden="true"
              />

              {/* Main image — subtly tilted */}
              <div className="relative bg-border-subtle rounded-[20px] overflow-hidden aspect-[4/5] shadow-soft-xl -rotate-[1.5deg]">
                <img
                  src="https://i.imgur.com/laZeGp9.jpeg"
                  className="w-full h-full object-cover"
                  alt="Membres de la communauté Ballal ASBL à Bruxelles"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/72 via-ink/10 to-transparent" aria-hidden="true" />

                <blockquote className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="font-serif italic text-white text-lg leading-snug drop-shadow-md">
                    « On vient de là où tu viens. Et on ne lâche pas. »
                  </p>
                  <div className="flex gap-1 mt-3" aria-hidden="true">
                    <span className="h-[3px] w-8 bg-guinea-red rounded-full" />
                    <span className="h-[3px] w-8 bg-guinea-yellow rounded-full" />
                    <span className="h-[3px] w-8 bg-guinea-green rounded-full" />
                  </div>
                </blockquote>
              </div>

              {/* Bottom floating badge */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.78, duration: 0.35, ease: 'easeOut' }}
                className="absolute -bottom-5 -left-5 bg-white border border-border-subtle rounded-token-lg shadow-soft-lg px-4 py-3 flex items-center gap-3"
                aria-hidden="true"
              >
                <div className="flex flex-col gap-[3px] shrink-0">
                  <span className="block w-2 h-5 bg-guinea-red rounded-sm" />
                  <span className="block w-2 h-5 bg-guinea-yellow rounded-sm" />
                  <span className="block w-2 h-5 bg-guinea-green rounded-sm" />
                </div>
                <div>
                  <p className="text-label font-bold uppercase tracking-widest text-ink">Guinée · Belgique</p>
                  <p className="text-[9px] text-ink-muted font-medium mt-0.5">Par les sans-papiers, pour les sans-papiers</p>
                </div>
              </motion.div>

              {/* Top floating badge */}
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.82, duration: 0.35, ease: 'easeOut' }}
                className="absolute -top-5 -right-5 bg-guinea-red text-white rounded-token-lg shadow-[0_4px_20px_rgba(190,0,0,0.3)] px-4 py-3 text-center"
                aria-hidden="true"
              >
                <p className="text-[9px] font-bold uppercase tracking-widest opacity-75">ASBL</p>
                <p className="text-label font-bold mt-0.5">Agréée</p>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
