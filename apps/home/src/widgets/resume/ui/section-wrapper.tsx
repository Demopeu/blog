import { cn } from '@repo/ui/lib/utils';

export function SectionWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        'flex w-full flex-col justify-center gap-6 md:gap-10',
        className
      )}
    >
      {children}
    </section>
  );
}
