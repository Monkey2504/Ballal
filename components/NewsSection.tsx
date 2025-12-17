
import React, { useState } from 'react';
import { Newspaper, Search, Sparkles, ArrowRight, Eye, Heart, ChevronRight, Share2 } from 'lucide-react';
import { translations } from '../utils/translations.ts';

interface NewsSectionProps {
    language?: string;
}

const NewsSection: React.FC<NewsSectionProps> = ({ language = 'fr' }) => {
  const t = translations[language] || translations['fr'];
  const [searchQuery, setSearchQuery] = useState('');

  const articles = [
    {
      id: '1',
      title: 'FESTIVAL DES SANS-PAPIERS 2024',
      excerpt: 'La 2e édition aura lieu en juin à Bruxelles. On occupe la rue.',
      category: 'EVENT',
      date: '15 MARS',
      imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1600&auto=format&fit=crop',
      color: 'bg-punk-red'
    },
    {
      id: '2',
      title: 'PARTENAIRE : FERME BIO DU HAINAUT',
      excerpt: 'Récupération des surplus pour l\'autonomie alimentaire.',
      category: 'SOLIDARITÉ',
      date: '10 MARS',
      imageUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=1600&auto=format&fit=crop',
      color: 'bg-punk-green'
    },
    {
      id: '3',
      title: 'ATELIER DROITS HUMAINS',
      excerpt: 'Se former pour mieux résister. Inscription obligatoire.',
      category: 'INFO',
      date: '05 MARS',
      imageUrl: 'https://images.unsplash.com/photo-1589391886085-8b6b0ac72a1a?q=80&w=1600&auto=format&fit=crop',
      color: 'bg-punk-yellow'
    }
  ];

  return (
    <div className="min-h-screen bg-punk-paper py-24 px-4 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER URBAIN */}
        <div className="text-center mb-24 relative">
          <div className="inline-block bg-punk-black text-white px-10 py-6 brutal-shadow -rotate-2 border-4 border-white mb-8">
            <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-none">
               NEWS<span className="text-punk-red">FLASH</span>
            </h1>
          </div>
          <p className="text-2xl md:text-4xl font-black text-punk-black uppercase italic max-w-3xl mx-auto">
            "Le pouls de la lutte, en direct de nos rues."
          </p>
        </div>

        {/* SEARCH BRUTAL */}
        <div className="mb-20 max-w-2xl mx-auto relative">
           <input
            type="text"
            placeholder="RECHERCHER DANS L'ARCHIVE..."
            className="w-full bg-white border-4 border-punk-black p-6 text-xl font-black uppercase placeholder:text-gray-300 brutal-shadow focus:translate-x-1 focus:translate-y-1 focus:shadow-none outline-none transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
           />
           <Search className="absolute right-6 top-1/2 -translate-y-1/2 h-8 w-8 text-punk-black" />
        </div>

        {/* NEWS GRID - POSTER STYLE */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {articles.map((article, i) => (
            <article 
              key={article.id}
              className={`bg-white border-4 border-punk-black brutal-shadow group cursor-pointer hover:-rotate-1 transition-transform relative ${i % 2 === 0 ? 'rotate-1' : '-rotate-1'}`}
            >
              {/* Image with High Contrast */}
              <div className="relative h-64 overflow-hidden border-b-4 border-punk-black">
                <img 
                  src={article.imageUrl}
                  className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500"
                  alt={article.title}
                />
                <div className={`absolute top-4 left-4 ${article.color} text-white px-3 py-1 font-black text-xs uppercase border-2 border-punk-black`}>
                  {article.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-8 space-y-4">
                <div className="font-mono text-xs font-black text-gray-500 uppercase">{article.date} • BALLAL REPORTER</div>
                <h3 className="text-2xl font-black uppercase leading-tight group-hover:text-punk-red transition-colors">
                  {article.title}
                </h3>
                <p className="font-bold text-gray-600 uppercase text-sm leading-tight">
                  {article.excerpt}
                </p>
                
                <div className="pt-6 border-t-2 border-dashed border-gray-200 flex justify-between items-center">
                   <span className="font-black uppercase text-sm flex items-center gap-2 group-hover:gap-4 transition-all">
                      LIRE LE DOSSIER <ArrowRight className="h-4 w-4" />
                   </span>
                   <Share2 className="h-5 w-5 text-gray-400 hover:text-punk-black" />
                </div>
              </div>

              {/* Fake "Tape" on some cards */}
              {i === 0 && <div className="absolute -top-4 -left-8 w-32 h-10 bg-gray-400/70 -rotate-45 mix-blend-multiply"></div>}
            </article>
          ))}
        </div>

        {/* BOTTOM CALL TO ACTION */}
        <div className="mt-32 bg-punk-red text-white p-12 brutal-shadow text-center relative overflow-hidden">
           <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
           <h2 className="text-4xl md:text-6xl font-black uppercase mb-6 relative z-10 tracking-tighter">RESTE CONNECTÉ À LA LUTTE</h2>
           <p className="text-xl font-bold uppercase mb-10 relative z-10 opacity-80">Reçois les alertes urgentes et les appels à solidarité.</p>
           <div className="flex flex-col md:flex-row gap-4 justify-center relative z-10">
              <input type="email" placeholder="TON EMAIL ICI" className="px-6 py-4 text-punk-black font-black uppercase text-lg border-4 border-punk-black outline-none w-full max-w-md" />
              <button className="bg-punk-black text-white px-10 py-4 font-black uppercase text-lg brutal-shadow hover:bg-punk-yellow hover:text-punk-black transition-colors">
                M'INSCRIRE
              </button>
           </div>
        </div>

      </div>
    </div>
  );
};

export default NewsSection;
