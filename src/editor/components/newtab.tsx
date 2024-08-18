import { Layout } from 'flexlayout-react'
import { useContext, FC } from 'react'
import { ThemeContext } from '../../theme'

interface LayoutRefProps {
  layoutRef: React.MutableRefObject<Layout | null>
  name?: string
}

const NewTabBox: FC<LayoutRefProps> = ({ layoutRef, name }) => {
  const { theme } = useContext(ThemeContext)

  const icon = `/tabicons/${name?.toLowerCase()}.svg`
  const component = name?.toLowerCase()

  const openTab = () => {
    if (layoutRef.current) {
      layoutRef.current.addTabToActiveTabSet({
        icon,
        component,
        name,
      })
    }
  }

  return (
    <div className='newtab-box' onClick={openTab}>
      <img
        style={{ width: 25, filter: theme === 'light' ? 'invert(1)' : 'none' }}
        src={icon}
        alt={name}
      />
      <p>{name}</p>
    </div>
  )
}

const NewTabComponent: FC<{ layoutRef: React.MutableRefObject<Layout | null> }> = ({ layoutRef }) => {
  const tabs = ['Code', 'Console', 'Extensions', 'Samples', 'Settings']

  return (
    <>
      <p>Choose a tab to open</p>
      <div style={{ display: 'flex', gap: 10 }}>
        {tabs.map((tab) => (
          <NewTabBox key={tab} layoutRef={layoutRef} name={tab} />
        ))}
      </div>
    </>
  )
}

export default NewTabComponent
