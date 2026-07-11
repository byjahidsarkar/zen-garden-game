export const GRID_SIZE = 8;
export const TILE_TYPE_COUNT = 8;

export type Difficulty = 'easy' | 'medium' | 'hard';

export const difficultyConfig: Record<Difficulty, { moves: number; target: number; label: string }> = {
  easy: { moves: 25, target: 1000, label: 'সহজ' },
  medium: { moves: 20, target: 2000, label: 'মধ্যম' },
  hard: { moves: 15, target: 3000, label: 'কঠিন' },
};

export interface Tile {
  id: number;
  type: number;
  clearing?: boolean;
}

export interface LanguageDef {
  name: string;
  bg: string;
  ring: string;
  text: string;
}

export const LANGUAGES: LanguageDef[] = [
  { name: 'বাংলা',   bg: 'bg-emerald-500', ring: 'ring-emerald-300',   text: 'text-white' },
  { name: '日本語',   bg: 'bg-red-500',     ring: 'ring-red-300',       text: 'text-white' },
  { name: 'العربية',  bg: 'bg-amber-500',   ring: 'ring-amber-300',     text: 'text-white' },
  { name: '中文',     bg: 'bg-sky-500',     ring: 'ring-sky-300',       text: 'text-white' },
  { name: 'हिन्दी',   bg: 'bg-orange-500',  ring: 'ring-orange-300',    text: 'text-white' },
  { name: 'Русский',  bg: 'bg-indigo-500',  ring: 'ring-indigo-300',    text: 'text-white' },
  { name: '한국어',   bg: 'bg-pink-500',    ring: 'ring-pink-300',      text: 'text-white' },
  { name: 'English',  bg: 'bg-slate-600',   ring: 'ring-slate-300',     text: 'text-white' },
];

let nextId = 1;
function makeTile(): Tile {
  return { id: nextId++, type: Math.floor(Math.random() * TILE_TYPE_COUNT) };
}

function wouldMatch(grid: (Tile | null)[][], r: number, c: number): boolean {
  const type = grid[r][c]?.type;
  if (type === undefined || type === null) return false;
  let count = 1;
  for (let i = c - 1; i >= 0 && grid[r][i]?.type === type; i--) count++;
  for (let i = c + 1; i < GRID_SIZE && grid[r][i]?.type === type; i++) count++;
  if (count >= 3) return true;
  count = 1;
  for (let i = r - 1; i >= 0 && grid[i]?.[c]?.type === type; i--) count++;
  for (let i = r + 1; i < GRID_SIZE && grid[i]?.[c]?.type === type; i++) count++;
  return count >= 3;
}

export function createGrid(): Tile[][] {
  const grid: (Tile | null)[][] = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(null));
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      let attempts = 0;
      do {
        grid[r][c] = makeTile();
        attempts++;
      } while (wouldMatch(grid, r, c) && attempts < 50);
    }
  }
  return grid as Tile[][];
}

export function findMatches(grid: Tile[][]): Set<string> {
  const matches = new Set<string>();
  for (let r = 0; r < GRID_SIZE; r++) {
    let runStart = 0;
    for (let c = 1; c <= GRID_SIZE; c++) {
      const prev = grid[r][c - 1]?.type;
      const curr = c < GRID_SIZE ? grid[r][c]?.type : undefined;
      if (curr !== prev || curr === undefined || prev === undefined) {
        if (c - runStart >= 3) {
          for (let k = runStart; k < c; k++) matches.add(`${r},${k}`);
        }
        runStart = c;
      }
    }
  }
  for (let c = 0; c < GRID_SIZE; c++) {
    let runStart = 0;
    for (let r = 1; r <= GRID_SIZE; r++) {
      const prev = grid[r - 1][c]?.type;
      const curr = r < GRID_SIZE ? grid[r][c]?.type : undefined;
      if (curr !== prev || curr === undefined || prev === undefined) {
        if (r - runStart >= 3) {
          for (let k = runStart; k < r; k++) matches.add(`${k},${c}`);
        }
        runStart = r;
      }
    }
  }
  return matches;
}

export function applyGravityAndRefill(grid: Tile[][], cleared: Set<string>): Tile[][] {
  const newGrid: (Tile | null)[][] = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(null));
  for (let c = 0; c < GRID_SIZE; c++) {
    let writeRow = GRID_SIZE - 1;
    for (let r = GRID_SIZE - 1; r >= 0; r--) {
      if (!cleared.has(`${r},${c}`)) {
        newGrid[writeRow][c] = grid[r][c];
        writeRow--;
      }
    }
    for (let r = writeRow; r >= 0; r--) {
      newGrid[r][c] = makeTile();
    }
  }
  return newGrid as Tile[][];
}

export function hasPossibleMoves(grid: Tile[][]): boolean {
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      if (c < GRID_SIZE - 1) {
        const test = grid.map(row => [...row]);
        [test[r][c], test[r][c + 1]] = [test[r][c + 1], test[r][c]];
        if (findMatches(test).size > 0) return true;
      }
      if (r < GRID_SIZE - 1) {
        const test = grid.map(row => [...row]);
        [test[r][c], test[r + 1][c]] = [test[r + 1][c], test[r][c]];
        if (findMatches(test).size > 0) return true;
      }
    }
  }
  return false;
}
