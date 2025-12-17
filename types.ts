
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
  // Added missing ViewState members used in navigation and footer
  PRIVACY = 'PRIVACY',
  TERMS = 'TERMS'
}

export interface UserPreferences {
  language: LanguageCode;
  theme: 'light' | 'dark' | 'auto';
}

// Added UserRole type for consistency in authentication context
export type UserRole = 'admin' | 'member';

export interface User {
  id: string;
  name: string;
  // Added missing email property and refined role type to UserRole
  email: string;
  role: UserRole;
  // Added optional metadata properties used in session management
  joinedAt?: string;
  avatar?: string;
  preferences?: UserPreferences;
  lastLogin?: string;
  isActive?: boolean;
  emailVerified?: boolean;
}

// Exported default preferences used for new user initialization
export const DEFAULT_USER_PREFERENCES: UserPreferences = {
  language: 'fr',
  theme: 'auto'
};
