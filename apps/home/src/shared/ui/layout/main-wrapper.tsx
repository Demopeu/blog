import { cn } from '@repo/ui/lib/utils';

export function MainWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <main className={cn('px-bgx mt-bmt', className)}>{children}</main>;
}
