import GenericWorkspace from "../../models/genericworkspace"
import WorkspaceManager from "../../models/workspacemanager"

export class PagesWorkspace {
  private static instance: PagesWorkspace | null = null
  private id: string | null = null

  private constructor() { }

  public static getInstance(): PagesWorkspace {
    return this.instance ?? (this.instance = new PagesWorkspace())
  }

  public getWorkspace(): GenericWorkspace | null {
    if (!this.id) return null
    return WorkspaceManager.getInstance().getWorkspaceByID(this.id)
  }

  public createWorkspace(blocklyDivId: string): GenericWorkspace {
    this.id = WorkspaceManager.getInstance().register(blocklyDivId)

    return WorkspaceManager.getInstance().getWorkspaceByID(this.id)!
  }
}
