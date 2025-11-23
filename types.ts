export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  category: 'Politique' | 'Culture' | 'Sport' | 'Économie';
  date: string;
}

export interface CommunityEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  type: 'Meetup' | 'Fête' | 'Culture' | 'Business';
}

export interface ForumPost {
  id: string;
  author: string;
  title: string;
  content: string;
  likes: number;
  comments: number;
  timeAgo: string;
}

export enum ViewState {
  HOME = 'HOME',
  NEWS = 'NEWS',
  EVENTS = 'EVENTS',
  FORUM = 'FORUM',
  LEGAL_AID = 'LEGAL_AID',
  GALLERY = 'GALLERY',
  HISTORY = 'HISTORY'
}