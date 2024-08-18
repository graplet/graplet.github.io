import {
  BorderNode,
  ITabSetRenderValues,
  Layout,
  Model,
  TabNode,
  TabSetNode
} from 'flexlayout-react';
import { Console, Unhook } from 'console-feed';
import { useContext, useEffect, useRef, useState } from 'react';
import { Message } from 'console-feed/lib/definitions/Component';
import Hook from '../scripts/overrides/hook';
import { layoutJsonConfig } from '../scripts/layoutconfig';
import { ThemeContext } from '../theme';

import CodeOutputComponent from './components/code';
import ExtensionsComponent from './components/extensions';
import Navbar from './components/navbar';
import NewTabComponent from './components/newtab';
import SamplesComponent from './components/samples';
import SettingsComponent from './components/settings';
import WorkspaceComponent from './components/workspace';

import './styles/App.css';
import './styles/layout.css';

// Define a constant for the layout model
const model = Model.fromJson(layoutJsonConfig);

// Component to render the Console with the correct theme
const ThemedConsole: React.FC<{ logs: Message[]; theme: string }> = ({ logs, theme }) => (
  <Console logGrouping={false} logs={logs} variant={theme === 'dark' ? 'dark' : 'light'} />
);

// Factory function to get the component for a given tab
const getComponentFactory = (code: string, setCode: React.Dispatch<React.SetStateAction<string>>, logs: Message[], theme: string, layoutRef: React.RefObject<Layout>) => (node: TabNode) => {
  const component = node.getComponent();
  const componentsMap: Record<string, JSX.Element> = {
    'workspace': <WorkspaceComponent />,
    'code': <CodeOutputComponent code={code} setCode={setCode} />,
    'console': <ThemedConsole logs={logs} theme={theme} />,
    'extensions': <div className='tab-wrapper'><ExtensionsComponent /></div>,
    'newtab': <div className='tab-wrapper'><NewTabComponent layoutRef={layoutRef} /></div>,
    'settings': <div className='tab-wrapper'><SettingsComponent /></div>,
    'samples': <div className='tab-wrapper'><SamplesComponent /></div>,
  };
  return componentsMap[component!] || <div className='tab-wrapper'><p>{node.getName()} are work in progress.</p></div>;
};

function App() {
  const layoutRef = useRef<Layout | null>(null);
  const [code, setCode] = useState<string>('');
  const [logs, setLogs] = useState<Message[]>([]);
  const { theme } = useContext(ThemeContext);

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

  const newTabButton = (node: TabSetNode | BorderNode, renderValues: ITabSetRenderValues) => {
    if (node instanceof TabSetNode) {
      renderValues.stickyButtons.push(
        <img
          key={`${node.getId()}-new-tab`}
          src="/tabicons/add.svg"
          title='New tab'
          style={{ width: '1.1em', height: '1.1em' }}
          className="flexlayout__tab_toolbar_button"
          onClick={() => addNewTab(node)}
        />
      );
    }
  };

  const addNewTab = (node: TabSetNode | BorderNode) => {
    layoutRef.current?.addTabToTabSet(node.getId(), {
      icon: '/outline.svg',
      component: 'newtab',
      name: 'New Tab'
    });
  };

  return (
    <>
      <Navbar code={code} />
      <Layout
        realtimeResize
        ref={layoutRef}
        model={model}
        factory={getComponentFactory(code, setCode, logs, theme, layoutRef)}
        onRenderTabSet={newTabButton}
      />
    </>
  );
}

export default App;
