/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Volume2 } from 'lucide-react';
import { projects, services, workTotals, type Language } from '@/lib/content';
import { brandPages } from '@/lib/sources';
import { asset, pick, route } from '@/lib/site';
import { ReelTile } from '../media-viewer';
import { ProjectCard } from '../project-card';
import { ContactBand, SectionIntro } from '../sections';

const featured = ['spanish-social-content', 'creativo-reels', 'espacio-accounting', 'language-audience-research'];
const featuredReels = ['video-13', 'video-12', 'video-02'];

export function HomePage({ lang }: { lang: Language }) {
  const t = (en: string, ar: string) => pick(lang, en, ar);
  return (
    <>
      <section className="hero container" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="availability"><span aria-hidden="true" />{t('OPEN TO OPPORTUNITIES & FREELANCE', 'متاحة لفرص العمل والمشاريع المستقلة')}</p>
          <p className="hero-intro">{t('HELLO, I’M SHIMAA.', 'أهلًا، أنا شيماء.')}</p>
          <h1 id="hero-title">
            {t('Good stories.', 'حكايات قريبة.')}
            <br />
            <em>{t('Real connection.', 'ومحتوى يوصّل.')}</em>
          </h1>
          <p className="hero-description">{t('I turn ideas into scripts, social content, and videos that speak your audience’s language.', 'بحوّل الأفكار لسكريبتات ومحتوى سوشيال وفيديوهات تتكلم بلغة جمهورك.')}</p>
          <div className="hero-actions">
            <Link href={route(lang, 'work')} className="button primary">{t('Explore my work', 'اكتشف أعمالي')}<ArrowUpRight size={18} aria-hidden="true" /></Link>
            <Link href={route(lang, 'contact')} className="text-link">{t('Let’s talk', 'خلّينا نتكلم')}<ArrowRight className="flip-rtl" size={18} aria-hidden="true" /></Link>
          </div>
          <p className="hero-footnote">{t('WORDS. VISUALS. A LITTLE PERSONALITY.', 'كلمات. صور. ولمسة شخصية.')}</p>
        </div>
        <div className="hero-visual">
          <div className="portrait-arch">
            <img
              className="hero-portrait"
              src={asset('/images/thumbs/shimaa-portrait.webp')}
              srcSet={`${asset('/images/thumbs/shimaa-portrait.webp')} 640w, ${asset('/images/shimaa-portrait.webp')} 1086w`}
              sizes="(max-width: 600px) 80vw, 500px"
              alt={t('Shimaa Essam, content creator', 'شيماء عصام، صانعة محتوى')}
              width="640"
              height="853"
              fetchPriority="high"
            />
            <span className="portrait-caption" aria-hidden="true">{t('A CREATIVE MIND, AT WORK.', 'فكرة بتاخد شكلها.')}</span>
          </div>
          <span className="orbit-label" aria-hidden="true">{t('IDEAS INTO STORIES', 'من فكرة لحكاية')}<span>✳</span></span>
          <div className="floating-note" aria-hidden="true">
            <span className="note-spark">✳</span>
            <div><span>{t('Thoughtfully written.', 'كتابة بفكرة.')}</span><strong>{t('Made to connect.', 'ومحتوى يقرّب.')}</strong></div>
          </div>
          <span className="handwritten" aria-hidden="true">
            {t('a little more human.', 'بلمسة أقرب.')}
            <svg viewBox="0 0 100 40"><path d="M4 8 Q35 38 88 15 M77 10 L90 15 L82 25" /></svg>
          </span>
        </div>
      </section>

      <div className="capability-strip">
        <ul className="container" aria-label={t('What I do', 'شغلي')}>
          <li>{t('SCRIPTWRITING', 'كتابة السكريبتات')}</li>
          <li>{t('SOCIAL CONTENT', 'محتوى السوشيال')}</li>
          <li>{t('VIDEO EDITING', 'مونتاج الفيديو')}</li>
          <li>{t('CONTENT PLANNING', 'تخطيط المحتوى')}</li>
        </ul>
      </div>

      <section className="container proof" aria-label={t('Clients and published work', 'العملاء والأعمال المنشورة')}>
        <div className="proof-brands">
          <span>{t('CURRENTLY CREATING FOR', 'بصنع محتوى حاليًا لـ')}</span>
          <a href={brandPages['Creativo Languages Institute']} target="_blank" rel="noopener noreferrer">Creativo Languages Institute <ArrowUpRight size={15} aria-hidden="true" /></a>
          <a href={brandPages.Espacio} target="_blank" rel="noopener noreferrer">Espacio <ArrowUpRight size={15} aria-hidden="true" /></a>
        </div>
        <ul className="proof-counts">
          <li><strong>{workTotals.reels}</strong> {t('short-form videos', 'فيديو قصير')}</li>
          <li><strong>{workTotals.designs}</strong> {t('social media designs', 'تصميم سوشيال ميديا')}</li>
          <li><strong>{workTotals.documents}</strong> {t('audience-planning documents', 'ملفات لتخطيط الجمهور')}</li>
        </ul>
      </section>

      <section className="section container" aria-labelledby="selected-work">
        <div className="section-top">
          <SectionIntro headingId="selected-work" eyebrow={t('SELECTED WORK', 'أعمال مختارة')} title={t('Ideas, out in the world.', 'أفكار خرجت للنور.')} />
          <Link href={route(lang, 'work')} className="text-link">{t('All projects', 'كل المشاريع')}<ArrowUpRight size={18} aria-hidden="true" /></Link>
        </div>
        <div className="project-grid">
          {featured.map((slug, index) => {
            const project = projects.find((item) => item.slug === slug)!;
            return <ProjectCard key={slug} project={project} lang={lang} priority={index < 2} />;
          })}
        </div>
      </section>

      <section className="reels-section" aria-labelledby="reels-title">
        <div className="container">
          <div className="section-top">
            <SectionIntro headingId="reels-title" eyebrow={t('PRESS PLAY', 'اضغط تشغيل')} title={t('Small screen. Big personality.', 'فيديو قصير. شخصية واضحة.')} description={t('A few moments from my editing desk.', 'لقطات من شغلي في كتابة ومونتاج الفيديوهات.')} />
            <p className="sound-note"><Volume2 size={16} aria-hidden="true" />{t('You choose when to play.', 'التشغيل باختيارك.')}</p>
          </div>
          <div className="reel-grid">{featuredReels.map((id) => <ReelTile key={id} id={id} lang={lang} />)}</div>
        </div>
      </section>

      <section className="section container services-section" aria-labelledby="services-title">
        <SectionIntro headingId="services-title" eyebrow={t('WHAT I BRING', 'إزاي أقدر أساعدك')} title={t('From the first idea', 'من أول فكرة')} description={t('to the final frame.', 'لآخر لقطة.')} />
        <ul className="services-list">
          {services.map((service) => (
            <li className="service-row" key={service.number}>
              <h3>{service.name[lang]}</h3>
              <p>{service.text[lang]}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="about-teaser container" aria-labelledby="about-teaser-title">
        <figure className="teaser-quote">
          <span aria-hidden="true">“</span>
          <blockquote>{t('The best content feels like a conversation.', 'أحسن محتوى بيحسّسك إن حد بيتكلم معاك.')}</blockquote>
          <figcaption>— {t('Shimaa', 'شيماء')}</figcaption>
        </figure>
        <div>
          <p className="eyebrow">{t('THE PERSON BEHIND THE WORK', 'مين وراء الشغل؟')}</p>
          <h2 id="about-teaser-title">{t('Curious by nature.', 'فضول بيولّد أفكار.')}<br /><em>{t('Creative by choice.', 'وإبداع بيحوّلها لمحتوى.')}</em></h2>
          <p>{t('I’m a content creator based in Egypt, working across scripts, social visuals, and short-form video. I enjoy finding a simple, relatable way to tell a brand’s story.', 'أنا صانعة محتوى من مصر، بشتغل على السكريبتات وتصميمات السوشيال والفيديوهات القصيرة. بحب ألاقي طريقة بسيطة وقريبة أحكي بيها قصة كل براند.')}</p>
          <div className="teaser-actions">
            <Link href={route(lang, 'about')} className="text-link">{t('A little about me', 'اعرفني أكتر')}<ArrowUpRight size={18} aria-hidden="true" /></Link>
            <a href={asset('/documents/Shimaa-Essam-CV.pdf')} download className="text-link">{t('Download my CV', 'تحميل السيرة الذاتية')}<ArrowUpRight size={18} aria-hidden="true" /></a>
          </div>
        </div>
      </section>
      <ContactBand lang={lang} />
    </>
  );
}
