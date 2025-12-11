// === TYPES UTILISATEUR ===

export interface UserPreferences {
  language: LanguageCode;
  theme: 'light' | 'dark' | 'auto';
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
    newsletter: boolean;
  };
  accessibility: {
    highContrast: boolean;
    reducedMotion: boolean;
    fontSize: 'small' | 'medium' | 'large' | 'x-large';
  };
}

export interface UserProfile {
  phone?: string;
  address?: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  dateOfBirth?: string;
  nationality?: string;
  occupation?: string;
  bio?: string;
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  joinedAt: string;
  lastLogin?: string;
  isActive: boolean;
  emailVerified: boolean;
  phoneVerified?: boolean;
  membershipNumber?: string;
  preferences: UserPreferences;
  profile?: UserProfile;
  stats?: UserStats;
}

export interface UserStats {
  eventsAttended: number;
  donationsCount: number;
  volunteerHours: number;
  projectsParticipated: number;
  lastActivity: string;
}

export type UserRole = 
  | 'guest'        // Visiteur non connecté
  | 'member'       // Membre standard
  | 'volunteer'    // Bénévole actif
  | 'contributor'  // Contributeur régulier
  | 'moderator'    // Modérateur
  | 'admin'        // Administrateur
  | 'super_admin'; // Super administrateur

export interface UserSession {
  token: string;
  expiresAt: string;
  refreshToken: string;
  device: {
    type: 'mobile' | 'tablet' | 'desktop';
    os: string;
    browser: string;
  };
}

// === TYPES LANGUE ===

export type LanguageCode = 
  | 'fr'    // Français
  | 'en'    // Anglais
  | 'nl'    // Néerlandais
  | 'pe'    // Peul (Fulfulde)
  | 'ma'    // Malinké
  | 'su'    // Soussou
  | 'es'    // Espagnol
  | 'ar'    // Arabe
  | 'de'    // Allemand
  | 'pt'    // Portugais
  | 'it'    // Italien
  | 'ru';   // Russe

export interface Language {
  code: LanguageCode;
  name: string;
  nativeName: string;
  direction: 'ltr' | 'rtl';
  flag?: string;
  isRTL: boolean;
}

export const SUPPORTED_LANGUAGES: Record<LanguageCode, Language> = {
  fr: { 
    code: 'fr', 
    name: 'French', 
    nativeName: 'Français', 
    direction: 'ltr', 
    flag: '🇫🇷',
    isRTL: false 
  },
  en: { 
    code: 'en', 
    name: 'English', 
    nativeName: 'English', 
    direction: 'ltr', 
    flag: '🇬🇧',
    isRTL: false 
  },
  nl: { 
    code: 'nl', 
    name: 'Dutch', 
    nativeName: 'Nederlands', 
    direction: 'ltr', 
    flag: '🇳🇱',
    isRTL: false 
  },
  pe: { 
    code: 'pe', 
    name: 'Fula', 
    nativeName: 'Pulaar', 
    direction: 'ltr', 
    flag: '🇬🇳',
    isRTL: false 
  },
  ma: { 
    code: 'ma', 
    name: 'Mandingo', 
    nativeName: 'Maninka', 
    direction: 'ltr', 
    flag: '🇬🇳',
    isRTL: false 
  },
  su: { 
    code: 'su', 
    name: 'Susu', 
    nativeName: 'Sosoxui', 
    direction: 'ltr', 
    flag: '🇬🇳',
    isRTL: false 
  },
  es: { 
    code: 'es', 
    name: 'Spanish', 
    nativeName: 'Español', 
    direction: 'ltr', 
    flag: '🇪🇸',
    isRTL: false 
  },
  ar: { 
    code: 'ar', 
    name: 'Arabic', 
    nativeName: 'العربية', 
    direction: 'rtl', 
    flag: '🇸🇦',
    isRTL: true 
  },
  de: { 
    code: 'de', 
    name: 'German', 
    nativeName: 'Deutsch', 
    direction: 'ltr', 
    flag: '🇩🇪',
    isRTL: false 
  },
  pt: { 
    code: 'pt', 
    name: 'Portuguese', 
    nativeName: 'Português', 
    direction: 'ltr', 
    flag: '🇵🇹',
    isRTL: false 
  },
  it: { 
    code: 'it', 
    name: 'Italian', 
    nativeName: 'Italiano', 
    direction: 'ltr', 
    flag: '🇮🇹',
    isRTL: false 
  },
  ru: { 
    code: 'ru', 
    name: 'Russian', 
    nativeName: 'Русский', 
    direction: 'ltr', 
    flag: '🇷🇺',
    isRTL: false 
  }
};

