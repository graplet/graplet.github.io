import './styles/App.css';
import { BorderNode, ITabSetRenderValues, Layout, Model, TabNode, TabSetNode } from 'flexlayout-react';
import { layoutJsonConfig } from '../../scripts/layoutconfig';
import WorkspaceComponent from './components/workspace';
import {useContext, useEffect, useRef, useState } from 'react';
import CodeOutputComponent from './components/code';
import Navbar from './components/navbar';
import './styles/layout.css';
import { Message } from 'console-feed/lib/definitions/Component';
import { Console, Unhook } from 'console-feed';
import { ThemeContext } from '../../theme';
import Hook from '../../scripts/overrides/hook';
import NewTabComponent from './components/newtab';
import SettingsComponent from './components/settings';
import ExtensionsComponent from './components/extensions';
import SamplesComponent from './components/samples';
const model = Model.fromJson(layoutJsonConfig);

function App() {
  const layoutRef = useRef<Layout | null>(null);
  const [code, setCode] = useState("");
  const [logs,setLogs ] = useState<Message[]>([]);
  const {theme} = useContext(ThemeContext);

  useEffect(() => {
    const hookedConsole = Hook(
      window.console,
      (log) => {
        if (log.method == "clear") return setLogs([]);
        setLogs((currLogs) => [...currLogs, log as Message])
      }
    );
    return () => {
      Unhook(hookedConsole);
    };
  }, []);

  const factory = (node: TabNode) => {
    var component = node.getComponent();
    switch (component) {
      case "workspace":
        return <WorkspaceComponent />
      case "code":
          return <CodeOutputComponent code={code} setCode={setCode}/>
      case "console":
          return <Console logGrouping={false} logs={logs} variant={theme == "dark" ? "dark": "light"} />;
      case "extensions":
          return <div className='tab-wrapper'><ExtensionsComponent /></div>;
      case "newtab":
          return <div className='tab-wrapper'><NewTabComponent layoutRef={layoutRef}/></div>;
      case "settings":
          return <div className='tab-wrapper'><SettingsComponent /></div>;
      case "samples":
          return <div className='tab-wrapper'><SamplesComponent /></div>;
      default:
          return <div className='tab-wrapper'><p>{node.getName()} are work in progress.</p></div>;
    }
  }
        
  const newTabButton = (node: (TabSetNode | BorderNode), renderValues: ITabSetRenderValues) => {
    if (node instanceof TabSetNode) {
        renderValues.stickyButtons.push(
            <img
                key={`${node.getId()}-new-tab`}
                src="/tabs/add.svg"
                title='New tab'
                style={{ width: "1.1em", height: "1.1em" }}
                className="flexlayout__tab_toolbar_button"
                onClick={() => addNewTab(node)}
            />
        );
    }
  }

  function addNewTab(node: TabSetNode | BorderNode){
      layoutRef!.current!.addTabToTabSet(node.getId(), {
          icon: "/outline.svg",
          component: "newtab",
          name: "New Tab"
      });
  }

  return (
    <>
      <Navbar code={code}/>
      <Layout
        realtimeResize
        ref={layoutRef}
        model={model}
        factory={factory}
        onRenderTabSet={newTabButton} /> 
    </>
  );
}

export default App;
