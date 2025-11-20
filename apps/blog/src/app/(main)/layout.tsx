import { MainHeader } from '@/widgets/main-header';
import { SidebarProvider } from '@repo/ui/components/sidebar';
import { MainSidebar } from '@/widgets/main-sidebar';
import { MainFooter } from '@/widgets/main-footer';
import { Banner } from '@/widgets/main';
import { RecentPosts } from '@/widgets/main';
import { MainWrapper } from '@/shared/ui/layout';
import { PostsNav } from '@/widgets/main';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SidebarProvider defaultOpen={false} className="flex-col">
        <MainHeader />
        <MainSidebar />
        <MainWrapper className="space-y-15 mb-40">
          <Banner />
          <RecentPosts />
          <div className="flex gap-4">
            <div className="w-full md:w-2/3">
              <PostsNav />
              {children}
            </div>
            <div className="hidden md:block md:w-1/3">TagCloud</div>
          </div>
        </MainWrapper>
        <MainFooter />
      </SidebarProvider>
    </>
  );
}
