'use client';

import Button from "@/features/theme-toggle/ui/Button";
import { useThemeToggle } from "@/features/theme-toggle/model/use-theme-toggle";

export function ThemeToggle() {
    const { mounted, isDark, toggleTheme } = useThemeToggle();
    return <Button mounted={mounted} isDark={isDark} toggleTheme={toggleTheme} />;
}