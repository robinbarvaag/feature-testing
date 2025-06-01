import createNextConfig from '@repo/next-config';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = createNextConfig({
  isProduction: process.env.NODE_ENV === 'production',
  analyzeBundle: process.env.ANALYZE_BUNDLE === 'true',
  nextConfig: {
    transpilePackages: ['@repo/ui', '@repo/db', '@repo/sanity'],
    logging: {
      fetches: {},
    },
    images: {
      minimumCacheTTL: 31536000,
      domains: ['yourdomain.com'],
    },
    typescript: {
      ignoreBuildErrors: true,
    },
  },
});

export default nextConfig;
