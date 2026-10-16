import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Language } from '@/lib/content';
import { pick, route } from '@/lib/site';

export function SectionIntro({ eyebrow, title, description, headingId }: { eyebrow: string; title: string; description?: string; headingId?: string }) {
  return (
    <div className="section-intro">
      <p className="eyebrow"><span aria-hidden="true" />{eyebrow}</p>
      <h2 id={headingId}>{title}</h2>
      {description && <p className="section-description">{description}</p>}
    </div>
  );
}

export function ContactBand({ lang }: { lang: Language }) {
  const t = (en: string, ar: string) => pick(lang, en, ar);
  return (
    <section className="contact-band" aria-labelledby="contact-band-title">
      <div className="container contact-band-inner">
        <div>
          <p className="eyebrow">{t('HAVE SOMETHING IN MIND?', 'عندك فكرة؟')}</p>
          <h2 id="contact-band-title">
            {t('Let’s make it', 'خلّينا نحوّلها')} <em>{t('worth sharing.', 'لمحتوى يستاهل.')}</em>
          </h2>
        </div>
        {/* Visible text, so the link never falls back to its bare URL. */}
        <Link href={route(lang, 'contact')} className="band-link">
          <span>{t('Get in touch', 'تواصل معي')}</span>
          <span className="round-link" aria-hidden="true"><ArrowUpRight size={34} /></span>
        </Link>
      </div>
    </section>
  );
}
