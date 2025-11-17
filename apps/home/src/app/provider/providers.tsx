'use client';
import { composeProviders } from '@/shared/lib/compose-providers';
import { ThemeProvider } from './theme-provider';
import { SsgoiProvider } from './ssgoi-provider';

const All = composeProviders(ThemeProvider, SsgoiProvider);

export function Providers({ children }: { children: React.ReactNode }) {
  return <All>{children}</All>;
}
