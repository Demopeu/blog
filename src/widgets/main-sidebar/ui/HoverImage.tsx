import Image from 'next/image';
import s from './hover-image.module.css';

export function HoverImage({src, srcHover}: {src: string, srcHover: string}) {
  return (
    <div
      className={`group relative select-none ${s.bouncyHover} shrink-0 size-20`}
    >
      <Image
        src={src}
        alt="dummy character"
        width={72}
        height={72}
        className="absolute inset-0 z-0 object-contain group-hover:invisible group-active:invisible"
      />
      <Image
        src={srcHover}
        alt="dummy character hover"
        width={72}
        height={72}
        priority
        className="pointer-events-none absolute inset-0 z-10 object-contain opacity-0 [filter:blur(0px)] [transition:opacity_.35s_ease,filter_.35s_ease] group-hover:opacity-100 group-hover:[filter:blur(0px)] group-hover:duration-200 group-hover:ease-out group-hover:will-change-[opacity,filter] group-active:opacity-100 group-active:[filter:blur(0px)] group-active:duration-200 group-active:ease-out"
      />
    </div>
  );
}