import type { Metadata } from 'next';
import { Poppins, Noto_Sans_KR } from 'next/font/google';
import './styles/base.css';
import { Providers } from './provider/providers';
import { SidebarProvider } from '@repo/ui/components/sidebar';
import { MainHeader } from '@/widgets/main-header';
import { MainSidebar } from '@/widgets/main-sidebar';
import { MainFooter } from '@/widgets/main-footer';
import { PrefetchCrossZoneLinks } from '@vercel/microfrontends/next/client';
import { StructuredData } from '@/shared/seo/StructuredData';

const notoSansKr = Noto_Sans_KR({
  variable: '--font-noto-sans-kr',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['400', '600', '700'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://demopeu.vercel.app/blog'),
  title: {
    default: '井 블로그 - 개발 이야기',
    template: '%s | 井 블로그',
  },
  description:
    'Frontend 개발자 김동현의 기술 블로그. Next.js, React, TypeScript 등 웹 개발 경험을 공유합니다.',
  keywords: [
    '프론트엔드',
    'Frontend',
    'Next.js',
    'React',
    'TypeScript',
    '웹 개발',
    '개발 블로그',
    '기술 블로그',
    'JavaScript',
    'CSS',
    'Demopeu',
    '김동현',
  ],
  authors: [{ name: 'Demopeu(김동현)', url: 'https://github.com/Demopeu' }],
  creator: 'Demopeu',
  publisher: 'Demopeu',
  verification: {
    google:
      'google-site-verification=VX4rKonLkyX12HIgc-5VtfmV_U9WmPz5zfblDnUKIC4',
    other: {
      'naver-site-verification': 'YOUR_NAVER_VERIFICATION_CODE',
    },
  },
  openGraph: {
    type: 'website',
    url: 'https://demopeu.vercel.app/blog',
    title: '井 블로그 - 개발 이야기',
    description:
      'Frontend 개발자 김동현의 기술 블로그. Next.js, React, TypeScript 등 웹 개발 경험을 공유합니다.',
    siteName: '井 블로그',
    locale: 'ko_KR',
    images: [
      {
        url: '/banner.png',
        width: 1200,
        height: 630,
        alt: '井 블로그',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '井 블로그 - 개발 이야기',
    description:
      'Frontend 개발자 김동현의 기술 블로그. Next.js, React, TypeScript 등 웹 개발 경험을 공유합니다.',
    images: ['/banner.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      'index': true,
      'follow': true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://demopeu.vercel.app/blog',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <StructuredData />
      </head>
      <body
        className={`${notoSansKr.className} ${notoSansKr.variable} ${poppins.variable} antialiased`}
      >
        <Providers>
          <SidebarProvider defaultOpen={false} className="flex-col">
            <MainHeader />
            <MainSidebar />
            {children}
            <MainFooter />
          </SidebarProvider>
        </Providers>
        <PrefetchCrossZoneLinks />
      </body>
    </html>
  );
}
