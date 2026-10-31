import { pair } from './content';

// Page identities and employment confirmed by the user; individual post mapping
// remains unset until the original media can be compared or the user confirms it.
export const brandPages:Record<string,string>={
 'Creativo Languages Institute':'https://www.facebook.com/koraasarcasm',
 'Espacio':'https://www.facebook.com/profile.php?id=61583715065888',
};
export const publishedSources=[
 {url:'https://www.facebook.com/share/r/1C9yX7SARh/',kind:'video',label:pair('Facebook reel 01','ريل فيسبوك ٠١'),mediaId:null as string|null},
 {url:'https://www.facebook.com/share/p/186ixPMy6F/',kind:'post',label:pair('Facebook post 01','منشور فيسبوك ٠١'),mediaId:null as string|null},
 {url:'https://www.facebook.com/share/p/1DjcK2ZJHt/',kind:'post',label:pair('Facebook post 02','منشور فيسبوك ٠٢'),mediaId:null as string|null},
 {url:'https://www.facebook.com/share/r/1DUsrMZrc9/',kind:'video',label:pair('Facebook reel 02','ريل فيسبوك ٠٢'),mediaId:null as string|null},
 {url:'https://www.facebook.com/share/r/18LYpsbKY7/',kind:'video',label:pair('Facebook reel 03','ريل فيسبوك ٠٣'),mediaId:null as string|null},
 {url:'https://www.facebook.com/share/r/1Ea6e4Rrz4/',kind:'video',label:pair('Facebook reel 04','ريل فيسبوك ٠٤'),mediaId:null as string|null},
 {url:'https://www.facebook.com/share/r/1DqrSJYZBB/',kind:'video',label:pair('Facebook reel 05','ريل فيسبوك ٠٥'),mediaId:null as string|null},
];
// Reels matched against the original Facebook posts supplied by the user. Design sources live on each
// design in content.ts, next to the image they belong to.
export const matchedSources:Record<string,string>={
 'video-14':'https://www.facebook.com/reel/1419327659743960/?s=single_unit',
 'video-13':'https://www.facebook.com/share/r/14nEPCCFBfq/',
 'video-09':'https://www.facebook.com/reel/1001260666228831',
 'video-07':'https://www.facebook.com/reel/27388805627428000',
 'video-02':'https://www.facebook.com/share/r/1DWUTVaA5F/',
 'video-12':'https://www.facebook.com/share/r/1cgDftPYG5/',
 'video-03':'https://www.facebook.com/reel/1021035483831464',
 'video-01':'https://www.facebook.com/reel/2208512143219636',
 'video-04':'https://www.facebook.com/reel/1306681398299141',
 'video-08':'https://www.facebook.com/reel/1040022891909892',
};
export const sourceFor=(id:string)=>matchedSources[id]??publishedSources.find(source=>source.mediaId===id)?.url;
