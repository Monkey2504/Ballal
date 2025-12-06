// --- BANQUE D'IMAGES STATIQUES OPTIMISÉE POUR BALLAL ASBL ---

// Interface pour les images héro
export interface HeroImageResult {
  imageUrl: string;
  label: string | null;
  credit?: string;
  aspectRatio?: string;
  category?: string;
}

// Interface pour les images de gallerie
export interface GalleryImage {
  id: string;
  imageUrl: string;
  thumbnailUrl: string;
  alt: string;
  caption?: string;
  category: 'culture' | 'events' | 'team' | 'projects';
  date?: string;
}

// Collection d'images héro (mode drapeau guinéen)
const GUINEAN_HERO_IMAGES: HeroImageResult[] = [
  {
    imageUrl: "https://images.unsplash.com/photo-1547619292-240402b5ae5d?q=80&w=1600&auto=format&fit=crop",
    label: "Solidarité Guinée-Belgique",
    credit: "Unsplash",
    aspectRatio: "16:9",
    category: "culture"
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1600&auto=format&fit=crop",
    label: "Communauté unie",
    credit: "Unsplash",
    aspectRatio: "16:9",
    category: "community"
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1532375810709-75b1da00537c?q=80&w=1600&auto=format&fit=crop",
    label: "Événements culturels",
    credit: "Unsplash",
    aspectRatio: "16:9",
    category: "events"
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1600&auto=format&fit=crop",
    label: "Éducation et formation",
    credit: "Unsplash",
    aspectRatio: "16:9",
    category: "education"
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1600&auto=format&fit=crop",
    label: "Actions humanitaires",
    credit: "Unsplash",
    aspectRatio: "16:9",
    category: "humanitarian"
  }
];

// Images spécifiques au drapeau guinéen (rouge-jaune-vert)
const GUINEAN_THEMED_IMAGES: HeroImageResult[] = [
  {
    imageUrl: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=1600&auto=format&fit=crop",
    label: "Couleurs de Guinée",
    credit: "Unsplash",
    aspectRatio: "21:9",
    category: "guinea"
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?q=80&w=1600&auto=format&fit=crop",
    label: "Traditions africaines",
    credit: "Unsplash",
    aspectRatio: "16:9",
    category: "tradition"
  }
];

// Image de fallback par défaut
const DEFAULT_FALLBACK: HeroImageResult = {
  imageUrl: "https://images.unsplash.com/photo-1547619292-240402b5ae5d?q=80&w=1600&auto=format&fit=crop",
  label: "BALLAL ASBL - Solidarité Guinée-Belgique",
  credit: "Unsplash",
  aspectRatio: "16:9",
  category: "default"
};

// Gallerie d'images pour les différentes sections
const GALLERY_IMAGES: GalleryImage[] = [
  // Images culturelles
  {
    id: "culture-1",
    imageUrl: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1200&auto=format&fit=crop",
    thumbnailUrl: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=400&auto=format&fit=crop",
    alt: "Danse traditionnelle guinéenne",
    caption: "Spectacle de danse traditionnelle",
    category: "culture",
    date: "2024-01-15"
  },
  {
    id: "culture-2",
    imageUrl: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=1200&auto=format&fit=crop",
    thumbnailUrl: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=400&auto=format&fit=crop",
    alt: "Artisanat guinéen",
    caption: "Exposition d'artisanat local",
    category: "culture",
    date: "2024-02-20"
  },
  
  // Images d'événements
  {
    id: "event-1",
    imageUrl: "https://images.unsplash.com/photo-1532375810709-75b1da00537c?q=80&w=1200&auto=format&fit=crop",
    thumbnailUrl: "https://images.unsplash.com/photo-1532375810709-75b1da00537c?q=80&w=400&auto=format&fit=crop",
    alt: "Conférence communautaire",
    caption: "Conférence sur la diaspora guinéenne",
    category: "events",
    date: "2024-03-10"
  },
  {
    id: "event-2",
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1200&auto=format&fit=crop",
    thumbnailUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=400&auto=format&fit=crop",
    alt: "Atelier éducatif",
    caption: "Atelier de formation professionnelle",
    category: "events",
    date: "2024-03-25"
  },
  
  // Images de l'équipe
  {
    id: "team-1",
    imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200&auto=format&fit=crop",
    thumbnailUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=400&auto=format&fit=crop",
    alt: "Équipe BALLAL ASBL",
    caption: "Réunion de l'équipe dirigeante",
    category: "team",
    date: "2024-04-05"
  },
  
  // Images de projets
  {
    id: "project-1",
    imageUrl: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1200&auto=format&fit=crop",
    thumbnailUrl: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=400&auto=format&fit=crop",
    alt: "Projet humanitaire",
    caption: "Distribution de matériel scolaire",
    category: "projects",
    date: "2024-04-15"
  }
];

// Cache pour optimiser les performances
let cachedHeroImage: HeroImageResult | null = null;
let lastFetchTime: number = 0;
const CACHE_DURATION = 3600000; // 1 heure en millisecondes

// --- SERVICE METHODS ---

/**
 * Récupère une image héro aléatoire ou selon une catégorie spécifique
 */
