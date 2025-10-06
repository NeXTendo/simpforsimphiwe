export interface LoveNote {
  id: string;
  content: string;
  date: string;
  reactions: number;
  isMarkdown?: boolean;
}

export interface MediaItem {
  id: string;
  type: 'image' | 'video' | 'audio';
  src: string;
  title: string;
  description?: string;
  thumbnail?: string;
}

export interface Settings {
  theme: 'light' | 'dark';
  reduceMotion: boolean;
  backgroundMusic: boolean;
  volume: number;
  visitCount: number;
  lastVisit: string;
  hiddenTreasuresFound: string[];
  favoriteMedia: string[];
}

export interface TimelineEvent {
  id: string;
  title: string;
  date: string;
  description: string;
  image?: string;
  importance: 'high' | 'medium' | 'low';
}