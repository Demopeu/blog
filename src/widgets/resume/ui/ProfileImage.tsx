import Image from 'next/image';

export function ProfileImage({
  imageConfig,
}: {
  imageConfig: { src: string };
}) {
  return (
    <section className="mx-gx flex items-center justify-center">
      <Image
        src={imageConfig.src}
        alt="Profile Image"
        width={300}
        height={300}
      />
    </section>
  );
}
