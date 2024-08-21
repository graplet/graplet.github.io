import { FC, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { DisplayExtension } from '../../scripts/models/extensiontypes'

interface ExtensionEntry {
  folder: string
  extension: DisplayExtension
}

const ExtensionsComponent: FC = () => {
  const [installedExtensions, setInstalledExtensions] = useState<string[]>([])
  const [justInstalled, setJustInstalled] = useState<string | null>(null)
  const [ExtensionCatalog, setExtensionCatalog] = useState<ExtensionEntry[]>([])

  useEffect(() => {
    const loadExtensions = async () => {
      const modules = import.meta.glob('../../scripts/extensions/*/index.ts')
      const extensions: ExtensionEntry[] = []

      for (const path in modules) {
        const module = (await modules[path]()) as { default: DisplayExtension }
        const folder = path.match(/\/extensions\/(.*?)\/index\.ts$/)?.[1] || ''

        if (folder) {
          extensions.push({
            folder,
            extension: module.default,
          })
        }
      }

      setExtensionCatalog(extensions)
    }

    loadExtensions()
  }, [])


  const installExtension = async (folder: string) => {
    const module = await import(`../../scripts/extensions/${folder}/main.ts`)
    console.log('Installed', folder)
    console.log(module.default)

    setInstalledExtensions(prev => [...prev, folder])
    setJustInstalled(folder)
    setTimeout(() => setJustInstalled(null), 1000)
  }

  const toggleExtension = (folder: string, isInstalled: boolean) => {
    isInstalled ? uninstallExtension(folder) : installExtension(folder)
  }

  const uninstallExtension = (folder: string) => {
    setInstalledExtensions(prev => prev.filter(ext => ext !== folder))
  }

  return (
    <div>
      <p>Extensions are work in progress</p>
      {ExtensionCatalog.map((entry, index) => {
        const { folder, extension } = entry
        const isInstalled = installedExtensions.includes(folder)
        const isJustInstalled = justInstalled === folder

        return (
          <div className="extension-card mb-5" key={index}>
            <p>{extension.name}</p>
            <button
              className='mr-2'
              style={{ color: isJustInstalled ? 'var(--green)' : '' }}
              onClick={() => toggleExtension(folder, isInstalled)}
              disabled={isJustInstalled}
            >
              {isJustInstalled ? (
                <>
                  <FontAwesomeIcon icon={faCheck} className="mr-2" />
                  Installed
                </>
              ) : isInstalled ? (
                'Uninstall'
              ) : (
                'Install'
              )}
            </button>
            <em>{extension.description}</em>
          </div>
        )
      })}
    </div>
  )
}

export default ExtensionsComponent
