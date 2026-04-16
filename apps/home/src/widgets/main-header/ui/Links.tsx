import Link from 'next/link';
import { cn } from '@repo/ui/tailwind';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Resume', href: '/resume' },
  { label: 'Blog', href: '/blog' },
];

export function Links() {
  return (
    <>
      {navItems.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className={cn(
            'text-xl font-medium text-foreground px-4 py-2 rounded-2xl',
            'transition-all duration-200 ease-out',
            'hover:bg-accent hover:text-accent-foreground',
            'active:scale-90',
          )}
        >
          {item.label}
        </Link>
      ))}
    </>
  );
}
