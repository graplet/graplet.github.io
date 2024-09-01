import { FC, useContext } from "react"
import { ThemeContext } from "./themeprovider"


export interface PrimaryNavProps {
  children?: React.ReactNode
}

export const PrimaryNav: FC<PrimaryNavProps> = ({ children }) => {
  const { theme } = useContext(ThemeContext)

  return (
    <nav className='h-11 flex items-center px-3 gap-3'>
      <a style={{ color: 'rgb(var(--rgb-text))' }} href='/' className='inline-flex cursor-pointer gap-3 no-underline'>
        <img
          src='/fill.svg'
          alt='Graplet Logo'
          className={`self-center ${theme === 'light' ? 'invert' : ''}`}
        />
        <h3 className='m-0'>Graplet</h3>
      </a>
      {children}
    </nav>
  )
}