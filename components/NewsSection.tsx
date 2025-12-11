import React, { useState, useEffect, useRef } from 'react';
import { 
  Newspaper, Calendar, Clock, MapPin, User, Tag, ChevronRight, 
  ExternalLink, Share2, Heart, Bookmark, Filter, Search, 
  TrendingUp, Eye, MessageCircle, ArrowRight, Sparkles
} from 'lucide-react';
import { translations } from '../utils/translations.ts';
// Import LanguageCode if available from context, otherwise default to prop or hook
import { useAuth } from '../contexts/AuthContext.tsx'; // Assuming auth context might hold language or passing it via props

// Fix: Add language prop to component to receive current language
interface NewsSectionProps {
    language?: string; // Optional prop
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

  // Sample data (same as before)
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
    // ... other articles (keeping existing data for brevity)
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
    { id: 'all', label: t.news_filter_all || 'Toutes les actualités', count: articles.length },
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
      case 'event': return 'bg-blue-100 text-blue-800';
      case 'announcement': return 'bg-purple-100 text-purple-800';
      case 'success': return 'bg-green-100 text-green-800';
      case 'partner': return 'bg-orange-100 text-orange-800';
      case 'community': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12 md:mb-20">
          <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-blue-100 to-blue-50 rounded-full mb-6 shadow-lg">
            <Newspaper className="h-12 w-12 text-blue-600" aria-hidden="true" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
            {t.news_title || "Actualités & Événements"}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t.news_subtitle || "Restez informé des dernières nouvelles, événements et succès de notre communauté"}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
            <div className="text-3xl font-black text-slate-900 mb-2">{articles.length}</div>
            <div className="text-gray-600 font-medium">{t.news_stats_articles || "Articles publiés"}</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
            <div className="text-3xl font-black text-slate-900 mb-2">
              {articles.reduce((sum, article) => sum + article.views, 0).toLocaleString()}
            </div>
            <div className="text-gray-600 font-medium">{t.news_stats_views || "Vues totales"}</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
            <div className="text-3xl font-black text-slate-900 mb-2">
              {articles.reduce((sum, article) => sum + article.likes, 0)}
            </div>
            <div className="text-gray-600 font-medium">Réactions</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
            <div className="text-3xl font-black text-slate-900 mb-2">
              {new Set(articles.map(a => a.category)).size}
            </div>
            <div className="text-gray-600 font-medium">Catégories</div>
          </div>
        </div>

        {/* Featured Articles */}
        {featuredArticles.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-8 flex items-center gap-3">
              <Sparkles className="h-7 w-7 text-yellow-500" aria-hidden="true" />
              Articles à la une
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredArticles.map((article) => (
                <article 
                  key={article.id}
                  className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 group cursor-pointer hover:-translate-y-1 transition-all duration-300"
                  onClick={() => openArticleModal(article)}
                >
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={article.imageUrl}
                      alt={article.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${getCategoryColor(article.category)}`}>
                        {categories.find(c => c.id === article.category)?.label}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-black text-white mb-2 line-clamp-2">
                        {article.title}
                      </h3>
                      <div className="flex items-center text-white/90 text-sm">
                        <Calendar className="h-4 w-4 mr-1" aria-hidden="true" />
                        <span className="mr-3">{article.date}</span>
                        <Clock className="h-4 w-4 mr-1" aria-hidden="true" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <User className="h-4 w-4 mr-1" aria-hidden="true" />
                        <span>{article.author}</span>
                      </div>
                      <button className="text-[#CE1126] font-bold flex items-center hover:translate-x-1 transition-transform">
                        {t.news_read_more || "Lire la suite"} <ChevronRight className="h-4 w-4 ml-1" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* Filters & Search */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative max-w-md">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" aria-hidden="true" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.news_search_placeholder || "Rechercher des actualités..."}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#CE1126] focus:ring-2 focus:ring-[#CE1126]/20 outline-none transition-all"
                />
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full border-2 transition-all flex items-center gap-2 active:scale-95 ${
                    selectedCategory === category.id
                      ? 'border-[#CE1126] bg-red-50 text-[#CE1126] font-bold'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  {category.label}
                  <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                    {category.count}
                  </span>
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
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 group cursor-pointer hover:-translate-y-1"
              onClick={() => openArticleModal(article)}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBookmark(article.id);
                    }}
                    className={`p-2 rounded-full backdrop-blur-sm transition-transform active:scale-90 ${
                      bookmarkedArticles.includes(article.id)
                        ? 'bg-yellow-500 text-white'
                        : 'bg-white/90 text-gray-600 hover:bg-white'
                    }`}
                    aria-label={bookmarkedArticles.includes(article.id) ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                  >
                    <Bookmark className="h-4 w-4" />
                  </button>
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${getCategoryColor(article.category)}`}>
                    {categories.find(c => c.id === article.category)?.label}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <Calendar className="h-4 w-4 mr-1" aria-hidden="true" />
                  <span className="mr-4">{article.date}</span>
                  <Clock className="h-4 w-4 mr-1" aria-hidden="true" />
                  <span>{article.readTime}</span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-[#CE1126] transition-colors">
                  {article.title}
                </h3>

                <p className="text-gray-600 mb-4 line-clamp-2">
                  {article.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {article.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLike(article.id);
                      }}
                      className={`flex items-center gap-1 active:scale-90 transition-transform ${
                        likedArticles.includes(article.id) ? 'text-red-500' : 'hover:text-red-500'
                      }`}
                    >
                      <Heart className="h-4 w-4" aria-hidden="true" />
                      <span>{article.likes + (likedArticles.includes(article.id) ? 1 : 0)}</span>
                    </button>
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" aria-hidden="true" />
                      <span>{article.views}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="h-4 w-4" aria-hidden="true" />
                      <span>{article.comments}</span>
                    </div>
                  </div>
                  <button className="text-[#CE1126] font-bold flex items-center group-hover:translate-x-1 transition-transform">
                    {t.news_read_more || "Lire"} <ChevronRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Empty State */}
        {filteredArticles.length === 0 && (
          <div className="text-center py-16">
            <Newspaper className="h-16 w-16 text-gray-300 mx-auto mb-6" aria-hidden="true" />
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              {t.news_no_results || "Aucun article trouvé"}
            </h3>
            <p className="text-gray-600 max-w-md mx-auto mb-6">
              Essayez de modifier vos critères de recherche ou de réinitialiser les filtres
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="px-6 py-3 bg-[#CE1126] text-white font-bold rounded-xl hover:bg-red-700 transition-colors active:scale-95"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}

        {/* Recent Articles Sidebar */}
        <div className="bg-gradient-to-r from-slate-900 to-gray-900 rounded-3xl p-8 text-white">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black">Articles récents</h2>
            <TrendingUp className="h-6 w-6 text-yellow-400" aria-hidden="true" />
          </div>
          
          <div className="space-y-6">
            {recentArticles.map((article) => (
              <div 
                key={article.id}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-4 hover:bg-white/10 transition-colors cursor-pointer group active:scale-[0.99]"
                onClick={() => openArticleModal(article)}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden">
                    <img 
                      src={article.imageUrl}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-bold text-white mb-1 line-clamp-2 group-hover:text-yellow-300 transition-colors">
                      {article.title}
                    </h4>
                    <div className="flex items-center text-white/60 text-sm">
                      <Calendar className="h-3 w-3 mr-1" aria-hidden="true" />
                      <span>{article.date}</span>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-white/40 group-hover:text-white transition-colors" aria-hidden="true" />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-8 border-t border-white/10">
            <button className="w-full py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 active:scale-95">
              Voir toutes les actualités
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-8 md:p-12 text-center border border-blue-100">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-4">
              {t.news_subscribe_title || "Restez informé"}
            </h3>
            <p className="text-gray-600 mb-8">
              {t.news_subscribe_desc || "Inscrivez-vous à notre newsletter pour recevoir les dernières actualités directement dans votre boîte mail"}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="flex-grow px-6 py-3 rounded-xl border-2 border-gray-200 focus:border-[#CE1126] focus:ring-2 focus:ring-[#CE1126]/20 outline-none"
              />
              <button className="px-8 py-3 bg-[#CE1126] text-white font-bold rounded-xl hover:bg-red-700 transition-colors active:scale-95">
                {t.news_subscribe_btn || "S'abonner"}
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Pas de spam, uniquement des informations utiles. Vous pouvez vous désabonner à tout moment.
            </p>
          </div>
        </div>
      </div>

      {/* Article Modal */}
      {isModalOpen && selectedArticle && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-labelledby="article-title"
          onClick={closeArticleModal} // Click outside to close
        >
          <div 
            className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()} // Prevent close on content click
          >
            {/* Close Button */}
            <button
              onClick={closeArticleModal}
              className="absolute top-4 right-4 z-10 p-3 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors hover:scale-110 active:scale-90"
              aria-label="Fermer l'article"
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Image */}
            <div className="h-64 md:h-80 relative overflow-hidden">
              <img
                src={selectedArticle.imageUrl}
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${getCategoryColor(selectedArticle.category)}`}>
                    {categories.find(c => c.id === selectedArticle.category)?.label}
                  </span>
                  <span className="text-white/80 text-sm">
                    {selectedArticle.readTime} de lecture
                  </span>
                </div>
                <h1 id="article-title" className="text-2xl md:text-3xl font-black text-white">
                  {selectedArticle.title}
                </h1>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8 overflow-y-auto max-h-[calc(90vh-16rem)]">
              <div className="flex items-center justify-between mb-6 text-sm text-gray-500">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" aria-hidden="true" />
                    <span>{selectedArticle.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" aria-hidden="true" />
                    <span>{selectedArticle.date}</span>
                  </div>
                  {selectedArticle.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" aria-hidden="true" />
                      <span>{selectedArticle.location}</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleLike(selectedArticle.id)}
                    className={`flex items-center gap-1 transition-transform active:scale-90 ${likedArticles.includes(selectedArticle.id) ? 'text-red-500' : 'text-gray-500 hover:text-red-500'}`}
                  >
                    <Heart className="h-5 w-5" aria-hidden="true" />
                    <span>{selectedArticle.likes + (likedArticles.includes(selectedArticle.id) ? 1 : 0)}</span>
                  </button>
                  <button
                    onClick={() => handleBookmark(selectedArticle.id)}
                    className={`transition-transform active:scale-90 ${bookmarkedArticles.includes(selectedArticle.id) ? 'text-yellow-500' : 'text-gray-500 hover:text-yellow-500'}`}
                  >
                    <Bookmark className="h-5 w-5" aria-hidden="true" />
                  </button>
                  <button className="text-gray-500 hover:text-blue-500 transition-transform active:scale-90">
                    <Share2 className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>

              <div className="prose max-w-none">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  {selectedArticle.content}
                </p>
                
                {selectedArticle.excerpt && (
                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 my-6">
                    <p className="text-blue-800 font-medium">
                      {selectedArticle.excerpt}
                    </p>
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t border-gray-200">
                  {selectedArticle.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Missing X icon component (defined inline here to avoid import error if lucide missing)
const X = ({ className }: { className?: string }) => (
  <svg 
    className={className} 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

export default NewsSection;