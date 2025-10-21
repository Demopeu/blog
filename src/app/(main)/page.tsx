import { SsgoiTransition } from '@ssgoi/react';
import { IntroSection } from '@/widgets/main';

export default function Page() {
  return (
    <SsgoiTransition id="/">
      <main className="mt-40">
        <IntroSection />
      </main>
    </SsgoiTransition>
  );
}
