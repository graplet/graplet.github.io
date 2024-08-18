import { Actions, Layout, TabNode } from 'flexlayout-react'
import { useContext, FC } from 'react'
import { ThemeContext } from '../../theme'

interface TabBoxProps {
  layoutRef: React.MutableRefObject<Layout | null>
  name?: string
  tabNode: TabNode
}

interface TabComponentProps {
  layoutRef: React.MutableRefObject<Layout | null>
  tabNode: TabNode
}

const NewTabBox: FC<TabBoxProps> = ({ layoutRef, name, tabNode }) => {
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
    tabNode.getModel().doAction(Actions.deleteTab(tabNode.getId()))
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


const NewTabComponent: FC<TabComponentProps> = ({ layoutRef, tabNode }) => {
  const tabs = ['Code', 'Console', 'Extensions', 'Samples', 'Settings']

  return (
    <>
      <p>Choose a tab to open</p>
      <div style={{ display: 'flex', gap: 10 }}>
        {tabs.map((tab) => (
          <NewTabBox key={tab} layoutRef={layoutRef} name={tab} tabNode={tabNode}/>
        ))}
      </div>
    </>
  )
}

export default NewTabComponent
