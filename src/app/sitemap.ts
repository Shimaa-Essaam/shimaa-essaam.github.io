import type { MetadataRoute } from 'next';
import { allPaths } from '@/lib/seo';
import { route, siteUrl } from '@/lib/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (lang: 'en' | 'ar', path: string) => `${siteUrl}${route(lang, path)}`;
  return allPaths.flatMap((path) =>
    (['en', 'ar'] as const).map((lang) => ({
      url: url(lang, path),
      changeFrequency: 'monthly' as const,
      priority: path === '' ? 1 : path.startsWith('work/') ? 0.7 : 0.8,
      alternates: { languages: { en: url('en', path), ar: url('ar', path), 'x-default': url('en', path) } },
    })),
  );
}
