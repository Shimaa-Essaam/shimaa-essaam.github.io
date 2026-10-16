import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { RootDocument } from '@/components/root-document';
import { latinFonts } from '@/lib/fonts';
import { siteUrl } from '@/lib/site';
import '../globals.css';

export const metadata: Metadata = { metadataBase: new URL(siteUrl) };
export const viewport: Viewport = { themeColor: '#713447' };

export default function EnglishLayout({ children }: { children: ReactNode }) {
  return <RootDocument lang="en" fonts={latinFonts}>{children}</RootDocument>;
}
