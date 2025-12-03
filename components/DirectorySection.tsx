
import React, { useState, useMemo, useEffect } from 'react';
import { Search, MapPin, Store, Briefcase, Scissors, Utensils, Stethoscope, Hammer, ExternalLink, Star, Info } from 'lucide-react';
import { LanguageCode } from '../types';
import { translations } from '../utils/translations';

interface DirectorySectionProps {
  language: LanguageCode;
}

// --- TYPE DEFINITIONS SECURE ---
// Suppression des champs 'phone' pour conformité RGPD.
// Les données personnelles ne doivent pas être stockées en dur.
interface SafeDirectoryItem {
  id: string;
  name: string;
  category: string;
  location: string;
  description: string;
  website?: string;
  isVerified: boolean;
}

// --- CONFIGURATION CENTRALISÉE (DRY) ---
const CATEGORY_CONFIG: Record<string, { icon: React.ElementType, colorBg: string, colorText: string, translationKey: string }> = {
  gastronomy: { icon: Utensils, colorBg: 'bg-orange-100', colorText: 'text-orange-700', translationKey: 'dir_cat_gastronomy' },
  beauty: { icon: Scissors, colorBg: 'bg-pink-100', colorText: 'text-pink-700', translationKey: 'dir_cat_beauty' },
  services: { icon: Briefcase, colorBg: 'bg-blue-100', colorText: 'text-blue-700', translationKey: 'dir_cat_services' },
  health: { icon: Stethoscope, colorBg: 'bg-green-100', colorText: 'text-green-700', translationKey: 'dir_cat_health' },
  crafts: { icon: Hammer, colorBg: 'bg-purple-100', colorText: 'text-purple-700', translationKey: 'dir_cat_artisanat' },
  default: { icon: Store, colorBg: 'bg-gray-100', colorText: 'text-gray-700', translationKey: 'dir_filter_all' }
};

// --- DONNÉES SANITIZÉES (RGPD COMPLIANT) ---
// Plus de numéros de téléphone personnels. Liens uniquement vers des entités publiques ou recherche web.
const DIRECTORY_DATA: SafeDirectoryItem[] = [
  // GASTRONOMIE
  { id: 'g1', name: 'Télé Jazz Restaurant', category: 'gastronomy', location: '1000 Bruxelles', description: 'Restaurant Guinéen très populaire. Un incontournable.', isVerified: true },
  { id: 'g2', name: 'Le Sankaran', category: 'gastronomy', location: '1000 Bruxelles', description: 'Restaurant Africain apprécié pour sa bonne ambiance.', isVerified: true },
  { id: 'g3', name: 'Restaurant La Villa Bantou', category: 'gastronomy', location: '1020 Laeken', description: 'Traiteur et restaurant réputé.', isVerified: true },
  { id: 'g4', name: 'Chez Maman', category: 'gastronomy', location: '1000 Bruxelles', description: 'Ambiance familiale et chaleureuse.', isVerified: true },
  { id: 'g5', name: 'Le Soleil d\'Afrique', category: 'gastronomy', location: '1050 Ixelles (Matonge)', description: 'Institution légendaire. Mafé, Yassa, Tiep.', isVerified: true },
  
  // BEAUTÉ
  { id: 'b1', name: 'Les Ateliers Zarragga', category: 'beauty', location: '1030 Schaerbeek', description: 'Salon de coiffure Afro et tresses spécialisé.', isVerified: true },
  { id: 'b2', name: 'Salon Aminata', category: 'beauty', location: '1030 Schaerbeek', description: 'Coiffure Afro dames et tresses.', isVerified: true },
  { id: 'b6', name: 'Galerie d\'Ixelles', category: 'beauty', location: '1050 Ixelles (Matonge)', description: 'Le cœur de la beauté afro. Nombreux salons.', isVerified: true },

  // SERVICES & ASSO
  { id: 's1', name: 'Progress Lawyers Network', category: 'services', location: '1210 Saint-Josse', description: 'Avocats experts en droit des étrangers.', website: 'https://progress-law.net', isVerified: true },
  { id: 's2', name: 'MRAX', category: 'services', location: '1000 Bruxelles', description: 'Mouvement contre le Racisme.', website: 'https://mrax.be', isVerified: true },
  { id: 's3', name: 'Sireas ASBL', category: 'services', location: '1060 Saint-Gilles', description: 'Service social pour les immigrés.', website: 'https://sireas.be', isVerified: true },
  { id: 's7', name: 'Tabital Pulaaku Int.', category: 'services', location: 'Bruxelles / Global', description: 'Promotion de la culture Peule.', website: 'https://www.tabitalpulaaku.org/', isVerified: true },

  // SANTÉ
  { id: 'h1', name: 'Hôpital Saint-Pierre (CHU)', category: 'health', location: '1000 Bruxelles', description: 'Hôpital public de référence (AMU).', website: 'https://www.stpierre-bru.be', isVerified: true },
  { id: 'h2', name: 'Maison Médicale Matonge', category: 'health', location: '1050 Ixelles', description: 'Soins de santé primaires au forfait.', isVerified: true }
];

