import * as Blockly from 'blockly'
import { CrossTabCopyPaste } from '@blockly/plugin-cross-tab-copy-paste'
import '../constants/blocks'
import '../generators/js'
import '../overrides/category'

const plugin = new CrossTabCopyPaste()
plugin.init({ contextMenu: true, shortcut: true })

export default class GenericWorkspace {
  private workspace: Blockly.WorkspaceSvg | null = null
  private injectOptions: Blockly.BlocklyOptions

  constructor(injectOptions: Blockly.BlocklyOptions) {
    this.injectOptions = injectOptions
  }

  public initialize(blocklyDivId: string): string {
    if (!this.workspace) {
      const blocklyDiv = document.getElementById(blocklyDivId) as HTMLElement
      const blocklyArea = blocklyDiv.parentElement
      if (!blocklyDiv) {
        throw new Error('Blockly Div not found')
      }
      if (!blocklyArea) {
        throw new Error('Blockly Div must be a child of another element')
      }

      const workspace = Blockly.inject(blocklyDiv, this.injectOptions)
      Blockly.svgResize(workspace)

      const resize = () => {
        const width = blocklyArea.offsetWidth
        const height = blocklyArea.offsetHeight
        blocklyDiv.style.width = width + 'px'
        blocklyDiv.style.height = height + 'px'
        Blockly.svgResize(workspace)
      }

      this.workspace = workspace

      const resizeObserver = new ResizeObserver(resize)
      resizeObserver.observe(blocklyArea)

      return this.workspace.id
    } else {
      throw new Error('Workspace already initialized')
    }
  }

  public dispose(): void {
    if (this.workspace) {
      this.workspace.dispose()
      this.workspace = null
    }
  }

  public load(state: { [key: string]: unknown }): void {
    if (this.workspace) {
      this.workspace.clear()
      Blockly.serialization.workspaces.load(state, this.workspace)
    } else {
      console.error('Workspace not initialized')
    }
  }

  public save(): { [key: string]: unknown } {
    if (this.workspace) {
      return Blockly.serialization.workspaces.save(this.workspace)
    } else {
      console.error('Workspace not initialized')
      return {}
    }
  }

  public getComponent(): Blockly.WorkspaceSvg | null {
    return this.workspace
  }
}
