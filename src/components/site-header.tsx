'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, Moon, Sun, X } from 'lucide-react';
import { applyAppearance, palettes, readAppearance } from '@/lib/appearance';
import type { Language } from '@/lib/content';
import { asset, navigation, otherLanguage, parsePathname, pick, route } from '@/lib/site';
import { AppearancePanel } from './appearance-panel';
import { Wordmark } from './wordmark';

function toggleTheme() {
  const current = readAppearance();
  const next = { ...current, mode: current.mode === 'dark' ? ('light' as const) : ('dark' as const), background: undefined };
  applyAppearance(next, palettes);
  try {
    localStorage.setItem('shimaa-theme', next.mode);
    localStorage.setItem('shimaa-appearance', JSON.stringify(next));
  } catch {}
}

export function SiteHeader({ lang }: { lang: Language }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { path, page } = parsePathname(usePathname() ?? '/');
  const target = otherLanguage(lang);
  const t = (en: string, ar: string) => pick(lang, en, ar);

  useEffect(() => {
    if (!menuOpen) return;
    const close = (event: KeyboardEvent) => event.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [menuOpen]);

  const links = (onNavigate?: () => void) =>
    navigation.map((item) => (
      <Link key={item.key} href={route(lang, item.path)} aria-current={page === item.key ? 'page' : undefined} onClick={onNavigate}>
        {item.label[lang]}
        {onNavigate && <ArrowUpRight size={19} aria-hidden="true" />}
      </Link>
    ));

  return (
    <header className="header">
      <div className="container header-inner">
        <Wordmark lang={lang} />
        <nav className="desktop-nav" aria-label={t('Main navigation', 'القائمة الرئيسية')}>{links()}</nav>
        <div className="header-controls">
          {/* Different root layout per language, so this is a full page load to the equivalent page. */}
          <a className="language-switch" href={asset(route(target, path))} hrefLang={target} lang={target}>
            {target === 'ar' ? 'العربية' : 'English'}
          </a>
          <span className="control-divider" aria-hidden="true" />
          <button type="button" className="icon-button theme-toggle" onClick={toggleTheme} aria-label={t('Toggle light and dark appearance', 'تبديل الوضع الفاتح والداكن')}>
            <Moon className="moon-icon" size={19} aria-hidden="true" />
            <Sun className="sun-icon" size={19} aria-hidden="true" />
          </button>
          <AppearancePanel lang={lang} />
          <button
            type="button"
            className="icon-button menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={t('Navigation menu', 'قائمة التنقل')}
          >
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <nav id="mobile-menu" className="mobile-nav" aria-label={t('Mobile navigation', 'قائمة الهاتف')}>
          {links(() => setMenuOpen(false))}
        </nav>
      )}
    </header>
  );
}
