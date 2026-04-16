import { cn } from '../lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <h1
      className={cn(
        'group font-poppins inline-block font-bold tracking-tight select-none',
        'text-xl sm:text-2xl md:text-3xl lg:text-4xl',
        className,
      )}
    >
      <span className="text-foreground">{`<D`}</span>
      <span
        className={cn(
          'inline-block max-w-0 overflow-hidden align-bottom transition-[max-width] duration-500 ease-out',
          'xs:group-hover:max-w-[4.5em]',
        )}
      >
        emopeu
      </span>
      <span className="text-foreground">{`/>`}</span>
    </h1>
  );
}
