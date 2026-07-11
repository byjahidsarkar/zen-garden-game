import { motion } from 'framer-motion';
import { Clock, Target, RotateCcw, Chrome as Home } from 'lucide-react';
import { useGameStore } from '../store';

function formatTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, '0')}`;
}

export function StatsBar() {
  const moves = useGameStore((s) => s.moves);
  const matches = useGameStore((s) => s.matches);
  const totalPairs = useGameStore((s) => s.totalPairs);
  const elapsed = useGameStore((s) => s.elapsed);
  const resetGame = useGameStore((s) => s.resetGame);

  return (
    <div className="flex items-center justify-between gap-3 mb-4">
      <div className="flex gap-2">
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center gap-1.5 rounded-xl bg-slate-800/80 px-3 py-2 border border-slate-700"
        >
          <Clock className="w-4 h-4 text-zen-400" />
          <span className="font-display text-sm font-semibold text-slate-100 tabular-nums">{formatTime(elapsed)}</span>
        </motion.div>
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.05 }}
          className="flex items-center gap-1.5 rounded-xl bg-slate-800/80 px-3 py-2 border border-slate-700"
        >
          <Target className="w-4 h-4 text-zen-400" />
          <span className="font-display text-sm font-semibold text-slate-100 tabular-nums">
            {matches}/{totalPairs}
          </span>
        </motion.div>
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-1.5 rounded-xl bg-slate-800/80 px-3 py-2 border border-slate-700"
        >
          <span className="font-display text-sm font-semibold text-slate-100 tabular-nums">{moves} moves</span>
        </motion.div>
      </div>
      <button
        onClick={resetGame}
        className="flex items-center gap-1.5 rounded-xl bg-slate-800/80 px-3 py-2 border border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
      >
        <Home className="w-4 h-4" />
      </button>
    </div>
  );
}
