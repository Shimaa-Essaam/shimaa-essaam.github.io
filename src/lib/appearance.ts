export const palettes = [
  {id:'signature',en:'Signature',ar:'ألوان شيماء',light:'#faf7f2',dark:'#1c191a',accent:'#b65b7a'},
  {id:'minimal',en:'Minimal',ar:'بسيط',light:'#f5f8f6',dark:'#101c17',accent:'#73c5a6'},
  {id:'midnight',en:'Midnight',ar:'منتصف الليل',light:'#f7f5fc',dark:'#181525',accent:'#a78bfa'},
  {id:'ocean',en:'Ocean',ar:'المحيط',light:'#f1f9fa',dark:'#101e24',accent:'#40cec8'},
  {id:'forest',en:'Forest',ar:'الغابة',light:'#f5f8ef',dark:'#171e12',accent:'#a3d85b'},
  {id:'sunset',en:'Sunset',ar:'الغروب',light:'#fff6f0',dark:'#261916',accent:'#ff9275'},
] as const;
export type Appearance = {mode:'light'|'dark';palette:string;accent?:string;background?:string};
// Self-contained so the same implementation can run before first paint and on interaction.
export function applyAppearance(settings: Appearance, presets: typeof palettes) {
  const root=document.documentElement;
  const p=presets.find(p=>p.id===settings.palette)||presets[0];
  const dark=settings.mode==='dark';
  const valid=(s?:string):s is string=>!!s&&/^#[0-9a-f]{6}$/i.test(s);
  const rgb=(s:string)=>[1,3,5].map(i=>parseInt(s.slice(i,i+2),16));
  const mix=(a:string,b:string,t:number)=>'#'+rgb(a).map((v,i)=>Math.round(v*(1-t)+rgb(b)[i]*t).toString(16).padStart(2,'0')).join('');
  const lum=(s:string)=>rgb(s).map(v=>v/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4).reduce((a,v,i)=>a+v*[.2126,.7152,.0722][i],0);
  const contrast=(a:string,b:string)=>(Math.max(lum(a),lum(b))+.05)/(Math.min(lum(a),lum(b))+.05);
  const bg=valid(settings.background)?settings.background:dark?p.dark:p.light;
  const ink=contrast(bg,'#ffffff')>contrast(bg,'#171717')?'#ffffff':'#171717';
  let accent=valid(settings.accent)?settings.accent:p.accent;
  for(let i=0;contrast(accent,bg)<4.6&&i<30;i++)accent=mix(accent,ink,.12);
  root.dataset.theme=dark?'dark':'light';
  root.dataset.palette=p.id;
  const keys=['bg','surface','card','text','muted','line','accent','accent-ink','rose','peach','sage','lilac'];
  keys.forEach(k=>root.style.removeProperty('--'+k));
  if(p.id==='signature'&&!settings.accent&&!settings.background)return;
  const values={bg,surface:mix(bg,ink,.045),card:mix(bg,ink,.065),text:ink,muted:mix(bg,ink,.68),line:mix(bg,ink,.22),accent,'accent-ink':bg,rose:mix(bg,accent,.16),peach:mix(bg,accent,.12),sage:mix(bg,accent,.09),lilac:mix(bg,accent,.2)};
  Object.entries(values).forEach(([k,v])=>root.style.setProperty('--'+k,v));
}
export function readAppearance():Appearance {
  let mode:Appearance['mode']=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';
  try {
    const saved=localStorage.getItem('shimaa-theme');
    if(saved==='light'||saved==='dark')mode=saved;
    const s=JSON.parse(localStorage.getItem('shimaa-appearance')||'null');
    if(s&&typeof s==='object')return {mode,palette:typeof s.palette==='string'?s.palette:'signature',accent:typeof s.accent==='string'?s.accent:undefined,background:typeof s.background==='string'?s.background:undefined};
  }catch{}
  return {mode,palette:'signature'};
}
