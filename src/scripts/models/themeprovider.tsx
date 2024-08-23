import { useEffect, useState } from 'react'
import { createContext, ReactNode } from 'react'
import { darkThemeColors, lightThemeColors } from '../constants/colors'
import { GrapletLocalStorage } from './storage'

export type ThemeOptions = 'light' | 'dark' | 'system'

interface ThemeContextType {
  theme: ThemeOptions
  setTheme: (theme: ThemeOptions) => void
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'system',
  setTheme: () => { },
})

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const getInitialTheme = async (): Promise<ThemeOptions> => {
    try {
      const savedTheme = await GrapletLocalStorage.getTheme() as ThemeOptions
      return savedTheme || 'system'
    } catch {
      return 'system'
    }
  }

  const [theme, setTheme] = useState<ThemeOptions>('system')

  useEffect(() => {
    const initializeTheme = async () => {
      const initialTheme = await getInitialTheme()
      setTheme(initialTheme)
    }

    initializeTheme()
  }, [])

  useEffect(() => {
    const matchMediaDark = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      if (theme === 'system') {
        setTheme(matchMediaDark.matches ? 'dark' : 'light')
      }
    }
    handleChange()
    matchMediaDark.addEventListener('change', handleChange)
    return () => matchMediaDark.removeEventListener('change', handleChange)
  }, [theme])

  useEffect(() => {
    const applyTheme = async () => {
      if (theme !== 'system') {
        await GrapletLocalStorage.setTheme(theme)
      } else {
        await GrapletLocalStorage.removeTheme()
      }

      const root = document.documentElement
      const colors = theme === 'dark' ? darkThemeColors : lightThemeColors
      root.style.setProperty('--bg-1', colors.backgroundPrimary)
      root.style.setProperty('--bg-2', colors.backgroundSecondary)
      root.style.setProperty('--red', colors.primaryRGB)
      root.style.setProperty('--rgb-text', colors.textRGB)
      root.style.setProperty('--green', colors.green)
      document.documentElement.setAttribute('data-theme', theme)
    }

    applyTheme().catch(error => {
      console.error('Error applying theme:', error)
    })
  }, [theme])

  const contextValue: ThemeContextType = {
    theme,
    setTheme,
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  )
}

export { ThemeProvider, ThemeContext }
