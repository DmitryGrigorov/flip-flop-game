import { useState } from 'react';
import { DEFAULT_LABELS, type SideLabels } from '../game/types';

interface LabelsEditorProps {
  labels: SideLabels;
  onChange: (labels: SideLabels) => void;
  onClose: () => void;
}

export function LabelsEditor({ labels, onChange, onClose }: LabelsEditorProps) {
  const [heads, setHeads] = useState(labels.heads);
  const [tails, setTails] = useState(labels.tails);

  const apply = () => {
    onChange({
      heads: heads.trim() || DEFAULT_LABELS.heads,
      tails: tails.trim() || DEFAULT_LABELS.tails,
    });
    onClose();
  };

  return (
    <div className="sheet" role="dialog" aria-modal="true" aria-label="Customize coin sides">
      <div className="sheet__card">
        <h2>Customize the coin</h2>
        <p className="sheet__hint">Turn it into any two-way decision — e.g. "Pizza" vs "Sushi".</p>
        <label className="sheet__field">
          Side A
          <input
            value={heads}
            onChange={(e) => setHeads(e.target.value)}
            maxLength={16}
            placeholder="Heads"
          />
        </label>
        <label className="sheet__field">
          Side B
          <input
            value={tails}
            onChange={(e) => setTails(e.target.value)}
            maxLength={16}
            placeholder="Tails"
          />
        </label>
        <div className="sheet__actions">
          <button type="button" className="button button--primary" onClick={apply}>
            Save
          </button>
          <button type="button" className="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
