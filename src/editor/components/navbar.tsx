import React, { useContext, useRef, useState, useCallback, useEffect } from 'react'
import { faDownload, faPlay, faRotate, faShuffle, faUpload, faTriangleExclamation, faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ThemeContext } from '../../theme'
import MainWorkspace from '../../scripts/workspace'
import toolbox from '../../scripts/toolbox'
import { GrapletLocalStorage } from '../../scripts/storage' 

const simpleToolbox = {
  kind: 'categoryToolbox',
  contents: [
    {
      kind: 'category',
      name: 'Noot',
      categorystyle: 'logic_category',
      contents: [
        { type: 'logic_null', kind: 'block' },
        { type: 'text', kind: 'block', fields: { TEXT: 'noot noot 🐧' } },
      ],
    },
  ],
}

const Navbar: React.FC<{ code: string }> = ({ code }) => {
  const [saveStatus, setSaveStatus] = useState<'idle' | 'error' | 'saved'>('idle')
  const [projectId, setProjectId] = useState<string | null>(null)
  const [isSimpleToolbox, setIsSimpleToolbox] = useState(false)
  const { theme } = useContext(ThemeContext)

  const projectNameRef = useRef<HTMLInputElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const loadProjectFromHash = async () => {
      const hash = window.location.hash.slice(1)
      if (!hash) return

      try {
        const project = await GrapletLocalStorage.getProject(hash)
        if (!project) throw new Error('Project not found')

        projectNameRef.current!.value = project.name
        MainWorkspace.load(project.blocks)
        setProjectId(hash)
      } catch (error) {
        console.error('Failed to load project:', error)
        setProjectId(null)
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
      projectNameRef.current!.value = projectName
      const blocks = MainWorkspace.save()
      const newProjectId = projectName.toLowerCase().replace(/\s+/g, '-')
      const projectData = { name: projectName, blocks, extensions: [], icon: null }

      if (projectId && newProjectId !== projectId) {
        await GrapletLocalStorage.addProject({ id: newProjectId, ...projectData })
        await GrapletLocalStorage.deleteProject(projectId)
        setProjectId(newProjectId)
        window.location.hash = newProjectId
      } else {
        const createdProjectId = await GrapletLocalStorage.addProject({ id: projectId || '', ...projectData })
        setProjectId(createdProjectId)
        window.location.hash = createdProjectId
      }

      setSaveStatus('saved')
      setTimeout(() => setSaveStatus('idle'), 2000)
    } catch (error) {
      if (error instanceof DOMException && error.name === 'ConstraintError') {
        setSaveStatus('error')
        setTimeout(() => setSaveStatus('idle'), 2000)
      } else {
        console.error('Error saving project:', error)
      }
    }
  }, [projectId])

  const handleFileChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      const fileContent = await file.text()
      const parsedJson = JSON.parse(fileContent)
      projectNameRef.current!.value = file.name.replace('.json', '')
      MainWorkspace.load(parsedJson)
      console.info('Loaded Blocks:', parsedJson)
    } catch (error) {
      console.error('Error parsing JSON file:', error)
    }
  }, [])

  const downloadJson = useCallback(() => {
    try {
      const json = MainWorkspace.save()
      const blob = new Blob([JSON.stringify(json)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${projectNameRef.current?.value || 'Untitled Project'}.json`
      a.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error downloading JSON file:', error)
    }
  }, [])

  const switchToolbox = useCallback(() => {
    const workspace = MainWorkspace.getInstance()
    workspace.updateToolbox(isSimpleToolbox ? toolbox : simpleToolbox)
    setIsSimpleToolbox(prev => !prev)
  }, [isSimpleToolbox])

  return (
    <nav>
      <a href='/' className='logo-sign'>
        <img
          src='/fill.svg'
          alt='Graplet Logo'
          style={{ alignSelf: 'center', filter: theme === 'light' ? 'invert(1)' : 'none' }}
        />
        <h3 style={{ margin: 0 }}>Graplet</h3>
      </a>
      <input ref={projectNameRef} type='text' placeholder='Project Name' />
      <button onClick={() => fileInputRef.current?.click()}>
        <FontAwesomeIcon icon={faUpload} /> Upload
      </button>
      <input
        type='file'
        accept='.json'
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <button onClick={downloadJson}>
        <FontAwesomeIcon icon={faDownload} /> Download
      </button>
      <button
        onClick={saveCode}
        style={saveStatus === 'saved' ? { color: 'rgb(98, 219, 119)' } : saveStatus === 'error' ? { color: 'rgb(var(--primary-rgb))' } : {}}
      >
        {saveStatus === 'error' ? (
          <>
            <FontAwesomeIcon icon={faTriangleExclamation} /> Already exists
          </>
        ) : saveStatus === 'saved' ? (
          <>
            <FontAwesomeIcon icon={faCheck} /> Saved
          </>
        ) : (
          <>
            <FontAwesomeIcon icon={faRotate} /> Save Local
          </>
        )}
      </button>
      <button style={{ color: '#62db77' }} onClick={runCode}>
        <FontAwesomeIcon icon={faPlay} /> Run
      </button>
      <button onClick={switchToolbox}>
        <FontAwesomeIcon icon={faShuffle} /> Switch toolbox
      </button>
    </nav>
  )
}

export default Navbar
