import { ReactNode } from '@tanstack/react-router';
import { createContext, useMemo, useState } from 'react';

type Theme = 'light' | 'dark';
type ThemeContext = {
  theme: Theme;
  toggleTheme: () => void;
};
export const ThemeContext = createContext<ThemeContext>({} as ThemeContext);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('light');

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  const value = useMemo(() => {
    return {
      theme,
      toggleTheme,
    };
  }, [theme]);

  const color = '#FAFCFE';
  const backgroundColor = theme === 'light' ? '#4B4DED' : '#0E0E2C';
  document.body.style.color = color;
  document.body.style.backgroundColor = backgroundColor;
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
