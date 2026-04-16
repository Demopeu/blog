import { cn } from '../lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <h1
      className={cn(
        'group font-poppins inline-block font-bold tracking-tight select-none',
        className,
      )}
    >
      <span className="text-foreground">{`<D`}</span>
      <span className="inline-block w-0 overflow-hidden align-bottom transition-[width] duration-500 ease-out group-hover:w-38">
        emopeu
      </span>
      <span className="text-foreground">{`/>`}</span>
    </h1>
  );
}
