export type Language = 'ar' | 'en';

export type CurrencyCategory = 'major' | 'pilgrimage' | 'gcc' | 'asian' | 'other';

export interface CurrencyInfo {
  code: string;
  nameAr: string;
  nameEn: string;
  flag: string;
  symbol: string;
  category: CurrencyCategory;
}

export interface Currency extends CurrencyInfo {
  buyRate: number; // SAR we pay for 1 unit (customer sells to us)
  sellRate: number; // SAR we charge for 1 unit (customer buys from us)
  // Figures exactly as the official rates board shows them (feed INVBUY/INVSELL).
  boardBuy: number;
  boardSell: number;
  // true when the board quotes units of this currency per 1 SAR (e.g. EGP 14), not SAR per unit
  quotedPerSar: boolean;
}

export interface ServiceItem {
  id: string;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  icon: string;
  badgeAr?: string;
  badgeEn?: string;
}

export interface FAQItem {
  questionAr: string;
  questionEn: string;
  answerAr: string;
  answerEn: string;
}

export interface ExchangeBooking {
  fullName: string;
  phone: string;
  email: string;
  fromCurrency: string;
  toCurrency: string;
  amount: number;
  terminalVisitDate: string;
  notes?: string;
}
