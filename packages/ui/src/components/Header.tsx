import type { ReactNode } from 'react';
import { cn } from '../lib/utils';

interface HeaderProps {
  logo: ReactNode;
  nav: ReactNode;
  theme: ReactNode;
  mobileMenu: ReactNode;
}

export function Header({ logo, nav, theme, mobileMenu }: HeaderProps) {
  return (
    <header className="mx-auto mt-[3.42vw] w-[90vw] max-w-7xl">
      <div
        className={cn(
          'bg-header-background text-foreground',
          'flex items-center justify-between rounded-full',
          'pt-[0.928vw] pr-[0.928vw] pb-[0.928vw] pl-[3.14vw]',
          'gap-[3.42vw]',
        )}
      >
        {logo}

        <nav className="hidden md:flex items-center gap-2vw">{nav}</nav>

        <div className="flex items-center gap-1vw">
          {theme}
          {mobileMenu}
        </div>
      </div>
    </header>
  );
}
