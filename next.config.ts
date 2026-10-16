import type { NextConfig } from 'next';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const config: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
  poweredByHeader: false,
  // English and Arabic have separate root layouts (correct <html lang dir>), so the 404 page is global.
  experimental: { globalNotFound: true },
};

export default config;
