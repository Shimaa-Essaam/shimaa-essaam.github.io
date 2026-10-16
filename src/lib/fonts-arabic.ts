import { Alexandria, Readex_Pro } from 'next/font/google';
import { latinFonts } from './fonts';

// Arabic pairing (see docs/research/04): Alexandria for headings, Readex Pro for text.
// Only the Arabic layout imports this module, so English pages never download these fonts.
const display = Alexandria({ subsets: ['arabic', 'latin'], variable: '--font-ar-display', display: 'swap' });
const text = Readex_Pro({ subsets: ['arabic', 'latin'], variable: '--font-ar-text', display: 'swap' });

export const arabicFonts = `${latinFonts} ${display.variable} ${text.variable}`;
