import { Sidebar } from '@repo/ui/components';
import { Header } from './Header';
import { SideBarToggle } from '@/features/sidebar-toggle';
import { Footer } from './Footer';
import { Group } from './Group';
import { navItems } from '../consts/nav-config';
import { ThemeToggle } from '@/features/theme-toggle';

export function MainSidebar() {
  return (
    <Sidebar side="right" className="border-none shadow-none outline-none bg-sidebar [&>button]:hidden">
      <div className="mr-1 mt-4 flex items-center justify-end">
        <ThemeToggle className="size-7 bg-transparent" />
        <SideBarToggle />
      </div>
      <Header />
      <Group navItems={navItems} />
      <Footer />
    </Sidebar>
  );
}
