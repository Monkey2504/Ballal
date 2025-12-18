
import React, { useState } from 'react';
import { Search, MapPin, Phone, Globe, Utensils, Briefcase, Heart, Filter } from 'lucide-react';

const CommunitySection: React.FC = () => {
  const [filter, setFilter] = useState('all');

  const providers = [
    { name: "La Teranga Guinéenne", cat: "resto", city: "Bruxelles", phone: "02 456 78 90", desc: "Authentique cuisine de Conakry." },
    { name: "Association Guinée-Solidarité", cat: "assoc", city: "Anvers", phone: "0470 12 34 56", desc: "Aide à l'intégration et événements." },
    { name: "Maitre Sow - Juriste", cat: "service", city: "Liège", phone: "0480 99 88 77", desc: "Conseils en droit des étrangers." },
    { name: "Épicerie Conakry-City", cat: "com", city: "Bruxelles (Molenbeek)", phone: "02 333 44 55", desc: "Produits du terroir et épices." },
    { name: "Ballal Social Club", cat: "assoc", city: "Bruxelles", phone: "0493 43 43 83", desc: "Espace de rencontre et de partage." },
  ];

  const filtered = filter === 'all' ? providers : providers.filter(p => p.cat === filter);

  const categories = [
    { id: 'all', label: 'Tout', icon: Filter },
    { id: 'resto', label: 'Restaurants', icon: Utensils },
    { id: 'assoc', label: 'Associations', icon: Heart },
    { id: 'service', label: 'Services', icon: Briefcase },
    { id: 'com', label: 'Commerce', icon: Globe },
  ];

  return (
    <div className="min-h-screen bg-soft-paper pb-20">
      <div className="bg-guinea-green text-white py-20 border-b-8 border-guinea-red relative">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-6xl md:text-8xl font-serif font-black tracking-tighter uppercase">
            L'Annuaire <span className="text-guinea-yellow">Ballal</span>
          </h1>
          <p className="text-xl font-medium mt-4 max-w-2xl opacity-90">
            Trouvez les commerces, services et associations de notre communauté en Belgique.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12">
        <div className="flex flex-wrap gap-4 mb-12">
          {categories.map(c => (
            <button
              key={c.id}
              onClick={() => setFilter(c.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${filter === c.id ? 'bg-earth-black text-white shadow-brutal' : 'bg-white text-gray-400 border border-gray-200'}`}
            >
              <c.icon className="h-4 w-4" />
              {c.label}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, i) => (
            <div key={i} className="bg-white border-4 border-earth-black rounded-3xl p-8 shadow-brutal hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-serif font-black">{p.name}</h3>
                <div className="p-2 bg-gray-50 rounded-xl">
                  {p.cat === 'resto' ? <Utensils className="h-5 w-5 text-guinea-red" /> : <Briefcase className="h-5 w-5 text-guinea-green" />}
                </div>
              </div>
              <p className="text-gray-600 font-medium italic mb-6">"{p.desc}"</p>
              <div className="space-y-3 pt-6 border-t border-dashed border-gray-200">
                <div className="flex items-center gap-3 text-sm font-bold">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  {p.city}
                </div>
                <a href={`tel:${p.phone}`} className="flex items-center gap-3 text-sm font-black text-guinea-red hover:underline">
                  <Phone className="h-4 w-4" />
                  {p.phone}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunitySection;
