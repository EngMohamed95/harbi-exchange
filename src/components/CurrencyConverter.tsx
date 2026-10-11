import React, { useState, useId, useEffect } from 'react';
import { useRates } from '../hooks/useRates';
import { formatRate } from '../data/rates';
import { Language } from '../types';
import { content } from '../translations';
import { ArrowLeftRight, CheckCircle2, ShieldCheck, Calculator } from 'lucide-react';

interface CurrencyConverterProps {
  lang: Language;
  selectedCurrencyCode?: string;
}

export const CurrencyConverter: React.FC<CurrencyConverterProps> = ({
  lang,
  selectedCurrencyCode = 'USD',
}) => {
  const t = content[lang];
  const isArabic = lang === 'ar';
  const amountInputId = useId();

  // Mode: 'buy' = Client gives SAR, receives foreign currency
  // 'sell' = Client gives foreign currency, receives SAR
  const [mode, setMode] = useState<'buy' | 'sell'>('sell');
  const [foreignCode, setForeignCode] = useState<string>(selectedCurrencyCode);
  const [amount, setAmount] = useState<number>(1000);

  // Follow currency picks made outside the converter (e.g. the rates table).
  useEffect(() => {
    setForeignCode(selectedCurrencyCode);
  }, [selectedCurrencyCode]);

  const { currencies, error } = useRates();

  const selectedCurrency =
    currencies.find((c) => c.code === foreignCode) || currencies[0];

  if (!selectedCurrency) {
    return (
      <div
        id="converter"
        className="bg-slate-900/90 border border-slate-800 rounded-2xl p-7 shadow-2xl text-center text-sm text-slate-400"
      >
        {error
          ? isArabic ? 'تعذر تحميل الأسعار حالياً، يرجى المحاولة لاحقاً.' : 'Rates are unavailable right now, please try again later.'
          : isArabic ? 'جاري تحميل الأسعار...' : 'Loading rates...'}
      </div>
    );
  }

  // Calculation
  // In SAR: 1 unit of foreign currency = buyRate or sellRate
  // When client SELLS foreign currency to us -> We BUY it at buyRate
  // When client BUYS foreign currency from us -> We SELL it at sellRate
  const rate = mode === 'sell' ? selectedCurrency.buyRate : selectedCurrency.sellRate;

  // If client sells foreign currency:
  // e.g., 1000 USD -> 1000 * buyRate = 3748 SAR
  // If client buys foreign currency:
  // e.g. gives SAR amount or specifies target foreign amount
  const calculatedResult =
    mode === 'sell' ? amount * rate : rate > 0 ? amount / rate : 0;

  const quickCurrencies = ['USD', 'EUR', 'GBP', 'AED', 'EGP', 'IDR', 'TRY', 'PKR'];
  const quickAmounts = [500, 1000, 2500, 5000, 10000];

  return (
    <div
      id="converter"
      className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-7 shadow-2xl relative overflow-hidden backdrop-blur-md"
    >
      {/* Decorative gradient glow */}
      <div className="absolute -top-24 -right-24 w-60 h-60 bg-[#a6ce39]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-[#00a3da]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Calculator className="w-5 h-5 text-[#a6ce39]" />
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              {t.converter.title}
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            {t.converter.subtitle}
          </p>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex items-center p-1 bg-slate-950 rounded-xl border border-slate-800 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setMode('sell')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
              mode === 'sell'
                ? 'bg-[#a6ce39] text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {isArabic ? 'بيع العملة (استلام ر.س)' : 'Sell Currency (Get SAR)'}
          </button>
          <button
            type="button"
            onClick={() => setMode('buy')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
              mode === 'buy'
                ? 'bg-[#00a3da] text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {isArabic ? 'شراء العملة (دفع ر.س)' : 'Buy Currency (Pay SAR)'}
          </button>
        </div>
      </div>

      {/* Quick Currency Selector Strip */}
      <div className="mb-5 flex flex-wrap items-center gap-1.5">
        <span className="text-[11px] text-slate-400 ml-2">
          {isArabic ? 'عملات شائعة:' : 'Popular:'}
        </span>
        {quickCurrencies.map((code) => {
          const curr = currencies.find((c) => c.code === code);
          if (!curr) return null;
          const isSelected = foreignCode === code;
          return (
            <button
              key={code}
              type="button"
              onClick={() => setForeignCode(code)}
              className={`px-2.5 py-1 text-xs font-medium rounded-lg border transition-all flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-slate-800 border-[#a6ce39] text-white shadow-sm font-bold'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              <span>{curr.flag}</span>
              <span>{code}</span>
            </button>
          );
        })}
      </div>

      {/* Converter Inputs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10 mb-6">
        
        {/* Source Field */}
        <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 flex flex-col gap-2">
          <label htmlFor={amountInputId} className="text-xs font-semibold text-slate-400 flex justify-between items-center">
            <span>
              {mode === 'sell'
                ? isArabic
                  ? 'المبلغ بالعملة الأجنبية'
                  : 'Foreign Currency Amount'
                : isArabic
                ? 'المبلغ بالريال السعودي'
                : 'Amount in SAR'}
            </span>
            <span className="text-[11px] text-[#a6ce39]">
              {mode === 'sell' ? selectedCurrency.code : 'SAR'}
            </span>
          </label>

          <div className="flex items-center gap-2">
            <input
              id={amountInputId}
              type="number"
              min="1"
              value={amount || ''}
              onChange={(e) => setAmount(Math.max(0, parseFloat(e.target.value) || 0))}
              className="min-w-0 flex-1 bg-transparent text-2xl sm:text-3xl font-bold font-mono text-white focus:outline-none tabular-nums"
              placeholder="1000"
            />
            {mode === 'sell' ? (
              <select
                aria-label={isArabic ? 'اختر العملة الأجنبية' : 'Select foreign currency'}
                value={foreignCode}
                onChange={(e) => setForeignCode(e.target.value)}
                className="w-32 shrink-0 truncate bg-slate-900 border border-slate-700 text-white font-semibold text-xs sm:text-sm rounded-lg px-2.5 py-2 focus:outline-none focus:border-[#a6ce39] cursor-pointer"
              >
                {currencies.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.code} - {isArabic ? c.nameAr : c.nameEn}
                  </option>
                ))}
              </select>
            ) : (
              <div className="shrink-0 px-3 py-2 bg-slate-900 border border-slate-800 text-white rounded-lg text-xs font-bold whitespace-nowrap">
                🇸🇦 SAR
              </div>
            )}
          </div>

          {/* Quick amount presets */}
          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800/80">
            {quickAmounts.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setAmount(preset)}
                className={`text-[10px] px-2 py-0.5 rounded font-mono transition-colors ${
                  amount === preset
                    ? 'bg-[#a6ce39]/20 text-[#a6ce39] border border-[#a6ce39]/40 font-bold'
                    : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                {preset.toLocaleString()}
              </button>
            ))}
          </div>
        </div>

        {/* Swap visual button */}
        <div className="flex md:hidden justify-center -my-2 relative z-20">
          <button
            type="button"
            onClick={() => setMode(mode === 'sell' ? 'buy' : 'sell')}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-[#a6ce39] rounded-full border border-slate-700 shadow-md transition-transform active:rotate-180"
            title="تبديل"
          >
            <ArrowLeftRight className="w-4 h-4" />
          </button>
        </div>

        {/* Destination Field */}
        <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center text-xs font-semibold text-slate-400 mb-2">
              <span>
                {mode === 'sell'
                  ? isArabic
                    ? 'ستحصل على (ريال سعودي)'
                    : 'You will receive (SAR)'
                  : isArabic
                  ? `ستحصل على (${selectedCurrency.code})`
                  : `You will receive (${selectedCurrency.code})`}
              </span>
              <span className="text-[11px] text-[#00a3da]">
                {mode === 'sell' ? '🇸🇦 SAR' : selectedCurrency.code}
              </span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold font-mono text-[#a6ce39] tabular-nums">
                {calculatedResult.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
              <span className="text-xs font-bold text-slate-300">
                {mode === 'sell' ? 'SAR' : selectedCurrency.code}
              </span>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span>{t.converter.exchangeRate}</span>
            <span className="font-mono text-white font-bold tabular-nums">
              {selectedCurrency.quotedPerSar
                ? `1 SAR = ${formatRate(mode === 'sell' ? selectedCurrency.boardBuy : selectedCurrency.boardSell)} ${selectedCurrency.code}`
                : `1 ${selectedCurrency.code} = ${formatRate(rate)} SAR`}
            </span>
          </div>
        </div>

      </div>

      {/* Trust Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-950/90 border border-slate-800 text-xs">
        <div className="flex items-center gap-3 text-slate-300">
          <ShieldCheck className="w-5 h-5 text-[#a6ce39] shrink-0" />
          <div>
            <p className="font-semibold text-white">
              {isArabic ? 'بدون أي عمولات أو رسوم إضافية' : 'Zero Hidden Fees & Commission'}
            </p>
            <p className="text-[11px] text-slate-400">
              {isArabic
                ? 'استلام فوري للسيولة من شباك المطار مع إيصال رسمي معتمد من ساما'
                : 'Instant counter cash pickup at KAIA airport with official SAMA receipts'}
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
