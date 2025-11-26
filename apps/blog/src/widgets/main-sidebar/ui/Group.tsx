import { SidebarGroup } from '@repo/ui/components';
import { NavBar } from './NavBar';
import { NavBarProps } from '../consts/nav';

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
