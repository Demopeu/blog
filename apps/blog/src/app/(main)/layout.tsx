import { MainHeader } from '@/widgets/main-header';
import { SidebarProvider } from '@repo/ui/components/sidebar';
import { MainSidebar } from '@/widgets/main-sidebar';
import { MainFooter } from '@/widgets/main-footer';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SidebarProvider defaultOpen={false} className="flex-col">
        <MainHeader />
        <MainSidebar />
        {children}
        <MainFooter />
      </SidebarProvider>
    </>
  );
}
