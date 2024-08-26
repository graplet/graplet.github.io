import { Layout, TabNode } from 'flexlayout-react'
import { FC } from 'react'
import { ExtensionManager } from '../../scripts/models/extensionmanager'
import { NewTabBox } from '../../scripts/models/tabbox'

interface TabComponentProps {
  layoutRef: React.MutableRefObject<Layout | null>
  tabNode: TabNode
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
