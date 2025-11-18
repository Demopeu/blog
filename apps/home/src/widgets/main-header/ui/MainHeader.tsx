import Link from 'next/link';
import { LogoText } from '@/shared/ui/components';
import { navItems } from '../consts/nav';
import { HeaderActions } from './HeaderActions';

export function MainHeader() {
  return (
    <header className="from-background/50 px-bgx bg-linear-to-b fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between to-transparent sm:h-20 lg:h-40">
      <Link href="/" aria-label="Go to home" className="shrink-0">
        <LogoText />
      </Link>
      <HeaderActions navItems={navItems} />
    </header>
  );
}
