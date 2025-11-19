import { SsgoiTransition } from '@ssgoi/react';
import { MainWrapper } from '@/shared/ui/layout';

export default function Page() {
  return (
    <SsgoiTransition id="/">
      <MainWrapper>
        <div>page</div>
      </MainWrapper>
    </SsgoiTransition>
  );
}
