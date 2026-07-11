import { useEffect } from 'react';
import { useGameStore } from './store';
import { StartScreen } from './components/StartScreen';
import { GameBoard } from './components/GameBoard';
import { StatsBar } from './components/StatsBar';
import { WinModal } from './components/WinModal';

export default function App() {
  const screen = useGameStore((s) => s.screen);
  const tick = useGameStore((s) => s.tick);

  useEffect(() => {
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [tick]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-4 max-w-2xl mx-auto w-full py-8">
        {screen === 'start' && <StartScreen />}
        {screen === 'playing' && (
          <>
            <StatsBar />
            <GameBoard />
          </>
        )}
        {screen === 'won' && (
          <>
            <StatsBar />
            <GameBoard />
            <WinModal />
          </>
        )}
      </div>
    </div>
  );
}
