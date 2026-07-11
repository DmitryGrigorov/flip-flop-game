import { useState } from 'react';
import './App.css';
import { Coin } from './components/Coin';
import { HistoryStrip } from './components/HistoryStrip';
import { InstallPrompt } from './components/InstallPrompt';
import { LabelsEditor } from './components/LabelsEditor';
import { ResultBanner } from './components/ResultBanner';
import { StatsPanel } from './components/StatsPanel';
import { useCoinFlip } from './game/useCoinFlip';

function App() {
  const { side, isFlipping, rotation, stats, history, labels, flip, reset, updateLabels } = useCoinFlip();
  const [editingLabels, setEditingLabels] = useState(false);

  return (
    <div className="app">
      <header className="header">
        <div className="header__spacer" />
        <div>
          <h1 className="header__title">Flip Flop</h1>
          <p className="header__subtitle">Can't decide? Let the coin choose.</p>
        </div>
        <button
          type="button"
          className="icon-button"
          onClick={() => setEditingLabels(true)}
          aria-label="Customize coin sides"
        >
          ⚙
        </button>
      </header>

      <div className="stage">
        <Coin labels={labels} rotation={rotation} isFlipping={isFlipping} side={side} onFlip={flip} />
        <ResultBanner side={side} labels={labels} isFlipping={isFlipping} />
        <button type="button" className="button button--primary button--flip" onClick={flip} disabled={isFlipping}>
          {isFlipping ? 'Flipping…' : side ? 'Flip again' : 'Flip the coin'}
        </button>
      </div>

      <HistoryStrip history={history} />
      <StatsPanel stats={stats} labels={labels} onReset={reset} />

      {editingLabels && (
        <LabelsEditor labels={labels} onChange={updateLabels} onClose={() => setEditingLabels(false)} />
      )}

      <InstallPrompt />
    </div>
  );
}

export default App;
