import React from 'react';
import { useRates } from '../hooks/useRates';
import { formatRate } from '../data/rates';
import { Language } from '../types';
import { content } from '../translations';
import { RefreshCw } from 'lucide-react';

interface TickerProps {
  lang: Language;
}

export const Ticker: React.FC<TickerProps> = ({ lang }) => {
  const t = content[lang];
  const isArabic = lang === 'ar';
  const { currencies } = useRates();

  // Constant scroll speed regardless of how many currencies the feed has.
  const durationSeconds = Math.max(30, currencies.length * 4);

  return (
    <div className="w-full bg-slate-900/90 border-y border-slate-800 text-xs overflow-hidden py-2.5 relative select-none">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        
        {/* Sticky Label */}
        <div className="flex items-center gap-2 pr-4 pl-4 bg-slate-900 z-10 shrink-0 border-r border-slate-800 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-[#a6ce39] animate-ping" />
          <span className="font-bold text-slate-200 tracking-wide flex items-center gap-1.5 whitespace-nowrap">
            <RefreshCw className="w-3.5 h-3.5 text-[#00a3da]" />
            {isArabic ? 'الأسعار الفورية (مقابل ر.س)' : 'Live Rates (SAR)'}
          </span>
        </div>

        {/* Marquee Ticker Track */}
        <div className="relative overflow-hidden w-full flex">
          {/* Two identical copies, each item spaced with a trailing margin (not `gap`),
              so shifting by exactly 50% lands on the start of the second copy. */}
          <div
            className="animate-marquee flex items-center whitespace-nowrap py-0.5"
            style={{ animationDuration: `${durationSeconds}s` }}
          >
            {[...currencies, ...currencies].map((c, idx) => (
              <div
                key={`${c.code}-${idx}`}
                className="me-6 flex items-center gap-3 px-3 py-1 bg-slate-950/60 rounded-md border border-slate-800/80 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span className="text-sm">{c.flag}</span>
                  <span className="font-bold text-white text-xs">{c.code}</span>
                  <span className="text-[11px] text-slate-400">
                    {isArabic ? c.nameAr : c.nameEn}
                  </span>
                </div>

                <div className="flex items-center gap-2 font-mono text-[11px] tabular-nums">
                  <span className="text-slate-400">
                    {t.ticker.buy}: <strong className="text-white font-medium">{formatRate(c.boardBuy)}</strong>
                  </span>
                  <span className="text-slate-400">
                    {t.ticker.sell}: <strong className="text-[#a6ce39] font-medium">{formatRate(c.boardSell)}</strong>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
