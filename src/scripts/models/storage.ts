export interface Project {
  id: string
  name: string
  blocks: { [key: string]: unknown }
  extensions: string[]
  icon: string | undefined
}

export class GrapletLocalStorage {
  private static db: IDBDatabase | null = null
  private static dbName: string = "GrapletDB"
  private static dbVersion: number = 1
  private static storeName: string = "projects"
  public static currentProjectId: string | null = null

  private constructor() {}

  public static async init(): Promise<void> {
    if (this.db) return

    return new Promise<void>((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion)

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result
        if (!db.objectStoreNames.contains(this.storeName)) {
          const store = db.createObjectStore(this.storeName, { keyPath: "id" })
          store.createIndex("name", "name", { unique: true })
        }
      }

      request.onsuccess = (event) => {
        this.db = (event.target as IDBOpenDBRequest).result
        resolve()
      }

      request.onerror = (event) => {
        reject((event.target as IDBOpenDBRequest).error)
      }
    })
  }

  public static async addProject(project: Project): Promise<string> {
    await this.init()

    project.id = project.name.toLowerCase().replace(/\s+/g, '-')

    return new Promise<string>((resolve, reject) => {
      const transaction = this.db!.transaction(this.storeName, "readwrite")
      const store = transaction.objectStore(this.storeName)

      const request = store.add(project)

      request.onsuccess = () => {
        resolve(project.id)
      }

      request.onerror = (event) => {
        reject((event.target as IDBRequest).error)
      }
    })
  }

  public static async getProject(id: string): Promise<Project | undefined> {
    await this.init()

    GrapletLocalStorage.currentProjectId = id

    return new Promise<Project | undefined>((resolve, reject) => {
      const transaction = this.db!.transaction(this.storeName, "readonly")
      const store = transaction.objectStore(this.storeName)

      const request = store.get(id)

      request.onsuccess = (event) => {
        resolve((event.target as IDBRequest).result as Project | undefined)
      }

      request.onerror = (event) => {
        reject((event.target as IDBRequest).error)
      }
    })
  }

  public static async updateProject(id: string, updateData: Partial<Project>): Promise<void> {
    const project = await this.getProject(id)
    if (!project) throw new Error("Project not found")

    Object.assign(project, updateData)

    if (updateData.name) {
      project.id = updateData.name.toLowerCase().replace(/\s+/g, '-')
    }

    return new Promise<void>((resolve, reject) => {
      const transaction = this.db!.transaction(this.storeName, "readwrite")
      const store = transaction.objectStore(this.storeName)

      const request = store.put(project)

      request.onsuccess = () => {
        resolve()
      }

      request.onerror = (event) => {
        reject((event.target as IDBRequest).error)
      }
    })
  }

  public static async deleteProject(id: string): Promise<void> {
    await this.init()

    return new Promise<void>((resolve, reject) => {
      const transaction = this.db!.transaction(this.storeName, "readwrite")
      const store = transaction.objectStore(this.storeName)

      const request = store.delete(id)

      request.onsuccess = () => {
        resolve()
      }

      request.onerror = (event) => {
        reject((event.target as IDBRequest).error)
      }
    })
  }

  public static async getAllProjects(): Promise<Project[]> {
    await this.init()

    return new Promise<Project[]>((resolve, reject) => {
      const transaction = this.db!.transaction(this.storeName, "readonly")
      const store = transaction.objectStore(this.storeName)

      const request = store.getAll()

      request.onsuccess = (event) => {
        resolve((event.target as IDBRequest).result as Project[])
      }

      request.onerror = (event) => {
        reject((event.target as IDBRequest).error)
      }
    })
  }
}
