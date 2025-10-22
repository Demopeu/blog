import { SsgoiTransition } from '@ssgoi/react';
import { IntroSection } from '@/widgets/main/introsection';

export default function Page() {
  return (
    <SsgoiTransition id="/">
      <main className="mt-mt px-bgx">
        <IntroSection />
      </main>
    </SsgoiTransition>
  );
}
