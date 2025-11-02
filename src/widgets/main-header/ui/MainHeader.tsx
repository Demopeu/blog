import Link from 'next/link';
import { LogoText } from '@/shared/ui/shadcn';
import { navItems } from '@/widgets/main-header/model/nav-config';
import { HeaderActions } from '@/widgets/main-header/ui/HeaderActions';

export function MainHeader() {
  return (
    <header className="from-background/50 px-bgx fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between bg-gradient-to-b to-transparent sm:h-20 lg:h-40">
      <Link href="/" aria-label="Go to home" className="shrink-0">
        <LogoText />
      </Link>
      <HeaderActions navItems={navItems} />
    </header>
  );
}
