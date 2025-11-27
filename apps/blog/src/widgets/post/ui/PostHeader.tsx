import Image from 'next/image';

interface PostHeaderProps {
  src: string;
  title: string;
}

export function PostHeader({ src, title }: PostHeaderProps) {
  return (
    <>
      <div className="relative aspect-[5/2] w-full overflow-hidden rounded-2xl">
        <Image src={src} alt={title} fill className="object-cover" priority />
      </div>
      <h1 className="text-5xl font-bold">{title}</h1>
    </>
  );
}
