import { notFound } from 'next/navigation';
import { projects, type Language } from '@/lib/content';
import { pageMetadata, projectImage, structuredData } from '@/lib/seo';
import { pick } from '@/lib/site';
import { ContactPage } from './contact-page';
import { JsonLd } from './json-ld';
import { AboutPage } from './pages/about-page';
import { HomePage } from './pages/home-page';
import { ProjectPage } from './pages/project-page';
import { WorkPage } from './pages/work-page';

// Shared by the English (app/(en)) and Arabic (app/(ar)/ar) route files, which only pass the language.

export const homeMetadata = (lang: Language) => pageMetadata({ lang, path: '' });
export function HomeRoute({ lang }: { lang: Language }) {
  return <><JsonLd data={structuredData(lang, '')} /><HomePage lang={lang} /></>;
}

export const workMetadata = (lang: Language) =>
  pageMetadata({
    lang,
    path: 'work',
    title: pick(lang, 'Selected Work', 'الأعمال'),
    description: pick(lang, 'Scripts, social visuals, videos, and the thinking behind them.', 'سكريبتات وتصميمات وفيديوهات، والتفكير اللي وراهم.'),
  });
export function WorkRoute({ lang }: { lang: Language }) {
  return <><JsonLd data={structuredData(lang, 'work')} /><WorkPage lang={lang} /></>;
}

export const aboutMetadata = (lang: Language) =>
  pageMetadata({
    lang,
    path: 'about',
    title: pick(lang, 'About', 'عنّي'),
    description: pick(
      lang,
      'I’m a content creator based in Banha, Egypt. My work brings together social copy, scripts, visual design, and video editing, with a focus on clear messages and relatable ideas.',
      'أنا صانعة محتوى من بنها، مصر. شغلي بيجمع بين كتابة محتوى السوشيال والسكريبتات والتصميم والمونتاج، مع تركيز على الرسائل الواضحة والأفكار القريبة من الجمهور.',
    ),
  });
export function AboutRoute({ lang }: { lang: Language }) {
  return <><JsonLd data={structuredData(lang, 'about')} /><AboutPage lang={lang} /></>;
}

export const contactMetadata = (lang: Language) =>
  pageMetadata({
    lang,
    path: 'contact',
    title: pick(lang, 'Contact', 'تواصل معي'),
    description: pick(lang, 'A new role, a creative project, or an idea you want to bring to life. Tell me what you have in mind.', 'فرصة عمل، مشروع إبداعي، أو فكرة عايز تحوّلها لمحتوى. احكيلي إيه اللي في بالك.'),
  });
export function ContactRoute({ lang }: { lang: Language }) {
  return <><JsonLd data={structuredData(lang, 'contact')} /><ContactPage lang={lang} /></>;
}

export type ProjectParams = { params: Promise<{ slug: string }> };
export const projectParams = () => projects.map((project) => ({ slug: project.slug }));
const findProject = (slug: string) => projects.find((project) => project.slug === slug);

export async function projectMetadata(lang: Language, { params }: ProjectParams) {
  const project = findProject((await params).slug);
  if (!project) return {};
  return pageMetadata({ lang, path: `work/${project.slug}`, title: project.title[lang], description: project.summary[lang], image: projectImage(project, lang) });
}
export async function ProjectRoute({ lang, params }: { lang: Language } & ProjectParams) {
  const project = findProject((await params).slug);
  if (!project) notFound();
  return <><JsonLd data={structuredData(lang, `work/${project.slug}`, project)} /><ProjectPage project={project} lang={lang} /></>;
}