// === ÉTATS DE VUE ===

export enum ViewState {
  // Pages principales
  HOME = 'HOME',
  ABOUT = 'ABOUT',
  TEAM = 'TEAM',
  PROJECTS = 'PROJECTS',
  
  // Services
  LEGAL_AID = 'LEGAL_AID',
  FOOD_AUTONOMY = 'FOOD_AUTONOMY',
  FOOD_SUPPLIER = 'FOOD_SUPPLIER',
  FOOD_NETWORK = 'FOOD_NETWORK',
  
  // Culture & Événements
  FESTIVAL = 'FESTIVAL',
  CULTURE = 'CULTURE',
  EVENTS = 'EVENTS',
  HISTORY = 'HISTORY',
  
  // Engagement
  DONATE = 'DONATE',
  VOLUNTEER = 'VOLUNTEER',
  MEMBERSHIP = 'MEMBERSHIP',
  SHARE = 'SHARE',
  
  // Informations
  CONTACT = 'CONTACT',
  
  // Utilisateur
  PROFILE = 'PROFILE',
  DASHBOARD = 'DASHBOARD',
  SETTINGS = 'SETTINGS',
  
  // Légal
  PRIVACY = 'PRIVACY',
  TERMS = 'TERMS',
  COOKIES = 'COOKIES',
  
  // Admin
  ADMIN_DASHBOARD = 'ADMIN_DASHBOARD',
  USER_MANAGEMENT = 'USER_MANAGEMENT',
  CONTENT_MANAGEMENT = 'CONTENT_MANAGEMENT',
  ANALYTICS = 'ANALYTICS'
}

export interface ViewStateConfig {
  state: ViewState;
  title: string;
  path: string;
  requiresAuth: boolean;
  requiredRole?: UserRole;
  showInNav: boolean;
  icon?: string;
  description?: string;
  meta?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
}

// === TYPES DE CONTENU ===

export interface Content {
  id: string;
  type: 'article' | 'event' | 'project' | 'news' | 'page';
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  author?: User;
  publishedAt: string;
  updatedAt?: string;
  status: 'draft' | 'published' | 'archived';
  language: LanguageCode;
  tags: string[];
  meta?: {
    views: number;
    likes: number;
    shares: number;
    comments: number;
  };
}

export interface Event extends Content {
  type: 'event';
  startDate: string;
  endDate?: string;
  location: string;
  address?: string;
  capacity?: number;
  registrationRequired: boolean;
  registrationUrl?: string;
  isOnline: boolean;
  onlineUrl?: string;
  categories: EventCategory[];
  attendees?: User[];
}

export type EventCategory = 
  | 'cultural'
  | 'educational'
  | 'social'
  | 'fundraising'
  | 'community'
  | 'workshop'
  | 'conference'
  | 'celebration';

// === TYPES DE PROJETS ===

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  fullDescription: string;
  featuredImage: string;
  gallery?: string[];
  startDate: string;
  endDate?: string;
  status: 'planning' | 'active' | 'completed' | 'archived';
  category: ProjectCategory;
  location: string;
  budget?: {
    estimated: number;
    collected: number;
    currency: string;
  };
  team?: User[];
  partners?: string[];
  tags: string[];
  updates?: ProjectUpdate[];
  stats?: {
    volunteers: number;
    beneficiaries: number;
    hours: number;
    donations: number;
  };
}

export type ProjectCategory = 
  | 'humanitarian'
  | 'education'
  | 'health'
  | 'culture'
  | 'agriculture'
  | 'infrastructure'
  | 'environment'
  | 'youth'
  | 'women';

export interface ProjectUpdate {
  id: string;
  title: string;
  content: string;
  author: User;
  publishedAt: string;
  images?: string[];
  documents?: string[];
}

// === TYPES DE DONATIONS ===

export interface Donation {
  id: string;
  donor: User;
  amount: number;
  currency: string;
  date: string;
  paymentMethod: 'card' | 'bank' | 'cash' | 'mobile';
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  project?: Project;
  isAnonymous: boolean;
  message?: string;
  receipt?: {
    number: string;
    issuedAt: string;
    downloadUrl: string;
  };
}

