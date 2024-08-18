import { useEffect } from 'react'
import WorkspaceManager from '../../scripts/models/workspacemanager'

const WorkspaceComponent = () => {
  useEffect(() => {
    WorkspaceManager.getInstance().register('blocklyDiv')

    return () => {
      WorkspaceManager.getInstance().getMainWorkspace()?.dispose()
    }
  }, [])
  
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div id="blocklyDiv"></div>
    </div>
  )
}

export default WorkspaceComponent