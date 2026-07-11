export const GRID_SIZE = 8;
export const ACTIVE_TYPE_COUNT = 8;

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
  gradient: string;
  glow: string;
}

export const ALL_LANGUAGES: LanguageDef[] = [
  { name: 'বাংলা', gradient: 'from-teal-400 to-teal-600', glow: 'shadow-teal-500/40' },
  { name: 'हिन्दी', gradient: 'from-orange-400 to-orange-600', glow: 'shadow-orange-500/40' },
  { name: 'English', gradient: 'from-sky-400 to-sky-600', glow: 'shadow-sky-500/40' },
  { name: 'Español', gradient: 'from-amber-400 to-amber-600', glow: 'shadow-amber-500/40' },
  { name: '日本語', gradient: 'from-rose-400 to-rose-600', glow: 'shadow-rose-500/40' },
  { name: 'العربية', gradient: 'from-emerald-400 to-emerald-600', glow: 'shadow-emerald-500/40' },
  { name: '中文', gradient: 'from-red-400 to-red-600', glow: 'shadow-red-500/40' },
  { name: 'Русский', gradient: 'from-blue-400 to-blue-600', glow: 'shadow-blue-500/40' },
  { name: '한국어', gradient: 'from-pink-400 to-pink-600', glow: 'shadow-pink-500/40' },
  { name: 'ภาษาไทย', gradient: 'from-cyan-400 to-cyan-600', glow: 'shadow-cyan-500/40' },
  { name: 'Ελληνικά', gradient: 'from-lime-400 to-lime-600', glow: 'shadow-lime-500/40' },
  { name: 'עברית', gradient: 'from-yellow-400 to-yellow-600', glow: 'shadow-yellow-500/40' },
  { name: 'தமிழ்', gradient: 'from-green-400 to-green-600', glow: 'shadow-green-500/40' },
  { name: 'తెలుగు', gradient: 'from-rose-500 to-rose-700', glow: 'shadow-rose-600/40' },
  { name: 'ಕನ್ನಡ', gradient: 'from-teal-500 to-teal-700', glow: 'shadow-teal-600/40' },
  { name: 'മലയാളം', gradient: 'from-sky-500 to-sky-700', glow: 'shadow-sky-600/40' },
  { name: 'ਪੰਜਾਬੀ', gradient: 'from-orange-500 to-orange-700', glow: 'shadow-orange-600/40' },
  { name: 'ગુજરાતી', gradient: 'from-amber-500 to-amber-700', glow: 'shadow-amber-600/40' },
  { name: 'मराठी', gradient: 'from-emerald-500 to-emerald-700', glow: 'shadow-emerald-600/40' },
  { name: 'ქართული', gradient: 'from-blue-500 to-blue-700', glow: 'shadow-blue-600/40' },
  { name: 'հայերեն', gradient: 'from-red-500 to-red-700', glow: 'shadow-red-600/40' },
  { name: 'සිංහල', gradient: 'from-cyan-500 to-cyan-700', glow: 'shadow-cyan-600/40' },
  { name: 'ဗမာ', gradient: 'from-green-500 to-green-700', glow: 'shadow-green-600/40' },
  { name: 'ភាសាខ្មែរ', gradient: 'from-pink-500 to-pink-700', glow: 'shadow-pink-600/40' },
  { name: 'Tiếng Việt', gradient: 'from-lime-500 to-lime-700', glow: 'shadow-lime-600/40' },
  { name: 'Deutsch', gradient: 'from-rose-300 to-rose-500', glow: 'shadow-rose-400/40' },
  { name: 'Français', gradient: 'from-teal-300 to-teal-500', glow: 'shadow-teal-400/40' },
  { name: 'Português', gradient: 'from-sky-300 to-sky-500', glow: 'shadow-sky-400/40' },
  { name: 'Italiano', gradient: 'from-amber-300 to-amber-500', glow: 'shadow-amber-400/40' },
  { name: 'Türkçe', gradient: 'from-emerald-300 to-emerald-500', glow: 'shadow-emerald-400/40' },
  { name: 'Kiswahili', gradient: 'from-yellow-300 to-yellow-500', glow: 'shadow-yellow-400/40' },
  { name: 'Català', gradient: 'from-orange-300 to-orange-500', glow: 'shadow-orange-400/40' },
];

let nextId = 1;
function makeTile(activeTypes: number[]): Tile {
  const type = activeTypes[Math.floor(Math.random() * activeTypes.length)];
  return { id: nextId++, type };
}

export function pickActiveTypes(): number[] {
  const indices = ALL_LANGUAGES.map((_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  return indices.slice(0, ACTIVE_TYPE_COUNT);
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

export function createGrid(activeTypes: number[]): Tile[][] {
  const grid: (Tile | null)[][] = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(null));
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      let attempts = 0;
      do {
        grid[r][c] = makeTile(activeTypes);
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

export function applyGravityAndRefill(grid: Tile[][], cleared: Set<string>, activeTypes: number[]): Tile[][] {
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
      newGrid[r][c] = makeTile(activeTypes);
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
