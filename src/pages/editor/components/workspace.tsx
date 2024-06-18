import { useEffect } from 'react';
import Graplet from '../../../scripts/graplet';

const WorkspaceComponent = () => {
  useEffect(() => {
    const manager = Graplet.getInstance();
    manager.initialize('blocklyArea', 'blocklyDiv');
    
    return () => {
      manager.dispose();
    };
  }, []);

  return (
    <div id='blocklyArea' style={{ width: '100%', height: '100%' }}>
      <div id="blocklyDiv"></div>
    </div>
  );
};

export default WorkspaceComponent;