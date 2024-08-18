import React, { useContext, useRef, useState, useCallback, useEffect } from 'react'
import { faDownload, faPlay, faRotate, faUpload, faCheck, faCog } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ThemeContext } from '../../theme'
import defaultImage from '/project.svg'
import WorkspaceManager from '../../scripts/models/workspacemanager'
import { GrapletLocalStorage } from '../../scripts/models/storage'
import { Layout } from 'flexlayout-react'

const getMainWorkspace = () => {
  const mainWorkspace = WorkspaceManager.getInstance().getMainWorkspace()
  if (!mainWorkspace) throw new Error('Main Workspace not initialized')
  return mainWorkspace
}

const Navbar: React.FC<{ code: string, layoutRef: React.MutableRefObject<Layout | null> }> = ({ code , layoutRef }) => {
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saved'>('idle')
  const [projectId, setProjectId] = useState<string | null>(null)
  const [projectImage, setProjectImage] = useState<string>(defaultImage)
  const { theme } = useContext(ThemeContext)

  const projectNameRef = useRef<HTMLInputElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const loadProjectFromHash = async () => {
      const hash = window.location.hash.slice(1)
      if (!hash) return

      try {
        const project = await GrapletLocalStorage.getProject(hash)
        if (!project) throw new Error('Project not found')

        projectNameRef.current!.value = project.name
        getMainWorkspace().load(project.blocks)
        setProjectId(hash)
        setProjectImage(project.icon || defaultImage)
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

  const launchSettings = useCallback(() => {
    
    layoutRef.current?.addTabToActiveTabSet({icon: '/tabicons/settings.svg', component: 'settings', name: 'Settings'})
  }, [layoutRef])

  const saveCode = useCallback(async () => {
    try {
      const projectName = projectNameRef.current?.value || 'Untitled Project'
      const blocks = getMainWorkspace().save()
      const newProjectId = projectName.toLowerCase().replace(/\s+/g, '-')
      const projectData = { name: projectName, blocks, extensions: [], icon: projectImage }

      if (projectId) {
        if (newProjectId !== projectId) {
          await GrapletLocalStorage.addProject({ id: newProjectId, ...projectData })
          await GrapletLocalStorage.deleteProject(projectId)
          setProjectId(newProjectId)
          window.location.hash = newProjectId
        } else {
          await GrapletLocalStorage.updateProject(projectId, projectData)
        }
      } else {
        const createdProjectId = await GrapletLocalStorage.addProject({ id: newProjectId, ...projectData })
        setProjectId(createdProjectId)
        window.location.hash = createdProjectId
      }

      setSaveStatus('saved')
      setTimeout(() => setSaveStatus('idle'), 2000)
    } catch (error) {
      if (error instanceof DOMException && error.name === 'ConstraintError') {
        alert('Project name already exists. Please choose a different name.')
      } else {
        console.error('Error saving project:', error)
      }
    }
  }, [projectId, projectImage])

  const handleFileChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      const fileContent = await file.text()
      const parsedJson = JSON.parse(fileContent)
      projectNameRef.current!.value = file.name.replace('.json', '')
      getMainWorkspace().load(parsedJson)
      console.info('Loaded Blocks:', parsedJson)
    } catch (error) {
      console.error('Error parsing JSON file:', error)
    }
  }, [])

  const downloadJson = useCallback(() => {
    try {
      const json = getMainWorkspace().save()
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

  const handleImageUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result as string
        setProjectImage(base64String)
      }
      reader.readAsDataURL(file)
    } catch (error) {
      console.error('Error uploading image:', error)
    }
  }, [])

  return (
    <nav>
      <a href='/' className='logo-sign'>
        <img
          src='/fill.svg'
          alt='Graplet Logo'
          className={`self-center ${theme === 'light' ? 'invert' : ''}`}
        />
        <h3 className='m-0'>Graplet</h3>
      </a>
      <button style={{ color: '#62db77' }} onClick={runCode}>
        <FontAwesomeIcon icon={faPlay} /> Run
      </button>
      <button
        onClick={saveCode}
        style={saveStatus === 'saved' ? { color: 'rgb(98, 219, 119)' } : {}}
      >
        {saveStatus === 'saved' ? (
          <>
            <FontAwesomeIcon icon={faCheck} /> Saved
          </>
        ) : (
          <>
            <FontAwesomeIcon icon={faRotate} /> Save Local
          </>
        )}
      </button>
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
      <input
        type='file'
        accept='image/*'
        ref={imageInputRef}
        style={{ display: 'none' }}
        onChange={handleImageUpload}
      />
      <img
        onClick={() => imageInputRef.current?.click()}
        src={projectImage}
        alt="Project"
        className='project-image'
      />
      <input ref={projectNameRef} type='text' placeholder='Project Name' />
      <button onClick={launchSettings} className='ml-auto'>
        <FontAwesomeIcon icon={faCog} /> Settings
      </button>
    </nav>
  )
}

export default Navbar
