'use client';
import { composeProviders } from '@/shared/lib/compose-providers';
import { ThemeProvider } from './theme-provider';
import { SsgoiProvider } from './ssgoi-provider';
import { CrossZoneLinksProvider } from './cross-zone-links-provider';

const All = composeProviders(
  ThemeProvider,
  SsgoiProvider,
  CrossZoneLinksProvider
);

export function Providers({ children }: { children: React.ReactNode }) {
  return <All>{children}</All>;
}
