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
import Hook from '../../scripts/monkey patches/hook';
import NewTabComponent from './components/newtab';
import SettingsComponent from './components/settings';
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
          return <em>Extensions: work in progress</em>;
      case "newtab":
          return <NewTabComponent layoutRef={layoutRef}/>;
      case "settings":
          return <SettingsComponent />;
      default:
          return <p>{node.getName()}</p>;
    }
  }
        
  const newTabButton = (node: (TabSetNode | BorderNode), renderValues: ITabSetRenderValues) => {
    if (node instanceof TabSetNode) {
        renderValues.stickyButtons.push(
            <img
                key={`${node.getId()}-new-tab`}
                src="/add.svg"
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
      <Navbar code={code} />
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
