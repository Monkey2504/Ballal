import React, { useState } from 'react';
import { Search, MapPin, Phone, CheckCircle, Store, Briefcase, Scissors, Utensils, Stethoscope } from 'lucide-react';
import { DirectoryItem } from '../types';

// Données fictives mais réalistes pour l'exemple
const DIRECTORY_DATA: DirectoryItem[] = [
  {
    id: '1',
    name: 'Délices de Conakry',
    category: 'Gastronomie',
    location: 'Ixelles (Matonge)',
    description: 'Restaurant authentique. Lafidi, Riz gras, Sauce feuilles. Ambiance familiale le week-end.',
    phone: '02 555 12 34',
    isVerified: true
  },
  {
    id: '2',
    name: 'Alpha & Omar Coiffure',
    category: 'Beauté & Mode',
    location: 'Anderlecht',
    description: 'Salon de coiffure homme et femme. Spécialiste tresses, tissages et coupes dégradées.',
    phone: '0477 12 34 56',
    isVerified: true
  },
  {
    id: '3',
    name: 'Maître Sow - Avocat',
    category: 'Services',
    location: 'Bruxelles Centre',
    description: 'Avocat spécialisé en droit des étrangers et regroupement familial. Consultation en Pular possible.',
    phone: '02 222 33 44',
    isVerified: true
  },
  {
    id: '4',
    name: 'Guinée Transfert Express',
    category: 'Services',
    location: 'Liège',
    description: 'Envoi de colis et fret aérien vers Conakry. Départs hebdomadaires.',
    phone: '0488 99 88 77',
    isVerified: false
  },
  {
    id: '5',
    name: 'Bazin Chic Belgique',
    category: 'Beauté & Mode',
    location: 'Charleroi',
    description: 'Vente de Bazin riche Getzner, teinture artisanale et couture sur mesure pour fêtes.',
    phone: '0465 11 22 33',
    isVerified: true
  },
  {
    id: '6',
    name: 'Dr. Barry Généraliste',
    category: 'Santé',
    location: 'Namur',
    description: 'Médecin généraliste conventionné. Visites à domicile dans la région namuroise.',
    phone: '081 22 33 44',
    isVerified: true
  }
];

const CATEGORIES = ['Tout', 'Gastronomie', 'Beauté & Mode', 'Services', 'Santé'];

const DirectorySection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tout');

  const filteredItems = DIRECTORY_DATA.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Tout' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Gastronomie': return <Utensils className="h-5 w-5" aria-hidden="true" />;
      case 'Beauté & Mode': return <Scissors className="h-5 w-5" aria-hidden="true" />;
      case 'Services': return <Briefcase className="h-5 w-5" aria-hidden="true" />;
      case 'Santé': return <Stethoscope className="h-5 w-5" aria-hidden="true" />;
      default: return <Store className="h-5 w-5" aria-hidden="true" />;
    }
  };

  return (
    <div className="min-h-screen py-12 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          {/* H1 SEO Optimization */}
          <h1 className="text-3xl font-extrabold text-gray-900">
            Annuaire des Talents
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Soutenez le "Made in Guinea" en Belgique. Retrouvez les commerces et experts de la communauté.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative flex-grow max-w-lg">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <label htmlFor="directory-search" className="sr-only">Rechercher un nom ou une ville</label>
                    <input
                        id="directory-search"
                        type="text"
                        className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-[#CE1126] focus:border-[#CE1126]"
                        placeholder="Rechercher un nom, une ville..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                
                <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrer par catégorie">
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            aria-pressed={selectedCategory === cat}
                            className={`px-4 py-2 rounded-full text-sm font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-[#CE1126] ${
                                selectedCategory === cat 
                                ? 'bg-gray-900 text-white' 
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map(item => (
                <div key={item.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border-t-4 border-[#CE1126] overflow-hidden group">
                    <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-2 rounded-lg bg-gray-50 text-gray-700 group-hover:bg-red-50 group-hover:text-[#CE1126] transition-colors`}>
                                {getCategoryIcon(item.category)}
                            </div>
                            {item.isVerified && (
                                <span className="flex items-center text-[10px] font-bold uppercase tracking-wider text-[#009460] bg-green-50 px-2 py-1 rounded-full">
                                    <CheckCircle className="h-3 w-3 mr-1" aria-hidden="true" /> Vérifié
                                </span>
                            )}
                        </div>
                        
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
                        <div className="flex items-center text-sm text-gray-500 mb-4">
                            <MapPin className="h-4 w-4 mr-1 text-gray-400" aria-hidden="true" />
                            {item.location}
                        </div>
                        
                        <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                            {item.description}
                        </p>
                        
                        <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                            <span className="text-sm font-bold text-gray-900 flex items-center">
                                <Phone className="h-4 w-4 mr-2 text-[#CE1126]" aria-hidden="true" />
                                {item.phone}
                            </span>
                            <button className="text-xs font-bold text-gray-500 hover:text-gray-900 uppercase focus:outline-none focus:underline">
                                Voir fiche
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        {filteredItems.length === 0 && (
            <div className="text-center py-12" role="status">
                <p className="text-gray-500 bg-white inline-block px-4 py-2 rounded-lg border border-gray-100">Aucun résultat trouvé pour cette recherche.</p>
                <div className="mt-2">
                    <button 
                        onClick={() => {setSearchTerm(''); setSelectedCategory('Tout')}}
                        className="mt-4 text-[#CE1126] font-bold hover:underline bg-white px-4 py-2 rounded-lg border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#CE1126]"
                    >
                        Réinitialiser les filtres
                    </button>
                </div>
            </div>
        )}

        {/* Call to Action */}
        <div className="mt-12 bg-gray-900 rounded-xl p-8 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FCD116] opacity-10 rounded-full transform translate-x-10 -translate-y-10"></div>
            <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-2">Vous êtes entrepreneur ?</h3>
                <p className="text-gray-400 mb-6">Ajoutez votre activité à l'annuaire BALLAL et gagnez en visibilité auprès de la communauté.</p>
                <button className="bg-[#FCD116] text-black font-bold px-8 py-3 rounded-md hover:bg-yellow-400 transition-colors focus:outline-none focus:ring-2 focus:ring-white">
                    Référencer mon activité
                </button>
            </div>
        </div>

      </div>
    </div>
  );
};

export default DirectorySection;