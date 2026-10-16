'use client';
import { useState } from 'react';
import { categories, projects, type Category, type Language } from '@/lib/content';
import { pick } from '@/lib/site';
import { ProjectCard } from './project-card';

type Filter = Category | 'all';
const filters = Object.keys(categories) as Filter[];

export function WorkBrowser({ lang }: { lang: Language }) {
  const [filter, setFilter] = useState<Filter>('all');
  const visible = projects.filter((project) => filter === 'all' || project.category === filter);
  const count = (key: Filter) => (key === 'all' ? projects.length : projects.filter((project) => project.category === key).length);
  return (
    <section className="container work-section" aria-label={pick(lang, 'Projects', 'المشاريع')}>
      <div className="filter-bar" role="group" aria-label={pick(lang, 'Filter projects', 'تصفية المشاريع')}>
        {filters.map((key) => (
          <button type="button" key={key} onClick={() => setFilter(key)} className={filter === key ? 'active' : ''} aria-pressed={filter === key}>
            {categories[key][lang]}
            <span>{count(key)}</span>
          </button>
        ))}
      </div>
      <p className="sr-only" role="status">{visible.length} {pick(lang, 'projects', 'مشاريع')}</p>
      <div className="project-grid work-grid">
        {visible.map((project, index) => <ProjectCard key={project.slug} project={project} lang={lang} priority={index < 2} headingLevel={2} />)}
      </div>
    </section>
  );
}
