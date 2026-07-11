import { useCallback, useEffect, useRef, useState } from 'react';
import { DEFAULT_LABELS, type CoinSide, type FlipRecord, type FlipStats, type SideLabels } from './types';

const STATS_KEY = 'flip-flop:coin-stats';
const HISTORY_KEY = 'flip-flop:coin-history';
const LABELS_KEY = 'flip-flop:coin-labels';
const HISTORY_LIMIT = 20;

export const FLIP_DURATION_MS = 900;

function loadJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function saveJSON(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage unavailable — ignore
  }
}

export function useCoinFlip() {
  const [side, setSide] = useState<CoinSide | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [stats, setStats] = useState<FlipStats>(() => loadJSON(STATS_KEY, { heads: 0, tails: 0 }));
  const [history, setHistory] = useState<FlipRecord[]>(() => loadJSON(HISTORY_KEY, []));
  const [labels, setLabels] = useState<SideLabels>(() => loadJSON(LABELS_KEY, DEFAULT_LABELS));

  const nextId = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const flip = useCallback(() => {
    if (isFlipping) return;
    setIsFlipping(true);

    const result: CoinSide = Math.random() < 0.5 ? 'heads' : 'tails';
    const currentlyShowing = side ?? 'heads';
    const spins = 4 + Math.floor(Math.random() * 2);

    setRotation((prev) => prev + spins * 360 + (currentlyShowing === result ? 0 : 180));

    if (navigator.vibrate) navigator.vibrate(15);

    timeoutRef.current = setTimeout(() => {
      setSide(result);
      setIsFlipping(false);
      setStats((prev) => {
        const next = { ...prev, [result]: prev[result] + 1 };
        saveJSON(STATS_KEY, next);
        return next;
      });
      setHistory((prev) => {
        const next = [{ id: nextId.current++, side: result }, ...prev].slice(0, HISTORY_LIMIT);
        saveJSON(HISTORY_KEY, next);
        return next;
      });
    }, FLIP_DURATION_MS);
  }, [isFlipping, side]);

  const reset = useCallback(() => {
    setStats({ heads: 0, tails: 0 });
    setHistory([]);
    saveJSON(STATS_KEY, { heads: 0, tails: 0 });
    saveJSON(HISTORY_KEY, []);
  }, []);

  const updateLabels = useCallback((next: SideLabels) => {
    setLabels(next);
    saveJSON(LABELS_KEY, next);
  }, []);

  return { side, isFlipping, rotation, stats, history, labels, flip, reset, updateLabels };
}
