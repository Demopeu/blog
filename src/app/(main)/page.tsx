import { SsgoiTransition } from '@ssgoi/react';
import { IntroSection } from '@/widgets';

export default function Page() {
  return (
    <SsgoiTransition id="/">
      <main className="mt-40 px-16">
        <IntroSection />
      </main>
    </SsgoiTransition>
  );
}
