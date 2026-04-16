import Link from 'next/link';

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
          className="text-black dark:text-white font-medium hover:opacity-70 transition-opacity"
        >
          {item.label}
        </Link>
      ))}
    </>
  );
}
