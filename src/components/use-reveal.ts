'use client';
import { useEffect } from 'react';

// Progressive enhancement: content is never hidden while waiting for JavaScript.
export function useReveal(viewKey:string){
 useEffect(()=>{
  const preference=window.matchMedia('(prefers-reduced-motion: reduce)');
  if(preference.matches||!('IntersectionObserver' in window))return;
  const animations=new Set<Animation>();
  const elements=document.querySelectorAll<HTMLElement>('.section-top, .project-card, .reel, .service-row, .about-teaser > div, .experience-entry, .service-cards article, .contact-option, .story-columns > div, .document-card, .contact-detail, .contact-form-panel, .published-card');
  const observer=new IntersectionObserver(entries=>{
   const visible=entries.filter(entry=>entry.isIntersecting);
   visible.forEach((entry,index)=>{
    observer.unobserve(entry.target);
    if(preference.matches)return;
    const animation=entry.target.animate([{opacity:0,transform:'translateY(22px)'},{opacity:1,transform:'translateY(0)'}],{duration:650,delay:Math.min(index*65,195),easing:'cubic-bezier(.22,1,.36,1)'});
    animations.add(animation);animation.onfinish=()=>animations.delete(animation);
   });
  },{threshold:.08,rootMargin:'0px 0px -22px 0px'});
  elements.forEach(element=>observer.observe(element));
  const stop=()=>{if(preference.matches){observer.disconnect();animations.forEach(animation=>animation.cancel());animations.clear();}};
  preference.addEventListener('change',stop);
  return()=>{observer.disconnect();animations.forEach(animation=>animation.cancel());preference.removeEventListener('change',stop)};
 },[viewKey]);
}
