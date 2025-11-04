import { ArticleHeader } from './ArticleHeader';
import { Folder } from '@/shared/motion';
import type { FolderItem } from '@/widgets/resume/model/folder-config';

export function AtticleFolder({
  title,
  items,
}: {
  title: string;
  items: FolderItem[];
}) {
  const mappedItems = items.map(({ label, Icon }) => (
    <div
      key={label}
      className="flex h-full w-full flex-col items-center justify-start text-center"
    >
      <span className="leading-tight">{label}</span>
      {Icon ? (
        <span className="mt-2 inline h-0 w-full flex-1 md:hidden 2xl:inline">
          <Icon className="mx-auto h-full w-auto max-w-10" />
        </span>
      ) : null}
    </div>
  ));

  return (
    <article className="flex w-full flex-col justify-center gap-6 md:gap-10">
      <ArticleHeader title={title} />
      <Folder
        className="sm:w-1/2 md:mt-12 md:w-2/3 md:hover:mb-4"
        items={mappedItems}
      />
    </article>
  );
}
