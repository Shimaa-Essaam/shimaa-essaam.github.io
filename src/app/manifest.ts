import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Shimaa Essam — Content Creator',
    short_name: 'Shimaa Essam',
    start_url: '/',
    display: 'browser',
    background_color: '#faf7f2',
    theme_color: '#713447',
    icons: [
      { src: '/icon.svg', type: 'image/svg+xml', sizes: 'any' },
      { src: '/apple-icon.png', type: 'image/png', sizes: '180x180' },
    ],
  };
}
