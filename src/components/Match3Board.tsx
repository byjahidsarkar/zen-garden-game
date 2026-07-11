import { useGameStore } from '../store';
import { GRID_SIZE } from '../data/tiles';
import { TileView } from './Tile';

export function Match3Board() {
  const grid = useGameStore((s) => s.grid);
  const selected = useGameStore((s) => s.selected);
  const selectTile = useGameStore((s) => s.selectTile);
  const busy = useGameStore((s) => s.busy);

  return (
    <div
      className="relative grid gap-1 sm:gap-1.5 p-2 sm:p-3 rounded-2xl bg-slate-800/60 border border-slate-700 shadow-2xl"
      style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))`, touchAction: 'none' }}
    >
      {grid.map((row, r) =>
        row.map((tile, c) => (
          <TileView
            key={tile.id}
            tile={tile}
            row={r}
            col={c}
            selected={!!selected && selected[0] === r && selected[1] === c}
            onClick={() => !busy && selectTile(r, c)}
          />
        )),
      )}
    </div>
  );
}
