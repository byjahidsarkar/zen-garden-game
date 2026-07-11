import { motion } from 'framer-motion';
import { useGameStore } from '../store';
import { Card } from './Card';
import type { Difficulty } from '../data/characters';
import { difficultyConfig } from '../data/characters';

export function GameBoard() {
  const cards = useGameStore((s) => s.cards);
  const difficulty = useGameStore((s) => s.difficulty);
  const flippedUids = useGameStore((s) => s.flippedUids);
  const lock = useGameStore((s) => s.lock);
  const flipCard = useGameStore((s) => s.flipCard);

  const cols = difficultyConfig[difficulty as Difficulty].cols;

  return (
    <div
      className="grid gap-2 sm:gap-3 w-full max-w-2xl mx-auto"
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {cards.map((card) => (
        <motion.div
          key={card.uid}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: card.uid * 0.03, type: 'spring', stiffness: 300, damping: 24 }}
        >
          <Card
            card={card}
            onClick={flipCard}
            disabled={lock || flippedUids.length >= 2}
            cols={cols}
          />
        </motion.div>
      ))}
    </div>
  );
}
