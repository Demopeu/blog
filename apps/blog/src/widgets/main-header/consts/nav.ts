export type NavBarProps = {
  href: string;
  label: string;
  prefetch: boolean;
  external?: boolean;
};

const HOME_URL = process.env.NEXT_PUBLIC_HOME_URL!;

export const navItems: NavBarProps[] = [
  { href: `${HOME_URL}`, label: 'Home', prefetch: true, external: false },
  {
    href: `${HOME_URL}/resume`,
    label: 'Resume',
    prefetch: true,
    external: false,
  },
  { href: '/blog', label: 'Blog', prefetch: false },
];
