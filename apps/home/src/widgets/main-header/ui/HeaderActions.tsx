import { NavBar } from './NavBar';
import { ThemeToggle } from '@/features/theme-toggle';
import { NavBarProps } from '../consts/nav';
import { SideBarToggle } from '@/features/sidebar-toggle';

export function HeaderActions({
  LocalNavItems,
  CrossZoneNavItems,
}: {
  LocalNavItems: NavBarProps[];
  CrossZoneNavItems: NavBarProps[];
}) {
  return (
    <>
      <div className="flex items-center">
        <div className="hidden md:flex md:items-center md:gap-6">
          <NavBar navItems={LocalNavItems} local={true} />
          <NavBar navItems={CrossZoneNavItems} local={false} />
          <ThemeToggle />
        </div>
        <div className="md:hidden">
          <SideBarToggle />
        </div>
      </div>
    </>
  );
}
