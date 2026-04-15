import { SidebarGroup } from '@repo/ui/shadcn';
import type { NavBarProps } from '../consts/nav';
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
      <NavBar navItems={crossZoneNavItems} local={false} />
      <NavBar navItems={localNavItems} end={false} local={true} />
    </SidebarGroup>
  );
}
