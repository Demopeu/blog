'use client';

import { Ssgoi } from '@ssgoi/react';
import { ssgoiConfig } from './config/ssgoi-config';
import { usePathname } from 'next/navigation';
import React from 'react';

export function SsgoiProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [blocking, setBlocking] = React.useState(false);

  React.useEffect(() => {
    setBlocking(true);
    const timer = window.setTimeout(() => setBlocking(false), 700);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  return (
    <Ssgoi config={ssgoiConfig}>
      <div
        style={{
          position: 'relative',
          overflowX: blocking ? 'hidden' : undefined,
          overflowY: blocking ? 'hidden' : undefined,
        }}
      >
        {children}
      </div>
    </Ssgoi>
  );
}
