import NextLink from 'next/link';
import { Link as MicroLink } from '@vercel/microfrontends/next/client';
import { cn } from '@repo/ui/lib/utils';
import { NavBarProps } from '../consts/nav';

export function NavBar({
  navItems,
  local = true,
}: {
  navItems: NavBarProps[];
  local?: boolean;
}) {
  const Link = local ? NextLink : MicroLink;

  return (
    <nav className="flex flex-nowrap items-center gap-3 whitespace-nowrap text-[clamp(1rem,0.6rem+1.2vw,1.25rem)] font-semibold sm:gap-5 lg:gap-6">
      {navItems.map(({ href, label, prefetch }) => {
        const isActive = label === 'Blog';

        return (
          <Link
            key={href}
            href={href}
            aria-label={`Go to ${label.toLowerCase()}`}
            prefetch={prefetch}
            className={cn(
              'group -mx-1 inline-flex items-center px-2 py-1.5',
              'transition-colors',
              isActive
                ? 'text-highlight-active'
                : 'text-foreground hover:text-highlight-hover',
              'relative after:absolute after:-bottom-0.5 after:left-2 after:right-2 after:h-[2px] sm:after:h-[3px]',
              'after:origin-left after:scale-x-0 group-hover:after:scale-x-100',
              isActive && 'after:scale-x-100',
              'after:bg-current after:transition-transform after:duration-200'
            )}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
