import React, { useState } from 'react';
import { Quote, ChevronDown, ChevronUp } from 'lucide-react';
import { LanguageCode } from '../types.ts';

interface HistorySectionProps {
  language: LanguageCode;
}

const TIMELINE = [
  {
    year: '1958',
    label: 'Le "Non" qui change tout',
    colorHex: '#CE1126',
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
    colorHex: '#009460',
    content: {
      intro: `Le 3 avril 1984, une semaine après la mort de Sékou Touré, le colonel Lansana Conté prend le pouvoir. Il amnistie les prisonniers politiques, libéralise l'économie, tente une normalisation. Beaucoup d'exilés envisagent le retour.`,
      body: `Mais l'instabilité politique persiste. Les années 1990 voient la Guinée accueillir plus de 500 000 réfugiés des guerres civiles libérienne et sierra-léonaise — tout en envoyant ses propres ressortissants vers l'Europe. La culture de mobilité des communautés peule et malinké, traditionnellement liée au commerce longue distance, amplifie ces mouvements.`,
      quote: `"La diaspora guinéenne entretient l'idée que l'exil est porteur d'espoir et de renouveau politique."`,
      quoteSource: 'Cairn.info, Revue Outre-Terre, 2017',
      detail: `Durant cette période, la diaspora en Belgique se structure davantage. Des associations communautaires émergent. La mobilité migratoire s'installe comme une réalité générationnelle — transmise, organisée, normalisée.`,
    }
  },
  {
    year: '2014 – aujourd\'hui',
    label: 'La nouvelle génération à Bruxelles',
    colorHex: '#FCD116',
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
    <section className="bg-soft-paper py-24 px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto">

        <div className="mb-20">
          <div className="inline-block py-2 px-6 bg-earth-black text-white font-bold text-[10px] uppercase tracking-[0.3em] mb-8 rounded-full">
            Histoire & Diaspora
          </div>
          <h1 className="text-6xl md:text-8xl font-serif font-black text-earth-black tracking-tighter leading-none mb-8">
            D'où nous<br />
            <span className="text-guinea-red/80">venons.</span>
          </h1>
          <p className="text-xl md:text-2xl font-medium text-gray-500 italic max-w-2xl leading-relaxed border-l-4 border-guinea-yellow pl-8">
            La présence guinéenne en Belgique ne s'explique pas par le hasard. Elle est le produit d'une histoire politique longue, de régimes autoritaires, de guerres régionales, et d'une culture de la mobilité profondément ancrée.
          </p>
        </div>

        <div className="bg-earth-black text-white rounded-[3rem] p-10 md:p-16 mb-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-guinea-red/10 rounded-full blur-[80px]" />
          <div className="relative z-10 grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl md:text-6xl font-black text-guinea-red mb-2">1958</div>
              <div className="text-xs font-bold uppercase tracking-widest text-gray-400">Année d'indépendance</div>
            </div>
            <div>
              <div className="text-5xl md:text-6xl font-black text-guinea-yellow mb-2">+15 000</div>
              <div className="text-xs font-bold uppercase tracking-widest text-gray-400">Guinéens estimés en Belgique</div>
            </div>
            <div>
              <div className="text-5xl md:text-6xl font-black text-guinea-green mb-2">3ème</div>
              <div className="text-xs font-bold uppercase tracking-widest text-gray-400">Nationalité africaine en Belgique</div>
            </div>
          </div>
          <p className="text-center text-[10px] text-gray-500 mt-8 uppercase tracking-widest">
            Sources : Statbel 2017, CGRS/Cedoca nov. 2025, OIM 2020
          </p>
        </div>

        <div className="space-y-4">
          {TIMELINE.map((item, i) => (
            <div key={i} className="bg-white rounded-[2rem] border border-gray-100 shadow-soft-elegant overflow-hidden">
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between p-8 md:p-10 text-left"
              >
                <div className="flex items-center gap-6">
                  <div className="text-4xl md:text-5xl font-black font-serif leading-none" style={{ color: item.colorHex }}>
                    {item.year}
                  </div>
                  <h2 className="text-xl md:text-2xl font-black text-earth-black">{item.label}</h2>
                </div>
                <div className="flex-shrink-0 ml-4">
                  {openIndex === i ? <ChevronUp className="h-6 w-6 text-gray-400" /> : <ChevronDown className="h-6 w-6 text-gray-400" />}
                </div>
              </button>

              {openIndex === i && (
                <div className="px-8 md:px-10 pb-10 space-y-8 animate-in fade-in duration-300">
                  <div className="h-1 w-20 rounded-full" style={{ backgroundColor: item.colorHex }} />
                  <p className="text-xl font-medium text-earth-black leading-relaxed">{item.content.intro}</p>
                  <p className="text-gray-600 font-medium leading-relaxed">{item.content.body}</p>
                  <div className="bg-soft-paper p-8 rounded-2xl border border-gray-100">
                    <Quote className="h-6 w-6 mb-4" style={{ color: item.colorHex }} />
                    <p className="text-lg font-serif italic text-earth-black mb-4">{item.content.quote}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">— {item.content.quoteSource}</p>
                  </div>
                  <div className="border-l-4 pl-6 py-2" style={{ borderColor: item.colorHex }}>
                    <p className="text-gray-600 font-medium leading-relaxed italic">{item.content.detail}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-gray-200">
          <p className="text-xs text-gray-400 font-medium leading-relaxed max-w-3xl">
            <span className="font-black text-gray-500">Sources :</span> Statbel, CGRS/Cedoca (rapport novembre 2025), OIM 2020, Revue Politique Africaine n°36 (1989), Cairn.info — Revue Outre-Terre 2017.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HistorySection;
