'use client';
/* eslint-disable @next/next/no-img-element */
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowUpRight, Play, X } from 'lucide-react';
import { durations, videoDetails, videoTitles, type Language } from '@/lib/content';
import { designImage } from '@/lib/media';
import { sourceFor } from '@/lib/sources';
import { asset, pick } from '@/lib/site';
import { VideoPlayer } from './video-player';

type Media = { kind: 'video' | 'image'; id: string; alt?: string };
const MediaContext = createContext<(media: Media) => void>(() => {});

/** One shared lightbox for reels and designs; native <dialog> handles focus trapping and Escape. */
export function MediaProvider({ lang, children }: { lang: Language; children: ReactNode }) {
  const [media, setMedia] = useState<Media | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const t = (en: string, ar: string) => pick(lang, en, ar);

  useEffect(() => {
    if (!media) return;
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
  }, [media]);

  const close = () => setMedia(null);
  return (
    <MediaContext.Provider value={setMedia}>
      {children}
      {media && (
        <dialog
          ref={dialog}
          className={`media-dialog ${media.kind}`}
          aria-label={media.kind === 'video' ? videoTitles[media.id][lang] : t('Full design', 'التصميم كاملًا')}
          onCancel={close}
          onClick={(event) => event.target === event.currentTarget && close()}
        >
          <button type="button" autoFocus className="dialog-close icon-button" onClick={close} aria-label={t('Close preview', 'إغلاق المعاينة')}>
            <X aria-hidden="true" />
          </button>
          <div className="dialog-body">
            {media.kind === 'video' ? (
              <VideoPlayer key={media.id} id={media.id} lang={lang} />
            ) : (
              <img src={asset(`/images/${media.id}.webp`)} alt={media.alt ?? t('Social media design by Shimaa Essam', 'تصميم سوشيال ميديا لشيماء عصام')} />
            )}
          </div>
        </dialog>
      )}
    </MediaContext.Provider>
  );
}

function SourceLink({ id, lang, post }: { id: string; lang: Language; post?: boolean }) {
  const source = sourceFor(id);
  if (!source) return null;
  return (
    <a className="media-source-link" href={source} target="_blank" rel="noopener noreferrer">
      {post ? pick(lang, 'View original on Facebook', 'عرض المنشور الأصلي على فيسبوك') : pick(lang, 'View original on Facebook', 'عرض الأصل على فيسبوك')}
      <ArrowUpRight size={16} aria-hidden="true" />
    </a>
  );
}

export function ReelTile({ id, lang, eager = false }: { id: string; lang: Language; eager?: boolean }) {
  const open = useContext(MediaContext);
  const title = videoTitles[id][lang];
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
      <SourceLink id={id} lang={lang} />
    </div>
  );
}

export function DesignTile({ id, lang, alt, index }: { id: string; lang: Language; alt: string; index: number }) {
  const open = useContext(MediaContext);
  const image = designImage(id);
  return (
    <div className="design-item">
      <button type="button" onClick={() => open({ kind: 'image', id, alt })} aria-label={`${pick(lang, 'Enlarge design', 'تكبير التصميم')} ${index + 1}`}>
        <img
          src={asset(image.thumb)}
          srcSet={image.fullWidth > image.width ? `${asset(image.thumb)} ${image.width}w, ${asset(image.full)} ${image.fullWidth}w` : undefined}
          sizes="(max-width: 600px) calc(100vw - 32px), 600px"
          alt={alt}
          loading="lazy"
          decoding="async"
          width={image.width}
          height={image.height}
        />
        <span>{pick(lang, 'View full design', 'عرض التصميم كاملًا')}<ArrowUpRight size={18} aria-hidden="true" /></span>
      </button>
      <SourceLink id={id} lang={lang} post />
    </div>
  );
}
