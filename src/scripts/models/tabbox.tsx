import { Actions, Layout, TabNode } from "flexlayout-react"
import { FC, useContext } from "react"
import { ThemeContext } from "./themeprovider"

const base = import.meta.env.BASE_URL

interface TabBoxProps {
  layoutRef: React.MutableRefObject<Layout | null>
  name: string
  component?: string
  icon?: string
  tabNode: TabNode
}


export const NewTabBox: FC<TabBoxProps> = ({ layoutRef, name, component, icon, tabNode }) => {
  const { theme } = useContext(ThemeContext)

  const tabIcon = icon || `${base}/tabicons/${name?.toLowerCase()}.svg`
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