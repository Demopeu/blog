import { SsgoiTransition } from '@ssgoi/react';
import { Hero } from '@/widgets/hero/ui/Hero';
import { MainWrapper } from '@/shared/ui/layout';

export default function Page() {
  return (
    <SsgoiTransition id="/">
      <MainWrapper>
        <Hero />
      </MainWrapper>
    </SsgoiTransition>
  );
}
