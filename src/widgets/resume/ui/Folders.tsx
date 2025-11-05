import { SectionWrapper } from './section-wrapper';
import { AtticleFolder } from './AtticleFolder';
import { foldersConfig } from '../consts/folder';

export function Folders() {
  return (
    <SectionWrapper className="items-center justify-between md:flex-row">
      {foldersConfig.map((folder) => (
        <AtticleFolder
          key={folder.title}
          title={folder.title}
          items={folder.items}
        />
      ))}
    </SectionWrapper>
  );
}
