'use client';
/* eslint-disable @next/next/no-img-element */
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Layers, Maximize2, Play, X } from 'lucide-react';
import { durations, videoDetails, videoTitles, type Design, type Language } from '@/lib/content';
import { designImage } from '@/lib/media';
import { sourceFor } from '@/lib/sources';
import { asset, pick } from '@/lib/site';
import { VideoPlayer } from './video-player';

/** One frame the lightbox can show: a design, or one slide of a carousel design. */
type Slide = { id: string; alt: string; caption: string; source?: string };
type Media = { kind: 'video'; id: string } | { kind: 'image'; slides: Slide[]; index: number };
const MediaContext = createContext<(media: Media) => void>(() => {});

const originalLabel = (lang: Language) => pick(lang, 'View original on Facebook', 'عرض الأصل على فيسبوك');

/** One shared lightbox for reels and designs; native <dialog> handles focus trapping and Escape. */
export function MediaProvider({ lang, children }: { lang: Language; children: ReactNode }) {
  const [media, setMedia] = useState<Media | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const t = (en: string, ar: string) => pick(lang, en, ar);
  const isOpen = media !== null;

  useEffect(() => {
    if (!isOpen) return;
    const opener = document.activeElement as HTMLElement | null;
    const element = dialog.current;
    if (element && !element.open) element.showModal();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = overflow;
      if (element?.open) element.close();
      opener?.focus();
    };
  }, [isOpen]);

  const close = () => setMedia(null);
  const step = (delta: number) =>
    setMedia((current) => current?.kind === 'image' ? { ...current, index: (current.index + delta + current.slides.length) % current.slides.length } : current);
  const slide = media?.kind === 'image' ? media.slides[media.index] : undefined;
  const many = media?.kind === 'image' && media.slides.length > 1;

  return (
    <MediaContext.Provider value={setMedia}>
      {children}
      {media && (
        <dialog
          ref={dialog}
          className={`media-dialog ${media.kind}`}
          aria-label={media.kind === 'video' ? videoTitles[media.id][lang] : slide?.caption}
          onCancel={close}
          onClick={(event) => event.target === event.currentTarget && close()}
          onKeyDown={(event) => {
            if (!many) return;
            // Arrow keys follow reading direction: in Arabic, the left arrow moves forward.
            const forward = lang === 'ar' ? 'ArrowLeft' : 'ArrowRight';
            const back = lang === 'ar' ? 'ArrowRight' : 'ArrowLeft';
            if (event.key === forward) step(1);
            if (event.key === back) step(-1);
          }}
        >
          <button type="button" autoFocus className="dialog-close icon-button" onClick={close} aria-label={t('Close preview', 'إغلاق المعاينة')}>
            <X aria-hidden="true" />
          </button>
          <div className="dialog-body">
            {media.kind === 'video' ? (
              <VideoPlayer key={media.id} id={media.id} lang={lang} />
            ) : slide && (
              <>
                <LightboxImage slide={slide} />
                <div className="dialog-bar">
                  {many && (
                    <div className="dialog-steps">
                      <button type="button" className="icon-button" onClick={() => step(-1)} aria-label={t('Previous design', 'التصميم السابق')}>
                        <ArrowLeft className="flip-rtl" size={20} aria-hidden="true" />
                      </button>
                      <span aria-live="polite">{media.index + 1} / {media.slides.length}</span>
                      <button type="button" className="icon-button" onClick={() => step(1)} aria-label={t('Next design', 'التصميم التالي')}>
                        <ArrowRight className="flip-rtl" size={20} aria-hidden="true" />
                      </button>
                    </div>
                  )}
                  <p className="dialog-caption">{slide.caption}</p>
                  {slide.source && (
                    <a className="dialog-source" href={slide.source} target="_blank" rel="noopener noreferrer">
                      {originalLabel(lang)}<ArrowUpRight size={16} aria-hidden="true" />
                    </a>
                  )}
                </div>
              </>
            )}
          </div>
        </dialog>
      )}
    </MediaContext.Provider>
  );
}

