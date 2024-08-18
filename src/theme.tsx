import { useEffect, useState } from 'react';
import { createContext, ReactNode } from 'react';
import { darkThemeColors, lightThemeColors } from './themecolors'; // Adjust the import path

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'system',
  setTheme: () => {},
});

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const getInitialTheme = (): Theme => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    return savedTheme || 'system';
  };

  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    const matchMediaDark = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') {
        setTheme(matchMediaDark.matches ? 'dark' : 'light');
      }
    };
    handleChange();
    matchMediaDark.addEventListener('change', handleChange);
    return () => matchMediaDark.removeEventListener('change', handleChange);
  }, [theme]);

  useEffect(() => {
    if (theme !== 'system') {
      localStorage.setItem('theme', theme);
    } else {
      localStorage.removeItem('theme');
    }

    const root = document.documentElement;
    const colors = theme === 'dark' ? darkThemeColors : lightThemeColors;
    root.style.setProperty('--background-primary', colors.backgroundPrimary);
    root.style.setProperty('--background-secondary', colors.backgroundSecondary);
    root.style.setProperty('--primary-rgb', colors.primaryRGB);
    root.style.setProperty('--text-rgb', colors.textRGB);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const contextValue: ThemeContextType = {
    theme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeContext };
