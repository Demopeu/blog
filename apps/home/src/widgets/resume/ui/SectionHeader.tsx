import { cn } from '@repo/ui/lib/utils';

export function SectionHeader({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        'border-highlight border-l-5 flex flex-col pl-2 text-2xl font-black md:pl-4 md:text-3xl',
        className
      )}
    >
      {title}
    </h2>
  );
}
