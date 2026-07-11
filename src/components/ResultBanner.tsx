import type { CoinSide, SideLabels } from '../game/types';

interface ResultBannerProps {
  side: CoinSide | null;
  labels: SideLabels;
  isFlipping: boolean;
}

export function ResultBanner({ side, labels, isFlipping }: ResultBannerProps) {
  if (isFlipping) {
    return <p className="result result--flipping">Flipping…</p>;
  }
  if (!side) {
    return <p className="result result--idle">Tap the coin to decide</p>;
  }
  return (
    <p key={side} className="result result--landed">
      {labels[side]}!
    </p>
  );
}
