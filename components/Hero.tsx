import React from 'react';
import { ArrowRight, Heart, ExternalLink, MapPin, Users, Calendar } from 'lucide-react';
import { LanguageCode } from '../types.ts';

interface HeroProps {
  onExplore: () => void;
  language?: LanguageCode;
  onShare: () => void;
  onDonate: () => void;
}

const IMPACT_STATS = [
  { value: '25 000+', label: 'Guinéens en Belgique', icon: Users },
  { value: '2024',    label: 'Année de fondation',   icon: Calendar },
  { value: 'BXL',     label: 'Bruxelles & diaspora',  icon: MapPin },
];

const Hero: React.FC<HeroProps> = ({ onExplore, onDonate }) => {
  return (
    <section className="relative bg-white overflow-hidden" aria-label="Présentation de Ballal ASBL">

      {/* Subtle background accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-0 w-full h-full bg-[#FFF5F6]" />
        <div className="absolute top-20 right-20 w-96 h-96 bg-[#CE1126]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 right-40 w-64 h-64 bg-[#009460]/5 rounded-full blur-[80px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center min-h-[88vh] py-16 lg:py-24">

          {/* Left — Content */}
          <div className="space-y-8">

            {/* Status badge */}
            <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-[#CE1126]">
              <span className="w-2 h-2 rounded-full bg-[#CE1126] animate-pulse" aria-hidden="true" />
              Association agréée · Bruxelles
            </div>

            {/* Headline */}
            <div>
              <h1 className="font-serif font-black text-gray-900 leading-[1.02] tracking-tight">
                <span className="block text-5xl sm:text-6xl xl:text-7xl">Solidarité.</span>
                <span className="block text-5xl sm:text-6xl xl:text-7xl text-[#CE1126]">Dignité.</span>
                <span className="block text-5xl sm:text-6xl xl:text-7xl">Action.</span>
              </h1>
            </div>

            {/* Mission statement */}
            <p className="text-lg text-gray-600 leading-relaxed max-w-lg font-medium">
              Ballal ASBL est la structure de référence pour la communauté guinéenne en Belgique.
              Aide au logement, défense des droits, autonomie alimentaire et lien culturel.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={onExplore}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#CE1126] text-white text-sm font-black uppercase tracking-widest rounded-lg hover:bg-[#b01020] transition-colors shadow-lg shadow-[#CE1126]/20 group"
              >
                Rejoindre l'entraide
                <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
              </button>
              <button
                onClick={onDonate}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 border-2 border-gray-900 text-gray-900 text-sm font-black uppercase tracking-widest rounded-lg hover:bg-gray-900 hover:text-white transition-colors group"
              >
                <Heart className="h-4 w-4 text-[#CE1126] fill-[#CE1126] group-hover:text-white group-hover:fill-white transition-colors" aria-hidden="true" />
                Soutenir Ballal
              </button>
            </div>

            {/* Impact stats row */}
            <div className="flex flex-wrap gap-8 pt-4 border-t border-gray-100">
              {IMPACT_STATS.map((stat) => (
                <div key={stat.label} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-50 border border-gray-100 rounded-lg flex items-center justify-center shrink-0">
                    <stat.icon className="h-4 w-4 text-gray-400" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-base font-black text-gray-900 leading-none">{stat.value}</p>
                    <p className="text-[10px] text-gray-400 font-medium mt-0.5 uppercase tracking-wide">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Visual */}
          <div className="relative flex justify-center lg:justify-end">

            {/* Main image frame */}
            <div className="relative w-full max-w-md xl:max-w-lg">

              {/* Decorative frame offset */}
              <div
                className="absolute inset-0 translate-x-4 translate-y-4 border-2 border-[#CE1126]/20 rounded-2xl"
                aria-hidden="true"
              />

              {/* Image */}
              <div className="relative bg-gray-100 rounded-2xl overflow-hidden aspect-[4/5] shadow-2xl">
                <img
                  src="https://i.imgur.com/laZeGp9.jpeg"
                  className="w-full h-full object-cover"
                  alt="Membres de la communauté Ballal ASBL à Bruxelles"
                  loading="eager"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/10 to-transparent" aria-hidden="true" />

                {/* Quote overlay */}
                <blockquote className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="font-serif italic text-white text-lg leading-snug drop-shadow">
                    "La dignité d'un homme ne se négocie pas."
                  </p>
                  <div className="h-0.5 w-10 bg-[#FCD116] mt-3 rounded-full" aria-hidden="true" />
                </blockquote>
              </div>

              {/* Floating badge — Guinea flag colors */}
              <div
                className="absolute -bottom-4 -left-4 bg-white border border-gray-100 rounded-xl shadow-xl px-4 py-3 flex items-center gap-3"
                aria-hidden="true"
              >
                <div className="flex gap-0.5">
                  <span className="w-2.5 h-8 bg-[#CE1126] rounded-sm" />
                  <span className="w-2.5 h-8 bg-[#FCD116] rounded-sm" />
                  <span className="w-2.5 h-8 bg-[#009460] rounded-sm" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-900">Guinée · Belgique</p>
                  <p className="text-[9px] text-gray-400 font-medium mt-0.5">Réseau solidaire</p>
                </div>
              </div>

              {/* Accreditation badge */}
              <div
                className="absolute -top-4 -right-4 bg-[#CE1126] text-white rounded-xl shadow-xl px-4 py-3 text-center"
                aria-hidden="true"
              >
                <p className="text-[9px] font-black uppercase tracking-widest opacity-80">ASBL</p>
                <p className="text-[10px] font-black mt-0.5">Reconnue</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
