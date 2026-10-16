import type { Bilingual, Language } from './content';

export const siteUrl = 'https://shimaa-essaam.github.io';
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

/** Public file URL (images, videos, documents), including any base path. */
export const asset = (path: string) => `${basePath}${path}`;

/** Localized page path with a trailing slash, e.g. route('ar', 'work') → '/ar/work/'. */
export const route = (lang: Language, path = '') => `${lang === 'ar' ? '/ar' : ''}${path ? `/${path}` : ''}/`;

/** Picks the string for the current language. */
export const pick = (lang: Language, en: string, ar: string) => (lang === 'ar' ? ar : en);
export const local = (lang: Language, text: Bilingual) => text[lang];

export const otherLanguage = (lang: Language): Language => (lang === 'en' ? 'ar' : 'en');
export const direction = (lang: Language) => (lang === 'ar' ? 'rtl' : 'ltr');

export type PageKey = 'home' | 'work' | 'about' | 'contact';
export const navigation: { key: PageKey; path: string; label: Bilingual }[] = [
  { key: 'home', path: '', label: { en: 'Home', ar: 'الرئيسية' } },
  { key: 'work', path: 'work', label: { en: 'Work', ar: 'الأعمال' } },
  { key: 'about', path: 'about', label: { en: 'About', ar: 'عنّي' } },
  { key: 'contact', path: 'contact', label: { en: 'Contact', ar: 'تواصل معي' } },
];

/** Splits a pathname such as '/ar/work/espacio-space/' into language and site path. */
export function parsePathname(pathname: string) {
  const relative = basePath && pathname.startsWith(basePath) ? pathname.slice(basePath.length) : pathname;
  const parts = relative.split('/').filter(Boolean);
  const lang: Language = parts[0] === 'ar' ? 'ar' : 'en';
  const path = (lang === 'ar' ? parts.slice(1) : parts).join('/');
  const page = (navigation.find((item) => item.path === path.split('/')[0])?.key ?? 'home') as PageKey;
  return { lang, path, page };
}
