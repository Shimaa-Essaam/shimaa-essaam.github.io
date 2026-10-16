'use client';
import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Play, Volume2, VolumeX } from 'lucide-react';
import { videoDetails, videoTitles, type Language } from '@/lib/content';
import { sourceFor } from '@/lib/sources';
import { asset, pick } from '@/lib/site';

export function VideoPlayer({ id, lang }: { id: string; lang: Language }) {
  const video = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [needsPlay, setNeedsPlay] = useState(false);
  const [failed, setFailed] = useState(false);
  const t = (en: string, ar: string) => pick(lang, en, ar);
  const src = asset(`/videos/${id}.mp4`);
  const source = sourceFor(id);

  useEffect(() => {
    const player = video.current;
    if (!player) return;
    // This component mounts only after a visitor explicitly opens a reel, so playing with sound is expected.
    player.defaultMuted = false;
    player.muted = false;
    player.volume = 1;
    player.play().catch(() => setNeedsPlay(true));
    return () => player.pause();
  }, [id]);

  function playWithSound() {
    const player = video.current;
    if (!player) return;
    player.muted = false;
    if (player.volume === 0) player.volume = 1;
    player.play().catch(() => setNeedsPlay(true));
  }

  function toggleSound() {
    const player = video.current;
    if (!player) return;
    if (player.muted || player.volume === 0) {
      player.muted = false;
      if (player.volume === 0) player.volume = 1;
    } else player.muted = true;
  }

  return (
    <>
      <div className="video-stage">
        <video
          ref={video}
          src={src}
          controls
          playsInline
          preload="none"
          poster={asset(`/images/thumbs/${id}.webp`)}
          width="540"
          height="960"
          aria-label={videoTitles[id][lang]}
          onVolumeChange={(event) => {
            setMuted(event.currentTarget.muted || event.currentTarget.volume === 0);
            setVolume(event.currentTarget.volume);
          }}
          onPlay={(event) => {
            setNeedsPlay(false);
            document.querySelectorAll('video').forEach((other) => other !== event.currentTarget && other.pause());
          }}
          onError={() => setFailed(true)}
        >
          <a href={src}>{t('Open video', 'فتح الفيديو')}</a>
        </video>
        {needsPlay && !failed && (
          <button type="button" className="play-with-sound" onClick={playWithSound}>
            <Play size={19} fill="currentColor" aria-hidden="true" />
            {t('Play with sound', 'تشغيل بالصوت')}
          </button>
        )}
      </div>
      <div className="video-audio-controls">
        <button type="button" className="sound-toggle" onClick={toggleSound} data-muted={muted}>
          {muted ? <VolumeX size={20} aria-hidden="true" /> : <Volume2 size={20} aria-hidden="true" />}
          <span>{muted ? t('Sound off', 'الصوت مكتوم') : t('Sound on', 'الصوت شغّال')}</span>
        </button>
        <label className="volume-control">
          <span className="sr-only">{t('Volume', 'مستوى الصوت')}</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={(event) => {
              const player = video.current;
              if (!player) return;
              player.volume = Number(event.target.value);
              if (player.volume > 0) player.muted = false;
            }}
          />
        </label>
      </div>
      <p className="video-title">{videoTitles[id][lang]}</p>
      {videoDetails[id] && <p className="video-description">{videoDetails[id].description[lang]}</p>}
      {source && (
        <a className="media-source-link player-source" href={source} target="_blank" rel="noopener noreferrer">
          {t('View original on Facebook', 'عرض الأصل على فيسبوك')}
          <ExternalLink size={15} aria-hidden="true" />
        </a>
      )}
      {failed && (
        <p role="alert" className="video-error">
          {t('This browser could not play the video.', 'المتصفح لم يتمكّن من تشغيل الفيديو.')}{' '}
          <a href={src} target="_blank" rel="noopener noreferrer">{t('Open the video file', 'افتح ملف الفيديو')} <ExternalLink size={13} aria-hidden="true" /></a>
        </p>
      )}
    </>
  );
}
