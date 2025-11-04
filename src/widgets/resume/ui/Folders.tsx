import { SectionWrapper } from '@/widgets/resume/ui/section-wrapper';
import { AtticleFolder } from '@/widgets/resume/ui/AtticleFolder';
import { FoldersProps } from '@/widgets/resume/model/folder-config';

export function Folders({ folderConfig }: { folderConfig: FoldersProps[] }) {
  return (
    <SectionWrapper className="items-center justify-between md:flex-row">
      {folderConfig.map((folder) => (
        <AtticleFolder
          key={folder.title}
          title={folder.title}
          items={folder.items}
        />
      ))}
    </SectionWrapper>
  );
}
