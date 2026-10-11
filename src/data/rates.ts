import { Currency, CurrencyInfo } from '../types';
import { currencyCatalog } from './currencies';

// Same-origin proxy for the ClearView rates feed (see public/rates-proxy.php and vite.config.ts).
// Override with VITE_RATES_URL in .env.local to read the feed from somewhere else.
export const RATES_URL: string = import.meta.env?.VITE_RATES_URL || 'rates-proxy.php';
export const RATES_REFRESH_MS = 60_000;

// The feed still uses some legacy ISO codes.
const LEGACY_CODES: Record<string, string> = { TRL: 'TRY', RUR: 'RUB' };

export interface RatesSnapshot {
  currencies: Currency[];
  // Raw date/time text from the feed's <TIMESTAMP>, e.g. { date: '10/9/2026', time: '23:43:51 GMT+3' }
  updatedAt: { date: string; time: string } | null;
}

const num = (el: Element, tag: string) => parseFloat(el.getElementsByTagName(tag)[0]?.textContent ?? '');
const text = (el: Element, tag: string) => el.getElementsByTagName(tag)[0]?.textContent?.trim() ?? '';

// Turns a 2-letter country prefix of an ISO code into a flag emoji (fallback for unknown currencies).
const flagFromCode = (code: string) =>
  String.fromCodePoint(...[...code.slice(0, 2)].map((ch) => 0x1f1e6 + ch.charCodeAt(0) - 65));

/**
 * The feed quotes each currency two ways: WEBUY/WESELL and INVBUY/INVSELL, one being the
 * reciprocal of the other — but which one is "SAR per unit" varies by currency
 * (USD: INV = 3.74 SAR/USD, EGP: WE = 0.0714 SAR/EGP). Our buy price is always below our
 * sell price in SAR terms, and taking reciprocals flips that order, so the pair with
 * buy < sell is the SAR-per-unit quote.
 */
function sarPerUnit(rate: Element): { buy: number; sell: number } | null {
  const pairs = [
    { buy: num(rate, 'WEBUY'), sell: num(rate, 'WESELL') },
    { buy: num(rate, 'INVBUY'), sell: num(rate, 'INVSELL') },
  ].filter((p) => p.buy > 0 && p.sell > 0);
  return pairs.find((p) => p.buy <= p.sell) ?? null;
}

export function parseRatesXml(xml: string): RatesSnapshot {
  const doc = new DOMParser().parseFromString(xml, 'application/xml');
  if (doc.getElementsByTagName('parsererror').length) {
    throw new Error('Rates feed is not valid XML');
  }

  const catalog = new Map<string, CurrencyInfo>(currencyCatalog.map((c) => [c.code, c]));
  const priced = new Map<string, Currency>();

  for (const rate of Array.from(doc.getElementsByTagName('RATE'))) {
    const rawCode = text(rate, 'ISO').toUpperCase();
    const code = LEGACY_CODES[rawCode] ?? rawCode;
    const quote = sarPerUnit(rate);
    const boardBuy = num(rate, 'INVBUY');
    const boardSell = num(rate, 'INVSELL');
    if (!code || !quote || !(boardBuy > 0 && boardSell > 0)) continue; // e.g. LBP is published as all zeros

    const info: CurrencyInfo = catalog.get(code) ?? {
      code,
      nameAr: `${text(rate, 'NAME')} - ${text(rate, 'COUNTRY')}`,
      nameEn: `${text(rate, 'COUNTRY')} ${text(rate, 'NAME')}`,
      flag: flagFromCode(code),
      symbol: code,
      category: 'other',
    };
    priced.set(code, {
      ...info,
      buyRate: quote.buy,
      sellRate: quote.sell,
      boardBuy,
      boardSell,
      quotedPerSar: boardBuy > boardSell,
    });
  }

  if (priced.size === 0) throw new Error('Rates feed contains no usable rates');

  const order = currencyCatalog.map((c) => c.code);
  const rank = (code: string) => (order.includes(code) ? order.indexOf(code) : order.length);
  const currencies = [...priced.values()].sort((a, b) => rank(a.code) - rank(b.code));

  const stamp = doc.getElementsByTagName('TIMESTAMP')[0]?.textContent ?? '';
  const m = stamp.match(/on\s+(\S+)\s+at\s+(.+)$/i);

  return { currencies, updatedAt: m ? { date: m[1], time: m[2].trim() } : null };
}

export async function fetchRates(signal?: AbortSignal): Promise<RatesSnapshot> {
  const sep = RATES_URL.includes('?') ? '&' : '?';
  const res = await fetch(`${RATES_URL}${sep}t=${Date.now()}`, { cache: 'no-store', signal });
  if (!res.ok) throw new Error(`Rates feed returned HTTP ${res.status}`);
  return parseRatesXml(await res.text());
}

// Same formatting as the official rates board: round to 4 decimals, show at least 2.
export function formatRate(value: number): string {
  const rounded = Math.round(value * 10000) / 10000;
  if (Number.isInteger(rounded)) return rounded.toString();
  const decimals = rounded.toString().split('.')[1] ?? '';
  return decimals.length === 1 ? rounded.toFixed(2) : rounded.toString();
}
