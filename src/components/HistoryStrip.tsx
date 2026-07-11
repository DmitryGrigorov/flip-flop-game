import type { FlipRecord } from '../game/types';

interface HistoryStripProps {
  history: FlipRecord[];
}

export function HistoryStrip({ history }: HistoryStripProps) {
  if (history.length === 0) return null;

  return (
    <div className="history">
      {history.map((record) => (
        <span key={record.id} className={`history__chip history__chip--${record.side}`}>
          {record.side === 'heads' ? 'H' : 'T'}
        </span>
      ))}
    </div>
  );
}
