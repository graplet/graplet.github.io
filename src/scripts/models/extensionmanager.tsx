import { FC } from "react"
import { Extension } from "./extensiontypes"

type TabProps = {
  name: string
  component: string
  icon: string
}

export class ExtensionManager {
  private static instance: ExtensionManager

  private components: Map<string, Map<string, FC>> = new Map()
  public tabs: Map<string, TabProps[]> = new Map()

  private constructor() { }

  public static getInstance(): ExtensionManager {
    if (!ExtensionManager.instance) {
      ExtensionManager.instance = new ExtensionManager()
    }

    return ExtensionManager.instance
  }

  public register(extension: Extension, path: string): void {
    extension.tabs.forEach((tab) => {
      const tabPath = path + tab.suffix
      const components = this.components.get(path) || new Map()
      components.set(tabPath, tab.component)
      this.components.set(path, components)

      const tabs = this.tabs.get(path) || []
      tabs.push({
        name: tab.name,
        component: tabPath,
        icon: tab.icon
      })
      this.tabs.set(path, tabs)
    })
  }

  public unregister(path: string): void {
    this.components.delete(path)
    this.tabs.delete(path)
  }

  public getComponent(name: string): FC {
    for (const components of this.components.values()) {
      const component = components.get(name)
      if (component) {
        return component
      }
    }
    return () => <>Not Found</>
  }

  public getAllTabs(): TabProps[] {
    return Array.from(this.tabs.values()).flat()
  }
}