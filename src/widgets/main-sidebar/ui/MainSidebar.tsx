import { Sidebar } from '@/shared/ui';
import { Header } from './Header';
import { SideBarToggle } from '@/features/sidebar-toggle';
import { Footer } from './Footer';
import { Group } from './Group';
import { navItems } from '@/widgets/main-sidebar/model/nav-config';
import { ThemeToggle } from '@/features/theme-toggle';

export function MainSidebar() {
  return (
    <Sidebar side="right" className="border-none shadow-none outline-none">
      <div className="mt-4 mr-1 flex items-center justify-end">
        <ThemeToggle className="size-7 bg-transparent" />
        <SideBarToggle />
      </div>
      <Header />
      <Group navItems={navItems} />
      <Footer />
    </Sidebar>
  );
}
