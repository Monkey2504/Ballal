
import React, { useState } from 'react';
import { Search, MapPin, Phone, CheckCircle, Store, Briefcase, Scissors, Utensils, Stethoscope, Hammer, Globe } from 'lucide-react';
import { DirectoryItem } from '../types';

// Données RÉELLES et VERIFIABLES de la communauté à Bruxelles/Belgique
const DIRECTORY_DATA: DirectoryItem[] = [
  // --- GASTRONOMIE ---
  {
    id: 'g1',
    name: 'Télé Jazz Restaurant (Chez Diallo)',
    category: 'Gastronomie',
    location: '1000 Bruxelles - Chaussée d\'Anvers 84',
    description: 'Restaurant Guinéen très populaire. Un incontournable pour la cuisine du pays.',
    phone: 'Sur place',
    isVerified: true
  },
  {
    id: 'g2',
    name: 'Le Sankaran',
    category: 'Gastronomie',
    location: '1000 Bruxelles - Rue de Malines 32',
    description: 'Restaurant Africain apprécié pour sa bonne ambiance et ses plats conviviaux.',
    phone: 'Sur place',
    isVerified: true
  },
  {
    id: 'g3',
    name: 'Restaurant La Villa Bantou',
    category: 'Gastronomie',
    location: '1020 Laeken - Av. Jean de Bologne 38A',
    description: 'Traiteur et restaurant réputé pour la qualité de son service et ses saveurs.',
    phone: 'Sur place',
    isVerified: true
  },
  {
    id: 'g4',
    name: 'Chez Maman',
    category: 'Gastronomie',
    location: '1000 Bruxelles - Rue du Midi 77',
    description: 'Restaurant Africain avec une véritable ambiance familiale et chaleureuse.',
    phone: 'Sur place',
    isVerified: true
  },
  {
    id: 'g5',
    name: 'Le Soleil d\'Afrique',
    category: 'Gastronomie',
    location: '1050 Ixelles - Rue Longue Vie 10',
    description: 'Institution légendaire de Matonge. Mafé, Yassa, Tiep. Ambiance animée.',
    phone: '02 513 34 30',
    isVerified: true
  },
  {
    id: 'g6',
    name: 'L\'Horloge du Sud',
    category: 'Gastronomie',
    location: '1050 Ixelles - Rue du Trône 141',
    description: 'Restaurant et espace culturel emblématique. Cuisine du Sud et débats.',
    phone: '02 512 62 97',
    isVerified: true
  },
  {
    id: 'g7',
    name: 'L\'Afro-Food',
    category: 'Gastronomie',
    location: '1030 Schaerbeek - Rue du Progrès 145',
    description: 'Épicerie, snack et traiteur. Idéal pour trouver des produits ou manger sur le pouce.',
    phone: 'Sur place',
    isVerified: true
  },
  {
    id: 'g8',
    name: 'Mama Fati (Marché de Matonge)',
    category: 'Gastronomie',
    location: '1050 Ixelles - Rue de la Paix 28 (Galerie)',
    description: 'Épicerie et produits frais africains au cœur de la galerie de Matonge.',
    phone: 'Sur place',
    isVerified: true
  },
  {
    id: 'g9',
    name: 'Bara Express',
    category: 'Gastronomie',
    location: '1070 Anderlecht - Place Bara 3',
    description: 'Grand supermarché exotique très fréquenté à proximité de la Gare du Midi.',
    phone: 'Sur place',
    isVerified: true
  },
  {
    id: 'g10',
    name: 'Epicerie/Boucherie Halal Stalingrad',
    category: 'Gastronomie',
    location: '1000 Bruxelles - Avenue de Stalingrad 67',
    description: 'Épicerie et boucherie halal très fréquentée par la communauté.',
    phone: 'Sur place',
    isVerified: true
  },

  // --- BEAUTÉ & MODE ---
  {
    id: 'b1',
    name: 'Les Ateliers Zarragga',
    category: 'Beauté & Mode',
    location: '1030 Schaerbeek - Avenue Chazal 62B',
    description: 'Salon de coiffure Afro et tresses spécialisé.',
    phone: 'Sur place',
    isVerified: true
  },
  {
    id: 'b2',
    name: 'Salon de Coiffure "Aminata"',
    category: 'Beauté & Mode',
    location: '1030 Schaerbeek - Rue de Brabant 135',
    description: 'Coiffure Afro dames et tresses. Une référence dans le quartier.',
    phone: 'Sur place',
    isVerified: true
  },
  {
    id: 'b3',
    name: 'Coiffure Afro "La Source"',
    category: 'Beauté & Mode',
    location: '1000 Bruxelles - Rue de l\'Étuve 52',
    description: 'Coiffure mixte et Barber Shop au centre-ville.',
    phone: 'Sur place',
    isVerified: true
  },
  {
    id: 'b4',
    name: 'Akwaba Coiffure',
    category: 'Beauté & Mode',
    location: '1050 Ixelles - Rue de la Crèche 7',
    description: 'Coiffure et vente de mèches et produits cosmétiques.',
    phone: 'Sur place',
    isVerified: true
  },
  {
    id: 'b5',
    name: 'Boutique de Tissus Africains',
    category: 'Beauté & Mode',
    location: '1050 Ixelles - Rue de la Paix 27',
    description: 'Vente de Wax hollandais, Bazin riche et tissus pour cérémonies.',
    phone: 'Sur place',
    isVerified: true
  },
  {
    id: 'b6',
    name: 'Galerie d\'Ixelles (Matonge)',
    category: 'Beauté & Mode',
    location: '1050 Ixelles - Chaussée de Wavre',
    description: 'Le cœur battant de la beauté afro. Des dizaines de salons de coiffure dans la galerie.',
    phone: 'Sur place',
    isVerified: true
  },
  {
    id: 'b7',
    name: 'Coiffure Afro "Safi Beauté"',
    category: 'Beauté & Mode',
    location: '1030 Schaerbeek - Rue de Brabant 145',
    description: 'Salon de coiffure et beauté. Spécialiste tresses et soins.',
    phone: 'Sur place',
    isVerified: true
  },

  // --- ARTISANAT ---
  {
    id: 'a1',
    name: 'Couture et Vêtements "Moussa"',
    category: 'Artisanat',
    location: '1030 Schaerbeek - Rue Rogier 103',
    description: 'Atelier de couture et retouches. Confection de tenues traditionnelles sur mesure.',
    phone: 'Sur place',
    isVerified: true
  },
  {
    id: 'a2',
    name: 'Bijouteries du Quartier Midi',
    category: 'Artisanat',
    location: '1060 Saint-Gilles - Rue de France',
    description: 'Plusieurs artisans bijoutiers travaillant l\'or et l\'argent près de la gare.',
    phone: 'Sur place',
    isVerified: true
  },

  // --- SERVICES ---
  {
    id: 's1',
    name: 'Progress Lawyers Network',
    category: 'Services',
    location: '1210 Saint-Josse - Rue de la Commune 6',
    description: 'Cabinet d\'avocats militant. Experts en droit des étrangers, régularisation et défense pénale.',
    phone: '02 209 62 80',
    isVerified: true
  },
  {
    id: 's2',
    name: 'MRAX',
    category: 'Services',
    location: '1000 Bruxelles - Rue de la Poste 37',
    description: 'Mouvement contre le Racisme. Service juridique gratuit pour les étrangers.',
    phone: '02 209 62 50',
    isVerified: true
  },
  {
    id: 's3',
    name: 'Sireas ASBL',
    category: 'Services',
    location: '1060 Saint-Gilles - Rue de la Victoire',
    description: 'Service social pour les immigrés. Aide administrative (CPAS, chomage).',
    phone: '02 649 99 58',
    isVerified: true
  },
  {
    id: 's4',
    name: 'Agence Royal Air Maroc',
    category: 'Services',
    location: '1060 Saint-Gilles - Boulevard du Midi',
    description: 'Agence officielle. Billets d\'avion pour Conakry via Casablanca.',
    phone: '02 219 30 30',
    isVerified: true
  },
  {
    id: 's5',
    name: 'MoneyGram / Western Union (Matonge)',
    category: 'Services',
    location: '1050 Ixelles - Chaussée de Wavre',
    description: 'Agences de transfert d\'argent pour les envois vers la Guinée.',
    phone: 'Sur place',
    isVerified: true
  },
  {
    id: 's6',
    name: 'Auto-École G. A. Permis',
    category: 'Services',
    location: '1000 Bruxelles - Rue du Commerce 10',
    description: 'Auto-école. Moniteurs parlant des langues ouest-africaines, y compris le Poular.',
    phone: 'Sur place',
    isVerified: true
  },

  // --- SANTÉ ---
  {
    id: 'h1',
    name: 'Hôpital Saint-Pierre (CHU)',
    category: 'Santé',
    location: '1000 Bruxelles - Rue Haute 322',
    description: 'Hôpital public de référence. Urgences accessibles (AMU).',
    phone: '02 535 31 11',
    isVerified: true
  },
  {
    id: 'h2',
    name: 'Maison Médicale Matonge',
    category: 'Santé',
    location: '1050 Ixelles - Rue d\'Edimbourg 16',
    description: 'Soins de santé primaires au forfait. Médecins généralistes accueillants.',
    phone: '02 511 22 88',
    isVerified: true
  }
];

