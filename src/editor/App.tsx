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
import { useContext, useEffect, useState } from 'react'
import { Message } from 'console-feed/lib/definitions/Component'
import Hook from '../scripts/models/hook'
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
import { ExtensionManager } from '../scripts/models/extensionmanager'
import { TutorialComponent } from './components/tutorial'
import WorkspaceManager from '../scripts/models/workspacemanager'
import { javascriptGenerator } from 'blockly/javascript'
import { getLayoutJsonConfig } from '../scripts/constants/layoutconfig'
import LayoutManager from '../scripts/models/layoutmanager'

const getTutorialParam = (): boolean => {
  const urlParams = new URLSearchParams(window.location.search)
  return urlParams.has('tutorial')
}

const tutorial = getTutorialParam()
const model = Model.fromJson(getLayoutJsonConfig(tutorial))

function App() {
  const [code, setCode] = useState("")
  const [logs, setLogs] = useState<Message[]>([])
  const [isWorkspaceReady, setWorkspaceReady] = useState<boolean>(false)
  const { theme } = useContext(ThemeContext)

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

  useEffect(() => {
    if (!isWorkspaceReady) return
    const getMainWorkspace = () => {
      const mainWorkspace = WorkspaceManager.getInstance().getMainWorkspace()
      if (!mainWorkspace) throw new Error('Main Workspace not initialized')
      return mainWorkspace
    }

    const getWorkspaceSVG = () => {
      const workspaceSVG = getMainWorkspace().getComponent()
      if (!workspaceSVG) throw new Error('Workspace component not found')
      return workspaceSVG
    }

    const updateCode = () => {
      const generatedCode = javascriptGenerator.workspaceToCode(getWorkspaceSVG())
      setCode(generatedCode)
    }

    updateCode()
    getWorkspaceSVG().addChangeListener(updateCode)

    return () => {
      getWorkspaceSVG().removeChangeListener(updateCode)
    }
  }, [isWorkspaceReady, setCode])


  const factory = (node: TabNode) => {
    const component: string = node.getComponent()!
    const componentsMap: Record<string, JSX.Element> = {
      "workspace": <WorkspaceComponent onWorkspaceReady={() => setWorkspaceReady(true)} />,
      "code": <CodeOutputComponent code={code} setCode={setCode} />,
      "console": <Console logGrouping={false} logs={logs} variant={theme === "dark" ? "dark" : "light"} />,
      "extensions": <ExtensionsComponent />,
      "newtab": <NewTabComponent tabNode={node} />,
      "settings": <SettingsComponent />,
      "samples": <SamplesComponent />,
      "tutorial": <TutorialComponent />,
    }
    Actions.setActiveTabset(node.getParent()!.getId())
    const ExtensionComponent = ExtensionManager.getInstance().getComponent(component)
    return componentsMap[component] || <ExtensionComponent />
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

  function addNewTab(node: TabSetNode | BorderNode) {
    LayoutManager.getLayoutRef().current!.addTabToTabSet(node.getId(), {
      icon: "/tabicons/star.svg",
      component: "newtab",
      name: "New Tab"
    })
  }

  return (
    <>
      <Navbar code={code} />
      <Layout
        realtimeResize
        ref={LayoutManager.getLayoutRef()}
        model={model}
        factory={factory}
        onRenderTabSet={newTabButton} />
    </>
  )
}

export default App
