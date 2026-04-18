import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronDown, ChevronUp } from 'lucide-react';
import { LanguageCode } from '../types.ts';

interface HistorySectionProps {
  language: LanguageCode;
}

const TIMELINE = [
  {
    year: '1958',
    label: 'Le "Non" qui change tout',
    colorHex: '#BE0000',
    content: {
      intro: `Le 28 septembre 1958, la Guinée devient le seul pays d'Afrique francophone à voter "Non" au référendum du général de Gaulle. En choisissant l'indépendance totale, elle rompt avec la France coloniale — et en paye immédiatement le prix.`,
      body: `Paris rapatrie ses fonctionnaires en quelques semaines, détruit ou emporte les infrastructures, gèle les financements. La France tente même de bloquer l'admission de la Guinée à l'ONU. Sékou Touré devient le premier président d'un État nouveau, isolé, asphyxié économiquement — mais libre.`,
      quote: `"Nous préférons la liberté dans la pauvreté à l'abondance dans l'esclavage."`,
      quoteSource: 'Sékou Touré, 25 août 1958, Conakry',
      detail: `Ce vote n'est pas qu'une date : c'est l'acte fondateur d'une identité politique. Plus d'un million de Guinéens votent "Non". Seulement 57 000 votent "Oui". La décision est massive, consciente, assumée.`,
    }
  },
  {
    year: '1958 – 1984',
    label: 'Le régime et les premiers exilés',
    colorHex: '#333333',
    content: {
      intro: `Le régime de Sékou Touré se durcit rapidement. Parti unique, censure, arrestations politiques, camp Boiro. Des groupes entiers — intellectuels, opposants, Peuls suspectés de contre-pouvoir économique — sont contraints à l'exil.`,
      body: `En 1984, à la mort de Touré, on estime à 2 millions le nombre de Guinéens vivant hors des frontières. La grande majorité se trouve dans les pays voisins (Côte d'Ivoire, Sénégal, Libéria, Sierra Leone), mais une minorité atteint l'Europe — notamment la France et la Belgique — via les universités ou les réseaux de réfugiés politiques.`,
      quote: `"L'exilé guinéen était perçu comme quelqu'un dont la loyauté était sujette à caution."`,
      quoteSource: 'Revue Politique Africaine, n°36, 1989',
      detail: `C'est à cette époque que les premières cellules de la diaspora guinéenne en Belgique prennent forme, notamment autour des universités bruxelloises. Ces pionniers sont en majorité des étudiants ou des intellectuels en rupture avec le régime.`,
    }
  },
  {
    year: '1984 – 2000',
    label: 'Après Touré : espoir et instabilité',
    colorHex: '#00843D',
    content: {
      intro: `Le 3 avril 1984, une semaine après la mort de Sékou Touré, le colonel Lansana Conté prend le pouvoir. Il amnistie les prisonniers politiques, libéralise l'économie, tente une normalisation. Beaucoup d'exilés envisagent le retour.`,
      body: `Mais l'instabilité politique persiste. Les années 1990 voient la Guinée accueillir plus de 500 000 réfugiés des guerres civiles libérienne et sierra-léonaise — tout en envoyant ses propres ressortissants vers l'Europe. La culture de mobilité des communautés peule et malinké, traditionnellement liée au commerce longue distance, amplifie ces mouvements.`,
      quote: `"La diaspora guinéenne entretient l'idée que l'exil est porteur d'espoir et de renouveau politique."`,
      quoteSource: 'Cairn.info, Revue Outre-Terre, 2017',
      detail: `Durant cette période, la diaspora en Belgique se structure davantage. Des associations communautaires émergent. La mobilité migratoire s'installe comme une réalité générationnelle — transmise, organisée, normalisée.`,
    }
  },
  {
    year: "2014 – aujourd'hui",
    label: 'La nouvelle génération à Bruxelles',
    colorHex: '#FFCC00',
    content: {
      intro: `À partir de 2014-2015, la migration irrégulière des jeunes Guinéens vers l'Europe s'accélère fortement. Les routes deviennent plus dangereuses — Maghreb, Méditerranée, puis nouvelles voies via la Turquie ou l'Amérique centrale.`,
      body: `Statbel recense 9 657 personnes de nationalité guinéenne en Belgique en 2017. Ce chiffre exclut les naturalisés, les sans-papiers et les demandeurs d'asile : les estimations réelles dépassent 15 000 personnes d'origine guinéenne. La Guinée est désormais la troisième nationalité africaine la plus représentée en Belgique, après la RDC et le Cameroun. Depuis 2023, les tensions diplomatiques entre les deux pays se sont accrues autour des politiques d'expulsion.`,
      quote: `"Plus de 10 000 Guinéens résident légalement en Belgique. La Guinée est la troisième nationalité africaine la plus représentée."`,
      quoteSource: 'CGRS / Cedoca, rapport novembre 2025',
      detail: `C'est dans ce contexte que Ballal ASBL a vu le jour en 2022 à Molenbeek — pour répondre à une réalité que les structures institutionnelles ne couvraient pas : l'accompagnement de proximité des sans-papiers guinéens et subsahariens dans leur quotidien bruxellois.`,
    }
  },
];

