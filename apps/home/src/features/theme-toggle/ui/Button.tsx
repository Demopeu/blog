import { Sun, Moon, Cloud, Star } from 'lucide-react';
import s from '@/features/theme-toggle/ui/button.module.css';
import { cn } from '@repo/ui/lib/utils';

type ButtonProps = {
  mounted: boolean;
  isDark: boolean;
  toggleTheme: () => void;
  className?: string;
};

export default function Button({
  mounted,
  isDark,
  toggleTheme,
  className,
}: ButtonProps) {
  if (!mounted) {
    return (
      <button
        className="bg-toggle-color relative flex h-12 w-20 flex-none shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-xl"
        aria-label="테마 전환"
      />
    );
  }
  return (
    <button
      onClick={toggleTheme}
      className={cn(
        'bg-toggle-color relative flex h-12 w-20 flex-none shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-xl focus:outline-none',
        className
      )}
      aria-label={isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}
    >
      <div
        className={`absolute flex h-7 w-7 items-center justify-center ${
          isDark ? s.sunSet : s.sunRise
        }`}
        style={{ transformOrigin: '50% 200%' }}
      >
        <Sun
          className="h-10 w-10"
          style={{ color: '#FFA500', fill: '#FFA500' }}
        />
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
        className={`absolute flex h-7 w-7 items-center justify-center ${
          isDark ? s.moonRise : s.moonSet
        }`}
        style={{ transformOrigin: '50% 200%' }}
      >
        <Moon
          className="h-10 w-10"
          style={{ color: '#FFD700', fill: '#FFD700' }}
        />
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
