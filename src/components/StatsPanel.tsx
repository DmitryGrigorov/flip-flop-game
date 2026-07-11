import type { FlipStats, SideLabels } from '../game/types';

interface StatsPanelProps {
  stats: FlipStats;
  labels: SideLabels;
  onReset: () => void;
}

export function StatsPanel({ stats, labels, onReset }: StatsPanelProps) {
  const total = stats.heads + stats.tails;
  const headsPct = total === 0 ? 50 : Math.round((stats.heads / total) * 100);

  return (
    <div className="stats">
      <div className="stats__row">
        <div className="stats__item">
          <span className="stats__value">{stats.heads}</span>
          <span className="stats__label">{labels.heads}</span>
        </div>
        <div className="stats__item">
          <span className="stats__value">{total}</span>
          <span className="stats__label">total</span>
        </div>
        <div className="stats__item">
          <span className="stats__value">{stats.tails}</span>
          <span className="stats__label">{labels.tails}</span>
        </div>
      </div>
      <div className="stats__bar">
        <span className="stats__bar-fill" style={{ width: `${headsPct}%` }} />
      </div>
      {total > 0 && (
        <button type="button" className="stats__reset" onClick={onReset}>
          Reset stats
        </button>
      )}
    </div>
  );
}
