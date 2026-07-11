export interface BengaliChar {
  id: string;
  character: string;
  phonetic: string;
  emoji: string;
}

export const characters: BengaliChar[] = [
  { id: 'a', character: 'অ', phonetic: 'a', emoji: '🅰️' },
  { id: 'aa', character: 'আ', phonetic: 'aa', emoji: '🌟' },
  { id: 'i', character: 'ই', phonetic: 'i', emoji: '🐝' },
  { id: 'ii', character: 'ঈ', phonetic: 'ii', emoji: '🦋' },
  { id: 'u', character: 'উ', phonetic: 'u', emoji: '🦉' },
  { id: 'uu', character: 'ঊ', phonetic: 'uu', emoji: '🌙' },
  { id: 'ri', character: 'ঋ', phonetic: 'ri', emoji: '🦁' },
  { id: 'e', character: 'এ', phonetic: 'e', emoji: '🦅' },
  { id: 'oi', character: 'ঐ', phonetic: 'oi', emoji: '🌊' },
  { id: 'o', character: 'ও', phonetic: 'o', emoji: '☀️' },
  { id: 'ou', character: 'ঔ', phonetic: 'ou', emoji: '🪷' },
  { id: 'ka', character: 'ক', phonetic: 'ka', emoji: '🦘' },
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
