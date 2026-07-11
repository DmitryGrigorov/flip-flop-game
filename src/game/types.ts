export type CoinSide = 'heads' | 'tails';

export interface SideLabels {
  heads: string;
  tails: string;
}

export interface FlipRecord {
  id: number;
  side: CoinSide;
}

export interface FlipStats {
  heads: number;
  tails: number;
}

export const DEFAULT_LABELS: SideLabels = {
  heads: 'Heads',
  tails: 'Tails',
};
