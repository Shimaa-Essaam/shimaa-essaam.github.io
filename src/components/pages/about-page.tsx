/* eslint-disable @next/next/no-img-element */
import { ArrowUpRight, Download } from 'lucide-react';
import { services, type Language } from '@/lib/content';
import { brandPages } from '@/lib/sources';
import { asset, pick } from '@/lib/site';
import { ContactBand, SectionIntro } from '../sections';

export function AboutPage({ lang }: { lang: Language }) {
  const t = (en: string, ar: string) => pick(lang, en, ar);
  const facebookLink = (brand: string) => (
    <a className="text-link brand-page-link" href={brandPages[brand]} target="_blank" rel="noopener noreferrer">
      {t('View Facebook page', 'زيارة صفحة فيسبوك')}<ArrowUpRight size={15} aria-hidden="true" />
    </a>
  );
  return (
    <>
      <section className="container about-hero" aria-labelledby="about-title">
        <div className="about-photo">
          <img
            src={asset('/images/thumbs/shimaa-portrait.webp')}
            srcSet={`${asset('/images/thumbs/shimaa-portrait.webp')} 640w, ${asset('/images/shimaa-portrait.webp')} 1086w`}
            sizes="(max-width: 600px) 88vw, 480px"
            alt={t('Shimaa Essam', 'شيماء عصام')}
            width="640"
            height="853"
            fetchPriority="high"
          />
          <span className="photo-label" aria-hidden="true">{t('SHIMAA ESSAM / CONTENT CREATOR', 'شيماء عصام / صانعة محتوى')}</span>
        </div>
        <div>
          <p className="eyebrow">{t('A LITTLE ABOUT ME', 'نبذة عنّي')}</p>
          <h1 id="about-title">{t('Hi, I’m', 'أهلًا، أنا')}<br /><em>{t('Shimaa.', 'شيماء.')}</em></h1>
          <p className="large-copy">{t('I find the story, shape the words, and bring the idea to life.', 'بلاقي الحكاية، وأصيغ الكلمات، وأحوّل الفكرة لمحتوى.')}</p>
          <p>{t('I’m a content creator based in Banha, Egypt. My work brings together social copy, scripts, visual design, and video editing, with a focus on clear messages and relatable ideas.', 'أنا صانعة محتوى من بنها، مصر. شغلي بيجمع بين كتابة محتوى السوشيال والسكريبتات والتصميم والمونتاج، مع تركيز على الرسائل الواضحة والأفكار القريبة من الجمهور.')}</p>
          <p>{t('I’ve created content for language learning and training, moving between educational ideas, promotional posts, and lighter social moments. I’m open to a new team, a new project, or a thoughtful collaboration.', 'اشتغلت على محتوى لتعلّم اللغات والتدريب، بين أفكار تعليمية ومنشورات تعريفية ومواقف خفيفة للسوشيال. ومهتمة بفرص الانضمام لفريق جديد أو التعاون في مشاريع مستقلة.')}</p>
          <a href={asset('/documents/Shimaa-Essam-CV.pdf')} download className="button primary">{t('Download my CV', 'تحميل السيرة الذاتية')}<Download size={18} aria-hidden="true" /></a>
        </div>
      </section>

      <section className="section container experience-section" aria-labelledby="experience-title">
        <SectionIntro headingId="experience-title" eyebrow={t('EXPERIENCE', 'الخبرة')} title={t('Creating, learning, refining.', 'بكتب، وبنفّذ، وبتعلّم.')} />
        <ol className="experience-list">
          <li className="experience-entry">
            <div>
              <p className="experience-dates">{t('JANUARY 2025 — PRESENT', 'يناير ٢٠٢٥ — حتى الآن')}</p>
              <h3>Creativo Languages Institute</h3>
              <p>{t('Content creation · Social media · Sales support', 'صناعة المحتوى · السوشيال ميديا · دعم المبيعات')}</p>
              {facebookLink('Creativo Languages Institute')}
            </div>
            <ul>
              <li>{t('Writing scripts for reels, posts, and marketing content.', 'كتابة سكريبتات الريلز والمنشورات والمحتوى التسويقي.')}</li>
              <li>{t('Planning content calendars and developing ideas with the team.', 'تخطيط جداول المحتوى وتطوير الأفكار مع الفريق.')}</li>
              <li>{t('Designing social visuals and editing short-form video.', 'تصميم محتوى السوشيال ومونتاج الفيديوهات القصيرة.')}</li>
              <li>{t('Supporting lead follow-up and customer communication.', 'دعم متابعة العملاء المحتملين والتواصل معهم.')}</li>
            </ul>
          </li>
          <li className="experience-entry">
            <div>
              <p className="experience-dates">{t('JANUARY 2025 — PRESENT', 'يناير ٢٠٢٥ — حتى الآن')}</p>
              <h3>Espacio</h3>
              <p>{t('Content creator · Education & training', 'صانعة محتوى · التعليم والتدريب')}</p>
              {facebookLink('Espacio')}
            </div>
            <ul>
              <li>{t('Creating social content for practical education and training.', 'صناعة محتوى للسوشيال عن التعليم العملي والتدريب.')}</li>
              <li>{t('Writing scripts and editing short-form promotional videos.', 'كتابة السكريبتات ومونتاج الفيديوهات التعريفية القصيرة.')}</li>
              <li>{t('Developing visual designs and course-related messages.', 'تصميم محتوى بصري ورسائل تعريفية للكورسات.')}</li>
            </ul>
          </li>
        </ol>
      </section>

      <section className="section container" aria-labelledby="help-title">
        <SectionIntro headingId="help-title" eyebrow={t('HOW I CAN HELP', 'خدماتي')} title={t('One idea. Different ways to tell it.', 'فكرة واحدة. طرق كتير نحكيها.')} />
        <div className="service-cards">
          {services.map((service) => (
            <article key={service.number}>
              <p className="service-name">{service.name[lang]}</p>
              <h3>{service.title[lang]}</h3>
              <p>{service.text[lang]}</p>
            </article>
          ))}
        </div>
        <div className="tools-row">
          <span>{t('EVERYDAY TOOLS', 'أدوات شغلي')}</span>
          <ul lang="en">
            <li>Canva</li><li>CapCut</li><li>Google Sheets</li><li>Microsoft Office</li>
          </ul>
        </div>
      </section>
      <ContactBand lang={lang} />
    </>
  );
}
