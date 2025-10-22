import React from 'react';
import { Resume } from '@/widgets';
import { SsgoiTransition } from '@ssgoi/react';

export default function page() {
  return (
    <SsgoiTransition id="/resume">
      <main className="px-16">
        <Resume />
      </main>
    </SsgoiTransition>
  );
}
