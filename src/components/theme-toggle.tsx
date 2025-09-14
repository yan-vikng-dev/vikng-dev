'use client';

import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from 'next-themes';
import * as React from 'react';
import { useThemeRipple } from '@/components/theme-ripple-provider';

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const { animateThemeChange } = useThemeRipple();

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const next = theme === 'dark' ? 'light' : 'dark';
    const origin = { x: e.clientX, y: e.clientY };
    animateThemeChange({ nextTheme: next as 'light' | 'dark', origin, applyTheme: () => setTheme(next) });
  };

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={onClick}
      className={
        "relative inline-flex h-9 w-9 items-center justify-center rounded-md border bg-background text-foreground hover:bg-muted " +
        (className ?? '')
      }
    >
      {theme === 'system' ? (
        <Monitor className="h-[1.2rem] w-[1.2rem]" />
      ) : (
        <>
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </>
      )}
    </button>
  );
}
