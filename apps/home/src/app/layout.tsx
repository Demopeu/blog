import { Noto_Sans_KR } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import '@repo/ui/tailwind.css';
import './globals.css';

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-noto-sans-kr',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head></head>
      <body className={`${notoSansKR.variable} font-sans antialiased`}>{children}</body>
      <Analytics />
      <SpeedInsights />
    </html>
  );
}
