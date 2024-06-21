import React, { useContext, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Graplet from '../../../scripts/graplet';
import { faCog, faDownload, faPlay, faRotate, faUpload } from '@fortawesome/free-solid-svg-icons';
import { ThemeContext } from '../../../theme';
import { Layout } from 'flexlayout-react';

interface NavBarProps {
  code: string 
  layoutRef: React.MutableRefObject<Layout | null>
}

const settingsTab = {
  icon: `/tabs/settings.svg`,
  component: 'settings',
  name: 'Settings'
}

const Navbar = ({ code, layoutRef }: NavBarProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { theme } = useContext(ThemeContext);
  const manager = Graplet.getInstance();

  const runCode = () => {
    Function(code)();
  };

  const saveCode = () => { 
    alert('This feature is not implemented yet')
  };

  const uploadFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const parsedJson = JSON.parse(e.target?.result as string);
          manager.load(parsedJson);
          console.info('Loaded Blocks:')
          console.log(parsedJson);
        } catch (error) {
          console.error('Error parsing JSON file:', error);
        }
      };
      reader.readAsText(file);
    }
  };

  const downloadJson = () => {
    const json = manager.save();
    const blob = new Blob([JSON.stringify(json)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const projectName = (document.getElementById('project-name') as HTMLInputElement).value;
    a.download = `${projectName || 'project'}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const openSettings = () => {
      layoutRef.current?.addTabToActiveTabSet(settingsTab)
      /* TODO FIX: Currently, when there is no active tab set, the settings tab won't be opened*/
  }

  return (
    <nav>
      <a onClick={() => { window.location.href = '/' }} className='logo-sign'>
        <img style={{ alignSelf: 'center', filter: theme === 'light' ? 'invert(1)' : 'none' }} src="/fill.svg" alt="" />
        <h3 style={{ margin: 0 }}>Graplet</h3>
      </a>
      <input id='project-name' type="text" placeholder="name" />
      <button onClick={uploadFile}><FontAwesomeIcon icon={faUpload}/>upload</button>
      <input
        style={{ display: 'none' }}
        type="file"
        id="file-input"
        accept=".json"
        ref={fileInputRef}
        onChange={handleFileChange}
        />
      <button onClick={downloadJson}><FontAwesomeIcon icon={faDownload}/>download</button>
      <button onClick={saveCode}><FontAwesomeIcon icon={faRotate}/>save local</button>
      <button onClick={openSettings}><FontAwesomeIcon icon={faCog}/>settings</button>
      <button style={{color:'#62db77'}} onClick={runCode}><FontAwesomeIcon icon={faPlay}/>run</button>
    </nav>
  );
};

export default Navbar;
