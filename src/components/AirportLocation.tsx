import React, { useState } from 'react';
import { Language } from '../types';
import { content } from '../translations';
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  Building,
  Navigation,
  CheckCircle,
  Copy,
  ExternalLink,
} from 'lucide-react';

interface AirportLocationProps {
  lang: Language;
}

export const AirportLocation: React.FC<AirportLocationProps> = ({ lang }) => {
  const t = content[lang];
  const isArabic = lang === 'ar';
  const [copied, setCopied] = useState(false);

  const handleCopySpl = () => {
    navigator.clipboard.writeText(
      `رقم المبنى: 8689، الرمز البريدي: 23721، الرقم الإضافي: 4183 - جدة - مطار الملك عبدالعزيز الدولي`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="airport" className="py-20 bg-slate-900/60 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-xs font-bold text-[#a6ce39] uppercase tracking-wider mb-2">
            <MapPin className="w-4 h-4" />
            <span>{isArabic ? 'مقرنا الرئيسي والمعتمد' : 'Headquarters Location'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t.terminal.title}
          </h2>
          <p className="text-xs sm:text-base text-slate-400 mt-2 max-w-2xl">
            {t.terminal.subtitle}
          </p>
        </div>

        {/* 2-Column Split: Interactive Info & Map Visualization */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Column 1: Detailed Location Data & SAMA Registration */}
          <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl">
            <div className="space-y-6">
              
              {/* Terminal Badge & 24/7 status */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-slate-800/80">
                <div>
                  <span className="text-xs font-bold text-[#00a3da] block mb-1">
                    {isArabic ? 'المركز الرئيسي للصرافة' : 'Primary Exchange Branch'}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    {t.terminal.terminalName}
                  </h3>
                </div>

                <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-950/60 border border-emerald-800 text-emerald-400 rounded-full text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{isArabic ? 'مفتوح الآن - خدمة ٢٤ ساعة' : 'Open 24/7 Now'}</span>
                </div>
              </div>

              {/* Address details */}
              <div className="space-y-4 text-xs sm:text-sm">
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-[#a6ce39] shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-slate-400 text-xs mb-0.5">{t.terminal.addressLabel}</div>
                    <div className="text-slate-200 font-medium">{t.terminal.addressText}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-[#00a3da] shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-slate-400 text-xs mb-0.5">{t.terminal.hoursLabel}</div>
                    <div className="text-slate-200 font-medium">{t.terminal.hoursText}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-[#a6ce39] shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-slate-400 text-xs mb-0.5">{t.terminal.phoneLabel}</div>
                    <a
                      href={`tel:${t.tollFree}`}
                      className="text-white font-bold font-mono text-base hover:text-[#a6ce39] transition-colors"
                    >
                      {t.tollFree}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-[#00a3da] shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-slate-400 text-xs mb-0.5">{t.terminal.supportEmail}</div>
                    <a
                      href={`mailto:${t.email}`}
                      className="text-white font-medium font-mono hover:text-[#00a3da] transition-colors"
                    >
                      {t.email}
                    </a>
                  </div>
                </div>

              </div>

              {/* Saudi Post / National Address Box */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1 font-semibold">
                    <Building className="w-3.5 h-3.5 text-[#a6ce39]" />
                    <span>{t.splTitle}</span>
                  </div>
                  <div className="text-xs sm:text-sm font-mono text-white font-semibold">
                    {t.splVal}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopySpl}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors flex items-center gap-1.5 shrink-0"
                >
                  {copied ? (
                    <>
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">{isArabic ? 'تم النسخ!' : 'Copied!'}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{isArabic ? 'نسخ العنوان' : 'Copy'}</span>
                    </>
                  )}
                </button>
              </div>

            </div>

            {/* Quick Actions */}
            <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center gap-3 mt-6">
              <a
                href="https://maps.google.com/?q=King+Abdulaziz+International+Airport+Hajj+Terminal"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 text-xs font-bold text-slate-950 bg-[#a6ce39] hover:bg-[#96be27] rounded-xl transition-all flex items-center gap-2"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>{t.terminal.directionBtn}</span>
                <ExternalLink className="w-3 h-3 ml-1" />
              </a>

              <a
                href={`tel:${t.tollFree}`}
                className="px-4 py-2.5 text-xs font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl transition-colors flex items-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-[#00a3da]" />
                <span>{t.terminal.callBtn}</span>
              </a>
            </div>

          </div>

          {/* Column 2: Architectural Airport Concourse Card & Floor Plan Simulation */}
          <div className="lg:col-span-5 bg-gradient-to-b from-slate-950 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden">
            
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {isArabic ? 'خارطة المجمع والصالات' : 'Terminal Layout'}
                </span>
                <span className="font-mono text-xs text-[#a6ce39] font-bold">
                  KAIA - HAJJ COMPLEX
                </span>
              </div>

              {/* Graphic Terminal Representation */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/90 mb-6 space-y-3">
                <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800 text-slate-400">
                  <span>{isArabic ? 'منطقة بوابات الوصول الدولية' : 'International Arrival Area'}</span>
                  <span className="text-[#00a3da] font-mono">Terminal 1 / Hajj</span>
                </div>

                {/* Simulated Terminal Blueprint */}
                <div className="relative h-44 rounded-xl bg-slate-900/90 border border-slate-800 p-3 flex flex-col justify-between overflow-hidden">
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#a6ce39_1px,transparent_1px)] [background-size:16px_16px]" />
                  
                  {/* Concourse walkway */}
                  <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono">
                    <span>Gate A1-A12</span>
                    <span>Baggage Claim Hall</span>
                    <span>Gate B1-B12</span>
                  </div>

                  {/* Highlighted Harbi Exchange Counter */}
                  <div className="my-auto mx-auto w-full max-w-[280px] p-3 rounded-xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-2 border-[#a6ce39] text-center shadow-lg relative z-10">
                    <div className="text-[10px] text-[#a6ce39] font-bold tracking-wider mb-0.5">
                      HARBI EXCHANGE · حربي للصرافة
                    </div>
                    <div className="text-xs font-bold text-white">
                      {isArabic ? 'شباك الصرافة الرئيسي - صالات الحج والعمرة' : 'Main Cash Exchange Counter'}
                    </div>
                    <div className="text-[10px] text-emerald-400 font-mono mt-1">
                      ● 24/7 ACTIVE TELLER
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono">
                    <span>Customs & Security</span>
                    <span className="text-[#00a3da]">Arrival Concourse Center</span>
                    <span>VIP & Delegations Lounge</span>
                  </div>
                </div>
              </div>

              {/* Quick Checklist for Airport Visitors */}
              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-[#a6ce39] shrink-0" />
                  <span>{isArabic ? 'موقع مباشر أمام بوابات خروج المسافرين' : 'Direct location in front of arrival passenger exit gates'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-[#a6ce39] shrink-0" />
                  <span>{isArabic ? 'مسار مخصص لسرعة إنهاء إجراءات الحجاج والمعتمرين' : 'Fast-track dedicated lane for pilgrims and delegations'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-[#a6ce39] shrink-0" />
                  <span>{isArabic ? 'أجهزة صرافة وعد آلي متطورة ومعتمدة من ساما' : 'High-speed automated currency counters approved by SAMA'}</span>
                </div>
              </div>

            </div>

            {/* Official Legal Footer */}
            <div className="pt-6 border-t border-slate-800 text-[11px] text-slate-400 flex flex-wrap justify-between gap-2 mt-6">
              <span>{t.terminal.crShort}</span>
              <span>{t.terminal.licenseShort}</span>
              <span>{t.terminal.nationalId}</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
