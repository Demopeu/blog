import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  transpilePackages: ['@repo/ui'],
  basePath: '/blog',
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
        basePath: false,
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
