import { Intro, Skills, Folders } from '@/widgets/resume';
import { SsgoiTransition } from '@ssgoi/react';
import { MainWrapper } from '@/shared/ui/layout';
import { Portfolio } from '@/widgets/resume/ui/Portfolio';

export default function page() {
  return (
    <SsgoiTransition id="/resume" className="w-full">
      <MainWrapper className="mb-28 flex w-full flex-col justify-center gap-8 md:gap-20">
        <Intro />
        <Skills />  
        <Folders />
        <Portfolio />
      </MainWrapper>
    </SsgoiTransition>
  );
}
