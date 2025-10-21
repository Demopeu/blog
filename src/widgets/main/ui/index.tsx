import IntroArticle from './IntroArticle';
import Image from 'next/image';

export function IntroSection() {
  return (
    <section className="mx-16 mt-60 flex justify-between">
      <IntroArticle />
      <Image
        src="/dummy.png"
        alt="dummy"
        width={500}
        height={500}
        className="mx-auto"
      />
    </section>
  );
}
