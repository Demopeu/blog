'use client';

import Link from 'next/link';
import { LogoText } from '@/shared/ui';
import NavBar from './NavBar';

export default function MainContainer() {
  return (
    <div className="mx-40 flex w-full items-center justify-between">
      <Link href="/" aria-label="Go to home">
        <LogoText />
      </Link>
      <NavBar />
    </div>
  );
}
