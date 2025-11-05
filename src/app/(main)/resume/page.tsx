import { Intro, Skills, Folders } from '@/widgets/resume';
import { SsgoiTransition } from '@ssgoi/react';
import { MainWrapper } from '@/shared/ui/layout';

export default function page() {
  return (
    <SsgoiTransition id="/resume" className="w-full">
      <MainWrapper className="mb-28 flex w-full flex-col justify-center gap-8 md:gap-20">
        <Intro />
        <Skills />
        <Folders />
      </MainWrapper>
    </SsgoiTransition>
  );
}
