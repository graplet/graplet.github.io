import React, { ChangeEvent, useContext, useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ThemeContext } from '../../../theme';
import Graplet from '../../../scripts/graplet';
import { faDownload, faPlay, faRotate, faUpload } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ code }: { code: string }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const manager = Graplet.getInstance();
  const { setTheme, theme } = useContext(ThemeContext);
  const [localTheme, setLocalTheme] = useState<string | undefined>(localStorage.getItem('theme') || undefined);

  useEffect(() => {
    if (localTheme === 'system') {
      const matchMediaDark = window.matchMedia('(prefers-color-scheme: dark)');
      setTheme(matchMediaDark.matches ? 'dark' : 'light');
    } else if (localTheme) {
      setTheme(localTheme);
    }
  }, [localTheme, setTheme]);

  const handleThemeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedTheme = event.target.value;
    setLocalTheme(selectedTheme);
  };

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

  return (
    <nav>
      <a onClick={() => { window.location.href = '/' }} className='logo-sign'>
        <img style={{ alignSelf: 'center', filter: theme === 'light' ? 'invert(1)' : 'none' }} src="/fill.svg" alt="" />
        <h3 style={{ margin: 0 }}>Graplet</h3>
      </a>
      <input id='project-name' type="text" placeholder="name" />
      <button onClick={uploadFile}><FontAwesomeIcon style={{marginRight:5}} icon={faUpload}/>upload</button>
      <input
        style={{ display: 'none' }}
        type="file"
        id="file-input"
        accept=".json"
        ref={fileInputRef}
        onChange={handleFileChange}
        />
      <button onClick={downloadJson}><FontAwesomeIcon style={{marginRight:5}} icon={faDownload}/>download</button>
      <button onClick={saveCode}><FontAwesomeIcon style={{marginRight:5}} icon={faRotate}/>save local</button>
      <button style={{color:'#62db77'}} onClick={runCode}><FontAwesomeIcon style={{marginRight:5}} icon={faPlay}/>run</button>
      <label htmlFor="theme-select">Theme: </label>
      <select name='theme-select' value={localTheme} onChange={handleThemeChange}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="system">System</option>
      </select>
    </nav>
  );
};

export default Navbar;
