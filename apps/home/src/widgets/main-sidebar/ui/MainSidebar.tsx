import { Sidebar } from '@repo/ui/shadcn';
import { SideBarToggle } from '@/features/sidebar-toggle';
import { ThemeToggle } from '@/features/theme-toggle';
import { CrossZoneNavItems, LocalNavItems } from '../consts/nav-config';
import { Footer } from './Footer';
import { Group } from './Group';
import { Header } from './Header';

export function MainSidebar() {
  return (
    <Sidebar
      side="right"
      className="bg-sidebar border-none shadow-none outline-none [&>button]:hidden"
    >
      <div className="mr-1 mt-4 flex items-center justify-end">
        <ThemeToggle className="size-7 bg-transparent" />
        <SideBarToggle />
      </div>
      <Header />
      <Group localNavItems={LocalNavItems} crossZoneNavItems={CrossZoneNavItems} />
      <Footer />
    </Sidebar>
  );
}
