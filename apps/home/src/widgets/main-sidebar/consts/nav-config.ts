export type NavBarProps = {
  href: string;
  label: string;
  prefetch: boolean;
};

export const navItems: NavBarProps[] = [
  { href: '/', label: 'Home', prefetch: true },
  { href: '/resume', label: 'Resume', prefetch: true },
  { href: '/blog', label: 'Blog', prefetch: false },
];
