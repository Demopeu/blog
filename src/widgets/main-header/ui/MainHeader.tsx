import Link from 'next/link';
import { LogoText } from '@/shared/ui';
import { NavBar } from '@/widgets/main-header/ui/NavBar';
import { ThemeToggle } from '@/features/theme-toggle';
import { navItems } from '@/widgets/main-header/model/nav-config';


export function MainHeader() {
  return (
    <header className="from-background/50 px-bgx fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between bg-gradient-to-b to-transparent sm:h-20 lg:h-40">
      <Link href="/" aria-label="Go to home" className="shrink-0">
        <LogoText />
      </Link>
      <div className="flex min-w-0 items-center gap-3 sm:gap-5 lg:gap-6">
        <NavBar navItems={navItems} />
        <ThemeToggle />
      </div>
    </header>
  );
}
