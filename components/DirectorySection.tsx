
import React, { useState } from 'react';
import { Search, MapPin, Phone, CheckCircle, Store, Briefcase, Scissors, Utensils, Stethoscope, Hammer, Globe, Filter, Star, ExternalLink } from 'lucide-react';
import { DirectoryItem, LanguageCode } from '../types';
import { translations } from '../utils/translations';

interface DirectorySectionProps {
  language: LanguageCode;
}

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
  {
    id: 's7',
    name: 'Tabital Pulaaku International',
    category: 'Services',
    location: 'Bruxelles / Global',
    description: 'Association internationale pour la promotion de la culture Peule (Pulaaku) et la solidarité.',
    website: 'https://www.tabitalpulaaku.org/',
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

const DirectorySection: React.FC<DirectorySectionProps> = ({ language }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tout');
  const t = translations[language];

  const filteredItems = DIRECTORY_DATA.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Tout' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Gastronomie': return <Utensils className="h-6 w-6" aria-hidden="true" />;
      case 'Beauté & Mode': return <Scissors className="h-6 w-6" aria-hidden="true" />;
      case 'Services': return <Briefcase className="h-6 w-6" aria-hidden="true" />;
      case 'Santé': return <Stethoscope className="h-6 w-6" aria-hidden="true" />;
      case 'Artisanat': return <Hammer className="h-6 w-6" aria-hidden="true" />;
      default: return <Store className="h-6 w-6" aria-hidden="true" />;
    }
  };

  const getBorderColor = (index: number) => {
      const colors = ['border-t-[#CE1126]', 'border-t-[#FCD116]', 'border-t-[#009460]'];
      return colors[index % 3];
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
        case 'Gastronomie': return 'bg-orange-100 text-orange-700';
        case 'Beauté & Mode': return 'bg-pink-100 text-pink-700';
        case 'Services': return 'bg-blue-100 text-blue-700';
        case 'Santé': return 'bg-green-100 text-green-700';
        case 'Artisanat': return 'bg-purple-100 text-purple-700';
        default: return 'bg-gray-100 text-gray-700';
      }
  };

  return (
    <div className="min-h-screen py-16 bg-[#FFFBF0] relative" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="absolute top-0 left-0 w-full h-64 bg-african-pattern opacity-40 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12">
          {/* H1 SEO Optimization */}
          <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">
            <span className="relative inline-block">
                {t.dir_title}
                <span className="absolute -bottom-2 left-0 w-full h-3 bg-[#FCD116] opacity-60 skew-x-12 transform"></span>
            </span> 
            <span className="ml-2 guinea-gradient-text">Guinée-Benelux</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-gray-700 font-medium">
            {t.dir_subtitle}
          </p>
        </div>

        {/* Search & Filters Panel */}
        <div className="bg-white p-6 rounded-3xl shadow-xl border border-orange-100 mb-10 sticky top-24 z-30 card-hover-effect">
            <div className="flex flex-col lg:flex-row gap-6">
                
                {/* Search Input */}
                <div className="relative flex-grow max-w-xl">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <label htmlFor="directory-search" className="sr-only">Rechercher</label>
                    <input
                        id="directory-search"
                        type="text"
                        className="block w-full pl-11 pr-4 py-4 border-2 border-gray-100 rounded-2xl bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#CE1126] focus:border-transparent focus:bg-white transition-all font-medium text-lg"
                        placeholder={t.dir_search_placeholder}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                
                {/* Category Pills */}
                <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filtrer par catégorie">
                    <div className="hidden lg:flex items-center text-gray-400 mr-2">
                        <Filter className="h-4 w-4 mr-1" />
                        <span className="text-xs font-bold uppercase tracking-wider">{t.dir_filters}</span>
                    </div>
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            aria-pressed={selectedCategory === cat}
                            className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#CE1126] ${
                                selectedCategory === cat 
                                ? 'bg-slate-900 text-white shadow-lg' 
                                : 'bg-white border border-gray-200 text-gray-600 hover:bg-orange-50 hover:border-orange-200 hover:text-[#CE1126]'
                            }`}
                        >
                            {cat === 'Tout' ? t.dir_filter_all : cat}
                        </button>
                    ))}
                </div>
            </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item, index) => (
                <div key={item.id} className={`bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border-t-8 ${getBorderColor(index)} overflow-hidden group flex flex-col h-full relative`}>
                    
                    {/* Pattern Overlay in background */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-wax-pattern opacity-5 rounded-bl-full pointer-events-none transition-opacity group-hover:opacity-10"></div>

                    {/* Badge VÉRIFIÉ Style Tampon */}
                    {item.isVerified && (
                        <div className="absolute top-4 right-4 z-10 transform rotate-12 group-hover:rotate-0 transition-transform duration-300">
                            <div className="border-2 border-[#009460] text-[#009460] px-3 py-1 rounded-lg font-black uppercase tracking-widest text-[10px] bg-white/80 backdrop-blur-sm shadow-sm opacity-90 mix-blend-multiply flex items-center gap-1">
                                <CheckCircle className="h-3 w-3" />
                                {t.dir_verified}
                            </div>
                        </div>
                    )}

                    <div className="p-7 flex-grow">
                        <div className="flex justify-between items-start mb-5">
                            <div className={`p-4 rounded-2xl ${getCategoryColor(item.category)} shadow-sm`}>
                                {getCategoryIcon(item.category)}
                            </div>
                        </div>
                        
                        <h3 className="text-xl font-black text-slate-900 mb-2 leading-tight group-hover:text-[#CE1126] transition-colors">
                            {item.name}
                        </h3>
                        
                        <div className="flex items-start text-sm text-gray-500 mb-5">
                            <MapPin className="h-4 w-4 mr-1.5 mt-0.5 text-red-500 flex-shrink-0" aria-hidden="true" />
                            <span className="font-medium leading-snug">{item.location}</span>
                        </div>
                        
                        <p className="text-gray-600 text-sm leading-relaxed font-medium bg-orange-50/50 p-4 rounded-xl border border-orange-100/50">
                            {item.description}
                        </p>
                    </div>
                        
                    <div className="px-7 py-5 bg-gray-50/50 mt-auto border-t border-gray-100">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                            {item.phone ? (
                                <a href={`tel:${item.phone}`} className="inline-flex items-center text-sm font-black text-slate-900 bg-white px-4 py-3 rounded-xl border border-gray-200 hover:border-[#CE1126] hover:text-[#CE1126] transition-colors shadow-sm w-full sm:w-auto justify-center hover:shadow-md">
                                    <Phone className="h-4 w-4 mr-2" aria-hidden="true" />
                                    {item.phone}
                                </a>
                            ) : item.website ? (
                                <a href={item.website} target="_blank" rel="noreferrer" className="inline-flex items-center text-sm font-black text-white bg-slate-900 px-4 py-3 rounded-xl border border-transparent hover:bg-[#CE1126] transition-colors shadow-sm w-full sm:w-auto justify-center hover:shadow-md">
                                    <Globe className="h-4 w-4 mr-2" aria-hidden="true" />
                                    {t.dir_visit_site}
                                </a>
                            ) : null}

                            <div className="flex items-center gap-3 ml-auto sm:ml-0">
                                {item.website && item.phone && (
                                    <a 
                                        href={item.website} 
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center text-xs font-bold text-gray-500 hover:text-blue-600 uppercase tracking-wide group/link transition-colors"
                                    >
                                        <ExternalLink className="h-3 w-3 mr-1.5 group-hover/link:animate-bounce" />
                                        Site
                                    </a>
                                )}
                                <a 
                                    href={`https://www.google.com/search?q=${encodeURIComponent(item.name + ' ' + item.location)}`} 
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center text-xs font-bold text-gray-500 hover:text-blue-600 uppercase tracking-wide group/link transition-colors"
                                >
                                    <Globe className="h-3 w-3 mr-1.5 group-hover/link:animate-spin-slow" />
                                    {t.dir_map}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        {filteredItems.length === 0 && (
            <div className="text-center py-20 bg-white rounded-3xl shadow-sm border-2 border-dashed border-gray-200" role="status">
                <div className="bg-gray-50 p-4 rounded-full inline-block mb-4">
                    <Search className="h-8 w-8 text-gray-300" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{t.dir_empty_title}</h3>
                <p className="text-gray-500 max-w-md mx-auto mb-6">{t.dir_empty_desc}</p>
                <button 
                    onClick={() => {setSearchTerm(''); setSelectedCategory('Tout')}}
                    className="text-white bg-[#CE1126] font-bold px-6 py-3 rounded-xl shadow-lg shadow-red-100 hover:bg-red-700 transition-colors"
                >
                    {t.dir_reset_btn}
                </button>
            </div>
        )}

        {/* Call to Action - Banner Style */}
        <div className="mt-20 bg-slate-900 rounded-[2rem] p-8 md:p-12 text-center relative overflow-hidden shadow-2xl border-b-8 border-[#FCD116]">
            {/* Pattern Overlay */}
            <div className="absolute inset-0 bg-wax-pattern opacity-5 mix-blend-overlay"></div>
            
            {/* Decorative Blobs */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FCD116] opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#CE1126] opacity-10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-left">
                <div className="md:w-2/3">
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-[#FCD116] text-xs font-bold uppercase tracking-widest mb-4 border border-white/10">
                        <Star className="h-3 w-3 mr-2 fill-current" />
                        Contribution
                    </div>
                    <h3 className="text-3xl font-black text-white mb-3 tracking-tight">{t.dir_contrib_title}</h3>
                    <p className="text-slate-300 text-lg font-medium leading-relaxed">
                        {t.dir_contrib_desc}
                    </p>
                </div>
                <div className="md:w-1/3 flex justify-center md:justify-end">
                    <button className="bg-[#FCD116] text-slate-900 font-black px-8 py-4 rounded-xl hover:bg-[#ffe14d] transition-all transform hover:scale-105 hover:rotate-1 shadow-lg shadow-yellow-400/20 focus:outline-none focus:ring-4 focus:ring-yellow-400/50 flex items-center">
                        <Store className="mr-2 h-5 w-5" />
                        {t.dir_suggest_btn}
                    </button>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default DirectorySection;
