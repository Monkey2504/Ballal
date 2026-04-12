export type LanguageCode = 'fr' | 'en' | 'nl' | 'pe' | 'ma' | 'su' | 'es' | 'ar' | 'de' | 'pt' | 'it' | 'ru';

export enum ViewState {
  HOME = 'HOME',
  NEWS = 'NEWS',
  LEGAL_AID = 'LEGAL_AID',
  FOOD_AUTONOMY = 'FOOD_AUTONOMY',
  FOOD_SUPPLIER = 'FOOD_SUPPLIER',
  FOOD_NETWORK = 'FOOD_NETWORK',
  SQUAT = 'SQUAT',
  CULTURE = 'CULTURE',
  TEAM = 'TEAM',
  DONATE = 'DONATE',
  SHARE = 'SHARE',
  CONTACT = 'CONTACT',
  PRIVACY = 'PRIVACY',
  TERMS = 'TERMS',
  FESTIVAL = 'FESTIVAL',
  COMMUNITY = 'COMMUNITY',
  SOLIDARITY_NETWORK = 'SOLIDARITY_NETWORK',
  PRESS = 'PRESS'}

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

export const ROUTE_MAP: Record<ViewState, string> = {
  [ViewState.HOME]:               '/',
  [ViewState.NEWS]:               '/actualites',
  [ViewState.SOLIDARITY_NETWORK]: '/entraide',
  [ViewState.COMMUNITY]:          '/annuaire',
  [ViewState.SQUAT]:              '/logement',
  [ViewState.CULTURE]:            '/culture',
  [ViewState.LEGAL_AID]:          '/droits',
  [ViewState.FOOD_AUTONOMY]:      '/alimentation',
  [ViewState.FOOD_SUPPLIER]:      '/alimentation/fournisseur',
  [ViewState.FOOD_NETWORK]:       '/alimentation/collectif',
  [ViewState.TEAM]:               '/equipe',
  [ViewState.FESTIVAL]:           '/festival',
  [ViewState.DONATE]:             '/don',
  [ViewState.SHARE]:              '/partager',
  [ViewState.CONTACT]:            '/contact',
  [ViewState.PRIVACY]:            '/confidentialite',
  [ViewState.TERMS]:              '/mentions-legales',
  [ViewState.PRESS]:              '/presse',
};

export const VIEW_FROM_ROUTE: Record<string, ViewState> = Object.fromEntries(
  (Object.entries(ROUTE_MAP) as [ViewState, string][]).map(([view, path]) => [path, view])
) as Record<string, ViewState>;
