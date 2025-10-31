import { Resume } from '@/widgets/resume';
import { SsgoiTransition } from '@ssgoi/react';
import { MainWrapper } from '@/shared/ui/layout';

export default function page() {
  return (
    <SsgoiTransition id="/resume" className="w-full">
      <MainWrapper>
        <Resume />
      </MainWrapper>
    </SsgoiTransition>
  );
}
