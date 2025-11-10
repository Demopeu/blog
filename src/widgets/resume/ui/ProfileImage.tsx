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
        sizes="(max-width: 768px) 160px, 240px"
        priority
        fetchPriority="high"
      />
    </div>
  );
}
