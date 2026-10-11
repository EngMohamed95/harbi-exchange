import React from 'react';
import { Language } from '../types';
import { content } from '../translations';
import { CurrencyConverter } from './CurrencyConverter';
import {
  ShieldCheck,
  Building2,
  Clock,
  Coins,
  MapPin,
  ChevronDown,
  ArrowUpRight,
  PhoneCall,
  Sparkles,
} from 'lucide-react';

interface HeroProps {
  lang: Language;
  onOpenBooking: () => void;
  onSelectCurrency: (currencyCode: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  lang,
  onOpenBooking,
  onSelectCurrency,
}) => {
  const t = content[lang];
  const isArabic = lang === 'ar';

  return (
    <section className="relative pt-8 pb-16 lg:pt-14 lg:pb-24 overflow-hidden">
      {/* Background architectural glow & subtle grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(166,206,57,0.12),rgba(255,255,255,0))] pointer-events-none" />
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-[#00a3da]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-[#a6ce39]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Trust Kicker: SAMA License & Official Status */}
        <div className="flex flex-wrap items-center gap-2.5 text-xs text-slate-300 mb-6 bg-slate-900/80 border border-slate-800 rounded-full px-4 py-1.5 w-fit shadow-inner">
          <span className="flex items-center gap-1.5 text-[#a6ce39] font-bold">
            <ShieldCheck className="w-4 h-4 text-[#a6ce39]" />
            {isArabic ? 'خاضعة لرقابة وإشراف البنك المركزي السعودي (ساما)' : 'Regulated by Saudi Central Bank (SAMA)'}
          </span>
          <span className="text-slate-600">·</span>
          <span className="font-mono text-slate-300">
            {isArabic ? 'ترخيص رقم ١٠٩-ج/ص' : 'License 109-J/S'}
          </span>
          <span className="text-slate-600 hidden sm:inline">·</span>
          <span className="hidden sm:inline text-slate-400">
            {isArabic ? 'مطار الملك عبدالعزيز الدولي بجدة' : 'KAIA Airport Jeddah'}
          </span>
        </div>

        {/* 2-Column Split: Headline & Value Proposition vs Interactive Converter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-16">
          
          {/* Column 1: Typography & Company Identity */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.2] text-balance">
                <span className="block text-slate-200">
                  {isArabic ? 'شركة مطير عواد الحربي وشركاؤه' : 'Mutair Awwad Al-Harbi & Partners'}
                </span>
                <span className="bg-gradient-to-r from-[#a6ce39] via-[#00a3da] to-[#00c2ff] bg-clip-text text-transparent">
                  {isArabic ? 'للصرافة المعتمدة' : 'Exchange Company'}
                </span>
                <span className="block text-2xl sm:text-3xl lg:text-4xl text-slate-300 font-bold mt-2">
                  {isArabic ? 'في مجمع صالات الحج والعمرة' : 'At Hajj & Umrah Terminal Complex'}
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
                {t.hero.description}
              </p>
            </div>

            {/* Quick Badges of Official Registration */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl">
                <div className="text-[11px] text-slate-400">{t.capitalTitle}</div>
                <div className="text-sm font-bold text-white font-mono">{t.capitalVal}</div>
              </div>
              <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl">
                <div className="text-[11px] text-slate-400">{t.crTitle}</div>
                <div className="text-sm font-bold text-[#a6ce39] font-mono">{t.crVal}</div>
              </div>
              <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl col-span-2 sm:col-span-1">
                <div className="text-[11px] text-slate-400">{t.unifiedNumberTitle}</div>
                <div className="text-sm font-bold text-[#00a3da] font-mono">{t.unifiedNumberVal}</div>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <button
                type="button"
                onClick={onOpenBooking}
                className="px-6 py-3.5 text-sm font-bold text-slate-950 bg-gradient-to-r from-[#a6ce39] to-[#92ba2b] hover:brightness-105 active:scale-[0.98] rounded-xl transition-all shadow-lg brand-glow-lime flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isArabic ? 'احجز استلام العملات بالمطار' : 'Book Airport Cash Pickup'}</span>
              </button>

              <a
                href={`tel:${t.tollFree}`}
                className="px-5 py-3.5 text-sm font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 rounded-xl transition-all flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-[#00a3da]" />
                <span>{isArabic ? `اتصل بنا: ${t.tollFree}` : `Toll-Free: ${t.tollFree}`}</span>
              </a>
            </div>

            {/* Location marker snippet */}
            <div className="flex items-start gap-2.5 text-xs text-slate-400 pt-1">
              <MapPin className="w-4 h-4 text-[#a6ce39] shrink-0 mt-0.5" />
              <span>{t.headquartersVal}</span>
            </div>

          </div>

          {/* Column 2: Live Currency Converter Card */}
          <div className="lg:col-span-6">
            <CurrencyConverter
              lang={lang}
              onBookRate={(from, to, amount) => {
                onOpenBooking();
              }}
            />
          </div>

        </div>

        {/* Full-width 4-Column KPI Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-800/80">
          
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[#a6ce39]/10 text-[#a6ce39] flex items-center justify-center mb-3">
              <Coins className="w-5 h-5" />
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-white font-mono tabular-nums">
              {t.hero.stats.currencies}
            </div>
            <div className="text-xs text-slate-400 mt-1">
              {t.hero.stats.currenciesDesc}
            </div>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[#00a3da]/10 text-[#00a3da] flex items-center justify-center mb-3">
              <Clock className="w-5 h-5" />
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-white font-mono tabular-nums">
              {t.hero.stats.hours}
            </div>
            <div className="text-xs text-slate-400 mt-1">
              {t.hero.stats.hoursDesc}
            </div>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[#a6ce39]/10 text-[#a6ce39] flex items-center justify-center mb-3">
              <Building2 className="w-5 h-5" />
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-white font-mono tabular-nums">
              {t.hero.stats.capital}
            </div>
            <div className="text-xs text-slate-400 mt-1">
              {t.hero.stats.capitalDesc}
            </div>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[#00a3da]/10 text-[#00a3da] flex items-center justify-center mb-3">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-white font-mono">
              {isArabic ? 'صالات الحج والعمرة' : 'Hajj & Umrah Terminal'}
            </div>
            <div className="text-xs text-slate-400 mt-1">
              {isArabic ? 'مطار الملك عبدالعزيز الدولي' : 'King Abdulaziz Int. Airport'}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
