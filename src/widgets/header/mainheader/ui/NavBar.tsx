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
    <nav className="flex items-center gap-6 px-4 py-2 text-2xl font-bold">
      {navItems.map(({ href, label }) => {
        const isActive = pathname === href;

        return (
          <Link
            key={href}
            href={href}
            aria-label={`Go to ${label.toLowerCase()}`}
            className={clsx(
              'relative transition-colors hover:text-indigo-500',
              isActive ? 'text-indigo-500' : 'text-foreground'
            )}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
