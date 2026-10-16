import { DM_Sans, DM_Serif_Display } from 'next/font/google';

// Self-hosted at build time by next/font: no render-blocking third-party CSS, size-adjusted fallbacks.
const sans = DM_Sans({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const serif = DM_Serif_Display({ subsets: ['latin'], weight: '400', style: ['normal', 'italic'], variable: '--font-serif', display: 'swap' });

export const latinFonts = `${sans.variable} ${serif.variable}`;
