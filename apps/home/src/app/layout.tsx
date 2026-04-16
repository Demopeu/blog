import { ThemeProvider } from 'next-themes';
import { Noto_Sans_KR } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { PrefetchCrossZoneLinks } from '@vercel/microfrontends/next/client';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './styles/base.css';

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
    <html lang="ko" suppressHydrationWarning>
      <head></head>
      <body className={`${notoSansKR.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
        <PrefetchCrossZoneLinks />
      </body>
    </html>
  );
}
