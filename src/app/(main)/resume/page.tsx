import React from 'react';
import Link from 'next/link';
import { SsgoiTransition } from '@ssgoi/react';

export default function page() {
  return (
    <SsgoiTransition id="/resume">
      <main className="mt-40 px-16">
        <Link href="/">Home</Link>
      </main>
    </SsgoiTransition>
  );
}
