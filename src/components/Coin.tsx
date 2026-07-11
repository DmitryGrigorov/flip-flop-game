import { FLIP_DURATION_MS } from '../game/useCoinFlip';
import type { CoinSide, SideLabels } from '../game/types';

interface CoinProps {
  labels: SideLabels;
  rotation: number;
  isFlipping: boolean;
  side: CoinSide | null;
  onFlip: () => void;
}

export function Coin({ labels, rotation, isFlipping, side, onFlip }: CoinProps) {
  return (
    <button
      type="button"
      className="coin"
      onClick={onFlip}
      disabled={isFlipping}
      aria-label={side ? `Coin showing ${labels[side]}. Tap to flip again.` : 'Tap to flip the coin'}
    >
      <span
        className="coin__inner"
        style={{ transform: `rotateY(${rotation}deg)`, transitionDuration: `${FLIP_DURATION_MS}ms` }}
      >
        <span className="coin__face coin__face--heads">
          <span className="coin__ring" />
          <span className="coin__label">{labels.heads}</span>
        </span>
        <span className="coin__face coin__face--tails">
          <span className="coin__ring" />
          <span className="coin__label">{labels.tails}</span>
        </span>
      </span>
    </button>
  );
}
