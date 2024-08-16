import React, { useContext, useRef, useState, useCallback, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload, faPlay, faRotate, faShuffle, faUpload } from '@fortawesome/free-solid-svg-icons'
import { ThemeContext } from '../../../theme'
import MainWorkspace from '../../../scripts/workspace'
import toolbox from '../../../scripts/toolbox'
import { GrapletLocalStorage } from '../../../scripts/storage' 

const simpleToolbox = {
  kind: 'categoryToolbox',
  contents: [
    {
      kind: 'category',
      name: 'Noot',
      categorystyle: 'logic_category',
      contents: [
        { type: 'logic_null', kind: 'block' },
        {
          type: 'text',
          kind: 'block',
          fields: { TEXT: 'noot noot 🐧' },
        },
      ],
    },
  ],
}

const Navbar: React.FC<{ code: string }> = ({ code }) => {
  const projectNameRef = useRef<HTMLInputElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [projectId, setProjectId] = useState<string | null>(null)
  const [isSimpleToolbox, setIsSimpleToolbox] = useState(false)
  const { theme } = useContext(ThemeContext)

  useEffect(() => {
    const loadProjectFromHash = async () => {
      const hash = window.location.hash.slice(1) 
      if (hash) {
        try {
          const project = await GrapletLocalStorage.getProject(hash)
          if (project) {
            projectNameRef.current!.value = project.name
            MainWorkspace.load(project.blocks)
            setProjectId(hash)
          } else {
            console.warn('Project not found for the provided hash.')
            setProjectId(null) 
          }
        } catch (error) {
          console.error('Failed to load project from hash:', error)
          setProjectId(null)
        }
      }
    }

    loadProjectFromHash()
  }, [])

  const runCode = useCallback(() => {
    try {
      new Function(code)()
    } catch (error) {
      console.error('Error executing code:', error)
    }
  }, [code])

  const saveCode = useCallback(async () => {
    try {
      const projectName = projectNameRef.current?.value || 'Untitled Project'
      const blocks = MainWorkspace.save()
      const extensions: string[] = [] // TODO: Add extension support
      const icon = null // TODO: Add icon support
  
      const newProjectId = projectName.toLowerCase().replace(/\s+/g, '-')
  
      if (projectId) {
        if (newProjectId !== projectId) {
          await GrapletLocalStorage.addProject({
            id: newProjectId,
            name: projectName,
            blocks,
            extensions,
            icon,
          })
  
          await GrapletLocalStorage.deleteProject(projectId)
          setProjectId(newProjectId)
          window.location.hash = newProjectId
  
          console.info('Project renamed and updated:', newProjectId)
        } else {
          await GrapletLocalStorage.updateProject(projectId, {
            name: projectName,
            blocks,
            extensions,
            icon,
          })
          console.info('Project updated:', projectId)
        }
      } else {
        const createdProjectId = await GrapletLocalStorage.addProject({
          id: '',
          name: projectName,
          blocks,
          extensions,
          icon,
        })
  
        setProjectId(createdProjectId)
        window.location.hash = createdProjectId
        console.info('New project created with id:', createdProjectId)
      }
    } catch (error) {
      console.error('Failed to save project:', error)
    }
  }, [projectId])

  const uploadFile = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  const handleFileChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      try {
        const fileContent = await file.text()
        const parsedJson = JSON.parse(fileContent)
        projectNameRef.current!.value = file.name.replace('.json', '')
        MainWorkspace.load(parsedJson)
        console.info('Loaded Blocks:', parsedJson)
      } catch (error) {
        console.error('Error parsing JSON file:', error)
      }
    }
  }, [])

  const downloadJson = useCallback(() => {
    try {
      const json = MainWorkspace.save()
      const blob = new Blob([JSON.stringify(json)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${projectNameRef.current?.value || 'project'}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error downloading JSON file:', error)
    }
  }, [])

  const switchToolbox = useCallback(() => {
    const workspace = MainWorkspace.getInstance()
    workspace.updateToolbox(isSimpleToolbox ? toolbox : simpleToolbox)
    setIsSimpleToolbox(!isSimpleToolbox)
  }, [isSimpleToolbox])

  return (
    <nav>
      <a href='/' className='logo-sign'>
        <img
          style={{ alignSelf: 'center', filter: theme === 'light' ? 'invert(1)' : 'none' }}
          src='/fill.svg'
          alt='Graplet Logo'
        />
        <h3 style={{ margin: 0 }}>Graplet</h3>
      </a>
      <input ref={projectNameRef} type='text' placeholder='Project Name' />
      <button onClick={uploadFile}><FontAwesomeIcon icon={faUpload} />Upload</button>
      <input
        style={{ display: 'none' }}
        type='file'
        accept='.json'
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <button onClick={downloadJson}><FontAwesomeIcon icon={faDownload} />Download</button>
      <button onClick={saveCode}><FontAwesomeIcon icon={faRotate} />Save Local</button>
      <button style={{ color: '#62db77' }} onClick={runCode}><FontAwesomeIcon icon={faPlay} />Run</button>
      <button onClick={switchToolbox}><FontAwesomeIcon icon={faShuffle} />Switch toolbox</button>
    </nav>
  )
}

export default Navbar
