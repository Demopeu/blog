'use client';

type ButtonProps = {
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
};

export function Button({ isOpen, onToggle, className }: ButtonProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      data-state={isOpen ? 'open' : 'closed'}
      aria-label={isOpen ? '사이드바 닫기' : '사이드바 열기'}
      className={[
        'group relative flex h-10 w-10 items-center justify-center',
        'focus-visible:ring-ring/60 focus-visible:ring-2',
        className ?? '',
      ].join(' ')}
    >
      <span className="sr-only">Toggle sidebar</span>

      <span
        className={[
          'absolute block h-[3px] w-6 rounded',
          'bg-foreground',
          'transition-transform motion-safe:duration-300',
          'translate-y-[-7px]',
          'group-data-[state=open]:translate-y-0 group-data-[state=open]:rotate-45',
        ].join(' ')}
      />

      <span
        className={[
          'absolute block h-[3px] w-6 rounded',
          'bg-foreground',
          'transition-all motion-safe:duration-300',
          'group-data-[state=open]:scale-x-50 group-data-[state=open]:opacity-0',
        ].join(' ')}
      />
      <span
        className={[
          'absolute block h-[3px] w-6 rounded',
          'bg-foreground',
          'transition-transform motion-safe:duration-300',
          'translate-y-[7px]',
          'group-data-[state=open]:translate-y-0 group-data-[state=open]:-rotate-45',
        ].join(' ')}
      />
    </button>
  );
}
