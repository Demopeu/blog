import { SsgoiTransition } from '@ssgoi/react';
import { Hero } from '@/widgets/hero/ui/Hero';

export default function Page() {
  return (
    <SsgoiTransition id="/">
      <main className="mt-mt px-bgx">
        <Hero />
      </main>
    </SsgoiTransition>
  );
}
