import type { NextConfig } from 'next';
import { withMicrofrontends } from '@vercel/microfrontends/next/config';

const nextConfig: NextConfig = {
  turbopack: {},
  reactCompiler: true,
  transpilePackages: ['@repo/ui'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'ydzytsiwcbqavpsdknrq.supabase.co',
        port: '',
        pathname: '/**',
        search: '',
      },
    ],
  },
  redirects: () => {
    return [
      {
        source: '/',
        destination: '/blog',
        permanent: true,
      },
    ];
  },
};

export default withMicrofrontends(nextConfig);
