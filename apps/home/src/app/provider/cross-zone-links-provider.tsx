import { PrefetchCrossZoneLinksProvider } from '@vercel/microfrontends/next/client';

export function CrossZoneLinksProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PrefetchCrossZoneLinksProvider>{children}</PrefetchCrossZoneLinksProvider>
  );
}
