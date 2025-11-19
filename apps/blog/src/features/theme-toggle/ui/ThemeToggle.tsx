'use client';

import Button from '@/features/theme-toggle/ui/Button';
import { useThemeToggle } from '@/features/theme-toggle/model/use-theme-toggle';

export function ThemeToggle({ className }: { className?: string }) {
  const { mounted, isDark, toggleTheme } = useThemeToggle();
  return (
    <Button
      mounted={mounted}
      isDark={isDark}
      toggleTheme={toggleTheme}
      className={className}
    />
  );
}
