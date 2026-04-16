import type { ReactNode } from 'react';
import { cn } from '../lib/utils';

interface HeaderProps {
  logo: ReactNode;
  nav: ReactNode;
  theme: ReactNode;
  mobileMenu: ReactNode;
  className?: string;
}

export function Header({ logo, nav, theme, mobileMenu, className }: HeaderProps) {
  return (
    <header className={cn('mx-auto mt-[4vw] w-[90vw] max-w-[1568px]', className)}>
      <div
        className={cn(
          'bg-background text-foreground',
          'flex items-center rounded-full',
          'pt-[0.928vw] pr-[0.928vw] pb-[0.928vw] pl-[3.14vw]',
        )}
      >
        <div className="flex flex-1 justify-start">{logo}</div>
        <nav className="hidden md:flex items-center justify-center gap-[2vw]">{nav}</nav>
        <div className="flex flex-1 items-center justify-end gap-[1vw]">
          {theme}
          {mobileMenu}
        </div>
      </div>
    </header>
  );
}
