import Image from 'next/image';

export function ProfileImage({
  imageConfig,
}: {
  imageConfig: { src: string };
}) {
  return (
    <div className="relative aspect-square w-40 overflow-hidden rounded-full">
      <Image
        src={imageConfig.src}
        alt="Profile Image"
        fill
        className="object-cover"
        sizes="100vw"
      />
    </div>
  );
}