/** The enlarged design: phones get the 1254 px copy, large screens the full-resolution original. */
function LightboxImage({ slide }: { slide: Slide }) {
  const image = designImage(slide.id);
  return (
    <img
      key={slide.id}
      src={asset(image.full)}
      srcSet={image.large ? `${asset(image.large.src)} ${image.large.width}w, ${asset(image.full)} ${image.fullWidth}w` : undefined}
      sizes="(max-width: 1050px) 100vw, 1050px"
      alt={slide.alt}
    />
  );
}

export function ReelTile({ id, lang, eager = false }: { id: string; lang: Language; eager?: boolean }) {
  const open = useContext(MediaContext);
  const title = videoTitles[id][lang];
  const source = sourceFor(id);
  return (
    <div className="reel-item">
      {/* The accessible name is the visible caption, prefixed with "Play" for screen readers. */}
      <button type="button" className="reel" onClick={() => open({ kind: 'video', id })}>
        <img src={asset(`/images/thumbs/${id}.webp`)} alt="" loading={eager ? 'eager' : 'lazy'} decoding="async" width="540" height="960" />
        <span className="reel-duration">{durations[id]}</span>
        <span className="reel-play" aria-hidden="true"><Play size={24} fill="currentColor" /></span>
        <span className="reel-caption">
          <span className="sr-only">{pick(lang, 'Play', 'تشغيل')}: </span>
          <small>{videoDetails[id]?.label[lang] ?? pick(lang, 'SCRIPT & EDIT', 'سكريبت ومونتاج')}</small>
          <strong>{title}</strong>
        </span>
      </button>
      {source && (
        <a className="media-source-link" href={source} target="_blank" rel="noopener noreferrer">
          {originalLabel(lang)}<ArrowUpRight size={16} aria-hidden="true" />
        </a>
      )}
    </div>
  );
}

/** Every frame of a gallery in order, so the lightbox can step through carousels and neighbouring designs. */
function gallerySlides(designs: Design[], lang: Language): Slide[] {
  return designs.flatMap((design) => {
    const ids = [design.id, ...(design.slides ?? [])];
    return ids.map((id, i) => ({
      id,
      caption: design.caption[lang],
      source: design.source,
      alt: ids.length > 1
        ? `${design.caption[lang]} — ${pick(lang, `slide ${i + 1} of ${ids.length}`, `شريحة ${i + 1} من ${ids.length}`)}`
        : design.caption[lang],
    }));
  });
}

/**
 * A project's designs. Each tile shows the whole design (never cropped) and carries its own
 * caption and source link, so a link can only ever sit under the image it belongs to.
 */
export function DesignGallery({ designs, lang }: { designs: Design[]; lang: Language }) {
  const open = useContext(MediaContext);
  const slides = gallerySlides(designs, lang);
  return (
    <ul className="design-gallery">
      {designs.map((design) => {
        const start = slides.findIndex((slide) => slide.id === design.id);
        const image = designImage(design.id);
        const count = 1 + (design.slides?.length ?? 0);
        return (
          <li key={design.id} id={design.id} className="design-item">
            <button type="button" className="design-open" onClick={() => open({ kind: 'image', slides, index: start })}>
              <img
                src={asset(image.thumb)}
                srcSet={[
                  `${asset(image.thumb)} ${image.width}w`,
                  image.large && `${asset(image.large.src)} ${image.large.width}w`,
                  image.fullWidth > image.width && `${asset(image.full)} ${image.fullWidth}w`,
                ].filter(Boolean).join(', ')}
                sizes="(max-width: 899px) calc(50vw - 26px), 400px"
                alt={slides[start].alt}
                loading="lazy"
                decoding="async"
                width={image.width}
                height={image.height}
              />
              {count > 1 && <span className="design-badge"><Layers size={14} aria-hidden="true" />{pick(lang, `${count} slides`, `${count} شرائح`)}</span>}
              <span className="design-zoom" aria-hidden="true"><Maximize2 size={16} /></span>
              <span className="sr-only">{pick(lang, 'View full design', 'عرض التصميم كاملًا')}</span>
            </button>
            <div className="design-meta">
              <p>{design.caption[lang]}</p>
              {design.source && (
                <a href={design.source} target="_blank" rel="noopener noreferrer" aria-label={`${originalLabel(lang)}: ${design.caption[lang]}`}>
                  {pick(lang, 'Original', 'الأصل')}<ArrowUpRight size={14} aria-hidden="true" />
                </a>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
