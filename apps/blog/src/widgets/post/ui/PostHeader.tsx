import Image from 'next/image';

interface PostHeaderProps {
  src: string;
  title: string;
}

export function PostHeader({ src, title }: PostHeaderProps) {
  return (
    <>
      {/* 배너 이미지 */}
      <div className="relative aspect-[5/2] w-full overflow-hidden rounded-2xl">
        <Image src={src} alt={title} fill className="object-cover" priority />
      </div>

      {/* 타이틀 */}
      <h1 className="text-5xl font-bold">{title}</h1>
    </>
  );
}
