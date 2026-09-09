'use client';
import { ArrowUpRight, Play, FileText } from 'lucide-react';
import { publishedSources } from '@/lib/sources';
import type { Language } from '@/lib/content';
export function PublishedWork({lang}:{lang:Language}){
 const t=(en:string,ar:string)=>lang==='ar'?ar:en;
 return <section className="container published-work"><div className="section-top"><div className="section-intro"><p className="eyebrow"><span/>{t('FROM THE FEED','من الصفحات')}</p><h2>{t('Out there, on Facebook.','شغل منشور على فيسبوك.')}</h2><p className="section-description">{t('Explore the original reels and posts on Facebook.','شاهد الريلز والمنشورات الأصلية على فيسبوك.')}</p></div></div><div className="published-grid">{publishedSources.map((source,index)=><a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer" className="published-card"><span className="published-index">{String(index+1).padStart(2,'0')}</span><span className="published-icon">{source.kind==='video'?<Play size={21}/>:<FileText size={21}/>}</span><span><strong>{source.label[lang]}</strong><small>{t('View original on Facebook','عرض الأصل على فيسبوك')}</small></span><ArrowUpRight size={20}/></a>)}</div></section>
}
