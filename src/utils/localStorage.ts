import { Settings, LoveNote, TimelineEvent } from '../types';

const STORAGE_KEYS = {
  SETTINGS: 'birthday_settings',
  LOVE_NOTES: 'birthday_love_notes',
  TIMELINE: 'birthday_timeline',
  REACTIONS: 'birthday_reactions',
};

const defaultSettings: Settings = {
  theme: 'light',
  reduceMotion: false,
  backgroundMusic: false,
  volume: 0.5,
  visitCount: 0,
  lastVisit: new Date().toISOString(),
  hiddenTreasuresFound: [],
  favoriteMedia: [],
};

export const getSettings = (): Settings => {
  const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
  if (stored) {
    return { ...defaultSettings, ...JSON.parse(stored) };
  }
  return defaultSettings;
};

export const saveSettings = (settings: Partial<Settings>): void => {
  const current = getSettings();
  const updated = { ...current, ...settings };
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated));
};

export const incrementVisitCount = (): void => {
  const settings = getSettings();
  saveSettings({
    visitCount: settings.visitCount + 1,
    lastVisit: new Date().toISOString(),
  });
};

export const addHiddenTreasure = (treasureId: string): void => {
  const settings = getSettings();
  if (!settings.hiddenTreasuresFound.includes(treasureId)) {
    saveSettings({
      hiddenTreasuresFound: [...settings.hiddenTreasuresFound, treasureId],
    });
  }
};

export const getLoveNotes = (): LoveNote[] => {
  const stored = localStorage.getItem(STORAGE_KEYS.LOVE_NOTES);
  return stored ? JSON.parse(stored) : [];
};

export const saveLoveNote = (note: LoveNote): void => {
  const notes = getLoveNotes();
  const updated = [note, ...notes];
  localStorage.setItem(STORAGE_KEYS.LOVE_NOTES, JSON.stringify(updated));
};

export const addReaction = (noteId: string): void => {
  const reactions = JSON.parse(localStorage.getItem(STORAGE_KEYS.REACTIONS) || '{}');
  reactions[noteId] = (reactions[noteId] || 0) + 1;
  localStorage.setItem(STORAGE_KEYS.REACTIONS, JSON.stringify(reactions));
};

export const getReactions = (noteId: string): number => {
  const reactions = JSON.parse(localStorage.getItem(STORAGE_KEYS.REACTIONS) || '{}');
  return reactions[noteId] || 0;
};