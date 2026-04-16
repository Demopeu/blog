import { Cloud, Moon, Star, Sun } from 'lucide-react';
import { cn } from '../lib/utils';

type ThemeToggleButtonProps = {
  onClick: () => void;
  className?: string;
};

export function ThemeToggleButton({ onClick, className }: ThemeToggleButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'bg-toggle-color relative flex h-12 w-20 flex-none shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-xl focus:outline-none',
        className,
      )}
      aria-label="테마 전환"
    >
      <div
        className={cn(
          'absolute flex h-7 w-7 items-center justify-center transition-all duration-500 ease-in-out',
          'dark:translate-y-[150%] dark:opacity-0',
          'translate-y-0 opacity-100',
        )}
        style={{ transformOrigin: '50% 200%' }}
      >
        <Sun className="h-10 w-10" style={{ color: '#FFA500', fill: '#FFA500' }} />
        <Cloud
          className="pointer-events-none absolute -left-8 top-3 h-12 w-12 text-white"
          style={{ color: '#FFFFFF', fill: '#FFFFFF' }}
        />
        <Cloud
          className="pointer-events-none absolute left-7 top-1 h-8 w-8 text-white"
          style={{ color: '#FFFFFF', fill: '#FFFFFF' }}
        />
      </div>

      <div
        className={cn(
          'absolute flex h-7 w-7 items-center justify-center transition-all duration-500 ease-in-out',
          'dark:translate-y-0 dark:opacity-100',
          'translate-y-[150%] opacity-0',
        )}
        style={{ transformOrigin: '50% 200%' }}
      >
        <Moon className="h-10 w-10" style={{ color: '#FFD700', fill: '#FFD700' }} />
        <Star
          className="pointer-events-none absolute -left-3 -top-3 h-4 w-4"
          style={{ color: '#FFFFFF', fill: '#FFFFFF' }}
        />
        <Star
          className="pointer-events-none absolute -left-6 top-6 h-3 w-3"
          style={{ color: '#FFFFFF', fill: '#FFFFFF' }}
        />
        <Star
          className="pointer-events-none absolute left-8 top-4 h-3 w-3"
          style={{ color: '#FFFFFF', fill: '#FFFFFF' }}
        />
        <Star
          className="pointer-events-none absolute left-12 top-1 h-2 w-2"
          style={{ color: '#FFFFFF', fill: '#FFFFFF' }}
        />
      </div>
    </button>
  );
}
