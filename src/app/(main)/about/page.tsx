import React from 'react';
import Link from 'next/link';
import { SsgoiTransition } from '@ssgoi/react';

export default function page() {
  return (
    <SsgoiTransition id="/about">
      <div>
        about
        <Link href="/">Home</Link>
      </div>
    </SsgoiTransition>
  );
}
