/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { ArrowUpRight, Play } from 'lucide-react';
import { categories, type Language, type Project } from '@/lib/content';
import { asset, pick, route } from '@/lib/site';

/** '/images/video-04.jpg' → '/images/thumbs/video-04.webp' */
const thumbFor = (cover: string) => cover.replace(/^\/images\/(.+)\.\w+$/, '/images/thumbs/$1.webp');

function deliverables(project: Project, lang: Language) {
  if (project.videos) return pick(lang, `${project.videos.length} ${project.videos.length === 1 ? 'reel' : 'reels'}`, `${project.videos.length} فيديو`);
  if (project.images) return pick(lang, `${project.images.length} ${project.images.length === 1 ? 'design' : 'designs'}`, `${project.images.length} تصميم`);
  if (project.documents) return pick(lang, `${project.documents.length} documents`, `${project.documents.length} ملفات`);
  return '';
}

export function ProjectCard({ project, lang, priority = false, headingLevel = 3 }: { project: Project; lang: Language; priority?: boolean; headingLevel?: 2 | 3 }) {
  const Heading = `h${headingLevel}` as const;
  return (
    <Link href={route(lang, `work/${project.slug}`)} className={`project-card ${project.color}`}>
      <div className={`project-art ${project.category}`}>
        {project.category === 'strategy' ? (
          <div className="strategy-art" aria-hidden="true">
            <div className="paper-sheet">
              <small>CREATIVO / AUDIENCE NOTES</small>
              <span>{pick(lang, 'People first.', 'الجمهور أولًا.')}</span>
              <div className="paper-lines" />
              <div className="persona-row"><i /><i /><i /></div>
              <p>ENGLISH · GERMAN · SPANISH</p>
            </div>
            <span className="paper-stamp">{pick(lang, 'CONTENT PLANNING', 'تخطيط المحتوى')}</span>
          </div>
        ) : (
          <img
            src={asset(thumbFor(project.cover))}
            alt=""
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : undefined}
            decoding="async"
            width={project.category === 'video' ? 540 : 720}
            height={project.category === 'video' ? 960 : 720}
          />
        )}
        <span className="project-brand">{project.brand}</span>
        <span className="project-open" aria-hidden="true">
          {project.category === 'video' ? <Play size={20} fill="currentColor" /> : <ArrowUpRight size={22} />}
        </span>
        <span className="project-count">{deliverables(project, lang)}</span>
      </div>
      <div className="project-info">
        <p className="project-category">{categories[project.category][lang]}</p>
        <Heading>{project.title[lang]}</Heading>
        <p className="project-role">{project.role[lang]}</p>
      </div>
    </Link>
  );
}
