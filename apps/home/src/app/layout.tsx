import type { Metadata } from 'next';
import { Poppins, Noto_Sans_KR } from 'next/font/google';
import './styles/base.css';
import { Providers } from './provider/providers';
import { PrefetchCrossZoneLinks } from '@vercel/microfrontends/next/client';

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
  title: '井에서의 개발일지',
  description: 'Frontend 개발자 김동현의 직접 만들고 기술을 시험해보는 블로그',
  keywords: [
    '프론트엔드',
    'Frontend',
    'Next.js',
    'React',
    '웹 개발',
    '김동현',
    'Demopeu',
    '개발 블로그',
    '기술 블로그',
    '프론트엔드 포트폴리오',
  ],
  authors: [{ name: 'Demopeu(김동현)', url: 'https://github.com/Demopeu' }],
  openGraph: {
    type: 'website',
    url: 'https://demopeu.vercel.app',
    title: '井에서의 개발일지',
    description:
      'Frontend 개발자 김동현의 직접 만들고 기술을 시험해보는 블로그',
    siteName: '井에서의 개발일지',
    images: [
      {
        url: 'demopeu.vercel.app_.png',
        width: 1200,
        height: 630,
        alt: '井에서의 개발일지',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '井에서의 개발일지',
    description:
      'Frontend 개발자 김동현의 직접 만들고 기술을 시험해보는 블로그',
    images: ['demopeu.vercel.app_.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`${notoSansKr.className} ${notoSansKr.variable} ${poppins.variable} antialiased`}
      >
        <Providers>{children}</Providers>
        <PrefetchCrossZoneLinks />
      </body>
    </html>
  );
}
