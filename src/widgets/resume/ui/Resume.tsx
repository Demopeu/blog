import { imageConfig } from '@/widgets/resume/model/image-config';
import { SkillsGroups } from '@/widgets/resume/model/skills-config';
import { foldersConfig } from '@/widgets/resume/model/folder-config';
import { Intro } from './Intro';
import { Skills } from './Skills';
import { Folders } from './Folders';

export function Resume() {
  return (
    <div className="mb-28 flex w-full flex-col justify-center gap-8 md:gap-20">
      <Intro imageConfig={imageConfig} />
      <Skills skillsGroups={SkillsGroups} />
      <Folders folderConfig={foldersConfig} />
    </div>
  );
}
