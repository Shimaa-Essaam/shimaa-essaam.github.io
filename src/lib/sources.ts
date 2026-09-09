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
// Matched against the original Facebook screenshot supplied by the user.
const matchedSources:Record<string,string>={
 'image-01':'https://www.facebook.com/photo.php?fbid=1526658582822991',
 'image-10':'https://www.facebook.com/photo.php?fbid=1450535063768677',
 'image-03':'https://www.facebook.com/photo.php?fbid=1487433366745513',
 'image-05':'https://www.facebook.com/photo.php?fbid=1489223769899806',
 'video-03':'https://www.facebook.com/reel/1021035483831464',
 'video-01':'https://www.facebook.com/reel/2208512143219636',
 'video-04':'https://www.facebook.com/reel/1306681398299141',
 'video-08':'https://www.facebook.com/reel/1040022891909892',
 'image-09':'https://www.facebook.com/photo/?fbid=1456985116457005&set=a.557295843092608',
};
export const sourceFor=(id:string)=>matchedSources[id]??publishedSources.find(source=>source.mediaId===id)?.url;
