import { NavBar } from '@/widgets/main-header/ui/NavBar';
import { ThemeToggle } from '@/features/theme-toggle';
import { NavBarProps } from '@/widgets/main-header/model/nav-config';
import { SideBarToggle } from '@/features/sidebar-toggle';

export function HeaderActions({ navItems }: { navItems: NavBarProps[] }) {
  return (
    <>
      <div className="hidden items-center gap-3 md:flex">
        <NavBar navItems={navItems} />
        <ThemeToggle />
      </div>
      <div className="md:hidden">
        <SideBarToggle />
      </div>
    </>
  );
}
