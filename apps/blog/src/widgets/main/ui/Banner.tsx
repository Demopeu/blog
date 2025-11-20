import Image from 'next/image';
import { banner } from '../consts/img';

export function Banner() {
  return (
    <section className="-mx-bgx h-70 flex items-center justify-center overflow-hidden md:mx-0 md:h-80">
      <Image
        src={banner.src}
        alt={banner.alt}
        width={3280}
        height={1800}
        className="h-full w-full rounded-none object-cover object-center md:rounded-2xl"
        sizes="100vw"
        unoptimized
      />
    </section>
  );
}
