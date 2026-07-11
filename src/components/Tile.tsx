import { motion } from 'framer-motion';
import { ALL_LANGUAGES, type Tile as TileType } from '../data/tiles';

interface TileProps {
  tile: TileType;
  row: number;
  col: number;
  selected: boolean;
  onClick: () => void;
}

export function TileView({ tile, row, col, selected, onClick }: TileProps) {
  const def = ALL_LANGUAGES[tile.type];

  return (
    <motion.button
      layout
      layoutId={`tile-${tile.id}`}
      initial={{ scale: 0, opacity: 0 }}
      animate={
        tile.clearing
          ? { scale: 0, opacity: 0, rotate: 180 }
          : { scale: 1, opacity: 1, rotate: 0 }
      }
      exit={{ scale: 0, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      data-row={row}
      data-col={col}
      className={`relative w-full aspect-square rounded-lg bg-gradient-to-br ${def.gradient} flex items-center justify-center shadow-md ${def.glow} border border-white/20 ${
        selected ? 'ring-4 ring-white scale-110 z-10' : ''
      }`}
    >
      <span className="font-mixed text-[10px] sm:text-xs font-bold text-white text-center px-0.5 leading-tight drop-shadow break-words">
        {def.name}
      </span>
    </motion.button>
  );
}
