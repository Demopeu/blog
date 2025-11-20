import { SsgoiTransition } from '@ssgoi/react';
import { MainWrapper } from '@/shared/ui/layout';
import { Banner, RecentPosts } from '@/widgets/main';

export default function Page() {
  return (
    <SsgoiTransition id="/">
      <MainWrapper className="space-y-15">
        <Banner />
        <RecentPosts />
      </MainWrapper>
    </SsgoiTransition>
  );
}
