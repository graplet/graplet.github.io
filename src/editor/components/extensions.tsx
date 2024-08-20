import { FC, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'


// Temporary, entire extension system will be reworked - this is just a placeholder
const ExtensionCatalog = [
  {
    name: 'HTML & CSS Pages',
    description: 'Create a webpage using HTML and CSS Blocks',
    folder: 'html-css-pages',
    iconUrl: '',
    thumbnailUrls: [''],
  },
  {
    name: 'Dummy Extension',
    description: 'Lorem ipsum dolor sit amet',
    folder: 'lorem',
    iconUrl: '',
    thumbnailUrls: [''],
  }
]

const ExtensionsComponent: FC = () => {
  const [installedExtensions, setInstalledExtensions] = useState<string[]>([])
  const [justInstalled, setJustInstalled] = useState<string | null>(null)

  const installExtension = async (folder: string) => {
    //const module = await import(`../../scripts/extensions/${folder}/index.ts`)
    console.log('Installed', folder)
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
      {ExtensionCatalog.map(({ name, folder, description }, index) => {
        const isInstalled = installedExtensions.includes(folder)
        const isJustInstalled = justInstalled === folder

        return (
          <div className="extension-card mb-5" key={index}>
            <p>{name}</p>
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
            <em>{description}</em>
          </div>
        )
      })}
    </div>
  )
}

export default ExtensionsComponent
