import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  transpilePackages: ['@repo/ui'],
  basePath: '/blog',
  async redirects() {
    return [
      {
        source: '/',
        destination: '/blog',
        permanent: false,
        basePath: false,
      },
    ];
  },
};

export default nextConfig;
