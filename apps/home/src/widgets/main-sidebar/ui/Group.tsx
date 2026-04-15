import { SidebarGroup } from '@repo/ui/shadcn';
import type { NavBarProps } from '../consts/nav-config';
import { NavBar } from './NavBar';

export function Group({
  localNavItems,
  crossZoneNavItems,
}: {
  localNavItems: NavBarProps[];
  crossZoneNavItems: NavBarProps[];
}) {
  return (
    <SidebarGroup className="p-4">
      <NavBar navItems={localNavItems} local={true} />
      <NavBar navItems={crossZoneNavItems} end={false} local={false} />
    </SidebarGroup>
  );
}
