'use client';

import { Ssgoi } from '@ssgoi/react';
import { ssgoiConfig } from '@/shared/config/ssgoi-config';

export function SsgoiProvider({ children }: { children: React.ReactNode }) {
  return (
    <Ssgoi config={ssgoiConfig}>
      <div style={{ position: 'relative', minHeight: '100vh' }}>{children}</div>
    </Ssgoi>
  );
}
