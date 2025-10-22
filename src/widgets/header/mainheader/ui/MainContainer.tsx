'use client';

import Link from 'next/link';
import { LogoText } from '@/shared/ui';
import NavBar from './NavBar';
import { ThemeToggle } from './ThemeToggle';

export default function MainContainer() {
  return (
    <div className="mx-40 flex w-full items-center justify-between">
      <Link href="/" aria-label="Go to home">
        <LogoText />
      </Link>
      <div className="my-auto flex items-center justify-center gap-2">
        <NavBar />
        <ThemeToggle />
      </div>
    </div>
  );
}
