import { useEffect } from 'react';
import Graplet from '../../../scripts/graplet';

const WorkspaceComponent = () => {
  useEffect(() => {
    const graplet = Graplet.getInstance();
    graplet.initialize('blocklyArea', 'blocklyDiv');
    
    return () => {
      graplet.dispose();
    };
  }, []);

  return (
    <div id='blocklyArea' style={{ width: '100%', height: '100%' }}>
      <div id="blocklyDiv"></div>
    </div>
  );
};

export default WorkspaceComponent;