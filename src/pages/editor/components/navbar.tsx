import React, { useContext, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faPlay, faRotate, faShuffle, faUpload } from '@fortawesome/free-solid-svg-icons';
import { ThemeContext } from '../../../theme';
import MainWorkspace from '../../../scripts/workspace';
import toolbox from '../../../scripts/toolbox';

const simpleToolbox = {
  kind: 'categoryToolbox',
  contents: [
    {
      kind: 'category',
      name: 'Noot',
      categorystyle: 'logic_category',
      contents: [
        {
          type: 'logic_null',
          kind: 'block',
        },
        {
          type: 'text',
          kind: 'block',
          fields: {
            TEXT: 'noot noot 🐧',
          },
        },
      ],
    }
  ],
};

const Navbar = ({ code }: { code: string }) => {
  const projectNameRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSimpleToolbox, setIsSimpleToolbox] = useState(false);
  const { theme } = useContext(ThemeContext);

  function runCode() {
    try {
      new Function(code)();
    } catch (error) {
      console.error('Error executing code:', error);
    }
  }

  function saveCode() {
    alert('This feature is not implemented yet');
  }

  function uploadFile() {
    fileInputRef.current?.click();
  }

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const fileContent = await file.text();
        projectNameRef.current!.value = file.name.replace('.json', '');
        const parsedJson = JSON.parse(fileContent);
        MainWorkspace.load(parsedJson);
        console.info('Loaded Blocks:', parsedJson);
      } catch (error) {
        console.error('Error parsing JSON file:', error);
      }
    }
  };

  function downloadJson() {
    const json = MainWorkspace.save();
    const blob = new Blob([JSON.stringify(json)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${projectNameRef.current?.value || 'project'}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function switchToolbox() {
    const workspace = MainWorkspace.getInstance();
    if (isSimpleToolbox) {
      workspace.updateToolbox(toolbox);
    } else {
      workspace.updateToolbox(simpleToolbox);
    }
    setIsSimpleToolbox(!isSimpleToolbox);
  }

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
      <button onClick={switchToolbox}><FontAwesomeIcon icon={faShuffle}/>Switch toolbox</button>
    </nav>
  );
};

export default Navbar;
