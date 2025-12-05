
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'member' | 'admin';
  avatar?: string;
  joinedAt: string;
}

export type LanguageCode = 'fr' | 'en' | 'nl' | 'pe' | 'ma' | 'su' | 'es' | 'ar' | 'de';

export enum ViewState {
  HOME = 'HOME',
  LEGAL_AID = 'LEGAL_AID',
  HISTORY = 'HISTORY',
  SHARE = 'SHARE',
  DONATE = 'DONATE',
  FOOD_AUTONOMY = 'FOOD_AUTONOMY',
  FOOD_SUPPLIER = 'FOOD_SUPPLIER',
  FOOD_NETWORK = 'FOOD_NETWORK',
  CONTACT = 'CONTACT',
  PRIVACY = 'PRIVACY',
  TERMS = 'TERMS',
  FESTIVAL = 'FESTIVAL'
}
