import { existsSync } from 'node:fs';
import path from 'node:path';
import { legacyProjects, projects, videoTitles } from './content';
import { designImage, designSizes } from './media';
import { matchedSources } from './sources';

const publicDir = path.join(process.cwd(), 'public');
const facebook = /^https:\/\/www\.facebook\.com\/\S+$/;

/**
 * Build-time checks for the portfolio data. Runs from generateStaticParams, so `next build`
 * fails with a list of problems instead of publishing a broken image or a link on the wrong design.
 */
export function validateContent() {
  const problems: string[] = [];
  const fileExists = (url: string) => existsSync(path.join(publicDir, url));
  const seen = new Map<string, string>();
  const claim = (id: string, owner: string) => {
    if (seen.has(id)) problems.push(`${id} is used twice (${seen.get(id)} and ${owner})`);
    seen.set(id, owner);
  };

  for (const project of projects) {
    if (!fileExists(project.cover)) problems.push(`${project.slug}: cover ${project.cover} is missing`);
    for (const design of project.designs ?? []) {
      if (design.source && !facebook.test(design.source)) problems.push(`${design.id}: source is not a Facebook URL`);
      if (!design.caption.en || !design.caption.ar) problems.push(`${design.id}: caption needs English and Arabic`);
      for (const id of [design.id, ...(design.slides ?? [])]) {
        claim(id, project.slug);
        if (!designSizes[id]) problems.push(`${id}: add its size to designSizes in src/lib/media.ts`);
        const image = designImage(id);
        for (const file of [image.full, image.thumb, image.large?.src]) {
          if (file && !fileExists(file)) problems.push(`${id}: ${file} is missing`);
        }
      }
    }
    for (const id of project.videos ?? []) {
      claim(id, project.slug);
      if (!videoTitles[id]) problems.push(`${id}: add a title to videoTitles`);
      if (!fileExists(`/videos/${id}.mp4`)) problems.push(`${id}: /videos/${id}.mp4 is missing`);
    }
  }
  for (const [id, url] of Object.entries(matchedSources)) {
    if (!id.startsWith('video-')) problems.push(`${id}: design sources belong on the design in content.ts`);
    if (!seen.has(id)) problems.push(`${id}: has a source but is not in any project`);
    if (!facebook.test(url)) problems.push(`${id}: source is not a Facebook URL`);
  }
  for (const [slug, target] of Object.entries(legacyProjects)) {
    const project = projects.find((item) => item.slug === target.slug);
    if (!project) problems.push(`legacy ${slug}: target project ${target.slug} does not exist`);
    else if (!project.designs?.some((design) => design.id === target.design)) problems.push(`legacy ${slug}: ${target.design} is not in ${target.slug}`);
    if (projects.some((item) => item.slug === slug)) problems.push(`legacy ${slug}: also used by a live project`);
  }

  if (problems.length) throw new Error(`Portfolio content check failed:\n- ${problems.join('\n- ')}`);
}
