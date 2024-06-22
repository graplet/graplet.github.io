import React, { useContext, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faPlay, faRotate, faUpload } from '@fortawesome/free-solid-svg-icons';
import { ThemeContext } from '../../../theme';
import Graplet from '../../../scripts/graplet';

const Navbar = ({ code }: { code: string }) => {
  const projectNameRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { theme } = useContext(ThemeContext);
  const manager = Graplet.getInstance();

  function runCode() {
    try {
      new Function(code)();
    } catch (error) {
      console.error('Error executing code:', error);
    }
  };

  function saveCode() {
    alert('This feature is not implemented yet');
  };

  function uploadFile() {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const fileContent = await file.text();
        projectNameRef.current!.value = file.name.replace('.json', '');
        const parsedJson = JSON.parse(fileContent);
        manager.load(parsedJson);
        console.info('Loaded Blocks:', parsedJson);
      } catch (error) {
        console.error('Error parsing JSON file:', error);
      }
    }
  };

  function downloadJson() {
    const json = manager.save();
    const blob = new Blob([JSON.stringify(json)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${projectNameRef.current?.value || 'project'}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <nav>
      <a href='/' className='logo-sign'>
        <img 
          style={{ alignSelf: 'center', filter: theme === 'light' ? 'invert(1)' : 'none' }} 
          src="/fill.svg" 
          alt="Graplet Logo" 
        />
        <h3 style={{ margin: 0}}>Graplet</h3>
      </a>
      <input ref={projectNameRef} type="text" placeholder="Project Name" />
      <button onClick={uploadFile}><FontAwesomeIcon icon={faUpload} />Upload</button>
      <input
        style={{ display: 'none' }}
        type="file"
        accept=".json"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <button onClick={downloadJson}><FontAwesomeIcon icon={faDownload} />Download</button>
      <button onClick={saveCode}><FontAwesomeIcon icon={faRotate} />Save Local</button>
      <button style={{ color: '#62db77' }} onClick={runCode}><FontAwesomeIcon icon={faPlay} />Run</button>
    </nav>
  );
};

export default Navbar;
