export type LanguageCode = 'fr' | 'en' | 'nl' | 'pe' | 'ma' | 'su' | 'es' | 'ar' | 'de' | 'pt' | 'it' | 'ru';

export enum ViewState {
  HOME = 'HOME',
  LEGAL_AID = 'LEGAL_AID',
  FOOD_AUTONOMY = 'FOOD_AUTONOMY',
  FOOD_SUPPLIER = 'FOOD_SUPPLIER',
  FOOD_NETWORK = 'FOOD_NETWORK',
  SQUAT = 'SQUAT',
  FESTIVAL = 'FESTIVAL',
  HISTORY = 'HISTORY',
  DONATE = 'DONATE',
  SHARE = 'SHARE',
  CONTACT = 'CONTACT',
  PRIVACY = 'PRIVACY',
  TERMS = 'TERMS'
}

export interface UserPreferences {
  language: LanguageCode;
  theme: 'light' | 'dark' | 'auto';
}

export type UserRole = 'admin' | 'member';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  joinedAt?: string;
  avatar?: string;
  preferences?: UserPreferences;
  lastLogin?: string;
  isActive?: boolean;
  emailVerified?: boolean;
}

export const DEFAULT_USER_PREFERENCES: UserPreferences = {
  language: 'fr',
  theme: 'auto'
};