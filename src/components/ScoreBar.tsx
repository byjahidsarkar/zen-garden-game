import { motion } from 'framer-motion';
import { Star, Zap, Chrome as Home } from 'lucide-react';
import { useGameStore } from '../store';

export function ScoreBar() {
  const score = useGameStore((s) => s.score);
  const target = useGameStore((s) => s.target);
  const movesLeft = useGameStore((s) => s.movesLeft);
  const resetGame = useGameStore((s) => s.resetGame);
  const progress = Math.min(100, (score / target) * 100);

  return (
    <div className="w-full max-w-md mx-auto mb-4">
      <div className="flex items-center justify-between gap-3 mb-2">
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center gap-1.5 rounded-xl bg-slate-800/80 px-3 py-2 border border-slate-700"
        >
          <Zap className="w-4 h-4 text-amber-400" />
          <span className="font-display text-sm font-bold text-slate-100 tabular-nums">{movesLeft}</span>
          <span className="font-display text-xs text-slate-500">moves</span>
        </motion.div>
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.05 }}
          className="flex items-center gap-1.5 rounded-xl bg-slate-800/80 px-3 py-2 border border-slate-700"
        >
          <Star className="w-4 h-4 text-zen-400" />
          <span className="font-display text-sm font-bold text-slate-100 tabular-nums">{score}</span>
          <span className="font-display text-xs text-slate-500">/ {target}</span>
        </motion.div>
        <button
          onClick={resetGame}
          className="flex items-center gap-1.5 rounded-xl bg-slate-800/80 px-3 py-2 border border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
        >
          <Home className="w-4 h-4" />
        </button>
      </div>
      <div className="h-2 rounded-full bg-slate-800 overflow-hidden border border-slate-700">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-zen-500 to-zen-400"
          animate={{ width: `${progress}%` }}
          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        />
      </div>
    </div>
  );
}
