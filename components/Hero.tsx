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

const STATS = [
  { value: '15 000+',   label: 'Guinéens en Belgique' },
  { value: '2022',      label: 'Fondée à Bruxelles' },
  { value: 'Molenbeek', label: 'Ancrage local' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};
const wordVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};
const fadeUp = {
  hidden:  { opacity: 0, y: 16 },
  visible: (delay: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const, delay },
  }),
};

const Hero: React.FC<HeroProps> = ({ onExplore, onDonate }) => {
  return (
    <section
      className="relative bg-[#FAFAF8] overflow-hidden"
      aria-label="Présentation de Ballal ASBL"
      id="hero"
    >
      {/* Subtle warm gradient — right side */}
      <div className="absolute top-0 right-0 w-2/5 h-full pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-l from-[#FAFAF8] via-[#F5F0EE] to-transparent" />
        <div className="absolute top-1/4 right-0 w-80 h-80 bg-[#BE0000]/4 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-16 w-56 h-56 bg-[#00843D]/4 rounded-full blur-[80px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center min-h-[92vh] py-20 lg:py-28">

          {/* LEFT — Content */}
          <div className="space-y-10">

            {/* Status badge */}
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.28em] text-[#BE0000]/80"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#BE0000] animate-pulse" aria-hidden="true" />
              ASBL agréée · BCE 1016.925.333 · Bruxelles
            </motion.div>

            {/* Headline — staggered word reveal */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              aria-label="Accueillir. Défendre. Rassembler."
            >
              {['Accueillir.', 'Défendre.', 'Rassembler.'].map((word, i) => (
                <motion.div
                  key={word}
                  variants={wordVariants}
                >
                  <h1
                    className={`font-serif font-black leading-[1.0] tracking-tight text-5xl sm:text-6xl xl:text-7xl ${
                      i === 1 ? 'text-[#BE0000]' : 'text-[#0F0F0F]'
                    }`}
                  >
                    {word}
                  </h1>
                </motion.div>
              ))}
            </motion.div>

            {/* Mission */}
            <motion.p
              custom={0.5}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-[17px] text-[#6B6B6B] leading-[1.75] max-w-lg font-medium"
            >
              Fondée à Bruxelles en 2022, Ballal ASBL accompagne les Guinéens et
              ressortissants subsahariens en situation précaire. Logement d'urgence,
              défense des droits, autonomie alimentaire et lien culturel — une réponse
              de proximité là où les institutions ne parviennent pas.
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
                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#BE0000] text-white text-[12px] font-black uppercase tracking-widest rounded-[8px] shadow-[0_4px_16px_rgba(190,0,0,0.25)] hover:bg-[#9B0000] transition-colors duration-200 group focus:outline-none"
              >
                Rejoindre l'entraide
                <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
              </motion.button>

              <motion.button
                onClick={onDonate}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 border border-[#0F0F0F] text-[#0F0F0F] text-[12px] font-black uppercase tracking-widest rounded-[8px] hover:bg-[#0F0F0F] hover:text-white transition-colors duration-200 group focus:outline-none"
              >
                <Heart className="h-4 w-4 text-[#BE0000] fill-[#BE0000] group-hover:text-[#FFCC00] group-hover:fill-[#FFCC00] transition-colors" aria-hidden="true" />
                Soutenir Ballal
              </motion.button>
            </motion.div>

            {/* Stats row with colored vertical bars */}
            <motion.div
              custom={0.8}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="pt-6 border-t border-[#E8E8E6]"
            >
              <div className="flex flex-wrap gap-8">
                {STATS.map((stat, i) => (
                  <div key={stat.label} className="flex items-start gap-3">
                    <div
                      className="w-[3px] h-10 rounded-full shrink-0 mt-0.5"
                      style={{ background: ['#BE0000', '#FFCC00', '#00843D'][i] }}
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-[17px] font-black text-[#0F0F0F] leading-none tracking-tight">{stat.value}</p>
                      <p className="text-[10px] text-[#6B6B6B] font-medium mt-1 uppercase tracking-[0.14em]">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* RIGHT — Visual */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-md xl:max-w-lg">

              {/* Offset border accent */}
              <div
                className="absolute inset-0 translate-x-3 translate-y-3 border border-[#BE0000]/20 rounded-[20px]"
                aria-hidden="true"
              />

              {/* Main image */}
              <div className="relative bg-[#E8E8E6] rounded-[20px] overflow-hidden aspect-[4/5] shadow-[0_16px_48px_rgba(0,0,0,0.10),0_4px_12px_rgba(0,0,0,0.05)]">
                <img
                  src="https://i.imgur.com/laZeGp9.jpeg"
                  className="w-full h-full object-cover"
                  alt="Membres de la communauté Ballal ASBL à Bruxelles"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F]/70 via-[#0F0F0F]/10 to-transparent" aria-hidden="true" />

                <blockquote className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="font-serif italic text-white text-lg leading-snug drop-shadow">
                    "La dignité humaine ne se négocie pas."
                  </p>
                  {/* Flag line as quote underline */}
                  <div className="flex gap-0.5 mt-3" aria-hidden="true">
                    <span className="h-[2px] w-6 bg-[#BE0000] rounded-full" />
                    <span className="h-[2px] w-6 bg-[#FFCC00] rounded-full" />
                    <span className="h-[2px] w-6 bg-[#00843D] rounded-full" />
                  </div>
                </blockquote>
              </div>

              {/* Bottom badge */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.4, ease: 'easeOut' }}
                className="absolute -bottom-4 -left-4 bg-white border border-[#E8E8E6] rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] px-4 py-3 flex items-center gap-3"
                aria-hidden="true"
              >
                <div className="flex flex-col gap-[2px]">
                  <span className="block w-2 h-5 bg-[#BE0000] rounded-sm" />
                  <span className="block w-2 h-5 bg-[#FFCC00] rounded-sm" />
                  <span className="block w-2 h-5 bg-[#00843D] rounded-sm" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#0F0F0F]">Guinée · Belgique</p>
                  <p className="text-[9px] text-[#6B6B6B] font-medium mt-0.5">Solidarité active depuis 2022</p>
                </div>
              </motion.div>

              {/* Top badge */}
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.4, ease: 'easeOut' }}
                className="absolute -top-4 -right-4 bg-[#BE0000] text-white rounded-[12px] shadow-[0_4px_16px_rgba(190,0,0,0.25)] px-4 py-3 text-center"
                aria-hidden="true"
              >
                <p className="text-[9px] font-black uppercase tracking-widest opacity-75">ASBL</p>
                <p className="text-[10px] font-black mt-0.5">Agréée</p>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
