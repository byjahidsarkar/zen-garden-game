import { useGameStore } from './store';
import { StartScreen } from './components/StartScreen';
import { Match3Board } from './components/Match3Board';
import { ScoreBar } from './components/ScoreBar';
import { WinModal } from './components/WinModal';

export default function App() {
  const screen = useGameStore((s) => s.screen);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-4 max-w-lg mx-auto w-full py-8">
        {screen === 'start' && <StartScreen />}
        {(screen === 'playing' || screen === 'won' || screen === 'lost') && (
          <>
            <ScoreBar />
            <Match3Board />
          </>
        )}
        {(screen === 'won' || screen === 'lost') && <WinModal />}
      </div>
    </div>
  );
}
