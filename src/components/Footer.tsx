import React from 'react';
import { Logo } from './Logo';
import { Language } from '../types';
import { content } from '../translations';
import {
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Building2,
  FileText,
  Hash,
} from 'lucide-react';

interface FooterProps {
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const t = content[lang];
  const isArabic = lang === 'ar';

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-300 pt-16 pb-12 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand & Regulatory Description */}
          <div className="lg:col-span-5 space-y-4">
            <Logo size="md" isArabic={isArabic} showSubtitle={true} />

            <p className="text-slate-400 leading-relaxed text-xs sm:text-sm pt-2">
              {t.footer.aboutText}
            </p>

            {/* SAMA Supervised Regulatory Box */}
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-[#a6ce39] shrink-0" />
              <div className="text-[11px] text-slate-300">
                <span className="font-bold text-white block">
                  {isArabic ? 'البنك المركزي السعودي (ساما)' : 'Saudi Central Bank (SAMA)'}
                </span>
                <span>{t.regulatoryTagline}</span>
              </div>
            </div>
          </div>

          {/* Official Registration & SPL National Address */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2">
              {isArabic ? 'البيانات الرسمية والعنوان الوطني' : 'Official Credentials & Address'}
            </h4>

            <div className="space-y-2 text-slate-300 text-xs">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#a6ce39] shrink-0" />
                <span>{t.capitalTitle}: <strong className="text-white font-mono">{t.capitalVal}</strong></span>
              </div>

              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#00a3da] shrink-0" />
                <span>{t.crTitle}: <strong className="text-white font-mono">{t.crVal}</strong></span>
              </div>

              <div className="flex items-center gap-2">
                <Hash className="w-4 h-4 text-[#a6ce39] shrink-0" />
                <span>{t.unifiedNumberTitle}: <strong className="text-white font-mono">{t.unifiedNumberVal}</strong></span>
              </div>

              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#00a3da] shrink-0" />
                <span>{t.licenseTitle}: <strong className="text-white font-mono">{t.licenseVal}</strong></span>
              </div>

              <div className="pt-2 border-t border-slate-900 text-slate-400 text-[11px] leading-relaxed">
                <strong className="text-slate-200 block mb-0.5">{t.splTitle}:</strong>
                {t.splVal}
              </div>
            </div>
          </div>

          {/* Quick Contact & Terminal Access */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2">
              {isArabic ? 'التواصل والفرع الرئيسي' : 'Direct Contact & Terminal'}
            </h4>

            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#a6ce39] shrink-0 mt-0.5" />
                <span className="text-slate-300 leading-snug">{t.headquartersVal}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#00a3da] shrink-0" />
                <div>
                  <span className="text-slate-400 block text-[10px]">{isArabic ? 'الرقم المجاني الموحد' : 'Toll-Free'}</span>
                  <a
                    href={`tel:${t.tollFree}`}
                    className="text-white font-bold font-mono hover:text-[#a6ce39] transition-colors"
                  >
                    {t.tollFree}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#a6ce39] shrink-0" />
                <div>
                  <span className="text-slate-400 block text-[10px]">{isArabic ? 'البريد الإلكتروني' : 'Email'}</span>
                  <a
                    href={`mailto:${t.email}`}
                    className="text-white font-mono hover:text-[#00a3da] transition-colors"
                  >
                    {t.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            {t.footer.rights}
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>{isArabic ? 'خدمة صرافة فورية على مدار ٢٤ ساعة' : '24/7 Currency Exchange Service'}</span>
            <span>·</span>
            <span className="text-slate-300">{isArabic ? 'مطار الملك عبدالعزيز الدولي' : 'KAIA Airport'}</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
