'use client';
import React from 'react';
import { Sun, Moon, Cloud, Star } from 'lucide-react';
import { useTheme } from 'next-themes';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <button
        className="bg-toggle-color relative flex h-12 w-20 cursor-pointer items-center justify-center overflow-hidden rounded-xl"
        aria-label="테마 전환"
      />
    );
  }

  const isDark = resolvedTheme === 'dark';
  const toggleTheme = () => setTheme(isDark ? 'light' : 'dark');

  return (
    <button
      onClick={toggleTheme}
      className="bg-toggle-color relative flex h-12 w-20 cursor-pointer items-center justify-center overflow-hidden rounded-xl focus:outline-none"
      aria-label={isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}
    >
      {/* ☀️ Sun + Clouds */}
      <div
        className={`absolute flex h-7 w-7 items-center justify-center ${
          isDark ? 'animate-sun-set' : 'animate-sun-rise'
        }`}
        style={{ transformOrigin: '50% 200%' }}
      >
        <Sun
          className="h-10 w-10"
          style={{ color: '#FFA500', fill: '#FFA500' }}
        />
        {/* 파란 구름 2개 */}
        <Cloud
          className="animate-cloud-left pointer-events-none absolute top-3 -left-8 h-12 w-12 text-white"
          style={{ color: '#FFFFFF', fill: '#FFFFFF' }}
        />
        <Cloud
          className="animate-cloud-right pointer-events-none absolute top-1 left-6 h-8 w-8 text-white"
          style={{ color: '#FFFFFF', fill: '#FFFFFF' }}
        />
      </div>

      {/* 🌙 Moon + Stars */}
      <div
        className={`absolute flex h-7 w-7 items-center justify-center ${
          isDark ? 'animate-moon-rise' : 'animate-moon-set'
        }`}
        style={{ transformOrigin: '50% 200%' }}
      >
        <Moon
          className="h-10 w-10"
          style={{ color: '#FFD700', fill: '#FFD700' }}
        />
        <Star
          className="animate-star-left pointer-events-none absolute -top-3 -left-3 h-4 w-4"
          style={{ color: '#FFFFFF', fill: '#FFFFFF' }}
        />
        <Star
          className="animate-star-left pointer-events-none absolute top-6 -left-6 h-3 w-3"
          style={{ color: '#FFFFFF', fill: '#FFFFFF' }}
        />
        <Star
          className="animate-star-left pointer-events-none absolute top-4 left-8 h-3 w-3"
          style={{ color: '#FFFFFF', fill: '#FFFFFF' }}
        />
        <Star
          className="animate-star-left pointer-events-none absolute top-1 left-12 h-2 w-2"
          style={{ color: '#FFFFFF', fill: '#FFFFFF' }}
        />
      </div>
    </button>
  );
}

export default ThemeToggle;
