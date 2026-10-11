import React, { useState } from 'react';
import { useRates } from '../hooks/useRates';
import { formatRate } from '../data/rates';
import { Language } from '../types';
import { content } from '../translations';
import {
  Search,
  ArrowUpDown,
  RefreshCw,
  AlertTriangle,
  Coins,
  ArrowRight,
} from 'lucide-react';

interface RatesTableProps {
  lang: Language;
  onSelectCurrency: (code: string) => void;
}

export const RatesTable: React.FC<RatesTableProps> = ({
  lang,
  onSelectCurrency,
}) => {
  const t = content[lang];
  const isArabic = lang === 'ar';

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { currencies, updatedAt, loading, error } = useRates();

  // Filtering
  const filteredCurrencies = currencies.filter((c) => {
    // category check
    if (activeCategory !== 'all' && c.category !== activeCategory) {
      return false;
    }
    // search check
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      c.code.toLowerCase().includes(q) ||
      c.nameAr.toLowerCase().includes(q) ||
      c.nameEn.toLowerCase().includes(q)
    );
  });

  return (
    <section id="rates" className="py-16 bg-slate-950/60 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#a6ce39] uppercase tracking-wider mb-2">
              <Coins className="w-4 h-4" />
              <span>{isArabic ? 'لوحة أسعار الصرف الرسمية' : 'Official Exchange Rates'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {t.ratesTable.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              {t.ratesTable.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
            <RefreshCw className="w-3.5 h-3.5 text-[#00a3da] animate-spin" style={{ animationDuration: '6s' }} />
            <span>
              {updatedAt
                ? isArabic
                  ? `آخر تحديث: ${updatedAt.date} - ${updatedAt.time}`
                  : `Last updated: ${updatedAt.date} at ${updatedAt.time}`
                : isArabic
                ? 'مقابل الريال السعودي (SAR)'
                : 'Against SAR'}
            </span>
          </div>
        </div>

        {error && (
          <div className="mb-4 flex items-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-2.5 text-xs text-amber-300">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>
              {currencies.length
                ? isArabic
                  ? 'تعذر تحديث الأسعار، يتم عرض آخر أسعار متوفرة.'
                  : 'Could not refresh rates; showing the last available rates.'
                : isArabic
                ? 'تعذر تحميل الأسعار حالياً، يرجى المحاولة لاحقاً.'
                : 'Rates are unavailable right now, please try again later.'}
            </span>
          </div>
        )}

        {/* Filter Controls Bar */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between mb-6">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900 rounded-xl border border-slate-800">
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                activeCategory === 'all'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {t.ratesTable.all}
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory('pilgrimage')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                activeCategory === 'pilgrimage'
                  ? 'bg-[#a6ce39] text-slate-950 shadow-sm font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {t.ratesTable.pilgrimage}
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory('major')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                activeCategory === 'major'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {t.ratesTable.major}
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory('gcc')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                activeCategory === 'gcc'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {t.ratesTable.gcc}
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory('asian')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                activeCategory === 'asian'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {t.ratesTable.asian}
            </button>
          </div>

          {/* Search Box */}
          <div className="relative min-w-[240px] sm:w-72">
            <Search className="w-4 h-4 absolute top-1/2 -translate-y-1/2 right-3 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.ratesTable.searchPlaceholder}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pr-9 pl-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#a6ce39] transition-colors"
            />
          </div>

        </div>

        {/* Rates Table Container */}
        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60 shadow-xl">
          <table className="w-full text-start border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/90 text-slate-400 font-semibold">
                <th className="py-3.5 px-4 text-start">{t.ratesTable.colCurrency}</th>
                <th className="py-3.5 px-4 text-start">{t.ratesTable.colCode}</th>
                <th className="py-3.5 px-4 text-start font-mono">{t.ratesTable.colBuy}</th>
                <th className="py-3.5 px-4 text-start font-mono">{t.ratesTable.colSell}</th>
                <th className="py-3.5 px-4 text-end">{t.ratesTable.colAction}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70">
              {filteredCurrencies.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-500">
                    {loading
                      ? isArabic ? 'جاري تحميل الأسعار...' : 'Loading rates...'
                      : isArabic ? 'لم يتم العثور على عملات مطابقة لبحثك' : 'No matching currencies found'}
                  </td>
                </tr>
              ) : (
                filteredCurrencies.map((c) => (
                  <tr
                    key={c.code}
                    className="hover:bg-slate-800/50 transition-colors group"
                  >
                    {/* Currency Name & Flag */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2.5">
                        <span className="text-xl sm:text-2xl">{c.flag}</span>
                        <div>
                          <div className="font-bold text-white group-hover:text-[#a6ce39] transition-colors">
                            {isArabic ? c.nameAr : c.nameEn}
                          </div>
                          <div className="text-[11px] text-slate-400">
                            {c.category === 'pilgrimage'
                              ? isArabic ? 'عملات الحج والعمرة' : 'Pilgrimage Currency'
                              : c.category === 'gcc'
                              ? isArabic ? 'عملة خليجية' : 'GCC Currency'
                              : c.category === 'asian'
                              ? isArabic ? 'عملة آسيوية' : 'Asian Currency'
                              : c.category === 'major'
                              ? isArabic ? 'عملة رئيسية' : 'Major Currency'
                              : isArabic ? 'عملات أخرى' : 'Other Currency'}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Code */}
                    <td className="py-3.5 px-4 whitespace-nowrap font-mono font-bold text-slate-300">
                      {c.code}
                    </td>

                    {/* Buy Rate */}
                    <td className="py-3.5 px-4 whitespace-nowrap font-mono tabular-nums text-slate-200">
                      {formatRate(c.boardBuy)}
                      {c.quotedPerSar && (
                        <div className="text-[10px] font-sans font-normal text-slate-500">
                          {isArabic ? 'مقابل ١ ريال' : 'per 1 SAR'}
                        </div>
                      )}
                    </td>

                    {/* Sell Rate */}
                    <td className="py-3.5 px-4 whitespace-nowrap font-mono tabular-nums font-bold text-[#a6ce39]">
                      {formatRate(c.boardSell)}
                      {c.quotedPerSar && (
                        <div className="text-[10px] font-sans font-normal text-slate-500">
                          {isArabic ? 'مقابل ١ ريال' : 'per 1 SAR'}
                        </div>
                      )}
                    </td>

                    {/* Action */}
                    <td className="py-3.5 px-4 whitespace-nowrap text-end">
                      <button
                        type="button"
                        onClick={() => {
                          onSelectCurrency(c.code);
                          const el = document.getElementById('converter');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-[#00a3da] text-slate-200 hover:text-white transition-all border border-slate-700 hover:border-[#00a3da]"
                      >
                        <span>{t.ratesTable.actionConvert}</span>
                        <ArrowRight className="w-3 h-3 rtl:rotate-180" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table footer note */}
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-500 gap-2">
          <p>
            * {isArabic
              ? 'الأسعار المعروضة هي أسعار الصرف الرسمية لشباك صالات الحج والعمرة بمطار الملك عبدالعزيز الدولي وتخضع لتقلبات السوق الدولية.'
              : 'Rates displayed are official counter rates at the KAIA Hajj Terminal and are subject to market changes.'}
          </p>
          <div className="whitespace-nowrap font-medium text-slate-400">
            {isArabic ? 'الترخيص: ١٠٩-ج/ص' : 'License: 109-J/S'}
          </div>
        </div>

      </div>
    </section>
  );
};
