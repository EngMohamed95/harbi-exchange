import React, { useState } from 'react';
import { Logo } from './Logo';
import { Phone, Globe, Menu, X } from 'lucide-react';
import { Language } from '../types';
import { content } from '../translations';

interface NavbarProps {
  lang: Language;
  onToggleLang: () => void;
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ lang, onToggleLang, onOpenBooking }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = content[lang];
  const isArabic = lang === 'ar';

  return (
    <header className="sticky top-0 z-50 w-full bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          
          {/* Zone 1: Brand Wordmark (Single element) */}
          <a href="#" className="flex items-center shrink-0" aria-label="Harbi Exchange Home">
            <Logo size="md" isArabic={isArabic} />
          </a>

          {/* Zone 2: 4-5 Concise single-line navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
            <a
              href="#rates"
              className="hover:text-[#a6ce39] transition-colors whitespace-nowrap shrink-0"
            >
              {t.nav.rates}
            </a>
            <a
              href="#converter"
              className="hover:text-[#a6ce39] transition-colors whitespace-nowrap shrink-0"
            >
              {t.nav.converter}
            </a>
            <a
              href="#services"
              className="hover:text-[#00a3da] transition-colors whitespace-nowrap shrink-0"
            >
              {t.nav.services}
            </a>
            <a
              href="#airport"
              className="hover:text-[#00a3da] transition-colors whitespace-nowrap shrink-0"
            >
              {t.nav.airport}
            </a>
            <a
              href="#faq"
              className="hover:text-slate-100 transition-colors whitespace-nowrap shrink-0"
            >
              {isArabic ? 'الأسئلة الشائعة' : 'FAQ'}
            </a>
          </nav>

          {/* Zone 3: Primary Action & Language Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Language Switcher */}
            <button
              onClick={onToggleLang}
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors whitespace-nowrap shrink-0"
              title={isArabic ? 'Switch to English' : 'التحويل إلى العربية'}
            >
              <Globe className="w-3.5 h-3.5 text-[#00a3da]" />
              <span>{isArabic ? 'EN' : 'عربي'}</span>
            </button>

            {/* Direct Call / Booking CTA */}
            <button
              onClick={onOpenBooking}
              type="button"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-950 bg-gradient-to-r from-[#a6ce39] to-[#92ba2b] hover:brightness-105 active:scale-[0.98] rounded-lg transition-all shadow-sm whitespace-nowrap shrink-0"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{t.tollFree}</span>
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile navigation dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-950/95 px-5 py-4 space-y-3">
          <div className="flex flex-col space-y-3 text-sm font-medium">
            <a
              href="#rates"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-200 hover:text-[#a6ce39] py-1 transition-colors"
            >
              {t.nav.rates}
            </a>
            <a
              href="#converter"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-200 hover:text-[#a6ce39] py-1 transition-colors"
            >
              {t.nav.converter}
            </a>
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-200 hover:text-[#00a3da] py-1 transition-colors"
            >
              {t.nav.services}
            </a>
            <a
              href="#airport"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-200 hover:text-[#00a3da] py-1 transition-colors"
            >
              {t.nav.airport}
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-200 hover:text-white py-1 transition-colors"
            >
              {isArabic ? 'الأسئلة الشائعة' : 'FAQ'}
            </a>
          </div>

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              type="button"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-slate-950 bg-[#a6ce39] hover:bg-[#96be27] rounded-lg transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>{isArabic ? 'حجز واستفسار سريع' : 'Quick Reservation'}</span>
            </button>
            <a
              href={`tel:${t.tollFree}`}
              className="text-center text-xs text-slate-400 py-1 hover:text-slate-200"
            >
              {isArabic ? 'اتصال مجاني:' : 'Toll-free:'} {t.tollFree}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
