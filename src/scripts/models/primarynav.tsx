import { FC, useContext } from "react"
import { ThemeContext } from "./themeprovider"
const base = import.meta.env.BASE_URL


export interface PrimaryNavProps {
  children?: React.ReactNode
}

export const PrimaryNav: FC<PrimaryNavProps> = ({ children }) => {
  const { theme } = useContext(ThemeContext)

  return (
    <nav className='h-11 flex items-center px-3 gap-3'>
      <a style={{ color: 'rgb(var(--rgb-text))' }} href={base} className='inline-flex cursor-pointer gap-3 no-underline'>
        <img
          src={`${base}/fill.svg`}
          alt='Graplet Logo'
          className={`self-center ${theme === 'light' ? 'invert' : ''}`}
        />
        <h3 className='m-0'>Graplet</h3>
      </a>
      {children}
    </nav>
  )
}