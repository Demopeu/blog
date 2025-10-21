import Link from 'next/link';
import { LogoText } from '@/shared/ui';

export function MainHeader() {
  return (
    <header className="fixed top-0 z-50 flex h-40 w-full items-center justify-between bg-gradient-to-b from-black/60 to-transparent px-16">
      <Link href="/" aria-label="Go to home">
        <LogoText />
      </Link>
    </header>
  );
}