export const fetchHeroImage = async (category?: string): Promise<HeroImageResult> => {
  // Vérifier le cache
  const now = Date.now();
  if (cachedHeroImage && now - lastFetchTime < CACHE_DURATION) {
    return cachedHeroImage;
  }
  
  try {
    let availableImages: HeroImageResult[];
    
    // Filtrer par catégorie si spécifiée
    if (category) {
      availableImages = [
        ...GUINEAN_HERO_IMAGES,
        ...GUINEAN_THEMED_IMAGES
      ].filter(img => img.category === category);
      
      // Si aucune image dans cette catégorie, utiliser toutes les images
      if (availableImages.length === 0) {
        availableImages = [...GUINEAN_HERO_IMAGES, ...GUINEAN_THEMED_IMAGES];
      }
    } else {
      availableImages = [...GUINEAN_HERO_IMAGES, ...GUINEAN_THEMED_IMAGES];
    }
    
    // Sélectionner une image aléatoire
    const randomIndex = Math.floor(Math.random() * availableImages.length);
    const selectedImage = availableImages[randomIndex];
    
    // Mettre en cache
    cachedHeroImage = selectedImage;
    lastFetchTime = now;
    
    return selectedImage;
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'image héro:', error);
    return DEFAULT_FALLBACK;
  }
};

/**
 * Récupère toutes les images d'une catégorie spécifique
 */
export const fetchGalleryImages = async (
  category?: GalleryImage['category'],
  limit?: number
): Promise<GalleryImage[]> => {
  try {
    let filteredImages = [...GALLERY_IMAGES];
    
    // Filtrer par catégorie
    if (category) {
      filteredImages = filteredImages.filter(img => img.category === category);
    }
    
    // Limiter le nombre de résultats
    if (limit && limit > 0) {
      filteredImages = filteredImages.slice(0, limit);
    }
    
    return filteredImages;
  } catch (error) {
    console.error('Erreur lors de la récupération des images de gallerie:', error);
    return [];
  }
};

/**
 * Récupère une image spécifique par son ID
 */
export const fetchImageById = async (id: string): Promise<GalleryImage | null> => {
  try {
    const image = GALLERY_IMAGES.find(img => img.id === id);
    return image || null;
  } catch (error) {
    console.error(`Erreur lors de la récupération de l'image ${id}:`, error);
    return null;
  }
};

/**
 * Récupère les images par date (les plus récentes en premier)
 */
export const fetchRecentImages = async (limit: number = 6): Promise<GalleryImage[]> => {
  try {
    const sortedImages = [...GALLERY_IMAGES]
      .filter(img => img.date)
      .sort((a, b) => {
        if (!a.date || !b.date) return 0;
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      })
      .slice(0, limit);
    
    return sortedImages;
  } catch (error) {
    console.error('Erreur lors de la récupération des images récentes:', error);
    return [];
  }
};

/**
 * Génère une URL d'image optimisée pour différentes tailles d'écran
 */
export const getOptimizedImageUrl = (
  baseUrl: string,
  options?: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'webp' | 'jpg' | 'png';
  }
): string => {
  const { width = 1200, height, quality = 80, format = 'webp' } = options || {};
  
  // Pour Unsplash, nous pouvons utiliser les paramètres de requête
  if (baseUrl.includes('unsplash.com')) {
    const params = new URLSearchParams();
    params.set('w', width.toString());
    params.set('auto', 'format');
    params.set('fit', 'crop');
    params.set('q', quality.toString());
    
    if (height) {
      params.set('h', height.toString());
    }
    
    // Unsplash ne supporte pas le format webp via paramètres,
    // mais utilise auto=format pour la conversion automatique
    return `${baseUrl.split('?')[0]}?${params.toString()}`;
  }
  
  // Pour d'autres sources, retourner l'URL originale
  return baseUrl;
};

/**
 * Vide le cache des images
 */
export const clearImageCache = (): void => {
  cachedHeroImage = null;
  lastFetchTime = 0;
};

/**
 * Récupère une image héro thématique pour une saison ou occasion spécifique
 */
export const fetchThemedHeroImage = async (): Promise<HeroImageResult> => {
  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  
  // Images spéciales pour des occasions
  const specialOccasions: { [key: string]: HeroImageResult } = {
    // Jour de l'indépendance de la Guinée (2 octobre)
    '10-02': {
      imageUrl: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=1600&auto=format&fit=crop",
      label: "Jour de l'Indépendance de la Guinée",
      credit: "Unsplash",
      category: "independence"
    },
    // Nouvel An (1er janvier)
    '01-01': {
      imageUrl: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=1600&auto=format&fit=crop",
      label: "Bonne Année de la part de BALLAL ASBL",
      credit: "Unsplash",
      category: "newyear"
    },
    // Saison estivale (juin-août)
    'summer': {
      imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?q=80&w=1600&auto=format&fit=crop",
      label: "Été 2024 - Activités communautaires",
      credit: "Unsplash",
      category: "summer"
    }
  };
  
  // Vérifier les occasions spéciales
  const dateKey = `${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  if (specialOccasions[dateKey]) {
    return specialOccasions[dateKey];
  }
  
  // Vérifier la saison
  if (month >= 6 && month <= 8) {
    return specialOccasions['summer'];
  }
  
  // Sinon, retourner une image aléatoire normale
  return fetchHeroImage();
};

// Export des constantes pour une utilisation directe si nécessaire
export {
  GUINEAN_HERO_IMAGES,
  GUINEAN_THEMED_IMAGES,
  GALLERY_IMAGES,
  DEFAULT_FALLBACK
};