import type { Language } from '@/lib/content';
import { pick } from '@/lib/site';
import { PublishedWork } from '../published-work';
import { ContactBand } from '../sections';
import { WorkBrowser } from '../work-browser';

export function WorkPage({ lang }: { lang: Language }) {
  const t = (en: string, ar: string) => pick(lang, en, ar);
  return (
    <>
      <section className="page-heading container">
        <p className="eyebrow">{t('THE PORTFOLIO', 'معرض الأعمال')}</p>
        <h1>{t('A collection of', 'مجموعة أفكار')}<br /><em>{t('ideas in action.', 'اتحوّلت لشغل.')}</em></h1>
        <p>{t('Scripts, social visuals, videos, and the thinking behind them.', 'سكريبتات وتصميمات وفيديوهات، والتفكير اللي وراهم.')}</p>
      </section>
      <WorkBrowser lang={lang} />
      <PublishedWork lang={lang} />
      <ContactBand lang={lang} />
    </>
  );
}
