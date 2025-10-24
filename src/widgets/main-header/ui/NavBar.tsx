'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

type NavBarProps = {
    navItems: { href: string; label: string }[];
};

export function NavBar({ navItems }: NavBarProps) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-nowrap items-center gap-3 text-[clamp(1rem,0.6rem_+_1.2vw,1.25rem)] font-semibold whitespace-nowrap sm:gap-5 lg:gap-6">
      {navItems.map(({ href, label }) => {
        const isActive = pathname === href;

        return (
          <Link
            key={href}
            href={href}
            aria-label={`Go to ${label.toLowerCase()}`}
            className={clsx(
              'group -mx-1 inline-flex items-center px-2 py-1.5',
              'transition-colors',
              isActive
                ? 'text-highlight-active'
                : 'text-foreground hover:text-highlight-hover',
              'relative after:absolute after:right-2 after:-bottom-0.5 after:left-2 after:h-[2px] sm:after:h-[3px]',
              'after:origin-left after:scale-x-0 group-hover:after:scale-x-100',
              isActive && 'after:scale-x-100',
              'after:bg-current after:transition-transform after:duration-200'
            )}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
