import * as Blockly from 'blockly';
import '@blockly/toolbox-search';
import {CrossTabCopyPaste} from '@blockly/plugin-cross-tab-copy-paste';
import toolbox from './toolbox';
import * as En from 'blockly/msg/en';

Blockly.setLocale(En);
Blockly.Scrollbar.scrollbarThickness = 15;
Blockly.ContextMenuItems.registerCommentOptions();

const theme: Blockly.Theme = Blockly.Theme.defineTheme('graplet', {
    'name': 'graplet',
    'base': Blockly.Themes.Classic,
    'componentStyles': {
      'workspaceBackgroundColour': 'var(--background-primary)',
      'toolboxBackgroundColour': 'var(--background-secondary)',
      'flyoutBackgroundColour': 'var(--background-secondary)',
      'scrollbarColour' : 'var(--background-secondary)',
    }
  });

const injectOptions = {
  renderer: 'zelos',
  toolbox: toolbox,
  theme: theme,
  grid: {
    spacing: 20,
    length: 1,
    colour: '#ccc',
    snap: true,
  },
  zoom: {
    controls: true,
    wheel: true,
    startScale: 0.75,
    maxScale: 3,
    minScale: 0.3,
    scaleSpeed: 1.2,
    pinch: true,
  },
  trashcan: false,
};

const options = {
  contextMenu: true,
  shortcut: true,
};

const plugin = new CrossTabCopyPaste();
plugin.init(options);

class Graplet {
  private static instance: Graplet;
  public workspace: Blockly.WorkspaceSvg | null = null;
  
  private constructor() {}

  public static getInstance(): Graplet {
    if (!Graplet.instance) {
      Graplet.instance = new Graplet();
    }
    return Graplet.instance;
  }

  initialize(blocklyAreaId: string, blocklyDivId: string): Blockly.WorkspaceSvg {
    const blocklyArea = document.getElementById(blocklyAreaId) as HTMLElement;
    const blocklyDiv = document.getElementById(blocklyDivId) as HTMLElement;

    this.workspace = Blockly.inject(blocklyDiv, injectOptions);

    const resize = () => {
      if (!blocklyArea || !blocklyDiv) return;
      const width = blocklyArea.offsetWidth;
      const height = blocklyArea.offsetHeight;
      blocklyDiv.style.width = width + 'px';
      blocklyDiv.style.height = height + 'px';
      Blockly.svgResize(this.workspace!);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(blocklyArea);

    return this.workspace;
  }

  dispose(): void {
    if (this.workspace) {
      this.workspace.dispose();
      this.workspace = null;
    }
  }

  load(state: {[key: string]: any;}): void {
    if (this.workspace) {
      this.workspace.clear();
      Blockly.serialization.workspaces.load(state, this.workspace);
    } else {
      console.error('Workspace not initialized');
    }
  }

  save(): {[key: string]: any;} {
    if (this.workspace) {
      return Blockly.serialization.workspaces.save(this.workspace);
    } else {
      console.error('Workspace not initialized');
      return {};
    }
  }
}


export default Graplet;