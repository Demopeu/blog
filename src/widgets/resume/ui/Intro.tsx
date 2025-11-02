import { ProfileImage } from './ProfileImage';

export function Intro({ imageConfig }: { imageConfig: { src: string } }) {
  return (
    <section className="flex flex-col items-center justify-center gap-4">
      <ProfileImage imageConfig={imageConfig} />
      <div className="space-y-1 text-center">
        <h1 className="text-3xl font-bold tracking-widest">김동현</h1>
        <p className="text-highlight-active/80 text-xl font-semibold tracking-tight">
          Frontend Developer
        </p>
      </div>
    </section>
  );
}
