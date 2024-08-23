import { useEffect } from 'react'
import WorkspaceManager from '../../scripts/models/workspacemanager'

interface WorkspaceComponentProps {
  onWorkspaceReady: () => void
}

const WorkspaceComponent: React.FC<WorkspaceComponentProps> = ({ onWorkspaceReady }) => {
  useEffect(() => {
    const workspaceManager = WorkspaceManager.getInstance()

    if (!workspaceManager.getMainWorkspace()) {
      workspaceManager.register('blocklyDiv')
    }

    onWorkspaceReady()
  }, [onWorkspaceReady])

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div id="blocklyDiv"></div>
    </div>
  )
}

export default WorkspaceComponent
