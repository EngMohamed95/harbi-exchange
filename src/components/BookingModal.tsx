import React, { useState } from 'react';
import { useRates } from '../hooks/useRates';
import { Language } from '../types';
import { content } from '../translations';
import {
  X,
  CheckCircle2,
  Calendar,
  Clock,
  Phone,
  Mail,
  User,
  Coins,
  ShieldCheck,
  Send,
} from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  initialFromCurrency?: string;
  initialToCurrency?: string;
  initialAmount?: number;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  lang,
  initialFromCurrency = 'USD',
  initialToCurrency = 'SAR',
  initialAmount = 1000,
}) => {
  const t = content[lang];
  const isArabic = lang === 'ar';

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [fromCurrency, setFromCurrency] = useState(initialFromCurrency);
  const [toCurrency, setToCurrency] = useState(initialToCurrency);
  const [amount, setAmount] = useState(initialAmount.toString());
  const [arrivalDate, setArrivalDate] = useState('');
  const [notes, setNotes] = useState('');

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [referenceCode, setReferenceCode] = useState('');
  const { currencies } = useRates();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API reservation processing
    setTimeout(() => {
      setLoading(false);
      setReferenceCode(`HRB-${Math.floor(100000 + Math.random() * 900000)}`);
      setSubmitted(true);
    }, 900);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-md">
      <div
        className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden my-8"
        role="dialog"
        aria-modal="true"
      >
        {/* Decorative corner glows */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-[#a6ce39]/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#00a3da]/10 rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 left-6 rtl:left-auto rtl:right-6 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800 hover:bg-slate-700 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          /* Confirmation Success Screen */
          <div className="text-center py-6 space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-white">
                {t.booking.successTitle}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                {t.booking.successMsg}
              </p>
            </div>

            {/* Reference Badge */}
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl max-w-sm mx-auto">
              <div className="text-xs text-slate-400 mb-1">{t.booking.referenceNo}</div>
              <div className="text-2xl font-mono font-extrabold text-[#a6ce39] tracking-wider">
                {referenceCode}
              </div>
              <div className="text-[11px] text-slate-400 mt-2">
                {isArabic
                  ? 'يرجى إبراز هذا الرقم مع الهوية أو جواز السفر لدى شباك مجمع صالات الحج والعمرة'
                  : 'Please present this reference with your ID/Passport at KAIA Terminal counter'}
              </div>
            </div>

            <div className="pt-4">
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-2.5 text-xs font-bold text-slate-950 bg-[#a6ce39] hover:bg-[#96be27] rounded-xl transition-all"
              >
                {t.booking.close}
              </button>
            </div>
          </div>
        ) : (
          /* Booking Form */
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <span className="text-xs font-bold text-[#a6ce39] uppercase tracking-wider block mb-1">
                {isArabic ? 'خدمة مسبقة لضيوف المطار' : 'Pre-Arrival Service'}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                {t.booking.title}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {t.booking.subtitle}
              </p>
            </div>

            <div className="space-y-3.5 text-xs">
              
              {/* Full Name */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  {t.booking.nameLabel} *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute top-3 right-3 rtl:right-3 rtl:left-auto text-slate-500" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={isArabic ? 'مثال: محمد الحربي' : 'e.g. Mohammed Al-Harbi'}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pr-9 pl-3 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-[#a6ce39]"
                  />
                </div>
              </div>

              {/* Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    {t.booking.phoneLabel} *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute top-3 right-3 text-slate-500" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+966 50 000 0000"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pr-9 pl-3 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-[#a6ce39] font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    {t.booking.emailLabel} *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute top-3 right-3 text-slate-500" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pr-9 pl-3 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-[#a6ce39] font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Currencies & Amount */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    {t.booking.fromCurrLabel}
                  </label>
                  <select
                    value={fromCurrency}
                    onChange={(e) => setFromCurrency(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-[#a6ce39]"
                  >
                    <option value="SAR">🇸🇦 SAR (ريال)</option>
                    {currencies.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.flag} {c.code}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    {t.booking.toCurrLabel}
                  </label>
                  <select
                    value={toCurrency}
                    onChange={(e) => setToCurrency(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-[#a6ce39]"
                  >
                    <option value="SAR">🇸🇦 SAR (ريال)</option>
                    {currencies.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.flag} {c.code}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    {t.booking.amountLabel} *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="1000"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white font-mono font-bold focus:outline-none focus:border-[#a6ce39]"
                  />
                </div>
              </div>

              {/* Arrival Date / Time at KAIA */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  {t.booking.arrivalDateLabel} *
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 absolute top-3 right-3 text-slate-500" />
                  <input
                    type="datetime-local"
                    required
                    value={arrivalDate}
                    onChange={(e) => setArrivalDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pr-9 pl-3 py-2.5 text-white focus:outline-none focus:border-[#a6ce39] font-mono"
                  />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  {t.booking.notesLabel}
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={isArabic ? 'رقم الرحلة أو أي تفضيلات بخصوص الفئات النقدية...' : 'Flight number or specific denomination preferences...'}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white placeholder-slate-600 focus:outline-none focus:border-[#a6ce39]"
                />
              </div>

            </div>

            {/* SAMA Notice */}
            <div className="flex items-center gap-2 text-[11px] text-slate-400 pt-1">
              <ShieldCheck className="w-4 h-4 text-[#a6ce39] shrink-0" />
              <span>
                {isArabic
                  ? 'وفقاً لتعليمات ساما، يتم استلام المبالغ النقدية شخصياً مع التحقق من الهوية الأصلية أو جواز السفر.'
                  : 'In line with SAMA regulations, cash is collected in person with original ID/Passport verification.'}
              </span>
            </div>

            {/* Submit CTA */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 text-xs sm:text-sm font-bold text-slate-950 bg-gradient-to-r from-[#a6ce39] to-[#00a3da] hover:brightness-105 active:scale-[0.98] rounded-xl transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <span>{t.booking.submitting}</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>{t.booking.submitBtn}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
