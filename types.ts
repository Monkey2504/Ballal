

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  category: 'Politique' | 'Culture' | 'Sport' | 'Économie' | 'Société' | 'Santé' | 'Justice';
  date: string;
  imageUrl?: string;
  source?: string; // Nom du média (ex: Guineenews, RFI)
}

export interface CommunityEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  type: 'Meetup' | 'Fête' | 'Culture' | 'Business' | 'Sport';
  imageUrl?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'member' | 'admin';
  avatar?: string;
  joinedAt: string;
}

export interface Comment {
  id: string;
  authorId: string;
  author: string;
  content: string;
  date: string;
}

export interface ForumPost {
  id: string;
  authorId: string;
  author: string;
  title: string;
  content: string;
  likes: number;
  comments: number;
  commentsList?: Comment[];
  timeAgo: string;
  timestamp: number; // Pour le tri
  isReported?: boolean;
}

export interface DirectoryItem {
  id: string;
  name: string;
  category: 'Gastronomie' | 'Beauté & Mode' | 'Services' | 'Artisanat' | 'Santé';
  location: string;
  description: string;
  phone?: string;
  website?: string;
  isVerified: boolean;
}

export type LanguageCode = 'fr' | 'en' | 'nl' | 'pe' | 'ma' | 'su' | 'es' | 'ar' | 'de';

export enum ViewState {
  HOME = 'HOME',
  NEWS = 'NEWS',
  FORUM = 'FORUM',
  LEGAL_AID = 'LEGAL_AID',
  HISTORY = 'HISTORY',
  SHARE = 'SHARE',
  DONATE = 'DONATE',
  FOOD_AUTONOMY = 'FOOD_AUTONOMY',
  FOOD_SUPPLIER = 'FOOD_SUPPLIER',
  FOOD_NETWORK = 'FOOD_NETWORK',
  CONTACT = 'CONTACT',
  PRIVACY = 'PRIVACY',
  FESTIVAL = 'FESTIVAL',
}