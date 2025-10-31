import { Intro } from './Intro';
import { imageConfig } from '../model/lmage-config';

export function Resume() {
  return (
    <div className="flex w-full flex-col justify-center">
      <Intro imageConfig={imageConfig} />
    </div>
  );
}
