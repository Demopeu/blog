import { cn } from '@/shared/lib/utils';

export function MainWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <main className={cn('mt-mt px-bgx', className)}>{children}</main>;
}
