import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchRates, RatesSnapshot, RATES_REFRESH_MS } from '../data/rates';

interface RatesState extends RatesSnapshot {
  loading: boolean;
  error: string | null;
}

const RatesContext = createContext<RatesState | null>(null);

export const RatesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<RatesState>({
    currencies: [],
    updatedAt: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let controller: AbortController | null = null;

    const load = async () => {
      controller?.abort();
      controller = new AbortController();
      try {
        const snapshot = await fetchRates(controller.signal);
        setState({ ...snapshot, loading: false, error: null });
      } catch (err) {
        if ((err as Error).name === 'AbortError') return;
        // Keep showing the last good rates; just surface the error.
        setState((prev) => ({ ...prev, loading: false, error: (err as Error).message }));
      }
    };

    load();
    const timer = window.setInterval(load, RATES_REFRESH_MS);
    const onVisible = () => {
      if (document.visibilityState === 'visible') load();
    };
    document.addEventListener('visibilitychange', onVisible);

    return () => {
      controller?.abort();
      window.clearInterval(timer);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, []);

  return <RatesContext.Provider value={state}>{children}</RatesContext.Provider>;
};

export function useRates(): RatesState {
  const ctx = useContext(RatesContext);
  if (!ctx) throw new Error('useRates must be used inside <RatesProvider>');
  return ctx;
}
