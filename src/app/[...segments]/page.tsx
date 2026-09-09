import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Portfolio } from '@/components/portfolio';
import { projects, type Language } from '@/lib/content';
export const dynamicParams = false;
export function generateStaticParams(){
 const paths = ['work','about','contact',...projects.map(p=>`work/${p.slug}`)];
 return [...paths.map(p=>({segments:p.split('/')})),{segments:['ar']},...paths.map(p=>({segments:['ar',...p.split('/')] }))];
}
function parse(segments:string[]){const lang:Language=segments[0]==='ar'?'ar':'en';const parts=lang==='ar'?segments.slice(1):segments;return {lang,page:parts[0]||'home',slug:parts[1]};}
export async function generateMetadata({params}:{params:Promise<{segments:string[]}>}):Promise<Metadata>{const {lang,page,slug}=parse((await params).segments);const project=projects.find(p=>p.slug===slug);const names:Record<string,string>={home:lang==='ar'?'شيماء عصام — صانعة محتوى':'Content Creator',work:lang==='ar'?'الأعمال':'Selected Work',about:lang==='ar'?'عنّي':'About',contact:lang==='ar'?'تواصل معي':'Contact'};return {title:project?project.title[lang]:names[page],description:project?.summary[lang]};}
export default async function Page({params}:{params:Promise<{segments:string[]}>}){const {lang,page,slug}=parse((await params).segments);if(!['home','work','about','contact'].includes(page)||(slug&&!projects.some(p=>p.slug===slug)))notFound();return <Portfolio lang={lang} page={page as 'home'|'work'|'about'|'contact'} slug={slug}/>}
