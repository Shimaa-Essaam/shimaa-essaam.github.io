import { ArrowUpRight, FileText, Play } from 'lucide-react';
import type { Language } from '@/lib/content';
import { publishedSources } from '@/lib/sources';
import { pick } from '@/lib/site';
import { SectionIntro } from './sections';

/** Extra original posts on Facebook that are not yet matched to a specific piece above. */
export function PublishedWork({ lang }: { lang: Language }) {
  const t = (en: string, ar: string) => pick(lang, en, ar);
  return (
    <section className="container published-work" aria-labelledby="published-title">
      <SectionIntro
        headingId="published-title"
        eyebrow={t('FROM THE FEED', 'من الصفحات')}
        title={t('Out there, on Facebook.', 'شغل منشور على فيسبوك.')}
        description={t('Explore the original reels and posts on Facebook.', 'شاهد الريلز والمنشورات الأصلية على فيسبوك.')}
      />
      <ul className="published-list">
        {publishedSources.map((source) => (
          <li key={source.url}>
            <a href={source.url} target="_blank" rel="noopener noreferrer" className="published-link">
              {source.kind === 'video' ? <Play size={16} aria-hidden="true" /> : <FileText size={16} aria-hidden="true" />}
              {source.label[lang]}
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
