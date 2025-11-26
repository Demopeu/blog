export type NavBarProps = {
  href: string;
  label: string;
  prefetch: boolean;
};

export const LocalNavItems: NavBarProps[] = [
  { href: '/', label: 'Home', prefetch: true },
  { href: '/resume', label: 'Resume', prefetch: true },
];
export const CrossZoneNavItems: NavBarProps[] = [
  { href: '/blog', label: 'Blog', prefetch: true },
];
