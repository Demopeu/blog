import { SidebarGroup } from '@/shared/ui/shadcn';
import { NavBar } from './NavBar';
import { NavBarProps } from '@/widgets/main-header/model/nav-config';

export function Group({ navItems }: { navItems: NavBarProps[] }) {
  return (
    <SidebarGroup className="p-4">
      <NavBar navItems={navItems} />
    </SidebarGroup>
  );
}
