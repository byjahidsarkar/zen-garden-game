import { create } from 'zustand';
import { buildDeck, type CardData, type Difficulty } from './data/characters';

type Screen = 'start' | 'playing' | 'won';

interface GameState {
  screen: Screen;
  difficulty: Difficulty;
  cards: CardData[];
  flippedUids: number[];
  moves: number;
  matches: number;
  totalPairs: number;
  startTime: number;
  elapsed: number;
  lock: boolean;

  startGame: (difficulty: Difficulty) => void;
  flipCard: (uid: number) => void;
  resetGame: () => void;
  tick: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  screen: 'start',
  difficulty: 'medium',
  cards: [],
  flippedUids: [],
  moves: 0,
  matches: 0,
  totalPairs: 0,
  startTime: 0,
  elapsed: 0,
  lock: false,

  startGame: (difficulty) => {
    const cards = buildDeck(difficulty);
    const totalPairs = cards.length / 2;
    set({
      screen: 'playing',
      difficulty,
      cards,
      flippedUids: [],
      moves: 0,
      matches: 0,
      totalPairs,
      startTime: Date.now(),
      elapsed: 0,
      lock: false,
    });
  },

  flipCard: (uid) => {
    const state = get();
    if (state.lock) return;
    const card = state.cards.find((c) => c.uid === uid);
    if (!card || card.flipped || card.matched) return;
    if (state.flippedUids.length >= 2) return;

    const newCards = state.cards.map((c) =>
      c.uid === uid ? { ...c, flipped: true } : c
    );
    const newFlipped = [...state.flippedUids, uid];
    set({ cards: newCards, flippedUids: newFlipped });

    if (newFlipped.length === 2) {
      set({ lock: true, moves: state.moves + 1 });
      const [a, b] = newFlipped;
      const cardA = newCards.find((c) => c.uid === a)!;
      const cardB = newCards.find((c) => c.uid === b)!;

      if (cardA.charId === cardB.charId) {
        setTimeout(() => {
          const s = get();
          set({
            cards: s.cards.map((c) =>
              c.uid === a || c.uid === b ? { ...c, matched: true } : c
            ),
            flippedUids: [],
            lock: false,
            matches: s.matches + 1,
            screen: s.matches + 1 === s.totalPairs ? 'won' : 'playing',
          });
        }, 600);
      } else {
        setTimeout(() => {
          const s = get();
          set({
            cards: s.cards.map((c) =>
              c.uid === a || c.uid === b ? { ...c, flipped: false } : c
            ),
            flippedUids: [],
            lock: false,
          });
        }, 900);
      }
    }
  },

  resetGame: () => {
    set({
      screen: 'start',
      cards: [],
      flippedUids: [],
      moves: 0,
      matches: 0,
      totalPairs: 0,
      elapsed: 0,
      lock: false,
    });
  },

  tick: () => {
    const state = get();
    if (state.screen !== 'playing') return;
    set({ elapsed: Math.floor((Date.now() - state.startTime) / 1000) });
  },
}));
