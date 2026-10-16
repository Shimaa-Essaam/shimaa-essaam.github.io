import Link from 'next/link';
import type { Language } from '@/lib/content';
import { pick, route } from '@/lib/site';

export function Wordmark({ lang }: { lang: Language }) {
  return (
    <Link href={route(lang)} className="wordmark" aria-label={pick(lang, 'Shimaa Essam home', 'شيماء عصام — الرئيسية')}>
      <span className="monogram" aria-hidden="true">s.</span>
      <span>
        {pick(lang, 'Shimaa Essam', 'شيماء عصام')}
        <small>{pick(lang, 'CONTENT CREATOR', 'صانعة محتوى')}</small>
      </span>
    </Link>
  );
}
