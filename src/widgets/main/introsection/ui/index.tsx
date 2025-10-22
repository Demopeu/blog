import IntroArticle from './IntroArticle';
import Image from 'next/image';
import { UseStackLogoLoop } from './UseStackLogoLoop';

export function IntroSection() {
  return (
    <section className="mx-40 mt-60 flex justify-between">
      <div className="space-y-20">
        <IntroArticle />
        <UseStackLogoLoop />
      </div>
      <Image src="/dummy.png" alt="dummy" width={500} height={500} />
    </section>
  );
}
