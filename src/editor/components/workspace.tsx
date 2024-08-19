import { useEffect } from 'react'
import WorkspaceManager from '../../scripts/models/workspacemanager'

const WorkspaceComponent = () => {
  useEffect(() => {
    const workspaceManager = WorkspaceManager.getInstance();

    if (!workspaceManager.getMainWorkspace()) {
      workspaceManager.register('blocklyDiv');
    }
  }, []);
  
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div id="blocklyDiv"></div>
    </div>
  )
}

export default WorkspaceComponent