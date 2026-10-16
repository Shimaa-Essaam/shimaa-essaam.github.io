'use client';
import { useRef, useState } from 'react';
import { Check, Palette, RotateCcw, X } from 'lucide-react';
import { applyAppearance, palettes, readAppearance, type Appearance } from '@/lib/appearance';
import type { Language } from '@/lib/content';
import { direction, pick } from '@/lib/site';

const accents = [
  { color: '#a78bfa', en: 'Violet', ar: 'بنفسجي' },
  { color: '#32bdef', en: 'Blue', ar: 'أزرق' },
  { color: '#ef75b7', en: 'Pink', ar: 'وردي' },
  { color: '#a3d85b', en: 'Lime', ar: 'أخضر' },
  { color: '#ff9275', en: 'Coral', ar: 'مرجاني' },
];

/** Visitor color settings, stored only in this browser. Native <dialog> provides focus containment and Escape. */
export function AppearancePanel({ lang }: { lang: Language }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const overflow = useRef('');
  const [settings, setSettings] = useState<Appearance>({ mode: 'light', palette: 'signature' });
  const [saved, setSaved] = useState(true);
  const t = (en: string, ar: string) => pick(lang, en, ar);
  const preset = palettes.find((item) => item.id === settings.palette) || palettes[0];
  const currentAccent = settings.accent || preset.accent;

  function update(next: Appearance) {
    setSettings(next);
    applyAppearance(next, palettes);
    try {
      localStorage.setItem('shimaa-theme', next.mode);
      localStorage.setItem('shimaa-appearance', JSON.stringify(next));
      setSaved(true);
    } catch {
      setSaved(false);
    }
  }

  function open() {
    setSettings(readAppearance());
    overflow.current = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.current?.showModal();
  }

  const close = () => dialog.current?.close();

  return (
    <>
      <button type="button" ref={trigger} className="icon-button" onClick={open} aria-haspopup="dialog" aria-label={t('Customize appearance', 'تخصيص المظهر')} title={t('Customize appearance', 'تخصيص المظهر')}>
        <Palette size={19} aria-hidden="true" />
      </button>
      <dialog
        ref={dialog}
        className="appearance-dialog"
        aria-labelledby="appearance-title"
        dir={direction(lang)}
        onClick={(event) => event.target === event.currentTarget && close()}
        onClose={() => {
          document.body.style.overflow = overflow.current;
          trigger.current?.focus();
        }}
      >
        <div className="appearance-content">
          <div className="appearance-heading">
            <div>
              <h2 id="appearance-title">{t('Make it yours', 'على ذوقك')}</h2>
              <p role="status">{saved ? t('Saved only in this browser.', 'اختياراتك محفوظة في المتصفح ده بس.') : t('Applied for this visit; browser storage is unavailable.', 'تم التطبيق للزيارة دي؛ التخزين في المتصفح غير متاح.')}</p>
            </div>
            <button type="button" className="icon-button" onClick={close} aria-label={t('Close appearance settings', 'إغلاق تخصيص المظهر')}><X size={18} aria-hidden="true" /></button>
          </div>

          <div className="appearance-modes" role="group" aria-label={t('Color mode', 'وضع الألوان')}>
            {(['light', 'dark'] as const).map((mode) => (
              <button type="button" key={mode} aria-pressed={settings.mode === mode} onClick={() => update({ ...settings, mode, background: undefined })}>
                {mode === 'light' ? t('Light', 'فاتح') : t('Dark', 'داكن')}
              </button>
            ))}
          </div>

          <fieldset>
            <legend>{t('COLOR PALETTE', 'مجموعة الألوان')}</legend>
            <div className="appearance-palettes">
              {palettes.map((item) => (
                <button type="button" key={item.id} aria-pressed={settings.palette === item.id} onClick={() => update({ mode: settings.mode, palette: item.id })}>
                  <span className="palette-preview" style={{ background: settings.mode === 'dark' ? item.dark : item.light }} aria-hidden="true">
                    <i style={{ background: item.accent }} />
                  </span>
                  {item[lang]}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend>{t('ACCENT', 'لون التمييز')}</legend>
            <div className="appearance-swatches">
              {accents.map((accent) => (
                <button type="button" key={accent.color} style={{ background: accent.color, color: '#171717' }} aria-label={accent[lang]} aria-pressed={currentAccent === accent.color} onClick={() => update({ ...settings, accent: accent.color })}>
                  {currentAccent === accent.color && <Check size={18} aria-hidden="true" />}
                </button>
              ))}
            </div>
          </fieldset>

          <details className="appearance-fine">
            <summary>{t('Fine-tune colors', 'تخصيص الألوان بدقة')}</summary>
            <label>{t('Accent', 'لون التمييز')}<input type="color" value={currentAccent} onChange={(event) => update({ ...settings, accent: event.target.value })} /></label>
            <label>{t('Background', 'الخلفية')}<input type="color" value={settings.background || (settings.mode === 'dark' ? preset.dark : preset.light)} onChange={(event) => update({ ...settings, background: event.target.value })} /></label>
            <p>{t('Text colors adjust automatically for readability.', 'ألوان النص بتتظبط تلقائيًا عشان تفضل واضحة.')}</p>
          </details>

          <button type="button" className="appearance-reset" onClick={() => update({ mode: settings.mode, palette: 'signature' })}>
            <RotateCcw size={16} aria-hidden="true" />{t('Reset palette', 'استعادة ألوان شيماء')}
          </button>
        </div>
      </dialog>
    </>
  );
}
