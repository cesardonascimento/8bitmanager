'use client';

import { MoonIcon, SunIcon } from 'lucide-react';
import { useMemo } from 'react';
import { Switch } from '@/components/ui/switch';
import { useTheme } from '@/providers/theme-provider';

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme();

  const isChecked = useMemo(() => theme === 'dark', [theme]);

  return (
    <div className="flex gap-2 items-center">
      <SunIcon />
      <Switch
        checked={isChecked}
        onCheckedChange={value => {
          setTheme(value ? 'dark' : 'light');
        }}
      />
      <MoonIcon />
    </div>
  );
}
