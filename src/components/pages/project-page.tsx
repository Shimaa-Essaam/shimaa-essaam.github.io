/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowUpRight, FileText } from 'lucide-react';
import { categories, projects, type Language, type Project } from '@/lib/content';
import { brandPages } from '@/lib/sources';
import { asset, pick, route } from '@/lib/site';
import { DesignTile, ReelTile } from '../media-viewer';
import { ProjectCard } from '../project-card';
import { ContactBand, SectionIntro } from '../sections';

function deliverableSummary(project: Project, lang: Language) {
  const t = (en: string, ar: string) => pick(lang, en, ar);
  if (project.videos) return t(`${project.videos.length} short-form ${project.videos.length === 1 ? 'video' : 'videos'}`, `${project.videos.length} فيديو قصير`);
  if (project.images) return t(`${project.images.length} social media ${project.images.length === 1 ? 'design' : 'designs'}`, `${project.images.length} تصميم سوشيال ميديا`);
  if (project.documents) return t(`${project.documents.length} planning documents (PDF)`, `${project.documents.length} ملفات تخطيط (PDF)`);
  return '';
}

export function ProjectPage({ project, lang }: { project: Project; lang: Language }) {
  const t = (en: string, ar: string) => pick(lang, en, ar);
  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];
  const related = projects.filter((item) => item.slug !== project.slug && item.category === project.category).concat(projects.filter((item) => item.category !== project.category)).slice(0, 2);

  return (
    <>
      <article>
        <header className="container project-heading">
          <Link href={route(lang, 'work')} className="back-link"><ArrowLeft className="flip-rtl" size={17} aria-hidden="true" />{t('Back to all work', 'الرجوع لكل الأعمال')}</Link>
          <p className="eyebrow">{project.brand}<span className="inline-dot" aria-hidden="true" />{categories[project.category][lang]}</p>
          <h1>{project.title[lang]}</h1>
          <p className="project-subtitle">{project.subtitle[lang]}</p>
          <dl className="project-meta">
            <div>
              <dt>{t('BRAND', 'البراند')}</dt>
              <dd>
                {project.brand}
                <a className="brand-page-link" href={brandPages[project.brand]} target="_blank" rel="noopener noreferrer">{t('Visit Facebook page', 'زيارة صفحة فيسبوك')}<ArrowUpRight size={14} aria-hidden="true" /></a>
              </dd>
            </div>
            <div><dt>{t('MY ROLE', 'دوري')}</dt><dd>{project.role[lang]}</dd></div>
            <div><dt>{t('FORMAT', 'نوع المحتوى')}</dt><dd>{categories[project.category][lang]}</dd></div>
            <div><dt>{t('DELIVERABLES', 'المخرجات')}</dt><dd>{deliverableSummary(project, lang)}</dd></div>
          </dl>
        </header>

        <section className="container case-story" aria-labelledby="story-title">
          <h2 id="story-title">{t('The idea behind it.', 'الفكرة وراء الشغل.')}</h2>
          <div className="case-story-body">
            <p className="story-summary">{project.summary[lang]}</p>
            <div className="story-columns">
              <section aria-labelledby="audience-title">
                <h3 id="audience-title">{t('Who it speaks to', 'الجمهور')}</h3>
                <p>{project.audience[lang]}</p>
              </section>
              <section aria-labelledby="approach-title">
                <h3 id="approach-title">{t('The approach', 'طريقة التنفيذ')}</h3>
                <p>{project.approach[lang]}</p>
              </section>
            </div>
          </div>
        </section>

        <section className="container project-deliverables" aria-labelledby="work-title">
          <h2 id="work-title" className="eyebrow">{t('THE WORK', 'التنفيذ')}</h2>
          {project.videos && <div className="detail-reel-grid">{project.videos.map((id, i) => <ReelTile key={id} id={id} lang={lang} eager={i < 3} />)}</div>}
          {project.images && (
            <div className="design-gallery">
              {project.images.map((id, i) => <DesignTile key={id} id={id} index={i} lang={lang} alt={`${project.subtitle[lang]} — ${i + 1}`} />)}
            </div>
          )}
          {project.documents && (
            <div className="document-grid">
              {project.documents.map((doc) => (
                <article className="document-card" key={doc.file}>
                  <div className="document-preview">
                    <img src={asset(`/images/thumbs/${doc.preview.replace(/\.\w+$/, '.webp')}`)} alt={doc.label[lang]} width="720" height="1019" loading="lazy" decoding="async" />
                  </div>
                  <div className="document-body">
                    <FileText size={22} aria-hidden="true" />
                    <h3>{doc.label[lang]}</h3>
                    <p>{t('Audience planning document · Arabic PDF', 'ملف لتخطيط الجمهور · PDF بالعربية')}</p>
                    <a className="text-link" href={asset(`/documents/${doc.file}`)} target="_blank" rel="noopener noreferrer">{t('Read the document', 'قراءة الملف')}<ArrowUpRight size={18} aria-hidden="true" /></a>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {(project.outcome || project.testimonial) && (
          <section className="container case-outcome" aria-labelledby="outcome-title">
            <h2 id="outcome-title">{t('The outcome', 'النتيجة')}</h2>
            <div>
              {project.outcome && <p className="story-summary">{project.outcome[lang]}</p>}
              {project.testimonial && (
                <figure className="testimonial">
                  <blockquote>{project.testimonial.quote[lang]}</blockquote>
                  <figcaption><strong>{project.testimonial.name}</strong> — {project.testimonial.role[lang]}</figcaption>
                </figure>
              )}
            </div>
          </section>
        )}
      </article>

      <nav className="container next-project" aria-label={t('Next project', 'المشروع التالي')}>
        <Link href={route(lang, `work/${next.slug}`)}>
          <small>{t('Next project', 'المشروع التالي')}</small>
          <span>{next.title[lang]}</span>
          <ArrowRight className="flip-rtl" size={28} aria-hidden="true" />
        </Link>
      </nav>

      <section className="section container" aria-labelledby="more-title">
        <div className="section-top">
          <SectionIntro headingId="more-title" eyebrow={t('KEEP EXPLORING', 'اكتشف المزيد')} title={t('More from the desk.', 'أعمال تانية من مكتبي.')} />
        </div>
        <div className="project-grid">{related.map((item) => <ProjectCard key={item.slug} project={item} lang={lang} />)}</div>
      </section>
      <ContactBand lang={lang} />
    </>
  );
}
