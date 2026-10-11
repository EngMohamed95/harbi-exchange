import React from 'react';
import { Language } from '../types';
import { content } from '../translations';
import {
  Users,
  Banknote,
  Briefcase,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';

interface ServicesProps {
  lang: Language;
  onOpenBooking: () => void;
}

export const Services: React.FC<ServicesProps> = ({ lang, onOpenBooking }) => {
  const t = content[lang];
  const isArabic = lang === 'ar';

  const servicesList = [
    {
      num: '01',
      title: t.services.items[0].title,
      desc: t.services.items[0].desc,
      icon: Users,
      accent: 'border-[#a6ce39]/30 hover:border-[#a6ce39]',
      glowColor: 'bg-[#a6ce39]/10',
      badge: isArabic ? 'خدمة ضيوف الرحمن' : 'Pilgrim Service',
      highlights: isArabic
        ? ['تغطية جميع عملات العالم الإسلامي', 'فئات ورقية صغيرة لتيسير النفقات', 'خدمة على مدار ٢٤ ساعة طوال العام']
        : ['Full Muslim world currency coverage', 'Small banknote denominations', '24/7 service all year round'],
    },
    {
      num: '02',
      title: t.services.items[1].title,
      desc: t.services.items[1].desc,
      icon: Banknote,
      accent: 'border-[#00a3da]/30 hover:border-[#00a3da]',
      glowColor: 'bg-[#00a3da]/10',
      badge: isArabic ? 'سيولة نقدية فورية' : 'Instant Liquidity',
      highlights: isArabic
        ? ['أكثر من ٣٥ عملة عالمية وخليجية', 'أوراق نقدية جديدة ونظيفة ومفحوصة', 'أسعار صرف تنافسية دون عمولات خفية']
        : ['Over 35 foreign & GCC currencies', 'Fresh, high-grade inspected banknotes', 'Competitive rates with zero hidden fees'],
    },
    {
      num: '03',
      title: t.services.items[2].title,
      desc: t.services.items[2].desc,
      icon: Briefcase,
      accent: 'border-slate-700 hover:border-[#a6ce39]',
      glowColor: 'bg-[#a6ce39]/10',
      badge: isArabic ? 'للحملات والشركات' : 'Corporate Solutions',
      highlights: isArabic
        ? ['أسعار صرف تفضيلية للمبالغ الكبيرة', 'تجهيز مسبق لطلبات بعثات الحج الرسمية', 'فواتير وسندات مصرفية معتمدة']
        : ['Preferential wholesale exchange rates', 'Advance staging for official Hajj delegations', 'Certified receipts and corporate invoicing'],
    },
    {
      num: '04',
      title: t.services.items[3].title,
      desc: t.services.items[3].desc,
      icon: ShieldCheck,
      accent: 'border-slate-700 hover:border-[#00a3da]',
      glowColor: 'bg-[#00a3da]/10',
      badge: isArabic ? 'التزام ورقابة ساما' : 'SAMA Compliance',
      highlights: isArabic
        ? ['خاضعة لرقابة البنك المركزي السعودي', 'فحص إلكتروني دقيق للأوراق النقدية', 'التزام صارم بأنظمة مكافحة غسل الأموال']
        : ['Supervised by Saudi Central Bank', 'Advanced multi-sensor banknote authenticity', 'Strict Anti-Money Laundering compliance'],
    },
  ];

  return (
    <section id="services" className="py-20 bg-slate-950 relative overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-slate-900/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#00a3da] uppercase tracking-wider mb-3 px-3 py-1 bg-[#00a3da]/10 rounded-full border border-[#00a3da]/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isArabic ? 'حلول مالية متخصصة بالمطار' : 'Airport Financial Solutions'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight text-balance">
            {t.services.sectionTitle}
          </h2>

          <p className="text-sm sm:text-base text-slate-400 mt-3 max-w-2xl mx-auto leading-relaxed">
            {t.services.sectionSubtitle}
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {servicesList.map((srv) => {
            const Icon = srv.icon;
            return (
              <div
                key={srv.num}
                className={`group relative bg-slate-900/60 hover:bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 transition-all duration-300 flex flex-col justify-between ${srv.accent}`}
              >
                <div>
                  {/* Card Header: Editorial Number and Badge */}
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-2xl ${srv.glowColor} flex items-center justify-center text-white group-hover:scale-110 transition-transform`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="font-mono text-xs font-bold text-slate-500 tracking-wider">
                        {srv.num}
                      </span>
                    </div>

                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      {srv.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-white transition-colors">
                    {srv.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                    {srv.desc}
                  </p>
                </div>

                {/* Highlights list */}
                <div className="pt-4 border-t border-slate-800/80 space-y-2.5">
                  {srv.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs text-slate-400">
                      <CheckCircle2 className="w-4 h-4 text-[#a6ce39] shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

              </div>
            );
          })}
        </div>

        {/* Interactive CTA Banner */}
        <div className="mt-14 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-800 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-full bg-[#a6ce39]/5 -skew-x-12 pointer-events-none" />
          
          <div className="space-y-2 text-center md:text-start relative z-10">
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              {isArabic ? 'هل تمثل بعثة حج أو شركة سياحية بحاجة لسيولة نقدية كبيرة؟' : 'Representing a Hajj delegation or tour agency?'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
              {isArabic
                ? 'فريقنا جاهز لترتيب متطلباتكم بأسعار صرف خاصة وترتيبات تسليم مسبقة في مجمع صالات الحج والعمرة بمطار الملك عبدالعزيز الدولي.'
                : 'Our team is ready to organize your foreign exchange needs with wholesale rates and pre-arranged counter pickups at KAIA airport.'}
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenBooking}
            className="px-6 py-3.5 text-xs sm:text-sm font-bold text-slate-950 bg-gradient-to-r from-[#a6ce39] to-[#00a3da] hover:brightness-105 active:scale-[0.98] rounded-xl transition-all shadow-lg whitespace-nowrap shrink-0 relative z-10"
          >
            {isArabic ? 'طلب ترتيب سيولة للبعثات' : 'Delegation Cash Request'}
          </button>
        </div>

      </div>
    </section>
  );
};
