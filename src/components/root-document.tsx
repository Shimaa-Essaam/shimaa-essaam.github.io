import type { ReactNode } from 'react';
import { applyAppearance, palettes, readAppearance } from '@/lib/appearance';
import type { Language } from '@/lib/content';
import { direction, pick } from '@/lib/site';
import { MediaProvider } from './media-viewer';
import { SiteFooter } from './site-footer';
import { SiteHeader } from './site-header';
import { WhatsAppButton } from './whatsapp-button';

// Runs before first paint so saved colors never flash.
const initAppearance = `(${applyAppearance.toString()})((${readAppearance.toString()})(),${JSON.stringify(palettes)});`;

/** The full HTML document. Each language has its own root layout so lang/dir are in the static markup. */
export function RootDocument({ lang, fonts, children }: { lang: Language; fonts: string; children: ReactNode }) {
  return (
    <html lang={lang} dir={direction(lang)} className={fonts} suppressHydrationWarning>
      {/* eslint-disable-next-line @next/next/no-head-element -- App Router root layout markup */}
      <head>
        <script dangerouslySetInnerHTML={{ __html: initAppearance }} />
      </head>
      <body>
        <MediaProvider lang={lang}>
          <a className="skip-link" href="#main">{pick(lang, 'Skip to content', 'انتقل للمحتوى')}</a>
          <SiteHeader lang={lang} />
          <main id="main">{children}</main>
          <SiteFooter lang={lang} />
          <WhatsAppButton lang={lang} />
        </MediaProvider>
      </body>
    </html>
  );
}
