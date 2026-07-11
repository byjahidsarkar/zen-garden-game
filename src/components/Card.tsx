import { motion } from 'framer-motion';
import type { CardData } from '../data/characters';

interface CardProps {
  card: CardData;
  onClick: (uid: number) => void;
  disabled: boolean;
  cols: number;
}

export function Card({ card, onClick, disabled, cols }: CardProps) {
  const handleClick = () => {
    if (!disabled && !card.flipped && !card.matched) {
      onClick(card.uid);
    }
  };

  const sizeClass = cols <= 4 ? 'h-24 sm:h-28 text-5xl' : 'h-20 sm:h-24 text-4xl';

  return (
    <div
      className={`card-3d cursor-pointer select-none ${card.matched ? 'pointer-events-none' : ''}`}
      onClick={handleClick}
    >
      <motion.div
        className={`card-inner relative w-full ${sizeClass} ${card.flipped || card.matched ? 'card-flipped' : ''}`}
        whileTap={{ scale: card.flipped || card.matched ? 1 : 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      >
        {/* Back face */}
        <div className="card-face absolute inset-0 rounded-xl bg-gradient-to-br from-zen-500 to-zen-600 flex items-center justify-center shadow-lg shadow-teal-900/40 border border-teal-400/30">
          <span className="font-display text-2xl font-bold text-teal-50/90">বাংলা</span>
        </div>

        {/* Front face */}
        <div
          className={`card-face card-back absolute inset-0 rounded-xl flex flex-col items-center justify-center shadow-lg border-2 ${
            card.matched
              ? 'bg-gradient-to-br from-amber-400 to-amber-500 border-amber-300 shadow-amber-900/40'
              : 'bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200 shadow-slate-900/30'
          }`}
        >
          <span className={`font-bengali font-bold leading-none ${card.matched ? 'text-amber-900' : 'text-slate-800'}`}>
            {card.character}
          </span>
          <span className={`text-base mt-0.5 ${card.matched ? 'text-amber-800' : 'text-slate-400'}`}>{card.emoji}</span>
        </div>
      </motion.div>
    </div>
  );
}
