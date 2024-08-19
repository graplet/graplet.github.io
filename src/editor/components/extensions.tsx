/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC } from 'react'
import { ExtensionCatalog } from '../../scripts/constants/extensions'

const ExtensionsComponent: FC = () => {

  const installExtension = (folder: string) => {
    alert(`Work in progress ${folder}`)
  }
  return (
    <div>
      <p>Extensions are work in progress</p>
      {ExtensionCatalog.map(({ name, folder, description }, index) => (
        <div className="extension-card mb-5" key={index}>
          <p>{name}</p>
          <button className='mr-3' onClick={() => installExtension(folder)}>install</button>
          <em>{description}</em>
        </div>
      ))}
    </div>
  )
}
export default ExtensionsComponent