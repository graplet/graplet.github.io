import * as Blockly from 'blockly'

/* Represents metadata for an extension, used for display purposes */
export interface IExtension {
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



export type { ExtensionType as Extension }