import { Actions, Layout, TabNode } from 'flexlayout-react'
import { useContext, FC } from 'react'
import { ThemeContext } from '../../scripts/models/themeprovider'
import { ExtensionManager } from '../../scripts/models/extensionmanager'

interface TabBoxProps {
  layoutRef: React.MutableRefObject<Layout | null>
  name: string
  component?: string
  icon?: string
  tabNode: TabNode
}

interface TabComponentProps {
  layoutRef: React.MutableRefObject<Layout | null>
  tabNode: TabNode
}

const NewTabBox: FC<TabBoxProps> = ({ layoutRef, name, component, icon, tabNode }) => {
  const { theme } = useContext(ThemeContext)

  const tabIcon = icon || `/tabicons/${name?.toLowerCase()}.svg`
  const tabComponent = component || name?.toLowerCase()

  const openTab = () => {
    if (layoutRef.current) {
      layoutRef.current.addTabToActiveTabSet({
        icon: tabIcon,
        component: tabComponent,
        name,
      })
    }
    tabNode.getModel().doAction(Actions.deleteTab(tabNode.getId()))
  }

  return (
    <div
      style={{ background: 'var(--bg-1)' }}
      className='cursor-pointer items-center flex flex-col justify-center w-24 h-24 rounded'
      onClick={openTab}
    >
      <img
        style={{ width: 25, filter: theme === 'light' ? 'invert(1)' : 'none' }}
        src={tabIcon}
        alt={name}
      />
      <p className='m-2'>{name}</p>
    </div>
  )
}
const NewTabComponent: FC<TabComponentProps> = ({ layoutRef, tabNode }) => {
  const tabs = ['Code', 'Console', 'Extensions', 'Samples', 'Settings', 'Tutorial']
  return (
    <div className='mx-4'>
      <p>Choose a tab to open</p>
      <div className="flex flex-wrap gap-4">
        {tabs.map((tab) => (
          <NewTabBox
            key={tab}
            layoutRef={layoutRef}
            name={tab}
            tabNode={tabNode}
          />
        ))}

        {ExtensionManager.getInstance().getAllTabs().map((tab) => (
          <NewTabBox
            key={tab.name}
            layoutRef={layoutRef}
            name={tab.name}
            icon={tab.icon}
            component={tab.component}
            tabNode={tabNode}
          />
        ))}
      </div>
    </div>
  )
}

export default NewTabComponent
