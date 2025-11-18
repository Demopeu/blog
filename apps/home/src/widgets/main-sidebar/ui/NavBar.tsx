'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@repo/ui/lib/utils';
import { NavBarProps } from '../consts/nav-config';
import { iconMap } from '../lib/IconMap';

export function NavBar({ navItems }: { navItems: NavBarProps[] }) {
  const pathname = usePathname();

  return (
    <nav className="space-y-2 border-b-2 pb-8 text-3xl font-bold">
      {navItems.map(({ href, label }) => {
        const isActive = pathname === href;
        const key = label.toLowerCase() as keyof typeof iconMap;
        const Icon = iconMap[key];

        return (
          <Link
            key={href}
            href={href}
            aria-label={`Go to ${label.toLowerCase()}`}
            className={cn(
              'group flex w-full items-center px-2 py-2',
              'transition-colors',
              isActive
                ? 'text-highlight-active'
                : 'text-foreground hover:text-highlight-hover'
            )}
          >
            <div className="flex items-center gap-1.5">
              {Icon ? <Icon className="mt-1 size-6" aria-hidden /> : null}
              <p>{label}</p>
            </div>
          </Link>
        );
      })}
    </nav>
  );
}
