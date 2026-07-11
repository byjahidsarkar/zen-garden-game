export interface BengaliChar {
  id: string;
  character: string;
  phonetic: string;
  emoji: string;
}

export const characters: BengaliChar[] = [
  { id: 'ka', character: 'ক', phonetic: 'ka', emoji: '🦁' },
  { id: 'kha', character: 'খ', phonetic: 'kha', emoji: '🐘' },
  { id: 'ga', character: 'গ', phonetic: 'ga', emoji: '🐯' },
  { id: 'gha', character: 'ঘ', phonetic: 'gha', emoji: '🦒' },
  { id: 'nga', character: 'ঙ', phonetic: 'nga', emoji: '🐒' },
  { id: 'cha', character: 'চ', phonetic: 'cha', emoji: '🦜' },
  { id: 'chha', character: 'ছ', phonetic: 'chha', emoji: '🦋' },
  { id: 'ja', character: 'জ', phonetic: 'ja', emoji: '🐍' },
  { id: 'jha', character: 'ঝ', phonetic: 'jha', emoji: '🐊' },
  { id: 'nya', character: 'ঞ', phonetic: 'nya', emoji: '🦊' },
  { id: 'ta', character: 'ট', phonetic: 'ta', emoji: '🐢' },
  { id: 'tha', character: 'ঠ', phonetic: 'tha', emoji: '🦎' },
];

export interface CardData {
  uid: number;
  charId: string;
  character: string;
  phonetic: string;
  emoji: string;
  flipped: boolean;
  matched: boolean;
}

export type Difficulty = 'easy' | 'medium' | 'hard';

export const difficultyConfig: Record<Difficulty, { pairs: number; cols: number; label: string }> = {
  easy: { pairs: 6, cols: 4, label: 'সহজ' },
  medium: { pairs: 8, cols: 4, label: 'মধ্যম' },
  hard: { pairs: 12, cols: 6, label: 'কঠিন' },
};

export function buildDeck(difficulty: Difficulty): CardData[] {
  const { pairs } = difficultyConfig[difficulty];
  const selected = [...characters].sort(() => Math.random() - 0.5).slice(0, pairs);
  const doubled = [...selected, ...selected];
  const shuffled = doubled.sort(() => Math.random() - 0.5);
  return shuffled.map((c, i) => ({
    uid: i,
    charId: c.id,
    character: c.character,
    phonetic: c.phonetic,
    emoji: c.emoji,
    flipped: false,
    matched: false,
  }));
}
