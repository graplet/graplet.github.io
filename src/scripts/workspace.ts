import * as Blockly from 'blockly'
import { CrossTabCopyPaste } from '@blockly/plugin-cross-tab-copy-paste'
import toolbox from './toolbox'
import * as En from 'blockly/msg/en'
import './blocks'
import './generators/js'
import './overrides/category'

Blockly.setLocale(En)
Blockly.Scrollbar.scrollbarThickness = 15
Blockly.ContextMenuItems.registerCommentOptions()

const theme: Blockly.Theme = Blockly.Theme.defineTheme('graplet', {
  'name': 'graplet',
  'base': Blockly.Themes.Classic,
  'componentStyles': {
    'workspaceBackgroundColour': 'var(--background-primary)',
    'toolboxBackgroundColour': 'var(--background-secondary)',
    'flyoutBackgroundColour': 'var(--background-secondary)',
    'scrollbarColour': 'var(--background-secondary)',
  }
})

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
}

const options = {
  contextMenu: true,
  shortcut: true,
}

const plugin = new CrossTabCopyPaste()
plugin.init(options)

class MainWorkspace {
  private static instance: Blockly.WorkspaceSvg | null = null

  private constructor() {}

  public static getInstance(): Blockly.WorkspaceSvg {
    if (!MainWorkspace.instance) {
      throw new Error('Workspace not initialized')
    }
    return MainWorkspace.instance
  }

  public static initialize(blocklyAreaId: string, blocklyDivId: string): Blockly.WorkspaceSvg {
    if (!MainWorkspace.instance) {
      const blocklyArea = document.getElementById(blocklyAreaId) as HTMLElement
      const blocklyDiv = document.getElementById(blocklyDivId) as HTMLElement

      MainWorkspace.instance = Blockly.inject(blocklyDiv, injectOptions)

      Blockly.svgResize(MainWorkspace.instance)
      const resize = () => {
        if (!blocklyArea || !blocklyDiv) return
        const width = blocklyArea.offsetWidth
        const height = blocklyArea.offsetHeight
        blocklyDiv.style.width = width + 'px'
        blocklyDiv.style.height = height + 'px'
        Blockly.svgResize(MainWorkspace.instance!)
      }

      const resizeObserver = new ResizeObserver(resize)
      resizeObserver.observe(blocklyArea)

      return MainWorkspace.instance
    } else {
      throw new Error('Workspace already initialized')
    }
  }

  public static dispose(): void {
    if (MainWorkspace.instance) {
      MainWorkspace.instance.dispose()
      MainWorkspace.instance = null
    }
  }

  public static load(state: { [key: string]: unknown }): void {
    if (MainWorkspace.instance) {
      MainWorkspace.instance.clear()
      Blockly.serialization.workspaces.load(state, MainWorkspace.instance)
    } else {
      console.error('Workspace not initialized')
    }
  }

  public static save(): { [key: string]: unknown } {
    if (MainWorkspace.instance) {
      return Blockly.serialization.workspaces.save(MainWorkspace.instance)
    } else {
      console.error('Workspace not initialized')
      return {}
    }
  }
}

export default MainWorkspace
