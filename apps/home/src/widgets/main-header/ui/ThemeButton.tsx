'use client';

import { useTheme } from 'next-themes';
import { ThemeToggleButton } from '@repo/ui/tailwind';

export function ThemeButton({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');
  return <ThemeToggleButton onClick={toggleTheme} className={className} />;
}
