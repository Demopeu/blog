import { ProfileImage } from './ProfileImage';
import { imageConfig } from '../model/lmage-config';

export function Resume() {
  return (
    <div className="mt-40 flex w-full flex-col justify-center">
      <ProfileImage imageConfig={imageConfig} />
    </div>
  );
}
