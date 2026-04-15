import { Folder } from '@repo/ui/react-bits';
import type { FolderItem } from '../consts/folder';
import { MappedItems } from '../lib/mapped-items';
import { ArticleHeader } from './ArticleHeader';

export function AtticleFolder({ title, items }: { title: string; items: FolderItem[] }) {
  const mappedItems = MappedItems({ items });

  return (
    <article className="flex w-full flex-col justify-center gap-6 md:gap-10">
      <ArticleHeader title={title} />
      <Folder className="sm:w-1/2 md:mt-12 md:w-2/3 md:hover:mb-4" items={mappedItems} />
    </article>
  );
}
