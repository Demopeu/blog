export type NavBarProps = {
  href: string;
  label: string;
  prefetch: boolean;
  external?: boolean;
};

const HOME_URL = process.env.NEXT_PUBLIC_HOME_URL!;

export const navItems: NavBarProps[] = [
  { href: `${HOME_URL}`, label: 'Home', prefetch: false, external: true },
  {
    href: `${HOME_URL}/resume`,
    label: 'Resume',
    prefetch: false,
    external: true,
  },
  { href: '/blog', label: 'Blog', prefetch: true },
];
