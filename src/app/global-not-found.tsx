import type { Metadata } from 'next';
import { latinFonts } from '@/lib/fonts';
import { asset } from '@/lib/site';
import './globals.css';

export const metadata: Metadata = { title: 'Page not found | Shimaa Essam', robots: { index: false } };

// Served by GitHub Pages as 404.html for any unknown URL, in both languages.
export default function GlobalNotFound() {
  return (
    <html lang="en" className={latinFonts}>
      <body>
        <main className="error-page container">
          <p className="eyebrow">404</p>
          <h1>A page out of the story.</h1>
          <p>This link may have changed. There is plenty of work to explore.</p>
          <p lang="ar" dir="rtl">الرابط ده ممكن يكون اتغيّر. فيه شغل كتير تقدر تكتشفه.</p>
          <div className="error-actions">
            <a className="button primary" href={asset('/')}>Back to the portfolio</a>
            <a className="button secondary" href={asset('/ar/')} lang="ar">الرجوع للموقع بالعربي</a>
          </div>
        </main>
      </body>
    </html>
  );
}
