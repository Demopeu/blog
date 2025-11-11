import Image from 'next/image';

export function ProfileImage({
  imageConfig,
}: {
  imageConfig: { src: string };
}) {
  return (
    <div className="relative aspect-square w-40 overflow-hidden rounded-full md:w-60">
      <Image
        src={imageConfig.src}
        alt="Profile Image"
        fill
        className="object-cover"
        sizes="(min-width: 768px) 240px, 160px"
        priority
        fetchPriority="high"
        quality={50}
      />
    </div>
  );
}
