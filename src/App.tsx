import React, { useState, useEffect } from 'react';
import { Language } from './types';
import { Navbar } from './components/Navbar';
import { Ticker } from './components/Ticker';
import { Hero } from './components/Hero';
import { RatesTable } from './components/RatesTable';
import { Services } from './components/Services';
import { AirportLocation } from './components/AirportLocation';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { Phone, Clock, MessageSquare, ChevronUp } from 'lucide-react';
import { content } from './translations';

export default function App() {
  const [lang, setLang] = useState<Language>('ar');
  const [selectedCurrencyCode, setSelectedCurrencyCode] = useState('USD');
  const [showScrollTop, setShowScrollTop] = useState(false);

  const t = content[lang];
  const isArabic = lang === 'ar';

  useEffect(() => {
    // Sync document direction and lang attribute
    document.documentElement.lang = lang;
    document.documentElement.dir = isArabic ? 'rtl' : 'ltr';
  }, [lang, isArabic]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-[#a6ce39] selection:text-slate-950 ${isArabic ? 'text-right' : 'text-left'}`}>
      
      {/* 1. Header / Navbar (Compliant Top Bar Contract) */}
      <Navbar
        lang={lang}
        onToggleLang={toggleLanguage}
      />

      {/* 2. Real-time Market Ticker */}
      <Ticker lang={lang} />

      {/* 3. Main Landing Content */}
      <main className="flex-1">
        
        {/* Hero Section with Live Converter */}
        <Hero
          lang={lang}
          selectedCurrencyCode={selectedCurrencyCode}
        />

        {/* Foreign Currency Rates Table */}
        <RatesTable
          lang={lang}
          onSelectCurrency={(code) => setSelectedCurrencyCode(code)}
        />

        {/* Specialized Services Bento Grid */}
        <Services lang={lang} />

        {/* Airport Terminal Location & Working Hours */}
        <AirportLocation lang={lang} />

        {/* Frequently Asked Questions */}
        <FAQ lang={lang} />

      </main>

      {/* 4. Official Regulatory Footer */}
      <Footer lang={lang} />

      {/* 5. Floating Action Button for Quick Toll-Free Call (Mobile & Desktop) */}
      <div className="fixed bottom-6 left-6 rtl:left-6 rtl:right-auto z-40 flex flex-col items-center gap-2.5">
        
        {showScrollTop && (
          <button
            type="button"
            onClick={scrollToTop}
            className="p-2.5 rounded-full bg-slate-900/90 text-slate-300 hover:text-white border border-slate-700 shadow-lg backdrop-blur-md transition-all hover:scale-105 active:scale-95"
            aria-label="Scroll to top"
          >
            <ChevronUp className="w-5 h-5" />
          </button>
        )}

        <a
          href={`tel:${t.tollFree}`}
          className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-[#a6ce39] to-[#92ba2b] text-slate-950 font-bold text-xs sm:text-sm rounded-full shadow-2xl hover:brightness-110 active:scale-95 transition-all group brand-glow-lime"
          title={isArabic ? 'اتصل مجاناً بخدمة العملاء' : 'Call Toll-Free Support'}
        >
          <Phone className="w-4 h-4 fill-slate-950 text-slate-950 group-hover:rotate-12 transition-transform" />
          <span className="hidden sm:inline font-mono font-bold">{t.tollFree}</span>
          <span className="sm:hidden">{isArabic ? 'اتصال مجاني' : 'Call'}</span>
        </a>

      </div>

    </div>
  );
}
