import { motion } from 'framer-motion';
import { useState } from 'react';
import { useGameStore } from '../store';
import { difficultyConfig, LANGUAGES, type Difficulty } from '../data/tiles';

const difficulties: Difficulty[] = ['easy', 'medium', 'hard'];

export function StartScreen() {
  const startGame = useGameStore((s) => s.startGame);
  const [selected, setSelected] = useState<Difficulty>('medium');

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 26 }}
      className="flex flex-col items-center gap-6 w-full max-w-md mx-auto"
    >
      <div className="text-center">
        <motion.h1
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="font-mixed text-5xl font-bold text-zen-400 drop-shadow-lg"
        >
          লিঙ্গো ম্যাচ
        </motion.h1>
        <p className="font-display text-slate-400 mt-2 text-sm tracking-wide">
          Swap adjacent tiles to match 3 or more languages
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-2 max-w-xs">
        {LANGUAGES.map((lang) => (
          <span
            key={lang.name}
            className={`px-2.5 py-1 rounded-lg ${lang.bg} ${lang.text} font-mixed text-xs font-bold shadow-sm`}
          >
            {lang.name}
          </span>
        ))}
      </div>

      <div className="w-full">
        <p className="font-display text-sm text-slate-400 mb-2 text-center">Select difficulty</p>
        <div className="grid grid-cols-3 gap-2">
          {difficulties.map((d) => (
            <button
              key={d}
              onClick={() => setSelected(d)}
              className={`rounded-xl py-3 font-mixed text-lg font-bold border transition-all ${
                selected === d
                  ? 'bg-zen-500 text-white border-zen-400 shadow-lg shadow-teal-900/40 scale-105'
                  : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:border-slate-600'
              }`}
            >
              {difficultyConfig[d].label}
              <span className="block font-display text-xs font-normal mt-0.5">
                {difficultyConfig[d].moves} moves
              </span>
            </button>
          ))}
        </div>
      </div>

      <motion.button
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.03 }}
        onClick={() => startGame(selected)}
        className="w-full rounded-xl bg-gradient-to-r from-zen-500 to-zen-600 py-4 font-display text-lg font-bold text-white shadow-lg shadow-teal-900/40 hover:shadow-teal-700/50 transition-shadow"
      >
        শুরু করুন — Start
      </motion.button>
    </motion.div>
  );
}
