import { SidebarGroup } from '@repo/ui/components';
import { NavBar } from './NavBar';
import { NavBarProps } from '../consts/nav-config';

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
