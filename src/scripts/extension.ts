import * as Blockly from 'blockly'

/* Represents metadata for an extension, used for display purposes */
interface IExtension {
  name: string
  description?: string
  folder: string
  iconUrl?: string
  thumbnailUrls?: string[]
}

/* Represents the actual extension object, used for loading the extension */
// At least one of component, useDefaultToolbox, or customToolbox must be defined
type ExtensionType = {
  component?: React.FC
  toolbox?: string | Blockly.utils.toolbox.ToolboxDefinition | Element
}

const ExtensionArray: IExtension[] = [
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

export type { ExtensionType as Extension }
export default ExtensionArray
