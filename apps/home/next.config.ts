import type { NextConfig } from 'next';
import { withMicrofrontends } from '@vercel/microfrontends/next/config';

const nextConfig: NextConfig = {
  turbopack: {},
  reactCompiler: true,
  transpilePackages: ['@repo/ui'],
};

export default withMicrofrontends(nextConfig);