const CATEGORY_KEYS = ['all', 'services', 'gastronomy', 'beauty', 'health', 'crafts'];

// --- CUSTOM HOOK: DEBOUNCE ---
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => { setDebouncedValue(value); }, delay);
    return () => { clearTimeout(handler); };
  }, [value, delay]);
  return debouncedValue;
}

const DirectorySection: React.FC<DirectorySectionProps> = ({ language }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoryKey, setSelectedCategoryKey] = useState('all');
  const debouncedSearchTerm = useDebounce(searchTerm, 300); // 300ms debounce
  const t = translations[language];

  // --- MEMOIZED FILTERING (PERF P2) ---
  const filteredItems = useMemo(() => {
    return DIRECTORY_DATA.filter(item => {
      const matchesSearch = 
        item.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) || 
        item.location.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
      const matchesCategory = selectedCategoryKey === 'all' || item.category === selectedCategoryKey;
      return matchesSearch && matchesCategory;
    });
  }, [debouncedSearchTerm, selectedCategoryKey]);

  // --- HELPER FUNCTIONS ---
  const getCategoryConfig = (key: string) => CATEGORY_CONFIG[key] || CATEGORY_CONFIG.default;
  
  const getCategoryLabel = (key: string) => {
    const config = getCategoryConfig(key);
    // Use dynamic access safely, fallback to key if translation missing
    return (t as any)[config.translationKey] || key;
  };

  const generateGoogleSearchUrl = (name: string, location: string) => {
    return `https://www.google.com/search?q=${encodeURIComponent(`${name} ${location} contact`)}`;
  };

  return (
    <div className="min-h-screen py-16 bg-[#FFFBF0] relative" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Background Pattern */}
      <div className="absolute top-0 left-0 w-full h-64 bg-african-pattern opacity-40 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Sémantique */}
        <header className="text-center mb-12">
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
          
          {/* RGPD Disclaimer */}
          <div className="mt-4 flex items-center justify-center text-xs text-gray-400 max-w-lg mx-auto bg-white/50 p-2 rounded-lg">
             <Info className="h-3 w-3 mr-2" />
             <span>Données publiques uniquement. Aucune donnée personnelle stockée.</span>
          </div>
        </header>

        {/* Barre de Recherche & Filtres */}
        <div className="bg-white p-6 rounded-3xl shadow-xl border border-orange-100 mb-10 sticky top-4 z-30 transition-all duration-300">
            <div className="flex flex-col lg:flex-row gap-6">
                
                {/* Search Input */}
                <div className="relative flex-grow max-w-xl">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <label htmlFor="directory-search" className="sr-only">{t.dir_search_placeholder}</label>
                    <input
                        id="directory-search"
                        type="text"
                        className="block w-full pl-11 pr-4 py-4 border-2 border-gray-100 rounded-2xl bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#CE1126] focus:border-transparent focus:bg-white transition-all font-medium text-lg"
                        placeholder={t.dir_search_placeholder}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        aria-controls="directory-grid"
                    />
                </div>
                
                {/* Accessible Filter Tabs */}
                <div 
                    role="tablist" 
                    aria-label="Filtrer par catégorie" 
                    className="flex flex-wrap items-center gap-2"
                >
                    {CATEGORY_KEYS.map(catKey => {
                        const isSelected = selectedCategoryKey === catKey;
                        return (
                            <button
                                key={catKey}
                                role="tab"
                                aria-selected={isSelected}
                                aria-controls="directory-grid"
                                onClick={() => setSelectedCategoryKey(catKey)}
                                className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#CE1126] ${
                                    isSelected 
                                    ? 'bg-slate-900 text-white shadow-lg' 
                                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-orange-50 hover:border-orange-200 hover:text-[#CE1126]'
                                }`}
                            >
                                {getCategoryLabel(catKey)}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>

        {/* Grid de Résultats Sémantique */}
        <section 
            id="directory-grid"
            aria-live="polite"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
            {filteredItems.map((item) => {
                const config = getCategoryConfig(item.category);
                const Icon = config.icon;

                return (
                    <article 
                        key={item.id} 
                        className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group flex flex-col h-full relative"
                    >
                        {/* Pattern Overlay */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-wax-pattern opacity-5 rounded-bl-full pointer-events-none transition-opacity group-hover:opacity-10"></div>

                        <div className="p-7 flex-grow">
                            <div className="flex justify-between items-start mb-5">
                                <div className={`p-4 rounded-2xl ${config.colorBg} ${config.colorText} shadow-sm`}>
                                    <Icon className="h-6 w-6" aria-hidden="true" />
                                </div>
                                {item.isVerified && (
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200" title={t.dir_verified}>
                                        <Star className="h-3 w-3 mr-1 fill-current" />
                                        Vérifié
                                    </span>
                                )}
                            </div>
                            
                            <h3 className="text-xl font-black text-slate-900 mb-2 leading-tight group-hover:text-[#CE1126] transition-colors">
                                {item.name}
                            </h3>
                            
                            <div className="flex items-start text-sm text-gray-500 mb-5">
                                <MapPin className="h-4 w-4 mr-1.5 mt-0.5 text-red-500 flex-shrink-0" aria-hidden="true" />
                                <span className="font-medium leading-snug">{item.location}</span>
                            </div>
                            
                            <p className="text-gray-600 text-sm leading-relaxed font-medium bg-gray-50 p-4 rounded-xl">
                                {item.description}
                            </p>
                        </div>
                            
                        {/* Actions Sécurisées */}
                        <div className="px-7 py-5 bg-gray-50/50 mt-auto border-t border-gray-100">
                            <div className="flex gap-3">
                                {item.website ? (
                                    <a 
                                        href={item.website} 
                                        target="_blank" 
                                        rel="noopener noreferrer nofollow"
                                        className="flex-1 inline-flex items-center justify-center text-sm font-bold text-white bg-slate-900 px-4 py-3 rounded-xl hover:bg-[#CE1126] transition-colors shadow-sm"
                                    >
                                        <ExternalLink className="h-4 w-4 mr-2" />
                                        {t.dir_visit_site}
                                    </a>
                                ) : (
                                    // Fallback sécurisé : Recherche Google au lieu de donner un numéro perso
                                    <a 
                                        href={generateGoogleSearchUrl(item.name, item.location)}
                                        target="_blank" 
                                        rel="noopener noreferrer nofollow"
                                        className="flex-1 inline-flex items-center justify-center text-sm font-bold text-gray-700 bg-white border border-gray-200 px-4 py-3 rounded-xl hover:border-[#CE1126] hover:text-[#CE1126] transition-colors shadow-sm"
                                        title="Rechercher les coordonnées publiques sur Google"
                                    >
                                        <Search className="h-4 w-4 mr-2" />
                                        Trouver contact
                                    </a>
                                )}
                            </div>
                        </div>
                    </article>
                );
            })}
        </section>

        {filteredItems.length === 0 && (
            <div className="text-center py-20 bg-white rounded-3xl shadow-sm border-2 border-dashed border-gray-200 mt-8" role="status">
                <div className="bg-gray-50 p-4 rounded-full inline-block mb-4">
                    <Search className="h-8 w-8 text-gray-300" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{t.dir_empty_title}</h3>
                <p className="text-gray-500 max-w-md mx-auto mb-6">{t.dir_empty_desc}</p>
                <button 
                    onClick={() => {setSearchTerm(''); setSelectedCategoryKey('all')}}
                    className="text-white bg-[#CE1126] font-bold px-6 py-3 rounded-xl shadow-lg shadow-red-100 hover:bg-red-700 transition-colors focus:outline-none focus:ring-4 focus:ring-red-200"
                >
                    {t.dir_reset_btn}
                </button>
            </div>
        )}

        {/* Call to Action Contribution */}
        <section className="mt-20 bg-slate-900 rounded-[2rem] p-8 md:p-12 text-center relative overflow-hidden shadow-2xl border-b-8 border-[#FCD116]">
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-left">
                <div className="md:w-2/3">
                    <h3 className="text-3xl font-black text-white mb-3 tracking-tight">{t.dir_contrib_title}</h3>
                    <p className="text-slate-300 text-lg font-medium leading-relaxed">
                        {t.dir_contrib_desc}
                    </p>
                </div>
                <div className="md:w-1/3 flex justify-center md:justify-end">
                    <a 
                        href={`mailto:Admin@ballal.be?subject=Suggestion Annuaire Ballal`}
                        className="bg-[#FCD116] text-slate-900 font-black px-8 py-4 rounded-xl hover:bg-[#ffe14d] transition-all transform hover:scale-105 shadow-lg flex items-center"
                    >
                        <Store className="mr-2 h-5 w-5" />
                        {t.dir_suggest_btn}
                    </a>
                </div>
            </div>
        </section>

      </div>
    </div>
  );
};

export default DirectorySection;
