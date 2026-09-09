import type { Metadata } from 'next';
import './globals.css';
const description = 'Content, scripts, social media design, and video editing by Shimaa Essam. Explore selected work and get in touch for freelance projects and career opportunities.';
export const metadata: Metadata = {
 metadataBase: new URL('https://shimaa-essaam.github.io'),
 title: { default: 'Shimaa Essam | Content Creator', template: '%s | Shimaa Essam' },
 description,
 openGraph: {
  type: 'website', siteName: 'Shimaa Essam',
  title: 'Shimaa Essam | Content Creator', description,
  images: [{ url: '/images/social-preview.png', width: 1200, height: 630, alt: 'Shimaa Essam — Content Creator. Ideas into stories.' }],
 },
 twitter: {
  card: 'summary_large_image', title: 'Shimaa Essam | Content Creator', description,
  images: ['/images/social-preview.png'],
 },
};
const initTheme = `(function(){try{var t=localStorage.getItem('shimaa-theme');document.documentElement.dataset.theme=t==='dark'||t==='light'?t:matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}catch(e){document.documentElement.dataset.theme='light';}})();`;
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{__html:initTheme}} /></head><body>{children}</body></html>}
