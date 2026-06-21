import React, { useState, useRef, useEffect } from 'react';
import {
  Grid, List, ZoomIn, X, ChevronLeft, ChevronRight,
  Calendar, MapPin, Users, Heart, Download, Share2,
  Filter, Image as ImageIcon, Play, Info, Upload
} from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  category: 'event' | 'community' | 'food' | 'festival' | 'team';
  date: string;
  location: string;
  likes: number;
  imageUrl: string;
  featured?: boolean;
}

const GallerySection: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const galleryRef = useRef<HTMLDivElement>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: '1',
      title: 'Festival des Sans-Papiers 2023',
      description: 'Première édition du festival célébrant la dignité et les droits des personnes sans papiers',
      category: 'festival',
      date: '15-16 Juin 2023',
      location: 'Bruxelles, Belgique',
      likes: 245,
      imageUrl: 'https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?q=80&w=1600&auto=format&fit=crop',
      featured: true
    },
    {
      id: '2',
      title: 'Distribution Alimentaire Solidaire',
      description: 'Journée de redistribution des surplus alimentaires aux communautés locales',
      category: 'food',
      date: '12 Mai 2023',
      location: 'Molenbeek-Saint-Jean',
      likes: 189,
      imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1600&auto=format&fit=crop'
    },
    {
      id: '3',
      title: 'Atelier de Consultation Juridique',
      description: 'Sessions de consultation gratuite pour les personnes en situation précaire',
      category: 'event',
      date: '3 Avril 2023',
      location: 'Centre Ballal',
      likes: 132,
      imageUrl: 'https://images.unsplash.com/photo-1589391886085-8b6b0ac72a1a?q=80&w=1600&auto=format&fit=crop'
    },
    {
      id: '4',
      title: 'Équipe de Bénévoles Actifs',
      description: 'Notre formidable équipe de bénévoles lors d\'une journée de formation',
      category: 'team',
      date: '28 Mars 2023',
      location: 'Bruxelles',
      likes: 217,
      imageUrl: 'https://images.unsplash.com/photo-1551836026-d5c2c5af78e4?q=80&w=1600&auto=format&fit=crop'
    },
    {
      id: '5',
      title: 'Collecte de Denrées Alimentaires',
      description: 'Partenaire local faisant don de produits frais pour notre réseau solidaire',
      category: 'food',
      date: '14 Février 2023',
      location: 'Ferme Bio du Hainaut',
      likes: 156,
      imageUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=1600&auto=format&fit=crop'
    },
    {
      id: '6',
      title: 'Célébration Communautaire',
      description: 'Moment de partage et de célébration avec les membres de notre communauté',
      category: 'community',
      date: '20 Janvier 2023',
      location: 'Place du Jeu de Balle',
      likes: 198,
      imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1600&auto=format&fit=crop'
    },
    {
      id: '7',
      title: 'Préparation Festival 2024',
      description: 'Réunions de préparation pour la prochaine édition du festival',
      category: 'festival',
      date: '10 Décembre 2023',
      location: 'Centre Culturel',
      likes: 178,
      imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1600&auto=format&fit=crop'
    },
    {
      id: '8',
      title: 'Soutien aux Familles',
      description: 'Distribution de colis alimentaires aux familles dans le besoin',
      category: 'community',
      date: '5 Novembre 2023',
      location: 'Saint-Gilles',
      likes: 203,
      imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1600&auto=format&fit=crop'
    }
  ];

  const categories = [
    { id: 'all', label: 'Toutes', count: galleryItems.length },
    { id: 'festival', label: 'Festival', count: galleryItems.filter(item => item.category === 'festival').length },
    { id: 'food', label: 'Alimentation', count: galleryItems.filter(item => item.category === 'food').length },
    { id: 'event', label: 'Événements', count: galleryItems.filter(item => item.category === 'event').length },
    { id: 'team', label: 'Équipe', count: galleryItems.filter(item => item.category === 'team').length },
    { id: 'community', label: 'Communauté', count: galleryItems.filter(item => item.category === 'community').length }
  ];

  const filteredItems = galleryItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredItem = galleryItems.find(item => item.featured);

  const openModal = (item: GalleryItem) => {
    setSelectedImage(item);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const navigateGallery = (direction: 'prev' | 'next') => {
    if (!selectedImage) return;
    
    const currentIndex = filteredItems.findIndex(item => item.id === selectedImage.id);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredItems.length - 1;
    } else {
      newIndex = currentIndex < filteredItems.length - 1 ? currentIndex + 1 : 0;
    }
    
    setSelectedImage(filteredItems[newIndex]);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen) return;
      
      switch(e.key) {
        case 'Escape':
          closeModal();
          break;
        case 'ArrowLeft':
          navigateGallery('prev');
          break;
        case 'ArrowRight':
          navigateGallery('next');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, selectedImage]);

  const handleLike = (_id: string) => {
    // Placeholder — wire to backend when ready
  };

  const handleShare = (item: GalleryItem) => {
    if (navigator.share) {
      navigator.share({
        title: item.title,
        text: item.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(`${item.title} - ${window.location.href}`);
      alert('Lien copié dans le presse-papier !');
    }
  };

  return (
    <div
      className="min-h-screen bg-ivory paper-grain py-12 md:py-20"
      role="main"
      aria-labelledby="gallery-title"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="flag-line w-8 shrink-0" aria-hidden="true">
              <span /><span /><span />
            </span>
            <p className="dateline text-[11px] text-guinea-red">Galerie — en images</p>
          </div>
          <h1
            id="gallery-title"
            className="font-serif font-black text-4xl md:text-5xl text-ink mb-4"
          >
            Galerie <span className="text-guinea-red">Ballal</span>
          </h1>
          <p className="text-body-lg text-ink-muted max-w-3xl mx-auto">
            Découvrez nos actions, événements et moments forts en images
          </p>
        </div>

        {/* Featured Item */}
        {featuredItem && (
          <div className="mb-12 md:mb-16">
            <div
              className="relative rounded-[4px] overflow-hidden border border-ink/10 shadow-soft-lg group cursor-pointer"
              onClick={() => openModal(featuredItem)}
              role="button"
              tabIndex={0}
              aria-label={`Voir en détail: ${featuredItem.title}`}
              onKeyPress={(e) => e.key === 'Enter' && openModal(featuredItem)}
            >
              <img
                src={featuredItem.imageUrl}
                alt={featuredItem.title}
                className="w-full h-64 md:h-96 object-cover transform group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/40 to-transparent">
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="dateline px-3 py-1 bg-guinea-red text-white text-[10px] rounded-[3px]">
                      À la une
                    </span>
                  </div>
                  <h2 className="font-serif font-black text-2xl md:text-4xl text-white mb-3">
                    {featuredItem.title}
                  </h2>
                  <p className="text-white/90 text-lg mb-4 max-w-2xl">
                    {featuredItem.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-white/80">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" aria-hidden="true" />
                      <span>{featuredItem.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" aria-hidden="true" />
                      <span>{featuredItem.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Heart className="h-4 w-4" aria-hidden="true" />
                      <span>{featuredItem.likes} mentions j'aime</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute top-4 right-4 p-3 bg-ink/50 backdrop-blur-sm rounded-[3px] opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="mb-8 bg-white rounded-[4px] shadow-soft-sm p-6 border border-ink/10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

            {/* Search */}
            <div className="flex-1">
              <div className="relative max-w-md">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher dans la galerie..."
                  className="w-full pl-12 pr-4 py-3 rounded-[3px] border-2 border-border-subtle focus:border-guinea-red focus:ring-2 focus:ring-guinea-red/20 outline-none transition-all"
                  aria-label="Rechercher dans la galerie"
                />
                <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-ink-muted" aria-hidden="true" />
              </div>
            </div>

            {/* View Mode & Stats */}
            <div className="flex items-center gap-6">
              {/* View Toggle */}
              <div className="flex items-center gap-2 bg-paper rounded-[3px] p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-[3px] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-guinea-red/40 ${
                    viewMode === 'grid'
                      ? 'bg-white text-ink shadow-soft-sm'
                      : 'text-ink-muted hover:text-ink'
                  }`}
                  aria-label="Vue grille"
                  aria-pressed={viewMode === 'grid'}
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-[3px] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-guinea-red/40 ${
                    viewMode === 'list'
                      ? 'bg-white text-ink shadow-soft-sm'
                      : 'text-ink-muted hover:text-ink'
                  }`}
                  aria-label="Vue liste"
                  aria-pressed={viewMode === 'list'}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>

              {/* Stats */}
              <div className="hidden md:block text-sm text-ink-muted">
                <span className="font-black text-ink">{filteredItems.length}</span> photos
              </div>
            </div>
          </div>

          {/* Category Filters */}
          <div className="mt-6">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-[3px] border-2 transition-all flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-guinea-red/40 ${
                    selectedCategory === category.id
                      ? 'border-guinea-red bg-guinea-red/5 text-guinea-red font-bold'
                      : 'border-border-subtle text-ink-muted hover:border-ink/30'
                  }`}
                  aria-label={`Filtrer par ${category.label}`}
                  aria-pressed={selectedCategory === category.id}
                >
                  {category.label}
                  <span className="text-xs bg-paper px-2 py-0.5 rounded-[3px]">
                    {category.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Gallery Grid/List */}
        <div 
          ref={galleryRef}
          className={viewMode === 'grid' 
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
            : 'space-y-6'
          }
        >
          {filteredItems.map((item) => (
            <article
              key={item.id}
              className={`group bg-white rounded-[4px] shadow-soft-sm overflow-hidden border border-ink/10 hover:shadow-soft-lg transition-all duration-300 ${
                viewMode === 'grid'
                  ? 'hover:-translate-y-1'
                  : 'flex flex-col md:flex-row'
              }`}
            >
              {/* Image Container */}
              <div 
                className={`relative overflow-hidden cursor-pointer ${
                  viewMode === 'grid' ? 'h-64' : 'md:w-64 md:h-64 h-48'
                }`}
                onClick={() => openModal(item)}
                role="button"
                tabIndex={0}
                aria-label={`Voir en détail: ${item.title}`}
                onKeyPress={(e) => e.key === 'Enter' && openModal(item)}
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-4 right-4 p-2 bg-ink/50 backdrop-blur-sm rounded-[3px]">
                    <ZoomIn className="h-5 w-5 text-white" aria-hidden="true" />
                  </div>
                </div>
                <div className="absolute top-4 left-4">
                  <span className={`dateline px-3 py-1 text-[10px] rounded-[3px] ${
                    item.category === 'festival' ? 'bg-guinea-red text-white' :
                    item.category === 'food' ? 'bg-guinea-green text-white' :
                    item.category === 'event' ? 'bg-ink text-white' :
                    item.category === 'team' ? 'bg-ink text-white' :
                    'bg-guinea-yellow text-ink'
                  }`}>
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className={`p-6 flex-1 ${viewMode === 'list' ? 'md:flex-1' : ''}`}>
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-serif font-black text-xl text-ink group-hover:text-guinea-red transition-colors">
                    {item.title}
                  </h3>
                  <button
                    onClick={() => handleLike(item.id)}
                    className="p-2 text-ink-muted hover:text-guinea-red transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-guinea-red/40 rounded-[3px]"
                    aria-label={`Aimer ${item.title}`}
                  >
                    <Heart className="h-5 w-5" />
                  </button>
                </div>

                <p className="text-ink-muted mb-4 line-clamp-2">
                  {item.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-sm text-ink-muted mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" aria-hidden="true" />
                    <span>{item.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" aria-hidden="true" />
                    <span>{item.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" aria-hidden="true" />
                    <span>{item.likes} j'aime</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => openModal(item)}
                    className="flex-1 bg-ink text-ivory font-mono text-[12px] font-bold uppercase tracking-[0.08em] py-2.5 px-4 rounded-[3px] hover:bg-guinea-red transition-colors flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-guinea-red/40"
                  >
                    <Info className="h-4 w-4" aria-hidden="true" />
                    Détails
                  </button>
                  <button
                    onClick={() => handleShare(item)}
                    className="p-2 border-2 border-ink text-ink rounded-[3px] hover:bg-ink hover:text-ivory transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/40"
                    aria-label={`Partager ${item.title}`}
                  >
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center p-4 bg-paper rounded-[4px] mb-6">
              <ImageIcon className="h-12 w-12 text-ink-muted" aria-hidden="true" />
            </div>
            <h3 className="font-serif font-black text-2xl text-ink mb-3">
              Aucune image trouvée
            </h3>
            <p className="text-ink-muted max-w-md mx-auto mb-6">
              Essayez de modifier vos critères de recherche ou de réinitialiser les filtres
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="px-7 py-3.5 bg-guinea-red text-white font-mono text-[12px] font-bold uppercase tracking-[0.08em] rounded-[3px] hover:bg-guinea-red-dark transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-guinea-red/50 focus-visible:ring-offset-2"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}

        {/* Stats */}
        <div className="mt-12 bg-ink rounded-[4px] p-8 text-white relative overflow-hidden">
          <div className="flag-line absolute top-0 left-0 right-0" aria-hidden="true"><span /><span /><span /></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="font-serif font-black text-3xl md:text-4xl mb-2">{galleryItems.length}</div>
              <div className="dateline text-[10px] text-white/50">Moments capturés</div>
            </div>
            <div className="text-center">
              <div className="font-serif font-black text-3xl md:text-4xl mb-2">
                {galleryItems.reduce((sum, item) => sum + item.likes, 0)}
              </div>
              <div className="dateline text-[10px] text-white/50">Mentions j'aime</div>
            </div>
            <div className="text-center">
              <div className="font-serif font-black text-3xl md:text-4xl mb-2">
                {new Set(galleryItems.map(item => item.category)).size}
              </div>
              <div className="dateline text-[10px] text-white/50">Catégories</div>
            </div>
            <div className="text-center">
              <div className="font-serif font-black text-3xl md:text-4xl mb-2">2023</div>
              <div className="dateline text-[10px] text-white/50">Première édition</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <div className="bg-paper rounded-[4px] p-8 md:p-12 border border-border-subtle">
            <h2 className="font-serif font-black text-2xl md:text-3xl text-ink mb-4">
              Vous avez des photos de nos événements ?
            </h2>
            <p className="text-ink-muted text-lg mb-8 max-w-2xl mx-auto">
              Partagez vos photos avec notre communauté et contribuez à documenter notre histoire collective
            </p>
            <button className="px-7 py-3.5 bg-guinea-red text-white font-mono text-[12px] font-bold uppercase tracking-[0.08em] rounded-[3px] hover:bg-guinea-red-dark transition-colors shadow-soft-sm flex items-center justify-center gap-2 mx-auto focus:outline-none focus-visible:ring-2 focus-visible:ring-guinea-red/50 focus-visible:ring-offset-2">
              <Upload className="h-5 w-5" aria-hidden="true" />
              Partager mes photos
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {isModalOpen && selectedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-ink/90 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title"
          onClick={(e) => e.target === e.currentTarget && closeModal()}
        >
          <div className="relative w-full max-w-6xl max-h-[90vh] bg-white rounded-[4px] overflow-hidden">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 p-3 bg-ink/50 text-white rounded-[3px] hover:bg-ink/70 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Fermer la galerie"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={() => navigateGallery('prev')}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-ink/50 text-white rounded-[3px] hover:bg-ink/70 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Image précédente"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={() => navigateGallery('next')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-ink/50 text-white rounded-[3px] hover:bg-ink/70 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Image suivante"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Image */}
            <div className="h-[60vh] overflow-hidden">
              <img
                src={selectedImage.imageUrl}
                alt={selectedImage.title}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Info Panel */}
            <div className="p-6 md:p-8 bg-white">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div className="flex-1">
                  <h2 id="lightbox-title" className="font-serif font-black text-2xl text-ink mb-3">
                    {selectedImage.title}
                  </h2>
                  <p className="text-ink-muted mb-6">
                    {selectedImage.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-6 text-ink-muted">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" aria-hidden="true" />
                      <span>{selectedImage.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" aria-hidden="true" />
                      <span>{selectedImage.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Heart className="h-5 w-5" aria-hidden="true" />
                      <span>{selectedImage.likes} mentions j'aime</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleLike(selectedImage.id)}
                    className="p-3 border-2 border-ink rounded-[3px] text-ink hover:text-guinea-red hover:border-guinea-red transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-guinea-red/40"
                    aria-label="Aimer cette image"
                  >
                    <Heart className="h-6 w-6" />
                  </button>
                  <button
                    onClick={() => handleShare(selectedImage)}
                    className="p-3 border-2 border-ink rounded-[3px] text-ink hover:bg-ink hover:text-ivory transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/40"
                    aria-label="Partager cette image"
                  >
                    <Share2 className="h-6 w-6" />
                  </button>
                  <button
                    className="p-3 border-2 border-ink rounded-[3px] text-ink hover:bg-ink hover:text-ivory transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/40"
                    aria-label="Télécharger cette image"
                  >
                    <Download className="h-6 w-6" />
                  </button>
                </div>
              </div>

              {/* Image Counter */}
              <div className="mt-6 pt-6 border-t border-border-subtle">
                <p className="dateline text-[10px] text-ink-muted">
                  Image {filteredItems.findIndex(item => item.id === selectedImage.id) + 1} sur {filteredItems.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GallerySection;