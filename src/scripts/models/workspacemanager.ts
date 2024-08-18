import * as Blockly from 'blockly'
import GenericWorkspace from "./genericworkspace"
import { defaultConfig } from '../constants/wsconfig'

export default class WorkspaceManager {
  private static instance: WorkspaceManager | null = null
  private workspaces: Map<string, GenericWorkspace> = new Map()
  private mainWorkspaceId: string | null = null

  private constructor() {}

  public static getInstance(): WorkspaceManager {
    if (!WorkspaceManager.instance) {
      WorkspaceManager.instance = new WorkspaceManager()
    }
    return WorkspaceManager.instance
  }

  public register(blocklyDivId: string,injectOptions: Blockly.BlocklyOptions = defaultConfig): string {
    const workspace = new GenericWorkspace(injectOptions)
    
    const blocklyDiv = document.getElementById(blocklyDivId)
    if (!blocklyDiv) {
      throw new Error('Blockly Div not found')
    }

    const isMain = this.workspaces.size === 0
    const workspaceId = workspace.initialize(blocklyDivId)
    
    if (this.workspaces.has(workspaceId)) {
      throw new Error('Workspace ID already registered')
    }
    
    this.workspaces.set(workspaceId, workspace)
    
    if (isMain) {
      this.mainWorkspaceId = workspaceId
    }
    
    return workspaceId
  }

  public getWorkspaceByID(id: string): GenericWorkspace | null {
    return this.workspaces.get(id) || null
  }

  public getMainWorkspace(): GenericWorkspace | null {
    if (this.mainWorkspaceId) {
      return this.getWorkspaceByID(this.mainWorkspaceId)
    }
    return null
  }

  public disposeWorkspace(id: string): void {
    const workspace = this.workspaces.get(id)
    if (workspace) {
      workspace.dispose()
      this.workspaces.delete(id)
    }
  }
}
