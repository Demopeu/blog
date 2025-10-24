import Image from 'next/image';

export function HoverImage() {
  return (
    <div className="group hover:animate-bouncy relative hidden select-none 2xl:block 2xl:size-[min(38vw,640px)] 2xl:scale-105">
      <Image
        src="/dummy.png"
        alt="dummy character"
        width={600}
        height={600}
        className="absolute inset-0 z-0 object-contain group-hover:invisible"
      />
      <Image
        src="/dummy2.png"
        alt="dummy character hover"
        width={600}
        height={600}
        priority
        className="pointer-events-none absolute inset-0 z-10 object-contain opacity-0 [filter:blur(0px)] [transition:opacity_.35s_ease,filter_.35s_ease] group-hover:opacity-100 group-hover:[filter:blur(0px)] group-hover:duration-200 group-hover:ease-out group-hover:will-change-[opacity,filter]"
      />
    </div>
  );
}
