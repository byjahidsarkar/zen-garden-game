import { create } from 'zustand';
import {
  createGrid,
  findMatches,
  applyGravityAndRefill,
  hasPossibleMoves,
  type Tile,
  type Difficulty,
  difficultyConfig,
} from './data/tiles';

type Screen = 'start' | 'playing' | 'won' | 'lost';

interface GameState {
  screen: Screen;
  difficulty: Difficulty;
  grid: Tile[][];
  selected: [number, number] | null;
  score: number;
  movesLeft: number;
  target: number;
  busy: boolean;

  startGame: (difficulty: Difficulty) => void;
  selectTile: (r: number, c: number) => void;
  resetGame: () => void;
}

function swapTiles(grid: Tile[][], r1: number, c1: number, r2: number, c2: number): Tile[][] {
  const newGrid = grid.map((row) => [...row]);
  const tmp = newGrid[r1][c1];
  newGrid[r1][c1] = newGrid[r2][c2];
  newGrid[r2][c2] = tmp;
  return newGrid;
}

function isAdjacent(r1: number, c1: number, r2: number, c2: number): boolean {
  return Math.abs(r1 - r2) + Math.abs(c1 - c2) === 1;
}

function calcScore(matchCount: number): number {
  if (matchCount <= 3) return 60;
  if (matchCount === 4) return 120;
  return 200 + (matchCount - 5) * 50;
}

export const useGameStore = create<GameState>((set, get) => ({
  screen: 'start',
  difficulty: 'medium',
  grid: [],
  selected: null,
  score: 0,
  movesLeft: 0,
  target: 0,
  busy: false,

  startGame: (difficulty) => {
    let grid = createGrid();
    let safety = 0;
    while (findMatches(grid).size > 0 && safety < 20) {
      grid = createGrid();
      safety++;
    }
    if (!hasPossibleMoves(grid)) grid = createGrid();
    set({
      screen: 'playing',
      difficulty,
      grid,
      selected: null,
      score: 0,
      movesLeft: difficultyConfig[difficulty].moves,
      target: difficultyConfig[difficulty].target,
      busy: false,
    });
  },

  selectTile: (r, c) => {
    const state = get();
    if (state.busy || state.screen !== 'playing') return;

    if (!state.selected) {
      set({ selected: [r, c] });
      return;
    }

    const [sr, sc] = state.selected;
    if (sr === r && sc === c) {
      set({ selected: null });
      return;
    }

    if (!isAdjacent(sr, sc, r, c)) {
      set({ selected: [r, c] });
      return;
    }

    const swapped = swapTiles(state.grid, sr, sc, r, c);
    const matches = findMatches(swapped);
    if (matches.size === 0) {
      set({ grid: swapped, selected: null });
      setTimeout(() => {
        const s = get();
        set({ grid: swapTiles(s.grid, sr, sc, r, c) });
      }, 300);
      return;
    }

    set({ grid: swapped, selected: null, busy: true, movesLeft: state.movesLeft - 1 });
    processCascades(swapped, matches, set, get);
  },

  resetGame: () => {
    set({
      screen: 'start',
      grid: [],
      selected: null,
      score: 0,
      movesLeft: 0,
      target: 0,
      busy: false,
    });
  },
}));

function processCascades(
  grid: Tile[][],
  matches: Set<string>,
  set: (partial: Partial<GameState>) => void,
  get: () => GameState,
) {
  let currentGrid = grid;
  let totalScore = get().score;
  let cascade = 0;

  const step = () => {
    const matchCount = matches.size;
    totalScore += calcScore(matchCount) * (1 + cascade * 0.5);
    cascade++;

    const cleared = matches;
    currentGrid = currentGrid.map((row, ri) =>
      row.map((tile, ci) =>
        cleared.has(`${ri},${ci}`) ? { ...tile, clearing: true } : tile,
      ),
    );

    set({ grid: currentGrid, score: Math.floor(totalScore) });

    setTimeout(() => {
      currentGrid = applyGravityAndRefill(currentGrid, cleared);
      set({ grid: currentGrid });

      const newMatches = findMatches(currentGrid);
      if (newMatches.size > 0) {
        matches = newMatches;
        setTimeout(step, 250);
      } else {
        const s = get();
        const won = s.score >= s.target;
        const lost = !won && s.movesLeft <= 0;
        set({
          busy: false,
          screen: won ? 'won' : lost ? 'lost' : 'playing',
        });
        if (!won && !lost && !hasPossibleMoves(currentGrid)) {
          setTimeout(() => {
            set({ grid: createGrid() });
          }, 300);
        }
      }
    }, 300);
  };

  step();
}
