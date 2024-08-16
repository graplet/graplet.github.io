import { useEffect } from 'react'
import MainWorkspace from '../../../scripts/workspace'

const WorkspaceComponent = () => {
  useEffect(() => {
    MainWorkspace.initialize('blocklyArea', 'blocklyDiv')
    
    return () => {
      MainWorkspace.dispose()
    }
  }, [])

  return (
    <div id='blocklyArea' style={{ width: '100%', height: '100%' }}>
      <div id="blocklyDiv"></div>
    </div>
  )
}

export default WorkspaceComponent