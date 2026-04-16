import type { NextConfig } from 'next';
import { withMicrofrontends } from '@vercel/microfrontends/next/config';

const nextConfig: NextConfig = {
  turbopack: {},
  reactCompiler: true,
};

export default withMicrofrontends(nextConfig);
