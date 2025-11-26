import { Link } from '@vercel/microfrontends/next/client';
import { LogoText } from '@/shared/ui/components';
import { LocalNavItems, CrossZoneNavItems } from '../consts/nav';
import { HeaderActions } from './HeaderActions';

export function MainHeader() {
  return (
    <header className="from-background px-bgx bg-linear-to-b fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between to-transparent sm:h-20 lg:h-40">
      <Link href="/blog" aria-label="Go to blog" className="shrink-0">
        <LogoText />
      </Link>
      <HeaderActions
        LocalNavItems={LocalNavItems}
        CrossZoneNavItems={CrossZoneNavItems}
      />
    </header>
  );
}
