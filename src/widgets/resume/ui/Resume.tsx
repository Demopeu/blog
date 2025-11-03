import { imageConfig } from '../model/image-config';
import { Intro } from './Intro';
import { Skills } from './Skills';

export function Resume() {
  return (
    <div className="flex w-full flex-col justify-center gap-6 md:gap-10">
      <Intro imageConfig={imageConfig} />
      <Skills />
    </div>
  );
}
