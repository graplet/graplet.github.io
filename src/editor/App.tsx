import {
  Actions,
  BorderNode,
  ITabSetRenderValues,
  Layout,
  Model,
  TabNode,
  TabSetNode
} from 'flexlayout-react'
import { Console, Unhook } from 'console-feed'
import { useContext, useEffect, useRef, useState } from 'react'
import { Message } from 'console-feed/lib/definitions/Component'
import Hook from '../scripts/overrides/hook'
import { layoutJsonConfig } from '../scripts/constants/layoutconfig'
import { ThemeContext } from '../scripts/models/themeprovider'

import CodeOutputComponent from './components/code'
import ExtensionsComponent from './components/extensions'
import Navbar from './components/navbar'
import NewTabComponent from './components/newtab'
import SamplesComponent from './components/samples'
import SettingsComponent from './components/settings'
import WorkspaceComponent from './components/workspace'

import './styles/layout.css'
import './styles/blockly.css'


const model = Model.fromJson(layoutJsonConfig)

function App() {
  const layoutRef = useRef<Layout | null>(null)
  const [code, setCode] = useState("")
  const [logs,setLogs ] = useState<Message[]>([])
  const {theme} = useContext(ThemeContext)

  useEffect(() => {
    const hookedConsole = Hook(
      window.console,
      (log) => {
        if (log.method == "clear") return setLogs([])
        setLogs((currLogs) => [...currLogs, log as Message])
      }
    )
    return () => {
      Unhook(hookedConsole)
    }
  }, [])

  const factory = (node: TabNode) => {
    const component: string = node.getComponent()!
    const componentsMap: Record<string, JSX.Element> = {
      "workspace": <WorkspaceComponent />,
      "code": <CodeOutputComponent code={code} setCode={setCode} />,
      "console": <Console logGrouping={false} logs={logs} variant={theme === "dark" ? "dark" : "light"} />,
      "extensions": <div className='px-4'><ExtensionsComponent /></div>,
      "newtab": <div className='px-4'><NewTabComponent layoutRef={layoutRef} tabNode={node} /></div>,
      "settings": <div className='px-4'><SettingsComponent /></div>,
      "samples": <div className='px-4'><SamplesComponent /></div>,
    }
    Actions.setActiveTabset(node.getParent()!.getId())
    return componentsMap[component] || <div className='px-4'><p>{node.getName()} are work in progress.</p></div>
  }
  
        
  const newTabButton = (node: (TabSetNode | BorderNode), renderValues: ITabSetRenderValues) => {
    if (node instanceof TabSetNode) {
        renderValues.stickyButtons.push(
            <img
                key={`${node.getId()}-new-tab`}
                src="/tabicons/plus.svg"
                title='New tab'
                style={{ width: "1.1em", height: "1.1em" }}
                className="flexlayout__tab_toolbar_button"
                onClick={() => addNewTab(node)}
            />
        )
    }
  }

  function addNewTab(node: TabSetNode | BorderNode){
      layoutRef!.current!.addTabToTabSet(node.getId(), {
          icon: "/tabicons/star.svg",
          component: "newtab",
          name: "New Tab"
      })
  }

  return (
    <>
      <Navbar code={code} layoutRef={layoutRef}/>
      <Layout
        realtimeResize
        ref={layoutRef}
        model={model}
        factory={factory}
        onRenderTabSet={newTabButton} /> 
    </>
  )
}

export default App
