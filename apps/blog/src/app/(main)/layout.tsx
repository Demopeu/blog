import {
  Banner,
  FetchRecentPosts,
  FetchTagCloud,
  PostsNav,
} from '@/widgets/main';
import { MainWrapper } from '@/shared/ui/layout';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MainWrapper className="space-y-15 mb-40">
        <Banner />
        <FetchRecentPosts />
        <div className="flex gap-4">
          <div className="w-full md:w-2/3">
            <PostsNav />
            {children}
          </div>
          <div className="hidden md:block md:w-1/3">
            <FetchTagCloud />
          </div>
        </div>
      </MainWrapper>
    </>
  );
}
