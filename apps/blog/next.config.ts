import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  transpilePackages: ['@repo/ui'],
  basePath: '/blog',
};

export default nextConfig;
