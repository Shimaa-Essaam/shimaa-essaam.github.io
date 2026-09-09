'use client';
import { useEffect, useRef, useState } from 'react';
import { Play, Volume2, VolumeX, ExternalLink } from 'lucide-react';
import { sourceFor } from '@/lib/sources';
import { asset, videoTitles, type Language } from '@/lib/content';

export function VideoPlayer({id,lang}:{id:string;lang:Language}){
 const video=useRef<HTMLVideoElement>(null);
 const [muted,setMuted]=useState(false);
 const [volume,setVolume]=useState(1);
 const [needsPlay,setNeedsPlay]=useState(false);
 const [failed,setFailed]=useState(false);
 const t=(en:string,ar:string)=>lang==='ar'?ar:en;
 useEffect(()=>{
  const player=video.current;
  if(!player)return;
  // This component mounts only after a visitor explicitly opens a reel.
  player.defaultMuted=false;player.muted=false;player.volume=1;
  player.play().catch(()=>setNeedsPlay(true));
  return()=>{player.pause()};
 },[id]);
 function playWithSound(){const player=video.current;if(!player)return;player.muted=false;if(player.volume===0)player.volume=1;player.play().catch(()=>setNeedsPlay(true));}
 function toggleSound(){const player=video.current;if(!player)return;if(player.muted||player.volume===0){player.muted=false;if(player.volume===0)player.volume=1;}else player.muted=true;}
 return <>
  <div className="video-stage"><video ref={video} src={asset(`/videos/${id}.mp4`)} controls playsInline preload="none" poster={asset(`/images/${id}.jpg`)} aria-label={videoTitles[id][lang]}
   onVolumeChange={event=>{setMuted(event.currentTarget.muted||event.currentTarget.volume===0);setVolume(event.currentTarget.volume)}}
   onPlay={event=>{setNeedsPlay(false);document.querySelectorAll('video').forEach(other=>{if(other!==event.currentTarget)other.pause()})}}
   onError={()=>setFailed(true)}>
   <a href={asset(`/videos/${id}.mp4`)}>{t('Open video','فتح الفيديو')}</a>
  </video>{needsPlay&&!failed&&<button className="play-with-sound" onClick={playWithSound}><Play size={19} fill="currentColor"/>{t('Play with sound','تشغيل بالصوت')}</button>}</div>
  <div className="video-audio-controls"><button className="sound-toggle" onClick={toggleSound} aria-pressed={!muted} aria-label={muted?t('Turn sound on','تشغيل الصوت'):t('Mute sound','كتم الصوت')}>{muted?<VolumeX size={20}/>:<Volume2 size={20}/>}<span>{muted?t('Sound off','الصوت مكتوم'):t('Sound on','الصوت شغّال')}</span></button><label className="volume-control"><span className="sr-only">{t('Volume','مستوى الصوت')}</span><input type="range" min="0" max="1" step="0.05" value={volume} aria-label={t('Volume','مستوى الصوت')} onChange={event=>{const player=video.current;if(player){player.volume=Number(event.target.value);if(player.volume>0)player.muted=false;}}}/></label></div>
  <p className="video-title">{videoTitles[id][lang]}</p>
  {sourceFor(id)&&<a className="media-source-link player-source" href={sourceFor(id)} target="_blank" rel="noopener noreferrer">{t('View original on Facebook','عرض الأصل على فيسبوك')}<ExternalLink size={15}/></a>}
  {failed&&<p role="alert" className="video-error">{t('This browser could not play the video.','المتصفح لم يتمكّن من تشغيل الفيديو.')} <a href={asset(`/videos/${id}.mp4`)} target="_blank" rel="noopener noreferrer">{t('Open the video file','افتح ملف الفيديو')} <ExternalLink size={13}/></a></p>}
 </>
}