// === TYPES DE CONTACT ===

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  category: 'general' | 'support' | 'partnership' | 'volunteer' | 'other';
  status: 'new' | 'read' | 'replied' | 'archived';
  createdAt: string;
  repliedAt?: string;
  assignedTo?: User;
  notes?: string[];
}

// === TYPES DE RÉSEAU ALIMENTAIRE ===

export interface FoodSupplier {
  id: string;
  name: string;
  type: 'producer' | 'distributor' | 'retailer' | 'restaurant';
  description: string;
  location: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  contact: {
    phone: string;
    email: string;
    website?: string;
  };
  products: string[];
  certifications?: string[];
  rating: number;
  isVerified: boolean;
}

export interface FoodNetworkNode {
  id: string;
  name: string;
  type: 'hub' | 'producer' | 'distributor' | 'consumer';
  location: string;
  connections: string[];
  capacity?: number;
  currentLoad?: number;
}

// === TYPES D'ASSISTANCE JURIDIQUE ===

export interface LegalAidRequest {
  id: string;
  user: User;
  category: 'immigration' | 'employment' | 'housing' | 'family' | 'other';
  title: string;
  description: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'assigned' | 'in_progress' | 'resolved' | 'closed';
  assignedTo?: User;
  documents?: string[];
  createdAt: string;
  updatedAt: string;
  resolution?: string;
}

// === TYPES DE NOTIFICATIONS ===

export interface Notification {
  id: string;
  userId: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'event' | 'donation' | 'message';
  title: string;
  message: string;
  data?: Record<string, any>;
  read: boolean;
  createdAt: string;
  action?: {
    label: string;
    url: string;
  };
}

// === TYPES D'ANALYTIQUES ===

export interface AnalyticsData {
  period: {
    start: string;
    end: string;
  };
  users: {
    total: number;
    new: number;
    active: number;
    byRole: Record<UserRole, number>;
  };
  traffic: {
    pageViews: number;
    uniqueVisitors: number;
    byPage: Record<ViewState, number>;
    byCountry: Record<string, number>;
    byDevice: {
      mobile: number;
      desktop: number;
      tablet: number;
    };
  };
  donations: {
    total: number;
    count: number;
    average: number;
    byProject: Record<string, number>;
  };
  events: {
    total: number;
    upcoming: number;
    attendance: number;
  };
}

// === TYPES DE CONFIGURATION ===

export interface AppConfig {
  site: {
    name: string;
    title: string;
    description: string;
    url: string;
    logo: string;
    favicon: string;
  };
  contact: {
    email: string;
    phone: string;
    address: string;
    social: {
      facebook?: string;
      twitter?: string;
      instagram?: string;
      linkedin?: string;
      youtube?: string;
    };
  };
  features: {
    donations: boolean;
    events: boolean;
    blog: boolean;
    membership: boolean;
    volunteer: boolean;
    foodNetwork: boolean;
    legalAid: boolean;
  };
  payment: {
    currency: string;
    methods: string[];
    minDonation: number;
  };
}

// === TYPES DE RÉPONSE API ===

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: Record<string, any>;
  };
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// === TYPES D'UTILITAIRE ===

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type Nullable<T> = T | null;

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// === CONSTANTES ===

export const DEFAULT_USER_PREFERENCES: UserPreferences = {
  language: 'fr',
  theme: 'auto',
  notifications: {
    email: true,
    push: true,
    sms: false,
    newsletter: true
  },
  accessibility: {
    highContrast: false,
    reducedMotion: false,
    fontSize: 'medium'
  }
};

export const ROLE_HIERARCHY: Record<UserRole, number> = {
  guest: 0,
  member: 1,
  volunteer: 2,
  contributor: 3,
  moderator: 4,
  admin: 5,
  super_admin: 6
};

// === FONCTIONS UTILITAIRES ===

export function hasPermission(user: User | null, requiredRole: UserRole): boolean {
  if (!user) return false;
  return ROLE_HIERARCHY[user.role] >= ROLE_HIERARCHY[requiredRole];
}

export function getUserInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function formatDate(date: string | Date, language: LanguageCode = 'fr'): string {
  const d = new Date(date);
  return d.toLocaleDateString(language, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}