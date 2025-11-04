import { cn } from '@/shared/lib/utils';

export function ArticleHeader({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        'border-highlight flex flex-col border-l-5 pl-2 text-2xl font-black md:pl-4 md:text-3xl',
        className
      )}
    >
      {title}
    </h2>
  );
}
