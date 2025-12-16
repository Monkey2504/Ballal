import React, { useState, useEffect, useRef } from 'react';
import { 
  Newspaper, Calendar, Clock, MapPin, User, Tag, ChevronRight, 
  ExternalLink, Share2, Heart, Bookmark, Filter, Search, 
  TrendingUp, Eye, MessageCircle, ArrowRight, Sparkles
} from 'lucide-react';
import { translations } from '../utils/translations.ts';

interface NewsSectionProps {
    language?: string;
}

interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'event' | 'announcement' | 'success' | 'partner' | 'community';
  author: string;
  date: string;
  readTime: string;
  location?: string;
  imageUrl: string;
  likes: number;
  views: number;
  comments: number;
  featured: boolean;
  tags: string[];
}

const NewsSection: React.FC<NewsSectionProps> = ({ language = 'fr' }) => {
  const t = translations[language] || translations['fr'];
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarkedArticles, setBookmarkedArticles] = useState<string[]>([]);
  const [likedArticles, setLikedArticles] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sample data (conserved)
  const articles: NewsArticle[] = [
    {
      id: '1',
      title: 'Festival des Sans-Papiers 2024 : Inscriptions ouvertes !',
      excerpt: 'La 2e édition du Festival des Sans-Papiers aura lieu du 15 au 17 juin 2024 à Bruxelles. Inscrivez-vous dès maintenant.',
      content: 'La deuxième édition du Festival des Sans-Papiers promet d\'être encore plus grande et impactante que la première. Au programme : concerts, tables rondes, projections de films et ateliers participatifs.',
      category: 'event',
      author: 'Équipe Ballal',
      date: '15 Mars 2024',
      readTime: '3 min',
      location: 'Bruxelles, Belgique',
      imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1600&auto=format&fit=crop',
      likes: 142,
      views: 856,
      comments: 23,
      featured: true,
      tags: ['festival', 'culture', 'solidarité', 'événement']
    },
    {
      id: '2',
      title: 'Nouveau Partenaire : La Ferme Bio du Hainaut',
      excerpt: 'Nous sommes heureux d\'annoncer notre nouveau partenariat avec la Ferme Bio du Hainaut pour notre projet d\'autonomie alimentaire.',
      content: 'Ce partenariat nous permettra de récupérer les surplus de production et de les redistribuer dans notre réseau solidaire. Une avancée majeure pour notre projet alimentaire.',
      category: 'partner',
      author: 'Mamadou Diallo',
      date: '10 Mars 2024',
      readTime: '2 min',
      location: 'Mons, Hainaut',
      imageUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=1600&auto=format&fit=crop',
      likes: 89,
      views: 423,
      comments: 12,
      featured: true,
      tags: ['partenariat', 'alimentation', 'bio', 'agriculture']
    },
    {
      id: '3',
      title: 'Atelier de Formation Juridique : Comprendre vos droits',
      excerpt: 'Notre prochain atelier de formation juridique aura lieu le 25 mars. Places limitées, inscrivez-vous vite !',
      content: 'Cet atelier gratuit vous permettra de mieux comprendre vos droits face aux administrations et aux forces de l\'ordre. Animé par des avocats partenaires.',
      category: 'event',
      author: 'Service Juridique',
      date: '5 Mars 2024',
      readTime: '4 min',
      location: 'Centre Ballal, Molenbeek',
      imageUrl: 'https://images.unsplash.com/photo-1589391886085-8b6b0ac72a1a?q=80&w=1600&auto=format&fit=crop',
      likes: 76,
      views: 312,
      comments: 8,
      featured: false,
      tags: ['formation', 'droit', 'atelier', 'gratuit']
    },
    {
      id: '4',
      title: 'Succès : 1000 repas distribués ce mois-ci',
      excerpt: 'Notre réseau d\'aide alimentaire a atteint un nouveau record avec 1000 repas distribués en un seul mois.',
      content: 'Grâce à l\'engagement de nos bénévoles et de nos partenaires, nous avons pu aider encore plus de personnes cette année. Un grand merci à tous !',
      category: 'success',
      author: 'Équipe Alimentaire',
      date: '28 Février 2024',
      readTime: '2 min',
      imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1600&auto=format&fit=crop',
      likes: 154,
      views: 567,
      comments: 18,
      featured: false,
      tags: ['succès', 'alimentation', 'solidarité', 'record']
    },
    {
      id: '5',
      title: 'Nouveau Groupe de Parole pour les Femmes',
      excerpt: 'Nous lançons un nouveau groupe de parole dédié aux femmes de la communauté. Première séance le 30 mars.',
      content: 'Un espace sécurisé pour échanger, partager et s\'entraider. Animé par une psychologue bénévole.',
      category: 'community',
      author: 'Service Social',
      date: '20 Février 2024',
      readTime: '3 min',
      location: 'Local Associatif',
      imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1600&auto=format&fit=crop',
      likes: 92,
      views: 289,
      comments: 15,
      featured: false,
      tags: ['communauté', 'femmes', 'soutien', 'parole']
    },
    {
      id: '6',
      title: 'Rapport Annuel 2023 Disponible',
      excerpt: 'Notre rapport d\'activités 2023 est maintenant disponible en téléchargement.',
      content: 'Découvrez toutes nos actions, nos réussites et nos projets pour l\'avenir dans notre rapport annuel complet.',
      category: 'announcement',
      author: 'Direction',
      date: '15 Février 2024',
      readTime: '5 min',
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop',
      likes: 67,
      views: 198,
      comments: 6,
      featured: false,
      tags: ['rapport', 'transparence', 'bilan', '2023']
    }
  ];

  const categories = [
    { id: 'all', label: t.news_filter_all || 'Tout', count: articles.length },
    { id: 'event', label: 'Événements', count: articles.filter(a => a.category === 'event').length },
    { id: 'announcement', label: 'Annonces', count: articles.filter(a => a.category === 'announcement').length },
    { id: 'success', label: 'Succès', count: articles.filter(a => a.category === 'success').length },
    { id: 'partner', label: 'Partenariats', count: articles.filter(a => a.category === 'partner').length },
    { id: 'community', label: 'Communauté', count: articles.filter(a => a.category === 'community').length }
  ];

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredArticles = articles.filter(article => article.featured);
  const recentArticles = articles.slice(0, 3);

  const handleBookmark = (articleId: string) => {
    setBookmarkedArticles(prev => 
      prev.includes(articleId) 
        ? prev.filter(id => id !== articleId)
        : [...prev, articleId]
    );
  };

  const handleLike = (articleId: string) => {
    setLikedArticles(prev => 
      prev.includes(articleId) 
        ? prev.filter(id => id !== articleId)
        : [...prev, articleId]
    );
  };

  const openArticleModal = (article: NewsArticle) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeArticleModal = () => {
    setIsModalOpen(false);
    setSelectedArticle(null);
    document.body.style.overflow = 'auto';
  };

  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'event': return 'bg-blue-100 text-blue-900 border-blue-200';
      case 'announcement': return 'bg-purple-100 text-purple-900 border-purple-200';
      case 'success': return 'bg-green-100 text-green-900 border-green-200';
      case 'partner': return 'bg-orange-100 text-orange-900 border-orange-200';
      case 'community': return 'bg-pink-100 text-pink-900 border-pink-200';
      default: return 'bg-gray-100 text-gray-900 border-gray-200';
    }
  };

  return (
    // FOND HARMONISÉ
    <div className="min-h-screen bg-[#FFFBF0] py-12 md:py-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Magazine Style */}
        <div className="text-center mb-16 md:mb-24">
          <span className="inline-block py-1 px-3 border-2 border-black font-black text-xs uppercase tracking-[0.2em] mb-4 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-slate-900">
            Journal
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tight">
            {t.news_title || "ACTUALITÉS"}
          </h1>
          <p className="text-xl text-gray-700 font-serif italic max-w-3xl mx-auto leading-relaxed border-l-4 border-[#CE1126] pl-6 text-left">
            "{t.news_subtitle || "Le pouls de notre communauté. Histoires, événements et victoires."}"
          </p>
        </div>

        {/* Featured Articles - Grande Carte */}
        {featuredArticles.length > 0 && (
          <div className="mb-20">
            <h2 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3 uppercase tracking-wider">
              <Sparkles className="h-6 w-6 text-[#FCD116]" aria-hidden="true" />
              À la une
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredArticles.map((article) => (
                <article 
                  key={article.id}
                  className="bg-white rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] border-2 border-slate-900 overflow-hidden group cursor-pointer hover:-translate-y-1 transition-all duration-300"
                  onClick={() => openArticleModal(article)}
                >
                  <div className="relative h-72 overflow-hidden border-b-2 border-slate-900">
                    <img 
                      src={article.imageUrl}
                      alt={article.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getCategoryColor(article.category)}`}>
                        {categories.find(c => c.id === article.category)?.label}
                      </span>
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-black text-slate-900 mb-4 leading-tight group-hover:text-[#CE1126] transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 mb-6 line-clamp-2 font-serif text-lg">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                      <div className="flex items-center text-sm font-bold text-gray-500">
                        <span className="uppercase tracking-wide">{article.date}</span>
                      </div>
                      <span className="text-[#CE1126] font-bold flex items-center group-hover:translate-x-2 transition-transform">
                        Lire <ArrowRight className="h-4 w-4 ml-2" />
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* Filters & Search */}
        <div className="bg-white rounded-2xl border-2 border-slate-900 shadow-sm p-6 mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" aria-hidden="true" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.news_search_placeholder || "Rechercher..."}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-slate-900 focus:ring-0 outline-none transition-all font-bold text-slate-900 placeholder:font-normal"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg border-2 transition-all flex items-center gap-2 active:scale-95 font-bold text-sm ${
                    selectedCategory === category.id
                      ? 'border-slate-900 bg-slate-900 text-white'
                      : 'border-transparent bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredArticles.map((article) => (
            <article 
              key={article.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-xl transition-all duration-300 group cursor-pointer hover:-translate-y-1 flex flex-col h-full"
              onClick={() => openArticleModal(article)}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden rounded-t-xl">
                <img 
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-4 left-4">
                  <span className={`px-2 py-1 rounded text-[10px] font-black uppercase tracking-wider bg-white border border-slate-900 text-slate-900`}>
                    {categories.find(c => c.id === article.category)?.label}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center text-xs font-bold text-gray-400 mb-3 uppercase tracking-wider">
                  <span>{article.date}</span>
                  <span className="mx-2">•</span>
                  <span>{article.readTime}</span>
                </div>

                <h3 className="text-xl font-black text-slate-900 mb-3 line-clamp-2 leading-tight group-hover:underline decoration-2 decoration-[#FCD116] underline-offset-4">
                  {article.title}
                </h3>

                <p className="text-gray-600 mb-4 line-clamp-3 text-sm flex-grow font-medium">
                  {article.excerpt}
                </p>

                {/* Stats Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                   <div className="flex gap-4 text-gray-400 text-sm">
                      <span className="flex items-center gap-1"><Eye className="h-4 w-4"/> {article.views}</span>
                      <span className="flex items-center gap-1"><Heart className="h-4 w-4"/> {article.likes}</span>
                   </div>
                   <ChevronRight className="h-5 w-5 text-slate-900" />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Sidebar Récents (Style Dark) */}
        <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#CE1126] opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row gap-12">
            <div className="md:w-1/3">
              <h2 className="text-3xl font-black mb-4">En bref</h2>
              <p className="text-slate-400 mb-6">Les dernières nouvelles rapides de la communauté.</p>
              <button className="px-6 py-3 bg-white text-slate-900 font-bold rounded-xl hover:bg-gray-100 transition-colors">
                Voir tout
              </button>
            </div>
            
            <div className="md:w-2/3 grid gap-6">
              {recentArticles.map((article) => (
                <div 
                  key={article.id}
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group border-b border-white/10 last:border-0"
                  onClick={() => openArticleModal(article)}
                >
                  <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-[#FCD116]"></div>
                  <div>
                    <h4 className="font-bold text-lg mb-1 group-hover:text-[#FCD116] transition-colors">{article.title}</h4>
                    <span className="text-xs text-slate-500 font-mono">{article.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Article Modal (inchangé mais inclus pour la complétude) */}
      {isModalOpen && selectedArticle && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          onClick={closeArticleModal} 
        >
          <div 
            className="relative w-full max-w-4xl max-h-[90vh] bg-[#FFFBF0] rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col"
            onClick={(e) => e.stopPropagation()} 
          >
            <div className="absolute top-4 right-4 z-20">
               <button
                onClick={closeArticleModal}
                className="p-2 bg-white text-slate-900 rounded-full hover:bg-gray-100 shadow-lg border border-slate-900"
              >
                <span className="sr-only">Fermer</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="overflow-y-auto">
              <div className="h-64 md:h-96 relative">
                <img
                  src={selectedArticle.imageUrl}
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
                  <span className="inline-block px-3 py-1 mb-4 text-xs font-bold uppercase tracking-wider bg-[#FCD116] text-slate-900 rounded-sm">
                    {categories.find(c => c.id === selectedArticle.category)?.label}
                  </span>
                  <h1 className="text-3xl md:text-5xl font-black leading-tight mb-4">
                    {selectedArticle.title}
                  </h1>
                  <div className="flex items-center gap-6 text-sm font-bold opacity-80">
                    <span>{selectedArticle.author}</span>
                    <span>•</span>
                    <span>{selectedArticle.date}</span>
                  </div>
                </div>
              </div>

              <div className="p-8 md:p-12 max-w-3xl mx-auto">
                <div className="prose prose-lg prose-slate max-w-none font-serif">
                  <p className="lead text-xl font-bold text-slate-900 mb-8 border-l-4 border-[#CE1126] pl-6">
                    {selectedArticle.excerpt}
                  </p>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {selectedArticle.content}
                  </p>
                </div>
                
                <div className="mt-12 pt-8 border-t-2 border-slate-200 flex justify-between items-center">
                   <div className="flex gap-2">
                      {selectedArticle.tags.map(tag => (
                        <span key={tag} className="text-xs font-bold text-slate-500 bg-white border border-slate-200 px-3 py-1 rounded-full">#{tag}</span>
                      ))}
                   </div>
                   <button className="flex items-center gap-2 text-[#CE1126] font-bold hover:underline">
                      <Share2 className="h-4 w-4"/> Partager
                   </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsSection;