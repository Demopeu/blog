export type NavBarProps = {
  href: string;
  label: string;
};

export const navItems: NavBarProps[] = [
  { href: '/', label: 'Home' },
  { href: '/resume', label: 'Resume' },
  { href: '/blog', label: 'Blog' },
  { href: 'https://github.com/demopeu', label: 'GitHub' },
];
