import Image from 'next/image';
import s from './hover-image.module.css';

export function HoverImage({
  src,
  srcHover,
}: {
  src: string;
  srcHover: string;
}) {
  return (
    <div
      className={`2xl:scale-130 group relative hidden select-none xl:block xl:size-80 2xl:size-96 ${s.bouncyHover}`}
    >
      <Image
        src={src}
        alt="dummy character"
        width={600}
        height={600}
        className="absolute inset-0 z-0 object-contain group-hover:invisible"
      />
      <Image
        src={srcHover}
        alt="dummy character hover"
        width={600}
        height={600}
        priority
        className="filter:blur(0px) group-hover:filter:blur(0px) pointer-events-none absolute inset-0 z-10 object-contain opacity-0 [transition:opacity_.35s_ease,filter_.35s_ease] group-hover:opacity-100 group-hover:duration-200 group-hover:ease-out group-hover:will-change-[opacity,filter]"
      />
    </div>
  );
}