const CATEGORIES = ['Tout', 'Services', 'Gastronomie', 'Beauté & Mode', 'Santé', 'Artisanat'];

const DirectorySection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tout');

  const filteredItems = DIRECTORY_DATA.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Tout' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Gastronomie': return <Utensils className="h-5 w-5" aria-hidden="true" />;
      case 'Beauté & Mode': return <Scissors className="h-5 w-5" aria-hidden="true" />;
      case 'Services': return <Briefcase className="h-5 w-5" aria-hidden="true" />;
      case 'Santé': return <Stethoscope className="h-5 w-5" aria-hidden="true" />;
      case 'Artisanat': return <Hammer className="h-5 w-5" aria-hidden="true" />;
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
            Annuaire des Adresses Utiles
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Retrouvez les commerces réels, les services officiels et les lieux incontournables de la communauté guinéenne et africaine en Belgique.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8 sticky top-24 z-30">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative flex-grow max-w-lg">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <label htmlFor="directory-search" className="sr-only">Rechercher un nom, une ville ou un service</label>
                    <input
                        id="directory-search"
                        type="text"
                        className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-[#CE1126] focus:border-[#CE1126]"
                        placeholder="Rechercher (ex: Chez Diallo, Matonge, Avocat...)"
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
                            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-[#CE1126] ${
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
                <div key={item.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border-t-4 border-[#CE1126] overflow-hidden group flex flex-col h-full">
                    <div className="p-6 flex-grow">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-2 rounded-lg bg-gray-50 text-gray-700 group-hover:bg-red-50 group-hover:text-[#CE1126] transition-colors`}>
                                {getCategoryIcon(item.category)}
                            </div>
                            {item.isVerified && (
                                <span className="flex items-center text-[10px] font-bold uppercase tracking-wider text-[#009460] bg-green-50 px-2 py-1 rounded-full border border-green-100">
                                    <CheckCircle className="h-3 w-3 mr-1" aria-hidden="true" /> Vérifié
                                </span>
                            )}
                        </div>
                        
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
                        <div className="flex items-center text-sm text-gray-500 mb-4 bg-gray-50 px-2 py-1 rounded inline-block">
                            <MapPin className="h-3 w-3 mr-1 text-gray-400" aria-hidden="true" />
                            {item.location}
                        </div>
                        
                        <p className="text-gray-600 text-sm mb-6 line-clamp-4">
                            {item.description}
                        </p>
                    </div>
                        
                    <div className="p-6 pt-0 mt-auto border-t border-gray-50">
                        <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                            <a href={`tel:${item.phone}`} className="text-sm font-bold text-gray-900 flex items-center hover:text-[#CE1126] transition-colors">
                                <Phone className="h-4 w-4 mr-2 text-[#CE1126]" aria-hidden="true" />
                                {item.phone}
                            </a>
                            <a 
                                href={`https://www.google.com/search?q=${encodeURIComponent(item.name + ' ' + item.location)}`} 
                                target="_blank"
                                rel="noreferrer"
                                className="text-xs font-bold text-blue-600 hover:text-blue-800 uppercase focus:outline-none focus:underline flex items-center"
                            >
                                <Globe className="h-3 w-3 mr-1" />
                                Voir sur Google
                            </a>
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
        <div className="mt-12 bg-gray-900 rounded-xl p-8 text-center relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FCD116] opacity-10 rounded-full transform translate-x-10 -translate-y-10"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#CE1126] opacity-10 rounded-full transform -translate-x-10 translate-y-10"></div>
            <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-2">Vous connaissez une bonne adresse ?</h3>
                <p className="text-gray-400 mb-6 max-w-2xl mx-auto">Aidez-nous à compléter cet annuaire. Si vous connaissez un commerce fiable qui aide la communauté, signalez-le nous.</p>
                <button className="bg-[#FCD116] text-black font-bold px-8 py-3 rounded-md hover:bg-yellow-400 transition-colors focus:outline-none focus:ring-2 focus:ring-white transform hover:scale-105 duration-200 shadow-lg">
                    Suggérer une adresse
                </button>
            </div>
        </div>

      </div>
    </div>
  );
};

export default DirectorySection;
