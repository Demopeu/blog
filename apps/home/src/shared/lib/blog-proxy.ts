import { NextResponse, type NextRequest } from 'next/server';

const BLOG_ORIGIN = process.env.NEXT_PUBLIC_BLOG_URL!;

export async function handleBlogProxy(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  if (!pathname.startsWith('/blog')) return NextResponse.next();

  const dest = new URL(BLOG_ORIGIN);
  dest.pathname = pathname;
  dest.search = search;

  const headers = new Headers(req.headers);
  headers.set('x-forwarded-host', req.headers.get('host') ?? '');
  headers.set('x-forwarded-proto', 'https');

  const upstream = await fetch(dest, {
    method: req.method,
    headers,
    body: req.method === 'GET' || req.method === 'HEAD' ? undefined : req.body,
    redirect: 'manual',
  });

  const outHeaders = new Headers(upstream.headers);
  rewriteLocation(outHeaders);

  return new Response(upstream.body, {
    status: upstream.status,
    headers: outHeaders,
  });
}

function rewriteLocation(outHeaders: Headers) {
  const loc = outHeaders.get('location');
  if (!loc) return;

  const u = new URL(loc, BLOG_ORIGIN);
  const newPath = u.pathname.startsWith('/blog')
    ? u.pathname
    : `/blog${u.pathname}`;
  outHeaders.set('location', `${newPath}${u.search}${u.hash}`);
}
