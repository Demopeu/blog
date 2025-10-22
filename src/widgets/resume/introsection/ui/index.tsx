import Image from 'next/image';
import ProfileArticle from './ProfileArticle';

export default function IntroSection() {
  return (
    <section className="relative w-full">
      <Image
        src="/my_profile.jpg"
        alt="Intro"
        width={500}
        height={1000}
        className="relative z-0 mx-auto min-w-[500px] rounded-b-full"
      />
      <ProfileArticle />
    </section>
  );
}