const HistorySection: React.FC<HistorySectionProps> = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="bg-[#FAFAF8] py-16 sm:py-24 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-14 sm:mb-20"
        >
          <div className="inline-block py-2 px-6 bg-[#0F0F0F] text-white font-bold text-[10px] uppercase tracking-[0.3em] mb-6 sm:mb-8 rounded-full">
            Histoire et diaspora
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-serif font-black text-[#0F0F0F] tracking-tighter leading-none mb-6 sm:mb-8">
            Nous savons<br />
            <span className="text-[#BE0000]">d'où nous venons.</span>
          </h1>
          <p className="text-base sm:text-xl md:text-2xl font-medium text-[#6B6B6B] italic max-w-2xl leading-relaxed border-l-4 border-[#FFCC00] pl-6 sm:pl-8">
            La présence guinéenne en Belgique n'est pas le fruit du hasard. Elle porte l'empreinte d'un peuple qui a toujours su résister. Cette histoire est notre boussole.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="bg-[#0F0F0F] text-white rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-10 md:p-16 mb-14 sm:mb-20 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#BE0000]/10 rounded-full blur-[80px]" aria-hidden="true" />
          <div className="relative z-10 grid sm:grid-cols-3 gap-8 text-center">
            {[
              { val: '1958', sub: 'Premier « NON » d\'Afrique francophone', color: '#BE0000' },
              { val: '15 000+', sub: 'Guinéens établis en Belgique', color: '#FFCC00' },
              { val: '3ème', sub: 'Nationalité africaine du pays', color: '#00843D' },
            ].map(({ val, sub, color }) => (
              <div key={val}>
                <div className="text-4xl sm:text-5xl md:text-6xl font-black mb-2" style={{ color }}>{val}</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-white/40">{sub}</div>
              </div>
            ))}
          </div>
          <p className="text-center text-[10px] text-white/30 mt-8 uppercase tracking-widest">
            Sources : Statbel 2017, CGRS/Cedoca nov. 2025, OIM 2020
          </p>
        </motion.div>

        <div className="space-y-3 sm:space-y-4">
          {TIMELINE.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.05, duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="bg-white rounded-[1.5rem] sm:rounded-[2rem] border border-[#E8E8E6] shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden"
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between p-6 sm:p-8 md:p-10 text-left min-h-[80px]"
                aria-expanded={openIndex === i}
              >
                <div className="flex items-center gap-4 sm:gap-6">
                  <div className="text-2xl sm:text-4xl md:text-5xl font-black font-serif leading-none" style={{ color: item.colorHex }}>
                    {item.year}
                  </div>
                  <h2 className="text-base sm:text-xl md:text-2xl font-black text-[#0F0F0F]">{item.label}</h2>
                </div>
                <div className="flex-shrink-0 ml-4">
                  {openIndex === i
                    ? <ChevronUp className="h-5 w-5 sm:h-6 sm:w-6 text-[#6B6B6B]" aria-hidden="true" />
                    : <ChevronDown className="h-5 w-5 sm:h-6 sm:w-6 text-[#6B6B6B]" aria-hidden="true" />
                  }
                </div>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 sm:px-8 md:px-10 pb-8 sm:pb-10 space-y-6 sm:space-y-8">
                      <div className="h-1 w-16 sm:w-20 rounded-full" style={{ backgroundColor: item.colorHex }} />
                      <p className="text-base sm:text-xl font-medium text-[#0F0F0F] leading-relaxed">{item.content.intro}</p>
                      <p className="text-sm sm:text-base text-[#6B6B6B] font-medium leading-relaxed">{item.content.body}</p>
                      <div className="bg-[#FAFAF8] p-6 sm:p-8 rounded-[12px] border border-[#E8E8E6]">
                        <Quote className="h-5 w-5 sm:h-6 sm:w-6 mb-4" style={{ color: item.colorHex }} aria-hidden="true" />
                        <p className="text-base sm:text-lg font-serif italic text-[#0F0F0F] mb-4">«\u00a0{item.content.quote.replace(/^"|"$/g, '')}\u00a0»</p>
                        <p className="text-[10px] font-bold text-[#6B6B6B] uppercase tracking-widest">— {item.content.quoteSource}</p>
                      </div>
                      <div className="border-l-4 pl-5 sm:pl-6 py-2" style={{ borderColor: item.colorHex }}>
                        <p className="text-sm sm:text-base text-[#6B6B6B] font-medium leading-relaxed italic">{item.content.detail}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 sm:mt-16 pt-8 border-t border-[#E8E8E6]">
          <p className="text-xs text-[#6B6B6B] font-medium leading-relaxed max-w-3xl">
            <span className="font-black text-[#0F0F0F]">Sources :</span> Statbel, CGRS/Cedoca (rapport novembre 2025), OIM 2020, Revue Politique Africaine n°36 (1989), Cairn.info — Revue Outre-Terre 2017.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HistorySection;
