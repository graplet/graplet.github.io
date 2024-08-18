/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC } from 'react'
import { ExtensionCatalog } from '../../scripts/constants/extensions'

const ExtensionsComponent: FC = () => {
  return (
    <div>
      <p>Extensions are work in progress</p>
      {ExtensionCatalog.map(({ name, folder, description }, index) => (
        <div className="extension-card" key={index}>
          <p>{name}</p>
          <button>install</button>
          <em>{description}</em>
          <code>{folder}</code>
        </div>
      ))}
    </div>
  )
}
export default ExtensionsComponent
