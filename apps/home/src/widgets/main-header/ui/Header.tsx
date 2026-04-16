import { Header, Logo } from '@repo/ui/tailwind';
import { Links } from './Links';
import { ThemeButton } from './ThemeButton';

export function MainHeader() {
  return (
    <Header
      className="fixed top-0 left-0 right-0 z-5"
      logo={<Logo />}
      nav={<Links />}
      theme={<ThemeButton />}
      mobileMenu={<div>##</div>}
    />
  );
}
