import { useEffect, useState } from 'react';
import { createContext, ReactNode } from 'react';

interface ThemeContextType {
  theme: string;
  setTheme: (theme: string) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'system',
  setTheme: () => {},
});
const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const darkThemeColors = {
    backgroundPrimary: '#141414',
    backgroundSecondary: '#1E1E1E',
    primaryRGB: '203, 41, 100',
    textRGB: '240, 240, 240',
  };

  const lightThemeColors = {
    backgroundPrimary: 'white',
    backgroundSecondary: '#E5E5E5',
    primaryRGB: '159, 19, 57',
    textRGB: '20, 20, 20',
  };

  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    } else {
      return 'system';
    }
  };

  const [theme, setTheme] = useState<string>(getInitialTheme);

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
