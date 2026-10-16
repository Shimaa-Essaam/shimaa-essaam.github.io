import type { Metadata } from 'next';
import { contact, projects, type Language, type Project } from './content';
import { brandPages } from './sources';
import { route, siteUrl } from './site';

export const siteName = { en: 'Shimaa Essam', ar: 'شيماء عصام' } as const;
export const jobTitle = { en: 'Content Creator', ar: 'صانعة محتوى' } as const;
export const siteDescription = {
  en: 'Content, scripts, social media design, and video editing by Shimaa Essam. Explore selected work and get in touch for freelance projects and career opportunities.',
  ar: 'محتوى وسكريبتات وتصميمات سوشيال ميديا ومونتاج فيديو من شيماء عصام. اكتشف أعمال مختارة وتواصل معي للمشاريع المستقلة وفرص العمل.',
} as const;

const socialImage = {
  en: { url: '/images/social-preview.png', alt: 'Shimaa Essam — Content Creator. Ideas into stories.' },
  ar: { url: '/images/social-preview-ar.png', alt: 'شيماء عصام — صانعة محتوى. من فكرة لحكاية.' },
};

type PageMetadata = {
  lang: Language;
  /** Site path without language prefix, e.g. '' or 'work/espacio-space'. */
  path: string;
  /** Page title; omit on the home page to use the site title. */
  title?: string;
  description?: string;
  image?: { url: string; alt: string };
};

/** Per-page metadata with canonical, hreflang alternates and localized social cards. */
export function pageMetadata({ lang, path, title, description = siteDescription[lang], image = socialImage[lang] }: PageMetadata): Metadata {
  const fullTitle = title ? `${title} | ${siteName[lang]}` : `${siteName[lang]} | ${jobTitle[lang]}`;
  const url = route(lang, path);
  const images = [{ url: image.url, width: 1200, height: 630, alt: image.alt }];
  return {
    title: { absolute: fullTitle },
    description,
    alternates: {
      canonical: url,
      languages: { en: route('en', path), ar: route('ar', path), 'x-default': route('en', path) },
    },
    openGraph: {
      type: 'website',
      siteName: siteName[lang],
      locale: lang === 'ar' ? 'ar_EG' : 'en_US',
      alternateLocale: lang === 'ar' ? 'en_US' : 'ar_EG',
      url,
      title: fullTitle,
      description,
      images,
    },
    twitter: { card: 'summary_large_image', title: fullTitle, description, images: images.map((item) => item.url) },
  };
}

export const projectImage = (project: Project, lang: Language) => ({
  url: `/images/og/${project.slug}${lang === 'ar' ? '-ar' : ''}.png`,
  alt: `${project.title[lang]} — ${project.brand}`,
});

const personId = `${siteUrl}/#person`;

function person(lang: Language) {
  return {
    '@type': 'Person',
    '@id': personId,
    name: siteName[lang],
    alternateName: lang === 'ar' ? siteName.en : siteName.ar,
    jobTitle: jobTitle[lang],
    url: `${siteUrl}${route(lang)}`,
    image: `${siteUrl}/images/shimaa-portrait.webp`,
    email: `mailto:${contact.email}`,
    address: { '@type': 'PostalAddress', addressLocality: lang === 'ar' ? 'بنها' : 'Banha', addressCountry: 'EG' },
    sameAs: [contact.linkedin],
    worksFor: Object.entries(brandPages).map(([name, url]) => ({ '@type': 'Organization', name, sameAs: url })),
    knowsAbout: lang === 'ar'
      ? ['كتابة السكريبتات', 'محتوى السوشيال ميديا', 'تصميم السوشيال ميديا', 'مونتاج الفيديو', 'تخطيط المحتوى']
      : ['Scriptwriting', 'Social media content', 'Social media design', 'Video editing', 'Content planning'],
  };
}

/** JSON-LD graph for a page. Only facts that already appear on the site are used. */
export function structuredData(lang: Language, path: string, project?: Project) {
  const url = `${siteUrl}${route(lang, path)}`;
  const website = { '@type': 'WebSite', '@id': `${siteUrl}/#website`, url: `${siteUrl}/`, name: siteName[lang], inLanguage: lang, publisher: { '@id': personId } };
  const graph: object[] = [website];
  if (!path || path === 'about') graph.push({ '@type': 'ProfilePage', url, inLanguage: lang, mainEntity: person(lang) });
  else graph.push(person(lang));
  if (project) {
    graph.push({
      '@type': 'CreativeWork',
      url,
      name: project.title[lang],
      headline: project.subtitle[lang],
      description: project.summary[lang],
      image: `${siteUrl}${project.cover}`,
      creator: { '@id': personId },
      sourceOrganization: { '@type': 'Organization', name: project.brand, sameAs: brandPages[project.brand] },
    });
  }
  return { '@context': 'https://schema.org', '@graph': graph };
}

export const allPaths = ['', 'work', 'about', 'contact', ...projects.map((project) => `work/${project.slug}`)];
