export type NavBarProps = {
  href: string;
  label: string;
  prefetch: boolean;
  external?: boolean;
};

export const CrossZoneNavItems: NavBarProps[] = [
  { href: '/', label: 'Home', prefetch: true, external: false },
  {
    href: '/resume',
    label: 'Resume',
    prefetch: true,
    external: false,
  },
];

export const LocalNavItems: NavBarProps[] = [
  { href: '/blog', label: 'Blog', prefetch: true },
];
