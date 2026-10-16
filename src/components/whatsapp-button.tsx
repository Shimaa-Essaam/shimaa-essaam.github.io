import { MessageCircle } from 'lucide-react';
import { contact, type Language } from '@/lib/content';
import { pick } from '@/lib/site';

export function WhatsAppButton({ lang }: { lang: Language }) {
  return (
    <a
      href={contact.whatsapp(lang)}
      target="_blank"
      rel="noopener noreferrer"
      className="floating-whatsapp"
      aria-label={pick(lang, 'Chat with Shimaa on WhatsApp', 'تواصل مع شيماء على واتساب')}
    >
      <MessageCircle size={24} aria-hidden="true" />
      <span aria-hidden="true">{pick(lang, 'Let’s talk', 'نتكلم؟')}</span>
    </a>
  );
}
