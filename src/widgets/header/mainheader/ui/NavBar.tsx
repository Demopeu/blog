'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

export default function NavBar() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/resume', label: 'Resume' },
    { href: '/blog', label: 'Blog' },
  ];

  return (
    <nav className="flex items-start gap-6 px-4 py-2 text-2xl font-bold">
      {navItems.map(({ href, label }) => {
        const isActive = pathname === href;

        return (
          <Link
            key={href}
            href={href}
            aria-label={`Go to ${label.toLowerCase()}`}
            className={clsx(
              'hover:text-highlight-hover relative transition-colors',
              isActive ? 'text-highlight-active' : 'text-foreground'
            )}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
