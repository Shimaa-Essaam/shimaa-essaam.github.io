'use client';
import { useRef, useState, type FormEvent } from 'react';
import { ArrowUpRight, Check, Copy, Download, Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react';
import { contact, type Language } from '@/lib/content';
import { asset, pick } from '@/lib/site';
import { LinkedinIcon } from './icons';

const phoneHref = `tel:${contact.phone.replace(/\s/g, '')}`;
const whatsappNumber = contact.phone.replace(/\D/g, '');

/** The form has no server: it prepares an email draft or WhatsApp message for the visitor to send. */
export function ContactPage({ lang }: { lang: Language }) {
  const form = useRef<HTMLFormElement>(null);
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState('');
  const t = (en: string, ar: string) => pick(lang, en, ar);

  function values() {
    if (!form.current?.reportValidity()) return null;
    const data = new FormData(form.current);
    const field = (name: string) => String(data.get(name) || '').trim();
    return { name: field('name'), email: field('email'), subject: field('subject'), message: field('message') };
  }

  function openEmail(event: FormEvent) {
    event.preventDefault();
    const data = values();
    if (!data) return;
    const body = `${data.message}\n\n${data.name}\n${data.email}`;
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(body)}`;
    setStatus(t('Your email app can open a draft. Review it and press Send there. Nothing has been sent from this website.', 'تطبيق البريد يفتح مسودة تراجعها وترسلها بنفسك. لم يتم إرسال أي رسالة من الموقع.'));
  }

  function openWhatsApp() {
    const data = values();
    if (!data) return;
    const body = `${data.subject}\n\n${data.message}\n\n${data.name}\n${data.email}`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(body)}`, '_blank', 'noopener,noreferrer');
    setStatus(t('Review your message in WhatsApp, then send it when you are ready.', 'راجع رسالتك في واتساب واضغط إرسال لما تكون جاهز.'));
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setStatus(contact.email);
    }
  }

  return (
    <section className="container contact-layout" aria-labelledby="contact-title">
      <div className="contact-intro">
        <p className="eyebrow"><span aria-hidden="true" />{t('DIRECT CONTACT', 'تواصل مباشر')}</p>
        <h1 id="contact-title">{t('Start with', 'البداية')}<br /><em>{t('a quick hello.', 'بكلمة أهلًا.')}</em></h1>
        <p className="contact-lead">{t('A new role, a creative project, or an idea you want to bring to life. Tell me what you have in mind.', 'فرصة عمل، مشروع إبداعي، أو فكرة عايز تحوّلها لمحتوى. احكيلي إيه اللي في بالك.')}</p>
        <p className="availability"><span aria-hidden="true" />{t('OPEN TO EMPLOYMENT & FREELANCE', 'متاحة للوظائف والمشاريع المستقلة')}</p>

        <ul className="contact-detail-list">
          <li>
            <a href={`mailto:${contact.email}`} className="contact-detail">
              <span className="contact-detail-icon"><Mail size={22} aria-hidden="true" /></span>
              <span><small>{t('EMAIL', 'البريد الإلكتروني')}</small><strong dir="ltr">{contact.email}</strong></span>
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </li>
          <li>
            <a href={phoneHref} className="contact-detail">
              <span className="contact-detail-icon"><Phone size={22} aria-hidden="true" /></span>
              <span><small>{t('PHONE', 'الهاتف')}</small><strong dir="ltr">{contact.phone}</strong></span>
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </li>
          <li className="contact-detail">
            <span className="contact-detail-icon"><MapPin size={22} aria-hidden="true" /></span>
            <span><small>{t('LOCATION', 'الموقع')}</small><strong>{t('Banha, Egypt · Remote collaborations', 'بنها، مصر · تعاون عن بُعد')}</strong></span>
          </li>
        </ul>

        <div className="contact-social-row">
          <button type="button" onClick={copyEmail} className="contact-social-pill">
            {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
            <span aria-live="polite">{copied ? t('Copied', 'تم النسخ') : t('Copy email', 'نسخ البريد')}</span>
          </button>
          <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="contact-social-pill"><LinkedinIcon size={17} /><span>LinkedIn</span></a>
          <a href={contact.whatsapp(lang)} target="_blank" rel="noopener noreferrer" className="contact-social-pill"><MessageCircle size={17} aria-hidden="true" /><span>WhatsApp</span></a>
          <a href={asset('/documents/Shimaa-Essam-CV.pdf')} download className="contact-social-pill"><Download size={16} aria-hidden="true" /><span>{t('Download my CV', 'تحميل السيرة الذاتية')}</span></a>
        </div>
      </div>

      <div className="contact-form-panel">
        <div className="form-heading">
          <h2 className="form-step">{t('YOUR NEXT STORY', 'حكايتك الجاية')}</h2>
          <span className="form-flower" aria-hidden="true">✳</span>
        </div>
        <form ref={form} onSubmit={openEmail}>
          <div className="form-two-columns">
            <label htmlFor="contact-name">{t('Name', 'الاسم')}
              <input id="contact-name" name="name" autoComplete="name" required maxLength={100} placeholder={t('Your name', 'اسمك')} />
            </label>
            <label htmlFor="contact-email">{t('Email', 'البريد الإلكتروني')}
              <input id="contact-email" type="email" name="email" autoComplete="email" required maxLength={150} placeholder="you@company.com" dir="ltr" />
            </label>
          </div>
          <label htmlFor="contact-subject">{t('Subject', 'الموضوع')}
            <input id="contact-subject" name="subject" required maxLength={150} placeholder={t('What would you like to create?', 'حابب نشتغل على إيه؟')} />
          </label>
          <label htmlFor="contact-message">{t('Message', 'الرسالة')}
            <textarea id="contact-message" name="message" rows={6} required minLength={10} maxLength={1800} placeholder={t('Tell me about the role, your brand, or the project you have in mind.', 'احكيلي عن فرصة العمل، البراند، أو المشروع اللي في بالك.')} />
          </label>
          <div className="form-actions">
            <button type="submit" className="button primary">{t('Open email draft', 'فتح مسودة بريد')}<Send className="flip-rtl" size={17} aria-hidden="true" /></button>
            <button type="button" onClick={openWhatsApp} className="button secondary">{t('Use WhatsApp', 'عبر واتساب')}<MessageCircle size={18} aria-hidden="true" /></button>
          </div>
          <p className="form-help">{t('Opens your email app or WhatsApp with the message ready. You review and send it there.', 'يفتح تطبيق البريد أو واتساب بالرسالة جاهزة. تراجعها وترسلها بنفسك من هناك.')}</p>
          <p className="form-status" role="status" aria-live="polite">{status}</p>
        </form>
      </div>
    </section>
  );
}
