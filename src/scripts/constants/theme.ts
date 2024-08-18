import * as Blockly from 'blockly'
import * as En from 'blockly/msg/en'

Blockly.setLocale(En)
Blockly.Scrollbar.scrollbarThickness = 15
Blockly.ContextMenuItems.registerCommentOptions()

export const grapletBlocklyTheme: Blockly.Theme = Blockly.Theme.defineTheme('graplet', {
  'name': 'graplet',
  'base': Blockly.Themes.Classic,
  'componentStyles': {
    'workspaceBackgroundColour': 'var(--background-primary)',
    'toolboxBackgroundColour': 'var(--background-secondary)',
    'flyoutBackgroundColour': 'var(--background-secondary)',
    'scrollbarColour': 'var(--background-secondary)',
  }
})

