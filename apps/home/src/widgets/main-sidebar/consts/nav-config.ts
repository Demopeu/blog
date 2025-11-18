export type NavBarProps = {
  href: string;
  label: string;
  isExternal?: boolean;
};

export const navItems: NavBarProps[] = [
  { href: '/', label: 'Home' },
  { href: '/resume', label: 'Resume' },
  { href: process.env.NEXT_PUBLIC_BLOG_URL ?? '/', label: 'Blog', isExternal: true },
];
