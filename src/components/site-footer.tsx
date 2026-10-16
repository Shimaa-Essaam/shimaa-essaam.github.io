import { Mail, MessageCircle } from 'lucide-react';
import { contact, type Language } from '@/lib/content';
import { asset, pick } from '@/lib/site';
import { LinkedinIcon } from './icons';
import { Wordmark } from './wordmark';

export function SiteFooter({ lang }: { lang: Language }) {
  const t = (en: string, ar: string) => pick(lang, en, ar);
  return (
    <footer className="footer container">
      <Wordmark lang={lang} />
      <p>© {new Date().getFullYear()} {t('Shimaa Essam. Created with intention.', 'شيماء عصام. محتوى بفكرة.')}</p>
      <div className="footer-links">
        <a href={asset('/documents/Shimaa-Essam-CV.pdf')} download className="footer-cv">{t('Download my CV', 'تحميل السيرة الذاتية')}</a>
        <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="icon-button"><LinkedinIcon size={19} /></a>
        <a href={`mailto:${contact.email}`} aria-label={t('Email Shimaa', 'راسل شيماء')} className="icon-button"><Mail size={19} aria-hidden="true" /></a>
        <a href={contact.whatsapp(lang)} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="icon-button"><MessageCircle size={19} aria-hidden="true" /></a>
      </div>
    </footer>
  );
}
