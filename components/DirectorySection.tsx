import React, { useState } from 'react';
import { 
  Search, MapPin, Phone, Mail, Globe, Filter, Building, 
  Utensils, Gavel, Stethoscope, Heart, Briefcase, ChevronRight,
  ExternalLink
} from 'lucide-react';

interface DirectoryItem {
  id: string;
  name: string;
  category: 'association' | 'business' | 'restaurant' | 'legal' | 'health' | 'other';
  description: string;
  address: string;
  city: string;
  phone?: string;
  email?: string;
  website?: string;
  image?: string;
}

const DirectorySection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const directoryItems: DirectoryItem[] = [
    {
      id: '1',
      name: "Association des Guinéens de Belgique",
      category: 'association',
      description: "Organisation fédératrice pour l'entraide et la culture guinéenne.",
      address: "Rue de la Loi 15",
      city: "Bruxelles",
      phone: "+32 2 123 45 67",
      email: "contact@agb.be",
      image: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: '2',
      name: "Saveurs de Conakry",
      category: 'restaurant',
      description: "Restaurant authentique proposant les meilleures spécialités guinéennes.",
      address: "Chaussée de Gand 234",
      city: "Molenbeek",
      phone: "+32 4 987 65 43",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: '3',
      name: "Cabinet Diallo & Associés",
      category: 'legal',
      description: "Avocats spécialisés en droit des étrangers et droit de la famille.",
      address: "Avenue Louise 400",
      city: "Bruxelles",
      phone: "+32 2 555 11 22",
      email: "info@cabinet-diallo.be",
      image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: '4',
      name: "Dr. Bah - Généraliste",
      category: 'health',
      description: "Médecin généraliste conventionné, consultation sur rendez-vous.",
      address: "Rue des Palais 45",
      city: "Schaerbeek",
      phone: "+32 2 333 44 55",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: '5',
      name: "Guinée Fret Express",
      category: 'business',
      description: "Service d'envoi de colis et marchandises vers la Guinée.",
      address: "Quai des Usines 12",
      city: "Bruxelles",
      phone: "+32 488 99 00 11",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: '6',
      name: "Collectif des Femmes Guinéennes",
      category: 'association',
      description: "Soutien, émancipation et entrepreneuriat féminin.",
      address: "Rue du Méridien 10",
      city: "Saint-Josse",
      email: "femmes@guinee-be.org",
      image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=800&auto=format&fit=crop"
    }
  ];

  const categories = [
    { id: 'all', label: 'Tout', icon: Globe },
    { id: 'association', label: 'Associations', icon: Heart },
    { id: 'business', label: 'Entreprises', icon: Briefcase },
    { id: 'restaurant', label: 'Restaurants', icon: Utensils },
    { id: 'legal', label: 'Juridique', icon: Gavel },
    { id: 'health', label: 'Santé', icon: Stethoscope },
  ];

  const filteredItems = directoryItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.city.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryColor = (cat: string) => {
    switch(cat) {
      case 'association': return 'bg-red-100 text-red-600';
      case 'business': return 'bg-blue-100 text-blue-600';
      case 'restaurant': return 'bg-orange-100 text-orange-600';
      case 'legal': return 'bg-purple-100 text-purple-600';
      case 'health': return 'bg-green-100 text-green-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getCategoryLabel = (cat: string) => {
    return categories.find(c => c.id === cat)?.label || cat;
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-4 bg-white rounded-full shadow-lg mb-6">
            <Building className="h-10 w-10 text-[#CE1126]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
            Annuaire de la <span className="text-[#009460]">Communauté</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Retrouvez les acteurs clés, les commerces et les associations de la diaspora guinéenne en Belgique.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="bg-white rounded-3xl shadow-lg p-6 mb-12 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un nom, une activité, une ville..."
                className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-100 focus:border-[#CE1126] focus:ring-2 focus:ring-[#CE1126]/20 outline-none transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {/* Categories (Desktop) */}
            <div className="hidden md:flex gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-3 rounded-xl font-medium transition-all flex items-center gap-2 ${
                    selectedCategory === cat.id
                      ? 'bg-slate-900 text-white shadow-md'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <cat.icon className="h-4 w-4" />
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Categories (Mobile Scroll) */}
          <div className="md:hidden flex overflow-x-auto gap-2 mt-4 pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
                  selectedCategory === cat.id
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                <cat.icon className="h-4 w-4" />
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Directory Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div 
              key={item.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group hover:-translate-y-1"
            >
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getCategoryColor(item.category)}`}>
                    {getCategoryLabel(item.category)}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-[#CE1126] transition-colors">
                  {item.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {item.description}
                </p>
                
                <div className="space-y-3 pt-4 border-t border-gray-50">
                  <div className="flex items-start gap-3 text-sm text-gray-600">
                    <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    <span>{item.address}, {item.city}</span>
                  </div>
                  
                  {item.phone && (
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <Phone className="h-4 w-4 text-gray-400 flex-shrink-0" />
                      <a href={`tel:${item.phone}`} className="hover:text-[#CE1126]">{item.phone}</a>
                    </div>
                  )}
                  
                  {item.email && (
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <Mail className="h-4 w-4 text-gray-400 flex-shrink-0" />
                      <a href={`mailto:${item.email}`} className="hover:text-[#CE1126] truncate">{item.email}</a>
                    </div>
                  )}
                </div>

                <div className="mt-6">
                  <button className="w-full py-3 rounded-xl bg-gray-50 text-slate-900 font-bold hover:bg-[#FCD116] hover:text-slate-900 transition-colors flex items-center justify-center gap-2 group/btn">
                    Voir la fiche
                    <ChevronRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center p-6 bg-gray-50 rounded-full mb-6">
              <Search className="h-10 w-10 text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Aucun résultat trouvé</h3>
            <p className="text-gray-500">Essayez d'autres mots-clés ou changez de catégorie.</p>
            <button 
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="mt-6 text-[#CE1126] font-bold hover:underline"
            >
              Réinitialiser la recherche
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default DirectorySection;