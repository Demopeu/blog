import type { NextRequest } from 'next/server';
import { handleBlogProxy } from './shared/lib/blog-proxy';

export const config = {
  matcher: ['/blog', '/blog/:path*'],
};

export async function proxy(req: NextRequest) {
  return handleBlogProxy(req);
}
