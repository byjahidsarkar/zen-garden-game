import { motion } from 'framer-motion';
import { Trophy, RefreshCw, Chrome as Home, Frown } from 'lucide-react';
import { useGameStore } from '../store';
import { difficultyConfig } from '../data/tiles';

export function WinModal() {
  const screen = useGameStore((s) => s.screen);
  const score = useGameStore((s) => s.score);
  const target = useGameStore((s) => s.target);
  const difficulty = useGameStore((s) => s.difficulty);
  const startGame = useGameStore((s) => s.startGame);
  const resetGame = useGameStore((s) => s.resetGame);

  const won = screen === 'won';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
    >
      <motion.div
        initial={{ scale: 0.5, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl border border-slate-700 p-8 max-w-sm w-full text-center shadow-2xl"
      >
        <motion.div
          animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 1.5 }}
          className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 shadow-lg ${
            won
              ? 'bg-gradient-to-br from-amber-400 to-amber-500 shadow-amber-900/40'
              : 'bg-gradient-to-br from-slate-600 to-slate-700 shadow-slate-900/40'
          }`}
        >
          {won ? <Trophy className="w-10 h-10 text-amber-900" /> : <Frown className="w-10 h-10 text-slate-300" />}
        </motion.div>

        <h2 className="font-bengali text-3xl font-bold text-zen-400 mb-1">
          {won ? 'দারুণ!' : 'আবার চেষ্টা করুন'}
        </h2>
        <p className="font-display text-slate-400 text-sm mb-6">
          {won ? `You reached ${target} points!` : `You needed ${target} but scored ${score}`}
        </p>

        <div className="rounded-xl bg-slate-800/80 border border-slate-700 py-4 mb-6">
          <p className="font-display text-xs text-slate-500 uppercase tracking-wide">Final Score</p>
          <p className="font-display text-3xl font-bold text-zen-400 tabular-nums">{score}</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => startGame(difficulty)}
            className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-zen-500 to-zen-600 py-3 font-display font-bold text-white hover:shadow-lg hover:shadow-teal-900/40 transition-shadow"
          >
            <RefreshCw className="w-4 h-4" />
            Play Again
          </button>
          <button
            onClick={resetGame}
            className="rounded-xl bg-slate-700 border border-slate-600 py-3 px-4 text-slate-300 hover:bg-slate-600 hover:text-white transition-colors"
          >
            <Home className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
