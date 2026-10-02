'use client';
import {useRef,useState} from 'react';
import {Palette,X,Check,RotateCcw} from 'lucide-react';
import {applyAppearance,readAppearance,palettes,type Appearance} from '@/lib/appearance';
import type {Language} from '@/lib/content';

export function AppearancePanel({lang}:{lang:Language}) {
  const dialog=useRef<HTMLDialogElement>(null);
  const trigger=useRef<HTMLButtonElement>(null);
  const overflow=useRef('');
  const [settings,setSettings]=useState<Appearance>({mode:'light',palette:'signature'});
  const [saved,setSaved]=useState(true);
  const t=(en:string,ar:string)=>lang==='ar'?ar:en;
  function update(next:Appearance) {
    setSettings(next);applyAppearance(next,palettes);
    try{localStorage.setItem('shimaa-theme',next.mode);localStorage.setItem('shimaa-appearance',JSON.stringify(next));setSaved(true)}catch{setSaved(false)}
  }
  function open(){setSettings(readAppearance());overflow.current=document.body.style.overflow;document.body.style.overflow='hidden';dialog.current?.showModal()}
  function close(){dialog.current?.close()}
  const preset=palettes.find(p=>p.id===settings.palette)||palettes[0];
  const accents=[['#a78bfa','Violet','بنفسجي'],['#32bdef','Blue','أزرق'],['#ef75b7','Pink','وردي'],['#a3d85b','Lime','أخضر'],['#ff9275','Coral','مرجاني']];
  return <><button ref={trigger} className="icon-button" onClick={open} aria-haspopup="dialog" aria-label={t('Customize appearance','تخصيص المظهر')} title={t('Customize appearance','تخصيص المظهر')}><Palette size={19}/></button>
  <dialog ref={dialog} className="appearance-dialog" aria-labelledby="appearance-title" dir={lang==='ar'?'rtl':'ltr'} onClick={e=>{if(e.target===e.currentTarget)close()}} onClose={()=>{document.body.style.overflow=overflow.current;trigger.current?.focus()}}>
    <div className="appearance-content"><div className="appearance-heading"><div><h2 id="appearance-title">{t('Make it yours','على ذوقك')}</h2><p role="status">{saved?t('Saved only in this browser.','اختياراتك محفوظة في المتصفح ده بس.'):t('Applied for this visit; browser storage is unavailable.','تم التطبيق للزيارة دي؛ التخزين في المتصفح غير متاح.')}</p></div><button className="icon-button" onClick={close} aria-label={t('Close appearance settings','إغلاق تخصيص المظهر')}><X size={18}/></button></div>
    <div className="appearance-modes" role="group" aria-label={t('Color mode','وضع الألوان')}>{(['light','dark'] as const).map(mode=><button key={mode} aria-pressed={settings.mode===mode} onClick={()=>update({...settings,mode,background:undefined})}>{mode==='light'?t('Light','فاتح'):t('Dark','داكن')}</button>)}</div>
    <fieldset><legend>{t('COLOR PALETTE','مجموعة الألوان')}</legend><div className="appearance-palettes">{palettes.map(p=><button key={p.id} aria-pressed={settings.palette===p.id} onClick={()=>update({mode:settings.mode,palette:p.id})}><span className="palette-preview" style={{background:settings.mode==='dark'?p.dark:p.light}}><i style={{background:p.accent}}/></span>{p[lang]}</button>)}</div></fieldset>
    <fieldset><legend>{t('ACCENT','لون التمييز')}</legend><div className="appearance-swatches">{accents.map(([color,en,ar])=><button key={color} style={{background:color,color:'#171717'}} aria-label={t(en,ar)} aria-pressed={(settings.accent||preset.accent)===color} onClick={()=>update({...settings,accent:color})}>{(settings.accent||preset.accent)===color&&<Check size={18}/>}</button>)}</div></fieldset>
    <details className="appearance-fine"><summary>{t('Fine-tune colors','تخصيص الألوان بدقة')}</summary><label>{t('Accent','لون التمييز')}<input type="color" value={settings.accent||preset.accent} onChange={e=>update({...settings,accent:e.target.value})}/></label><label>{t('Background','الخلفية')}<input type="color" value={settings.background||(settings.mode==='dark'?preset.dark:preset.light)} onChange={e=>update({...settings,background:e.target.value})}/></label><p>{t('Text colors adjust automatically for readability.','ألوان النص بتتظبط تلقائيًا عشان تفضل واضحة.')}</p></details>
    <button className="appearance-reset" onClick={()=>update({mode:settings.mode,palette:'signature'})}><RotateCcw size={16}/>{t('Reset palette','استعادة ألوان شيماء')}</button></div>
  </dialog></>;
}
